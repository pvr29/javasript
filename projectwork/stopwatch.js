const timerDisplay = document.getElementById('timer');
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const resetBtn = document.getElementById('resetBtn');

let startTime;
let elapsedTime = 0;
let timerInterval;

function startTimer() {
  startTime = Date.now() - elapsedTime;
  timerInterval = setInterval(updateTimer, 10);
}

function stopTimer() {
  clearInterval(timerInterval);
}

function resetTimer() {
  clearInterval(timerInterval);
  elapsedTime = 0;
  updateTimer();
}

function updateTimer() {
  const currentTime = Date.now();
  elapsedTime = currentTime - startTime;
  const formattedTime = formatTime(elapsedTime);
  timerDisplay.textContent = formattedTime;
}

function formatTime(time) {
  const totalSeconds = Math.floor(time / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const milliseconds = Math.floor((time % 1000) / 10);
  return `${padTime(minutes)}:${padTime(seconds)}:${padTime(milliseconds)}`;
}

function padTime(time) {
  return time < 10 ? `0${time}` : time;
}

startBtn.addEventListener('click', startTimer);
stopBtn.addEventListener('click', stopTimer);
resetBtn.addEventListener('click', resetTimer);
