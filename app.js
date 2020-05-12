/*
  GAME FUNCTION:
  - Player must guess a number between min and max numbers
  - Player gets a certain amount of guesses
  - Notify player of guesses remaining
  - Notify the player of the correct answer if loose
  - Let player choose to play again
*/
// Game variables
let min = 1,
    max = 10,
    winningNumber = randomNumber(min, max),
    guessesLeft = 3;

// UI Elements
const UIGame = document.querySelector('#game'),
    minNumber = document.querySelector('#min-num'),
    maxNumber = document.querySelector('#max-num'),
    guessInput = document.querySelector('#guess-input'),
    guessBtn = document.querySelector('#guess-btn'),
    message = document.querySelector('#message');

// Assign UI min and max and hide my message
minNumber.textContent = min;
maxNumber.textContent = max;
message.style.display = 'none';

// Play again eventListener
UIGame.addEventListener('mousedown', function(e) {
    if (e.target.className === 'play-again') {
        window.location.reload();
    }
});

// Add eventListener
guessBtn.addEventListener('click', function() {

    let guess = parseInt(guessInput.value);
    console.log(guess);

    // Validate input
    if (isNaN(guess) || guess < min || guess > max) {
        setMessage(`Please enter a number between ${min} and ${max}`);
    }

    // Check the winning number
    if (guess === winningNumber) {
        gameOver(true, `${winningNumber} is correct. YOU WON!`)

    } else {
        // Wrong number, subtract from the left guesses
        guessesLeft -= 1;

        if (guessesLeft === 0) {
            // Game over
            gameOver(false, `GAME OVER, you lost. The winning number was ${winningNumber}.`)

        } else {
            // Game continues
            guessInput.value = '';
            setMessage(`${guess} is wrong, try again. You have ${guessesLeft} guesses left.`)
        }
    }

});

// Function gameOVer
function gameOver(won, msg) {
    // Disable input
    guessInput.disabled = true;

    // Message won
    setMessage(msg);

    // Play again?
    guessBtn.value = 'Play Again';
    guessBtn.className += 'play-again';
}

// Function setMessage
function setMessage(msg) {
    message.style.display = 'block';
    message.textContent = msg;
}

// RandomNumber function
function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}