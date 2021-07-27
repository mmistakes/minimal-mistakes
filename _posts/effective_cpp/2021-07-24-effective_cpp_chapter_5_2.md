---
published: true
layout: single
title: "[Effective C++] 27. 캐스팅은 절약, 또 절약! 잊지 말자"
category: effectcpp
tags:
comments: true
sidebar:
  nav: "mainMenu"
---  
* * *

#### C와 C++의 casting 연산자
***

먼저 C++에서 사용 가능한 casting 연산자에 대해 알아 봅시다.

##### C casting 연산자 (구형 스타일의 캐스팅)
- (T) 표현식
- 표현식(T)

```c++
int x = 4;
double y = (double)x;
double z = double(4);
```

##### C++ casting 연산자
- const_cast<T>(표현식) : 객체의 상수성(constness)으 없애는 용도로 사용됩니다. 이런 기능을 가진 캐스트는 유일합니다.
- dynamic_cast<T>(표현식) : 주어진 객체가 어떤 클래스 상속 계통에 속한 특정 타입인지 아닌지를 결정하는 작업에 쓰입니다. 런타임 비용이 높은 캐스트 연산입니다.
- reinterpret_cast<T>(표현식) : 포인터를 int로 바꾸는 등의 하부 수준 캐스팅을 위해 만들어진 연산자 입니다. 하부 수준의 코드 외에는 거의 없어야 합니다.
- static_cast<T>(표현식) : 암시적 변환을 강제로 진행할 때 사용 됩니다. 물론 상수 객체를 비상수 객체로 캐스팅하는데 이것을 쓸 수는 없습니다.

대부분의 경우, C++ casting을 사용하는 것이 좋습니다. 코드의 문제점을 찾는 것뿐만 아니라 개발자의 의도를 확인하는 것도 훨씬 수월합니다.

#### casting은 언제 사용 될까?
***
캐스팅은 그냥 어떤 타입을 다른 타입으로 처리하라고 컴파일러에게 알려 주는 것밖에 더 있느냐고 생각하는 프로그래가 의외로 많습니다. 크나큰 오해입니다. 어떻게 쓰더라도 일단 타입 변환이 있으면 이로 말미암아 런타임에 실행되는 코드가 만들어지는 경우가 정말 많습니다. 다음의 코드를 봅시다.  

```c++
class Base { ... };

class Derivcd : public Base { ... };

Drived d;
Base *pb = &d; // Dervice* => Base*로 암시적 변환이 이루어집니다.
```

보다시피 파생 클래스 객체에 대한 기본 클래스 포인터를 만드는 흔한 코드 입니다. 그런데 두 포인터의 값이 같지 않을 때도 가끔 있습니다. 이런 경우가 되면, 포인터 변위(offset)를 Derived* 포인터에 적용하여 실제의 Base* 포인터 값을 구하는 동작이 바로 런타임에 이루어 집니다.  

C, JAVA, C#에서는 이런 일이 발생하지 않지만 C++에서는 발생 합니다. 다중 상속을 하는 경우 항상 발생하고 심지어 단일 상속인데도 불구하고 발생하는 경우도 있습니다. 즉, 데이터가 메모리에 어떤식으로 박혀있을 거다라는 가정은 피해야 한다는 것 입니다. 이를테면 어떤 객체의 주소를 char* 포인터로 바꿔서 포인터 산술 연살을 적용하는 등의 코드는 거의 항상 미정의 동작을 낳을 수 있다는 얘기 입니다.

#### 캐스팅 사용의 잘못된 예
***
캐스팅을 사용하다보면, 실제로는 올바른 코드 같지만 실제로는 틀린 코드를 쓰고도 모르는 경우가 많아집니다. 예를 들어 아래와 같은 코드가 있다고 칩시다.

```c++
class Window
{
public:
  virtual void onResize() { ... }
  ...
};

class SpecialWindow : public Window
{
public:
  virtual void onResize()
  {
    static_cast<Window>(*this).onResize(); // 기본 클래스 Window의 size를 변경하는 동작 수행

    ... // 여기서 SpecialWindow의 size를
    ... // 변경하는 동작을 수행
  }
  ...
  ...
};
```

언뜻 보면 아무런 문제가 없는 코드 같지만, 자세히 들여다보면 문제가 있습니다. *this를 Window를 캐스팅하는 곳에서 호출 되는 onResize는 현재 객체의 함수가 아니라는 것 입니다. 이 코드에서는 캐스팅이 일어나면서 *this의 기본 클래스 부분에 대한 사본이 임시적으로 생성되는데, 바로 이 생성된 사본의 onResize를 호출하게 되는 것입니다.  

그렇게 되면 캐스팅 이후의 부분에서 수행되는 SpecialWindow의 값은 변경이 되지만, 기본 클래스인 Window의 값은 그대로 남아있는 상황이 되겠지요.

이 문제를 해결하려면, 캐스팅을 빼야 합니다. 바로 아래와 같이 말이지요.

```c++
class SpecialWindow : public Window
{
public:
  virtual void onResize()
  {
    Window::onResize();
  }
};
```

#### dynamic_cast
***

dynamic_cast는 설계부터 이러쿵 저러쿵 말도 많고 탈도 많은 연산자입니다. 이 부분을 잘 알아두면 유익하겠지만, 지금은 상당수의 구현환경에서 이 연산자가 정말 느리게 구현되어 있다는 것만 알아두면 될 것 같습니다. (대부분의 경우에서 사용을 지양해야 한다는 이야기 입니다.)  

dynamic_cast 연산자를 사용하고 싶어질 때가 있긴 합니다. 파생 클래스 객체임이 분명한 녀석이 있어서 이에 대해 파생 클래스의 함수를 호출하고 싶은데, 그 객체를 조작할 수 있는 수단으로 기본 클래스의 포인터 밖에 없을 경우는 적지 않게 생기거든요.  

그 때 생각해볼 수 있는 방법이 있습니다. 바로 다음과 같이 파생 클래스 객체에 대한 포인터를 컨테이너에 담아둠으로써 각 객체를 기본 클래스 인터페이스를 통해 조작할 필요를 아예 없애버리는 것입니다.


```c++
typedef std::vector<std::shared_ptr<SpecialWindow>> SpecialWindowPtrList;

SpecialWindowPtrList winPtrs;
...
...
for (SpecialWindowPtrList::iterator iter = winPtrs.begin() ; iter != winPtrs.end() ; ++iter)
{
  (*iter)->blink();
}
```

하지만 이 방법으로는 Window에서 파생될 수 있는 모든 녀석들에 대한 포인터를 똑같은 컨테이너에 저장할 수 없지요. 이 때 blink 함수를 가상 함수로 제공하는 방법이 있습니다. blink 함수는 SpecialWindow에만 동작이 가능한 함수이지만, Window Class에 존재하지 말라는 법은 없지요. Window 클래스에는 아무것도 안하는 빈 껍데기만 선언해주시면 되겠습니다. 아래 예제를 보시죠.


```c++
class Window
{
public:
  virtual void blink() { };
}

class SpecialWindow : public Window
{
public:
  virtual void blink() { ... }
  ...
}

typedef std::vector<std::shared_ptr<Window>> WindowPtrList;
WindowPtrList winPtrs;

...

for (WindowPtrList::iterator iter = winPtrs.begin() ; iter != winPtrs.end() ; ++iter)
{
  (*iter)->blink();
}
```

상당히 많은 상황에서 이러한 방식으로 dynamic_cast를 피하여 구현할 수 있을겁니다. 현재 프로젝트에서 사용하고 있는 dynamic_cast를 발본색원하여 제거하는 것은 현장의 상황을 너무 고려하지 않은 것일 수 있습니다. 하지만 사용하지 않도록 설계할 수 있는 방법이 있다면 굳이 dynamic_cast를 사용할 이유가 없을 것 입니다.

#### ***End Note***
***
- 다른 방법이 가능하다면 캐스팅은 반드시 피하세요. 특히 수행 시간에 민감한 코드에서 dynamic_cast를 사용하는 것은 지양해야합니다.
- 캐스팅이 어쩔 수 없이 필요하다면 함수 안에 숨길 수 있도록 해봅시다. 이렇게 하면 최소한 사용자는 자신의 코드에 캐스팅을 넣지 않고 함수를 호출할 수 있게 해줍니다.
- 구형 스타일의 캐스트를 쓰려거든 C++ 스타일의 캐스트를 사용합시다. 문제를 발견하기도 쉽고 설계자가 어떤 의도로 작성했는지도 더 자세하게 드러납니다.

#### Reference 
***  
- ***Effective C++ (Scott Meyers)***

<body translate="no" oncontextmenu="return false" ondragstart="return false" onselectstart="return false">
  <div id="mouse_no" oncontextmenu="return false" ondragstart="return false" onselectstart="return false">
  </div>
</body>