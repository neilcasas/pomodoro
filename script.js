let time = 600; // Set the initial time to 10 minutes (600 seconds)
const countdown = document.getElementById('countdown');

function startTimer() {
    const inputMinutes = parseInt(document.getElementById('minutes').value);
    if (!isNaN(inputMinutes) && inputMinutes >= 1) {
        time = inputMinutes * 60;
        updateTimerDisplay();
        const timer = setInterval(function() {
            if (time > 0) {
                time--;
                updateTimerDisplay();
            } else {
                clearInterval(timer);
                countdown.textContent = "Time's up!";
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