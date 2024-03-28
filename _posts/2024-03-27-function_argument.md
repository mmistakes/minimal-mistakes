---
layout: single
title: "[자바스크립트_개념정리] 함수를 반환/인수로 전달하는 방법"
typora-root-url: ../
---



함수를 일반적인 값으로 취급되어 함수가 반환되든 또는 인수로 전달되든 그 함수를 전달할 수 있음



1. 함수를 인수로 받아 다른 함수에 전달하는 방법 (인수로써의 함수)





<img src="/images/2024-03-27-function_argument/image-20240327163157399.png" alt="image-20240327163157399" style="zoom:50%;" />

<img src="/images/2024-03-27-function_argument/image-20240327163432446.png" alt="image-20240327163432446" style="zoom:50%;" />

=> 1과 6 사이의 랜덤 숫자가 두 번 출력됨

① callTwice 라는 이름의 함수를 정의 (매개변수자리에 임의의 함수이름을 넣고, 함수가 두번 실행되도록)

② rollDie 라는 이름의 함수를 정의 (주사위처럼 1에서 6까지의 숫자 중 랜덤한 숫자가 나오도록)

③ rollDie 함수를 인수로 받아 callTwice 함수에 전달하여 두 번의 실행으로 랜덤한 두 개의 숫자가 출력

​	* 이때 rollDie() 가 아니라 rollDie 인 이유는 callTwice 함수 내에서 실행되게 하기 위해서이다.

​	  (괄호를 붙이면 rollDie함수가 이미 실행되어 나온 숫자가 callTwice 함수에 전달됨)

<br>	

<img src="/images/2024-03-27-function_argument/image-20240327171443195.png" alt="image-20240327171443195" style="zoom:50%;" />

<img src="/images/2024-03-27-function_argument/image-20240327171348905.png" alt="image-20240327171348905" style="zoom:50%;" />

=> rollDie 함수를 인수로 받아 1부터 6까지의 랜덤 숫자가 10번 반복 실행되는 함수 callTenTimes 

<br>

<br>



2. 함수 내에서 함수를 값으로 반환하는 방법

   <img src="/images/2024-03-27-function_argument/image-20240327232119671.png" alt="image-20240327232119671" style="zoom:50%;" />

<img src="/images/2024-03-27-function_argument/image-20240327232149441.png" alt="image-20240327232149441" style="zoom:50%;" />

=> 해당 함수를 호출하는 것이 아니라 함수가 값이 되어 반환되는 것임





어떤 값이 최소/최댓값 사이에 있는지 확인 

<img src="/images/2024-03-27-function_argument/image-20240327233236984.png" alt="image-20240327233236984" style="zoom:50%;" />

<img src="/images/2024-03-27-function_argument/image-20240327233254127.png" alt="image-20240327233254127" style="zoom:50%;" />

=> 최소/최댓값을 직접 코드에 입력한 하드코딩





팩토리 함수 설정하여 활용 (팩토리 함수는 함수를 만들어주는 함수)

최솟값, 최댓값을 지정한 함수를 변수에 저장하고, 지정한 값에 따라 다른 버전의 함수를 각각 실행 가능

범위 안에 있으면 true, 범위 밖에 있으면 false



<img src="/images/2024-03-27-function_argument/image-20240327234304078.png" alt="image-20240327234304078" style="zoom:50%;" />

<img src="/images/2024-03-27-function_argument/image-20240327234911584.png" alt="image-20240327234911584" style="zoom:50%;" />


=> 0세 ~ 18세까지는 child

<br>

<img src="/images/2024-03-27-function_argument/image-20240327235135400.png" alt="image-20240327235135400" style="zoom:50%;" />

=> 19세 ~ 64세까지는 adult

<br>

<img src="/images/2024-03-27-function_argument/image-20240327235852723.png" alt="image-20240327235852723" style="zoom:50%;" />

 => 65세 ~ 100세까지는 senior









[메서드]



메서드와 함수의 다른 점

메서드 : 객체에 종속된 특성으로 함수에 포함되는 개념

​	메서드 이름 앞에 점을 찍어 사용

​	모든 메서드는 함수. but 모든 함수가 메서드이지는 않음



메서드를 객체에 추가하는 방법

<img src="/images/2024-03-27-function_argument/image-20240328110112088.png" alt="image-20240328110112088" style="zoom:50%;" />

<img src="/images/2024-03-27-function_argument/image-20240328110126684.png" alt="image-20240328110126684" style="zoom:50%;" />

=> myMath라는 객체에 속성으로 추가된 함수

<br>

<img src="/images/2024-03-27-function_argument/image-20240328110523131.png" alt="image-20240328110523131" style="zoom:50%;" />

=> 이 구문으로 써도 결과는 나오지만 보통 위에 있는 방법으로 사용





<img src="/images/2024-03-27-function_argument/image-20240328111212678.png" alt="image-20240328111212678" style="zoom:50%;" />

<img src="/images/2024-03-27-function_argument/image-20240328111456326.png" alt="image-20240328111456326" style="zoom:50%;" />

=> 축양형으로 function 키워드 없이 작성해도 됨



메서드 퀴즈

<img src="/images/2024-03-27-function_argument/image-20240328112150907.png" alt="image-20240328112150907" style="zoom:50%;" />







[this 키워드]

메서드에 있는 객체를 가리킬 때 사용