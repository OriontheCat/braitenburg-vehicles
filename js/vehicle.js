class VehicleTwoA {
    constructor(x, y, rotation, imageURL, width, height, rotationLimit, temperature) {
        this.x = x || windowWidth / 2;
        this.y = y || windowHeight / 2;
        this.position = createVector(x, y);
        this.leftMotor = new Motor(this, createVector(-15, 0), "red");
        this.rightMotor = new Motor(this, createVector(15, 0), "blue");
        this.rotation = rotation || 1.5 * Math.PI;
        this.imageURL = imageURL || "assets/images/vehicle.jpg";
        this.image = loadImage(this.imageURL);
        this.width = width || 40;
        this.height = height || 20;
        this.size = createVector(40, 20);
        // this.magnitude = 1000;
        this.rotationLimit = rotationLimit || 0.05;
        this.temperature = temperature || 10;
        this.editing = false;
    }

    // get rotationLimit() {
    //     var mousePosition = createVector(mouseX, mouseY);
    //     return this.magnitude * 2 / mousePosition.magSq();
    // }

    click() {
        if (this.editing) {
            this.vehicleEditor.click();
        }
    }
    drawArrow(base, vec, myColor) {
        push();
        stroke(myColor);
        strokeWeight(3);
        fill(myColor);
        translate(base.x, base.y);
        line(0, 0, vec.x, vec.y);
        rotate(vec.heading());
        var arrowSize = 7;
        translate(vec.mag() - arrowSize, 0);
        triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
        pop();
    }

    sense() {
        return lerp(this.leftMotor.thrust, this.rightMotor.thrust, 0.5);
    }

    decide() {
        var thrust = this.sense();
        var movement = p5.Vector.fromAngle(this.rotation)
        movement.setMag(thrust);
        if (this.rightMotor.thrust - this.leftMotor.thrust > this.rotationLimit) {
            movement.rotate(this.rotationLimit);
        } else if (this.rightMotor.thrust - this.leftMotor.thrust < -this.rotationLimit) {
            movement.rotate(-this.rotationLimit);
        } else {
            movement.rotate(this.rightMotor.thrust - this.leftMotor.thrust);
        }
        this.rotation = movement.heading();
        return movement;
    }

    stayInBounds() {
        if (this.position.x >= width) {
            this.position.x = 1;
        }

        if (this.position.x <= 0) {
            this.position.x = width - 1;
        }
        if (this.position.y >= height) {
            this.position.y = 1;
        }

        if (this.position.y <= 0) {
            this.position.y = height - 1;
        }
    }

    act() {
        var movement = this.decide();
        this.position.add(movement);
        this.stayInBounds();
        this.x = this.position.x - (this.size.x / 2);
        this.y = this.position.y - (this.size.y / 2);
        this.leftMotor.position.set(this.position.copy().add(p5.Vector.fromAngle(this.rotation - HALF_PI).setMag(15)));
        this.rightMotor.position.set(this.position.copy().add(p5.Vector.fromAngle(this.rotation + HALF_PI).setMag(15)));
    }

    draw() {
        push();
        translate(this.position.x, this.position.y)
        rotate(this.rotation);
        image(this.image, -this.size.x / 2, -this.size.y / 2, this.size.x, this.size.y);
        // this.drawArrow(this.position.copy().setMag(this.position.mag() - 10), this.position.copy().setMag(this.position.mag() + 10), "black")
        pop();
        this.leftMotor.position.set(this.position.copy().add(p5.Vector.fromAngle(this.rotation - HALF_PI).setMag(15)));
        this.rightMotor.position.set(this.position.copy().add(p5.Vector.fromAngle(this.rotation + HALF_PI).setMag(15)));
        this.leftMotor.draw();
        this.rightMotor.draw();
    }

    run() {
        this.act();
        this.draw();
    }

    edit() {
        this.editing = true;
        this.vehicleEditor = new VehicleEditor(this, this.x, this.y, this.width, this.height);
        this.vehicleEditor.draw();
    }
}

class VehicleTwoB extends VehicleTwoA {
    constructor(x, y) {
        super(x, y);
    }
    decide() {
        var thrust = this.sense();
        var movement = p5.Vector.fromAngle(this.rotation)
        movement.setMag(thrust);
        if (this.leftMotor.thrust - this.rightMotor.thrust > this.rotationLimit) {
            movement.rotate(this.rotationLimit);
        } else if (this.leftMotor.thrust - this.rightMotor.thrust < -this.rotationLimit) {
            movement.rotate(-this.rotationLimit);
        } else {
            movement.rotate(this.leftMotor.thrust - this.rightMotor.thrust);
        }
        this.rotation = movement.heading();
        return movement;
    }
}

class VehicleOne extends VehicleTwoA {
    constructor(x, y, rotation) {
        super(x, y)
        this.motor = new Motor(this, createVector(0, 0), "red");
        this.rotation = rotation;
    }

    sense() {
        return this.motor.thrust;
    }

    decide() {
        var thrust = this.sense();
        var movement = p5.Vector.fromAngle(this.rotation).setMag(thrust);
        return movement;
    }

    act() {
        var movement = this.decide();
        this.position.add(movement);
        this.x = this.position.x - (this.size.x / 2);
        this.y = this.position.y - (this.size.y / 2);
        this.stayInBounds();
        this.motor.position.set(this.position.copy().add(p5.Vector.fromAngle(this.rotation - HALF_PI).setMag(0)));
    }
    draw() {
        push();
        translate(this.position.x, this.position.y)
        rotate(this.rotation);
        image(this.image, -this.size.x / 2, -this.size.y / 2, this.size.x, this.size.y);
        // this.drawArrow(this.position.copy().setMag(this.position.mag() - 10), this.position.copy().setMag(this.position.mag() + 10), "black")
        pop();
        this.motor.position.set(this.position.copy().add(p5.Vector.fromAngle(this.rotation - HALF_PI).setMag(0)));
        this.motor.draw();
    }

}