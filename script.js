const wordDisplay =
    document.querySelector(".word-display");
const keyboardDiv =
    document.querySelector(".keyboard");
const hangmanImage =
    document.querySelector(".hangman-box img");
const guessesText =
    document.querySelector(".guesses-text b");
const gameModal =
    document.querySelector(".game-modal");
const playAgainBtn =
    document.querySelector(".play-again");
const timerDisplay =
    document.querySelector(".timer");

Quiz = [
    {
        word: "oxymoron",
        hint: "A figure of speech pairing two words together that are opposing and/or contradictory.",
    },
    {
        word: "memento",
        hint: "An object kept as a reminder of a person or event.",
    },
    {
        word: "mystique",
        hint: "A quality of mystery, glamour, or power associated with someone or something.",
    },
    {
        word: "array",
        hint: "A data structure that stores a collection of elements.",
    },
    {
        word: "quirk",
        hint: "A peculiar aspect of a person's character or behaviour.",
    },
    {
        word: "conditional",
        hint: "A statement that executes a block of code if a specified condition is true.",
    },
    {
        word: "parameter",
        hint: "Happening quickly or promptly.",
    },
    {
        word: "smolder",
        hint: "To burn slowly without flame.",
    },
    {
        word: "debugging",
        hint: "The process of finding and fixing errors in code.",
    },
    {
        word: "syntax",
        hint: "The rules that govern the structure of statements in a programming language.",
    },
];

let currentWord, correctLetters, wrongGuessCount, timerInterval;
const maxGuesses = 6;
const gameTimeLimit = 25;

const resetGame = () => {
    //Resetting all game variables and UI elements
    correctLetters = [];
    wrongGuessCount = 0;
    hangmanImage.src = `hangman0.png`;
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;
    keyboardDiv
        .querySelectorAll("button")
        .forEach((btn) => (btn.disabled = false));
    wordDisplay.innerHTML = currentWord
        .split("")
        .map(() => `<li class="letter"></li>`)
        .join("");
    clearInterval(timerInterval);
    startTimer();
    gameModal.classList.remove("show");
};

const getRandomWord = () => {
    const { word, hint } =
    Quiz[Math.floor(Math.random()
            *Quiz.length)];
    currentWord = word;
    console.log(word);
    document.querySelector(".hint-text b")
        .innerText = hint;
    resetGame();
};

const startTimer = () => {
    let timeLeft = gameTimeLimit;
    timerInterval = setInterval(() => {
        timeLeft--;
        timerDisplay.innerText = `Time left:
    ${Math.floor(timeLeft / 60)}:${timeLeft % 60 < 10 ? "0" : ""
            }${timeLeft % 60}`;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            gameOver(false);
        }
    }, 1000);
};
const gameOver = (isVictory) => {
    setTimeout(() => {
        clearInterval(timerInterval);
        const modalText = isVictory
            ? `You guessed the word:`
            : `You Lost! The correct word was:`;
        gameModal.querySelector(
            "p"
        ).innerHTML =
            `${modalText} <b>${currentWord}</b>`;
        gameModal.classList.add("show");
    }, 300);
};
const initGame = (button, clickedLetter) => {
    if (currentWord.includes(clickedLetter)) {
        [...currentWord].forEach((letter, index) => {
            if (letter === clickedLetter) {
                correctLetters.push(letter);
                wordDisplay.querySelectorAll("li")[index]
                    .innerText = letter;
                wordDisplay.querySelectorAll("li")[index]
                    .classList.add("guessed");
            }
        });
    } else {
        wrongGuessCount++;
        if (wrongGuessCount === 0) {
            hangmanImage.src = `hangman0.png`;
        }
        if (wrongGuessCount === 1) {
            hangmanImage.src = `hangman1.png`;
        }
        if (wrongGuessCount === 2) {
            hangmanImage.src = `hangamn2.png`;
        }
        if (wrongGuessCount === 3) {
            hangmanImage.src = `hangman3.png`;
        }
        if (wrongGuessCount == 4) {
            hangmanImage.src = `hangman4.png`;
        }
        if (wrongGuessCount === 5) {
            hangmanImage.src = `hangman5.png`;
        }
        if (wrongGuessCount === 6) {
            hangmanImage.src = `hangman6.png`;
        }
        // hangmanImage.src = 
        `images/hangman-${wrongGuessCount}.svg`;
    }

    button.disabled = true;
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;

    if (wrongGuessCount === maxGuesses)
        return gameOver(false);
    if (correctLetters.length === currentWord.length)
        return gameOver(true);
};

//Creating keyboard buttons 
//and adding event listerers
for (let i = 97; i <= 122; i++) {
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(i);
    keyboardDiv.appendChild(button);
    button.addEventListener("click", (e) =>
        initGame(e.target, String.fromCharCode(i))
    );
}
getRandomWord();
playAgainBtn.addEventListener("click", getRandomWord);
