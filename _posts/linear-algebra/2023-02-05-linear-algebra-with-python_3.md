---
layout: single
title: "[선형대수(with 파이썬)] 3. 벡터와 행렬의 덧셈뺄셈"
categories: Linear-algebra
tag: [python, Linear-algebra]
toc: true
---

## 벡터와 행렬의 덧셈뺄셈


### 1. 용어 정리

 - **정방행렬(square matrix)** : 같은 수의 행과 열을 가지는 행렬을 의미한다.

$$
A_{3,3} =
 \begin{pmatrix}
  a_{1,1} &  & a_{1,3} \\
  a_{2,1} & a_{2,2} & a_{2,3} \\
  a_{3,1} & a_{3,2} & a_{3,3} \\
 \end{pmatrix}
$$

3x3의 정방행렬에 속한다.

 - **대각행렬(diagonal matrix)** : 주대각선 성분이 아닌 모든 성분이 0인 정사각 행렬로 비대각성분이 0이여야 한다.
$$
A_{3,3} =
 \begin{pmatrix}
  a_{1,1} & 0 & 0 \\
  0 & a_{2,2} & 0 \\
  0 & 0 & a_{3,3} \\
 \end{pmatrix}
$$

 - **항등행렬(identity matrix)** :  주대각선의 원소가 모두 1이며 나머지 원소는 모두 0인 정사각 행렬로 반드시 정방행렬이여야 된다.

$$
A_{3,3} =
 \begin{pmatrix}
  1 & 0 & 0 \\
  0 & 1 & 0 \\
  0 & 0 & 1 \\
 \end{pmatrix}
$$

 - **대칭행렬(identity matrix)** : 어떤 행렬 A가 있다고 했을 때, 자신의 전치(transpose)행렬이 원래의 자기 자신과 같은 행렬이다.

$$
A =
 \begin{pmatrix}
  a_{1,1} & a_{2,1} \\
  a_{1,2} & a_{2,2} \\
 \end{pmatrix}
$$

$$
A^T =
 \begin{pmatrix}
  a_{1,1} & a_{1,2} \\
  a_{2,1} & a_{2,2} \\
 \end{pmatrix}
$$

### 2. 벡터의 덧셈과 뺄셈
1. 

$$
x =
 \begin{pmatrix}
   1 \\
   2 \\
 \end{pmatrix}
$$

$$
y =
 \begin{pmatrix}
   3 \\
   4 \\
 \end{pmatrix}
$$

$$
x + y =
 \begin{pmatrix}
   4 \\
   6 \\
 \end{pmatrix}
$$

$$
x - y =
 \begin{pmatrix}
   -2 \\
   -2 \\
 \end{pmatrix}
$$

---

공부한 전체 코드는 깃허브에 올렸습니다.


**[깃허브 링크](<https://github.com/mgskko/linear-algebra-with-python/blob/master/%EB%B2%A1%ED%84%B0%EC%99%80%20%ED%96%89%EB%A0%AC%EC%9D%98%20%EB%8D%A7%EC%85%88%EB%BA%84%EC%85%88.ipynb>)**
{: .notice--primary}