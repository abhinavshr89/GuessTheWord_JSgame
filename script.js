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
var pointer =1;




                                            /*
                                            =============================================
                                              SECTION: Function of the Main Logic of Game
                                            =============================================
                                            */

function main(wordLength,remainingAttempts){
  var wrongLetter ="";
  var inputField = document.querySelector("#input1");
  displayAttempts.innerHTML =`Remaining attempts = ${remainingAttempts}`;
  var settingsIcon = document.querySelector(".settings-icon img");
  var settingOptions = document.querySelector(".options-dropdown");
  settingOptions.style.display= "none";
  var gameBox = document.querySelector(".game-inner-row");
  let guess_btn = document.querySelector(".guess-btn");
  var message = document.querySelector(".popup h2")
  var inputBox = document.querySelector("#input");
  var message = document.querySelector(".message");
  message.innerHTML = "<h3>Enter the Missing letters</h3>"




  // -> Below function will add new boxes if the user wants more letters 
  if (wordLength === 6 || wordLength === 7) {
    const additionalBoxesCount = wordLength - 5;  // Calculate the number of additional boxes needed
    
    for (let i = 1; i <= additionalBoxesCount; i++) {
      const newBox = document.createElement("div");
      newBox.classList.add("col-2", "word-box", `letter-${4 + i}`, "d-flex", "justify-content-center", "flex-column", "align-items-center");
      gameBox.appendChild(newBox);
    }
  }
  
  // This function will place place holders in all the boxes except 1st and last 
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
  
  // Starting the pointer at 1 to skip the first letter
  
  function checkSubmission(submittedLetter) {
    inputField.value = "";
    
    console.log(pointer);
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
          if(remainingAttempts === 9){
            message.innerHTML="";
          }
          console.log(submittedLetter);
          message.innerHTML += `<span class="incorrect">${submittedLetter}</span>&nbsp;`;

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

function handleGuessButtonClick() {
  var submittedLetter = document.querySelector("#input1").value.toUpperCase();
  
  if (checkSubmission(submittedLetter)) {
    popup.style.display = "flex";
    message.innerHTML = "Right Answer";
    removeExtraBoxes(wordLength);
    guess_btn.removeEventListener('click', handleGuessButtonClick);
    
  } else if (remainingAttempts === 0) {
    popup.style.display = "flex";
    message.innerHTML = "Oops! Out of attempts";
    removeExtraBoxes(wordLength);
    guess_btn.removeEventListener('click', handleGuessButtonClick);
  } else {
    // Handle other cases if needed
  }
}

// Adding the click event listener to the guess button
// guess_btn.addEventListener('click', handleGuessButtonClick);
guess_btn.onclick = function() {
  handleGuessButtonClick();
};


function handleEnterKey(event) {
  if (event.key === 'Enter') {
    // Prevent the default behavior of the Enter key (form submission)
    event.preventDefault();

    // Trigger a click event on the guess button
    guess_btn.click();
    
   
  }
}

// Attach the event listener for the "Enter" key
// inputField.addEventListener('keypress', handleEnterKey);

inputField.onkeypress = function(event) {
  handleEnterKey(event);
};




// =================================
var fiveLetterGame = document.querySelector(".setting-option-5");
var sixLetterGame = document.querySelector(".setting-option-6");
var sevenLetterGame = document.querySelector(".setting-option-7");


fiveLetterGame.onclick = function () {
 
  cleanBoxes();
  main(5, 10);
}

sixLetterGame.onclick = function () {
  cleanBoxes();

  main(6, 10); // Adjust the second parameter as needed
}

sevenLetterGame.onclick = function () {
  cleanBoxes();
  
  main(7, 10); // Adjust the second parameter as needed
}

settingsIcon.onclick = function() {
 
  if (settingOptions.style.display === "block") {
    settingOptions.style.display = "none";
  } else {
    settingOptions.style.display = "block";
  }
};

// function to clear extra stuffs 
function cleanBoxes() {
  for (let i = 5; i < 8; i++) {
    let a = document.querySelector(`.letter-${i}`);
    if (a) {
      a.parentNode.removeChild(a);
    } else {
      break;
    }
  }
}

// =============================================
}











main(7,10);

var restartButton = document.querySelector("#restart");
restartButton.addEventListener("click", () => {
  popup.style.display="none";
  console.log("restarting");
  pointer =1 ;
  console.log(pointer);
   main(5,10);
   
});






// 




