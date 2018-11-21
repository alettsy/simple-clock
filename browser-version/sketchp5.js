let linesConstant = 0.21333335;
let handOffset = 0;

function setup(){
    createCanvas(750, 750);
    angleMode(DEGREES);
    linesConstant *= height;
	
	// can add to div: canvas.parent('ID-OF-ELEMENT');
}

function draw(){
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
    let length = height - 50;

    // the hour lines
    push();
    rotate(-45);
    for (let i = 0; i < 12; i++) {
        line(height / 2 - linesConstant, height / 2 - linesConstant, height / 2 - linesConstant - 20, height / 2 - linesConstant - 20); // height / 2 - 160
        rotate(30);
    }
    pop();

    // the minute lines
    push();
    rotate(-45);
    strokeWeight(4);
    for (let i = 0; i < 48; i++) {
        line(height / 2 - linesConstant, height / 2 - linesConstant, height / 2 - linesConstant - 7, height / 2 - linesConstant - 7);
        rotate(6);
        line(height / 2 - linesConstant, height / 2 - linesConstant, height / 2 - linesConstant - 7, height / 2 - linesConstant - 7);
        rotate(6);
        line(height / 2 - linesConstant, height / 2 - linesConstant, height / 2 - linesConstant - 7, height / 2 - linesConstant - 7);
        rotate(6);
        line(height / 2 - linesConstant, height / 2 - linesConstant, height / 2 - linesConstant - 7, height / 2 - linesConstant - 7);
        rotate(6);
    }
    pop();

    // seconds
    strokeWeight(8);
    stroke(218, 19, 221);
    arc(0, 0, length, length, 0, seconds, OPEN);

    push();
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
