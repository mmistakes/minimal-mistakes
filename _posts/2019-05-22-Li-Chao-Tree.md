---
title: "Li Chao Tree"
date: 2019-05-22 12:37:00
categories:
- Hard-Algorithm
tags:
- Segment-Tree
- CHT
---

### Li Chao Tree란?
Li Chao Tree는 직선 삭제 쿼리가 없는 Convex Hull Trick문제를 Online으로 해결하기 위한 자료구조입니다.<br>
Li Chao Tree를 아주 간단하게 정리하자면, 세그먼트 트리에 직선의 방정식을 넣는 것이라고 할 수 있습니다.
<img src = "https://i.imgur.com/CjUtlIo.png">

BOJ12795 반평면 땅따먹기 문제를 통해 Li-Chao Tree의 구현 방법을 익혀봅시다.

### Dynamic Segment Tree
관리하고자 하는 구간이 [1, 1e6]처럼 크지 않다면 그냥 세그먼트 트리를 써도 됩니다. 만약 관리해야 하는 구간이 [1, 1e18]처럼 크다면 좌표압축을 하는 경우가 많습니다. 하지만, 동적 세그먼트 트리를 활용하면 좌표압축 없이도 메모리를 효율적으로 사용할 수 있습니다.

기본적인 개념은 **필요한 노드만 생성한다.** 입니다. 예제를 봅시다.

<img src = "https://i.imgur.com/1pkhAbj.png"><br>
세그먼트 트리로 [1, 8] 구간을 관리한다고 할때, 초기에는 루트 노드만 있습니다. 이제 구간에 쿼리를 하나씩 날리면서 노드가 추가되는 것을 관찰해봅시다.

[3, 4] 구간에 쿼리를 날려봅시다. 아래 그림과 같이 필요한 노드들을 생성해서 아래에 붙여주면 됩니다.<br>
<img src = "https://i.imgur.com/lmG3Gtk.png">

그 다음에는 [4, 8] 구간에 쿼리를 날립시다. 아래 그림처럼 생성이 되겠네요.<br>
<img src = "https://i.imgur.com/IbmbH8j.png">

이런식으로 노드들을 생성해주면 매 쿼리마다 시간복잡도는 O(lgN)인 것은 당연하고, 생성되는 노드의 개수도 최대 O(lgN)이라는 것을 알 수 있습니다.<br>
꽤 많은 Li Chao Tree 문제에서 넓은 구간을 다루는 것을 요구하기 때문에 동적 세그먼트 트리를 이용해 구현하도록 하겠습니다.

### Li Chao Tree 구현을 시작하자.
세그먼트 트리의 각 노드는 어떤 구간 [s, e]를 관리합니다. 이때 일반적으로 구간의 범위가 매우 크기때문에 앞에서 다뤘던 Dynamic Segment Tree를 사용할 것입니다.<br>
세그먼트 트리의 일종인 Li Chao Tree는 각 노드가 관리하는 구간 중, 절반 이상에서 최댓값(or 최솟값)을 갖는 직선 하나를 저장합니다.

먼저, 직선 y = ax + b를 저장하는 구조체를 하나 만들어줍시다.<br>
get함수는 해당 직선이 임의의 x좌표에서 갖는 값을 반환합니다.
```cpp
struct Line{
	ll a, b;
	ll get(ll x){
		return a * x + b;
	}
};
```
그 다음에는 세그먼트 트리의 노드로 쓸 구조체를 만들어줍시다.
```cpp
struct Node{
	int l, r; //child
	ll s, e; //range
	Line line;
};
```
l, r은 각각 자식 노드의 위치를 나타내고, s, e는 해당 노드가 담당하는 구간을 나타냅니다. line은 [s, e]구간의 절반 이상에서 최댓값을 갖는 직선을 저장합니다.

다음으로, 동적으로 생성되는 노드들을 저장할 배열을 만들어줍시다. Node구조체의 l, r변수는 자식 노드가 배열에서 몇 번 인덱스에 위치하는지 나타내고, 아직 자식이 만들어지지 않았다면 -1을 저장해줍니다.
```cpp
vector<Node> tree;
```

최댓값을 관리하는 Li Chao Tree는 처음에 모든 구간에 $$y = 0x - inf$$ 직선 하나만 존재하는 상태입니다. init함수까지 만들어줍시다.<br>
매개변수 s, e로는 문제에서 요구하는 구간의 범위를 넣어주면 됩니다.
```cpp
void init(ll s, ll e){
  tree.push_back({ -1, -1, s, e, { 0, -inf } });
}
```

### update 구현
update(int node, Line v)는 node라는 노드가 담당하는 구간[s, e]에 v라는 직선을 추가하는 함수입니다. 직선을 추가하게 되면 기존에 있던 직선과 비교한 뒤, 노드가 관리하는 구간의 절반 이상에서 더 좋은 직선 하나만 저장할 것입니다.

원래 있던 직선과 새로 추가할 직선을 왼쪽 끝에서의 함숫값을 기준으로 low와 high를 정해줍시다.

<img src = "https://i.imgur.com/lyFxOyp.png"><br>
위 그림처럼 왼쪽을 기준으로 봤을 때 더 위에 있고, 오른쪽을 기준으로 봤을 때도 더 위에 있다면, high라는 직선은 [s, e]구간에서 항상 low보다 큽니다.<br>
그러므로 해당 노드에는 high라는 직선을 저장해주면 됩니다.<br>
여기까지는 매우 간단합니다. 이제, [s, e] 구간 사이에서 선분이 교차하는 경우를 봅시다.

<img src = "https://i.imgur.com/fjqduJW.png"><br>
m을 (s + e) / 2, 즉 구간의 중앙으로 잡아봅시다.<br>
위 그림에서는 [s, m] 구간에서는 항상 high가 더 큽니다. 그러나 반대쪽은 어느 하나가 무조건 더 크다고 할 수 없습니다.<Br>
그러므로 현재 노드에는 high를 저장해주고, 오른쪽 자식에게는 low를 추가하도록 update함수를 재귀 호출해주면 됩니다.

반대의 경우도 비슷하게 처리해주면 됩니다.

### query 구현
query(int node, long long x)는 현재 노드가 갖고 있는 직선이 x에서 갖는 함수 값을 구한 뒤, x와 구간의 중점의 위치 관계에 따라 왼쪽 혹은 오른쪽 자식에 대해 재귀호출을 해서 더 큰 값을 반환하면 됩니다.

### 코드 작성
위에서 작성한 Line과 Node 구조체를 들고옵시다.
```cpp
typedef long long ll;
const ll inf = 2e18;

struct Line{
	ll a, b;
	ll get(ll x){
		return a * x + b;
	}
};

struct Node{
	int l, r; //child
	ll s, e; //range
	Line line;
};
```
Li_Chao라는 구조체를 만들어봅시다. 이미 init함수는 위에서 작성했기 때문에 그대로 들고오면 됩니다.
```cpp
struct Li_Chao{
	vector<Node> tree;

	void init(ll s, ll e){
		tree.push_back({ -1, -1, s, e, { 0, -inf } });
	}
};
```
이제 아래 절차에 맞게 update함수를 구현합시다.
1. 구간의 왼쪽 끝을 기준으로 low와 high 직선 정하기
2. 오른쪽 끝에서 봤을 때도 high가 더 위에 있다면, 구간 내에서 항상 high가 더 크다는 것을 의미하므로 현재 노드에 high를 저장하고 종료
3. 그렇지 않은 경우, 두 직선의 교점과 구간의 중앙 간의 위치 관계에 따라 처리

자식 노드가 없을 때 생성해주는 것을 제외하고는 크게 신경써야 할 부분은 없습니다.
```cpp
void update(int node, Line v){
	ll s = tree[node].s, e = tree[node].e;
	ll m = s + e >> 1;

	Line low = tree[node].line, high = v;
	if (low.get(s) > high.get(s)) swap(low, high);

	if (low.get(e) <= high.get(e)){
		tree[node].line = high; return;
	}

	if (low.get(m) < high.get(m)){
		tree[node].line = high;
		if (tree[node].r == -1){
			tree[node].r = tree.size();
			tree.push_back({ -1, -1, m + 1, e, { 0, -inf } });
		}
		update(tree[node].r, low);
	}
	else{
		tree[node].line = low;
		if (tree[node].l == -1){
			tree[node].l = tree.size();
			tree.push_back({ -1, -1, s, m, { 0, -inf } });
		}
		update(tree[node].l, high);
	}
}
```
마지막으로 query 함수를 구현합시다.<br>
update함수와 동일하게 자식 노드가 없을 때 생성해주는 것을 제외하고는 크게 신경써야 할 부분은 없습니다.
```cpp
ll query(int node, ll x){
  if (node == -1) return -inf;
  ll s = tree[node].s, e = tree[node].e;
  ll m = s + e >> 1;
  if (x <= m) return max(tree[node].line.get(x), query(tree[node].l, x));
  else return max(tree[node].line.get(x), query(tree[node].r, x));
}
```

### 반평면 땅따먹기 전체 코드
```cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

typedef long long ll;
const ll inf = 2e18;

struct Line{
	ll a, b;
	ll get(ll x){
		return a * x + b;
	}
};

struct Node{
	int l, r; //child
	ll s, e; //range
	Line line;
};

struct Li_Chao{
	vector<Node> tree;

	void init(ll s, ll e){
		tree.push_back({ -1, -1, s, e, { 0, -inf } });
	}

	void update(int node, Line v){
		ll s = tree[node].s, e = tree[node].e;
		ll m = s + e >> 1;

		Line low = tree[node].line, high = v;
		if (low.get(s) > high.get(s)) swap(low, high);

		if (low.get(e) <= high.get(e)){
			tree[node].line = high; return;
		}

		if (low.get(m) < high.get(m)){
			tree[node].line = high;
			if (tree[node].r == -1){
				tree[node].r = tree.size();
				tree.push_back({ -1, -1, m + 1, e, { 0, -inf } });
			}
			update(tree[node].r, low);
		}
		else{
			tree[node].line = low;
			if (tree[node].l == -1){
				tree[node].l = tree.size();
				tree.push_back({ -1, -1, s, m, { 0, -inf } });
			}
			update(tree[node].l, high);
		}
	}

	ll query(int node, ll x){
		if (node == -1) return -inf;
		ll s = tree[node].s, e = tree[node].e;
		ll m = s + e >> 1;
		if (x <= m) return max(tree[node].line.get(x), query(tree[node].l, x));
		else return max(tree[node].line.get(x), query(tree[node].r, x));
	}
} seg;

int main(){
	ios_base::sync_with_stdio(0); cin.tie(0);
	int q; cin >> q;
	seg.init(-2e12, 2e12);
	while (q--){
		ll op, a, b; cin >> op;
		if (op == 1){
			cin >> a >> b;
			seg.update(0, { a, b });
		}
		else{
			cin >> a;
			cout << seg.query(0, a) << "\n";
		}
	}
}
```
