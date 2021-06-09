---
published: true
layout: single
title: "[Effective C++] 10. 대입 연산자는 *this의 참조자를 반환하게 하자"
category: effectcpp
tags:
comments: true
sidebar:
  nav: "mainMenu"
---  
*Effective C++ 제 3판 - Chapter 2 - 6*
* * *

c++의 대입 연산은 여러 개가 사슬처럼 엮일 수 있는 재미있는 성질을 가지고 있습니다.

```c++
int x, y, z;
x = y = z = 15;
```

위 코드를 풀어보면 15가 z에 대입되고, 그 대입 연산의 결과가 y에 대입된 후에, y에 대한 대입 연산의 결과가 x에 대입되는 것 입니다.  

이렇게 사슬처럼 엮이려면 대입 연산자가 좌변 인자에 대한 참조자를 반환하도록 구현되어 있겠지요. 이런 구현은 일종의 관례인데, 나름대로 만드는 클래스에서 대입 연산자를 구현한다면 이 관례를 지키는 것이 좋겠지요. 아래의 예제와 같이 말입니다.

```c++
class Widget
{
public:
  ...
  Widget& operator=(const Widget& rhs) // 반환 타입은 현재의 클래스에 대한
  {                                    // 참조자입니다.
    ...
    return *this;
  }
  ...
};
```
<br>
또한 이러한 관례는 단순 대입형 연산자 말고 모든 형태의 대입 연사자에서 지켜야겠지요. 다시 아래의 코드를 봅시다.

```c++
class Widget
{
public:
  ...
  Widget& operator+=(const Widget& rhs)
  {
    ...
    return *this; 
  }

  Widget& operator=(const Widget& rhs)
  {
    ...
    return *this; 
  }

};
```

이러한 관례는 모든 기본제공 타입들이 따르고 있을뿐만 아니라, 표준 라이브러리에 속한 모든 타입에서도 따르고 있습니다. 그러니 굳이 다른 길을 선택하지 말고 *this의 참조자를 반환하도록 만듭시다.

#### ***End Note***
***
- 대입 연산자는 *this의 참조자를 반환하도록 만듭시다.

#### Reference 
***  
- ***Effective C++ (Scott Meyers)***

<body translate="no" oncontextmenu="return false" ondragstart="return false" onselectstart="return false">
  <div id="mouse_no" oncontextmenu="return false" ondragstart="return false" onselectstart="return false">
  </div>
</body>