void setup()
{
  size(800, 600);
  lander = loadShape("lander.svg");
  smooth();
}

float craft_X = 400;
float craft_Y = 0;

float speed_X = 0;
float speed_Y = 0.095;

float thrust_X = 0.01;
float thrust_Y = -0.01;

float gravity = 0.01;

PShape lander;
float r = random(100, 600);

  float t1 = random(540, 580);
  float t2 = random(540, 580);
  float t3 = random(540, 580);
  float t4 = random(540, 580);
  float t5 = random(540, 580);
  float t6 = random(540, 580);
  float t7 = random(540, 580);
  float t8 = random(540, 580);
  float t9 = random(540, 580);
  float t10 = random(540, 580);
  

void draw()
{  
 background(0,0,0);
 
 float pre = r / 5;
 float post = (800 - (r + 100)) / 5; 
 
 noStroke();
 
 rect(0, 580, 800, 20);
 
 triangle(0, 580, pre, t1, 2*pre, 580);
 triangle(2*pre, 580, 3*pre, t2, 4*pre, 580);
 triangle(4*pre, 580, 4.5*pre, t3, r, 580);
 
 triangle(r+100, 580, r+100+post, t1, r+100+2*post, 580);
 triangle(r+100+2*post, 580, r+100+3*post, t2, r+100+4*post, 580);
 triangle(r+100+4*post, 580, r+100+4.5*post, t3, 800, 580);
 
 rect(r, 580, 100, 20);
 shape(lander, craft_X, craft_Y, 80, 80);
 
 text(String.format("Velocity: %.2f", speed_Y) , 10, 20);
 text(String.format("Distance: %.0f", (550 - craft_Y)), 10, 35);
 
 if (craft_Y < 520) 
 {
 craft_Y += speed_Y; 
 speed_Y = speed_Y + gravity;
 }
 
 if (craft_X > 0 && craft_X < 800)
 {
 craft_X += speed_X;
 speed_X = speed_X;
 }
 
 if (craft_Y >= 520){
   speed_X = 0;
   if (speed_Y <= 0.5 && craft_X >= r && craft_X <= r+100){
   text("safe landing", 350, 100);
   }
   else
   text("crash!!!", 350, 100);
 }
}

void keyPressed()
{
  if (key == 'h')
  {
  speed_Y = speed_Y - 0.1;
  lander = loadShape("lander_down.svg");
  }

  if (key == 'k')
  {
  speed_X = speed_X + thrust_X;
  lander = loadShape("lander_left.svg");
  }

  if (key == 'l')
  {
  speed_X = speed_X - thrust_X;
  lander = loadShape("lander_right.svg");
  }
  
}

void keyReleased()
{
  lander = loadShape("lander.svg"); 
  if (key == 'r')
  {
  setup();
  }
}
