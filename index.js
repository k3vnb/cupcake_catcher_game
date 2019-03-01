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

background.onload = function(){
    blood.onload = function(){
        catcherOne.onload = function(){
            catcherTwo.onload = function(){
                catcherThree.onload = function(){
                    catcherFour.onload = function(){
                        food.onload = function(){
                            fruit.onload = function(){
                                tile.onload = function(){
                                    console.log("callback HELL achieved!");

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