---
title: "선린 정올반 가을 교육 9차시 문제"
date: 2019-11-24 00:37:00
categories:
- PS
tags:
- Greedy
- Tree
---

선린 정올반(알고리즘 연구반) 가을 교육 9차시에 추가 문제로 주어진 문제입니다.

### 문제
정점 N(N <= 100,000)개로 구성된 트리가 주어진다.

A는 자신의 차례에 색깔이 칠해지지 않은 정점을 하나 골라서 빨간색으로 칠하고, B는 파란색으로 칠한다.<br>
A가 먼저 시작하고, 각자 번갈아가면서 정점을 칠한다.<br>
빨간 정점으로만 이루어진 컴포넌트의 개수를 CR, 파란 정점으로만 이루어진 컴포넌트의 개수를 CB라고 하자.<br>
A는 (CR - CB)을 최대화하려고 하고, B는 (CR - CB)를 최소화하려고 한다.<br>
A와 B 모두 항상 최선의 수를 둔다고 가정할 때, CR - CB의 값을 구해라.

### 아이디어
빨간색으로 칠해진 정점의 개수를 VR, 빨간색 정점 2개를 잇는 간선의 개수를 ER이라고 하면 빨간색 정점으로만 이루어진 컴포넌트의 개수는 VR - ER이다.<br>
파란색도 마찬가지.

### 용어
* CR : 빨간색 정점으로만 이루어진 컴포넌트의 개수
* BR : 파란색 정점으로만 이루어진 컴포넌트의 개수
* VR : 빨간색으로 칠해진 정점의 개수
* VB : 파란색으로 칠해진 정점의 개수
* ER : 빨간색 정점 2개를 잇는 간선의 개수
* EB : 파란색 정점 2개를 잇는 간선의 개수
* degree(v) : v와 이웃한 정점의 개수
* degree_red(v) : v와 이웃한 빨간색 정점의 개수
* degree_blue(v) : v와 이웃한 파란색 정점의 개수

### 풀이
CR - CB는 위에서 언급한 아이디어를 이용해 **(VR - ER) - (VB - EB)** = **(VR - VB) - (ER - EB)** 로 나타낼 수 있다.<br>
N이 짝수라면 VR - VB은 항상 0이고, 홀수라면 항상 1이다.<br>
VR - VB는 고정되어 있으므로, ER - EB의 값만 잘 만들어주면 된다.

$$2 * ER = \sum_{v ∈ R} degree\_red(v)$$ (R = 빨간색으로 칠해진 정점 집합)<br>
$$2 * EB = \sum_{v ∈ B} degree\_blue(v)$$ (B = 파란색으로 칠해진 정점 집합)

두 식을 더해주면 아래와 같은 식이 나온다.<br>
$$2 * (ER - EB) = \sum_{r ∈ R}degree\_red(r) - \sum_{b ∈ B}degree\_blue(b)$$

당연히 $$\sum_{r ∈ R} degree\_blue(r) - sum_{b ∈ B} degree\_red(b)$$은 0이다.<br>
이 식을 2 × (ER - EB)에 더해줘도 값은 변하지 않는다.

$$\sum_{r ∈ R} {degree\_red(r) - degree\_blue(r)} + \sum_{b ∈ B} {degree\_blue(b) + degree\_red(b)} = 2 * (ER - EB)$$<br>
$$\sum_{r ∈ R} {degree\_red(r) - degree\_blue(r)}$$는 빨간색 정점의 degree의 총합이고, $$\sum_{b ∈ B} {degree\_blue(b) + degree\_red(b)}$$는 파란색 정점의 degree의 총합이다.<br>
그러므로 $$\sum_{r ∈ R} degree(r) - \sum_{b ∈ B} degree(b) = 2 * (ER - EB)$$ 이다.

$$\sum_{r ∈ R} degree(r)$$이 작아질수록 (ER - EB)가 작아지기 때문에 (CR - CB)가 커지고,<br>
$$\sum_{b ∈ B} degree(b)$$가 작아질수록 (ER - EB)가 커지기 때문에 (CR - CB)가 작아진다.<br>
결국 A와 B 모두 자신의 턴에 남은 정점 중에서 degree가 가장 작은 정점을 선택하는 것이 최선의 수다.
