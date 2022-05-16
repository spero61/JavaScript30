// convert timeNodes from a nodeless into an array
const timeNodes = [...document.querySelectorAll('[data-time]')];

const seconds = timeNodes
.map(node => node.dataset.time)
.map(timeCode => {
    const [mins, secs] = timeCode.split(':').map(parseFloat); // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map#tricky_use_case
    return (mins * 60) + secs;
})
.reduce((total, videoSeconds) => total + videoSeconds); // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce

let secondsLeft = seconds;
const hours = Math.floor(secondsLeft / 3600);
secondsLeft = secondsLeft % 3600;

const mins = Math.floor(secondsLeft / 60);
secondsLeft = secondsLeft % 60;

document.querySelector('.result').innerText =
    `Total video time is: ${hours}h  ${mins}m ${secondsLeft}s`;

console.log('hours', 'mins', 'secondsLeft');
console.log(hours, mins, secondsLeft);