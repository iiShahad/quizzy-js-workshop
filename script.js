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


//-----------------Selectors-----------------
//1. Start Page Selectors
const startPage = document.getElementById('start-page');
const startQuizBtn = document.getElementById('start-quiz-btn');

//2. Quiz Page Selectors
const quizPage = document.getElementById('quiz-page');
const question = document.getElementById('question');
const options = document.querySelectorAll('.quiz__option');

//3. Result Page Selectors
const resultPage = document.getElementById('result-page');

//-----------------Event Listeners-----------------
//1. Start Page Event Listeners
startQuizBtn.addEventListener('click', startQuiz);
options.forEach(option => {
    option.addEventListener('click', checkAnswer);
});

//-----------------Main Functionality-----------------
//1. Start Page Functionality
function startQuiz() {
    startPage.classList.add('hidden');
    quizPage.classList.remove('hidden');
    loadQuestion();
}

//2. Quiz Page Functionality
function loadQuestion() {
    question.textContent = dummyData[currentQuestion].question;
    options.forEach((option, index) => {
        option.textContent = dummyData[currentQuestion].options[index];
    });
}

function checkAnswer(e) {
    if (e.target.textContent === dummyData[currentQuestion].answer) {
        score++;
        e.target.classList.add('button--correct');
    }else{
        e.target.classList.add('button--incorrect');
    }

    setTimeout(() => {
        nextQuestion(e);
    }, 2000)
}

function nextQuestion(e) {
    e.target.classList.remove('button--correct');
    e.target.classList.remove('button--incorrect');
    currentQuestion++;
    if (currentQuestion < dummyData.length) {
        loadQuestion();
    } else {
        showResult();
    }
}

