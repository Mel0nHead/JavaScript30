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

function redEffect(pixels) {
  for (let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i] += 100;
    pixels.data[i + 1] -= 50;
    pixels.data[i + 2] *= 0.5;
  }
  return pixels;
}

function rgbSplit(pixels) {
  for (let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i - 50] = pixels.data[i];
    pixels.data[i + 50] = pixels.data[i + 1];
    pixels.data[i - 50] = pixels.data[i + 2];
  }
  return pixels;
}

function paintToCanvas() {
  const { videoHeight, videoWidth } = video;
  canvas.width = videoWidth;
  canvas.height = videoHeight;

  setInterval(() => {
    ctx.drawImage(video, 0, 0, videoWidth, videoHeight);
    let pixels = ctx.getImageData(0, 0, videoWidth, videoHeight);
    pixels = rgbSplit(pixels);
    ctx.putImageData(pixels, 0, 0);
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
