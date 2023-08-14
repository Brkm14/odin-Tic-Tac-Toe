const buttons = document.querySelectorAll('.square');
const xButton = document.getElementById('button-x');
const oButton = document.getElementById('button-o');
const restartButton = document.getElementById('restartButton');

let currentPlayer = 'X'; 

xButton.addEventListener('click', () => {
    currentPlayer = 'X';
    xButton.classList.add('active'); 
    oButton.classList.remove('active'); 
});

oButton.addEventListener('click', () => {
    currentPlayer = 'O';
    oButton.classList.add('active'); 
    xButton.classList.remove('active');
});

buttons.forEach(button => {
    button.addEventListener('click', () => {
        if (!button.textContent) { 
            button.textContent = currentPlayer;
            button.disabled = true; 
            // currentPlayer = (currentPlayer === 'X') ? 'O' : 'X'; // Sırayla X ve O
        }
    });
});


restartButton.addEventListener('click', () => {
    buttons.forEach(button => {
        button.textContent = '';
        button.disabled = false;
    })

    xButton.classList.remove('active');
    oButton.classList.remove('active'); 

    currentPlayer = 'X'; 
})