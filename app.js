// DOM elementləri
const overlay = document.getElementById("overlay");
const modeModal = document.getElementById("mode-modal");
const endModal = document.getElementById("end-modal");
const gameContainer = document.querySelector(".game-container");
const buttons = document.querySelectorAll(".buttons img");
const playerChoiceElement = document.getElementById("player-choice");
const computerChoiceElement = document.getElementById("computer-choice");
const resultMessageElement = document.getElementById("result-message");
const scoreElement = document.getElementById("score");
const keyboardInfo = document.getElementById("keyboard-info");

// Modal düymələri
const playAgainBtn = document.getElementById("play-again");
const exitBtn = document.getElementById("exit");
const keyboardModeBtn = document.getElementById("keyboard-mode");
const clickModeBtn = document.getElementById("click-mode");

// Səs elementləri
const bgMusic = document.getElementById("bg-music");
const clickSound = document.getElementById("click-sound");
const winSound = document.getElementById("win-sound");
const loseSound = document.getElementById("lose-sound");

// Oyun dəyişənləri
let playerScore = 0;
let computerScore = 0;
let isKeyboardMode = false;
const winningScore = 5;

// Fon musiqisini başlat
function startBackgroundMusic() {
  bgMusic.volume = 0.5; 
  bgMusic.play();
}

// Səs effektini çal
function playSound(sound) {
  sound.currentTime = 0; 
  sound.play();
}

// Səsi dayandır
function stopSound(sound) {
  sound.pause();
  sound.currentTime = 0;
}

// Kompüter seçimini al
function getComputerChoice() {
  const choices = ["Rock", "Paper", "Scissors"];
  return choices[Math.floor(Math.random() * choices.length)];
}

// Qalibi müəyyən et
function getWinner(playerChoice, computerChoice) {
  if (playerChoice === computerChoice) return "Draw";
  if (
    (playerChoice === "Rock" && computerChoice === "Scissors") ||
    (playerChoice === "Paper" && computerChoice === "Rock") ||
    (playerChoice === "Scissors" && computerChoice === "Paper")
  ) {
    return "Player";
  }
  return "Computer";
}

// Oyunu yenilə
function updateGame(playerChoice) {
  const computerChoice = getComputerChoice();
  playerChoiceElement.textContent = `You chose: ${playerChoice}`;
  computerChoiceElement.textContent = `Computer chose: ${computerChoice}`;

  const winner = getWinner(playerChoice, computerChoice);
  if (winner === "Player") {
    playerScore++;
    resultMessageElement.textContent = "You win!";
    resultMessageElement.style.color = "green";
  } else if (winner === "Computer") {
    computerScore++;
    resultMessageElement.textContent = "You lose!";
    resultMessageElement.style.color = "red";
  } else {
    resultMessageElement.textContent = "It's a draw!";
    resultMessageElement.style.color = "gray";
  }

  scoreElement.textContent = `Score - You: ${playerScore} | Computer: ${computerScore}`;

  if (playerScore === winningScore || computerScore === winningScore) {
    showEndModal(playerScore === winningScore ? "You won!" : "Computer won!");
  }
}

// Modal aç
function showEndModal(message) {
  endModal.querySelector("#winner-message").textContent = message;
  overlay.classList.remove("hidden");
  endModal.classList.remove("hidden");

  // Qalibiyyət və ya məğlubiyyət səsi
  if (message === "You won!") {
    stopSound(loseSound); 
    playSound(winSound); 
  } else if (message === "Computer won!") {
    stopSound(winSound);
    playSound(loseSound); 
  }
}

// Klik rejimi
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    if (!isKeyboardMode) {
      playSound(clickSound);
      const playerChoice = button.id.charAt(0).toUpperCase() + button.id.slice(1);
      updateGame(playerChoice);
    }
  });
});

// Klaviatura rejimi
document.addEventListener("keydown", (event) => {
  if (isKeyboardMode) {
    playSound(clickSound);
    let playerChoice = "";
    if (event.key === "w") playerChoice = "Rock";
    if (event.key === "e") playerChoice = "Paper";
    if (event.key === "r") playerChoice = "Scissors";
    if (playerChoice) updateGame(playerChoice);
  }
});

// Klaviatura rejimini aktiv et və məlumat göstər
keyboardModeBtn.addEventListener("click", () => {
  startBackgroundMusic();
  playSound(clickSound);
  isKeyboardMode = true;
  modeModal.classList.add("hidden");
  gameContainer.classList.remove("hidden");
  keyboardInfo.classList.remove("hidden");
});

// Klik rejimini aktiv et
clickModeBtn.addEventListener("click", () => {
  startBackgroundMusic();
  playSound(clickSound);
  isKeyboardMode = false;
  modeModal.classList.add("hidden");
  gameContainer.classList.remove("hidden");
  keyboardInfo.classList.add("hidden");
});

// Yenidən oynama düyməsi
playAgainBtn.addEventListener("click", () => {
  stopSound(winSound); 
  stopSound(loseSound); 
  playSound(clickSound);
  playerScore = 0;
  computerScore = 0;
  scoreElement.textContent = `Score - You: 0 | Computer: 0`;
  resultMessageElement.textContent = "Result: ";
  playerChoiceElement.textContent = "You chose: ";
  computerChoiceElement.textContent = "Computer chose: ";
  overlay.classList.add("hidden");
  endModal.classList.add("hidden");
});

// Çıxış düyməsi
exitBtn.addEventListener("click", () => {
  stopSound(winSound); 
  stopSound(loseSound);
  playSound(clickSound);
  playerScore = 0;
  computerScore = 0;
  overlay.classList.add("hidden");
  endModal.classList.add("hidden");
  gameContainer.classList.add("hidden");
  modeModal.classList.remove("hidden");
});

window.addEventListener("DOMContentLoaded", () => {
  startBackgroundMusic();
});
