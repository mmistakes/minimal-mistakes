# 단진자

<script>


let angle;
let bob;
let len;
let origin;
let w = 0;
let a = 0;
let gravity;

function setup() {
  createCanvas(600, 400);
  origin = createVector(300, 0);
  angle = PI/4;
  bob = createVector();
  len = 200;
}

function draw() {
  background(0);
  
  gravity = 100;
  a = -1 * gravity * sin(angle) / (len*len);
  w += a;
  angle += w;
  
  bob.x = len * sin(angle) + origin.x;
  bob.y = len * cos(angle) + origin.y;
  
  stroke(255);
  strokeWeight(8);
  fill(127);
  line(origin.x,origin.y,bob.x,bob.y);
  circle(bob.x,bob.y,64);
  
}


</script>