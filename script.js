let time = 600; // Set the initial time to 10 minutes (600 seconds)
const countdown = document.getElementById('countdown');

function startTimer(){
    // Update the timer every second
    const timer = setInterval(function() {
        if (time > 0) {
            const minutes = Math.floor(time / 60);
            const seconds = time % 60;
            countdown.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
            time--;
        } else {
            clearInterval(timer); // Stop the timer when it reaches 0
            countdown.textContent = "Time's up!";
        }
    }, 1000); // 1000 milliseconds = 1 second
}

function pauseTimer(){
    
}