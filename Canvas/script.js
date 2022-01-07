const canvas = document.querySelector('canvas');

canvas.width = innerWidth;
canvas.height = innerHeight;

const ctx = canvas.getContext('2d');

const mouse = {
  x: undefined,
  y: undefined
}

const maxRadius = 40;

const colorsArray = ['#FF7E00', '#F74B0C', '#38C4EB', '#93F0FF', '#50B5C7'];

canvas.addEventListener('mousemove', function (event) {
  mouse.x = event.x;
  mouse.y = event.y;
});

window.addEventListener('resize', function () {
  canvas.width = innerWidth;
  canvas.height = innerHeight;

  init();
});

class Circle {
  constructor(x, y, radius, dx, dy) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.minRadius = radius;
    this.dx = dx;
    this.dy = dy;
    this.color = colorsArray[Math.floor(Math.random() * colorsArray.length)];
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  update() {
    if (this.x + this.radius > innerWidth || this.x - this.radius < 0) this.dx = -this.dx;
    this.x += this.dx;

    if (this.y + this.radius > innerHeight || this.y - this.radius < 0) this.dy = -this.dy;
    this.y += this.dy;

    // Activity
    if (mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
      if (this.radius < maxRadius) this.radius += 1;
    } else if (this.radius > this.minRadius) {
      this.radius -= 1;
    }
  }
}

const numCircle = 800;
var circleArray = [];

function init() {
  circleArray = [];
  for (let i = 0; i < numCircle; i++) {
    let radius = Math.random() * 3 + 1;
    let x = Math.random() * (innerWidth - 30 - 30) + 30;
    let y = Math.random() * (innerHeight - radius * 2) + 30;
    // let dx = [1, -1][Math.floor(Math.random() * 2)];
    let dx = ((Math.random() - 0.5) * 2);
    // let dy = [1, -1][Math.floor(Math.random() * 2)];
    let dy = ((Math.random() - 0.5) * 2);
    circleArray.push(new Circle(x, y, radius, dx, dy));
  }
};

function animate() {
  requestAnimationFrame(animate);
  // Clear
  ctx.clearRect(0, 0, innerWidth, innerHeight);

  circleArray.forEach(function (circle) {
    // Draw circle
    circle.draw();

    // Update
    circle.update();
  });
}

init();
animate();
