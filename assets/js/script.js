// Create question array of objects
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

// Get access html element
const startQuiz = document.querySelector(".startBtn");
const introQuiz = document.querySelector(".introQuiz");

const questionContainer = document.querySelector(".question-container");
const questionNumber = document.querySelector(".questionNumber");
const question = document.querySelector(".questions");
const possibleAnswer = document.querySelector(".possibleAnswers");

const recordScore = document.querySelector(".record-score");
const userName = document.querySelector("#userName");
const user = document.querySelector("#user");
const userList = document.querySelector("#user-list");
const recordBtn = document.querySelector(".recordBtn");

const highscore = document.querySelector(".highscore");
const clearBtn = document.querySelector(".clearBtn");
const backBtn = document.querySelector(".backBtn");
const timeEl = document.querySelector(".time");

const seeHighscore = document.querySelector(".visitHighscore");

// Define variables
let secondsLeft = 60;
let correct = 0;
let count = 0;
let record = [];

timeEl.textContent = "Time: " + secondsLeft;

startQuiz.addEventListener("click", beginQuiz);
recordScore.style.display = "none";
highscore.style.display = "none";

// Display Intro to Quiz
function beginQuiz() {
  introQuiz.style.display = "none";
  setQuestion();
  setTime();
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
    possibleAnswer.appendChild(listMultiChoice);
    listMultiChoice.appendChild(btnMultiChoice);
    btnMultiChoice.setAttribute("class", "btn");
  }
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
  } else {
    secondsLeft -= 9;
    console.log("wrong answer");
  }

  count++;
}

function endQuiz() {
  questionContainer.innerHTML = "";
  recordScore.style.display = "block";

  // Display score
  let h1 = document.createElement("h1");
  let p = document.createElement("p");

  h1.textContent = "All Done!!!";
  p.textContent = "Your score is " + correct;
  recordScore.appendChild(h1);
  recordScore.appendChild(p);
  recordScore.insertBefore(h1, recordScore.childNodes[0]);
  recordScore.insertBefore(p, recordScore.childNodes[1]);
}

recordBtn.addEventListener("click", recordUser);
recordBtn.addEventListener("click", renderUser);

init();

function recordUser() {
  recordScore.style.display = "none";
  event.preventDefault();
  let userID = {
    name: userName.value.trim(),
    score: correct
  };
  if (userID.name === "") {
    return;
  }
  // Add to record of high score
  record.push(userID);
  userName.value = "";

  // Update high score
  storeHighScore();
}

function storeHighScore() {
  localStorage.setItem("userID", JSON.stringify(record));
}

function init() {
  let storedUsers = JSON.parse(localStorage.getItem("userID"));
  if (storedUsers !== null) {
    record = storedUsers;
  }
}

function renderUser() {
  event.preventDefault();
  highscore.style.display = "block";
  timeEl.style.display = "none";

  for (let k = 0; k < record.length; k++) {
    // Get user name and score
    let quizTaker = record[k].name;
    let scoreTaker = record[k].score;

    // Create list of quiz takers
    let li = document.createElement("li");
    li.textContent = quizTaker + " = " + scoreTaker;
    userList.appendChild(li);
  }
}

// Create timer for quiz
function setTime() {
  let timerInterval = setInterval(function () {
    secondsLeft--;
    console.log(secondsLeft);

    timeEl.textContent = "Time: " + secondsLeft;

    if (secondsLeft <= 0 || count == questionList.length) {
      clearInterval(timerInterval);
      timeEl.textContent = "Time: 0";
    }
  }, 1000);
}

// Clear highscore
clearBtn.addEventListener("click", clearHighscore);
function clearHighscore() {
  console.log("Clear Highscore");
  localStorage.clear();
  userList.innerHTML = "";
}

// Back button
backBtn.addEventListener("click", goBack);
function goBack() {
  console.log("Back");
  location.reload();
}

seeHighscore.addEventListener("click", displayHighScore);

function displayHighScore() {
  introQuiz.style.display = "none";
  renderUser();
}
