---
layout: single
title:  "[study] Toggle함수 공부하기"
categories: study
tags: [javaScript, blog, study] 
toc : true
author_profile : false 
---

### Toggle
***

#### Toggle함수란?
목적
- 스위치와 같은 기능 (on/off)
- 주어진 상태를 반전함

종류
- 불리언 값 토글 
- 클래스 토글 
- 모드 토글

***
### Toggle함수 종류

#### 불리언 값 토글
> 불리언 값이 true면 false로, false면 true로 변환

```js
let isActive = false;

function toggle() {
  isActive = !isActive;
  console.log(isActive);
}

toggle(); // true
toggle(); // false
```
***
#### 클래스 토글
> 클래스가 존재하면 삭제, 없으면 추가

```html
<button id="toggleBtn">Toggle Class</button> <!--토글 버튼-->
<div id="box" class="box">Box</div> <!--토글버튼을 누르면 변경될 상자자-->

<script>
  const button = document.getElementById('toggleBtn');
  const box = document.getElementById('box');

  button.addEventListener('click', () => { // 토글버튼을 누르면 실핸된다
    box.classList.toggle('active'); // 'active'클래스가 있으면 삭제되고 없으면 추가된다.
  });
</script>

<style>
  .box {
    width: 100px;
    height: 100px;
    background-color: red;
  }

  .active { 
    background-color: blue;
  }
</style>
```
***
