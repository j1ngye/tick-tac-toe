# tick-tac-toe

/\*
Tic Tac Toe Game Module

INITIALIZATION:
Create gameBoard as an empty array
Create setBoard function:
FOR i from 0 to 2:
Push a new array to gameBoard
FOR j from 0 to 2:
Push null to the inner array
Call setBoard to initialize

FUNCTIONS:

getBoard():
RETURN gameBoard

addToken(row, col, token):
IF row OR col is not between 0-2 OR
gameBoard[row][col] is not null OR
token is not 'X' or 'O'
RETURN false

SET gameBoard[row][col] = token
RETURN true

checkWin(token):
// Check rows
FOR each row in gameBoard:
IF all three elements in row equal token
RETURN true

// Check columns
FOR col from 0 to 2:
IF gameBoard[0][col] equals token AND
gameBoard[1][col] equals token AND
gameBoard[2][col] equals token
RETURN true

// Check diagonals
IF gameBoard[0][0] equals token AND
gameBoard[1][1] equals token AND
gameBoard[2][2] equals token
RETURN true

IF gameBoard[0][2] equals token AND
gameBoard[1][1] equals token AND
gameBoard[2][0] equals token
RETURN true

RETURN false

checkDraw():
FOR each row in gameBoard:
FOR each cell in row:
IF cell is null
RETURN false
RETURN true

resetBoard():
SET gameBoard to empty array
CALL setBoard()

RETURN an object containing:
getBoard,
addToken,
checkWin,
checkDraw,
resetBoard
\*/
