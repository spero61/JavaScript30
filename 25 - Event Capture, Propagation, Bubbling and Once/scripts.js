const divs = document.querySelectorAll('div');
const btn = document.querySelector('.btn');

// bubbling
function logText(e) {
  console.log(this.classList.value);

  // prevents further propagation of the current event in the capturing and bubbling phases
  e.stopPropagation(); // https://developer.mozilla.org/en-US/docs/Web/API/Event/stopPropagation
}

// bubble up (by default, capture: false)
divs.forEach((div) => div.addEventListener('click', logText, { capture: false, once: true }));

// capture down (we will run the function on the way down rather than on the way up)
// divs.forEach((div) => div.addEventListener('click', logText, { capture: true }));

// document.body.addEventListener('click', logText);

// once: true option - when it is clicked once then unbind it
// https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
btn.addEventListener('click', () => {
  console.log('Button clicked!');
}, { once: true });
