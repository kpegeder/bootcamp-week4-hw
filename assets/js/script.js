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
    question: "Methods to navigate the DOM",
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

// Get stored quiz takers
init();

timeEl.textContent = "Time: " + secondsLeft;

startQuiz.addEventListener("click", beginQuiz);

// Hide displays
recordScore.style.display = "none";
highscore.style.display = "none";

possibleAnswer.addEventListener("click", setQuestion);

// Record quiz taker
recordBtn.addEventListener("click", recordUser);

// Display high score users
recordBtn.addEventListener("click", renderUser);

// Clear highscore
clearBtn.addEventListener("click", clearHighscore);

// Display highscore from home page
seeHighscore.addEventListener("click", renderUser);

// Back button
backBtn.addEventListener("click", goBack);

// Display Intro to Quiz
function beginQuiz() {
  introQuiz.style.display = "none";
  setQuestion();
  setTime();
}

// Display question
function setQuestion() {
  // Check status of question
  if (count == questionList.length || secondsLeft <= 0) {
    endQuiz();
    return;
  }
  // Display Question Number
  questionNumber.textContent =
    "Question " + (count + 1) + " of " + questionList.length;
  // Display Questions and Answers
  question.textContent = questionList[count].question;
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

// See if the answer correct and create a penalty
function checkAnwser() {
  let element = event.target.textContent;
  document.body.style.transition = "all 0.7s";
  if (
    element === questionList[count].multipleChoice[questionList[count].answer]
  ) {
    correct += 5;
    document.body.style.backgroundColor = "green";
  } else {
    secondsLeft -= 4;
    document.body.style.backgroundColor = "red";
  }
  setTimeout(function () {
    document.body.style.backgroundColor = "white";
  }, 1000);
  count++;
}

// Show show and get user name
function endQuiz() {
  questionContainer.innerHTML = "";
  recordScore.style.display = "block";

  // Display score by adding html elements
  let h1 = document.createElement("h1");
  let p = document.createElement("p");

  h1.textContent = "All Done!!!";
  p.textContent = "Your score is " + correct;
  recordScore.appendChild(h1);
  recordScore.appendChild(p);
  recordScore.insertBefore(h1, recordScore.childNodes[0]);
  recordScore.insertBefore(p, recordScore.childNodes[1]);

  secondsLeft = 0;
}

// Record the quiz taker function
function recordUser() {
  recordScore.style.display = "none";

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

// Store high score
function storeHighScore() {
  localStorage.setItem("userID", JSON.stringify(record));
}

// Get stored users
function init() {
  let storedUsers = JSON.parse(localStorage.getItem("userID"));
  if (storedUsers !== null) {
    record = storedUsers;
  }
}

// Show quiz taker function
function renderUser() {
  event.preventDefault();
  introQuiz.style.display = "none";
  timeEl.style.display = "none";
  highscore.style.display = "block";

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

    timeEl.textContent = "Time: " + secondsLeft;

    if (secondsLeft <= 0) {
      clearInterval(timerInterval);
      timeEl.textContent = "Time: 0";
    }
  }, 1000);
}

// Clear highscore function
function clearHighscore() {
  localStorage.clear();
  userList.innerHTML = "";
}

// Go back function
function goBack() {
  location.reload();
}
