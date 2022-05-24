let countdown; // to store interval in timer() function
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');
const customInput = document.querySelector('#custom');

function displayTimeLeft(seconds) {
  let secondsLeft = seconds;
  const hours = Math.floor(secondsLeft / 3600);
  secondsLeft %= 3600;
  const minutes = Math.floor(secondsLeft / 60);
  secondsLeft %= 60;
  let display = '';
  if (hours) {
    display = `${hours}:${minutes < 10 ? '0' : ''}${minutes}:${secondsLeft < 10 ? '0' : ''}${secondsLeft}`;
  } else {
    display = `${minutes < 10 ? '0' : ''}${minutes}:${secondsLeft < 10 ? '0' : ''}${secondsLeft}`;
  }
  document.title = display;
  timerDisplay.textContent = display;
}

function displayEndTime(timestamp) {
  const end = new Date(timestamp);
  const hour = end.getHours();
  const minutes = end.getMinutes();
  endTime.textContent = `Be Back At ${hour}:${minutes < 10 ? '0' : ''}${minutes}`;
}

// setInterval() is not directly used because of performance and compatibility issues
// seconds is the amount of time ahead of current time
function timer(seconds) {
  // clear any existing timers
  // clearInterval(): https://developer.mozilla.org/en-US/docs/Web/API/clearInterval
  clearInterval(countdown);

  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/now
  const now = Date.now();
  // since Date.now() returns the number of "milliseconds" elapsed since the Unix epoch
  const then = now + seconds * 1000;
  displayTimeLeft(seconds);
  displayEndTime(then);

  countdown = setInterval(() => {
    // Math.round to deal with precision error
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    // check if we should stop it!
    if (secondsLeft < 0) {
      clearInterval(countdown);
      return;
    }
    // display it
    displayTimeLeft(secondsLeft);
  }, 1000); // 1000ms i.e., 1 secondf
}

function startTimer() {
  const seconds = parseInt(this.dataset.time, 10);
  timer(seconds);
}

buttons.forEach((button) => button.addEventListener('click', startTimer));

document.customForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const mins = customInput.minutes.value;
  //   console.log(mins);
  timer(mins * 60);
  customInput.reset();
});
