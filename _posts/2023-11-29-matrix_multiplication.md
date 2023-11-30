---
layout: single
title: '선형변환의 합성과 행렬의 곱셈'
categories: 선형대수의본질
tag: [math, Matrix multiplication]
toc: true 
author_profile: false
use_math: true
published: false
sidebar:
    nav: "counts"

---

<i><span style="font-size: 14px;">모든 내용은 3Blue1Brown의 <a href ='https://www.3blue1brown.com/topics/linear-algebra'>'Essence of Linear Algebra' </a> 을 번역한 <a href='https://www.youtube.com/@3Blue1BrownKR'>3Blue1Brown 한국어</a>를 정리한 내용입니다.</span></i>

----------------

### 선형변환의 합성 

한 변환과 다른 변환을 순서대로 적용했을 때의 효과를 설명해봅시다. 

예를 들어, 먼저 시계 반대 방향으로 평면을 90도 회전시킨 다음 그 평면을 전단 ( 한쪽 방향으로 밀어서 평행사변형 모양으로 변형되는 변환, 층밀림 변환) 한다고 해 보겠습니다.

![rotate_shear_composition]({{site.url}}/images/2023-11-29-matrix_multiplication/rotate_shear_composition.gif){: .align-center }

그 결과는 회전변환, 전단변환과 구별되는 또 다른 선형변환입니다. 

이 새로운 선형변환을 보통 앞서 적용한 두 다른 변환의 **합성**이라고 합니다. 


![rotate_shear_record]({{site.url}}/images/2023-11-29-matrix_multiplication/rotate_shear_record.png){: .align-center }

예시에서 î이 두 변환에 의해 도달하는 최종 위치는 [1;1] 이며, 그것이 행렬 1열이 됩니다.

마찬가지로 ĵ의 최종 위치는 [-1;0] 이며, 그것이 행렬 2열이 됩니다.


$${\color{#3791F0}{Rotation} + \color{#ED4780}{Share}}$$

$$
\begin{bmatrix}
1 && -1 \\
1 && 0 \\
\end{bmatrix}
$$

위 행렬은 두 번의 움직임을 한 번의 동작으로 축약한 것입니다. 

회전 변환 후 전단 변환을 수행하는 과은 다음과 같이 생각할 수 있습니다. 

먼저 회전변환행렬을 왼쪽에 붙여 벡터에 곱해준 후 그렇게 구해준 것의 왼쪽에 전단변환행렬을 곱해주는 것입니다.

$$\color{#ED4780}{
\begin{bmatrix}
1 && 1 \\
0 && 1 \\
\end{bmatrix}}
\color{#3791F0}{
\begin{bmatrix}
0 && -1 \\
1 && 0 \\
\end{bmatrix}}
=\color{#17C46A}{
\begin{bmatrix}
1 && -1 \\
1 && 0 \\
\end{bmatrix}}
$$

$$
{\color{#ED4780}{Share} \quad \color{#3791F0}{Rotation} \quad\;\; \color{#17C46A}{Composition}}
$$

수치적으로 이것은 주어진 벡터를 회전, 다음 전단시켰다는 표기사 됩니다. 

다시 표현하면 

$$\color{#ED4780}{
\begin{bmatrix}
1 && 1 \\
0 && 1 \\
\end{bmatrix}}
\color{#3791F0}{
\begin{bmatrix}
0 && -1 \\
1 && 0 \\
\end{bmatrix}}
\begin{bmatrix}
\color{#7252EF}{x}\\
\color{#7252EF}{y} \\
\end{bmatrix}
=\color{#17C46A}{
\begin{bmatrix}
1 && -1 \\
1 && 0 \\
\end{bmatrix}}
\begin{bmatrix}
\color{#7252EF}{x}\\
\color{#7252EF}{y} \\
\end{bmatrix}
$$

이렇게 구한 왼쪽 식의 결과와 아까 찾은 새 합성 행렬과 벡터의 곱셈은 같아야 할 겁니다. 이 새로운 행렬이 회전 다음 전단과 같은 전체 효과를 나타내야 하니까요.

이 새로운 행렬을 기존 **두 행렬의 곱**으로 부르는 것이 합리적일 것 같습니다. 

> 두 행렬의 곱셈이 기하학적으로 나타내는 것은 한 변환과 다른 변환의 순차적 적용임을 기억하시기 바랍니다. 

살짝 의문이 드는것은 오른쪽에서 왼쪽으로 읽어야 한다느 점입니다.

첫 번째 작용하는 변환은 오른쪽에 있고 그 다음 적용하는 변환이 왼쪽에 있죠. 이는 함수 표기로부터 비롯됩니다. 

함수는 변수의 왼쪽에 표기하기 째문에 두 함수를 합성하고 싶을 때에도 항상 오른쪽에서 왼쪽으로 읽어야 합니다. 

$$
f(g(x))\\
\xleftarrow{\text{Read right to left}}
$$

$$\color{#ED4780}{
\begin{bmatrix}
1 && 1 \\
0 && 1 \\
\end{bmatrix}}
\color{#3791F0}{
\begin{bmatrix}
0 && -1 \\
1 && 0 \\
\end{bmatrix}}
$$

