---
title:  "(C++) BFS 와 다익스트라의 거리 저장 및 업데이트 과정 차이" 

categories:
  - Algorithm
tags:
  - [Algorithm, Coding Test, Cpp, Graph]

toc: true
toc_sticky: true

date: 2021-04-01
last_modified_at: 2021-04-01
---

## 🚀 BFS 와 다익스트라에 대한 자세한 개념 설명

- [Chapter 4-4. 그래프 순회 방법 2️⃣ - BFS(너비 우선 탐색)](https://ansohxxn.github.io/algorithm%20lesson%202/chapter4-4/)
- [Chapter 4-5. 다익스트라 최단 경로 알고리즘](https://ansohxxn.github.io/algorithm%20lesson%202/chapter4-5/)

<br>

## 🚀 BFS 의 거리 저장 및 업데이트 

- 1️⃣ "배열" 안에 거리를 저장하는 방법 
  - 👉 모든 노드까지의 거리가 전부 필요할 때 
- 2️⃣ "구조체"(큐의 원소가 되는) 안에 거리를 저장하는 방법
  - 👉 특정 목적지 노드 하나가 정해져 있을 때 

두 방법 다 가능하다. 왜냐하면 BFS 는 다익스트라와는 다르게 동일한 위치의 거리를 새롭게 업데이트할 일은 없기 떄문이다. <u>가중치가 없는 그래프</u>를 순회하는 것이기 때문에 모든 노드의 비용이 동일한 것이나 마찬가지라 **더 빨리 갈 수 있는 길을 새롭게 찾아낸다거나 그럴 일은 없다.** 그저 현재의 위치에서 당장 갈 수 있는 가장 가까운 위치들을 다음에 방문하기 위해 큐에 "차례대로" 삽입해나갈 뿐이다. (그래서 BFS 가 가중치 없는 그래프에서 최단거리를 구할 수 있는 알고리즘인 이유이기도 하다.)

이 말은 즉, **최단 거리를 구하려는 목적지가 하나 뿐이라면 모든 위치까지의 거리를 모두 저장하고 처음부터 끝까지 늘 보존해야할 필요는 없다는 것이다.**(물론 1️⃣처럼 거리 테이블을 두어도 되지만 특정 목적지까지의 거리 하나만 구할 것이라면 굳이..!) 그러니 거리를 그냥 큐에서 Pop 되어 보존되지 않는 큐의 원소로 들어갈 구조체(위치 등을 가지고 있는) 내부에 거리를 저장하는 멤버를 두고 이 구조체 내부에 거리를 저장하여도 된다. 이게 바로 2️⃣ 방법이다. 이 방법은 구조체 안에 거리를 저장하기 때문에 큐에서 pop 된 위치(구조체)의 거리들은 더 이상 기억되지 않고 버려진다. 큐에서 pop 된 방문 위치(구조체)에 대한 거리는 다음에 방문할 위치들을 큐에 삽입할 때 "현재 위치까지의 거리에서 + 1" 해주는 목적으로 사용하기 위하여 구조체에 저장해두는 정도로만 하고, 굳이 테이블에 모든 위치까지의 거리를 저장하지 않는다. 특정 목적지가 하나로 정해져있다면 그냥 구조체 내에 거리를 저장하고, **특정 목적지의 위치(구조체)가 큐에서 pop 됐을 때를 캐치하여 다른 변수에 그 때의 거리를 저장**하는 식으로만 해주면 된다. 

다만, 목적지가 딱 하나인게 아니라 출발지로부터 여러 노드까지의 최단 거리를 동시에 구해야하는 것이면 2️⃣ 방법을 쓰기 어려울 것이다. 그럴땐 1️⃣ 방법처럼 따로 테이블을 만들어서 모든 위치까지의 거리를 저장해두어야 할 것이다.

<br>

### 🔥 int 배열에 거리 저장하기

> [[C++로 풀이] 게임 맵 최단거리 (BFS)⭐⭐](https://ansohxxn.github.io/programmers/114/)

```cpp
#include<vector>
#include<queue>
using namespace std;

struct Pos {
    int y;
    int x;
};

int solution(vector<vector<int> > maps)
{
    const int n = maps.size();
    const int m = maps[0].size();
    int deltaY[4] = { -1, 0, 1, 0 };
    int deltaX[4] = { 0, 1, 0, -1 };

    vector<vector<bool>> checked(n, vector<bool>(m));
    vector<vector<int>> dist(n, vector<int>(m)); // 거리 저장 테이블
    queue<Pos> q;

    q.push({0, 0});
    checked[0][0] = true;
    dist[0][0] = 1; // 출발지 거리 업데이트

    while (!q.empty()) {
        Pos pos = q.front();
        q.pop();
        
        int nowY = pos.y;
        int nowX = pos.x;

        for (int i = 0; i < 4; ++i) {
            int nextY = nowY + deltaY[i];
            int nextX = nowX + deltaX[i];

            if (nextY < 0 || nextY >= n || nextX < 0 || nextX >= m)
                continue;
            if (maps[nextY][nextX] == 0)
                continue;
            if (checked[nextY][nextX])
                continue;

            q.push({nextY, nextX});
            checked[nextY][nextX] = true;
            dist[nextY][nextX] = dist[nowY][nowX] + 1; // 다음에 방문하려는 위치의 거리를 현재 위치에 해당하는 거리에서 + 1 로 저장한다.
        }
    }
        
    if (!checked[n - 1][m - 1])
        return -1;
    else
        return dist[n - 1][m - 1]; // 목적지에 해당하는 거리 리턴
}
```

`dist` 테이블(배열)에 모든 위치에 대하여 거리(int)를 저장한다. 큐에 삽입시 큐에서 pop 된 위치의 거리를 테이블에서 찾아 이 값에서 1 을 더해주어 큐에 삽입(다음에 방문하기 위한 예약 과정)하려는 위치의 거리를 업데이트 해주면 된다.

방문 체크 배열 (`checked`) 가 없어도 괜찮다. `dist` 거리 배열만으로도 방문 체크도 할 수 있기 때문이다. `dist[nextY][nextX]` 가 초기화 상태, 즉 한번도 업데이트 되지 않았다면 방문하지 않은 곳임을 바로 알 수 있기 때문이다. 

<br>

### 🔥 구조체 안에 거리 저장하기

```cpp
#include<vector>
#include<queue>
using namespace std;

struct Pos {
    int y;
    int x;
    int dist; // 구조체 내부에 거리 저장
};

int solution(vector<vector<int> > maps)
{
    int answer = -1;
    
    const int n = maps.size();
    const int m = maps[0].size();
    int deltaY[4] = { -1, 0, 1, 0 };
    int deltaX[4] = { 0, 1, 0, -1 };

    // 거리 테이블 없음!
    vector<vector<bool>> checked(n, vector<bool>(m));
    queue<Pos> q;

    q.push({0, 0, 1});
    checked[0][0] = true;

    while (!q.empty()) {
        Pos pos = q.front();
        q.pop();
        
        int nowY = pos.y;
        int nowX = pos.x;
        int now_dist = pos.dist;
        
        // ⭐큐에서 pop 된 구조체의 거리는 기억되지 않으므로 목적지에 해당하는 구조체 pop시 그 거리를 따로 다른 변수에 저장해두어야 하는 과정이 필요⭐
        if (nowY == n - 1 && nowX == m - 1)
            answer = now_dist;

        for (int i = 0; i < 4; ++i) {
            int nextY = nowY + deltaY[i];
            int nextX = nowX + deltaX[i];

            if (nextY < 0 || nextY >= n || nextX < 0 || nextX >= m)
                continue;
            if (maps[nextY][nextX] == 0)
                continue;
            if (checked[nextY][nextX])
                continue;

            q.push({nextY, nextX, now_dist + 1}); // 구조체 내부의 거리에 저장한다.
            checked[nextY][nextX] = true;
        }
    }
        
    return answer;
}
```

- 큐의 원소인 `Pos` 구조체 내부의 `dist` 멤버에 거리가 저장되기 떄문에 `Pos` 구조체가 목적지일 때를 캐치하여 그 거리를 `answer`에 옮겨주는 작업을 추가로 해주어야 한다. 
  - 배열 테이블에 모든 지점별 거리들이 저장되는게 아니기 떄문이다. 원소(Pos 구조체 인스턴스)에 거리가 저장되어 있기 때문에 다음 while 문에서 큐에서 다른 원소를 Pop 함에 따라 이전 원소(Pos)의 거리는 잊혀진다. 따라서 목적지 Pos 에 도달시 따로 거리를 다른 변수에 저장해두는 작업이 필요하다.

거리 배열 쓸 때와 달리 방문 체크 배열이 필수로 필요하다. 

<br>

## 🚀 다익스트라의 거리 저장 및 업데이트

경우에 따라 거리 테이블을 쓰지 않고 그냥 구조체에만 저장해도 되는 BFS 와 달리 다익스트라는 <u>구조체에 거리를 저장하는 것도, 테이블을 따로 두어 모든 위치까지의 거리를 저장하는 것도</u> **둘 다 필요하다.**

- <u>가중치가 있는 그래프</u>에서 최단거리를 찾을 떄 다익스트라를 사용하기 때문에
  - 1️⃣ 이전에 발견했던 경로보다 더 좋은 경로를 찾아낼 수도 있다.
    - 👉 거리 테이블에 모든 위치까지의 거리들을 저장해두어야 하는 이유이다.
      - 구조체에만 거리를 저장해두면 pop 된 이후 그 거리를 기억할 수 있는 방법이 없다. 가중치 그래프에선 더 좋은 경로를 찾아낼 수 있기 때문에 기존에 구해놓은 거리와 비교하여 새롭게 업데이트 할지 판단할 수 있어야 한다.
  - 2️⃣ 같은 노드들 중에서도 더 좋은 경로를 가진 노드를 방문해야 한다.(그래야 최단 경로를 찾을 수 있으니까)
    - 👉 우선순위 큐에서 가장 최고의 거리를 가진 원소(구조체)부터 pop 되어야 한다.
      - 따라서 우선순위 큐에 넣을 대상이 되는 구조체에 "거리 정보"가 포함이 되어 있어야 한다. 그래야 우선순위 큐 입장에서 어떤 구조체부터 pop 시켜야할지 판단할 수 잇기 때문이다.

위와 같은 이유로, 다익스트라는 원소(구조체)내에서도 거리 저장이 필요하고, 동시에 거리 테이블에서 모든 위치까지의 거리를 저장하고 업데이트시켜나가는 과정이 필요하다.


> [[C++로 풀이] 배달(다익스트라)⭐⭐⭐](https://ansohxxn.github.io/programmers/111/)

```cpp
#include <iostream>
#include <vector>
#include <queue>
using namespace std;

struct Town {
    int number;
    int shortestTime; // 구조체 내에서도 거리 저장

    Town() {}

    Town(int _number, int _shortestTime) {
        number = _number;
        shortestTime = _shortestTime;
    }
};

struct cmp {
    bool operator()(const Town& a, const Town& b) {
        return a.shortestTime > b.shortestTime;
    }
};

int solution(int N, vector<vector<int>> road, int K) {
    int answer = 0;
    const int maxTime = 20000000;
    
    vector<bool> visited(N + 1);
    vector<int> time(N + 1, maxTime); // 거리 테이블도 따로 두어야 한다.
    priority_queue<Town, vector<Town>, cmp> pq;

    time[1] = 0;
    pq.push(Town(1, 0));

    while (!pq.empty()) {
        
        Town startTown = pq.top();
        pq.pop(); // 구조체 내에 저장된 거리를 기준으로 가장 최단 거리를 가진 구조체부터 pop 된다. 

        if (visited[startTown.number])
            continue;

        visited[startTown.number] = true;

        for (int i = 0; i < road.size(); ++i) {
            
            Town nextTown;
            if (road[i][0] == startTown.number)
                nextTown.number = road[i][1];
            else if (road[i][1] == startTown.number)
                nextTown.number = road[i][0];
            else
                continue;

            if (visited[nextTown.number])
                continue;

            if (time[nextTown.number] < startTown.shortestTime + road[i][2]) // 거리 테이블에 현재까지 찾은 최단 거리를 저장해두고 비교해야 한다.
                continue;

            time[nextTown.number] = startTown.shortestTime + road[i][2];
            nextTown.shortestTime = startTown.shortestTime + road[i][2];
            pq.push(nextTown);
        }
    }

    for (int i = 1; i < time.size(); ++i)
        if (time[i] <= K)
            answer++;

    return answer;
}
```

***
<br>

    🌜 개인 공부 기록용 블로그입니다. 오류나 틀린 부분이 있을 경우 
    언제든지 댓글 혹은 메일로 지적해주시면 감사하겠습니다! 😄

[맨 위로 이동하기](#){: .btn .btn--primary }{: .align-right}