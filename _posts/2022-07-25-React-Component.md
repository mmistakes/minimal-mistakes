---
layout: single
title: "[React]  : Component를 이용한 상세페이지"
categories: React
tags: [React]
toc: true

---

### 2022.07.22

<span style ='color:blue'>React : Component</span> 상세페이지 만들기 

App.js  - HTML 밑 부분에 아래와 같이 디자인해준다. 

App.js

```react
<div className="modal">
	<h4>제목</h4>
  <p>날짜</p>
  <p>상세내용</p>
</div>
```

: 이 부분을 Componet로 만들어 줄 계획

App.css

```css
.modal {
  margin-top: 20px;
  padding: 20px;
  background-color: greenyellow;
  text-align: left;
}
```

: 다음과 같이 modal UI를 만들어 보았다. 

<span style ='color:red'>Component 만드는 법</span>

1.  function 만들기 : 다른 function에 만들기 & 영어 대문자로 시작하기 
<<<<<<< HEAD
2. return( ) 안에 HTML 담기 
3. <함수명></함수명> 쓰기 
=======
2. return( ) 안에 Html 담기 
3. <함수명><\/함수명> 쓰기 
>>>>>>> 13409774523b1f662346efacb36022fac96fb51e

현재 function App(){

} 이 만들어진 상태이기 때문에 이 중괄호 밖에 새로운 function 을 정의한다. 

```react
function Modal(){
 return(
   <div className="modal">
    <h4>제목</h4>
    <p>날짜</p>
    <p>상세내용</p>
   </div>
  )
}
```

이렇게 만들어진 Component는 이렇게 사용된다. 

```react
<div className="modal">
 <h4>제목</h4>
 <p>날짜</p>
 <p>상세내용</p>
</div>
```

이 HTML 코드를

```react
<modal></modal>
```

: 다음과 같이 간단하게 만들 수 있다. 

![스크린샷 2022-07-25 14 49 36](https://user-images.githubusercontent.com/104547038/180707373-77d42f70-3b1b-4805-8c4a-ca7977044c1b.png)

<<<<<<< HEAD
<span style='color:red'>Component</span>를 사용하면 좋을 때 

1. 반복적인 HTML을 축약할 때 
2. 사이즈가 큰 페이지들 
3. 자주 변경되는 HTML UI 들 



<br>

<span style ='background-color:black;'>[유튜브 코딩애플을 통해 공부](https://www.youtube.com/watch?v=fE4t2Ovgp-0&list=PLfLgtT94nNq0qTRunX9OEmUzQv4lI4pnP&index=3)</span>

=======
<span style ='background-color:black;'>[유튜브 코딩애플을 통해 공부](https://www.youtube.com/watch?v=fE4t2Ovgp-0&list=PLfLgtT94nNq0qTRunX9OEmUzQv4lI4pnP&index=3)</span>
>>>>>>> 13409774523b1f662346efacb36022fac96fb51e
