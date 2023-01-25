let canvas = <HTMLCanvasElement>document.getElementById('board');

let ctx: CanvasRenderingContext2D = canvas.getContext('2d');
let ctx2: CanvasRenderingContext2D = canvas.getContext('2d');

const canvasWidth: number = innerWidth * 0.9;
const canvasHeight: number = innerHeight * 0.9;

let gameStatus: boolean = true;
// ========== Enemies ========== //

ctx.canvas.width = canvasWidth;
ctx.canvas.height = canvasHeight;
ctx2.canvas.width = canvasWidth;
ctx2.canvas.height = canvasHeight;

let enemies: any = [];
let shots: any = [];




function createEnemy(): void {

    let size = Math.floor(Math.random() * (50) + 20);
    let newEnemy: { yPos: number, size: number, speed: number } = new Enemy(
        Math.floor(Math.random() * (canvasHeight)),
        size,
        Math.floor(Math.random() * (5) + 1),
    );
    enemies.push(newEnemy);
}

function createShot(): void {

    let size = Math.floor(Math.random() * (50) + 20);
    let newShot = new Shot(
        Math.floor(Math.random() * (canvasHeight)),
        size,
        Math.floor(Math.random() * (5) + 1),
    );
    shots.push(newShot);
}


class Enemy {

    yPos: number;
    size: number;
    speed: number;
    xPos: number;
    isHit: boolean;

    constructor(yPos: number, size: number, speed: number) {

        this.xPos = canvasWidth;
        this.isHit = false;
        this.yPos = yPos;
        this.size = size;
        this.speed = -speed;


    }

    enemyUpdate = function () {
        this.enemyColider();
        this.enemyMove();
        this.enemyDraw();
    };

    enemyMove = function () {
        this.xPos += this.speed;
    };

    enemyDraw = function () {
        ctx.beginPath();
        ctx.arc(this.xPos, this.yPos, this.size, 0, 2 * Math.PI, false);
        ctx.strokeStyle = "deeppink";
        ctx.stroke();
    };

    enemyColider = function () {
        this.xPos + this.size <= 0 ? gameStatus = false : null;

        for (let i = 0; i < shots.length; i++) {
            if (this.xPos + this.size >= shots[i].xPos - shots[i].size && this.xPos + this.size <= shots[i].xPos + shots[i].size && this.yPos + this.size >= shots[i].yPos - shots[i].size && this.yPos + this.size <= shots[i].yPos + shots[i].size) {
                
                
                ctx.clearRect(0, 0, canvasWidth, canvasHeight);
                
                if (this.isHit === false){
                this.isHit = true;
                enemies[i] = { x: 0, y: 0, status: 1 };
                enemies.splice(i, 1);}
                
            }
        }
    }
}
console.log(Enemy);



class Shot {

    yPos: number;
    size: number;
    speed: number;
    xPos: number;

    constructor(yPos, size, speed) {
        this.yPos = yPos;
        this.size = size;
        this.speed = speed;
        this.xPos = 0;
    }

    shotUpdate = function () {
        this.shotColider();
        this.shotMove();
        this.shotDraw();
    };

    shotMove = function () {
        this.xPos += this.speed;
    };

    shotDraw = function () {
        ctx2.beginPath();
        ctx2.arc(this.xPos, this.yPos, this.size, 0, 2 * Math.PI, false);
        ctx2.strokeStyle = "white";
        ctx2.stroke();
    };

    shotColider = function () {
        this.xPos + this.size >= canvasWidth ? gameStatus = false : null;
    }
}

function draw() {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    for (let i = 0; i < enemies.length; i++) {
        enemies[i].enemyUpdate();
        console.log(enemies.length);
        for (let j = 0; j < shots.length; j++) {
            shots[j].shotUpdate();
        }
    }

}

setInterval(() => {
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


console.log(enemies)
// ========== Shots ========== //