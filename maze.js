// Maze algorithm using  Recursive backtracker
// https://en.wikipedia.org/wiki/Maze_generation_algorithm#Recursive_backtracker
class Maze {
    constructor(cols, rows) {
        let grid = [];

        for (let col = 0; col < cols; col++) {
            for (let row = 0; row < rows; row++) {
                let cell = new Cell(row, col, cellSize);
                grid.push(cell);
            }
        }
        this.currentCell = grid[0];
        this.currentCell.visited = true;
        this.previousMoves = [];
        this.grid = grid;
        this.cols = cols;
        this.rows = rows;
        this.iteration = 0;
    }

    // dynamic property to tell if maze is done 
    get done() {
        return !this.previousMoves.length && this.iteration > 0;
    }

    // draw all the cells
    draw(ctx) {
        let { grid, currentCell } = this;
        for (var i = 0; i < grid.length; i++) {
            grid[i].draw(ctx);
        }
    }

    //Generate entire maze in one loop
    generate() {
        while(!this.done) {
            this.nextLoop();
        }
    }

    // Each iteration of the backtrack algorithm
    nextLoop() {
        let nextCell = this.currentCell.getNextNeighbors(this.grid);
        this.iteration++;
        if (nextCell) {
            this.previousMoves.push(this.currentCell);
            this.currentCell.removeWall(nextCell);
            this.currentCell = nextCell;
            this.currentCell.visited = true;
        } else if (this.previousMoves.length) {
            //Need to backtrack
            this.currentCell = this.previousMoves.pop();
        }
    }
}