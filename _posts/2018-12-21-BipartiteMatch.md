---
title:  "[그래프] Bipartite Matching"
date:   2018-12-21 18:52:00
categories:
- Hard-Algorithm
tags:
- Network-Flow
- Bipartite-Match
---

### 이분 매칭이란?
이전 글에서 Max-Flow를 구하는 방법에 대해 알아보았고, 마지막 부분에서는 문제 하나를 풀어보았습니다.<br>
icpc.me/11375 문제를 풀어보았고, 문제를 그래프로 모델링하면 아래 사진처럼 그래프가 만들어졌습니다.<br>
<img src = "https://i.imgur.com/mXv7uds.png"><br>

이 그래프를 보면, 왼쪽에 있는 모든 노드들은 source에서 갈 수 있고, 오른쪽에 있는 모든 노드는 sink로 갈 수 있습니다. 그래프를 약간 바꿔봅시다.<br>
<img src = "https://i.imgur.com/Y4RS36S.png" width = "200px"><br>

그래프의 정점을 왼쪽에 있는 정점과 오른쪽에 있는 정점, 두 그룹으로 나눠봅시다. 동일한 그룹에 있는 정점끼리는 간선으로 연결되어있지 않습니다. 이런 그래프를 이분 그래프(Bipartite Graph)라고 합니다.<br>
맨 위에 있는 그림처럼 source에서 A에 있는 정점으로 갈 수 있고, B에 있는 정점에서는 sink로 갈 수 있으며 A, B 그룹만 봤을 때 이분 그래프 형태인 그래프에서 최대 유량을 구하는 문제를 이분 매칭(Bipartite Matching)이라고 합니다.

매칭은 간선을 하나 선택하는 것입니다. 간선을 선택하는 것은 양 끝에 달려있는 정점들도 같이 선택한다는 것을 의미합니다. 또한, 각 정점은 한 번만 선택할 수 있습니다. 각 정점을 한 번만 선택하게 하기 위해서는 source와 A그룹 정점, B그룹 정점과 sink를 용량이 1인 간선으로 연결함으로써 구현할 수 있습니다. 이분 그래프에서 MaxFlow는 최대 V이기 때문에 시간 복잡도는 O(VE)가 됩니다.

이분 매칭 문제는 Max-Flow 문제와 동일한 방법으로 풀 수 있지만, 조금 더 단순한 방법으로 풀 수 있으며 이 방법을 알아두는 편이 좋습니다.

### 작동 방식
<img src = "https://i.imgur.com/joM3gT9.png" width = "200px"><br>
1번 정점은 A, B번 정점과 연결될 수 있습니다.
1번 정점과 A번 정점을 연결해줍시다.<br>

2번 정점은 A번 정점과 연결할 수 있습니다.<br>
2번 정점과 A번 정점을 연결하려고 보니, 1번 정점이 이미 A번 정점과 연결 되어있습니다. 다시 1번 정점으로 돌아와 다른 정점과 연결해준 뒤, 2번과 A번 정점을 연결합시다.<br>
<img src = "https://i.imgur.com/vWUfYIZ.png" width = "200px"><br>

3번 정점은 B, C번 정점과 연결될 수 있습니다. B번과 연결을 시도해봅시다.<br>
B번 정점은 1번과 이미 연결 되어있습니다. 1번과 연결될 수 있는 또 다른 정점인 A번 정점은 이미 2번과 연결이 되어있고, 2번은 A를 제외한 어떠한 정점과 연결될 수 없습니다. 그러므로 3번 정점은 B번과 연결하지 못합니다. 3번과 C번 정점을 연결합니다.<br>
<img src = "https://i.imgur.com/YO51KxD.png" width = "200px">

4번 정점은 C, D, E번 정점과 간선으로 이어져 있지만, 3번의 경우와 유사한 이유로 인해 C번과 연결하지 못합니다. D번 정점과 연결합시다.<br>
<img src = "https://i.imgur.com/8aPZOrr.png" width = "200px">

5번 정점은 어떠한 정점과도 연결하지 못합니다.

### 구현
이런식으로 이분 매칭이 진행이 됩니다. dfs를 이용해 간편하게 구현할 수 있습니다.
```cpp
#include <bits/stdc++.h>
using namespace std;

vector<int> g[2010];
vector<int> par(2010, -1);
bool chk[2010];
int n, m;

int match(int v){ //v번 정점을 다른 정점과 매칭할 수 있는가?
	for(auto i : g[v]){ //v와 연결될 수 있는 정점 순회
		if(chk[i]) continue; //이미 연결 되어있다면 skip
		chk[i] = 1;
		if(par[i] == -1 || match(par[i])){ //매칭되어 있지 않거나, 다른 정점과 매칭시킬 수 있다면
			par[i] = v; //연결
			return 1;
		}
	}
	return 0;
}

int main(){
	ios_base::sync_with_stdio(0); cin.tie(0);
	cin >> n >> m;
	for(int i=1; i<=n; i++){
		int t; cin >> t;
		for(int j=0; j<t; j++){
			int tt; cin >> tt;
			tt += 1000;
			g[i].push_back(tt);
		}
	}

	int ans = 0;
	for(int i=1; i<=n; i++){
		memset(chk, 0, sizeof(chk));
		if(match(i)) ans++;
	}
	cout << ans;
}
```

### 연습 문제
* http://icpc.me/14498 의견이 충돌하는 학생끼리 이어줍시다.
* http://icpc.me/2570 <a href = "https://justicehui.github.io/koi/2019/03/27/BOJ2570/">풀이</a>
