---
title: "제4회 생각하는 프로그래밍 대회 풀이"
date: 2020-12-09 08:36:00
categories:
- PS
tags:
---

**제4회 생각하는 프로그래밍 대회**

### 백준20001 고무오리 디버깅
단순 구현 문제입니다.

```cpp
cnt = 0
while(True):
  s = input()
  if s == "고무오리 디버깅 끝":
    break
  if s == "문제":
    cnt += 1
  if s == "고무오리":
    if cnt == 0:
      cnt += 2
    else:
      cnt -= 1

if cnt == 0:
  print("고무오리야 사랑해")
else:
  print("힝구")
```

### 백준20002 사과나무
2D Prefix Sum 연습 문제

```cpp
#include <bits/stdc++.h>
#define x first
#define y second
#define all(v) v.begin(), v.end()
#define compress(v) sort(all(v)), v.erase(unique(all(v)), v.end())
using namespace std;

typedef long long ll;

ll n, a[333][333];

ll query(int x, int xx, int y, int yy){
    return a[xx][yy] - a[x-1][yy] - a[xx][y-1] + a[x-1][y-1];
}

int main(){
    ios_base::sync_with_stdio(false); cin.tie(nullptr);
    cin >> n; for(int i=1; i<=n; i++) for(int j=1; j<=n; j++) cin >> a[i][j];
    for(int i=1; i<=n; i++) for(int j=1; j<=n; j++){
        a[i][j] += a[i-1][j]; a[i][j] += a[i][j-1]; a[i][j] -= a[i-1][j-1];
    }
    ll mx = -1e18;
    for(int i=1; i<=n; i++) for(int j=1; j<=n; j++) for(int k=0; k<=n; k++){
        if(i+k <= n && j+k <= n) mx = max(mx, query(i, i+k, j, j+k));
    }
    cout << mx;
}
```

### 백준20003 거스름돈이 싫어요
유클리드 호제법 연습 문제

```cpp
#include <bits/stdc++.h>
#define x first
#define y second
#define all(v) v.begin(), v.end()
#define compress(v) sort(all(v)), v.erase(unique(all(v)), v.end())
using namespace std;

typedef long long ll;

ll n, g = 1, gg;
ll lcm(ll a, ll b){ return a/__gcd(a, b)*b; }

int main(){
    ios_base::sync_with_stdio(false); cin.tie(nullptr);
    cin >> n;
    for(int i=1; i<=n; i++){
        ll a, b, t; cin >> a >> b; t = __gcd(a, b);
        g = lcm(g, b/t);
        if(i == 1) gg = a/t;
        else gg = __gcd(gg, a/t);
    }
    cout << gg << " " << g;
}
```

### 백준20004 베스킨라빈스 31
백준 돌게임 시리즈와 유사합니다.

한 턴에 최대 $i$개의 수를 부를 수 있고, 마지막에 $N$을 부른 사람이 지는 게임을 이길 수 있다면 $D_i(N) = 1$, 무조건 진다면 $D_i(N) = 0$이라고 합시다. $i$마다 독립적으로 계산하면 됩니다.<br>
기저조건으로 $D_i(0) = 1$이라고 합시다. 자신의 차례에서 상대방을 무조건 지는 위치로 보낼 수 있다면, 즉 현재 돌이 $j$개 있을 때 $D_i(j-N)$부터 $D_i(j-1)$까지 0인 위치가 하나라도 있다면 무조건 이길 수 있습니다. 반대로 $D_i(j-N)$부터 $D_i(j-1)$이 모두 1이라면 이길 수 없습니다.

간단한 DP 문제로 바뀝니다.

```cpp
#include <bits/stdc++.h>
#define x first
#define y second
#define all(v) v.begin(), v.end()
#define compress(v) sort(all(v)), v.erase(unique(all(v)), v.end())
using namespace std;

typedef long long ll;

int dp[33];

int chk(int x){
    dp[0] = 1;
    for(int i=1; i<=31; i++){
        int flag = 0;
        for(int j=1; j<=x; j++) if(i-j >= 0 && !dp[i-j]) flag = 1;
        dp[i] = flag;
    }
    return dp[31];
}

int main(){
    ios_base::sync_with_stdio(false); cin.tie(nullptr);
    int n; cin >> n; for(int i=1; i<=n; i++) if(!chk(i)) cout << i << "\n";
}
```

### 백준20005 보스몬스터 전리품
단순 구현 문제입니다.<br>
BFS를 이용해 각 플레이어가 보스 몬스터한테 가는 시간을 구하면 됩니다.

```cpp
#include <bits/stdc++.h>
#define x first
#define y second
#define all(v) v.begin(), v.end()
#define compress(v) sort(all(v)), v.erase(unique(all(v)), v.end())
using namespace std;

typedef long long ll;
typedef pair<int, int> p;
const int di[] = {1, -1, 0, 0};
const int dj[] = {0, 0, 1, -1};

int n, m, k, si, sj, h;
char a[1010][1010];
int dst[1010][1010];
int arr[26], dps[26];

void bfs(){
    memset(dst, -1, sizeof dst);
    queue<p> q; q.emplace(si, sj); dst[si][sj] = 0;
    while(q.size()){
        int i = q.front().x, j = q.front().y; q.pop();
        for(int k=0; k<4; k++){
            int ii = i + di[k], jj = j + dj[k];
            if(ii < 1 || jj < 1 || ii > n || jj > m) continue;
            if(dst[ii][jj] != -1 || a[ii][jj] == 'X') continue;
            dst[ii][jj] = dst[i][j] + 1;
            if('a' <= a[ii][jj] && a[ii][jj] <= 'z') arr[a[ii][jj]-'a'] = dst[ii][jj];
            q.emplace(ii, jj);
        }
    }
}

int main(){
    ios_base::sync_with_stdio(false); cin.tie(nullptr);
    cin >> n >> m >> k;
    for(int i=1; i<=n; i++) for(int j=1; j<=m; j++){
        cin >> a[i][j]; if(a[i][j] == 'B') si = i, sj = j;
    }
    bfs();
    for(int i=0; i<k; i++){
        char a; int b; cin >> a >> b; dps[a-'a'] = b;
    }
    cin >> h;
    vector<p> v;
    for(int i=0; i<26; i++) if(dps[i]) {
        v.emplace_back(arr[i]-1, dps[i]);
    }
    sort(all(v));
    for(int i=v.size()-1; ~i; i--) v[i].x -= v[0].x;
    ll sum = 0, now = 0, cnt = 0, prv = 0; int pv = 0;
    while(pv < v.size()){
        ll tmp = 0;
        if(prv < v[pv].x) sum += now * (v[pv].x - prv - 1);
        if(sum >= h){ cout << cnt; return 0; }
        while(pv+1 < v.size() && v[pv].x == v[pv+1].x) tmp += v[pv].y, pv++, cnt++;
        tmp += v[pv].y; cnt++;
        now += tmp; sum += now; prv = v[pv].x;
        pv++;
    }
    cout << k;
}
```

### 백준20006 랭킹전 대기열
단순 구현 문제입니다.
```cpp
#include <bits/stdc++.h>
#define x first
#define y second
#define all(v) v.begin(), v.end()
#define compress(v) sort(all(v)), v.erase(unique(all(v)), v.end())
using namespace std;

typedef long long ll;

int n, m;
int lv[333]; string name[333];
vector<vector<int>> v;

int main(){
    ios_base::sync_with_stdio(false); cin.tie(nullptr);
    cin >> n >> m;
    for(int i=1; i<=n; i++) cin >> lv[i] >> name[i];
    for(int i=1; i<=n; i++){
        int idx = -1;
        for(int j=0; j<v.size(); j++) if(v[j].size() < m && abs(lv[v[j][0]] - lv[i]) <= 10){ idx = j; break; }
        if(idx == -1){ v.emplace_back(); v.back().push_back(i); }
        else v[idx].push_back(i);
    }
    for(auto i : v){
        if(i.size() == m) cout << "Started!\n";
        else cout << "Waiting!\n";
        sort(all(i), [&](int a, int b){ return name[a] < name[b]; });
        for(auto j : i) cout << lv[j] << " " << name[j] << "\n";
    }
}
```

### 백준20007 떡 돌리기
다익스트라를 돌려서 각 이웃집까지의 최단 거리를 구한 다음, 거리 순으로 정렬해서 순서대로 배달하면 됩니다.

```cpp
#include <bits/stdc++.h>
#define x first
#define y second
#define all(v) v.begin(), v.end()
#define compress(v) sort(all(v)), v.erase(unique(all(v)), v.end())
using namespace std;

typedef long long ll;
typedef pair<ll, ll> p;

int n, m, x, y;
vector<p> g[1010];
ll dst[1010];

void dijkstra(){
    memset(dst, 0x3f, sizeof dst);
    priority_queue<p> pq; pq.emplace(0, y); dst[y] = 0;
    while(pq.size()){
        ll now = pq.top().y, cst = -pq.top().x; pq.pop();
        if(cst > dst[now]) continue;
        for(auto i : g[now]) if(dst[i.x] > cst + i.y) {
            dst[i.x] = cst + i.y; pq.emplace(-dst[i.x], i.x);
        }
    }
}

int main(){
    ios_base::sync_with_stdio(false); cin.tie(nullptr);
    cin >> n >> m >> x >> y;
    for(int i=0; i<m; i++){
        int s, e, x; cin >> s >> e >> x;
        g[s].emplace_back(e, x); g[e].emplace_back(s, x);
    }
    dijkstra();
    vector<int> ord(n); iota(all(ord), 0); ord.erase(find(all(ord), y));
    sort(all(ord), [&](int a, int b){ return tie(dst[a], a) < tie(dst[b], b); });
    ll ans = 1, now = 0;
    if(dst[ord.back()] > x){ cout << -1; return 0; }
    for(auto i : ord){
        if(now + dst[i]*2 > x) ans++, now = 0;
        now += dst[i]*2;
    }
    cout << ans;
}
```

### 백준20008 몬스터를 처치하자!
단순 구현 문제입니다.

```cpp
#include <bits/stdc++.h>
#define x first
#define y second
#define all(v) v.begin(), v.end()
#define compress(v) sort(all(v)), v.erase(unique(all(v)), v.end())
using namespace std;

typedef long long ll;
typedef pair<ll, ll> p;

int n, h, mn = 1e9; p a[5];

void dfs(int t, int dam, vector<int> cool){
    if(dam <= 0){ mn = min(mn, t); return; }
    int flag = 0;
    for(int i=0; i<n; i++) if(cool[i]+a[i].x <= t) {
        vector<int> tmp = cool; tmp[i] = t;
        dfs(t+1, dam-a[i].y, tmp);
        flag = 1;
    }
    if(!flag) dfs(t+1, dam, cool);
}

int main(){
    ios_base::sync_with_stdio(false); cin.tie(nullptr);
    cin >> n >> h; for(int i=0; i<n; i++) cin >> a[i].x >> a[i].y;
    vector<int> v(n, -1e9);
    dfs(0, h, v);
    cout << mn;
}
```

### 백준20009 형곤이의 소개팅
[Stable Marriage Problem](https://en.wikipedia.org/wiki/Stable_marriage_problem)

```cpp
#include <bits/stdc++.h>
#define x first
#define y second
#define all(v) v.begin(), v.end()
#define compress(v) sort(all(v)), v.erase(unique(all(v)), v.end())
using namespace std;

typedef long long ll;

int n, match[444], work[444];
map<string, int> mp;
map<int, string> rev;
vector<int> g[444];

int main(){
    ios_base::sync_with_stdio(false); cin.tie(nullptr);
    cin >> n;
    for(int i=1; i<=n; i++){ string s; cin >> s; mp[s] = i; rev[i] = s; }
    for(int i=1; i<=n; i++){ string s; cin >> s; mp[s] = n+i; rev[n+i] = s; }
    for(int i=1; i<=n+n; i++){
        string s; cin >> s; int now = mp[s];
        for(int j=1; j<=n; j++){ cin >> s; g[now].push_back(mp[s]); }
    }
    queue<int> q;
    for(int i=1; i<=n; i++) q.push(i);
    while(q.size()){
        int i = q.front(); q.pop();
        for(int &j=work[i]; j<n; j++){
            int w = g[i][j];
            if(!match[w]){
                match[i] = w; match[w] = i; break;
            }
            int m = match[w], i1 = -1, i2 = -1;
            for(int j=0; j<n; j++){
                if(g[w][j] == i) i1 = j;
                if(g[w][j] == m) i2 = j;
            }
            if(i1 < i2){
                match[m] = 0; q.push(m);
                match[i] = w; match[w] = i;
                break;
            }
        }
    }
    for(int i=1; i<=n; i++){
        cout << rev[i] << " " << rev[match[i]] << "\n";
    }
}
```

### 백준20010 악덕 영주 혜유
MST를 구한 다음 트리의 지름을 구하면 됩니다.

```cpp
#include <bits/stdc++.h>
#define x first
#define y second
#define all(v) v.begin(), v.end()
#define compress(v) sort(all(v)), v.erase(unique(all(v)), v.end())
using namespace std;

typedef long long ll;
typedef pair<ll, ll> p;

int par[1010];
int find(int v){ return v == par[v] ? v : par[v] = find(par[v]); }
bool merge(int u, int v){
    u = find(u); v = find(v);
    if(u == v) return 0;
    par[u] = v; return 1;
}

struct Edge{
    int s, e, x;
    bool operator < (const Edge &t) const {
        return tie(x, s, e) < tie(t.x, t.s, t.e);
    }
};

int n, m;
vector<p> g[1010];
vector<Edge> edge;
ll ans;

ll maxdist, farnode;

void dfs(int now, int prv = -1, ll dist = 0){
    if(dist > maxdist){
        maxdist = dist;
        farnode = now;
    }
    for(auto i : g[now]){
        int nxt = i.first, cost = i.second;
        if(nxt ^ prv){
            dfs(nxt, now, dist + cost);
        }
    }
}

int main(){
    ios_base::sync_with_stdio(false); cin.tie(nullptr);
    cin >> n >> m; edge.resize(m);
    for(auto &i : edge) cin >> i.s >> i.e >> i.x;
    sort(all(edge)); iota(par, par+1010, 0);
    for(auto i : edge) if(merge(i.s, i.e)) {
        ans += i.x;
        g[i.s].emplace_back(i.e, i.x);
        g[i.e].emplace_back(i.s, i.x);
    }
    cout << ans << "\n";

    maxdist = 0, farnode = 1;
    dfs(1);
    maxdist = 0;
    dfs(farnode);
    cout << maxdist;
}
```
