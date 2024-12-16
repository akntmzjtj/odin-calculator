const display = document.querySelector("#display");
let currentDisplay = "";
let first = "";
let second = "";
let currentOperator = "";

// state
let firstNumberChosen = false;
let operatorChosen = false;

const numberButtons = document.querySelectorAll(".numbers .row .num");
numberButtons.forEach((button) => {
    button.addEventListener("click", () => {
        if (!firstNumberChosen) {
            first += button.textContent;
        }
        else if (!isBlank(currentOperator)) {
            // update state as the user has chosen an operator and has started
            // to enter numbers
            if (!operatorChosen) {
                operatorChosen = true;
            }

            second += button.textContent;
        }
        else {
            console.log("ERROR: must enter an operator.")
        }

        updateDisplay(first, second, currentOperator);
    })
});

const operatorButtons = document.querySelectorAll(".operators button");
operatorButtons.forEach((button) => {
    button.addEventListener("click", () => {
        /* If:      the user has entered the first number
         * Else If: the user has chosen an operator after entering a second number
         * Else:    operator buttons are disabled until a number has been entered */
        if (!operatorChosen && !isBlank(first)) {
            if (button.textContent == "=") {
                console.log("ERROR: cannot use equals button when only a single number has been entered.")
            }
            else {
                // store the chosen operator and wait for next number
                currentOperator = button.textContent;

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

                // reset
                second = "";
                operatorChosen = false;

                // check newly chosen operator
                if (button.textContent == "=") {
                    currentOperator = "";
                }
                else {
                    // store operator
                    currentOperator = button.textContent;
                }
            }
        }
        else {
            console.log("ERROR: must enter number.")
        }

        updateDisplay(first, second, currentOperator);
    })
});

const clearButton = document.querySelector("#clear");
clearButton.addEventListener("click", () => {
    // clear everything
    first = "";
    second = "";
    currentOperator = "";

    // reset operatorCount
    operatorChosen = false;
    firstNumberChosen = false;

    updateDisplay(first, second, currentOperator);
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

    return answer;
}

function updateDisplay(numOne, numTwo, operator) {
    display.textContent = numOne + " " + operator + " " + numTwo;
}

function isBlank(num) {
    return num.length == 0;
}
