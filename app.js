const submitBtn = document.getElementById('submit-btn');
const vehicleType = document.getElementById('vehicleType');
const plateNum = document.getElementById('plateNum');
const day = document.getElementById('day');
const time = document.getElementById('time');
const output = document.getElementById('output');

// Rules
const codingRules = {
    "Monday": [1, 2],
    "Tuesday": [3, 4],
    "Wednesday": [5, 6],
    "Thursday": [7, 8],
    "Friday": [9, 0],
}


// For Coding Start and End
const morningStart = 700;
const morningEnd = 1000;
const eveningStart = 500 + 1200; // 5 pm
const eveningEnd = 800 + 1200; // 8 am


submitBtn.addEventListener("click", function(e) {
    // Check if fields are filled;
    if(isEmptyOrSpaces(vehicleType.value) || isEmptyOrSpaces(plateNum.value) || isEmptyOrSpaces(day.value) || isEmptyOrSpaces(time.value)) {
        alert("Please fill-up all the fields");
        return;
    }

    // If Motorcycle
    const motorcyclePattern = /^[A-Z]{3}\s?\d{3}$/i;
    console.log(motorcyclePattern.test(plateNum.value));
    if(motorcyclePattern.test(plateNum.value)) {
        output.innerHTML = `Motor Vehicle ${vehicleType.value} with Plate No. ${plateNum.value} is Exempted for coding.`;
        return;
    }

    // If Weekends
    if(day.value === "Saturday" || day.value === "Sunday") {
        output.innerHTML = 'No coding in weekends.';
        return;
    }

    
    const lastDigit = plateNum.value.slice(-1);
    const isVehicleCoding = codingRules[day.value].some(code => code == lastDigit);
    const intTime = parseInt(time.value.replace(':', ''));
    

    // if Inside of the Coding Window
    if((intTime >= morningStart && intTime <= morningEnd) || (intTime >= eveningStart && intTime <= eveningEnd)){
        output.innerHTML = `Motor Vehicle ${vehicleType.value} with Plate No. ${plateNum.value} is ${isVehicleCoding ? 'CODING today' : 'NOT CODING today'}.`;
        return;
    }

    output.innerHTML = 'No coding scheme for this hour.';
});


// Empty Strings Checker
function isEmptyOrSpaces(str) {
    return str === null || str.match(/^ *$/) !== null;
}

