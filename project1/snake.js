const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const gridSize = 20;
const tileSize = canvas.width / gridSize;
let dx = tileSize;
let dy = 0;
let foodX;
let foodY;
let score = 0;
const snake = [
    { x: tileSize, y: tileSize }
];

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createFood() {
    foodX = getRandomInt(0, gridSize - 1) * tileSize;
    foodY = getRandomInt(0, gridSize - 1) * tileSize;
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);


    ctx.fillStyle = "red";
    ctx.fillRect(foodX, foodY, tileSize, tileSize);

    ctx.fillStyle = "green";
    snake.forEach(segment => {
        ctx.fillRect(segment.x, segment.y, tileSize, tileSize);
    });

    // Draw score
    ctx.fillStyle = "black";
    ctx.font = "20px Arial";
    ctx.fillText("Score: " + score, 10, 30);
}

function moveSnake() {
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head);


    if (head.x === foodX && head.y === foodY) {
        score++;
        createFood();
    } else {
        snake.pop();
    }
}

function checkCollision() {
    if (
        snake[0].x < 0 ||
        snake[0].x >= canvas.width ||
        snake[0].y < 0 ||
        snake[0].y >= canvas.height
    ) {
        return true;
    }
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }
    return false;
}

function main() {
    if (checkCollision()) {
        alert("Game Over! Score: " + score);
        window.location.reload();
    }

    moveSnake();
    draw();

    setTimeout(main, 100);
}

createFood();
main();

document.addEventListener("keydown", event => {
    const key = event.key;
    if (key === "ArrowUp" && dy === 0) {
        dx = 0;
        dy = -tileSize;
    } else if (key === "ArrowDown" && dy === 0) {
        dx = 0;
        dy = tileSize;
    } else if (key === "ArrowLeft" && dx === 0) {
        dx = -tileSize;
        dy = 0;
    } else if (key === "ArrowRight" && dx === 0) {
        dx = tileSize;
        dy = 0;
    }
});