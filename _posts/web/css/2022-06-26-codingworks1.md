---
layout: single
title : "[CSS] 퍼블리싱 기초 season1"
categories: css
tag: [web, css]
toc : true
author_profile: false
sidebar:
    nav: "docs"
search: true
---

### CSS 퍼블리싱 교육내용 정리
> 기초내용 복습 및 정리

<br>

### 강의 내용 소개(코딩웍스 강사님)
이 포스팅은 인프런의 코딩웍스(Coding Works)강사님의 수업중 하나인 [실전 퍼블리싱1 내용](https://www.inflearn.com/course/%EC%9B%B9-%ED%8D%BC%EB%B8%94%EB%A6%AC%EC%8B%B1-%EC%9D%B4%EB%A1%A0-%EC%8B%A4%EC%A0%84#)을 통해서 배운 내용을 복습 및 다시한번 정리하기 위하여 작성하였습니다.

> 꼭 프론트엔드, 웹 퍼블리셔만 듣는게 아니라 WEB 관련 개발자라면 CSS기초를 다지는데 정말 좋은 강의라고 생각합니다. 

강의 가격이 저렴한데에(치킨 1~2마리?) 비해서 강의량과 퀄리티가 정말 좋다고 생각하며 백엔드쪽 공부위주로 해서 WEB 레이아웃이나 구조를 어떻게 만들어야 할지, 만들고 싶은것은 있는데 어떻게 표현해야할지 막막하신 분들에게 꼭 추천드리고 싶습니다. 

![img2](../../../images/_posts/css/cordingworks2.png)


> 사설이 길었는데 강의 내용을 수강하고 배운내용을 정리해보겠습니다.

<br>

#### 블록요소, 인라인요소
<br>

[가장 기초가 되면서 중요한 부분]

인라인요소(inline)
```
 - 한중에 여러개 배치
 - 기본 너비값은 컨텐츠의 너비값
 - 크기값을 가질 수 없음 X
 - 상하 마진은 가질 수 없음 X / 좌우 마진은 가질 수 있음 O
 
 ex) span, a, small, big, em, u, s, del, br, q, b, strong, mark, sub,sup, video, audio
```

블록요소(inline)
```
 - 한줄에 한개만 배치
 - 기본 너비값은 100%
 - 크기값을 가질 수 있음 O
 - 상하좌우 마진 가질 수 있음 O
 
 ex) div, table, figure, figcaption, cation, header, nav, footer, section, article,aside, p, blockquote, ul, ol, li, td, th, form, hr, h1 ~ h6
 ```

 인라인블록(inline-block) 요소
```
 - 한줄에 여러개 배치
 - 기본 너비값은 컨텐츠의 너비값
 - 크기값을 가질 수 있음 O
 - 상하 마진은 가질수 있음 O
 
 ex) img, input태그, button, fontawesome
```


#### 가로 배치하기(float, overflow, clear)

CSS 가로 배치하기(float, overflow, clear, inline-block, hidden)

CSS 포지셔닝 - 엘리먼트 수평 정렬하기 (속성 : float)

: float 속성은 요소가 부모요소 기준으로 왼쪽 또는 오른쪽에 배치할지 지정한다.
```
display : none; //아무것도 지정안함

display : float; //float 지정

float : left; //(왼쪽으로 배치 - inline,block요소 모두 가능)

margin : auto; //(가운데로 배치 - block요소만 가능 O / inline, inline-block X)

float : right; //(오른쪽으로 배치 - inline,block요소 모두 가능)
```
사람들이 보통 block이 왼쪽에 있으니까 float: left가 되어있는줄 알지만 실제로 float : none 상태이다.


``` HTML
<div class="parent">
<div class="child"></div>
</div>
.parent{
border : 5px solid red;
width : 600px;
}
.child{
background-color: gold;
width: 200px;
height: 200px;
float : left;
}
```

위 상태에서 아래와 같이 자식인 .child에 float 주면 부모는 높이값을 잃어버리게 된다.

만약에 .child 에 float를 주지않으면 .parent도 같이 height : 200px을 가지게 된다.

(float 뜻 : 둥둥뜬다. 자식요소가 붕 떠버리니까 부모가 봤을때 자식이 없네? 라고 생각한다.)
```
이렇게 사용할때 부모가 height를 가지게 하려면 

- 1. 강제로 .parent { height : 200px } 이렇게 주는법

- 2. .parent { overflow : hidden } 값을 준다. 

(자동으로 자식값의 높이를 찾아서 부모에 맞춰준다.!!!!!!!!!!!!!)
```
2번 방법을 쓰면 굳이 자식 높이를 정확히 구하지 않아도 되고 또 변경될때도 자동으로 맞춰주나까 자식에 float를 줄때 부모에는 overflow : hidden을 꼭 주자

```
<div class="parent">
<div class="child"></div>
</div>
.parent{
border : 5px solid red;
width : 600px;
}
.child{
background-color: gold;
width: 200px;
height: 200px;
display : inline-block; <--
/* float : left; */
margin : auto; <-- 
}
```
위 상태에서 자식인 child가 display : inline-block이고 가운데 정렬을 하고 싶은데 margin : auto를 주니까 동작하지 않는다.
```
Reason) inline-block의 경우 margin값을 가질수는 있지만 margin auto는 동작하지 않는다.

margin : auto를 사용하려면 무조건 diplay : block상태여야 한다.

이럴경우 .parent{ text-align : center; }를 사용해야지 자식(inline-block)을 가운데로 위치시킬수 있따.


text-align : center >> 자식요소인 인라인 요소들을 가운데로 위치시킨다.(block은 움직이지 않는다)

block이 자식이면 가운데 정렬할때 => margin : auto로 정렬
```

상속받은 float속성 해제하는 방법(clear)

float 속성이 적용되면 다음 요소가 float 속성을 상속 받는데 이것을 해제시킨다.

```
clear : left | right | both
- left : 왼쪽 float 속성 상속 해제
- right : 오른쪽 float 속성 상속 해제
- both : 양쪽 float 속성 상속 해제!! 가장 자주 사용됨
```

가로 배치 2가지 방법 : float , inline-block
(float , overflow, box-sizing & inline-block)

1) float 와 overflow를 사용해 배치
2) display : inline-block으로 배치
       
box-sizing
```
section{
    border : 5px solid black;
    width : 600px;
    overflow : hidden;
}
section article{
    background-color: gold;
    width: 200px;
    height: 100px;
    float: left;
}
```
여기까지만 하면 section 3개의 secction이 정상적으로 가로배열 되지만..

만약에 .article border : 1px solid red; 이렇게 주게된다면 

article => width + border ( 200px + 2px(좌 + 우) )이렇게 되어 1개의 article width = 202px

article이 3개이면 606px이다. 하지만 section(부모)의 width : 600px인데 이것을 초과하니까 2개는 위에 
있고 한개는 아래에 넘쳐서 배치가된다.

이럴경우 article의 width를 너비와 border가 합쳐서 200이 되면 되는데
```
이렇게 하기 위해서는 article { box-sizing : border-box; }를 넣어주면 된다.
```
> box-sizing : border-box !!!!!!! border Width 포함 계산

float vs inline-block 레이아웃 배치
1. 1px도 오차가 없이 정확하게 해야한다. float : left; clear : both 등 사용해서 레이아웃
2. 적당하게 맞추면 된다. inline-block

#### 시멘틱 태그 사용법

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        .container{
            border : 1px solid red;
            width : 1200px;
            margin : auto;
        }
        header{
            background-color: skyblue;
            overflow : hidden;
        }
        header article{
            background-color: gray;
            width: 300px;
            height: 100px;
        }
        .logo{
            float: left;
        }
        .navi{
            /*float: right;*/
        }


        .box1{
            background-color: yellowgreen;
            height: 300px;
        }
        .box2{
            background-color: greenyellow;
            border: 5px solid blue;
            overflow : hidden;
        }
        .box2 article{
            width: 33.3333333%;
            height: 300px;
            float : left;
        } 
        .sub1{
            background-color: darkgray;
        }
        .sub2{
            background-color: lightgray;
        }
        .sub3{
            background-color: lightslategray;
        }
        footer{
            background-color: skyblue;
            height: 100px;
        }       
    </style>
</head>
<body>
    <!--
        레이아웃을 잘만들면 자신이 생긴다!!! 

        레이아웃 설계하는 HTML5 시멘틱 태그 사용법 [계층구조]
        가장 상위의 컨테이너 : .container 또는 .wrapper [1] [div.container]
        문서의 주요 내용을 지정 : main [여기서는 안쓰임] 
        주제별 콘텐츠 영역 : section [2] [section]
        헤더 영역(로고, 메뉴, 로그, 검색 등) : header [2] [header]
        제작 정보 및 저작권 정보 표시 : footer [2] [footer]
        콘텐츠 내용 넣기 : article [2] [article]
        문서를 링크하는 탐색 영역 : nav [3]
        세부 사항 요소 : summary / 추가 세부 정보를 정의 : details

        !!!!! 핵심 !!!!
        공통적인 부분은 한곳에 뭉쳐주자.
        방금전에 sub1 , sub2 , sub3에 float : left를 각각 넣어두려고 했는데 강사님은
        공통부분인 box2 article{ float : left; } 이런식으로 한곳에만 넣어준다.

        즉, 공통으로 사용하는건 공통으로 넣어주자!!!
    -->

    <div class="container">
        <header>
            <article class="logo"></article>
            <article class="navi"></article>
        </header>
        <section class="box1"></section>
        <section class="box2">
            <article class="sub1"></article>
            <article class="sub2"></article>
            <article class="sub3"></article>
        </section>
        <footer></footer>
    </div>


</body>
</html>
```

#### 포지션 속성 이해하기
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        /* 부모요소 position : relative */
        /* 자식요소 position : absolute */

        .parent{
            background-color: dodgerblue;
            width: 600px;
            height: 300px;
            position: relative;
        }

        .child{
            background-color: crimson;
            width: 200px;
            height: 100px;
            position : absolute;
            right: 0;
            bottom: 0;
        }

        .center{
            background-color: crimson;
            width: 200px;
            height: 100px;
            position : absolute;
            top : 50%;
            left : 50%;
            transform: translate(-50%, -50%);
            /* transform : 변형하다 */
            /* translate : 번역하다, 이동하다 */
            /* transfrom : translate(-50%, -50%)는 자신의 크기의 -50% x축, y축 이동하라 */
        }
    </style>
</head>
<body>
    <div class="parent">
        <div class="child"></div>
        <div class="center"></div>
    </div>
    <!--
        CSS 포지셔닝 : 이것만 기억하면 OK (Postion : relative & absolute)
        Relative : 부모요소에 주는것
        Absolute : 자식요소에 주는것

        .parent{
            position : relative;
        }

        .child{
            position : absolute;
            right : 0;
            bottom : 0;
        }
        
        감싸고 있는게 부모
        감싸져 있는게 자식
    -->
</body>
</html>
```

#### 마우스 hover 사용법
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        body{
            background-color: #fff;
            color: #333;
            font-size: 15px;
        }
        a{
            color: #333;
            text-decoration: none;
            /* transition은 꼭 hover가 아닌곳에 넣어줘야 한다. 즉 a:hover가 아닌 a 태그에 넣어줘야한다.*/
            /* transition은 이벤트발생하는 효과가 걸리는 시간을 말한다. */
            transition : 0.5s;
            width: 120px;
            display: inline-block;
            text-align: center;
            padding: 5px;
            border-radius:5px
        }
        a:hover{
            color: #fff;
            background-color:#000;
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <a href="#none">법적고지</a>
    <a href="#none">개인정보취급방지</a>
    <a href="#none">개인정보처리방침</a>
    <!-- hover , transition -->
</body>
</html>

```

#### 가상클래스 nth-child, nth-of-type

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        .box{
            border : 5px solid #000;
        }
        .box div{
            border : 5px solid #000;
            margin : 10px;
            width : 200px;
            height: 200px;
            display: inline-block
        }
        /* 
        nth-child는 태그를 가리지 않는다.
        
        .box div:nth-child(1){
            background-color: dodgerblue;
        }
        .box div:nth-child(2){
            background-color: red;
        }
        .box div:nth-child(3){
            background-color: #fff;
        }
        .box div:nth-child(4){
            background-color: gold;
        }
        이렇게 사용하고 아래처럼 사용하는데 원래 h2가 없었는데 갑자기 생겨서 div가 하나씩 밀려나게 되었음. 
        div class="box">
            <h2>Headline Text</h2> <-- 신규로 추가
            <dic></dic>
            <dic></dic>
            <dic></dic>
            <dic></dic>
        </div>

        ** :nth-child(숫자)는 태그를 가리지 않고 순서를 매긴다. 즉 h2나 div, 다른 태그등 전체 갯수에서 숫자를 매기지만
           :nth-of-type(숫자)는 태그를 가린다. 즉 h2 1개, div가 4개 있어도 div:nth-of-type(숫자)를 하게 되면 div태그들 중에서 숫자를 매긴다.
           실제로 사용할 때는 nth-of-type 사용하자. 
        */
        .box div:nth-of-type(1){
            background-color: dodgerblue;
        }
        .box div:nth-of-type(2){
            background-color: red;
        }
        .box div:nth-of-type(3){
            background-color: #fff;
        }
        .box div:nth-of-type(4){
            background-color: gold;
        }
    </style>
</head>
<body>
    <div class="box">
        <h2>Headline Text</h2>
        <dic></dic>
        <dic></dic>
        <dic></dic>
        <dic></dic>
    </div>
</body>
</html>
```

#### 가상클래스 first-child, last-child
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        body{
            margin : 100px;
        }
        .tab{
            border : 1px solid #000;
            width: 400px;   
        }
        .tab a{
            display: block;
            color : #333;
            text-decoration: none;
            margin: 5px;
            border-bottom: 1px solid #000;
        }
        /* 
            :first-child , :last-child, :before, :after 는 뒤에 ()가 없다.
            :nth-child() , :nth-of-type() 는 뒤에 ()가 있고 숫자가 들어온다.
        */
        .tab a:last-child{
            border-bottom: none;
        }
        .btn span{
            background-color: #ddd;
            width: 120px;
            display: inline-block;
            text-align: center;
            padding: 5px;
            border-radius: 5px 5px 0 0;
            cursor : pointer;
            border : 1px solid #000;
            /* 
                inline-block의 경우 알수없는 Margin이 (5~6px) 정도 있음
                그래서 이거를 붙여주는게 필요하다.
                margin-right : -7px;
            */
            margin-right:-7px;
        }
        .btn span:first-child{
            background-color: #fff;
        }
        .btn span:last-child{
            color: red;
        }

    </style>
</head>
<body>
    <div class="tab-inner">
        <div class="btn">
            <span>공지사항</span>
            <span>갤러리</span>
        </div>
        <div class="tab">
            <a href="#none">SMS 발송 서비스 개선작업</a>
            <a href="#none">SMS 발송 서비스 개선작업</a>
            <a href="#none">SMS 발송 서비스 개선작업</a>
            <a href="#none">SMS 발송 서비스 개선작업</a>
            <a href="#none">SMS 발송 서비스 개선작업</a>
        </div>
    </div>
    
    
</body>
</html>
```

#### 제이쿼리 시작하기
```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="../JS/jquery-1.12.4.js"></script>
    <style>
        a {
            display: inline-block;
            color: #000;
            text-decoration: none;
            background-color: #ddd;
            text-align: center;
            padding: 5px;
        }

        div {
            background-color: dodgerblue;
            height: 200px;
            margin-top: 10px;
            width: 230px;
            color: #fff;
            text-align: center;
            line-height: 200px;
        }

        div.active {
            background-color: red;
        }

        .menu{
            padding: 0;
            list-style: none;
            width: 200px;
        }
         
        /* 
            .menu a{ bacgkroun-color :#000 } 이런식으로 하면 .menu클래스 아래에 있는 모든 a태그에 적용되지만
            나는 .menu클래스의 li태그 바로 밑에 있는 a태그만 지정하고 싶다. 
            그 하위에 있는것들은 건들고 싶지 않다. 하면
            .menu li > a{} 이렇게 사용하면 된다.(children 역할)
        */
        .menu li > a{
            background-color: #000;
            color: #fff;
            display : block;
            text-align: center;
            padding: 5px;
            border : 1px solid #000;
        }
        .sub-menu{
            border : 1px solid #000;
            display : none;
        }
        .sub-menu a{
            display : block;
            padding: 5px;
        }
    </style>
    <script>
        /* 
            $('선택자').함수(function(){
                실행구문;
            });
            
            $('.btn').click(function(){
                $('.modal').fadeIn();
            });

            선택자 종류
             - css 클래스 선택자
             - css 아이디 선택자
             - css 태그 선택자
             - this

            필수 함수 종류
             - click
             - mouseenter
             - mouseleave

             필수 메서드 종류
             - slideDown()
             - slideUp()
             - stop()
             - show()
             - hide()
             - fadeIn()
             - fadeOut()
             - addClass()
             - removeClass()
             - children()
             - siblings()
             - toggleClass()

             메서드(클래스 제어)
             - addClass()
             - removeClass()
             - toggleClass()

             메서드(요소 탐색)
             $('선택요소').메서드(); >> 선택요소 기준
             - .children() - 선택요소 기준으로 자식
             - .parent() - 선택요소 기준으로 부모
             - .siblings() - 선택요소 기준으로 형제
             - .find() - 선택요소 기준으로 자손요소!!
             - .next() - 선택요소 바로 다음에 있는 요소
             - .prev() - 선택요소 바로 이전에 있는 요소

             ** children vs find 
            - find : 자손요소(여기서는 div > div밑에 있는 span 태그를 찾는것) [바로 밑에 + 그아래에 있는것들]
            div span{
                >> <div>
                    <div>
                        <span></span>       
                    </div>
                    <p></p>
                   </div>
            }
            $('div').find('span') > div자손중에 span태그를 찾겠다.

            - children : 바로 밑에 있는 자식만 검색
        */



        $(document).ready(function () {

            //new ShowHideTag({'showBtn' : ".show-btn" , 'hideBtn' : ".hide-btn"}, 'p');

            $('p').css({
                'display': 'none'
            });
            $('.show-btn').click(function () {
                $('p').css({
                    'display': 'block'
                });
            });
            $('.hide-btn').click(function () {
                $('p').css({
                    'display': 'none'
                });
            })

            $('.show-btn1').click(function () {
                $('div').show();
            })

            $('.hide-btn1').click(function () {
                $('div').hide();
            })

            $('.mouse-btn1').mouseenter(function () {
                $('div').show();
            })

            $('.mouse-btn1').mouseleave(function () {
                $('div').hide();
            })

            $('.toggle-btn').click(function () {
                $('div').toggle();
            })

            $('.slide-down-btn1').click(function () {
                $('div').slideDown('fast');
            })
            $('.slide-up-btn1').click(function () {
                $('div').slideUp('slow');
            })
            $('.slide-toggle-btn').click(function () {
                $('div').slideToggle();
            })

            /*
                $(셀렉터).fadeIn(속도)
                $('slide-toggle-btn').fadeIn(); //기본속도
                $('slide-toggle-btn').fadeIn(500); //0.5초
                $('slide-toggle-btn').fadeIn('fast'); //빠르게
                $('slide-toggle-btn').fadeIn('slow'); //느리게
                $('slide-toggle-btn').fadeOut(3000); //3초
             */

            //addClass / removeClass / toggleClass
            $('.add-btn').click(function () {
                $('div.box').addClass('active');
            })
            $('.remove-btn').click(function () {
                $('div.box').removeClass('active');
            })
            $('.toggle-btn2').click(function () {
                $('div.box').toggleClass('active');
                /* 
                    TIP : .addClass('클래스명') <-- addClass / removeClass / toggleClass ()에 .클래스명이 아니라 그냥 클래스명만 적자
                    다른건 다 . # 이렇게 적던데 왜 저기는 .클래스명 이 아닌 그냥 클래스명일까?
                    그건 addClass 라고 뒤에 Class만 전용으로 사용하기 때문에 굳이 .(클래스)라고 알려줄 필요가 없기 때문
                    
                    만약에 $('div.box').children('.active') <-- 이렇게 별도로 클래스를 명시해주지 않는거는 .클래스명으로 써주던가 #아이디 쓰던가

                */
            })

            //$('선택요소').children() <-- 선택요소의 바로 아래 단계인 자식요소만 선택
            //$('선택요소').siblings() <-- 선택요소의 형제요소 선택
            //주로 네비게이션만드는데 사용된다.



        })
    </script>
</head>

<body>
    <a href="#none" class="show-btn">보이기</a>
    <a href="#none" class="hide-btn">감추기</a>
    <P>
        태그선택자 a를 클릭했습니다.
    </P>
    <br><br>

    <a href="#none" class="show-btn1">마우스 클릭 보이기</a>
    <a href="#none" class="hide-btn1">마우슨 클릭 감추기</a>
    <a href="#none" class="toggle-btn">마우스 토클 버튼</a>
    <a href="#none" class="mouse-btn1">마우스 리브 감추기</a>

    <a href="#none" class="slide-down-btn1">슬라이드 다운</a>
    <a href="#none" class="slide-up-btn1">슬라이드 업</a>
    <a href="#none" class="slide-toggle-btn">슬라이드 토글</a>

    <a href="#none" class="add-btn">addClass 버튼</a>
    <a href="#none" class="remove-btn">removeClass 버튼</a>
    <a href="#none" class="toggle-btn2">toggleClass 버튼</a>

    <div class="box">

    </div>

    <br>
    <br>
    <div>핵심 제이쿼리 요소탐색</div>
    <ul class="menu">
        <li>
            <a href="#none">MENU-1</a>
            <div class="sub-menu">
                <a href="#none">SUB-MENU-1</a>
                <a href="#none">SUB-MENU-2</a>
                <a href="#none">SUB-MENU-3</a>
                <a href="#none">SUB-MENU-4</a>
            </div>
        </li>
        <li>
            <a href="#none">MENU-2</a>
            <div class="sub-menu">
                <a href="#none">SUB-MENU-1</a>
                <a href="#none">SUB-MENU-2</a>
                <a href="#none">SUB-MENU-3</a>
                <a href="#none">SUB-MENU-4</a>
            </div>
        </li>
    </ul>
</body>

</html>
```

#### 제이쿼리 네비게이션 만들기
```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="../JS/jquery-1.12.4.js"></script>
    <style>

        .menu{
            padding: 0;
            list-style: none;
            width: 200px;
        }  
        /* 
            .menu a{ bacgkroun-color :#000 } 이런식으로 하면 .menu클래스 아래에 있는 모든 a태그에 적용되지만
            나는 .menu클래스의 li태그 바로 밑에 있는 a태그만 지정하고 싶다. 
            그 하위에 있는것들은 건들고 싶지 않다. 하면
            .menu li > a{} 이렇게 사용하면 된다.(children 역할)
        */
        .menu li > a{
            background-color: #000;
            color: #fff;
            display : block;
            text-align: center;
            padding: 5px;
            border : 1px solid #000;
        }
        .sub-menu{
            border : 1px solid #000;
            display : none;
        }
        .sub-menu a{
            display : block;
            padding: 5px;
        }
    </style>
    <script>
        $(document).ready(function(){
            $('.menu li').mouseenter(function(){
                //$(this)의 경우 현재 마우스 엔터 한 특정한 개체를 말한다.
                //만약 $(.sub-menu).slideDown()이렇게 하면 현재 .sub-menu가 두개가 있어서 
                //두개 모두 동시에 슬라이드 다운이 발생.. 
                //우리는 개별적으로 .menu li 했을때 해당하는 부분만 슬라이드 다운 효과 발생을 원함.
                //그럴때 $(this)를 사용하면 자신이 마우스엔터한 부분의 값만 가져올 수 있음.
                //위에 CSS적용할 때도 a태그에 display : none을 하면 안되는게 
                //현재 .menu li태그에서 children인(.submenu) 슬라이드 다운하는 개념!!
                
                //(.sub-menu).slideDown();
                //li 밑에 .sub-menu만 있는게 아니라 a태그도 있으니 그냥 children만 써주는게 아니라 .sub-menu를 써줘서 지정해준다.
                $(this).children('.sub-menu').stop().slideDown();
            })
            $('.menu li').mouseleave(function(){
                $(this).children('.sub-menu').stop().slideUp();
            })
            //.stop()을 안주면 이벤트 Queue에 계속 등록되어 있어서 반복되는 현상이 발생한다.
            //.stop()을 써주면 이 이벤트가 발생할때 그 전에 쌓인 QUEUE 에 등록된 이벤트를 다 지우고 깔끔하게 시작한다. 
        });
    </script>
</head>

<body>
    
    <div>핵심 제이쿼리 요소탐색</div>
    <ul class="menu">
        <li>
            <a href="#none">MENU-1</a>
            <div class="sub-menu">
                <a href="#none">SUB-MENU-1</a>
                <a href="#none">SUB-MENU-2</a>
                <a href="#none">SUB-MENU-3</a>
                <a href="#none">SUB-MENU-4</a>
            </div>
        </li>
        <li>
            <a href="#none">MENU-2</a>
            <div class="sub-menu">
                <a href="#none">SUB-MENU-1</a>
                <a href="#none">SUB-MENU-2</a>
                <a href="#none">SUB-MENU-3</a>
                <a href="#none">SUB-MENU-4</a>
            </div>
        </li>
    </ul>
</body>

</html>
```

#### 제이쿼리 네비게이션 만들기2
```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="../JS/jquery-1.12.4.js"></script>
    <style>
        .btn{
            width : 500px;
        }
        .btn span{
            background-color: #ccc;
            padding: 5px;
            width: 100px;
            display : inline-block;
            text-align : center;
            border-radius : 5px;
            cursor : pointer;
        }
        .btn span.active{
            background-color: #fff;
            border : 1px solid #000;
        }
        
    </style>
    <script>
        $(document).ready(function(){
            $('.btn span').click(function(){
                $(this).addClass('active')
                $(this).siblings().removeClass('active');
            })
        });
    </script>
</head>

<body>
    
    <div class="btn">
        <span class="active">공지사항</span>
        <span>갤러리</span>
        <span>커뮤니티</span>
    </div>
</body>

</html>
```

#### CSS 키프레임 애니메이션
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        body{
            font-family: 'Courier New', Courier, monospace;
            line-height: 1.5em;
            margin: 0;
            font-weight: 300;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
        }
        .loading{

        }
        .loading span{
            display : inline-block;
            width : 15px;
            height: 15px;
            background-color: gray;
            border-radius: 50%;
            animation: loading 1s linear infinite;
            /* 
                animation 
                    - loading : keyframe 이름(적용할 애니메이션 이름)
                    - 1s : animation duration(지속시간)
                    - 0s : animation delay(몇 초 뒤에 시작할지)
                    - linear : keyframe과 keyframe이 넘어갈때 부드럽게 넘어가라는 뜻
                    - infinite : 무한반복 시키겠다.
            */
        }
        .loading span:nth-child(1){
            animation-delay: 0s; /* delay 없이 바로 시작*/
            background-color: crimson;
        }
        .loading span:nth-child(2){
            animation-delay: 0.2s; /* 0.2초 대기후 바로 시작*/
            background-color: dodgerblue;
        }
        .loading span:nth-child(3){
            animation-delay: 0.5s; /* 0.5초 대기후 바로 시작*/
            background-color: royalblue;
        }

        @keyframes loading{
            0% {
                opacity: 0;
                transform: scale(0.5);
            }
            50% {
                opacity: 1;
                transform: scale(1.2);
            }
            100% {
                opacity: 0;
                transform: (0.5);
            }
        }
        /*
            1. CSS로 모양을 잡는다.
            2. @keyframes로 애니메이션을 만든다.
            3. 만든 keyframesf을 CSS 해당태그에 animation으로 붙여주자. 
        */
    </style>
</head>
<body>
    
    <div class="loading">
        <span></span>
        <span></span>
        <span></span>
    </div>
</body>
</html>
```

#### 가상클래스 hover 네비게이션
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>

    <style>
        a{
            color : #222;
            text-decoration: none;
        }
        .dropdown{
            /*display: inline-block; */
            width : 400px;
            /* 여기서 dipslay : block이면 전체 범위이기 때문에 width : 200px로 지정하거나 display : inline-block으로 컨텐츠 너비값만큼 자동으로 지정해준다.
            부모에 inline-block으로 하면 자식에 width를 설정해줘야하고 부모에 width : 200px 지정하면 자식들은 width : inherit을 해줌으로써 자동으로 너비값이 부모에 맞게끔 할 수 있다. 두번째 방법 자주 사용.
            */
        }
        .dropdown-btn{
            width : inherit;
            padding: 10px;
            font-size: 18px;
            background-color: yellowgreen;
            color : #fff;
            border : none;
            outline: none; /* button의 바깥쪽 outline 테두리를 없애겠다. */
            cursor: pointer;
        }
        .dropdown-submenu{
            display : none;
            width: inherit;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.17);
        }
        .dropdown-submenu a{
            display : block;
            padding: 7px;
            text-align: center;
        }
        .dropdown:hover .dropdown-submenu{
            display : block;
        }
    </style>

</head>
<body>
    <div class="dropdown">
        <button class="dropdown-btn">REAL Estate Type</button>
        <div class="dropdown-submenu">
            <a href="#none">All</a>
            <a href="#none">One Room</a>
            <a href="#none">1.5 Room</a>
            <a href="#none">Two Room</a>
            <a href="#none">Three Room</a>
        </div>
    </div>
</body>
</html>
```

#### 가상클래스 hover 툴팁 만들기
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        *{
            color : #222;
            line-height : 1.5em;
            font-weight : 300;
            margin : 0;
        }
        a{
            color : #222;
            text-decoration: none;
        }
        .container{
            display : flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
        }
        .icon{
            width : 125px;
            height : 125px;
            margin : 10px;
            position: relative;
        }
        .icon span{
            position: absolute;
            background-color: #000;
            color: #fff;
            width: 200px;
            top: -80px;
            text-align : center;
            padding: 10px;
            border-radius: 5px;
            left : 50%;
            transform: translateX(-50%);
            opacity: 0;
            transition: 1s;
            visibility: hidden;
        }
        .icon span:after{
            content : '';
            position : absolute;
            background-color: #000;
            width: 10px;
            height: 10px;
            transform: rotate(45deg) translateX(-50%);
            bottom: -5px;
            left : 50%;
        }
        .icon:hover span{
            display : block;
            opacity: 1;
            visibility: visible;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="icon">
            <img src="../Image/newbtn.bar.1.png" >
            <span>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. 
            </span>
        </div>
    </div>
</body>
</html>
```

#### hover 메뉴 외 나머지 흐려지기
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        body{
            margin: 0;
            background-color: royalblue;
        }
        a{
            color: #222;
            text-decoration: none;
        }
        .gnb{
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            left : 10%;
        }
        .gnb a{
            display: block;
            font-size : 40px;
            margin : 20px 0;
            color: #fff;
            transition: 0.5s;
        }
        .gnb:hover a{
            opacity: 0.3;
        }
        .gnb a:hover{
            opacity: 1;
        }
        .gnb a:before{
            content: '>';
            margin-right: 10px;
            opacity: 0;
        }
        .gnb a:hover:before{
            opacity: 1;
        }

    </style>
</head>
<body>
    <div class="gnb">
        <a href="#none">New Arivals</a>
        <a href="#none">Summer Collection</a>
        <a href="#none">Winter Collection</a>
        <a href="#none">Special Offers</a>
        <a href="#none">Trends</a>
    </div>
</body>
</html>
```

#### 위 아래 분리 네비게이션
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        body{
            font-weight: 300;
            margin: 0;
            background-color: #222;
            font-size: 15px;
        }
        .container{
            display : flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
        }
        .items{
            text-align: center;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            position: absolute;
        }
        .item{
            width: 300px;
            height: 200px;
            display: inline-block;
            position: relative;
            margin: 7px;
        }
        /* 공통적으로 들어가는 곳 */
        .front, 
        .back{
            position : absolute;
            transition: 0.5s;
            top: 0;
        }
        .front{
            height: inherit;
            background-color: #333;
            text-align: center;
            z-index: 1;
            width: 100%;
        }
        .item:hover .front img{
            animation: ani 1s linear infinite;
        }
        .front h2{
            margin-top: 0;
            margin-bottom: 10px;
            color: #fff;
        }
        .back{
            background-color: #fff;
            color: #000;
            height: inherit;
            text-align:center;
            padding: 20px;
            box-sizing: border-box;
        }
        .back p{}
        .back a{
            background-color: yellowgreen;
            color:#fff;
            padding: 5px 15px;
            border-radius: 20px;
        }
        .back a:hover{
            background-color: #000;
        }
        .item:hover .front{
            top : -50%
        }
        .item:hover .back{
            top: 50%;
        }

        @keyframes ani{
            0%, 100%{
                transform : scale(0.7)
            }
            50%{
               transform: scale(1); 
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="items">
            <div class="item">
                <div class="front">
                    <img src="../Image/newbtn.bar.1.png" alt="">
                    <h2>메뉴</h2>
                </div>
                <div class="back">
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                        Illum perspiciatis architecto ipsa autem consectetur explicabo 
                    </p>
                    <a href="#none">Read More</a>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
```

#### 넷플릭스 어코디언
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
    <title>넷플릭스 FAQ 어코디언</title>
    <style>
        body{
            font-family: sans-serif;
            margin: 0;
            background-color: #000;
            color: #fff;
            left: 1.6em;
            font-weight: 300;
            color: #fff;
        }
        a{
            text-decoration: none;
            color: gainsboro;
        }
        /* NETFLIX FAQ ACCORDION */
        .faq{
            height: 100vh;
        }
        .faq-inner{
            width: 700px;
            margin: auto;
        }
        .faq-inner h1{
            text-align: center;
            font-size: 50px;
            font-weight: 500;
        }
        .accordion{
            font-size: 26px;
        }
        .accordion .title,
        .accordion .content{
            background-color: #303030;
            padding: 10px 15px;
            margin-bottom: 7px;
        }
        .accordion .title{
            cursor: pointer;
        }
        .accordion .title:after{
            content : '+';
            float: right;
            transition: 0.5s;
        }
        .accordion .title.active{
            background-color: rgb(190, 45, 45);
        }
        .accordion .title.active:after{
            transform: rotate(45deg);
        }
        .accordion .content{
            display: none;
        }

        .newsletter {
            width: 90%;
            margin: auto;
            text-align: center;
            margin-top: 30px;
        }
        .newsletter p {
            font-size: 20px;
        }
        .newsletter div {
            display: flex;
            align-items: center;
        }
        .newsletter div input[type=email],
        .newsletter div button{
            border: none;
            outline: none;
            height: 60px;
            vertical-align: middle; 
            /* vertical-align : 버튼들이 안맞을때 */
            font-size : 20px;  
            
        }
        .newsletter div input[type=email]{
            flex: 3;
        }
        .newsletter div button {
            background-color: #e84118;
            color: #fff;
            cursor: pointer;
            flex: 1;
        }
        .newsletter div button:after{
            content : '>';
            font-size : 30px;
            display: inline-block;
            transform: translateY(3px);
            margin-left: 10px;
        }
    </style>
    <script>
        $(document).ready(function(){
            // 처음에 미리 1번째거 열어놓는 방법
            $('.accordion .content').eq(0).show();

            $('.accordion .title').click(function(){
                $(this).siblings('.accordion .content').slideUp();
                // $(this).next().stop().slideToggle('fast');
                // $(this).next().stop().slideToggle(1000);
                $(this).next().stop().slideToggle();

                $(this).siblings('.accordion .title').removeClass('active');
                $(this).toggleClass('active');
            })
        });
    </script>
</head>
<body>
    <section class="faq">
        <div class="faq-inner">
            <h1>자주 묻는 질문</h1>
            <div class="accordion">
                <div class="title active">넷프릭스란 무엇인가요?</div>
                <div class="content">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci neque facilis saepe qui impedit soluta ducimus obcaecati eligendi exercitationem iste alias odit similique ea ab, id ratione voluptatibus? Architecto, soluta.</div>
                <div class="title">넷프릭스란 무엇인가요?</div>
                <div class="content">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci neque facilis saepe qui impedit soluta ducimus obcaecati eligendi exercitationem iste alias odit similique ea ab, id ratione voluptatibus? Architecto, soluta.</div>
                <div class="title">넷프릭스란 무엇인가요?</div>
                <div class="content">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci neque facilis saepe qui impedit soluta ducimus obcaecati eligendi exercitationem iste alias odit similique ea ab, id ratione voluptatibus? Architecto, soluta.</div>
                <div class="title">넷프릭스란 무엇인가요?</div>
                <div class="content">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci neque facilis saepe qui impedit soluta ducimus obcaecati eligendi exercitationem iste alias odit similique ea ab, id ratione voluptatibus? Architecto, soluta.</div>
                <div class="title">넷프릭스란 무엇인가요?</div>
                <div class="content">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci neque facilis saepe qui impedit soluta ducimus obcaecati eligendi exercitationem iste alias odit similique ea ab, id ratione voluptatibus? Architecto, soluta.</div>
            </div>
            <div class="newsletter">
                <p>
                    시청할 준비가 되셨나여? 멤버십을 등록하거나 재시작하려면 이메일 주소를 입력하세요.
                </p>
                <div>
                    <input type="email" placeholder="이메일 주소">
                    <button>시작하기</button>
                </div>
            </div>
        </div>
    </section>    
</body>
</html>
```

#### 밀리의 서재 어코디언
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>밀리의 서재</title>
    <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
    <style>
        *{
            box-sizing: border-box;
        }
        body{
            margin: 0;
            left: 1.6em;
            font-weight: 300;
            color: black;
            font-size: 20px;
        }
        a{
            text-decoration: none;
            color: Gasinboro;
        }

        /* 밀리의 서재 FAQ  */
        .faq{
            height: 100vh;
            background-color: #FFEB60;
        }
        .faq-inner{
            width: 750px;
            margin: auto;
        }
        .faq-inner h1{
            text-align: center;
            margin-top: 0;
        }
        .accordion {}
        .accordion-item{
            background-color: #fff;
            padding: 15px 25px;
            border-radius: 20px;
            box-shadow: 0 0 35px rgba(0, 0, 0, 0.2);
            margin-bottom: 17px;
        }
        .accordion-item .title{
            font-weight: bold;
            cursor: pointer;
        }
        .accordion-item .title:after{
            content : '>';
            transform: rotate(90deg);
            float: right;
            transition: 0.5s;
            margin-top: 4px;
        }
        .accordion-item .title.active{
            padding-bottom: 15px;
        }
        .accordion-item .title.active:after{
            transform: rotate(270deg);
        }
        .accordion-item .content{
            border-top: 1px solid #000;
            font-size: 16px;
            padding-top: 15px;
            display: none;
        }
    </style>
    <script>
        $(document).ready(function(){
            $('.accordion-item .content').eq(0).show();
            $('.accordion-item .title').click(function(){
                // $('.accordion-item .content').stop().slideToggle();
                $(this).siblings('.content').stop().slideToggle(300);
                // $(this).find('.title').next().stop().slideToggle();
                $(this).toggleClass('active');
            }) 
            $('.accordion-item .content').click(function(){
                $(this).stop().slideUp(300); 
            }) 
        })
    </script>
</head>
<body>
    <section class="faq">
        <div class="faq-inner">
            <h1>자주 묻는 질문</h1>
            <div class="accordion">
                <div class="accordion-item">
                    <div class="title active">
                        안쓰면 정말 환불해 주나요?
                    </div>
                    <div class="content">
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veritatis reprehenderit quidem eligendi iure assumenda perferendis. Adipisci reprehenderit, ducimus deserunt rem incidunt aliquid facilis quisquam ea, culpa et excepturi magni quasi?
                    </div>      
                </div>
                <div class="accordion-item">
                    <div class="title">
                        안쓰면 정말 환불해 주나요?
                    </div>
                    <div class="content">
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veritatis reprehenderit quidem eligendi iure assumenda perferendis. Adipisci reprehenderit, ducimus deserunt rem incidunt aliquid facilis quisquam ea, culpa et excepturi magni quasi?
                    </div>      
                </div>
                <div class="accordion-item">
                    <div class="title">
                        안쓰면 정말 환불해 주나요?
                    </div>
                    <div class="content">
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veritatis reprehenderit quidem eligendi iure assumenda perferendis. Adipisci reprehenderit, ducimus deserunt rem incidunt aliquid facilis quisquam ea, culpa et excepturi magni quasi?
                    </div>      
                </div>
                <div class="accordion-item">
                    <div class="title">
                        안쓰면 정말 환불해 주나요?
                    </div>
                    <div class="content">
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veritatis reprehenderit quidem eligendi iure assumenda perferendis. Adipisci reprehenderit, ducimus deserunt rem incidunt aliquid facilis quisquam ea, culpa et excepturi magni quasi?
                    </div>      
                </div>
                <div class="accordion-item">
                    <div class="title">
                        안쓰면 정말 환불해 주나요?
                    </div>
                    <div class="content">
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veritatis reprehenderit quidem eligendi iure assumenda perferendis. Adipisci reprehenderit, ducimus deserunt rem incidunt aliquid facilis quisquam ea, culpa et excepturi magni quasi?
                    </div>      
                </div>
                <div class="accordion-item">
                    <div class="title">
                        안쓰면 정말 환불해 주나요?
                    </div>
                    <div class="content">
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veritatis reprehenderit quidem eligendi iure assumenda perferendis. Adipisci reprehenderit, ducimus deserunt rem incidunt aliquid facilis quisquam ea, culpa et excepturi magni quasi?
                    </div>      
                </div>
            </div>
        </div>
    </section>
</body>
</html>
```

#### 제이쿼리 모달 만들기1
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
    <style>
        a{
            text-decoration: none;
            color: black;
        }
        /* jQuery Modal */
        .modal{
            position : fixed;
            background-color: rgba(0,0,0,0.4);
            top: 0;
            left: 0;
            height: 100vh;
            width: 100%;
            display :none;
        }
        .modal-content{
            background-color: #fff;
            width: 350px;
            border-radius: 10px;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            padding: 30px;
            box-shadow: 0 0 15px rgba(0, 0, 0, 0.15);
            text-align: center;
        }
        .btn-close{
            position: absolute;
            top: 15px;
            right: 15px;
        }
        .btn-guide{
            background-color: #616BEE;
            color: #fff;
            border-radius: 5px;
            font-size : 15px;
            padding: 7px;
            /* 기본적으로 a태그는 inline요소이기 때문에 크기값을 가질 수 없다. 아무리 width 늘려봐도 안된다. display : block 변경*/
            display: block;
        }
    </style>
    <script>
        $(document).ready(function(){
            $('.modal-notice').on('click',function(){
                $('.modal').fadeIn();
            })
            $('.btn-close').on('click',function(){
                $('.modal').fadeOut(500);
            })

        })
    </script>
</head>
<body>
    <a href="#none" class="modal-notice">
        Open Fade-In Modal with jQuery
    </a>    

    <div class="modal">
        <div class="modal-content">
            <a href="#none" class="btn-close">X</a>
            <h2>Welcome to Teams!</h2>
            <img src="../../토이프로젝트/Image/calculator.png" style="width: 50px; height : 50px;">
            <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel, quos repellendus est deserunt doloribus velit sit, deleniti sunt voluptatem quo dolor error debitis cum explicabo ratione magnam! Consequatur, praesentium error?
            </p>
            <a href="#none" class="btn-guide">Open Guide</a>
        </div>
    </div>
</body>
</html>
```

#### 제이쿼리 모달 만들기2
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
    <style>
        a{
            text-decoration: none;
            color: black;
        }
        /* jQuery Modal */
        .modal{
            position : fixed;
            background-color: rgba(0,0,0,0.4);
            top: 0;
            left: 0;
            height: 100vh;
            width: 100%;
            display :none;
        }
        .modal.active{
            display: block;
        }
        .modal-content{
            background-color: #fff;
            width: 350px;
            border-radius: 10px;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            padding: 30px;
            box-shadow: 0 0 15px rgba(0, 0, 0, 0.15);
            text-align: center;
            animation: slidefade 0.35s linear; 
        }
        .btn-close{
            position: absolute;
            top: 15px;
            right: 15px;
        }
        .btn-guide{
            background-color: #616BEE;
            color: #fff;
            border-radius: 5px;
            font-size : 15px;
            padding: 7px;
            /* 기본적으로 a태그는 inline요소이기 때문에 크기값을 가질 수 없다. 아무리 width 늘려봐도 안된다. display : block 변경*/
            display: block;
        }

        @keyframes slidefade{
            0%{
                opacity: 0;
                margin-left: -100px;
            }
            100%{
                opacity: 1;
                margin-left: 0px;
            }
        }
    </style>
    <script>
        $(document).ready(function(){
            // $('.modal-notice').on('click',function(){
            //     $('.modal').fadeIn();
            // })
            // $('.btn-close').on('click',function(){
            //     $('.modal').fadeOut(500);
            // })
                $('.modal-notice').click(function(){
                    $('.modal').addClass('active');
                })
                $('.btn-close').click(function(){
                    $('.modal').removeClass('active');
                })
        })
    </script>
</head>
<body>
    <a href="#none" class="modal-notice">
        Open Fade-In Modal with jQuery
    </a>    

    <div class="modal">
        <div class="modal-content">
            <a href="#none" class="btn-close">X</a>
            <h2>Welcome to Teams!</h2>
            <img src="../../토이프로젝트/Image/calculator.png" style="width: 50px; height : 50px;">
            <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel, quos repellendus est deserunt doloribus velit sit, deleniti sunt voluptatem quo dolor error debitis cum explicabo ratione magnam! Consequatur, praesentium error?
            </p>
            <a href="#none" class="btn-guide">Open Guide</a>
        </div>
    </div>
</body>
</html>
```

#### 자바스크립트 모달 만들기

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
    <style>
        a{
            text-decoration: none;
            color: black;
        }
        /* jQuery Modal */
        .modal{
            position : fixed;
            background-color: rgba(0,0,0,0.4);
            top: 0;
            left: 0;
            height: 100vh;
            width: 100%;
            display :none;
        }
        .modal.active{
            display: block;
        }
        .modal-content{
            background-color: #fff;
            width: 350px;
            border-radius: 10px;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            padding: 30px;
            box-shadow: 0 0 15px rgba(0, 0, 0, 0.15);
            text-align: center;
            animation: slidefade 0.35s linear; 
        }
        .btn-close{
            position: absolute;
            top: 15px;
            right: 15px;
        }
        .btn-guide{
            background-color: #616BEE;
            color: #fff;
            border-radius: 5px;
            font-size : 15px;
            padding: 7px;
            /* 기본적으로 a태그는 inline요소이기 때문에 크기값을 가질 수 없다. 아무리 width 늘려봐도 안된다. display : block 변경*/
            display: block;
        }

        @keyframes slidefade{
            0%{
                opacity: 0;
                margin-left: -100px;
            }
            100%{
                opacity: 1;
                margin-left: 0px;
            }
        }
    </style>
    
</head>
<body>
    <a href="#none" onclick="openModal()" class="modal-notice">
        Open Vanila JAvaScript Animation Modal
    </a>    

    <div id="modal-notice" class="modal">
        <div class="modal-content">
            <a href="#none" class="btn-close" onclick="closeModal()">X</a>
            <h2>Welcome to Teams!</h2>
            <img src="../../토이프로젝트/Image/calculator.png" style="width: 50px; height : 50px;">
            <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel, quos repellendus est deserunt doloribus velit sit, deleniti sunt voluptatem quo dolor error debitis cum explicabo ratione magnam! Consequatur, praesentium error?
            </p>
            <a href="#none" class="btn-guide">Open Guide</a>
        </div>
    </div>

    <script>
        // $(document).ready(function(){
        //     // $('.modal-notice').on('click',function(){
        //     //     $('.modal').fadeIn();
        //     // })
        //     // $('.btn-close').on('click',function(){
        //     //     $('.modal').fadeOut(500);
        //     // })
        //         $('.modal-notice').click(function(){
        //             $('.modal').addClass('active');
        //         })
        //         $('.btn-close').click(function(){
        //             $('.modal').removeClass('active');
        //         })
        // })
        let modal = document.getElementById('modal-notice');

        function openModal(){
            modal.classList.add('active');
            // $('modal-notice').addClass('active');
        }
        function closeModal(){
            modal.classList.remove('active');
            // $('modal-notice').removeClass('active');
        }
    </script>
</body>
</html>
```

#### 가상클래스1
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        ul{
            list-style: decimal;
        }
        ul li.new:after{
            content : 'new';
            background-color: dodgerblue;
            color : #fff;
            border-radius: 3px;
            font-size: 13px;
            padding: 0 5px;
            margin-left : 5px;
        }

        ul li.hot:before{
            content : 'hot';
            background-color: crimson;
            color: #fff;
            border-radius: 3px;
            font-size: 13px;
            padding: 0 5px;
            margin-right : 5px;
        }
    </style>
</head>
<body>
    <!--
        가상클래스(before, after) 매우 유용하다!!
         폼 엘리먼트 중 input, textarea, select만 가상클래스 :before :after를 못가지고 나머지는 가지 수 있습니다.
           :before :after를 가질 수 있는 폼 요소(form, fieldset, legend, label, button)
    -->
    <ul>
        <li class="hot">빅치킨마요 - 3,500원</li>
        <li>돈치마요 - 3,500원</li>
        <li>치킨 샐러드마요 - 3,5000원</li>
        <li class="new">치킨마요 - 2,900원</li>
    </ul>
    
</body>
</html>
```


<br>
<br>
<br>

#### 가상클래스2
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        ul{
            list-style: none;
        }
        ul li:after{
            content : '주문불가';
            color : crimson;
            font-size : 12px;
            margin-left : 5px;
        }
        ul li:before{
            content : '*';
            color: dodgerblue;
            margin-right: 5px;
            font-size : 20px;
        }
        
    </style> 
</head>
<body>
    <!--
        가상클래스(before, after) 매우 유용하다!!
        단, form에 사용되는 태그에서는 사용 불가. ex) form, input button 등등
    -->
    <ul>
        <li>마요</li>
        <li>카레</li>
        <li>철판볶음밥</li>
        <li>프리미어 찌개</li>
        <li>덮밥</li>
    </ul>
    
</body>
</html>
```

#### 가상클래스3

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        .breadcrumb a{
            color : #000;
            text-decoration: none;
        }
        .breadcrumb a:after{
            content : '>';
            margin-left : 5px;
        }
        .breadcrumb a:last-child:after{
            content : '';
        }
    </style> 
</head>
<body>
    <div class="breadcrumb">
        <a href="">홈</a>
        <a href="">전체메뉴</a>
        <a href="">사각도시락</a>
        <a href="">모둠시리즈</a>
    </div>
</body>
</html>
```