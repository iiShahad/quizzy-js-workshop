//-----------------Selectors-----------------
//1. Start Page Selectors
const startPage = document.getElementById('start-page');
const startQuizBtn = document.getElementById('start-quiz-btn');
//2. Quiz Page Selectors
const quizPage = document.getElementById('quiz-page');
//3. Result Page Selectors
const resultPage = document.getElementById('result-page');

//-----------------Event Listeners-----------------
//1. Start Page Event Listeners
startQuizBtn.addEventListener('click', startQuiz);

//-----------------Main Functionality-----------------
//1. Start Page Functionality
function startQuiz() {
    startPage.classList.add('hidden');
    quizPage.classList.remove('hidden');
}