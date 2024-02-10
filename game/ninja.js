const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let fruits = [];
let score = 0;

function spawnFruit() {
    const colors = ["red", "orange", "yellow", "green", "blue", "purple"];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const fruit = {
        x: Math.random() * (canvas.width - 50),
        y: canvas.height,
        radius: 20,
        color: randomColor,
        velocityY: -5 - Math.random() * 5,
        velocityX: Math.random() * 10 - 5
    };
    fruits.push(fruit);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    fruits.forEach(fruit => {
        ctx.beginPath();
        ctx.arc(fruit.x, fruit.y, fruit.radius, 0, Math.PI * 2);
        ctx.fillStyle = fruit.color;
        ctx.fill();
        ctx.closePath();
    });

    ctx.fillStyle = "black";
    ctx.font = "24px Arial";
    ctx.fillText("Score: " + score, 10, 30);
}

function update() {
    fruits.forEach((fruit, index) => {
        fruit.y += fruit.velocityY;
        fruit.x += fruit.velocityX;
        if (fruit.y < 0) {
            fruits.splice(index, 1);
            score--;
        }
    });
}

function main() {
    update();
    draw();
    requestAnimationFrame(main);
}

main();

canvas.addEventListener("click", event => {
    const mouseX = event.clientX - canvas.getBoundingClientRect().left;
    const mouseY = event.clientY - canvas.getBoundingClientRect().top;

    fruits.forEach((fruit, index) => {
        const dx = mouseX - fruit.x;
        const dy = mouseY - fruit.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < fruit.radius) {
            fruits.splice(index, 1);
            score++;
        }
    });
});

setInterval(spawnFruit, 2000);