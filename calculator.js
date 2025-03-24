

const oneButton = document.querySelector("#one");
const twoButton = document.querySelector("#two");
const threeButton = document.querySelector("#three");
const fourButton = document.querySelector("#four");
const fiveButton = document.querySelector("#five");
const sixButton = document.querySelector("#six");
const sevenButton = document.querySelector("#seven");
const eightButton = document.querySelector("#eight");
const nineButton = document.querySelector("#nine");
const zeroButton = document.querySelector("#zero");

const decimalButton = document.querySelector("#decimal");
const clearButton = document.querySelector("#clear");
const equalsButton = document.querySelector("#equals");
const divideButton = document.querySelector("#divide");
const multButton = document.querySelector("#mult");
const minusButton = document.querySelector("#minus");
const plusButton = document.querySelector("#plus");

const outScreen = document.querySelector("#output");

const allButtons = document.querySelectorAll("button");

outScreen.innerHTML = '';

let firstNumber = 0;
let secondNumber = 0;

let firstNumberStr = '';
let secondNumberStr = '';

let currentOp = '';
let lastButton = '';

const opArray = ['+','-','*','/','=']

//  Function to capture numerical values for the calculator
function retrieveOperationValues(event){
    inputValue = event.target.value;

    if(inputValue === 'CE'){
        resetCalculator();
    } /*else if(inputValue === 'neg'){
        if(firstNumberStr != ''){
            firstNumber = firstNumber * -1;
            firstNumberStr = firstNumber.toString();
    } */else if (!opArray.includes(inputValue) && currentOp === ''){ 
        firstNumberStr = firstNumberStr + inputValue.toString(); 
        updateDisplay(firstNumberStr);
        firstNumber = parseFloat(firstNumberStr);
    } else if(!opArray.includes(inputValue) && currentOp != ''){
        secondNumberStr = secondNumberStr + inputValue.toString();
        updateDisplay(secondNumberStr);
        secondNumber = parseFloat(secondNumberStr);
    } else if(opArray.includes(inputValue) && firstNumberStr != '' && currentOp === ''){
        currentOp = inputValue;
        updateDisplay('');
    } else if (opArray.includes(inputValue) && secondNumberStr === ''){
        resetCalculator();
    } else if(opArray.includes(inputValue) && secondNumberStr != ''){
        if(inputValue == '='){
            console.log(firstNumber + ' ' + currentOp + ' ' + secondNumber);
            operator(currentOp, firstNumber, secondNumber);
            secondNumber = 0;
            secondNumberStr = '';
            currentOp = '';
            
        } else {
            console.log(firstNumber + ' ' + currentOp + ' ' + secondNumber);
            operator(currentOp, firstNumber, secondNumber);
            // console.log(firstNumber + ' ' + inputValue + ' ' + secondNumber);
            // operator(inputValue, firstNumber, secondNumber);

            currentOp = inputValue;

            secondNumber = 0;
            secondNumberStr = '';       
        }        
    }
}

// Function to update the display of the calculator
function updateDisplay(currentStr){
    outScreen.innerHTML = currentStr;
}

// Function to reset everything -- when CE button is clicked
function resetCalculator(){
    updateDisplay('');
    firstNumberStr = '';
    secondNumberStr = '';

    firstNumber = 0;
    secondNumber = 0;
    currentOp = '';
}


// Add Event Listners for each button
for (let i=0; i < allButtons.length; i++){
    allButtons[i].addEventListener("click", retrieveOperationValues);
}

function add(a, b){
    return Math.round((a + b) * 10000) / 10000;
}

function subtract(a,b){
    return Math.round((a - b) * 10000) / 10000;
}

function multiply(a,b){
    return Math.round((a * b) * 10000) / 10000;
}

function divide(a,b){
    return Math.round((a / b) * 10000) / 10000;
}


function operator(op, a, b){
    let answer;
    switch (op){
        case "+":
            answer = add(a,b);
            break;
        case "-":
            answer = subtract(a,b);
            break;
        case "*":
            answer = multiply(a,b);
            break;
        case "/":
            answer = divide(a,b);
            break;
    }

    if(op=='/' && b == 0){
        updateDisplay("Dumbass");

        firstNumberStr = '';
        secondNumberStr = '';
        firstNumber = 0;
        secondNumber = 0;
        currentOp = '';

    } else{
        updateDisplay(answer);
        firstNumber = answer;
    }
    
    return answer;
}