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

## Order
***
We just illustrated that an algorithm with a time complexity of n is more efficient than one with a time complexity of n2 for sufficiently large values of n, regardless of how long it takes to process the basic operations in the two algorithms. Suppose now that we have two algorithms for the same problem and that their every-case time complexities are 100n for the first algorithm and 0.01n2 for the second algorithm. Using an argument such as the one just given, we can show that the first algorithm will eventually be more efficient than the second one.
***
any linear-time algorithm is eventually more efficient than any quadratic-time algorithm.
**we are interested in eventual behavior**


|            | big O                                                        | big Omega | big Theta | small o |
| ---------- | ------------------------------------------------------------ | --------- | --------- | ------- |
| Definition | For a given complexity function f(n), O(f(n)) is the set of complexity functions g(n) for which there exists some positive real constant c and some nonnegative integer N such that for all n >= N |           |           |         |
| Expression | $$<br/>g(n) \leq c * f(n)<br/>$$                             |           |           |         |











*** 
<br>

    🌜 주관적인 견해가 담긴 정리입니다. 다양한 의견이 있으실 경우
    언제든지 댓글 혹은 메일로 지적해주시면 감사하겠습니다! 😄

[맨 위로 이동하기](#){: .btn .btn--primary }{: .align-right}
