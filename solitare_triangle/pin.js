class Pin {
    constructor(x, y, r) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.empty = false;
        this.active = false;
        this.colorNotEmpty = 50;
        this.colorEmpty = 255;
        this.borderNotActive = 0;
        this.borderActive = color(255, 204, 0);
    }

    show() {
        if (this.active) {
            stroke(this.borderActive);
        } else {
            stroke(this.borderNotActive);
        }
        if (this.empty) {
            fill(this.colorEmpty);
        } else {
            fill(this.colorNotEmpty);
        }
        strokeWeight(5);
        ellipse(this.x, this.y, this.r);
    }

    select() {
        this.active = !this.active;
    }




}