---
layout: single
title:  "HTML - 부모자식 선택자"
Categories: HTML
Tag: [HTML, 부모와 자식 tag, CSS]
author_profile: true
toc: true
toc_label: 목차
toc_icon: "fas fa-list"
---

<br/>





# ◆CSS 부모-자식 선택자 구조



## 1.자식 선택자

-자식 선택자는 부모요소에 포함된 자식 선택자에 스타일을 적용할 때 사용한다.<br/>
-형식 : 부모명 자식명{...}<br/>

 **HTML 예제**

```html
<div class = "content">
    <b>안녕하세요.</b>
    <p>반가워요.</p>
    <b>내 나이는</b>
    <p>25살</p>
    <b>입니다.</b>
</div>
```

**CSS 예제**

```css
.content p{
    color : red;
}
```

**결과**<br/>
class가 content인 div 태그의 자식요소 중 p 태그만 색깔을 빨강색으로 변경된다.

![HTML 부모와 자식 태그]({{site.url}}/images/2023-05-27-parent and childern tag/HTML 부모와 자식 태그.png)



## 2.직속자식 선택자

-부모자식 바로 아래에 있는 직속 자식에게 스타일을 적용할 때 사용한다.<br/>
-형식 : 부모명>자식명{...}<br/>

 **HTML 예제**

```html
<div class = "content">
   <ol>
       <li> HTML<i>(html)</i></li>
       <li> CSS<i>(css)</i></li>
       <li> JavaScript<i>(js)</i></li>
  </ol>
</div>
```

**CSS 예제**

```css
ol>li>i {
    color : bule;
}
```

**결과**<br/>
ol 태그의 자식요소인 li 태그의 자식요소의 i의 태그 색깔이 파랑색으로 변경된다.

![HTML 부모와 자식 태그_2]({{site.url}}/images/2023-05-27-parent and childern tag/HTML 부모와 자식 태그_2.png)



## 3.부모요소의 클래스 선택자

-부모요소의 클래스 선택자을 활용하여 부모요소에 포함된 모든 자식요소에 스타일을 적용한다.<br/>
-형식 : 부모명.class 이름{...}<br/>

 **HTML 예제**

```html
<div class="content1">
  <ol>
    <li> HTML<i>(html)</i></li>
    <li> CSS<i>(css)</i></li>
  </ol>
</div>
  
<div class="content2">
  <ol>
    <li> JavaScript<i>(js)</i></li>
  </ol>
</div>
```

**CSS 예제**

```css
div.content2{
    color : green;
}
```

**결과**<br/>

class가 content2인 div 태그의 자식요소의 색깔이 초록색으로 변경된다.

![HTML 부모와 자식 태그_3]({{site.url}}/images/2023-05-27-parent and childern tag/HTML 부모와 자식 태그_3.png)
