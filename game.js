var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

$(document).keydown(function () {
  if (!started) {
    $("h1").text("level " + level);
    nextSequence();
    started = true;
  }
});

//random number
function nextSequence() {
  userClickedPattern = [];

  level++;
  $("h1").text("level " + level);

  var randomNumber = Math.floor(Math.random() * 4);

  var randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);

  playSound(randomChosenColour);
}

//selecting the button that is clicked and adding it to array.
$(".btn").click(function () {
  var userChosenColour = $(this).attr("id");
  console.log(userChosenColour);

  userClickedPattern.push(userChosenColour);
  console.log(userClickedPattern);

  checkAnswer(userClickedPattern.length - 1);
  console.log(userClickedPattern.length - 1);

  animatePress(userChosenColour);
  playSound(userChosenColour);
});

//playing sounds
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

//animation for 60 miliseconds.
function animatePress(currentColour) {
  //adding the class
  $("." + currentColour).addClass("pressed");

  setTimeout(function () {
    $("." + currentColour).removeClass("pressed");
  }, 60);
}

//checking answers

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("success");

    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("fail");
    //playing wrong audio
    var wrongAudio = new Audio("sounds/wrong.mp3");
    wrongAudio.play();

    //changing background.
    $("body").addClass("game-over");

    setTimeout(function(){

        $("body").removeClass("game-over");

    },200);

    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();

  }
}

function startOver(){

    level = 0;
    gamePattern = [];
    started = false;
}
