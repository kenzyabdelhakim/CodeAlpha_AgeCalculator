// ========================================
// Age Calculator - JavaScript Logic
// ========================================

// DOM Element Selection
// Get references to all HTML elements we'll interact with
const birthDateInput = document.getElementById('birthDate');
const calculateBtn = document.getElementById('calculateBtn');
const resultContainer = document.getElementById('resultContainer');
const yearsDisplay = document.getElementById('years');
const monthsDisplay = document.getElementById('months');
const daysDisplay = document.getElementById('days');
const infoText = document.getElementById('infoText');

// ========================================
// Event Listeners
// ========================================

// Add click event listener to calculate button
calculateBtn.addEventListener('click', handleCalculateAge);

// Add Enter key support for better UX
birthDateInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        handleCalculateAge();
    }
});

// ========================================
// Main Calculate Age Function
// ========================================

/**
 * Handles the age calculation process
 * - Validates the input
 * - Calculates years, months, and days
 * - Updates the UI with results or error messages
 */
function handleCalculateAge() {
    // Step 1: Get the birth date value from input
    const birthDate = birthDateInput.value;

    // Step 2: Validate - Check if date is selected
    if (!birthDate) {
        showError('Please select your birth date');
        return;
    }

    // Step 3: Convert string to Date object
    const birthDateObj = new Date(birthDate);

    // Step 4: Get today's date
    const today = new Date();

    // Step 5: Validate - Check if birth date is in the future
    if (birthDateObj > today) {
        showError('Birth date cannot be in the future');
        resetResults();
        return;
    }

    // Step 6: Calculate age (years, months, days)
    const age = calculateAgeDetails(birthDateObj, today);

    // Step 7: Display the calculated age
    displayResults(age);

    // Step 8: Show success message
    showSuccess('Age calculated successfully!');
}

// ========================================
// Age Calculation Logic
// ========================================

/**
 * Calculates the exact age in years, months, and days
 * @param {Date} birthDate - The birth date
 * @param {Date} today - Current date
 * @returns {Object} Object containing years, months, and days
 */
function calculateAgeDetails(birthDate, today) {
    // Initialize age object
    let age = {
        years: 0,
        months: 0,
        days: 0
    };

    // Step 1: Calculate years
    // Subtract birth year from current year
    age.years = today.getFullYear() - birthDate.getFullYear();

    // Step 2: Calculate months
    // Get the month difference
    age.months = today.getMonth() - birthDate.getMonth();

    // Step 3: Calculate days
    // Get the day difference
    age.days = today.getDate() - birthDate.getDate();

    // Step 4: Adjust for negative days
    // If days is negative, subtract a month and add days from previous month
    if (age.days < 0) {
        age.months--;
        // Get the number of days in the previous month
        const previousMonth = new Date(today.getFullYear(), today.getMonth(), 0);
        age.days += previousMonth.getDate();
    }

    // Step 5: Adjust for negative months
    // If months is negative, subtract a year and add months
    if (age.months < 0) {
        age.years--;
        age.months += 12;
    }

    return age;
}

// ========================================
// Display Results
// ========================================

/**
 * Updates the UI with calculated age values
 * Animates the result container into view
 * @param {Object} age - Object containing years, months, days
 */
function displayResults(age) {
    // Update the DOM with calculated values
    yearsDisplay.textContent = age.years;
    monthsDisplay.textContent = age.months;
    daysDisplay.textContent = age.days;

    // Show the result container with animation
    resultContainer.classList.add('show');
}

// ========================================
// Reset Results
// ========================================

/**
 * Resets the displayed results
 * Hides the result container
 */
function resetResults() {
    // Hide the result container
    resultContainer.classList.remove('show');

    // Reset values to 0
    yearsDisplay.textContent = '0';
    monthsDisplay.textContent = '0';
    daysDisplay.textContent = '0';
}

// ========================================
// Error Handling
// ========================================

/**
 * Displays an error message
 * Hides previous results
 * @param {string} message - Error message to display
 */
function showError(message) {
    // Remove previous success class
    infoText.classList.remove('success');

    // Add error styling
    infoText.classList.add('error');

    // Set error message
    infoText.textContent = message;

    // Reset displayed results
    resetResults();

    // Show alert to user
    alert(message);
}

// ========================================
// Success Message
// ========================================

/**
 * Displays a success message
 * @param {string} message - Success message to display
 */
function showSuccess(message) {
    // Remove previous error class
    infoText.classList.remove('error');

    // Add success styling
    infoText.classList.add('success');

    // Set success message
    infoText.textContent = message;
}

// ========================================
// Initialize
// ========================================

/**
 * Set maximum date to today (prevent future dates in date picker)
 * This also prevents users from selecting dates that would be invalid
 */
window.addEventListener('DOMContentLoaded', () => {
    // Get today's date
    const today = new Date();

    // Format: YYYY-MM-DD
    const maxDate = today.toISOString().split('T')[0];

    // Set the max attribute on the date input
    // This prevents users from selecting future dates
    birthDateInput.max = maxDate;

    // Optional: Focus on input for better UX
    birthDateInput.focus();
});