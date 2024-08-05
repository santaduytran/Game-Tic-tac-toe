const cells = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const startButton = document.getElementById('startButton');
const resetButton = document.getElementById('resetButton');
const title = document.getElementById('title');

let currentPlayer = 'X';
let gameActive = false;
let gameEnded = false;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

startButton.addEventListener('click', startGame);
resetButton.addEventListener('click', resetGame);
cells.forEach(cell => cell.addEventListener('click', handleCellClick));

function startGame() {
    if (gameActive || !gameEnded && !cells[0].textContent === '') return;
    gameActive = true;
    gameEnded = false;
    title.textContent = 'Hãy chiến đấu hết mình!';
    currentPlayer = 'X';
    startButton.disabled = true;
    resetButton.disabled = true;
}

function resetGame() {
    if (!gameEnded) return;
    gameActive = false;
    title.textContent = 'Bấm bắt đầu để chơi';
    startButton.disabled = false;
    resetButton.disabled = true;
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('winner');
    });
}

function handleCellClick(e) {
    const cell = e.target;
    if (cell.textContent !== '' || !gameActive) return;
    cell.textContent = currentPlayer;
    if (checkWin(currentPlayer)) {
        title.textContent = `${currentPlayer} đã chiến thắng!`;
        gameActive = false;
        gameEnded = true;
        startButton.disabled = true;
        resetButton.disabled = false;
        highlightWinningCells(currentPlayer);
    } else if (isDraw()) {
        title.textContent = 'Hòa!';
        gameActive = false;
        gameEnded = true;
        startButton.disabled = true;
        resetButton.disabled = false;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

function checkWin(player) {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return cells[index].textContent === player;
        });
    });
}

function highlightWinningCells(player) {
    winningCombinations.forEach(combination => {
        if (combination.every(index => cells[index].textContent === player)) {
            combination.forEach(index => cells[index].classList.add('winner'));
        }
    });
}

function isDraw() {
    return [...cells].every(cell => cell.textContent !== '');
}