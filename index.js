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
                                    startGame()
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


drawObject = (object, x, y, width, height) => {
    ctx.drawImage(object,x,y,width,height);
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
}

updatePosition = () => {
    ctx.clearRect(0,0,500,500);
    drawObject(background, 0,0,500,500);
    foodTimer++;
    if (foodTimer > 100){
        foodList.push({'x':foodDrop[Math.round(Math.random() * 9)],'y':0});
        foodTimer = 0;
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