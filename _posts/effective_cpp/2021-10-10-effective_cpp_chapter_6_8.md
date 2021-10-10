---
published: true
layout: single
title: "[Effective C++] 39. private 상속은 심사숙고해서 구사하자."
category: effectcpp
tags:
comments: true
sidebar:
  nav: "mainMenu"
---  
* * *

public 상속에 관해서는 충분히 설명한 것 같네요. 이번에는 private 상속에 대해서 알아보겠습니다.

```c++
class Person { ... };

class Student : private Person { ... };

void eat(const Person& p);

void study(const Student& s);

Person p;
Student s;

eat(p);
eat(s); // Error!!
```

위의 예제로 알 수 있는 첫번째 동작 규칙은 상속 관계가 private이면 컴파일러는 일반적으로 파생 클래스 객체를 기본 클래스 객체로 변환하지 않는 것 입니다.

두번째 동작 규칙은 기본 클래스로부터 물려받은 멤버는 파생 클래스에서 모조리 private 멤버가 된다는 것 입니다. 기본 클래스에서 원래 protected 멤버였거나 public  멤버였어도 말이지요.

그렇다면 private의 상속의 의미는 무엇일까요?, public은 is-a입니다. private의 의미는 is-implemented-in-terms-of 입니다. private 상속을 통해 D 클래스를 파생시킨 것은, B 클래스에서 쓸 수 있는 기능들 몇 개를 활용할 목적으로 한 행동이지, B 타입과 D 타입의 객체 사이에 어떤 개념적 관계가 있어서 한 행동은 아니라는 것 입니다. private 상속은 그 자체로 구현 기법 중 하나 입니다.  

private 상속의 의미는 구현만 물려받을 수 있다!!, 인터페이스는 국물도 없다라는 뜻입니다. D가 B로부터 private 상속을 받으면 이것은 그냥 D 객체가 B 객체를 써서 구현되는 것이라고 생각하시면 됩니다.

#### 객체 합성
* * * 
그런데 private 상속의 의미는 결국 객체 합성과 동일합니다. 객체 합성과 private 상속 중 어떤 것을 골라야하는 것이 맞을까요?  

지극히 간단합니다. 할 수 있으면 객체 합성을 하고, 꼭 private 상속을 사용헤야하는 경우라면 private 상속을 사용하십시오. 그렇다면 꼭 해야하는 경우는 언제일까요?, 비공개 멤버를 접근할 때 혹은 가상 함수를 재정의할 경우가 바로 이 경우에 속합니다.  

그럼 예제를 통해 좀 더 알아볼까요? Widget 객체를 사용하는 응용 프로그램을 하나 만들고 있다고 가정해봅시다. 그리고 일정 시간마다 주기적으로 호출되어 멤버 함수의 호출 횟수 정보를 확인하는 Timer 기능을 필요한다고 칩시다.

```c++
class Timer
{
public:
    explicit Timer(int tickFrequency);
    virtual void onTick() const; // 일정 시간이 경과할 때마다 자동으로 이것이 호출 됩니다.
}
```

이런 경우, Widget 클래스에서 Timer의 가상 함수를 재정의할 수 있어야 하므로, Widget 클래스는 어쨌든 Timer에서 상속을 받아야 합니다. 하지만 지금 상황에서 public 상속은 맞지 않습니다. Widget이 Timer의 일종(is-a)는 아니니까요. 게다가 Widget 객체의 사용자는 Widget 객체를 통해 onTick 함수를 호출해선 안 됩니다. 이 함수는 개념적으로 Widget 인터페이스의 일부로 볼 수 없기 때문입니다. 그러므로 private 상속을 하는 것 입니다.

```c++
class Widget : private Timer
{
private:
    virtual void onTick() const; // Widget 사용 자료 등을 수집합니다.
    ...
}
```

이것만 놓고 보면 흠잡힐 게 없는 설계 입니다. 하지만 객체 합성을 사용하기로 마음 먹었다면 충분히 그렇게 해도 되는 상황입니다. 객체 합성을 사용한 예를 같이 확인해 봅시다.

```c++
class Widget
{
private:
    class WidgetTimer : public Timer
    {
    public:
        virtual void onTick() const;
        ...
    };
};
```

private 상속과 비교해보면 상당히 복잡한 구조입니다. 하지만 현실적으로 private 상속 대신에 public 상속에 객체 합성 조합이 더 자주 즐겨 쓰이긴 합니다. 다음과 같은 두가지 장점 때문입니다.
- Widget 클래스를 설계하는 데 있어서 파생은 가능하게 하되, 파생 클래스에서 onTick()을 재정의할 수 없도록 설계 치원에서 막고 싶을 때
- Widget의 컴파일 의존성을 최소화하고 싶을 때

하지만 private 상속이 선택지가 항상 될 수 없는 것은 아닙니다. 바로 공백 클래스 최적화를 해야하는 경우가 바로 그것 입니다.

#### 공백 클래스 최적화
* * *
공백 클래스는 개념적으로 차지하는 메모리공간이 없는게 맞습니다. 하지만 c++에는 "독립 구조의 객체는 반드시 크기가 0을 넘어야 한다"라는 금기사항이 있습니다.

```c++
class Empty{};

class HoldsAnInt
{
private:
    int x;
    Empty e;
};
```
바로 위와 같은 코드에서 sizeof(HoldsAnInt) > sizeof(int)가 되는 괴현상이 발생한다는 것이지요. 대부분의 컴파일러에서 sizeof(Empty)의 값은 1로 나옵니다. c++의 제약을 지키기 위해 컴파일러는 이런 공백 객체에 char 한 개를 슬그머니 끼워 넣는식으로 처리하기 때문이지요.  

또한 바이트 패딩 과정이 추가 되면 HoldsAnInt 객체의 크기는 char 하나의 크기를 넘게 됩니다. 이런 상황에서 바로 private 상속을 사용할 수 있습니다.  

```c++
class HoldsAnInt : private Empty
{
private:
    int x;
};
```

위와 같이 구현하면 sizeof(HoldsAnInt) == sizeof(int)를 눈으로 확인할 수 있습니다. 이러한 공간 절약 기법은 공백 기본 클래스 최적화(Empty Base Optimization: EBO)라고 알려져 있습니다. 실무적인 입장에서 공백 클래스는 진짜로 텅 빈 것은 아닙 니다. 비정적 데이터 멤버는 안 갖고 있지만, typedef, enum 혹은 정적 데이터 멤버, 비가상 함수까지 갖는 경우가 비일비재 합니다.  

* * *

하지만 EBO 하나만 가지고 private 상속이 합법적으로 정당화된 것인 양 생각하는 것은 무리에 가깝습니다. private 상속이 적법한 설계 전략일 **가능성**이 가장 높은 경우가 있습니다. 아무리 봐주어도 is-a 관계로 이어질 것 같지 않은 두 클래스를 사용해야 하는데, 이 둘 사이에서 한쪽 클래스가 다른 쪽 클래스의 protected 멤버에 접근해야 하거나 다른 쪽 클래스의 가상 함수를 재정의해야할 때가 바로 이 경우 입니다.

#### ***End Note***
***
- private 상속의 의미는 is-implemented-in-terms-of입니다. 대개 객체 합성과 비교해서 쓰이는 분야가 많지는 않지만, 파생 클래스 쪽에서 기본 클래스의 protected 멤버에 접근해야 할 경우 혹은 상속받은 가상 함수를 재정의해야 할 경우에는 private 상속이 나름대로 의미가 있습니다.
- 객체 합성과 달리, private 상속은 공백 기본 클래스 최적화를 활성화시킬 수 있습니다. 이 점은 객체 크기를 가지고 고민하는 라이브러리 개발자에게 꽤 매력적입니다.

#### Reference 
***  
- ***Effective C++ (Scott Meyers)***

<body translate="no" oncontextmenu="return false" ondragstart="return false" onselectstart="return false">
  <div id="mouse_no" oncontextmenu="return false" ondragstart="return false" onselectstart="return false">
  </div>
</body>