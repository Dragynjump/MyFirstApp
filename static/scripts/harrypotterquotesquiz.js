const quizData = [
    {
        picture: "Q1",
        question: "Finish this sentence: 'Dobby has heard of your greatness, sir, but of your ___, he never knew'",
        a: "Awesomeness",
        b: "Pet snake",
        c: "Dirty socks",
        d: "Goodness",
        correct: "d",
    },
    {
        picture: "Q2",
        question: "Who said, 'We are only as strong as we are united, as weak as we are divided'?",
        a: "Ginny",
        b: "Hermione",
        c: "Sirius Black",
        d: "Dumbledore",
        correct: "d",
    },
    {
        picture: "Q3",
        question: "What do you say to open the Marauder's Map?",
        a: "Open Sesame",
        b: "I solemnly swear that I am up to no good",
        c: "Mischief managed",
        d: "Alohamora",
        correct: "b",
    },
    {
        picture: "Q4",
        question: "What did Dudley tell Harry when he finally moved out of the Dursleys house?",
        a: "Go back to your friends, freak!",
        b: "Stay away from us",
        c: "I don't think you're a waste of space",
        d: "Stay in touch",
        correct: "c",
    },
    {
        picture: "Q5",
        question: "What name does the wizarding world know Voldemort by?",
        a: "He-who-shall-not-be-named",
        b: "The nameless one",
        c: "The Great Horror",
        d: "He-who-terrorises all",
        correct: "a",
    },
    {
        picture: "Q6",
        question: "Finish this sentence: 'Working hard is important. But there is something that matters even more, ___'",
        a: "Trusting your friends",
        b: "Believing in yourself",
        c: "Having fun",
        d: "Staying true to yourself",
        correct: "b",
    },
    {
        picture: "Q7",
        question: "Who said, 'When in doubt, go to the library' in The Chamber of Secrets?",
        a: "Hagrid",
        b: "Hermione",
        c: "Harry",
        d: "Ron",
        correct: "d",
    },
    {
        picture: "Q8",
        question: "According to Harry, what's something they have that Voldemort doesn't?",
        a: "Noses",
        b: "Friends and allies",
        c: "Something worth fighting for",
        d: "Determination",
        correct: "c",
    },
    {
        picture: "Q9",
        question: "Finish this sentence: 'The ones that love us never really leave us. ___'",
        a: "You can always find them",
        b: "They're in our hearts",
        c: "They watch us from beyond",
        d: "That's what love is",
        correct: "a",
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

    quizPicture.innerHTML = `<img src="static/surveypics/harrypotterquotesquiz/${currentQuizData.picture}.png" height="180px" alt="${currentQuizData.picture}">`
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