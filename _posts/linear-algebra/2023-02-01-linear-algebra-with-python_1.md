---
layout: single
title: "[선형대수(with 파이썬)] 1. 스칼라, 벡터, 텐서"
categories: Linear-algebra
tag: [python, Linear-algebra]
toc: true
author_profile: True
---

## 스칼라, 벡터, 텐서

### 1. 용어 정리

 - **스칼라** : 숫자 하나의 데이터

$$ x \subseteq R $$

- **벡터** : 수 또는 기호의 1차원 배열,
<u>*벡터와 배열은 다르다*<u>

$$
 \begin{pmatrix}
  x_{1} \\
  x_{2} \\
  x_{3} \\
  x_{4} \\
 \end{pmatrix}
$$

 - **행렬(matrix)** : 같은 타입의 변수들로 이루어진 유한 집합

$$
A_{4,3} =
 \begin{pmatrix}
  a_{1,1} & a_{1,2} & a_{1,3} \\
  a_{2,1} & a_{2,2} & a_{2,3} \\
  a_{3,1} & a_{3,2} & a_{3,3} \\
  a_{4,1} & a_{4,2} & a_{4,3} \\
 \end{pmatrix}
$$

<center> 4x3 행렬 </center>

- **텐서** : 수학적인 개념으로 데이터의 배열이라고 볼 수 있습니다. 텐서의 Rank는 간단히 말해서 몇 차원 배열인가를 의미합니다.

---

공부한 전체 코드는 깃허브에 올렸습니다.

**[깃허브 링크](<https://github.com/mgskko/linear-algebra-with-python/blob/master/%EC%8A%A4%EC%B9%BC%EB%9D%BC%20%2C%EB%B2%A1%ED%84%B0%2C%20%ED%85%90%EC%84%9C.ipynb>)**
{: .notice--primary}
