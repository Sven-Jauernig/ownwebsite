// ========== Settings ========== //
var canvas = document.getElementById('board'), ctx = canvas.getContext('2d'), ctx2 = canvas.getContext('2d'), ctx3 = canvas.getContext('2d');
var canvasWidth = innerWidth * 0.9, canvasHeight = innerHeight * 0.9, scoreH2 = document.getElementById("score"), startButton = document.getElementById("startButton"), startDiv = document.getElementById("startDiv"), canvasDiv = document.getElementById("canvasDiv"), winloseScreen = document.getElementById("winloseScreen"), highscoreHTML = document.querySelector("body .outer .inner ul li h3"), menu = document.getElementById("menu"), nav = document.getElementById("nav"), button = document.getElementById("burger");
startButton.addEventListener("click", start);
button.addEventListener("click", burgermenu);
ctx.canvas.width = canvasWidth;
ctx.canvas.height = canvasHeight;
ctx2.canvas.width = canvasWidth;
ctx2.canvas.height = canvasHeight;
var gameStatus = true, enemieIntervalTimer = 3000, score = 0, playerHeight = 0.5 * canvasHeight, enemies = [], shots = [], player = [], highscoreName = "Name", everageHighscoreName = "", highscore = 0;
// ========== Player ========== //
function createPlayer() {
    var newPlayer = new Player();
    player.push(newPlayer);
}
var Player = /** @class */ (function () {
    function Player() {
        this.playerUpdate = function () {
            this.playerMove();
            this.playerDraw();
        };
        this.playerDraw = function () {
            ctx3.beginPath();
            ctx3.arc(0, playerHeight, 20, 0, 2 * Math.PI, false);
            ctx3.strokeStyle = "red";
            ctx3.fillStyle = "red";
            ctx3.stroke();
        };
        this.playerMove = function () {
            this.yPos = playerHeight;
        };
        this.xPos = 0;
        this.yPos = playerHeight;
    }
    ;
    return Player;
}());
// ========== Enemies ========== //
function createEnemy() {
    var size = Math.floor(Math.random() * (50) + 20), newEnemy = new Enemy(Math.floor(Math.random() * (canvasHeight)), size);
    enemies.push(newEnemy);
}
var Enemy = /** @class */ (function () {
    function Enemy(yPos, size) {
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
            if (this.xPos + this.size <= 0) {
                for (var j = 0; j < enemies.length; j++) {
                    if (enemies[j].xPos === this.xPos && enemies[j].yPos === this.yPos && enemies[j].size === this.size) {
                        enemies.splice(j, 1);
                        gameStatus = false;
                    }
                }
            }
            for (var i = 0; i < shots.length; i++) {
                if (this.xPos + this.size >= shots[i].xPos - shots[i].size && this.xPos - this.size <= shots[i].xPos + shots[i].size && this.yPos - this.size <= shots[i].yPos + shots[i].size && this.yPos + this.size >= shots[i].yPos - shots[i].size) {
                    if (this.isHit === false) {
                        for (var j = 0; j < enemies.length; j++) {
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
        };
        this.xPos = canvasWidth;
        this.isHit = false;
        this.yPos = yPos;
        this.size = size;
        this.speed = -1;
    }
    return Enemy;
}());
// ========== Shots ========== //
function createShot() {
    var size = Math.floor(Math.random() * (50) + 20), newShot = new Shot(playerHeight, size);
    shots.push(newShot);
}
var Shot = /** @class */ (function () {
    function Shot(yPos, size) {
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
            if (this.xPos + this.size >= canvasWidth) {
                for (var j = 0; j < shots.length; j++) {
                    if (shots[j].xPos === this.xPos && shots[j].yPos === this.yPos && shots[j].size === this.size) {
                        shots.splice(j, 1);
                    }
                }
            }
        };
        this.yPos = yPos;
        this.size = size;
        this.speed = 1;
        this.xPos = 0;
    }
    return Shot;
}());
// ========== Draw ========== //
function draw() {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    for (var i = 0; i < enemies.length; i++) {
        enemies[i].enemyUpdate();
    }
    for (var j = 0; j < shots.length; j++) {
        shots[j].shotUpdate();
    }
    for (var k = 0; k < player.length; k++) {
        player[k].playerUpdate();
    }
}
// ========== Interval ========== //
function startInterval() {
    var drawInterval = setInterval(function () {
        if (!gameStatus) {
            enemies.splice(gameStatus[1], 1);
            clearInterval(drawInterval);
            canvasDiv.setAttribute("style", "display: none;");
            winloseScreen.setAttribute("style", "display: block;");
            winloseScreen.innerHTML = "<h1>You Lose!</h1> <h2>Your Score was: ".concat(score, "</h2> <h3>Please enter your name</h3> <input type=\"text\" id=\"highscoreName\" name=\"name\" placeholder=\"Your Name\" onclick=\"this.select();\">");
            var input_1 = document.getElementById("highscoreName");
            document.onkeydown = function (e) {
                if (e.key === 'Enter' || e.code === "ENTER") {
                    highscoreName = input_1.value.toString();
                    document.onkeydown = function (e) {
                        if (e.key === 'Enter' || e.code === "ENTER") {
                            reset();
                        }
                        ;
                    };
                }
            };
        }
        else if (score === 1000) {
            clearInterval(enemieInterval);
            canvasDiv.setAttribute("style", "display: none;");
            winloseScreen.setAttribute("style", "display: block;");
            winloseScreen.innerHTML = "<h1>You Win!</h1> <h2>Your Score was: ".concat(score, "</h2> <h3>Please enter your name</h3> <input type=\"text\" id=\"highscoreName\" name=\"name\" placeholder=\"Your Name\" onclick=\"this.select();\">");
            var input_2 = document.getElementById("highscoreName");
            document.onkeydown = function (e) {
                if (e.key === 'Enter' || e.code === "ENTER") {
                    highscoreName = input_2.value.toString();
                    document.onkeydown = function (e) {
                        if (e.key === 'Enter' || e.code === "ENTER") {
                            reset();
                        }
                        ;
                    };
                }
            };
            gameStatus = false;
        }
        else {
            draw();
            scoreH2.innerText = "Score: " + score;
        }
    });
    var enemieInterval = setInterval(function () {
        if (!gameStatus) {
            clearInterval(enemieInterval);
        }
        else if (score === 1000) {
            clearInterval(enemieInterval);
            gameStatus = false;
        }
        else {
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
        document.onkeydown = function (e) {
            if (e.key === '' || e.code === "Space") {
                createShot();
            }
            else if (e.key === 's' || e.code === "KEY_S" || e.keyCode === 83 || e.code === "KEY_DOWN" || e.keyCode === 40) {
                if (playerHeight >= canvasHeight) {
                    playerHeight = 10;
                }
                else {
                    playerHeight += 10;
                }
            }
            else if (e.key === 'w' || e.code === "KEY_W" || e.keyCode === 87 || e.code === "KEY_UP" || e.keyCode == 38) {
                if (playerHeight <= 0) {
                    playerHeight = canvasHeight - 10;
                }
                else {
                    playerHeight -= 10;
                }
            }
        };
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
