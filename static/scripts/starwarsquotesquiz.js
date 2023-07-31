const quizData = [
    {
        picture: "Q1",
        question: "Finish this sentence: 'What about the ___?'",
        a: "Negotiations",
        b: "Droid attack on the Wookies",
        c: "Plan to take the capital",
        d: "Remaining Sith",
        correct: "b",
    },
    {
        picture: "Q2",
        question: "Who famously said, 'I've got a bad feeling about this,' first?",
        a: "Han Solo",
        b: "Obi Wan Kenobi",
        c: "Anakin Skywalker",
        d: "C3PO",
        correct: "a",
    },
    {
        picture: "Q3",
        question: "What is Luke's friend's name?",
        a: "Tanaka",
        b: "Terry",
        c: "Wedge",
        d: "Biggs",
        correct: "d",
    },
    {
        picture: "Q4",
        question: "Finish this sentence: 'Do not choke on your ___'",
        a: "Blue milk",
        b: "Aspirations",
        c: "Foul tongue",
        d: "Ambitions",
        correct: "b",
    },
    {
        picture: "Q5",
        question: "What is the name of Obi Wan's trusty clone commander?",
        a: "Antilles",
        b: "Oddball",
        c: "Cody",
        d: "Fives",
        correct: "c",
    },
    {
        picture: "Q6",
        question: "Which seedy character once said, 'No money, no parts, no deal!'?",
        a: "Jabba the Hutt",
        b: "Dexter",
        c: "Watto",
        d: "Han Solo",
        correct: "c",
    },
    {
        picture: "Q7",
        question: "Which actor first uttered the now popular phrase: 'Hello there!'?",
        a: "Alec Guinness",
        b: "Ewan McGregor",
        c: "James Arnold Taylor",
        d: "Matthew Russell Wood",
        correct: "a",
    },
    {
        picture: "Q8",
        question: "What did Han say to Luke after he took down a tie-fighter?",
        a: "Nice shot, kid!",
        b: "Great, kid. Don't get cocky!",
        c: "Good work!",
        d: "Keep at it!",
        correct: "b",
    },
    {
        picture: "Q9",
        question: "Finish this sentence: 'There's always a ___'",
        a: "Hidden foe",
        b: "Better way",
        c: "Way out",
        d: "Bigger fish",
        correct: "d",
    },
    {
        picture: "Q10",
        question: "Who was it that said, 'Into the garbage chute, flyboy'?",
        a: "Qui Gon Jinn",
        b: "Han Solo",
        c: "Obi Wan Kenobi",
        d: "Princess Leia",
        correct: "d",
    },
    {
        picture: "Q11",
        question: "Which of these is NOT a Han Solo quote?",
        a: "No reward is worth this",
        b: "That’s two you owe me, junior",
        c: "That's no moon",
        d: "Fly casual",
        correct: "c",
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

    quizPicture.innerHTML = `<img src="static/surveypics/starwarsquotesquiz/${currentQuizData.picture}.png" height="180px" alt="${currentQuizData.picture}">`
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