const quizData = [
    {
        picture: "Q1",
        question: "Which one of these is NOT one of Batman's sidekicks?",
        a: "Jason Todd",
        b: "Dick Grayson",
        c: "Damian Wayne",
        d: "Victor Zsasz",
        correct: "d",
    },
    {
        picture: "Q2",
        question: "What color is Superman's friend, Jimmy Olsen's hair?",
        a: "Red",
        b: "Blond",
        c: "Black",
        d: "Brown",
        correct: "a",
    },
    {
        picture: "Q3",
        question: "Where does the Justice League go to meet and talk about their plans?",
        a: "The S.H.I.E.L.D. Helicarrier",
        b: "The Hall of Justice",
        c: "Titans' Tower",
        d: "The Fortress of Solitude",
        correct: "b",
    },
    {
        picture: "Q4",
        question: "Which popular Iron Man suit debuted in Iron Man 3?",
        a: "Mark I",
        b: "Mark III",
        c: "Mark V",
        d: "Mark XLII",
        correct: "d",
    },
    {
        picture: "Q5",
        question: "What unique memorabilia ACTUALLY exists in the batcave?",
        a: "A Kryptonite-based lazer",
        b: "An animatronic T-rex",
        c: "A talking puppet",
        d: "A 1920s style telephone booth",
        correct: "b",
    },
    {
        picture: "Q6",
        question: "What is the name of Wonder Woman's home, where the Amazons live?",
        a: "Amazonia",
        b: "Sylor",
        c: "Themyscira",
        d: "Amophine",
        correct: "c",
    },
    {
        picture: "Q7",
        question: "How did Daredevil get his superpowers?",
        a: "An acid truck",
        b: "Nuclear implosion at factory",
        c: "Ancient artifact",
        d: "Expiremented on",
        correct: "a",
    },
    {
        picture: "Q8",
        question: "Which popular Marvel character CANNOT lift Mjolnir, Thor's Hammer?",
        a: "Captain America",
        b: "Hulk",
        c: "Vision",
        d: "Jane Foster",
        correct: "b",
    },
];

const quiz= document.getElementById('quiz')
const quizPicture = document.getElementById('quizPicture')
const answerEls = document.querySelectorAll('.answer')
const questionEl = document.getElementById('question')
const questionNumber = document.getElementById('questionNumber')
const a_text = document.getElementById('a_text')
const b_text = document.getElementById('b_text')
const c_text = document.getElementById('c_text')
const d_text = document.getElementById('d_text')
const submitBtn = document.getElementById('submit')


let currentQuiz = 0
let score = 0

loadQuiz()

function loadQuiz() {

    deselectAnswers()

    const currentQuizData = quizData[currentQuiz]

    quizPicture.innerHTML = `<img src="static/surveypics/superheroquiz/${currentQuizData.picture}.png" height="180px" alt="${currentQuizData.picture}">`
    questionEl.innerText = currentQuizData.question
    questionNumber.innerText = "Q" + (currentQuiz + 1) + "."
    a_text.innerText = currentQuizData.a
    b_text.innerText = currentQuizData.b
    c_text.innerText = currentQuizData.c
    d_text.innerText = currentQuizData.d
}

function deselectAnswers() {
    answerEls.forEach(answerEl => answerEl.checked = false)
}

function getSelected() {
    let answer
    answerEls.forEach(answerEl => {
        if(answerEl.checked) {
            answer = answerEl.id
        }
    })
    return answer
}

submitBtn.addEventListener('click', () => {
    const answer = getSelected()
    if(answer) {
        if(answer === quizData[currentQuiz].correct) {
            score++
        }

        currentQuiz++

        if(currentQuiz < quizData.length) {
            loadQuiz()
        } else {
            quiz.innerHTML = `
            <div class="surveyCard">
				<h2 style="color: #2867ae; font-size: 220%;">Results:</h2>
				<hr>
                <br><br>
				<div class="surveyOptionsList">
					<h3 style="font-size: 190%; color: #2867ae; text-align: center;">You got ${score}/${quizData.length} correct!</h3>
				</div>
                <br><br>
				<button type="button" onclick="location.reload()" class="nextButton">Retry</button>
			</div>
            `
        }
    }
})