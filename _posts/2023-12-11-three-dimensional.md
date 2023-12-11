---
layout: single
title: '3차원 선형변환'
categories: 선형대수의본질
tag: [math, Linear transformations]
toc: true 
author_profile: false
use_math: true
sidebar:
    nav: "counts"

---

<i><span style="font-size: 14px;">모든 내용은 3Blue1Brown의 <a href ='https://www.3blue1brown.com/topics/linear-algebra'>'Essence of Linear Algebra' </a> 을 번역한 <a href='https://www.youtube.com/@3Blue1BrownKR'>3Blue1Brown 한국어</a>를 정리한 내용입니다.</span></i>

----------------

2차원에서의 핵심 아이디어를 알면 그것을 더 높은 차원에서도 원활히 활용할 수 있습니다. 

예를 들어, 어떤 선형변환이 3차원 벡터를 입력으로 가지고 또한 3차원 벡터를 출력으로 가진다고 합시다.

 $$ 
 \color{#0B8CE6}{
\begin{bmatrix}
2 \\
6 \\
-1 \\
\end{bmatrix}
}

 L(\vec{v}) 
  \color{#3AB500}{
\begin{bmatrix}
3 \\
2 \\
-1 \\
\end{bmatrix}}
 $$

$$\color{#0B8CE6}{\text{벡터 입력값}} \quad \color{#3AB500}{\text{벡터 출력값}}$$

2차원에서처럼, 공간상 움직이는 점 하나하나는 해당 지점에 종점을 갖는 벡터를 나타냅니다. 

또한 2차원에서처럼, 어떤 변환은 그 기저 벡터의 이동 위치로 완전히 기술됩니다. 

### 3 x 3 행렬
흔히 쓰는 표준 기저 벡터 3개가 있습니다. 

- $x$ 방향의 $ \hat{\imath}$ 
- $y$방향의 $\hat{\jmath}$
- $z$방향의 $\hat{k}$

![Alt text]({{site.url}}/images/2023-12-11-three-dimensional/3d.png)

각 좌표의 도달 벡터를 3x3 행렬로 기록하면 

$$
\color{#26BC66}{
\hat{\imath} \to \begin{bmatrix}
1 \\
0 \\
-1 \\
\end{bmatrix}
}\quad
\color{#E65646}{
\hat{\jmath} \to \begin{bmatrix}
1 \\
1 \\
0 \\
\end{bmatrix}}\quad
\color{#097BE5}{
\hat{k} \to \begin{bmatrix}
1 \\
0 \\
1 \\
\end{bmatrix}}
$$

행렬 속 숫자 9개를 하나의 변환으로 완전히 설명할 수 있습니다.

$$
\begin{bmatrix}
\color{#26BC66}{1} && \color{#E65646}{1} && \color{#097BE5}{1} \\
\color{#26BC66}{0} && \color{#E65646}{1} && \color{#097BE5}{0}\\
\color{#26BC66}{-1} && \color{#E65646}{0} &&\color{#097BE5}{1}\\
\end{bmatrix}
$$

좌표가 [x;y;z]인 벡터의 도달점을 알고 싶으면 2차원에서 했던 것과 거의 똑같은 과정을 거치면 됩니다. 

벡터의 각 좌표는 각 기저벡터를 스케일하는 지침으로 생각할 수 있고 그들을 합산하여 원래 벡터를 얻을 수 있죠.

$$
\color{#E56900}{\vec{v}} = \begin{bmatrix} x\\ y\\ z\end{bmatrix} = x\color{#26BC66}{\hat{\imath}} +y\color{#E65646}{\hat{\jmath}} + z\color{#097BE5}{\hat{k}}

$$

도달 벡터를 구할려면, 좌표의 스칼라를 대응하는 행렬의 열과 곱한 뒤 결과값 세 개를 더해주면 됩니다.


$$
\begin{bmatrix}
\color{#26BC66}{0} && \color{#E65646}{1} && \color{#097BE5}{2} \\
\color{#26BC66}{3} && \color{#E65646}{4} && \color{#097BE5}{5} \\
\color{#26BC66}{6} && \color{#E65646}{7} && \color{#097BE5}{8}
\end{bmatrix}
\begin{bmatrix}
\color{#E56900}{x} \\
\color{#E56900}{y} \\
\color{#E56900}{z} \\
\end{bmatrix}
= \color{#E56900}{x}
\color{#26BC66}{\begin{bmatrix}
0 \\
3 \\
6 \\
\end{bmatrix}}
+ \color{#E56900}{y}
\color{#E65646}{\begin{bmatrix}
1 \\
4 \\
7 \\
\end{bmatrix}}
+ \color{#E56900}{z}
\color{#097BE5}{\begin{bmatrix}
2 \\
5 \\
8 \\
\end{bmatrix}}
$$

### 행렬의 곱셈
수치적 행렬의 곱셈 또한 2차원과 꽤 비슷합니다.


$$
\begin{aligned}
\color{#ED4780}{
\begin{bmatrix}
0 && -2 && 2 \\
5 && 1 && 5 \\
1 && 4 && -1 \\
\end{bmatrix}
}
\begin{bmatrix}
\color{#26BC66}{0} && \color{#E65646}{1} && \color{#097BE5}{2} \\
\color{#26BC66}{3} && \color{#E65646}{4} && \color{#097BE5}{5} \\
\color{#26BC66}{6} && \color{#E65646}{7} && \color{#097BE5}{8}
\end{bmatrix} \\
= 
\\
\begin{bmatrix}
\color{#ED4780}{0} \times \color{#26BC66}{0} + \color{#ED4780}{-2} \times \color{#26BC66}{3} + \color{#ED4780}{2} \times \color{#26BC66}{6} && \color{#ED4780}{0} \times \color{#E65646}{1} + \color{#ED4780}{-2} \times \color{#E65646}{4} + \color{#ED4780}{2} \times \color{#E65646}{7} && \color{#ED4780}{0} \times \color{#097BE5}{2} + \color{#ED4780}{-2} \times \color{#097BE5}{5} + \color{#ED4780}{2} \times \color{#097BE5}{8} \\

\color{#ED4780}{5} \times \color{#26BC66}{0} + \color{#ED4780}{1} \times \color{#26BC66}{3} + \color{#ED4780}{5} \times \color{#26BC66}{6} && \color{#ED4780}{5} \times \color{#E65646}{1} + \color{#ED4780}{1} \times \color{#E65646}{4} + \color{#ED4780}{5}\times \color{#E65646}{7} && \color{#ED4780}{5} \times \color{#097BE5}{2} + \color{#ED4780}{1} \times \color{#097BE5}{5} + \color{#ED4780}{5} \times \color{#097BE5}{8} \\

\color{#ED4780}{1} \times \color{#26BC66}{0} + \color{#ED4780}{4} \times \color{#26BC66}{3} + \color{#ED4780}{-1} \times \color{#26BC66}{6}  && \color{#ED4780}{1} \times \color{#E65646}{1} + \color{#ED4780}{4} \times \color{#E65646}{4} + \color{#ED4780}{-1} \times \color{#E65646}{7} && \color{#ED4780}{1} \times \color{#097BE5}{2} + \color{#ED4780}{4} \times \color{#097BE5}{5} + \color{#ED4780}{-1} \times \color{#097BE5}{8} \\
\end{bmatrix} \\
= 
\\
\begin{bmatrix}
6 && 6 && 6 \\
33 && 44 && 55 \\
6 && 10 && 14 \\
\end{bmatrix} 
\end{aligned}
$$
