---
layout: single
title:  "CSS - position"
categories: CSS
tag: [CSS]
author_profile: true
toc: true
toc_label: 목차
toc_icon: "fas fa-list"
---

<br/>



# ◆Position

-position 속성은 문서 안 요소들을 어떻게 배치할 지를 정하는 속성이다.<br/>



## 1)static

-static 속성은 보통 display 속성에 따라 배치가 결정된다.<br/>-static은 position 속성의 기본값이며  요소를 나열한 순서대로 배치하며 top, right, bottom, left와 같은 속성을 사용할 수 없다.<br/>

```html
 <style>
      div {
        display: inline-block;
        margin: 10px;
        width: 300px;
        height: 100px;
        border: 3px solid black;
      }
      .box1 {
        background: firebrick;
      }
      .box2 {
        background: cornflowerblue;
      }
 </style>
</head>

<body>
    <div class="box1"></div>
    <div class="box2"></div>
</body>
```

![static]({{site.url}}/images/2023-06-09-CSS position/static.png)

-display: inline-block; 사용하여 왼쪽에서 오른쪽으로 요소의 위치가 한줄로 지정했다.

<br/>



## 2)relative

-relative는 **static이었을 때의 위치를 기준**으로 top, right, bottom, left와 같은 속성을 활용하여 요소의 위치를 지정해 준다.<br/>

```html
<style>
      div {
        display: inline-block;
        margin: 10px;
        width: 300px;
        height: 100px;
        border: 3px solid black;
      }
      .box1 {
        background: firebrick;
      }
      .box2 {
        background: cornflowerblue;
        position: relative;
        top: 30px;
        right: 150px;
      }
 </style>
</head>

<body>
    <div class="box1"></div>
    <div class="box2"></div>
</body>
```

![relative]({{site.url}}/images/2023-06-09-CSS position/relative.png)

box2의 위치가 static위치를 기준으로 top: 30px, right: 150px 만큼 떨어졌다.

<br/>



## 3)absolute

-absolute는 문서의 흐름과 상관없이 top, right, bottom, left와 같은 속성을 활용하여 요소의 위치를 지정해 준다.<br/>-이때 기준이 되는 위치는 가장 가까운 부모 요소 혹은 조상 요소 중 position 속성이 relative인 요소입니다.<br/>

```html
<style>
      div {
        display: inline-block;
        margin: 10px;
        width: 300px;
        height: 100px;
        border: 3px solid black;
      }
      #parent {
        position: relative;
        top: 50px;
      }
      .box1 {
        background: firebrick;
      }
      .box2 {
        background: cornflowerblue;
        position: absolute;
        top: 50px;
        right: 800px;
      }
    </style>
  </head>

  <body>
    <div class="box1"></div>
    <nav id="parent">
      <div class="box2"></div>
    </nav>
  </body>
```

![absolute]({{site.url}}/images/2023-06-09-CSS position/absolute.png)

<br/>



## 4)fixed

-fixed는 문서의 흐름과 상관없이 top, right, bottom, left와 같은 속성을 활용하여 요소의 위치를 지정해 준다.<br/>-따라서 브라우저 창을 어디로 스크롤 하더라도 계속 고정되어 표시되게 된다. (기준점: 브라우저 왼쪽 위 꼭지점)<br/>

```html
   <style>
      .box1 {
        position: fixed;
        width: 50px;
        height: 100px;
        bottom: 30px;
        right: 30px;
        background: firebrick;
        border: 3px solid black;
      }
      #content {
        width: 500px;
      }
    </style>
  </head>
  <body>
    <div class="box1"></div>
    <div id="content">
      <p>
        대통령은 헌법과 법률이 정하는 바에 의하여 공무원을 임면한다. 의무교육은
        무상으로 한다. 신체장애자 및 질병·노령 기타의 사유로 생활능력이 없는
        국민은 법률이 정하는 바에 의하여 국가의 보호를 받는다. 모든 국민은
        인간으로서의 존엄과 가치를 가지며, 행복을 추구할 권리를 가진다. 국가는
        개인이 가지는 불가침의 기본적 인권을 확인하고 이를 보장할 의무를 진다.
        이 헌법시행 당시의 법령과 조약은 이 헌법에 위배되지 아니하는 한 그
        효력을 지속한다. 근로자는 근로조건의 향상을 위하여 자주적인
        단결권·단체교섭권 및 단체행동권을 가진다. 국가는 노인과 청소년의
        복지향상을 위한 정책을 실시할 의무를 진다.
      </p>
      <p>
        모든 국민은 법률이 정하는 바에 의하여 국가기관에 문서로 청원할 권리를
        가진다. 국교는 인정되지 아니하며, 종교와 정치는 분리된다. 국회의원의
        선거구와 비례대표제 기타 선거에 관한 사항은 법률로 정한다. 헌법재판소의
        장은 국회의 동의를 얻어 재판관중에서 대통령이 임명한다. 국민의 자유와
        권리는 헌법에 열거되지 아니한 이유로 경시되지 아니한다. 이 헌법시행
        당시의 대법원장과 대법원판사가 아닌 법관은 제1항 단서의 규정에 불구하고
        이 헌법에 의하여 임명된 것으로 본다. 훈장등의 영전은 이를 받은 자에게만
        효력이 있고, 어떠한 특권도 이에 따르지 아니한다. 국무회의는
        대통령·국무총리와 15인 이상 30인 이하의 국무위원으로 구성한다.
      </p>
     </div>
  </body>
```

<img src="{{site.url}}/images/2023-06-09-CSS position/fix.png" alt="fix" style="zoom:50%;" />{: .align-center}

화면을 스크롤 하여도 box1의 위치가 bottom: 30px, right: 30px 위치에 고정된다.

<br/>



## 5)sticky

-sticky는 위치에 따라서 동작방식이 달라진다. 요소가 임계점(scroll 박스 기준) 이전에는 relative와 같이 동작하고 그 이후에는 fixed와 같이 동작한다.<br/>

```html
<style>
      .box1 {
        margin: 10px;
        width: 50px;
        height: 100px;
        background: firebrick;
        position: sticky;
        top: 0;
        border: 3px solid black;
      }
      #content {
        width: 500px;
        margin-left: auto;
      }
    </style>
  </head>
  <body>
    <div class="box1"></div>
    <div id="content">
      <p>
        대통령은 헌법과 법률이 정하는 바에 의하여 공무원을 임면한다. 의무교육은
        무상으로 한다. 신체장애자 및 질병·노령 기타의 사유로 생활능력이 없는
        국민은 법률이 정하는 바에 의하여 국가의 보호를 받는다. 모든 국민은
        인간으로서의 존엄과 가치를 가지며, 행복을 추구할 권리를 가진다. 국가는
        개인이 가지는 불가침의 기본적 인권을 확인하고 이를 보장할 의무를 진다.
        이 헌법시행 당시의 법령과 조약은 이 헌법에 위배되지 아니하는 한 그
        효력을 지속한다. 근로자는 근로조건의 향상을 위하여 자주적인
        단결권·단체교섭권 및 단체행동권을 가진다. 국가는 노인과 청소년의
        복지향상을 위한 정책을 실시할 의무를 진다.
      </p>
      <p>
        모든 국민은 법률이 정하는 바에 의하여 국가기관에 문서로 청원할 권리를
        가진다. 국교는 인정되지 아니하며, 종교와 정치는 분리된다. 국회의원의
        선거구와 비례대표제 기타 선거에 관한 사항은 법률로 정한다. 헌법재판소의
        장은 국회의 동의를 얻어 재판관중에서 대통령이 임명한다. 국민의 자유와
        권리는 헌법에 열거되지 아니한 이유로 경시되지 아니한다. 이 헌법시행
        당시의 대법원장과 대법원판사가 아닌 법관은 제1항 단서의 규정에 불구하고
        이 헌법에 의하여 임명된 것으로 본다. 훈장등의 영전은 이를 받은 자에게만
        효력이 있고, 어떠한 특권도 이에 따르지 아니한다. 국무회의는
        대통령·국무총리와 15인 이상 30인 이하의 국무위원으로 구성한다.
      </p>
    </body>
```

<img src="{{site.url}}/images/2023-06-09-CSS position/sticky-1.png" alt="sticky-1" style="zoom: 80%;" />{: .align-center}

스크롤 하기전에는 relative처럼 있다가 스크롤를 하면 fixed와 같이 동작한다.<br/>



<img src="{{site.url}}/images/2023-06-09-CSS position/sticky-2.png" alt="sticky-2" style="zoom:80%;" />{: .align-center}