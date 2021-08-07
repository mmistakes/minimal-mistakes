---
title:  "[그래프] Max-Flow - 1"
date:   2018-12-21 17:08:00
categories:
- Hard-Algorithm
tags:
- Network-Flow
---

### 작동 방식
네트워크 플로우 관련 알고리즘 중 가장 기초적인 Max-Flow 중, Ford-Fulkerson알고리즘에 대해 알아보도록 하겠습니다.<br>
이 알고리즘은 Max-Flow 뿐만 아니라 네트워프 플로우 관련 알고리즘 중 가장 먼저 고안된 알고리즘입니다.<br>
동작 원리는 매우 간단합니다. 유량 네트워크에 있는 모든 간선의 유량을 0으로 초기화 시킨 뒤, 소스에서 source에서 sink로 유량을 더 보낼 수 있는 경로를 찾아 흘리는 동작만 반복하면 됩니다.

<img src = "https://i.imgur.com/CFlhjSw.png"><br>
이런 유량 네트워크에서 Ford-Fulkerson알고리즘을 돌려봅시다.

<img src = "https://i.imgur.com/Q4x5LyU.png"><br>
굵은 선으로 표시된 경로로 1만큼 흘리면 위 사진과 같은 상태가 됩니다.<br>
다른 경로를 찾아 한 번 더 흘리면 아래와 같은 상태가 됩니다.

<img src = "https://i.imgur.com/4BAdx47.png"><br>
이런 식으로 유량을 보내는 경로를 증가 경로(augmenting path)라고 부릅니다. 어떤 경로가 증가 경로가 되기 위해서는 해당 경로 상에 있는 모든 간선에 잔여 용량(residual capacity)이 있어야 합니다. u에서 v까지 추가로 더 보낼 수 있는 잔여 용량 r[u][v]를 아래와 같이 정의합시다.<br>
`r[u][v] = c[u][v] - f[u][v]`<br>
이 때, 증가 경로를 통해 sink까지 흘려 보낼 수 있는 유량은 해당 경로 상에 있는 간선들의 잔여 용량 중 최소값인 것은 자명한 사실입니다.<br>

위에서 설명한 그래프에서 다시 한 번 Ford-Fulkerson을 돌릴 것인데, 아까와는 다른 경로를 통해 흘려보겠습니다.<br>

<img src = "https://i.imgur.com/kglih61.png"><br>
이렇게 유량을 흘리게 되면 최대 유량을 흘리지 않았음에도 불구하고 더 이상 유량을 흘리지 못하게 됩니다. 그러나 이전 글에서 언급했던 대칭성을 이용하면 해결할 수 있습니다.<br>
B에서 A로 가는 간선이 없으므로 c[B][A]는 0입니다. 그러나 유량의 대칭성에 의해 f[B][A] = -1이 됩니다. 잔여 용량은 `0 - (-1)`, 즉 1이 됩니다. 실제로는 존재하지 않는 간선이지만 이미 들어온 유량을 다시 상대방에게 보내준다는 의미로 해석할 수 있습니다.<br>
B에서 A방향으로 1만큼 유량을 흘릴 수 있으니 증가 경로를 다시 찾아 유량을 흘려주면 아래와 같은 상황이 되고, 최대 유량을 구해낼 수 있습니다.<br>

<img src = "https://i.imgur.com/xqqc3fN.png"><br>

### Edmonds-Karp Algorithm
사실, Ford-Fulkerson알고리즘은 증가 경로를 찾는 방법을 명시하지 않았습니다. 그러나 우리는 DFS와 BFS를 알기 때문에 둘 중 하나를 써서 구현할 수 있습니다.<br>
DFS나 BFS를 이용해 탐색을 하는데 O(V+E)가 들고, 증가 경로에 유량을 흘릴 때는 한번에 최소 1 이상은 흘리게 됩니다. 최대 유량을 f로 가정했을 때, 시간 복잡도는 O(Ef)가 됩니다. 만약 f가 매우 큰 수라면 시간이 오래 걸릴 수 있습니다. BFS를 이용해 증가 경로를 탐색을 하면 O(VE<sup>2</sup>)만에 최대 유량을 구할 수 있기 때문에 보통 BFS를 이용한 방법을 많이 사용하고, 이를 Edmonds-Karp Algorithm이라 부르기도 합니다.<br>

### 시간 복잡도 분석
Edmonds-Karp Algorithm이 O(VE<sup>2</sup>)인 이유를 증명하기 위해서는 증가 경로를 최대 O(VE)번 찾는다는 것을 증명하면 됩니다.

Def 1. c[u][v] == f[u][v]인 간선(u, v)를 포화 간선이라고 정의하고, 그렇지 않은 간선을 비포화 간선이라 정의하겠습니다.<br>
Def 2. 비포화 간선으로만 이루어진 유량 네트워크를 Residual Graph라고 정의하겠습니다.

Lemma 1. Residual Graph에서 현재의 source - sink 최단거리가 D라고 했을 때, 최단거리를 D로 유지하는 동안 E번만 증가 경로를 찾습니다.<br>
proof. flow를 보낼때마다 Residual Graph의 간선 중 최소 하나가 포화 간선이 됩니다. 최단 경로가 D인 한, 그 간선을 다시 볼 일은 없게 됩니다. (역변을 타게 된다면 거리가 증가하기 때문에 그러한 경로는 찾지 않습니다.) 역변을 타지 않기 때문에 간선은 비포화에서 포화 상태로만 변하게 되고, 모든 간선이 포화 간선이 되면 경로가 없어집니다. 그러므로 최단거리를 고정하면 O(E)개의 증가 경로만 찾게 됩니다.

최단거리는 V이하인 것은 당연하기 때문에 VE번 증가 경로를 찾는 것을 알 수 있고, 시간 복잡도는 O(VE<sup>2</sup>)이 됩니다.

### 구현
icpc.me/11375 를 풀어봅시다.<br>
직원이 할 수 있는 일들이 주어질 때, 최대 몇 개의 일을 할 수 있는지 물어보는 문제입니다.<br>
입출력 예제로 주어진 데이터를 예시로 설명하도록 하겠습니다.<br>
왼쪽에는 직원, 오른쪽에는 일을 배치해두고, 아래와 같이 source와 모든 직원, 모든 일과 sink, 마지막으로 직원이 할 수 있는 일을 용량이 1인 간선으로 연결해봅시다.<br>
<img src = "https://i.imgur.com/mXv7uds.png"><br>
이 상태에서 Max Flow값을 찾아주면 됩니다.

아래 코드는 위에서 설명한 방식대로 코드를 짠 것이고, 조금 더 쉽게 푸는 방법을 다음 글에서 다루도록 하겠습니다.

```cpp
#include <bits/stdc++.h>
using namespace std;

vector<int> g[2010];
typedef pair<int, int> p;
int cap[2010][2010];
int flow[2010][2010];
int n, m;
const int inf = 1e9+7;
const int s = 0, e = 2001;

int par[2010];
int ans = 0;

int main(){
	ios_base::sync_with_stdio(0); cin.tie(0);
	cin >> n >> m;
	for(int i=1; i<=n; i++){
		cap[s][i] = 1;
		g[s].push_back(i);
		g[i].push_back(s);
		int t; cin >> t;
		for(int j=0; j<t; j++){
			int tt; cin >> tt;
			tt += 1000;
			g[i].push_back(tt);
			g[tt].push_back(i);
			cap[i][tt] = 1;
		}
	}
	for(int i=1001; i<=1000+m; i++){
		g[i].push_back(e);
		g[e].push_back(i);
		cap[i][e] = 1;
	}

	for(int iter=1; ; iter++){
		memset(par, -1, sizeof(par));
		queue<int> q;
		q.push(s);
		while(!q.empty()){
			int now = q.front(); q.pop();
			for(auto nxt : g[now]){
				if(par[nxt] == -1 && cap[now][nxt] - flow[now][nxt] > 0){
					q.push(nxt); par[nxt] = now;
					if(nxt == e) break;
				}
			}
		}
		if(par[e] == -1) break;

		int cost = inf;
		for(int i=e; i!=s; i = par[i]){
			cost = min(cost, cap[par[i]][i] - flow[par[i]][i]);
		}

		for(int i=e; i!=s; i = par[i]){
			flow[par[i]][i] += cost;
			flow[i][par[i]] -= cost;
		}
		ans += cost;
	}
	cout << ans;
}
```

### 추천 문제
* http://icpc.me/11376 source와 사람을, sink와 작업을 이어준 뒤, 사람과 작업을 적절히 이어줍시다.
* http://icpc.me/11377 <a href = "https://justicehui.github.io/ps/2019/03/17/BOJ11377/">풀이</a>
* http://icpc.me/11378 <a href = "https://justicehui.github.io/ps/2019/03/17/BOJ11378/">풀이</a>
* http://icpc.me/2316 한 정점을 in정점과 out정점으로 분할해주면 됩니다. <a href = "https://justicehui.github.io/ps/2019/03/17/BOJ2316/">풀이</a>
