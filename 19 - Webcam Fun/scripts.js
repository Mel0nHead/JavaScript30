const video = document.querySelector(".player");
const canvas = document.querySelector(".photo");
const ctx = canvas.getContext("2d");
const strip = document.querySelector(".strip");
const snap = document.querySelector(".snap");

async function getVideo() {
  try {
    const videoStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: false,
    });
    video.srcObject = videoStream;
    video.play();
  } catch {
    window.alert(
      "You need to allow access to the webcam for this page to work"
    );
  }
}

function paintToCanvas() {
  const { videoHeight, videoWidth } = video;
  canvas.width = videoWidth;
  canvas.height = videoHeight;

  setInterval(() => {
    ctx.drawImage(video, 0, 0, videoWidth, videoHeight);
  }, 16);
}

function takePhoto() {
  snap.currentTime = 0;
  snap.play();

  const dataUrl = canvas.toDataURL("image/jpeg", 1.0);

  const link = document.createElement("a");
  link.href = dataUrl;
  link.setAttribute("download", "selfie");
  link.innerHTML = `<img src="${dataUrl}" alt="Selfie" />`;
  strip.insertBefore(link, strip.firstChild);
}

getVideo();
video.addEventListener("canplay", paintToCanvas);
