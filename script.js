let mainTimer = 1800; // Set the initial main timer to 10 minutes 
let breakTimer = 900; // Set the initial break timer to 15 minutes 
let isMainTimer = true; 
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
        // Main time
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
        // Break time
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
    if (!isNaN(inputMinutes) && inputMinutes >= 1 && inputMinutes <= 120) {
        mainTimer = inputMinutes * 60;
        updateTimerDisplay(mainTimer);
    } else {
        alert('Please enter a positive value between 1 and 120 for the main timer.');
    }
}

function togglePause() {
    isPaused = !isPaused; // Toggle the pause 
    const pauseButton = document.querySelector('.pause-button');
    pauseButton.textContent = isPaused ? 'Resume' : 'Pause'; // Update button text
}

function setCustomBreakTime() {
    const inputBreakMinutes = parseInt(document.querySelector('.break-minutes').value);
    if (!isNaN(inputBreakMinutes) && inputBreakMinutes >= 1 && inputBreakMinutes <= 30) {
        breakTimer = inputBreakMinutes * 60;
        updateTimerDisplay(breakTimer);
    } else {
        alert('Please enter a positive value between 1 and 30 for the break timer.');
    }
}
// Initialize the display with the main timer
updateTimerDisplay(mainTimer);