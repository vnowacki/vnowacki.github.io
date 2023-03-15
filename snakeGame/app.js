//game const parameters
const GAME_SPEED = 10;
const PIXEL_SIZE = 30;
const GAMEBOARD_SIZE = 21;
const GROW_FACTOR = 2;

//game variables
let gameInterval = null;
let changeDirection = true;

//game board
const gameBoard = document.querySelector('#gameBoard');
gameBoard.style.width = GAMEBOARD_SIZE * PIXEL_SIZE + 'px';
gameBoard.style.height = GAMEBOARD_SIZE * PIXEL_SIZE + 'px';

//game over screen
const gameOverScreen = document.querySelector('#gameOver');

//snake body
let snake = [
    {x: Math.floor(GAMEBOARD_SIZE / 2), y: Math.floor(GAMEBOARD_SIZE / 2)}
];
let snakeDirection = {x: 0, y: 0};

//create food
let food = null;

//main game function
const main = () => {
    gameBoard.innerHTML = '';
    renderSnake(gameBoard);
    updateSnake();
    renderFood(gameBoard);
    updateFood();
}

//snake functions
const renderSnake = (board) => {
    snake.forEach(segment => {
        let element = document.createElement('div');
        element.style.top = PIXEL_SIZE * segment.y + 'px';
        element.style.left = PIXEL_SIZE * segment.x + 'px';
        element.style.width = PIXEL_SIZE + 'px';
        element.style.height = PIXEL_SIZE + 'px';
        element.classList.add('snake');
        board.appendChild(element);
    });
}

const updateSnake = () => {
    for(i = snake.length - 1; i > 0; i--) {
        snake[i].x = snake[i - 1].x;
        snake[i].y = snake[i - 1].y;
    }

    snake[0].x += snakeDirection.x;
    snake[0].y += snakeDirection.y;

    if(snakeOutOfBoard() || snakeIsOverlapping(snake[0])) setTimeout(gameOver, 100);
    changeDirection = true;
}

const snakeOutOfBoard = () => {
    return snake[0].x < 0 || snake[0].x > GAMEBOARD_SIZE - 1 || snake[0].y < 0 || snake[0].y > GAMEBOARD_SIZE - 1;
}

const snakeIsOverlapping = (element) => {
    let overlap = false;
    for(i = 1; i < snake.length; i++) {
        if(snake[i].x == element.x && snake[i].y == element.y) overlap = true;
    }
    return overlap;
}

//food functions
const renderFood = (board) => {
    let newFood = {
        x: Math.floor(Math.random() * GAMEBOARD_SIZE),
        y: Math.floor(Math.random() * GAMEBOARD_SIZE)
    };
    while(snakeIsOverlapping(newFood)) {
        newFood = {
            x: Math.floor(Math.random() * GAMEBOARD_SIZE),
            y: Math.floor(Math.random() * GAMEBOARD_SIZE)
        };
    }
    if(food == null) food = newFood;
    let element = document.createElement('div');
    element.style.top = PIXEL_SIZE * food.y + 'px';
    element.style.left = PIXEL_SIZE * food.x + 'px';
    element.style.width = PIXEL_SIZE + 'px';
    element.style.height = PIXEL_SIZE + 'px';
    element.classList.add('food');
    board.appendChild(element);
}

const updateFood = () => {
    if(food.x == snake[0].x && food.y == snake[0].y) {
        food = null;
        for(i = 0; i < GROW_FACTOR; i++) {
            let lastSnakeSegment = snake[snake.length - 1];
            snake.push({x: lastSnakeSegment.x, y: lastSnakeSegment.y});
        }
    }
}

const gameOver = () => {
    clearInterval(gameInterval);
    gameOverScreen.classList.remove('hidden');
}

//controls
window.addEventListener('keydown',(e) => {
    if(e.code == "ArrowUp" && snakeDirection.y == 0 && changeDirection) {
        snakeDirection = {x: 0, y: -1};
        changeDirection = false;
    }
    if(e.code == "ArrowDown" && snakeDirection.y == 0 && changeDirection) { 
        snakeDirection = {x: 0, y: 1};
        changeDirection = false;
    }
    if(e.code == "ArrowLeft" && snakeDirection.x == 0 && changeDirection) {
        snakeDirection = {x: -1, y: 0};
        changeDirection = false;
    }
    if(e.code == "ArrowRight" && snakeDirection.x == 0 && changeDirection) {
        snakeDirection = {x: 1, y: 0};
        changeDirection = false;
    }

});

//run main function
gameInterval = setInterval(main, 1000 / GAME_SPEED);