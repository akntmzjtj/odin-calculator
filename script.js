const numberButtons = document.querySelectorAll(".numbers button");
let currentDisplay = "";

numberButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const display = document.querySelector("#display");
        currentDisplay += button.getAttribute("id");

        display.textContent = currentDisplay;
    })

    console.log(button.getAttribute("id"));
});
