---
title:  "(C++) Union-Find 알고리즘" 

categories:
  - Algorithm
tags:
  - [Algorithm, Coding Test, Cpp, Graph]

toc: true
toc_sticky: true

date: 2020-10-22
last_modified_at: 2020-10-22
---

## 🚕 Union-Find 알고리즘

> 서로소 집합(Disjoing Set) 알고리즘 이라고도 불리우며, <u>선택한 두 노드가 서로 같은 그래프에 속해있는지, 즉 연결이 되어 있는지를 검사</u>하고(연결이 안되있다면 두 노드는 서로소이며 서로 통행이 불가능한 다른 그래프다.)  <u>두 노드를 같은 그래프에 속하도록 연결시키는</u> (사이클을 형성하지 않도록 서로소인 두 노드를 연결 합병)알고리즘이다.

집합을 구성하는 비트 벡터, 배열, 연결리스트, 그래프, 트리 등등 다양한 곳에 사용될 수 있다.

- `Find` 👉 두 노드의 조상 노드가 같은지를 검사하는 알고리즘
  - 즉, 두 노드가 서로 같은 그래프에 속한다면 즉!! 두 노드가 서로 간접적으로라도 통행 가능하게 연결이 되어 있는 상태라면 True, 아니라면 False.
  - 재귀적인 과정으로 부모를 타고 타고 올라가 조상이 누구인지를 검사하고 이게 같은지를 검사한다.
    - 해당 그래프의 조상(루트)는 자기 자신을 부모로 가진다. 
  - 시간 복잡도
    - 배열일 경우 한번에 해당 정점이 속한 집합 번호를 찾으므로 \\(O(1)\\)
    - 트리일 경우 해당 정점이 속한 집합 번호는 곧 해당 정점이 속한 트리의 루트 노드이므로 트리의 높이와 비례한다. 최악은 \\(O(N-1)\\)
- `Union` 👉 두 노드가 같은 조상을 가지도록 합치는 알고리즘
  - 즉, 두 노드를 같은 그래프에 속하도록 합친다.
  - 즉, 두 노드가 통행 가능하게 연결 될 수 있도록 한친다. 
  - 더더더 조상인 부모로 합치기 위해 보통 더 작은 값을 가진 부모로 통합한다.
  - 시간 복잡도
    - 배열일 경우 모든 원소를 순회하면서 `y`집합 번호를 가진 정점들을 `x` 집합 번호로 가지게끔 바꿔야 하므로 \\(O(N)\\)
    - 트리일 경우 두 트리를 합치는 작업이 필요하다. \\(O(N)\\) 보다 작다. 따라서 트리인 경우엔 `Find` 알고리즘이 시간 복잡도를 지배하게 된다.


```cpp
int getRoot(vector<int>& parent, int x)  // 인수로 넘긴 정점의 루트를 알려줌
{
    if (parent[x] == x) return x; // 루트는 부모가 자기 자신. 루트를 찾았을 때 return
    return parent[x] = getRoot(parent, parent[x]); // parent[x] = parent[parent[x]] = parent[parent[parent[x]]] 이런식! 재귀호출 후 돌아오는 과정에서 부모 조상들의 루트도 같이 업데이트 해준다. 
}

void unionParent(vector<int>& parent, int a, int b)  // 두 정점을 병합함. 부모가 같은, 같은 그룹으로.
{
    a = getRoot(parent, a);
    b = getRoot(parent, b);
    if(a < b) parent[b] = a;
    else parent[a] = b;
}

bool find(vector<int>& parent, int a, int b)  // 두 정점이 같은 부모를 가졌는지 확인
{
    a = getRoot(parent, a);
    b = getRoot(parent, b);
    if(a == b) return true;
    else return false;
}
```

`parents`에서 각 인덱스는 정점을 뜻하며 원소는 해당 정점의 부모 정점을 가리킨다. 정점이 4 개라면 초기값은 [0, 1, 2, 3]으로 자기 자신이 부모로 초기화 한다. 마치 이 과정은 `n`개의 트리를 만들어 놓고 시작하는 것과 같다. 최종적으로 [0, 0, 0, 0]이 되어 모든 정점의 부모 정점이 같아진다면, 즉 하나의 트리로 완성되었다면 종료한다.  0 과 2 정점이 이어진다면 [0, 1, 0, 3]이 될 것이도 1 과 3 이 이어진다면 [0, 1, 0, 1]이 될 것이고 1 과 0 이 이어진다면 최종적으로 [0, 0, 0, 0]이 될 것이다.

1. *int getRoot(vector\<int>& parent, int x)*
  - `x` 정점의 루트를 리턴한다. 
  - <u>재귀 호출로 부모를 타고 타고 올라간다. 루트에 도달할 때까지.</u> 타고 타고 올라갈 수 있다는 것은, 타고 올라가도 바로 루트에 도달하지 못 했다는 것은 부모 조상들의 루트(parent)도 현재 수정이 필요하다는 얘기다. 
  - 위 재귀 호출로 찾아낸 루트를 <u>재귀 호출 후 "돌아오는 과정"에서 대입으로 부모 및 조상들의 루트도 찾은 루트로 같이 제대로 정정을 해준다.</u>
2. *void unionParent(vector\<int>& parent, int a, int b)*
  - 두 정점 `a`, `b`를 같은 부모를 가진 하나의 트리로 병합한다. 
  - 더 작은 값의 부모로 통합한다.
3. *bool find(vector\<int>& parent, int a, int b)*
  - 두 정점 `a`, `b`가 같은 부모를 가졌는지를 확인한다. 
  - True 라면 또 똑같은 `a - b`를 잇는 간선을 추가한다면 사이클이 형성된다. 

<br>

## 🚓 더 자세한건 아래 블로그 참고하기

- 권희정님 블로그 <https://gmlwjd9405.github.io/2018/08/31/algorithm-union-find.html>
- weeklys <https://www.weeklyps.com/entry/%EC%9C%A0%EB%8B%88%EC%98%A8-%ED%8C%8C%EC%9D%B8%EB%93%9C-Unionfind>
  - 두 블로그에 Union-Find 알고리즘 시간 복잡도를 줄이기 위한 최적화 방법이 나와 있다.
- 나동빈님 블로그 <https://blog.naver.com/ndb796/221230967614>


***
<br>

    🌜 개인 공부 기록용 블로그입니다. 오류나 틀린 부분이 있을 경우 
    언제든지 댓글 혹은 메일로 지적해주시면 감사하겠습니다! 😄

[맨 위로 이동하기](#){: .btn .btn--primary }{: .align-right}