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

    for (let i=0; i<tileList.length; i++){
        drawObject(tile, tileList[i].x, tileList[i].y, tileObject.width, tileObject.height);
    }
}