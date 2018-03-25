class Cell {
    constructor(col, row, size) {
        this.size = size;
        this.col = col;
        this.row = row;
        this.walls = {
            top: true,
            left: true,
            right: true,
            bottom: true
        };
        this.visited = false;
    }
    static getIndex(col, row) {
        if (col < 0 || row < 0 || col >= cols || row >= rows) {
            return -1;
        }
        return col + row * cols;
    }

    removeWall(neighbor) {
        let x = this.col - neighbor.col;
        let y = this.row - neighbor.row;
        if (x == 1) {
            this.walls.left = false;
            neighbor.walls.right = false;
        } else if (x == -1) {
            this.walls.right = false;
            neighbor.walls.left = false;
        } else if (y == 1) {
            this.walls.top = false;
            neighbor.walls.bottom = false;
        } else if (y == -1) {
            this.walls.bottom = false;
            neighbor.walls.top = false;
        }
    }
    highlight(ctx) {
        let { col, row, size, walls } = this;
        let x = col * size;
        let y = row * size;
        let padding = 5;
        ctx.beginPath();
        ctx.fillStyle = 'rgba(0,0,255, 0.5)';
        ctx.rect(x + padding, y + padding, size - padding * 2, size - padding * 2);
        ctx.fill();

    }

    checkNeighbors(grid) {
        let { row, col } = this;
        let neighbors = [];

        let top = grid[Cell.getIndex(col, row - 1)];
        let right = grid[Cell.getIndex(col + 1, row)];
        let bottom = grid[Cell.getIndex(col, row + 1)];
        let left = grid[Cell.getIndex(col - 1, row)];

        if (top && !top.visited) neighbors.push(top);
        if (right && !right.visited) neighbors.push(right);
        if (bottom && !bottom.visited) neighbors.push(bottom);
        if (left && !left.visited) neighbors.push(left);
        if (neighbors.length) {
            let pick = Math.floor(Math.random() * neighbors.length);
            return neighbors[pick];
        }
    }


    draw(ctx) {
        let { col, row, size, walls } = this;
        let x = col * size;
        let y = row * size;

        ctx.strokeStyle = 'white';
        ctx.beginPath();
        if (walls.top) {
            ctx.moveTo(x, y);
            ctx.lineTo(x + size, y);
        }
        if (walls.right) {
            ctx.moveTo(x + size, y);
            ctx.lineTo(x + size, y + size);
        }
        if (walls.bottom) {
            ctx.moveTo(x + size, y + size);
            ctx.lineTo(x, y + size);
        }
        if (walls.left) {
            ctx.moveTo(x, y + size);
            ctx.lineTo(x, y);
        }
        ctx.stroke();
        if (showDebug && this.visited) {
            ctx.beginPath();
            ctx.fillStyle = 'rgb(100,100,100)';
            ctx.rect(x, y, size, size);
            ctx.fill();
        }
    }
}