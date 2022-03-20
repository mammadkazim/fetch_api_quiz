const quizQuestion = document.querySelector('.quizQuestion'),
 quizWrapper = document.querySelector('.quizWrapper'),
 container = document.querySelector('.container'),
 quizTrue = document.querySelector('.quizTrue'),
 quizFalse = document.querySelector('.quizFalse'),
 checkBtn = document.querySelector('.checkAnswer');
 tryAgainBtn = document.querySelector('.tryAgain');
 showResultsBtn = document.querySelector('.showResults');

 let trueCount = 0, falseCount = 0
 quizTrue.textContent = trueCount
 quizFalse.textContent = falseCount

const url = 'https://opentdb.com/api.php?amount=10&category=22&type=multiple'
let questions=[]
let correctAnswer

fetch(url)
.then(response=>response.json())
.then(data=>{
    console.log(data)
    questions = data.results;
    console.log(questions)
    showQuestion()
})
function showQuestion(){
    let quiz = questions.shift()
    quizQuestion.innerHTML = quiz.question;
    correctAnswer = quiz.correct_answer
    let incorrectAnswers = quiz.incorrect_answers
    let answers = incorrectAnswers
    let random = Math.floor(Math.random()*3)
    answers.splice(random,0,correctAnswer)
    answers.forEach(item=>{
        let quizOption = document.createElement('div')
        quizWrapper.append(quizOption)
        quizOption.setAttribute('class','quizOption')
        quizOption.innerHTML = item
        quizOption.onclick = optionSelect
    })
}
function optionSelect(e){
    let active = document.querySelector('.active')
    if(active){
        active.classList.remove('active')
    }
    e.target.classList.add('active')
}

checkBtn.addEventListener('click',checkAnswer)
function checkAnswer(){
    let active = quizWrapper.querySelector('.active')
    if(active){
        verifyAnswer()
    } else{
        alert('choose answer')
    }
}

function verifyAnswer(){
    let active = document.querySelector('.active')
    if(active.textContent === correctAnswer){
        trueCount++
    } else if(active.textContent !== correctAnswer){
        falseCount++
    }
    quizTrue.textContent = trueCount
    quizFalse.textContent = falseCount
    quizWrapper.innerHTML = null
    if(trueCount + falseCount<10) showQuestion()
    if(trueCount + falseCount===10) showResult()

}
function showResult(){
    quizQuestion.innerHTML = 'You finished the quiz'
    trueCount > 5 ? quizWrapper.innerHTML = "Congratulations. You passed the exam" :
    quizWrapper.innerHTML = "You failed. Try again"
    quizWrapper.style.display = "block"
    checkBtn.style.display ='none'
    tryAgainBtn.style.display ='block'
    showResultsBtn.style.display ='block'

}
tryAgainBtn.addEventListener('click',()=>{
    location.reload();
    return false;
})
showResultsBtn.addEventListener('click',()=>{
    
})