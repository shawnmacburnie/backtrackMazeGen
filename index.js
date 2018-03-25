let canvas = document.createElement('canvas');
let ctx = canvas.getContext('2d');
let width = 500;
let height = 500;
let cellSize = 10; // make multiple of width
let cols = width / cellSize;
let rows = height / cellSize;
let maze = new Maze(cols, rows);
let showDebug = true;

canvas.style.background = 'rgb(50,50,50)';
canvas.width = width;
canvas.height = height;
document.body.appendChild(canvas);

requestAnimationFrame(draw);
// setInterval(draw, 1000 / 5);
function draw() {
    if (maze.done) return;
    ctx.clearRect(0, 0, width, height);
    maze.draw(ctx);
    maze.nextLoop();
    if (maze.done) console.log('done');
    requestAnimationFrame(draw);
}