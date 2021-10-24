---
published: true
layout: single
title: "[Effective C++] 41. 템플릿 프로그래밍의 천릿길도 암시적 인터페이스와 컴파일 타임 다형성부터"
category: effectcpp
tags:
comments: true
sidebar:
  nav: "mainMenu"
---  
* * *

객체 지향 프로그래밍의 세계를 회전시키는 축은 명시적 인터페이스와 런타임 다형성입니다. 아래의 예를 들어서 설명해보겠습니다.

```c++
class Widget
{
public:
    Widget();
    virtual ~Widget();
    virtual std::size_t size() const;
    virtual void normalize();
    void swap(Widget& other);
    ...
};

void doProcessing(Widget& w)
{
    if(w.size() > 10 && w != someNastyWidget)
    {
        ...
    }
    ...
}
```

doProcessing 함수 안에 있는 w에 대해 말할 수 있는 부분은 다음과 같습니다.
- w는 Widget 타입으로 선언되었기 때문에, w는 Widget 명시적 인터페이스를 지원해야 합니다.
- Widget의 멤버 함수중 몇개는 가상 함수이므로 이 함수에 대한 호출은 런타임 다형성에 의해 이루어 집니다.

명시적 인터페이스는 대개 함수 시그니처(이름, 매개변수 타입, 반환 타입 등)로 이루어 집니다. 반면 암시적 인터페이스는 다릅니다. 함수 시그니처에 기반하지 않고 있다는 점이 가장 큰 차이점입니다. 암시적 인터페이스를 이루는 요소는 유효 표현식입니다. 다음의 예제를 확인해봅시다.

```c++
template<typename T>
void doProcessing(T& w)
{
    if(w.size() > 10 && w != someNastyWidget)
    {
        ...
    }
    ...
}
```
이번에는 doProcessing 템플릿 안의 w에 대해서 무엇을 말할 수 있을까요?
- w가 지원해야 하는 인터페이스는 이 템플릿 안에서 w에 대해 실행되는 연산이 결정합니다.
- w가 수반되는 함수 호출이 일어날 때, 이를테면 operator> 및 operator!= 함수가 호출될 때는 해당 호출을 성공시키기 위해 템플릿의 인스턴스화가 일어납니다.

또한 위의 T(w의 타입)에서 제공될 암시적 인터페이스에는 다음과 같은 제약이 걸릴 것 입니다.
- 정수 계열의 값을 반환하고 이름이 size인 함수를 지원해야 합니다.
- T 타입의 객체들은 operator!= 함수를 지원해야 합니다.

암시적 인터페이스의 경우 그 제약 자체가 명시적 인터페이스보다 더 느슨합니다. 위의 두 제약이 항상 만족할 필요는 없습니다. 왜냐하면 size()가 반환하는 타입으로 암시적 변환만 가능하다면 문제가 없기 때문이지요. 또한 T가 operator!=를 지원해야한다라는 제약도 마찬가지 입니다. T가 어떤 타입인지는 모르나 X타입으로 변환이 가능하고 또 X가 다시 someNastyWidget으로 변환이 가능하다면 유효 호출로 간주된다는 것 입니다.

#### ***End Note***
***
- 클래스 및 템플릿은 모두 인터페이스와 다형성을 가집니다.
- 클래스의 경우 인터페이스는 명시적이며 함수의 시그니처(반환형, 매개변수 등)를 중심으로 구성되어 있습니다. 다형성은 프로그램 실행 중에 가상 함수를 통해 나타납니다.
- 템플릿 매개변수의 경우, 인터페이스는 암시적이며 유효 표현식에 기반을 두어 구성됩니다. 다형성은 컴파일 중에 템플릿 인스턴스화와 함수 오버로딩 모호성 해결을 통해 나타납니다.

#### Reference 
***  
- ***Effective C++ (Scott Meyers)***

<body translate="no" oncontextmenu="return false" ondragstart="return false" onselectstart="return false">
  <div id="mouse_no" oncontextmenu="return false" ondragstart="return false" onselectstart="return false">
  </div>
</body>
