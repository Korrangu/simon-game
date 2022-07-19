var gamePattern = [];
let buttonColors = ["green", "yellow", "red", "blue"]; 
var userClickedPattern = [];
var level = 0;
var started = false;

//level tracker
$(document).keydown(function() {
    if (!started) {
      $("#level-title").text("Level " + level);
      nextSequence();
      started = true;
    }
  });


//Sequence generator
function nextSequence() { 
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $('#'+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    audioPlay(randomChosenColor);
   
}

  //Audio trigger
function audioPlay(name) {
    var audio = new Audio('sounds/'+name+'.mp3');
    audio.play();
}

//click animation
function animatePress(currentColor) {
    $('#'+currentColor).addClass('pressed');
    setTimeout (function() {
        $('#'+currentColor).removeClass('pressed');
    }, 100);
}

//User click
$('.btn').click(function (){
    var userChosenColour = $(this).attr('id');
    userClickedPattern.push(userChosenColour);
    audioPlay(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});



//checking answer

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log('success');
     if (userClickedPattern.length === gamePattern.length) {
        setTimeout(function() {
            nextSequence();
        }, 1000);
     }
    } else {
        console.log('wrong');
        audioPlay('wrong');
        $('h1').text('Game over');
        $('body').addClass('game-over');
        setTimeout(function() {
            $('h1').text('Press A Key to Start');
            $('body').removeClass('game-over');
        }, 2000);
        startOver();
    }
}    

//restart sequence

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}