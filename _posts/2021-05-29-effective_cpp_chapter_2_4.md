---
published: true
layout: single
title: "[Effective C++] 8. 예외가 소멸자를 떠나지 못하도록 붙들어 놓자"
category: none_effectcpp
tags:
comments: true
sidebar:
  nav: "mainMenu"
---  
*Effective C++ 제 3판 - Chapter 2 - 4*
* * *

소멸자로부터 예외가 터져 나가는 경우를 C++에서 막고 있지는 않지만, 실제로 발생하는 상황을 보면 막아야 합니다. 아래 예를 보시죠.

```c++
class Widget
{
public:
    ...
    ~Widget() {...} // 이 소멸자에서 예외가 발생
};

void dosomething()
{
    std::vector<Widget> vec;
    ...
}
```

vector 타입의 객체 vec가 소멸될 때, 거느리고 있는 Widget들 전부를 소멸시킬 책임은 벡터에 있겠지요. 그런데 vec에 들어있는 Widget이 총 10개라고 할 때, 첫번째 Widget을 소멸시키는 도중에 예외가 발생했다고 가정합시다. 그리고 나머지 아홉개는 여전히 소멸되어야 하는 상황인데, vec은 이들에 대해 소멸자를 호출해야겠지요.  

그리고 이 과정에서 또 문제가 발생했다고 가정해봅시다. 현재 활성화된 예외가 최소 2개 이상 만들어진 상태인데, C++ 2개 이상의 예외가 동시에 발생한 상황에서 조건이나 상황에 따라 프로그램이 종료되거나, 정의되지 않은 동작을 할 것 입니다. 이것은 다른 vector뿐만 아니라 다른 STL도 마찬가지이며 배열도 예외는 아닙니다.  

완전하지 못한 프로그램 종료나 미정의 동작의 원인은 바로 예외가 터져 나오는 것을 내버려 두는 소멸자에게 있습니다. 즉, 컨테이너나 배열을 쓰지 않아도 마찬가지 입니다. **C++는 예외를 내보내는 소멸자를 싫어합니다**

#### 

<body translate="no" oncontextmenu="return false" ondragstart="return false" onselectstart="return false">
  <div id="mouse_no" oncontextmenu="return false" ondragstart="return false" onselectstart="return false">
  </div>
</body> 