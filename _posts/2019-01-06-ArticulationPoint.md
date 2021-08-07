---
title:  "[그래프] 단절점"
date:   2019-01-06 23:22:00
categories:
- Hard-Algorithm
tags:
- Articulation-Point
---

### 단절점이란?
하나의 컴포넌트(connected component)로 구성되어 있는 그래프에서 특정 정점을 제거할 때, 컴포넌트의 개수가 증가하는 정점을 `단절점` 이라고 합니다.<br>
쉽게 말해, 어떤 정점을 제거했을 때 그래프가 둘 이상으로 나뉘게 된다면 그 정점은 단절점입니다.

<img src = "https://i.imgur.com/PIQ389M.png" width = "300px"><br>
위 그림에서는 1, 6, 7번 정점이 단절점이 됩니다.

### Naive한 방법
단절점을 구하는 가장 간단한 방법을 알아봅시다.<br>
정점의 개수를 V, 간선의 개수를 E라고 할 때, 모든 정점을 O(V)에 순회하면서 해당 정점을 제거했을 때 컴포넌트가 증가하는지 DFS나 BFS를 통해 O(V + E)에 구할 수 있습니다. 이 방법을 쓰면 O(V*(V+E))만에 구할 수 있습니다.

이렇게 쉬운 방법이 빠른 방법이라면, 이 글을 쓸 이유가 딱히 없겠죠. 더 빠른 방법을 알아봅시다.

### DFS Tree를 이용한 방법
<img src = "https://i.imgur.com/PIQ389M.png" width = "300px"><br>
위 그래프의 dfs tree를 그려봅시다.<br>
<img src = "https://i.imgur.com/a0qRXVb.png" width = "300px"><br>

위에 있는 그래프에서 1, 6, 7이 단절점입니다. dfs tree 상에서 단절점을 판별하는 방법을 알아봅시다.

어떤 정점 V가 단절점이 아니라는 것은, V의 자손인 정점들 중 V를 거치지 않고 <b>한 번에</b> V보다 위에 있는 정점(정확히는 V 이전에 방문했던 정점)에 갈 수 있다는 것을 의미합니다. 즉, 우회로가 있다는 의미입니다.<br>
예를 들어 4번 정점으로 예를 들어봅시다. 4번 정점의 자손 중에 5번 정점이 있습니다. 5번 정점은 4번을 거치지 않고, 한 번에 1번 정점으로 갈 수 있습니다. 이는 4번 정점이 없어도 다른 정점과 연결이 되어있기 때문에 connected component가 증가하지 않음을 의미합니다.

위 사실을 통해 단절점의 판별법을 아래와 같이 정의할 수 있습니다.
* 현재 정점 V의 자손 정점이 V를 거치지 않고, V 이전에 방문했던 정점에 갈 수 있다면 단절점이 아니다.

그러나 예외가 하나 있습니다. 현재 정점 V가 dfs tree 상에서 root라면, 약간 판별법이 달라지게 됩니다.<br>
1. 자식 정점이 2개 이상이라면 단절점이다.
2. 그렇지 않다면 단절점이 아니다.

단절점의 판별법을 완전히 정의하자면,
1. 어떤 정점 V가 dfs tree상에서 root이고, 자식의 개수가 2 이상이면 단절점이다.
2. 어떤 정점 V가 dfs tree상에서 root이고, 자식의 개수가 1 이하라면 단절점이 아니다.
3. 어떤 정점 V가 dfs tree상에서 root가 아니고, V의 자손 정점 중 V를 거치지 않고 V 이전에 방문했던 정점에 갈 수 있다면 단절점이 아니다.

현재 정점보다 먼저 방문했던 정점에 갈 수 있는지 확인하는 것은 전에 설명했던 Tarjan's Algorithm을 사용해 구할 수 있습니다.

### 구현
```cpp
vector<int> g[s], ans;
int order[s], par[s], low[s], t;

void dfs(int v){
	order[v] = t++;
	low[v] = t;
	int sub = 0; //자식 수
	for(auto i : g[v]){
		if(i == par[v]) continue;

		if(!order[i]){
			par[i] = v;
			sub++;
			dfs(i);
			if(!par[v] && sub > 1) ans.push_back(v); //루트 노드
			else if(par[v] && low[i] >= order[v]) ans.push_back(v);

			low[v] = min(low[v], low[i]);
		}
		else low[v] = min(low[v], order[i]);
	}
}
```
