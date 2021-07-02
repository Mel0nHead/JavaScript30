const playButton = document.querySelector("button[title='Toggle Play']");
const video = document.querySelector("video");
const volumeSlider = document.querySelector("input[name='volume']");
const playbackRateSlider = document.querySelector("input[name='playbackRate']");
const skipForwardButton = document.querySelector("button[data-skip='25']");
const skipBackwardButton = document.querySelector("button[data-skip='-10']");

const progressBar = document.querySelector(".progress__filled");

setInterval(function () {
  if (video.readyState) {
    const completionPercent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${completionPercent}%`;
  }
}, 500);

function togglePlay() {
  if (!video.paused) {
    playButton.innerHTML = "►";
    video.pause();
  } else {
    playButton.innerHTML = "||";
    video.play();
  }
}

function handleVolumeChange() {
  video.volume = this.value;
}

function handlePlaybackRateChange() {
  video.playbackRate = this.value;
}

function handleSkipForward() {
  console.log(video.duration);
  video.currentTime += 25;
}

function handleSkipBackward() {
  video.currentTime -= 10;
}

playButton.addEventListener("click", togglePlay);
volumeSlider.addEventListener("input", handleVolumeChange);
playbackRateSlider.addEventListener("input", handlePlaybackRateChange);
skipForwardButton.addEventListener("click", handleSkipForward);
skipBackwardButton.addEventListener("click", handleSkipBackward);
video.addEventListener("click", togglePlay);
