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
};

// We add an event listener to document. document the ancestor of all DOM nodes in the DOM.
document.addEventListener("keydown", keydownHandler);

const rootEl = document.getElementById("app");
const button = document.createElement("button");
const objective = document.createElement("h1");
const timerDisplay = document.createElement("h2");
const soundtrackContainer = document.getElementById("soundtrack-container");

objective.setAttribute("id", "objective");
objective.style.display = "inline-block";
objective.style.position = "relative";
objective.style.zIndex = "159";
objective.style.left = "80";
objective.style.bottom = "450";
objective.textContent = "OBJECTIVE: SURVIVE";
rootEl.appendChild(objective);

timerDisplay.setAttribute("id", "timerDisplay");
timerDisplay.style.display = "inline-block";
timerDisplay.style.position = "relative";
timerDisplay.style.zIndex = "150";
timerDisplay.style.right = 265;
timerDisplay.style.bottom = "400";
rootEl.appendChild(timerDisplay);

button.textContent = "BEGIN";
button.style.position = "relative";
button.style.zIndex = "155";
button.style.bottom = "15";
button.style.right = 325;
button.style.marginLeft = 25;
rootEl.appendChild(button);

soundtrackContainer.style.position = "relative";
soundtrackContainer.style.zIndex = "151";
soundtrackContainer.style.top = "0";
soundtrackContainer.style.display = "inline-block";

const startGame = () => {
  let audio = document.createElement("audio");
  audio.setAttribute("id", "audio");
  audio.autoplay = true;
  audio.src = "sounds/nyan-cat-song.mp3";
  audio.controls = true;
  audio.volume = 0.5;
  soundtrackContainer.appendChild(audio);
  audio.style.zIndex = "151";
  survivalTimer();
  gameEngine.gameLoop();
  button.style.display = "none";
  button.removeEventListener("click", startGame);
};
button.addEventListener("click", startGame);

const survivalTimer = () => {
  let sec = 216; //216
  let timer = setInterval(() => {
    timerDisplay.innerText = sec;
    sec--;
    if (sec < 60) {
      MAX_ENEMIES = 4;
    }
    if (sec < 0) {
      gameEngine.gameOver = true;
      clearInterval(timer);
    }
  }, 1000);
};

// We call the gameLoop method to start the game
// gameEngine.gameLoop();
