let startTime, updatedTime, difference, tInterval;
let running = false;
const display = document.getElementById('display');
const startStopButton = document.getElementById('startStop');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapsContainer = document.getElementById('laps');

function startStop() {
    if (!running) {
        startTime = new Date().getTime();
        tInterval = setInterval(updateTime, 10); // Update every 10 milliseconds
        startStopButton.innerText = "Stop";
        running = true;
    } else {
        clearInterval(tInterval);
        startStopButton.innerText = "Start";
        running = false;
    }
}

function reset() {
    clearInterval(tInterval);
    display.innerText = "00:00:00.00";
    startStopButton.innerText = "Start";
    running = false;
    lapsContainer.innerHTML = "";
}

function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    let milliseconds = Math.floor((difference % 1000) / 10);
    let seconds = Math.floor((difference / 1000) % 60);
    let minutes = Math.floor((difference / (1000 * 60)) % 60);
    let hours = Math.floor((difference / (1000 * 60 * 60)) % 24);

    display.innerText = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
}

function lap() {
    if (running) {
        const lapTime = display.innerText;
        const lapElement = document.createElement('div');
        lapElement.innerText = lapTime;
        lapsContainer.appendChild(lapElement);
    }
}

startStopButton.addEventListener('click', startStop);
resetButton.addEventListener('click', reset);
lapButton.addEventListener('click', lap);