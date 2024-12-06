const board = document.getElementById('board');
const statusDiv = document.getElementById('status');
const resetBtn = document.getElementById('resetBtn');
const currentTurnDisplay = document.getElementById('currentTurn');
const scoreX = document.getElementById('scoreX');
const scoreO = document.getElementById('scoreO');

let currentPlayer = 'X';
let gameActive = true;
let scores = { X: 0, O: 0 };

// Initialize the board
function initializeBoard() {
    board.innerHTML = '';
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.index = i;
        cell.addEventListener('click', handleCellClick);
        board.appendChild(cell);
    }
}

// Handle cell clicks
function handleCellClick(event) {
    const cell = event.target;

    if (!gameActive || cell.textContent !== '') return;

    cell.textContent = currentPlayer;
    checkWinner();

    if (gameActive) {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        currentTurnDisplay.textContent = `Player ${currentPlayer}`;
    }
}

// Check for a winner or draw
function checkWinner() {
    const cells = document.querySelectorAll('.cell');
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (
            cells[a].textContent &&
            cells[a].textContent === cells[b].textContent &&
            cells[a].textContent === cells[c].textContent
        ) {
            gameActive = false;
            statusDiv.textContent = `Player ${currentPlayer} Wins!`;
            statusDiv.style.color = '#2f855a'; // Green color for winner
            statusDiv.style.display = 'block'; // Display winner
            scores[currentPlayer]++;
            updateScores();
            return;
        }
    }

    // Check for draw
    if (Array.from(cells).every(cell => cell.textContent !== '')) {
        gameActive = false;
        statusDiv.textContent = "It's a Draw!";
        statusDiv.style.color = '#e53e3e'; // Red color for draw
        statusDiv.style.display = 'block'; // Display draw
    }
}

// Update the scorecard
function updateScores() {
    scoreX.textContent = scores.X;
    scoreO.textContent = scores.O;
}

// Reset the game
resetBtn.addEventListener('click', () => {
    gameActive = true;
    currentPlayer = 'X';
    currentTurnDisplay.textContent = 'Player X';
    statusDiv.textContent = '';
    statusDiv.style.color = '#1f2937'; // Reset color
    statusDiv.style.display = 'none'; // Hide winner message
    initializeBoard();
});

// Initialize the game
initializeBoard();
