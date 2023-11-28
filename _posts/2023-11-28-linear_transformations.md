---
layout: single
title: '선형변환과 행렬'
categories: 선형대수의본질
tag: [math, matrice, Linear transformations]
toc: true 
author_profile: false
use_math: true
sidebar:
    nav: "counts"

---

<i><span style="font-size: 14px;">모든 내용은 3Blue1Brown의 <a href ='https://www.3blue1brown.com/topics/linear-algebra'>'Essence of Linear Algebra' </a> 을 번역한 <a href='https://www.youtube.com/@3Blue1BrownKR'>3Blue1Brown 한국어</a>를 정리한 내용입니다.</span></i>

----------------

<br>


## 변환

**변환**은 함수의 다른 말로, 입력이 주어지면 출력을 생성하는 수학적인 개념입니다. 

선형대수학에서의 변환은 어떤 벡터를 집어넣을 때 다른 벡터를 내놓습니다.

![vector_as_function]({{site.url}}/images/2023-11-28-linear_transformations/vector_as_function.png){: .align-center }

<br>

>"변환" 이라는 단어는 <span style="color:#EEBC2D">움직임</span>을 사용해 생각한다는 것을 내포합니다.

변환을 전체적으로 이해할 때는 모든 입력 벡터가 대응하는 출력 벡터로 어떻게 움직이는지를 상상합니다.

각 벡터를 화살표 대신 종점으로 나타내어 생각할 수도 있습니다. .

![vectors_as_points]({{site.url}}/images/2023-11-28-linear_transformations/vectors_as_points.gif){: .align-center }

변환은 가능한 모든 입출력 벡터 간의 관계를 나타내며, 이것은 공간 내의 한 점이 다른 점으로 이동하는 것으로 생각될 수 있습니다. 

이러한 움직임은 무한한 격자 상의 모든 점에 대해 적용될 수 있습니다.

![vectors_as_points]({{site.url}}/images/2023-11-28-linear_transformations/ex_linear.gif){: .align-center }

## 선형변환

선형대수학에서의 선형 변환은 특정한 제한을 가지는데, 시각적으로 이를 이해하기 위해 두 가지 중요한 성질을 고려합니다. 

1) **모든 직선은 휘지 않고 직선인 상태를 유지**


2) **원점 고정 유지**

시각적으로는 **"격자선이 평행하고 균등한 상태를 유지한다"**고 생각할 수 있습니다. 

### 시각적으로 이해하기 

선형변환의 정의는 다음과 같습니다. 어떤 변환 $L$ 이 선형일 때, $L$은 다음 두 가지 성질을 만족합니다. 

$$L \text{ preserves sums} : (\vec{v} + \vec{w}) = L(\vec{v}) + L(\vec{w})$$

$$L \text{ preserves scaling} :  L(s\vec{v}) = sL(\vec{v})$$

<br>

우선 지금은 정의는 신경쓰지말고 시각적으로 먼저 이해해봅시다. 

입력 벡터에 대한 도달 좌표를 알기위해서는 두 기저벡터 **î**, **ĵ** 의 도달점이 필요합니다. 

예를 들어 좌표가 [-1; 2]인 벡터 $\vec{v}$를 생각해봅시다. 

벡터 $\vec{v}$는 -î 와 2ĵ의 합으로 나타낼 수 있습니다. 

![vectors_as_points]({{site.url}}/images/2023-11-28-linear_transformations/basis_example2.gif){: .align-center }

위 움직임을 보면 v의 도달벡터는 -1 $\cdot$ (î의 도달 벡터) 와 2 $\cdot$ (ĵ의 도달 벡터) 의 합과 같다는것을 알 수 있습니다. 

다르게 말해, î와 ĵ가 처음에 선형결합한 방식 그대로 **끝에서도 둘의 도달 벡터가 똑같이 선형결합**하는 것입니다. 

>**즉 î와 ĵ의 도달 위치만 알면 v의 도달 위치를 유추할 수 있습니다.**

이미지 속 변환에서 î 가 [1; -2] 에 도달하는 것이 보이고 ĵ 가 [3; 0] 에 도달하는 것이 보입니다. 

$$
L(î)=
\begin{bmatrix}
1 \\
-2 \\
\end{bmatrix}

\quad

L(ĵ)=
\begin{bmatrix}
3 \\
0 \\
\end{bmatrix}
$$

v의 도달 위치를 유추해보면 **v =  -î + 2ĵ** 가 도달하는 벡터는 **v =  -[1; -2] + 2[3; 0]** 임을 유추할 수 있습니다. 

$$
\begin{aligned}
L(\vec{v})
&=
L(-1î + 2ĵ)\\\\
&=
-1 \cdot L(î) + 2 \cdot L(ĵ)\\\\
&= 
-1 \cdot 
\begin{bmatrix}
1 \\
-2 \\
\end{bmatrix}
+ 2 \cdot 
\begin{bmatrix}
3\\
0 \\
\end{bmatrix}\\\\
&= 
\begin{bmatrix}
5\\
2 \\
\end{bmatrix}
\end{aligned}
$$

이제 변환을 보지 않고도 도달 벡터를 알 수 있습니다. 일반적인 벡터 [x; y]를 생각해보면 이 벡터의 도달 벡터는  x $\cdot$ [1; -2] 와 y $\cdot$ [3; 0] 의 합일 것입니다.

$$
\begin{bmatrix}
x \\
y \\
\end{bmatrix}
\to
x
\begin{bmatrix}
1 \\
-2\\
\end{bmatrix}
+
y
\begin{bmatrix}
3 \\
0 \\
\end{bmatrix}
=
\begin{bmatrix}
1x + 3y \\
-2x + 0y \\
\end{bmatrix}
$$

이제 2차 선형변환은 숫자 4개로 완벽히 기술된다는 걸 알았습니다. 

## 행렬 

좌표들은 보통 2 $\times$ 2 사이즈의 틀로 묶여 표기하게 되고 그 틀을 2 $\times$ 2 행렬이라고 합니다. 

각 행렬의 열은 -î, ĵ가 도달하는 특수 벡터 두 개로 해석할 수 있습니다. 

$$‘‘2×2 \quad Matrix”$$

$$\begin{bmatrix}
1 && 3 \\
-2 && 0 \\
\end{bmatrix}$$

만약 어떤 선형변환이 2 $\times$ 2 행렬로 묘사되어 있고 특정 벡터가 선형 변환에 의해 어디로 이동하는지 알고 싶다면,  그 벡터의 좌표를 취한 다음 각 기저 벡터에 대응하는 행렬의 열에 곱한 뒤 이를 모두 더해주면 됩니다.

이러한 접근은 기존에 암기했던 공식을 설명해주고 있습니다. 

$$
\begin{bmatrix}
a && b \\
c && d \\
\end{bmatrix}
\cdot 
\begin{bmatrix}
x \\
y \\
\end{bmatrix}
=
x
\begin{bmatrix}
a \\
c \\
\end{bmatrix}
=
y
\begin{bmatrix}
b \\
d \\
\end{bmatrix}
=
\begin{bmatrix}
ax + by \\
cx + dy \\
\end{bmatrix}
$$

<br>

## 💡정리

요약하자면 선형변환은 선형공간이 움직이는 방식 중 하나로 격자선이 평행하고 균등한 상태를 유지하며 원점은 고정되어 있는 것을 만족하는 변환입니다. 

선형변환은 숫자 몇 개를 가지고 기술 가능하며 이들은 기저벡터가 도달하는 정보를 포함합니다. 

행렬은 이 변환들을 기술하기 위한 도구이며 각 열이 기저벡터의 도달 좌표입니다. 

행렬-벡터의 곱셈은 변환에 의한 새로운 벡터를 계산하는 방법입니다. 



