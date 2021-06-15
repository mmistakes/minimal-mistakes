---
published: true
layout: single
title: "[Effective C++] 12. 객체의 모든 부분을 빠짐없이 복사하자"
category: effectcpp
tags:
comments: true
sidebar:
  nav: "mainMenu"
---  
*Effective C++ 제 3판 - Chapter 2 - 8*
* * *

객체의 안쪽 부분을 캡슐화한 객체 지향 시스템 중 설계가 잘 된 것들을 보면, 객체를 복사하는 함수가 딱 둘만 있는 것을 알 수 있습니다. 복사 대입 연산자와 복사 생성자 입니다.

이 둘은 **복사 함수(Copy Function)**라고 부릅니다. 또한 컴파일러가 필요에 따라 만들어 내기도 합니다. 그리고 컴파일러가 생성한 복사 함수는 저절로 만들어졌지만 동작은 기본적인 요구에 아주 충실합니다. 복사되는 객체가 갖고 있는 데이터를 빠짐없이 복사하지요.  

객체 복사 함수를 직접 선언한다는 것은, 컴파일러가 만들어낸 기본 동작에 뭔가 마음에 안 드는 것이 있다는 이야기 입니다.

#### 부분 복사를 주의하자
***
복사 대입 연산자와 복사 생성자를 직접 구현한 경우가 있다고 칩시다. 구현시 한치의 실수도 없이 완벽하게 구현했다면 아마 문제 없이 동작할 것 입니다. 하지만 이후 추가로 필요한 멤버가 생겨서 추가를 하는 경우엔 어떻게 될까요?  

기존에 구현된 복사 생성자와 복사 대입 연산자는 새로 추가한 멤버에 대해 복사하지 않을 것입니다. 부분 복사만 하게 되는 것이지요. 이 경우 컴파일러 경고도 발생하지 않고 추가한 멤버를 처리하도록 복사 함수를 다시 작성할 수 밖에 없습니다. 반드시 주의해야하는 부분이지요.


#### 클래스 상속 시 발생하는 부분 복사
***
부분 복사가 발생하는 더 사악한 경우를 알아볼까요?, 바로 클래스 상속 입니다. 아래 예제를 보시죠

```c++
class PriorityCustomer : public Customer
{
public:
  ...
  PriorityCustomer(const PriorityCustomer& rhs);
  PriorityCustomer& operator=(const PriorityCustomer& rhs); 
  ...
private:
  int priority;
};


PriorityCustomer::PriorityCustomer(const PriorityCustomer& rhs)
  : priority(rhs.priority)
{
  logCall("PriorityCustomer copy constructor");
}

PriorityCustomer& PriorityCustomer::operator=(const PriorityCustomer& rhs)
{
  logCall("PriorityCustomer copy assignment operator");
  priority = rhs.priority;
  return *this;
}
```

위의 예제는 언뜻 보기엔 아무 문제가 없는 것처럼 보이지만, 자세히 보면 무언가 이상합니다. PriorityCustomer에 선언된 멤버를 모두 복사하고 있지만, 상속 받은 Customer 클래스의 멤버에 대해서는 복사가 되지 않고 있습니다.

물론 복사 생성자의 경우에는 기본 생성자에 의해 초기화 될 것 입니다.(기본 생성자가 없으면 컴파일도 안됩니다.)  

하지만, 복사 대입 연산자의 경우에는 사정이 다소 다릅니다. 복사 대입 연산자는 기본 클래스의 데이터 멤버를 건드릴 시도도 하지 않기 때문에, 기본 클래스의 데이터 멤버는 변경되지 않게 됩니다.  

사정이야 어찌됐든, 파생 클래스에 대한 복사 함수를 여러분 스스로 만든다고 결심했다면 기본 클래스 부분을 복사에서 빠뜨리지 않도록 각별히 주의하셔야 하겠습니다.

#### 복사 대입 연산자에서 복사 생성자를 호출하여 코드 중복을 줄일 수 있을까?
***
코드 중복을 피하려는 기특한 생각으로 복사 대입 연산자에서 복사 생성자를 호출하는 방법을 사용할 수 있을까요?

복사 대입 연산자에서 복사 생성자를 호출하는 것부터 말이 안되는 방식 입니다. 이미 만들어져 버젓이 존재하는 객체를 생성하고 있는 것이니까요.  

그렇다면 반대의 경우엔 어떨까요?, 복사 생성자에서 복사 대입 연산자를 호출하는 것은요? 마찬가지로 넌센스 입니다. 생성자의 역할은 새로 만들어진 객체를 초기화하는 것이지만, 대입 연산자의 역할은 이미 초기화가 끝난 객체에게 값을 주는 것입니다.  

대신 이런 방법은 생각해볼 수 있겠지요. 복사 생성자와 복사 대입 연산자의 코드 본문이 비슷하게 나온 느낌이 들면 양쪽에서 겹치는 부분을 별도의 제3의 멤버 함수로 분리해서 코드 중복을 제거하는 방법으로 사용할 수 있겠지요.

#### ***End Note***
***
- 객체 복사 함수는 주어진 객체의 모든 데이터 멤버 및 모든 기본 클래스 부분을 빠뜨리지 말고 복사해야 합니다.
- 클래스의 복사 함수 두 개를 구현할 때, 한쪽을 이용해서 다른 쪽을 구현하려는 시도는 해서는 안됩니다. 대신 공통된 동작을 제 3의 함수로 분리해 놓고 양쪽에서 이것을 호출하게 만들어서 코드 중복을 해결합시다.

#### Reference 
***  
- ***Effective C++ (Scott Meyers)***

<body translate="no" oncontextmenu="return false" ondragstart="return false" onselectstart="return false">
  <div id="mouse_no" oncontextmenu="return false" ondragstart="return false" onselectstart="return false">
  </div>
</body>