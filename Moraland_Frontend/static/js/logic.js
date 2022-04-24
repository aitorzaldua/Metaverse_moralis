//Step 1:
//Graphics constants
//map management constants
const tiles = 12; //in pixels
const plots = tiles * 9; //in pixels
const roads = tiles * 2; //in pixels
const initialOffsets = plots + roads;
const plotViewOffsets = plots + (2 * roads);


//Step2:
//main canvas and context
const mainCanvas = document.getElementById("mainCanvas");
const mainCtx = mainCanvas.getContext('2d');
const plotCanvas = document.getElementById("plotCanvas");
const plotCtx = plotCanvas.getContext('2d');
const worldImage = new Image();

//Step 5: State
const mapView = {mapOffsetX:-1*initialOffsets, mapOffsetY:-1*initialOffsets};
const plotView = {plotId:"", plotX:0, plotY: 0, locationX:0, locationY: 0}; 

//Step3:
//Draw a canvas to show into the map
function drawCanvas() {
    mainCanvas.width = 3 * plots + 4 * roads;
    mainCanvas.height = 3 * plots + 4 * roads;
    plotCanvas.width = plots;
    plotCanvas.height = plots;
    worldImage.src = 'static/img/Moraland.png';
    worldImage.onload = () => {
        initializeMap()
    }
}

function initializeMap() {
    updatePlotLocation()
    //setPlotData();
    drawMapSection(mainCtx,mapView.mapOffsetX,mapView.mapOffsetY);
    drawCursor(plotViewOffsets,plotViewOffsets);
    drawMapSection(plotCtx, -1 * plotView.locationX, -1 *plotView.locationY);
}

//animate functions
function move(direction) {
    const validMove = validateMove(direction);
    if (validMove) {
        updateView(direction);
        updatePlotLocation();
        drawMapSection(mainCtx,mapView.mapOffsetX,mapView.mapOffsetY);
        drawCursor(plotViewOffsets,plotViewOffsets);
        drawMapSection(plotCtx,-1 * plotView.locationX,-1 *plotView.locationY);
        setPlotData();
    }
}

function validateMove(direction) {
    switch(direction){
        case 'ArrowRight': return !(plotView.plotX == 5);
        case 'ArrowUp': return   !(plotView.plotY == 0);
        case 'ArrowLeft': return !(plotView.plotX == 0);
        case 'ArrowDown': return !(plotView.plotY == 5);
    }
}

//Step 4: Functions to draw dinamically into the map
function drawMapSection(ctx, originX, originY) {
    ctx.drawImage(worldImage, originX, originY);
} 

function drawCursor(x,y) {
    mainCtx.strokeRect(x, y, plots, plots);
}

function updatePlotLocation() {
    plotView.locationX = -1 * mapView.mapOffsetX + plotViewOffsets;
    plotView.locationY = -1 * mapView.mapOffsetY + plotViewOffsets;
}

drawCanvas();
window.addEventListener('keydown', (e) => {
    move(e.key);
})

//Trigger
drawCanvas();
 