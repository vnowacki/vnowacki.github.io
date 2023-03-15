const game = document.querySelector('.flappyBird');
const wall = document.querySelector('.flappyBird--wall');
const wallTop = document.querySelector('.flappyBird--wall--top');
const wallBottom = document.querySelector('.flappyBird--wall--bottom');
const bird = document.querySelector('.flappyBird--bird');
const gameOverScreen = document.querySelector('.flappyBird--gameOver');
const pointsScreen = document.querySelector('.flappyBird--points');
const clouds = document.querySelectorAll('.flappyBird--cloud');

const GRAVITY = .4;
const JUMP_FORCE = .15;
const INITIAL_GAME_SPEED = .25;
const GAME_SPEED_INCREASE = .00001;

var isJumping = false;
var jumpingTime = 5;
var birdAngle = 0;
var points = 0;
var inGame = false;
var gameSpeed = INITIAL_GAME_SPEED;
var lastTime = null;

game.addEventListener('click', () => {
        if(!inGame) return;
        isJumping = true;
        jumpingTime = 20;
        birdAngle = -40;
});

const rect = (element) => {
    return element.getBoundingClientRect();
}

const isCollision = (rect1, rect2) => {
    return rect1.left <= rect2.right && rect1.right >= rect2.left && rect1.top <= rect2.bottom && rect1.bottom >= rect2.top;
}

const resetGame = () => {
    bird.style.top = parseInt(window.getComputedStyle(game).getPropertyValue('height')) / 2 + 'px';
    wall.style.left = parseInt(window.getComputedStyle(game).getPropertyValue('width')) + 10 + 'px';
    points = 0;
    gameSpeed = INITIAL_GAME_SPEED;
    lastTime = null;
}

gameOverScreen.addEventListener('click', () => {
    if(inGame) return;
    resetGame();
    gameOverScreen.classList.add('invisible');
    inGame = true;
    window.requestAnimationFrame(update);
});

const gameOver = () => {
    inGame = false;
    gameOverScreen.classList.remove('invisible');
}

const randomNumberBetween = (min, max) => {
    return Math.random() * (max - min) + min;
}

const updateBird = (delta) => {
    bird.style.top = parseInt(window.getComputedStyle(bird).getPropertyValue('top')) + GRAVITY * delta + 'px';
    if(birdAngle < 30) {
        birdAngle += 2;
        bird.style.transform = `rotate(${birdAngle}deg)`;
    }
    if(isJumping) {
        bird.style.top = parseInt(window.getComputedStyle(bird).getPropertyValue('top')) - (JUMP_FORCE * delta + jumpingTime) + 'px';
        jumpingTime--;
    }
    if(jumpingTime <= 0) isJumping = false;
}

const updateWall = (delta) => {
    let left = parseInt(window.getComputedStyle(wall).getPropertyValue('left'));
    wall.style.left = left - gameSpeed * delta + 'px';
    gameSpeed += GAME_SPEED_INCREASE * delta;
    if(left <= -60) {
        wall.style.left = 'calc(100% + 10px)';
        let wallTopHeight = randomNumberBetween(5, 65);
        wallTop.style.height = `${wallTopHeight}%`;
        wallBottom.style.height = `${70 - wallTopHeight}%`;
    }
}

const updateClouds = (delta) => {
    clouds.forEach(cloud => {
        let left = parseInt(window.getComputedStyle(cloud).getPropertyValue('left'));
        let cloudSpeed = parseFloat(window.getComputedStyle(cloud).getPropertyValue('--speed'));
        cloud.style.left = left - gameSpeed * delta / cloudSpeed + 'px';
        if(left <= -100) {
            cloud.style.left = 'calc(100% + 100px)';
            cloud.style.top = randomNumberBetween(25, 80) + '%';
        }
    });
}

const updatePoints = () => {
    pointsScreen.innerText = parseInt((++points) / 10);
}

const update = (time) => {

    if(lastTime != null) {
        let delta = time - lastTime;
        updateBird(delta);
        updateWall(delta);
        updateClouds(delta);
        updatePoints();
    }

    lastTime = time;
    
    if(!isCollision(rect(bird), rect(game)) || isCollision(rect(bird), rect(wallTop)) || isCollision(rect(bird), rect(wallBottom))) gameOver();

    if(inGame) window.requestAnimationFrame(update);
}