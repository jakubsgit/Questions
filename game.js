const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById('progressBarFull');


let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionsCounter = 0;
let availableQuestions = [];

let questions = [
    {
        question: "Kto tańczy najbardziej jak szalony?",
        choice1: "Marcin",
        choice2: "Bartek",
        choice3: "Łukasz",
        choice4: "Rafał",
        answer: 2
    },
    {
        question: "Kto tańczy jakby miał się skończyć świat?",
        choice1: "Bartek",
        choice2: "Zygmunt",
        choice3: "Mirek",
        choice4: "Władysław",
        answer: 1
    },
    {
        question: "Tancerz, który zapomniał jak się tańczy nieszalenie to...",
        choice1: "Dawid",
        choice2: "Nie bartek",
        choice3: "Bartek",
        choice4: "Jakub",
        answer: 3
    },
    {
        question: "Uznano go za szaleńca, bo tańczył najlepiej z nich...",
        choice1: "Sławek",
        choice2: "Dionizy",
        choice3: "Nie wiem",
        choice4: "Bartek",
        answer: 4
    }
];


/*Constans*/

const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3;

startGame = () => {
    questionsCounter = 0;
    score = 0;
    availableQuestions = [... questions];
    getNewQuestion();
};


getNewQuestion = () => {

    if (availableQuestions.length === 0 || questionsCounter >= MAX_QUESTIONS){
        localStorage.setItem("mostRecentScore", score);
        /*go to the end page*/
        return window.location.assign("/end.html")
    };

    questionsCounter++;
    progressText.innerText = "Question " + questionsCounter + "/" + MAX_QUESTIONS;
    let progressBarStyle = ((questionsCounter/MAX_QUESTIONS)* 100)+ '%';
    progressBarFull.style.width = progressBarStyle;


    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach( choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number]
    });

    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;

};

choices.forEach(choice => {
    choice.addEventListener("click", e => {
        if(!acceptingAnswers) return;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        const classToAplly = 
            selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

        if(classToAplly === 'correct') {
            incrementScore(CORRECT_BONUS);
        }

        
       selectedChoice.parentElement.classList.add(classToAplly);
        setTimeout( () => {
            selectedChoice.parentElement.classList.remove(classToAplly);
            getNewQuestion();
        }, 1000)
    });
});

incrementScore = num => {
    score += num;
    scoreText.innerText = score;
}


startGame ();
