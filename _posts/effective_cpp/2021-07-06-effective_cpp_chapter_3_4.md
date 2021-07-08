---
published: true
layout: single
title: "[Effective C++] 16. new 및 delete를 사용할 때는 형태를 반드시 맞추자"
category: effectcpp
tags:
comments: true
sidebar:
  nav: "mainMenu"
---  
*Effective C++ 제 3판 - Chapter 3 - 4*
* * *

아래의 코드에서 문제점을 찾아볼까요?

```c++
std::string *stringArray = new std::string[100];
...
delete stringArray
```

언뜻보면 문제가 없는 코드 같지만 delete 표현식을 쓸 경우에는 유의할 것이 있습니다. delete 연산자를 사용할 때 다음의 2가지 내부 동작이 수행됩니다.

- 할당된 메모리에 대한 1개 이상의 소멸자가 호출
- 그리고 그 후에 메모리가 해제

자 여기서 질문! 그렇다면 delete 연산자가 적용되는 객체는 몇개 일까요?, 답은 소멸자가 호출되는 횟수가 됩니다.

자 좀 더 풀어서 얘기해봅시다. 그러면 삭제되는 포인터는 객체 하나만 가리킬까요, 아니면 객체의 배열을 가리킬까요? 이것이 진짜 핵심인데, 왜냐하면 단일 객체의 메모리 배치구조는 객체 배열에 대한 메모리 배치 구조와 다르기 때문입니다.  

특히, 배열을 위해 만들어지는 힙 메모리에는 대개 배열원소의 개수가 박혀 들어간다는 점이 결정적인데, 이 때문에 delete 연산자는 소멸자가 몇 번 호출될지를 쉽게 알 수 있답니다.  

그렇다면 delete 연산자는 어떻게 배열 크기 정보가 있다는 것을 알 수 있을까요? 어떤 포인터에 대해 delete를 적용할 때, delete 연산자로 하여금 배열 크기 정보가 있다는 것을 알려줄 칼자루는 여러분이 쥐고 있습니다. 바로 delete 연산자 뒤에 []를 붙여주는 것 입니다.

#### ***End Note***
***
- new 표현식에 []를 썼으면, 대응되는 delete 표현식에도 []를 써야 합니다. 마찬가지로 new 표현식에 []를 안썼으면, 대응되는 delete 표현식에도 []를 쓰지 말아야 합니다.

#### Reference 
***  
- ***Effective C++ (Scott Meyers)***

<body translate="no" oncontextmenu="return false" ondragstart="return false" onselectstart="return false">
  <div id="mouse_no" oncontextmenu="return false" ondragstart="return false" onselectstart="return false">
  </div>
</body>