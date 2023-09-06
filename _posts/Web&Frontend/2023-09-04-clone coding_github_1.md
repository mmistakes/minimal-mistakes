---
title: "clone coding_github"
escerpt: "HTML & CSS & JS"

categories:
  - Frontend
tags:
  - [Web, Frontend, Bootstrap, clone coding, github]

toc: true
toc_sticky: true

breadcrumbs: true

date: 2023-09-04
last_modified_at: 2023-09-04

comments: true


---

# Bootstarp 활용2

- favicon 설정
- bootstrap 연결
- google font 적용

```
(index.html)
<!-- 반응형구조 : 화면크기 확대/축소시에 따라 해당 요소들이 자동으로 확대/축소되는것. -->

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Github</title>

    <!-- 1. favicon : favorite icon : 즐겨찾기 아이콘 설정
    stylesheet은 css파일 가져오는경우
    icon : icon파일 가져오기-->
    <link rel="icon" href="./favicon.png">  

    <!-- 2. bootstrap 연결 -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-HwwvtgBNo3bZJJLYd8oVXjrBZt8cqVSpeBNS5n7C8IVInixGAoxmnlMuBnhbgrkm" crossorigin="anonymous"></script>

    <!-- 3. Google 폰트 적용 
    Poppins, 300/700 적용-->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;700&display=swap" rel="stylesheet">

    <link rel="stylesheet" href="./main.css">
</head>
<body>
    <button btn btn-success>Click</button>
</body>
</html>


(main.css)
body {
    /*4. 글꼴지정.
    body tag 밑에 해당 글꼴이 상속됨! 
    font-weight 기본을 300/700중에 300으로 선택함*/
    font-family: 'Poppins', sans-serif;
    font-weight: 300;

}

```
# 이미지 배치방법

- 웹에서 test해보기 좋은 사이트

[코드펜](https://codepen.io/)

* html은 위에서 아래로 코드가 만들어진다. 즉, 이미지가 그리고 그위에 작성되는 작업방식임을 이해할것.

1. flex 이용
2. position 이용

```
(html)
<div class="container">
    <div class="item"></div>
  </div>

(css)
.container {
    width: 300px;
    height: 150px;
    background-color : orange;
    position:relative;
  }
  .container .item  {
    width: 100px;
    height: 100px;
    background-color : royalblue;  
  /*   position:absolute; 
    top: 50%;
    left: 50%;
    transform:translate(-50%,-50%); */
  }
```

  - 배치하기
    - css속성에 position 이용
     : 배치하려는 요소의 position:absolute으로 아이템 배치하려고할때 아이템의 기준이 되는요소 즉,부모요소에는 position:relative 설정해줘야한다. 
    
    - transform
      : 배치는 왼쪽상단 기준으로 배치된다.가로세로절반을 가져와야 되는데 그걸 trasform:traslate(x,y)로 이동해주는 함수를 통해사용
      
  - opacity: 투명도 설정
  - overflow:hidden; : 부모요소 크기만큼 자식요소의 아이템이 잘려서 보인다.

# 반응형 적용하기

- @media (미디어규칙 = 미디어쿼리)
  미디어 규칙, 화면에 보여지는 뷰포트의 크기를 미디어 규칙이 판단하여 그 크기에 맞게 css 내용을 변화시켜줄수 있다.
```
(html)
<div class="box"></div>

(css)
.box {
  width:200px; 
  height:100px;
  background-color: royalblue;
  transition: 1s;
}
@media all and (max-width: 600px) {
  .box{
    background-color: orange;
    height:200px
  }
}
```

  - 미디어 규칙이 적용되는 시점은 뷰포트의 넓이가 최대 600px까지는 박스라는 클래스의 요소가 가진 배경색상을 orange로 하겠다는 의미  
  - 600px보다 작아지면 배경색상이 orange로 변하고 height도 100->200으로 변하게 된다.

  - max-width : 뷰포트의 가로넓이를 의미한다.
  - 즉, 뷰포트의 최대 가로넓이가 600px일때는 안에있는 내용들을 실행하겠다는 의미.
  - 즉 "이하" 라고 생각하면된다. 600px이하일떄 안에 있는 내용실행한다는 의미.

  - all : 모든 미디어에 해당 반응형 규칙을 적용하겠다는 의미
  - screen : 모든 화면
  - print : 웹페이지를 프린트할때 어떠한 규칙을 적용해서 프린트되게 할수 있다.
  - all and는 default이므로 굳이 안적어도 된다

  - transition : 1s 전환효과

# 반응형 column적용하기

[Layout참고사이트](https://getbootstrap.com/docs/5.3/layout/breakpoints/)

  - col-lg-7 col-sm-3 : (해석) 뷰포트가 992px보다 클때 column을 총 7개 사용하게됨, 992보다 작고 576보다 클 때는 3개의 column을 사용하게 반응형으로 바뀌게된다.


[맨 위로 이동하기](#){: .btn .btn--primary }{: .align-right}




