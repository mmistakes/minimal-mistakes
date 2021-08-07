---
title: "Global Min Cut : Stoer-Wagner Algorithm"
date: 2019-11-28 19:40:00
categories:
- Hard-Algorithm
tags:
- Min-Cut
- Global-Min-Cut

---

### 개요

프로그래밍 대회에서 나오는 min cut문제는 대부분 어떤 정점 s, t를 주고 둘 사이를 끊을 때의 최소 비용을 구하는 것을 요구합니다.<br>
하지만 [BOJ13367 Weeping Fig](https://www.acmicpc.net/problem/13367)는 s, t를 안 정해주고 그냥 그래프를 두 컴포넌트로 나누는 최소 비용을 구해야 합니다.<Br>
global min cut을 구하는 대표적인 알고리즘으로 determisistic한 Stoer-Wagner Algorithm과 randomize Algorithm인 Karger's Algorithm이 있는데, 이 글에서는 Stoer-Wagner Algorithm을 알아볼 것입니다.

### Naive Solution

먼저, naive한 solution을 알아봅시다.

1. **$$O(V^2)$$번의 maximum flow** - 가능한 모든 (s, t)쌍에 대해 s - t 사이의 minimum cut을 maximum flow를 구해줄 수 있습니다. Dinic's Algorithm을 사용해 $$O(V^4E)$$에 구할 수 있습니다.
2. **Gomory-Hu Tree** - Gomory-Hu Tree를 이용해 $$O(V)$$번의 maximum flow를 이용해 $$O(V^3E)$$에 구할 수도 있습니다.

[BOJ13367 Weeping Fig](https://www.acmicpc.net/problem/13367)의 제한은 $$V ≤ 500, E ≤ V(V-1)/2$$ 이기 때문에 위의 두 방법 모두 TLE가 발생합니다.

위 2개의 풀이보다 더 빠르고, 더 간단한 알고리즘을 알아봅시다.

### Stoer-Wagner Algorithm

**이 알고리즘은 Global Min Cut을 $$O(V^3)$$에 구해줍니다!!**

minCutPhase()라는 루틴에서 어떤 두 정점 s, t의 min cut을 $$O(V^2)$$에 구할 수 있다고 합시다. (s, t는 우리가 정하는 것이 아닌, 알고리즘 로직에서 알아서 결정됩니다.)

minCutPhase()에서 s - t cut을 구했으니, s - t가 아닌 컷도 구해야 합니다.<Br>s - t가 아닌 컷은, s와 t가 같은 집합에 속해있는 컷을 말합니다. 그 답은 s와 t를 하나의 정점으로 합쳐준 그래프의 컷과 같습니다.

$$\vert V \vert$$개의 정점으로 이루어진 그래프에서 s - t의 컷을 구하고, s - t를 하나의 정점으로 합친 정점 $$\vert V \vert - 1$$개짜리 그래프에서 재귀적으로 $$\vert V \vert = 1$$일 때까지 반복해주면 global min cut을 $$O(V^2 * V) = O(V^3)$$에 구할 수 있습니다.

이제 minCutPhase()만 $$O(V^2)$$에 구해주면 되네요.

minCutPhase는 프림 알고리즘과 비슷하게 동작합니다. 그래서 $$O(VElogE)$$ 혹은 피보나치 힙을 이용해 $$O(VE + V^2logV)$$에 구할 수도 있다고 합니다.

먼저, 아무 정점 $$u$$를 잡아서 집합 $$S$$에 넣어줍니다.<Br>그 다음부터는 계속 $$S$$에 속하지 않으면서 $$S$$와 가장 강하게 연결되어 있는 정점을 하나씩 추가합니다.<Br>**정점 $$v$$의 강함**은 $$S$$에서 $$v$$로 연결된 간선들의 가중치의 합을 의미합니다.

이때 $$S$$에 마지막에 추가된 정점의 **강함**이 min cut이고, $$S$$에 마지막으로 추가된 정점과 마지막에서 두 번째로 추가된 정점이 s, t가 됩니다.

증명은 [여기](https://en.wikipedia.org/wiki/Stoer%E2%80%93Wagner_algorithm#Proof_of_correctness)에 있습니다.

### 구현

```cpp
//global min cut : Stoer-Wagner Algorithm, O(N^3)
int g[555][555], dst[555];
int chk[555], del[555];

int n, m; //~500

void init(){
    memset(g, 0, sizeof g);
    memset(del, 0, sizeof del);
}

int minCutPhase(int &s, int &t){
    memset(dst, 0, sizeof dst);
    memset(chk, 0, sizeof chk);
    int mincut = 0;
    for(int i=1; i<=n; i++){
        int k = -1, mx = -1;
        for(int j=1; j<=n; j++){
            if(del[j] || chk[j]) continue;
            if(dst[j] > mx) k = j, mx = dst[j];
        }
        if(k == -1) return mincut;
        s = t,t = k;
        mincut = mx, chk[k] = 1;
        for(int j=1; j<=n; j++){
            if(!del[j] && !chk[j]) dst[j] += g[k][j];
        }
    }
    return mincut;
}

int getMinCut(){
    int mincut = 1e9+7;
    for(int i=1; i<n; i++){
        int s, t;
        int now = minCutPhase(s, t);
        del[t] = 1;
        mincut = min(mincut, now);
        if(mincut == 0) return 0;
        for(int j=1; j<=n; j++){
            if(!del[j]) g[s][j] = (g[j][s] += g[j][t]);
        }
    }
    return mincut;
}
```
