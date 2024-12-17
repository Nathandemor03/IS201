// script.js
const wordToGuess = "PLANT"; // The word to guess
const maxAttempts = 6; // Number of guesses allowed
let currentAttempt = 0;

const board = document.getElementById("game-board");
const input = document.getElementById("guess-input");
const submitButton = document.getElementById("submit-guess");
const message = document.getElementById("message");

// Initialize the board
function initializeBoard() {
    for (let i = 0; i < maxAttempts * 5; i++) {
        const tile = document.createElement("div");
        tile.classList.add("tile");
        board.appendChild(tile);
    }
}

// Check the guess
function checkGuess(guess) {
    const tiles = board.querySelectorAll(".tile");
    const start = currentAttempt * 5;
    let remainingWord = wordToGuess;

    for (let i = 0; i < 5; i++) {
        const tile = tiles[start + i];
        const letter = guess[i];

        if (letter === wordToGuess[i]) {
            tile.textContent = letter;
            tile.classList.add("correct");
            remainingWord = remainingWord.replace(letter, "_");
        }
    }

    for (let i = 0; i < 5; i++) {
        const tile = tiles[start + i];
        const letter = guess[i];

        if (!tile.classList.contains("correct")) {
            if (remainingWord.includes(letter)) {
                tile.textContent = letter;
                tile.classList.add("present");
                remainingWord = remainingWord.replace(letter, "_");
            } else {
                tile.textContent = letter;
                tile.classList.add("absent");
            }
        }
    }

    currentAttempt++;
    if (guess === wordToGuess) {
        message.textContent = "Congratulations! You guessed the word!";
        submitButton.disabled = true;
        input.disabled = true;
    } else if (currentAttempt === maxAttempts) {
        message.textContent = `Game Over! The word was "${wordToGuess}".`;
        submitButton.disabled = true;
        input.disabled = true;
    }
}

// Handle guess submission
submitButton.addEventListener("click", () => {
    const guess = input.value.toUpperCase();
    if (guess.length !== 5) {
        message.textContent = "Please enter a 5-letter word.";
        return;
    }
    checkGuess(guess);
    input.value = "";
});

// Initialize the game
initializeBoard();