const display = document.querySelector("#display");
const MAX_LENGTH = 16;
let currentDisplay = "";
let firstOperand = "";
let secondOperand = "";
let currentOperator = "";
let currentOperatorButton = null;
let previousOperator = "";
let previousSecondOperand = "";

// state
let firstNumberChosen = false;
let operatorChosen = false;

// Query for elements
const numberButtons = document.querySelectorAll(".numbers .row .num");
const clearButton = document.querySelector("#clear");
const calcOperatorButtons = document.querySelectorAll(".operators .calc-operator");
const equalsButton = document.querySelector("#equals");
const decimalButton = document.querySelector("#decimal");

// Numbers
numberButtons.forEach((button) => {
    button.addEventListener("click", () => {
        let insertNumberChosen = function (currentNum, newDigit) {
            let out = currentNum;
            // first or second
            if ((currentNum.length + newDigit.length) < MAX_LENGTH) {
                out = currentNum + newDigit;
            }
            else {
                console.log("ERROR: Number length limit reached. This cannot be displayed on the screen.");
            }

            return out;
        };

        if (!firstNumberChosen) {
            firstOperand = insertNumberChosen(firstOperand, button.textContent);
            updateDisplay(firstOperand);
        }
        else if (!isBlank(currentOperator)) {
            // update state as the user has chosen an operator and has started
            // to enter numbers
            if (!operatorChosen) {
                operatorChosen = true;
            }

            secondOperand = insertNumberChosen(secondOperand, button.textContent);
            updateDisplay(secondOperand);
        }
        else {
            console.log("ERROR: must enter an operator.")
        }
    })
});

// Calc operators (+ - * /)
calcOperatorButtons.forEach((button) => {
    button.addEventListener("click", () => {
        if (!isBlank(firstOperand) && !operatorChosen) {
            firstNumberChosen = true;

            currentOperator = button.textContent;
            setGlow(button);
        }
        else if (firstNumberChosen && operatorChosen && !isBlank(secondOperand)) {
            firstOperand = operate(firstOperand, secondOperand, currentOperator);

            currentOperator = button.textContent;
            setGlow(button);
        }
        else {
            console.log("ERROR: must enter number.")
        }

        updateDisplay(firstOperand);
    });
});

// Equals button
equalsButton.addEventListener("click", () => {
    if (firstNumberChosen && operatorChosen && !isBlank(secondOperand)) {
        firstOperand = operate(firstOperand, secondOperand, currentOperator);

        // remove glow on operator
        currentOperatorButton.classList.remove("operate");
    }
    else if (!isBlank(previousOperator)) {
        firstOperand = operate(firstOperand, previousSecondOperand, previousOperator);
    }
    else {
        console.log("ERROR: cannot use equals button when only a single number has been entered.")
    }

    updateDisplay(firstOperand);
});

// Decimal point button
decimalButton.addEventListener("click", () => {
    // private method?
    const insertDecimal = function (number) {
        if (number.indexOf(".") == -1) {
            if (isBlank(number)) {
                number = "0" + decimalButton.textContent; // number = "0."
            }
            else {
                number += decimalButton.textContent;
            }
        }
        else {
            console.log("The number is already a decimal");
        }

        return number;
    }

    if (!firstNumberChosen) {
        firstOperand = insertDecimal(firstOperand);
    }
    else if (!isBlank(currentOperator)) {
        secondOperand = insertDecimal(secondOperand);
    }

    updateDisplay(firstOperand, secondOperand, currentOperator);
});

// Clear button
clearButton.addEventListener("click", () => {
    // clear everything
    firstOperand = "";
    secondOperand = "";
    currentOperator = "";
    previousOperator = "";
    previousSecondOperand = "";

    // reset state
    firstNumberChosen = false;
    operatorChosen = false;

    // remove glow
    if (currentOperatorButton != null) {
        currentOperatorButton.classList.remove("operate");
    }

    updateDisplay(firstOperand);
});

function operate(numOne, numTwo, operator) {
    if (operator == "/" && Number(numTwo) == 0) {
        alert("Dividing by zero is undefined.")

        // reset
        secondOperand = "";
        currentOperator = "";
        operatorChosen = false;

        return numOne;
    }

    let answer = null;

    switch (operator) {
        case "+":
            answer = Number(numOne) + Number(numTwo);
            console.log(answer);
            break;
        case "-":
            answer = Number(numOne) - Number(numTwo);
            console.log(answer);
            break;
        case "*":
            answer = Number(numOne) * Number(numTwo);
            console.log(answer);
            break;
        case "/":
            answer = Number(numOne) / Number(numTwo);
            console.log(answer);
            break;
    }

    // store previous formula
    previousOperator = operator;
    previousSecondOperand = numTwo;

    // reset
    secondOperand = "";
    currentOperator = "";
    operatorChosen = false;


    return answer.toString();
}

function isBlank(num) {
    return num.length == 0;
}

function setGlow(button) {
    if (currentOperatorButton != null) {
        currentOperatorButton.classList.remove("operate");
    }

    button.classList.add("operate");
    currentOperatorButton = button;
}

function updateDisplay(str) {
    if (str.length < MAX_LENGTH) {
        display.textContent = str;
    }
    else {
        display.textContent = Number(str).toExponential(MAX_LENGTH / 4);
    }
}
