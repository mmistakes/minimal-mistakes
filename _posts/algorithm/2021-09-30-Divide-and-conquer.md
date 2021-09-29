---
title:  "[Algorithm] Divide and Conquer " 

categories:
  - algorithm
tags:
  - [divide,conquer]

toc: true
toc_sticky: true
 

---

***
이 **포스트**는 한양대학교 김태형 교수님의 **알고리즘 설계와 분석** 과목의 **강의** 와 **강의자료**를 참고하였습니다.

## Divide-and-Conquer
> 문제가 크다면 문제를 작게 나눠서 해결한다. 조각을 냈다면 최종적으로 Combine 해야한다. 이것이 Divide and conquer Algorithm 의 기초이다. 다시 말하면 큰 문제를 작은 문제로 **분할** 한 후 충분히 작아진 문제를 **정복** 한다. 그 후 답을 구해진 것들끼리 **병합** 한다.

위에서도 언급했듯이 세 단계가 주를 이룬다. 전체적으로는 `Top-down approach` 방법을 따른다.

- Divide
  - It **divides** an instance of a problem into **two or more** smaller instances.
  - If the smaller instances are still to large to be solved **readily**, they can be divided into even smaller instances, **until solutions are readily obtainable**   
- Conquer
  - The smaller instances are usually instances of the original problem.
  - We may obtain solutions to the smaller instances **readily**     
- Combine
  - The process of dividing the instance can be obtained **by combining these partial solutions.**

*** 
<br>

    🌜 주관적인 견해가 담긴 정리입니다. 다양한 의견이 있으실 경우
    언제든지 댓글 혹은 메일로 지적해주시면 감사하겠습니다! 😄

[맨 위로 이동하기](#){: .btn .btn--primary }{: .align-right}
