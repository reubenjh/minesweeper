document.addEventListener('DOMContentLoaded', startGame)

// Define your `board` object here!
var board = {
  /* comment muting manual board setup

  cells: [
    {
      row:0,
      col:0,
      isMine:false,
      isMarked:false,
      hidden:true
    }, 
    {
      row:0,
      col:1,
      isMine:false,
      isMarked:false,
      hidden:true
    },
    {
      row:0,
      col:2,
      isMine:false,
      isMarked:false,
      hidden:true
    },
    {
      row:1,
      col:0,
      isMine:false,
      isMarked:false,
      hidden:true
    }, 
    {
      row:1,
      col:1,
      isMine:true,
      isMarked:false,
      hidden:true
    },
    {
      row:1,
      col:2,
      isMine:false,
      isMarked:false,
      hidden:true
    },
    {
      row:2,
      col:0,
      isMine:false,
      isMarked:false,
      hidden:true
    },
    {
      row:2,
      col:1,
      isMine:false,
      isMarked:false,
      hidden:true
    },
    {
      row:2,
      col:2,
      isMine:false,
      isMarked:false,
      hidden:true
    }
  ]
  */
};

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
  // Only works up to width * 5 since that's all I needed. 
  for (cell = 0; cell < board.cells.length; cell++) {
    if (cell == board.width || cell == (board.width * 2) || cell == (board.width * 3) || cell == (board.width * 4) || cell == (board.width * 5)) {
      myRow++;
      myCol = myCol - board.width;
    }

    board.cells[cell].row = myRow;
    board.cells[cell].col = myCol;
    console.log('the current cell is ' + board.cells[cell])
    myCol++;
  }

  // Looping through cell objects and assigning hidden, isMine and isMarked
  // properties.
  for (cell = 0; cell < board.cells.length; cell++) {
    board.cells[cell].hidden = true;
    board.cells[cell].isMine = true;
    board.cells[cell].isMarked = false;
  }



}



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

