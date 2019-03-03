// in index.html set canvas size to 800x600
const ctx = document.getElementById("ctx").getContext("2d");
const WIDTH = 800;
const HEIGHT = 600;

const circle1 = {
    x: 250,
    y: 300,
    radius: 20
};

const circle2 = {
    x: 350,
    y: 300,
    radius: 20
};

const eyeball1 = {
    x: 260,
    y: 310,
    radius: 10
};

const eyeball2 = {
    x: 360,
    y: 310,
    radius: 10
};

document.getElementById("ctx").onmousemove = (mouse) => {
    let mouseX = mouse.clientX - document.getElementById('ctx').getBoundingClientRect().left;
    let mouseY = mouse.clientY - document.getElementById('ctx').getBoundingClientRect().top;

    if (mouseX <= eyeball1.x){
        eyeball1.x = 240;
        eyeball2.x = 540;
    }
    if (mouseX >= eyeball2.x){
        eyeball2.x = 560;
        eyeball1.x = 260;
    }
    if (mouseY <= eyeball1.y){
        eyeball1.y = 290;
        eyeball2.y = 290;
    }
    if (mouseY > eyeball1.y){
        eyeball1.y = 310;
        eyeball2.y = 310;
    }
    if (mouseX > eyeball1.x && mouseX < eyeball2.x){
        eyeball1.x = 260;
        eyeball2.x = 540;
    }
}

drawEyeball = (eyeball) => {
    ctx.save();
    ctx.beginPath();
    ctx.arc(eyeball.x, eyeball.y, eyeball.radius, 0, 2*Math.PI);
    ctx.fill();
    ctx.restore();
}

drawCircle = (circle) => {
    ctx.save();
    ctx.beginPath();
    ctx.arc(circle.x, circle.y, circle.radius, 0, 2*Math.PI);
    ctx.stroke();
    ctx.restore();
}

update = () => {
    ctx.clearRect(0,0,WIDTH,HEIGHT);
    drawCircle(circle1);
    drawCircle(circle2);
    drawEyeball(eyeball1);
    drawEyeball(eyeball2);
}

setInterval(update, 20);