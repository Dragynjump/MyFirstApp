const quizData = [
    {
        picture: "Q1",
        question: "Which of these names is NOT one of The Flash's alter-egos?",
        a: "Wally West",
        b: "Tim Drake",
        c: "Barry Allen",
        d: "Jay Garrick",
        correct: "b",
    },
    {
        picture: "Q2",
        question: "What is the name of the company Clark Kent works at?",
        a: "The Daily News",
        b: "The Daily Prophet",
        c: "They Daily Bugle",
        d: "The Daily Planet",
        correct: "d",
    },
    {
        picture: "Q3",
        question: "Who is Steve Roger's love interest from back during the war?",
        a: "Pepper Potts",
        b: "Peggy Carter",
        c: "Wanda Maximoff",
        d: "Natalia Romanov",
        correct: "b",
    },
    {
        picture: "Q4",
        question: "How old was Barbara Gordon when she became paralyzed from the legs down?",
        a: "19",
        b: "14",
        c: "27",
        d: "34",
        correct: "a",
    },
    {
        picture: "Q5",
        question: "What does Hal Jordan do for a living?",
        a: "Truck driver",
        b: "Rocket scientist",
        c: "Toy salesman",
        d: "Inventor",
        correct: "c",
    },
    {
        picture: "Q6",
        question: "What is Wonder Woman's alter-ego name?",
        a: "Cornelia Hale",
        b: "Felicia Hardy",
        c: "Hippolyta",
        d: "Diana Prince",
        correct: "d",
    },
    {
        picture: "Q7",
        question: "What is Doctor Strange's first name?",
        a: "Nathan",
        b: "Stephen",
        c: "Thomas",
        d: "Arthur",
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

    quizPicture.innerHTML = `<img src="static/surveypics/superherosecretidentitiesquiz/${currentQuizData.picture}.png" height="180px" alt="${currentQuizData.picture}">`
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