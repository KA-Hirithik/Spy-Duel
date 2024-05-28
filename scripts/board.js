export let spyGridTurn = "red";
export let redSpyGridsID = [];
export let blueSpyGridsID = [];

export let playerTurn;

let redTurnSets = 0;
let blueTurnSets = 0;

const redSpyOver = document.getElementById("redSpyOver");
const blueSpyOver = document.getElementById("blueSpyOver");

let spyPlaceTurn = "red";

const redSpySender = document.getElementById("redSpySender");
const blueSpySender = document.getElementById("blueSpySender");

let isRedSpySended = false;
let isBlueSpySended = false;

const redSkillBar = document.getElementById("redSkillBar");
const blueSkillBar = document.getElementById("blueSkillBar");

let redTurns = 0;
let blueTurns = 0;

let redSkill = 0;
let blueSkill = 0;

// let redTurn = 'moveSpy';
// let blueTurn = 'moveSpy';

let redCorrectSetTurns = [];
let blueCorrectSetTurns = [];

let redSetMoveCount;
let blueSetMoveCount;

let isRedGuessing = true;
let isBlueGuessing = true;

let isRedMoving = false;
let isBlueMoving = false;

redSpyOver.addEventListener("click", () => {
  spyPlaceTurn = "blue";
});
blueSpyOver.addEventListener("click", () => {
  spyPlaceTurn = undefined;
  playerTurn = "red";
  // console.log(playerTurn);
});

export function addRedSpy(event) {
  if (isRedMoving) {
    isRedGuessing = false;
    if (redTurns > 1) {
      const currentSpyGridId = event.target.id;
      const newId = currentSpyGridId.replace(
        /(\d+)-(\d+)/,
        (_, p1, p2) => `${p1 - 1}-${p2}`
      );
      const newRedSpyGrid = document.getElementById(newId);
      newRedSpyGrid.classList.add('spyImg');
      currentSpyGridId.classList.remove('spyImg');
    }
    isRedMoving = false;
    isRedGuessing = true;
  } else if (playerTurn === "blue") {
    if (isBlueGuessing) {
      if (isBlueSpySended) {
        if (blueCorrectSetTurns.length < 3) {
          if (redSpyGridsID.includes(event.target.id)) {
            // console.log('intersected', playerTurn);
            const spyIndex = redSpyGridsID.indexOf(event.target.id);
            redSpyGridsID.splice(spyIndex, 1);
            // console.log('removed', redSpyGridsID);
            blueCorrectSetTurns.push("correct");
            console.log(blueCorrectSetTurns);
          } else {
            blueCorrectSetTurns.push("wrong");
            console.log(blueCorrectSetTurns);
            // console.log(blueTurnSets);
          }
          if (blueCorrectSetTurns.length === 3) {
            playerTurn = "red";

            if (blueCorrectSetTurns[0] === "correct") {
              blueSkill += 3;
            }
            if (blueCorrectSetTurns[1] === "correct") {
              blueSkill += 2;
            }
            if (blueCorrectSetTurns[2] === "correct") {
              blueSkill += 1;
            }

            blueCorrectSetTurns = [];
            console.log(blueCorrectSetTurns);
            isBlueSpySended = !isBlueSpySended;
            blueSpySender.classList.remove("spyImg");
            // console.log('completed 3 sets', playerTurn);

            isRedMoving = true;
          }
        }
        return;
      }
    }
  } else if (spyGridTurn === "red") {
    if (redSpyContainer.children.length > 0) {
      const spyGridPiece = document.getElementById(event.target.id);
      if (!spyGridPiece.classList.contains("spyImg")) {
        spyGridPiece.classList.add("spyImg");
        redSpyGridsID.push(event.target.id);
        console.log(redSpyGridsID);
        // console.log(spyGridPiece);
        // spyImg blueGrids dashedBorderSpyGrid gridPiece
        const firstDiv = redSpyContainer.querySelector("div.spyImg");
        if (firstDiv) {
          firstDiv.classList.remove("spyImg", "dashedBorderSpyGrid");
        }
      } else {
        if (redSpyGridsID.includes(event.target.id)) {
          const index = redSpyGridsID.indexOf(event.target.id);
          redSpyGridsID.splice(index, 1);
          spyGridPiece.classList.remove("spyImg");
          redSpyContainer.innerHTML += `<div class="spyImg dashedBorderSpyGrid gridPiece"></div>`;
          console.log(redSpyGridsID);
        }
      }
    }
    if (redSpyGridsID.length === 5) {
      spyGridTurn = "blue";
      console.log("You have already placed all your spy");
    }
  }
}

export function addBlueSpy(event) {
  if (playerTurn === "red") {
    if (isRedGuessing) {
      if (isRedSpySended) {
        if (redCorrectSetTurns.length < 3) {
          if (blueSpyGridsID.includes(event.target.id)) {
            console.log("intersected", playerTurn);
            const spyIndex = blueSpyGridsID.indexOf(event.target.id);
            blueSpyGridsID.splice(spyIndex, 1);
            console.log("removed", blueSpyGridsID);
            redCorrectSetTurns.push("correct");
            console.log(redCorrectSetTurns);
            redTurnSets++;
            // console.log(redTurnSets, playerTurn);
          } else {
            redCorrectSetTurns.push("wrong");
            console.log(redCorrectSetTurns);
            redTurnSets++;
            // console.log(redTurnSets, playerTurn);
          }
        }
        if (redCorrectSetTurns.length === 3) {
          // const redSetScore = redCorrectSetTurns.filter(correct => correct === 'correct').length;
          // console.log(redSetScore);
          // redSkill += redSetScore;
          if (redCorrectSetTurns[0] === "correct") {
            redSkill += 3;
          }
          if (redCorrectSetTurns[1] === "correct") {
            redSkill += 2;
          }
          if (redCorrectSetTurns[2] === "correct") {
            redSkill += 1;
          }
          redCorrectSetTurns = [];
          console.log(redCorrectSetTurns);
          playerTurn = "blue";
          redTurnSets = 0;
          redTurns++

          isRedSpySended = !isRedSpySended;
          redSpySender.classList.remove("spyImg");
          // console.log('completed 3 sets', playerTurn);
        }

        return;
      }
    }
  } else if (spyGridTurn === "blue") {
    if (spyPlaceTurn === "blue") {
      if (blueSpyContainer.children.length > 0) {
        const spyGridPiece = document.getElementById(event.target.id);
        if (!spyGridPiece.classList.contains("spyImg")) {
          spyGridPiece.classList.add("spyImg");
          blueSpyGridsID.push(event.target.id);
          console.log(blueSpyGridsID);
          // console.log(spyGridPiece);
          const firstDiv = blueSpyContainer.querySelector("div.spyImg");
          if (firstDiv) {
            firstDiv.classList.remove("spyImg", "dashedBorderSpyGrid");
          }
        } else {
          if (blueSpyGridsID.includes(event.target.id)) {
            const index = blueSpyGridsID.indexOf(event.target.id);
            blueSpyGridsID.splice(index, 1);
            spyGridPiece.classList.remove("spyImg");
            blueSpyContainer.innerHTML += `<div class="spyImg dashedBorderSpyGrid gridPiece"></div>`;
            console.log(blueSpyGridsID);
          }
        }
      }
    }
  }
  if (blueSpyGridsID.length === 5) {
    spyGridTurn = undefined;
    console.log("You have already placed all your spy");
  }
}

export function board(gridCount) {
  // Add red player's grids
  for (let i = 0; i < gridCount; i++) {
    for (let j = 0; j < gridCount; j++) {
      const gridElement = document.createElement("div");
      gridElement.classList.add("redGrids", "gridPiece");
      gridElement.id = `redGrid-${i + 1}-${j + 1}`;
      gridElement.addEventListener("click", addRedSpy);
      redPlayerGrid.appendChild(gridElement);
    }
  }

  // Add blue player's grids
  for (let i = 0; i < gridCount; i++) {
    for (let j = 0; j < gridCount; j++) {
      const gridElement = document.createElement("div");
      gridElement.classList.add("blueGrids", "gridPiece");
      gridElement.id = `blueGrid-${i + 1}-${j + 1}`;
      gridElement.addEventListener("click", addBlueSpy);
      bluePlayerGrid.appendChild(gridElement);
    }
  }
}

// if (!isRedSpySended) {
//   console.log('true');
// }
// if (isRedSpySended) {
//   console.log('false');
// }

function constant() {
  if (playerTurn === "red") {
    if (isRedGuessing) {
      redSpySender.addEventListener("click", redSpySenderFunc);
    }
    if (isRedMoving) {
      redSpySender.removeEventListener("click", redSpySenderFunc);
    }
  } else {
    redSpySender.removeEventListener("click", redSpySenderFunc);
  }

  if (playerTurn === "blue") {
    blueSpySender.addEventListener("click", blueSpySenderFunc);
  } else {
    blueSpySender.removeEventListener("click", blueSpySenderFunc);
  }

  redSkillBar.innerHTML = redSkill;
  blueSkillBar.innerHTML = blueSkill;

}

const checkConstant = setInterval(constant, 1);

function redSpySenderFunc() {
  isRedSpySended = true;
  console.log(isRedSpySended);
  redSpySender.classList.add("spyImg");
}

function blueSpySenderFunc() {
  isBlueSpySended = true;
  console.log(isBlueSpySended);
  blueSpySender.classList.add("spyImg");
}
