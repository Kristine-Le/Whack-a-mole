const holes = document.querySelectorAll(".hole");
console.log("holes: " + holes.length);

const scoreBoard = document.querySelector(".score");
const moles = document.querySelectorAll(".mole");
const countdownBoard = document.querySelector(".countdown");
const startButton = document.querySelector(".startbutton");

let lastHole;
let timeUp = false;
let timeLimit = 20000;
let score = 0;
let countdown;

function pickRandomHole(holes) {
    const randomHole = Math.floor(Math.random() * holes.length);
    const hole = holes[randomHole];
    if (hole === lastHole) {
        return pickRandomHole(holes);
    }
    lastHole = hole;
    return hole;
}
function popOut() {
    const time = Math.round(Math.random() * 800 + 800);
    console.log("Time: " + time);
    const hole = pickRandomHole(holes);
    console.log("hole Inside: " + hole);
    hole.classList.add('up');
    setTimeout(function () { // !!!!!!!!!!!!!!!!!!!!!!
        hole.classList.remove('up');
        if (!timeUp) {
            popOut();
        }
    }, time)
}
function startGame(){
    countdown = timeLimit/1000;
    scoreBoard.textContent = 0;
    scoreBoard.style.display = "block";
    countdownBoard.textContent = countdown;
    timeUp = false;
    score = 0;
    popOut();
    setTimeout(function(){
        timeUp = true;
    }, timeLimit);

    let startCountdown = setInterval(function(){
        countdown -= 1;
        countdownBoard.textContent = countdown;
        if (countdown < 0){
            countdown = 0;
            clearInterval(startCountdown)
            countdownBoard.textContent = "Times up! Thank you for playing!";
        }
    }, 1000);
}
startButton.addEventListener("click", startGame);
function whack(e){
    score++;
    this.style.backgroundImage = 'url("yoda2.png")';
    this.style.pointerEvents = "none";
    setTimeout(() => {
        this.style.backgroundImage = 'url("yoda1.png")';
        this.style.pointerEvents = "all";
    }, 800);
    scoreBoard.textContent = score;
}
moles.forEach(mole => mole.addEventListener("click", whack))