---
title:  "[Algorithm] Karatusba algorithm "

categories:
  - algorithm
tags:
  - [algorithm,Karatusba,divideandconquer]

toc: true
toc_sticky: true


---

***
이 **포스트**는 한국외대 신찬수 교수님의 **알고리즘** 과목의 강의를 참고하였습니다.

>두 수의 곱은 기본연산으로 취급된다. 하지만 만약 그 상수가 엄청나게 큰 수이고 큰 수 끼리의 곱이라면 수행시간에 큰 영향을 끼칠것이다.
> 분할 정복 방법(divide and conquer) 을 이용하여 더 빠른 연산이 가능한지 살펴보자.

n자리의 숫자 A와 B의 곱셈을 살펴볼것이다. 이때 수행되는 기본연산은 몇 번인지 세어볼 것이다.

![image](https://user-images.githubusercontent.com/69495129/134764390-12c5ff0d-1b75-4f27-9b4b-45aa913e7ea7.png)

<br>
두 상수끼리의 곱을 하는데 O(n^2) 라는 빅오 표기가 도출 되게 된다.

divide and conquer 방법을 사용하여 연산을 해보자.

![image](https://user-images.githubusercontent.com/69495129/134764397-89e568f9-86ee-47a1-b379-27f62460536e.png)


<br>
같은 시간의 빅오 표기가 도출된다. 이렇다면 divide and conquer 방법을 사용하는 이유가없다.. 이 때 karatusba라는 사람이
T(n/2) 의 계수를 4에서 3으로 바꿀 수 있다는 생각을 하였다. 그를 Karatusba algorithm 이라고 칭한다.

<br>
![image](https://user-images.githubusercontent.com/69495129/134764406-6ec2732f-5485-4b6a-9802-c5c502494265.png)
<br>

위에 보면 `n/2자리수 곱셈을 4번에서 3번으로 줄였다`.


<br>
위에서 생략한 점화식 풀이는 다음과 같다.
<br>
![image](https://user-images.githubusercontent.com/69495129/134764421-4dd14ae5-1934-4072-a37f-d98df809fecb.png)
<br>


### Summary
>처음에는 어려운 개념이라고 생각했지만, 큰 문제를 쪼개서 문제를 품으로써 계산 성능을 눈에 띄게 증가시켜줄 수 있었다. 역시 수학의 기본이 중요하다고 생각한다.
> 여기서도 Karatusba 는 중학교때 배우는 결합법칙? 분배법칙? 을 이용해서 약간 식을 변형함으로써 성능을 향상시켰다.



*** 
<br>

    🌜 주관적인 견해가 담긴 정리입니다. 다양한 의견이 있으실 경우
    언제든지 댓글 혹은 메일로 지적해주시면 감사하겠습니다! 😄

[맨 위로 이동하기](#){: .btn .btn--primary }{: .align-right}
