let gameOptions = ["rock", "paper", "scissors"];
const playerScore = 0;
const comScore = 0;

function computerPlay(){
    let randomNo = Math.floor(Math.random() * 3);
    return gameOptions[randomNo];
}

function capitalize(strInput){
    return strInput.slice(0,1).toUpperCase() + strInput.slice(1,(strInput.length)+1).toLowerCase();
}

function playGame(playerSelection, computerSelection){
    let playerS = playerSelection.toLowerCase();

    if(playerS == computerSelection){
        console.log(`Tie! You both chose ${capitalize(playerS)}... that's kinda sus`);
        return -1;
    }
    else if((playerS == "rock" && computerSelection == "scissors") ||
            (playerS == "scissors" && computerSelection == "paper")||
            (playerS == "paper" && computerSelection == "rock")){
        console.log(`YEAH!! You Won! ${capitalize(playerS)} beats ${capitalize(computerSelection)}!`);
    }
    else{
        console.log(`oops you lost. ${capitalize(computerSelection)} beats ${capitalize(playerS)}...try harder pls`);
    }
    //have different messages depending on the scores
    
   
}

function game(){
    for(let i = 0; i < 5; i++){
        const playerSelection = window.prompt("Choose your weapon.");
        const computerSelection = computerPlay();
        const gameResult = playGame(playerSelection, computerSelection);

        if(gameResult == 0)
            comScore++;
        else if(gameResult == 1)
            playerScore++;
    }

    if(playerScore > comScore){
        console.log("YOU WIN!!!");
    }
    else if(playerScore < comScore){
        console.log("YOU LOSE!!! LOSER!!!!");
    }
    else
        console.log("WOW! IT'S A TIE!");
}

game();