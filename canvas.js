let t = 0;

function drawStats() {
    //initialize canvas
    let canvas = document.querySelector('.pokemon-stat-graph canvas');
    let ctx = canvas.getContext('2d');

    canvas.width = window.innerHeight / 2;
    canvas.height = canvas.width;
    //canvas centers
    let centX = canvas.width / 2;
    let centY = canvas.height / 2;

    let angle_increment = (2 * Math.PI / stats.length);

    //draw background lines and text
    ctx.beginPath();
    for (let i = 0; i < stats.length; i++) {
        let radius = 128 * scale;
        let radius2 = 145 * scale;
        let angle = (angle_increment * i) - (Math.PI / 2) + t;
        let x = radius * Math.cos(angle);
        let y = radius * Math.sin(angle);
        let x2 = radius2 * Math.cos(angle);
        let y2 = radius2 * Math.sin(angle);

        ctx.moveTo(centX, centY);
        ctx.lineTo(centX + x, centY + y);
        ctx.closePath();
        ctx.moveTo(centX, centY);
        ctx.lineTo(centX + x, centY + y);
        ctx.closePath();

        ctx.stroke();

        for (let i = 0; i <= 4; i++) {
            ctx.beginPath();
            for (let j = 0; j < stats.length; j++) {
                let angle = (angle_increment * j) - (Math.PI / 2) + t;
                let k = (i * 32) * scale;
                let x = k * Math.cos(angle);
                let y = k * Math.sin(angle);
                ctx.lineTo(centX + x, centY + y);
            }
            ctx.closePath();
            ctx.stroke();
        }

        let stat_name = stats[i].stat.name;
        let base_stat = stats[i].base_stat;

        ctx.strokeStyle = 'gray';
        ctx.stroke();

        //draw text
        ctx.font = '10px pokemon';
        ctx.fillText(capitalizeFirstLetter(stat_name), centX + x2, centY + y2);
        ctx.fillText(base_stat, centX + x2, centY + y2 + 15);
        ctx.fillStyle = invertedColor;
        ctx.stroke();
    }


    //draw pokemon static lines
    ctx.beginPath(stats.length);

    let i = 0
    stats.forEach(stat => {
        let base_stat = stat.base_stat / 2;
        let angle = (angle_increment * i) - (Math.PI / 2) + t;
        let j = base_stat * scale;
        let x = j * Math.cos(angle);
        let y = j * Math.sin(angle);

        ctx.lineTo(centX + x, centY + y);
        i++;
    });
    ctx.closePath();
    ctx.strokeStyle = invertedColor;
    ctx.stroke();
    ctx.fillStyle = invertedColor;
    ctx.fill();
}

$(window).on('resize', function(){
    drawStats(pokemonStats, drawColor);
    scale = (window.innerHeight + window.innerHeight) / 1280;
});

function render(){
    //t += 0.005;
    window.requestAnimationFrame(render);
    drawStats();
}

window.requestAnimationFrame(render);
