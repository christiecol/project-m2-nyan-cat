// We create an instance of the Engine class. Looking at our index.html,
// we see that it has a div with an id of `"app"`
const gameEngine = new Engine(document.getElementById("app"));

// keydownHandler is a variable that refers to a function. The function has one parameter
// (does the parameter name matter?) which is called event. As we will see below, this function
// will be called every time the user presses a key. The argument of the function call will be an object.
// The object will contain information about the key press, such as which key was pressed.
const keydownHandler = (event) => {
  // event.code contains a string. The string represents which key was press. If the
  // key is left, then we call the moveLeft method of gameEngine.player (where is this method defined?)
  if (event.code === "ArrowLeft") {
    gameEngine.player.moveLeft();
  }

  // If `event.code` is the string that represents a right arrow keypress,
  // then move our hamburger to the right
  if (event.code === "ArrowRight") {
    gameEngine.player.moveRight();
  }

  // if (event.code === 'ArrowUp') {
  //   gameEngine.player.moveUp();
  // }
};

let startButton = document.getElementById("startGame");

startButton.style.fontFamily = "'Bungee Shade', cursive";
startButton.style.color = "rgb(0, 26, 120)";
startButton.style.position = "absolute";
startButton.style.left = `${GAME_WIDTH / 7}`;
startButton.style.top = `${GAME_HEIGHT / 2}`;
startButton.style.fontSize = "3rem";
startButton.style.fontWeight = "bold";
startButton.style.border = "2px solid white";
startButton.style.borderRadius = "10px";
startButton.style.backgroundColor = "rgba(255, 255, 255, 0.5)";
startButton.style.padding = "10px 60px";

startButton.style.transform = "translatex(-50%)";
startButton.style.transform = "translatey(-50%)";

let startGame = (event) => {
  gameEngine.gameLoop();
  document.addEventListener("keydown", keydownHandler);

  startButton.removeEventListener("click", startGame);
  startButton.style.display = "none";
};

startButton.addEventListener("click", startGame);
