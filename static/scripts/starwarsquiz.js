const quizData = [
    {
        picture: "Q1",
        question: "Who was the original owner of the Millennium Falcon?",
        a: "Han Solo",
        b: "C3PO",
        c: "Lando Calrissian",
        d: "Anakin Skywalker",
        correct: "c",
    },
    {
        picture: "Q2",
        question: "Who was Qui Gon Jinn’s master?",
        a: "Yoda",
        b: "Count Dooku",
        c: "Darth Maul",
        d: "Mace Windu",
        correct: "b",
    },
    {
        picture: "Q3",
        question: "What is the name of the crystals Jedi use to power their lightsabers?",
        a: "Bonsoo crystals",
        b: "Neodiamond crystals",
        c: "Kyber crystals",
        d: "Ji Wat crystals",
        correct: "c",
    },
    {
        picture: "Q4",
        question: "At the start of Episode 3, Revenge of the Sith, how many Sith are there currently?",
        a: "2",
        b: "1",
        c: "5",
        d: "3",
        correct: "a",
    },
    {
        picture: "Q5",
        question: "What serial number designates Obi Wan’s red droid?",
        a: "R2",
        b: "R3",
        c: "R4",
        d: "R5",
        correct: "c",
    },
    {
        picture: "Q6",
        question: "How old is Yoda?",
        a: "60 years old",
        b: "35 years old",
        c: "600 years old",
        d: "900 years old",
        correct: "d",
    },
    {
        picture: "Q7",
        question: "On which planet does Kit Fisto’s species reside?",
        a: "Mustafar",
        b: "Kamino",
        c: "Mon Calamari",
        d: "Felucia",
        correct: "c",
    },
    {
        picture: "Q8",
        question: "What is Darth Vader’s deceased wife’s name?",
        a: "Aayla Secura",
        b: "Padme",
        c: "Satine",
        d: "Princess Leia",
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

    quizPicture.innerHTML = `<img src="static/surveypics/starwarsquiz/${currentQuizData.picture}.png" height="180px" alt="${currentQuizData.picture}">`
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