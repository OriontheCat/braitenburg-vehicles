var vehicles = [];
var heatSources = []
let running = true;
// let button;
let pauseorplay = true;

function setup() {
    vehicles.push(new VehicleTwoA(100, 100));
    vehicles.push(new VehicleTwoB(300, 300));
    vehicles.push(new VehicleOne(200, 200, 2));
    vehicles.push(new VehicleTwoA(300, 100));
    vehicles.push(new VehicleTwoB(200, 300));
    vehicles.push(new VehicleOne(100, 200, 3));
    vehicles.push(new VehicleTwoA(500, 100));
    vehicles.push(new VehicleTwoB(600, 300));
    vehicles.push(new VehicleOne(700, 200, 6));
    vehicles.push(new VehicleTwoA(500, 500));
    vehicles.push(new VehicleTwoB(600, 600));
    vehicles.push(new VehicleOne(700, 700, 4));
    vehicles.push(new VehicleTwoC(700, 700, 4));
    vehicles.push(new VehicleTwoC(700, 300, 3));
    vehicles.push(new VehicleTwoC(700, 200, 1));
    vehicles.push(new VehicleTwoC(700, 100, 0));
    // heatSources.push(new Sun(200, 200));
    createCanvas(windowWidth, windowHeight);
    // button = createButton('pause');
    // button.position(85, 65);
    // button.mousePressed(pause);
}

function keyPressed() {
    if (keyCode = 90) {
        pauseorplay ? pause() : play();
    }
}

function pause() {
    running = false;
    // button.html('play')
    // button.mousePressed(play);
    pauseorplay = false;
    vehicleEdit();
}

function play() {

    running = true;
    // button.html('pause')
    pauseorplay = true;
    // button.mousePressed(pause, 85, 65);
    vehicles.forEach(vehicle => {
        vehicle.editing = false;
    });
    removeButtons();
}

function draw() {
    if (!running) return;
    resizeCanvas(windowWidth, windowHeight, true);
    background(220);
    vehicles.forEach(vehicle => {
        vehicle.run();
    });
    text("p = play/pause", 60, 85);
}

function mouseClicked() {
    vehicles.forEach(vehicle => {
        vehicle.click();
    });
}