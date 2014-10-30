/* @pjs preload="images/2.jpg"; */ 
/* @pjs preload="images/lander.svg"; */ 
/* @pjs preload="images/lander_down.svg"; */ 
/* @pjs preload="images/lander_left.svg"; */ 
/* @pjs preload="images/lander_right.svg"; */ 

interface JavaScript {
    void playSound0();
    void playSound1();
}

void bindJavascript(Javascript js) {
    javascript = js;
}

JavaScript javascript;

boolean toggleLoop;

float ground = 517;
float fuel = 100;
float craft_X = 360;
float craft_Y = 5;

float speed_X = 0;
float speed_Y = 0;

float thrust_X = 0.01;
float thrust_Y = 0.105;

float gravity = 0.01;

PShape lander;
PImage bg;

String c = "Click to play";
String p;

float r = random(0, 700);

float pre = r / 6;
float post = (800 - (r + 100)) / 6;

float t1 = random(540, 575);
float t2 = random(540, 575);
float t3 = random(540, 575);
float t4 = random(540, 575);
float t5 = random(540, 575);
float t6 = random(540, 575);

void setup() {
    size(800, 600);
    lander = loadShape("images/lander.svg");
    bg = loadImage("images/2.jpg");
    noCursor();
    noStroke();
    smooth();
    noLoop();
    textSize(14);
}

void draw() {
    background(bg);
    
    fill(175, 105, 25);
    triangle(0, 580, pre, t1, 2 * pre, 580);
    triangle(2 * pre, 580, 3 * pre, t2, 4 * pre, 580);
    triangle(4 * pre, 580, 5 * pre, t3, r, 580);

    triangle(r + 100, 580, r + 100 + post, t4, r + 100 + 2 * post, 580);
    triangle(r + 100 + 2 * post, 580, r + 100 + 3 * post, t5, r + 100 + 4 * post, 580);
    triangle(r + 100 + 4 * post, 580, r + 100 + 5 * post, t6, 800, 580);

    rect(r, 580, 100, 20);
    rect(0, 580, 800, 20);
    
    shape(lander, craft_X, craft_Y, 80, 80);
    
    fill(255, 255, 255);
    
    text(c, 360, 200);
    text(p, 375, 200);
    
    text("\"H\" throttle", 720, 20);
    text("\"K\" left", 720, 38);
    text("\"L\" right", 720, 56);
    text("\"R\" restart", 720, 74);
    
    
    text("Velocity:", 10, 20);
    String vv = nf(speed_Y, 1, 2);
    text(vv, 80, 20);

    text("Destance:", 10, 38);
    float dd = ground - craft_Y;
    String ddd = nf(dd, 1, -1);
    text(ddd, 80, 38);

    text("Fuel:", 10, 56);
    String ff = nf(fuel, 1, -1);
    text(ff, 80, 56);

    if (craft_Y < ground) {
        thrust_Y = 0.105;
        craft_Y += speed_Y;
        speed_Y = speed_Y + gravity;
        craft_X += speed_X;
        speed_X = speed_X;
    }

    if (fuel <= 0) {
        textSize(20);
        text("Ran out of fuel!!", 340, 130);
        textSize(12);
        thrust_Y = 0;
        if (craft_Y < ground) {
            speed_Y = speed_Y + gravity;
        } else {
            speed_Y = speed_Y;
        }
    }

    if (craft_Y >= ground) {
        if (speed_Y <= 0.5 && craft_X >= (r - 20) && craft_X <= (r + 120)) {
            if(javascript != null) {
                javascript.playSound0();
            }
            noLoop();
            textSize(20);
            text("Safe Landing", 345, 100);
            textSize(12);
        } else {
            if(javascript != null) {
                javascript.playSound1();
            }
            noLoop();
            textSize(20);
            text("Crash!!!", 365, 100);
            textSize(12);
        }
    }
}

void keyPressed() {
    if (key == 'h' && fuel > 0 && craft_Y < ground) {
        speed_Y = speed_Y - thrust_Y;
        fuel = fuel - 0.75;
        lander = loadShape("images/lander_down.svg");
    }

    if (key == 'k' && fuel > 0 && craft_Y < ground) {
        speed_X = speed_X + thrust_X;
        fuel = fuel - 0.1;
        lander = loadShape("images/lander_left.svg");
    }

    if (key == 'l' && fuel > 0 && craft_Y < ground) {
        speed_X = speed_X - thrust_X;
        fuel = fuel - 0.1;
        lander = loadShape("images/lander_right.svg");
    }

    if (key == 'r') {
        fuel = 100;
        craft_X = 360;
        craft_Y = 5;
        speed_X = 0;
        speed_Y = 0;
        randomize();
        redraw();
        toggleLoop = false;
        mousePressed();
    }
}

void keyReleased() {
    lander = loadShape("images/lander.svg");
}

void randomize() {
    r = random(0, 700);

    pre = r / 6;
    post = (800 - (r + 100)) / 6;

    t1 = random(540, 575);
    t2 = random(540, 575);
    t3 = random(540, 575);
    t4 = random(540, 575);
    t5 = random(540, 575);
    t6 = random(540, 575);
}

void mousePressed() {
    if (mouseButton == LEFT) {
        if (toggleLoop) {
            noLoop();
            p = "Paused";
            text(p, 375, 200);
            toggleLoop = false;
        } else {
            loop();
            c = " "
            p = " ";
            toggleLoop = true;
        }
    }
}