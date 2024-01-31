---
layout: single
title: "Mine Sweeper First Step"
categories: project
tags: [javaScript, game]
author_profile: false
search: true
---

### Initialize

#### create the game board

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

#### Set mines at random positions

```javascript
function setMinePositions(mineNum, totalCells) {
  minePositions = [];

  while (minePositions.length < mineNum) {
    const randomPosition = Math.floor(Math.random() * totalCells);
    if (!minePositions.includes(randomPosition)) {
      minePositions.push(randomPosition);
    }
  }
}
```
