var canvas = document.getElementById('board');
var ctx = canvas.getContext('2d');

var circles = [];

const WIDTH = innerWidth * 0.9;
const HEIGHT = innerHeight * 0.9;
ctx.canvas.width = WIDTH;
ctx.canvas.height = HEIGHT;


createCircle();


function createCircle() {

    var radius = returnRandom(20, 100);
    var newCircle = new Circle(returnRandom(0 + radius, WIDTH - radius),
        returnRandom(0 + radius, HEIGHT - radius),
        radius,
    );
    circles.push(newCircle);

}

function Circle(xPos, yPos, radius) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.radius = radius;
    this.velocity = {
        x: returnRandom(-20, 20),
        y: returnRandom(-20, 20),
    };

    this.circleUpdate = function () {
        this.circleColider();
        this.circleMove();
        this.circleDraw();
    };

    this.circleMove = function () {

        this.xPos += this.velocity.x;
        this.yPos += this.velocity.y;
    };

    this.circleDraw = function () {

        ctx.beginPath();
        ctx.arc(this.xPos, this.yPos, this.radius, 0, 2 * Math.PI, false);
        ctx.strokeStyle = "deeppink";
        ctx.stroke();

    };

    this.circleColider = function () {
        (this.xPos + this.radius >= WIDTH || this.xPos - this.radius <= 0) ? this.velocity.x = -this.velocity.x : this.velocity.x = this.velocity.x;
        (this.yPos + this.radius >= HEIGHT || this.yPos - this.radius <= 0) ? this.velocity.y = -this.velocity.y : this.velocity.y = this.velocity.y;
    };
}

draw();


function draw() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);


    for (var i = 0; i < circles.length; i++) {
        circles[i].circleUpdate()
    }

    window.requestAnimationFrame(draw);
}

function returnRandom(min, max) {
     return Math.floor(Math.random() * (max - min + 1) + min); 
    }
