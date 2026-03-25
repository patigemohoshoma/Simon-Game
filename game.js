//Declaration of Game Variables
var started = false;

var level = 0;

var userClickedPattern = [];

var gamePattern = [];

var buttonColors = ["red", "blue", "green", "yellow"];

//Random Number generator

function nextSequence() {
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColors[randomNumber];
    console.log(randomChosenColour);
    gamePattern.push(randomChosenColour);
    $('#' + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    level += 1;
    $('#level-title').text('Level ' + level);
}

//Button Click Function

$('.btn').click(function () {
    var userChosenColour = $(this).attr('id');
    userClickedPattern.push(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
    console.log(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
});

//Play Sound Function

function playSound(name) {
    var gameSound = new Audio('sounds/' + name + '.mp3');
    gameSound.play();
};

//Button Press Animation

function animatePress(currentColour) {
    $('#' + currentColour).addClass("pressed");
    setTimeout(() => {
        $('#' + currentColour).removeClass("pressed");
}, 100);
};

//Key Press Function

$(document).keypress(function (e) {
    if (started === false) {
        nextSequence();
        started = true;
    }
});

//Check Answer Function

function checkAnswer(currentLevel) {

    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log('Success') 
        if (userClickedPattern.length === gamePattern.length) {
           setTimeout(() => {
               nextSequence();
               userClickedPattern = [];
           }, 1000);
            
        }
    } else {
        playSound('wrong');
        $('body').addClass("game-over");
        setTimeout(() => {
            $('body').removeClass("game-over");
        }, 200);
        $('h1').text('Game Over, Press Any Key to Restart')
        startOver();
    }
    
};

function startOver() {
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    started = false;
}