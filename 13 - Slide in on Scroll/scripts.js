// this debounce function was given at start
function debounce(func, wait = 20, immediate = true) {
  var timeout;
  return function() {
    var context = this, args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

const sliderImages = document.querySelectorAll('.slide-in');

// a function to resolve performance issues if not scrolling triggers too many times of the debounce function
function checkSlide() {
  sliderImages.forEach(sliderImage => {
    // to measure when a user scrolls down about a half way through the image
    const slideInAt = (window.scrollY + window.innerHeight) - sliderImage.height / 2;
    // to ensure same slide effects when a user scrolls up as well
    const imageBottom = sliderImage.offsetTop + sliderImage.height;
    // booleans
    const isHalfShown = slideInAt > sliderImage.offsetTop;
    const isNotScrolledPast = window.scrollY < imageBottom;
    if (isHalfShown && isNotScrolledPast) {
      sliderImage.classList.add('active');
    } else {
      sliderImage.classList.remove('active');
    }
  });
}

// https://developer.mozilla.org/en-US/docs/Web/API/Window/event
window.addEventListener('scroll', debounce(checkSlide, 30));