const SPRITE_WIDTH = 128;
const SPRITE_HEIGHT = 128;
const BORDER_WIDTH = 0;
const SPACING_WIDTH = 0;

function spritePositionToImagePosition(row, col) {
  return {
    x: BORDER_WIDTH + col * (SPACING_WIDTH + SPRITE_WIDTH),
    y: BORDER_WIDTH + row * (SPACING_WIDTH + SPRITE_HEIGHT),
  };
}

const canvas = document.getElementById("canvas");

const context = canvas.getContext("2d");

const image = new Image();
image.src = "man-walking-spritesheet.png";
image.crossOrigin = true;

const rodneyRight0 = spritePositionToImagePosition(0, 0);
const rodneyRight1 = spritePositionToImagePosition(0, 1);
const rodneyRight2 = spritePositionToImagePosition(0, 2);
const rodneyRight3 = spritePositionToImagePosition(0, 3);
const rodneyLeft0 = spritePositionToImagePosition(1, 0);
const rodneyLeft1 = spritePositionToImagePosition(1, 1);
const rodneyLeft2 = spritePositionToImagePosition(1, 2);
const rodneyLeft3 = spritePositionToImagePosition(1, 3);

const walkCycleRight = [rodneyRight0, rodneyRight1, rodneyRight2, rodneyRight3];
const walkCycleLeft = [rodneyLeft0, rodneyLeft1, rodneyLeft2, rodneyLeft3];

let frameIndex = 0;
let frame;

let positionX = 0;
let xSpeed = 10;

function animate(direction) {
  if (frameIndex === walkCycleRight.length) {
    frameIndex = 0;
  }

  if (direction === "left") {
    frame = walkCycleLeft[frameIndex];
  } else if (direction === "right") {
    frame = walkCycleRight[frameIndex];
  }
  // frame = xSpeed > 0 ? walkCycleRight[frameIndex] : walkCycleLeft[frameIndex];

  context.clearRect(positionX, 0, SPRITE_WIDTH, SPRITE_HEIGHT);

  context.drawImage(
    image,
    frame.x,
    frame.y,
    SPRITE_WIDTH,
    SPRITE_HEIGHT,
    positionX,
    0,
    SPRITE_WIDTH,
    SPRITE_HEIGHT
  );

  frameIndex++;

  positionX += xSpeed;

  if (positionX > canvas.clientWidth - SPRITE_WIDTH || positionX < 0) {
    xSpeed *= -1;
  }
}

image.onload = function () {
  // setInterval(animate, 80);
  window.addEventListener("keydown", (event) => {
    if (event.key == "ArrowLeft") {
      animate("left");
      console.log("left");
    } else if (event.key == "ArrowRight") {
      animate("right");
      console.log("right");
    }
  });
};
