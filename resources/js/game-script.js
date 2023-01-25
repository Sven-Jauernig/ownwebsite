var canvas = document.getElementById('board');
var ctx = canvas.getContext('2d');
// var canvas2 = document.getElementById('board2');
var ctx2 = canvas.getContext('2d');
var canvasWidth = innerWidth * 0.9;
var canvasHeight = innerHeight * 0.9;
var gameStatus = true;
// ========== Enemies ========== //
ctx.canvas.width = canvasWidth;
ctx.canvas.height = canvasHeight;
ctx2.canvas.width = canvasWidth;
ctx2.canvas.height = canvasHeight;
var shots = [];
let enemies = [];
createEnemie();
createEnemie();
createEnemie();
createEnemie();
createEnemie();
createShot();
createShot();
createShot();
createShot();




function createShot() {
    var size = Math.floor(Math.random() * (50) + 20);
    // var newShot = new Shot(
    //     Math.floor(Math.random() * (canvasHeight)),
    //     size,
    //     Math.floor(Math.random() * (20) + 1),
    // );
    var newShot = new Shot(
        20,
        size,
        Math.floor(Math.random() * (5) + 1),
    );
    shots.push(newShot);
}

function createEnemie() {
    var size = Math.floor(Math.random() * (50) + 20);
    // var newEnemie = new Enemie(
    //     Math.floor(Math.random() * (canvasHeight)),
    //     size,
    //     Math.floor(Math.random() * (5) + 1),
    // );
    var newEnemie = new Enemie(
        20,
        size,
        Math.floor(Math.random() * (5) + 1),
    );
    enemies.push(newEnemie);
}



function Enemie(yPos, size, speed) {
    this.yPos = yPos;
    this.size = size;
    this.speed = -speed;
    this.xPos = canvasWidth;
    this.enemieUpdate = function () {
        this.enemieColider();
        this.enemieMove();
        this.enemieDraw();
    };
    this.enemieMove = function () {
        this.xPos += this.speed;
    };
    this.enemieDraw = function () {
        ctx.beginPath();
        ctx.arc(this.xPos, this.yPos, this.size, 0, 2 * Math.PI, false);
        ctx.strokeStyle = "white";
        ctx.stroke();
    };
    this.enemieColider = function () {
        this.xPos + this.size <= 0 ? gameStatus = false : null;

        for (var i = 0; i < shots.length; i++) {
            this.xPos  === shots[i].xPos ? /*ctx.clearRect(0, 0, canvasWidth, canvasHeight)*/console.log("1") :console.log("2");
        }
    }
}


function Shot(yPos, size, speed) {
    this.yPos = yPos;
    this.size = size;
    this.speed = speed;
    this.xPos = 0;
    this.shotUpdate = function () {
        this.shotColider();
        this.shotMove();
        this.shotDraw();
    };
    this.shotMove = function () {
        this.xPos += this.speed;
    };
    this.shotDraw = function () {
        ctx2.beginPath();
        ctx2.arc(this.xPos, this.yPos, this.size, 0, 2 * Math.PI, false);
        ctx2.strokeStyle = "white";
        ctx2.stroke();
    };
    this.shotColider = function () {
        this.xPos + this.size >= canvasWidth ? gameStatus = false : null;
    }
}



draw2();
// draw();

function draw() {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    for (var i = 0; i < enemies.length; i++) {
        enemies[i].enemieUpdate();
        console.log(gameStatus);
    }
    window.requestAnimationFrame(draw);
}
function draw2() {
    ctx2.clearRect(0, 0, canvasWidth, canvasHeight);
    for (var i = 0; i < shots.length; i++) {
        shots[i].shotUpdate();
        // console.log(gameStatus);
        for (var j = 0; j < enemies.length; j++) {
            enemies[j].enemieUpdate();
        }
    }
    window.requestAnimationFrame(draw2);
}
// ========== Shots ========== //




// alert(enemies[0].xPos);