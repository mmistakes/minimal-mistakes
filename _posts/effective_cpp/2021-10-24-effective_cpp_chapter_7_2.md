---
published: true
layout: single
title: "[Effective C++] 42. typename의 두 가지 의미를 제대로 파악하자."
category: effectcpp
tags:
comments: true
sidebar:
  nav: "mainMenu"
---  
* * *

Question. 아래 두 템플릿 선언문에 쓰인 class와 typename의 차이점이 무엇일까요?

```c++
template<class T> class Widget;    // class를 사용합니다.
template<typename T> class Widget; // typename을 사용합니다.
```

Answer. 차이가 없습니다. C++의 관점에서 보면, 템플릿 매개변수를 선언하는 경우의 class 및 typename은 완전히 같은 의미를 지닙니다.  

그렇다고 언제까지나 class와 typename이 C++ 앞에서 동등d한 것만은 아닙니다. 먼저 템플릿에서 참고할 수 있는 이름의 종류가 두 가지라는 것부터 짚고 넘어가도록 하죠.  


아래와 같은 함수 템플렛이 있다고 가정합시다. (참고로 아래 코드는 컴파일 되지 않습니다.)

```c++
template<typename C>
void print2nd(const C& container)
{
    if (container.size() >= 2)
    {
        C::const_iterator iter(container.begin());
        ++iter;
        int value = *iter;
        std::cout << value;
    }

}
```

위의 코드에서 쓰이는 지역 변수 2개가 있습니다. 하나는 iter, 또 하나는 value 입니다. **템플릿 내의 이름 중에 이렇게 템플릿 매개변수에 종속된 것을 가리켜 의존 이름(dependent name)이라고 합니다.**
그리고 의존 이름이 어떤 클래스 안에 중첩되어 있는 경우가 있는데, 이 경우의 이름을 중첩 의존 이름이라고 부릅니다. 위의 코드에서 C::Const_iterator은 중첩 의존 이름입니다. 사실 더 정확하게 말하자면 중첩 의존 타입 이름이라고 말해야 맞습니다.  

참고로, print2nd의 또 하나의 지역 변수 int value는 비의존 이름(non-dependent name)이라고 합니다. 자 이제 용어에 대한 설명은 끝났고 본론으로 들어가 보도록 하죠. 코드 안에 중첩 의존 이름이 있으면 골치 아픈 일이 생깁니다. 바로 컴파일러가 구문분석을 할 때 중첩 의존 이름을 type이 아닌 변수로 본다는 것 입니다. 즉 아래의 코드에서 **C::const_iterator * x**를 포인터형 변수 선언이 아니라 변수의 곱을 실행하는 구문으로 본다는 것이지요.

```c++
template<typename C>
void print2nd(const C& container)
{
  C::const_iterator * x;
  ...
}
```

다시 말해, 중첩 의존 이름은 기본적으로 타입이 아닌 것으로 해석 됩니다. 그렇다면 이런 경우에는 어떻게 해야 컴파일러가 타입으로 해석하도록 할 수 있을까요?


#### 중첩 의존 이름을 type으로 구문해석 시키는 방법
* * *
중첩 의존 이름을 type으로 구문해석 시키는 두가지 방법이 있습니다.
- 초기화 리스트 내에 기본 클래스 식별자로서 위치시키는 방법 (이 경우 typename을 붙이면 안됨)
- typename 키워드를 사용하는 방법

```c++
template<typename T>
class Derived : public Base<T>::Nested
{
public:
  explicit Derived(int x)
  : Base<T>::Nested(x)
  {
    typename Base<T>::Nested temp;
    ...
  }
  ...
};
```

참고로, 두번째 방법에 따라 작성한 아래의 코드가 약간 어색할 수도 있겠지만, 문법상으로 아무런 하자가 없는 코드라는 점도 짚고 넘어가도록 합시다.
```c++
template<typename IterT>
void workWithIterator(IterT iter)
{
  typedef typename std::iterator_traits<IterT>::value_type value_type;
  value_type temp(*iter);
  ...
}
```

#### ***End Note***
***
- 템플릿 매개변수를 선언할 때, class 및 typename은 서로 바꾸어 써도 무방합니다.
- 중첩 의존 타입 이름을 식별하는 용도에는 반드시 typename을 사용합니다. 단, 중첩 의존 이름이 기본 클래스 리스트에 있거나 멤버 
초기화 리스트 내의 기본 클래스 식별자로 있는 경우에는 예외 입니다.

#### Reference 
***  
- ***Effective C++ (Scott Meyers)***

<body translate="no" oncontextmenu="return false" ondragstart="return false" onselectstart="return false">
  <div id="mouse_no" oncontextmenu="return false" ondragstart="return false" onselectstart="return false">
  </div>
</body>
