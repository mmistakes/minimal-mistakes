---
layout: single
title: "Script의 선언과 async와 defer의 차이점"
categories: javascript
tag: [javascript]
toc: true
toc_label: "포스트 목차"
toc_sticky: true
author_profile: false
sidebar:
  nav: "docs"
---
# 실행순서 이미지  
<br>
![실행순서 예시](https://i.stack.imgur.com/OovG7.png)  
<br>  

# 자바스크립트 사용 선언  
<br>
<small>*스크립트 선언방식 = '<script></script>'*</small>
우리가 자바스크립트를 사용을 선언할 때에, 보통 그 위치를  
body나 head에 선언하고 사용하게 된다.  
이 때, head에 선언하느냐 body에 선언하느냐에 따라서  
자바스크립트가 다운로드 돼고, 사용되는 순서가 바뀐다.  
<small>*컴퓨터는 html을 위에서 아래로 읽어내리기 때문에,  
당연하다.*</small>  
또한 자바스크립트 에는 asnyc와 defer라는 옵션을 주어  
보다 다양한 선언방법을 만들어 놓았다.  
우리는 이를 이용하여, 보다 효과적인 개발이 가능하다.  
<br>

## head에 선언하는 경우  
<br>
```javascript
<html>
    <head>
        <script src = "main.js"></script>
    </head>
    <body>
    </body>
```  
<br>  
위와 같이 head에 선언하게 되면,  
컴퓨터는 html파일을 읽어내리다  
script 태그를 만나면 html파일의 작업을  
중단하고 Script먼저 다운로드 받고, 실행 시킨 후에  
나머지 html파일의 작업을 실행한다.  
<br>
이 경우, JavaScript파일이 어마어마하게 크거나  
이용자의 PC 환경이 안좋은 경우,  
사용자가 웹사이트를 만나는데  
많은 시간이 소요될 수 있다.  
<br>

## body에 선언하는 경우  
<br>
```javascript
<html>
    <head>
    </head>
    <body>
        <script src = "main.js"></script>
    </body>
```  
<br>
다음으로 많이 사용되는 방법이다.  
body에 선언하는 방법으로, 확실히 이렇게 되면  
html파일을 먼저 다운로드 받고 그 후에 Script를  
다운로드 후 실행시킨다.  
<br>
하지만, 사용자가 HTML과 CSS의 태그를 빨리 만나기만 할 뿐  
만약 JavaScript의 의존도가 높은 웹사이트라면,  
당연히 정상적으로 작동할리 없다.  
<br>

## head + async로 선언하는 경우  
<br>
```javascript
<html>
    <head>
        <script asyn src = "main.js"></script>
    </head>
    <body>
    </body>
```  
<br>
우선 asyn 은 Boolean 타입으로, 기본값은 true로 정해져있다.  
Script 태그안에 asyn이 선언되면, 컴퓨터는 html을 다운로드  받으면서, 동시에 JavaScript파일도 동시에 다운로드 받는다.  
선언된 JavaScript파일이 여러개라면, 모두 병렬로 동시에  
다운로드 받아 속도를 증가시킬 수 있다.  
<br>
단, asyn은 다운로드가 끝나면 html을 중단하고  
Script를 먼저 실행시키게 된다. 그러므로 사용자는  
열악한 환경이라면,  
완성돼지 못한 웹사이트를 만날 수 도 있다.  
<br>

## head + defer로 선언하는 경우  
<br>
```javascript
<html>
    <head>
        <script defer src = "main.js"></script>
    </head>
    <body>
    </body>
```  
<br>
defer을 사용하게 되면 asyn과 마찬가지로 병렬로 다운 받은 후에,  
html파일을 마저 다운로드 받고, html작업이 종료되면  
Script내용을 실행시킨다.  
사용자는 미완성된 화면을 만날일이 없고,  
속도는 높일 수 있는 가장 좋은 방법이다.  
<br>
