let pin;
let pins;
const rows = 5; //number of rows
let rowsTmp;
let row;
const x = 400;
const y = 50;
const r = 70;
let firstMove;
let hasSelected;
let pinsToDo;
let movesCount = 0;
let winningCondition = 0;

function setup() {
    createCanvas(800, 500);
    resetSketch();
    let button = createButton("reset");
    button.position(19, 19);
    button.mousePressed(resetSketch);
    createA('https://www.youtube.com/watch?v=mRG2k-nOfec&feature=youtu.be', 'Rules of the game');
}

function draw() {
    background(255);
    for (let i=0; i<pins.length; i++) {
        pins[i].show();
    }
    textAlign(LEFT, LEFT);
    strokeWeight(1);
    fill(0);
    textSize(14);
    text(`Moves count\n${movesCount}`, 19, 80);
    if (pinsToDo<=winningCondition) {
        textAlign(CENTER, CENTER);
        fill(color(200, 0, 0));
        strokeWeight(3);
        stroke(0);
        textSize(40);
        text('You are winner!', width/2, height/2);
    }
}

function mouseClicked() {
    for (let i=0; i<pins.length; i++) {
        let pin = pins[i];
        if (Math.abs(mouseX-pin.x)<=pin.r/2 && Math.abs(mouseY-pin.y)<=pin.r/2) {
            if (firstMove) {
                pin.empty = true;
                firstMove = false;
            } else if (!pin.empty || hasSelected>=0) {
                if (!pin.active) {
                    if (hasSelected>=0 && i!=hasSelected) {
                        pins[hasSelected].select();
                        pin.select();
                        let pinsClose = pin.isNeighbor(pins[hasSelected]);
                        if (Math.abs(pinsClose)===2) {
                            let row = (pins[hasSelected].row - pin.row)/2;
                            let idx = (pins[hasSelected].idx - pin.idx)/2;
                            let pinMid = findByRowIdx(pins[hasSelected].row-row, pins[hasSelected].idx-idx);
                            if (pinMid && !pinMid.empty && pin.empty && !pins[hasSelected].empty) {
                                console.log("empty pin", pinMid.row, pinMid.idx);
                                pinMid.empty = true;
                                pin.empty = false;
                                pins[hasSelected].empty = true;
                                pinsToDo -= 1;
                                movesCount += 1;
                            }
                        }
                        hasSelected = i;
                    } else {
                        hasSelected = i;
                        pin.select();
                    }
                } else {
                    pin.select();
                    hasSelected = -1;
                }
        console.log(hasSelected);
                    
            }
        }
    }    
}

function findByRowIdx(row, idx) {
    const pin = pins.filter(pin => pin.row===row && pin.idx===idx);
    if (pin.length>0) {
        return pin[0];
    } else {
        return undefined;
    }
}

function resetSketch() {
    pins = [];
    firstMove = true;
    hasSelected = -1;
    rowsTmp = [];
    movesCount = 0;
    for (let i=0; i<rows; i++) {
        if (i===0) {
            pin = new Pin(x, y, r, 0, 0);
            pins.push(pin);
            rowsTmp.push(pin);
        } else {
            row = [];
            rowsTmp.map((pinTmp, idx) => {
                pin = new Pin(pinTmp.x-r*0.8, pinTmp.y+r*1.2, r, i, idx);
                row.push(pin);
                pins.push(pin);
                if (idx===rowsTmp.length-1) {
                    pin = new Pin(pinTmp.x+r*0.8, pinTmp.y+r*1.2, r, i, idx+1);
                    row.push(pin);
                    pins.push(pin);
                }
            });
            rowsTmp = row;
        }
    }
    console.log(pins.length);
    pinsToDo = pins.length - 1;
}