const form = document.querySelector("form");
const completed = document.getElementById("completed");

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

function resetError() {
    const inputs = ["name", "number", "month", "year", "cvc"];
    inputs.forEach(id => {
        document.getElementById(id).classList.remove("error-input");
        document.querySelector(`error-${id}`).classList.remove("error-input");
    }) 
}

function validateInput() {
    event.preventDefault();
    console.log("submitted");

    // Clear error message
    errorName.textContent = "";
    errorNumber.textContent = "";
    errorMonth.textContent = "";
    errorCVC.textContent = "";

    let isValid = true;

    function error(input, error, message) {
        input.classList.add("error-input");
        error.textContent = message;
        error.classList.add("error");
        isValid = false;
    }

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

    // -- VALIDATION -- 

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

    console.log(isValid);
    // Complete state
    if (!isValid) {
        // resetError();
    } else {
        form.style.display = "none";
        completed.style.display = "flex";
    }

}
