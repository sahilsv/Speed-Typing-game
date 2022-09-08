const typingText = document.querySelector(".typing-text p");
const inpField = document.querySelector(".wrapper .input-field");
const mistakeTag = document.querySelector(".mistake span");
const timeTag = document.querySelector(".time span b");
const wpmTag = document.querySelector(".wpm span");
const cpmTag = document.querySelector(".cpm span");
const tryAgainBtn = document.querySelector('.content button')

let timer,
maxTime = 60,
timeLeft = maxTime,
mistakes = charIndex = isTyping = 0;

function randomParagraph() {
  // getting a random no. as index nd it'll always be lesser than the paragraphs length
  const randIndex = Math.floor(Math.random() * paragraphs.length);
  typingText.innerHTML = ""
  // getting random item from the paragraphs array, splitting all characters of it,
  // adding each character inside span and then adding this span inside p tag
  paragraphs[randIndex].split("").forEach(span => {
    let spanTag = `<span>${span}</span>`;
    typingText.innerHTML += spanTag;
    // console.log(typingText)
  });
//   typingText.querySelectorAll("span")[0].classList.add()
  // focusing input field on pressing a key or clicking on typing section
  document.addEventListener("keydown", () => inpField.focus());
  typingText.addEventListener("click", () => inpField.focus());
}

function initTyping() {
  // select all characters(i.e with span tag)
  let characters = typingText.querySelectorAll("span");
  let typedChar = inpField.value.split("")[charIndex];
  // console.log(characters[charIndex]); // gives <span>first letter of paragraph</span>
  // console.log(typedChar) // gives the typed character in the input field

  if (charIndex < characters.length - 1 && timeLeft > 0) {
    // if user hasn't entered any character or pressed backspace
    if (!isTyping) {
      timer = setInterval(initTimer, 1000);
      isTyping = true;
    }

    // If user presses backspace or hasn't entered any character
    if (typedChar == null) {
        if(charIndex > 0) {
            charIndex--;
        // decrement mistakes only if the charIndex span contains incorrect class
        if (characters[charIndex].classList.contains("incorrect")) {
            mistakes--;
        }
        characters[charIndex].classList.remove("correct", "incorrect");
    }
      
    } else {
      // checking if both are equal, then add correct class else increment the mistakes and add the incorrect class
      if (characters[charIndex].innerHTML === typedChar) {
        characters[charIndex].classList.add("correct");
      } else {
        mistakes++;
        characters[charIndex].classList.add("incorrect");
      }
      charIndex++;
    }

    mistakeTag.innerText = mistakes;
    let wpm = Math.round(
      ((charIndex - mistakes) / 5) / (maxTime - timeLeft) * 60
    );
    // if wpm value is 0, empty or Infinity, then setting it's value to 0
    wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
    wpmTag.innerText = wpm
    cpmTag.innerText = charIndex - mistakes; // cpm will not count mistakes
  } else {
    inpField.value = ""
    clearInterval(timer);
  }

}

function initTimer() {
  // if timeLeft is greater than 0 then decrement the timeLeft else clear the timer
  if (timeLeft > 0) {
    timeLeft--;
    timeTag.innerText = timeLeft;
  } else {
    clearInterval(timer);
  }
}

function resetGame() {

    randomParagraph();
    timeLeft = maxTime
    charIndex = mistakes = isTyping = 0
    timeTag.innerText = timeLeft
    mistakeTag.innerText = mistakes
    wpmTag.innerText = 0
    cpmTag.innerText = 0
    inpField.value = ""
    clearInterval(timer)
}

randomParagraph();

inpField.addEventListener("input", initTyping);
tryAgainBtn.addEventListener('click', resetGame);