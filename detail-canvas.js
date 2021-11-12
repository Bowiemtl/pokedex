//initialize canvas
let canvas = document.querySelector('.pokemon-stat-graph canvas');
let ctx = canvas.getContext('2d');

scale = (window.innerHeight + window.innerHeight) / 1024;

let size = window.innerWidth / 2 * scale
canvas.width = size;
canvas.height = size;

//canvas centers
let centX = canvas.width / 2;
let centY = canvas.height / 2;
function drawStats() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //calculate the amount the angle of an edge should increase each iteration of the loop  
    let angle_increment = (2 * Math.PI / stats.length);

    //draw gray background and outer white lines
    let radius = 128 * scale;
    let radius2 = 145 * scale;
    ctx.beginPath();

    ctx.beginPath();

    let angleOffset = (Math.PI / 2);
    for (let i = 0; i <= 6; i++) {
        let angle = (angle_increment * i) - angleOffset;

        let x = radius * Math.cos(angle);
        let y = radius * Math.sin(angle);

        ctx.lineTo(centX + x, centY + y);
    }
    ctx.closePath();
    ctx.strokeStyle = color[1];
    ctx.stroke();
    ctx.fillStyle = '#A3A3A3';
    ctx.fill();

    //draw white lines over gray background 
    for (let i = 0; i < stats.length; i++) {
        let angle = (angle_increment * i) - angleOffset;

        //calculate x and y coordinates for edges
        let x = radius * Math.cos(angle);
        let y = radius * Math.sin(angle);
        //calculate x and y coordinates for text
        let x2 = radius2 * Math.cos(angle);
        let y2 = radius2 * Math.sin(angle);

        ctx.moveTo(centX, centY);
        ctx.lineTo(centX + x, centY + y);
        ctx.closePath();
        ctx.strokeStyle = 'white';
        ctx.moveTo(centX, centY);
        ctx.lineTo(centX + x, centY + y);
        ctx.closePath();
        ctx.stroke();

        let stat_name = stats[i].stat.name;
        let base_stat = stats[i].base_stat;

        ctx.stroke();

        //draw text
        drawStroked(firstLetterUppercase(stat_name), centX + x2, centY + y2, color, 'black');
        drawStroked(base_stat, centX + x2, centY + y2 + 25, color, 'black');
        ctx.lineWidth = 1;
    }

    //draw pokemon statistic lines
    ctx.beginPath();

    let i = 0
    stats.forEach(stat => {
        let base_stat = stat.base_stat / 2;
        let angle = (angle_increment * i) - angleOffset;
        let j = base_stat * scale;
        let x = j * Math.cos(angle);
        let y = j * Math.sin(angle);

        ctx.lineTo(centX + x, centY + y);
        i++;
    });
    ctx.closePath();
    ctx.strokeStyle = color;
    ctx.stroke();
    ctx.fillStyle = `${color}CC`;
    ctx.fill();
}

$(window).on('resize', function () {
    //drawStats();
    //scale = (window.innerHeight + window.innerHeight) / 1280;
});

function drawStroked(text, x, y, color, strokeColor) {
    ctx.font = '20px pokemon';
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = 4 * scale;
    ctx.strokeText(text, x, y);
    ctx.fillStyle = "white";
    ctx.fillText(text, x, y);
}

window.onresize = function (event) {
    console.log(window.innerHeight);
    console.log(window.innerWidth);

    if(window.innerWidth < 800){
        size = window.innerWidth * 0.8;
    } else if(window.innerWidth > 800){
        size = window.innerWidth / 2;
    }
    
    scale = size / 384;
    canvas.width = size;
    canvas.height = size;

    centX = canvas.width / 2;
    centY = canvas.height / 2;

    drawStats();
}