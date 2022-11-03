const refs = {
  startBtn: document.querySelector(".start"),
  screens: document.querySelectorAll(".screen"),
  timeList: document.querySelector(".time-list"),
  timeBoard: document.querySelector("#time"),
  circlesBoard: document.querySelector("#board"),
  bestScore: document.querySelector("#best-score"),
  winner: document.querySelector("#winner"),
  nickname: document.querySelector("#nickname"),
};
let time;
let score = 0;
let nickname = "New Player";
if (!localStorage.getItem("bestScore")) {
  localStorage.setItem("bestScore", JSON.stringify(["Nobody yet", 0]));
}
const bestScoreData = JSON.parse(localStorage.getItem("bestScore"));
const bestNick = bestScoreData[0];
const bestScore = bestScoreData[1];
refs.bestScore.innerHTML = bestScore;
refs.winner.innerHTML = bestNick;
refs.startBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (refs.nickname.value.length > 0) nickname = refs.nickname.value;
  refs.screens[0].classList.add("up");
});
refs.timeList.addEventListener("click", (e) => {
  if (e.target.classList.contains("time-btn")) {
    time = Number(e.target.getAttribute("data-time"));
    refs.screens[1].classList.add("up");
    startGame();
  }
});
refs.circlesBoard.addEventListener("click", (e) => {
  if (e.target.classList.contains("circle")) {
    score++;
    e.target.remove();
    createRandomCircle();
  }
});

function startGame() {
  setInterval(() => timeDecrease(), 1000);
  setTime(time);
  createRandomCircle();
}
function timeDecrease() {
  if (time === 0) {
    finishGame();
  } else {
    let current = --time;
    if (current < 10) current = `0${time}`;
    setTime(current);
  }
}
function setTime(value) {
  refs.timeBoard.innerHTML = `00:${value}`;
}
function createRandomCircle() {
  const circle = document.createElement("div");
  const size = getRandomNum(10, 40);
  const { width, height } = refs.circlesBoard.getBoundingClientRect();
  const x = getRandomNum(0, width - size);
  const y = getRandomNum(0, height - size);
  circle.classList.add("circle");
  circle.style.top = `${y}px`;
  circle.style.left = `${x}px`;
  circle.style.width = `${size}px`;
  circle.style.height = `${size}px`;
  refs.circlesBoard.append(circle);
}
function getRandomNum(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}
function finishGame() {
  console.log("score", score);
  console.log("bestScore", bestScore);
  console.log("nick", nickname);
  console.log("bestNick", bestNick);
  refs.timeBoard.parentNode.classList.add("hide");
  refs.circlesBoard.innerHTML = `<h1>${
    score > bestScore ? "New best score" : "Your score"
  } : <span class="primary">${score}</span></h1><button class="time-btn restart-btn">Restart</button>`;
  const restartBtn = document.querySelector(".restart-btn");
  restartBtn.addEventListener("click", () => {
    document.location.reload();
  });
  if (score > bestScore) {
    localStorage.setItem("bestScore", JSON.stringify([nickname, score]));
  }
}
