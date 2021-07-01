let isVideoPlaying = false;

const playButton = document.querySelector("button[title='Toggle Play']");
const video = document.querySelector("video");
const volumeSlider = document.querySelector("input[name='volume']");
const playbackRateSlider = document.querySelector("input[name='playbackRate']");

function togglePlay() {
  if (isVideoPlaying) {
    playButton.innerHTML = "►";
    video.pause();
  } else {
    playButton.innerHTML = "||";
    video.play();
  }
  isVideoPlaying = !isVideoPlaying;
}

function handleVolumeChange() {
  video.volume = this.value;
}

function handlePlaybackRateChange() {
  video.playbackRate = this.value;
}

// TODO: handle skipping forward and back

playButton.addEventListener("click", togglePlay);
volumeSlider.addEventListener("input", handleVolumeChange);
playbackRateSlider.addEventListener("input", handlePlaybackRateChange);
