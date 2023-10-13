const Player = (symbol) => {
    return { symbol };
};

const displayController = (() => {
    const cells = document.querySelectorAll(".cell");
    const restartButton = document.querySelector(".restart");
    const statusMessage = document.getElementById("status-message");

    const updateCell = (cell, symbol) => {
        console.log(cell, symbol);
        cell.textContent = symbol;
    };

    const clearCells = () => {
        cells.forEach((cell) => (cell.textContent = ""));
    };

    const setStatusMessage = (message) => {
        statusMessage.textContent = message;
    };

    const addCellListener = (clickHandler) => {
        cells.forEach((cell) => cell.addEventListener("click", clickHandler));
    };

    const addRestartListener = (clickHandler) => {
        restartButton.addEventListener("click", clickHandler);
    };

    return {updateCell, clearCells, setStatusMessage, addCellListener, addRestartListener};
})();

const Gameflow = () => {
    const winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6] // diagonals
    ];
    let board = ["", "", "", "", "", "", "", "", ""];
    let currentPlayer = Player("X");

    const start = () => {
        displayController.addRestartListener(restart);
        displayController.setStatusMessage(`${currentPlayer}'s turn!`);
        displayController.addCellListener(cellClicked);
        gameActive = true;
    };

    const cellClicked = function () {
        const index = this.getAttribute("index");
        if (board[index] !== "" || !gameActive) {
            return;
        }
        updateCell(this, index);
        checkWin();
    };

    const updateCell = (cell, index) => {
        board[index] = currentPlayer.symbol;
        displayController.updateCell(cell, currentPlayer.symbol);
    };

    const changePlayer = () => {
        currentPlayer.symbol = currentPlayer.symbol === "X" ? "O" : "X";
        displayController.setStatusMessage(`${currentPlayer.symbol}'s turn!`);
    };

    const checkWin = () => {
        let roundWon = false;
        for (let i = 0; i < winConditions.length; i++) {
            const winCondition = winConditions[i];
            let a = board[winCondition[0]];
            let b = board[winCondition[1]];
            let c = board[winCondition[2]];
            if (a === "" || b === "" || c === "") {
                continue;
            }
            if (a === b && b === c) {
                roundWon = true;
                break;
            }
        }

        if (roundWon) {
            displayController.setStatusMessage(`${currentPlayer.symbol} wins!`);
            gameActive = false;
            return;
        } else if (!board.includes("")) {
            displayController.setStatusMessage("Tie!");
            gameActive = false;
            return;
        } else {
            changePlayer();
        }
    };

    const restart = () => {
        currentPlayer = Player("X");
        board = ["", "", "", "", "", "", "", "", ""];
        displayController.setStatusMessage(`${currentPlayer}'s turn!`);
        displayController.clearCells();
        gameActive = true;
    };

    return { start };
};

const game = Gameflow();
game.start();
