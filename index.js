const gameContainerEl = document.querySelector(".game-container");
const scoreEl = document.querySelector(".score");
const timerEl = document.querySelector(".timer");
const rows = 15;
const columns = 15;
let squares = new Array(20).fill(0).map(() => new Array(20).fill(0));
let dir = [0, 1];
let score = 0;
let time = 0;
let isMovingLeft = false;
let isMovingRight = true;
let isMovingUp = false;
let isMovingDown = false;
let isGameOver = false;
let isWinning = false;

const startTimer = function () {
  const timerId = setInterval(() => {
    time++;
    const seconds = String(time % 60).padStart(2, 0);
    const minutes = String(Math.floor(time / 60)).padStart(2, 0);
    timerEl.textContent = `${minutes}:${seconds} ⏱`;
    if (isGameOver || isWinning) clearInterval(timerId);
  }, 1000);
};

const createBoard = function () {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      const square = document.createElement("div");
      square.dataset.r = i;
      square.dataset.c = j;
      gameContainerEl.appendChild(square);
      squares[i][j] = square;
    }
  }
};

const drawSnake = function () {
  snake.forEach((square) => square.classList.add("snake"));
};

const drawApple = function () {
  let r, c;
  do {
    r = Math.floor(Math.random() * 15);
    c = Math.floor(Math.random() * 15);
  } while (squares[r][c].classList.contains("snake"));
  squares[r][c].classList.add("apple");
};

const step = function () {
  if (isGameOver) return;
  snake[0].classList.remove("snake");
  snake.shift();
  const r = +snake[snake.length - 1].dataset.r;
  const c = +snake[snake.length - 1].dataset.c;
  const square = squares[r + dir[0]][c + dir[1]];
  square.classList.add("snake");
  snake.push(square);
};

const checkGameOver = function () {
  const head = snake[snake.length - 1];
  let { r, c } = head.dataset;
  r = Number(r);
  c = Number(c);
  if (r + dir[0] >= rows || r + dir[0] < 0) isGameOver = true;
  else if (c + dir[1] >= columns || c + dir[1] < 0) isGameOver = true;
  else if (squares[r + dir[0]][c + dir[1]].classList.contains("snake"))
    isGameOver = true;
};

const checkWin = function () {
  if (snake.length === rows * columns) isWinning = true;
};

const Win = function () {
  if (isWinning) {
    alert("You win");
  }
};

const gameOver = function () {
  if (isGameOver) {
    alert("Game over");
  }
};

const eatApple = function () {
  const head = snake[snake.length - 1];
  const tail = snake[0];
  if (!head.classList.contains("apple")) return;
  drawApple();
  head.classList.remove("apple");
  snake.unshift(tail);
  score++;
  scoreEl.textContent = score + " 🍎";
};

const start = function () {
  const timerId = setInterval(() => {
    if (isGameOver) clearInterval(timerId);
    checkGameOver();
    gameOver();
    step();
    eatApple();
  }, 200);
};

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft" && !isMovingRight) {
    dir = [0, -1];
    isMovingLeft = true;
    isMovingDown = false;
    isMovingRight = false;
    isMovingUp = false;
  }
  if (event.key === "ArrowRight" && !isMovingLeft) {
    dir = [0, 1];
    isMovingRight = true;
    isMovingDown = false;
    isMovingUp = false;
    isMovingLeft = false;
  }
  if (event.key === "ArrowUp" && !isMovingDown) {
    dir = [-1, 0];
    isMovingUp = true;
    isMovingRight = false;
    isMovingDown = false;
    isMovingLeft = false;
  }
  if (event.key === "ArrowDown" && !isMovingUp) {
    dir = [1, 0];
    isMovingDown = true;
    isMovingRight = false;
    isMovingUp = false;
    isMovingLeft = false;
  }
});

createBoard();
let snake = [squares[0][0], squares[0][1], squares[0][2]];
drawSnake();
drawApple();
startTimer();
start();