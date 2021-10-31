const msgEl = document.getElementById("msg");

//generate random number
const getRandomNumber = () => {
  return Math.floor(Math.random() * 100) + 1;
};

const randomNum = getRandomNumber();
console.log(randomNum);

window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = new window.SpeechRecognition();

// start recognition and game
recognition.start();

// Capture user speak
const onSpeak = (e) => {
  const msg = e.results[0][0].transcript;
  writeMessage(msg);
  checkNumber(msg);
};

// Write what user speaks
const writeMessage = (msg) => {
  console.log(msg);
  msgEl.innerHTML = `
  <div>You said: 
  <span class="box">${msg}</span>
  </div>
  `;
};
// Check msg against number
const checkNumber = (msg) => {
  const num = +msg;

  // check if valid number
  if (Number.isNaN(num)) {
    msgEl.innerHTML += "<div>That is not a valid number</div>";
    return;
  }

  // Check in range
  if (num >= 100 || num <= 1) {
    msgEl.innerHTML = "<div>Number must be between 1 and 100</div>";
    return;
  }

  // Check number
  if (num === randomNum) {
    document.body.innerHTML = `
    <h2>Congrats! You have guessed the number <br><br> It was ${num}</h2>
    <button class="play-again" id="play-again">Play Again</button>
    `;
  } else if (num > randomNum) {
    msgEl.innerHTML += "<div>GO LOWER</div>";
  } else {
    msgEl.innerHTML += "<div>GO HIGHER</div>";
  }
};

// Speak result 
recognition.addEventListener("result", onSpeak);

// End SR service
recognition.addEventListener("end", () => recognition.start());

document.body.addEventListener("click", (e) => {
  if (e.target.id == "play-again") window.location.reload();
});
