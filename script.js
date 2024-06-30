const resultElement = document.getElementById('result')
const clearAllBtn = document.getElementById('clear-all')
const clearBtn = document.getElementById('clear')
const divideBtn = document.getElementById('divide')
const multiplyBtn = document.getElementById('multiply')
const subBtn = document.getElementById('sub')
const addBtn = document.getElementById('add')
const dotBtn = document.getElementById('dot')
const equaltoBtn = document.getElementById('equal-to')

const numbersBtn = document.querySelectorAll('.number')

//creating variables for calculte the operations
let result = ''
let operation= ''
let previousOperand = 0;

//function of appendNumbers
function appendNumbers(numbers){
    if(numbers === '.' && result.includes('.')){
        return
    }
    result += numbers,
    updateDisplay();
}

//update display function
const updateDisplay = () => {
    if(operation){
        resultElement.innerText =`${previousOperand} ${operation} ${result}`
    }else{
        resultElement.innerText = result
    }
    
}

//function calculate Result 
const calculateResult = ()=>{
    let evaluatedResult;
    const prev = parseFloat(previousOperand);
    const curr = parseFloat(result);
    if(isNaN(prev)||isNaN(curr))return
    switch (operation) {
        case '+':
            evaluatedResult = prev + curr
            break;
            case '-':
            evaluatedResult = prev - curr
            break;
            case '*':
            evaluatedResult = prev * curr
            break;
            case '/':
            evaluatedResult = prev / curr
            break;
    
        default:
            return;
    }

    result = evaluatedResult.toString();
    operation ='';
    previousOperand = '';

}

//function to select operator
const selectOperator = (operatorValue)=> {
    if(result === '')return
    if(operation !=='' && previousOperand !==''){
        calculateResult();
    }
    operation = operatorValue
    previousOperand = result
    result = ''
    updateDisplay()
}

//Adding eventListener for number button
numbersBtn.forEach((button)=>{
    button.addEventListener('click',()=>{
        // console.log(button.innerText)
        appendNumbers(button.innerText)
    })
})

//function to clear the display
const clearDisplay = ()=>{
    result = ''
    previousOperand = ''
    operation = ''
    updateDisplay()
}

// function too  delete last digit from display element
const deleteLastDigits = () => {
    if (operation !== "" && result === "") {
      operation = "";
      result = previousOperand;
      previousOperand = "";
      updateDisplay();
    } else {
      result = result.slice(0, -1);
      updateDisplay();
    }
  };


//eventlistner for dotbutton 
dotBtn.addEventListener('click',()=>{appendNumbers('.')})
addBtn.addEventListener('click',()=>{selectOperator('+')})
subBtn.addEventListener('click',()=>{selectOperator('-')})
multiplyBtn.addEventListener('click',()=>{selectOperator('*')})
divideBtn.addEventListener('click',()=>{selectOperator('/')})
equaltoBtn.addEventListener('click',()=>{
    if(result === '')return
    calculateResult();
    updateDisplay();
    result ='';
    operation = '';
})

clearAllBtn.addEventListener('click', clearDisplay)
clearBtn.addEventListener('click',deleteLastDigits)


