const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector("#progressBarFull");

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let avaliableQuestions = [];

let questions = [
    {
        question: "What is 5 + 3?",
        choice1: '2',
        choice2: '4',
        choice3: "8",
        choice4: "10",
        answer: 3
    },
    {
        question: "Inside which HTML element do we put the JavaScript?",
        choice1: "<script>",
        choice2: "<p>",
        choice3: "<body>",
        choice4: "<html>",
        answer: 1
    },
    {
        question: "Which type of languge is JavaScript?",
        choice1: "Object-Oriented",
        choice2: "Object-Based",
        choice3: "Assembly-Language",
        choice4: "High-Level",
        answer: 2
    },
    {
        question: "Which one of the following also known as Conditional Expression:",
        choice1: "Alternative to if-else",
        choice2: "Switch statement",
        choice3: "If-then-else statement",
        choice4: "Immediate if",
        answer: 4
    }
];

const SCORE_POINTS = 100;
const MAX_QUESTIONS = 4;

// Every time user refresh the page, this function runs
startGame = () => {
    questionCounter = 0;
    score = 0;
    avaliableQuestions = [...questions];
    getNewQuestion();
}

getNewQuestion = () => {
    if(avaliableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score); // Save the score of the user in the LocalStorage
        return window.location.assign('/end.html');
    }
    // Showing the progress of the game
    questionCounter++;
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`;
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`;

    // Shows the question randomly every time the user loads the page
    const questionIndex = Math.floor(Math.random() * avaliableQuestions.length);
    currentQuestion = avaliableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });

    avaliableQuestions.splice(questionIndex, 1);

    acceptingAnswers = true;
}

// Get the selected option
choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target; // Store the value where the user clic
        const selectedAnswer = selectedChoice.dataset['number']; // Store the index of the question
        // Store the correct/incorrect CSS class in this variable comparing the index of the question with the index of the correct answer
        // in the current question
        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

        if (classToApply === 'correct') {
            incrementScore(SCORE_POINTS);
        }

        // Apply any class to HTML Element, in this case, for the choice-container div class
        selectedChoice.parentElement.classList.add(classToApply);

        // Pass to the next question with a timeout
        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion()
        }, 1000);
    });
});

incrementScore = num => {
    score += num;
    scoreText.innerText = score;
}

startGame();