const ctx = document.getElementById("ctx").getContext("2d");
const catcherOne = new Image();
const catcherTwo = new Image();
const catcherThree = new Image();
const catcherFour = new Image();
const background = new Image();
const blood = new Image();
const tile = new Image();
const fruit = new Image();
const food = new Image();

//Global variables
let score = 0;
let level = 100;
let animation = 0;
let foodTimer = 0;
let gameover = false;
let intervalvar;
let foodList = [];
let tileList = [];
    //food will drop from the foodDrop positions 
const foodDrop = [0,50,100,150,200,250,300,350,400,450];


const tileObject = {
    'width': 50,
    'height': 20
};

const foodObject = {
    'width': 50,
    'height': 50,
    'spd': 3
}

const catcher = {
    'x': 100,
    'y': 350,
    'width': 30,
    'height': 50,
    'jump': 0,
    'jumpUnit': 5,
    'onair': false,
    'spd': 0,
    'leftPressed': false,
    'rightPressed': false,
    'gravity': 10,
    'safe': true
}

function Sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);

    this.play = () => {
        this.sound.play();
    }

    this.pause = () => {
        this.sound.pause();
    }
}

const eatingSound = new Sound("sound/eat.mp3");
const droppingSound = new Sound("sound/drop.mp3");

//wait till assets load, then call startGame()
background.onload = () => {
    blood.onload = () => {
        catcherOne.onload = () => {
            catcherTwo.onload = () => {
                catcherThree.onload = () => {
                    catcherFour.onload = () => {
                        food.onload = () => {
                            fruit.onload = () => {
                                tile.onload = () => {
                                    startPreGame();
                                }
                                tile.src = "images/tile.png"
                            }
                            fruit.src = "images/fruit.png"
                        }
                        food.src = "images/food.png"
                    }
                    catcherFour.src = "images/catcher4.png"
                }
                catcherThree.src = "images/catcher3.png"
            }
            catcherTwo.src = "images/catcher2.png"
        }
        catcherOne.src = "images/catcher1.png"
    }
    blood.src = "images/blood.png"
}
background.src = "images/background.jpg";

function startPreGame(){ctx.drawImage(background, 0, 0, 500, 500);
    ctx.strokeStyle = "#FFFFFF";
    ctx.font = "30px Calibri";
    ctx.strokeText("Click here to start the game", 80, 250)
    drawObject = (object, x, y, width, height) => {
        ctx.drawImage(object,x,y,width,height);
    }

    document.getElementById("ctx").onmousedown = () => {
        if (!gameover){
            clearInterval(intervalvar);
        }
        startGame();
    }
}

document.onkeydown = () => {
    if (event.keyCode === 37 && catcher.x > 0){
        catcher.spd = -5;
        catcher.leftPressed = true;
    }
    if (event.keyCode === 39 && catcher.x < 500 - catcher.width) {
        catcher.spd = 5;
        catcher.rightPressed = true;
    }
    if (event.keyCode === 38 && !catcher.onair && catcher.y === 350){
        catcher.jump = 100;
        catcher.onair = true;
    }
}

document.onkeyup = () => {
    if (event.keyCode === 37){
        catcher.leftPressed = false;
    }
    if (event.keyCode === 39) {
        catcher.rightPressed = false;
    }
}

food_catcher_collision = (food) => {
    return (
        (food.x < catcher.x + catcher.width)
        && (catcher.x < food.x + foodObject.width)
        && (food.y < catcher.y + catcher.height)
        && (catcher.y < food.y + foodObject.height)
    );
}
food_tile_collision = (food, tiles) => {
    return (
        (food.x < tiles.x + tileObject.width)
        && (tiles.x < food.x + foodObject.width)
        && (food.y < tiles.y + tileObject.height)
        && (tiles.y < food.y + foodObject.height)
    );
}
catcher_tile_collision = (tiles) => {
    return (
        (catcher.x <= tiles.x + tileObject.width)
        && (tiles.x <= catcher.x + catcher.width)
        && (catcher.y + catcher.height <= tiles.y)
    );
}

jump = () => {
    //Moving Up
    if (catcher.jump > 0 && catcher.onair){
        catcher.y -= catcher.jumpUnit;
        catcher.jump -= catcher.jumpUnit;
    }

    if (catcher.jump <= 0 && catcher.jump > -100 && catcher.onair){
        catcher.y += catcher.jumpUnit;
        catcher.jump -= catcher.jumpUnit;
    }

    if (catcher.jump <= -100 && catcher.onair){
        catcher.onair = false;
    }
}

updateFoodPosition = () => {
    for (var i in foodList){
        if (foodList[i].y > 500){
            foodList.splice(i, 1);
        }
        else {
            foodList[i].y += foodObject.spd;
        }
    }
}

updateCatcherPosition = () => {
    if (catcher.leftPressed && catcher.x > 0){
        catcher.x += catcher.spd;
    }
    if (catcher.rightPressed && catcher.x < 500 - catcher.width){
        catcher.x += catcher.spd;
    }
    if (catcher.y > 450){
        droppingSound.play();
        catcher.y = 450;
        gameover = true;
    }
}

gameOver = () => {
    ctx.save();
    ctx.globalAlpha = 0.6;
    drawObject(blood, 100, 100, 300, 300);
    ctx.globalAlpha = 1.0;
    ctx.strokeStyle = "#FFFFFF";
    ctx.font = "30px Calibri";
    ctx.strokeText("Game Over", 180, 200);
    ctx.strokeText("Click to Restart", 160, 250);
    ctx.restore();
    clearInterval(intervalvar);
}

updatePosition = () => {
    ctx.clearRect(0,0,500,500);
    drawObject(background, 0,0,500,500);
    foodTimer++;
    if (foodTimer > level){
        foodList.push({'x':foodDrop[Math.round(Math.random() * 9)],'y':0});
        foodTimer = 0;
    }
    if (gameover){
        drawObject(catcherThree, catcher.x, 470, 50, 30);
        gameOver();
    }
    if (catcher.onair){
        drawObject(catcherFour, catcher.x, catcher.y, catcher.width, catcher.height);
        animation = 1;
    }
    if (animation === 0){
        drawObject(catcherTwo, catcher.x, catcher.y, catcher.width, catcher.height);
        animation = 1;
    } else {
        drawObject(catcherOne, catcher.x, catcher.y, catcher.width, catcher.height);
        animation = 0;
    }

    for (var i in foodList){
        drawObject(food, foodList[i].x, foodList[i].y, foodObject.width, foodObject.height)
    }
    for (let i=0; i<tileList.length; i++){
        drawObject(tile, tileList[i].x, tileList[i].y, tileObject.width, tileObject.height);
    }

    for (var i in foodList){
        if (food_catcher_collision(foodList[i])){
            score++;
            eatingSound.play();
            if (score % 2 === 0){
                level--
            }
            //.splice() will remove that 'food' from the screen
            foodList.splice(i,1);
        }
    }

    for (var i in foodList){
        for (var j in tileList){
            if (food_tile_collision(foodList[i], tileList[j])){
                tileList.splice(j,1);
            }       
        }
    }

    if (!catcher.onair){
        for (var i in tileList){
            if (catcher_tile_collision(tileList[i])){
                catcher.safe = true;
                break;
            }
            catcher.safe = false;
        }
        if (!catcher.safe){
            catcher.y += catcher.gravity;
        }
    }

    drawObject(food, 440, 10, 20, 20);
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "20px Calibri";
    ctx.fillText(score, 465, 27);
    ctx.fillText("Level: " + (100 - level + 1), 10, 27);

    updateFoodPosition();
    updateCatcherPosition();
    jump();
}

startGame = () => {
    score = 0;
    level = 100;
    catcher.x = 100;
    catcher.y = 350;
    catcher.onair = false;
    catcher.leftPressed = false;
    catcher.rightPressed = false;
    catcher.safe = true;
    animation = 0;
    foodTimer = 0;
    gameover = false;
    tileList = [];
    foodList = [];

    for (let i=0; i<=9; i++){
        tileList.push({'x':i*50, 'y':400})
    }

    intervalvar = setInterval(updatePosition,10);


}