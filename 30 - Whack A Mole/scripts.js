const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
let lastHole;
let timeUp = false;
let score = 0;

function randomTime(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function randomHole(holes) {
  const idx = Math.floor(Math.random() * holes.length);
  const hole = holes[idx];
  // to prevent from appearing at the same hole twice in a row
  if (hole === lastHole) {
    return randomHole(holes);
  }
  lastHole = hole;
  return hole;
}

function peep() {
  const time = randomTime(250, 1000);
  const hole = randomHole(holes);
  hole.classList.add('up');
  setTimeout(() => {
    hole.classList.remove('up');
    if (!timeUp) peep(); // recursion occurs indefinately as long as the timeUp == false
  }, time);
}

function changeBackroundColor(color) {
  document.body.style.backgroundColor = color;
}

function endGame() {
  timeUp = true;
  // to sync end of the last peep and the backgroundColor transition
  setTimeout(changeBackroundColor('rgb(249, 195, 57)'), 2000);
}

function startGame() {
  scoreBoard.textContent = 0;
  timeUp = false;
  score = 0;
  peep();
  setTimeout(endGame, 10000);
  changeBackroundColor('rgb(102, 103, 171)');
}

function bonk(e) {
  if (!e.isTrusted) return; // cheater!
  score += 70;
  this.parentNode.classList.remove('up');
  scoreBoard.textContent = score;
}

moles.forEach((mole) => mole.addEventListener('click', bonk));
document.querySelector('#start').addEventListener('click', startGame);
