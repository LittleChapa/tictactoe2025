const boxes = document.querySelectorAll('#box');
const btnToReset = document.getElementById('button');
const resultOfGame = document.getElementById('result-of-game');

btnToReset.addEventListener('click', resetGame);
boxes.forEach((item) => {
  item.addEventListener('click', move);
});

resultOfGame.addEventListener('click', (e) => {
  resultOfGame.classList.remove('main__result-game_active');
});

let isX = true;
let isWin = false;
let isDraw = false;
const squareOfBoxesLength = Math.sqrt(boxes.length);

function resetGame() {
  isX = true;
  isWin = false;
  isDraw = false;
  resultOfGame.classList.remove('main__result-game_win-color');
  resultOfGame.classList.remove('main__result-game_draw-color');
  boxes.forEach((item) => {
    item.addEventListener('click', move);
    item.innerHTML = '';
  });
}

function move() {
  if (this.innerHTML || isWin || isDraw) return;
  if (isX) {
    this.innerHTML = 'X';
  } else {
    this.innerHTML = '0';
  }
  if (checkHorizontWin() || checkDiagonalWin() || checkVerticalWin()) {
    isWin = true;
    return win(isX);
  } else if (checkDraw()) {
    isDraw = true;
    return draw();
  }
  return (isX = !isX);
}

function checkHorizontWin() {
  for (let i = 0; i < boxes.length; i += squareOfBoxesLength) {
    if (
      boxes[i].innerHTML &&
      boxes[i].innerHTML == boxes[i + 1].innerHTML &&
      boxes[i].innerHTML == boxes[i + 2].innerHTML
    ) {
      return true;
    }
  }
  return false;
}

function checkVerticalWin() {
  for (let i = 0; i < squareOfBoxesLength; i++) {
    if (
      boxes[i].innerHTML &&
      boxes[i].innerHTML == boxes[i + 3].innerHTML &&
      boxes[i].innerHTML == boxes[i + 6].innerHTML
    ) {
      return true;
    }
  }
  return false;
}

function checkDiagonalWin() {
  let winsPositions = [[], []];
  for (let i = 0; i < squareOfBoxesLength; i++) {
    winsPositions[0].push(boxes[(i + 1) * (squareOfBoxesLength - 1)]);
    winsPositions[1].push(boxes[i * (squareOfBoxesLength + 1)]);
  }
  return (
    winsPositions[0].every((item) => item.innerHTML === 'X') ||
    winsPositions[0].every((item) => item.innerHTML === '0') ||
    winsPositions[1].every((item) => item.innerHTML === 'X') ||
    winsPositions[1].every((item) => item.innerHTML === '0')
  );
}

function checkDraw() {
  for (let i = 0; i < boxes.length; i++) {
    if (!boxes[i].innerHTML) return;
  }
  if (!isWin) return true;
}

function win(isX) {
  boxes.forEach((item) => {
    item.removeEventListener('click', move);
  });
  if (isX) {
    resultOfGame.innerText = 'Победили X';
  } else {
    resultOfGame.innerText = 'Победили 0';
  }
  resultOfGame.classList.add('main__result-game_win-color');
  resultOfGame.classList.add('main__result-game_active');
}

function draw() {
  boxes.forEach((item) => {
    item.removeEventListener('click', move);
  });
  resultOfGame.innerText = 'Ничья';
  resultOfGame.classList.add('main__result-game_draw-color');
  resultOfGame.classList.add('main__result-game_active');
}
