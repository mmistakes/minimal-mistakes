---
published: true
layout: single
title: "[Effective C++] 34. 인터페이스 상속과 구현 상속의 차이를 제대로 파악하고 구별하자"
category: effectcpp
tags:
comments: true
sidebar:
  nav: "mainMenu"
---  
* * *

상속은 두가지로 나뉩니다. 하나는 함수 인터페이스의 상속이고, 또 하나는 함수 구현의 상속 입니다. 이 둘의 차이는 사실 함수 선언 및 함수 정의의 차이와 맥을 같이 한다고 보면 됩니다.  

클래스 설계자의 입장에서 보면 멤버 함수의 인터페이스(선언)만을 파생 클래스에서 상속 받고 싶을 때가 있습니다. 또 어쩔 때는 함수의 인터페이스 및 구현을
 모두 상속받고 그 상속받은 구현이 오버라이드가 가능하게 만들었으면 하는 분도 있겠죠. 반대로 인터페이스와 구현을 상속받되 어떤 것도 오버라이드 할 수 없도록 막고 싶은 경우도 있을 것 입니다.  

 이러이러한 선택사항들 사이의 차이점은 몸으로 느껴보는게 중요합니다. 그런의미에서 그래픽 응용프로그램에서 쓰일법한 기하학적 도형을 나타내는 클래스 계통구조를 놓고 한번 생각해봅시다.


```c++
class Shape
{
public:
  virtual void draw() const = 0; // 순수 가상 함수
  virtual void error(const std::string* msg); // 비순수 가상 함수
  int objectID() const; // 일반 멤버 함수
};

class Rectangle : public Shape { ... };
class Ellipse : public Shape { ... };
```


#### 순수 가상 함수
* * *
제일 먼저 draw를 봅시다. draw는 순수 가상 함수 입니다. (그로 인해 Shape는 추상 클래스가 되었습니다.) 순수 가상 함수의 가장 두드러진 특징은 2가지 입니다.
- 첫째, 어떤 순수 가상 함수를 물려받은 클래스는 해당 순수 가상 함수를 다시 선언해야만 합니다.
- 둘째, 순수 가상 함수는 전형적으로 추상 클래스 안에서 정의를 갖지 않습니다.  

draw()를 순수 가상 함수로 선언한 것은 정말 딱 맞는 선택입니다. 그 어떤 파생 클래스도 draw의 동작이 같은 도형은 없을 것 입니다. 참고로, 순수 가상 함수는 전형적으로 추상 클래스 안에서 정의를 갖지 않는다라고 말씀드렸지만, 정의를 제공할 수도 있습니다. 뒤에서 확인하겠지만, 이 부분은 단순 가상 함수에 대한 기본 구현을 종전보다 안전하게 제공하는 메커니즘으로 활용할 수 있습니다.


#### 비순수(단순) 가상 함수
* * *

이번에는 비순수 가상 함수 입니다. 순수 가상 함수와 비교했을 때 비순수 가상 함수가 가지는 의미는 파생 클래스로 하여금 인터페이스뿐만 아니라 그 함수의 기본 구현도 물려받게 하자는 것 입니다.  

Shape::error의 경우, 즉, 각 파생 클래스마다 그때그때 꼭 맞는 방법으로 에러를 처리할 필요는 없다는 것입니다. 기본 클래스에서 기본으로 제공되는 함수를 써도 되지만 사용자가 필요하면 직접 만들어서 써도 된다라고 말하고 있는 것 입니다.



**그런데 곰곰이 생각해보면 단순 가상 함수에서 함수 인터페이스와 기본 구현을 한꺼번에 지정하도록 내버려두는 것은 위험할 수도 있습니다.**  


예를 들어 보죠. 한 항공사는 ModelA와 ModelB라는 비행기를 만들었습니다. 그리고 이 비행기들은 비행하는 방식이 동일했습니다. 가상함수 fly가 바로 동일한 비행 방식이였죠. 
그런데 이 항공사는 ModelC라는 비행기를 새로 출시했습니다.

```c++
class Airport { ... };

class Airplane
{
public:
  virtual void fly(const Airport& destination);
  ...
};

void Airplane::fly(const Airport& destination)
{

}

class ModelA : public Airplane { ... };
class ModelB : public Airplane { ... };
```

```c++
class ModelC : public Airplane
{
  ... // fly 함수 선언되지 않음.
};
```

그런데 ModelC의 경우 비행하는 방식이 ModelA, ModelB와 완전히 달랐던 것 입니다. 그런 와중에 개발자는 fly 함수를 ModelC에서 재정의하는 것을 잊어버렸습니다.

이것은 정말 큰 문제이겠지요. 게다가 더 큰 문제는 ModelC 클래스는 기본 클래스의 동작을 원하지 않았지만, 아무런 에러도 검출되지 않는다는 것입니다.  

우리는 가상 함수 사용를 사용할 때, 안전 장치를 설치하는 방법으로 순수 가상 함수를 구현하는 방법이 있습니다.

#### 순수 가상 함수의 구현
* * *

앞서 잠깐 언급했듯이, 순수 가상 함수는 정의할 수 있습니다. 그리고 그 방법을 통해 아래와 같이 비순수 가상 함수에 융통성을 부여할 수 있습니다.

```c++
class Airplane
{
  virtual void fly(const Airport& destination) = 0;
  ...
};

void Airpalne::fly(const Airport& destination)
{
  // 주어진 목적지로 비행기를 날려 보내는 기본 코드
}

class ModelA : public Airplane
{
public:
  virtual void fly(const Airport& destination)
  { Airplane::fly(destination); }
  ...
};

class ModelC : public Airplane
{
public:
  virtual void fly(const& Airport& destination);
  ...
};

void ModelC::fly(const Airport& destination)
{
  // 주어진 목적지로 ModelC 비행기를 날려보내는 코드
}
```

#### 비가상 함수
* * *

멤버 함수가 비가상 함수로 되어 있다는 것은, 이 함수는 파생 클래스에서 다른 행동이 일어날 것으로 가정하지 않았다는 뜻입니다. 정리하자면
- 비가상 함수를 선언하는 목적은 파생 클래스가 함수 인터페이스와 더불어 그 함수의 필수적인 구현을 물려받게 하는 것 입니다.  

결국 모든 파생 클래스에서 objectID() 함수는 동일하게 동작해야한다는 것을 의미합니다. 비가상 함수는 클래스 파생에 상관없는 불변동작이기 때문에, 
파생 클래스에서 재정할 수 있는 수준의 것이 절대로 아닙니다. (이 부분은 항목 36에서 자세히 살펴보도록 하겠습니다.)

이처럼 어떤 클래스에 멤버 함수를 선언해 넣는 것은 각별히 신경을 써야하는 부분 입니다. 클래스 설계를 많이해 보지 못한 분들이 자주하는 실수 두 가지가 있는데 다음 2가지 입니다.
- 모든 멤버 함수를 비가상 함수로 선언하는 것
- 모든 멤버 함수를 가상 함수로 선언하는 것

모든 멤버 함수를 비가상 함수로 선언하는 것은 기본 클래스의 동작을 특별하게 만들 만한 여지가 없어집니다. 특히 비가상 소멸자가 문젯거리가 될 수 있겠지요(항목 7). 
또한 비가상 함수의 성능 문제에 대해 고민하고 있다면 80-20 법칙을 떠올리도록 합시다.  

반대로 모든 멤버 함수를 가상 함수로 선언하는 것도 (물론 실제로 그런 클래스가 있을지도 모르지요) 말이 안되지요. 파생 클래스에서 재정의가 안 되어야 하는 함수도 분명히 있을테니깐요. 클래스 파생에 상관없는 불변동작을 갖고 있어야 한다면 확실하게 비가상 함수로 선언하도록 합시다.

#### ***End Note***
***
- 인터페이스의 상속과 구현은 다릅니다. public 상속에서, 파생 클래스는 항상 기본 클래스의 인터페이스를 모두 물려받습니다.
- 순수 가상 함수는 인터페이스 상속만을 허용합니다.
- 단순(비순수) 가상 함수는 인터페이스 상속과 더불어 기본 구현의 상속도 가능하도록 지정합니다.
- 비가상 함수는 인터페이스 상속과 더불어 필수 구현의 상속도 가하도록 지정합니다.

#### Reference 
***  
- ***Effective C++ (Scott Meyers)***

<body translate="no" oncontextmenu="return false" ondragstart="return false" onselectstart="return false">
  <div id="mouse_no" oncontextmenu="return false" ondragstart="return false" onselectstart="return false">
  </div>
</body>