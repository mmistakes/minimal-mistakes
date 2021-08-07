---
title: "Segment Tree Beats"
date: 2019-10-10 01:28:00
categories:
- Hard-Algorithm
tags:
- Segment-Tree
- Lazy-Propagation
- Segment-Tree-Beats
---

### 서론
**Segment Tree Beats에 대한 간단한 설명**

2019년 9월 23일부터 며칠간 BOJ에 수열과 쿼리[25,30]이 올라왔습니다.<br>
모두 [이 글](https://codeforces.com/blog/entry/57319)에서 소개된 Segment Tree Beats로 푸는 문제이기 때문에 갑자기 Segment Tree Beats에 대한 관심이 뜨거워지고 있습니다. 그런 김에 저도 공부를 해서 블로그에 글을 써보고자 합니다.

### Segment Tree Beats란?
<s>Segment Tree Beats(이하 세그비츠)의 Beats는 일본 애니메이션 "Angel Beats"에서 따왔다고 합니다.</s>

이 자료구조를 배우기 앞서, 어떤 작업을 얼마나 효율적으로 할 수 있는지 알아봅시다.<br>
세 가지의 쿼리가 주어집니다.

* 1 L R X: 모든 L ≤ i ≤ R에 대해 A<sub>i</sub> = min(A<sub>i</sub>, X)를 적용합니다.
* 2 L R: max(A<sub>L</sub>, A<sub>L+1</sub>, ... , A<sub>R-1</sub>, A<sub>R</sub>)를 출력합니다.
* 3 L R: A<sub>L</sub> + A<sub>L+1</sub> + ... + A<sub>R-1</sub> + A<sub>R</sub>를 출력합니다.

[17474 수열과 쿼리 26](https://www.acmicpc.net/problem/17474)과 동일합니다.<Br>
세그비츠는 이 문제를 O( (N+Q) log N )만에 해결합니다. 증명은 추후에 추가할 예정이고, 그 전까지는 [이 댓글](https://codeforces.com/blog/entry/57319?#comment-409924)로 대체합니다.<br>
어떻게 작동하는지 알아봅시다.

### Lazy Propagation을 보자!
세그먼트 트리에서 레이지 프로퍼게이션을 사용할 때 갱신을 하는 코드는 보통 아래와 같이 작성합니다. ([s, e]는 노드가 관리하는 구간, [l, r]은 갱신을 할 구간)
```cpp
void update(int node, int s, int e, int l, int r, int v){
  push(node, s, e);
  if(r < s || e < l) return;
  if(l <= s && e <= r){
    tag(node);
    push(node, s, e);
    return;
  }
  int m = s + e >> 1;
  update(node*2, s, m, l, r, v);
  update(node*2+1, m+1, e, l, r, v);
  tree[node] = f(tree[node*2], tree[node*2+1]);
}
```
return을 하는 부분과 tag를 해주는 부분을 봅시다.

1. `r < s || e < l` 일 때 return을 해주는 이유는 더 이상 겹치는 구간이 없어서, 즉 현재 노드를 루트로 하는 서브트리에 대해서는 **갱신할 것이 없기 때문에** return을 해줍니다.
2. `l <= s && e <= r` 일 때 tag를 해주는 이유는 현재 노드를 루트로 하는 서브트리에 있는 **정보들이 전부 갱신되기 때문에** tag를 해줍니다.

return을 해주는 조건을 break_condition, tag를 해주는 조건을 tag_condition이라고 하면, update함수를 아래처럼 수정할 수 있습니다.
```cpp
void update(int node, int s, int e, int l, int r, int v){
  push(node, s, e);
  if(break_condition()) return;
  if(tag_condition()){
    tag(node);
    push(node, s, e);
    return;
  }
  int m = s + e >> 1;
  update(node*2, s, m, l, r, v);
  update(node*2+1, m+1, e, l, r, v);
  tree[node] = f(tree[node*2], tree[node*2+1]);
}
```
break_condition에는 더 이상 갱신할 것이 없는 경우를 의미하고, tag_condition은 전부 갱신해야 할 경우를 의미합니다.

### 갱신을 해보자!
모든 L ≤ i ≤ R에 대해 A<sub>i</sub> = min(A<sub>i</sub>, X)를 적용하는 쿼리를 break_condition과 tag_condition을 이용해 최대한 많이 가지치기를 해봅시다.

현재 정점을 루트로 하는 서브트리에서 가장 큰 값을 mx[node]라고 하고, mx[node]보다 작은 값 중 가장 큰 값(strict second maximum)을 mx2[node]라고 합시다.<Br>
만약 `mx[node] ≤ X` 라면 X와 min연산을 해도 갱신되는 것이 없겠죠. 이것을 break_condition으로 잡으면 될 것 같네요.<br>
`mx2[node] < X && X < mx[node]` 라면 현재 정점을 루트로 하는 서브트리의 모든 mx[~]값이 x로 갱신되겠죠. 이것을 tag_condition으로 잡읍시다.

정리하자면, break_condition은 `r < s || e < l || mx[node] <= x` 이고, tag_condition은 `l <= s && e <= r && mx2[node] < x` 입니다.<Br>
두 조건 모두 해당하지 않는다면, 평소에 하던대로 그냥 재귀를 들어가주면 됩니다.
```cpp
void update(int node, int s, int e, int l, int r, ll v){
	push(node, s, e);
	if(r < s || e < l || tree[node].mx <= v) return;
	if(l <= s && e <= r && tree[node].mx2 < v){
		tree[node].mx = v;
		push(node, s, e);
		return;
	}
	int m = s + e >> 1;
	update(node*2, s, m, l, r, v);
	update(node*2+1, m+1, e, l, r, v);
	tree[node] = f(tree[node*2], tree[node*2+1]);
}
```
push()의 구현은 조금 이따 살펴보기로 하고, 비교적 쉬운 2, 3번 쿼리를 수행하는 방법을 알아봅시다.

### 구간 최댓값, 구간합을 구해보자!
구간 최댓값은 mx[node]를 반환해주는 방식으로 쉽게 할 수 있습니다. 평범한 Lazy Propagation과 똑같이 작성하면 됩니다.
```cpp
ll getmax(int node, int s, int e, int l, int r){
	push(node, s, e);
	if(r < s || e < l) return 0;
	if(l <= s && e <= r) return tree[node].mx;
	int m = s + e >> 1;
	return max(getmax(node*2, s, m, l, r), getmax(node*2+1, m+1, e, l, r));
}
```

구간합을 구하기 위해서는 mx, mx2 외에도 mxcnt와 sum이라는 정보를 추가로 알아야 합니다.<br>
mxcnt는 노드가 관리하는 구간에 mx가 포함된 개수를 의미하고, sum은 노드가 관리하는 구간의 합을 의미합니다.

mx2 < x < mx 인 경우에만 값을 갱신해서 mx를 x로 바꾸어주기 때문에, sum값은 `(mx - x) * mxcnt` 만큼 감소한다는 것을 알 수 있습니다.<br>
update함수에서 tag_condition일 때 한 가지 작업을 추가로 해주면 됩니다.
```cpp
if(l <= s && e <= r && tree[node].mx2 < v){
  tree[node].sum -= tree[node].cntmx * (tree[node].mx - v);
  tree[node].mx = v;
  push(node, s, e);
  return;
}
```
sum값을 잘 구했다면 구간합을 구하는 것은 평범한 Lazy Propagation과 똑같이 작성해주면 됩니다.
```cpp
ll getsum(int node, int s, int e, int l, int r){
	push(node, s, e);
	if(r < s || e < l) return 0;
	if(l <= s && e <= r) return tree[node].sum;
	int m = s + e >> 1;
	return getsum(node*2, s, m, l, r) + getsum(node*2+1, m+1, e, l, r);
}
```

### Lazy Propagation의 핵심인 push()를 구현해보자!
부모의 mx가 자식의 mx보다 작은 경우에 갱신해주면 됩니다.<br>
mx와 sum을 신경써서 업데이트를 해주면 됩니다.
```cpp
void push(int node, int s, int e){
	if(s == e) return;
	for(auto i : {node*2, node*2+1}){
		if(tree[node].mx < tree[i].mx){
			tree[i].sum -= tree[i].cntmx * (tree[i].mx - tree[node].mx);
			tree[i].mx = tree[node].mx;
		}
	}
}
```

### 세그먼트 트리라면 정점을 합쳐야지!
update함수 가장 아래 줄을 보면 `tree[node] = f(tree[node*2], tree[node*2+1])` 이라는 코드가 있습니다.<br>
이미 아시겠지만, f()는 정점의 정보를 합쳐주는 함수입니다.

편의를 위해 왼쪽 노드를 a, 오른쪽 노드를 b라고 합시다.<br>
두 노드를 합칠 때 mx값이 같은 경우와 다른 경우, 두 가지의 경우가 나올 수 있습니다.<Br>
두 노드의 mx의 값이 같은 경우에는 `mx = a.mx; mx2 = max(a.mx2, b.mx2); sum = a.sum + b.sum;` 이 되고, 두 노드의 mx값이 같기 때문에 `mxcnt = a.mxcnt + b.mxcnt` 가 됩니다.<br>
두 노드의 mx값이 다른 경우에는 a.mx < b.mx인 경우에 `mx = b.mx; mx2 = max(a.mx, b.mx2); sum = a.sum + b.sum` 이 되고, mx값이 b.mx로 바뀌기 때문에 `mxcnt = b.mxcnt` 가 됩니다.
```cpp
Node f(Node a, Node b){
	if(a.mx == b.mx) return {a.mx, max(a.mx2, b.mx2), a.cntmx + b.cntmx, a.sum + b.sum};
	if(a.mx > b.mx) swap(a, b);
	return {b.mx, max(a.mx, b.mx2), b.cntmx, a.sum + b.sum};
}
```

### 세그먼트 트리 초기화
전체 코드를 작성하기에 앞서, 마지막으로 세그먼트 트리를 초기화하는 방법을 알아봅시다.<br>
각 노드는 mx, mx2, mxcnt, sum이라는 정보를 담고 있습니다.<br>
리프 노드(s == e)의 정보를 `mx = arr[s]; mx2 = -inf; mxcnt = 1; sum = arr[s]` 로 초기화해주면 됩니다.
```cpp
Node init(int node, int s, int e){
	if(s == e) return tree[node] = {arr[s], -1, 1, arr[s]};
	int m = s + e >> 1;
	return tree[node] = f(init(node*2, s, m), init(node*2+1, m+1, e));
}
```

### 전체 코드
위에 나온 코드들을 잘 조합하면 수열과 쿼리 26을 맞을 수 있습니다!
```cpp
#include <bits/stdc++.h>
using namespace std;

typedef long long ll;

struct Node{
	ll mx, mx2, cntmx, sum;
};

ll arr[1010101];
Node tree[4040404];

Node f(Node a, Node b){
	if(a.mx == b.mx) return {a.mx, max(a.mx2, b.mx2), a.cntmx + b.cntmx, a.sum + b.sum};
	if(a.mx > b.mx) swap(a, b);
	return {b.mx, max(a.mx, b.mx2), b.cntmx, a.sum + b.sum};
}

Node init(int node, int s, int e){
	if(s == e) return tree[node] = {arr[s], -1, 1, arr[s]};
	int m = s + e >> 1;
	return tree[node] = f(init(node*2, s, m), init(node*2+1, m+1, e));
}

void push(int node, int s, int e){
	if(s == e) return;
	for(auto i : {node*2, node*2+1}){
		if(tree[node].mx < tree[i].mx){
			tree[i].sum -= tree[i].cntmx * (tree[i].mx - tree[node].mx);
			tree[i].mx = tree[node].mx;
		}
	}
}

void update(int node, int s, int e, int l, int r, ll v){
	push(node, s, e);
	if(r < s || e < l || tree[node].mx <= v) return;
	if(l <= s && e <= r && tree[node].mx2 < v){
		tree[node].sum -= tree[node].cntmx * (tree[node].mx - v);
		tree[node].mx = v;
		push(node, s, e);
		return;
	}
	int m = s + e >> 1;
	update(node*2, s, m, l, r, v);
	update(node*2+1, m+1, e, l, r, v);
	tree[node] = f(tree[node*2], tree[node*2+1]);
}

ll getmax(int node, int s, int e, int l, int r){
	push(node, s, e);
	if(r < s || e < l) return 0;
	if(l <= s && e <= r) return tree[node].mx;
	int m = s + e >> 1;
	return max(getmax(node*2, s, m, l, r), getmax(node*2+1, m+1, e, l, r));
}

ll getsum(int node, int s, int e, int l, int r){
	push(node, s, e);
	if(r < s || e < l) return 0;
	if(l <= s && e <= r) return tree[node].sum;
	int m = s + e >> 1;
	return getsum(node*2, s, m, l, r) + getsum(node*2+1, m+1, e, l, r);
}

int main(){
	ios_base::sync_with_stdio(0); cin.tie(0);
	int n; cin >> n;
	for(int i=1; i<=n; i++) cin >> arr[i];
	init(1 ,1, n);
	int q; cin >> q;
	while(q--){
		int op; cin >> op;
		if(op == 1){
			ll a, b, c; cin >> a >> b >> c;
			update(1, 1, n, a, b, c);
		}else if(op == 2){
			ll a, b; cin >> a >> b;
			cout << getmax(1, 1, n, a, b) << "\n";
		}else{
			ll a, b; cin >> a >> b;
			cout << getsum(1, 1, n, a, b) << "\n";
		}
	}
}
```
