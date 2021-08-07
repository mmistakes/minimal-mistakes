---
title:  "Effective MCMF Algorithm"
date:   2020-03-24 04:29:00
categories:
- Hard-Algorithm
tags:
- MCMF
---

### 서론
**이 글은 독자가 MCMF와 Dinic's Algorithm을 알고 있다고 간주하고 설명합니다.**<br>
Min Cost Max Flow(MCMF) 문제를 해결하는 방법은 잘 알려져 있습니다.<br>
이 글에서는 이 MCMF를 구하는 알고리즘에서 수행하는 몇 가지 비효율적인 작업 최적화하는 방법을 다룹니다.

이 글은 KAIST의 ACM-ICPC팀 '더불어 민규당' 팀노트([링크]( https://github.com/koosaga/DeobureoMinkyuParty ))의 Hell-Joseon MCMF과 기타 여러 블로그를 참고했습니다.

### 최적화
기존의 MCMF 알고리즘의 절차는 다음과 같습니다.

1. Bellman-Ford(혹은 SPFA)를 이용해 증가경로 **하나**를 찾음
2. 1에서 찾은 증가경로에 유량을 흘리고 1로 돌아감

비효율적인 부분을 하나씩 찾아서 최적화를 해봅시다.

#### Dinic-Style
MCMF말고 잠시 Dinic's Algorithm를 생각해봅시다.<br>
Dinic's Algorithm은 Level Graph를 한 번 만든 다음, Level Graph 위에서 흘릴 수 있는 **모든 유량**을 흘린 뒤에 새로운 Level Graph를 만듭니다.

MCMF에서도 비슷한 방법을 이용할 수 있습니다. Bellman-Ford를 이용해 source에서 시작하는 Shortest Path DAG를 만들어 줄 수 있습니다.<br>
한 그래프에 여러 개의 최단 경로가 있을 수 있기 때문에, Ford-Fulkerson Style 대신 DAG를 만들고 Dinic-Style로 흘려주면 약간의 커팅을 할 수 있습니다.

[코드](https://www.acmicpc.net/source/share/19667a5c06f74bb8ac48982a949eb7ca)

#### O(V+E) DAG update
Dinic-Style로 플로우를 흘린다고 해도, 여전히 새로운 DAG를 찾을 때는 Bellman-Ford를 돌려야 합니다. 이는 $O(VE)$로, 수행 시간에 적지 않은 영향을 미칩니다.

아래 코드를 사용해 $O(V+E)$만에 DAG에 속하지 않은 간선 중 최소 하나를 DAG에 추가해줄 수 있습니다. 작동 과정은 어렵지 않으므로 설명을 생략합니다.
```cpp
bool update(){
    int mn = 1e9;
    for(int i=0; i<SZ; i++){
        if(!chk[i]) continue;
        for(auto j : g[i]){
            if(j.c && !chk[j.v]) mn = min(mn, dst[i] + j.d - dst[j.v]);
        }
    }
    if(mn == 1e9) return 0;
    for(int i=0; i<SZ; i++) if(!chk[i]) dst[i] += mn;
    return 1;
}
```
Dinic-Style로 유량을 흘리는 것과 $O(V+E)$에 DAG를 갱신하는 최적화는 중국에서 **zkw MCMF**라는 이름으로 알려져 있습니다. sparse한 그래프에서 빠르게 작동한다고 합니다.

[코드](https://www.acmicpc.net/source/share/e16ff1f5db0d49ce82bbb8e805119c4e)

#### Johnson's Algorithm
MCMF에서 $O(VE)$짜리 Bellman-Ford(혹은 SPFA)를 쓰는 이유는 **음수 가중치 간선** 때문입니다. 만약 음수 가중치를 없앨 수 있다면 $O(VE)$ 대신 $O(V^2)$ 혹은 $O(E log V)$에 동작하는 Dijkstra를 사용할 수 있을 것입니다.

Johnson's Algorithm([영문 위키](https://en.wikipedia.org/wiki/Johnson's_algorithm))를 사용하면 간선의 가중치를 모두 0 이상으로 만들어 주면서, 동시에 최단 경로는 그대로 유지할 수 있습니다. 이 알고리즘은 Bellman-Ford 알고리즘을 사용하므로 $O(VE)$에 작동합니다. $O(VE)$에 한 번 전처리를 해주면, 그 다음부터 Shortest Path DAG를 구할 때는 $O(E log V)$짜리 Dijkstra를 쓸 수 있습니다.

[코드](https://www.acmicpc.net/source/share/ba0fb1911c984783ae9ef4e6807cdc00)

### 성능
각 최적화 단계에서 코드 공유를 위해 사용한 문제에서는 기존 MCMF와 큰 차이는 없었습니다.<Br>
그러나 sparse한 그래프에서 MCMF를 돌리는 [BOJ 11111](https://icpc.me/11111)에서는 216ms -> 8ms로, 기존 MCMF에 비해 매우 빠른 것을 확인할 수 있습니다.

### 참고 문헌
*  https://github.com/koosaga/olympiad/blob/master/Library/codes/graph_optimization/mincostflow_fast.cpp
*  https://koosaga.com/18
*  https://blog.csdn.net/konnywen/article/details/104250299
*  https://www.wahacer.com/794
