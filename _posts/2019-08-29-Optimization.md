---
title: "시간 단축을 위한 다양한 방법"
date: 2019-08-29 01:43:00
categories:
- etc
tags:
- etc
---

시간 단축을 위한 다양한<s>(이상한)</s> 방법<br>
fastio부터 pragma, register까지!

### 목차
1. FastIO
2. pragma 관련
3. register변수
4. 비트 연산

### FastIO
fastio는 이름 그대로 입출력을 **정말 빠르게** 해줍니다. 각종 입출력 방식의 속도를 비교한 글을 한 번 봅시다.<br>
[입력 속도 비교](https://www.acmicpc.net/blog/view/56)<br>
[출력 속도 비교](https://www.acmicpc.net/blog/view/57)

코드를 제대로 짠 경우에는 대부분 stdio.h(cstdio)를 사용하거나 iostream에서 sync를 끊고 tie를 해주면 TLE가 나지 않습니다.<br>
그러나 상수가 작은 O(N<sup>2</sup>)으로 O(N log N)문제를 뚫고싶거나, 시간을 몇 ms라도 줄이고 싶을 때 사용합니다.

[fastio](https://github.com/justiceHui/AlgorithmImplement/blob/master/misc/FastInput.cpp)

### pragma 관련
구글에 pragma 전처리기에 대해 검색을 하면 대부분 pragma pack이나 pragma once같은 것들을 언급합니다. 그러나 이 글에서는 다른 것에 초점을 맞춥니다.

코드포스같은 곳에서 상위권 랭커들의 코드를 보면 아래와 같은 것을 자주 볼 수 있습니다.
```cpp
#pragma GCC optimize("O3")
#pragma GCC optimize("Ofast")
#pragma GCC optimize("unroll-loops")
```
저게 과연 뭘까요?

대부분의 온라인저지는 기본적으로 O2 옵션으로 컴파일합니다. 프로그램 실행 속도를 향상시키도록 컴파일러가 최적화를 해주지만, 코드의 크기가 너무 커지지 않는 선에서만 최적화를 합니다.

`#pragma GCC optimize("O3")` 를 써주면 gcc(g++)로 컴파일하는 온라인저지에서 강제로 O3로 컴파일하도록 합니다. O3는 코드의 크기는 신경쓰지 않은 채, 수행 시간 향상을 위한 최적화를 모두 수행합니다.<bR>
그러나 O3가 O2보다 항상 빠르다고 할 수는 없습니다. 경우에 따라 더 느려지기도 합니다.

비슷하게, `#pragma GCC optimize("Ofast")`는 Ofast로 컴파일하도록 합니다. Ofast는 GCC 4.7에 추가되었으며, O3에서 사용하는 모든 최적화에 몇 가지 추가적인 최적화를 수행합니다.<br>
O3와 마찬가지로 O2보다 Ofast가 항상 빠르다고 할 수는 없습니다.

저는 아슬아슬하게 TLE가 나면 Ofast 넣어보고 안 되면 코드를 갈아엎는 방식을 주로 사용합니다.

unroll-loops는 [이 글](http://z3moon.com/%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%B0%8D/loop_unrolling)에 자세하게 나와있습니다.

### register 변수
int형 변수 x는 보통 아래와 같이 선언합니다.
```cpp
int x;
```
변수를 선언할 때 앞에 **register** 라는 키워드를 붙이면 변수는 RAM 대신 CPU의 레지스터를 사용합니다. 따라서 변수에 접근하는 속도가 다른 일반적인 변수보다 빨라집니다.
```cpp
register int x;
```
단, 레지스터의 개수는 한정되어 있으므로 register키워드를 붙인다고 해서 모두 레지스터를 사용하지는 않습니다.

많이 접근하는 변수에 사용할수록 효율이 좋아지기 때문에, 보통 반복문에서 많이 사용합니다.
```cpp
for(register int i=0; i<N; i++){
  for(register int j=0; j<N; j++){
    //do something
  }
}
```

### 비트 연산
비트 연산은 정말 빠릅니다. 덧셈/뺄셈은 비트 연산보다 조금 느리고, 곱셈/나눗셈은 더 느립니다. 그러면, 곱셈/나눗셈을 비트 연산으로 바꾸면 더 빨라지겠지요.

세그먼트 트리를 반복문을 이용해 구현해봅시다.
```cpp
int base;
int tree[404040];

void init(int n){
  for(base=1; base<=n; base*=2);
}

void update(int x, int v){
  x += base; tree[x] = v;
  while(x /= 2){
    tree[x] = tree[x*2] + tree[x*2+1];
  }
}

int query(int l, int r){
  l += base, r += base;
  int ret = 0;
  while(l <= r){
    if(l % 2 == 1) ret += tree[l++];
    if(r % 2 == 0) ret += tree[r--];
    l /= 2, r /= 2;
  }
  return ret;
}
```
위 코드에는 곱셈과 나눗셈, 그리고 덧셈이 많이 사용됩니다. 몇몇 부분을 수정해봅시다.

init함수의 for문에서 base에 계속 2를 곱해줍니다. 2를 곱한다는 것은 비트를 왼쪽으로 한 칸 미는 것과 똑같습니다. 아래와 같이 init코드를 바꿔줄 수 있습니다.
```cpp
void init(int n){
  for(base=1; base<=n; base<<=1);
}
```
update함수를 봅시다.<bR>
base는 리프노드의 개수 n보다 큰 2의 멱수입니다. 이진법으로 나타내면 100...000 꼴입니다. 그러므로 n보다 작거나 같은 x에 base를 더해주는 것 대신 x에 base를 or해줄 수 있습니다.<br>
x를 2로 나누는 것은 비트를 오른쪽으로 미는 것과 같은 결과가 나옵니다.<br>
x에 2를 곱하는 것은 왼쪽으로 비트를 한 칸 밀면 됩니다. 비트를 한 칸 밀게 되면 가장 오른쪽 비트는 0입니다. 그러므로 x에 2를 곱하고 1을 더해주는 것은 왼쪽으로 비트를 한 칸 밀고 1을 or해준 것과 같습니다.<br>
update함수를 수정해봅시다.
```cpp
void update(int x, int v){
  x |= base; tree[x] = v;
  while(x >> 1){
    tree[x] = tree[x << 1] + tree[x << 1 | 1];
  }
}
```
마지막으로 query함수를 봅시다.<br>
l과 r 모두 n이하의 자연수이기 때문에 base를 더하는 것 대신 or을 해줄 수 있습니다.<br>
while문에서 l이 홀수인지, r이 짝수인지 확인하는 부분이 있습니다.<br>
l이 홀수라면 마지막 비트는 1이 나옵니다. `l & 1`로 대체할 수 있습니다.<br>
r이 짝수라면 마지막 비트는 0이 나옵니다. r이 짝수일 때 r의 모든 비트를 반전시키면 마지막 비트는 1이 나옵니다. `~r & 1`로 대체할 수 있습니다.<br>
2로 나누는 것은 오른쪽으로 한 칸 미는 것과 같습니다.<br>
query함수를 수정해봅시다.
```cpp
int query(int l, int r){
  l |= base; r |= base;
  int ret = 0;
  while(l <= r){
    if(l & 1) ret += tree[l++];
    if(~r & 1) ret += tree[r--];
    l >>= 1, r >>= 1;
  }
  return ret;
}
```
