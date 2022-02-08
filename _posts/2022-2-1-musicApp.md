---
layout: single
title: "Music_App"
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

https://wltn39.github.io/playlist/

## 1. 구현화면

![image](https://user-images.githubusercontent.com/67591105/151953246-aa20e593-5fc1-4b93-93ea-b7f577587357.png)

## 2. HTML 코드

```python
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>You Are Awesome!</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reset-css@5.0.1/reset.min.css">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/FortAwesome/Font-Awesome@5.14.0/css/all.min.css">
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <!-- 한페이지에 2개 화면 구현 : section 활용 -->
  <section class="phone">
    <header>
      <i class="fas fa-arrow-left"></i>
      <i class="fas fa-search"></i>
    </header>
    <div class="artist">
      <img src="https://static.billboard.com/files/media/Tyler-The-Creator-press-by-Sam-Rock-2019-billboard-1548-1024x677.jpg" />
      <h2>Tyler, The Creator</h2>
      <h6>Rap, Hip-Hop</h6>
    </div>
    <!-- 버튼 구현 코드 -->
    <div class="btns">
      <span class="btns__btn">Shuffle</span>
      <span class="btns__btn"><i class="fas fa-heart"></i> 227</span>
    </div>
    <!-- 리스트는 ul, li로  -->
    <ul class="songs">
      <li class="songs__song">
        <div class="songs__data">
          <img src="https://imgix.ranker.com/user_node_img/50092/1001832784/original/flower-boy-photo-u1?w=650&q=50&fm=pjpg&fit=crop&crop=faces"/>
          <div>
            <span class="songs__author">
              Tyler, The Creator
            </span>
            <span class="songs__title">911</span>
          </div>
        </div>
        <i class="fas fa-ellipsis-v"></i>
      </li>
      <li class="songs__song">
        <div class="songs__data">
          <img src="https://imgix.ranker.com/user_node_img/50092/1001832784/original/flower-boy-photo-u1?w=650&q=50&fm=pjpg&fit=crop&crop=faces"/>
          <div>
            <span class="songs__author">
              Tyler, The Creator
            </span>
            <span class="songs__title">911</span>
          </div>
        </div>
        <i class="fas fa-ellipsis-v"></i>
      </li>
    </ul>
    <div class="currently-playing">
      <div>
        <span class="current__author">Tyler, The Creator</span>
        <span class="currnt__song">November</span>
      </div>
      <div class="currnt__player">
        <i class="fas fa-step-backward"></i>
        <!-- fa-2x : 아이콘 크기 2배로 -->
        <i class="fas fa-pause fa-2x"></i>
        <i class="fas fa-step-forward"></i>
      </div>
    </div>
  </section>

  <section class="phone">
    <header>
      <i class="fas fa-arrow-left"></i>
      <i class="fas fa-ellipsis-v"></i>
    </header>
    <div class="cover">
      <img src="https://imgix.ranker.com/user_node_img/50092/1001832784/original/flower-boy-photo-u1?w=650&q=50&fm=pjpg&fit=crop&crop=faces" />
    </div>
    <div class="player">
      <h4>November</h4>
      <h5>Tyler, The  Creator</h5>
    </div>
    <div class="progress">
      <div class="progress__time">
        <span>1:56</span>
        <span>2:21</span>
      </div>
      <!-- 2개의 div를 만들어 색을 구별지어 진행바 구현 -->
      <div class="progress__bar">
        <div class="progress__played"></div>
        <div class="progress__total"></div>
      </div>
    </div>
    <div class="actions">
      <i class="fas fa-redo"></i>
      <i class="fas fa-step-backward fa-lg"></i>
      <span>
        <i class="fas fa-play fa-lg"></i>
      </span>
        <i class="fas fa-step-forward fa-lg"></i>
        <i class="fas fa-random"></i>
    </div>
  </section>
</body>
</html>
```

## 3. CSS 코드

```css
@import url("https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap");

* {
  box-sizing: border-box;
}

body {
  background-color: #f7f7f7;
  padding: 20px;
  font-size: 14px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  color: #222222;
  font-family: "Nunito", sans-serif;
}

.phone {
  width: 320px;
  background-color: white;
  min-height: 60vh;
  border-radius: 30px;
  box-shadow: 0 19px 38px rgba(227, 226, 235, 0.3),
    0 15px 12px rgba(227, 226, 235, 0.2);
  position: relative;
  padding: 35px 25px;
}

header {
  display: flex;
  justify-content: space-between;
}

.artist {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 45px;
}

.artist img {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 30px;
  box-shadow: 0 19px 38px rgba(220, 195, 205, 0.2),
    0 15px 12px rgba(220, 195, 205, 0.3);
}

.artist h2 {
  font-size: 26px;
  font-weight: 700;
  margin-top: 10px;
}

.artist h6 {
  font-weight: 700;
  opacity: 0.8;
}

.btns {
  display: flex;
  justify-content: center;
}

.btns__btn {
  padding: 10px 25px;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.btns__btn:first-child {
  background-color: #222222;
  color: white;
  margin-right: 5px;
}

.btns__btn:last-child {
  box-shadow: 0 19px 38px rgba(220, 195, 205, 0.2),
    0 15px 12px rgba(220, 195, 205, 0.3);
  margin-left: 5px;
}

.btns__btn:last-child i {
  margin-right: 10px;
}

.songs {
  margin-top: 45px;
}

.songs__song,
.songs__data {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.songs__song {
  margin-bottom: 20px;
}

.songs__song img {
  width: 45px;
  height: 45px;
  margin-right: 10px;
  border-radius: 5px;
}

.songs__author {
  display: block;
  font-weight: 600;
  opacity: 0.6;
  margin-bottom: 5px;
  font-size: 12px;
}

.songs__title {
  font-size: 16px;
  font-weight: 700;
}

.currently-playing {
  margin-top: 30px;
  background-color: #222222;
  width: 95%;
  padding: 20px 30px;
  border-radius: 50px;
  box-shadow: 0 19px 38px rgba(34, 34, 34, 0.1),
    0 15px 12px rgba(34, 34, 34, 0.2);
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  right: 7px;
  bottom: 20px;
}

.current__author {
  display: block;
  opacity: 0.5;
  margin-bottom: 5px;
  font-size: 12px;
}

.current__song {
  font-weight: 600;
  text-transform: uppercase;
  font-size: 16px;
}

.current__player i:nth-child(2) {
  margin: 0 10px;
}

.cover {
  display: flex;
  justify-content: center;
  margin-top: 80px;
}

.cover img {
  width: 80%;
  border-radius: 15px;
  box-shadow: 0 19px 38px rgba(214, 42, 30, 0.1),
    0 15px 12px rgba(214, 42, 30, 0.2);
}

.player {
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.player h4 {
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 10px;
}

.player h5 {
  font-weight: 600;
  font-size: 16px;
  opacity: 0.5;
}

.progess {
  margin-top: 50px;
}

.progress__time {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  font-weight: 600;
  opacity: 0.5;
}

.progress__bar {
  position: relative;
  margin-top: 15px;
}

.progress__played {
  height: 4px;
  border-radius: 5px;
  background: #222222;
  width: 60%;
  position: absolute;
}

.progress__total {
  background-color: #e9e9e9;
  height: 4px;
  border-radius: 5px;
}

.progess__marker {
  height: 10px;
  width: 10px;
  background-color: #222222;
  border-radius: 50%;
  position: absolute;
  top: -3.5px;
  left: 58%;
}

.actions {
  display: flex;
  margin-top: 30px;
  align-items: center;
  justify-content: space-between;
}

.actions i:first-child,
.actions i:last-child {
  opacity: 0.5;
}

.actions span {
  background-color: #222222;
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  opacity: 1;
  box-shadow: 0 19px 38px rgba(34, 34, 34, 0.1),
    0 15px 12px rgba(34, 34, 34, 0.2);
}

.actions span i {
  color: white;
  opacity: 1 !important;
}

```
