void setup()
{
  size(800, 600);
  lander = loadShape("data/lander.svg");

}

float ground = 517;
float fuel = 100;
float craft_X = 400;
float craft_Y = 0;

float speed_X = 0;
float speed_Y = 0;

float thrust_X = 0.01;
float thrust_Y = 0.105;

float gravity = 0.01;

PShape lander;

  float r = random(100, 600);

  float pre = r / 6;
  float post = (800 - (r + 100)) / 6;

  float t1 = random(540, 575);
  float t2 = random(540, 575);
  float t3 = random(540, 575);
  float t4 = random(540, 575);
  float t5 = random(540, 575);
  float t6 = random(540, 575);


void randomize()
{
  r = random(100, 600);

  pre = r / 6;
  post = (800 - (r + 100)) / 6;

  t1 = random(540, 575);
  t2 = random(540, 575);
  t3 = random(540, 575);
  t4 = random(540, 575);
  t5 = random(540, 575);
  t6 = random(540, 575);
}

void draw()
{
 smooth();
 background(0,0,0);

 triangle(0, 580, pre, t1, 2*pre, 580);
 triangle(2*pre, 580, 3*pre, t2, 4*pre, 580);
 triangle(4*pre, 580, 5*pre, t3, r, 580);

 triangle(r+100, 580, r+100+post, t4, r+100+2*post, 580);
 triangle(r+100+2*post, 580, r+100+3*post, t5, r+100+4*post, 580);
 triangle(r+100+4*post, 580, r+100+5*post, t6, 800, 580);

 rect(r, 580, 100, 20);

 noStroke();
 smooth();
 rect(0, 580, 800, 20);
 shape(lander, craft_X, craft_Y, 80, 80);

 text("Velocity", 10, 20);
 String vv = nf(speed_Y, 1, 2);
 text(vv , 80, 20);

 text("Destance", 10, 35);
 float dd = ground - craft_Y;
 String ddd = nf(dd, 1, -1);
 text(ddd, 80, 35);

 text("Fuel", 10, 50);
 String ff = nf(fuel, 1, -1);
 text(ff, 80, 50);

 if (craft_Y < ground)
 {
 thrust_Y = 0.105;
 craft_Y += speed_Y;
 speed_Y = speed_Y + gravity;
 }

 if (fuel <= 0)
 {
   text("Ran out of fuel!!", 350, 130);
   thrust_Y = 0;
   speed_Y = speed_Y + gravity;
 }

 if (craft_X > 0 && craft_X < 800)
 {
 craft_X += speed_X;
 speed_X = speed_X;
 }

 if (craft_Y >= ground)
 {
     speed_X = 0;
     if (speed_Y <= 0.5 && craft_X >= r && craft_X <= r+100)
     {
     text("safe landing", 350, 100);
     }
     else
     {
     text("crash!!!", 350, 100);
     }
     speed_Y = 0;
 }

}

void keyPressed()
{
  if (key == 'h' && fuel > 0 && craft_Y < ground)
  {
  speed_Y = speed_Y - thrust_Y;
  fuel = fuel -0.75;
  lander = loadShape("data/lander_down.svg");
  }

  if (key == 'k' && fuel > 0 && craft_Y < ground)
  {
  speed_X = speed_X + thrust_X;
  fuel = fuel - 0.1;
  lander = loadShape("data/lander_left.svg");
  }

  if (key == 'l' && fuel > 0 && craft_Y < ground)
  {
  speed_X = speed_X - thrust_X;
  fuel = fuel - 0.1;
  lander = loadShape("data/lander_right.svg");
  }

  if (key == 'r')
  {
  randomize();
  redraw();
  fuel = 100;
  craft_X = 400;
  craft_Y = 0;
  speed_X = 0;
  speed_Y = 0;
  }
}

void keyReleased()
{
  lander = loadShape("data/lander.svg");
}
