export default [
    {
      question: "Explique o conceito de garbage collection em Java",
      answers: [
        { option: "Um método para limpar sujeira do código", correct: false },
        { option: "Um processo automático de gerenciamento de memória", correct: true },
        { option: "Um design pattern para evitar vazamento de memória", correct: false },
        { option: "Uma técnica para otimizar loops", correct: false },
      ],
    },
    {
        question: "Como o Java lida com exceções e quais são as palavras-chave associadas?",
        answers: [
          { option: "'try' e 'catch'; para manipular e lançar exceções", correct:true },
          { option: "'handle' e 'throw'; para manipular e lançar exceções", correct: false },
          { option: "'exception' e 'finally'; para manipular e lançar exceções", correct: false },
          { option: "'try' e 'finally'; para manipular e lançar exceções", correct: false },
        ],
      },
      {
        question: "O que é a serialização em Java?",
        answers: [
          { option: "Um processo de converter um objeto em uma sequência de bytes", correct: true },
          { option: "Um método para tornar uma classe abstrata", correct: false },
          { option: " Uma forma de compactação de código fonte", correct: false },
          { option: "Uma técnica para acelerar a execução do programa", correct: false },
        ],
      },
      {
        question: "Qual é a diferença entre uma thread e um processo em Java?",
        answers: [
          { option: "Não há diferença", correct: false },
          { option: "Uma thread compartilha o mesmo espaço de memória, enquanto um processo tem seu próprio espaço", correct: true },
          { option: "Um processo é mais eficiente em termos de recursos do que uma thread", correct: false },
          { option: "Uma thread é mais segura em ambientes concorrentes do que um processo", correct: false },
        ],
      },
      {
        question: "O que é o padrão de design Observer em Java?",
        answers: [
          { option: "Um padrão para observar a qualidade do código", correct: false },
          { option: "Um padrão para detectar bugs durante a execução", correct: false },
          { option: "Um padrão para criar instâncias de objetos observáveis", correct: false },
          { option: "Um padrão para definir uma dependência de um para muitos entre objetos", correct: true },
        ],
      }
    ]
