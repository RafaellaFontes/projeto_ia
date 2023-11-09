
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

    const message = prompt("Qual é a linguagem que você deseja usar no quiz?");

    // Enviar mensagem de início do quiz para o modelo GPT-3
    sendMessageToGPT(message);
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
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: "quiz",
        language: "Java" || "C#"||"Python"||"Javascript",
        numberOfQuestions: 15,
        levels: [
            {
              name: "Básico",
              number: 5,
            },
            {
              name: "Intermediário",
              number: 5,
            },
            {
              name: "Avançado",
              number: 5,
            },
          ],
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
  
  // Chame startQuiz() ou qualquer outra função necessária para ativar o código.
  startQuiz();


