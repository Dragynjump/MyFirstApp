const quizData = [
    {
        picture: "Q1",
        question: "What is Harry's aunt's name?",
        a: "Beru",
        b: "Madeline",
        c: "Petunia",
        d: "Mary Ann",
        correct: "c",
    },
    {
        picture: "Q2",
        question: "On the train to Hogwarts, what is the first Wizarding card Harry received?",
        a: "Severus Snape",
        b: "Albus Dumbledore",
        c: "Salezar Slytherin",
        d: "Nicholas Flamel",
        correct: "b",
    },
    {
        picture: "Q3",
        question: "What is the name of the potion that transforms the user into someone else?",
        a: "Figura Potion",
        b: "Dandelis Potion",
        c: "Mandrake Potion",
        d: "PolyJuice Potion",
        correct: "d",
    },
    {
        picture: "Q4",
        question: "What animal is Harry's patronus?",
        a: "A doe",
        b: "A stag",
        c: "A fox",
        d: "An owl",
        correct: "b",
    },
    {
        picture: "Q5",
        question: "What childhood nickname did Sirius Black use with his friends?",
        a: "Padfoot",
        b: "Prongs",
        c: "Cubwort",
        d: "Moony",
        correct: "a",
    },
    {
        picture: "Q6",
        question: "Who opened the Chamber of Secrets?",
        a: "Malfoy",
        b: "Harry",
        c: "Gilderoy Lockhart",
        d: "Ginny",
        correct: "d",
    },
    {
        picture: "Q7",
        question: "What is the name of the bar that leads to Diagon Alley?",
        a: "The Spinning Broomstick",
        b: "The Leaky Cauldron",
        c: "Bertie Botts",
        d: "Hogsmeade",
        correct: "b",
    },
    {
        picture: "Q8",
        question: "Which dragon did Harry face in The Goblet of Fire?",
        a: "Norwegian Ridgeback",
        b: "Chinese Fireball",
        c: "Hungarian Horntail",
        d: "Common Welsh Green",
        correct: "c",
    },
    {
        picture: "Q9",
        question: "What is the name of the luck potion Harry earned in The Half-Blood Prince?",
        a: "Felix Felicis",
        b: "PolyJuice",
        c: "Amortentia",
        d: "Veritaserum",
        correct: "a",
    },
    {
        picture: "Q10",
        question: "Which teacher has NOT been a Defence Against the Dark Arts teacher?",
        a: "Snape",
        b: "Professor Quirrel",
        c: "Mad-Eye Moody",
        d: "Professor Flitwick",
        correct: "d",
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

    quizPicture.innerHTML = `<img src="static/surveypics/harrypotterquiz/${currentQuizData.picture}.png" height="180px" alt="${currentQuizData.picture}">`
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
                <div class="nextButton">
				    <button type="button" onclick="location.reload()">Retry</button>
                <div>
			</div>
            `
        }
    }
})