---
published: true
layout: single
title: "[Effective C++] 17. new로 생성한 객체를 스마트 포인터에 저장하는 코드는 별도의 한 문장으로 만들자"
category: effectcpp
tags:
comments: true
sidebar:
  nav: "mainMenu"
---  
*Effective C++ 제 3판 - Chapter 3 - 5*
* * *

처리 우선순위를 알려 주는 함수가 하나 있고, 동적으로 할당한 Widget 객체에 대해 어떤 우선순위에 따라 처리를 적용하는 함수가 하나 있다고 가정합시다.

```c++
/* 우선순위를 int type으로 반환 */
int GetPriority();

/* 우선순위 priority를 인자로 넣어서 우선 순위에 따라 widget이 동작 */
int processWidget(std::shared_ptr<Widget> pw, int priority); 
```

자, 이렇게 만들어진 processWidget 함수를 호출해보겠습니다.

```c++
processWidget(std::shared_ptr<Widget>(new Widget()), GetPriority());
```

자 여기에서 문제점을 찾아보도록 합시다. 이 코드는 겉보기엔 아무런 문제가 없지만 Leak이 발생할 가능성을 숨기고 있습니다. 어째서 그런 것인지 하나씩 풀어보도록 합시다.  

processWidget의 함수 호출이 이루어지기 전에 컴파일러는 다음의 세 가지 연산을 위한 코드를 만들어야합니다.

- "GetPriority()"를 호출합니다
- "new Widget()"을 실행합니다.
- "std::shared_ptr" 생성자를 호출합니다.

그런데 여기서, 각각의 연산이 이루어지는 순서는 컴파일러 제작사마다 다르다는 것이 문제입니다. 만약 아래와 같은 순서로 진행하도록 제작된 컴파일러의 경우 어떤 문제가 발생할까요?

- 1) "new Widget()"을 실행합니다.
- 2) "GetPriority()"를 호출합니다
- 3) "std::shared_ptr" 생성자를 호출합니다.

만약 2번에서 예외가 발생했다면 어떻게 될까요? 1번에서 할당한 포인터가 유실되어 Leak이 발생하게 될 것 입니다.  

이런 문제를 피하는 방법은 간단합니다. Widget을 생성해서 스마트 포인터에 저장하는 코드를 별도의 문장 하나로 만들고, 그 스마트 포인터를 processWidget에 넘기는 것 입니다.

```c++
std::shared_ptr<Widget> p_Widget(new Widget());
processWidget(p_Widget, GetPriority());
```

#### ***End Note***
***
- new로 생성한 객체를 스마트 포인터로 넣는 코드는 별도의 한 문장으로 만듭시다. 이것이 안 되어 있으면, 예외가 발생될 때 디버깅하기 힘든 자원 누출이 초래될 수 있습니다.

#### Reference 
***  
- ***Effective C++ (Scott Meyers)***

<body translate="no" oncontextmenu="return false" ondragstart="return false" onselectstart="return false">
  <div id="mouse_no" oncontextmenu="return false" ondragstart="return false" onselectstart="return false">
  </div>
</body>