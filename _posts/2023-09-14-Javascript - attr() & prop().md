---
layout: single
title:  "Javascript- attr()&prop()"
categories: Javascript
tag: [Javascript, preventDefault]
author_profile: true
toc: true
toc_label: 목차
toc_icon: "fas fa-list"

---

<br>











# ◆.attr()



## 문법 1 - 속성의 값 가져오기

- 선택한 요소의 속성의 값을 가져온다.

```java
.attr( attributeName )
```

-  예를 들어 아래는 div 요소의 class 속성의 값을 가져온다.

```java
$( 'div' ).attr( 'class' );
```

<br>





## 문법 2 - 속성 추가하기

- 선택한 요소에 속성을 추가한다.

```java
.attr( attributeName, value )
```

-  예를 들어 아래는 h1 요소에 title 속성을 추가하고 속성의 값은 Hello로 한다.

```java
$( 'h1' ).attr( 'title', 'Hello' );
```

<br>







# ◆.attr() 과  .prop() 차이

attr()은 속성 그 자체의 값을 반환하고, prop()은 속성값을 명시적으로 찾아낼 수 있는 방법을 제공한다.

```java
<input type="checkbox" name="chk"  id="chk1" checked="checked">
<input type="checkbox" name="chk" id="chk2">
```

```java
$("#chk1").attr("checked") 결과 : checked
$("#chk1").prop("checked") 결과 : true

$("#chk2").attr("checked") 결과 : unfined
$("#chk2").prop("checked") 결과 : false
```

.attr()을 통해서는 element가 가지는 속성값이나 정보를 조회(style, src, rowspan 등)하거나 세팅하는 형식

.prop()을 통해서는 element가 가지는 실제적인 상태(활성화, 체크, 선택여부 등)를 제어하는 업무
