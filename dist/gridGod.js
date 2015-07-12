var canvas = document.getElementById("canvasView");
var cContext = canvas.getContext("2d");

var gridWidth = 200;
var gridHeight = gridWidth*0.6;

var canvasWidth = 1200;
var canvasHeight = canvasWidth*0.6;

var tileWidth = canvasWidth/gridWidth;
var tileHeight = canvasHeight/gridHeight;

canvas.width = canvasWidth;
canvas.height = canvasHeight;

ALIVE = 'o';
DEAD = 'x';

gridGrid = function() {
    if(gridWidth > 300) {
        alert("you set the grid width to something stupid, stop freezing the browser");
        return;
    }

    makeArray = function(width, height) {
        var arr = [];
        for(var x = 0; x < width; x++) {
            arr[x] = new Array(width);

            for(var y = 0; y < height; y++ ) {
                arr[x][y] = "";
            }
        }

        return arr;
    }

    var gridArray = makeArray(gridWidth, gridHeight);
    draw = function() {
        console.log("Just doing a draw");

        canvas.width = canvasWidth;
        canvas.height = canvasHeight;

        for(var x = 0; x < gridWidth; x++) {
            cContext.moveTo(x*tileWidth, 0);
            cContext.lineTo(x*tileWidth, canvasHeight);
        }

        for(var y = 0; y < gridHeight; y++) {
            cContext.moveTo(0, y*tileHeight);
            cContext.lineTo(canvasWidth, y*tileHeight);
        }

        cContext.strokeStyle= "#hhh";
        cContext.stroke();

        var padding = tileWidth*0.15;

        cContext.fillStyle = "#CCCC00";
        for(var x = 0; x < gridWidth; x++) {
            for(var y = 0; y < gridHeight; y++) {
                //let, top, width, height
                if(gridArray[x][y] == ALIVE) {
                    cContext.fillRect((tileWidth*x) + padding/2, (tileHeight*y) + padding/2, tileWidth - padding, tileHeight - padding);
                }
            }
        }
    }

    index = 0;


    initGrid = function() {
        for(var x = 0; x < gridWidth; x++) {
            for(var y = 0; y < gridHeight; y++) {
                gridArray[x][y] = DEAD;
            }
        }
    }

    giveLife = function() {

        // var x = Math.floor(Math.random() * gridWidth-1);
        // var y = Math.floor(Math.random() * gridHeight-1);
        //
        // console.log("Starting new life at: " + x +','+y);
        //
        gridArray[25][25] = ALIVE;
        gridArray[25][26] = ALIVE;
        gridArray[25][24] = ALIVE;
        gridArray[24][25] = ALIVE;
        gridArray[26][26] = ALIVE;
    }

    lifeStep = function() {

        deepClone = function(grid) {
            var clone = makeArray(grid.length, grid[0].length);

            for(var x = 0; x < gridWidth; x++) {
                 for(var y = 0; y < gridHeight; y++) {
                    if(grid[x][y] == ALIVE) {
                         clone[x][y] = ALIVE.slice();
                     } else {
                         clone[x][y] = DEAD.slice();
                     }
                 }
            }

            return clone;
        }

        alive = function (neighbours) {
            return neighbours.filter(function(item) {
                return item == ALIVE;
            });
        }

        getNeighbours = function(grid, x, y) {
            var neighbours = [];

            //Maybe give grid a empty buffer? naaaaw
            if(x > 0) {
                neighbours.push(grid[x-1][y]);

                if(y > 0) {
                    neighbours.push(grid[x-1][y-1]);
                }

                if(y < gridHeight-1) {
                    neighbours.push(grid[x-1][y+1]);
                }
            }

            if(x < gridWidth-1) {

                if(y > 0) {
                    neighbours.push(grid[x+1][y-1]);
                }

                neighbours.push(grid[x+1][y]);

                if(y < gridHeight) {
                    neighbours.push(grid[x+1][y+1]);
                }
            }
            if(y > 0) {
                neighbours.push(grid[x][y-1]);
            }

            if(y < gridHeight) {
                neighbours.push(grid[x][y+1]);
            }
            return neighbours;
        }

        var beforeArray = deepClone(gridArray);

        for(var x = 0; x < gridWidth; x++) {
            for(var y = 0; y < gridHeight; y++) {

                var aliveNeighbours = alive(getNeighbours(beforeArray, x, y));

                if(beforeArray[x][y] == DEAD && aliveNeighbours.length == 3) {
                    //Got 3 aliveNeighbours? BORN
                    gridArray[x][y] = ALIVE;
                    console.log("LIVE");
                } else {
                    if(beforeArray[x][y] == ALIVE) {
                        //Got 2 or 3 aliveNeighbours?
                        if(aliveNeighbours.length == 2 || aliveNeighbours.length == 3) {
                            //SURVIVE
                        } else {
                            //YOU DIE NOW
                            gridArray[x][y] = DEAD;
                            console.log("DEATH");
                        }
                    }
                }
            }
        }
    }

    initGrid();
    giveLife();
    draw();
    window.setInterval(function() {
        lifeStep();
        draw();
    }, 50);
}

gridGrid();
