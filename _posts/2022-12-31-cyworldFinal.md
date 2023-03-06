---
layout: single
title: "Cyworld Project Final"
categories: Project
tag: [HTML, CSS, JavaScript]
author_profile: false
---

## Jukebox page in Cyworld Project

Today, I finished the Cyworld project by combining all 3 pages that I made by creating a button that leads to those pages.
Interestingly, I made buttons not through ```<button>``` tag, but ```<div>``` tag.

### My code for today
I created a space with texts using div tag:
```html
<div class="navigation">
    <div class="navigation__item" id="menuHome" onclick="menuHome()">홈</div>
    <div class="navigation__item" id="menuJukebox" onclick="menuJukebox()">쥬크박스</div>
    <div class="navigation__item" id="menuGame" onclick="menuGame()">게임</div>
</div>
```
Writing ```onclick``` made it become a button.

And I designed those spaces to look like a page button and made it look like a button using CSS:
```css
.navigation {
    width: 62px;
    height: 100px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: absolute;
    left: 774px;
    top: 110px;
}

.navigation__item {
    width: 60px;
    height: 30px;
    background-color: #298eb5;
    border: 1px solid black;
    color: white;
    border-radius: 0px 10px 10px 0px;
    font-size: 10px;
    text-align: center;
    line-height: 30px;
    font-weight: 700;
    cursor: pointer
}
```
By writing ```cursor: pointer``` , I was able to change the design of the cursor to click on the button.

This is the JavaScript file for the page to move as I click on the buttons:
```javascript
const menuHome = () => {
    document.getElementById("contentFrame").setAttribute("src", "home.html")
    document.getElementById("menuHome").style = "color: black; background-color: white;"
    document.getElementById("menuJukebox").style = "color: white; background-color: #298eb5;"
    document.getElementById("menuGame").style = "color: white; background-color: #298eb5;"
}

const menuJukebox = () => {
    document.getElementById("contentFrame").setAttribute("src", "Jukebox.html")
    document.getElementById("menuJukebox").style = "color: black; background-color: white;"
    document.getElementById("menuHome").style = "color: white; background-color: #298eb5;"
    document.getElementById("menuGame").style = "color: white; background-color: #298eb5;"
}

const menuGame = () => {
    document.getElementById("contentFrame").setAttribute("src", "Game.html")
    document.getElementById("menuGame").style = "color: black; background-color: white;"
    document.getElementById("menuJukebox").style = "color: white; background-color: #298eb5;"
    document.getElementById("menuHome").style = "color: white; background-color: #298eb5;"
}
```
I used ```setAttribute()``` to change the default set of iframe, which was:
```html
<iframe id="contentFrame" src="./home.html"></iframe>
```

Cyworld Project was a good opportunity to learn how HTML, CSS, and JavaScript interact with each other to be a website.
Of course I need a lot more practice, but this project was a good to learn the basics of HTML, CSS, and JavaScript.