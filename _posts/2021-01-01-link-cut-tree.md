---
title: "Link Cut Tree"
date: 2021-01-01 18:18:00
categories:
- Hard-Algorithm
tags:
- LCT
---

Splay Tree를 모른다면 아래 4개의 글을 먼저 읽어주세요.
* [Splay Tree - 1](/hard-algorithm/2018/11/12/SplayTree1/)
* [Splay Tree - 2](/hard-algorithm/2018/11/13/SplayTree2/)
* [Splay Tree - 3](/hard-algorithm/2019/10/22/SplayTree3/)
* [Splay Tree - 4](/hard-algorithm/2019/10/23/SplayTree4/)

### 서론

Link Cut Tree는 Rooted Tree의 집합, 즉 Forest를 관리하는 자료구조로 다양한 연산을 지원합니다.

* Link(par, ch): par와 ch를 연결하는 간선을 만듭니다.
* Cut(x): x와 x의 부모 정점을 연결하는 간선을 끊습니다.
* FindRoot(x): x가 포함된 트리의 루트 정점을 찾습니다.
* FindLCA(x, y): x와 y의 LCA를 구합니다.
* PathQuery(x, y): x에서 y로 가는 경로에 쿼리를 날립니다.

PathQuery를 보니 Heavy-Light Decomposition 느낌이 납니다.<br>Link Cut Tree도 Heavy-Light Decomposition처럼 트리를 여러 개의 Chain으로 나눠서 관리합니다. 다만 HLD는 Heavy Chain이 변하지 않는 반면, LCT는 간선 삽입/삭제 쿼리가 존재하기 때문에 Chain을 동적으로 관리해야 합니다. LCT는 간선을 끊고 붙이면서 Chain을 동적으로 잘 관리하는 자료구조입니다.

HLD는 문제 상황에 맞게 누적합 배열, 세그먼트 트리 등의 자료구조를 이용해 Chain을 관리합니다. LCT에서는  Splay Tree를 이용해 Chain을 관리합니다.

아래 그림은 실제 트리와 그 트리가 Link Cut Tree에서 저장되는 형태를 나타낸 그림입니다.

![](https://i.imgur.com/mu50CMz.png)![](https://i.imgur.com/g6oNPgS.png)
> 이미지 출처: https://imeimi.tistory.com/27

굵은 선분으로 표시된 경로가 Chain이며, 각 Chain은 Splay Tree를 이용해서 관리합니다.<br>점선으로 표시된 간선을 Preferred Edge라고 하며, 부모 정점으로 올라가는 방향으로 연결되었지만 반대 방향으로는 연결되어있지 않은 것이 특징입니다.

이제, Link Cut Tree를 이용해 다양한 연산을 수행해봅시다.

### 정점 구조체 / Splay Tree

```cpp
struct Node{
    Node *l, *r, *p; /// Child, Parent Pointer
    int sz;          /// (splay) subtree size
    ll v, sum;
    bool flip;
    Node() : Node(0) {}
    Node(ll v) : v(v), sum(v) { l = r = p = nullptr; sz = 1; flip = false; }
    bool IsRoot() const { return !p || (this != p->l && this != p->r); } /// splay root?
    bool IsLeft() const { return this == p->l; }                         /// left child?
    void Rotate(){ /// move this to p
        if(IsLeft()){
            if(r) r->p = p;
            p->l = r; r = p;
        }
        else{
            if(l) l->p = p;
            p->r = l; l = p;
        }
        if(!p->IsRoot()) (p->IsLeft() ? p->p->l : p->p->r) = this;
        auto t = p; p = t->p; t->p = this;
        t->Update(); Update();
    }
    void Update(){ /// Update info
        sz = 1; sum = v;
        if(l) sz += l->sz, sum = sum + l->sum;
        if(r) sz += r->sz, sum = sum + r->sum;
    }
    void Update(ll val){
        v = val; Update();
    }
    void Push(){ /// for lazy propagation

    }
};
/// move x to (splay) root
void Splay(Node *x){
    for(; !x->IsRoot(); x->Rotate()){
        if(!x->p->IsRoot()) x->p->p->Push();
        x->p->Push(); x->Push();
        if(x->p->IsRoot()) continue;                      // zig-step
        if(x->IsLeft() == x->p->IsLeft()) x->p->Rotate(); // zig-zag step
        else x->Rotate();                                 // zig-zig step
    }
    x->Push();
}
```

`Node::flip`, `void Node::Push()`는 뒤에서 다룰 Lazy Propagation을 위해 미리 작성한 것입니다.

다른 부분은 모두 Splay Tree와 똑같은데 `bool Node::IsRoot()`만 약간 다릅니다. 만약 Splay Tree의 루트 정점에서 위로 올라가는 Preferred Edge가 있다면 `p`가 `nullptr`가 아닐 수 있습니다. 그러한 경우를 함께 처리해야 합니다.

### Access 연산

Splay Tree에서 하는 모든 연산은 Splay 연산에서 시작됩니다. Link Cut Tree의 모든 연산은 Access 연산에서 시작합니다. Splay 연산과 비슷하게, Access 연산의 시간 복잡도도 amortized $O(\log N)$이라서 Link Cut Tree의 많은 연산이 amortized $O(\log N)$에 동작합니다.

`Access(x)` 연산은 매개변수로 주어진 정점 `x`​를 루트와 Chain으로 묶고, `x`를 Splay Tree의 루트 정점으로 만드는 역할을 합니다.

```cpp
/// make chain x to (lct) root
void Access(Node *x){
    Splay(x); x->r = nullptr; // un-tie lower node
    for(; x->p; Splay(x)) Splay(x->p), x->p->r = x; // tie upper node
}
```

코드를 보면, 일단 `x`를 Splay합니다. 그러면 `x`보다 아래에 있는 정점은 모두 `x`의 오른쪽 서브 트리에 모이게 됩니다. `x->r`을 `nullptr`로 만든다는 것은, 현재 `x`가 속한 Chain에서 `x`보다 밑에 있는 정점을 떼어낸다는 것을 의미합니다.<br>이후, Preferred Edge를 따라가면서 루트까지 한 Chain으로 연결해줍니다.

### Link / Cut 연산

`Link(p, c)` 연산은 `c`의 부모 정점을 `p`로 만들어주는 역할을 수행합니다. 단, 이때 `c` 는 현재 자신이 속한 트리의 루트 정점이어야 합니다.

> 그렇지 않은 경우에 `Link`연산을 수행하고 싶다면 아래 Lazy Propagation 문단을 참고하세요.

```cpp
/// link (lct) node p and c
void Link(Node *p, Node *c){
    Access(c); Access(p); // p and c is root of own splay tree
    c->l = p; p->p = c;   // p -> c
}
```

코드를 보면, 일단 `p`와 `c`를 각각 루트 정점과 Chain으로 묶고, Splay Tree의 루트로 만들어줍니다. 그러면 현재 `c`는 루트 정점이기 때문에, `c->l`은 `nullptr`가 됩니다.<br>이후 `c->l = p, p->p = c`를 수행하는 것으로 두 정점을 연결하게 됩니다.

`Cut(x)` 연산은 `x`와 `x`의 부모 정점을 연결하는 간선을 제거하는 역할을 수행합니다.

```cpp
/// cut (lct) node x and par(x)
void Cut(Node *x){
    Access(x); // x->l == par(x), x->l->p == x
    x->l->p = nullptr;
    x->l = nullptr;
}
```

`x`에 Access하면 `x`에서 루트로 가는 경로가 Chain으로 묶이고  `x`가 Splay Tree의 루트가 되기 때문에, `x`의 조상은 모두 `x`의 왼쪽 서브 트리에 있습니다.<br>`x`와 `x->l`의 연결을 제거하는 것으로 `Cut` 연산을 구현할 수 있습니다.

### GetRoot / GetParent / GetDepth 연산

`GetRoot(x)` 연산은 `x`가 속한 트리의 루트 정점을 찾는 연산입니다. `x`에 Access한 다음 가장 위에 있는 정점을 찾으면 됩니다.

```cpp
/// get (lct) root node on tree
Node* GetRoot(Node *x){
    Access(x);            // make chain to root
    while(x->l) x = x->l; // get top node
    Splay(x);             // amortized
    return x;
}
```

`GetParent(x)` 연산은 `x`의 부모 정점을 찾는 연산입니다. `x`에 Access 한 뒤, Splay Tree 상에서 `x`의 Predecessor를 구하면 됩니다.

```cpp
/// get (lct) par(x)
Node* GetPar(Node *x){
    Access(x);                      // make chain to root
    if(!x->l) return nullptr;       // x is root
    x = x->l; while(x->r) x = x->r; // get predecessor
    Splay(x);                       // amortized
    return x;
}
```

`GetDepth(x)` 연산은 `x`의 깊이를 구하는 연산입니다. `x`에 Access하면 `x`의 왼쪽 서브트리에 `x`의 조상이 모두 모이게 됩니다. 왼쪽 서브트리의 크기를 반환하면 됩니다.

```cpp
/// get (lct) dep(x)
int GetDepth(Node *x){
    Access(x);                // make chain to root
    if(x->l) return x->l->sz; // left subtree
    return 0;
}
```

### GetLCA

`GetLCA(x, y)` 연산은 두 정점 `x`, `y`의 LCA를 구하는 연산으로, 당연히 두 정점은 같은 트리에 속해야 합니다.

```cpp
/// get (lct) LCA of u and v
Node* GetLCA(Node *x, Node *y){
    Access(x); Access(y); Splay(x);
    return x->p ? x->p : x; // is preferred edge exist?
}
```

`x`에 Access한 뒤 `y`에 Access하면, `x`부터 LCA 이전까지 한 Chain으로 묶이고, `y`부터 루트까지 한 Chain으로 묶이게 됩니다.<br>이때 `x`를 Splay해주면 `x`와 LCA가 Preferred Edge로 연결됩니다. Preferred Edge가 존재하면 `x->p`를 반환하면 되고, 존재하지 않는다면 `x` 자신이 LCA가 되므로 `x`를 반환하면 됩니다.

### (정점 쿼리) Point Update / Path Query

> 간선에 대한 쿼리는 뒤에서 다룹니다.

```cpp
ll VertexQuery(Node *x, Node *y){
    Node *l = GetLCA(x, y);
    ll ret = l->v;
    Access(x); Splay(l); // (x to before l) == l->r
    if(l->r) ret = ret + l->r->sum;

    Access(y); Splay(l); // (y to before l) == l->r
    if(l->r) ret = ret + l->r->sum;
    return ret;
}

void Update(Node *x, ll val){
    Splay(x); x->Update(val);
}
```

Point Update는 업데이트할 정점을 Splay하고 값을 수정한 뒤 Update를 호출하면 됩니다.

Path Query는 LCA, (`x`부터 LCA 이전), (`y`부터 LCA 이전), 총 3가지 부분으로 나눠서 처리합니다.<br>`x`에 Access하고 LCA를 Splay하면, `x`부터 LCA 바로 전까지 가는 경로가 LCA의 오른쪽 서브트리로 묶이게 됩니다. 이 부분은 Splay Tree에서 Range Query를 하는 것처럼 하면 됩니다.

##### BOJ 17033 Cow Land

Point Update / Path xor Query 문제입니다. [정답 코드](http://boj.kr/f3063df9fd19404d9e2e602223089d7b)

### ReRooting 연산 / Path Update

`MakeRoot(x)` 연산은 `x`를 트리의 루트로 만드는 연산입니다.

```cpp
void MakeRoot(Node *x){
    Access(x); Splay(x);
    x->flip ^= 1;
}
void Node::Push(){
    if(!flip) return;
    swap(l, r);
    if(l) l->flip ^= 1;
    if(r) r->flip ^= 1;
    flip = 0;
}
```

`x`에 Access하면 `x`와 루트가 같은 Chain으로 묶이게 됩니다. 이 Chain에서 가장 위에 있는 정점은 루트, 가장 아래에 있는 정점은 `x`입니다.<br>이때 Splay Tree를 뒤집어주면 `x`가 맨 위로 가기 때문에 `x`가 루트가 됩니다. Splay Tree를 뒤집는 것은 Lazy Propagation을 이용하면 됩니다.

`PathUpdate(x, y, val)`은 `x`에서 `y`로 가는 경로 위에 있는 정점에 `val`을 더하는/빼는/곱하는/... 연산입니다. 아래 코드는 `val`을 더하는 코드입니다.

```cpp
void PathUpdate(Node *x, Node *y, ll val){
    Node *root = GetRoot(x); // original root
    MakeRoot(x); Access(y);  // make x to root, tie with y
    Splay(x); x->lz += val; x->Push();
    MakeRoot(root);          // Revert
}

void Node::Push(){
    Update(v + lz);
    if(l) l->lz += lz;
    if(r) r->lz += lz;
    lz = 0;
    if(flip){
        swap(l, r);
        if(l) l->flip ^= 1;
        if(r) r->flip ^= 1;
        flip = 0;
    }
}
```

`x`를 루트로 설정한 뒤 `y`에 Access하면 `x`에서 `y`로 가는 경로가 한 Chain으로 묶입니다. 이때 Splay Tree의 루트 정점에 lazy 값을 주면 됩니다. 물론, 다시 루트를 원래대로 돌려놓아야 합니다.

##### BOJ 15480 LCA와 쿼리

ReRooting하고 LCA를 구하는 문제입니다. [정답 코드](http://boj.kr/1d05379afeb444508126ed535ec6428f)

##### BOJ 5916 농장 관리

경로에 1 더하고, 경로의 합을 구하는 문제입니다. 간선에 대한 쿼리라서 LCA를 잘 처리해야 합니다. [정답 코드](http://boj.kr/a8193d4fcb4f406689d91498ea6b5f6d)

### 간선 쿼리

ReRooting이 없다면 BOJ 5916 농장 관리처럼 LCA만 빼놓고 처리하면 됩니다. ReRooting이 있다면 간선을 나타내는 정점을 추가해, 정점이 2N-1개인 트리를 관리하면 됩니다. 기존의 정점에는 연산의 항등원을 주고, 간선을 나타내는 정점에 값을 저장하면 됩니다.

##### BOJ 13510 트리와 쿼리 1

간선 업데이트, 경로 최댓값 쿼리 문제입니다. [정답 코드](http://boj.kr/9fd5f42fe7304b7f9e370813313409f2)
