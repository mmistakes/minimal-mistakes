---
layout: single
title: "Mine Sweeper Project Process_2"
categories: project
tags: [html, css, javaScript]
author_profile: false
search: true
---

### Add elements

#### Add flag function

To mark cells that have mine

```javascript
cell.addEventListener("contextmenu", (event) => {
  event.preventDefault(); // 우클릭 메뉴 띄우지 않도록 막음

  if (flaggedCells.includes(index)) {
    flaggedCells = flaggedCells.filter((item) => item !== index);
    cell.textContent = "";
  } else {
    flaggedCells.push(index);
    cell.textContent = "🚩"; // Show flag icon
  }
  updateRemainingMinesCount(mineNum);

  // to show remaining mines
  // also need to add initialization code
  function updateRemainingMinesCount(mineNum) {
    const flaggedCount = flaggedCells.length;
    const remainingMines = mineNum - flaggedCount;
    document.getElementById(
      "remainingMines"
    ).textContent = `Remaining Mines: ${remainingMines}`;
  }
});
```

#### Timer

To show how much time has passed

```javascript
function startTimer() {
  startTime = new Date().getTime();
  timerInterval = setInterval(updateTimer, 1000);
}

function updateTimer() {
  const currentTime = new Date().getTime();
  const elapsedTime = Math.floor((currentTime - startTime) / 1000);

  document.getElementById("timer").textContent = `Time: ${elapsedTime}`; // display
}

function stopTimer() {
  clearInterval(timerInterval);
}
```

#### Game over

If game is over, show all mines

```javascript
function displayAllMines() {
  const cells = document.querySelectorAll("#gameBoard td");
  cells.forEach((cell, index) => {
    if (minePositions.includes(index)) {
      cell.textContent = "💣"; // Show mine icon
    }
  });
}
```

#### Add flood algorithm

When cell is clicked, if there is no mine that surrounds, open multiple cells

```javascript
function openEmptyCells(row, col, rowNum, colNum) {
  if (row < 0 || row >= rowNum || col < 0 || col >= colNum) {
    return;
  }

  const index = row * colNum + col;
  const cell = document.querySelectorAll("#gameBoard td")[index];

  if (cell.classList.contains("open") || flaggedCells.includes(index)) {
    return;
  }

  cell.classList.add("open"); // 셀 열기
  cell.style.backgroundColor = "rgb(30, 44, 90)";
  const nearbyMines = countNearbyMines(row, col, rowNum, colNum);
  if (nearbyMines === 0) {
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        openEmptyCells(row + i, col + j, rowNum, colNum);
        // 주변 셀도 연쇄적으로 열기
      }
    }
  } else {
    cell.textContent = nearbyMines;
  }
}
```
