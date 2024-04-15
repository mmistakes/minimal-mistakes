---
layout: single
title: "[자바스크립트_개념정리] 배열 메서드 forEach, map, arrow functions"
typora-root-url: ../
---





## 배열 메서드

<br>



#### 배열 메서드 종류

| forEach() | map() | filter() | reduce() | some() | every() | find() |
| --------- | ----- | -------- | -------- | ------ | ------- | ------ |



<span style="font-size:85%">위 배열 메서드들은 **함수를 인수**로 받는다</span>

<span style="font-size:70%; color:orangered; font-weight:bold">* 콜백함수: 다른 함수의 매개변수로 전달되는 함수</span>



<br>

<br>

> #### forEach( )



<span style="font-size:85%">어떤 함수를 넣든 상관없이 배열의 각 요소가 함수로 자동으로 전달되어 함수를 한 번씩 실행한다.</span>

<span style="font-size:85%">배열의 요소에 대해 반복문 역할을 한다고 볼 수 있다.</span>

<span style="font-size:85%">For of 루프를 사용하기 시작한 이후 forEach 메서드는 많이 사용하지 않는다.</span>

<br>

**<span style="font-size:90%">[ syntax ]</span>**

```javascript
배열이름.forEach(function(매개변수){
  실행문;
})

//함수를 인수로 받는 forEach메서드
```

<br>

<span style="font-size:90%; font-weight:bold">[ forEach() 구문 연습]</span>

<img src="/images/2024-04-07-method_array/image-20240408000340162.png" alt="image-20240408000340162" style="zoom:50%;" />

<img src="/images/2024-04-07-method_array/image-20240408000411309.png" alt="image-20240408000411309" style="zoom:50%;" />

<span style="font-size:85%">=> forEach메서드를 사용하는 일반적인 방식으로 <span style="color:orangered">forEach 메서드와 같은 줄에서 이 목적만을 위한 이름없는 함수를 정의</span></span>

  <span style="font-size:85%">  numbers 배열의 요소를 차례로 출력</span>

<br>

<span style="font-size:90%; font-weight:bold">[ For of 루프와 forEach 메서드 비교 ]</span>

<img src="/images/2024-04-07-method_array/image-20240408000551571.png" alt="image-20240408000551571" style="zoom:50%;" />

<span style="font-size:85%">=> 이후 for of 루프 사용으로 함수를 넣을 필요가 없어지고 더 간결해짐</span>

<br>



<span style="font-size:90%; font-weight:bold">[ forEach() 구문 연습 - 짝수 출력]</span>

<img src="/images/2024-04-07-method_array/image-20240408000901084.png" alt="image-20240408000901084" style="zoom:50%;" />

<img src="/images/2024-04-07-method_array/image-20240408000914318.png" alt="image-20240408000914318" style="zoom:50%;" />

<span style="font-size:85%">=> numbers 배열의 요소들 중 2로 나눴을때의 나머지가 0인 것을 조건으로 참인 요소만 출력</span>

   <span style="font-size:85%; color:orangered"> 함수의 매개변수 자리 (el)에 numbers 배열의 각 요소가 차례로 인수로 전달되어 함수가 실행됨</span>

<br>

<span style="font-size:90%; font-weight:bold">[ forEach() 활용 - 영화제목과 평점 출력]</span>

<img src="/images/2024-04-07-method_array/image-20240408001938153.png" alt="image-20240408001938153" style="zoom:50%;" />

<img src="/images/2024-04-07-method_array/image-20240408002019582.png" alt="image-20240408002019582" style="zoom:50%;" />

<span style="font-size:85%">=> 매개변수 movie 자리에 배열의 각 요소(여기서는 객체 리터럴)가 인수로 들어와 차례로 함수에 전달</span>



<br>

<span style="font-size:90%; font-weight:bold">[forEach메서드 밖에서 함수 정의하는 방법]</span>

<img src="/images/2024-04-07-method_array/image-20240407235435493.png" alt="image-20240407235435493" style="zoom:50%;" />

<img src="/images/2024-04-07-method_array/image-20240407235400877.png" alt="image-20240407235400877" style="zoom:50%;" />

=> <span style="font-size:85%">이미 정의한 함수를 전달하는 이 방식은 잘 쓰지 않는다</span>



<br>

<br>

<br>



> #### map()



배열의 요소에 대해 반복을 하는 동시에 요소를 바꿀 수 있음

이때 기존의 배열이 바뀌는 것이 아니라 요소를 바꾼 새로운 배열을 생성함

<br>

**<span style="font-size:90%">[ syntax ]</span>**

```javascript
배열이름.map(function(매개변수){
  실행문;
})

```

<br>

<span style="font-size:90%; font-weight:bold">[ map() 구문 연습 ]</span>

<img src="/images/2024-04-07-method_array/image-20240408225954385.png" alt="image-20240408225954385" style="zoom:50%;" />

<img src="/images/2024-04-07-method_array/image-20240408230008575.png" alt="image-20240408230008575" style="zoom:50%;" />

<span style="font-size:85%">=> 기존 배열의 요소에 각각 2를 곱한 값들로 새로운 배열이 만들어 지고, doubles라는 변수에 저장</span>



<br>

<span style="font-size:90%; font-weight:bold">[ map() 연습 - 영화제목만 추출한 배열만들기 ]</span>

<img src="/images/2024-04-07-method_array/image-20240408230757916.png" alt="image-20240408230757916" style="zoom:50%;" />

<img src="/images/2024-04-07-method_array/image-20240408230845563.png" alt="image-20240408230845563" style="zoom:50%;" />

<span style="font-size:85%">=> movies라는 배열의 각 요소를 함수의 매개변수 movie 자리로 받은 후, title을 반환받아서 새로운 배열을 만든다. 새로운 배열을 titles라는 변수에 저장한다.</span>

<br>

<br>

<br>



> #### 화살표 함수 arrow functions



<span style="font-size:85%">function 키워드 없이 함수 입력이 가능함으로 기존의 함수나 함수 표현식보다 간결</span>

<span style="font-size:85%">화살표 함수 하나만 단독으로 만들 수는 없기에 변수에 저장한다</span>

<span style="font-size:85%">화살표 함수는 배열 메서드랑 항상 함께 쓰인다</span>

<br>

**<span style="font-size:90%">[ syntax ]</span>**

```javascript
const 변수명 = (매개변수) => {
  실행문;
}
```

<br>

<span style="font-size:90%; font-weight:bold">[ 화살표 함수 구문 연습 ]</span>

<img src="/images/2024-04-07-method_array/image-20240409123525143.png" alt="image-20240409123525143" style="zoom:50%;" />

<img src="/images/2024-04-07-method_array/image-20240409123555092.png" alt="image-20240409123555092" style="zoom:50%;" />

<br>

<span style="font-size:90%; font-weight:bold">[인수가 하나일 때]</span>



<img src="/images/2024-04-07-method_array/image-20240409140635315.png" alt="image-20240409140635315" style="zoom:50%;" />

<img src="/images/2024-04-07-method_array/image-20240409125723160.png" alt="image-20240409125723160" style="zoom:50%;" />

<span style="font-size:85%">=> 괄호 생략 가능</span>

<br>



<span style="font-size:90%; font-weight:bold">[ 인수가 없는 화살표 함수 ]</span>

<img src="/images/2024-04-07-method_array/image-20240409135828012.png" alt="image-20240409135828012" style="zoom:50%;" />

<img src="/images/2024-04-07-method_array/image-20240409135838871.png" alt="image-20240409135838871" style="zoom:50%;" />

<span style="font-size:85%">=> 괄호 안은 비워놔야 함. ( 결정할 매개변수, 인수가 없어도 그 자리는 필요하다 )</span>

<br>

<span style="font-size:80%; color:green; font-weight:bold">[ 깨알 개념 정리 ]</span>

<span style="font-size:75%; color:green">**매개변수(parameter)**는 함수를 정의할 때 사용되는 변수이고 </span>

<span style="font-size:75%; color:green">**인수(argument)**는 실제로 함수가 호출될 때 넘기는 변수값이다</span>

<br>



<span style="font-size:90%; font-weight:bold">[ 화살표 함수의 축약형 ( 암시적 반환 ) ]</span>

<span style="font-size:85%"> 1. return 생략 </span>

<span style="font-size:85%">이때 중괄호를 괄호로 바꿔야 하며 괄호 안에는 단 한개의 표현식만 있어야 함</span>

<img src="/images/2024-04-07-method_array/image-20240409145602902.png" alt="image-20240409145602902" style="zoom:50%;" />

<br>

<span style="font-size:85%"> 2. 한줄로 작성 </span>

<img src="/images/2024-04-07-method_array/image-20240409145708868.png" alt="image-20240409145708868" style="zoom:50%;" />



<br>

<br>



<span style="font-size:90%; font-weight:bold">[ 화살표 함수 활용한 forEach() 와 map() ]</span>



<span style="font-size:85%"> - map()와 화살표 함수</span>

<img src="/images/2024-04-07-method_array/image-20240409222041521.png" alt="image-20240409222041521" style="zoom:50%;" />

<img src="/images/2024-04-07-method_array/image-20240409222058590.png" alt="image-20240409222058590" style="zoom:50%;" />

<span style="font-size:85%">=> map()메서드에 function키워드의 함수를 넣는 대신 화살표 함수를 넣어 movieRates 에 저장</span>



<span style="font-size:85%">- 암시적 반환</span>

<img src="/images/2024-04-07-method_array/image-20240409222241277.png" alt="image-20240409222241277" style="zoom:50%;" />

<br><br>



<span style="font-size:85%">- forEach()와 화살표 함수</span>



<img src="/images/2024-04-07-method_array/image-20240409224617719.png" alt="image-20240409224617719" style="zoom:50%;" />

<img src="/images/2024-04-07-method_array/image-20240409224642283.png" alt="image-20240409224642283" style="zoom:50%;" />

<span style="font-size:85%; color:orangered">=> map메서드와 다르게 forEach메서드는 항상 undefined 를 반환한다. 때문에 console.log 를 사용해야 원하는 값을 출력한다</span>

<br>

<img src="/images/2024-04-07-method_array/image-20240409224324108.png" alt="image-20240409224324108" style="zoom:50%;" />

<img src="/images/2024-04-07-method_array/image-20240409224349112.png" alt="image-20240409224349112" style="zoom:50%;" />

<br>



<img src="/images/2024-04-07-method_array/image-20240409224411538.png" alt="image-20240409224411538" style="zoom:50%;" />

<img src="/images/2024-04-07-method_array/image-20240409224440947.png" alt="image-20240409224440947" style="zoom:50%;" />

<span style="font-size:85%">=> return 키워드와 다르게 console.log는 생략할 수 없다. </span>

   <span style="font-size:85%">  암시적 반환은 return을 생략했을 때 가능한 것으로</span>

​    <span style="font-size:85%">위 예시는 return 키워드가 생략된 것과 같은 의미임으로 undefined가 반환됨</span>







