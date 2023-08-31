let sound;
let fft;
let angleX = 0;
let angleY = 0;
let scaleFactor = 1;
let zoom = 1;


function preload() {
  soundFormats('mp3', 'ogg');
 sound = loadSound('Hraach.mp3');
}
function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  sound.loop();
  fft = new p5.FFT();
}

function draw() {
  background(0); // Đặt background màu đen

  let spectrum = fft.analyze();
  let lowFreq = fft.getEnergy(50, 1000);
  let highFreq = fft.getEnergy(5500, 20000);
  let rotationSpeed = map(lowFreq, 0, 255, 0.001, 0.007);
  let scaleSpeed = map(highFreq, 90, 255, -1, 2);

  angleX += rotationSpeed;
  angleY += rotationSpeed;
  scaleFactor = scaleSpeed;

  // Apply zoom and rotation based on mouse interactions
  orbitControl(); // Enable orbit control

  // Add lights
  ambientLight(100); // Ánh sáng môi trường
  pointLight(255, 255, 255, 0, 0, 1000); // Đèn điểm

  scale(zoom); // Apply zoom factor

  rotateX(angleX);
  rotateY(angleY);
  
  // Calculate point light brightness based on lowFreq or highFreq
  let pointLightBrightness = map(lowFreq, 50, 255, 0, 255);

  // Apply lights
  ambientLight(100);
  pointLight(255, 255, 255, 0, 0, 1000);
  pointLight(255, 255, 255, mouseX - width / 2, mouseY - height / 2, 1000); // Mouse-controlled point light

  // Fill each face of the cube with a different color and transparency
  push();
  translate(0, 0, 200 * scaleFactor);
  fill(255, 0, 0, 100); // Red with transparency
  box(150);
  pop();

  push();
  translate(0, 0, -200 * scaleFactor);
  fill(0, 255, 0, 100); // Green with transparency
  box(150);
  pop();

  push();
  translate(0, 200 * scaleFactor, 0);
  fill(0, 0, 255, 100); // Blue with transparency
  box(150);
  pop();

  push();
  translate(0, -200 * scaleFactor, 0);
  fill(255, 255, 0, 100); // Yellow with transparency
  box(150);
  pop();

  push();
  translate(200 * scaleFactor, 0, 0);
  fill(255, 0, 255, 100); // Magenta with transparency
  box(150);
  pop();

  push();
  translate(-200 * scaleFactor, 0, 0);
  fill(0, 255, 255, 100); // Cyan with transparency
  box(150);
  pop();
}

function mouseWheel(event) {
  // Zoom in/out based on mouse wheel
  zoom += event.delta * 0.001;
  zoom = constrain(zoom, 0.1, 5); // Limit zoom range
}
