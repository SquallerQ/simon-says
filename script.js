const easyLevelArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
const mediumLevelArray = ["q","w","e","r","t","y","u","i","o","p","a","s","d","f","g","h","j","k","l","z","x","c","v","b","n","m"];
const hardLevelArray = [1,2,3,4,5,6,7,8,9,0,"q","w","e","r","t","y","u","i","o","p","a","s","d","f","g","h","j","k","l","z","x","c","v","b","n","m"];

const body = document.querySelector("body");
let isInputAllowed;

const gameInformation = {
  round: 1,
  difficult: "easy",
  currentSequence: "",
  repeatSequence: true
};

const soundRoundWin = new Audio("media/round-win.mp3");
const soundGameWin = new Audio("media/game-win.mp3");
const soundError = new Audio("media/error.mp3");
const soundLose = new Audio("media/lose-game.mp3");
function playSound(sound) {
  sound.play();
}

function startScreen () {
  isInputAllowed = false;
  while (body.firstChild) {
    body.removeChild(body.firstChild);
  }
  changeDifficult(gameInformation);
  createVirtualKeyboard(gameInformation);
  startGame(gameInformation);
}
startScreen()


function changeDifficultHandler () {
  const difficultMenu = document.querySelector(".start-screen__difficult-items");
  if (difficultMenu) {
    difficultMenu.addEventListener("click", function (event) {
      const clickedItem = event.target;

      if (clickedItem.classList.contains("start-screen__difficult-item")) {
      const difficultInformation = clickedItem.innerText.toLowerCase();
      gameInformation.difficult = difficultInformation;
      startScreen();
      }
    });
  }
}

function changeDifficult(_gameInformation) {
  const startScreenBlock = document.createElement("div");
  startScreenBlock.classList.add("start-screen__difficult");
  body.append(startScreenBlock);

  const levelDifficultBlock = document.createElement("div");
  levelDifficultBlock.classList.add("start-screen__difficult-items");
  startScreenBlock.append(levelDifficultBlock);

  const levelDifficultEasy = document.createElement("div");
  const levelDifficultMedium = document.createElement("div");
  const levelDifficultHard = document.createElement("div");

  levelDifficultEasy.innerText = "Easy";
  levelDifficultMedium.innerText = "Medium";
  levelDifficultHard.innerText = "Hard";

  levelDifficultEasy.classList.add("start-screen__difficult-item");
  levelDifficultMedium.classList.add("start-screen__difficult-item");
  levelDifficultHard.classList.add("start-screen__difficult-item");

  levelDifficultBlock.append(levelDifficultEasy);
  levelDifficultBlock.append(levelDifficultMedium);
  levelDifficultBlock.append(levelDifficultHard);

  levelDifficultBlock.addEventListener('click', changeDifficultHandler)

  levelDifficultEasy.classList.remove('start-screen__difficult-item--active')
  levelDifficultMedium.classList.remove('start-screen__difficult-item--active')
  levelDifficultHard.classList.remove('start-screen__difficult-item--active')

  if (_gameInformation.difficult === "easy") {
    levelDifficultEasy.classList.add("start-screen__difficult-item--active");
  } else if (_gameInformation.difficult === "medium") {
    levelDifficultMedium.classList.add("start-screen__difficult-item--active");
  } else if (_gameInformation.difficult === "hard") {
    levelDifficultHard.classList.add("start-screen__difficult-item--active");
  }
  changeDifficultHandler();
}

function startGame(_gameInformation) {

  const startButtonBlock = document.createElement("div");
  startButtonBlock.classList.add("start-button");
  startButtonBlock.innerText = 'Start Game';
  body.append(startButtonBlock);

  startButtonBlock.addEventListener("click", () => {
    renderPage();
  });

}

function restartGame() {
  document.removeEventListener("keydown", listenPhysicalKeyboard);
  document.removeEventListener("keyup", listenPhysicalKeyboard);
  gameInformation.round = 1;
  gameInformation.currentSequence = "";
  gameInformation.repeatSequence = true;
  startScreen();
};

function repeatSequence () {  
  if (gameInformation.repeatSequence === true) {   
    const input = document.querySelector(".input");
    input.innerText = ''

    const sequence = gameInformation.currentSequence;
    displaySequence(sequence);
    document.addEventListener("keydown", listenPhysicalKeyboard);
    document.addEventListener("keyup", listenPhysicalKeyboard);

    const repeatButton = document.querySelector(".option__repeat-sequence");
    if (repeatButton) {
      repeatButton.removeEventListener("click", repeatSequence);
    }  
    const newGameButton = document.querySelector(".option__new-game");
    if (newGameButton) {
      newGameButton.removeEventListener("click", restartGame);
    }  
  } else {
    return
  }
  gameInformation.repeatSequence = false;
  const inputBlock = document.querySelector(".input__block");
  inputBlock.classList.remove("input__block-error");
  
}
function displaySequence(sequence) {
  const output = document.querySelector(".output");
  let index = 0;

  const highlightDuration = 700;
  disableInput();

    const newGameButton = document.querySelector(".option__new-game");
    const repeatButton = document.querySelector(".option__repeat-sequence");
    if (newGameButton) newGameButton.classList.add("disabled");
    if (repeatButton) repeatButton.classList.add("disabled");

  const interval = setInterval(() => {
    if (index < sequence.length) {
      output.innerText = sequence[index];
      const key = document.querySelector(`.key[data-key="${sequence[index]}"]`);
      if (key) {
        key.classList.add("highlight");
        setTimeout(() => {
          key.classList.remove("highlight");
        }, highlightDuration);
      }
      index++;
    } else {
      clearInterval(interval);
      setTimeout(() => {
        output.innerText = "";
        enableInput();

        if (newGameButton) {
          newGameButton.classList.remove("disabled");
          newGameButton.addEventListener('click', restartGame)
        } 
        if (repeatButton) {
          repeatButton.classList.remove("disabled");
          repeatButton.addEventListener("click", repeatSequence);
        }
      }, 1000);
    }
  }, 1000);
}
function disableInput() {
  isInputAllowed = false;
  toggleVirtualKeyboard(false);
}

function enableInput() {
  isInputAllowed = true;
  toggleVirtualKeyboard(true);
}
function toggleVirtualKeyboard(status) {
  const keys = document.querySelectorAll(".key");
  keys.forEach((key) => {
    if (status === true) {
      key.classList.remove("disabled");
    } else {
      key.classList.add("disabled");
    }
  });
}
function renderPage() {
  while (body.firstChild) {
    body.removeChild(body.firstChild);
  }
  renderLevelInformation(gameInformation);
  createNewGameAndRepeatButtons();
  createOutputField(gameInformation);
  createInputField();
  createVirtualKeyboard(gameInformation);
  disableInput();

  document.addEventListener("keydown", listenPhysicalKeyboard);
  document.addEventListener("keyup", listenPhysicalKeyboard);
  gameInformation.repeatSequence = true;
  
}
function renderLevelInformation(_gameInformation) {
  const levelInformation = document.createElement("div");
  levelInformation.classList.add("level-information");
  body.append(levelInformation);

  const levelDifficultBlock = document.createElement("div");
  levelDifficultBlock.classList.add("level-information__difficult-items");
  levelInformation.append(levelDifficultBlock);

  
  const levelDifficultEasy = document.createElement("div");
  const levelDifficultMedium = document.createElement("div");
  const levelDifficultHard = document.createElement("div");

  levelDifficultEasy.innerText = "Easy";
  levelDifficultMedium.innerText = "Medium";
  levelDifficultHard.innerText = "Hard";

  levelDifficultEasy.classList.add("level-information__difficult-item");
  levelDifficultMedium.classList.add("level-information__difficult-item");
  levelDifficultHard.classList.add("level-information__difficult-item");

  levelDifficultBlock.append(levelDifficultEasy);
  levelDifficultBlock.append(levelDifficultMedium);
  levelDifficultBlock.append(levelDifficultHard);


  levelDifficultEasy.classList.remove('level-information__difficult-item--active')
  levelDifficultMedium.classList.remove('level-information__difficult-item--active')
  levelDifficultHard.classList.remove('level-information__difficult-item--active')
  
  if (gameInformation.difficult === 'easy') {
    levelDifficultEasy.classList.add("level-information__difficult-item--active");
  } else if (gameInformation.difficult === 'medium') {
    levelDifficultMedium.classList.add("level-information__difficult-item--active");
  } else if (gameInformation.difficult === 'hard') {
    levelDifficultHard.classList.add("level-information__difficult-item--active");
  }


  const currentRound = document.createElement("div");
  currentRound.classList.add("level-information__round");
  currentRound.innerText = `Current round: ${gameInformation.round}/5`;
  levelInformation.append(currentRound);

}

function createNewGameAndRepeatButtons () {
  const gameOptionBlock = document.createElement("div");
  gameOptionBlock.classList.add("option");
  body.append(gameOptionBlock);


  const newGameButton = document.createElement("div");
  newGameButton.classList.add("option__new-game");
  newGameButton.innerText = 'New Game'
  gameOptionBlock.append(newGameButton);
  // newGameButton.addEventListener('click', restartGame)

  const repeatButton = document.createElement("div");
  repeatButton.classList.add("option__repeat-sequence");
  repeatButton.innerText = "Repeat Sequence";
  gameOptionBlock.append(repeatButton);
  // repeatButton.addEventListener("click", repeatSequence);



};

function createOutputField(_gameInformation) {
  const divForOutput = document.createElement("div");
  divForOutput.classList.add("output__block");
  body.append(divForOutput);

  const output = document.createElement("div");
  output.classList.add("output");
  divForOutput.append(output);

  let numberOfCharacters;

  let characterArray;
  if (_gameInformation.difficult === "easy") {
    characterArray = easyLevelArray;
  } else if (_gameInformation.difficult === "medium") {
    characterArray = mediumLevelArray;
  } else if (_gameInformation.difficult === "hard") {
    characterArray = hardLevelArray;
  } else {
    return;
  }
  
  if (_gameInformation.round === 1) {
    numberOfCharacters = 2;
  } else if (_gameInformation.round === 2) {
    numberOfCharacters = 4;
  } else if (_gameInformation.round === 3) {
    numberOfCharacters = 6;
  } else if (_gameInformation.round === 4) {
    numberOfCharacters = 8;
  } else if (_gameInformation.round === 5) {
    numberOfCharacters = 10;
  } else {
    return;
  }

  const sequence = [];
  for (let i = 0; i < numberOfCharacters; i++) {
    const randomIndex = Math.floor(Math.random() * characterArray.length);
    sequence.push(characterArray[randomIndex]);
  }

  console.log(sequence);
  
  gameInformation.currentSequence = sequence;
  displaySequence(sequence);
}



function createInputField() {
  const divForInput = document.createElement("div");
  divForInput.classList.add("input__block");
  body.append(divForInput);

  const input = document.createElement("div");
  input.classList.add("input");
  divForInput.append(input);
}





function createVirtualKeyboard(_gameInformation) {
  const divForKeyboard = document.createElement("div");
  divForKeyboard.classList.add("divForKeyboard");
  body.append(divForKeyboard);

  let characterArray;
  if (_gameInformation.difficult === 'easy') {
    characterArray = easyLevelArray;
  } else if (_gameInformation.difficult === "medium") {
    characterArray = mediumLevelArray;
  } else if (_gameInformation.difficult === "hard") {
    characterArray = hardLevelArray;
  } else {
    return;
  }  

  for (let i = 0; i < characterArray.length; i++) {
    const key = document.createElement("div");
    key.classList.add("key");
    key.innerText = characterArray[i];
    key.setAttribute('data-key', characterArray[i].toString().toLocaleLowerCase())
    divForKeyboard.append(key);
  }
  const keyBoard = document.querySelector(".divForKeyboard");
  if (keyBoard) {
    keyBoard.addEventListener("click", listenClick);
  }
}

let pressedKeysArray = [];
let firstKeyPressed = null; 

function listenPhysicalKeyboard(event) {
  if (!isInputAllowed) return;

  const keyPressed = event.key.toLocaleLowerCase();
  let characterArray;

  if (gameInformation.difficult === "easy") {
    characterArray = easyLevelArray;
  } else if (gameInformation.difficult === "medium") {
    characterArray = mediumLevelArray;
  } else if (gameInformation.difficult === "hard") {
    characterArray = hardLevelArray;
  } else {
    return;
  }
  if (event.type === "keydown") {
    if (!pressedKeysArray.includes(keyPressed)) {
      if (firstKeyPressed === null) {
          firstKeyPressed = keyPressed;
          }
          pressedKeysArray.push(keyPressed);
     }   
   } else if (event.type === "keyup") {
    const keyIndex = pressedKeysArray.indexOf(keyPressed);
    if (keyIndex > -1) {
      pressedKeysArray.splice(keyIndex, 1);
    }
    if (pressedKeysArray.length === 0) {
      if (firstKeyPressed && (characterArray.includes(firstKeyPressed) || characterArray.includes(parseInt(firstKeyPressed)))) {
        const key = document.querySelector(`.key[data-key="${firstKeyPressed}"]`);
          if (key) {
            highlightKey(key);
            changeInput(key);
            }
          }
        firstKeyPressed = null; 
      }
   }
}

function listenClick(event) {
   if (!isInputAllowed || pressedKeysArray.length > 0) return;
  let clickedButton = event.target;
  if (clickedButton.classList.contains("key")) {
    highlightKey(clickedButton);
    changeInput(clickedButton);
  } else {
    return;
  }
  clickedButton = "";
}
function highlightKey(key) {
  const currentlyHighlightedKey = document.querySelector(".key--highlighted");
  if (currentlyHighlightedKey) {
    currentlyHighlightedKey.classList.remove("key--highlighted");
  }
  key.classList.add("key--highlighted");
  setTimeout(() => {
    key.classList.remove("key--highlighted");
  }, 500);
}

function changeInput(key) {
  const input = document.querySelector(".input");
  const inputBlock = document.querySelector(".input__block");
  if (input) {
    let inputValue = input.innerText;
    let keyValue = key.innerText;

    inputValue = inputValue + keyValue;
    input.innerText = inputValue;


    if (isPartialMatch(inputValue, gameInformation.currentSequence) === false) {
      inputBlock.classList.add("input__block-error");
      if (gameInformation.repeatSequence) {
        input.innerText = "Incorrect sequence! Try again.";
        playSound(soundError);
      } else {
        input.innerText = "You lost! Restart the game.";
        playSound(soundLose);
      }

      toggleVirtualKeyboard(false);
      document.removeEventListener("keydown", listenPhysicalKeyboard);
      document.removeEventListener("keyup", listenPhysicalKeyboard);
      return;
    }

    inputBlock.classList.remove("input__block-error");

      if (inputValue.length === gameInformation.currentSequence.length) {
      gameInformation.round++;
      if (gameInformation.round > 5) {
        inputBlock.style.backgroundColor = "green";
        input.innerText = "Congratulations! You completed all rounds.";
        playSound(soundGameWin);
        gameInformation.repeatSequence = false;
        toggleVirtualKeyboard(false);
        document.removeEventListener("keydown", listenPhysicalKeyboard);
        document.removeEventListener("keyup", listenPhysicalKeyboard);
      } else {
        inputBlock.style.backgroundColor = "green";
        input.innerText = "You won this round";
        playSound(soundRoundWin);
        toggleVirtualKeyboard(false);
        document.removeEventListener("keydown", listenPhysicalKeyboard);
        document.removeEventListener("keyup", listenPhysicalKeyboard);
        gameInformation.repeatSequence = false;
        replaceRepeatWithNextButton();
      }
    }
  }

}

function isPartialMatch(inputValue, currentSequence) {
  for (let i = 0; i < inputValue.length; i++) {
    if (inputValue[i] !== currentSequence[i].toString()) {
      return false;
    }
  }
  return true;
}

function replaceRepeatWithNextButton() {
  const repeatButton = document.querySelector(".option__repeat-sequence");
  if (repeatButton) {
    repeatButton.innerText = "Next Round";
    repeatButton.classList.remove("option__repeat-sequence");
    repeatButton.classList.add("option__next-round");
    repeatButton.removeEventListener("click", repeatSequence);
    repeatButton.addEventListener("click", () => {
      renderPage();
    });
  }
}












