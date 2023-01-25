var canvas = document.getElementById('board');
var ctx = canvas.getContext('2d');
var ctx2 = canvas.getContext('2d');
var canvasWidth = innerWidth * 0.9;
var canvasHeight = innerHeight * 0.9;
var gameStatus = true;
// ========== Enemies ========== //
ctx.canvas.width = canvasWidth;
ctx.canvas.height = canvasHeight;
ctx2.canvas.width = canvasWidth;
ctx2.canvas.height = canvasHeight;
var enemies = [];
var shots = [];
function createEnemy() {
    var size = Math.floor(Math.random() * (50) + 20);
    var newEnemy = new Enemy(Math.floor(Math.random() * (canvasHeight)), size, Math.floor(Math.random() * (5) + 1));
    enemies.push(newEnemy);
}
function createShot() {
    var size = Math.floor(Math.random() * (50) + 20);
    var newShot = new Shot(Math.floor(Math.random() * (canvasHeight)), size, Math.floor(Math.random() * (5) + 1));
    shots.push(newShot);
}
var Enemy = /** @class */ (function () {
    function Enemy(yPos, size, speed) {
        this.enemyUpdate = function () {
            this.enemyColider();
            this.enemyMove();
            this.enemyDraw();
        };
        this.enemyMove = function () {
            this.xPos += this.speed;
        };
        this.enemyDraw = function () {
            ctx.beginPath();
            ctx.arc(this.xPos, this.yPos, this.size, 0, 2 * Math.PI, false);
            ctx.strokeStyle = "deeppink";
            ctx.stroke();
        };
        this.enemyColider = function () {
            this.xPos + this.size <= 0 ? gameStatus = false : null;
            for (var i = 0; i < shots.length; i++) {
                if (this.xPos + this.size >= shots[i].xPos - shots[i].size && this.xPos + this.size <= shots[i].xPos + shots[i].size && this.yPos + this.size >= shots[i].yPos - shots[i].size && this.yPos + this.size <= shots[i].yPos + shots[i].size) {
                    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
                    if (this.isHit === false) {
                        this.isHit = true;
                        enemies[i] = { x: 0, y: 0, status: 1 };
                        enemies.splice(i, 1);
                    }
                }
            }
        };
        this.xPos = canvasWidth;
        this.isHit = false;
        this.yPos = yPos;
        this.size = size;
        this.speed = -speed;
    }
    return Enemy;
}());
console.log(Enemy);
var Shot = /** @class */ (function () {
    function Shot(yPos, size, speed) {
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
        };
        this.yPos = yPos;
        this.size = size;
        this.speed = speed;
        this.xPos = 0;
    }
    return Shot;
}());
function draw() {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    for (var i = 0; i < enemies.length; i++) {
        enemies[i].enemyUpdate();
        console.log(enemies.length);
        for (var j = 0; j < shots.length; j++) {
            shots[j].shotUpdate();
        }
    }
}
setInterval(function () {
    draw(), 500;
});
createShot();
createShot();
createShot();
createShot();
createShot();
createShot();
createEnemy();
createEnemy();
createEnemy();
createEnemy();
createEnemy();
createEnemy();
console.log(enemies);
// ========== Shots ========== //
