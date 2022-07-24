let gameOptions = ["rock", "paper", "scissors"];
var playerScore = 0;
var comScore = 0;
const playerScoreDisplay = document.getElementById('player-score');
const comScoreDisplay = document.getElementById('computer-score');
var gameResult = -2;
var final = -2;

function computerPlay(){
    let randomNo = Math.floor(Math.random() * 3);
    return gameOptions[randomNo];
}

function capitalize(strInput){
    return strInput.slice(0,1).toUpperCase() + strInput.slice(1,(strInput.length)+1).toLowerCase();
}

function playGame(playerSelection, computerSelection){
    let playerS = playerSelection.toLowerCase();

    if(final!=-2) return;

    if(playerS == computerSelection){
        gameResult = -1;
    }
    else if((playerS == "rock" && computerSelection == "scissors") ||
            (playerS == "scissors" && computerSelection == "paper")||
            (playerS == "paper" && computerSelection == "rock")){
        gameResult = 1;
    }
    else{
        gameResult = 0;
    }
    //have different messages depending on the scores

    displayWinLose(gameResult, computerSelection, playerS);

    //update scores
    if(gameResult == 0)
        comScore++;
    else if(gameResult == 1)
        playerScore++;

    //update score display
    playerScoreDisplay.innerHTML=playerScore;
    comScoreDisplay.innerHTML=comScore;

    //if either player has a score above 5, end
    if(playerScore == 5 || comScore == 5){
        if(playerScore > comScore){
            final=1;
        }
        else if(playerScore < comScore){
            final=0;
        }
        displayFinalResult(final);
        
    }   
   
}

//play sounds and change image depending on game result each round
function displayWinLose(gameResult, computerSelection, playerS){
    const audio = document.querySelector(`[data-no="${gameResult}"][data-final="0"]`);
    const text = document.querySelector("div.win-or-lose");

    //if game is still ongoing
    if(gameResult == 0){
        text.innerHTML=(`LOSER! ${capitalize(computerSelection)} beats ${capitalize(playerS)}...TRY HARDER`);
        document.querySelector("img.win-or-lose").src = "images/sad-rps.png";
    }
    else if(gameResult == 1){
        text.innerHTML=(`YEAH!! You Won! ${capitalize(playerS)} beats ${capitalize(computerSelection)}!`);
        document.querySelector("img.win-or-lose").src = "images/happy-rps.jpg";
    }
    else {
        text.innerHTML=(`Tie! You both chose ${capitalize(playerS)}... that's kinda sus`);
        document.querySelector("img.win-or-lose").src = "images/neutral-rps.jpg";
    } 
    audio.currentTime=0;
    audio.play();
}

//show final result
function displayFinalResult(final){
    const audio = document.querySelector(`[data-no="${final}"][data-final="1"]`);
    const middle_text = document.querySelector(".result");
    const final_text = document.querySelector(".final-result");
    const before_message = document.querySelector(".text");
    const final_message = document.querySelector(".text-final");

    middle_text.style.display="none";
    before_message.style.display = "none";
    final_message.style.display = "inline-block";

    final_text.classList.add("fadeIn");
    if(final==1){
        final_text.innerHTML=("YAY YOU WIN");
        document.querySelector("img.sideimg1").src = "images/win-dance.gif";
        document.querySelector("img.sideimg2").src = "images/win-dance.gif";
    }
    else{
        final_text.innerHTML=("BOO YOU LOSE");
        document.querySelector("img.sideimg1").src = "images/loser-dance.gif";
        document.querySelector("img.sideimg2").src = "images/loser-dance.gif";
    }

    audio.currentTime=0;
    audio.play();
}

function resetGame(){
    const middle_text = document.querySelector(".result");
    const final_text = document.querySelector(".final-result");
    const text = document.querySelector("div.win-or-lose");
    const before_message = document.querySelector(".text");
    const final_message = document.querySelector(".text-final");

    if(final==-2) return;

    document.querySelectorAll('audio').forEach(el => el.pause());

    final_text.classList.remove("fadeIn");
    middle_text.style.display="flex";
    final_text.innerHTML=("");
    text.innerHTML=("...");
    
    final_message.style.display = "none";
    before_message.style.display = "inline-block";

    document.querySelector("img.sideimg1").src = "images/rockeyebrow-rps.jpeg";
    document.querySelector("img.sideimg2").src = "images/rockeyebrow-rps.jpeg";
    document.querySelector("img.win-or-lose").src = "images/neutral-rps.jpg";

    playerScoreDisplay.innerHTML="0";
    comScoreDisplay.innerHTML="0";
    playerScore = 0;
    comScore = 0;
    final = -2;
}


function removeTransition(e) {
    if (e.propertyName !== 'transform') return;
    e.target.classList.remove('playing');
}

//play sound when user clicks button
function playButtonClick(button){
    const audio = document.querySelector('.button-click');
    if(!audio) return;
    if(final!=-2) return;
    audio.volume = 0.5;
    button.classList.add('playing');
    audio.currentTime = 0;
    audio.play();
}

const buttons = Array.from(document.querySelectorAll('.button-play'));
buttons.forEach(button => button.addEventListener("click", function(e) {
    playButtonClick(button);
    playGame(e.target.id, computerPlay());
}));
buttons.forEach(button => button.addEventListener("transitionend", removeTransition));

window.addEventListener("keydown", resetGame);

//game();