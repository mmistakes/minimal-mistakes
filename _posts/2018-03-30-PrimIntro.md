---
title:  "[그래프] 프림 알고리즘의 개념"
date:   2018-03-30 20:26:00
categories:
- Medium-Algorithm
tags:
- MST
---

이번 글에서는 MST(Minimum Spanning Tree, 최소 신장 트리)의 간단한 개념과 Prim Algorithm에 대해 다룰 것입니다.

### Spanning Tree란?
MST의 개념을 소개하기 전에 Spanning Subgraph에 대해 알아보자면,<br>
Spanning Subgraph는 그래프 이론에서 모든 정점을 포함하는 부분 그래프를 의미합니다.

### Minimum Spanning Tree란?
MST는 간선들의 가중치의 합이 최소가 되는 트리 형태인 Spanning Subgraph를 의미합니다.

### 작동 과정
프림 알고리즘은 한 시작점과 현재 연결이 되어 있는 정점에서 뻗어 나가는 간선 중 가장 가중치가 작은 간선을 선택해 연결하면서 MST를 만듭니다.<br>
이 때, 가중치가 가장 작은 간선을 연결하되, 사이클이 생긴다면 가중치가 가장 작더라도 무시하고 지나칩니다.

<img src = "https://i.imgur.com/tAcm2VF.png"><br>
이 그래프에서 프림을 이용해 MST를 이용해 구해봅시다.

먼저 시작 정점을 g로 잡읍시다.<br>
g에서 뻗어 나가는 간선 중 가장 가중치가 작은 간선은 g-h를 연결하는 간선입니다.<br>
해당 간선을 MST 목록에 추가하고, h를 이어줍니다.

<img src = "https://i.imgur.com/D9o4ZRG.png"><br>
이제 g또는 h에서 뻗어 나가는 간선 중 가장 가중치가 작은 간선인 f-g를 연결하는 간선을 MST에 추가하고 f를 이어줍니다.

<img src = "https://i.imgur.com/mLOwACq.png"><br>
이런 식으로 계속 반복하다 보면 최종적으로 다음과 같은 MST가 나오게 됩니다.

<img src = "https://i.imgur.com/gzhTNt5.png"><br>

다음 글에서는 크루스컬 알고리즘에 대해 알아보도록 하겠습니다.
