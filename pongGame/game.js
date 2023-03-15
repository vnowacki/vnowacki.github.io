import Ball from './Ball.js';
import Paddle from './Paddle.js';

const ball = new Ball(document.querySelector('.ball'));
const board = document.querySelector('#game');
const boardRect = board.getBoundingClientRect();
const playerPaddle = new Paddle(document.querySelector('.gamePad.left'));
const computerPaddle = new Paddle(document.querySelector('.gamePad.right'));
const playerScore = document.querySelector('.player');
const computerScore = document.querySelector('.computer');
const control = document.querySelector('.control');

control.addEventListener('input', () => {
    playerPaddle.position = control.value;
});

//board.addEventListener('mousemove', (e) => {
//    playerPaddle.position = ((e.y - board.offsetTop) / board.clientHeight) * 100;
//});

const isLose = () => {
    let rect = ball.rect();
    return rect.left <= boardRect.left || rect.right >= boardRect.right;
}

const handleLose = () => {
    let rect = ball.rect();
    if(rect.left <= boardRect.left) {
        computerScore.textContent = parseInt(computerScore.textContent) + 1;
    }
    if(rect.right >= boardRect.right) {
        playerScore.textContent = parseInt(playerScore.textContent) + 1;
    }
    ball.reset();
    computerPaddle.reset();
}

let lastTime;
const update = (time) => {
    if(lastTime != null) {
        let delta = time - lastTime;
        ball.update(delta, [playerPaddle.rect(), computerPaddle.rect()], board);
        computerPaddle.update(delta, ball.y);
    }

    if(isLose()) handleLose();

    lastTime = time;
    window.requestAnimationFrame(update);
}

window.requestAnimationFrame(update);