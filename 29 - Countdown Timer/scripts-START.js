// clicking the buttons starts the timer (with specified time amount)
// it also displays the time that the timer will run out at

function getFinishTime(minutes, seconds) {
  const now = new Date();
  const secs = now.getSeconds() + seconds;
  const mins = now.getMinutes() + minutes;

  const totalHours = now.getHours() + Math.floor(mins / 60);
  const totalMins = (mins % 60) + Math.floor(secs / 60);

  return `${totalHours}:${totalMins < 10 ? 0 : ""}${totalMins}`;
}

// hh:mm:ss
function startTimer({ minutes, seconds }) {
  //   const finishTime = getFinishTime(minutes, seconds);

  let remainingMinutes = minutes + Math.floor(seconds / 60);
  let remainingSeconds = seconds % 60;

  setInterval(() => {
    if (!remainingSeconds && !remainingMinutes) {
      console.log("timer finished");
      return;
    }

    if (!remainingSeconds) {
      remainingMinutes -= 1;
      remainingSeconds = 59;
      console.log(`${remainingMinutes}:${remainingSeconds}`);
      return;
    }

    remainingSeconds -= 1;
    console.log(`${remainingMinutes}:${remainingSeconds}`);
  }, 1000);
}
