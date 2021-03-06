let seq = [];
let next = 0;
let chosen = 0;
let gameRunning = false;
let response = [];
let clicks = 0;
let highscore = 0;
let currentscore = 0;
let round = 0;
let timeoutScale = 1200;

let sq1 = document.getElementById("sq1");
let sq2 = document.getElementById("sq2");
let sq3 = document.getElementById("sq3");
let sq4 = document.getElementById("sq4");


function pickRandom() {
    next = Math.floor(Math.random() * 4);
    seq.push(next);
}

function runSeq() {
    for (let i=0; i<seq.length; i++) {
        // change css to "glow", then not glow (run an animation)
        // i can't find the link, but sequential animation code is from stackoverflow

        if (seq[i] == 0) {
            setTimeout(function() {
                sq1.classList.add('glow');
                sq1.addEventListener('animationend', function () {
                    sq1.classList.remove('glow');
                }, {once: true}); }, (i+1)*timeoutScale);
        } else if (seq[i] == 1) {
            setTimeout(function() {
                sq2.classList.add('glow');
                sq2.addEventListener('animationend', function () {
                    sq2.classList.remove('glow');
                }, {once: true}); }, (i+1)*timeoutScale);
        } else if (seq[i] == 2) {
            setTimeout(function() {
                sq3.classList.add('glow');
                sq3.addEventListener('animationend', function () {
                    sq3.classList.remove('glow');
                }, {once: true}); }, (i+1)*timeoutScale);
        } else {
            setTimeout(function() {
                sq4.classList.add('glow');
                sq4.addEventListener('animationend', function () {
                    sq4.classList.remove('glow');
                }, {once: true}); }, (i+1)*timeoutScale);
        }
    }
}

function getResponse() {
    clicks = 0;
    sq1.onclick = sq1Clicked;
    sq2.onclick = sq2Clicked;
    sq3.onclick = sq3Clicked;
    sq4.onclick = sq4Clicked;
}

function endResponse() {
    clicks = 0;
    sq1.onclick = null;
    sq2.onclick = null;
    sq3.onclick = null;
    sq4.onclick = null;
    checkResponse();
}

function checkResponse() {
    for (let i=0; i<seq.length; i++) {
        if (response[i] != seq[i]) {
            gameRunning = false;
            currentscore = seq.length - 1;
            break;
        }
    }
    if (gameRunning) {
        testplay();
    } else {
        endGame();
    }
}

function sq1Clicked() {
    response.push(0);
    clicks++;
    tryEndResponse();
}
function sq2Clicked() {
    response.push(1);
    clicks++;
    tryEndResponse();
}
function sq3Clicked() {
    response.push(2);
    clicks++;
    tryEndResponse();
}
function sq4Clicked() {
    response.push(3);
    clicks++;
    tryEndResponse();
}

function tryEndResponse() {
    if (clicks == seq.length) {
        endResponse();
    }
}

function endGame() {
    alert("sorry, you lost the game. Your score was " + String(currentscore));
    seq = [];
    response = [];
    clicks = 0;
    updatehigh();
    round = 0;
    playbuttonback();
}

function testplay() {
    clicks = 0;
    gameRunning = true;
    response = [];
    round++;
    showRounds();
    pickRandom();
    runSeq();
    getResponse();
}

function resetScore() {
    highscore = 0;
    document.getElementById("score").innerHTML = "0";
}

function updatehigh() {
    if (currentscore > highscore) {
        highscore = currentscore;
    }
    document.getElementById("score").innerHTML = String(highscore);
}

document.getElementById("play").onclick = testplay; 
document.getElementById("reset").onclick = resetScore;

function showRounds() {
    document.getElementById("play").onclick = null;
    document.getElementById("play").innerHTML = "round " + String(round);
}

function playbuttonback() {
    document.getElementById("play").innerHTML = "start game";
    document.getElementById("play").onclick = testplay; 
}

// dark mode toggler
document.getElementById("darkmode").onclick = darkmode;

function darkmode() {
    document.querySelector("body").classList.toggle("dark");
    if (document.querySelector("body").classList.contains("dark")) {
        document.getElementById("darkmode").innerHTML = "light mode";
    } else {
        document.getElementById("darkmode").innerHTML = "dark mode";
    }
}

// scroll down
document.getElementById("htp").onclick = scroll;
function scroll() {
    document.getElementById("howtoplay").scrollIntoView({behavior: "smooth"});
}

// back to top
document.getElementById("back").onclick = backtotop;
function backtotop() {
    document.getElementById("navbar-all").scrollIntoView({behavior: "smooth"});
}

// speed button
document.getElementById("speed").onclick = changeSpeed;

function changeSpeed() {
    let currentspeed = document.getElementById("speed").innerHTML;
    if (currentspeed == "speed: regular") {
        document.getElementById("speed").innerHTML = "speed: fast";
        timeoutScale = 700;
    } else {
        document.getElementById("speed").innerHTML = "speed: regular";
        timeoutScale = 1200;
    }
}
