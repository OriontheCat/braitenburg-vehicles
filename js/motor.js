class Motor {
    constructor(vehicle, relativePosition, color) {
        this.vehicle = vehicle;
        this.position = this.vehicle.position.copy().add(relativePosition);
        this.relativePosition = relativePosition;
        this.magnitude = 1000;
        this.color = color;
    }

    draw() {
        push();
        fill(this.color);
        ellipse(this.position.x, this.position.y, 3, 3)
        pop();
    }
    get thrust() {
        var mousePosition = createVector(mouseX, mouseY);
        var movement = mousePosition.sub(this.position);
        // var amt = 1;
        // vehicles.forEach((vehicle, index) => {
        //     console.log(movement);
        //     amt = vehicle.position.copy().sub(this.position).mult(vehicle.temperature).sub(movement.copy().mult(amt)).mag();
        //     movement = lerp(movement, vehicle.position.sub(this.position), amt);
        // });
        movement.limit(this.magnitude * 2 / mousePosition.magSq());
        return movement.mag();
    }
}