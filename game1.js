const board = document.getElementById("board");
const statusText = document.getElementById("status");
const modeSelect = document.getElementById("mode");

let currentPlayer = "X";
let gameActive = true;
let cells = [];
let systemThinking = false;

const winningCombinations = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
];

// Create Board
function createBoard() {
    board.innerHTML = "";
    cells = [];

    for (let i = 0; i < 9; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.addEventListener("click", handleClick);
        board.appendChild(cell);
        cells.push(cell);
    }
}

// Handle Click
function handleClick(e) {

    if (!gameActive || systemThinking) return;

    const cell = e.target;

    if (cell.textContent !== "") return;

    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer.toLowerCase());

    if (checkWin(currentPlayer)) {
        statusText.textContent = `🎉 Player ${currentPlayer} Wins!`;
        gameActive = false;
        return;
    }

    if (checkDraw()) {
        statusText.textContent = "🤝 Match Draw!";
        gameActive = false;
        return;
    }

    if (modeSelect.value === "human") {

        currentPlayer = currentPlayer === "X" ? "O" : "X";
        statusText.textContent = `Player ${currentPlayer}'s Turn`;

    } else {

        currentPlayer = "O";
        systemThinking = true;
        statusText.textContent = "💻 System's Turn...";

        setTimeout(systemMove, 600);

    }

}

// System Move
function systemMove() {

    if (!gameActive) return;

    const emptyCells = cells.filter(cell => cell.textContent === "");

    if (emptyCells.length === 0) return;

    const randomCell =
        emptyCells[Math.floor(Math.random() * emptyCells.length)];

    randomCell.textContent = "O";
    randomCell.classList.add("o");

    if (checkWin("O")) {
        statusText.textContent = "💻 System Wins!";
        gameActive = false;
        systemThinking = false;
        return;
    }

    if (checkDraw()) {
        statusText.textContent = "🤝 Match Draw!";
        gameActive = false;
        systemThinking = false;
        return;
    }

    currentPlayer = "X";
    systemThinking = false;
    statusText.textContent = "Player X's Turn";

}

// Check Winner
function checkWin(player) {

    return winningCombinations.some(combination => {

        const [a,b,c] = combination;

        return (
            cells[a].textContent === player &&
            cells[b].textContent === player &&
            cells[c].textContent === player
        );

    });

}

// Check Draw
function checkDraw() {

    return cells.every(cell => cell.textContent !== "");

}

// Restart
function restartGame() {

    gameActive = true;
    currentPlayer = "X";
    systemThinking = false;

    createBoard();

    statusText.textContent = "Player X's Turn";

}

// Start Game
restartGame();