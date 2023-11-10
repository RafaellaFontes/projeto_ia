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

      

      // Verificar se a mensagem contém o texto específico
      if (message.includes("Iniciar Quiz")) {
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
        chatResponse.innerHTML = "Este teste tem 15 questões divididas em 3 níveis: Básico, Intermediário e Avançado. Cada nível tem 5 perguntas, com dois pontos cada. Por favor, selecione a linguagem para avaliar o seu nível de conhecimento.";

        boxResponseMessage.appendChild(chatResponse);
        historyBox.appendChild(boxResponseMessage);

        var option_1 = "Java";
       
        
      
        
        // Adicionar os botões de linguagem à área de histórico (historyBox)
        const options = [option_1];
        const languageButtons = options.map((language) => {
          const button = document.createElement("button");
          button.innerHTML = language;
          button.className = "btn-language";
          button.addEventListener("click", () => {
            // Enviar mensagem para o GPT-3 quando um botão de linguagem for clicado
            sendMessageToGPT(`${language}`);
            desespero(language);
          });
          historyBox.appendChild(button); // Adicionar botão ao historyBox
          return button;
        });
        
        
       function desespero(language) {
        let questionsCorrect = 0;
        switch(language) {
          case option_1:
            question_1 = "O que é Java?";
            const boxResponseMessage = document.createElement("div");
            boxResponseMessage.className = "box-response-message";
    
          const chatResponse = document.createElement("p");
          chatResponse.className = "response-message";
          chatResponse.innerHTML = question_1;
    
          boxResponseMessage.appendChild(chatResponse);
          historyBox.appendChild(boxResponseMessage);
    
          var question_1 = "O que é Java?";
          var answer_1 = "Um tipo de café";
          var answer_2 = "Uma ilha no Caribe";
          var answer_3 = "Uma linguagem de programação";
          var answer_4 = "Um animal selvagem";
    
          const answerOptions = [answer_1, answer_2, answer_3, answer_4];
          const OptionsButtons = answerOptions.map((answer) => {
            const button = document.createElement("button");
            button.innerHTML = answer;
            button.className = "answer-button";
            button.addEventListener("click", () => {
              // Enviar mensagem para o GPT-3 quando um botão de linguagem for clicado
              sendMessageToGPT(`${answer}`);
              validacaoSecond(answer);
            });
            historyBox.appendChild(button); // Adicionar botão ao historyBox
            return button;
          });

          function validacaoSecond(answer){
           switch(answer){
            case answer_1:
            questionsCorrect--;
            case answer_2:
            questionsCorrect--;

            case answer_3:
            questionsCorrect++;



            case answer_4:
            questionsCorrect--;
         }
         console.log(questionsCorrect);
         secondQuestion();
        }

      function secondQuestion() {
        var question_2 = "Qual é a função do método public static void main(String[] args) em Java?";
              const boxResponseMessage = document.createElement("div");
              boxResponseMessage.className = "box-response-message";
    
            const chatResponse = document.createElement("p");
            chatResponse.className = "response-message";
            chatResponse.innerHTML = question_2;
    
            boxResponseMessage.appendChild(chatResponse);
            historyBox.appendChild(boxResponseMessage);
  
            var answer_1 = "Definir uma classe";
            var answer_2 = "Iniciar a execução do programa";
            var answer_3 = "Declarar variáveis";
            var answer_4 = "Imprimir na tela";
  
            const answerOptions = [answer_1, answer_2, answer_3, answer_4];
            const OptionsButtons = answerOptions.map((answer) => {
              const button = document.createElement("button");
              button.innerHTML = answer;
              button.className = "answer-button";
              button.addEventListener("click", () => {
                // Enviar mensagem para o GPT-3 quando um botão de linguagem for clicado
                sendMessageToGPT(`${answer}`);
                validacaoThird(answer);
              });
              historyBox.appendChild(button); // Adicionar botão ao historyBox
              return button;
            });
            function validacaoThird(answer){
              switch(answer){
               case answer_1:
               questionsCorrect--;
      
               case answer_2:
               questionsCorrect++;

      
               case answer_3:
               questionsCorrect--;
      
               case answer_4:
              questionsCorrect--;
            }
            console.log(questionsCorrect);
            thirdQuestion();
           }
      }
      
     function thirdQuestion() {
      var question_3 = "Como se declara uma variável inteira em Java?";
            const boxResponseMessage = document.createElement("div");
            boxResponseMessage.className = "box-response-message";
  
          const chatResponse = document.createElement("p");
          chatResponse.className = "response-message";
          chatResponse.innerHTML = question_3;
  
          boxResponseMessage.appendChild(chatResponse);
          historyBox.appendChild(boxResponseMessage);

          var answer_1 = "int x = 'Hello';";
          var answer_2 = "integer x = 10;";
          var answer_3 = "int x = 10;";
          var answer_4 = "var x = 10;";

          const answerOptions = [answer_1, answer_2, answer_3, answer_4];
          const OptionsButtons = answerOptions.map((answer) => {
            const button = document.createElement("button");
            button.innerHTML = answer;
            button.className = "answer-button";
            button.addEventListener("click", () => {
              // Enviar mensagem para o GPT-3 quando um botão de linguagem for clicado
              sendMessageToGPT(`${answer}`);
              validacaoForth(answer);
            });
            historyBox.appendChild(button); // Adicionar botão ao historyBox
            return button;
          });
          function validacaoForth(answer){
            switch(answer){
             case answer_1:

      
             case answer_2:

      
             case answer_3:
            questionsCorrect++;
      
             case answer_4:

          }
          console.log(questionsCorrect);
          forthQuestion();
         }
    }
   function forthQuestion() {
    var question_3 = "O que é um objeto em Java?";
          const boxResponseMessage = document.createElement("div");
          boxResponseMessage.className = "box-response-message";

        const chatResponse = document.createElement("p");
        chatResponse.className = "response-message";
        chatResponse.innerHTML = question_3;

        boxResponseMessage.appendChild(chatResponse);
        historyBox.appendChild(boxResponseMessage);

        var answer_1 = "Um bloco de código";
        var answer_2 = "Uma variável primitiva";
        var answer_3 = "Uma instância de uma classe";
        var answer_4 = "Um método estático";

        const answerOptions = [answer_1, answer_2, answer_3, answer_4];
        const OptionsButtons = answerOptions.map((answer) => {
          const button = document.createElement("button");
          button.innerHTML = answer;
          button.className = "answer-button";
          button.addEventListener("click", () => {
            // Enviar mensagem para o GPT-3 quando um botão de linguagem for clicado
            sendMessageToGPT(`${answer}`);
            validacaoFive(answer);
          });
          historyBox.appendChild(button); // Adicionar botão ao historyBox
          return button;
        });
        function validacaoFive(answer){
          switch(answer){
           case answer_1:

      
           case answer_2:

      
           case answer_3:
          questionsCorrect++;
          
      
           case answer_4:

        }
        console.log(questionsCorrect);
        fiveQuestion();
       }
  }
 function fiveQuestion() {
  var question_3 = "Qual é a diferença entre '==' e '.equals()' ao comparar Strings em Java?";
        const boxResponseMessage = document.createElement("div");
        boxResponseMessage.className = "box-response-message";

      const chatResponse = document.createElement("p");
      chatResponse.className = "response-message";
      chatResponse.innerHTML = question_3;

      boxResponseMessage.appendChild(chatResponse);
      historyBox.appendChild(boxResponseMessage);

      var answer_1 = "Não há diferença";
      var answer_2 = "'==' compara referências de objeto, enquanto '.equals()' compara conteúdo";
      var answer_3 = "'.equals()' compara referências de objeto, enquanto '==' compara conteúdo";
      var answer_4 = "Ambos comparam referências de objeto";

      const answerOptions = [answer_1, answer_2, answer_3, answer_4];
      const OptionsButtons = answerOptions.map((answer) => {
        const button = document.createElement("button");
        button.innerHTML = answer;
        button.className = "answer-button";
        button.addEventListener("click", () => {
          // Enviar mensagem para o GPT-3 quando um botão de linguagem for clicado
          sendMessageToGPT(`${answer}`);
          validacaoSix(answer);
        });
        historyBox.appendChild(button); // Adicionar botão ao historyBox
        return button;
      });
      function validacaoSix(answer){
        switch(answer){
         case answer_1:

      
         case answer_2:
          questionsCorrect++;
          

         case answer_3:

      
      
         case answer_4:

      }
      console.log(questionsCorrect);
      avaliacaoBasico();
      }
}
      function avaliacaoBasico() {
        if (questionsCorrect < 3) {
          firstQuestionIntermediario();
        } else if (questionsCorrect > 3) {
          const boxResponseMessage = document.createElement("div");
          boxResponseMessage.className = "box-response-message";
  
        const chatResponse = document.createElement("p");
        chatResponse.className = "response-message";
        chatResponse.innerHTML = "Parabéns! Você finalizou o quiz! Seu nível de conhecimento em Java é básico";
        }
      }
     function firstQuestionIntermediario() {
      questionsCorrect = 0;
      var question_3 = "O que é uma interface em Java?";
        const boxResponseMessage = document.createElement("div");
        boxResponseMessage.className = "box-response-message";

      const chatResponse = document.createElement("p");
      chatResponse.className = "response-message";
      chatResponse.innerHTML = question_3;

      boxResponseMessage.appendChild(chatResponse);
      historyBox.appendChild(boxResponseMessage);

      var answer_1 = "Um tipo de dado primitivo";
      var answer_2 = "Uma classe concreta";
      var answer_3 = "Um contrato que define um conjunto de métodos";
      var answer_4 = "Um operador lógico";

      const answerOptions = [answer_1, answer_2, answer_3, answer_4];
      const OptionsButtons = answerOptions.map((answer) => {
        const button = document.createElement("button");
        button.innerHTML = answer;
        button.className = "answer-button";
        button.addEventListener("click", () => {
          // Enviar mensagem para o GPT-3 quando um botão de linguagem for clicado
          sendMessageToGPT(`${answer}`);
          primeiraValidacaoIntermediario(answer);
        });
        historyBox.appendChild(button); // Adicionar botão ao historyBox
        return button;
      });
      function primeiraValidacaoIntermediario(answer){
        switch(answer){
         case answer_1:
          questionsCorrect--;
      
         case answer_2:
          questionsCorrect--;

         case answer_3:
          questionsCorrect++;
          console.log(questionsCorrect);
      
      
         case answer_4:
          questionsCorrect--;
      }
      secondQuestionIntermediario();
      }
     }
     function secondQuestionIntermediario() {
      var question_3 = "Como você previne a herança de uma classe em Java?";
        const boxResponseMessage = document.createElement("div");
        boxResponseMessage.className = "box-response-message";

      const chatResponse = document.createElement("p");
      chatResponse.className = "response-message";
      chatResponse.innerHTML = question_3;

      boxResponseMessage.appendChild(chatResponse);
      historyBox.appendChild(boxResponseMessage);

      var answer_1 = "Declarando a classe como 'final'";
      var answer_2 = "Utilizando o modificador 'private'";
      var answer_3 = "Usando a palavra-chave 'static'";
      var answer_4 = "Não é possível prevenir a herança em Java";

      const answerOptions = [answer_1, answer_2, answer_3, answer_4];
      const OptionsButtons = answerOptions.map((answer) => {
        const button = document.createElement("button");
        button.innerHTML = answer;
        button.className = "answer-button";
        button.addEventListener("click", () => {
          // Enviar mensagem para o GPT-3 quando um botão de linguagem for clicado
          sendMessageToGPT(`${answer}`);
          segundaValidacaoIntermediario(answer);
        });
        historyBox.appendChild(button); // Adicionar botão ao historyBox
        return button;
      });
      function segundaValidacaoIntermediario(answer){
        switch(answer){
         case answer_1:
          questionsCorrect++;
          console.log(questionsCorrect);
      
         case answer_2:
          questionsCorrect--;

         case answer_3:
          questionsCorrect--;
      
         case answer_4:
          questionsCorrect--;
      }
      thirdQuestionIntermediario();
      }
     }
     function thirdQuestionIntermediario() {
      var question_3 = "O que é polimorfismo em Java?";
        const boxResponseMessage = document.createElement("div");
        boxResponseMessage.className = "box-response-message";

      const chatResponse = document.createElement("p");
      chatResponse.className = "response-message";
      chatResponse.innerHTML = question_3;

      boxResponseMessage.appendChild(chatResponse);
      historyBox.appendChild(boxResponseMessage);

      var answer_1 = "Herança de várias classes";
      var answer_2 = "Capacidade de uma classe ter múltiplos construtores";
      var answer_3 = "Capacidade de uma classe realizar múltiplas tarefas";
      var answer_4 = "Capacidade de uma classe ser tratada como uma instância de sua superclasse";

      const answerOptions = [answer_1, answer_2, answer_3, answer_4];
      const OptionsButtons = answerOptions.map((answer) => {
        const button = document.createElement("button");
        button.innerHTML = answer;
        button.className = "answer-button";
        button.addEventListener("click", () => {
          // Enviar mensagem para o GPT-3 quando um botão de linguagem for clicado
          sendMessageToGPT(`${answer}`);
          terceiraValidacaoIntermediario(answer);
        });
        historyBox.appendChild(button); // Adicionar botão ao historyBox
        return button;
      });
      function terceiraValidacaoIntermediario(answer){
        switch(answer){
         case answer_1:
          questionsCorrect--;

         case answer_2:
          questionsCorrect--;

         case answer_3:
          questionsCorrect--;
      
         case answer_4:
          questionsCorrect++;
          console.log(questionsCorrect);
      }
      fourQuestionIntermediario();
      }
     }
     function fourQuestionIntermediario() {
      var question_3 = "O que é um construtor em Java?";
        const boxResponseMessage = document.createElement("div");
        boxResponseMessage.className = "box-response-message";

      const chatResponse = document.createElement("p");
      chatResponse.className = "response-message";
      chatResponse.innerHTML = question_3;

      boxResponseMessage.appendChild(chatResponse);
      historyBox.appendChild(boxResponseMessage);

      var answer_1 = "Um método que destrói objetos";
      var answer_2 = "Um método que inicializa objetos";
      var answer_3 = "Um tipo especial de variável";
      var answer_4 = "Uma classe abstrata";

      const answerOptions = [answer_1, answer_2, answer_3, answer_4];
      const OptionsButtons = answerOptions.map((answer) => {
        const button = document.createElement("button");
        button.innerHTML = answer;
        button.className = "answer-button";
        button.addEventListener("click", () => {
          // Enviar mensagem para o GPT-3 quando um botão de linguagem for clicado
          sendMessageToGPT(`${answer}`);
          quartaValidacaoIntermediario(answer);
        });
        historyBox.appendChild(button); // Adicionar botão ao historyBox
        return button;
      });
      function quartaValidacaoIntermediario(answer){
        switch(answer){
         case answer_1:
          questionsCorrect--;

         case answer_2:
          questionsCorrect++;
          console.log(questionsCorrect);

         case answer_3:
          questionsCorrect--;
      
         case answer_4:
          questionsCorrect--;
      }
      fiveQuestionIntermediario();
      }
     }
     function fiveQuestionIntermediario() {
      var question_3 = "Qual é a diferença entre uma pilha (stack) e uma fila (queue) em Java?";
        const boxResponseMessage = document.createElement("div");
        boxResponseMessage.className = "box-response-message";

      const chatResponse = document.createElement("p");
      chatResponse.className = "response-message";
      chatResponse.innerHTML = question_3;

      boxResponseMessage.appendChild(chatResponse);
      historyBox.appendChild(boxResponseMessage);

      var answer_1 = "Não há diferença";
      var answer_2 = "A pilha segue a ordem LIFO, enquanto a fila segue a ordem FIFO";
      var answer_3 = "A fila segue a ordem LIFO, enquanto a pilha segue a ordem FIFO";
      var answer_4 = "Ambas seguem a ordem FIFO";

      const answerOptions = [answer_1, answer_2, answer_3, answer_4];
      const OptionsButtons = answerOptions.map((answer) => {
        const button = document.createElement("button");
        button.innerHTML = answer;
        button.className = "answer-button";
        button.addEventListener("click", () => {
          // Enviar mensagem para o GPT-3 quando um botão de linguagem for clicado
          sendMessageToGPT(`${answer}`);
          quintaValidacaoIntermediario(answer);
        });
        historyBox.appendChild(button); // Adicionar botão ao historyBox
        return button;
      });
      function quintaValidacaoIntermediario(answer){
        switch(answer){
         case answer_1:
          questionsCorrect--;

         case answer_2:
          questionsCorrect++;
          console.log(questionsCorrect);
      
         case answer_3:
          questionsCorrect--;
      
         case answer_4:
          questionsCorrect--;
      }
      avaliacaoIntermediario();
      }
     }
     function avaliacaoIntermediario() {
      if (questionsCorrect >= 3) {
        firstQuestionAvancado();
      } else {
        const boxResponseMessage = document.createElement("div");
        boxResponseMessage.className = "box-response-message";

      const chatResponse = document.createElement("p");
      chatResponse.className = "response-message";
      chatResponse.innerHTML = "Parabéns! Você finalizou o quiz! Seu nível de conhecimento em Java é Intermediário";
      }
    }
    function firstQuestionAvancado() {
      questionsCorrect = 0;
      var question_3 = "Explique o conceito de garbage collection em Java";
        const boxResponseMessage = document.createElement("div");
        boxResponseMessage.className = "box-response-message";

      const chatResponse = document.createElement("p");
      chatResponse.className = "response-message";
      chatResponse.innerHTML = question_3;

      boxResponseMessage.appendChild(chatResponse);
      historyBox.appendChild(boxResponseMessage);

      var answer_1 = "Um método para limpar sujeira do código";
      var answer_2 = "Um processo automático de gerenciamento de memória";
      var answer_3 = "Um design pattern para evitar vazamento de memória";
      var answer_4 = "Uma técnica para otimizar loops";

      const answerOptions = [answer_1, answer_2, answer_3, answer_4];
      const OptionsButtons = answerOptions.map((answer) => {
        const button = document.createElement("button");
        button.innerHTML = answer;
        button.className = "answer-button";
        button.addEventListener("click", () => {
          // Enviar mensagem para o GPT-3 quando um botão de linguagem for clicado
          sendMessageToGPT(`${answer}`);
          primeiraValidacaoAvancado(answer);
        });
        historyBox.appendChild(button); // Adicionar botão ao historyBox
        return button;
      });
      function primeiraValidacaoAvancado(answer){
        switch(answer){
         case answer_1:
          questionsCorrect--;
      
         case answer_2:
          questionsCorrect++;
          console.log(questionsCorrect);

         case answer_3:
          questionsCorrect--;
      
         case answer_4:
          questionsCorrect--;
      }
      secondQuestionAvancado();
      }
     }
     function secondQuestionAvancado() {
      var question_3 = "Como o Java lida com exceções e quais são as palavras-chave associadas?";
        const boxResponseMessage = document.createElement("div");
        boxResponseMessage.className = "box-response-message";

      const chatResponse = document.createElement("p");
      chatResponse.className = "response-message";
      chatResponse.innerHTML = question_3;

      boxResponseMessage.appendChild(chatResponse);
      historyBox.appendChild(boxResponseMessage);

      var answer_1 = "'try' e 'catch'; para manipular e lançar exceções";
      var answer_2 = "'handle' e 'throw'; para manipular e lançar exceções";
      var answer_3 = "'exception' e 'finally'; para manipular e lançar exceções";
      var answer_4 = "'try' e 'finally'; para manipular e lançar exceções";

      const answerOptions = [answer_1, answer_2, answer_3, answer_4];
      const OptionsButtons = answerOptions.map((answer) => {
        const button = document.createElement("button");
        button.innerHTML = answer;
        button.className = "answer-button";
        button.addEventListener("click", () => {
          // Enviar mensagem para o GPT-3 quando um botão de linguagem for clicado
          sendMessageToGPT(`${answer}`);
          segundaValidacaoAvancado(answer);
        });
        historyBox.appendChild(button); // Adicionar botão ao historyBox
        return button;
      });
      function segundaValidacaoAvancado(answer){
        switch(answer){
         case answer_1:
          questionsCorrect++;
          console.log(questionsCorrect);
      
         case answer_2:
          questionsCorrect--;

         case answer_3:
          questionsCorrect--;
      
         case answer_4:
          questionsCorrect--;
      }
      thirdQuestionAvancado();
      }
     }
     function thirdQuestionAvancado() {
      var question_3 = "O que é a serialização em Java?";
        const boxResponseMessage = document.createElement("div");
        boxResponseMessage.className = "box-response-message";

      const chatResponse = document.createElement("p");
      chatResponse.className = "response-message";
      chatResponse.innerHTML = question_3;

      boxResponseMessage.appendChild(chatResponse);
      historyBox.appendChild(boxResponseMessage);

      var answer_1 = "Um processo de converter um objeto em uma sequência de bytes";
      var answer_2 = "Um método para tornar uma classe abstrata";
      var answer_3 = " Uma forma de compactação de código fonte";
      var answer_4 = "Uma técnica para acelerar a execução do programa";

      const answerOptions = [answer_1, answer_2, answer_3, answer_4];
      const OptionsButtons = answerOptions.map((answer) => {
        const button = document.createElement("button");
        button.innerHTML = answer;
        button.className = "answer-button";
        button.addEventListener("click", () => {
          // Enviar mensagem para o GPT-3 quando um botão de linguagem for clicado
          sendMessageToGPT(`${answer}`);
          terceiraValidacaoAvancado(answer);
        });
        historyBox.appendChild(button); // Adicionar botão ao historyBox
        return button;
      });
      function terceiraValidacaoAvancado(answer){
        switch(answer){
         case answer_1:
          questionsCorrect++;
          console.log(questionsCorrect);
         case answer_2:
          questionsCorrect--;

         case answer_3:
          questionsCorrect--;
      
         case answer_4:
          questionsCorrect--;
      }
      fourQuestionAvancado();
      }
     }
     function fourQuestionAvancado() {
      var question_3 = "Qual é a diferença entre uma thread e um processo em Java?";
        const boxResponseMessage = document.createElement("div");
        boxResponseMessage.className = "box-response-message";

      const chatResponse = document.createElement("p");
      chatResponse.className = "response-message";
      chatResponse.innerHTML = question_3;

      boxResponseMessage.appendChild(chatResponse);
      historyBox.appendChild(boxResponseMessage);

      var answer_1 = "Não há diferença";
      var answer_2 = "Uma thread compartilha o mesmo espaço de memória, enquanto um processo tem seu próprio espaço";
      var answer_3 = "Um processo é mais eficiente em termos de recursos do que uma thread";
      var answer_4 = "Uma thread é mais segura em ambientes concorrentes do que um processo";

      const answerOptions = [answer_1, answer_2, answer_3, answer_4];
      const OptionsButtons = answerOptions.map((answer) => {
        const button = document.createElement("button");
        button.innerHTML = answer;
        button.className = "answer-button";
        button.addEventListener("click", () => {
          // Enviar mensagem para o GPT-3 quando um botão de linguagem for clicado
          sendMessageToGPT(`${answer}`);
          quartaValidacaoAvancado(answer);
        });
        historyBox.appendChild(button); // Adicionar botão ao historyBox
        return button;
      });
      function quartaValidacaoAvancado(answer){
        switch(answer){
         case answer_1:
          questionsCorrect--;

         case answer_2:
          questionsCorrect++;
          console.log(questionsCorrect);

         case answer_3:
          questionsCorrect--;
      
         case answer_4:
          questionsCorrect--;
      }
      fiveQuestionAvancado();
      }
     }
     function fiveQuestionAvancado() {
      var question_3 = "O que é o padrão de design Observer em Java?";
        const boxResponseMessage = document.createElement("div");
        boxResponseMessage.className = "box-response-message";

      const chatResponse = document.createElement("p");
      chatResponse.className = "response-message";
      chatResponse.innerHTML = question_3;

      boxResponseMessage.appendChild(chatResponse);
      historyBox.appendChild(boxResponseMessage);

      var answer_1 = "Um padrão para observar a qualidade do código";
      var answer_2 = "Um padrão para detectar bugs durante a execução";
      var answer_3 = "Um padrão para criar instâncias de objetos observáveis";
      var answer_4 = "Um padrão para definir uma dependência de um para muitos entre objetos";

      const answerOptions = [answer_1, answer_2, answer_3, answer_4];
      const OptionsButtons = answerOptions.map((answer) => {
        const button = document.createElement("button");
        button.innerHTML = answer;
        button.className = "answer-button";
        button.addEventListener("click", () => {
          // Enviar mensagem para o GPT-3 quando um botão de linguagem for clicado
          sendMessageToGPT(`${answer}`);
          quintaValidacaoAvancado(answer);
        });
        historyBox.appendChild(button); // Adicionar botão ao historyBox
        return button;
      });
      function quintaValidacaoAvancado(answer){
        switch(answer){
         case answer_1:
          questionsCorrect--;

         case answer_2:
          questionsCorrect--;

         case answer_3:
          questionsCorrect--;

      
         case answer_4:
          questionsCorrect++;
          console.log(questionsCorrect);
      }
      avaliacaoAvancado();
      }
     }
     function avaliacaoAvancado() {
      if (questionsCorrect >= 3) {
        const boxResponseMessage = document.createElement("div");
        boxResponseMessage.className = "box-response-message";

      const chatResponse = document.createElement("p");
      chatResponse.className = "response-message";
      chatResponse.innerHTML = "Parabéns! Você finalizou o quiz! Seu nível de conhecimento em Java é Avançado";
      } else {
        const boxResponseMessage = document.createElement("div");
        boxResponseMessage.className = "box-response-message";

      const chatResponse = document.createElement("p");
      chatResponse.className = "response-message";
      chatResponse.innerHTML = "Parabéns! Você finalizou o quiz! Seu nível de conhecimento em Java é Intermediário";
      }
    }
      }
      
  
    }
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

startQuiz();


