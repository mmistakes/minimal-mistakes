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
  **A^{-1}**
  $$

---

