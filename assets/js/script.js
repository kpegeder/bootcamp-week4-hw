const questionList = [
  {
    question: "What tag is used for JavaScript?",
    multipleChoice: ["<head>", "<body>", "<script>", "<button>"],
    answer: 2
  },
  {
    question: 'What syntax is used to refer to an external code, "hello.js"?',
    multipleChoice: [
      '<script src="hello.js">',
      '<script name="hello.js">',
      '<script hreg="hello.js">',
      "None of the above"
    ],
    answer: 0
  },
  {
    question: "Var is used to define which data types?",
    multipleChoice: ["String", "Numbers", "Booleans", "All of the above"],
    answer: 3
  },
  {
    question: "Prompt can be used to get true or false reponse?",
    multipleChoice: ["True", "False"],
    answer: 0
  },
  {
    question:
      "The ______ method displays an alert box with a specified message and an OK button.",
    multipleChoice: ["confirm()", "alert()", "prompt()", "None of the above"],
    answer: 1
  },
  {
    question: "JavaScript can be use to change the html code?",
    multipleChoice: ["True", "False"],
    answer: 0
  },
  {
    question:
      "The setInterval() method calls a function or evaluates an expression at specified intervals measure in ______ .",
    multipleChoice: ["seconds", "minutes", "milliseconds", "None of the above"],
    answer: 2
  },
  {
    question: "A loop will continue until the condition is ",
    multipleChoice: ["True", "False"],
    answer: 1
  },
  {
    question: "Methods to navigate teh DOM",
    multipleChoice: [
      "getElementById",
      "childNodes",
      "nextSibling",
      "All of the above"
    ],
    answer: 3
  },
  {
    question: "A condition is wrapped by ",
    multipleChoice: ["brackets", "parentheses", "curly brackets"],
    answer: 1
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
let count = 0;
let availableQuestion = [];
let currentQuestion = 0;
let answerNumber = [];
let score;

startQuiz.addEventListener("click", beginQuiz);

// Display Intro to Quiz
function beginQuiz() {
  console.log("Start Quiz");
  introQuiz.innerHTML = "";
  setQuestion();
}

possibleAnswer.addEventListener("click", setQuestion);

// Display question
function setQuestion() {
  // Check status of question
  if (count == questionList.length) {
    endQuiz();
    return;
  }
  // Display Question Number
  questionNumber.textContent =
    "Question " + (count + 1) + " of " + questionList.length;
  // Display Questions and Answers
  question.textContent = questionList[count].question;
  console.log("Display Question " + (count + 1));
  // Clear the list of answers
  possibleAnswer.textContent = "";
  // Create List and Button
  for (let j = 0; j < questionList[count].multipleChoice.length; j++) {
    let listMultiChoice = document.createElement("li");
    let btnMultiChoice = document.createElement("button");
    btnMultiChoice.textContent = questionList[count].multipleChoice[j];

    btnMultiChoice.addEventListener("click", checkAnwser);
    possibleAnswer.append(listMultiChoice);
    listMultiChoice.append(btnMultiChoice);
  }

  // console.log("Count = " + count);
  // console.log("Correct " + correct);
}

function checkAnwser() {
  let element = event.target;
  console.log("Select Answer " + element.textContent);
  console.log(
    "Answer " + questionList[count].multipleChoice[questionList[count].answer]
  );
  if (
    element.textContent ===
    questionList[count].multipleChoice[questionList[count].answer]
  ) {
    correct++;
    console.log("Correct " + correct);
  }
  // Create and else with a penalty

  console.log("Current " + count);

  count++;
}

// Get all the answer values
// function answerList() {
//   const totalQuestion = questionList.length;
//   for (let i = 0; i < totalQuestion; i++) {
//     answerNumber.push(questionList[i].answer);
//     availableQuestion.push(questionList[i].question);
//   }
//   console.log(answerNumber, availableQuestion);
// }
// answerList();

function endQuiz() {
  questionContainer.innerHTML = "";
  // Page set up
}

// function recordScore() {
//   // Check localStorage for users
//   let user = {
//     user: user,
//     score: correct
//   };
//   localStorage.setItem("user", JSON.stringify(user));
// }

// function highScore() {}
