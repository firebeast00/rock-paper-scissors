const GameResult = document.querySelector("#game-result");
const showResult = document.querySelector("#result");
const playButton = document.querySelector(".js-auto-play-button");
const score = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  losses: 0,
  ties: 0,
};
updateScore();
let isAutoPlaying = false;
let IntervalId;
function autoPlay() {
  if (!isAutoPlaying) {
    IntervalId = setInterval(() => {
      const playerMove = randomNumber();
      playGame(playerMove);
    }, 1000);
    isAutoPlaying = true;
    playButton.textContent = "Stop Play";
  } else {
    clearInterval(IntervalId);
    isAutoPlaying = false;
    playButton.textContent = "Auto Play";
  }
}
function playGame(playerMove) {
  let computerMove = randomNumber();
  /* const result = document.getElementById("result"); */
  let result;

  if (playerMove) {
    if (computerMove === "rock") {
      result = "Tie!";
    } else if (computerMove === "paper") {
      result = "You Lose!";
    } else if (computerMove === "scissors") {
      result = "You Win!";
    }
  } else if (playerMove === "paper") {
    if (computerMove === "rock") {
      result = "You Win!";
    } else if (computerMove === "paper") {
      result = "Tie!";
    } else if (computerMove === "scissors") {
      result = "You Lose!";
    }
  } else if (playerMove === "scissors") {
    if (computerMove === "rock") {
      result = "You Lose!";
    } else if (computerMove === "paper") {
      result = "You Win!";
    } else if (computerMove === "scissors") {
      result = "Tie!";
    }
  }

  if (result === "You Win!") {
    score.wins += 1;
  } else if (result === "You Lose!") {
    score.losses += 1;
  } else if (result === "Tie!") {
    score.ties += 1;
  }
  localStorage.setItem("score", JSON.stringify(score));
  GameResult.innerHTML = ` ${result}`;
  showResult.innerHTML = ` You 
      <img src="./icons/${playerMove}-emoji.png" 
     class="move-icon"/> 
    Computer <img src="./icons/${computerMove}-emoji.png" 
     class="move-icon"/>`;
  updateScore();
}

function randomNumber() {
  const randomMove = Math.random();
  if (randomMove > 0 && randomMove < 1 / 3) {
    computerMove = "rock";
  } else if (randomMove >= 1 / 3 && randomMove < 2 / 3) {
    computerMove = "paper";
  } else if (randomMove >= 2 / 3 && randomMove < 1) {
    computerMove = "scissors";
  }
  return computerMove;
}
const rockButton = document.querySelector(".rock-button");
const paperButton = document.querySelector(".paper-button");
const scissorsButton = document.querySelector(".scissors-button");
const resetButton = document.querySelector(".reset-button");

rockButton.addEventListener("click", () => {
  playGame("rock");
});
paperButton.addEventListener("click", () => {
  playGame("paper");
});
scissorsButton.addEventListener("click", () => {
  playGame("scissors");
});
document.body.addEventListener("keydown", (e) => {
  if (e.key === "r") {
    playGame("rock");
  } else if (e.key === "p") {
    playGame("paper");
  } else if (e.key === "s") {
    playGame("scissors");
  } else if (e.key === "a") {
    autoPlay();
  } else if (e.key === "Backspace") {
    scoreResetAlert.style.display = "block";
  }
});
const scoreResetAlert = document.querySelector(".score-reset-alert");
resetButton.addEventListener("click", () => {
  scoreResetAlert.style.display = "block";
});

document.querySelector(".reset-yes-button").addEventListener("click", () => {
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  updateScore();
  scoreResetAlert.style.display = "none";
});
document.querySelector(".reset-no-button").addEventListener("click", () => {
  scoreResetAlert.style.display = "none";
});
playButton.addEventListener("click", () => {
  autoPlay();
});

function updateScore() {
  const showScore = document.querySelector("#score");
  showScore.innerHTML = `Wins : ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}
