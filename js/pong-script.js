const board = document.getElementById("board");
const leftScore = document.getElementById("left-score");
const rightScore = document.getElementById("right-score");
const paddle1 = document.getElementById("paddle1");
const paddle2 = document.getElementById("paddle2");
const ball = document.getElementById("ball");

// Board and paddle dimensions
const boardWidth = board.offsetWidth;
const boardHeight = board.offsetHeight;
const paddleWidth = paddle1.offsetWidth;
const paddleHeight = paddle1.offsetHeight;

// Paddle and ball initial properties
let paddle1Y = boardHeight / 2 - paddleHeight / 2;
let paddle2Y = boardHeight / 2 - paddleHeight / 2;
let ballX = boardWidth / 2 - ball.offsetWidth / 2;
let ballY = boardHeight / 2 - ball.offsetHeight / 2;
let ballSpeedX = 3;
let ballSpeedY = 3;
let leftScoreValue = 0;
let rightScoreValue = 0;

// Random movement for the paddle controlled by computer
// Set the initial direction of paddle2
let paddle2Direction = 1; // 1 for moving down, -1 for moving up

// Random movement for paddle2 controlled by computer
function moveComputerPaddle() {
    const paddleSpeed = 2;
    paddle2Y += paddleSpeed * paddle2Direction;

    // Reverse the direction when reaching the top or bottom of the board
    if (paddle2Y <= 0) {
        paddle2Direction = 1;
    } else if (paddle2Y >= boardHeight - paddleHeight) {
        paddle2Direction = -1;
    }
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min)
}

// Update the game state
function update() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    if (ballY <= 0) {
        // Ball hits the top boundary
        ballY = 0;
        ballSpeedY = -ballSpeedY;
    } else if (ballY + ball.offsetHeight >= boardHeight) {
        // Ball hits the bottom boundary
        ballY = boardHeight - ball.offsetHeight;
        ballSpeedY = -ballSpeedY;
    }

    // Ball collisions with paddles
    if (ballX <= paddleWidth && ballY + ball.offsetHeight >= paddle1Y && ballY <= paddle1Y + paddleHeight) {
        ballSpeedX = -ballSpeedX;
    } else if (ballX + ball.offsetWidth >= boardWidth - paddleWidth && ballY + ball.offsetHeight >= paddle2Y && ballY <= paddle2Y + paddleHeight) {
        ballSpeedX = -ballSpeedX;
    }

    // Ball goes beyond the paddles
    if (ballX < 0) {
        rightScoreValue++;
        resetBall();
    } else if (ballX > boardWidth - ball.offsetWidth) {
        leftScoreValue++;
        resetBall();
    }

    // Render the game elements
    paddle1.style.top = `${paddle1Y}px`;
    paddle2.style.top = `${paddle2Y}px`;
    ball.style.left = `${ballX}px`;
    ball.style.top = `${ballY}px`;
    leftScore.innerText = leftScoreValue;
    rightScore.innerText = rightScoreValue;
}

// Reset the ball position after scoring
function resetBall() {
    ballX = boardWidth / 2 - ball.offsetWidth / 2;
    ballY = boardHeight / 2 - ball.offsetHeight / 2;
    ballSpeedX = -ballSpeedX;
    ballSpeedY = Math.random() > 0.5 ? -3 : 3;
}

// Track mouse movement to control the paddle
function trackMouse(e) {
    paddle1Y = e.clientY - board.offsetTop - paddleHeight / 2;

    // Restrict paddle movement within the board
    if (paddle1Y < 0) {
        paddle1Y = 0;
    } else if (paddle1Y > boardHeight - paddleHeight) {
        paddle1Y = boardHeight - paddleHeight;
    }
}

board.addEventListener("mousemove", trackMouse);

// Game loop
function gameLoop() {
    moveComputerPaddle();
    update();
    requestAnimationFrame(gameLoop);
}

gameLoop();
