---
layout: single
title: "jQuery"
excerpt: 'jQuery에 대하여'
categories: javaScript
tag: javaScript, library, jQuery
---
# jQuery
![image](https://user-images.githubusercontent.com/87356533/147079788-44fb0015-b77c-48ad-9add-53ed288ad3bd.png)

> jquery : Write less, do more

- 제이쿼리는 HTML의 조작을 단순화하도록 설계된 경량의 자바스크립트 라이브러리다.
- 크로스 브라우징을 지원한다.
- CSS3 선택자를 지원한다.
- 장점
    - 강력한 선택자를 지원
    - html dom을 조작하는 다양한 메소드를 지원
    - **수월한 ajax** 처리
    - 단순한 이벤트 처리
    - 보다 더 쉽게 엘리먼트를 찾을 수 있다
    - 메소드가 **묵시적 반복**을 수행한다
    - **메소드 체이닝**을 지원한다

> 묵시적 반복의 수행 : 아래의 p 태그를 삭제해 보자

```jsp
<p>contents</p>
<p>contents</p>
<p>contents</p>
<p>contents</p>
<p>contents</p>

<script>
    // 1. 자바스크립트로 p태그 삭제하기
    var elements = document.querySelector("p")l;
    elements.forEach(p => p.remove());

    // 2. jQuery로 p태그 삭제하기
    $("p").remove();
</script>
```
- 위 코드와 같이 jQuery를 사용하면 반복문을 필요없이 암묵적으로 모든 p태그를 찾아 지울 수 있다.

---

## $() 함수 사용법
- **$('selector')**
    - selector 표현식에 해당하는 엘리먼트를 조회한다
    - jqeury 집합 객체를 반환한다
    - jquery 집합 객체는 조회된 엘리먼트에 다양한 메소드를 지원한다.
