---
title: "2019 UNICON 문제 풀이"
date: 2019-09-08 20:00:00
categories:
- Sunrin-PS
tags:
- Sunrin-PS
- Unifox
---

문제 목록: 추가 예정

출제 및 검수: [aura02](http://icpc.me/aura02), [bomin5957](http://icpc.me/bomin5957), [jhnah917](http://icpc.me/jhnah917), [maruii](http://icpc.me/maruii), [ryute](http://icpc.me/ryute), [solsam10](http://icpc.me/solsam10)

| 문제   | MAX | PIANO | HELP | FOX | USA | BOMIN | TTUK | DASH | TREE | EXHIBITION |
|--------|----------|--------|--------|--------|--------|----------|----------|----------|----------|----------|
| 출제자 | bomin5957 | bomin5957 | bomin5957 | solsam10 | aura02 | jhnah917 | aura | jhnah917 | jhnah917 | jhnah917/ryute |

### 합과 차의 최대(MAX)
A+B, A-B, B-A 중 최댓값을 출력하면 됩니다.
```cpp
#include <bits/stdc++.h>
using namespace std;

int main(){
	int a, b; cin >> a >> b;
	cout << max({a+b, a-b, b-a});
}
```

### C장조(PIANO)
입력으로 주어지는 문자열의 각 글자들을 적당하게 바꿔서 출력하면 됩니다.<br>
map(딕셔너리)를 이용해서 짜도 되고, switch-case문을 이용해서 짜도 되고... 다양한 방법이 있습니다.
```cpp
#include <bits/stdc++.h>
using namespace std;

map<char, string> mp;

int main(){
    ios_base::sync_with_stdio(0); cin.tie(0);
    string s; cin >> s;
    mp['A'] = "Ra";
    mp['B'] = "Si";
    mp['C'] = "Do";
    mp['D'] = "Re";
    mp['E'] = "Mi";
    mp['F'] = "Fa";
    mp['G'] = "Sol";
    for(auto i : s){
        cout << mp[i];
    }
}
```

### 여우 대장을 도와줘(HELP)
직사각형의 세로 길이를 1로 고정시킵시다.<br>
홀수 번째 칸에 여우 집을 배치하는 것이 최적이 된다는 것을 쉽게 알 수 있습니다.<br>
정답은 2K-1이 됩니다.
```cpp
#include <bits/stdc++.h>
using namespace std;

int main(){
    int n; cin >> n;
    cout << 2*n-1;
}
```

### 여우 공장(FOX)
각 날짜별로 공장에서 생산하는 털 뭉치의 양을 쭉 계산해보면 아래 그림처럼 특정 지점부터 값이 순환하게 됩니다.<br>
<img src = "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Pollard_rho_cycle.jpg/220px-Pollard_rho_cycle.jpg">

나머지 연산을 히는 숫자가 100만 이하이므로 사이클의 길이도 100만 이하입니다.

[1, N]구간을 사이클에 포함되지 않는 구간, 사이클에 완전히 포함되는 구간, 사이클의 일부만 포함하는 구간으로 나눠서 각각 계산하면 됩니다.
```cpp
#include <bits/stdc++.h>
using namespace std;

/*
x/8 + q
7x + p
*/

typedef long long ll;

ll n, m, p, q, s;
ll st, ed;

int chk[1010101];
vector<int> v;

int main(){
	ios_base::sync_with_stdio(0); cin.tie(0);
	cin >> n >> m >> p >> q >> s;
	int now = s;
	chk[s] = 1;
	v.push_back(0);
	v.push_back(now);

	for(int i=2; i<=n; i++){
		if(now % 8 == 0) now = (now / 8 + q) % m;
		else now = (now * 7 + p) % m;
		if(chk[now]){
			st = chk[now];
			ed = i - 1;
			break;
		}
		chk[now] = i;
		v.push_back(now);
	}

	if(v.size()-1 == n){
		ll ans = 0;
		for(auto i : v) ans += i;
		cout << ans; return 0;
	}

	ll front = 0, rear = 0;
	ll cycle = 0, len = ed - st + 1, loop;
	for(int i=1; i<st; i++){
		front += v[i];
	}
	for(int i=st; i<=ed; i++){
		cycle += v[i];
	}
	n -= st - 1;
	loop = n / len;
	for(int i=st; i<st+(n%len); i++){
		rear += v[i];
	}

	cout << front + cycle*loop + rear;
}
```

### 정휘와 유사잇기(USA)
모든 문자열 쌍에 대해 LCS를 미리 구해줍시다.<br>
문자열은 최대 10개이므로 가능한 모든 배열 방법을 탐색할 수 있습니다.
```cpp
#include <bits/stdc++.h>
using namespace std;

string s[11];
int n;

int dp[555][555];
int lcs[11][11];

void f(int x, int y){
   string a = s[x], b = s[y];
   int n = a.size(), m = b.size();
   memset(dp, 0, sizeof dp);

   a = "!" + a;
   b = "?" + b;
   for(int i=1; i<=n; i++){
      for(int j=1; j<=m; j++){
         if(a[i] == b[j]) dp[i][j] = dp[i-1][j-1] + 1;
         else dp[i][j] = max(dp[i-1][j], dp[i][j-1]);
      }
   }

   lcs[x][y] = lcs[y][x] = dp[n][m];
}

int main(){
   ios_base::sync_with_stdio(0); cin.tie(0);
   cin >> n;
   for(int i=1; i<=n; i++){
      cin >> s[i];
   }

   for(int i=1; i<=n; i++) for(int j=i+1; j<=n; j++) f(i, j);

   vector<int> v;
   for(int i=1; i<=n; i++) v.push_back(i);

   int ans = 0;
   do{
      int now = 0;
      for(int i=1; i<n; i++){
        now += lcs[v[i-1]][v[i]];
      }
      ans = max(ans, now);
   }while(next_permutation(v.begin(), v.end()));

   cout << ans;
}
```

### 명탐정 보민(BOMIN)
참조를 N번 시도하면 호감도는 `dn(n-1)/2+n`이 됩니다.<br>
이 수식을 이용해 파라메트릭 서치를 돌리면 각 변수에 대해 O(logX)만에 답을 구할 수 있습니다.
```cpp
#include <bits/stdc++.h>
using namespace std;

typedef long long ll;

ll d;

ll sum(ll n){
	return d * n * (n - 1) / 2 + n;
}

void solve(){
	ll x; cin >> x;
	ll l = 0, r = 101010;
	ll ans = -1;
	while(l <= r){
		int m = l + r >> 1;
		if(sum(m) >= x){
			ans = m;
			r = m - 1;
		}else{
			l = m + 1;
		}
	}
	cout << ans << "\n";
}

int main(){
	ios_base::sync_with_stdio(0); cin.tie(0);
	int t; cin >> t >> d;
	while(t--) solve();
}
```

### 보민이와 두끼본전(TTUK)
전형적인 냅색 문제입니다.
```cpp
#include <bits/stdc++.h>
using namespace std;

typedef long long ll;

ll n, k;
ll dp[101010];

ll w[101010];
ll v[101010];

int main(){
   ios_base::sync_with_stdio(0); cin.tie(0);
   cin >> n >> k;
   for(int i=1; i<=n; i++) cin >> v[i] >> w[i];

   for(int i=1; i<=n; i++){
      for(int j=w[i]; j<=k; j++){
         dp[j] = max(dp[j], dp[j-w[i]] + v[i]);
      }
   }

   ll ans = 0;
   for(int i=1; i<=k; i++) ans = max(ans, dp[i]);
   cout << ans;
}
```

### 돌진(DASH)
누적합 배열(prefix sum)을 이용합시다.<br>
[S, E]구간에 통나무가 추가되면 arr[S]를 1 증가시키고, arr[E+1]을 1 감소시킵니다.<br>
N개의 통나무에 대해 이 작업을 모두 처리해주고 누적합 배열 sum을 계산해주면 sum[i]에는 x좌표가 i인 곳에 존재하는 통나무의 개수가 나옵니다.<br>
sum[i]의 최댓값을 출력하면 됩니다.
```cpp
#include <bits/stdc++.h>
using namespace std;

int arr[10101010];

int main(){
    ios_base::sync_with_stdio(0); cin.tie(0);
    int n; cin >> n;
    for(int i=0; i<n; i++){
        int a, b, c; cin >> a >> b >> c;
        arr[a]++; arr[b+1]--;
    }
    for(int i=1; i<10101010; i++){
        arr[i] += arr[i-1];
    }
    cout << *max_element(arr, arr+10101010);
}
```

### Re: 색깔부터 시작하는 트리와 쿼리(TREE)
두 가지 쿼리가 주어집니다.

* 1번 쿼리: 간선을 제거하는 쿼리
* 2번 쿼리: 어떤 정점에서 갈 수 있는 모든 정점에서 서로 다른 색깔의 개수를 출력

간선을 제거하는 것은 어렵지만, 거꾸로 생각해서 간선을 추가해주는 것은 쉽습니다. N개의 정점으로 이루어진 트리가 주어지고, 간선을 끊는 쿼리는 N-1개 들어오기 때문에 쿼리를 뒤에서부터 처리해주면 Union-Find를 이용해 간선을 추가하는 작업으로 바꾸어 수행할 수 있습니다.

여러 개의 데이터가 주어졌을 때 서로 다른 원소의 개수를 구하는 것은 set을 이용해 O(NlogN)에 구할 수 있습니다. 트리의 색깔을 set으로 관리하는 방법을 생각해봅시다.

각 정점마다 set을 하나씩, 총 N개의 set을 만들 것입니다. 처음에는 각 정점의 색깔을 set에 넣어줍니다. 그러면 각 set에는 1개의 원소가 들어있습니다.

간선을 연결하는 쿼리는 Union-Find를 이용해 수행할 것입니다. union(merge)단계에서 두 정점을 연결하는 작업뿐만 아니라 두 정점을 담당하는 set도 합쳐줘야 합니다.<br>
크기가 작은 set에 있는 원소를 큰 set으로 옮기면, 각 원소는 최대 O(logN)번만 이동합니다. 그러므로 union 단계에서 set을 합쳐줄 때 작은 set의 원소를 큰 set에 옮겨주면 됩니다.

2번 쿼리는 set의 원소의 개수를 출력하는 것으로 쉽게 처리할 수 있습니다.
```cpp
#include <bits/stdc++.h>
using namespace std;

const int size = 101010;

int par[size];
set<int> st[size];
int g[size];

void uf_init(int n){
    for(int i=1; i<=n; i++) par[i] = i;
}

int find(int v){
    return v == par[v] ? v : par[v] = find(par[v]);
}

bool merge(int u, int v){
    u = find(u); v = find(v);
    if(u == v) return 0;
    if(st[u].size() > st[v].size()) swap(u, v);
    for(auto i : st[u]) st[v].insert(i);
    par[u] = v;
    return 1;
}

struct Query{
    int op, a;
    Query(){}
    Query(int op, int a) : op(op), a(a) {}
};

int n, q;
vector<Query> query;

int main(){
    ios_base::sync_with_stdio(0); cin.tie(0);
    cin >> n >> q; uf_init(n);
    g[1] = 0;
    for(int i=2; i<=n; i++) cin >> g[i];
    for(int i=1; i<=n; i++){
        int c; cin >> c;
        st[i].insert(c);
    }

    for(int i=0; i<n+q-1; i++){
        int op, a; cin >> op >> a;
        query.push_back({op, a});
    }
    reverse(query.begin(), query.end());

    stack<int> ans;

    for(auto i : query){
        int op = i.op;
        int a = i.a;
        if(op == 1){
            merge(a, g[a]);
        }else{
            ans.push(st[find(a)].size());
        }
    }

    while(ans.size()){
        cout << ans.top() << "\n";
        ans.pop();
    }
}
```
작은 set에서 큰 set으로 옮길 때 각 원소가 O(logN)번 이동하는 것은 HLD와 같은 방식으로 증명 가능합니다. 이 아이디어를 이용해 APIO2012 1번을 풀 수 있다고 합니다.

<img src = "https://i.imgur.com/70Ekj7e.png"><Br>
<s>이런 디스크립션을 "누군가"가 썼지만 실제 문제에는 반영하지 않았습니다.</s>

### 전시회(EXHIBITION)
그림 A의 가치를 Ax, 그림 A의 분위기를 Ay라고 합시다.

그림을 A, B, C, 총 3개를 골랐을 때 얻는 분위기를 식으로 표현하면<Br>
**Ax(By - Cy) + Bx(Cy - Ay) + Cx(Ay - By)**이고, 이 식을 전개해서 잘 정리해주면 [신발끈 공식](https://ko.wikipedia.org/wiki/%EC%8B%A0%EB%B0%9C%EB%81%88_%EA%B3%B5%EC%8B%9D)을 이용해 삼각형의 넓이를 구한 것의 2배와 같은 식이 나옵니다.<br>
그림 4개를 고르면 삼각형이 아닌 사각형 넓이의 2배가 나옵니다.

각각의 그림을 x좌표가 가치, y좌표가 분위기인 2차원 좌표 평면상의 점으로 봅시다. N개의 점이 주어졌을 때 만들 수 있는 가장 넓은 삼각형 혹은 사각형의 넓이의 2배를 구하는 문제로 바뀌게 됩니다.

삼각형 혹은 사각형을 이루는 점은 convex hull 위에 있어야 합니다.<br>
그림은 최소 3개 주어지므로, convex hull을 구성하는 점은 3개 이상입니다.<br>
만약 convex hull을 이루는 점이 3개라면 삼각형이 만들어집니다. 그 삼각형의 넓이를 출력하면 됩니다.<br>
N이 3보다 크다면 **무조건** 사각형이 더 넓다는 것을 쉽게 알 수 있습니다.<br>
N이 3보다 클 때 가장 큰 사각형을 찾는 방법을 생각해봅시다.

사각형을 찾는 방법은 O(N<sup>2</sup>lgN)과 O(N<sup>2</sup>)방법이 있습니다.<br>
기본적인 아이디어는 대각선이 될 점 2개를 고정시키고, 만들어진 대각선 L로 나누어진 두 그룹에서 각각 L과 가장 먼 점을 하나씩 골라주면 됩니다.

##### N<sup>2</sup>lgN
대각선 L로 나누어진 두 그룹을 봅시다.<br>
<img src = "https://i.imgur.com/pjwAx3Y.png"><br>
점들을 시계방향 혹은 반시계방향으로 순회하면, 빨간 선과의 길이가 증가하다가 감소하는, Convex Function 형태가 됩니다. 그러므로 삼분 탐색을 적용하면 가능한 O(N<sup>2</sup>)개의 대각선마다 O(lgN)만에 계산을 하므로 O(N<sup>2</sup>lgN)이 걸립니다.

##### N<sup>2</sup>
대각선 L을 이루는 점 i, j를 봅시다.<br>
i를 고정하고 j를 반시계방향 순서대로 돌렸을 때, 대각선 L에서 가장 먼 점 p, q도 반시계방향으로 이동하기 때문에 p, q는 최대 O(N)번만 이동하게 됩니다. 그러므로 O(N<sup>2</sup> + N) = O(N<sup>2</sup>)만에 풀 수 있습니다.

##### N<sup>2</sup>lgN
```cpp
#include <bits/stdc++.h>
#define x first
#define y second
using namespace std;

typedef pair<int, int> p;
typedef long long ll;
vector<p> point; //input data
vector<p> ret; //convex hull
int n;

ll ccw(p a, p b){ return (ll)a.x*b.y - (ll)b.x*a.y; }
int ccw(p a, p b, p c){
	ll val = ccw({b.x-a.x, b.y-a.y}, {c.x-a.x, c.y-a.y});
	if(val > 0) return 1;
	if(val < 0) return -1;
	return 0;
}

bool cmp(p a, p b){
	int val = ccw(point[0], a, b);
	if(val > 0) return true;
	if(val < 0) return false;
	if(a.x != b.x) return a.x < b.x;
	return a.y < b.y;
}

void graham(){ //graham scan (get convex hull)
	for(int i=0; i<n; i++){
		while(ret.size() >= 2 && ccw(ret[ret.size()-2], ret.back(), point[i]) <= 0) ret.pop_back();
		ret.push_back(point[i]);
	}
}

int area(p a, p b, p c){ //get (triangle area * 2)
	int ret = (a.x*b.y) + (b.x*c.y) + (c.x*a.y);
	ret -= (b.x*a.y) + (c.x*b.y) + (a.x*c.y);
	return abs(ret);
}

int search(int i, int j, int flag){ //get p or q
	if(flag == 1){
		int s = i+1, e = j-1;
		while(s+3 <= e){
			int l = (2*s+e)/3, r = (s+2*e)/3;
			if(area(ret[i], ret[j], ret[l]) < area(ret[i], ret[j], ret[r])) s = l;
			else e = r;
		}
		int ma = 0;
		for(int k=s; k<=e; k++){
			ma = max(ma, area(ret[i], ret[j], ret[k]));
		}
		return ma;
	}

	int s = j+1, e = i-1; if(e < s) e += n;
	while(s+3 <= e){
		int l = (2*s+e)/3, r = (s+2*e)/3;
		if(area(ret[i], ret[j], ret[l%n]) < area(ret[i], ret[j], ret[r%n])) s = l;
		else e = r;
	}

	int ma = 0;
	for(int k=s; k<=e; k++){
		ma = max(ma, area(ret[i], ret[j], ret[k%n]));
	}
	return ma;
}

void f(){
	cin >> n;
	point.resize(n), ret.clear();
	int idx = 0;
	for(int i=0; i<n; i++){
		cin >> point[i].x >> point[i].y;
		if(point[idx].x > point[i].x) idx = i;
		else if(point[idx].x == point[i].x && point[idx].y > point[i].y) idx = i;
	}
	swap(point[idx], point[0]);
	sort(point.begin()+1, point.end(), cmp);
	graham();

	if(ret.size() == 3){
		int val = area(ret[0], ret[1], ret[2]);
		cout << val << "\n";
		return;
	}

	n = ret.size();

	int ans = 0;
	for(int i=0; i<n; i++){
		for(int j=i+2; j<n; j++){
			if(i == 0 && j == n-1) continue;
			ans = max(ans, search(i, j, 1) + search(i, j, 2));
		}
	}
	cout << ans << "\n";
}

int main(){
	ios_base::sync_with_stdio(0); cin.tie(0);
	int asdf; cin >> asdf;
	while(asdf--) f();
}
```

##### N<sup>2</sup>
```cpp
#include <bits/stdc++.h>
#define x first
#define y second
using namespace std;

typedef pair<int, int> p;
typedef long long ll;
vector<p> point;
vector<p> ret;
int n;

ll ccw(p a, p b){ return (ll)a.x*b.y - (ll)b.x*a.y; }

int ccw(p a, p b, p c){
	ll val = ccw({b.x-a.x, b.y-a.y}, {c.x-a.x, c.y-a.y});
	if(val > 0) return 1;
	if(val < 0) return -1;
	return 0;
}

bool cmp(p a, p b){
	int val = ccw(point[0], a, b);
	if(val > 0) return true;
	if(val < 0) return false;
	if(a.x != b.x) return a.x < b.x;
	return a.y < b.y;
}

void graham(){
	for(int i=0; i<n; i++){
		while(ret.size() >= 2 && ccw(ret[ret.size()-2], ret.back(), point[i]) <= 0) ret.pop_back();
		ret.push_back(point[i]);
	}
}

int area(p a, p b, p c){
	int ret = (a.x*b.y) + (b.x*c.y) + (c.x*a.y);
	ret -= (b.x*a.y) + (c.x*b.y) + (a.x*c.y);
	return abs(ret);
}

void f(){
	cin >> n;
	point.resize(n), ret.clear();
	int idx = 0;
	for(int i=0; i<n; i++){
		cin >> point[i].x >> point[i].y;
		if(point[idx].x > point[i].x) idx = i;
		else if(point[idx].x == point[i].x && point[idx].y > point[i].y) idx = i;
	}
	swap(point[idx], point[0]);
	sort(point.begin()+1, point.end(), cmp);
	graham();

	if(ret.size() == 3){
		int val = area(ret[0], ret[1], ret[2]);
		cout << val << "\n";
		return;
	}

	n = ret.size();

	int ans = 0;
	for(int i=0; i<n; i++){
		int p = i+1, q = i+3;
		p %= n, q %= n;
		for(int j=i+2; j<n; j++){
			if(i == 0 && j == n-1) continue;
			while((p+1)%n != j && area(ret[i], ret[j], ret[p]) <= area(ret[i], ret[j], ret[p+1])) p = (p+1)%n;
			while((q+1)%n != i && area(ret[i], ret[j], ret[q]) <= area(ret[i], ret[j], ret[q+1])) q = (q+1)%n;
			int now = area(ret[i], ret[j], ret[p]) + area(ret[i], ret[j], ret[q]);
			ans = max(ans, now);
		}
	}
	cout << ans << "\n";
}

int main(){
    ios_base::sync_with_stdio(0); cin.tie(0);
	int asdf; cin >> asdf;
	while(asdf--) f();
}
```
