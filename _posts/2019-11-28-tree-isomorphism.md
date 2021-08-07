---
title: "Tree Isomorphism(트리 동형)"
date: 2019-11-28 03:39:00
categories:
- Hard-Algorithm
tags:
- Tree


---

### 개요

Tree Isomorphism은 2011년에 [Baltic OI](http://icpc.me/baltic)에 [거울대칭트리 그래프](https://www.acmicpc.net/problem/2430)라는 문제에 나왔고, 최근에 개최된 [2019 SPC](https://www.acmicpc.net/contest/view/489)에 [BOJ18123 평행우주](https://www.acmicpc.net/problem/18123)라는 문제에 다시 나와 선풍적인 인기를 끌고 있습니다.

18123문제에 있는 그림을 보면,
![](https://upload.acmicpc.net/4f21b866-8b7d-4c80-9abc-fd840739386c/-/preview/)<br>
두 트리는 간선의 방향만 잘 조절해주면 완전히 동일한 트리가 됩니다. 즉, 두 트리는 Isomorphic합니다.

이 글에서는 두 트리가 Isomorphic한지 판단하는 방법을 알아보겠습니다.

### Rooted Tree

unrooted tree나 rooted tree나 하는 방법은 비슷하지만, rooted tree에서 위상이 같은지 판단하는 것이 더 편하기 때문에 rooted tree에서 먼저 판단해봅시다.

두 트리 $$T_1$$과 $$T_2$$가 모두 1개의 정점으로 이루어진 트리라면 당연히 위상이 같습니다.<br>
두 트리의 루트 노드가 자식을 갖고 있는 경우에는, 각 자식을 루트로 하는 서브트리들이 서로 위상이 같은 경우에만 두 트리가 위상이 같습니다.<br>
$$T_1$$의 각 서브트리들을 $$T_2$$의 어느 서브트리에 매칭시키는지에 따라 위상이 같은지의 여부가 달라지므로, 매칭시키는 방법을 알아봅시다.

Hashing 비슷한 느낌으로, 어떤 트리를 고유한 데이터(숫자, 문자열, 괄호열, 튜플 등등)로 표현할 수 있다면, $$T_1$$과 $$T_2$$의 각 서브트리들을 이쁘게 정렬해서 차례대로 매칭해주면 됩니다.<br>
다시 Hashing 비슷한 느낌으로, 서브 트리들을 표현하는 고유한 데이터들을 잘 조합해주면 전체 트리를 표현하는 데이터를 뽑아낼 수도 있습니다. 트리는 재귀적이기 때문에 이쁘게 구현해줄 수 있습니다.

구현 방법은 뒤에서 살펴보도록 합시다.

### Unrooted Tree

root를 정하지 않으면 재귀적인 성질을 이용해 무언가를 구하는 것을 할 수 없습니다. root를 정해야만 합니다.

트리의 centroid를 생각해봅시다.<br>
centroid는 트리에 반드시 1개 혹은 2개 존재합니다.<br>
또한, 2개 존재하는 경우에는 두 centroid가 인접합니다. 그러므로 centroid가 2개 존재하는 경우에는 두 centroid 사이에 새로운 정점을 만들어주면, 그 정점이 centroid가 됩니다.<br>
만약 $$T_1$$와 $$T_2$$가 위상이 같다면 트리의 centroid를 root로 잡아서 만든 rooted tree도 위상이 같습니다.

centroid는 O(N)에 찾을 수 있기 때문에, unrooted tree의 Isomorphism 여부는 **O(N) + (rooted tree의 Isomorphic의 여부를 확인하는 시간)** 안에 판별할 수 있습니다.

### Rooted Tree의 Isomorphism 구현과 시간복잡도

$$R(T)$$ : rooted tree $$T$$의 isomorphism tuple이라고 정의를 합시다.

$$T$$가 한 개의 정점으로만 이루어져있다면 $$R(T) = (0)$$입니다.<br>
$$T$$가 두 개 이상의 정점으로 이루어진 경우에는, 서브트리 $$S_1, S_2, ... , S_k$$에 대해 $$R(T) = ( R(S_1), R(S_2), ... , R(S_k) )$$입니다.<br>
이때 $$R(S_1) ≤ R(S_2) ≤ ... ≤ R(S_k)$$를 만족하도록 정렬해야 합니다.

$$R(T)$$의 길이는 트리의 정점 개수 N에 비례합니다.<br>
어떤 정점의 자식 수가 k이고, 각 자식을 루트로 하는 서브트리에 포함된 정점의 개수가 $$s_i$$라면 (radix sort 등을 이용해)정렬하는 데 $$O(kmax(s_i))$$가 걸립니다.<br>
k는 정점의 degree에, $$max(s_i)$$는 서브트리의 정점 수에 비례합니다.<br>전체 트리에서 k의 합은 N을 넘지 않기 때문에 각 정점에 대해 계산하는 시간은 amortized $$O(N)$$이고, 전체 트리에 대해 계산하는 시간은 $$O(N^2)$$입니다.

### 속도 개선

사실 우리는 튜플 전체를 들고 있을 필요가 없고, 두 트리의 튜플이 같은지의 여부만 알고 있으면 됩니다.<br>튜플을 다 만들고나서 비교하는 것보다, 리프노드부터 올라가면서 비교해주면 튜플의 크기가 커지지 않을 것 같습니다. 방법을 조금 더 구체화해봅시다.

$$depth = max$$인 상황에서 시작해 $$depth = 0$$까지 올라오면서 비교할 것입니다.<br>각 depth별로 튜플들을 관리하면서, 튜플이 달라지는 시점이 있다면 isomorphic하지 않다고 판정하면 됩니다. 물론, 이때도 튜플들은 오름차순으로 정렬을 해줘야 합니다.<br>두 트리의 특정 깊이에서 뽑아낸 튜플들이 모두 같다면 부모에게 전파를 해준 후, 한 레벨 위에 있는 정점들을 처리해주면 됩니다.

여기까지는 약간의 커팅밖에 되지 않습니다. 중요한 최적화 아이디어를 도입해봅시다.<br>만약 두 튜플 리스트가 같다면 $$T_1$$의 $$i$$번째 튜플과 $$T_2$$의 $$i$$번째 튜플이 같기 때문에, 부모에게 튜플을 통째로 넘기기 않고 다른 어떤 값으로 renumbering해서 넘겨줘도 됩니다.<Br>$$i$$번째 튜플과 $$i+1$$번째 튜플이 같은 경우만 잘 처리해주면서 renumbering을 해준다면, 부모에게는 튜플이 아닌 renumber된 값만 넘겨주면 됩니다.<br>이렇게 해주면 각 정점에 대해 계산을 할 때, 튜플의 길이는 해당 정점의 degree에 비례하게 됩니다.

radix sort등을 이용해 정렬을 해주면, 각 depth마다 정점 개수가 $$N$$, 정점의 최대 degree가 $$D$$라고 하면 정렬하는 데 $$O(ND)$$가 걸립니다.  모든 $$N$$의 합과 모든 $$D$$의 합은 각각 트리의 정점 개수에 비례하므로 $$O(N)$$에  구할 수 있습니다.<br>std::sort를 사용해도 $$O(NlogN)$$에 구할 수 있습니다.

### 코드 구현

[SPOJ TreeIso]( https://www.spoj.com/problems/TREEISO/ )문제의 정답 코드입니다.

```cpp
#include <bits/stdc++.h>
using namespace std;

typedef long long ll;
typedef vector<int> vi;
typedef vector<vi> vvi;
typedef pair<vi, int> pvi;

vvi inp[2]; //입력 트리
vvi g[2]; //센트로이드를 루트로 하는 트리에서 깊이별로 정점 분류
int sz[101010]; //sz[i] = 입력받은 트리에서 i를 루트로 하는 서브트리의 크기
int par[2][101010]; //par[id][i] = 센트로이드를 루트로 하는 트리에서 i의 부모
int label[2][101010]; //label[id][i] = i를 renumbering 할 때의 번호d
vi cent[2]; //트리의 센트로이드(1 or 2개)
int n; //트리 정점 개수

//centroid 구하기, 1개 혹은 2개
int getCent(int id, int v, int p){ //tree id, vertex, parent
    int ch = 0;
    for(auto i : inp[id][v]){
        if(p == i) continue;
        int now = getCent(id, i, v);
        if(now > (n/2)) break;
        ch += now;
    }
    if(n - ch - 1 <= n/2) cent[id].push_back(v);
    return sz[v] = ch + 1;
}

//센트로이드를 루트로 하는 트리 생성, 깊이 반환
int dfs(int id, int v, int p, int d){ //tree id, vertex, parent, depth
    par[id][v] = p; g[id][d].push_back(v);
    int mx = d;
    for(auto i : inp[id][v]){
        if(i == p) continue;
        mx = max(mx, dfs(id, i, v, d+1));
    }
    return mx;
}

int chk(int _lv){
    for(int lv=_lv-1; lv>=0; lv--){
        vector<pvi> tup[2];
        for(int id=0; id<2; id++){
            for(auto i : g[id][lv]){
                //깊이가 lv인 i의 자식들로 튜플 생성 - renumbering된 값을 넣어줌
                tup[id].emplace_back(vi(), i);
                for(auto j : inp[id][i]){
                    if(par[id][i] != j) tup[id].back().first.push_back(label[id][j]);
                }
            }
        }
        //튜플 크기 다르면 false
        if(tup[0].size() != tup[1].size()) return 0;

        for(int id=0; id<2; id++){
            for(auto &i : tup[id]) sort(i.first.begin(), i.first.end());
            sort(tup[id].begin(), tup[id].end());
        }

        int pv = 0;
        for(int i=0; i<tup[0].size(); i++){
            if(tup[0][i].first != tup[1][i].first) return 0;

            //이전 값과 같다면 같은 숫자로 renumbering
            if(i != 0 && tup[0][i].first == tup[0][i-1].first){
                label[0][tup[0][i].second] = label[1][tup[1][i].second] = pv;
            }else{
                label[0][tup[0][i].second] = label[1][tup[1][i].second] = ++pv;
            }
        }
    }
    return 1;
}

void init(){
    memset(sz, 0, sizeof(int) * (n+2));
    for(int i=0; i<2; i++){
        inp[i].clear(), cent[i].clear(), g[i].clear();
        memset(label[i], 0, sizeof(int) * (n+2));
        memset(par[i], 0, sizeof(int) * (n+2));
    }
}

void solve(){
    init();
    cin >> n;
    for(int id=0; id<2; id++){
        inp[id].resize(n+2);
        g[id].resize(n+2);
        for(int i=1; i<n; i++){
            int s, e; cin >> s >> e;
            inp[id][s].push_back(e);
            inp[id][e].push_back(s);
        }
        getCent(id, 1, -1);
    }
    //centroid 개수 다르면 no
    if(cent[0].size() != cent[1].size()){
        cout << "NO\n"; return;
    }

    //centroid가 2개인 경우 -> 두 centroid 사이에 정점 생성
    if(cent[0].size() == 2){
        n++;
        for(int i=0; i<2; i++){
            for(int j=0; j<2; j++){
                inp[i][cent[i][j]].erase(remove(inp[i][cent[i][j]].begin(), inp[i][cent[i][j]].end(), cent[i][!j]), inp[i][cent[i][j]].end());
                inp[i][cent[i][j]].push_back(n);
                inp[i][n].push_back(cent[i][j]);
            }
            cent[i][0] = n;
        }
    }

    int t1 = dfs(0, cent[0][0], -1, 0);
    int t2 = dfs(1, cent[1][0], -1, 0);

    //센트로이드를 루트로 잡은 트리에서 깊이 다르면 no
    if(t1 != t2){
        cout << "NO\n"; return;
    }

    if(chk(t1)) cout << "YES\n";
    else cout << "NO\n";
}

int main(){
    ios_base::sync_with_stdio(0); cin.tie(0);
    int t; cin >> t;
    while(t--) solve();
}
```

### 문제) BOJ18123 평행 우주

이 문제는 트리 여러 개가 주어지면, 서로 다른 트리의 개수를 구해야 합니다.<Br>비슷하면서도 약간 다르게 해결할 것입니다.

rooted tree는 euler tour를 이용해 괄호열(혹은 비트열)로 나타낼 수 있습니다.<br>각 트리의 정점의 개수가 최대 30이므로, 60개의 비트만 사용하면 트리를 표현할 수 있습니다.

트리 $$T$$가 정점 1개로 이루어진 트리라면 $$R(T) = `10`$$으로 나타냅시다.<br>2개 이상의 정점으로 이루어진 트리는 각 서브트리를 $$S_1, S_2, ... , S_k$$라고 할때, $$R(T) = `1` + R(S_1) + R(S_2) + ... + R(S_k) + `0`$$으로 나타냅시다. 물론 $$S_1 ≤ S_2 ≤ ... ≤ S_k$$ 상태로 정렬을 해줘야 합니다.

위와 같이 $$R(T)$$를 정의해주면 long long변수 하나로 트리를 표현할 수 있습니다. 그러면 문제를 쉽게 해결할 수 있습니다.

centroid가 2개 존재하는 경우에는, 두 centroid를 각각 루트로 잡고 $$R(T)$$를 구해서 나온 값의 max 혹은 min만 취해줘도 잘 나옵니다.

```cpp
#include <bits/stdc++.h>
#define x first
#define y second
using namespace std;

typedef long long ll;
typedef pair<ll, ll> p;

vector<int> g[33];
int tsz;
int sz[33];
unordered_set<int> cent;

void init(){
	tsz = 0;
	for(int i=0; i<33; i++) g[i].clear();
	cent.clear();
}

int getSize(int v, int b){
	sz[v] = 1;
	for(auto i : g[v]){
		if(b == i) continue;
		sz[v] += getSize(i, v);
	}
	return sz[v];
}

int getCent(int v, int b, int cap){
	for(auto i : g[v]){
		if(i == b) continue;
		if(sz[i] > cap) return getCent(i, v, cap);
	}
	return v;
}

void snd(int v, int b, int cap){
	if(tsz % 2 == 1) return;
	for(auto i : g[v]){
		if(i == b) continue;
		int sum = 1, chk = 1;
		if(sz[i]-1 > cap) continue;
		for(auto j : g[i]){
			if(j == v) continue;
			sum += sz[j];
			if(sz[j] > cap) chk = 0;
		}
		sum = tsz - sum;
		if(chk && sum <= cap) cent.insert(i);
	}
}

p go(int v, int b){
	p ret = {1, 1};
	vector<p> ch;
	for(auto i : g[v]){
		if(b == i) continue;
		ch.push_back(go(i, v));
	}
	sort(ch.begin(), ch.end());
	for(auto i : ch){
		ret.x <<= i.y;
		ret.x |= i.x;
		ret.y += i.y;
	}
	ret.x <<= 1; ret.y++;
	return ret;
}

vector<ll> res;

int main(){
	ios_base::sync_with_stdio(0); cin.tie(0);
	int t; cin >> t;

	while(t--){
		init();
		cin >> tsz;
		for(int i=1; i<tsz; i++){
			int s, e; cin >> s >> e;
			g[s].push_back(e); g[e].push_back(s);
		}
		int cap = getSize(0, -1)/2;
		int cen = getCent(0, -1, cap);
		cent.insert(cen);
		snd(cen, -1, cap);
		p now = {-1, -1};
		for(auto i : cent){
			now = max(now, go(i, -1));
		}
		res.push_back(now.x);
	}
	sort(res.begin(), res.end());
	cout << distance(res.begin(), unique(res.begin(), res.end()));
}
```
