let display = document.getElementById("display");

function appendValue(value) {
    display.value += value;
}

function clearDisplay() {
    display.value = "";
}

function calculate() {
    try {
        display.value = eval(display.value);
    } catch {
        display.value = "Error";
    }
}

document.addEventListener("keydown", function(event) {
    if ("0123456789+-*/.".includes(event.key)) {
        display.value += event.key;
    }

    if (event.key === "Enter") {
        calculate();
    }

    if (event.key === "Backspace") {
        display.value = display.value.slice(0, -1);
    }

    if (event.key === "Escape") {
        clearDisplay();
    }
});