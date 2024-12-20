const display = document.querySelector("#display");
const MAX_LENGTH = 16;
let currentDisplay = "";
let first = "";
let second = "";
let currentOperator = "";
let currentOperatorButton = null;
let previousOperator = "";
let previousSecond = "";

// state
let firstNumberChosen = false;
let operatorChosen = false;

// Numbers
const numberButtons = document.querySelectorAll(".numbers .row .num");
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
            first = insertNumberChosen(first, button.textContent);
            updateDisplay(first);
        }
        else if (!isBlank(currentOperator)) {
            // update state as the user has chosen an operator and has started
            // to enter numbers
            if (!operatorChosen) {
                operatorChosen = true;
            }

            second = insertNumberChosen(second, button.textContent);
            updateDisplay(second);
        }
        else {
            console.log("ERROR: must enter an operator.")
        }
    })
});

// Operators
const operatorButtons = document.querySelectorAll(".operators button");
operatorButtons.forEach((button) => {
    button.addEventListener("click", () => {
        /* If:      the user has entered the first number
         * Else If: the user has chosen an operator after entering a second number
         * Else:    operator buttons are disabled until a number has been entered */
        if (!operatorChosen && !isBlank(first)) {
            if (button.textContent == "=") {
                if (isBlank(previousOperator)) {
                    console.log("ERROR: cannot use equals button when only a single number has been entered.")
                }
                else {
                    first = operate(first, previousSecond, previousOperator);
                }
            }
            else {
                // store the chosen operator and wait for next number
                currentOperator = button.textContent;

                // glow
                button.classList.add("operate");
                currentOperatorButton = button;

                // update state
                firstNumberChosen = true;
            }
        }
        else if (operatorChosen && firstNumberChosen && !isBlank(second)) {
            // check if user is dividing by zero
            if (currentOperator == "/" && Number(second) == 0) {
                alert("Dividing by zero is undefined.")
            }
            else {
                first = operate(first, second, currentOperator);

                // store previous formula
                previousOperator = currentOperator;
                previousSecond = second;

                // reset
                second = "";
                operatorChosen = false;

                // glow
                if (currentOperatorButton != null) {
                    currentOperatorButton.classList.remove("operate");
                }

                // check newly chosen operator
                if (button.textContent == "=") {
                    currentOperator = "";
                }
                else {
                    // store operator
                    currentOperator = button.textContent;
                    button.classList.add("operate");
                    currentOperatorButton = button;
                }
            }
        }
        else {
            console.log("ERROR: must enter number.")
        }

        updateDisplay(first);
    })
});

// Decimal
const decimalButton = document.querySelector("#decimal");
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
        first = insertDecimal(first);
    }
    else if (!isBlank(currentOperator)) {
        second = insertDecimal(second);
    }

    updateDisplay(first, second, currentOperator);
});

const clearButton = document.querySelector("#clear");
clearButton.addEventListener("click", () => {
    // clear everything
    first = "";
    second = "";
    currentOperator = "";

    // reset state
    operatorChosen = false;
    firstNumberChosen = false;
    previousOperator = "";
    previousSecond = "";

    if (currentOperatorButton != null) {
        currentOperatorButton.classList.remove("operate");
    }

    updateDisplay(first);
});

function operate(numOne, numTwo, operator) {
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

    return answer.toString();
}

function updateDisplay(str) {
    if (str.length < MAX_LENGTH) {
        display.textContent = str;
    }
    else {
        display.textContent = Number(str).toExponential(MAX_LENGTH / 4);
    }
}

function isBlank(num) {
    return num.length == 0;
}
