import { updateGround, setupGround } from "./ground.js"
import { updateDino, setupDino, getDinoRect, setDinoLose } from "./dino.js"
import { updateCactus, setupCactus, getCactusRects } from "./cactus.js"

var WORLD_WIDTH = 100;
var WORLD_HEIGHT = 30;
var SPEED_SCALE_INCREASE = 0.00001;

var worldElem = document.querySelector("[data-world]");
var scoreElem = document.querySelector("[data-score]");
var startScreenElem = document.querySelector("[data-start-screen]");
var worldContainer = document.querySelector(".worldContainer");

setPixelToWorldScale();
document.addEventListener("keydown", handleStart, { once: true });

let lastTime;
let speedScale;
let score;
update = (time) => {
  if (lastTime == null) {
    lastTime = time;
    requestId = window.requestAnimationFrame(update);
    return;
  }
  delta = time - lastTime;

  updateGround(delta, speedScale);
  updateDino(delta, speedScale);
  updateCactus(delta, speedScale);
  updateSpeedScale(delta);
  updateScore(delta);
  if (checkLose()) return handleLose();

  lastTime = time;
  requestId = window.requestAnimationFrame(update);
}

checkLose = () => {
  dinoRect = getDinoRect();
  return getCactusRects().some(rect => isCollision(rect, dinoRect));
}

isCollision = (rect1, rect2) => {
  return (
    rect1.left < rect2.right &&
    rect1.top < rect2.bottom &&
    rect1.right > rect2.left &&
    rect1.bottom > rect2.top
  );
}

updateSpeedScale = (delta) => {
  speedScale += delta * SPEED_SCALE_INCREASE;
}

updateScore = (delta) => {
  score += delta * 0.01;
  scoreElem.textContent = Math.floor(score);
}

handleStart = () => {
  lastTime = null;
  speedScale = 1;
  score = 0;
  setupGround();
  setupDino();
  setupCactus();
  startScreenElem.classList.add("hide");
  requestId = window.requestAnimationFrame(update);
}

handleLose = () => {
  setDinoLose();
  setTimeout(() => {
    document.addEventListener("keydown", handleStart, { once: true });
    startScreenElem.classList.remove("hide");
  }, 100);
}

setPixelToWorldScale = () => {
  let worldToPixelScale;
  if (worldContainer.clientWidth / worldContainer.clientHeight < WORLD_WIDTH / WORLD_HEIGHT) {
    worldToPixelScale = worldContainer.clientWidth / WORLD_WIDTH;
  } else {
    worldToPixelScale = worldContainer.clientHeight / WORLD_HEIGHT;
  }

  worldElem.style.width = `${WORLD_WIDTH * worldToPixelScale}px`;
  worldElem.style.height = `${WORLD_HEIGHT * worldToPixelScale}px`;
}
