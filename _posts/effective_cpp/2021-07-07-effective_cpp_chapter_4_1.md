---
published: true
layout: single
title: "[Effective C++] 18. 인터페이스 설계는 제대로 쓰기엔 쉽게, 엉터리로 쓰기엔 어렵게 하자"
category: effectcpp
tags:
comments: true
sidebar:
  nav: "mainMenu"
---  
*Effective C++ 제 3판 - Chapter 4 - 1*
* * *

#### 새로운 타입을 들여와 인터페이스를 강화하자
***

날짜를 나타내는 어떤 클래스에 넣을 생성자를 설계하고 있다고 가정합시다.

```c++
class Date
{
public:
  Date(int month, int day, int year);
  ...
};
```

첫 인상이 나쁘지 않지만, 사용자가 실수를 저지를 구멍이 적어도 2개는 있습니다.
- 매개 변수의 순서가 잘못될 여지가 있다.
- 월과 일에 해당하는 숫자가 논리상 맞지 않을 수 있다.

소제목에서 알 수 있듯이, 새로운 타입을 들여와 인터페이스를 강화하면 상당수의 사용자 실수를 막을 수 있습니다. 월, 연, 일을 구분하는 간단한 Wrapper Type을 각각 만들고 이 타입을 Date 생성자 안에 둘 수 있을 것 입니다.

```c++
struct Day
{
  explicit Day(int d); // 사용자가 직접 형변환을 해주어야
    : val(d) {}        // 형변환이 가능하도록 하는 키워드 explicit
  int val;
};

struct Month
{
  explicit Month(int m);
    : val(m) {} 
  int val;
}

struct Year
{
  explicit Year(int y);
    : val(y) {} 
  int val;
}
```
<br>
추가로 각 타입의 값에 제약을 줄 수도 있습니다. 다음의 예제를 봅시다.

```c++
class Month
{
public:
  static Month Jan() { return Month(1) };
  static Month Feb() { return Month(2) };
...
...
  static Month Dec() { return Month(12) };
...
}
```

자 여기서 잠깐 질문!, static 비지역 정적 변수를 왜 사용하지 않았을까요?, 우리는 이미 답을 알고 있습니다. 비지역 정적 객체의 초기화는 번역 단위 밖에서는 순서를 보장할 수 없습니다. 기억이 나지 않으시면 [항목4](/effectcpp/effective_cpp_chapter_1_4/)를 다시 한번 확인해보세요. ^_^

#### 일관성 있는 인터페이스를 제공하라
***
예상 되는 사용자의 실수를 막는 방법으로는 타입에 제약을 부여하는 방법이 있습니다. const 붙이기가 바로 그것이지요. [항목3](/effectcpp/effective_cpp_chapter_1_3/)
에 정리가 잘 되어있습니다.  

```c++
if ( a * b = c) ...
```

만약 위의 operator*의 반환 값이 const가 아니었다면요?(끔찍하군요) 여러분이 만든 operator\*에 const 제한자를 붙이는 것은 더 나아가 STL 컨테이너와 기본 타입과의 일관성까지도 제공하는 셈이 되는 것이지요.

#### 사용자의 암기력에 의존하지 마라
***

사용자가 인터페이스를 사용함에 있어서 지켜야할 규칙을 모두 암기하고 있다면 그것은 좋은 인터페이스 설계라고 할 수 없습니다. 사용자는 언제라도 규칙을 어길 가능성이 있습니다.  

다음은 객체를 할당하고 포인터를 반환하는 팩터리 메서드 입니다.

```c++
Investment* createInvestment();
```

위의 함수를 사용할 때는, 자원 누출을 피하기 위해 반환 받은 포인터를 나중에라도 해제 해주어야 합니다. 당연히 사용자는 해제하는 것을 까먹을 수 있습니다. 어떻게 하는 것이 좋을까요? 우리는 스마트 포인터를 이용할 수 있습니다. 아래의 예를 봅시다.

```c++
std::shared_ptr<Investment> createInvestment();
```

이렇게 해두면 사용자는 shared_ptr을 이용해서 반환 값을 받을 수 밖에 없겠지요. 앞에서도 공부했듯이 shared_ptr에는 custom deleter를 지원합니다. 그렇다면 이번에는 이런 가정을 해봅시다.  

사용자는 포인터에 대한 자원의 해제를 getRidOfInvestment라는 이름의 함수를 사용해야만 하는 상황이라면 어떨까요?(단순 메모리 해제가 아니라 무언가 작업을 더 해주어야만 하는 상황이겠지요)

자 다음의 코드를 보면 쉽게 이해하실 수 있을 겁니다.

```c++
std::shared_ptr<Investment> createInvestment()
{
  std::shared_ptr<Investment> retVal(static_cast<Investment*>(0), getRidOfInvestment);
  retVal = ...;
  ...
  ...
  return retVal;
}
```

#### 그 밖의 std::shared_ptr의 특징
***
앞서 저는 effective c++을 공부하면서, 현재의 modern c++과는 다른 내용에 대해서는 과감히 빼고 새로운 내용을 넣겠다고 했었습니다.  


책에서는 std::tr1::shared_ptr에 대해 설명하고 있는데요. 저는 std::shared_ptr에 대해 설명하도록 하겠습니다.
먼저 std::shared_ptr은 cross-DLL problem에 대해 안전합니다. cross-DLL problem 즉 교차 DLL 문제는 2개 이상의 동적 링크 라이브러리를 사용하는 상황에서 다른 한쪽의 new를 사용했을 때, 나머지 한쪽에 정의된 delete를 사용하여 할당한 자원을 해제할 때 발생하는 런타임 에러를 지칭하는데요. std::shared_ptr을 사용하면 아주 손쉽게 해결이 가능합니다.  

또 하나 책에서는 boost의 shared_ptr을 사용하면 약간의 오버헤드는 발생하지만 Thread-safety하게 사용할 수 있다고 하는데요. std::shared_ptr은 해당 기능을 제공하지는 않지만 std::atomic을 사용하여 Thread-safety하게 사용할 수 있습니다. std::atomic에 대해서는 따로 정리해보도록 하겠습니다.

#### ***End Note***
***
- 좋은 인터페이스는 제대로 쓰기엔 쉬우며, 엉터리로 쓰기엔 어렵습니다. 인터페이스를 만들 때는 이 특성을 지닐 수 있도록 고민하고 또 고민합시다.
- 인터페이스의 올바른 사용을 이끄는 방법으로는 인터페이스 사이의 일관성 잡아주기, 그리고 기본제공 타입과의 동작 호환성 유지하기가 있습니다.
- 사용자의 실수를 방지하는 방법으로는 새로운 타입 만들기, 타입에 대한 연산을 제한하기, 객체의 값에 대해 제약 걸기, 자원 관리 작업을 사용자 책임으로 놓지 않기가 있습니다.
- shared_ptr은 Custom Deleter를 지원 합니다. 이 특징 때문에 shared_ptr은 교차 DLL 문제를 막아주며, 뮤텍스 등을 자동으로 잠금 해제하는 데 쓸 수 있습니다.

#### Reference 
***  
- ***Effective C++ (Scott Meyers)***

<body translate="no" oncontextmenu="return false" ondragstart="return false" onselectstart="return false">
  <div id="mouse_no" oncontextmenu="return false" ondragstart="return false" onselectstart="return false">
  </div>
</body>