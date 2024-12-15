---
layout: single
title:  "[study] HTML DOM 공부하기"
categories: study
tags: [html, blog, study] 
toc : true
author_profile : false 
---

### HTML DOM(Document Object Model)
***
#### HTML DOM이란?

- 기능
    - 웹 페이지에 작성된 HTML 태그 당 객체(DOM객체) 생성
- 목적
    - HTML 태그가 출력된 모양이나 콘텐츠를 제어하기 위해 필요

***
#### DOM 객체
- DOM 트리의 한 노드
- HTML 태그 하나당 하나의 DOM 객체 생성
- DOM 객체의 종류는 HTML 태그 종류만큼 

***
#### DOM 트리
- HTML 태그의 포함관계에 따라 부모, 자식 관계 형성 (트리 형성)
- 특징
    - DOM 트리의 root는 document 객체
    ```html
    <!DOCTYPE html>
    ```
- 브라우저가 HTML태그를 화면에 그리는 과정
    1. DOM 트리의 틀 (document 객체) 생성
    2. HTML 태그를 읽고 DOM 트리에 DOM 객체 생성
    3. DOM 객체를 화면에 출력
    4. HTML 문서 로딩이 완료되면 DOM 트리 완성
    5. DOM 객체 변경시 브라우저는 해당 HTML 태그의 출력 모양을 바로 갱신

> DOM 객체를 제어하면 HTML 태그 제어 효과 발생

***
### HTML 태그와 DOM 객체의 요소
#### HTML 태그의 요소
- 엘리먼트로도 불림
- 5가지 요소로 구성
    - 엘리먼트 이름 (태그 이름)     
    - 속성                         
    - CSS3 스타일                  
    - 이벤트 리스너                  
    - 콘텐츠(inner HTML)            

***
#### DOM 객체의 요소
- 5가지 요소로 구성
    - 프로퍼티 (HTML의 속성): __id,style,title 등__
    - 메소드 (HTML 태그 제어기능): __addEventListener(), click() 등__
    - 컬렉션 (자식 DOM객체들의 주소)
    - 이벤트 리스너 (HTML의 이벤트 리스너): __onclick="this.style.color='red'"__
    - CSS3 스타일 (HTML의 CSS3): __"color:red"__

***
### DOM 객체 사용법
#### CSS3 변경
아래와 같은 HTML 태그가 있을 때
```html
<p id = "firstP">안녕하세요</p>
```
***
id로 DOM 객체를 찾아서 변경하고 싶은 스타일을 지정한다.
```js
let p = document.getElementById("firstP");
p.style.color = "red"; 
```
CSS3스타일 프로퍼티는 하이픈(-) 대신 단어의 __첫글자를 대문자로__ 변경해 사용한다.
- background-color => backgroundColor

***
#### innerHTML 변경
아래와 같은 HTML 태그가 있을 때
```html
<p id = "firstP">안녕하세요</p>
```
***
inner 프로퍼티를 수정해 HTML의 콘텐츠를 변경할 수 있다.
```js
let p = document.getElementById("firstP");
p.innerHTML = "반갑습니다"
```
***
#### this 키워드
 - 객체 자신을 가리키는 키워드
 - DOM 객체에서 자기 자신을 가리킬 때 사용한다.

```html
<p onclick="this.style.color='red'">누르면 빨간색이 됩니다.</p>
```
***