---
title:  "[Algorithm] Order " 

categories:
  - algorithm
tags:
  - [order]

toc: true
toc_sticky: true
 

---

***
이 **포스트**는 한양대학교 김태형 교수님의 **알고리즘 설계와 분석** 과목의 강의자료를 참고하였습니다.
## Order
***
We just illustrated that an algorithm with a time complexity of n is more efficient than one with a time complexity of n2 for sufficiently large values of n, regardless of how long it takes to process the basic operations in the two algorithms. Suppose now that we have two algorithms for the same problem and that their every-case time complexities are 100n for the first algorithm and 0.01n2 for the second algorithm. Using an argument such as the one just given, we can show that the first algorithm will eventually be more efficient than the second one.
***
any linear-time algorithm is eventually more efficient than any quadratic-time algorithm.
**we are interested in eventual behavior**


|            | big O                                                        | big Omega                                                    | big Theta                                                    | small o                                                      |
| ---------- | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| Definition | For a given complexity function f(n), O(f(n)) is the set of complexity functions g(n) for which there exists some positive real constant c and some nonnegative integer N such that for all n >= N | For a given complexity function f(n), Ω(f(n)) is the set of complexity functions g(n) for which there exists some positive real constant c and some nonnegative integer N such that, for all n >= N | For a given complexity function f(n) This means that θ(f(n)) is the set of complexity functions g(n) for which there exists some positive real constants c and d and some nonnegative integer N such that, for all n >= N | For a given complexity function f(n), o(f(n)) is the set of all complexity functions g(n) satisfying the following : For every positive real constant c there exists a nonnegative integer N such that, for all n>= N |

![image](https://user-images.githubusercontent.com/69495129/133478004-e6c81eb9-f539-41be-b45b-ad4fc2c28171.png)
![image](https://user-images.githubusercontent.com/69495129/133478021-ab721a70-7703-4cff-ad07-7ffa39ad5322.png)
![image](https://user-images.githubusercontent.com/69495129/133478029-54423766-65e2-41e9-9f43-62e376617767.png)
![image](https://user-images.githubusercontent.com/69495129/133478042-d38676b1-f16d-4852-bcf6-e0cb26a635ae.png)
![image](https://user-images.githubusercontent.com/69495129/133478050-4541565b-cf2f-42f8-8c0c-a9d7a93fb48c.png)
![image](https://user-images.githubusercontent.com/69495129/133478058-40462318-0b8e-40de-8a46-97bbfc06f29e.png)
![image](https://user-images.githubusercontent.com/69495129/133478069-401db730-87bd-42c5-a080-d19eacfccc0c.png)
![image](https://user-images.githubusercontent.com/69495129/133478086-1a14e07c-991a-4bb4-b5d1-5056a914e749.png)
![image](https://user-images.githubusercontent.com/69495129/133478096-f08893b1-1418-43d5-96db-b089046cc70a.png)


위 그림을 보면 크게 4가지의 Order 로 분류할 수 있다.

## Big O Notation: Definition
- Although g(n) starts out above cf(n) in the figure, eventually it falls beneath cf(n) and **stays there**. (한번 역전되면 재역전은 일어나지 않는다.)
- if g(n) is the time complexity for an algorithm, **eventually** the running time of the algorithm will be at least **as good as** f(n) ( f(n)은 특정 N이상의 n 에서 g(n) 보다 절대 성능이 좋아 지지 못한다.)
- f(n) is called as an asymptotic **upper** bound 

## Big Ω Notation : Definition
- Although g(n) starts out below cf(n) in the figure, **eventually** it goes **above** cf(n) and **stays there**
- if g(n) is the time complexity for an algorithm, **eventually** the running time of the algorithm will be at least **as bad as** f(n) ( f(n) 보다 g(n)은 성능이 더 좋을 수 없다)
- f(n) is called as an asymptotic **lower** bound 

## Big O vs. Small o
비슷하지만, Big O 에서의 c는 some constant 인 반면, Small o 에서의 c 는 For **every** positive real constant c 인 상황에서 조건을 만족해야한다
만약 g(n) 이 o(f(n))에 포함되어있다면 g(n) is eventually **much better** than f(n) f(n) 이 더 그래프에서 위를 차지한다는 것이므로 시간 복잡도(계산 성능) 에 대해서는 g(n) 의 알고리즘이 더 좋다고 할 수 있다.

## Properties of Order:
![image](https://user-images.githubusercontent.com/69495129/133480878-e24808fd-84ca-4afa-abdd-b5a271c970c2.png)
![image](https://user-images.githubusercontent.com/69495129/133480900-113df28d-f697-462d-b4b9-7d84607821f3.png)





*** 
<br>

    🌜 주관적인 견해가 담긴 정리입니다. 다양한 의견이 있으실 경우
    언제든지 댓글 혹은 메일로 지적해주시면 감사하겠습니다! 😄

[맨 위로 이동하기](#){: .btn .btn--primary }{: .align-right}
