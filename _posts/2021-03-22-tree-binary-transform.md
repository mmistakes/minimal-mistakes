---
title: "트리 이진 변환"
date: 2021-03-22 06:00:00
categories:
- Hard-Algorithm
tags:
---

### 서론
이진 트리는 일반적인 트리에 비해 효율/구현에서 많은 이점을 갖고 있습니다. 자식의 개수가 2개 이하로 일정하고, 트리의 순회 순서를 강제하기 쉬우며, **모든 정점의 차수가 3 이하**라는 성질을 갖고 있는 이진 트리는 일반적인 트리에서는 적용하기 어려운 다양한 알고리즘을 적용할 수 있게 해줍니다.<br>
놀랍게도 모든 트리는 이진 트리로 변환할 수 있습니다. 이 글에서는 주어진 트리의 조상-자손 관계, 그리고 정점 간의 거리를 유지하면서 선형 시간에 이진 트리로 변환하는 방법을 다룹니다.

### Left Child Right Sibling 표현
![](https://i.imgur.com/EzW6d7J.png)

일반적으로 트리를 표현할 때는 왼쪽 그림처럼 계층 구조로 표현합니다. 포인터를 이용해 트리를 표현할 경우, 자식 정점이 많아질수록 정점에 저장해야 하는 포인터의 개수가 증가합니다. 이런 단점을 완벽하게 해결해주는 방법이 오른쪽 그림에 있는 Left Child Right Sibling 방식입니다.<br>
Left Child Right Sibling 방식이란, 한 포인터는 **가장 왼쪽 자식**을, 다른 한 포인터는 **오른쪽 형제**를 가리키는 방식입니다. 이 방식을 이용하면 아무리 차수가 높더라도 각 정점 당 2개의 포인터만 필요로 하게 됩니다.

### 이진 트리로의 변환
위 그림에서 형제마다 **첫 번째 Right Sibling 간선**만 빨간색이라는 것을 눈치채셨을 것입니다. 빨간색 간선은 기존의 계층 표현처럼 부모 정점과 연결해줘도 이진 트리가 유지됩니다. 그리고 나머지 초록색 간선은 형제 정점의 자식으로 넣어도 조상-자손 관계는 바뀌지 않습니다. (형제 관계가 꼬이지만, 이 문제를 해결하는 방법은 뒤에서 다룹니다.)

그러므로 아래 그림처럼 트리를 다시 만들어줄 수 있습니다.<br>
형제 정점의 자식으로 넣어주는 과정을 **Right Sibling 간선이 없어질 때까지** 반복하면 됩니다.

![](https://i.imgur.com/yhOzwrU.png)

### 형제 관계의 유지와 거리 유지
위 방식을 이용하면 Rooted Tree에서는 형제 관계가 꼬이게 되고, Rooted Tree가 아니더라도 정점 사이의 거리가 바뀔 수 있다는 문제가 존재합니다. 또한 Left Child 간선과 Right Sibling 간선이 모두 있는 경우 구현할 때 실수할 가능성이 높아지기도 합니다. 그렇기 때문에 실제로 구현할 때는 Right Sibling 간선을 밑으로 내릴 때마다 더미(dummy) 정점을 추가합니다. 이때 추가되는 정점은 최대 $N-1$개입니다.

![](https://i.imgur.com/c9Rwoyk.png)

연두색 정점이 더미 정점이며, 더미 정점으로 내려가는 간선(연두색 간선)의 가중치는 0입니다. 이렇게 하면 형제 관계도 이전 방식에 비해 명확하게 표현할 수 있고, 가중치가 0인 간선을 이용해 거리 관계도 유지할 수 있습니다.

실제 구현은 다음과 같습니다.
```cpp
int N, pv;
vector<PII> Inp[MAX_V], G[MAX_V * 2];

void make_binary(int v = 1, int real = 1, int p = -1, int idx = 0){
    for(int x=idx; x<Inp[v].size(); x++){
        auto i = Inp[v][x]; if(i.x == p) continue;
        if(G[real].empty() || x+1 == Inp[v].size() || x+2 == Inp[v].size() && Inp[v][x+1].x == p){
            G[real].push_back(i);
            make_binary(i.x, i.x, v);
            G[i.x].emplace_back(real, i.y);
            continue;
        }
        int nxt = ++pv + N;
        G[real].emplace_back(nxt, 0);
        make_binary(v, pv + N, p, x);
        G[nxt].emplace_back(real, 0);
        break;
    }
}
```

### 이진 트리의 활용 (BOJ16121 사무실 이전)
서론에서 유일하게 볼드체로 강조한 **모든 정점의 차수가 3 이하**라는 점은 Centroid Decomposition을 할 때 특히 유용합니다. 일반적인 트리에서는 어떤 Centroid에 달려있는 서브 트리에 대해, 모든 서브 트리 쌍을 보는 것은 $O(N^2)$이기 때문에 비효율적입니다. 하지만 이진 트리로 변환해준다면 각 Centroid에 달려있는 서브 트리가 **최대 3개**이므로 상수 번의 연산($\leq 9$)으로 모든 서브 트리 쌍을 확인할 수 있습니다.

[BOJ16121 사무실 이전](https://www.acmicpc.net/problem/16121) 문제는 이 테크닉을 적용하기 좋은 문제입니다.<br>
트리에서 두 정점 집합 $A, B$가 있을 때, 모든 $a \in A$에서 모든 $b \in B$로 가는 거리의 제곱의 합을 구하는 문제입니다.

모든 경로에 대해 계산해야 하므로 센트로이드 디컴포지션을 생각할 수 있고, 각 서브 트리마다 아래 6가지 정보를 알면 정답을 구할 수 있습니다.

1. $A$ 집합 정점 깊이의 합 (= `as`)
2. $A$ 집합 정점 깊이 제곱의 합 (= `as2`)
3. $A$ 집합 정점의 개수 (= `ac`)
4. $B$ 집합 정점 깊이의 합 (= `bs`)
5. $B$ 집합 정점 깊이 제곱의 합 (= `bs2`)
6. $B$ 집합 정점의 개수 (= `bc`)

각 서브 트리마다 위 6가지 정보를 구했다면, 모든 서브 트리 쌍에 대해 $(ac \cdot bs2) + (bc \cdot as2) + 2(as \cdot bs)$를 계산해서 모두 더해주는 것으로 답을 구할 수 있습니다.<br>
정점이 $2N$개인 정점에서 센트로이드 디컴포지션을 하고, 분할 정복의 각 단계마다 $O(\sum \vert T \vert)$ 시간이 걸리므로 $O(N \log N)$에 문제를 해결할 수 있습니다. 다만 상수가 상당히 커서 구현을 잘 해야 합니다.

```cpp
/******************************
Author: jhnah917(Justice_Hui)
g++ -std=c++17 -DLOCAL
******************************/

#include <bits/stdc++.h>
#define x first
#define y second
#define all(v) v.begin(), v.end()
#define compress(v) sort(all(v)), v.erase(unique(all(v)), v.end())
#define IDX(v, x) (lower_bound(all(v), x) - v.begin())
using namespace std;

using uint = unsigned;
using ll = long long;
using ull = unsigned long long;
using PII = pair<int, int>;
constexpr int MOD = 998244353;

void addMod(int &a, int b){ a += b; if(a >= MOD) a -= MOD; }

struct Info{
    int as, as2, ac, bs, bs2, bc; // sum, sq_sum, cnt
    Info() : Info(0, 0, 0, 0, 0, 0) {}
    Info(int as, int as2, int ac, int bs, int bs2, int bc)
        : as(as), as2(as2), ac(ac), bs(bs), bs2(bs2), bc(bc) {}
    void add(int a, int b, int af, int bf){
        addMod(as, a); addMod(as2, 1LL*a*a%MOD); addMod(ac, af);
        addMod(bs, b); addMod(bs2, 1LL*b*b%MOD); addMod(bc, bf);
    }
    Info& operator += (const Info t){
        addMod(as, t.as); addMod(as2, t.as2); addMod(ac, t.ac);
        addMod(bs, t.bs); addMod(bs2, t.bs2); addMod(bc, t.bc);
        return *this;
    }
};

int N, M, K, A[606060], B[606060], ans, pv;
vector<PII> Inp[606060], G[606060];

void make_binary(int v = 1, int real = 1, int b = -1, int idx = 0){
    for(int _i=idx; _i<Inp[v].size(); _i++){ auto i = Inp[v][_i];
        if(i.x == b) continue;
        if(G[real].empty()){
            G[real].emplace_back(i.x, i.y);
            make_binary(i.x, i.x, v);
            G[i.x].emplace_back(real, i.y);
            continue;
        }
        if(_i+1 == Inp[v].size() || _i+2 == Inp[v].size() && Inp[v][_i+1].x == b){
            G[real].emplace_back(i.x, i.y);
            make_binary(i.x, i.x, v);
            G[i.x].emplace_back(real, i.y);
            continue;
        }
        int nxt = ++pv;
        G[real].emplace_back(nxt, 0);
        make_binary(v, pv, b, _i);
        G[nxt].emplace_back(real, 0);
        break;
    }
}

int sz[606060], use[606060];
int get_sz(int v, int p = -1){
    sz[v] = 1;
    for(auto i : G[v]) if(i.x != p && !use[i.x]) sz[v] += get_sz(i.x, v);
    return sz[v];
}
int get_cent(int v, int s, int p = -1){
    for(auto i : G[v]) if(i.x != p && !use[i.x] && sz[i.x]*2 > s) return get_cent(i.x, s, v);
    return v;
}

Info dfs(int v, int p = -1, int d = 1){
    Info ret;
    int a = A[v] ? d : 0, b = B[v] ? d : 0;
    ret.add(a, b, A[v], B[v]);
    for(auto i : G[v]) if(i.x != p && !use[i.x]) ret += dfs(i.x, v, d + i.y);
    return ret;
}

void solve(int v = 1, int p = -1){
    int cent = get_cent(v, get_sz(v)); use[cent] = 1;
    vector<Info> ret(1);
    ret[0].ac = A[cent]; ret[0].bc = B[cent];
    for(auto i : G[cent]) if(i.x != p && !use[i.x]) ret.push_back(dfs(i.x, -1, i.y));

    for(int i=0; i<ret.size(); i++) for(int j=0; j<ret.size(); j++) {
        if(i == j) continue;
        addMod(ans, 1LL * ret[i].ac * ret[j].bs2 % MOD);
        addMod(ans, 1LL * ret[i].bc * ret[j].as2 % MOD);
        addMod(ans, 2LL * ret[i].as * ret[j].bs % MOD);
    }
    for(auto i : G[cent]) if(i.x != p && !use[i.x]) solve(i.x, cent);
}

int main(){
    ios_base::sync_with_stdio(false); cin.tie(nullptr);
    cin >> N; pv = N;
    for(int i=1; i<N; i++){
        int s, e; cin >> s >> e;
        Inp[s].emplace_back(e, 1);
        Inp[e].emplace_back(s, 1);
    }
    cin >> M; for(int i=1, t; i<=M; i++) cin >> t, A[t] = 1;
    cin >> K; for(int i=1, t; i<=K; i++) cin >> t, B[t] = 1;
    make_binary();
    N = pv;
    solve();
    cout << ans;
}
```
