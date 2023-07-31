const quizData = [
    {
        picture: "Q1",
        question: "Which planet is home to giant mushrooms?",
        a: "Bespin",
        b: "Bogano",
        c: "Felucia",
        d: "Mon Calamari",
        correct: "c",
    },
    {
        picture: "Q2",
        question: "Which of these planets does NOT have a sprawling city?",
        a: "Coruscant",
        b: "Naboo",
        c: "Alderaan",
        d: "Mon Calamari",
        correct: "d",
    },
    {
        picture: "Q3",
        question: "What is the name of the planet Obi Wan fought General Grievous on?",
        a: "Coruscant",
        b: "Utapau",
        c: "Yavin 4",
        d: "Corellia",
        correct: "b",
    },
    {
        picture: "Q4",
        question: "What character originates from Dathomir?",
        a: "Darth Maul",
        b: "Aayla Secura",
        c: "Plo Koon",
        d: "Darth Talon",
        correct: "a",
    },
    {
        picture: "Q5",
        question: "Which of these planets did NOT have a rebel base on it?",
        a: "Hoth",
        b: "Kashyyyk",
        c: "Yavin 4",
        d: "Corellia",
        correct: "b",
    },
    {
        picture: "Q6",
        question: "Which planet was C-3PO built on?",
        a: "Bespin",
        b: "Coruscant",
        c: "Tatooine",
        d: "Utapau",
        correct: "c",
    },
    {
        picture: "Q7",
        question: "What planet do Kyber Crystals come from?",
        a: "Mustafar",
        b: "Yavin 4",
        c: "Bogano",
        d: "Ilum",
        correct: "d",
    },
    {
        picture: "Q8",
        question: "Which character has been to Dagobah, Tatooine, and Geonosis?",
        a: "R2-D2",
        b: "Yoda",
        c: "C-3PO",
        d: "Obi-Wan",
        correct: "a",
    },
    {
        picture: "Q9",
        question: "What is the name of the bear-like creatures on Hoth?",
        a: "Taun-taun",
        b: "Wampa",
        c: "Shivek",
        d: "Rodian",
        correct: "b",
    },
    {
        picture: "Q10",
        question: "What planet have we seen two sith on simultaneously?",
        a: "Naboo",
        b: "Kamino",
        c: "Tatooine",
        d: "Geonosis",
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

    quizPicture.innerHTML = `<img src="static/surveypics/starwarsplanetsquiz/${currentQuizData.picture}.png" height="180px" alt="${currentQuizData.picture}">`
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