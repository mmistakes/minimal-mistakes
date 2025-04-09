---
layout: single
title: "Numerical Analysis- Midterm"
categories: [CS]
tags: [Numercial_Analysis]
typora-root-url: ../
toc: true
author_profile: false
sidebar:
  nav: "docs"
---

# 1. Vector

## Primitive Vector & Geometry Concepts

---

### 1. Coordinate System

- n차원 공간의 한 점은 실수의 순서쌍으로 표현됨


$$
A = (a_1, a_2, \dots, a_n)
$$



- 두 벡터 A, B의 덧셈과 뺄셈


$$
A + B = (a_1 + b_1, a_2 + b_2, \dots, a_n + b_n)
$$

$$
A - B = (a_1 - b_1, a_2 - b_2, \dots, a_n - b_n)
$$



- 스칼라 곱


$$
kA = (ka_1, ka_2, \dots, ka_n)
$$



---

### 2. Vectors

- **벡터**: 크기(length)와 방향(direction)을 가짐  
- **단위 벡터**: 크기가 1인 벡터  
- **자유 벡터**: 시작점이 자유로움  
- **고정 벡터**: 시작점이 고정됨 (주로 원점 기준)

---

### 3. 벡터 연산

- **덧셈/뺄셈**: 성분별 연산  
- **내적 (Dot Product)**


$$
\vec{a} \cdot \vec{b} = a_1b_1 + a_2b_2 + \dots + a_nb_n = |\vec{a}||\vec{b}|\cos\theta
$$



⇒ 두 벡터가 수직이면


$$
\vec{a} \cdot \vec{b} = 0
$$



- **외적 (Cross Product)** (3차원 전용)


$$
\vec{a} \times \vec{b} = 
\left( 
a_2b_3 - a_3b_2,\ 
a_3b_1 - a_1b_3,\ 
a_1b_2 - a_2b_1 
\right)
$$



> ⇒ 외적 결과 벡터는 벡터 a와 벡터 b 모두에 **수직(perpendicular)**이다.

---

### 4. 선형 독립 / 기저

- 벡터들이 **선형 독립** ⇔


$$
a_1x_1 + \dots + a_nx_n = 0
$$



이 **자명한 해**만 가짐

- **선형 종속**: 어떤 벡터가 다른 벡터들의 선형 결합으로 표현 가능  
- **기저 벡터**: 서로 선형 독립이고, 공간을 생성할 수 있는 최소 집합

---

### 5. 직선 (Lines)

#### 2D

- 일반 표현

$$
y = mx + b \quad \text{또는} \quad ax + by + c = 0
$$

- **매개변수 표현**

$$
x = a + bu,\quad y = c + du
$$

#### 3D

- 일반 표현

$$
\vec{x} = \vec{a} + u\vec{b}
$$

- 두 점을 지나는 직선

$$
\vec{x}(u) = (1 - u)\vec{p}_0 + u\vec{p}_1
$$

---

### 6. 점과 직선의 관계

- 점 **벡터 p** 가 직선 `x = a + u·b` 위에 있는지 확인

$$
\vec{p} = \vec{a} + u\vec{b}
$$

를 만족하는 `u`가 존재하는지 확인  
- 수치 오차 고려: 컴퓨터 구현 시 **epsilon 범위**로 판단

---

### 7. 평면 (Planes)

#### 일반형 표현

$$
ax + by + cz + d = 0
$$

#### 벡터 표현

- **점 + 법선 벡터**

$$
(\vec{x} - \vec{x}_0) \cdot \vec{n} = 0
$$

- **점 + 두 방향 벡터**

$$
\vec{x} = \vec{x}_0 + u\vec{s} + v\vec{t}
$$

---

### 8. 직선과 평면의 관계

- 직선:

$$
\vec{x} = \vec{a} + u\vec{b}
$$

- 평면:

$$
(\vec{x} - \vec{x}_0) \cdot \vec{n} = 0
$$

#### 교차 조건

- 다음을 만족하면 **교차**:

$$
\vec{b} \cdot \vec{n} \neq 0
$$

- 다음을 만족하면 **평행 또는 포함**:

$$
\vec{b} \cdot \vec{n} = 0
$$



---

# 2. Matrix

## 기본 개념

- **행렬(Matrix)**: 숫자들을 직사각형 형태로 배열한 것
- **크기**: m×n 행렬 → m행 n열
- **성분**: 행렬 A의 (i, j)번째 성분 → a_ij

---

##  행렬 종류

| 행렬 종류               | 설명                     |
| ----------------------- | ------------------------ |
| 정방 행렬 (Square)      | 행 = 열                  |
| 행 벡터 (Row Vector)    | 행이 1개                 |
| 열 벡터 (Column Vector) | 열이 1개                 |
| 대각 행렬 (Diagonal)    | 주대각선 외의 원소가 0   |
| 항등 행렬 (Identity)    | 주대각선은 1, 나머지는 0 |
| 대칭 행렬 (Symmetric)   | A^T = A                  |

---

##  행렬 연산

- **덧셈/뺄셈**: 같은 크기의 행렬끼리 성분별 연산  
- **스칼라 곱**: 각 성분에 상수 곱  
- **행렬 곱**: A × B 가 정의되려면 → A의 열 수 = B의 행 수

$$
(C)_{ij} = \sum_k A_{ik} \cdot B_{kj}
$$

---

## 전치행렬 (Transpose)

$$
A^T
$$

- 행과 열을 뒤바꾼 행렬

---

## 역행렬 (Inverse Matrix)

- 정방행렬 A에 대해, A^{-1}이 존재하면:

$$
AA^{-1} = A^{-1}A = I
$$

- **조건**: 
  $$
  \det(A) \ne 0
  $$

- **계산법**: 가우스-조르당 소거법 또는 공식 사용

---

## 행렬식 (Determinant)

- 정방행렬에 대해 정의됨
- 기호: |A| 또는 det(A)

- **2 X 2 행렬**:

$$
\left|
\begin{matrix}
a & b \\
c & d
\end{matrix}
\right| = ad - bc
$$

- **3 X 3 이상**: 여인자 전개(cofactor expansion) 사용

---

## 고유값 & 고유벡터 (Eigenvalue & Eigenvector)

$$
AX = \lambda X (
\lambda: 고유값, X: 고유벡터 )
$$

- **특성 방정식 (Characteristic Equation)**:

$$
\det(A - \lambda I) = 0
$$

- lambda 구한 후

$$
(A - \lambda I)X =0
$$

---

## 대각화 (Diagonalization)

- 정방행렬 A가 다음을 만족하면 대각화 가능:

$$
A = P D P^{-1}
$$

- D: 고유값들로 구성된 **대각 행렬**  
- P: 고유벡터들을 **열**로 갖는 행렬

---

## 선형 연립방정식

- 행렬로 표현: AX = B
- 해 구하기:
  - 역행렬이 존재하면:

    $$
    X = A^{-1}B
    $$

  - 또는 가우스-조르당 소거법으로 풀이

---

## 가우스-조르당 소거법 (Gauss-Jordan Elimination)

- 시작: **확대 행렬** 
  $$
  [A \mid I]
  $$

- 행 연산을 통해 왼쪽 A를 **항등행렬 I**로 만들면  
  오른쪽은 
  $$
  A^{-1}
  $$



---

#  3. Transformation

## 변환 (Transformation)의 개념

- 도형의 구조를 변화시키는 연산
- **종류**: Translation, Scaling, Rotation, Shear, Affine, Linear, Homogeneous

---

## Geometric Properties (불변 성질)

- **위치 (Position)**: 원점과의 거리
- **거리 (Distance)**: 두 점 간의 거리
- **각도 (Angle)**: 선 간의 기울기
- **방향성 (Orientation)**: 절대적인 각도
- **일직선성 (Collineation)**: 선을 선으로 유지

> **Collineation**은 점이 일직선 상에 있는 관계를 유지하는 변환이다.
>
> 모든 선형/아핀/사영 변환은 collineation의 예시이다.
>
> 크기나 각도는 유지되지 않아도 되지만, 직선성과 정렬은 유지됨.

- **거리 보존 (Distance-preserving)**: 거리, 각, 면적, 부피 유지
- **등각성 (Conformal)**: 각 유지

---

##  변환 유형별 개요

| 변환 유형       | 특징                                                 |
| --------------- | ---------------------------------------------------- |
| **Isometry**    | 거리 보존 (Translation, Rotation, Reflection 포함)   |
| **Similarity**  | Isometry + Scaling (형태 유지)                       |
| **Shear**       | 축을 따라 비틈 (기울어짐)                            |
| **Affine**      | 직선성, 평행성, 비율 유지                            |
| **Linear**      | 원점을 기준으로 선형 변환                            |
| **Homogeneous** | Translation 포함한 모든 변환을 행렬 곱으로 표현 가능 |

---

##  Isometry (등거리 변환)

- **Rigid-body transformation**  
- 변환 전/후 점 간의 거리 보존  
- 일반적인 2D 이소변환 수식:

$$
\begin{aligned}
x' &= ax + by + t_x \\
y' &= cx + dy + t_y \\
\text{단, } \begin{bmatrix} a & b \\ c & d \end{bmatrix} \text{는 직교 행렬 (det=1)}
\end{aligned}
$$

> -  **Isometry**는 거리, 각도, 면적 등을 그대로 유지하면서 위치만 바꾸는 변환이다.
>
> - 대표적인 예: 평행이동, 회전, 대칭
>
> - 도형의 모양과 크기를 바꾸지 않으며, 합동성(congruence)을 유지함



---

##  Similarity (유사 변환)

- 크기 비례 + 거리, 각도 보존  
- 수식:

$$
\begin{aligned}
x' &= k(ax + by) + t_x \\
y' &= k(cx + dy) + t_y \\
\text{(k는 스케일 계수)}
\end{aligned}
$$



---

##  Shear (전단 변환)

- x축 또는 y축을 따라 기울어지는 변환  
- 수식:

$$
\begin{aligned}
x' &= x + ky \quad \text{(x 방향 shear)} \\
y' &= y + kx \quad \text{(y 방향 shear)}
\end{aligned}
$$

> - **Shear (전단 변환)**은 물체의 한 방향을 따라 기울이는 변환이다.
> -  각도가 변하고 직각이 사라지며, 도형이 찌그러진다.



---

##  Affine Transformation(아핀 변환)

- 직선 → 직선, 평행선 → 평행선, 비율 유지  
- 수식 (2D):

$$
\begin{aligned}
x' &= ax + by + t_x \\
y' &= cx + dy + t_y
\end{aligned}
$$

- 행렬 표현:

$$
\begin{bmatrix}
x' \\
y' \\
1
\end{bmatrix}
=
\begin{bmatrix}
a & b & t_x \\
c & d & t_y \\
0 & 0 & 1
\end{bmatrix}
\begin{bmatrix}
x \\
y \\
1
\end{bmatrix}
$$

##  

---

## Linear Transformation(선형 변환)

- Translation 없이 선형 연산만으로 구성  
- 행렬식(det) ≠ 0 이면 역변환 존재  
- 일반 수식 (3D):

$$
\begin{aligned}
x' &= a_{11}x + a_{12}y + a_{13}z \\
y' &= a_{21}x + a_{22}y + a_{23}z \\
z' &= a_{31}x + a_{32}y + a_{33}z
\end{aligned}
$$

---

##  Rotations (회전 변환)

- 회전은 원점을 기준으로 하는 선형 변환
- **거리와 각도 유지** → Isometry이기도 함

---

###  2D 회전

- 반시계 방향 theta 만큼 회전
- 수식:

$$
\begin{aligned}
x' &= \cos\theta \cdot x - \sin\theta \cdot y \\
y' &= \sin\theta \cdot x + \cos\theta \cdot y
\end{aligned}
$$

- 행렬 표현:

$$
\begin{bmatrix}
x' \\
y'
\end{bmatrix}
=
\begin{bmatrix}
\cos\theta & -\sin\theta \\
\sin\theta & \cos\theta
\end{bmatrix}
\begin{bmatrix}
x \\
y
\end{bmatrix}
$$

---

###  연속 회전 (Successive Rotations)

- 두 각도만큼 회전하면 행렬은 곱해짐:

$$
R_{\theta_2} R_{\theta_1} = R_{\theta_1 + \theta_2}
$$

---

### 원점이 아닌 점 P 기준 회전

1. P를 원점으로 이동  
2. 원점에서 회전  
3. 다시 P로 이동

- 수식:

$$
X' = R (X - P) + P
$$

- 행렬 형태로 표현 가능 (Homogeneous로 확장 가능)

---

### 3D 회전

- x, y, z축을 기준으로 각각 회전 가능

예: **z축 기준 회전**

$$
R_z(\theta) =
\begin{bmatrix}
\cos\theta & -\sin\theta & 0 \\
\sin\theta & \cos\theta & 0 \\
0 & 0 & 1
\end{bmatrix}
$$

마찬가지로 밑의 식도 정의됨
$$
R_x(\theta)$, $R_y(\theta
$$




---

##  Homogeneous Coordinates(확장 좌표계)

- Translation을 포함한 변환을 행렬곱으로 표현 가능  

- **포인트 확장**: 
  $$
  (x, y) → (x, y, 1)
  $$
  

- 변환 수식:

$$
X' = TX = \begin{bmatrix}
a_{11} & a_{12} & a_{13} \\
a_{21} & a_{22} & a_{23} \\
a_{31} & a_{32} & a_{33}
\end{bmatrix}
\begin{bmatrix}
x \\
y \\
1
\end{bmatrix}
$$

- 여러 변환의 조합:

$$
X' = T_3 T_2 T_1 X
$$

- 역변환:

$$
X = (T_3 T_2 T_1)^{-1} X'
$$

> - Homogeneous Coordinates(동차 좌표)는 (x, y)를 (x, y, 1)로 확장한 좌표계이다.
> - 이를 사용하면 이동, 회전, 확대/축소, 전단, 원근 변환을 모두 하나의 행렬로 표현할 수 있다.
> - 행렬 곱만으로 모든 변환을 통합할 수 있어 컴퓨터 그래픽스, 비전, 로봇공학에서 널리 사용된다.

- 요약

### Homogeneous Coordinates Transformation Matrices

- Scale Matrix (S)

$$
S =
\begin{bmatrix}
s_x & 0 & 0 & 0 \\
0 & s_y & 0 & 0 \\
0 & 0 & s_z & 0 \\
0 & 0 & 0 & 1
\end{bmatrix}
$$

- Translate Matrix (T)

$$
T =
\begin{bmatrix}
1 & 0 & 0 & t_x \\
0 & 1 & 0 & t_y \\
0 & 0 & 1 & t_z \\
0 & 0 & 0 & 1
\end{bmatrix}
$$

- Rotate Matrix (R in 2D)

$$
R =
\begin{bmatrix}
R & 0 \\
0 & 1
\end{bmatrix}
$$

>  R is a 2×2 rotation matrix such as*

$$
R =
\begin{bmatrix}
\cos\theta & -\sin\theta \\
\sin\theta & \cos\theta
\end{bmatrix}
$$



---

# 4. Ortho

## Orthogonal Matrix (직교 행렬)

- **정의**: 행렬 A가 직교 행렬이면, 다음을 만족함

$$
A^T A = AA^T = I \quad \Rightarrow \quad A^{-1} = A^T
$$

- **Orthonormal 벡터 집합**: 각 벡터가 단위 벡터이고 서로 수직일 때

- **정리**: 
  -  행렬 A가 **오르토노멀 벡터** 을 열로 가지면 → 직교 행렬
  
  - 각 열끼리 내적: 
    $$
    \vec{v}_i \cdot \vec{v}_j = \delta_{ij}
    $$
    

---

## 성질: 직교 행렬의 기하적 의미

- 직교 행렬 M은 **길이와 각도 보존**

1. **길이 보존**:

$$
\|MX\| = \|X\|
$$

2. **각도 보존**:

$$
\cos \theta = \frac{X \cdot Y}{\|X\|\|Y\|} = \frac{MX \cdot MY}{\|MX\|\|MY\|}
$$

- ⇒ 회전 행렬은 직교 행렬의 예

---

##  회전 행렬 예시

- **2D 회전 행렬**:

$$
R =
\begin{bmatrix}
\cos\theta & -\sin\theta \\
\sin\theta & \cos\theta
\end{bmatrix}
\quad \Rightarrow \quad R^{-1} = R^T
$$

- **3D 회전 행렬**:  R(x,y,z) 존재하며 모두 직교 행렬

---

##  Normal Vector의 변환

- 법선 벡터 N이 변환 후에도 여전히 표면에 수직인가?

- 변환 행렬 M이 **직교 행렬**이면, 법선 벡터도 올바르게 변환됨

$$
(MN)^T (MT G) = N^T G = 0
$$

---

##  좌표계 변환 (Transformation of Coordinate System)

### 1. 평행이동 좌표계

- 좌표계의 평행이동은 점을 **반대 방향**으로 이동시키는 것과 동일

$$
X' = T^{-1}X
$$

---

### 2. 회전 좌표계

- 좌표계 회전은 점을 **반대 방향**으로 회전시키는 것과 동일

$$
X' = R^{-1}X
$$

---

### 3. 회전 + 이동

- 회전 + 이동을 함께 수행하는 경우:

$$
X' = (TR)^{-1} X = R^{-1} T^{-1} X
$$

---

## 3D 좌표계 변환

- 새로운 좌표계는 다음으로 정의됨:

  - 원점 위치: (a, b, c)

  - 축 방향: 
    $$
    U = (u_x, u_y, u_z), V, N
    $$
    

- **변환 수식**:

$$
X' = R^{-1} T^{-1} X
$$

- T: 원점 이동  
- R: 축 회전  
- R의 행은 각 축 벡터 (U,V,N)



---

#  5. Rotation

##  반사 (Reflection) & 반전 (Inversion)

- **Origin 기준 반전**: 
  $$
  \vec{X}' = -\vec{X}
  $$
    

- **점 P(a, b) 기준 반전**: 
  $$
  \vec{X}' = 2P - \vec{X} 
  $$
  

- **x축, y축 반사**:
  - x축: (x, -y)
  - y축: (-x, y)

- **직선 기준 반사** (원점 통과, 각도 theta):

$$
\vec{X}' = R(-\theta) \cdot F \cdot R(\theta) \cdot \vec{X}
$$

- **3D 평면 기준 반사**:
  - xy-plane: (x, y, -z)
  - yz-plane: (-x, y, z)
  - xz-plane: (x, -y, z)

---

##  기본 회전 (3D 회전 행렬)

- **Z축 기준 회전 (θ)**:

$$
R_z(\theta) =
\begin{bmatrix}
\cos\theta & -\sin\theta & 0 \\
\sin\theta & \cos\theta & 0 \\
0 & 0 & 1
\end{bmatrix}
$$

- **Y축 기준 회전 (β)**:

$$
R_y(\beta) =
\begin{bmatrix}
\cos\beta & 0 & \sin\beta \\
0 & 1 & 0 \\
-\sin\beta & 0 & \cos\beta
\end{bmatrix}
$$

- **X축 기준 회전 (α)**:

$$
R_x(\alpha) =
\begin{bmatrix}
1 & 0 & 0 \\
0 & \cos\alpha & -\sin\alpha \\
0 & \sin\alpha & \cos\alpha
\end{bmatrix}
$$

---

##  임의의 축 주위 회전 (Arbitrary Axis Rotation)

### 단계별 구성 (축 A, 회전 각 θ)

1. **z축 회전**으로 축 A를 xz평면으로 보냄 
2. **y축 회전**으로 x축에 일치시킴 
3. **x축 기준 θ 회전** 
4. **y축 -β로 역회전** 
5. **z축 -α로 역회전** 

> 최종 회전 행렬:

$$
R = R_z(-\alpha) R_y(-\beta) R_x(\theta) R_y(\beta) R_z(\alpha)
$$

---

##  벡터 분해 기반 회전 표현

- 벡터 P를 회전축 A에 평행 성분 P_{||}와 수직 성분 P_{perp}로 나눔:

$$
P = P_{||} + P_{\perp}
$$

- 회전 후:

$$
P' = P_{||} + \cos\theta \cdot P_{\perp} + \sin\theta \cdot (A \times P_{\perp})
$$

- 이를 통해 직접 벡터 연산으로 회전 결과를 구할 수 있음

>- **proj_P(v)**는 벡터 v의 P 방향 성분이며, 내적을 통해 구함
>- **perp_P(v)**는 v에서 P 방향 성분을 제외한 수직 성분
>- 회전은 proj 성분은 그대로 두고, perp 성분만 회전시킴



---

##  Euler Angles (오일러 각도)

- 임의의 회전을 3개의 축 회전 조합으로 표현  

- 예시:

  - Z-X-Z: 
    $$
    R = R_z(\gamma) R_x(\beta) R_z(\alpha)
    $$
     

  - Z-X-Y: 
    $$
    R = R_z(\gamma) R_x(\beta) R_y(\alpha)
    $$
    

-  **Gimbal Lock** 주의  
  - 특정 회전 조합에서 자유도가 1개 사라지는 현상 발생  
  - → 회전축이 정렬되어 회전 방향을 잃게 됨

---

##  Quaternion (쿼터니언)

- 오일러 각보다 **부드러운 회전**, **보간(Interpolation)**에 적합

- 형식:
  $$
  q = w + xi + yj + zk
  $$
  

- **축 A와 각 theta로부터 쿼터니언 생성**:

$$
q = \left( \cos\frac{\theta}{2},\ a_x \sin\frac{\theta}{2},\ a_y \sin\frac{\theta}{2},\ a_z \sin\frac{\theta}{2} \right)
$$

- **회전을 행렬로 변환** 가능 (Rotation matrix from quaternion)

- **보간(Interpolation)**: 4D 단위구(sphere) 상에서의 선형 보간 (SLERP)

---

##  요약: 회전 표현 방식 비교

| 방식                     | 특징                            | 장점                        | 단점                      |
| ------------------------ | ------------------------------- | --------------------------- | ------------------------- |
| 행렬 (Rotation Matrix)   | 직관적, 조합 가능               | 계산 단순, 선형 변환과 호환 | Gimbal Lock 발생 가능     |
| 오일러 각 (Euler Angles) | 3개 각도로 분해 표현            | 이해 쉬움, 수치 표현 간단   | 자유도 손실 (Gimbal Lock) |
| 쿼터니언 (Quaternion)    | 4차원 복소수, 축과 각 기반 표현 | 부드러운 회전, 보간 우수    | 직관적 해석 어려움        |

---

##  Projection (투영)

###  개념

- 3D 공간에서 2D 화면(예: 스크린)으로 변환하는 방법
- 크게 두 가지 방식:
  - **평행 투영 (Parallel or Orthographic)**
  - **원근 투영 (Perspective)**

---

###  평행 투영 (Parallel Projection)

- **길이**: 비례 유지 가능 (scale될 수 있음)
- **각도**: 유지되지 않을 수 있음
- **선의 평행성**: 유지됨 (중요)

- 투영 평면이 z = d일 때 투영 행렬:

$$
\begin{bmatrix}
1 & 0 & 0 & 0 \\
0 & 1 & 0 & 0 \\
0 & 0 & 0 & 0 \\
0 & 0 & 0 & 1
\end{bmatrix}
$$

---

###  원근 투영 (Perspective Projection)

- **길이와 각도**: 유지되지 않음
- **평행선**: 교차 가능 (소실점 발생)
- **근접 객체**: 더 크게 보임 (foreshortening 효과)

- 투영 평면이 z = d일 때:

$$
x' = \frac{d}{z}x, \quad y' = \frac{d}{z}y
$$

- **동차좌표(homogeneous coordinates)**를 사용하면 행렬 곱으로 표현 가능:

$$
\text{w'} = z, \quad
x' = \frac{x}{z},\quad
y' = \frac{y}{z}
$$

---

##  Lines in 3D Space

### 1. 직선의 정의

- 한 점 S를 지나고 방향 벡터 V를 가질 때:

$$
P(t) = S + tV
$$

---

### 2. 점과 직선 사이 거리

- 점 Q가 주어졌을 때 거리 d:

$$
d = \frac{\| (Q - S) \times V \|}{\|V\|}
$$

---

### 3. 두 직선 사이의 거리

- 직선 1: `P_1 = S_1 + t_1V_1`  
- 직선 2: `P_2 = S_2 + t_2V_2`

- 최소 거리 d는 다음 조건 하에서 발생:

$$
\frac{\partial f}{\partial t_1} = 0, \quad \frac{\partial f}{\partial t_2} = 0
$$

- 행렬 계산으로 t1, t2 를 구해 거리 계산

---

##  Planes in 3D Space

### 1. 점과 평면 사이 거리

- 평면: `ax + by + cz + d = 0`  
- 법선 벡터 `N = (a, b, c)` 
- 점 Q가 평면에 대해 갖는 거리:

$$
d = \frac{N \cdot (Q - P)}{\|N\|}
$$

(P는 평면 위의 한 점)

---

### 2. 직선과 평면의 교차

- 직선: P(t) = S + tV 

- 평면: 
  $$
  N \cdot (X - P) = 0
  $$
  

- 교점 t 값은 다음과 같이 구함:

$$
t = \frac{N \cdot (P - S)}{N \cdot V}
$$

- $$
  N \cdot V = 0$
  $$

  이면 평면과 직선은 **평행**함

---

### 3. 두 평면의 교선 (intersection line)

- 평면 1: 법선 N_1, 점 P_1  

- 평면 2: 법선 N_2, 점 P_2

- 교선 방향: 
  $$
  N_1 \times N_2
  $$
  

  

- 교선 상의 점 Q는 두 평면을 동시에 만족하는 점을 계산하여 구함

---

### 4. 세 평면의 교점

- 평면 i: 법선 N_i, 점 P_i

- 선형 연립방정식을 구성해 다음을 만족하는 Q 구함:

$$
(Q - P_i) \cdot N_i = 0 \quad (i = 1,2,3)
$$

- 행렬 방정식으로 정리하면:

$$
Q = M^{-1} B
$$

---

## 평면의 변환 (Transforming Planes)

- 평면 
  $$
  N \cdot X + d = 0
  $$
  의 변환

- 변환 행렬 M이 주어졌을 때:

$$
N' = (M^{-1})^T N
$$

$$
d' = -N' \cdot (M P)
$$

- 평면의 새로운 수식: 
  $$
  N' \cdot X + d' = 0
  $$
  

---

