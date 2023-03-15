const gameBoard = document.querySelector('#gameBoard');
const tiles = document.querySelectorAll('.tile');
const resetButton = document.querySelector('button');
const winInfo = document.querySelector('#winInfo');

const gameBoardSize = gameBoard.offsetWidth;
const tileSize = gameBoardSize / 3;

var gameState = new Array(
    new Array(tiles[0], tiles[1], tiles[2]),
    new Array(tiles[3], tiles[4], tiles[5]),
    new Array(tiles[6], tiles[7], tiles[8])
);
var winState = new Array();
var inGame = false;

const render = (gameBoard, gameState) => {
    let rand = Math.floor(Math.random() * 4) + 1;
    winInfo.style.opacity = "0";
    gameState.forEach((row, rowIndex) => {
        row.forEach((item, itemIndex) => {
            item.style.top = `${tileSize * rowIndex}px`;
            item.style.left = `${tileSize * itemIndex}px`;
            item.style.width = `${tileSize}px`;
            item.style.height = `${tileSize}px`;
            gameBoard.appendChild(item);
            if(item.innerText != '' && item.style.backgroundImage === '') {
                item.style.backgroundImage = `url('images/${rand}.jpg')`;
                item.style.backgroundSize = `${gameBoardSize}px ${gameBoardSize}px`;
                item.style.backgroundPosition = `${-tileSize * itemIndex}px ${-tileSize * rowIndex}px`;
            }
            if(item.innerText == '') item.style.border = 'none';
        });
    });
}

gameBoard.addEventListener('click', (event) => {
    const target = event.target;
    let x, y, xEmpty, yEmpty;
    gameState.forEach((row, rowIndex) => {
        row.forEach((item, itemIndex) => {
            if(item === target) {
                x = itemIndex;
                y = rowIndex;
            }
            if(item.innerText == '') {
                xEmpty = itemIndex;
                yEmpty = rowIndex;
            }
        });
    });
    if(((x == xEmpty && (y + 1 == yEmpty || y - 1 == yEmpty)) || ((y == yEmpty) && (x + 1 == xEmpty || x - 1 == xEmpty))) && inGame) {
        let temp = gameState[y][x];
        gameState[y][x] = gameState[yEmpty][xEmpty];
        gameState[yEmpty][xEmpty] = temp;

        let tempTop = gameState[y][x].style.top;
        let tempLeft = gameState[y][x].style.left;
        gameState[y][x].style.top = gameState[yEmpty][xEmpty].style.top;
        gameState[y][x].style.left = gameState[yEmpty][xEmpty].style.left;
        gameState[yEmpty][xEmpty].style.top = tempTop;
        gameState[yEmpty][xEmpty].style.left = tempLeft;

        let win = true;
        gameState.forEach((row, rowIndex) => {
            row.forEach((item, itemIndex) => {
                if(winState[rowIndex][itemIndex] != item) win = false;
            });
        });
        if(win) {
            winInfo.style.opacity = '1';
            winInfo.style.visibility = 'visible';
            inGame = false;
        }
    }
});

const randomize = () => {
    let newOrder = new Array();
    newOrder.push(Math.floor(Math.random() * 9));
    while(newOrder.length < 9) {
        let rand = Math.floor(Math.random() * 9);
        if(!newOrder.includes(rand)) 
            newOrder.push(rand);
    }
    
    gameState = [[],[],[]];
    for(number of newOrder) {
        if(gameState[0].length < 3) gameState[0].push(tiles[number]);
        else if(gameState[1].length < 3) gameState[1].push(tiles[number]);
        else gameState[2].push(tiles[number]);
    }
    render(gameBoard, gameState);
    inGame = true;
}

resetButton.addEventListener('click', () => {
    location.reload();
});

render(gameBoard, gameState);
winState = gameState;
setTimeout(randomize, 2000);