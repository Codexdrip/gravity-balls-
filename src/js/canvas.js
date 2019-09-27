import utils from "./utils";

const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2,
  click: false
};

const colors = ["#BF0413", "orange", "#730202", "#D9D9D9"];

// Event Listeners
addEventListener("mousemove", event => {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});

addEventListener("mousedown", event => {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
  mouse.click = "down";
});
addEventListener("mouseup", event => {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
  mouse.click = "up";
});

addEventListener("resize", () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;

  init();
});

let gravity = 1;
let friction = 0.95;

// Objects
function Ball(y, radius, color) {
  this.radius = Math.random() * 20;
  this.x = Math.random() * canvas.width - this.radius;
  this.y = Math.random() * canvas.height - this.radius;
  this.dx = (Math.random() - 0.5) * 3;
  this.dy = (Math.random() - 0.5) * 3;
  this.color = colors[Math.floor(Math.random() * colors.length)];

  this.draw = function() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
    c.stroke();
    c.closePath();
  };

  this.checkForWall = function() {
    if (this.y > canvas.height - this.radius + 2) {
      this.dy = -this.dy * friction;
    } else {
      this.dy += gravity;
    }
    if (this.y < this.radius) {
      this.dy = -this.dy;
    }
    if (this.x > canvas.width - this.radius || this.x < this.radius) {
      this.dx = -this.dx * friction;
    }
  };
  this.checkMouseClick = function() {
    if (mouse.click === "down") {
      gravity = 1;
      if (this.x !== mouse.x) {
        if (this.x < mouse.x) {
          if (this.x !== mouse.x) {
            this.x += 12;
            this.dx = 2;
          }
        }
        if (this.x > mouse.x) {
          if (this.x !== mouse.x) {
            this.x -= 12;
            this.dx = 2;
          }
        }
      }
      if (this.y !== mouse.y) {
        if (this.y > mouse.y) {
          if (this.y !== mouse.y) {
            this.y -= 12;
            this.dy = 2;
          }
        }
        if (this.y < mouse.y) {
          if (this.y !== mouse.y) {
            this.y += 12;
            this.dy = 2;
          }
        }
      }
    } else if (mouse.click === "up") {
      gravity = 0;
      this.dy = (Math.random() - 0.5) * 50;
      this.dx = (Math.random() - 0.5) * 50;
      if (this.y - mouse.y > 50) {
        gravity = 1;
        mouse.click = undefined;
      }
    }
  };

  this.update = function() {
    this.draw();
    this.checkMouseClick();
    this.checkForWall();

    this.x += this.dx;
    this.y += this.dy;
  };
}

// Implementation

let ballArr = [];

function init() {
  ballArr = [];
  for (let i = 0; i < 200; i++) {
    ballArr.push(new Ball());
  }
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);
  ballArr.map(item => {
    item.update();
  });
}

init();
animate();
