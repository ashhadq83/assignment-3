/********* create variables *********/
// useful variables might be: the cost per day, the number of days selected, and elements on the screen that will be clicked or will need to be modified. 
// Do any of these variables need to be initialized when the page is loaded? 
// When do they need to be reset or updated?
let costPerDay = 35; // default full day rate
let dayCounter = 0;
const dayElements = document.querySelectorAll('.day-selector li');
const fullDayButton = document.getElementById('full');
const halfDayButton = document.getElementById('half');
const clearButton = document.getElementById('clear-button');
const calculatedCostElement = document.getElementById('calculated-cost');

// Initialize full day as selected by default
fullDayButton.classList.add('clicked');

/********* colour change days of week *********/
// when the day buttons are clicked, we will apply the "clicked" class to that element, and update any other relevant variables. Then, we can recalculate the total cost.
// added challenge: don't update the dayCounter if the same day is clicked more than once. hint: .classList.contains() might be helpful here!
dayElements.forEach(dayElement => {
    dayElement.addEventListener('click', function() {
        // Toggle the clicked state
        this.classList.toggle('clicked');
        
        // Update counter based on current state
        if (this.classList.contains('clicked')) {
            dayCounter++;
        } else {
            dayCounter--;
        }
        
        calculateTotal();
    });
});

/********* clear days *********/
// when the clear-button is clicked, the "clicked" class is removed from all days, any other relevant variables are reset, and the calculated cost is set to 0.
clearButton.addEventListener('click', function() {
    dayElements.forEach(dayElement => {
        if (dayElement.classList.contains('clicked')) {
            dayElement.classList.remove('clicked');
            dayCounter--;
        }
    });
    
    // Reset counter (alternative approach to ensure accuracy)
    dayCounter = 0;
    calculateTotal();
});

/********* change rate *********/
// when the half-day button is clicked, set the daily rate to $20, add the "clicked" class to the "half" element, remove it from the "full" element, and recalculate the total cost.
halfDayButton.addEventListener('click', function() {
    costPerDay = 20;
    halfDayButton.classList.add('clicked');
    fullDayButton.classList.remove('clicked');
    calculateTotal();
});

// when the full-day button is clicked, the daily rate is set back to $35, the clicked class is added to "full" and removed from "half", and the total cost is recalculated.
fullDayButton.addEventListener('click', function() {
    costPerDay = 35;
    fullDayButton.classList.add('clicked');
    halfDayButton.classList.remove('clicked');
    calculateTotal();
});

/********* calculate *********/
// when a calculation is needed, set the innerHTML of the calculated-cost element to the appropriate value
function calculateTotal() {
    const totalCost = dayCounter * costPerDay;
    calculatedCostElement.textContent = totalCost;
}