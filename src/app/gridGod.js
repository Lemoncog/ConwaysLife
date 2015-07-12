var canvas = document.getElementById("canvasView");
var cContext = canvas.getContext("2d");

var gridWidth = 00;
var gridHeight = gridWidth;

var canvasWidth = 500;
var canvasHeight = canvasWidth;

var tileWidth = canvasWidth/gridWidth;
var tileHeight = canvasHeight/gridHeight;

canvas.width = canvasWidth;
canvas.height = canvasHeight;

makeArray = function(width, height) {
    var arr = [];
    for(var x = 0; x < width; x++) {
        arr[x] = new Array(width);

        for(var y = 0; y < height; y++ ) {
            arr[x][y] = new Array(height);
        }
    }

    return arr;
}

var gridArray = makeArray(gridWidth, gridHeight);
draw = function() {
    console.log("Just doing a draw");

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

    for(var x = 0; x < gridWidth; x++) {
        for(var y = 0; y < gridHeight; y++) {
            //let, top, width, height
            cContext.fillRect((tileWidth*x) + padding/2, (tileHeight*y) + padding/2, tileWidth - padding, tileHeight - padding);
        }
    }
}

for(var x = 0; x < gridWidth; x++) {
    for(var y = 0; y < gridHeight; y++) {
        gridArray[x][y] = "x";
    }
}

draw();
