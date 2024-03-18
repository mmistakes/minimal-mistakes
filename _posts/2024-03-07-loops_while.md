---
layout: single
title: "[자바스크립트_개념정리] While 루프"
typora-root-url: ../
---

 <br>

>  ### While 루프
>
> <span style="font-size:85%">조건이 참일때 실행</span>



<br>

<span style="font-size:85%"><span style="color:orangered">반복 횟수가 정해져 있지 않을 때</span> 유용하며 사용자 입력 값을 포함할 수 있다</span>

<span style="font-size:85%">객체나 배열을 통하지 않고 while 반복문을 사용해서 조건(불리언 값)을 정의하기 때문에</span>

<span style="font-size:85%">반복문에서 특정  <span style="color:orangered">조건이 충족되는 한 코드가 계속 반복적으로 실행된다</span></span>

<span style="font-size:85%">=> 언제 끝날지, 누가 이길지 알 수 없는 게임루프에 사용가능</span>

<br>

<span style="font-size:85%; font-weight:bold">[ syntax ]</span>

```javascript
while ( 조건 ) {
  반복동작실행문
}
```

<br>

<span style="font-size:85%; color:green">반복이 실행되기 전에 조건문의 참/거짓을 판단하고 참일 경우 반복문을 실행, 거짓일 경우 반복문 다음 명령으로 넘어감</span>

<br>

<br>

<span style="font-size:85%; font-weight:bold">[ While 반복문 연습 ]</span>

<img src="/images/2024-03-07-loops_while/image-20240307230320719.png" alt="image-20240307230320719" style="zoom:50%;" />

<img src="/images/2024-03-07-loops_while/image-20240307230302895.png" alt="image-20240307230302895" style="zoom:50%;" />

<br>

<span style="font-size:85%; font-weight:bold">[ 암호 입력하기 ]</span>

<img src="/images/2024-03-07-loops_while/image-20240307231714433.png" alt="image-20240307231714433" style="zoom:50%;" />

<span style="font-size:80%">=> 암호인 'Goodnight'을 입력하면 while 반복문 후의 내용이 출력되고, </span>

​    <span style="font-size:80%">틀린 암호를 입력하면 while 반복문이 계속 반복된다</span>

<br>

​	<span style="font-size:80%; color:grey">틀린 암호 입력</span>

<img src="/images/2024-03-07-loops_while/image-20240307231752396.png" alt="image-20240307231752396" style="zoom:50%;" />

<img src="/images/2024-03-07-loops_while/image-20240307231813474.png" alt="image-20240307231813474" style="zoom:50%;" />



<br>

<span style="font-size:80%; color:grey">맞는 암호 입력</span>

<img src="/images/2024-03-07-loops_while/image-20240307231851604.png" alt="image-20240307231851604" style="zoom:50%;" />

<img src="/images/2024-03-07-loops_while/image-20240307231944080.png" alt="image-20240307231944080" style="zoom:50%;" />



<br><br>

<br>

#### break 정지 키워드

<span style="font-size:80%">반복문을 종료시킨다</span>

<span style="font-size:80%">주로 언제까지 반복할지 모르는 while에서 자주 사용</span>



<br>

<span style="font-size:85%; font-weight:bold">[ while 반복문에서 break 사용 ]</span>

<img src="/images/2024-03-07-loops_while/image-20240308170125865.png" alt="image-20240308170125865" style="zoom:50%;" />



<img src="/images/2024-03-07-loops_while/image-20240308170243612.png" alt="image-20240308170243612" style="zoom:50%;" />

<img src="/images/2024-03-07-loops_while/image-20240308170326859.png" alt="image-20240308170326859" style="zoom:50%;" />

<img src="/images/2024-03-07-loops_while/image-20240308171058263.png" alt="image-20240308171058263" style="zoom:50%;" />

<img src="/images/2024-03-07-loops_while/image-20240308171135908.png" alt="image-20240308171135908" style="zoom:50%;" />



<span style="font-size:80%">=> while 조건이 참이고 break가 없으면 계속 반복됨 (무한루프)</span>

<span style="font-size:80%">=> 'stop copying me'를 입력하면 반복이 종료되고 그 다음 실행문으로</span>

<br>



숫자 맞추기 게임

prompt는 문자열 입력에 사용되기 때문에 숫자를 입력하려면 변환을 시켜줘야(parseInt 활용) 유효한 숫자가 됨

