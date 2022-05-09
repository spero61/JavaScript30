const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');


function togglePlay() {
  const method = video.paused ? 'play' : 'pause';
  video[method]();
  //   if (video.paused) {
  //     video.play();
  //   } else {
  //     video.pause();
  //   }
}

function updateButton() {
  const icon = this.paused ? '▶️' : '⏸️';
  toggle.textContent = icon;
}

function skip() {
  // https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset
  video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
    video[this.name] = this.value;
}

function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}


/* event listeners */
https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
// https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/timeupdate_event
video.addEventListener('timeupdate', handleProgress);

// toggle play, pause button
toggle.addEventListener('click', togglePlay);

// skip buttons
skipButtons.forEach(button => button.addEventListener('click', skip));

// sliders
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

// progress bar
let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
