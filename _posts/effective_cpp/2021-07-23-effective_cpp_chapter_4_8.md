---
published: true
layout: single
title: "[Effective C++] 25. 예외를 던지지 않는 swap에 대한 지원도 생각해 보자"
category: effectcpp
tags:
comments: true
sidebar:
  nav: "mainMenu"
---  
* * *

swap은 상당히 재미있는 함수입니다. swap은 초창기부터 STL에 포함된 이래로 예외 안전성 프로그래밍에 없어선 안 될 감초 역할로서, 자기대입 현상의 가능성에 대처하기 위한 대표적인 매커니즘으로서 널리 사랑받아 왔습니다.([항목11](/effectcpp/effective_cpp_chapter_2_7/))  

이렇게 쓸모가 많은 swap을 사용할 때 발생할 수 있는 문제는 무엇인지, 그리고 또 어떻게 대처해야 쓸만한 swap을 만들 수 있는가를 고민해볼 필요가 있습니다.

두 객체의 값을 '맞바꾸기'한다는 것은 각자의 값을 상대방에게 주는 동작입니다. 기본적으로는 이 맞바꾸기 동작을 위해 STL에서 제공하는 swap을 쓰는데, 이 알고리즘이 구현된 모습을 보면 여러분이 알고 있는 그 swap과 하나도 다르지 않다는 것을 알 수 있습니다.

```c++
namespace std
{
  template<typename T>
  void swap(T& a, T& b)
  {
    T temp(a);
    a = b;
    b = temp;
  }
}
```

std::swap을 보고나서 머리를 망치로 한대 맞은 것 같은 얼얼함이나 감동은 없습니다. STL에서도 우리가 평소 직접 만든 swap과 다름없이 복사 생성자의 호출이 3번이나 이루어지고 있는 것을 볼 수 있습니다.  

이 swap을 좀 더 효율적으로 만들 수는 없을까요? 참고로 c++ idiom 중에는 pimpl idiom이라는 것이 있습니다. pimpl을 이용하여 swap을 사용하는 예를 한번 보겠습니다.

#### pimpl idiom
***

```c++
class WidgetImpl
{
public:
  ...

private:
  int a, b, c            // 많은 데이터들이 있을 겁니다.
  std::vector<double> v; // 뭐가 있든 복사 비용이 높겠지요?
  ...
};

class Widget // pimpl 관용구를 사용한 클래스
{
public:
  Widget(const Widget& rhs);

  Widget& operator=(const Widget& rhs)
  {
    ...
    *pimple = *(rhs.pImpl);
    ...
  }
  ...
private:
  WidgetImpl *pImpl;
};
```

이렇게 만들어진 Widget 객체를 우리가 직접 맞바꾼다면, pImpl 포인터만 살짝 바꾸는 것 말고는 실제로 할 일이 없습니다. 하지만 이런 사정을 표준 swap이 알 턱이 없지요. 언제나처럼 Widget 객체를 3번 복사하고, 그것도 모자라서 WidgetImpl 객체 3개도 복사할 것 입니다.  

그래서 조금 손을 보고 싶습니다. std::swap에다가 뭔가를 알려주는 거죠. Widget 객체를 맞바꿀 때는 일반적인 방법을 쓰지말고 내부의 pimpl 포인터만 맞바꾸라고 말입니다. C++로의 std::swap을 Widget에 대해 특수화하는 방법으로 방금 말씀드린 것을 구현할 수 있습니다.

```c++
namespace std
{
  template<>
  void swap<Widget>(Widget& a, Widget& b)
  {
    swap(a.pImpl, b.pImpl);
  }
}
```

그런데 위의 코드는 컴파일이 되지 않습니다. 이유는 pImpl 변수가 private 멤버이기 때문이지요. 우리는 Widget 내부에서 std::swap을 수행하는 public으로 선언된 Widget::swap을 선언하므로서 이 문제를 해결하도록 합시다.


```c++
class Widget
{
...
  void swap(Widget& other)
  {
    using std::swap;           // std::swap을 바로 사용하지 않고
    swap(pImpl, other.pImpl);  // using 키워드를 사용하는 이유는 나중에 알아봅시다.
  }
...
};

namespace std
{
  template<>
  void swap<Widget>(Widget& a, Widget& b) // swap 함수 템플릿의 특수화 (부분 특수화 아닙니다.)
  {
    a.swap(b);
  }
}
```

자, 이제 컴파일이 잘 될 뿐만 아니라, 기존의 STL 컨테이너와 일관성도 유지되는 착한 코드가 되었습니다. 그런데 이제 이런 가정을 하나 더 해봅시다. Widget과 WidgetImpl이 클래스가 아니라 템플릿으로 만들어져 있어서, WidgetImpl에 저장된 데이터의 타입을 매개변수로 바꿀 수 있다면 어떻게 될까요?


#### pimpl을 클래스 템플릿으로 만들기
***

```c++
template<typename T>
class WidgetImpl { ... }

template<typename T>
class Widget { ... }

namespace std
{
  template<typename T>
  void swap<Widget<T>> (Widget<T>& a, Widget<T>& b) // Compile Error !!
  {
    a.swap(b);
  }
}
```

위의 코드에서 함수 템플릿을 부분 특수화하는 곳에서 우리는 좌절을 경험합니다. C++는 클래스 템플릿에 대해서는 부분 특수화를 허용하지만, 함수 템플릿에 대해서는 허용하지 않도록 정해져 있습니다.  

함수 템플릿을 '부분적으로 특수화'하고 싶을 때 흔히 취하는 방법은 그냥 오버로드 버전을 하나 추가하는 것입니다. 즉, 이렇게 하면 됩니다. (아직 문제가 해결된 건 아닙니다.)

```c++
namespace std
{
  template<typename T>
  void swap(Widget<T>& a, Widget<T>& b) // swap 뒤에 <T>가 없습니다!!
  {
    a.swap(b);
  }
}
```

일반적으로 함수 템플릿의 오버로딩은 별 문제가 없지만, std는 조금 특별한 네임스페이스이기 때문에 이 네임스페이스에 대한 규칙도 다소 특별합니다. std내의 템플릿에 대한 완전 특수화는 OK이지만, std에 새로운 템플릿을 추가하는 것은 OK가 아닙니다. 컴파일도 되고 실행도 됩니다. 하지만 실행되는 결과가 미정의 사항이라는 것입니다.  

그렇다면 어떻게 해야할까요? swap을 호출해서 우리만의 효율 좋은 템플릿 전용 버전을 쓰고 싶단 말입니다. 결론부터 말씀드리면, 멤버 swap을 호출하는 비멤버 swap을 선언해 놓되, 이 비멤버 함수를 std::swap의 특수화 버전이나 오버로딩 버전으로 선언하지만 않으면 됩니다. 다음의 예를 함께 보시죠.

```c++
namsepace WidgetStuff
{
  ...                     // 템플릿으로 만들어진 WidgetImpl 및 기타 등등

  template<typename T>    // 이전과 마찬가지로 swap이란
  class Widget { ... };   // 이름이 멤버 함수가 들어 있습니다.
  ...

  template<typename T>                    // 비멤버 swap 함수
  void swap(Widget<T>& a, Widget<T>& b)   // 이번엔 std 네임스페이스의 일부가 아닙니다.
  {
    a.swap(b);
  }
}
```

이제는 어떤 코드가 두 Widget 객체에 대해 swap을 호출하더라도, 컴파일러는 C++의 이름 탐색 규칙(쾨니그 탐색)에 의해 WidgetStuff 네임스페이스 안에서 Widget 특수화 버전을 찾아냅니다. 이것이 바로 우리가 원하던 바였습니다. 이 간단한 방법은 클래스 템플릿뿐만 아니라 클래스에 대해서도 잘 통하므로, 언제든 이 방법을 써야할 것 같다는 느낌이 듭니다.  

여러분이 만든 클래스 타입 전용의 swap이 되도록 많은 곳에서 호출되도록 만들고 싶으시면(그리고 그런 swap을 갖고 있다면), 그 클래스와 동일한 네임스페이스 안에 비멤버 버전의 swap을 만들어 넣고, 그와 동시에 std::swap의 특수화 버전도 준비해 두어야 하겠습니다. (std::swap의 특수화 버전이 있어야하는 이유는 바로 아래에서 추가 설명합니다.)

그런데 말입니다. 방금 말한 사항들은 namespace가 있든 없든 같습니다. 멤버 swap을 호출하는 비멤버 swap은 namespace에 상관 없이 필요합니다. 그렇다면 전역 namespace를 사용하지 않을 이유가 굳이 있을까요? 클래스, 템플릿, 함수, enum type, enum 상수, typedef 등의 온간 것들이 전역에 들어가고 있는데도 말지요. (이 부분은 개인 판단인 것 같은데, 제 생각엔 전역에 넣지 않는 것이 더 깔끔한 것 같긴 합니다. 전역에 넣으면 뭔가 지저분해 보여요. ㅎ...) 

***
<br>
자, 이번에는 "using std::swap"을 사용한 이유에 대해 알아봅시다. swap을 사용할 때 아래의 3가지 경우가 존재할 수 있다는 것을 알고 있습니다. 그리고 그것들은 다음과 같습니다.
- std에 있는 일반형 버전
- std에 있는 일반형을 특수화한 버전 (있거나 없거나 할 수 있습니다.)
- T 타입 전용의 버전 (있거나 없거나 할 수 있으며, 어떤 네임스페이스에 안에 있거나 없을 수 있습니다.)  

그렇다면 우리는 타입 T 전용 버전이 있으면 그것을 먼저 호출하고, 없을 경우에 std의 일반형 버전이 호출되도록 만들 수 있을까요? 바로 아래의 코드가 정답입니다.

```c++
template<typename T>
void dosomething(T& obj1, T& obj2)
{
  using std::swap;  // std::swap을 이 함수 안으로 끌어올 수 있도록 만드는 문장
  ...
  swap(obj1, obj2); // T 타입 전용의 swap을 호출합니다.
  ...
}
```

컴파일러가 위의 swap 호출문을 만났을 때 하는 일은 현재의 상황에 딱 맞는 swap을 찾는 것입니다. 우선 전역 유효범위 타입 T와 동일한 네임스페이스 안에 T 전용의 swap이 있는지를 찾습니다. 그 다음 std::swap 선언으로 인해, std의 swap을 쓰게끔 설정할 수 있습니다. 하지만 이런 상황이 되더라도 std::swap의 T 전용 버전을 일반형 템플릿보다 더 우선적으로 선택하도록 되어있기 때문에, T에 대한 std::swap의 특수화 버전이 이미 준비되어 있다면 결국 그 특수화 버전을 쓰게 됩니다.

별로 어렵지 않습니다. 딱 하나만 조심하면 됩니다. swap 호출 시 std:: 한정자를 붙이지만 않으면 됩니다. 자 여러분은 다음의 과정만 기억하면 됩니다.

1. 여러분의 타입으로 만들어진 두 객체의 값을 빠르게 맞바꾸는 함수를 swap이라는 이름으로 만들고 이것을 public 멤버 함수로 둡시다. (단 이 함수는 예외를 던져서는 안됩니다. 예외를 던져서는 안되다는 의미는 기본 타입에 의한 생성과 연산을 수행해야 한다는 의미 입니다. 포인터도 기본 타입에 해당하지요)

2. 여러분의 클래스 혹은 템플릿이 들어있는 네임스페이스와 같은 네임스페이스에 비멤버 swap을 만들어 넣습니다. 그리고 1번에서 만든 swap 멤버 함수를 이 비멤버 함수가 호출하도록 만듭니다.

3. 새로운 클래스를 만들고 있다면 그 클래스에 대한 std::swap의 특수화 버전을 준비합시다. 그리고 이 특수화 버전에서도 swap 멤버 함수를 호출 하도록 만듭시다.

그리고, 사용자 입장에서 swap을 호출할 때, swap을 호출하는 함수가 std::swap을 볼 수 있도록 using 선언을 합시다.


#### 예외 안전성을 보장하는 swap
***
마무리 짓지 않은 이야기가 하나 남았습니다. 멤버 버전의 swap은 절대로 예외를 던지지 않도록 만드는 것이지요. 그 이유는 swap을 진짜 쓸모 있게 응용하는 방법들 중에 클래스가 강력한 예외 안전성 보장을 제공하도록 도움을 주는 방법이 있기 때문입니다. 그 방법은 항목 29에서 자세히 다룰 예정 입니다. 

그런데 swap을 통해 클래스가 강력한 예외 안전성을 보장하도록 제공하는 그 방법은 swap이 예외를 던지지 않아야 한다는 가정을 깔고 있습니다. 비멤버 버전은 아니고 멤버 버전만 그렇습니다. (표준 swap은 복사 생성과 복사 대입에 기반하고 있는데 일반적으로 복사 생성 및 복사 대입 함수는 예외 발생이 허용되기 때문에 이런 제약을 받지 않습니다.) 따라서 swap을 직접 만들어야 한다면 예외를 던지지 않는 방법도 함께 준비해야할 것 입니다.

#### ***End Note***
***
- std::swap이 여러분의 타입에 대해 느리게 동작할 여지가 있다면 swap 멤버 함수를 제공하자. (단 예외를 던져선 안됨)
- 멤버 swap을 제공했으면 이 멤버를 호출하는 비멤버 swap도 제공하자, 클래스(템플릿이 아닌)에 대해서는 std::swap도 특수화 해두자
- 사용자 입장에서 swap을 호출할 때는, std::swap에 대한 using 선언을 넣어준 후에 네임스페이스 한정 없이 swap을 호출하자
- 사용자 정의 타입에 대한 std 템플릿을 완전 특수화하는 것은 가능합니다. 그러나 std에 어떤 것이라도 추가하려고 들지 맙시다.

#### Reference 
***  
- ***Effective C++ (Scott Meyers)***

<body translate="no" oncontextmenu="return false" ondragstart="return false" onselectstart="return false">
  <div id="mouse_no" oncontextmenu="return false" ondragstart="return false" onselectstart="return false">
  </div>
</body>