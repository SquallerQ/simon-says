const easyLevelArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
const mediumLevelArray = ["q","w","e","r","t","y","u","i","o","p","a","s","d","f","g","h","j","k","l","z","x","c","v","b","n","m"];
const hardLevelArray = [1,2,3,4,5,6,7,8,9,0,"q","w","e","r","t","y","u","i","o","p","a","s","d","f","g","h","j","k","l","z","x","c","v","b","n","m"];

const body = document.querySelector("body");

const gameInformation = {
  round: 1,
  difficult: "easy",
  currentSequence: "",
  repeatSequence: true
};



function renderPage() {
  renderLevelInformation(gameInformation);

}
renderPage()

function createNewGameAndRepeatButtons () {
  const gameOptionBlock = document.createElement("div");
  gameOptionBlock.classList.add("option");
  body.append(gameOptionBlock);


  const newGameButton = document.createElement("div");
  newGameButton.classList.add("option__new-game");
  newGameButton.innerText = 'New Game'
  gameOptionBlock.append(newGameButton);

  const repeatButton = document.createElement("div");
  repeatButton.classList.add("option__repeat-sequence");
  repeatButton.innerText = "Repeat Sequence";
  gameOptionBlock.append(repeatButton);




};
createNewGameAndRepeatButtons();

function createOutputField(characterArray, _gameInformation) {
  const divForOutput = document.createElement("div");
  divForOutput.classList.add("output__block");
  body.append(divForOutput);

  const output = document.createElement("div");
  output.classList.add("output");
  divForOutput.append(output);

  let numberOfCharacters;

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

  let index = 0;
  const interval = setInterval(() => {
    if (index < sequence.length) {
      output.innerText = sequence[index]; 
      index++;
    } else {
      clearInterval(interval); 
      setTimeout(() => (output.innerText = ""), 1000);
    }
  }, 1000);
  return gameInformation.currentSequence = sequence;
}
createOutputField(hardLevelArray, gameInformation);




function createInputField() {
  const divForInput = document.createElement("div");
  divForInput.classList.add("input__block");
  body.append(divForInput);

  const input = document.createElement("div");
  input.classList.add("input");
  divForInput.append(input);
}
createInputField();




function createVirtualKeyboard(characterArray) {
  const divForKeyboard = document.createElement("div");
  divForKeyboard.classList.add("divForKeyboard");
  body.append(divForKeyboard);

  for (let i = 0; i < characterArray.length; i++) {
    const key = document.createElement("div");
    key.classList.add("key");
    key.innerText = characterArray[i];
    divForKeyboard.append(key);
  }
}

createVirtualKeyboard(hardLevelArray);

const keyBoard = document.querySelector(".divForKeyboard");
// console.log(keyBoard);

if (keyBoard) {
  keyBoard.addEventListener("click", listenClick);
}

function listenClick(event) {
  let clickedButton = event.target;
  if (clickedButton.classList.contains("key")) {
    changeInput(clickedButton);
  } else {
    return;
  }
  clickedButton = "";
}

function changeInput(key) {
  const input = document.querySelector(".input");
  let inputValue = input.innerText;
  let keyValue = key.innerText;
  console.log(inputValue);
  console.log(keyValue);

  inputValue = inputValue + keyValue;
  if (input) {
    input.innerText = inputValue;
  }
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


