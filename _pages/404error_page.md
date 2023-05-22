---
title: "Page not found"
excerpt: "Page not found. your pixels are is another canvas."
sitemap: false
permalink: /404.html
---


<html>
<head>
<style>
*{
  box-sizing: border-box;
    margin: 0;
    padding: 0;
}  
.container{
  position: relative;
  height: 100vh;
  background-color: white;
}  
.button {
  display: inline-block;
  padding: 10px 20px;
  background-color: white;
  color: #ffffff;
  text-decoration: none;
  border-radius: 4px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 10%;
  font-weight: bold;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  transition: all 0.5s;
  perspective: 1000px;
}
.button:hover {
  animation: spin 0.5s linear 1;
}
@keyframes spin {
  0% {
    transform: translateX(-50%) rotateY(0deg);
  }
  100% {
    transform: translateX(-50%) rotateY(360deg);
  }
}
a:link,
a:visited {
  color: #4c6fbf;
}
a:active,
a:hover,{
  color: blue;
}
.img_box{
    display: flex;
    justify-content: center;
    height:100%;
}
img{
    width: 100%;
    min-width: 755px;
    object-fit: contain;
    max-width: 1400px;
}
.masthead,
.page__footer{
  display: none;
}
</style>
</head>
<body>
<!-- 이미지 표현 코드 -->
  <div class="container"> 
  <div class="img_box">
    <img src="../../assets/img/404page.png" alt="404page(주소 없는 페이지) 입니다">
  </div>
  <!-- 홈으로 이동 버튼 -->
    <a href="https://byeongjunan.github.io/" class="button">홈으로 이동</a>
  </div>
</body>
</html>

