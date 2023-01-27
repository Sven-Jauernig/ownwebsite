// ========== Settings ========== //

let canvas = <HTMLCanvasElement>document.getElementById('board'),

    ctx: CanvasRenderingContext2D = canvas.getContext('2d'),
    ctx2: CanvasRenderingContext2D = canvas.getContext('2d'),
    ctx3: CanvasRenderingContext2D = canvas.getContext('2d');

const canvasWidth: number = innerWidth * 0.9,
    canvasHeight: number = innerHeight * 0.9,
    scoreH2: HTMLElement = document.getElementById("score"),
    startButton: HTMLElement = document.getElementById("startButton"),
    startDiv: HTMLElement = document.getElementById("startDiv"),
    canvasDiv: HTMLElement = document.getElementById("canvasDiv"),
    winloseScreen: HTMLElement = document.getElementById("winloseScreen"),
    highscoreHTML: HTMLElement = document.querySelector("body .outer .inner ul li h3"),
    menu: HTMLElement = document.getElementById("menu"),
    nav: HTMLElement = document.getElementById("nav"),
    button: HTMLElement = document.getElementById("burger");

startButton.addEventListener("click", start);
button.addEventListener("click", burgermenu);


ctx.canvas.width = canvasWidth;
ctx.canvas.height = canvasHeight;
ctx2.canvas.width = canvasWidth;
ctx2.canvas.height = canvasHeight;

let gameStatus: boolean = true,
    enemieIntervalTimer: number = 3000,
    score: number = 0,
    playerHeight: number = 0.5 * canvasHeight,
    enemies: any = [],
    shots: any = [],
    player: any = [],
    highscoreName: string = "Name",
    everageHighscoreName: string = "",
    highscore: number = 0;

// ========== Player ========== //

function createPlayer(): void {
    let newPlayer = new Player();
    player.push(newPlayer);
}

class Player {

    yPos: number;
    xPos: number;

    constructor() {
        this.xPos = 0;
        this.yPos = playerHeight;
    };

    playerUpdate = function () {
        this.playerMove();
        this.playerDraw();
    };

    playerDraw = function () {
        ctx3.beginPath();
        ctx3.arc(0, playerHeight, 20, 0, 2 * Math.PI, false);
        ctx3.strokeStyle = "red";
        ctx3.fillStyle = "red";
        ctx3.stroke();
    };

    playerMove = function () {
        this.yPos = playerHeight;
    };
}

// ========== Enemies ========== //

function createEnemy(): void {

    let size = Math.floor(Math.random() * (50) + 20),
        newEnemy: { yPos: number, size: number, speed: number } = new Enemy(
            Math.floor(Math.random() * (canvasHeight)),
            size,
        );
    enemies.push(newEnemy);
}

class Enemy {

    yPos: number;
    size: number;
    speed: number;
    xPos: number;
    isHit: boolean;

    constructor(yPos: number, size: number) {

        this.xPos = canvasWidth;
        this.isHit = false;
        this.yPos = yPos;
        this.size = size;
        this.speed = -1;
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
        if (this.xPos + this.size <= 0) {
            for (let j = 0; j < enemies.length; j++) {
                if (enemies[j].xPos === this.xPos && enemies[j].yPos === this.yPos && enemies[j].size === this.size) {
                    enemies.splice(j, 1);
                    gameStatus = false;
                }
            }
        }
        for (let i = 0; i < shots.length; i++) {
            if (this.xPos + this.size >= shots[i].xPos - shots[i].size && this.xPos - this.size <= shots[i].xPos + shots[i].size && this.yPos - this.size <= shots[i].yPos + shots[i].size && this.yPos + this.size >= shots[i].yPos - shots[i].size) {
                if (this.isHit === false) {
                    for (let j = 0; j < enemies.length; j++) {
                        if (enemies[j].xPos === this.xPos && enemies[j].yPos === this.yPos && enemies[j].size === this.size) {
                            this.isHit = true;
                            enemies.splice(j, 1);
                            shots.splice(i, 1);
                            score += 1;
                        }
                    }
                }
            }
        }
    }
}

// ========== Shots ========== //

function createShot(): void {

    let size = Math.floor(Math.random() * (50) + 20),
        newShot = new Shot(
            playerHeight,
            size,
        );
    shots.push(newShot);
}

class Shot {

    yPos: number;
    size: number;
    speed: number;
    xPos: number;

    constructor(yPos, size) {
        this.yPos = yPos;
        this.size = size;
        this.speed = 1;
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
        if (this.xPos + this.size >= canvasWidth) {
            for (let j = 0; j < shots.length; j++) {
                if (shots[j].xPos === this.xPos && shots[j].yPos === this.yPos && shots[j].size === this.size) {
                    shots.splice(j, 1);
                }
            }
        }
    }
}

// ========== Draw ========== //

function draw() {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    for (let i = 0; i < enemies.length; i++) {
        enemies[i].enemyUpdate();
    }
    for (let j = 0; j < shots.length; j++) {
        shots[j].shotUpdate();
    }
    for (let k = 0; k < player.length; k++) {
        player[k].playerUpdate();
    }
}

// ========== Interval ========== //


function startInterval() {

    let drawInterval = setInterval(() => {

        if (!gameStatus) {
            enemies.splice(gameStatus[1], 1);
            clearInterval(drawInterval);
            canvasDiv.setAttribute("style", "display: none;");
            winloseScreen.setAttribute("style", "display: block;");
            winloseScreen.innerHTML = `<h1>You Lose!</h1> <h2>Your Score was: ${score}</h2> <h3>Please enter your name</h3> <input type="text" id="highscoreName" name="name" placeholder="Your Name" onclick="this.select();">`;
            const input: HTMLElement = document.getElementById("highscoreName");
            document.onkeydown = (e) => {
                if ((e as KeyboardEvent).key === 'Enter' || (e as KeyboardEvent).code === "ENTER") {
                    highscoreName = (<HTMLInputElement>input).value.toString();
                    document.onkeydown = (e) => {
                        if ((e as KeyboardEvent).key === 'Enter' || (e as KeyboardEvent).code === "ENTER") {
                            reset();
                        };
                    };
                }
            };

        } else if (score === 1000) {
            clearInterval(enemieInterval);
            canvasDiv.setAttribute("style", "display: none;");
            winloseScreen.setAttribute("style", "display: block;");
            winloseScreen.innerHTML = `<h1>You Win!</h1> <h2>Your Score was: ${score}</h2> <h3>Please enter your name</h3> <input type="text" id="highscoreName" name="name" placeholder="Your Name" onclick="this.select();">`;
            const input: HTMLElement = document.getElementById("highscoreName");
            document.onkeydown = (e) => {
                if ((e as KeyboardEvent).key === 'Enter' || (e as KeyboardEvent).code === "ENTER") {

                    highscoreName = (<HTMLInputElement>input).value.toString();
                    document.onkeydown = (e) => {
                        if ((e as KeyboardEvent).key === 'Enter' || (e as KeyboardEvent).code === "ENTER") {
                            reset();
                        };
                    };
                }
            };
            gameStatus = false;
        } else {
            draw();
            scoreH2.innerText = "Score: " + score;
        }
    });

    let enemieInterval = setInterval(() => {
        if (!gameStatus) {
            clearInterval(enemieInterval);
        } else if (score === 1000) {
            clearInterval(enemieInterval);
            gameStatus = false;
        } else {
            createEnemy();
            if (score % 50 === 0 && score != 0) {
                enemieIntervalTimer *= 0.7;
            }
        }
    }, enemieIntervalTimer * (1 - (score / 1000 * 3)));
}

// ========== Function-Call ========== //

function start() {
    startDiv.setAttribute("style", "display: none;");
    canvasDiv.setAttribute("style", "display: flex;");
    nav.setAttribute("style", "display: none;");
    createPlayer();
    startInterval();

    if (gameStatus) {
        document.onkeydown = (e) => {
            if ((e as KeyboardEvent).key === '' || (e as KeyboardEvent).code === "Space") {
                createShot();
            } else if ((e as KeyboardEvent).key === 's' || (e as KeyboardEvent).code === "KEY_S" || (e as KeyboardEvent).keyCode === 83 || (e as KeyboardEvent).code === "KEY_DOWN" || (e as KeyboardEvent).keyCode === 40) {
                if (playerHeight >= canvasHeight) {
                    playerHeight = 10;
                } else {
                    playerHeight += 10;
                }
            } else if ((e as KeyboardEvent).key === 'w' || (e as KeyboardEvent).code === "KEY_W" || (e as KeyboardEvent).keyCode === 87 || (e as KeyboardEvent).code === "KEY_UP" || (e as KeyboardEvent).keyCode == 38) {
                if (playerHeight <= 0) {
                    playerHeight = canvasHeight - 10;
                } else {
                    playerHeight -= 10;
                }
            }
        }
    }
}

function reset() {
    if (highscore <= score) {
        highscore = score;
        everageHighscoreName = highscoreName;
    }
    gameStatus = true;
    score = 0;
    enemies = [];
    shots = [];
    player = [];
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx2.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx3.clearRect(0, 0, canvasWidth, canvasHeight);
    winloseScreen.setAttribute("style", "Display: none;");
    startDiv.setAttribute("style", "Display: flex");
    highscoreHTML.innerText = everageHighscoreName + ":  " + highscore;
    startButton.addEventListener("click", start);
    nav.setAttribute("style", "display: flex;");

}


function burgermenu() {
    menu.setAttribute("onclick", "wiederweg()");
    button.setAttribute("style", "display: none;");
    menu.setAttribute("style", "display: block;");

    window.setTimeout(function () {

        menu.style.opacity = '1';

    }, 0);
}

function wiederweg() {
    menu.style.opacity = '0';
    menu.style.display = 'none';

    menu.removeAttribute("onclick");
    button.setAttribute("style", "display: block;");
}