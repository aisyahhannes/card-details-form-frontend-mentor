const form = document.querySelector("form");
const completed = document.getElementById("completed");
const button = document.querySelector("button");

document.addEventListener("DOMContentLoaded", function () {
    completed.style.display = "none";
});

form.addEventListener("submit", validateInput);

// Form element
const cardname = document.getElementById("name");
const cardnumber = document.getElementById("number");
const cardmonth = document.getElementById("month");
const cardyear = document.getElementById("year");
const cardcvc = document.getElementById("cvc");

// Error element
const errorName = document.getElementById("error-name");
const errorNumber = document.getElementById("error-number");
const errorMonth = document.getElementById("error-month");
const errorCVC = document.getElementById("error-cvc");

// Reset error
function resetError() {
    const inputs = ["name", "number", "month", "year", "cvc"];
    inputs.forEach(id => {
        document.getElementById(id).classList.remove("error-input");
    });
}

// Input validation
function validateInput() {
    event.preventDefault();
    resetError();

    // Clear error message
    errorName.textContent = "";
    errorNumber.textContent = "";
    errorMonth.textContent = "";
    errorCVC.textContent = "";

    let isValid = true;

    // Add error class and message
    function error(input, error, message) {
        input.classList.add("error-input");
        error.textContent = message;
        error.classList.add("error");
        isValid = false;
    }

    // -- START VALIDATION -- 

    // VALIDATE NAME
    if (cardname.value === "") {
        error(cardname, errorName, "Can't be blank");
    }

    // VALIDATE CARD NUMBER
    if (cardnumber.value === "") {
        error(cardnumber, errorNumber, "Can't be blank");
    } else if (!/^[\d\s]+$/.test(cardnumber.value)) {
        error(cardnumber, errorNumber, "Wrong format, numbers only");
    } else if (!/^[\d{16}\s]+$/.test(cardnumber.value)) {
        error(cardnumber, errorNumber, "Must be 16 digits");
    }

    // VALIDATE DATE
    const todayDate = new Date();
    todayDate.setDate(1);

    const yearNum = parseInt(cardyear.value, 10); 
    const monthNum = parseInt(cardmonth.value, 10); 
    const date = yearNum + "-" + monthNum + "-" + 1;
    const cardDate = new Date(date);

    const differences = cardDate - todayDate;

    if (cardmonth.value === "") {
        error(cardmonth, errorMonth, "Can't be blank");
    }  else if ((cardmonth.value < 1) || (cardmonth.value > 12)) {
        error(cardmonth, errorMonth, "Invalid month value");
    } 

    if (cardyear.value === "") {
        error(cardyear, errorMonth, "Can't be blank");
    } else if (!/^\d{4}$/.test(cardyear.value)) {
        error(cardyear, errorMonth, "Invalid year value");
    } else if (differences < 0) {
        error(cardyear, errorMonth, "Card is expired");
    }

    // VALIDATE CVC
    if (cardcvc.value === "") {
        error(cardcvc, errorCVC, "Can't be blank");
    } else if (!/^\d{3}$/.test(cardcvc.value)) {
        error(cardcvc, errorCVC, "Must be 3 digits");
    }

    // -- END VALIDATION --

    // Complete state
    if (isValid) {
        form.style.display = "none";
        completed.style.display = "flex";
    }

    // Reset form
    function resetForm() {
        form.reset();
        form.style.display = "flex";
        completed.style.display = "none";
    }

    button.addEventListener("click", resetForm);
}
