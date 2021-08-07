---
title: "USACO 2020 December Silver Contest"
date: 2021-01-14 14:38:00
categories:
- USACO
tags:
- USACO
---

### Overview
USACO 2020 December Silver Contest에 참가했습니다.<br>
노래 틀어두고 간식 먹으면서 진행했기 때문에 시간이 비교적 오래 걸렸습니다.

1번은 Codeforces Div.2 C 정도에 나올법한 Ad-Hoc 문제, 2번은 수업용으로 사용하기 좋을 것 같은 문제입니다.<br>
3번은 풀이를 찾아가는 과정이 상당히 재미있었습니다. 3문제 중 가장 좋았습니다.

### BOJ 20647 Cowntagion (0:35:53)
서브태스크를 따라가면서 풀이를 생각합시다.

성게 그래프에서는 소가 N마리 이상이 될 때까지 기다린 다음 한 마리씩 보내는 것이 최적입니다. 이때 걸리는 시간은 $N-1 + \lceil log_2 N \rceil$입니다.<br>
선형 트리에서는 2마리로 만들고 아래로 보내는 것을 반복하는 것이 최적입니다. 이때 걸리는 시간은 $2(N-1)$입니다.

두 가지 풀이를 조합하면 일반적인 트리에서도 문제를 해결할 수 있습니다.<br>
트리의 각 정점에서, 소가 (자식의 수 + 1)마리 이상이 될 때까지 기다린 다음 한 마리씩 보내면 됩니다.

```cpp
#include <bits/stdc++.h>
using namespace std;

int n, ans, cnt[101010];

int main(){
    ios_base::sync_with_stdio(false); cin.tie(nullptr);
    cin >> n; if(n == 1){ cout << 0; return 0; }
    for(int i=1; i<n; i++){
        int s, e; cin >> s >> e;
        cnt[s]++; cnt[e]++;
    }
    for(int i=2; i<=n; i++) cnt[i]--;
    for(int i=1; i<=n; i++){
        int now = 0, pv = 1;
        while(pv <= cnt[i]) pv <<= 1, now++;
        ans += now + cnt[i];
    }
    cout << ans;
}
```

### BOJ 20648 Rectangular Pasture (1:00:31)
$2^{1000}$과 같이 매우 큰 수는 C++로 처리하기 힘듭니다. 그러므로 $2^N$에서 불가능한 경우를 빼는 것이 아닌, 가능한 경우를 직접 세는 것을 생각해봅시다.

어떤 직사각형 하나를 특정짓기 위해서는 (1) 왼쪽 변의 x좌표, (2) 오른쪽 변의 x좌표, (3) 윗 변의 y좌표, (4) 아랫 변의 y좌표를 알면 됩니다. 이때 x, y좌표를 0부터 10억까지 모두 고려하지 않고, 점이 존재하는 x, y좌표만 고려해도 된다는 것을 알 수 있습니다.<br>
좌표 압축을 합시다. x좌표와 y좌표가 각각 서로 다르기 때문에 쉽게 좌표 압축을 할 수 있습니다.

직사각형의 왼쪽 변과 오른쪽 변의 x좌표를 고정합시다. 이때 가능한 윗 변과 아랫 변의 조합의 수를 구하면 문제를 해결할 수 있습니다. 이때 가능한 조합의 수는 (가능한 윗 변의 개수) × (가능한 아랫 변의 개수)입니다.<br>
왼쪽 변의 x좌표를 $x_i$, 오른쪽 변의 x좌표를 $x_j$라고 합시다. ($x_i$는 $i$번째 점의 x좌표를 의미합니다.)

가능한 윗 변의 개수는, x좌표가 $x_i$ 이상 $x_j$ 이하면서 y좌표가 $\max(y_i, y_j)$ 이상인 점의 개수와 동일합니다.<br>
마찬가지로 가능한 아랫 변의 개수는, x좌표가 $x_i$ 이상 $x_j$ 이하면서 y좌표가 $\min(y_i, y_j)$ 이하인 점의 개수와 동일합니다.

2차원 영역 상에서 어떤 직사각형 영역에 속하는 점의 개수를 빠르게 구할 수 있다면 이 문제를 $O(N^2f(N))$에 문제를 풀 수 있습니다. (단, $f(N)$은 점의 개수를 세는데 필요한 시간)<br>
그리고 이 작업은 2D Prefix Sum을 이용하면 $O(N^2)$ 전처리를 통해 각 쿼리를 $O(1)$에 처리할 수 있습니다.

그러므로 $O(N^2)$에 문제를 해결할 수 있습니다.

```cpp
#include <bits/stdc++.h>
#define x first
#define y second
#define all(v) v.begin(), v.end()
#define compress(v) sort(all(v)), v.erase(unique(all(v)), v.end())
using namespace std;

typedef long long ll;
typedef pair<int, int> p;
istream& operator >> (istream &in, p &t){ in >> t.x >> t.y; return in; }

int sum[2525][2525];
void build(){
    for(int i=1; i<2525; i++) for(int j=1; j<2525; j++) sum[i][j] += sum[i-1][j] + sum[i][j-1] - sum[i-1][j-1];
}
int query(int x, int xx, int y, int yy){
    if(x > xx || y > yy) return 0;
    return sum[xx][yy] - sum[x-1][yy] - sum[xx][y-1] + sum[x-1][y-1];
}

int n; p a[2525];
vector<int> x_comp, y_comp;

int main(){
    ios_base::sync_with_stdio(false); cin.tie(nullptr);
    cin >> n;
    for(int i=1; i<=n; i++){
        cin >> a[i];
        x_comp.push_back(a[i].x);
        y_comp.push_back(a[i].y);
    }
    compress(x_comp); compress(y_comp);
    for(int i=1; i<=n; i++){
        a[i].x = lower_bound(all(x_comp), a[i].x) - x_comp.begin() + 1;
        a[i].y = lower_bound(all(y_comp), a[i].y) - y_comp.begin() + 1;
        sum[a[i].x][a[i].y]++;
    }
    build();
    sort(a+1, a+n+1);
    ll ans = n+1; // 0, 1
    for(int i=1; i<=n; i++) for(int j=1; j<i; j++){
        int le = a[j].x, ri = a[i].x;
        int lo = a[i].y, hi = a[j].y;
        if(lo > hi) swap(lo, hi);
        ll up = query(le, ri, hi, n);
        ll dw = query(le, ri, 1, lo);
        ans += up * dw;
    }
    cout << ans;
}
```

### BOJ 20649 Stuck in a Rut (2:05:47)
좌표 범위가 작은(2000 이하) 서브태스크가 있다는 것에 유의하며 풀이를 생각해봅시다.

2번 문제였던 Rectangular Pasture처럼 x, y좌표가 각각 서로 다르기 때문에 좌표 압축을 생각해볼 수 있습니다.<br>
이 문제에서는 이동 거리가 중요하기 때문에 단순하게 좌표 압축을 하면 안 되고, 다른 정보를 추가적으로 기록해야 합니다.

주어진 x좌표가 {1, 4, 5, 8, 10}이라고 합시다. 평소에는 그냥 5개로 압축하지만 이번에는 9(= 2N-1)개로 압축하고, 압축된 각 덩어리의 가중치를 {1, 3, 1, 0, 1, 2, 1, 1, 1}로 부여합니다.<br>
이렇게 압축하면 홀수 번째 좌표에만 소를 배치해서 예외를 잘 피할 수 있으며, 인접한 칸으로 이동하는데 걸리는 시간을 구할 수 있습니다.

어떤 소 $i$가 $j$ 때문에 직접적으로 STOP 당한다면, 두 소의 이동 경로의 교점에 $j$가 **더 빨리** 도착했다는 것을 의미합니다. 인접한 칸으로 이동하는데 걸리는 시간도 미리 구해놓았으니, 다익스트라 알고리즘을 변형해서 각 소가 어떤 칸에 도착한 시각을 구할 수 있습니다.

직접적으로 STOP 당한 것 뿐만 아니라 간접적으로 STOP 당한 것까지 구해야 합니다.<br>
직접적으로 STOP 당한 정보를 기준으로 트리(혹은 포레스트)를 구성한 다음, 각 정점을 루트로 하는 서브트리 안에서 STOP 당한 횟수를 세어주면 됩니다.

다익스트라를 이용해 탐색하는 칸은 최대 $O(N^2)$개이고, 서브트리 안에서 STOP 당한 횟수를 구하는 것은 선형 시간에 할 수 있으므로 시간 내에 문제를 해결할 수 있습니다.

```cpp
#include <bits/stdc++.h>
#define x first
#define y second
#define all(v) v.begin(), v.end()
#define compress(v) sort(all(v)), v.erase(unique(all(v)), v.end())
using namespace std;

typedef pair<int, int> p;
istream& operator >> (istream &in, p &t){ in >> t.x >> t.y; return in; }

const int dx[] = {1, 0}; // E W
const int dy[] = {0, 1}; // E W

struct Info{
    int idx, i, j, d, c;
    Info() = default;
    Info(int idx, int i, int j, int d, int c) : idx(idx), i(i), j(j), d(d), c(c) {}
    bool operator < (const Info &t) const { return c > t.c; }
};

int n; char d[2020]; p a[2020];
int xw[2020], yw[2020];
int id[2020][2020];
vector<int> x_comp, y_comp;
int cnt[1010], dst[2020][2020];

vector<int> g[1010];
int sz[1010], par[1010];

void dfs(int v){
    sz[v] = cnt[v];
    for(auto i : g[v]) dfs(i), sz[v] += sz[i];
}

int main(){
    ios_base::sync_with_stdio(false); cin.tie(nullptr);
    cin >> n; memset(dst, 0x3f, sizeof dst);
    for(int i=1; i<=n; i++){
        cin >> d[i] >> a[i];
        x_comp.push_back(a[i].x);
        y_comp.push_back(a[i].y);
    }
    compress(x_comp);
    compress(y_comp);
    for(int i=1; i<n; i++){
        xw[i*2] = x_comp[i] - x_comp[i-1] - 1;
        yw[i*2] = y_comp[i] - y_comp[i-1] - 1;
    }
    for(int i=1; i<=n; i++) xw[i*2-1] = yw[i*2-1] = 1;
    for(int i=1; i<=n; i++){
        a[i].x = lower_bound(all(x_comp), a[i].x) - x_comp.begin() + 1;
        a[i].y = lower_bound(all(y_comp), a[i].y) - y_comp.begin() + 1;
        a[i].x = a[i].x * 2 - 1;
        a[i].y = a[i].y * 2 - 1;
        id[a[i].x][a[i].y]  = i;
        dst[a[i].x][a[i].y] = 0;
    }

    priority_queue<Info> pq;
    for(int i=1; i<=n; i++) pq.emplace(i, a[i].x, a[i].y, d[i] == 'E' ? 0 : 1, 0);
    while(pq.size()){
        int idx = pq.top().idx, i = pq.top().i, j = pq.top().j, k = pq.top().d, cst = pq.top().c; pq.pop();
        // idx: cow id, (i, j): in_pos, k: dir, cst: spent time
        if(dst[i][j] < cst){
            cnt[id[i][j]]++;            // stopped by id[i][j]
            g[id[i][j]].push_back(idx); // make tree
            par[idx] = id[i][j];        // make tree
            continue;
        }
        id[i][j] = idx; dst[i][j] = cst;

        int ii = i + dx[k], jj = j + dy[k];
        if(ii < 1 || jj < 1 || ii > n+n || jj > n+n) continue;
        if(k == 0) pq.emplace(idx, ii, jj, k, cst + xw[ii]); // E
        else       pq.emplace(idx, ii, jj, k, cst + yw[jj]); // N
    }
    for(int i=1; i<=n; i++) if(!par[i]) dfs(i);
    for(int i=1; i<=n; i++) cout << sz[i] << "\n";
}
```
