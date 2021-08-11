const timeRemaining = document.querySelector(".display__time-left");
const endTime = document.querySelector(".display__end-time");
const buttons = document.querySelectorAll(".timer__button");

const INTERVALS_ARRAY = [];

function padNumber(num) {
  return num < 10 ? `0${num}` : `${num}`;
}

function updateEndTimeDisplay(minutes, seconds) {
  const now = new Date();
  const secs = now.getSeconds() + seconds;
  const mins = now.getMinutes() + minutes;

  const totalHours = now.getHours() + Math.floor(mins / 60);
  const totalMins = (mins % 60) + Math.floor(secs / 60);

  endTime.textContent = `${totalHours}:${padNumber(totalMins)}`;
}

function convertSecondsToMinutesAndSeconds(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return { minutes, seconds };
}

function updateTimerDisplay(minutes, seconds) {
  timeRemaining.textContent = `${minutes}:${padNumber(seconds)}`;
}

function createTimerInterval(minutes, seconds) {
  const interval = setInterval(timer, 1000);
  INTERVALS_ARRAY.push(interval);

  let remainingMinutes = minutes;
  let remainingSeconds = seconds;

  function timer() {
    if (!remainingSeconds && !remainingMinutes) {
      clearInterval(interval);
      return;
    }

    if (!remainingSeconds) {
      remainingMinutes -= 1;
      remainingSeconds = 59;
    } else {
      remainingSeconds -= 1;
    }

    updateTimerDisplay(remainingMinutes, remainingSeconds);
  }
}

function startTimer(totalSeconds) {
  INTERVALS_ARRAY.forEach((interval) => clearInterval(interval));
  const { minutes, seconds } = convertSecondsToMinutesAndSeconds(totalSeconds);

  updateEndTimeDisplay(minutes, seconds);
  updateTimerDisplay(minutes, seconds);
  createTimerInterval(minutes, seconds);
}

buttons.forEach((button) => {
  const seconds = Number(button.dataset.time);
  button.addEventListener("click", () => {
    startTimer(seconds);
  });
});
