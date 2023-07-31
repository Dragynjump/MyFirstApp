const quizData = [
    {
        picture: "Q1",
        question: "Which spell can unlock doors?",
        a: "Expelliarmus",
        b: "Alohamora",
        c: "Quietus",
        d: "Rictusempra",
        correct: "b",
    },
    {
        picture: "Q2",
        question: "What spell did Albus Dumbledore use to stop Harry dying from falling off his broom at Quidditch?",
        a: "Arresto Momentum",
        b: "Wingardium Leviosa",
        c: "Slugulus Eructo",
        d: "Descendo",
        correct: "a",
    },
    {
        picture: "Q3",
        question: "What spell makes its target larger?",
        a: "Bombarda Maxima",
        b: "Engorgio",
        c: "Lumos Maxima",
        d: "Riddikulus",
        correct: "b",
    },
    {
        picture: "Q4",
        question: "Which spell did Hermione use twice to fix Harry's glasses?",
        a: "Oculus Reparo",
        b: "Erecto",
        c: "Stupefy",
        d: "Reducto",
        correct: "a",
    },
    {
        picture: "Q5",
        question: "Which spell creates a fiery explosion?",
        a: "Accio",
        b: "Nox",
        c: "Expecto Patronum",
        d: "Confringo",
        correct: "d",
    },
    {
        picture: "Q6",
        question: "What is the shield spell?",
        a: "Expulso",
        b: "Verdimillious",
        c: "Portus",
        d: "Protego",
        correct: "d",
    },
    {
        picture: "Q7",
        question: "Which of these is NOT an unforgiveable curse?",
        a: "Crucio",
        b: "Sectumsempra",
        c: "Avada Kedavra",
        d: "Imperio",
        correct: "b",
    },
    {
        picture: "Q8",
        question: "How do you remove someone's memories?",
        a: "Serpensortia",
        b: "Incendio",
        c: "Obliviate",
        d: "Brackium Emendo",
        correct: "c",
    },
    {
        picture: "Q9",
        question: "Which spell casts a light from the tip of the wand?",
        a: "Flipendo",
        b: "Obscuro",
        c: "Silencio",
        d: "Lumos",
        correct: "d",
    },
    {
        picture: "Q10",
        question: "What spell did Hermione use to stop the pixies in The Chamber of Secrets?",
        a: "Confundo",
        b: "Papyrus Reparo",
        c: "Immobulus",
        d: "Redactum Skullus",
        correct: "c",
    },
    {
        picture: "Q11",
        question: "How do you show a hidden object?",
        a: "Glacius",
        b: "Revelio",
        c: "Depulso",
        d: "Reparo",
        correct: "b",
    },
    {
        picture: "Q12",
        question: "What spell did Hermione use on Neville in The Philosopher's Stone?",
        a: "Incarcerous",
        b: "Avada Kedavra",
        c: "Crucio",
        d: "Petrificus Totalus",
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

    quizPicture.innerHTML = `<img src="static/surveypics/harrypotterspellsquiz/${currentQuizData.picture}.png" height="180px" alt="${currentQuizData.picture}">`
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