const questionList = [
  {
    question: "What tag is used for JavaScript?",
    multipleChoice: ["<head>", "<body>", "<script>", "<button>"],
    answer: "2"
  },
  {
    question: 'What syntax is used to refer to an external code, "hello.js"?',
    multipleChoice: [
      '<script src="hello.js">',
      '<script name="hello.js">',
      '<script hreg="hello.js">',
      "None of the above"
    ],
    answer: "0"
  },
  {
    question: "Var is used to define which data types?",
    multipleChoice: ["String", "Numbers", "Booleans", "All of the above"],
    answer: "3"
  },
  {
    question: "Prompt can be used to get true or false reponse?",
    multipleChoice: ["True", "False"],
    answer: "0"
  },
  {
    question:
      "The ______ method displays an alert box with a specified message and an OK button.",
    multipleChoice: ["confirm()", "alert()", "prompt()", "None of the above"],
    answer: "1"
  },
  {
    question: "JavaScript can be use to change the html code?",
    multipleChoice: ["True", "False"],
    answer: "0"
  },
  {
    question:
      "The setInterval() method calls a function or evaluates an expression at specified intervals measure in ______ .",
    multipleChoice: ["seconds", "minutes", "milliseconds", "None of the above"],
    answer: "2"
  },
  {
    question: "A loop will continue until the condition is ",
    multipleChoice: ["True", "False"],
    answer: "1"
  },
  {
    question: "Methods to navigate teh DOM",
    multipleChoice: [
      "getElementById",
      "childNodes",
      "nextSibling",
      "All of the above"
    ],
    answer: "3"
  },
  {
    question: "A condition is wrapped by ",
    multipleChoice: ["brackets", "parentheses", "curly brackets"],
    answer: "1"
  }
];

// Variable for questions
const question = document.querySelector(".questions");
const possibleAnswer = document.querySelector(".possibleAnswers");
const answer = document.querySelector(".answer");
const timeEl = document.querySelector(".time");
const questionNumber = document.querySelector(".questionNumber");
const startQuiz = document.querySelector(".startQuiz");
const introQuiz = document.querySelector(".introQuiz");
const recordScore = document.querySelector(".endQuiz");
const questionContainer = document.querySelector(".question-container");

// let secondsLeft = 10;
let correct = 0;
let questionCount = 0;
let possibleQuestion = [];
let currentQuestion = 0;
// let

// // Timer Count Down
// function setTime() {
//   var timerInterval = setInterval(function () {
//     secondsLeft--;
//     timeEl.textContent = secondsLeft;

//     if (secondsLeft === 0) {
//       clearInterval(timerInterval);
//     }
//   }, 1000);
// }
// setTime();

startQuiz.addEventListener("click", beginQuiz);
// i++;

// question.addEventListener("click", displayQs());

function availableQuestion() {
  const totalQuestion = questionList.length;
  for (let i = 0; i < totalQuestion; i++) {
    possibleQuestion.push(questionList[i]);
  }
}

function displayQuestion() {
  questionNumber.textContent =
    "Question " + (questionCount + 1) + " of " + questionList.length;
  question.textContent = questionList[currentQuestion].question;
  possibleAnswer.innerHTML = "";
  questionList[currentQuestion].multipleChoice.forEach((multipleChoice) => {
    var button = document.createElement("button");
    var list = document.createElement("li");
    button.textContent = multipleChoice;

    possibleAnswer.appendChild(list);
    list.appendChild(button);
  });

  let element = event.target;
  if (
    element.textContent ===
    questionList[currentQuestion].multipleChoice[
      questionList[currentQuestion].answer
    ]
  ) {
    correct++;
    console.log(correct);
  }
  console.log(currentQuestion);
  currentQuestion++;
  questionCount++;
  if (questionCount == questionList.length) {
    endQuiz();
  }
}

// Check if answer is correct
// possibleAnswer.button.addEventListener("click",
// function (event) {
//
//   if (
//     element.textContent ===
//     questionList[i].multipleChoice[questionList[i].answer]
//   ) {
//     correct++;
//     console.log(correct);
//   }
//   console.log(i);
//   i++;
// });
possibleAnswer.addEventListener("click", displayQuestion);

function beginQuiz() {
  introQuiz.style.display = "none";

  displayQuestion();
}

function endQuiz() {
  questionContainer.style.display = "none";
}
// function highScore() {}

availableQuestion();
