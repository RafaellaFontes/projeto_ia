export default [
    {
      question: "O que é uma interface em Java?",
      answers: [
        { option: "Um tipo de dado primitivo", correct: false },
        { option: "Uma classe concreta", correct: false },
        { option: "Um contrato que define um conjunto de métodos", correct: true },
        { option: "Um operador lógico", correct: false },
      ],
    },
    {
        question: "Como você previne a herança de uma classe em Java?",
        answers: [
          { option: "Declarando a classe como 'final'", correct:true },
          { option: "Utilizando o modificador 'private'", correct: false },
          { option: "Usando a palavra-chave 'static'", correct: false },
          { option: "Não é possível prevenir a herança em Java", correct: false },
        ],
      },
      {
        question: "O que é polimorfismo em Java?",
        answers: [
          { option: "Herança de várias classes", correct: false },
          { option: "Capacidade de uma classe ter múltiplos construtores", correct: false },
          { option: "Capacidade de uma classe realizar múltiplas tarefas", correct: false },
          { option: "Capacidade de uma classe ser tratada como uma instância de sua superclasse", correct: true },
        ],
      },
      {
        question: "O que é um construtor em Java?",
        answers: [
          { option: "Um método que destrói objetos", correct: false },
          { option: "Um método que inicializa objetos", correct: true },
          { option: "Um tipo especial de variável", correct: false },
          { option: "Uma classe abstrata", correct: false },
        ],
      },
      {
        question: "Qual é a diferença entre uma pilha (stack) e uma fila (queue) em Java?",
        answers: [
          { option: "Não há diferença", correct: false },
          { option: "A pilha segue a ordem LIFO, enquanto a fila segue a ordem FIFO", correct: true },
          { option: "A fila segue a ordem LIFO, enquanto a pilha segue a ordem FIFO", correct: false },
          { option: "Ambas seguem a ordem FIFO", correct: false },
        ],
      }
    ]
