const displayPreviousNum = document.querySelector('.previous-numbers')
const displayCurrentNum = document.querySelector('.current-numbers')
const displayTempNum = document.querySelector('.temp-result')
const numbers = document.querySelectorAll('.number')
const operations = document.querySelectorAll('.operation')
const allClear = document.querySelector('.all-clear')
const lastEntityClear = document.querySelector('.last-entity-clear')
const equalSign = document.querySelector('.equal')

let preNum = '';
let currNum = '';
let result = null;
let lastOperation = '';
let haveDot = false;

numbers.forEach(number => {
  number.addEventListener('click', (number) => {
    if(number.target.innerText === '.' && !haveDot) {
      haveDot = true;
    } else if(number.target.innerText ==='.' && haveDot) {
      return
    }
    currNum += number.target.innerText;
    displayCurrentNum.innerText = currNum;
  })
})

operations.forEach(operation => {
  operation.addEventListener('click', (operation) => {
    if(!currNum) return;
    haveDot = false;
    const operationName = operation.target.innerText;
    if(preNum && currNum && lastOperation) {
      mathOperation();
    } else {
      result = parseFloat(currNum);
    }
    clearVar(operationName);
    lastOperation = operationName;
    console.log(result)
  })
});

function clearVar(operationName =''){
  preNum += currNum + ' ' + operationName + ' ';
  displayPreviousNum.innerText = preNum;
  displayCurrentNum.innerText = '';
  currNum='';
  displayTempNum.innerText = result;
}

function mathOperation(){
  if(lastOperation === 'x'){
    result = parseFloat(result) * parseFloat(currNum)
  } else if(lastOperation === '-'){
    result = parseFloat(result) - parseFloat(currNum)
  } else if(lastOperation === '+'){
    result = parseFloat(result) + parseFloat(currNum)
  } else if(lastOperation === '/'){
    result = parseFloat(result) / parseFloat(currNum)
  } else if(lastOperation === '%'){
    result = parseFloat(result) % parseFloat(currNum)
  }
}

equalSign.addEventListener('click', (equal) => {
  if(!preNum || !currNum) return;
  haveDot = false;
  mathOperation();
  clearVar();
  displayCurrentNum.innerText = result;
  displayTempNum.innerText = '';
  currNum = result;
  preNum = '';
})

allClear.addEventListener('click', () => {
  displayPreviousNum.innerText = '0'
  displayCurrentNum.innerText = '0'
  displayTempNum.innerText = '0'
  preNum = ''
  currNum = ''
  result = ''
})

lastEntityClear.addEventListener('click', (lastClear) => {
  displayCurrentNum.innerText = '';
  currNum = ''
})

window.addEventListener('keydown', (e) => {
  if(
    e.key === '0' ||
    e.key === '1' ||
    e.key === '2' ||
    e.key === '3' ||
    e.key === '4' ||
    e.key === '5' ||
    e.key === '6' ||
    e.key === '7' ||
    e.key === '8' ||
    e.key === '9' ||
    e.key === '.' 
  ){
    clickButton(e.key);
  } else if(
    e.key ==='-' ||
    e.key ==='+' ||
    e.key ==='/' 
  ) {
    clickOperation(e.key);
  } else if(e.key === '*') {
    clickOperation('x');
  } else if(e.key === 'Enter' || e.key === '='){
    clickEqual('=');
  }
})

function clickButton(key){
  numbers.forEach(button => {
    if(button.innerText === key) {
      button.click();
    }
  })
}

function clickOperation(key){
  operations.forEach(operation => {
    if(operation.innerText === key) {
      operation.click();
    }
  })
}

function clickEqual(key){
  equalSign.click();
}

