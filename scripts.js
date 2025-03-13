const form = document.getElementById("form");
const submit = document.getElementById("submit");
const completed = document.getElementById("completed");

document.addEventListener("DOMContentLoaded", function () {
    completed.style.display = "none";
});

// Form element
const cardname = document.getElementById("name");
const cardnumber = document.getElementById("number");
const month = document.getElementById("month");
const year = document.getElementById("year");
const cvc = document.getElementById("cvc");

// Error element
const errorName = document.getElementById("error-name");
const errorNumber = document.getElementById("error-number");
const errorDate = document.getElementById("error-date");
const errorCVC = document.getElementById("error-cvc");

function validateInput() {

    // Clear error message
    errorName.textContent = "";
    errorNumber.textContent = "";
    errorDate.textContent = "";
    errorCVC.textContent = "";

    let isValid = "true";

    function error(error, message) {
        error.textContent = message;
        isValid = "false";
    }

    if (cardname.value === "") {
        error(errorName, "Can't be blank");
    }

    if (cardnumber.value === "") {
        error(errorNumber, "Can't be blank");
    } else if (isLetter(cardnumber.value)) {
        error(errorNumber, "Wrong format, numbers only");
    }

    if (month.value === "") {
        error(errorDate, "Can't be blank");
    }

    if (year.value === "") {
        error(errorDate, "Can't be blank");
    }

    if (cvc.value === "") {
        error(errorCVC, "Can't be blank");
    }

    return isValid;
}

function main() {
    submit.addEventListener("submit", validateInput);
    const valid = validateInput();

    if (!valid) {
        completed.style.display = "flex";
    }
}

