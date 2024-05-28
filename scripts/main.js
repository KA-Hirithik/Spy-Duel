import { board, redSpyGridsID, blueSpyGridsID, spyGridTurn, playerTurn  } from "./board.js";

const redPlayerGrid = document.getElementById('redPlayerGrid');
const bluePlayerGrid = document.getElementById('bluePlayerGrid');
const redSpyContainer = document.getElementById('redSpyContainer');
const blueSpyContainer = document.getElementById('blueSpyContainer');

const redSpyOver = document.getElementById('redSpyOver');
const blueSpyOver = document.getElementById('blueSpyOver');

redSpyOver.addEventListener('click', () => {
  clearInterval(redSpyBtn);
  redSpyOver.style.visibility = 'hidden'
  checkSpyTurn();
});
blueSpyOver.addEventListener('click', () => {
  clearInterval(blueSpyBtn);
  redSpyOver.style.visibility = 'hidden';
  blueSpyOver.style.visibility = 'hidden';
  checkSpyTurn();
});

board(10);

function checkSpyTurn() {
  if (spyGridTurn === 'blue') {
    const redSpyImages = redPlayerGrid.querySelectorAll('.spyImg');
    redSpyImages.forEach(img => img.classList.remove('spyImg'));


  } else if (spyGridTurn === undefined) {
    const redSpyImages = redPlayerGrid.querySelectorAll('.spyImg');
    redSpyImages.forEach(img => img.classList.remove('spyImg'));
    const blueSpyImages = bluePlayerGrid.querySelectorAll('.spyImg');
    blueSpyImages.forEach(img => img.classList.remove('spyImg'));
  }
}

function checkRedSpyOver() {
  if (redSpyGridsID.length === 5) {
    redSpyOver.style.visibility = 'visible';
  } else {
    redSpyOver.style.visibility = 'hidden';
  }
}

function checkBlueSpyOver() {
  if (blueSpyGridsID.length === 5) {
    blueSpyOver.style.visibility = 'visible';
  } else {
    blueSpyOver.style.visibility = 'hidden';
  }
}

const redSpyBtn = setInterval(checkRedSpyOver, 1);
const blueSpyBtn = setInterval(checkBlueSpyOver, 1);

