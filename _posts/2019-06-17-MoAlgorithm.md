---
title: "[구간쿼리] Mo's Algorithm(모스 알고리즘)"
date: 2019-06-17 23:29:00
categories:
- Hard-Algorithm
tags:
- Mo-Algorithm
---

### 서론
약 3개월 전에 [이 글](https://justicehui.github.io/medium-algorithm/2019/03/03/SqrtDecomposition/)을 쓰면서 잠시 Mo's Algorithm을 언급했었습니다.<br>
이 글에서 모스 알고리즘의 설명을 다루면서 모스 알고리즘을 이용해서 푸는 몇 가지 문제를 풀어보고자 합니다.

### 모스 알고리즘?
모스 알고리즘은 업데이트가 없는 구간 쿼리들을 처리하는 알고리즘입니다. 대개 어떤 구간 [s, e]에 속하는 원소들을 이용해서 어떤 값을 계산하는 쿼리를 처리합니다.

업데이트가 없으니까 쿼리들의 순서를 마음대로 바꿔서 처리해도 상관이 없습니다. 모스 알고리즘은 √decomposition과 비슷한 아이디어를 이용해 쿼리들의 순서를 재배치해서 효율적으로 쿼리들을 수행합니다.

### 핵심 아이디어
두 개의 쿼리 Q1 = [s1, e1], Q2 = [s2, e2]를 처리해야 한다고 합시다.<br>
두 개의 구간이 서로 분리가 되어있다면 상관 없겠지만, 두 구간의 일정 부분이 겹쳐져 있는 경우를 생각해봅시다.

<img src = "https://i.imgur.com/Z2n1s7C.png"><br>
Q1 = [2, 6], Q2 = [5, 9]인 상황을 봅시다. 만약 쿼리들의 순서를 **잘** 배치해준다면 위 그림에서 [5, 6] 구간처럼 겹치는 구간의 값을 다시 구하지 않고 재활용 할 수 있습니다.

<img src = "https://i.imgur.com/W1E41s9.png"><br>
Q1 = [2, 8], Q2 = [4, 7]인 상황을 봅시다. Q2를 먼저 처리한 후 Q1을 처리한다면 Q2에 포함되는 것들은 미리 계산을 했으니 Q2에 포함된 원소를 제외하고 나머지 원소들만 처리해도 Q1의 결과를 알 수 있습니다.

이런 식으로 결과를 재사용한다면 Q1 = [s1, e1]의 결과를 재활용해서 Q2 = [s2, e2]의 결과를 구하는 시간은 `O(|s2 - s1| + |e2 - e1|)`입니다. 이 값들의 합을 최소화시키면 됩니다.

### 해법
먼저 SQRT Decomposition과 비슷하게 배열을 원소가 k = O(√N)개로 이루어진 버킷으로 나눠줍니다. 아래 조건 중 하나를 만족하는 경우에 Q1을 Q2보다 먼저 처리해주면 됩니다.

* [s1/k] < [s2/k]
* [s1/k] = [s2/k] and e1 < e2

시간 복잡도 분석은 아래에서 예시 문제를 풀어본 다음에 하도록 하겠습니다.

### 예시 문제
[이 문제](http://icpc.me/11659)를 봅시다.<br>
업데이트 쿼리는 안 들어오고, [i, j]의 합을 구하면 되는 문제입니다.<br>
Segment Tree나 Prefix Sum을 이용하면 각각 하나의 쿼리를 O(logN), O(1)에 해결할 수 있지만, 일단 모스 알고리즘을 설명해야 하니까 모스 알고리즘으로 풀어봅시다.

입력 예제는 너무 작으니 마음대로 입력 예제를 만들어봅시다.
```
16 5
1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16
4 6
1 8
8 9
3 4
6 9
```
* [s1/k] < [s2/k]
* [s1/k] = [s2/k] and e1 < e2

조건에 따라 쿼리를 정렬해주면 아래와 같이 정렬됩니다.
```
3 4 (s/4 = 0)
1 8 (s/4 = 0)
4 6 (s/4 = 1)
6 9 (s/4 = 1)
8 9 (s/4 = 2)
```

[3, 4] 쿼리는 미리 계산한 값이 없으니 그냥 Naive하게 구해줍시다.
<img src = "https://i.imgur.com/3LzQXiY.png">

이제 [1, 8]을 처리해야 합니다. 이미 [3, 4]는 처리했으므로 **1~2** 와 **5~8** 을 처리해주면 됩니다.<br>
구간의 시작점은 2만큼 이동하고, 끝점은 4만큼 이동하네요.<br>
<img src = "https://i.imgur.com/oVzT1qP.png">

다음은 [4, 6]입니다.<br>
[1, 8]을 구해놓기는 했는데, 이번에 처리할 쿼리에서 원하는 구간은 [4, 6]입니다. **1~3** 과 **7~8** 은 버려야 합니다.<br>
구간의 시작점은 3만큼 이동하고, 끝점은 2만큼 이동합니다.<br>
<img src = "https://i.imgur.com/G5LYOWD.png">

### 시간복잡도 분석
이쯤에서 멈추고, 시간복잡도를 분석해봅시다.<br>
일단 쿼리를 정렬하는데 O(Q log Q)시간이 걸리겠네요. 이제 쿼리를 처리하는 경우를 봅시다.

#### case 1. 바로 이전 쿼리와 [s/k]값이 같다.
아무리 이전 쿼리와 시작점이 많이 떨어져있다고 해도 최대 k = O(√N)만큼 차이납니다. 모든 쿼리가 case 1에 해당한다고 하면, 시작점은 최대 O(Q √N)번 이동합니다.<br>
[s/k]값이 같다면 끝점은 항상 단조증가합니다. 그러므로 시작점이 같은 버킷에 있는 모든 쿼리에서 끝점은 총 O(N)번 바뀝니다. 그리고 이런 버킷이 k = O(√N)개 있으므로 끝점은 O(N √N)번 이동합니다.

#### case 2. 바로 이전 쿼리와 [s/k]값이 다르다.
이런 경우에는 시작점이 O(√N)보다 많이 바뀔 수 있습니다. 최대 O(N)번 바뀔 수 있습니다. 그러나 버킷은 총 O(√N)개이므로 case2에 해당하는 상황도 O(√N)번만 일어날 수 있습니다.<br>
끝점도 매번 O(N)번 바뀌며, 이런 경우가 최대 O(√N)번 있으니 총 O(N √N)번 바뀝니다.

#### 결론
어떤 경우에도 N개의 원소에 대한 쿼리를 Q개 처리할 때 O((N+Q) √N)번을 넘게 시작점과 끝점이 이동하지 않습니다.<br>
만약 시작점과 끝점을 이동하는데 걸리는 시간이 T(N)이라면, 최종 시간복잡도는 O((N+Q)√N * T(N))이 됩니다.

### 예시 문제 구현
```cpp
#include <bits/stdc++.h>
using namespace std;

typedef long long ll;

int sqrtN;

struct Query{
	int idx, s, e;
	bool operator < (Query &x){
		if(s/sqrtN != x.s/sqrtN) return s/sqrtN < x.s/sqrtN;
		return e < x.e;
	}
};

vector<Query> query;
vector<int> v;
ll res = 0;
ll ans[101010];

int main(){
	ios_base::sync_with_stdio(0); cin.tie(0);
	int n, q; cin >> n >> q; sqrtN = sqrt(n);
	v.resize(n+1);

	for(int i=1; i<=n; i++){
		cin >> v[i];
	}
	for(int i=0; i<q; i++){
		int s, e; cin >> s >> e;
		query.push_back({i, s, e});
	}
	sort(query.begin(), query.end());

	int s = query[0].s, e = query[0].e;
	for(int i=s; i<=e; i++){
		res += v[i];
	}
	ans[query[0].idx] = res;

	for(int i=1; i<q; i++){
		while(s < query[i].s) res -= v[s++];
		while(s > query[i].s) res += v[--s];
		while(e < query[i].e) res += v[++e];
		while(e > query[i].e) res -= v[e--];
		ans[query[i].idx] = res;
	}
	for(int i=0; i<q; i++) cout << ans[i] << "\n";
}
```

### 추천 문제
* 백준13547 수열과 쿼리 5
* 백준13548 수열과 쿼리 6
* 백준8462 배열의 힘
* 백준14413 Poklon
