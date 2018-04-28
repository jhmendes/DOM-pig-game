/*

Challenges 1-3 

*/
var scores, roundScore, activePlayer, gamePlaying, winScore;

winScore = 100;

init();

var previousDiceRoll;

//Event Listeners

document.querySelector(".btn-roll").addEventListener("click", function() {
  if (gamePlaying) {
 
    //1. Random number needed when someone clicks
    var dice = Math.floor(Math.random() * 6) + 1;
      
    //2. Display the result
    var diceDOM = document.querySelector(".dice");
    diceDOM.style.display = "block";
    diceDOM.src = "dice-" + dice + ".png";
    // diceDOM.src = `dice-${dice}.png`;

    //3. Update the round score IF the rolled number was not 1
    //If rolled dice is 6, check to see if previously rolled dice is a 6
    // If it is, scores[activePlayer] is set to 0, update UI to 0, and call nextPlayer function

    if (dice === 6 && previousDiceRoll === 6) {
      document.querySelector(
        "#score-" + activePlayer
      ).textContent = '0';
      scores[activePlayer] = 0;
      nextPlayer();
    } else if (dice !== 1) {
      //Add score
      roundScore += dice;
      document.querySelector(
        "#current-" + activePlayer
      ).textContent = roundScore;
    } else {
      //Next player
      nextPlayer();
    }
    previousDiceRoll = dice;

  }
});

document.querySelector(".btn-hold").addEventListener("click", function() {
  //1.  Add the current score to the global score for that player
  if (gamePlaying) {
    scores[activePlayer] += roundScore;
    //2.  Update the UI
    document.querySelector("#score-" + activePlayer).textContent =
      scores[activePlayer];
  
    //3.  Check if player won game
    if (scores[activePlayer] >= winScore) {
      //game over and do stuff here
      document.querySelector("#name-" + activePlayer).textContent = "Winner!";
      document.querySelector(".dice").style.display = "none";
      document.querySelector(".player-" + activePlayer + "-panel").classList.add("winner");
      document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");
      gamePlaying = false;
    } else {
      nextPlayer();
    }
  }
});

document.querySelector(".btn-score").addEventListener("click", updateWinScore);
document.querySelector(".btn-new").addEventListener("click", init);

//Functions

function nextPlayer() {
  //Next player

  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  roundScore = 0;

  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";

  //document.querySelector('.player-0-panel').classList.remove('active');
  //document.querySelector('.player-1-panel').classList.add('active');
  //toggle checks if the class is present
  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");
  document.querySelector(".dice").style.display = "none";
}

function updateWinScore() {
  var newWinScore = document.querySelector('#win-score').value;
  winScore = newWinScore;
  document.querySelector('#win-score').value = "";
  
}

function init() {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  gamePlaying = true;
  document.querySelector(".dice").style.display = "none";
  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";
  document.getElementById("name-0").textContent = "Player 1";
  document.getElementById("name-1").textContent = "Player 2";
  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");
  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.add("active");
}
//document.querySelector('#current-' + activePlayer).textContent = dice;
//document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';

//var x = document.querySelector('#score-0').textContent;
//console.log(x);

//1.  Add another dice, so two dices in a row
//2. Player looses current score if one of the dice is a 1
//3.  You'll need Css to position the second dice

//Add in a second dice variable
//Set up the img for the dice variable
//Position via CSS
//Check both for any ones
//Add the total score of both dice together



