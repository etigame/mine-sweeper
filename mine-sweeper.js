'use strict'

const MINE = '💣'
const FLAG = '🚩'

var gBoard


var gLevel = {
  SIZE: 4,
  MINES: 2,
}

// var gGame = {
//     isOn: false,
//     shownCount: 0,
//     markedCount: 0,
//     secsPassed: 0
// }

function initGame() {
  gBoard = buildBoard()
  renderBoard()
}

function buildBoard() {
  var board = []

  for (var i = 0; i < gLevel.SIZE; i++) {
    board[i] = []
    for (var j = 0; j < gLevel.SIZE; j++) {
      var cell = {
        location: {i, j},
        minesAroundCount: setMinesNegsCount(board),
        isShown: true,
        isMine: false,
        isMarked: false,
        gameElement: ''
      }
      board[i][j] = cell
    }    
}

board[3][2].isShown = true
board[3][2].isMine = true
board[3][2].gameElement = MINE

board[1][0].isShown = true
board[1][0].isMine = true
board[1][0].gameElement = MINE

  // Set mines at random locations

  return board
}

function renderBoard() {
  var strHTML = ''

  for (var i = 0; i < gBoard.length; i++) {
    strHTML += '\n<tr>\n'

    for (var j = 0; j < gBoard[0].length; j++) {
      var cell = gBoard[i][j]

      var className = cell.minesAroundCount
        ? `mines-around-${cell.minesAroundCount} `
        : 'mines-around-0'
      if (cell.isShown) className += 'shown '
      if (cell.isMine) className += 'mine '
      if (cell.isMarked) className += 'marked'

      strHTML += `\t<td class="cell ${className}" onclick="cellClicked(this, ${i}, ${j})">${cell.gameElement}</td>\n`
    }
    strHTML += '</tr>'
  }

  var elBoard = document.querySelector('.game-board')
  elBoard.innerHTML = strHTML
}

//location like {i: 2, j: 9}
function setMinesNegsCount(board) {
  var countMinesAroundCell = 0

  for (var i = 0; i < board.length; i++) {
    for (var j = 0; j < board[0].length; j++) {
        var currCell = board[i][j] 
        var currIdxI = i
        var currIdxJ = j

        if (currCell.isMine === true) continue

        for (var i = currIdxI - 1; i <= currIdxI + 1; i++) {
            if (i < 0 || i >= board.length) continue

            for (var j = currIdxJ - 1; j <= currIdxJ + 1; j++) {
                if (j < 0 || j >= board[0].length) continue
                if (i === currIdxI && j === currIdxJ) continue

                if (board[i][j].isMine === true) countMinesAroundCell++
            }
        }
    }
  }

    return countMinesAroundCell
    // Count mines around each cell and set the cell's minesAroundCount
}


function cellClicked(elCell, i, j) {
  //Called when a cell (td) is clicked
}

function cellMarked(elCell) {
  // Called on right click to mark a cell (suspected to be a mine)
  // Search the web (and implement) how to hide the context menu on right click
}

function checkGameOver() {
  // Game ends when all mines are marked, and all the other cells are shown
}

function expandShown(board, elCell, i, j) {
  // When user clicks a cell with no mines around, we need to open not only that cell, but also its neighbors.
  // NOTE: start with a basic implementation that only opens the non-mine 1st degree neighbors
  // BONUS: if you have the time later, try to work more like the real algorithm (see description at the Bonuses section below)
}
