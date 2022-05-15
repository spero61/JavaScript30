// Array.prototype.sort()
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort

const bands = ['The Plot in You', 'The Devil Wears Prada', 'Pierce the Veil', 'Norma Jean', 'The Bled', 'Say Anything', 'The Midway State', 'We Came as Romans', 'Counterparts', 'Oh, Sleeper', 'A Skylit Drive', 'Anywhere But Here', 'An Old Dog'];

// to ignore article parts (a, an, or the)
function strip(bandName) {
    // String.prototype.replace(): The original string is left unchanged.
    return bandName.replace(/^(a |the |an )/i, '').trim();
}

const sortedBands = bands.sort((a, b) => strip(a) > strip(b) ? 1 : -1);
    // if(strip(a) > strip(b)) {
    //     return 1;
    // } else {
    //     return -1;
    // }

document.querySelector('#bands').innerHTML =
    sortedBands
        .map(elem => `<li>${elem}</li>`)
        .join('');