

const Player = (symbol) => {
    return { symbol };
};


const Gameflow = () => {
    const cells = document.querySelectorAll(".cell");
    const restartButton = document.querySelector(".restart");
    const statusMessage = document.getElementById("status-message");
    const winConditions = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6] // diagonals
    ];
    let board = ["", "", "", "", "", "", "", "", ""];
    let currentPlayer = Player("X");
    let gameActive = true;
  
    const start = () => {
      cells.forEach((cell) => cell.addEventListener("click", cellClicked));
      restartButton.addEventListener("click", restart);
      statusMessage.textContent = `${currentPlayer}'s turn!`;
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
      board[index] = currentPlayer;
      cell.textContent = currentPlayer;
    };
  
    const changePlayer = () => {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      statusMessage.textContent = `${currentPlayer}'s turn!`;
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
        statusMessage.textContent = `${currentPlayer} wins!`;
        gameActive = false;
        return;
      } else if (!board.includes("")) {
        statusMessage.textContent = "Tie!";
        gameActive = false;
        return;
      } else {
        changePlayer();
      }
    };
  
    const restart = () => {
      currentPlayer = "X";
      board = ["", "", "", "", "", "", "", "", ""];
      statusMessage.textContent = `${currentPlayer}'s turn!`;
      cells.forEach((cell) => (cell.textContent = ""));
      gameActive = true;
    };
  
    return { start };
};
  
const game = Gameflow();
game.start();
