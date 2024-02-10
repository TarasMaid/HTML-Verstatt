const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const dino = {
    x: 50,
    y: canvas.height - 40,
    width: 40,
    height: 40,
    jumpSpeed: -8,
    gravity: 0.5,
    isJumping: false,

    draw() {
        ctx.fillStyle = "green";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    },

    jump() {
        if (!this.isJumping) {
            this.isJumping = true;
            this.y -= this.jumpSpeed;
        }
    },

    update() {
        if (this.isJumping) {
            this.jumpSpeed += this.gravity;
            this.y += this.jumpSpeed;

            if (this.y >= canvas.height - this.height) {
                this.y = canvas.height - this.height;
                this.isJumping = false;
                this.jumpSpeed = -8;
            }
        }
    }
};

const obstacles = [];

function spawnObstacle() {
    const height = Math.random() * 50 + 20;
    const obstacle = {
        x: canvas.width,
        y: canvas.height - height,
        width: 20,
        height: height
    };
    obstacles.push(obstacle);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    dino.draw();
    obstacles.forEach(obstacle => {
        ctx.fillStyle = "red";
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
    });
}

function moveObstacles() {
    obstacles.forEach(obstacle => {
        obstacle.x -= 2;
    });
    obstacles.forEach((obstacle, index) => {
        if (obstacle.x + obstacle.width < 0) {
            obstacles.splice(index, 1);
        }
    });
}

function checkCollision() {
    for (let i = 0; i < obstacles.length; i++) {
        if (
            dino.x < obstacles[i].x + obstacles[i].width &&
            dino.x + dino.width > obstacles[i].x &&
            dino.y < obstacles[i].y + obstacles[i].height &&
            dino.y + dino.height > obstacles[i].y
        ) {
            return true;
        }
    }
    return false;
}

function main() {
    if (checkCollision()) {
        alert("Game Over!");
        window.location.reload();
    }

    moveObstacles();
    dino.update();
    draw();
    requestAnimationFrame(main);
}

main();

document.addEventListener("keydown", event => {
    if (event.key === " ") {
        dino.jump();
    }
});

setInterval(spawnObstacle, 2000);