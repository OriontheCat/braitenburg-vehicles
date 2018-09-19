let vehicleEditButtons = [];
let vehicleIndex;

function vehicleEdit() {
    makeEditButtons();
}

function makeEditButtons() {
    vehicles.forEach((vehicle, index) => {
        vehicleEditButtons.push(createButton('edit'));
        vehicleEditButtons[index].mousePressed(() => vehicle.edit());
        vehicleEditButtons[index].position(vehicle.x, vehicle.y);
    });
}

function removeButtons() {
    vehicleEditButtons.forEach(button => {
        button.remove();
    });
    vehicleEditButtons = [];
}

class VehicleEditor {
    constructor(vehicle, x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.vehicle = vehicle;
    }

    draw() {
        this.refresh();
        removeButtons();
        // this.xField = new Field("x", 10, this.vehicle.x);
        // this.yField = new Field("y", 30, this.vehicle.y);
        // this.widthField = new Field("width", 50, this.vehicle.width);
        // this.heightField = new Field("height", 70, this.vehicle.height);
    }

    click() {
        console.log("click")
        this.vehicle.position = createVector(mouseX, mouseY);
        this.refresh();
    }
    refresh() {
        background(220);
        this.vehicle.draw();
        text("p = play/pause", 60, 85);
    }
    remove() {
        this.destroy();
    }
}

class Field {
    constructor(name, y, currentValue) {
        this.name = name;
        console.log(this.name)
        this.y = y;
        this.span = createSpan(name);
        this.span.position(width - 200, this.y);
        this.input = createInput(currentValue.toString(), "number");
        this.input.position(width - 100, this.y);
    }
    remove() {
        this.span.remove();
        this.input.remove();
    }
}