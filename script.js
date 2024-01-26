// Data for game
const wordList = [
  "APPLE",
  "TABLE",
  "HORSE",
  "DANCE",
  "HAPPY",
  "BEACH",
  "CHAIR",
  "CLOCK",
  "MUSIC",
  "PIZZA",
  "TIGER"
];
const hints = [
  "crunchy fruit",
  "dining furniture",
  "large mammal",
  "rhythmic movement",
  "joyful feeling",
  "shoreline area",
  "seating furniture",
  "time-keeping device",
  "melodic sounds",
  "Italian dish",
  "striped big cat",
 
];

const sixLetterWords = [
  "WINTER",
  "YELLOW",
  "WINDOW",
  "CASTLE",
  "BANANA",
  "GUITAR",
  "TURTLE",
  "BOTTLE",
  "PLANET",
  "FLOWER"
];

const hintSix = [
  "Cold season",
  "Sunshine color",
  "Wall opening",
  "Fortified building",
  "Tropical fruit",
  "Stringed instrument",
  "Shell-covered reptile",
  "Liquid container",
  "Orbiting celestial body",
  "Fragrant plant blossom"
];
const sevenLetterWords = [
  "BANANAS", "DYNAMIC", "FROSTED", "GLITTER", "JUMPING", "LIZARDS", "MYSTERY", "PLASTER", "SUNRISE", "WONDERS"
];
const hintSeven = [
  "Tropical fruit bunch", "Energetic and ever-changing", "Icy and coated", "Sparkling particles", 
  "Activity involving bouncing", "Reptiles with scales", "Enigmatic and puzzling", "Material for covering walls", 
  "Morning phenomenon", "Awe-inspiring marvels"
];

var wordLength = 5;
var remainingAttempts= 10;
var displayAttempts = document.querySelector(".attempt h4");




var popup = document.querySelector(".popup");

function main(wordLength,remainingAttempts){
  
  
  displayAttempts.innerHTML =`Remaining attempts = ${remainingAttempts}`;

  var gameBox = document.querySelector(".game-inner-row");
  let guess_btn = document.querySelector(".guess-btn");
  var message = document.querySelector(".popup h2")
  var inputBox = document.querySelector("#input");
  
  if (wordLength === 6 || wordLength === 7) {
    const additionalBoxesCount = wordLength - 5;  // Calculate the number of additional boxes needed
    
    for (let i = 1; i <= additionalBoxesCount; i++) {
      const newBox = document.createElement("div");
      newBox.classList.add("col-2", "word-box", `letter-${4 + i}`, "d-flex", "justify-content-center", "flex-column", "align-items-center");
      gameBox.appendChild(newBox);
    }
  }
  
  
  for(let i = 1 ;i<wordLength-1;i++){
    let a = document.querySelector(`.letter-${i}`);
    a.innerHTML=`<div class="placeholder"></div>`;
  }
  
  var currentWord;
  var randomIndex;
  var getRandom =(word)=>{
    randomIndex = Math.floor(Math.random() * word.length);
    return word[randomIndex];
  }
  
  var hintBox = document.querySelector(".hint .hint-text");
  if (wordLength === 6) {
    currentWord = getRandom(sixLetterWords);
    hintBox.innerHTML = `Hint: ${hintSix[randomIndex]}`;
  } else if (wordLength === 7) {
    currentWord = getRandom(sevenLetterWords); // Assuming you have a sevenLetterWords array
    hintBox.innerHTML = `Hint: ${hintSeven[randomIndex]}`; // Assuming you have a hintSeven array
  } else {
    currentWord = getRandom(wordList);
    hintBox.innerHTML = `Hint: ${hints[randomIndex]}`;
  }
  
  // Now current word stores a random word;
  // selecting the hint accordingly 
  
  let firstLetter = currentWord[0];
  let lastLetter = currentWord[currentWord.length-1];
  
  let firstBox = document.querySelector(".letter-0");
  firstBox.innerHTML =`${firstLetter}`;
  
  let secondBox = document.querySelector(`.letter-${currentWord.length-1}`);
  secondBox.innerHTML =`${lastLetter}`;


  //HOW SUBMITTED LETTER WILL BE CHECKED
  
  let pointer = 1;  // Starting the pointer at 1 to skip the first letter
  
  function checkSubmission(submittedLetter) {
    inputField.value = "";
      if (pointer < currentWord.length - 1 && submittedLetter === currentWord[pointer]) {
          let letterBox = document.querySelector(`.letter-${pointer}`);
          letterBox.innerHTML=`${submittedLetter}`;
          pointer++;
  
          // Check if the entire word (excluding the first and last letters) has been correctly guessed
          if (pointer === currentWord.length - 1) {
              return true;
          }
      }
       else{
          remainingAttempts--;
          displayAttempts.innerHTML =`Remaining attempts = ${remainingAttempts}`;
         return false;
       }
       
  }
  
  // removal of extra boxes that we inserted
  function removeExtraBoxes(wordLength) {
    const extraBoxClassNames = [];
  
    // Add the class names of extra boxes based on word length
    if (wordLength === 6) {
      extraBoxClassNames.push("letter-5");
    } else if (wordLength === 7) {
      extraBoxClassNames.push("letter-5", "letter-6");
    }
  
    // Remove elements with the specified class names
    extraBoxClassNames.forEach(className => {
      const extraBox = document.querySelector(`.${className}`);
      if (extraBox) {
        extraBox.parentNode.removeChild(extraBox);
      }
    });
  }
  
  
  // HOW GUESS BUTTON WILL WORK ?
  
  

  guess_btn.addEventListener('click', () => {
    var submittedLetter = document.querySelector("#input1").value.toUpperCase();
  
    // Check the submitted letter using the checkSubmission function
    if (checkSubmission(submittedLetter)) {
      popup.style.display = "flex";
      message.innerHTML = "Right Answer";
      removeExtraBoxes(wordLength);
    } else if (remainingAttempts === 0) {
      popup.style.display = "flex";
      message.innerHTML = "Oops! Out of attempts";
      removeExtraBoxes(wordLength);
    } else {
      console.log("Incorrect letter.");
    }

  });

// Making the enter do the same work as submit button 

var inputField = document.querySelector("#input1");

inputField.addEventListener('keypress', function (event) {
  if (event.key === 'Enter') {
    // Prevent the default behavior of the Enter key (form submission)
    event.preventDefault();

    // Trigger the same logic as when the submit button is clicked
    var submittedLetter = inputField.value.toUpperCase();
    if (checkSubmission(submittedLetter)) {
      popup.style.display = "flex";
      message.innerHTML = "Right Answer";
      removeExtraBoxes(wordLength);
    } else if (remainingAttempts === 0) {
      popup.style.display = "flex";
      message.innerHTML = "Oops! Out of attempts";
      removeExtraBoxes(wordLength);
    } else {
      console.log("Incorrect letter.");
    }
  }
});
  // =========================================================
}
main(6,10);

var restartButton = document.querySelector("#restart");
restartButton.addEventListener("click", () => {
  popup.style.display="none";

   main(7,10);
   
});



