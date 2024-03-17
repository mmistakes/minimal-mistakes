---
layout: single
title: "[자바스크립트_개념정리] 루프"
typora-root-url: ../
---





## LOOPS   루프

​	어떤 기능을 반복 수행하는 것

​	



<br>

> ### FOR 루프
>
>
> 특정 코드 실행 횟수를 정의할 수 있으며, 배열에 사용 가능한 배열루프



<span style="font-size:80%; font-weight:bold">[ Syntax ]</span>

```javascript
for (반복문 실행 시간을 정의하는 코드) {
  반복할 실행문
}
```

<br>





///////////////////////////////////////

(배열 루프랑 따로 ) While 루프

반복 횟수가 정해져 있지 않을 때 유용, 계속 반복 가능, 사용자 입력 값을 포함할 수 있음

=> 게임루프 (언제 끝날지, 누가 이길지 알 수 없음)에 사용



<img src="/images/2024--03-07-loops_array/image-20240307230320719.png" alt="image-20240307230320719" style="zoom:50%;" />

<img src="/images/2024--03-07-loops_array/image-20240307230302895.png" alt="image-20240307230302895" style="zoom:50%;" />



*암호 입력 실습

<img src="/images/2024--03-07-loops_array/image-20240307231714433.png" alt="image-20240307231714433" style="zoom:50%;" />

=> while 조건에 맞지 않는다면(guess === SECRET) 밑에 있는 콘솔 로그 내용이 출력 



​	틀린 암호 입력

<img src="/images/2024--03-07-loops_array/image-20240307231752396.png" alt="image-20240307231752396" style="zoom:50%;" />

<img src="/images/2024--03-07-loops_array/image-20240307231813474.png" alt="image-20240307231813474" style="zoom:50%;" />





맞는 암호 입력.     

<img src="/images/2024--03-07-loops_array/image-20240307231851604.png" alt="image-20240307231851604" style="zoom:50%;" />

<img src="/images/2024--03-07-loops_array/image-20240307231944080.png" alt="image-20240307231944080" style="zoom:50%;" />











break (정지 키워드)

주로 언제까지 반복할지 모르는 while에서 자주 사용

<img src="/images/2024--03-07-loops_array/image-20240308170125865.png" alt="image-20240308170125865" style="zoom:50%;" />

<img src="/images/2024--03-07-loops_array/image-20240308170243612.png" alt="image-20240308170243612" style="zoom:50%;" />

<img src="/images/2024--03-07-loops_array/image-20240308170326859.png" alt="image-20240308170326859" style="zoom:50%;" />

<img src="/images/2024--03-07-loops_array/image-20240308171058263.png" alt="image-20240308171058263" style="zoom:50%;" />

<img src="/images/2024--03-07-loops_array/image-20240308171135908.png" alt="image-20240308171135908" style="zoom:50%;" />



=> while 조건이 참이고 break가 없으면 계속 반복. 

<br>

<img src="/images/2024-03-07-loops_array/image-20240314213526679.png" alt="image-20240314213526679" style="zoom:50%;" />

<img src="/images/2024-03-07-loops_array/image-20240314213608758.png" alt="image-20240314213608758" style="zoom:50%;" />

<img src="/images/2024-03-07-loops_array/image-20240314213718155.png" alt="image-20240314213718155" style="zoom:50%;" />

While (true) 를 입력하면 무한루프가 생성됨

true값인 확인을 누르면 루프가 종료되고 콘솔에 Done 이 뜬다





prompt는 문자열 입력에 사용되기 때문에 숫자를 입력하려면 변환을 시켜줘야(parseInt 활용) 유효한 숫자가 됨





**숫자게임





[For ... of...]반복문

For (변수 of 반복 가능한 객체) { 반복동작실행문 }

배열, 반복가능한 객체를 반복을 시키는 손쉬운 방법

배열이랑 가장 많이 사용.  배열에서의 반복은 값 하나 하나 따로 저장

문자열처럼 반복가능한 객체로 인식되는 것에도 사용 가능

문자열에서의 반복은 철자 하나하나씩 따로 저장

인덱스에 해당하는 변수나 숫자를 쓴다면 배열에 직접 연결해야하지만 이 반복문은 배열에 연결할 필요 없음

객체 리터럴에서는 반복가능한 객체로 인식되지 않기에 사용할 수 없음



<img src="/images/2024--03-07-loops_array/image-20240309211707480.png" alt="image-20240309211707480" style="zoom:50%;" />

<img src="/images/2024--03-07-loops_array/image-20240309211735664.png" alt="image-20240309211735664" style="zoom:50%;" />





// 100일코딩 예시

<img src="/images/2024-03-07-loops_array/image-20240314202125292.png" alt="image-20240314202125292" style="zoom:50%;" />

<img src="/images/2024-03-07-loops_array/image-20240314202153057.png" alt="image-20240314202153057" style="zoom:50%;" />





For  vs  for ... of ...   비교

<img src="/images/2024--03-07-loops_array/image-20240310153403188.png" alt="image-20240310153403188" style="zoom:50%;" />







<img src="/images/2024--03-07-loops_array/image-20240310152934346.png" alt="image-20240310152934346" style="zoom:50%;" />

<img src="/images/2024--03-07-loops_array/image-20240310153018427.png" alt="image-20240310153018427" style="zoom:50%;" />







<img src="/images/2024--03-07-loops_array/image-20240310153338305.png" alt="image-20240310153338305" style="zoom:50%;" />

<img src="/images/2024--03-07-loops_array/image-20240310153301068.png" alt="image-20240310153301068" style="zoom:50%;" />





문자열에서 사용

<img src="/images/2024--03-07-loops_array/image-20240310154906545.png" alt="image-20240310154906545" style="zoom:50%;" />

<img src="/images/2024--03-07-loops_array/image-20240310154939326.png" alt="image-20240310154939326" style="zoom:50%;" />











 객체리터럴에서 반복문을 실행할 수 있는 옵션



1. For...in 루프

   

   ![image-20240314211339338](/images/2024-03-07-loops_array/image-20240314211339338.png)

<img src="/images/2024-03-07-loops_array/image-20240314211140621.png" alt="image-20240314211140621" style="zoom:50%;" />

속성의 키를 반환시킬 변수 person

변수 person을 활용한 대괄호 표기법 이용하면 객체의 값에 동적으로 액세스할 수 있음



문자열 템플릿 리터럴 사용

​	<img src="/images/2024--03-07-loops_array/image-20240310163442723.png" alt="image-20240310163442723" style="zoom:50%;" />

<img src="/images/2024--03-07-loops_array/image-20240310163501061.png" alt="image-20240310163501061" style="zoom:50%;" />







객체를 배열로 만드는 메서드 대문자 Object

Object 메서드는 전달한 객체에서 가져온 키나 값으로 새 배열을 만들 수 있음



**`Object.keys()`** 메서드는 주어진 객체의 속성 이름들을 일반적인 반복문과 동일한 순서로 순회되는 열거할 수 있는 배열로 반환합니다.





<img src="/images/2024--03-07-loops_array/image-20240311153721531.png" alt="image-20240311153721531" style="zoom:50%;" />

객체 키에서 반복을 걸어야 한다면 키를 배열로 만든 후, for of 반복문





Object활용해서 점수 평균내는 과정



<img src="/images/2024--03-07-loops_array/image-20240311154401872.png" alt="image-20240311154401872" style="zoom:50%;" />

<img src="/images/2024--03-07-loops_array/image-20240311154418988.png" alt="image-20240311154418988" style="zoom:50%;" />



<img src="/images/2024--03-07-loops_array/image-20240311154510051.png" alt="image-20240311154510051" style="zoom:50%;" />





<img src="/images/2024--03-07-loops_array/image-20240311154635945.png" alt="image-20240311154635945" style="zoom:50%;" />

<img src="/images/2024--03-07-loops_array/image-20240311154904960.png" alt="image-20240311154904960" style="zoom:50%;" />







<img src="/images/2024--03-07-loops_array/image-20240311164213962.png" alt="image-20240311164213962" style="zoom:50%;" />

객체에는 길이가 없기 때문에 Object메서드로 값으로 된 배열을 만들어 주고 그 길이를 사용



<img src="/images/2024--03-07-loops_array/image-20240311164239993.png" alt="image-20240311164239993" style="zoom:50%;" />
