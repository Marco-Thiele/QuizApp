let questions = [
    {
        'question': 'Wer hat HTML erfunden?',
        'answer1': 'Robbie Williams',
        'answer2': 'Lady Gaga',
        'answer3': 'Tim Berners-Lee',
        'answer4': 'Justin Bieber',
        'right_answer': 3
    },
    {
        'question': 'Wie nennt der Engländer seine Vermieterin?',
        'answer1': 'landlady',
        'answer2': 'villagequeen',
        'answer3': 'citymadam',
        'answer4': 'townmiss',
        'right_answer': 1
    },
    {
        'question': 'Welche Videospielreihe wird nach fast 30 Jahren ab 2023 nicht mehr von EA SPORTS unter diesem Namen weitergeführt?',
        'answer1': 'Grand Theft Auto',
        'answer2': 'Die Sims',
        'answer3': 'FIFA',
        'answer4': 'Super Mario Kart',
        'right_answer': 3
    },
    {
        'question': 'Was dient nicht zur Verhütung?',
        'answer1': 'Pille',
        'answer2': 'Kondom',
        'answer3': 'Coitus interruptus',
        'answer4': 'Glücksspirale',
        'right_answer': 4
    },
    {
        'question': 'Wer kann vielleicht schwimmen, aber nicht fliegen?',
        'answer1': 'Stockenten',
        'answer2': 'Pfeifenten',
        'answer3': 'Krickenten',
        'answer4': 'Studenten',
        'right_answer': 4
    },
    {
        'question': 'Wie viel Meter legt man zurück, während man im Auto bei 120 km/h für drei Sekunden auf sein Handy schaut?',
        'answer1': 'rund 100 Meter',
        'answer2': 'etwa 50 Meter',
        'answer3': 'knapp 30 Meter',
        'answer4': 'ungefähr 15 Meter',
        'right_answer': 1
    },
    {
        'question': 'Was kommt in Ostasien häufig auf den Tisch?',
        'answer1': 'Sonicht',
        'answer2': 'Soja',
        'answer3': 'Soschoneher',
        'answer4': 'Sovielleicht',
        'right_answer': 2
    },
]



let images = ['img/it-html.jpg', 'img/makler.png', 'img/games.png', 'img/verhütung.jpg', 'img/ente.png', 'img/tacho.png', 'img/sushi.png']

let currentQuestion = 0;
let rightQuestion = 0;
let audioSucces = new Audio('audio/succes.mp3');
let audioFail = new Audio('audio/wrong.mp3');
let audioEndgame = new Audio('audio/endgame.mp3');
let answered = false;

function init() {
    document.getElementById('allQuestion').innerHTML = questions.length;
    showquestion()
}


function showquestion() {
    if (gameIsOver()) {
        showendscreen()
    } else {
        updateProgressBar()
        updateToNextQuestion()
    }
}


function gameIsOver() {
    return currentQuestion >= questions.length
}


function showendscreen() {
    document.getElementById('endscreen').style = '';
    document.getElementById('questionbody').style = 'display: none';
    endscreenNumber()
    audioEndgame.play()
    document.getElementById('picture').style = 'display: none';
    document.getElementById('progressbar').parentNode.style = 'display: none';
}


function updateToNextQuestion() {
    let question = questions[currentQuestion];
    let image = images[currentQuestion];
    renderNextQuestion(question, image)
    if (answered) {
        ifAnswerd()
    } else {
        ifNotAnswerd()
    }
    resetAnswerButtons()
}


function renderNextQuestion(question,image){
    document.getElementById('question-number').innerHTML = currentQuestion + 1;
    document.getElementById('questiontext').innerHTML = question['question'];
    document.getElementById('answer_1').innerHTML = question['answer1'];
    document.getElementById('answer_2').innerHTML = question['answer2'];
    document.getElementById('answer_3').innerHTML = question['answer3'];
    document.getElementById('answer_4').innerHTML = question['answer4'];
    document.getElementById('picture').src = image
}


function ifAnswerd() {
    document.getElementById('answer_1').parentNode.onclick = null;
    document.getElementById('answer_2').parentNode.onclick = null;
    document.getElementById('answer_3').parentNode.onclick = null;
    document.getElementById('answer_4').parentNode.onclick = null;
}


function ifNotAnswerd() {
    document.getElementById('answer_1').parentNode.onclick = function () {
        answer('answer_1');
    }
    document.getElementById('answer_2').parentNode.onclick = function () {
        answer('answer_2');
    }
    document.getElementById('answer_3').parentNode.onclick = function () {
        answer('answer_3');
    }
    document.getElementById('answer_4').parentNode.onclick = function () {
        answer('answer_4');
    }
}



function updateProgressBar() {
    let percent = currentQuestion / questions.length;
    percent = Math.round(percent * 100);
    document.getElementById('progressbar').innerHTML = `${percent} %`;
    document.getElementById('progressbar').style = `width : ${percent}%`;
}


function answer(selection) {
    let right_answer = questions[currentQuestion]['right_answer'];
    selectedQuestionNumber = selection.slice(-1);
    let idOfRightAnswer = `answer_${right_answer}`;
    if (rightAnswerSelected(selectedQuestionNumber, right_answer)) {
        rigtAnswerPush(selection)
    } else {
        falseAnwerPush(selection)
    }
    let answerButtons = document.getElementsByClassName('quiz-answer-card');
    for (let i = 0; i < answerButtons.length; i++) {
        answerButtons[i].setAttribute('onclick', '');
        document.getElementById('next-button').disabled = false;
    }
}


function falseAnwerPush(selection){
    document.getElementById(selection).parentNode.classList.add('bg-danger');
    document.getElementById(idOfRightAnswer).parentNode.classList.add('bg-success');
    audioFail.play()
}


function rigtAnswerPush(selection){
    document.getElementById(selection).parentNode.classList.add('bg-success');
    audioSucces.play()
    rightQuestion++;
}


function rightAnswerSelected(selectedQuestionNumber, right_answer) {
    return selectedQuestionNumber == right_answer
}



function nextQuestion() {
    currentQuestion++;
    resetAnswerButtons()
    showquestion()
    document.getElementById('next-button').disabled = true;
}


function resetAnswerButtons() {
    let answerButtons = document.getElementsByClassName('quiz-answer-card');
    for (let i = 0; i < answerButtons.length; i++) {
        answerButtons[i].setAttribute('onclick', `answer('${answerButtons[i].querySelector('.card-body').getAttribute('id')}')`);
        answerButtons[i].classList.remove('bg-danger');
        answerButtons[i].classList.remove('bg-success');
    }
}


function endscreenNumber() {
    document.getElementById('endscreenQuestionNumber').innerHTML = questions.length;
    document.getElementById('rightQuestion').innerHTML = rightQuestion;
}


function restartGame() {
    document.getElementById('questionbody').style = '';
    document.getElementById('picture').style = '';
    document.getElementById('progressbar').parentNode.style = '';
    document.getElementById('endscreen').style = 'display: none';
    currentQuestion = 0;
    rightQuestion = 0;
    init()
}

