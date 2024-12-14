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
            first = evaluate();
            second = "";
            currentOperator = button.textContent;
        }
        else if (button.textContent == "=" && operatorCount == 1) {
            first = evaluate();
            second = "";
            currentOperator = "";
            operatorCount = 0;
        }

        display.textContent = first + " " + currentOperator + " " + second;
    })

    console.log(button.getAttribute("id"));
});

function evaluate() {
    let answer = -1;
    switch (currentOperator) {
        case "+":
            answer = Number(first) + Number(second);
            console.log(answer);
            break;
        case "-":
            answer = Number(first) - Number(second);
            console.log(answer);
            break;
        case "*":
            answer = Number(first) * Number(second);
            break;
        case "/":
            answer = Number(first) / Number(second);
            break;
    }
    return answer;
}
