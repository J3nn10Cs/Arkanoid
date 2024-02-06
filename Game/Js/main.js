var c = document.getElementById("arkoneidCanva");
var ctx = c.getContext("2d");

var radius = 10;
var x = c.width / 2;
var y = c.height - radius;
var dx = 2;
var dy = -2;

var paddlex = c.width / 2;
var paddley = c.height - 10; //no quede en el borde
var paddleW = 60;
var paddleH = 12;

var rightMove = false;
var leftMove = false;

var brickRows = 4;
var brickColums = 7;
var brickWidth = 40;
var brickHeight = 20;
var brickPadding = 12;
var brickOfSetTop = 30;
var brickOfSetLeft = 150;

var score = 0;
var lives = 3;

var briks = [];
for (let i = 0; i < brickColums; i++) {
    briks[i] = [];
    for (let j = 0; j < brickRows; j++) {
        briks[i][j] = { x: 0, y: 0, drawBrik: true };
    }
}


document.addEventListener("keydown", KeyDownHandler, false);
document.addEventListener("keyup", KeyUpHandler, false);
document.addEventListener("mousemove",mouseMoveHandler,false);

function KeyDownHandler(e) {
    if (e.keyCode == 37) {
        leftMove = true;
    } else {
        if (e.keyCode == 39) {
            rightMove = true;
        }
    }
}

function KeyUpHandler(e) {
    if (e.keyCode == 37) {
        leftMove = false;
    } else {
        if (e.keyCode == 39) {
            rightMove = false;
        }
    }
}

function mouseMoveHandler(e){
    var mouseRelativeX = e.clientX - c.offsetLeft;
    if(mouseRelativeX>0 && mouseRelativeX<c.width){
        paddlex = mouseRelativeX -  paddleW/2;
    } 
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fillStyle = "#ffcc99";
    ctx.fill();
    ctx.closePath();
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddlex, paddley, paddleW, paddleH);
    ctx.fillStyle = "#804000";
    ctx.fill();
    ctx.closePath();
}

function drawBricks() {
    for (let i = 0; i < brickColums; i++) {
        for (let j = 0; j < brickRows; j++) {
            if (briks[i][j].drawBrik) {
                var bx = (i * (brickWidth + brickPadding)) + brickOfSetLeft;
                var by = (j * (brickHeight + brickPadding)) + brickOfSetTop;
                briks[i][j].x = bx;
                briks[i][j].y = by;
                ctx.rect(bx, by, brickWidth, brickHeight);
                ctx.fillStyle = "#ff80ff";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

function detectHits() {
    for (let i = 0; i < brickColums; i++) {
        for (let j = 0; j < brickRows; j++) {
            var brick = briks[i][j];
            if (briks[i][j].drawBrik) {
                if (x > brick.x && x < brick.x + brickWidth && y > brick.y && y < brick.y + brickHeight) {
                    dy = -dy;
                    brick.drawBrik = false;
                    score++;
                    if (score == brickColums * brickRows) {
                        alert("Felicitaciones");
                    }
                }
            }
        }
    }
}

function drawScore() {
    ctx.font = "20px Arial";
    ctx.fillText("Score: " + score, 0, 20);
    ctx.fillStyle = "#b30000";
}

function drawLives() {
    ctx.font = "20px Arial";
    ctx.fillText("Lives: " + lives, c.width - 80, 20);
    ctx.fillStyle = "#ff0055";
}

function draw() {
    ctx.clearRect(0, 0, c.width, c.height);
    drawPaddle();
    drawBall();
    drawBricks();
    detectHits();
    drawScore();
    drawLives();
    if (x + dx > c.width - radius || x + dx < radius) {
        dx = -dx;
    } if (y + dy < radius) {
        dy = -dy;
    } else {
        if (y + dy > c.height - radius) {
            if (x > paddlex && x < paddlex + paddleW) {
                dy = -dy;
            } else {
                lives--;
                if (lives < 1) {
                    gameover();
                    return;
                } else {
                    x = c.width / 2;
                    y = c.height - radius;
                    dx = 2;
                    dy = -2;
                    paddlex = c.width / 2;
                }
            }
        }
    }

        if (leftMove && paddlex > 0) {
            paddlex -= 8;
        } if (rightMove && paddlex < c.width - paddleW) {
            paddlex += 8;
        }

        x += dx;
        y += dy; 
        requestAnimationFrame(draw);   
}

function gameover(){
    document.getElementById("GameOver").style.display =  "block";
}

draw();