let pin;
let pins = [];
let n = 3; //number of pins
let rows = 5; //number of rows
let rowsTmp = [];
let row;
let x = 400;
let y = 50;
let r = 80;
let firstMove = true;
let hasSelected = -1;

function setup() {
    // pin = new Pin(50, 50, 80);
    createCanvas(800, 500);
    background(255);
    for (let i=0; i<rows; i++) {
        if (i===0) {
            pin = new Pin(x, y, r);
            pins.push(pin);
            rowsTmp.push(pin);
        } else {
            row = [];
            rowsTmp.map((pinTmp, idx) => {
                pin = new Pin(pinTmp.x-r*0.8, pinTmp.y+r*1.2, r);
                row.push(pin);
                pins.push(pin);
                if (idx===rowsTmp.length-1) {
                    pin = new Pin(pinTmp.x+r*0.8, pinTmp.y+r*1.2, r);
                    row.push(pin);
                    pins.push(pin);
                }
            });
            rowsTmp = row;
        }
    }
    console.log(pins.length);
}

function draw() {
    for (let i=0; i<pins.length; i++) {
        pins[i].show();
    }
}

function mouseClicked() {
    for (let i=0; i<pins.length; i++) {
        let pin = pins[i];
        if (Math.abs(mouseX-pin.x)<=pin.r/2 && Math.abs(mouseY-pin.y)<=pin.r/2) {
            if (firstMove) {
                pin.empty = true;
                firstMove = false;
            } else {
                if (!pin.active) {
                    hasSelected = i;
                    pin.select();
                } else {
                    if (i===hasSelected) {
                        hasSelected = -1;
                        pin.select();
                    } else {
                        pins[Math.abs(i-hasSelected)].empty = true;
                        pins[hasSelected].select();
                        hasSelected = -1;
                    }
                }
        console.log(hasSelected);
                    
            }
        }
    }    
}