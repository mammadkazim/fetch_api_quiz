const quizQuestion = document.querySelector('.quizQuestion'),
    quizWrapper = document.querySelector('.quizWrapper'),
    container = document.querySelector('.container'),
    quizTrue = document.querySelector('.quizTrue'),
    quizFalse = document.querySelector('.quizFalse'),
    checkBtn = document.querySelector('.checkAnswer'),
    tryAgainBtn = document.querySelector('.tryAgain'),
    showResultsBtn = document.querySelector('.showResults'),
    resultsContainer = document.querySelector('.resultsContainer'),
    resultsHeading = document.querySelector('.resultsHeading'),
    questionsContainer = document.querySelector('.questionsContainer');

let trueCount = 0,
    falseCount = 0
quizTrue.textContent = trueCount
quizFalse.textContent = falseCount

let questions = []
let questionsAll = []
let correctAnswer
let correctAnswerIndex = []
let UserAnswers = []

const url = 'https://opentdb.com/api.php?amount=10&category=22&type=multiple'
fetch(url)
    .then(response => response.json())
    .then(data => {
        questions = data.results;
        console.log(questions)
        showQuestion()
    })

function showQuestion() {
    let quiz = questions.shift()
    questionsAll.push(quiz)
    quizQuestion.innerHTML = `<div style="font-size:18px;font-weight:500;font-style:italic;margin-bottom:10px"> Category: ${quiz.category}; <span>Difficulty: ${quiz.difficulty}</span></div> <div>${quiz.question}</div>`;
    correctAnswer = quiz.correct_answer
    let incorrectAnswers = quiz.incorrect_answers
    let answers = incorrectAnswers
    let random = Math.floor(Math.random() * 3)
    correctAnswerIndex.push(random)
    answers.splice(random, 0, correctAnswer)
    answers.forEach(item => {
        let quizOption = document.createElement('div')
        quizWrapper.append(quizOption)
        quizOption.setAttribute('class', 'quizOption')
        quizOption.innerHTML = item
        quizOption.onclick = optionSelect
    })
}

function optionSelect(e) {
    let active = document.querySelector('.active')
    if (active) {
        active.classList.remove('active')
    }
    e.target.classList.add('active')
}

checkBtn.addEventListener('click', checkAnswer)

function checkAnswer() {
    let active = quizWrapper.querySelector('.active')
    if (active) {
        verifyAnswer()
    } else {
        alert('choose answer')
    }
}

function verifyAnswer() {
    let active = document.querySelector('.active')
    UserAnswers.push(active.textContent)
    if (active.textContent === correctAnswer) {
        trueCount++
    } else if (active.textContent !== correctAnswer) {
        falseCount++
    }
    quizTrue.textContent = trueCount
    quizFalse.textContent = falseCount
    quizWrapper.innerHTML = null
    if (trueCount + falseCount < 10) showQuestion()
    if (trueCount + falseCount === 10) showResult()

}

function showResult() {
    quizQuestion.innerHTML = 'You finished the quiz'
    trueCount > 5 ? quizWrapper.innerHTML = "Congratulations. You passed the exam" :
        quizWrapper.innerHTML = "You failed. Try again"
    quizWrapper.style.display = "block"
    checkBtn.style.display = 'none'
    tryAgainBtn.style.display = 'block'
    showResultsBtn.style.display = 'block'

}
tryAgainBtn.addEventListener('click', () => {
    location.reload();
    return false;
})
showResultsBtn.addEventListener('click', () => {
    console.log(questionsAll)
    resultsHeading.innerHTML = 'Review your answers and correct answers: <div style="font-size:18px;font-style:italic;margin-top:6px">Correct answer is green and bold;<br>Your answer is icalic and bold!</div>'
    for (let i = 0; i < questionsAll.length; i++) {
        let question = document.createElement('div')
        questionsContainer.append(question)
        question.setAttribute('class', 'question')
        question.innerHTML = questionsAll[i].question
        let answers = document.createElement('div')
        answers.setAttribute('class', 'answers')
        questionsContainer.append(answers)
        for (let j = 0; j < questionsAll[i].incorrect_answers.length; j++) {
            let answer = document.createElement('div')
            answer.setAttribute('class', 'answer')
            answer.innerHTML = ` - ${questionsAll[i].incorrect_answers[j]}`
            answers.append(answer)
            if (correctAnswerIndex[i] === j) {
                answer.style.color = 'green'
                answer.style.fontWeight = '600'
            }
            if (questionsAll[i].incorrect_answers[j] === UserAnswers[i]) {
                answer.style.fontWeight = '600'
                answer.style.fontStyle = 'italic'
            }
        }
        const questionResult = document.createElement('div')
        questionResult.setAttribute('class', 'questionResult')
        answers.append(questionResult)
        if (UserAnswers[i] === questionsAll[i].correct_answer) {
            questionResult.innerHTML = 'Correct answer'
        } else {
            questionResult.innerHTML = 'Wrong answer'
        }
    }
})