---
layout: single
title: '선형변환의 합성과 행렬의 곱셈'
categories: 선형대수의본질
tag: [math, Matrix multiplication]
toc: true 
author_profile: false
use_math: true
published: true
sidebar:
    nav: "counts"

---

<i><span style="font-size: 14px;">모든 내용은 3Blue1Brown의 <a href ='https://www.3blue1brown.com/topics/linear-algebra'>'Essence of Linear Algebra' </a> 을 번역한 <a href='https://www.youtube.com/@3Blue1BrownKR'>3Blue1Brown 한국어</a>를 정리한 내용입니다.</span></i>

----------------

### 선형변환의 합성 

한 변환과 다른 변환을 순서대로 적용했을 때의 효과를 설명해봅시다. 

예를 들어, 먼저 시계 반대 방향으로 평면을 90도 회전시킨 다음 그 평면을 전단 ( 한쪽 방향으로 밀어서 평행사변형 모양으로 변형되는 변환, 층밀림 변환) 한다고 해 보겠습니다.

![rotate_shear_composition]({{site.url}}/images/2023-12-10-matrix_multiplication/rotate_shear_composition.gif){: .align-center }

그 결과는 회전변환, 전단변환과 구별되는 또 다른 선형변환입니다. 

이 새로운 선형변환을 보통 앞서 적용한 두 다른 변환의 **합성**이라고 합니다. 


![rotate_shear_record]({{site.url}}/images/2023-12-10-matrix_multiplication/rotate_shear_record.png){: .align-center }

예시에서 î이 두 변환에 의해 도달하는 최종 위치는 [1;1] 이며, 그것이 행렬 1열이 됩니다.

마찬가지로 ĵ의 최종 위치는 [-1;0] 이며, 그것이 행렬 2열이 됩니다.


$${\color{#3791F0}{Rotation} + \color{#ED4780}{Share}}$$

$$
\begin{bmatrix}
1 && -1 \\
1 && 0 \\
\end{bmatrix}
$$

두 번의 움직임을 하나의 동작으로 축약한 행렬을 고려할 때, 회전 변환 후에 전단 변환을 수행하는 과정을 다음과 같이 생각할 수 있습니다. 

먼저, 회전 변환 행렬을 초기 벡터에 왼쪽에서 곱해 새로운 방향으로 회전된 벡터를 얻습니다. 그 후, 이 결과에 전단 변환 행렬을 다시 왼쪽에서 곱해주어 최종적으로 변형된 벡터를 얻는 것입니다.

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

수치적으로 이것은 주어진 벡터를 회전, 다음 전단시켰다는 표기가 됩니다. 

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

이렇게 구한 왼쪽 식의 결과와 아까 찾은 새 합성 행렬과 벡터의 곱셈은 동일해야 합니다. 이 새로운 행렬은 회전 다음에 전단과 같은 전체 효과를 나타내어야 하기 때문입니다.

이 새로운 행렬을 기존의 **두 행렬의 곱**으로 표현하는 것이 합리적입니다.

### 두 행렬의 곱

> 두 행렬의 곱셈이 기하학적으로 나타내는 것은 한 변환과 다른 변환의 순차적 적용임을 기억하시기 바랍니다.

이 곱셈 연산은 오른쪽에서 왼쪽으로 읽어야 한다는 점이 약간의 의문을 남길 수 있습니다. 

 첫 번째 작용하는 변환은 오른쪽에 있고, 그 다음 적용하는 변환이 왼쪽에 있습니다. 이는 함수 표기법에서 비롯된 것입니다. 함수는 변수의 왼쪽에 표기되기 때문에 두 함수를 합성하고자 할 때 항상 오른쪽에서 왼쪽으로 읽어야 합니다.. 

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

행렬 $M_1$과 $M_2$가 있다고 생각해봅시다.

![rotate_shear_record]({{site.url}}/images/2023-12-10-matrix_multiplication/multiplication_matrices.png){: .align-center }

$M_1$ 다음 $M_2$에 의한 전체 효과는 새로운 변환으로 볼 수 있습니다.

그 행렬을 찾아보자.

![rotate_shear_record]({{site.url}}/images/2023-12-10-matrix_multiplication/compound_multiply.png){: .align-center }

먼저 **î**이 어디로 가는지 찾아야 합니다.

$M_1$을 적용했을 때의 î의 새로운 좌표는 $M_1$의 1열에 의해 [1;1]에 도달합니다. 그리고 $M_2$를 적용한 후에는 어떻게 되는지 보기 위해서는 벡터 [1;1]에 행렬 $M_2$를 곱해야 합니다.

$$\color{#ED4780}{
\begin{bmatrix}
0 && 2 \\
1 && 0 \\
\end{bmatrix}}
\color{#3791F0}{
\begin{bmatrix}
1  \\
1  \\
\end{bmatrix}}
=\color{#00000}{
\begin{bmatrix}
2  \\
1  \\
\end{bmatrix}}
$$

이것이 합성 행렬의 1열이 됩니다. 

ĵ은 $M_1$의 2열에 의해 먼저 [-2;0]에 도달합니다. 그 후에 이 벡터에 $M_2$를 곱하면 ĵ은 [0;-2]에 도달함을 알 수 있습니다.
 
$$\color{#ED4780}{
\begin{bmatrix}
0 && 2 \\
1 && 0 \\
\end{bmatrix}}
\color{#3791F0}{
\begin{bmatrix}
-2 \\
0  \\
\end{bmatrix}}
=\color{#00000}{
\begin{bmatrix}
0 \\
-2 \\
\end{bmatrix}}
$$

결론적으로 $M_1$ 다음 $M_2$에 의한 전체 효과는 다음과 같이 나타낼 수 있습니다. 

$$\color{#63758F}{
\begin{bmatrix}
2 && 0 \\
1 && -2 \\
\end{bmatrix}}
$$

위 과정은 우리가 수도없이 외워 왔던 공식으로 표현됩니다.

$$\color{#ED4780}{
\begin{bmatrix}
a && b \\
c && d \\
\end{bmatrix}}
\color{#3791F0}{
\begin{bmatrix}
e && f \\
g && h \\
\end{bmatrix}}
=\color{#17C46A}{
\begin{bmatrix}
ae+bg && af+bh\\
ce+dg && cf+dh\\
\end{bmatrix}}
$$

하지만 이러한 과정을 외우기 전에, 행렬의 곱셈이 실제로는 **두 변환의 순차적 적용**임을 이해하는 것이 중요합니다.

### 행렬 곱의 교환 법칙

î을 그대로 두고 ĵ을 오른쪽으로 틀어주는 전단과 90도 회전이 있다고 가정해 봅시다.

전단 다음 회전을 적용하면 î은 [0;1]에, ĵ은 [-1;1]에 도달하는 것을 볼 수 있습니다.

반면에 회전 다음 전단을 적용하면 î은 [1;1]에, ĵ은 [-1;0]에 도달하는 것을 볼 수 있습니다.

이렇게 순서를 변경하면 결과가 달라집니다. 이러한 교환 법칙을 통해 행렬 곱셈이 두 변환의 순서에 따라 다르게 작용함을 이해할 수 있습니다.


![rotate_shear_record]({{site.url}}/images/2023-12-10-matrix_multiplication/rotate_shear_swap.png){: .align-center }

>전체 효과가 명확히 다르기 때문에, 행렬을 곱하는 순서는 분명히 중요합니다.

$$\color{#3791F0}{M_1}\color{#ED4780}{M_2} ≠ \color{#ED4780}{M_2}\color{#3791F0}{M_1}$$
