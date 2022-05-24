const slider = document.querySelector('.items');
let isDown = false; // check if the mouse is being clicked
let startX; // keep the coordinate x, where the mouse was clicked at
let scrollLeft;

slider.addEventListener('mousedown', (e) => {
  isDown = true;
  slider.classList.add('active');
  // pageX: https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/pageX
  // offsetLeft: https:// developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetLeft
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
});

slider.addEventListener('mouseleave', () => {
  isDown = false;
  slider.classList.remove('active');
});

slider.addEventListener('mouseup', () => {
  isDown = false;
  slider.classList.remove('active');
});

slider.addEventListener('mousemove', (e) => {
  if (!isDown) return; // stop the function from running
  e.preventDefault();
  const x = e.pageX - slider.offsetLeft; // tracking the current mouse's x coordinate
  const walk = x - startX;
  slider.scrollLeft += walk;
  console.log({ x, startX });
  console.log(walk);
});
