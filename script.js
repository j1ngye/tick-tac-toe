function gameBoard() {
  const rows = 3;
  const columns = 3;
  const board = [];

  const setBoard = () => {
    for (let i = 0; i < rows; i++) {
      board[i] = [];

      for (let j = 0; j < columns; j++) {
        board[i].push(null);
      }
    }
  };
  setBoard();

  const getBoard = () => board;

  const printBoard = () => {
    const printedBoard = board.map((row) =>
      row.map((column) => {
        if (column !== null) {
          return column;
        } else {
          return " ";
        }
      })
    );
    return printedBoard;
  };

  const addValue = (row, col, val) => {
    if (row > 2 || row < 0) return;
    if (col > 2 || col < 0) return;
    if (val !== "X" && val !== "O") return;

    board[row][col] = val;
  };

  const checkWin = (val) => {
    for (let row = 0; row < 3; row++) {
      if (
        board[row][0] === val &&
        board[row][1] === val &&
        board[row][2] === val
      ) {
        return true;
      }
    }

    for (let col = 0; col < 3; col++) {
      if (
        board[0][col] === val &&
        board[1][col] === val &&
        board[2][col] === val
      ) {
        return true;
      }
    }
    if (board[0][0] === val && board[1][1] === val && board[2][2] === val) {
      return true;
    }
    if (board[0][2] === val && board[1][1] === val && board[2][0] === val) {
      return true;
    }
    return false;
  };

  const checkDraw = () => {
    return board.flat().every((val) => val !== null);
  };

  const resetBoard = () => {
    board.length = 0;
    setBoard();
  };

  return {
    setBoard,
    getBoard,
    printBoard,
    resetBoard,
    addValue,
    checkWin,
    checkDraw,
  };
}

function gameplay(pone = "Player One", ptwo = "Player Two") {
  const board = gameBoard();
  let isGameOver = false;
  const players = [
    { name: pone, marker: "X" },
    { name: ptwo, marker: "O" },
  ];

  let activePlayer = players[0];

  const getActivePlayer = () => activePlayer;

  const switchTurn = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };

  const playRound = (row, col) => {
    board.addValue(row, col, activePlayer.marker);
    board.printBoard();
    if (board.checkWin(activePlayer.marker)) {
      console.log(`${activePlayer.name} wins!`);
      isGameOver = true;
    }
    if (board.checkDraw()) {
      console.log("This game is a draw.");
      isGameOver = true;
    }
    switchTurn();
  };

  return {
    playRound,
    board,
    getActivePlayer,
  };
}

function screenplay() {
  const message = document.querySelector(".message");
  const board = document.querySelector(".board");
  const resetButton = document.querySelector(".restart-btn");

  const game = gameplay();

  const renderBoard = () => {
    board.innerHTML = "";
    const currentBoard = game.board.getBoard();

    currentBoard.forEach((row, rowIndex) =>
      row.forEach((cell, colIndex) => {
        const cellElement = document.createElement("button");
        cellElement.classList.add("cell");
        cellElement.dataset.row = rowIndex;
        cellElement.dataset.col = colIndex;
        cellElement.textContent = cell || "";
        board.appendChild(cellElement);
      })
    );
  };

  function handleCellClick(e) {
    if (!e.target.classList.contains("cell")) return;

    let row = parseInt(e.target.dataset.row);
    let col = parseInt(e.target.dataset.col);
    const currentBoard = game.board.getBoard();
    if (currentBoard[row][col] !== null) return;
    game.playRound(row, col);
    renderBoard();
    updateMessage();

    if (
      game.board.checkWin("X") ||
      game.board.checkWin("O") ||
      game.board.checkDraw()
    ) {
      board.removeEventListener("click", handleCellClick);
    }
  }

  function updateMessage() {
    if (game.board.checkWin("X")) {
      message.textContent = "Player One Wins! Click restart to play again.";
      return;
    } else if (game.board.checkWin("O")) {
      message.textContent = "Player Two Wins! Click restart to play again.";
      return;
    } else if (game.board.checkDraw()) {
      message.textContent = "This game is a draw. Click restart to play again.";
      return;
    }
    message.textContent = game.getActivePlayer().name + "'s turn.";
  }

  function resetGame() {
    game.board.resetBoard();
    renderBoard();
    updateMessage();
    board.addEventListener("click", handleCellClick);
  }

  renderBoard();
  updateMessage();
  board.addEventListener("click", handleCellClick);
  resetButton.addEventListener("click", resetGame);
}

screenplay();
