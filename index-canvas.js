//TODO: make all cubes 1 cube or make them all rotate around a single point instead of their own center
// making it into 1 cube might be more efficient to run but takes more time
//will figure this out later, low priority.




/*
//initialize canvas
let canvas = document.querySelector('.pokemon-wrapper canvas');
let context = canvas.getContext('2d');
canvas.width = window.innerHeight / 2;
canvas.height = canvas.width;

//canvas centers
let centX = canvas.width / 2;
let centY = canvas.height / 2;
const Point2D = function (x, y) { this.x = x; this.y = y; };

const Point3D = function (x, y, z) { this.x = x; this.y = y; this.z = z; };

const Cube = function (x, y, z, size) {

    Point3D.call(this, x, y, z);

    size *= 0.5;

    this.vertices = [new Point3D(x - size, y - size, z - size),
    new Point3D(x + size, y - size, z - size),
    new Point3D(x + size, y + size, z - size),
    new Point3D(x - size, y + size, z - size),
    new Point3D(x - size, y - size, z + size),
    new Point3D(x + size, y - size, z + size),
    new Point3D(x + size, y + size, z + size),
    new Point3D(x - size, y + size, z + size)];

    this.faces = [[0, 1, 2, 3], [0, 4, 5, 1], [1, 5, 6, 2], [3, 2, 6, 7], [0, 3, 7, 4], [4, 7, 6, 5]];

};

Cube.prototype = {

    rotateX: function (radian) {

        var cosine = Math.cos(radian);
        var sine = Math.sin(radian);

        for (let index = this.vertices.length - 1; index > -1; --index) {

            let p = this.vertices[index];
            //console.log(this.x + " " + this.y + " " + this.z);
            //console.log(this.x);
            //$('#button-back').html(this.x + " || " + this.y + " || " + this.z);
            //$('#button-back').html(p.x + " || " + p.y + " || " + p.z);
            let y = (p.y - this.y) * cosine - (p.z - this.z) * sine;
            let z = (p.y - this.y) * sine + (p.z - this.z) * cosine;

            p.y = y + this.y;
            p.z = z + this.z;

        }

    },

    rotateY: function (radian) {

        var cosine = Math.cos(radian);
        var sine = Math.sin(radian);

        for (let index = this.vertices.length - 1; index > -1; --index) {

            let p = this.vertices[index];

            let x = p.z * sine;// (p.z - this.z) * sine + (p.x - this.x) * cosine;
            let z = p.z * cosine;// (p.z - this.z) * cosine - (p.x - this.x) * sine;

            p.x = x + this.x;
            p.z = z + this.z;

        }
    }
};

let cubeList = [];

for (let i = 0; i < 4; ++i) {
    for (let j = 0; j < 4; ++j) {
        for (let k = 0; k < 4; ++k) {
            var pointer = new Point2D(0, 0);
            let scale = 4;
            var cube = new Cube(i * scale, j * scale, 20 + k * scale, scale);
            cubeList.push(cube);
        }
    }
}
var height = document.documentElement.clientHeight;
var width = document.documentElement.clientWidth;

function project(points3d, width, height) {

    var points2d = new Array(points3d.length);

    var focal_length = 500;

    for (let index = points3d.length - 1; index > -1; --index) {

        let p = points3d[index];

        let x = p.x * (focal_length / p.z) + width * 0.5;
        let y = p.y * (focal_length / p.z) + height * 0.5;

        points2d[index] = new Point2D(x, y);

    }
    return points2d;
}

function loop() {

    window.requestAnimationFrame(loop);

    context.clearRect(0, 0, canvas.width, canvas.height); //clear html5 canvas

    context.strokeStyle = "#ffffff";

    cubeList.forEach(function(cube, i){
        cube.rotateX(pointer.y * 0.0001);
        cube.rotateY(-pointer.x * 0.0001);
        
        context.fillStyle = "#0080f0";
        
        var vertices = project(cube.vertices, centX, centY);
        
        for (let index = cube.faces.length - 1; index > -1; --index) {
            
            let face = cube.faces[index];
            
            context.beginPath();
            context.moveTo(vertices[face[0]].x, vertices[face[0]].y);
            context.lineTo(vertices[face[1]].x, vertices[face[1]].y);
            context.lineTo(vertices[face[2]].x, vertices[face[2]].y);
            context.lineTo(vertices[face[3]].x, vertices[face[3]].y);
            context.closePath();
            context.stroke();
        }
    });
}

loop();
pointer.x -= 100;
pointer.y -= 100;

window.addEventListener("click", (event) => {
});

$(window).on('resize', function () {
    scale = (window.innerHeight + window.innerHeight) / 1280;
}); */