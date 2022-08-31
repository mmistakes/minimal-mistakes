---
layout: single
title: "[Web] 클론코딩"
categories: HTML/CSS[클론코딩]
tags: [HTML, 클론코딩]
toc: true

---

###  2022.08.31

유튜브를 통한 Starbucks 상단 대 메뉴 클론코딩

##### HTML코드 [index.html]

```HTML
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="format-detection" content="telephone=no">
    <title>Starbucks</title>
    <link rel="stylesheet" href="http://cdn.jsdelivr.net/npm/xeicon@2.3.3/xeicon.min.css">
    <link rel="stylesheet" href="/Starbucks/CSS/default.css">
    <link rel="stylesheet" href="/Starbucks/CSS/index.css">
</head>
<body>
    <header>
        <div>
            <h1><a href="https://www.starbucks.co.kr/index.do"><img src="/Starbucks/IMG/logo.png" alt="스타벅스 로고"></a></h1>
            <h2 class="hide">대메뉴</h2>
            <nav>
                <ul>
                    <li><a href="#a">COFFEE</a></li>
                    <li><a href="#a">MENU</a></li>
                    <li><a href="#a">STORE</a></li>
                    <li><a href="#a">RESPONSIBILITY</a></li>
                    <li><a href="#a">STARBUCKS REWARDS</a></li>
                    <li><a href="#a">WHAT'S NEW</a></li>
                    </ul>
            </nav>
                <ul class="spot">
                    <li><a href="#a">Sign In</a></li>
                    <li><a href="#a">My Starbucks</a></li>
                    <li><a href="#a">Customer Service &amp; Ideas</a></li>
                    <li><a href="#a">Find a Store</a></li>
                    <li><a href="#a">검색</a></li>
                </ul>
        </div>
    </header>
</body>
</html>
```

: 생각보다는 따라잡기 쉬웠던 HTML [ 링크 부분 처리 미완료 ]

##### CSS코드 [index.css]

```css
html {
  font-size: 20px;
}
body {
  font-size: 1rem;
}

header {
  background: #f6f5ef;
  border-top: 2px solid #000;
}
header > div {
  width: 54.5rem;
  margin: 0 auto;
  position: relative;
}

header > div::after {
  content: "";
  display: block;
  clear: both;
}

header > div h1 {
  float: left;
  padding: 1.1rem 0 1.2rem;
}

header > div nav {
  float: right;
  padding: 3.4rem;
}

header > div nav > ul > li {
  float: left;
}

header > div nav > ul > li > a {
  font-size: 0.7rem;
  color: #333;
  padding: 0.75rem 1.25rem;
  height: 2.65rem;
  display: block;
  line-height: 100%;
}

header > div .spot {
  position: absolute;
  right: 2.25rem;
  top: 1rem;
}

header > div .spot li {
  float: left;
  position: relative;
}

header > div .spot li a {
  font-size: 0.7rem;
  color: #333;
  padding: 0 0.75rem;
  line-height: 100%;
}

header > div .spot li ~ li a:after {
  content: "";
  position: absolute;
  left: 0;
  top: 50%;
  width: 1px;
  height: 0.6rem;
  background: #e5e5e5;
  transform: translateY(-25%);
}
header > div .spot li:last-child a:after {
  display: none;
}

header > div .spot li:last-child a {
  font-size: 0;
  color: transparent;
  width: 1.7rem;
  height: 1.7rem;
  text-align: center;
  line-height: 1.7rem;
  background: #fff;
  border: 1px solid #ccc;
  display: block;
  padding: 0%;
  border-radius: 0.25rem;
}

header > div .spot li:last-child a::before {
  content: "\e97a";
  font-family: "xeicon";
  font-size: 1.2rem;
  color: #000;
}
```

: 상속부분뿐만 아니라 CSS부분의 50% 정도를 이해하지 못하였기 때문에 하나씩 뜯어가면서 공부할 예정

##### CSS코드 [default.css]

```css
a:link {
  color: black;
}
a:hover {
  color: green;
}
a {
  text-decoration: none;
}
ul {
  list-style: none;
}
.hide {
  display: none;
}
```

: CSS 파일은 두가지로 나누어서 진행했다. 

<span style ='background-color:black;'>[유튜브 리베하얀님을 통한 클론코딩](https://www.youtube.com/watch?v=v_bxMmHQLLg&t=668s)</span>

##### 결과물 

###### Starbucks Korea Page

<img width="1367" alt="스크린샷 2022-08-31 21 01 39" src="https://user-images.githubusercontent.com/104547038/187674157-a89695ba-1b74-469d-98c1-be7c96abff46.png">

###### Starbucks MY Page

<img width="1354" alt="스크린샷 2022-08-31 21 01 57" src="https://user-images.githubusercontent.com/104547038/187674150-51e20620-08e8-4589-8f61-437a694309b0.png">