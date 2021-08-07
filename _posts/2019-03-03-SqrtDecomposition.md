---
title:  "[구간쿼리] Sqrt Decomposition"
date: 2019-03-03 21:43:00
categories:
- Medium-Algorithm
tags:
- Sqrt-Decomposition
---

### 개요
이번 글에서는 특정 구간에 대한 쿼리를 O(√N)에 처리할 수 있는 SQRT Decomposition에 대해 알아보도록 하겠습니다.<br>
사실 Segment Tree를 사용하면 유사한 기능을 O(log N)이라는 훌륭한 시간에 수행해낼 수 있지만, SQRT Decomposition은 다른 글에서 설명할 Mo's Algorithm이라는 효율적인 테크닉의 기반이 되는 알고리즘으로 사용됩니다.

### SQRT Decomposition이란?
SQRT Decomposition은 이름 그대로 원소들을 O(√N)개 단위로(SQRT) 분할(Decomposition)하는 것입니다.<Br>
원소가 9개라면 3개씩, 16개라면 4개씩 그룹으로 나누어 관리해줍니다.<br>
<img src = "https://i.imgur.com/lL1kJn4.png">

각 그룹은 대표값을 갖고 있습니다. 만약 주어지는 쿼리가 구간의 덧셈이라면 그룹의 합이 대표값이 되고, 주어지는 쿼리가 구간의 최댓값이라면 그룹의 최댓값이 대표값이 됩니다. 이 글에서는 **BOJ2042번 구간합 구하기** 문제를 예시로 설명할 것이고, 때문에 각 그룹의 대표값은 그룹의 합이 됩니다.<br>
<img src = "https://i.imgur.com/gjb1QpD.png">

### update 구현
update와 query 중 구현이 더 간단한 update를 먼저 해봅시다.<br>
update는 해당 원소를 직접 업데이트 해주고, 그 원소가 속한 그룹에 있는 모든 원소의 합을 구해 대표값을 갱신해주면 됩니다. O(√N)의 시간이 걸립니다.<br>
<img src = "https://i.imgur.com/uETzJUw.png">

### quert 구현
query는 [l, r]구간에 있는 모든 원소의 합을 구해야 합니다.<br>
<img src = "https://i.imgur.com/eGeCXd8.png"><br>
[4, 15] 구간의 합을 구해야 한다고 합시다.
1. 5~8번째 원소는 두 번째 그룹, 9~12번째 원소는 세 번째 그룹 전체로 대체할 수 있습니다.
2. 4번째 원소와 13~15번째 원소는 어떤 그룹 전체로 대체할 수는 없습니다.

1번의 경우에는 그냥 그룹의 대표값을 가져가면 됩니다. 2번의 경우에는 하나씩 계산을 해줘야 합니다. 두 가지 경우를 모두 계산하면 구간 전체의 합을 구할 수 있습니다.

1번의 경우를 보면, 그룹은 최대 O(√N)개 존재합니다.<Br>
2번의 경우에 속하는 원소들은 쿼리를 날리는 구간의 왼쪽 몇 개와 오른쪽 몇 개밖에 없습니다. 양쪽 모두 각각 (√N - 1)개씩 존재할 수 있습니다.<Br>
1, 2번을 모두 고려해도 O(√N)밖에 걸리지 않습니다.

### 전체 코드
전체 코드는 아래와 같습니다.
```cpp
#include <bits/stdc++.h>
using namespace std;

typedef long long ll;

ll arr[1010101];
ll bucket[1010];
int sq;

int n, m, k;

void init(){
	sq = sqrt(n);
	for(int i=1; i<=n; i++){
		bucket[i/sq] += arr[i];
	}
}

void update(int idx, ll val){
	arr[idx] = val;
	int id = idx/sq; //그룹 번호
	int s = id * sq; //그룹의 시작점
	int e = s + sq; //그룹의 끝접 + 1
	bucket[id] = 0;
	for(int i=s; i<e; i++) bucket[id] += arr[i];
}

ll query(int l, int r){
	ll ret = 0;
	while(l%sq != 0 && l <= r) ret += arr[l++]; //왼쪽 몇 개
	while((r+1)%sq != 0 && l <= r) ret += arr[r--]; //오른쪽 몇 개

	while(l <= r){ //그룹 전체
		ret += bucket[l/sq];
		l += sq;
	}

	return ret;
}

int main(){
	ios_base::sync_with_stdio(0); cin.tie(0);
	cin >> n >> m >> k;
	for(int i=1; i<=n; i++) cin >> arr[i];
	init();

	for(int i=0; i<m+k; i++){
		int a, b, c; cin >> a >> b >> c;
		if(a == 1) update(b, c);
		else cout << query(b, c) << "\n";
	}
}
```
