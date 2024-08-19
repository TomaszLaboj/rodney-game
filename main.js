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

let positionX = 150;
let xSpeed = 10;

function animate(direction) {
  if (
    frameIndex === walkCycleRight.length ||
    frameIndex === walkCycleLeft.length
  ) {
    frameIndex = 0;
  }

  if (direction === "left" && positionX > 0) {
    xSpeed = -10;
    frame = walkCycleLeft[frameIndex];
  } else if (
    direction === "right" &&
    positionX < canvas.clientWidth - SPRITE_WIDTH
  ) {
    xSpeed = 10;
    frame = walkCycleRight[frameIndex];
  } else {
    xSpeed = 0;
    frame = direction === "right" ? walkCycleRight[1] : walkCycleLeft[1];
  }
  console.log(positionX);
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
}

image.onload = function () {
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
