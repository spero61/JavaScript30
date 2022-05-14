const hero = document.querySelector('.hero');
const text = hero.querySelector('h1');
const walk = 300; // 300px

function shadow(e) {
    // const width = hero.offsetWidth;
    // const height = hero.offsetHeight;
    const { offsetWidth: width, offsetHeight: height } = hero;

    // where the user's cursor is
    let { offsetX: x, offsetY: y } = e;

    if (this !== e.target) {
        x = x + e.target.offsetLeft;
        y = y + e.target.offsetTop;
    }

    const xWalk = Math.round(((x / width) * walk) - (walk / 2));
    const yWalk = Math.round(((y / height) * walk) - (walk / 2));

    // console.log('------------------------------------');
    // console.log('x:\t', x, 'y:\t', y);
    // console.log('width:\t', width, 'height:\t', height);
    // console.log('xWalk:\t', xWalk, 'yWalk:\t', yWalk);
    // console.log('------------------------------------');
    
    // https://developer.mozilla.org/en-US/docs/Web/CSS/text-shadow
    /* offset-x | offset-y | blur-radius | color */
    // text.style.textShadow = `${xWalk}px ${yWalk}px 0 #6667AB`;

    text.style.textShadow = `
        ${xWalk}px ${yWalk}px 0 #26547D,
        ${xWalk * -1}px ${yWalk}px 0 #EF436B,
        ${yWalk}px ${xWalk * -1}px 0 #FFCE5C,
        ${yWalk * -1}px ${xWalk}px 0 #05C793
    `;
}

// https://developer.mozilla.org/en-US/docs/Web/API/Element/mousemove_event
hero.addEventListener('mousemove', shadow);
