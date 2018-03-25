class Maze {
    constructor(cols, rows, type = 'backtrack') {
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
        this.type = type;
        this.grid = grid;
        this.cols = cols;
        this.rows = rows;
        this.iteration = 0;
    }

    get done() {
        return !this.previousMoves.length && this.iteration > 0;
    }

    draw(ctx) {
        let { grid, currentCell } = this;
        for (var i = 0; i < grid.length; i++) {
            grid[i].draw(ctx);
        }
        if (showDebug) currentCell.highlight(ctx);
    }
    generate() {
        while(!this.done) {
            this.nextLoop();
        }
    }
    nextLoopBackTract() {
        let nextCell = this.currentCell.checkNeighbors(this.grid);
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

    nextLoop() {
        if (this.type == 'backtrack') this.nextLoopBackTract();
    }
}