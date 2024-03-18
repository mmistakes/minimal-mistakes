---
layout: single
title: "[자바스크립트_개념정리] For..of / For..in 루프"
typora-root-url: ../
---







<br>

> ### FOR .. OF  루프
>
> <span style="font-size:80%">배열의 모든 요소를 순환한 다음 모든 반복에 대한 개별 요소에 로그할 수 있다
> </span>



<br>

<span style="font-size:80%">배열, 반복가능한 객체를 반복을 시키는 손쉬운 방법.</span>

<span style="font-size:80%"><span style="color:orangered">주로 배열에 많이 사용하며</span> 문자열처럼 반복가능한 객체로 인식되는 것에도 사용 가능.</span>

<span style="font-size:80%">인덱스에 해당하는 변수나 숫자를 쓴다면 배열에 직접 연결해야하지만 <span style="color:orangered">for..of 반복문은 배열에 연결할 필요 없다.</span></span>

<span style="font-size:80%; color:orangered">객체 리터럴은 반복가능한 객체로 인식되지 않기에 함께 사용할 수 없다.</span>

<br>

<span style="font-size:85%; font-weight:bold">[ Syntax ]</span>

```javascript
for ( 변수 of 반복가능한 객체) {
  반복 동작 실행문
}
```

<br>





<span style="font-size:85%; font-weight:bold"> For..of  반복문 연습  - ( 배열 )</span>

<img src="/images/2024--03-07-loops_array/image-20240309211707480.png" alt="image-20240309211707480" style="zoom:50%;" />

<img src="/images/2024--03-07-loops_array/image-20240309211735664.png" alt="image-20240309211735664" style="zoom:50%;" />



<span style="font-size:80%">=> 배열의 이름은 개별 요소를 설명할 수 있는 이름으로 명명</span>

<span style="font-size:80%"> => for 반복문은 기존의 변수를 변경하는 반면, <span style="color:green">for..of 반복문은 모든 반복에 대해 새롭게 생성되는 변수이기 때문에 **const** 사용 가능</span></span>

<span style="font-size:80%; color:orangered">=> 배열에서의 반복은 값 하나 하나 따로 출력</span>



<br>

<span style="font-size:85%; font-weight:bold"> For..of 반복문 연습  - ( 문자열 )</span>

<img src="/images/2024--03-07-loops_array/image-20240310154906545.png" alt="image-20240310154906545" style="zoom:50%;" />

<img src="/images/2024--03-07-loops_array/image-20240310154939326.png" alt="image-20240310154939326" style="zoom:50%;" />

<span style="font-size:80%; color:orangered">=> 문자열에서의 반복은 철자 하나 하나씩 따로 출력</span>

<br><br>

<span style="font-size:85%; font-weight:bold">For 반복문  vs   For .. of 반복문 비교</span>



<img src="/images/2024--03-07-loops_array/image-20240310153403188.png" alt="image-20240310153403188" style="zoom:50%;" />



|                         For  반복문                          |                        For..of 반복문                        |
| :----------------------------------------------------------: | :----------------------------------------------------------: |
| <img src="/images/2024--03-07-loops_array/image-20240310152934346.png" alt="image-20240310152934346" style="zoom:50%;" /> | <img src="/images/2024--03-07-loops_array/image-20240310153338305.png" alt="image-20240310153338305" style="zoom:50%;" /> |
| <img src="/images/2024--03-07-loops_array/image-20240310153018427.png" alt="image-20240310153018427" style="zoom:50%;" /> | <img src="/images/2024--03-07-loops_array/image-20240310153301068.png" alt="image-20240310153301068" style="zoom:50%;" /> |
| => 변수로 배열의 인덱스에 접근해서 배열에 연결<br />=> <span style="color:green">인덱스가 필요한 경우 사용</span> | => 인덱스 / 변수 없이 배열의 각 항목이 반환<br />=> 코드 가독성이 높고 간편함 |

<br><br>

<br>





> ### For..in 루프
>
> <span style="font-size:80%">'키-값' 쌍의 객체 리터럴에서 반복문 실행</span>

<br>

<span style="font-size:80%; color:orangered">임의의 순서로 반복을 실행함으로 인덱스 순서가 중요한 배열에서는 사용할 수 없다</span>

<span style="font-size:80%">객체의 속성 쉽게 확인 가능  (특정 값을 가진 key 확인)</span>



<br>

<span style="font-size:85%; font-weight:bold">[ Syntax ]</span>

```javascript
for ( 변수 in 객체리터럴) {
  반복 동작 실행문
}
```



<br>

<span style="font-size:85%; font-weight:bold"> For..in 반복문 연습 </span>

![image-20240314211339338](/images/2024-03-07-loops_array/image-20240314211339338.png)

<img src="/images/2024-03-07-loops_array/image-20240314211140621.png" alt="image-20240314211140621" style="zoom:50%;" />

<span style="font-size:80%">=> 속성의 키를 반환시킬 변수 person</span>

<span style="font-size:80%">=> 변수 person을 활용한 대괄호 표기법 이용하면 객체의 값에 동적으로 액세스할 수 있음</span>

<br>

<span style="font-size:80%">문자열 템플릿 리터럴 사용</span>

​	<img src="/images/2024--03-07-loops_array/image-20240310163442723.png" alt="image-20240310163442723" style="zoom:50%;" />

<img src="/images/2024--03-07-loops_array/image-20240310163501061.png" alt="image-20240310163501061" style="zoom:50%;" />







