let mainTimer = 1800; // Set the initial main timer to 10 minutes (600 seconds)
let breakTimer = 900; // Set the initial break timer to 15 minutes (900 seconds)
let isMainTimer = true; // Track if it's the main timer or break timer
const countdown = document.getElementById('countdown');
const timerEnd = new Audio('timerend.mp3');
let isPaused = true;
const startButton = document.querySelector('.start-button');
const counterContainer = document.querySelector('.countdown-container');

let timerId; // Variable to store the timer ID

function startTimer() {
    startButton.style.display = 'none';
    if (timerId) {
        // Clear the existing timer
        clearInterval(timerId);
    }

    if (isMainTimer) {
        // It's the main timer
        if (isPaused) {
            // Resume the main timer
            isPaused = false;
        } else {
            updateTimerDisplay(mainTimer);
        }

        timerId = setInterval(function () {
            if (!isPaused) {
                if (mainTimer > 0) {
                    mainTimer--;
                    updateTimerDisplay(mainTimer);
                } else {
                    clearInterval(timerId); // Clear the main timer
                    timerEnd.play();
                    isMainTimer = false;
                    startTimer(); // Start the break timer
                }
            }
        }, 1000);
    } else {
        // It's the break timer
        counterContainer.style.backgroundColor = 'lightskyblue';
        if (isPaused) {
            // Resume the break timer
            isPaused = false;
        } else {
            updateTimerDisplay(breakTimer);
        }

        timerId = setInterval(function () {
            if (!isPaused) {
                if (breakTimer > 0) {
                    breakTimer--;
                    updateTimerDisplay(breakTimer);
                } else {
                    clearInterval(timerId); // Clear the break timer
                    timerEnd.play();
                    isMainTimer = true;
                    startButton.style.display = 'inline';
                    counterContainer.style.backgroundColor = 'lightgoldenrodyellow';
                }
            }
        }, 1000);
    }
}

function updateTimerDisplay(timerValue) {
    const minutes = Math.floor(timerValue / 60);
    const seconds = timerValue % 60;
    countdown.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

function setCustomTimer() {
    const inputMinutes = parseInt(document.getElementById('minutes').value);
    if (!isNaN(inputMinutes) && inputMinutes >= 1) {
        mainTimer = inputMinutes * 60;
        updateTimerDisplay(mainTimer);
    }
}

function togglePause() {
    isPaused = !isPaused; // Toggle the pause (from true to false, or false to true)
    const pauseButton = document.querySelector('.pause-button');
    pauseButton.textContent = isPaused ? 'Resume' : 'Pause'; // Update button text
}

function setCustomBreakTime() {
    const inputBreakMinutes = parseInt(document.querySelector('.break-minutes').value);
    if (!isNaN(inputBreakMinutes) && inputBreakMinutes >= 1) {
        breakTimer = inputBreakMinutes * 60; // Set the break timer based on user input
        if (!isMainTimer) {
            // If it's currently the break timer, update the displayed time
            updateTimerDisplay(breakTimer);
        }
    }
}

// Initialize the display with the main timer
updateTimerDisplay(mainTimer);