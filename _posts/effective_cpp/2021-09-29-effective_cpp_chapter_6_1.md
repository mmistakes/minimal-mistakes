---
published: true
layout: single
title: "[Effective C++] 32. public 상속 모형은 반드시 \"is-a(...는 ...의 일종이다)\"를 따르도록 만들자 "
category: effectcpp
tags:
comments: true
sidebar:
  nav: "mainMenu"
---  
* * *

아래 코드는 C++의 public 상속 예시 입니다. 

```c++
class Person { ... };

class Student : public Person { ... };
```

Student Class는 Person Class를 상속 받고 있습니다. 먼저 말씀드리자면, public 상속은 is-a 관계라고 할 수 있습니다.  

즉, Student is Person 인 셈이죠. 모든 학생들은 사람이지만 모든 사람은 학생이 아니라는 사실을 우리 모두는 알고 있습니다. 이번에는 c++ Code를 통해서 Student와 Person의 관계를 알아봅시다.

```c++
void eat(const Person& p); // 먹는 것은 사람이면 누구나 가능
void study(const Student& s); // (약간의 비약이 있지만) 공부는 학생만 합니다.

Person p;
Student s;

eat(p); // 사람은 먹을 수 있습니다.
eat(s); // 학생도 먹을 수 있습니다.

study(s); // 학생은 공부를 할 수 있습니다.
study(p); // Error 발생!!, p는 student가 아닙니다.
```

이처럼 Person 객체에 대한 인자를 기대하는 함수는 Student 객체 또한 받아들일 수 있다는 것을 알 수 있습니다. 참고로 이 것은 public 상속에서만 해당합니다. 
하지만 is-a 관계를 현실 세계의 is-a 관계와 혼동하여 사용해서, 설계를 망치는 경우가 있습니다. 해당 예시에 대해 바로 이어서 공부해봅시다.


#### 펭귄과 새 예시
* * *

아래의 예시를 가만히 보면 이상한 점을 바로 발견할 수 있습니다. 아래의 클래스 계통에 의하면 펭귄은 날 수 있어야 합니다. 하지만 펭귄은 날 수 없는 새입니다.

```c++
class Bird
{
public:
  virtual void fly(); // 새는 날 수 있습니다.
  ...
};

class Penguin : public Bird // 펭귄은 새 입니다.
{
  ...
};
```

날지 않는 새의 종류도 있다는 점을 생각하고, 조금 더 현실에 가까운 클래스 계통 구조를 아래와 같이 정의해볼 수 있겠습니다.

```c++
class Bird
{
  ... // fly 함수 선언하지 않습니다.
};

class FlyingBird : public Bird
{
public:
  virtual void fly();
  ...
};

class Penguin : public Bird
{
  ...
};
```

하지만 말입니다. 어떤 SW에서는 비행 능력이 있는 새와 없는 새를 구분할 필요가 없다고 가정해봅시다. 그렇다면 FlyingBird라는 클래스는 낭비라고 볼 수 있겠지요.
그래서 사용자는 Bird Class로부터 fly 함수를 상속 받되, 상속 받은 함수를 재정의해서 파생 클래스에서 fly 함수를 호출하면 error를 감지할 수 있도록 구현하기로 했습니다.  

이 것으로 정말로 된 것일까요? 그렇지 않습니다. 컴파일 단계가 아닌 런타임 단계에서 잘못된 사용을 알려주는 인터페이스는 좋은 인터페이스가 아닙니다.  

여러분은 아래와 같이 fly 함수를 아예 선언하지 않고 필요한 경우에만 정의해서 사용하는 것이 좋은 인터페이스 설계라고 할 수 있겠습니다. 물론 비행 능력이 있는 새와 없는 새를 구분할 필요가 없는 SW에 한해서이겠지요.

```c++
class Bird
{
  ... // fly 선언 x
};

class Penguin : public Bird
{
  ... // fly 선언 x
};
```



#### 직사각형과 정사각형 예시
* * *
자, 이번엔 직사각형과 정사각형을 클래스로 구현하려고 합니다. 직사각형과 정사각형의 수학적 포함 관계는 어떻게 될까요?  

네 맞습니다. 정사각형은 직사각형에 포함 됩니다. 그러면 정사각형은 직사각형을 기본 클래스로 상속 받도록 구현하면 될까요? 다음 예시를 보고 함께 고민해봅시다.

```c++
class Rectangle
{
public:
  virtual void setHeight(int newHeight);
  virtual void setWidth(int newHeight);
  virtual int height() const;
  virtual int width() const;
  ...
};

void makeBigger(Rectangle& r)
{
  int oldHeight = r.hieght();
  r.setWidth(r.width() + 10);
  assert(r.height() == oldHeight); // true가 아니면 debug mode에서 Error 발생.
}
```

여기서 assert 함수가 Error를 발생시키지 않는다는 것은 명백합니다. 그렇다면 아래의 코드를 다시 확인해주세요.

```c++
class Square : public Rectangle { ... };

Square s;
assert(s.width() == s.height()); // 1번 assert
makeBigger(s);
assert(s.width() == s.height()); // 2번 assert
```

이번엔 어떤가요? Rectangle로부터 public 상속된 makeBigger 함수는 Square Class에서도 유효합니다. 이 함수는 직사각형의 가로 길이를 늘리는 기능을 하는데, 
정사각형의 경우 가로와 세로의 길이가 항상 같아야 하므로 해당 함수는 정사각형에는 유효하지 않습니다.  

보시다시피, 문법적으로 하자는 전혀 없습니다. 하지만 현실 세계 즉 수학이라는 세계에서 직사각형과 정사각형의 관계는 상속을 써서 표현하려고 하면 틀린 것이 됩니다.  

is-a 관계를 잘못 적용하여, 설계가 이상하게 꼬이는 경우가 정말 많습니다. 그러니 클래스 사이에 맺을 수 있는 관계들을 명확하게 구분할 수 있도록 합시다. (참고로 뒷장에서 has-a, is-implemented-in-terms-of를 배울 것 입니다.)

#### ***End Note***
***
- public 상속의 의미는 "is-a(...는 ...의 일종)"입니다. 기본 클래스에 적용되는 모든 것들이 파생 클래스에서 그대로 적용되어야 합니다. 왜냐하면 모든 파생 클래스 객체는 기본 클래스 객체의 일종이기 때문입니다.

#### Reference 
***  
- ***Effective C++ (Scott Meyers)***

<body translate="no" oncontextmenu="return false" ondragstart="return false" onselectstart="return false">
  <div id="mouse_no" oncontextmenu="return false" ondragstart="return false" onselectstart="return false">
  </div>
</body>