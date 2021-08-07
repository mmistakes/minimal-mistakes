---
title:  "[그래프] 위상 정렬"
date:   2018-03-24 15:21:00
categories:
- Easy-Algorithm
tags:
- Topological-Sort
---

### 서론
위상 정렬은 그래프 중에서도 DAG에서만 사용 가능한 알고리즘입니다.<br>
DAG는 Directed Acyclic Graph의 줄임말이며, 사이클이 없는 유향(방향) 그래프입니다.<br>
위상 정렬은 유향 그래프의 방향성을 거스르지 않게 정점들을 나열하는 것입니다.<br><br>
마치 스타크래프트에서 해처리가 있어야 스포닝 풀을 지을 수 있고, 스포닝 풀이 있어야 히드라리스크 덴과 레어를 지을 수 있는 것처럼 어떤 일을 수행하기 전에 미리 해야할 일이 있다면, 미리 수행해야 할 일을 먼저 하는 것과 같다고 볼 수 있습니다.

위상 정렬을 하는 방법은 두 가지가 있습니다.<br>
하나는 DFS를 이용하는 방법이고, 다른 하나는 BFS와 in-degree를 활용하는 방법입니다.<br>
하나씩 알아봅시다.

### DFS 활용
DFS를 이용한 위상 정렬은 매우 간단합니다.<br>
DFS를 실행하면서 DFS가 끝나는 순서의 역순이 위상 정렬의 결과가 됩니다.<br>
역순을 구하는 방법은 간단합니다.<br>
DFS가 끝날 때마다 스택에 넣고, 결과를 출력할 때 스택에서 하나씩 꺼내면서 출력을 해주면 됩니다.

```cpp
#include <bits/stdc+-+.h>
#define N 1000
using namespace std;

vector<int> g[N+1];
stack<int> s;
vector<bool> visited(N+1);

void dfs(int v){
  visited[v] = true;
  for(int i=0; i<g[v].size(); i++){
    if(!visited[ g[v][i] ]) dfs(i);
  }
  s.push(v);
}
```

N은 정점의 최대 개수입니다.<br>
vector<int> g[N+1]은 인접 리스트이고, stack<int> s는 종료 순서를 저장할 스택입니다.<br>
visited는 방문 체크 배열입니다.<br>
dfs의 매개변수 v는 현재 탐색 중인 정점 번호를 저장합니다.<br>
for문을 이용해 v와 인접한 모든 정점을 순회하면서, 만약 방문하지 않은 정점이 있다면 dfs함수를 재귀 호출합니다.<br>
함수의 마지막 줄에서는 탐색이 종료되므로 스택에 현재 정점을 넣습니다.<br>
dfs를 모두 돌린 뒤에는 스택에서 하나씩 꺼내주면서 출력을 하면 됩니다.

### BFS와 in-degree 활용
in-degree를 이용한 방법을 알아보겠습니다.

먼저 간선의 정보를 입력을 받고, in-degree가 0인 정점을 모두 큐에 넣어줍니다.<br>
in-degree가 0이라는 의미는 위상 정렬 결과에서 맨 앞에 나올 수 있다는 것을 의미합니다.<br>
그 다음에는 정점의 개수만큼 큐가 빌 때까지 아래 작업을 반복합니다.

1. 큐에서 맨 앞에 있는 정점와 그 정점에서 뻗어 나가는 간선들을 그래프에서 제거
2. 1번 동작으로 인해 in-degree가 0이 된 정점들을 큐에 삽입

이 때 큐에 동시에 여러 개의 정점이 들어간다면, 그 정점들의 순서가 바뀌어도 위상 정렬의 결과가 이상해지지 않습니다.

https://www.acmicpc.net/problem/1766 에서는 숫자가 작은 문제집을 먼저 풀라고 했기 때문에 작은 것부터 출력을 해야합니다.<br>
그럴 때에는 priority_queue를 써서 작은 값부터 출력을 하면 됩니다.
```cpp
#include <bits/stdc++.h>
using namespace std;

int n, m;
vector<int> g[32010];
vector<int> indegree(32010);
priority_queue<int> pq;

int main(){
	scanf("%d %d", &n, &m);
	for(int i=0; i<m; i++){
		int a, b; scanf("%d %d", &a, &b);
		g[a].push_back(b);
		indegree[b]++;
	}
	for(int i=1; i<=n; i++) if(!indegree[i]) pq.push(-i);
	while(!pq.empty()){
		int poped = -pq.top(); pq.pop();
		printf("%d ", poped);
		for(int i=0; i<g[poped].size(); i++){
			int nxt = g[poped][i];
			indegree[nxt]--;
			if(!indegree[nxt]) pq.push(-nxt);
		}
	}
}
```

g는 인접리스트이고, indegree는 in-degree를 저장하는 배열입니다.<br>
첫 번째 for문에서 간선의 정보를 입력받을 때 in-degree도 함께 계산해줍니다.<br>
두 번째 for문에서는 in-degree가 0인 정점을 우선순위큐(priority_queue)에 집어넣습니다.<br>
-1을 곱하는 이유는 기본적으로 우선순위큐는 최대값을 뽑아내기 때문에 -를 붙여 그 순서를 뒤집어 줍니다.<br>
while문은 pq가 빌 때 까지 반복합니다.<br>
poped에는 pop된 결과에 -를 붙여 저장하고 pq를 pop합니다.<br>
그 다음에는 pop한 정점을 출력합니다.<br>
for문을 이용해 poped에서 갈 수 있는 정점들을 순회하면서, 해당 정점들의 in-degree를 1씩 감소시켜 줍니다.<br>
만약 in-degree가 0이 된다면 pq에 넣어줍니다.

### 추천 문제
* https://www.acmicpc.net/problem/1766 위에서 설명한 문제입니다.
* https://www.acmicpc.net/problem/2252 간단한 위상 정렬 문제입니다.
* https://www.acmicpc.net/problem/2623 위상 정렬은 DAG에서만 가능합니다.
* https://www.acmicpc.net/problem/1516 위상 정렬과 DP를 사용하면 DAG에서 최장 경로를 찾을 수 있습니다.
