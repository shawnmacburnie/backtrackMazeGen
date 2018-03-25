let canvas = document.createElement('canvas');
let title = document.createElement('h1');
let ctx = canvas.getContext('2d');
let width = 500;
let height = 500;
let cellSize = 10; // make multiple of width and height to fit display
let cols = width / cellSize;
let rows = height / cellSize;
let maze = new Maze(cols, rows);
let showDebug = true;

canvas.style.background = 'rgb(50,50,50)';
canvas.width = width;
canvas.height = height;
title.innerText = 'Animated Maze';
title.style.textAlign = 'center';
document.body.appendChild(title);
document.body.appendChild(canvas);

requestAnimationFrame(draw);
function draw() {
    if (maze.done) return;
    ctx.clearRect(0, 0, width, height);
    maze.draw(ctx);
    maze.currentCell.highlight(ctx);
    maze.nextLoop();
    if (maze.done) console.log('done');
    requestAnimationFrame(draw);
}

// ------------------------- Show maze with no animation -------------------------

let instantMazeCanvas = document.createElement('canvas');
let instantMazeCtx = instantMazeCanvas.getContext('2d');
let instantTitle = document.createElement('h1');
let generateButton = document.createElement('button');

instantMazeCanvas.style.background = 'rgb(50,50,50)';
instantMazeCanvas.width = width;
instantMazeCanvas.height = height;

instantTitle.innerText = 'Instant Maze';
instantTitle.style.textAlign = 'center';

generateButton.innerText = 'Generate';
generateButton.onclick = genereateMaze;
// generateButton.style.width
document.body.appendChild(instantTitle);
document.body.appendChild(instantMazeCanvas);
document.body.appendChild(generateButton);


function genereateMaze() {
    let instantMaze = new Maze(cols, rows);
    instantMaze.generate();
    instantMaze.draw(instantMazeCtx);
}
genereateMaze();