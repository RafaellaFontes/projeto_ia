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



