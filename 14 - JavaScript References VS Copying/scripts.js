// start with strings, numbers and booleans
let floor = 7;
let floor2 = floor;
console.log(floor, floor2); // 7 7
floor = 25;
console.log(floor, floor2); // 25 7

// same thing work with string as well
let cool_name = 'Renato';
let cool_name2 = cool_name;
console.log(cool_name, cool_name2);
cool_name = 'Alyona';
console.log(cool_name, cool_name2);

// Let's say we have an array
const players = ['Wes', 'Sarah', 'Ryan', 'Poppy'];

// and we want to make a copy of it
const team = players;
console.log(players, team);

// You might think we can just do something like this:
team[3] = 'Lex';

// however what happens when we update that array?
console.log(players, team);
// team[3] = 'Lex'; also changed players[3] to 'Lex'
// team is just a reference to the original array which is players(shallow copy)
// They both point to the same array!

// So, how do we fix this? We take a deep copy instead using slice() method
const fruits = ['avocado', 'blueberry', 'cherry', 'lemon', 'watermelon']

// one way
const fruits2 = fruits.slice();

// or create a new array and concat the old one in
const fruits3 = [].concat(fruits);

// or use the new ES6 Spread
const fruits4 = [...fruits];

// one more!
const fruits5 = Array.from(fruits);

// now when we update it, the original one isn't changed
fruits2[0] = 'apple';
fruits3[0] = 'lime';
fruits4[0] = 'grapefruits';
fruits5[0] = 'orange';

console.log(fruits, 'original array');
console.log(fruits2);
console.log(fruits3);
console.log(fruits4);
console.log(fruits5);

// The same thing goes for objects, let's say we have a person object

// with Objects
const person = {
  name: 'Wes Bos',
  age: 80
};

console.log(person);
const person_shallow_copy = person;

person_shallow_copy.age = 200;
console.log(person);

// how do we take a copy instead?
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign#cloning_an_object
// syntax: Object.assign(target, ...sources)
const person_deep_copy = Object.assign({}, person);

person_deep_copy.place = 'Osaka';
console.log(person, 'original array');
console.log(person_deep_copy);

// spread syntax for object literals is new in ECMAScript 2018)
const person_deep_copy2 = {...person};

person_deep_copy2.workplace = 'Tokyo';
console.log(person, 'original array');
console.log(person_deep_copy2);

/*
// Things to note - these are only 1 level deep - both for Arrays and Objects.
// lodash has a cloneDeep method, but you should think twice before using it.

console.clear();

const wes = {
    name: 'Wes',
    age: 200,
    social: {
        twitter: '@wesbos',
        blog: 'www.wesbos.com',
        facebook: 'wesbos.developer',
    }
}

// const wes_spread_copied = Object.assign({}, wes);
const wes_spread_copied = {...wes};
console.log(wes);
console.log(wes_spread_copied);

wes_spread_copied.social.twitter = '@coolguy';
console.log(wes);
console.log(wes_spread_copied);

// cf. poor man's deep clone <- not recommended but it works
// need to check performance before using it though
const wes_cheated = JSON.parse(JSON.stringify(wes));

*/
