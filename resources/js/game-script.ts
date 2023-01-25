var canvas = <HTMLCanvasElement>document.getElementById('board');
var ctx: CanvasRenderingContext2D = canvas.getContext('2d');

var canvas2 = <HTMLCanvasElement>document.getElementById('board2');
var ctx2: CanvasRenderingContext2D = canvas2.getContext('2d');

const canvasWidth: number = innerWidth * 0.9;
const canvasHeight: number = innerHeight * 0.9;

let gameStatus: boolean = true;
// ========== Enemies ========== //

ctx.canvas.width = canvasWidth;
ctx.canvas.height = canvasHeight;

// let enemies :any = []; 



// createEnemie();

// function createEnemie() {

//     var size = Math.floor(Math.random() * (50) + 20);
//     var newEnemie: { yPos: number, size: number, speed: number } = new Enemie(
//         Math.floor(Math.random() * (canvasHeight)),
//         size,
//         Math.floor(Math.random() * (20) + 1),
//     );

//     enemies.push(newEnemie);
// }


// function Enemie(yPos: number, size: number, speed: number) {
//     this.yPos = yPos;
//     this.size = size;
//     this.speed = -speed;
//     this.xPos = canvasWidth;

//     this.enemieUpdate = function () {
//         this.enemieColider();
//         this.enemieMove();
//         this.enemieDraw();
//     };

//     this.enemieMove = function () {
//         this.xPos += this.speed;
//     };

//     this.enemieDraw = function () {
//         ctx.beginPath();
//         ctx.arc(this.xPos, this.yPos, this.size, 0, 2 * Math.PI, false);
//         ctx.strokeStyle = "white";
//         ctx.stroke();
//     };

//     this.enemieColider = function () {
//         this.xPos + this.size <= 0 ? gameStatus = false : null;
//     }
// }


// draw();

// function draw() : void {
//     ctx.clearRect(0, 0, canvasWidth, canvasHeight);


//     for (var i = 0; i < enemies.length; i++) {
//         enemies[i].enemieUpdate();
//         console.log(gameStatus);
//     }

//     window.requestAnimationFrame(draw);
// }




    // ========== Shots ========== //

ctx2.canvas.width = canvasWidth;
ctx2.canvas.height = canvasHeight;

let shots: any = [];


// ctx2.beginPath();
        ctx2.arc(1000, 200, 20, 0, 2 * Math.PI, false);
        ctx2.strokeStyle = "white";
        ctx2.stroke();

// createShot();

// function createShot() {

//     var size = Math.floor(Math.random() * (50) + 20);
//     var newShot: { yPos: number, size: number, speed: number } = new Shot(
//         Math.floor(Math.random() * (canvasHeight)),
//         size,
//         Math.floor(Math.random() * (20) + 1),
//     );

//     shots.push(newShot);
// }


// function Shot(yPos: number, size: number, speed: number) {
//     this.yPos = yPos;
//     this.size = size;
//     this.speed = speed;
//     this.xPos = 0;

//     this.shotUpdate = function () {
//         this.shotColider();
//         this.shotMove();
//         this.shotDraw();
//     };

//     this.shotMove = function () {
//         this.xPos += this.speed;
//     };

//     this.shotDraw = function () {
//         ctx2.beginPath();
//         ctx2.arc(this.xPos, this.yPos, this.size, 0, 2 * Math.PI, false);
//         ctx2.strokeStyle = "white";
//         ctx2.stroke();
//     };

//     this.shotColider = function () {
//         this.xPos + this.size >= canvasWidth ? gameStatus = false : null;
//     }
// }


// draw2();

// function draw2() : void {
//     ctx2.clearRect(0, 0, canvasWidth, canvasHeight);


//     for (var i = 0; i < shots.length; i++) {
//         shots[i].shotUpdate();
//         console.log(gameStatus);
//     }

//     window.requestAnimationFrame(draw2);
// }