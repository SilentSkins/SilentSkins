
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let frames = 0;
const DEGREE = Math.PI / 180;

// Load bird sprite
const bird = {
  x: 50,
  y: 150,
  width: 34,
  height: 26,
  gravity: 0.15,
  jump: 4.6,
  velocity: 0,
  draw() {
    ctx.fillStyle = "#FFD700";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  },
  flap() {
    this.velocity = -this.jump;
  },
  update() {
    this.velocity += this.gravity;
    this.y += this.velocity;

    if (this.y + this.height >= canvas.height) {
      gameOver = true;
    }
  },
  reset() {
    this.y = 150;
    this.velocity = 0;
  }
};

const pipes = [];
const pipeGap = 100;
const pipeWidth = 50;
let pipeTimer = 0;
let score = 0;
let gameOver = false;

function createPipe() {
  const topHeight = Math.floor(Math.random() * (canvas.height - pipeGap - 100)) + 20;
  const bottomY = topHeight + pipeGap;
  pipes.push({
    x: canvas.width,
    topHeight: topHeight,
    bottomY: bottomY
  });
}

function drawPipes() {
  ctx.fillStyle = "#228B22";
  for (let p of pipes) {
    ctx.fillRect(p.x, 0, pipeWidth, p.topHeight);
    ctx.fillRect(p.x, p.bottomY, pipeWidth, canvas.height - p.bottomY);
  }
}

function updatePipes() {
  for (let i = 0; i < pipes.length; i++) {
    let p = pipes[i];
    p.x -= 2;

    if (p.x + pipeWidth < 0) {
      pipes.splice(i, 1);
      i--;
      score++;
    }

    if (
      bird.x < p.x + pipeWidth &&
      bird.x + bird.width > p.x &&
      (bird.y < p.topHeight || bird.y + bird.height > p.bottomY)
    ) {
      gameOver = true;
    }
  }
}

function drawScore() {
  ctx.fillStyle = "#000";
  ctx.font = "20px Arial";
  ctx.fillText("Score: " + score, 10, 25);
}

function loop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  bird.update();
  bird.draw();

  if (frames % 90 === 0) createPipe();
  updatePipes();
  drawPipes();

  drawScore();

  frames++;

  if (!gameOver) {
    requestAnimationFrame(loop);
  } else {
    ctx.fillStyle = "#000";
    ctx.font = "30px Arial";
    ctx.fillText("Game Over!", canvas.width / 2 - 75, canvas.height / 2);
    ctx.fillText("Click to Restart", canvas.width / 2 - 100, canvas.height / 2 + 40);
  }
}

canvas.addEventListener("click", () => {
  if (gameOver) {
    pipes.length = 0;
    score = 0;
    bird.reset();
    gameOver = false;
    frames = 0;
    loop();
  } else {
    bird.flap();
  }
});

// Start game
loop();
