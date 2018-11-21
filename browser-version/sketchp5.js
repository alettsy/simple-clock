//let linesConstant = 0.21333335;
let handOffset = 0;
let test = 0;
let length = 0;

function setup() {
    createCanvas(750, 750);
    //createCanvas(500, 500);
    angleMode(DEGREES);
    //linesConstant *= height;

    // can add to div: canvas.parent('ID-OF-ELEMENT');

    test = height * 0.26666666666;
}

function draw() {
    background(25, 25, 25);
    translate(height / 2, width / 2);
    rotate(-90);

    // getting time
    let hours = hour();
    let minutes = minute();
    let seconds = second();

    // mapping time
    hours = map(hours % 12, 0, 12, 0, 360);
    minutes = map(minutes, 0, 60, 0, 360);
    seconds = map(seconds, 0, 60, 0, 360);

    noFill();
    strokeWeight(8);
    stroke(255);
    length = height - 50;

    // hour lines
    push();
    for (let i = 0; i < 12; i++) {
        line((length - 50) / 2 - 46, 0, (length - 50) / 2 - 16, 0);
        rotate(30);
    }
    pop();

    // minute lines
    push();
    strokeWeight(4);
    for (let i = 0; i < 48; i++) {
        if (i % 4 == 0 && i != 0) {
            rotate(6);
        }
        rotate(6);
        line((length - 50) / 2 - 26, 0, (length - 50) / 2 - 16, 0);
    }
    pop();

    // seconds
    strokeWeight(8);
    stroke(218, 19, 221);
    arc(0, 0, length, length, 0, seconds, OPEN);

    push();
    strokeWeight(4);
    rotate(seconds);
    line(0, 0, length / 3, 0);
    pop();

    // minutes
    stroke(32, 111, 229);
    arc(0, 0, length - 25, length - 25, 0, minutes, OPEN);

    push();
    rotate(minutes);
    line(0, 0, length / 4, 0);
    pop();

    if (minute() == 0) handOffset = 0;
    else {
        handOffset = minute() / 60;
        handOffset = 30 * handOffset;
    }

    // hour
    stroke(229, 160, 32);
    arc(0, 0, length - 50, length - 50, 0, hours + handOffset, OPEN);

    push();
    rotate(hours + handOffset);
    line(0, 0, length / 5, 0);
    pop();

    // center point
    stroke(255);
    point(0, 0);
}