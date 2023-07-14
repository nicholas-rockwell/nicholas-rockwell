// Get the result input element
const resultInput = document.getElementById("result");

// Get all the buttons
const buttons = document.getElementsByClassName("button");

// Attach click event listener to each button
for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function() {
        const buttonText = buttons[i].innerText;
        if (buttonText === "=") {
            evaluateExpression();
        } else if (buttonText === "C") {
            clearResult();
        } else {
            resultInput.value += buttonText;
        }
    });
}

// Evaluate the expression
function evaluateExpression() {
    try {
        const expression = resultInput.value;
        const result = eval(expression);
        resultInput.value = result;
    } catch (error) {
        resultInput.value = "Error";
    }
}

// Clear the result
function clearResult() {
    resultInput.value = "";
}
