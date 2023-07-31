const quizData = [
    {
        picture: "Q1",
        question: "What comes with great power?",
        a: "Great responsibility",
        b: "Great determination",
        c: "Great power bills",
        d: "Obligations",
        correct: "a",
    },
    {
        picture: "Q2",
        question: "Who said, 'If you cage the best, the beast will get angry'?",
        a: "The beast",
        b: "Wolverine",
        c: "Darkseid",
        d: "Hulk",
        correct: "b",
    },
    {
        picture: "Q3",
        question: "Finish this sentence: 'I’m here to fight for truth, and justice, and the ___'",
        a: "Future",
        b: "American way",
        c: "Right to freedom",
        d: "World",
        correct: "b",
    },
    {
        picture: "Q4",
        question: "According to Thomas Wayne, why do we fall?",
        a: "To learn how to take a hit",
        b: "To gain the advantage on our enemies",
        c: "To pick ourselves up again",
        d: "To remember who we are",
        correct: "c",
    },
    {
        picture: "Q5",
        question: "Which Norse God said this? 'The fate of your planet rests not in the hands of gods. It rests in the hands of mortals'",
        a: "Thor",
        b: "Loki",
        c: "Odin",
        d: "Sif",
        correct: "a",
    },
    {
        picture: "Q6",
        question: "Joker once said, 'What doesn't kill you only makes you ___'",
        a: "Stronger",
        b: "Stranger",
        c: "Deader",
        d: "Angrier",
        correct: "b",
    },
    {
        picture: "Q7",
        question: "Finish this quote: 'It’s not who I am underneath, but ___'",
        a: "Who I am in the now",
        b: "Where I call my home",
        c: "When I show my face",
        d: "What I do that defines me",
        correct: "d",
    },
    {
        picture: "Q8",
        question: "Which of these is NOT a popular Spiderman zinger?",
        a: "Cute outfit, did your husband make it for you?",
        b: "Hey Kiddo, let mom and dad talk",
        c: "Where do all these guys come from?",
        d: "Zip it, ignoramus",
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

    quizPicture.innerHTML = `<img src="static/surveypics/superheroquotesquiz/${currentQuizData.picture}.png" height="180px" alt="${currentQuizData.picture}">`
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