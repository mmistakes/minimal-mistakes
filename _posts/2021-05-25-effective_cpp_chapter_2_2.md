---
published: true
layout: single
title: "[Effective C++] 6. 컴파일러가 만들어낸 함수가 필요 없으면 확실히 이들의 사용을 금지해 버리자"
category: effectcpp
tags:
comments: true
sidebar:
  nav: "mainMenu"
---  
*Effective C++ 제 3판 - Chapter 2 - 2*
* * *

집을 매매하며 수익을 얻는 부동산 중개업자의 요청으로, 부동산 중개업 지원용 SW를 만들었다고 칩시다. 모르긴 몰라도 매물로 내놓은 가옥을 나타내는 클래스가 있겠지요.  

```c++
class HomeForSale {...};
```

이 때, 부동산 중개 업자는 요구사항으로 동일한 부동산 매물은 똑같은 것이 없다는 것입니다. 그렇다면 HomeForSale 객체는 사본을 만드는 것 자체가 이치에 맞지 않습니다. 하지만 어떻게 사본을 생성하지 않도록 사전에 막을 수 있을까요. 주석을 추가하는 것은 안된다는 것을 이미 아실거라 믿습니다. 그렇다면 복사 생성자와 복사 대입 연산자를 선언하지 않는 것은 어떨까요? 하지만 그 아이디어는 컴파일러에 의해 막힐 것 입니다. 컴파일러가 기본 복사 생성자와 기본 복사 대입 연산자를 자동으로 생성해줄 것이니깐요.  

그렇다면 방법이 아예 없는 것일까요? 아닙니다, 컴파일러가 기본으로 생성하는 함수들의 경우 public으로 생성된다는 것을 알고 있으실 겁니다. 이를 이용해 private 멤버로 복사 생성자와 복사 대입 연산자를 미리 선언해주는 것 입니다. 이 방법은 꽤 좋은 방법 입니다. 하지만 약간은 부족합니다. 여전히 해당 클래스의 멤버 함수와 friend 함수에서 private로 선언한 복사 생성자와 복사 대입 연산자를 호출이 가능합니다. 우리는 이 때 private로 선언한 복사 생성자와 복사 대입 연산자를 **정의**하지 않음으로서 문제를 해결할 수 있을 것 입니다.  아래 예제를 보시죠.  

```c++
class HomeForSale
{
public:
  ...

private:
  ...
  HomeForSale(const HomeForSale&);             // No Definition
  HomeForSale& operator=(const HomeForSale&);  // No Definition
};
```

자, 그렇다면 이것으로 충분할까요? 정의되지 않는 함수를 사용하려고 하면 컴파일러 에러가 아닌 링킹 에러가 발생할 것 입니다. 한발 더 나아가 링킹 에러가 아닌 컴파일러에서 에러를 검출하도록 만들고 싶습니다. 이것이 가능할까요? 네 가능합니다. 복사 생성자와 복사 대입 연산자를 private로 선언하되, 이것을 복사를 막고자 하는 Class에 바로 넣는 것이 아니라 별도의 클래스에 넣고 별도의 클래스에서 복사를 방지하고자 하는 클래스로 파생시키는 것 입니다. 이해가 가지 않으신다구요? 그렇다면 아래 예제를 보시죠.  

```c++
class Uncopyable
{
protected:
  Uncopyable() {}
  ~Uncopyable() {}

private:
  Uncopyable(const Uncopyable&);              // No Definition
  Uncopyable& operator={const Uncopyable&};   // No Definition
};

class HomeForSale : private Uncopyable {...};
```

이제 HomeForSale은 Copy가 불가능하고 복사를 시도하려고 하면 컴파일러단에서 오류를 검출할 것 입니다. 위의 예제에는 미묘한 부분들이 많지만 (다중 상속, 기본 클래스 최적화, 가상 소멸자, public 상속 등) 그런 부분들은 그냥 넘어가고 오늘 배운 내용에만 집중하도록 합시다. 아 그리고 참고로 위의 Uncopyable과 동일한 역할을 할 수 있는 클래스를 Boost 라이브러리에서 제공합니다. noncopyable이라는 클래스인데 이것을 사용해도 무방할 것입니다.

#### ***End Note***
***
자!, 공부한 내용을 마지막으로 정리해봅시다.
- 클래스의 사본이 생성되는 것을 원하지 않는다면, 복사 생성자와 복사 대입 연산자를 private & 정의부 미구현한 클래스로부터 파생시킴으로서 원하는 기능을 구현할 수 있습니다.

#### Reference 
***  
- ***Effective C++ (Scott Meyers)***

<body translate="no" oncontextmenu="return false" ondragstart="return false" onselectstart="return false">
  <div id="mouse_no" oncontextmenu="return false" ondragstart="return false" onselectstart="return false">
  </div>
</body>