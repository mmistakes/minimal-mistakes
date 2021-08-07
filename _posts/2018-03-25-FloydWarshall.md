---
title:  "[그래프] 플로이드 와샬 알고리즘"
date:   2018-03-25 14:17:00
categories:
- Medium-Algorithm
tags:
- Floyd-Warshall
---

### 서론
플로이드 와샬 알고리즘은 모든 정점에서 다른 모든 정점까지의 최단 거리를 모두 구해줍니다.<br>
구현이 매우 간단해서 초보자들도 쉽게 따라할 수 있습니다.

### 작동 방법
플로이드는 DP기법을 사용합니다. 저는 인접 행렬 자체를 DP Table로 활용하는 것을 선호합니다.<br>
dp배열을 정의해봅시다.<br>
<b>dp[i][j] = i에서 j까지의 최단 거리</b>라고 정의합시다.<br>

3중 for문을 돌리는데, 반복되는 변수를 i, j, k로 하고 각각 시작 정점, 도착 정점, 경유 정점으로 사용합니다.<br>
이 알고리즘은 어찌보면 당연한 사실을 이용해 작동합니다.<br>
i에서 j로 바로 가는 것보다, i에서 k를 거쳐서 j로 가는 것이 빠르다면 갱신을 해줍니다.

### 구현
코드로 구현하는 것은 매우 쉽습니다.
```cpp
const int N = 100;
const int INF = 1e9+7;
int map[N][N];

void floyd(){
  for(int i=0; i<N; i++){
    for(int j=0; j<N; j++){
      map[i][j] = INF;
    }
  }
  for(int i=0; i<N; i++) map[i][i] = 0;

  input(); //그래프 정보 입력

  for(int k=0; k<N; k++){
    for(int i=0; i<N; i++){
      for(int j=0; j<N; j++){
        if(map[i][j] > map[i][k]+map[k][j]){
          map[i][j] = map[i][k]+map[k][j];
        }
      }
    }
  }
}
```

먼저, 모든 경로의 거리를 무한대로 초기화하되, 자기 자신에게 가는 거리는 0으로 초기화를 합니다.<br>
그 뒤에 그래프의 정보를 입력을 받습니다.<br>
3중 for문을 돌면서 k를 경유하는 것이 더 효과적인 경우, 최단 거리를 갱신해줍니다.

플로이드를 돌릴 때 for문의 순서를 주의해야 합니다.
* 가장 바깥쪽 for문은 경유할 정점
* 가운데 for문은 출발 정점
* 가장 안쪽 for문은 도착 정점
임을 주의하셔야 합니다.

### 추천 문제
아래 목록은 제가 추천하는 연습 문제입니다.
* https://www.acmicpc.net/problem/11404 플로이드 구현 문제입니다.
* https://www.acmicpc.net/problem/10159 KOI 2014 지역 본선
* https://www.acmicpc.net/problem/1613
