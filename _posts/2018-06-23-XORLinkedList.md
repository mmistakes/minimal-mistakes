---
title:  "XOR연산을 이용한 메모리 최적화 연결리스트"
date:   2018-06-23 15:12:00
categories:
- Other-Algorithm
tags:
- Linked-List
---

이번 글은 이중 연결리스트의 메모리 차지를 최적화하는 기법을 다룰 것 입니다.

학교 정보올림피아드 준비반에서 연구과제로 나온 기법이고, 과제를 하면서 얻은 지식을 간단하게 여기에 공유하고자 합니다.

기존의 이중 연결리스트는 보통 다음과 같은 형태를 갖습니다.
```cpp
struct Node{
    int data;
    Node* prevptr;
    Node* nextptr;
};
```

하지만 xor연산의 성질을 이용하면 다음과 같이 만들 수 있습니다.
```cpp
struct Node{
    int data;
    Node* ptrdiff;
};
```
ptrdiff 에는 prevptr ^ nextptr 의 값이 들어갑니다.

이 것을 구현하기 위한 핵심적인 xor연산의 성질은 다음과 같습니다.<br>
(X xor Y) xor Y = X<br>
(X xor Y) xor X = Y<br>
이 성질을 이용해서 이전 노드와 다음 노드의 주소를 구하면,
```cpp
Node* getPrev(Node* now, Node* next){
    return (Node*)( (long long int)now->ptrdiff ^ (long long int)next );
}

Node* getNext(Node* prev, Node* now){
    return (Node*)( (long long int)prev ^ (long long int)now->ptrdiff );
}
```
생각보다 쉽게 구할 수 있습니다.

이전 노드, 다음 노드에 접근하는 것을 제외한다면, 일반적인 이중 연결리스트와 구현 방식이 거의 유사하므로 설명은 생략하겠습니다.

참고로, 이 기법은 2004년에 https://www.linuxjournal.com/article/6828?page=0,0 에서 소개가 되었습니다. 위 링크에 들어가서 글을 읽어보는 것도 좋은 방법인 것 같습니다.

직접 제작한 C++ template은 제 github에 있습니다.<br>
https://github.com/justiceHui/XORLinkedList
