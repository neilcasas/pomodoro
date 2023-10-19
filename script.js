let time = 600; // Set the initial time to 10 minutes (600 seconds)
const countdown = document.getElementById('countdown');
const timerEnd = new Audio('timerend.mp3');
let isPaused = true;
const startButton = document.querySelector('.start-button');
const adjustTimeContainer = document.querySelector('.adjust-time-container');

let timerId; // Variable to store the timer ID

function startTimer() {
    startButton.style.display = 'none';
    adjustTimeContainer.style.display = 'none';
    if (timerId) {
        // Clear the existing timer
        clearInterval(timerId);
    }
    
    const inputMinutes = parseInt(document.getElementById('minutes').value);
    if (!isNaN(inputMinutes) && inputMinutes >= 1) {
        if (isPaused) {
            // Remove start button once playing

            // Resume the timer
            isPaused = false;
        } else {
            time = inputMinutes * 60;
            updateTimerDisplay();
        }

        timerId = setInterval(function() {
            if (!isPaused) {
                if (time > 0) {
                    time--;
                    updateTimerDisplay();
                } else {
                    clearInterval(timerId); // Clear the timer
                    timerEnd.play();
                    startButton.style.display = 'inline';
                    adjustTimeContainer.style.display = 'inline';
                }
            }
        }, 1000);
    }
}

function updateTimerDisplay() {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    countdown.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

function setCustomTimer() {
    const inputMinutes = parseInt(document.getElementById('minutes').value);
    if (!isNaN(inputMinutes) && inputMinutes >= 1) {
        time = inputMinutes * 60;
        updateTimerDisplay();
    }
}

function togglePause() {
    isPaused = !isPaused; // Toggle the pause state (from true to false, or false to true)
    const pauseButton = document.querySelector('.pause-button');
    pauseButton.textContent = isPaused ? 'Resume' : 'Pause'; // Update button text
}