let gameSeq = [];
let userSeq = [];
 
let btns = ["yellow", "red","blue","green"];

let started = false;
let level = 0;

let h2 = document.querySelector("h2")


function startGame() {
   if (started == false) {
      console.log("Game started");
      started = true;
      levelUp();
   }
}

//---------------------------------

// Select all buttons and map them to their sounds
const buttonSounds = {
   green: new Audio("./audio/green.mp3"), 
   blue: new Audio("./audio/blue.mp3"),
   red: new Audio("./audio/red.mp3"),
   yellow: new Audio("./audio/yellow.mp3"),
};

// Add event listeners for all buttons
Object.keys(buttonSounds).forEach((buttonId) => {
   const button = document.getElementById(buttonId);
   const sound = buttonSounds[buttonId];

   button.addEventListener("click", () => {
       sound.currentTime = 0; // Reset the sound to the beginning
       sound.play(); // Play the respective sound
   });
});


//-------------------------------

let white = document.querySelector('.white');

// Function to animate the white button
function animateWhiteButton() {
   white.classList.add("white2");
   setTimeout(() => {
      white.classList.remove("white2");
   }, 100); // Animation duration (200ms)
}

// Add event listener to the white button            //
white.addEventListener("click", () => {             //
   animateWhiteButton(); // Animate the button     //     this is 1st step
   setTimeout(() => {                             //
      startGame();                               //
   }, 1000);                                   //
   
});

function levelUp(){
   userSeq = [];// Reset the user's sequence for the new level.
   level++;
   h2.innerText = `level ${level}`
        
   let randIdx = Math.floor(Math.random()*3);
   let randColor = btns[randIdx];
   let randBtn = document.querySelector(`.${randColor}`);
   animateButton(randBtn, randColor);
   
   gameSeq.push(randColor)
}

function animateButton(btn, color){
   btn.classList.add(`${color}2`);
   setTimeout(function() {
      btn.classList.remove(`${color}2`);
   }, 200);
}


function btnPress() {
   let btn = this; // Refers to the button that was clicked.
   let color = btn.classList[1]; // Get the color class of the button (e.g., "green").
   animateButton(btn, color); // Animate the button.
   userColor = btn.getAttribute("id"); // Get the ID of the clicked button (e.g., "green").
   userSeq.push(userColor); // Add the color to the user's sequence.
   check(userSeq.length - 1); // Check if the user's input matches the game sequence.
}

 
 let allBtn = document.querySelectorAll(".btn");
 for (let btn of allBtn) {
    btn.addEventListener("mousedown", btnPress);
 }
 

 function check(idx){
  

    if(userSeq[idx] === gameSeq[idx]){
       if(userSeq.length === gameSeq.length){
        setTimeout(levelUp,1000);
       }
    }else{
      
      h2.innerHTML = `Game Over. Score = <b>[${level}]</b> <br> Press start to restart`
      document.querySelector("body").style.backgroundColor = "red";
      setTimeout(function(){
         document.querySelector("body").style.backgroundColor = "rgb(110, 108, 108)";
      },100) 
      reset();
       

    }
 }

 function reset(){
   started = false;
   gameSeq = [];
   userSeq = [];
   level = 0;
   
 }

 