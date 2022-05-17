const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');
const takePhotoBtn = document.querySelector('.controls button');

function getVideo() {
  navigator.mediaDevices.getUserMedia({ video: true, audio: false }) // https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
    .then(localMediaStream => { // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
      video.srcObject = localMediaStream; // https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/srcObject
      video.play();
    })
    .catch(err => {
      console.error(`something went wrong: getVideo()`, err);
    });
}

function paintToCanvas() {
  const width = video.videoWidth;
  const height = video.videoHeight;
  canvas.width = width;
  canvas.height = height;

  return setInterval(() => {
    ctx.drawImage(video, 0, 0, width, height); // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage
    let pixels = ctx.getImageData(0, 0, width, height); // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/getImageData
    pixels = rgbSplit(pixels);
    ctx.putImageData(pixels, 0, 0);
  }, 16); // every 16ms it paints to the canvas
}

function takePhoto() {
  snap.currentTime = 0; // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio
  snap.play(); // photo taking sound

  // take the data out of the canvas
  // https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toDataURL
  const data = canvas.toDataURL('image/jpeg');
  const link = document.createElement('a');
  link.href = data;
  link.setAttribute('download', 'handsome');
  link.innerHTML = `<img src="${data}" alt="Handsome Man" />`;
  strip.insertBefore(link, strip.firstChild);
}

function rgbSplit(pixels) {
  for (let i = 0; i < pixels.data.length; i+=4) {
    pixels.data[i - 150] = pixels.data[i + 0]; // RED
    pixels.data[i + 500] = pixels.data[i + 1]; // GREEN
    pixels.data[i - 550] = pixels.data[i + 2]; // Blue
  }
  return pixels;
}

getVideo();

video.addEventListener('canplay', paintToCanvas); // https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/canplay_event