class Calculator {
  constructor(previousOperationTxt, currentOperationTxt) {
    this.previousOperationTxt = previousOperationTxt;
    this.currentOperationTxt = currentOperationTxt;
    this.clear();
  }
  
  clear() {
    this.previousOperand = '';
    this.currentOperand = '';
    this.operand = undefined;
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  appendNumber(number) {
    if (number === "." && this.currentOperand.includes(".")) return;
    if (this.currentOperand.toString().length >= MAX_NUMBER_LENGTH) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  chooseOperation(operation) {
    if (this.currentOperand === "") return;
    // do the compute before add a new number
    if (this.previousOperand !== "") {
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
  }

  compute() {
    let computation;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(current)) return  
    switch (this.operation) {
      case "+":
        computation = prev + current;
        break;
      case "-":
        computation = prev - current;
        break;
      case "*":
        computation = prev * current;
        break;
      case "÷":
          computation = prev / current;
          break;
      case "%":
        computation = prev % current;
        break;
        default:
          return;
    }
    this.currentOperand = computation;
    this.operation = undefined;
    this.previousOperand = "";
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split(".")[0]);
    const decimalDigits = stringNumber.split(".")[1];
    let integerDisplay;
    if (isNaN(integerDigits)) {
      integerDisplay = "";
    } else {
      integerDisplay = integerDigits.toLocaleString("en", {
        maximumFractionDigits: 0 })
    }
    if (decimalDigits != null ) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }

  updateDisplay() {
    this.currentOperationTxt.innerText = this.getDisplayNumber(this.currentOperand);
    if (this.operation != null) {
      this.previousOperationTxt.innerText = `${this.previousOperand} ${this.operation}`;
    } else {
        this.previousOperationTxt.innerText = "";
    }
  }
}
  
// REFERENCE
const numbersBtns = document.querySelectorAll('[data-number]');
const operationsBtns = document.querySelectorAll('[data-operator]');
const equalBtn = document.querySelector('[data-equal]');
const allClearBtn = document.querySelector('[data-all-clear]');
const clearBtn = document.querySelector('[data-clear]');
const previousOperationTxt = document.querySelector('[data-previous-operation]');
const currentOperationTxt = document.querySelector('[data-current-operation]');


const calculator = new Calculator(previousOperationTxt, currentOperationTxt);
const MAX_NUMBER_LENGTH = 10;


numbersBtns.forEach(button => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  })
})

operationsBtns.forEach(operator => {
  operator.addEventListener("click", () => {
   calculator.chooseOperation(operator.innerText);
   calculator.updateDisplay();
  })
})

allClearBtn.addEventListener("click", () => {
  calculator.clear();
  calculator.updateDisplay();
})

clearBtn.addEventListener("click", () => {
  calculator.delete();
  calculator.updateDisplay();
})

equalBtn.addEventListener("click", () => {
  calculator.compute();
  calculator.updateDisplay();
})
