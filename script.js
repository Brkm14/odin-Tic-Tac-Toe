const buttons = document.querySelectorAll('.square');
const xButton = document.getElementById('button-x');
const oButton = document.getElementById('button-o');
const restartButton = document.getElementById('restartButton');
const winner = document.getElementById('winner');


let player = 'X';
let computer = 'O';
let currentPlayer = player; 
let gameInProgress = true;



restartButton.addEventListener('click', restartGame);


// Oyun alanını temsil eden 2D dizi
const board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];


const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];


buttons.forEach((button, index) => {
    button.addEventListener('click', () => {
        if (currentPlayer === player && board[Math.floor(index / 3)][index % 3] === '') {
            board[Math.floor(index / 3)][index % 3] = currentPlayer;
            button.textContent = currentPlayer;

            if (checkWin(currentPlayer)) {
                console.log(currentPlayer + ' wins!');
                gameInProgress = false;
                disableButtons();
                winner.textContent = `${currentPlayer} wins!`
                // Burada oyunun sonlanması veya yeniden başlaması işlemleri olabilir.
            } else if (checkDraw()) {
                console.log('The game is a draw!');
                gameInProgress = false;
                disableButtons();
                winner.textContent = 'The game is a draw!'
                // Burada oyunun berabere bittiğini işlem yapabilirsiniz.
            } else {
                currentPlayer = computer;
                makeComputerMove();
            }
        }
    });
});

function checkWin(player) {
    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (board[Math.floor(a / 3)][a % 3] === player &&
            board[Math.floor(b / 3)][b % 3] === player &&
            board[Math.floor(c / 3)][c % 3] === player) {
            return true;
        }
    }

    return false;
}

function checkDraw() {
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            if (board[row][col] === '') {
                return false; // Hala boş hücre varsa berabere değil
            }
        }
    }
    return true; // Oyun alanı dolu ise berabere
}

function makeComputerMove() {
    const availableMoves = [];
    for (let i = 0; i < 9; i++) {
        const row = Math.floor(i / 3);
        const col = i % 3;
        if (board[row][col] === '') {
            availableMoves.push(i);
        }
    }

    let bestMove;

    // Bilgisayarın kazanma veya engelleme hamlesini kontrol et
    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        const count = [a, b, c].filter(index => board[Math.floor(index / 3)][index % 3] === computer).length;
        const emptyIndex = [a, b, c].find(index => board[Math.floor(index / 3)][index % 3] === '');
        if (count === 2 && emptyIndex !== undefined) {
            bestMove = emptyIndex;
            break;
        }
    }

    if (bestMove === undefined) {
        for (const pattern of winPatterns) {
            const [a, b, c] = pattern;
            const count = [a, b, c].filter(index => board[Math.floor(index / 3)][index % 3] === player).length;
            const emptyIndex = [a, b, c].find(index => board[Math.floor(index / 3)][index % 3] === '');
            if (count === 2 && emptyIndex !== undefined) {
                bestMove = emptyIndex;
                break;
            }
        }
    }

    if (bestMove === undefined) {
        bestMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];
    }

    board[Math.floor(bestMove / 3)][bestMove % 3] = computer;
    buttons[bestMove].textContent = computer;

    if (checkWin(computer)) {
        console.log(computer + ' wins!');
        gameInProgress = false;
        disableButtons();
        winner.textContent = 'Computer wins!';
        // Burada oyunun sonlanması veya yeniden başlaması işlemleri olabilir.
    }

    currentPlayer = player;
}


function restartGame() {
    board.forEach(row => row.fill(''));
    buttons.forEach(button => button.textContent = '');
    currentPlayer = player;
    gameInProgress = true;
    enableButtons();
    winner.textContent = 'Let the hunt begin!';
}

function disableButtons() {
    buttons.forEach(button => {
        button.disabled = true;
    });
}

function enableButtons() {
    buttons.forEach(button => {
        button.disabled = false;
    });
}


