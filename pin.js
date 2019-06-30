class Pin {
    constructor(x, y, r, row, idx) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.empty = false;
        this.active = false;
        this.colorNotEmpty = 50;
        this.colorEmpty = 255;
        this.borderNotActive = 0;
        this.borderActive = color(255, 204, 0);
        this.row = row;
        this.idx = idx;
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

    isNeighbor(other) {
        if (this.row===other.row) {
            if (Math.abs(this.idx - other.idx)<=2) {
                return this.idx - other.idx;
            } else {
                return 0;
            }
        } else {
            if (Math.abs(this.row-other.row)<=2 && ((this.idx===other.idx) || (this.idx-other.idx)===(this.row-other.row))) {
                return this.row-other.row;
            } else {
                return 0;
            }
        }

    }




}