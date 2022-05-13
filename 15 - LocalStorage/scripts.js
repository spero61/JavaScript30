// local storage & event delegation

const addItems = document.querySelector('.add-items');
const itemsList = document.querySelector('.plates');

// on page load check if there is any item in items in localStorage
const items = JSON.parse(localStorage.getItem('items')) || [];  // https://javascript.info/nullish-coalescing-operator

function addItem(e) {
    // to stop the page from reloading when submit button is clicked
    e.preventDefault();
    
    const text = (this.querySelector('[name=item]')).value;
    const item = {
        text,
        done: false, // when it is true, check corresponding checkbox
    }
    items.push(item);  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push
    populateList(items, itemsList);
    // set those items of an array to localStorage
    // https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
    /* The keys and the values stored with localStorage are always in the UTF-16 DOMString format,
       which uses two bytes per character.
       As with objects, integer keys are automatically converted to strings. */
    localStorage.setItem('items', JSON.stringify(items));
    // console.log(localStorage.getItem('items'));

    this.reset();      // https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/reset
}

// every time you add an item this function is called (recreating an entire list)
// if you should care about performance issue try to harness React, Angular, or Vue
function populateList(plates = [], platesList) {
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
    platesList.innerHTML = plates.map((plate, i) => {
      return `
            <li>
                <input type="checkbox" data-index=${i} name="key" id="item${i}" ${plate.done ? 'checked' : ''} />
                <label for="item${i}">${plate.text}</label>
            </li>
        `;
    }).join(''); //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/join
}


function toggleDone(e) {
    // https://developer.mozilla.org/en-US/docs/Web/API/Element/matches
    if(!e.target.matches('input')) {
        return; // skip this unless it's an input tag
    }
    const elem = e.target;
    const index = elem.dataset.index;
    // flip-flopping between true and false
    items[index].done = !items[index].done;
    localStorage.setItem('items', JSON.stringify(items));
    populateList(items, itemsList);
}

addItems.addEventListener('submit', addItem);
itemsList.addEventListener('click', toggleDone);

populateList(items, itemsList);

