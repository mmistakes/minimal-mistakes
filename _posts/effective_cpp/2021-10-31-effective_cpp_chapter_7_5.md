---
published: true
layout: single
title: "[Effective C++] 45. \"호환되는 모든 타입\"을 받아들이는 데는 멤버 함수 템플릿이 직방"
category: effectcpp
tags:
comments: true
sidebar:
  nav: "mainMenu"
---  
* * *

스마트 포인터와 반복자(iterator)에는 포인터에는 없는 특별한 기능들이 있습니다. 마찬가지로 포인터에도 스마트 포인터로 대신할 수 없는 특징이 있지요. 
  
바로 암시적 변환을 지원한다는 점입니다. 파생 클래스 포인터는 암시적으로 기본 클래스 포인터로 변환되고, 
비상수 객체에 대한 포인터는 상수 객체에 대한 포인터로의 암시적 변환아 가능하고, 기타 등등 말입니다.
  
예를 들어 아래와 같이 3-level로 구성된 클래스 계통이 주어졌다면, 
그 아래에 나온 것처럼 몇 가지의 타입 변환이 가능할 것 입니다.

```c++
class Top { ... };
class Middle : public Top { ... };
class Bottom : public Middle { ... };

Top *pt1 = new Middle;
Top *pt2 = new Bottom;
const Top *pct2 = pt1;
```

이런식의 타입 변환을 사용자 정의 스마트 포인터를 써서 흉내 내려면 무척 까다롭습니다. 
이를테면 다음과 같은 코드를 컴파일러에 통과시키고 싶은데 말이죠.

```c++
template<typename T>
class SmartPtr
{
public:
  explicit SmartPtr(T *realPtr);
  ...
};

SmartPtr<Top> pt1 =
  SmartPtr<Middle>(new Middle);

SmartPtr<Top> pt2 =
  SmartPtr<Bottom>(new Bottom);

SmartPtr<const Top> pct2 = pt1
```

같은 템플릿으로부터 만들어진 다른 인스턴스들 사이에는 어떤 관계도 없기 때문에, 
컴파일러의 눈에 비치는 SmartPtr<Middle>과 SmartPtr<Top>은 완전히 별개의 클래스 입니다. 
쉽게 말해서 나중에 아래와 같은 클래스를 새로 정의했을 때, SmartPtr<BelowBottom>으로부터 SmartPtr<Top> 객체를 생성하는 부분도 우리가 직접 지원해야한다는 것이지요.

```c++
class BelowBottom : public Bottom { ... };
```

원칙적으로 지금 우리가 원하는 생성자의 개수는 '무제한'입니다. 그런데 템플릿을 인스턴스화하면 '무제한' 개수의 함수를 만들어낼 수 있죠. 
그러니까 SmartPtr에 생성자 함수를 둘 필요가 없을 것 같습니다. 바로 생성자를 만들어내는 템플릿을 쓰는 것 입니다.
  
이 생성자 템플릿은 이번 항목에서 이야기할 멤버 함수 템플릿의 한 예인데요. 멤버 함수 템플릿은 간단히 말해서 어떤 클래스의 멤버 함수를 찍어내는 템플릿을 일컫습니다.
  
```c++
template<typename T>
class SmartPtr
{
public:
  template<typename U>
  SmartPtr(const SmartPtr<U>& other); // 일반화된 복사 생성자를
  ...                                 //  만들기 위해 마련한 멤버 템플릿
}
```

위의 코드를 간단히 풀어보면 이렇습니다. 모든 T 타입 및 모든 U 타입에 대해서, 
SmartPtr<T\> 객체가 SmartPtr<U\>로부터 생성될 수 있다는 이야기 입니다. 왜냐하면 
SmartPtr<U\>의 참조자를 매개변수로 받아들이는 생성자가 SmartPtr<T> 안에 들어 있기 때문입니다. 
이러한 생성자를 가리켜 일반화 복사 생성자라고들 부릅니다.
  
하지만, 보시면 알겠지만 지금 SmartPtr에 선언된 일반화 복사 생성자는 실제로 우리가 원하는 것보다 더 많은 것을 해줍니다. 
그렇죠 우리는 SmartPtr<Bottom>으로부터 SmartPtr<Top>을 만들 수 있기만을 원했지, 반대의 경우는 원하지 않았다 이 말 입니다.
  
이러한 경우, 우리는 초기화 리스트를 사용하여 타입 변환 제약을 걸 수 있습니다.
  
```c++
template<typename T>
class SmartPtr
{
public:
  template<typename U>
  SmartPtr(const SmartPtr<U>& other)  // 이 SmartPtr에 담긴 포인터를
  : heldPtr(other.get()) {... }       // 다른 SmartPtr에 담긴 포인터로 초기화 합니다.

  T* get*() const ( return heldPtr; )
  ...
private:
  T *heldPtr;
};
```

보시다 시피 멤버 초기화 리스트를 사용해서, SmartPtr<T\>의 데이터 멤버인 T* 타입의 포인터를 SmartPtr<U\>에 들어 있는 
U* 타입의 포인터로 초기화했습니다. 이렇게 해 두 면 U\*에서 T\*로 진행되는 암시적 변환이 가능할 때만 컴파일 에러가 발생하지 않습니다.

#### 멤버 함수 템플릿의 다른 활용 예
* * *
멤버 함수 템플릿의 활용은 생성자에만 사용되지 않습니다. 가장 흔히 쓰이는 예는 대입 연산 입니다. 
단 주의할 점이 있는데요. 아래의 예를 통해서 알아보겠습니다. (아래는 우리가 아는 shared_ptr의 구현을 가져온 것 입니다.)

```c++
template<class T> 
class shared_ptr
{
public:
  shared_ptr(shared_ptr const& r);      // 복사 생성자

  template<class Y>
    shared_ptr(shared_ptr<Y> const& r); // 일반화 복사 생성자
}
```

위의 예제가 있을 때, shared_ptr 객체가 자신과 동일한 타입의 다른 shared_ptr 객체로부터 생성되는 상황에서, 컴파일러는 shared_ptr의 복사 생성자를 만들까요?
아니면, 일반화 복사 생성자 템플릿을 인스턴스화할까요?
  
멤버 템플릿은 언어의 규칙을 바꾸지는 않습니다. 이 때의 규칙이란 복사 생성자가 필요한데 프로그래머가 직접 선언하지 않으면 컴파일러가 자동으로 하나 만든다!! 라는 것이지요.
  
즉, 일반화 복사 생성자를 어떤 클래스에 선언하는 행위는 컴파일러가 자동으로 생성하는 복사 생성자를 만드는 것을 막지 않습니다. 
일반화 복사 생성자는 일반화 복사 생성자 일뿐, 컴파일러가 만드는 보통의 복사 생성자가 아니라는 것이지요. 
따라서 어떤 클래스의 복사 생성을 전부 직접 만들어 주고 싶으시면, 일반화 복사 생성자는 물론이고, 보통의 복사 생성자까지 여러분이 직접 선언 및 정의를 해야만 합니다.

#### ***End Note***
***
- 호한되는 모든 타입을 받아들이는 멤버 함수를 만들려면 멤버 함수 템플릿을 사용 합시다.
- 일반화된 복사 생성 연산과 일반화된 대입 연산을 위해 멤버 템플릿을 선언했다 하더라도, 
보통의 복사 생성자와 복사 대입 연산자는 직접 선언해야 합니다.

#### Reference 
***  
- ***Effective C++ (Scott Meyers)***

<body translate="no" oncontextmenu="return false" ondragstart="return false" onselectstart="return false">
  <div id="mouse_no" oncontextmenu="return false" ondragstart="return false" onselectstart="return false">
  </div>
</body>
