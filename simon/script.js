const redButton = document.querySelector(".simonRed");
const greenButton = document.querySelector(".simonGreen");
const yellowButton = document.querySelector(".simonYellow");
const blueButton = document.querySelector(".simonBlue");
const scoreLabel = document.querySelector(".score");
const maxscoreLabel = document.querySelector(".maxscore");
const simonCenter = document.querySelector(".simonCenter");
let timeOfLight = 500;
let playerSequence = [];
let isPlayerTurn = false;
let sequence = [];
let timerNoOverlap = 0;
let isGameOver = false;
let score = 0;
let maxScore = 0;

redButton.addEventListener("click", buttonClicked);
greenButton.addEventListener("click", buttonClicked);
blueButton.addEventListener("click", buttonClicked);
yellowButton.addEventListener("click", buttonClicked);


function buttonClicked(e) {
    if (isPlayerTurn == true && isGameOver == false) {
        timerNoOverlap = 0;
        addLight(e.path[0]);
        playerSequence.push(e.path[0]);
        isSameSequence();
        // Player touched sequence
        if (playerSequence.length == sequence.length) {
            console.log(playerSequence, sequence);
            game();
        }
    }
}

let possibleColor = [redButton, greenButton, yellowButton, blueButton];
function startGame() {
    if (simonCenter.childNodes.length >= 1) {
        simonCenter.removeChild(simonCenter.lastChild);
    }
    sequence = [];
    playerSequence = [];
    timerNoOverlap = 0;
    score = 0;
    scoreLabel.innerHTML = `Score : ${score}`;
    isGameOver = false;
    let randomSequence = possibleColor[~~(Math.random() * 4)];
    sequence.push(randomSequence);
    playSequence(sequence);
    isPlayerTurn = true;
}

function game() {
    if (!isGameOver) {
        if (isSameSequence()) {
            setTimeout(() => addToSequence(), 1000);
            score += 10;
            if (score > maxScore) {
                maxScore = score;
            }
            scoreLabel.innerHTML = `Score : ${score}`;
            maxscoreLabel.innerHTML = `Best Score : ${maxScore}`;
        } else {
            console.log("GAME OVER");
        }
    }
}

function isSameSequence() {
    let isSameSequence = true;
    for (let i = 0; i < playerSequence.length; i++) {
        if (sequence[i] != playerSequence[i]) {
            isSameSequence = false;
            isGameOver = true;
            gameover();
            break;
        }
    }
    return isSameSequence;
}

function addToSequence() {
    if (!isGameOver) {
        playerSequence = [];
        timerNoOverlap = 0;
        let randomSequence = possibleColor[~~(Math.random() * 4)];
        sequence.push(randomSequence);
        playSequence(sequence);
    }
}

function playSequence() {
    isPlayerTurn = false;
    sequence.forEach(i => {
        addLight(i);
        timerNoOverlap += 500;
    }
    );
    setTimeout(function () {
        isPlayerTurn = true;
    }, timeOfLight + timerNoOverlap - 300);
}

function addLight(element) {
    setTimeout(() => {
        element.classList.add("light");
    }, timerNoOverlap);
    setTimeout(() => {
        element.classList.remove("light")
    }, timeOfLight + timerNoOverlap - 80);
}

function gameover() {
    console.log("GAME OVER");
    let text = document.createElement("p");
    text.innerText = "Game Over"
    simonCenter.appendChild(text);
    return ''
}