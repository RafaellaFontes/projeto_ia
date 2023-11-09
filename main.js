// Chave de API
const apiKey = "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";

// Variável para verificar se o quiz já foi iniciado
let quizStarted = false;

// Função para enviar mensagens para o modelo GPT-3
function sendMessage() {
  // Obter a entrada de mensagem do HTML
  var message = document.getElementById('message-input');
  
  // Verificar se a mensagem está vazia
  if (!message.value) {
    alert('Por favor, digite um valor para prosseguir!');
    return;
  }

  

  // Obter elementos HTML para manipulação
  var status = document.getElementById('status');
  var btnSubmit = document.getElementById('btn-submit');

  // Atualizar elementos HTML para refletir o estado de carregamento
  status.style.display = 'block';
  status.innerHTML = 'Carregando...';
  btnSubmit.disabled = true;
  btnSubmit.style.cursor = 'not-allowed';
  message.disabled = true;

  // Enviar requisição fetch para a API do OpenAI
  fetch("https://api.openai.com/v1/completions", {
    method: 'POST',
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "text-davinci-003",
      prompt: message.value,
      max_tokens: 2048,
      temperature: 0.5
    })
  })
    .then((response) => response.json())
    .then((response) => {
      // Obter resposta do modelo e ocultar status de carregamento
      let r = response.choices[0]['text'];
      status.style.display = 'none';
      // Exibir histórico de mensagens
      showHistory(message.value, r);

      // Verificar se a mensagem é "Iniciar Quiz" e se o quiz não foi iniciado ainda
    })
    .catch((e) => {
      console.log(`Error -> ${e}`);
      // Exibir mensagem de erro no status
      status.innerHTML = 'Erro, tente novamente mais tarde...';
    })
    .finally(() => {
      // Restaurar elementos HTML para o estado original
      btnSubmit.disabled = false;
      btnSubmit.style.cursor = 'pointer';
      message.disabled = false;
      message.value = '';
    });
}

// Função para exibir o histórico de mensagens
function showHistory(message, response) {
  var historyBox = document.getElementById("historic");
  // Criar elemento de histórico se não existir
  if (!historyBox) {
    historyBox = document.createElement("div");
    historyBox.className = "historic";
    document.body.appendChild(historyBox);
  }

  // Criar e adicionar mensagem do usuário ao histórico
  var boxMyMessage = document.createElement("div");
  boxMyMessage.className = "box-my-message";

  var myMessage = document.createElement("p");
  myMessage.className = "my-message";
  myMessage.innerHTML = message;

  boxMyMessage.appendChild(myMessage);
  historyBox.appendChild(boxMyMessage);

  // Criar e adicionar resposta do modelo ao histórico
  var boxResponseMessage = document.createElement("div");
  boxResponseMessage.className = "box-response-message";

  var chatResponse = document.createElement("p");
  chatResponse.className = "response-message";
  chatResponse.innerHTML = response;

  boxResponseMessage.appendChild(chatResponse);
  historyBox.appendChild(boxResponseMessage);

  // Rolar para o final do histórico
  historyBox.scrollTop = historyBox.scrollHeight;
}

// Função para iniciar o quiz
function startQuiz() {
  var status = document.getElementById('status');
const btnQuiz = document.getElementById("btn-quiz");

// Adicionar evento de clique ao botão de quiz
btnQuiz.addEventListener("click", () => {
  // Atualizar status e desabilitar botão durante o quiz
  status.style.display = 'block';
  status.innerHTML = 'Iniciando Quiz...';
  btnQuiz.disabled = true;
  btnQuiz.style.cursor = 'not-allowed';


  // Enviar mensagem de início do quiz para o modelo GPT-3
  sendMessageToGPT("Iniciar Quiz");
});

}

async function sendMessageToGPT(message, response) {
  var historyBox = document.getElementById("historic");
  var status = document.getElementById('status');
  var btnQuiz = document.getElementById('btn-quiz');
  var messageInput = document.getElementById('message-input');

  // Criar elemento de histórico se não existir
  if (!historyBox) {
    historyBox = document.createElement("div");
    historyBox.className = "historic";
    document.body.appendChild(historyBox);
  }

  // Criar e adicionar mensagem do usuário ao histórico
  var boxMyMessage = document.createElement("div");
  boxMyMessage.className = "box-my-message";

  var myMessage = document.createElement("p");
  myMessage.className = "my-message";
  myMessage.innerHTML = message;

  boxMyMessage.appendChild(myMessage);
  historyBox.appendChild(boxMyMessage);

  // Enviar requisição fetch para a API do OpenAI com prompt específico
  fetch("https://api.openai.com/v1/completions", {
  method: 'POST',
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${apiKey}`,
  },
  body: JSON.stringify({
    model: "text-davinci-003",
    prompt: message,
    max_tokens: 2048,
    temperature: 0.5
  })
})
    .then((response) => response.json())
    .then((response) => {
      // Obter resposta do modelo e ocultar status de carregamento
      let r = response.choices[0]['text'];
      status.style.display = 'none';

      // Verificar se a mensagem contém o texto específico
      if (message.includes("Iniciar Quiz")) {
        // Criar e adicionar mensagem informativa ao histórico
        const boxResponseMessage = document.createElement("div");
        boxResponseMessage.className = "box-response-message";

        const chatResponse = document.createElement("p");
        chatResponse.className = "response-message";
        chatResponse.innerHTML = "Este teste tem 15 questões divididas em 3 níveis: Básico, Intermediário e Avançado. Cada nível tem 5 perguntas, com dois pontos cada. Por favor, selecione a linguagem para avaliar o seu nível de conhecimento.";

        boxResponseMessage.appendChild(chatResponse);
        historyBox.appendChild(boxResponseMessage);

        // Adicionar os botões de linguagem à área de histórico (historyBox)
        const languageOptions = ["Java", "C#", "Python", "JavaScript"];
        const languageButtons = languageOptions.map((language) => {
          const button = document.createElement("button");
          button.innerHTML = language;
          button.className = "btn-language";
          button.addEventListener("click", () => {
            // Enviar mensagem para o GPT-3 quando um botão de linguagem for clicado
            message = language;
            sendMessageToGPT(`${language}`);
          });
          historyBox.appendChild(button); // Adicionar botão ao historyBox
          return button;
       
        });
        
      }
      if (message.includes("Java") || message.includes("C#") || message.includes("Python") || message.includes("JavaScript")) {
        quiz();
      }
  
    })
    .catch((e) => {
      console.log(`Error -> ${e}`);
      // Exibir mensagem de erro no status
      status.innerHTML = 'Erro, tente novamente mais tarde...';
    })
    .finally(() => {
      // Restaurar elementos HTML para o estado original
      btnQuiz.disabled = false;
      btnQuiz.style.cursor = 'pointer';
      messageInput.disabled = false;
      messageInput.value = '';
    });
}
function quiz() {
  var historyBox = document.getElementById("historic");

  // Criar elemento de histórico se não existir
  if (!historyBox) {
    historyBox = document.createElement("div");
    historyBox.className = "historic";
    document.body.appendChild(historyBox);
  }
  // Criar e adicionar mensagem informativa ao histórico
  const boxResponseMessage = document.createElement("div");
  boxResponseMessage.className = "box-response-message";

  const chatResponse = document.createElement("p");
  chatResponse.className = "response-message";
  chatResponse.innerHTML = "Aguarde, carregando pergunta...";

  boxResponseMessage.appendChild(chatResponse);
  historyBox.appendChild(boxResponseMessage);

  fetch("https://api.openai.com/v1/completions", {
    method: 'GET',
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "text-davinci-003",
      prompt: message.value,
      max_tokens: 2048,
      temperature: 0.5
    })
  })

  .then((response) => response.json())
  .then((questionData) => {
    // Obter a pergunta da resposta da API
    const question = questionData.question;

    // Substituir a mensagem informativa pela pergunta obtida
    chatResponse.innerHTML = question;

    // Adicionar opções de resposta à área de histórico (historyBox)
    const answerOptions = questionData.options;
    const answerButtons = answerOptions.slice(0, 4).map((answer) => {
      const button = document.createElement("button");
      button.innerHTML = answer;
      button.className = "answer-button";
      button.addEventListener("click", () => {
        // Enviar resposta selecionada para a API ou processar localmente, conforme necessário
        sendMessageToGPT(answer);
      });
      historyBox.appendChild(button); // Adicionar botão ao historyBox
      return button;
    });
  })
  .catch((e) => {
    console.log(`Error -> ${e}`);
    // Exibir mensagem de erro no status
    chatResponse.innerHTML = 'Erro ao carregar pergunta. Tente novamente mais tarde.';
  });
}
// Chame startQuiz() ou qualquer outra função necessária para ativar o código.
startQuiz();


