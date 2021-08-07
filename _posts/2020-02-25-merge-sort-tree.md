---
title: "머지 소트 트리"
date: 2020-02-25 01:43:00
categories:
- medium-Algorithm
tags:
- Segment-Tree
---

### 서론
세그먼트 트리는 분할 정복을 메모이제이션하는 자료구조라고 할 수 있고, 이런 성질을 통해 다양한 문제를 해결할 수 있습니다.<br>
이 글에서는 분할 정복을 이용하는 합병 정렬(Merge Sort)을 메모이제이션하는 Merge Sort Tree와 이것을 이용해 해결할 수 있는 문제들을 다룹니다.

### Merge Sort Tree 구축
머지 소트 트리는 세그먼트 트리의 각 노드에서, 해당 노드가 관리하는 구간에 있는 모든 원소들을 정렬한 상태로 저장하고 있습니다.

{1, 5, 2, 6, 3, 7, 4}를 관리하는 머지소트 트리를 만들면 아래 그림처럼 만들어집니다.<br>
![](https://i.imgur.com/Jl1p6wU.png)

Merge Sort Tree를 구축하는 방법은 간단합니다. 모든 $$i$$에 대해 트리의 $$i$$번째 리프노드에 $$i$$번째 원소를 넣어준 뒤, bottom-up 방식으로 두 노드를 합쳐주면 됩니다.<br>
자식 노드 두 개는 이미 정렬이 되어있기 때문에 C++ STL의 merge 함수로 $$O(N)$$만에 합쳐줄 수 있습니다.

```cpp
#define all(v) v.begin(), v.end()
const int sz = 1 << 17;
vector<T> tree[sz*2];
void add(int x, T v){
  x += sz; tree[x].push_back(v);
}
void build(){
  for(int i=1; i<=n; i++) add(i, a[i]);
  for(int i=sz-1; i; i--){
    tree[i].resize(tree[i*2].size() + tree[i*2+1].size()); //merge함수를 사용하기 위해서는 공간을 미리 할당해야함
    merge(all(tree[i*2]), all(tree[i*2+1]), tree[i].begin()); //정렬된 두 개의 배열을 졍렬된 상태로 병합
  }
}
```
구현은 매우 간단합니다. 이제 이 자료구조를 이용해 해결할 수 있는 문제들을 알아봅시다.

### BOJ13544 수열과 쿼리 3
[문제 링크](http://icpc.me/13544)<br>
[i, j] 구간에서 k보다 큰 원소의 개수를 구하는 문제입니다.

정렬된 배열에서 k보다 큰 원소의 개수를 구하는 방법은 upper_bound를 이용해 쉽게 구할 수 있습니다. 이 방법을 Merge Sort Tree에서도 그대로 적용을 할 수 있습니다.<br>
Merge Sort Tree의 각 노드에 저장되어있는 값들은 모두 정렬이 되어있기 때문에, [i, j]구간에 포함되는 $$O(log N)$$개의 노드에서 각각 upper_bound를 이용해 답을 구해주면 $$O(log^2 N)$$만에 답을 구할 수 있습니다.
```cpp
#define all(v) v.begin(), v.end()

int n, arr[101010];
vector<int> tree[1 << 18];
const int sz = 1 << 17;

void add(int x, int v){
    x |= sz; tree[x].push_back(v);
}
void build(){
  for(int i=1; i<=n; i++) add(i, arr[i]);
    for(int i=sz-1; i; i--){
        tree[i].resize(tree[i*2].size() + tree[i*2+1].size());
        merge(all(tree[i*2]), all(tree[i*2+1]), tree[i].begin());
    }
}

int query(int l, int r, int k){
    l |= sz, r |= sz;
    int ret = 0;
    while(l <= r){
        if(l & 1) ret += tree[l].end() - upper_bound(all(tree[l]), k), l++;
        if(~r & 1) ret += tree[r].end() - upper_bound(all(tree[r]), k), r--;
        l >>= 1, r >>= 1;
    }
    return ret;
}
```

### BOJ11012 egg
[문제 링크](http://icpc.me/11012)<br>
좌표평면에 좌표가 1이상 10만 이하인 정수인 점이 N개 주어질 때, [x1, x2] × [y1, y2] 안에 몇 개의 점이 있는지 구하는 쿼리를 M번 처리하는 문제입니다.

점을 넣을 때는 x좌표를 기준으로 넣을 위치를 정하고, 노드에 저장되어있는 값은 y좌표 기준으로 정렬한 Merge Sort Tree를 생각해봅시다. 이때 x좌표은 좌표압축을 해주는 것이 좋습니다.

x좌표 기준으로 트리에 넣고 y좌표 기준으로 정렬을 했다면, [x1, x2] 구간에 있으면서 y좌표가 y1 이상 y2 이하인 점의 개수를 $$O(log^2 N)$$에 구해줄 수 있습니다.<br>
한 리프 노드에 2개 이상의 점이 있을 수 있기 때문에, 트리를 생성할 때 리프 노드에서도 정렬을 해야합니다.
