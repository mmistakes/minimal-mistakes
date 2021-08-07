---
title: "Dynamic Segment Tree"
date: 2020-02-28 11:52:00
categories:
- Medium-Algorithm
tags:
- Segment-Tree
---


### 서론
평범하게 세그먼트 트리를 구현하면 공간복잡도는 O(N)입니다. 이런 문제를 생각해봅시다.<br>
0으로 초기화된 길이 N인 수열이 있을 때, 수 하나를 변경하는 쿼리와 구간의 합을 구하는 쿼리가 총 Q개 주어집니다. 이때 N ≤ 1,000,000,000이고 Q ≤ 100,000이고, 쿼리가 들어올 때마다 해당 쿼리에 대한 답을 내야 합니다.(온라인 쿼리)

만약 N이 100만정도로 작다면 세그먼트 트리를 이용해 쉽게 풀 수 있는 문제입니다. 그러나 이 문제에서는 N이 최대 10억으로 매우 크기 때문에 세그먼트 트리를 만들 수 없습니다. 동적 세그먼트 트리는 세그먼트 트리의 메모리 사용량을 줄여주는 테크닉입니다.<br>
메모리 최적화가 아니더라도, 동적 세그먼트 트리의 구현 방법을 알고 있다면 세그먼트 트리의 개념을 응용하는 다른 자료구조를 구현할 때 훨씬 수월하게 할 수 있습니다. (Persistent Segment Tree, Li-Chao Tree 등)

### 아이디어
원소 하나를 변경하는 쿼리를 생각해봅시다. 아래 그림에서 초록색 정점이 담당하는 원소를 바꾸는 경우, 노란색 정점들의 값만 바꿔주면 됩니다.<br>
![](https://i.imgur.com/4RXq0Ku.png)

파란색 정점이 담당하는 원소를 바꾸는 경우, 회색 정점들의 값만 바꿔주면 됩니다.<br>
![](https://i.imgur.com/tXTOdTg.png)

어차피 사용하지 않은 정점들은 0으로 초기화 되어있기 때문에, 색칠하지 않은 정점들은 굳이 필요 없다는 사실을 알 수 있습니다.<br>
![](https://i.imgur.com/QacnsGt.png)

이 상태에서 만약 빨간색 정점이 담당하는 위치를 변경하고 싶다면, 그 정점까지 가는 길에 있는 정점들을 할당해주면 됩니다.<br>
![](https://i.imgur.com/7QMs8v9.png)

이런식으로 정점이 필요할 때 할당해주고 안 쓰이는 정점들은 아예 생성을 안 하는 방식으로 세그먼트 트리를 구축해주면, 각 쿼리마다 최대 O(log N)개의 정점을 생성하게 되며 공간 복잡도는 O( min(Q log N, N) )이 됩니다.<Br>
동적 세그먼트 트리는 보통 N이 매우 큰 경우에 사용하기 때문에 O(Q log N)이라고 봐도 무방합니다.

### 구현
크게 두 가지 방법으로 분류합니다. 포인터 기반으로 동적 할당을 해주는 방법이 있고, O(Q log N)개 정도의 정점을 배열로 선언해서 포인터 대신 인덱스를 사용하는 방법이 있습니다.<br>
두 가지 방법을 혼합해서 정점들을 vector에 저장해서 인덱스를 이용하는 방법도 있습니다.

포인터 기반, 인덱스 기반 구현 모두 기본적인 방법은 동일합니다.<br>
존재하지 않는 정점의 값을 바꾸는 경우, 새로운 정점을 배정해주는 것만 잘 처리해주면 일반적인 세그먼트 트리와 비슷하게 구현할 수 있습니다.

아래 코드들은 구간합을 구하는 코드입니다.

### 포인터 기반 구현
x번째 값을 v로 바꾸고 싶은 경우에는 update(root, 구간의 시작, 구간의 끝, x, v)를 호출하고, l부터 r번째까지의 합을 구하고 싶은 경우에는 query(root, 구간의 시작, 구간의 끝, l, r)을 호출해주면 됩니다.
```cpp
typedef long long ll;
struct Node{
    Node *l, *r; //양쪽 자식
    ll v; //구간 합
    Node(){ l = r = NULL; v = 0; }
} *root; //root 동적할당 필수!

void update(Node *node, int s, int e, int x, int v){
    if(s == e){ //리프 노드
        node->v = v; return;
    }
    int m = s + e >> 1;
    if(x <= m){
      //왼쪽 자식이 없는 경우 동적 할당
        if(!node->l) node->l = new Node();
        update(node->l, s, m, x, v);
    }else{
        //오른쪽 자식이 없는 경우 동적 할당
        if(!node->r) node->r = new Node();
        update(node->r, m+1, e, x, v);
    }
    ll t1 = node->l ? node->l->v : 0;
    ll t2 = node->r ? node->r->v : 0;
    node->v = t1 + t2;
}
ll query(Node *node, int s, int e, int l, int r){
    if(!node) return 0; //없는 노드
    if(r < s || e < l) return 0;
    if(l <= s && e <= r) return node->v;
    int m = s + e >> 1;
    return query(node->l, s, m, l, r) + query(node->r, m+1, e, l, r);
}
```

### 인덱스 기반 구현
x번째 값을 v로 바꾸고 싶은 경우에는 update(0, 구간의 시작, 구간의 끝, x, v)를 호출하고, l부터 r번째까지의 합을 구하고 싶은 경우에는 query(0, 구간의 시작, 구간의 끝, l, r)을 호출해주면 됩니다.
```cpp
typedef long long ll;
struct Node{
    int l, r; //양쪽 자식 정점 인덱스
    ll v; //구간 합
    Node(){ l = r = -1; v = 0; }
};
Node nd[4040404]; //적당한 양 할당
//nd[0]를 루트로 잡자.
int pv = 1; //현재 pv개의 정점을 사용했음

void update(int node, int s, int e, int x, int v){
    if(s == e){
        nd[node].v = v; return;
    }
    int m = s + e >> 1;
    if(x <= m){
        if(nd[node].l == -1) nd[node].l = pv++;
        update(nd[node].l, s, m, x, v);
    }else{
        if(nd[node].r == -1) nd[node].r = pv++;
        update(nd[node].r, m+1, e, x, v);
    }
    ll t1 = nd[node].l != -1 ? nd[nd[node].l].v : 0;
    ll t2 = nd[node].r != -1 ? nd[nd[node].r].v : 0;
    nd[node].v = t1 + t2;
}

ll query(int node, int s, int e, int l, int r){
    if(node == -1) return 0;
    if(r < s || e < l) return 0;
    if(l <= s && e <= r) return nd[node].v;
    int m = s + e >> 1;
    return query(nd[node].l, s, m, l, r) + query(nd[node].r, m+1, e, l, r);
}
```
