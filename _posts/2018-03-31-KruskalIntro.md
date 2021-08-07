---
title:  "[그래프] 크루스컬 알고리즘의 개념"
date:   2018-03-31 20:37:00
categories:
- Medium-Algorithm
tags:
- MST
---

### 작동 과정
크루스컬 알고리즘은 간선들 중에거 가중치가 가장 작은 간선부터 차례대로 연결해줍니다.<br>
그래프에서 정점들만 남겨둔 상태로 시작해서 가중치가 작은 간선부터 하나씩 그래프에 채워 준다고 생각하면 이해하기 쉽습니다.

물론 프림 알고리즘과 마찬가지로 연결 도중에 사이클이 생기면 그 간선은 무시하고 넘어갑니다.

<img src = "https://i.imgur.com/BvfPXmw.png"> <br>
이 그래프에서 크루스컬 알고리즘을 돌려봅시다.

먼저 가중치가 가장 작은 간선인 g-h를 연결해줍니다.
<img src = "https://i.imgur.com/XQgtf0g.png"> <br>
그 다음으로 가중치가 가장 작은 f-g와 c-i를 연결합니다.

<img src = "https://i.imgur.com/wzAJ6W0.png"> <br>

이런 식으로 계속 진행을 하면 최종적으로 다음과 같은 결과가 나오게 됩니다.
<img src = "https://i.imgur.com/gzhTNt5.png"><br>

### 구현 방법
대개 Union-Find 자료구조를 이용해 구현합니다. 구현 방법은 다른 글에서 다루도록 하겠습니다.
