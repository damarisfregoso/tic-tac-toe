
const LETTER_LOOKUP = {
  '1': 'X', 
  '-1': 'O', 
  'null': null,
}
const COLOR_LOOKUP = {
  '1': '#FFF3E5', 
  '-1': '#FFF3E5', 
  'null': null,
}

const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

let board;
let turn;
let winner;

const msgEl = document.querySelector('h1');
const playAgainBtn = document.querySelector('button');

document.getElementById('board').addEventListener('click', handleMove);
playAgainBtn.addEventListener('click', initialize);


initialize();

function initialize() {
  board = [null, null, null, null, null, null, null, null, null];
  turn = 1;
  winner = null;

render();
}

function handleMove(evt) {
  const idx = parseInt(evt.target.id.replace('sq-', ''));
  if (isNaN(idx) || board[idx] || winner) return;

  board[idx] = turn;
  turn *= -1;
  winner = getWinner();

  render();
}

function getWinner() {
  for (let i = 0; i < winningCombos.length; i++) {
    if (Math.abs(board[winningCombos[i][0]] + board[winningCombos[i][1]] + board[winningCombos[i][2]]) === 3) return board[winningCombos[i][0]];
  }
  if (board.includes(null)) return null;
  return 'T';
  }


function render() {
  renderBoard();
  renderMessage();
  renderControls();
}

function renderControls() {
  playAgainBtn.style.visibility = winner ? 'visible' : 'hidden';
}

function renderMessage() {
  if (winner === 'T') {
    msgEl.innerHTML = 'CATS GAME!';
  } else if (winner) {
    msgEl.innerHTML = `${LETTER_LOOKUP[winner]}'s takes it!`;
  } else {
    msgEl.innerHTML = `${LETTER_LOOKUP[turn]}'s turn!`
  }
}

function renderBoard() {
  board.forEach(function(sqrVal, idx) {
    const sqrEl = document.getElementById(`sq-${idx}`)
    sqrEl.innerHTML = LETTER_LOOKUP[sqrVal];
    sqrEl.style.backgroundColor = COLOR_LOOKUP[sqrVal];
  });
}