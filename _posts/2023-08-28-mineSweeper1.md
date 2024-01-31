---
layout: single
title: "Mine Sweeper First Step"
categories: project
tags: [html, css, javaScript]
author_profile: false
search: true
---

### Initialize

#### create start buttons

Create the game board container and add buttons to choose the difficulty

```html
<div id="gameBoard">
  <div class="levelBox">
    <button onclick="easyGame()">Beginner</button>
    <button onclick="midGame()">Intermediate</button>
    <button onclick="hardGame()">Expert</button>
    <button onclick="chalGame()">Challenge</button>
  </div>
</div>
```

#### create the board

Once the button is clicked, the board is re-assigned so that the buttons are gone and board is created.

```javascript
function makeBoard(rowNum, colNum) {
  let tableEle = "";
  tableEle += "<table>";

  for (let i = 0; i < colNum; i++) {
    tableEle += "<tr>";
    for (let j = 0; j < rowNum; j++) {
      tableEle += "<td></td>";
    }
    tableEle += "</tr>";
  }
  tableEle += "</table>";
  document.getElementById("gameBoard").innerHTML = tableEle;
}
```

#### Set mines

Set mines at random positions

```javascript
let minePositions = [];

function setMinePositions(mineNum, totalCells) {
  while (minePositions.length < mineNum) {
    const randomPosition = Math.floor(Math.random() * totalCells);
    if (!minePositions.includes(randomPosition)) {
      minePositions.push(randomPosition);
    }
  }
}
```

#### display mines

display mines on the board

```javascript
let isGameOver = false;
function displayMinesOnBoard(rowNum, colNum, mineNum) {
  const cells = document.querySelectorAll("#gameBoard td");
  cells.forEach((cell, index) => {
    const row = Math.floor(index / rowNum);
    const col = index % rowNum;

    if (minePositions.includes(index)) {
      cell.classList.add("mine");
    }

    cell.addEventListener("click", () => {
      if (isGameOver) {
        return;
      } else {
        cell.style.backgroundColor = "rgb(30, 44, 90)";
      }
      if (!minePositions.includes(index)) {
        cell.classList.add("open");
        checkWin(rowNum, colNum);
      }
    });
  });
}

// Check for win condition
function checkWin(rowNum, colNum) {
  const cells = document.querySelectorAll("#gameBoard td");
  let remainingSafeCells = 0;

  cells.forEach((cell, index) => {
    if (!minePositions.includes(index) && !cell.classList.contains("open")) {
      remainingSafeCells++;
    }
  });

  if (remainingSafeCells === 0) {
    isGameOver = true;
  }
}
```

#### update remaining mines

Check the remaining mines in the board and update

```javascript
function updateRemainingMinesCount(mineNum) {
  const flaggedCount = flaggedCells.length;
  const remainingMines = mineNum - flaggedCount;
  document.getElementById(
    "remainingMines"
  ).textContent = `Remaining Mines: ${remainingMines}`;
}
```

#### onClick functions

initialize functions by difficulty

```javascript
function easyGame() {
  const row = 10;
  const col = 10;
  const mineNum = 9;
  checkGame = 1;
  isStarted = true;
  makeBoard(row, col);
  setMinePositions(mineNum, row * col);
  displayMinesOnBoard(row, col, mineNum);
  updateRemainingMinesCount(mineNum);
}

function midGame() {
  const row = 16;
  const col = 16;
  const mineNum = 40;
  checkGame = 2;
  isStarted = true;
  makeBoard(row, col);
  setMinePositions(mineNum, row * col);
  displayMinesOnBoard(row, col, mineNum);
  updateRemainingMinesCount(mineNum);
}
.
.
.
```
