---
layout: single
title: "[자바스크립트_개념정리] While 루프"
typora-root-url: ../
---

 While 루프

반복 횟수가 정해져 있지 않을 때 유용, 계속 반복 가능, 사용자 입력 값을 포함할 수 있음

=> 게임루프 (언제 끝날지, 누가 이길지 알 수 없음)에 사용



<img src="/images/2024-03-07-loops_while/image-20240307230320719.png" alt="image-20240307230320719" style="zoom:50%;" />

<img src="/images/2024-03-07-loops_while/image-20240307230302895.png" alt="image-20240307230302895" style="zoom:50%;" />



*암호 입력 실습

<img src="/images/2024-03-07-loops_while/image-20240307231714433.png" alt="image-20240307231714433" style="zoom:50%;" />

=> while 조건에 맞지 않는다면(guess === SECRET) 밑에 있는 콘솔 로그 내용이 출력 



​	틀린 암호 입력

<img src="/images/2024-03-07-loops_while/image-20240307231752396.png" alt="image-20240307231752396" style="zoom:50%;" />

<img src="/images/2024-03-07-loops_while/image-20240307231813474.png" alt="image-20240307231813474" style="zoom:50%;" />





맞는 암호 입력.     

<img src="/images/2024-03-07-loops_while/image-20240307231851604.png" alt="image-20240307231851604" style="zoom:50%;" />

<img src="/images/2024-03-07-loops_while/image-20240307231944080.png" alt="image-20240307231944080" style="zoom:50%;" />











break (정지 키워드)

주로 언제까지 반복할지 모르는 while에서 자주 사용

<img src="/images/2024-03-07-loops_while/image-20240308170125865.png" alt="image-20240308170125865" style="zoom:50%;" />

<img src="/images/2024-03-07-loops_while/image-20240308170243612.png" alt="image-20240308170243612" style="zoom:50%;" />

<img src="/images/2024-03-07-loops_while/image-20240308170326859.png" alt="image-20240308170326859" style="zoom:50%;" />

<img src="/images/2024-03-07-loops_while/image-20240308171058263.png" alt="image-20240308171058263" style="zoom:50%;" />

<img src="/images/2024-03-07-loops_while/image-20240308171135908.png" alt="image-20240308171135908" style="zoom:50%;" />



=> while 조건이 참이고 break가 없으면 계속 반복. 

<br>

<img src="/images/2024-03-07-loops_while/image-20240314213526679.png" alt="image-20240314213526679" style="zoom:50%;" />

<img src="/images/2024-03-07-loops_while/image-20240314213608758.png" alt="image-20240314213608758" style="zoom:50%;" />

<img src="/images/2024-03-07-loops_while/image-20240314213718155.png" alt="image-20240314213718155" style="zoom:50%;" />

While (true) 를 입력하면 무한루프가 생성됨

true값인 확인을 누르면 루프가 종료되고 콘솔에 Done 이 뜬다





prompt는 문자열 입력에 사용되기 때문에 숫자를 입력하려면 변환을 시켜줘야(parseInt 활용) 유효한 숫자가 됨

