---
layout: single
title: "Playlist"
categories: HTML&CSS
tag:
  [
    HTML,
    CSS,
    blog,
    github,
    input,
    CSS,
    flex,
    flexbox,
    animation,
    transform,
    rotate,
    playlist,
    justify-content,
    align-items,
    속성,
    attribute,
    type,
    필수,
  ]
toc: true
sidebar:
  nav: "docs"
---

## 1. 구현화면

![playlist](https://user-images.githubusercontent.com/67591105/151466618-37efa194-05be-467c-81d6-7d7fda535c32.png)

## 2. HTML 코드

```python
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Repl.It</title>
  <script src="https://kit.fontawesome.com/3019ca2183.js" crossorigin="anonymous"></script>
  <link rel="stylesheet" href="style.css">
</head>
<body>
<div class="border">
  <div class="status-bar">
    <span class="x">X</span>
    <span class='text__playlist'>Playlist</span>
  </div>

  <header class="thumb-info">
    <div>
    <span class="thumb-icon">
        <i class="far fa-image"></i>
    </span>
  </div>
  <div>
    <span class="thumb title">Random Love</span>
    <span class="thumb-singer">by Divay Kapoor</span>
  </div>
  </header>


  <div class="command-icons">
    <span class="play-icon">
      <i class="fas fa-play"> Play</i>
    </span>
    <span class="icon heart">
      <i class="far fa-heart"></i>
    </span>
    <span class="icon plus">
      <i class="fas fa-plus"></i>
    </span>
  </div>

  <div class="songs-info">
    <div class="info">
        <span class="song-color"></span>
        <span class="song-title">Matargasti</span>
        <span class="song-singer">Mohit Chauhan</span>
    </div>

    <div class="info">
      <span class="song-color"></span>
      <span class="song-title">Attitude</span>
      <span class="song-singer">Lewis OfManㆍAttitude</span>
    </div>
    <div class="info">
      <span class="song-color"></span>
      <span class="song-title">Try Everything</span>
      <span class="song-singer">ShakiraㆍZootopia</span>
    </div>
    <div class="info">
      <span class="song-color"></span>
      <span class="song-title">Sunflower</span>
      <span class="song-singer">Joseph VincentㆍSunflower</span>
    </div>
  </div>
</div>
</body>
</html>
```

## 3. CSS

### 내용정리

```
1. div 가운데 위치시키기 (부모태그 body에 flex 적용)
  display: flex;				flex-direction: column;
  justify-content: center;		 align-items: center;

2. animation 만들기
- @keyframes {{}} 안의 내용은 코드 참고

3. 태그마다 따로 animation-delay 등으로 효과를 다채롭게 표현 가능
```

### 코드

```css
@import url("https://fonts.googleapis.com/css2?family=Jua&display=swap");

body {
  font-family: "Jua", sans-serif;
}
.border {
  padding: 30px 25px;
  width: 350px;
  height: 720px;
  border: teal solid 5px;
  border-radius: 30px;
}

.status-bar {
  display: flex;
  margin-bottom: 50px;
  font-size: 30px;
}

.x {
  width: 35%;
  margin-left: 15px;
}

.thumb-info {
  display: flex;
}

.thumb {
  padding-top: 5px;
  padding-left: 20px;
}

.thumb-icon {
  height: 120px;
  width: 120px;
  background-color: #ffbd11;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 15%;
  border: black solid 2px;
}

.fa-image {
  font-size: 35px;
  color: white;
}

.thumb.title {
  font-size: 35px;
}

.thumb-singer {
  padding-left: 20px;
  font-size: 20px;
}

.command-icons {
  margin: 50px 0;
  display: flex;
  justify-content: space-between;
}

.play-icon {
  width: 150px;
  height: 50px;
  border: black solid 2px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  box-shadow: 2px 3px;
}

.icon {
  margin-right: 10px;
  width: 50px;
  height: 50px;
  border: black solid 2px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  box-shadow: 2px 3px;
}

.info {
  display: flex;
  flex-direction: column;
  position: relative;
  justify-content: space-around;
  margin-bottom: 40px;
}

.song-color {
  width: 50px;
  height: 50px;
  border-radius: 10px;
  border: black solid 2px;
  /* display: flex; */
}

.song-title {
  position: absolute;
  margin-left: 70px;
  margin-right: 50px;
  margin-bottom: 15px;
  font-size: 25px;
}

.song-singer {
  position: absolute;
  margin-top: 40px;
  margin-left: 70px;
  margin-bottom: 15px;
  font-size: 15px;
}

.info:nth-child(1) .song-color {
  background-color: tomato;
}

.info:nth-child(2) .song-color {
  background-color: palevioletred;
}

.info:nth-child(3) .song-color {
  background-color: oldlace;
}

.info:nth-child(4) .song-color {
  background-color: teal;
}
```
