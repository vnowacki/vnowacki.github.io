const cells = document.querySelectorAll('.cell');
const gameOver = document.querySelector('.gameOver');

var circleTurn = false;
const O_CLASS = 'o';
const X_CLASS = 'x';
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const checkWin = (currentClass) => {
    return WINNING_COMBINATIONS.some(com => {
        return com.every(index => {
            return cells[index].classList.contains(currentClass);
        });
    });
}

const endGame = (draw) => {
    if(draw) {
        gameOver.innerHTML = `draw!`;
    }
    else {
        gameOver.innerHTML = `${(circleTurn) ? "O's" : "X's"} wins!`;
    }
    gameOver.classList.add('show');
}

const isDraw = () => {
    return [...cells].every(cell => {
        return cell.classList.contains(O_CLASS) || cell.classList.contains(X_CLASS);
    });
}

cells.forEach(cell => {
    cell.addEventListener('click', (e) => {
        let currentClass = (circleTurn) ? O_CLASS : X_CLASS;
        cell.classList.add(currentClass);
        if(checkWin(currentClass)) {
            endGame(false);
        } else if(isDraw()) {
            endGame(true);
        } else {
            circleTurn = !circleTurn;
        }
    }, { once: true });
});