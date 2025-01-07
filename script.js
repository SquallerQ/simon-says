const fullCharactersArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0,"q","w","e","r","t","y","u","i","o","p","a","s","d","f","g","h","j","k","l","z","x","c","v","b","n","m"];

const body = document.querySelector('body');



function renderPage() {

  
}

function createInputField () {
  const divForInput = document.createElement("div");
  divForInput.classList.add('inputParent')
  body.append(divForInput);
  
  
  const input = document.createElement('div');
  input.classList.add("input");
  divForInput.append(input);

}
createInputField()



function createVirtualKeyboard () {
  const divForKeyboard = document.createElement("div");
  divForKeyboard.classList.add("divForKeyboard");
  body.append(divForKeyboard);

  for (let i = 0; i < fullCharactersArray.length; i++) {
    const key = document.createElement("div");
    key.classList.add('key');
    key.innerText = fullCharactersArray[i];
    divForKeyboard.append(key);
  }

}

createVirtualKeyboard()



  const keyBoard = document.querySelector(".divForKeyboard");
  // console.log(keyBoard);
  
  if (keyBoard) {
    keyBoard.addEventListener("click", listenClick);
  }

function listenClick(event) {
  let clickedButton = event.target;
  if (clickedButton.classList.contains('key')) {
    changeInput(clickedButton);    
  } else {
    return;
  }
  clickedButton = '';
}

function changeInput (key) {
  const input = document.querySelector('.input')
  let inputValue = input.innerText;
  let keyValue = key.innerText;
  console.log(inputValue);
  console.log(keyValue);
  
  inputValue = inputValue + keyValue;
  if (input) {
    input.innerText = inputValue;
  }
} 

function createLevelInformation () {
  const divForLevelInformation = document.createElement("div");
  divForLevelInformation.classList.add("divForLevelInformation");
  body.append(divForLevelInformation);
}

createLevelInformation()