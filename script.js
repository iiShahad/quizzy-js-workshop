const dummyData = [
    {
        question: "What does 'NaN' stand for in JavaScript?",
        options: [
            "Not a Number",
            "Not a Null",
            "Name a Number",
            "Number a Number"
        ],
        answer: "Not a Number"
    },
    {
        question: "Which of the following is a JavaScript data type?",
        options: [
            "String",
            "Boolean",
            "Undefined",
            "All of the above"
        ],
        answer: "All of the above"
    },
    {
        question: "What keyword is used to declare a variable in JavaScript?",
        options: [
            "var",
            "let",
            "const",
            "All of the above"
        ],
        answer: "All of the above"
    },
    {
        question: "Which method is used to convert a JSON string into a JavaScript object?",
        options: [
            "JSON.stringify()",
            "JSON.parse()",
            "JSON.object()",
            "JSON.convert()"
        ],
        answer: "JSON.parse()"
    },
    {
        question: "What is the output of 'typeof null' in JavaScript?",
        options: [
            "null",
            "object",
            "undefined",
            "NaN"
        ],
        answer: "object"
    },
    {
        question: "Which of the following is NOT a JavaScript framework?",
        options: [
            "React",
            "Vue",
            "Django",
            "Angular"
        ],
        answer: "Django"
    },
    {
        question: "How can you create a function in JavaScript?",
        options: [
            "function myFunction() {}",
            "function:myFunction() {}",
            "create myFunction() {}",
            "function = myFunction() {}"
        ],
        answer: "function myFunction() {}"
    },
    {
        question: "What does the 'this' keyword refer to in JavaScript?",
        options: [
            "The current object",
            "The previous object",
            "The global object",
            "None of the above"
        ],
        answer: "The current object"
    }
];


//-----------------Global Variables-----------------
let currentQuestion = 0;
let score = 0;
let time = 60;
let shuffledData;
let timerInterval;


//-----------------Selectors-----------------
//1. Start Page Selectors
const startPage = document.getElementById('start-page');
const startQuizBtn = document.getElementById('start-quiz-btn');

//2. Quiz Page Selectors
const quizPage = document.getElementById('quiz-page');
const question = document.getElementById('question');
const options = document.querySelectorAll('.quiz__option');
const nextBtn = document.getElementById('next-btn');
const stopBtn = document.getElementById('stop-btn');
const scoreDisplay = document.querySelectorAll('.score');
const timer = document.getElementById('timer');
const progressBar = document.getElementById('progress-bar');
const progress = document.getElementById('progress');

//3. Result Page Selectors
const resultPage = document.getElementById('result-page');
const restartBtn = document.getElementById('restart-btn');

//-----------------Event Listeners-----------------
//1. Start Page Event Listeners
startQuizBtn.addEventListener('click', startQuiz);

//2. Quiz Page Event Listeners
options.forEach(option => {
    option.addEventListener('click', checkAnswer);
});

nextBtn.addEventListener('click', nextQuestion);
stopBtn.addEventListener('click', showResult);

//3. Result Page Event Listeners
restartBtn.addEventListener('click', startQuiz);

//-----------------Main Functionality-----------------
//1. Start Page Functionality
function startQuiz() {
    currentQuestion = 0;
    score = 0;
    time = 60;
    shuffledData = shuffle(dummyData.slice()); //slice() is used to create a copy of the array
    startPage.classList.add('hidden');
    quizPage.classList.remove('hidden');
    options.forEach(option => {
        option.classList.remove('button--correct');
        option.classList.remove('button--incorrect');
    });
    updateProgressBar();
    displayScore();
    loadQuestion();
    startTimer();
}

function startTimer() {
    timer.textContent = formatSeconds(time);
    timerInterval = setInterval(() => {
        time--;
        if (time <= 0) {
            showResult();
            return;
        }
        timer.textContent = formatSeconds(time);
    }, 1000);
}

//2. Quiz Page Functionality
function loadQuestion() {
    question.textContent = shuffledData[currentQuestion].question;
    options.forEach((option, index) => {
        option.textContent = shuffledData[currentQuestion].options[index];
    });
}

function checkAnswer(e) {
    disableOptions();
    if (e.target.textContent === shuffledData[currentQuestion].answer) {
        score++;
        e.target.classList.add('button--correct');
    }else{
        e.target.classList.add('button--incorrect');
    }
    displayScore();
}


function disableOptions() {
    options.forEach(option => {
        option.disabled = true;
        option.style.pointerEvents = 'none'; 
    });
}

function nextQuestion(e) {
    options.forEach(option => {
        option.classList.remove('button--correct');
        option.classList.remove('button--incorrect');
        option.disabled = false;
        option.style.pointerEvents = 'auto';
    });
    currentQuestion++;
    if (currentQuestion < shuffledData.length - 1) {
        updateProgressBar();
        loadQuestion();
    } else {
        showResult();
    }
}

function displayScore() {
    scoreDisplay.forEach(display => {
        display.textContent = score;
    });
};


function updateProgressBar() {
    let currentProgress = (currentQuestion + 1) / shuffledData.length * 100;
    progressBar.style.width = `${currentProgress}%`;
    progress.textContent = `${Math.ceil(currentProgress)}%`;
}

//3. Result Page Functionality
function showResult() {
    clearInterval(timerInterval);
    quizPage.classList.add('hidden');
    resultPage.classList.remove('hidden');
    displayScore();
}


//-----------------Utility-----------------
function formatSeconds(seconds) {
    let minutes = Math.floor(seconds / 60);
    let remainingSeconds = seconds % 60;

    let formattedMinutes = String(minutes).padStart(2, '0');
    let formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
 };

 function shuffle(array){
    for(let i = array.length - 1; i > 0; i--){
        let j = Math.floor(Math.random() * i);
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
 }
