const display = document.querySelector("#display");
let currentDisplay = "";
let operatorCount = 0;
let first = "";
let second = "";
let currentOperator = "";

const numberButtons = document.querySelectorAll(".numbers button");
numberButtons.forEach((button) => {
    button.addEventListener("click", () => {
        if (operatorCount == 0) {
            first += button.textContent;
        }
        else if (operatorCount == 1) {
            second += button.textContent;
        }

        // display
        display.textContent = first + " " + currentOperator + " " + second;
    })

    console.log(button.getAttribute("id"));
});

const operatorButtons = document.querySelectorAll(".operators button");
operatorButtons.forEach((button) => {
    button.addEventListener("click", () => {
        // store currentOperator
        if (button.textContent != "=" && operatorCount == 0) {
            currentOperator = button.textContent;
            operatorCount++;
        }
        else if (button.textContent != "=" && operatorCount == 1) {
            first = operate(first, second, currentOperator);
            second = "";
            currentOperator = button.textContent;
        }
        else if (button.textContent == "=" && operatorCount == 1) {
            first = operate(first, second, currentOperator);
            second = "";
            currentOperator = "";
            operatorCount = 0;
        }

        display.textContent = first + " " + currentOperator + " " + second;
    })

    console.log(button.getAttribute("id"));
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
