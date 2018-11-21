let handOffset = 0;
let length = 0;
let analog = true;
let hours = 0;
let minutes = 0;
let seconds = 0;

function setup() {
    let mainCanvas = createCanvas(windowWidth, windowHeight);
    angleMode(DEGREES);

    mainCanvas.parent('clock-div');
    analog = true;
}

function draw() {
    background(25, 25, 25);
    //translate(height / 2, width / 2);
    translate(windowWidth / 2, windowHeight / 2);
    rotate(-90);

    // getting time
    let hours = hour();
    let minutes = minute();
    let seconds = second();

    noFill();
    strokeWeight(8);
    stroke(255);
    length = height - 50;

    if (analog) {
        // mapping time
        hours = map(hours % 12, 0, 12, 0, 360);
        minutes = map(minutes, 0, 60, 0, 360);
        seconds = map(seconds, 0, 60, 0, 360);

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
    } else if (analog === false) {
        // pad time with zeros if single digits
        hours = pad(hours, 2);
        minutes = pad(minutes, 2);
        seconds = pad(seconds, 2);

        // create strings to change style
        var hourString = "<span id=\"hours\">" + hours + "</span>";
        var minuteString = "<span id=\"minutes\">" + minutes + "</span>";
        var secondsString = "<span id=\"seconds\">" + seconds + "</span>";

        // put the time in the div
        document.getElementById('digital-div').innerHTML = hourString + "" + minuteString + "" + secondsString;
    }
}

function changeStyle() {
    console.log("Changing style of clock");

    if (analog === false) {
        document.getElementById('clock-div').style.display = 'inline-block';
        document.getElementById('digital-div').style.display = 'none';
    } else {
        document.getElementById('digital-div').style.display = 'inline-block';
        document.getElementById('clock-div').style.display = 'none';
    }
    analog = (analog) ? false : true;
}

function pad(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

window.onclick = function () {
    changeStyle();
}