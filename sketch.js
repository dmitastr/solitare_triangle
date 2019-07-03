let pin;
let pins;
let rows = 5; //number of rows
let rowsTmp;
let row;
const x = 400;
const y = 50;
let r;
let firstMove;
let hasSelected;
let pinsToDo;
let movesCount = 0;
let winningCondition = 1;
let movesHistory;
let input, buttonInput;
let button;
let undo;
let cheat = 0;

function setup() {
    let canvas = createCanvas(700, 500);
    canvas.parent('game_div');
    my_button = createButton("reset");
    my_button.position(19, 19);
    my_button.parent('game_div');
    my_button.mousePressed(resetSketch);
    undo = createButton("undo");
    undo.position(19, 50);
    undo.parent('game_div');
    undo.mousePressed(undoMove);
    input = createInput(5, "int");
    input.position(19, 100);
    input.size(25, 16);
    input.parent('game_div');
    buttonInput = createButton('submit');
    buttonInput.position(input.x + input.width, input.y);
    buttonInput.parent('game_div');
    buttonInput.mousePressed(resetSketch);
    my_link = createA('https://www.youtube.com/watch?v=mRG2k-nOfec&feature=youtu.be', 'Rules of the game');
    my_link.position(600, 14)
    my_link.parent('game_div');
    my_link_2 = createA('https://github.com/dmitastr/solitare_triangle', 'Docs & License');
    my_link_2.position(600, 34)
    my_link_2.parent('game_div');
    resetSketch();
}

function draw() {
    background(255);
    textSize(14);
    strokeWeight(0);
    stroke(0);
    fill(0);
    text('enter number of rows', 19, 90);
    for (let i=0; i<pins.length; i++) {
        pins[i].show();
    }
    textAlign(LEFT, LEFT);
    strokeWeight(0);
    fill(0);
    stroke(0);
    textSize(14);
    text(`Moves count\n${movesHistory.length}`, 19, 150);
    if (pinsToDo<=winningCondition) {
        textAlign(CENTER, CENTER);
        fill(color(200, 0, 0));
        strokeWeight(3);
        stroke(0);
        textSize(40);
        text('You are winner!', width/2+50, height/2);
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
                            let rowMid = pins[hasSelected].row-row;
                            let idxMid = pins[hasSelected].idx-idx;
                            let pinMid = findByRowIdx(rowMid, idxMid);
                            if (pinMid && !pinMid.empty && pin.empty && !pins[hasSelected].empty) {
                                pinMid.empty = true;
                                pin.empty = false;
                                pins[hasSelected].empty = true;
                                pinsToDo -= 1;
                                movesHistory.push({pinA: pin, pinB: pinMid, pinC: pins[hasSelected]});
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
                    cheat += 1;
                    if (cheat>=15) {
                        pinsToDo = 1;
                        pins[0].empty = false;
                        for (let i=1; i<pins.length; i++) {
                            pins[i].empty = true;
                        }

                    }
                }                   
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
    rows = int(input.value()) || 5;
    r = min(80*5/rows, 70);
    movesHistory = [];
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
    pinsToDo = pins.length - 1;
}

function undoMove() {
    if (movesHistory.length>0) {
        let move = movesHistory.pop();
        move.pinA.empty = true;
        move.pinB.empty = false;
        move.pinC.empty = false;
        pinsToDo += 1;

    }
}
