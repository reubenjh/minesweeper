document.addEventListener('DOMContentLoaded', startGame)

// Define your `board` object here!
var board = {};

function startGame () {
  // Don't remove this function call: it makes the game work!
  // calling makeBoard first to generate the contents of the board object.
  makeBoard ()

  for (var i = 0; i < board.cells.length; i++) {
    var surroundingMines = countSurroundingMines(board.cells[i]);
    board.cells[i].surroundingMines = surroundingMines;
  }

  document.addEventListener('click', checkForWin);
  document.addEventListener('contextmenu', checkForWin);

  lib.initBoard()
}

// Define this function to look for a win condition:
//
// 1. Are all of the cells that are NOT mines visible?
// 2. Are all of the mines marked?
function checkForWin () {
  for (i = 0; i < board.cells.length; i++) {
    if (board.cells[i].isMine == false && board.cells[i].hidden == true) {
      return;
    }

    if (board.cells[i].isMine == true && board.cells[i].isMarked == false) {
      return;
    }
  }
  
  // You can use this function call to declare a winner (once you've
  // detected that they've won, that is!)
  lib.displayMessage('You win!')
}


// Defining makeBoard
function makeBoard () {
  // Reinitializing board to be empty
  board = {};

  // Setting board size
  board.width = 5;
  board.height = 5;
  board.area = board.width * board.height;
  
  // Setting board cells
  board.cells = [];
  for (cell = 0; cell < board.area; cell++) {
    board.cells.push({});
  }

  // Initializing row and col variables
  let myRow = 0;
  let myCol = 0;

  // Looping through cell objects and assigning row and col properties.
  // Only works up to width * 8 since I don't want the board to go any bigger
  for (cell = 0; cell < board.cells.length; cell++) {
    if (cell == board.width || cell == (board.width * 2) || cell == (board.width * 3) || cell == (board.width * 4) || cell == (board.width * 5) || cell == (board.width * 6) || cell == (board.width * 7) || cell == (board.width * 8)) {
      myRow++;
      myCol = myCol - board.width;
    }

    board.cells[cell].row = myRow;
    board.cells[cell].col = myCol;
    myCol++;
  }

  // Looping through cell objects and assigning hidden and isMarked
  // properties.
  for (cell = 0; cell < board.cells.length; cell++) {
    board.cells[cell].hidden = true;
    board.cells[cell].isMarked = false;

  // Assigning isMine = true to 30% of cells.
    let mineChance = Math.floor(Math.random() * 100)
    if (mineChance >= 70) {
      board.cells[cell].isMine = true;
    } else {
      board.cells[cell].isMine = false;
    }
  }
}


/* TRYING TO DEFINE MY FUNCTION TO RESET THE BOARD THE SAME SIZE.
CAN'T MAKE IT WORK DAMMIT!!!

      // Defining makeSameBoard function
      function makeSameBoard () {
        // Delete the old board
        document.getElementById('message').innerHTML = "";
        document.getElementById('notes').innerHTML = "";
        document.getElementsByClassName('board'[0]).innerHTML = "";
        document.getElementById('play-again').innerHTML = "";

        // Setting board size
        let newBoardWidth = board.width;
        let newBoardHeight = board.height;
        board = {};
        board.width = newBoardWidth;
        board.height = newBoardHeight;
        board.area = board.width * board.height;
        
        // Setting board cells
        board.cells = [];
        for (cell = 0; cell < board.area; cell++) {
          board.cells.push({});
        }

        // Initializing row and col variables
        let myRow = 0;
        let myCol = 0;

        // Looping through cell objects and assigning row and col properties.
        // Only works up to width * 8 since I don't want the board to go any bigger
        for (cell = 0; cell < board.cells.length; cell++) {
          if (cell == board.width || cell == (board.width * 2) || cell == (board.width * 3) || cell == (board.width * 4) || cell == (board.width * 5) || cell == (board.width * 6) || cell == (board.width * 7) || cell == (board.width * 8)) {
            myRow++;
            myCol = myCol - board.width;
          }

          board.cells[cell].row = myRow;
          board.cells[cell].col = myCol;
          myCol++;
        }

        // Looping through cell objects and assigning hidden and isMarked
        // properties.
        for (cell = 0; cell < board.cells.length; cell++) {
          board.cells[cell].hidden = true;
          board.cells[cell].isMarked = false;

        // Assigning isMine = true to 30% of cells.
          let mineChance = Math.floor(Math.random() * 100)
          if (mineChance >= 70) {
            board.cells[cell].isMine = true;
          } else {
            board.cells[cell].isMine = false;
          }
        }

        for (var i = 0; i < board.cells.length; i++) {
          var surroundingMines = countSurroundingMines(board.cells[i]);
          board.cells[i].surroundingMines = surroundingMines;
        }

        document.addEventListener('click', checkForWin);
        document.addEventListener('contextmenu', checkForWin);

        lib.initBoard()
      }
*/




// Define this function to count the number of mines around the cell
// (there could be as many as 8). You don't have to get the surrounding
// cells yourself! Just use `lib.getSurroundingCells`: 
//
//   var surrounding = lib.getSurroundingCells(cell.row, cell.col)
//
// It will return cell objects in an array. You should loop through 
// them, counting the number of times `cell.isMine` is true.
function countSurroundingMines (cell) {
  var surroundingCells = lib.getSurroundingCells(cell.row, cell.col);
  var count = 0;
  for (var i = 0; i < surroundingCells.length; i++) {
    if (surroundingCells[i].isMine == true) {
      count++;
    } else count = count;
  }
  return count;
}

