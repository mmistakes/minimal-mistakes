---
layout: single
title: "[자바스크립트_개념정리] 함수범위"
typora-root-url: ../
---



> ## 함수 범위



<span style="font-size:85%">범위는 변수 가시성을 참조한다</span>

<span style="font-size:85%">함수 블록 ' { } ' 을 기준으로 변수를 선언한 위치에 따라 전역 변수와 지역 변수로 나뉘며 액세스 지점을 결정한다</span>

<br>

<span style="font-size:90%; font-weight:bold">[전역 변수]</span>

```javascript
var 변수;
function 함수() {
  }

// 전역 변수는 함수 블록 밖이나 안에서 자유롭게 사용 가능
```



<br>

<span style="font-size:90%; font-weight:bold">[지역 변수]</span>

```javascript
function 함수() {
  var 변수;
}

// 지역 변수는 함수 블록 안에서만 사용 가능
```



<br>

<br>

#### 변수의 Scope

: 블록에 의해 변수의 범위가 달라지는 것



<br>

<span style="font-size:90%; font-weight:bold">[let 으로 변수선언한 경우]</span>

<img src="/images/2024-03-21-function_scope/image-20240321230659214.png" alt="image-20240321230659214" style="zoom:50%;" />

<img src="/images/2024-03-21-function_scope/image-20240321230737822.png" alt="image-20240321230737822" style="zoom:50%;" />

<span style="font-size:85%; color:green">=> if 블록 밖에서 먼저 선언되었던 num은 출력이 되지만 블록 안에서 선언된 price 와 drinks 는 블록 밖에서는 출력되지 않는다 (const도 마찬가지)</span>

​	<span style="font-size:85%; color:green">**변수가 블록 안에서 선언되면 해당 변수들은 그 블록범위에서만 존재한다**</span>





<br>

<span style="font-size:90%; font-weight:bold">[var 로 변수선언한 경우]</span>

<img src="/images/2024-03-21-function_scope/image-20240321231330473.png" alt="image-20240321231330473" style="zoom:50%;" />

<img src="/images/2024-03-21-function_scope/image-20240321231348684.png" alt="image-20240321231348684" style="zoom:50%;" />

<span style="font-size:85%; color:green">=> 변수선언에서 **var**를 쓰면 블록이 지정되지 않기 때문에 블록 밖에서도 액세스 가능하다</span>



\<br>

<br>

<br>

#### Lexical scope 렉시컬 범위



<span style="font-size:85%">**함수의 중첩**</span>

<span style="font-size:85%; color:orangered">=> 부모 함수 안에 중첩된 내부 함수는 부모 함수나 조부모 함수의 범위 내에서 정의된 변수에 액세스할 수 있다</span>

<br>

<span style="font-size:90%; font-weight:bold">[ 렉시컬 범위 알아보기 ]</span>

<img src="/images/2024-03-21-function_scope/image-20240323120410676.png" alt="image-20240323120410676" style="zoom:50%;" />

<img src="/images/2024-03-21-function_scope/image-20240323120429847.png" alt="image-20240323120429847" style="zoom:50%;" />

=> 상위 함수인 fruits에서 선언된 berries 배열을 wantToGet 함수와 order함수에서 접근해 활용할 수 있음

단, 역방향으로는 성립되지 않는다 (wantToGet 함수와 order함수에서 선언된 변수에 fruits 함수는 액세스할 수 없다)

<br>

<span style="font-size:90%; font-weight:bold">[ 주의할 점 ]</span>

<img src="/images/2024-03-21-function_scope/image-20240323120623978.png" alt="image-20240323120623978" style="zoom:50%;" />

<img src="/images/2024-03-21-function_scope/image-20240323120926270.png" alt="image-20240323120926270" style="zoom:50%;" />

<span style="font-size:85%">=> fruits 함수만 실행해서는 출력값을 얻을 수 없고 그 속의 중첩된 함수(실행문이 적힌)들도 실행해야 출력값을 얻을 수 있다</span>
