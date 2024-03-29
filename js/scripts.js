//business logic for pig dice game
function PigDicePlayer() {
  this.player = [];
}

PigDicePlayer.prototype.addPlayer = function (Player) {
  this.player.push(Player);
};


function rollingDice() {
  return Math.floor(Math.random() * ((6 - 1) + 1) + 1);
}

function Player(userName, totalScore, diceFace, currentScore) {
  this.userName = userName;
  this.totalScore = 0;
  this.diceFace = 0;
  this.currentScore = 0;
}

Player.prototype.holdFunc = function() {
  this.totalScore += this.currentScore
  this.currentScore = 0
}

Player.prototype.rollDice1 = function() {
  if (pigDicePlayerForList.player[0].diceFace === 1) {
    this.currentScore = 0
    $('#button1').hide();
    $('#button2').show();
  } else {
    this.currentScore += this.diceFace
  }
}

Player.prototype.rollDice2 = function() {
  if (pigDicePlayerForList.player[1].diceFace === 1) {
    this.currentScore = 0
    $('#button2').hide();
    $('#button1').show();
  } else {
    this.currentScore += this.diceFace
  }
}

Player.prototype.winCheck = function (){
  if (this.totalScore >= 100) {
    $('.container').hide();
    $('#output-Winner').show()
  }
}
//user logic
var pigDicePlayerForList = new PigDicePlayer();
$(document).ready(function () {
  $('form#name-entry1').submit(function (event) {
    event.preventDefault();
    var playerOneNameInput = $('#new-user1').val();
    $('#name-turn-indicator1').text(playerOneNameInput)
    console.log(playerOneNameInput);
    var totalScore = [];
    var diceFace = [];
    var currentScore = [];
    //this creating a new player with the new Player constructor
    var newPlayer = new Player(playerOneNameInput, totalScore, diceFace, currentScore);
    //this calls the prototype to push new player into  player array
    pigDicePlayerForList.addPlayer(newPlayer);
    //This hides the form after name submission
    $('#name-entry1').hide();
    //This shows player interface
    $('#show-score1').show();
    $('#name-entry2').show();
  });

  $('form#name-entry2').submit(function (event) {
    event.preventDefault();
    var playerTwoNameInput = $('#new-user2').val();
    $('#name-turn-indicator2').text(playerTwoNameInput);
    var totalScore = [];
    var diceFace = [];
    var currentScore = [];
    //this creating a new player with the new Player constructor
    var newPlayer = new Player(playerTwoNameInput, totalScore, diceFace, currentScore);
    //this calls the prototype to push new player into  player array
    pigDicePlayerForList.addPlayer(newPlayer);
    //This hides the form after name submission
    $('#name-entry2').hide();
    //This shows player interface
    $('#show-score2').show();
    $('#button2').show();
  });

  //This click function calculates the current score and creates outputs to DOM
  //and updates objects
  $('#roll1').click(function (event) {
    event.preventDefault();
    var currentRoll = rollingDice();
    $('#current-dice1').text(currentRoll);
    pigDicePlayerForList.player[0].diceFace = currentRoll
    // pigDicePlayerForList.player[0].currentScore += currentRoll
    pigDicePlayerForList.player[0].rollDice1();
    $('#current-turn-score1').text(pigDicePlayerForList.player[0].currentScore);
  });

  $('#roll2').click(function (event) {
    event.preventDefault();
    var currentRoll = rollingDice();
    $('#current-dice2').text(currentRoll);
    pigDicePlayerForList.player[1].diceFace = currentRoll
    // pigDicePlayerForList.player[1].currentScore += currentRoll
    pigDicePlayerForList.player[1].rollDice2();
    $('#current-turn-score2').text(pigDicePlayerForList.player[1].currentScore);
  });

  //This click function calculates the total score and creates output to the DOM
  //and updates objects
  $('#hold1').click(function (event) {
    event.preventDefault();
    pigDicePlayerForList.player[0].holdFunc();
    $('#total-score1').text(pigDicePlayerForList.player[0].totalScore);
    $('#button1').hide();
    $('#button2').show();
    $('#current-turn-score1').text(pigDicePlayerForList.player[0].currentScore);
    pigDicePlayerForList.player[0].winCheck();
  });

  $('#hold2').click(function (event) {
    event.preventDefault();
    pigDicePlayerForList.player[1].holdFunc();
    $('#total-score2').text(pigDicePlayerForList.player[1].totalScore);
    $('#button2').hide();
    $('#button1').show();
    $('#current-turn-score2').text(pigDicePlayerForList.player[1].currentScore);
    pigDicePlayerForList.player[1].winCheck();
  });
});
