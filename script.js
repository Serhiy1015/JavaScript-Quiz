const questions = [
    {
        question: 'Яка функція використовується для виведення даних в консоль у JavaScript?',
        answers: [
            { text: 'print()', correct: false },
            { text: 'console.log()', correct: true },
            { text: 'display()', correct: false },
            { text: 'log()', correct: false },
        ]
    },

    {
        question: 'Яким методом можна додати елемент в кінець масиву в JavaScript?',
        answers: [
            { text: 'push()', correct: true },
            { text: 'add()', correct: false },
            { text: 'append()', correct: false },
            { text: 'concat()', correct: false },
        ]
    },
    {
        question: 'Який оператор використовується для встановлення значення змінної в JavaScript?',
        answers: [
            { text: ':', correct: false },
            { text: '==', correct: false },
            { text: '===', correct: false },
            { text: '=', correct: true },
        ]
    },
    {
        question: 'Як можна отримати довжину рядка в JavaScript?',
        answers: [
            { text: 'length', correct: false },
            { text: 'getSize()', correct: false },
            { text: 'str.length', correct: true },
            { text: 'size()', correct: false },
        ]
    },
    {
        question: 'Яка функція використовується для перетворення рядка на ціле число в JavaScript?',
        answers: [
            { text: 'parseInt()', correct: true },
            { text: 'parseFloat()', correct: false },
            { text: 'toFixed()', correct: false },
            { text: 'toPrecision()', correct: false }
        ]
    },
    {
        question: 'Яким методом можна перетворити рядок на рядок у верхньому регістрі у JavaScript?',
        answers: [
            { text: 'toUpperCase()', correct: true },
            { text: 'toLowerCase()', correct: false },
            { text: 'toUpper()', correct: false },
            { text: 'toLower()', correct: false }
        ]
    },
    {
        question: 'Який метод використовується для видалення останнього елемента з масиву в JavaScript?',
        answers: [
            { text: 'shift()', correct: false },
            { text: 'push()', correct: false },
            { text: 'pop()', correct: true },
            { text: 'unshift()', correct: false }
        ]
    },
    {
        question: 'Яким оператором виконується логічне І (AND) у JavaScript?',
        answers: [
            { text: '||', correct: false },
            { text: '&&', correct: true },
            { text: '!', correct: false },
            { text: '==', correct: false }
        ]
    }
]


const questionElement = document.getElementById('question')
const answerButtons = document.getElementById('answer-buttons')
const nextButton = document.getElementById('next-btn')


let currentQuestionIndex = 0
let score = 0

function startQuiz() {
    currentQuestionIndex = 0
    score = 0
    shuffleQuestions()
    showQuestion()
    nextButton.innerHTML = 'Наступне'
}

function shuffleQuestions() {
    for (let i = questions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        const temp = questions[i]
        questions[i] = questions[j]
        questions[j] = temp
    }
}


function showQuestion() {
    reserState()
    let currentQuestion = questions[currentQuestionIndex]
    let questionNo = currentQuestionIndex + 1
    questionElement.innerHTML = currentQuestion.question
    document.getElementById('questionNo').innerHTML = 'Питання ' + questionNo + '/' + questions.length
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerHTML = answer.text
        button.classList.add('btn')
        answerButtons.appendChild(button)
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectedAnswer)
    })
}

function reserState() {
    nextButton.style.display = 'none'
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild)
    }
}

function selectedAnswer(e) {
    const selectedBtn = e.target
    const isCorrect = selectedBtn.dataset.correct === 'true'
    if (isCorrect) {
        selectedBtn.classList.add('correct')
        score++
    }
    else selectedBtn.classList.add('incorrect')

    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add('correct')
        }
        button.disabled = true
    })

    nextButton.style.display = 'flex'
}

function showScore() {
    reserState()
    questionElement.innerHTML = `Правильних відповідей - ${score}`
    nextButton.innerHTML = 'грати знову'
    nextButton.style.display = 'flex'
}

function handleNextButton() {
    currentQuestionIndex++
    if (currentQuestionIndex < questions.length) {
        showQuestion()
        nextButton.innerHTML = 'Наступне'
    }
    else {
        showScore()
        nextButton.innerHTML = 'Грати знову'
    }
}


nextButton.addEventListener('click', () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton()
    }
    else {
        startQuiz()
    }
})
startQuiz()