---
layout: single
title: "Mine Sweeper Project Process_3"
categories: project
tags: [html, css, javaScript]
author_profile: false
search: true
---

### For mobile

#### Add toggle button

You cannot right-click on your mobile, so I added a toggle button for flag function

add div for button

```html
<div id="forMobile"></div>
```

button

```javascript
const toggleButton = document.createElement("button");
toggleButton.textContent = "🚩";
toggleButton.style.width = "50px";
toggleButton.style.height = "39px";
toggleButton.style.position = "relative";
toggleButton.style.bottom = "5px";
toggleButton.style.backgroundColor = "rgb(7, 19, 59)";
let isToggled = false;

document.getElementById("forMobile").appendChild(toggleButton);
```

button function

```javascript
toggleButton.addEventListener("click", function () {
  // 토글 상태 변경
  isToggled = !isToggled;

  // 토글 상태에 따라 버튼 텍스트 변경
  if (isToggled) {
    toggleButton.style.backgroundColor = "rgb(30, 44, 90)";
  } else {
    toggleButton.style.backgroundColor = "rgb(7, 19, 59)";
  }
});
```

### Reset

#### Add reset function

```javascript
let checkGame = 0; // to reset the game, need to know what game was chosen
                   // also need on initialization function

function reset() {
  document.getElementById("dizzy").style.zIndex = 1;
  document.getElementById("sunglasses").style.zIndex = 1;
  stopTimer();
  startTimer();
  isGameOver = false;
  if (checkGame === 1) {
    easyGame();
  } else if (checkGame === 2) {
    midGame();
  }
  .
  .
  .
}

```

[PLAY](https://henrychung-minesweeper.netlify.app)
