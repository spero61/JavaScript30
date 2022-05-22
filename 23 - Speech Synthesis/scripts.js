// https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisUtterance
const msg = new SpeechSynthesisUtterance();
let voices = [];
const voicesDropdown = document.querySelector('[name="voice"]');
const options = document.querySelectorAll('[type="range"], [name="text"]');
const stopButton = document.querySelector('#stop');
const speakButton = document.querySelector('#speak');
msg.text = document.querySelector('[name="text"]').value;

function populateVoices() {
  voices = this.getVoices(); // returns a arraylist and it  varies on the OS
  // console.log(voices);
  voicesDropdown.innerHTML = voices
    // .filter(voice => voice.lang.includes('en'))
    .map(voice => `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`)
    .join('');
}

window.speechSynthesis.onvoiceschanged = () =>{ console.log('voices are ready',window.speechSynthesis.getVoices()); }; 

function setVoice() {
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
  msg.voice = voices.find(voice => voice.name === this.value);
  toggle();
}

function toggle(startOver = true) {
  speechSynthesis.cancel();
  if (startOver) {
    speechSynthesis.speak(msg);
  }
}

function setOption() {
  console.log(this.name, this.value);
  msg[this.name] = this.value;
  toggle();
}

// it may take a few seconds to download selected voice
speechSynthesis.addEventListener('voiceschanged', populateVoices); // https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis/voiceschanged_event

voicesDropdown.addEventListener('change', setVoice);
options.forEach(option => option.addEventListener('change', setOption));
speakButton.addEventListener('click', toggle);
stopButton.addEventListener('click', () => toggle(false));