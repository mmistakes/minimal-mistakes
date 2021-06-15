---
published: true
layout: single
title: "[Effective C++] 11. operator=에서는 자기대입에 대한 처리가 빠지지 않도록 하자"
category: effectcpp
tags:
comments: true
sidebar:
  nav: "mainMenu"
---  
*Effective C++ 제 3판 - Chapter 2 - 7*
* * *

자기 대입이란, 어떤 객체가 자기 자신에 대해 대입 연산자를 적용하는 것을 말합니다.

```c++
class Widget { ... };

Widget w;
...
w = w;
```

위 예제는 언뜻 보아도 문제 있어 보이지만, 컴파일러는 에러를 발생시키지 않습니다. 


이후 챕터에서 배우겠지만, 자원 관리 용도로 항상 객체를 만들어야할 것이고, 이렇게 만든 자원 관리 객체들이 복사될 때 잘 동작하도록 코딩할게 분명합니다.  

바로 이때 조심해야하는 것이 대입 연산자 입니다. 이 연산자는 신경쓰지 않아도 자기 대입에 대해 안전하게 동작해야만 합니다.  

예를 하나 들겠습니다. 동적 할당된 비트맵을 가리키는 포인터를 멤버로 가지는 클래스를 하나 만들었다고 가정해 봅시다.

```c++
class Bitmap { ... };

class Widget
{
  ...

public:
  Bitmap *p_bitMap;
};
```

이번엔 겉보기엔 멀쩡해보이는 operator=의 구현 코드를 보시겠습니다.

```c++
Widget& Widget::operator=(const Widget& rhs)
{
  delete p_bitMap;
  p_bitMap = new Bitmap(*rhs.p_bitMap);
  return *this
}
```

여기서 찾을 수 있는 자기 참조 문제는 rhs와 *this가 같은 객체일 가능성이 있다는 것 입니다. 그렇게 되면
rhs는 자기 자신의 멤버를 삭제하고 이미 삭제가 되어 버린 멤버로 생성자를 호출하게 되는 것 입니다.  

이런 에러에 대한 대책은 전통적으로 operator=의 첫머리에서 **일치성 검사**를 통해 자기 대입을 점검하는 것 입니다.

```c++
Widget& Widget::operator=(const Widget& rhs)
{
  if (this == &rhs)
  {
    return *this;
  }

  delete p_bitMap;
  p_bitMap = new Bitmap(*rhs.p_bitMap);
  return *this
}
```

하지만 이것으로 끝난 것이 아닙니다. 자기 대입 뿐만이 아니라 예외에도 안전하지 않기 때문이지요. 만약 new Bitmap에서 예외가 발생하게 된다면
(동적 할당에 필요한 메모리 부족, Bitmap 클래스의 복사 생성자에서 예외를 던진다든지 등), Widget 객체는 결국 삭제된 Bitmap을 가리키는 포인터를 껴안고 홀로 남게 됩니다.  

자 다행스럽게도, operator=을 예외에 안전하게 구현하면 자기대입에도 안전한 코드가 나오게 되어 있습니다. 다음 예제를 함께 봅시다.

```c++
Widget& Widget::operator=(const Widget& rhs)
{
  Bitmap *pOrigin = p_bitMap;
  p_bitMap = new Bitmap(*rhs.pb);
  delete pOrigin
  return *this;
}
```

이 코드는 이제 예외에 안전합니다. new Bitmap 동작에서 예외가 발생하더라도 p_bitMap은 변경되지 않은 상태가 유지되기 때문이죠. 그리고 원본
비트맵을 복사해 놓고, 복사해 놓은 사본을 포인터가 가리키게 만든 후, 원본을 삭제하는 순서로 실행되기 때문입니다.  

물론 이 방법이 자기대입을 처리하는 가장 효율적인 방법이라고 할 수 없겠지만 동작에는 아무 문제가 없습니다. 효율이 신경쓰인 나머지 일치성 테스트를 함수 앞단에 
도로 붙여놓고 싶은 분들도 계실겁니다. 하지만 일치성 검사 코드가 들어가게 되면 그만큼 코드가 커지고, 처리 흐름에 분기를 만들게 되므로 실행 시간 속력이 줄어들 수 있습니다.
CPU 명령어 선행인출, 캐시, 파이프라이닝 등의 효과도 떨어질 수 있고요.

#### Copy and Swap 기법
***
방금 확인한 실행 순서를 조작하는 방법 외에 예외와 자기 대입에 안전한 operator=를 구현하는 다른 방법이 있습니다.\

copy and swap이라고 알려진 기법인데, 이 기법은 사실 예외 안전성과 아주 밀접한 관련이 있어서 뒤에서 자세히 다룰 예정입니다. 하지만 이 기법은 operator= 작성에 아주 자주 쓰이기 때문에 어떤 식으로 구현하는지만 여기서 보셔도 도움이 됩니다. (물론 swap은 복사 동작이 비효율적 입니다. 뒤에서 효율적으로 처리하는 방법에 대해 공부할 예정 입니다.)

```c++
class Widget
{
  ...
  void swap(Widget& rhs);
  ...
};

Widget& Widget::operator=(const Widget& rhs)
{
  Widget temp(rhs); // rhs의 사본을 만듭니다.
  swap(temp);       // 만들어진 사본과 *this의 데이터를 맞바꿉니다.
  return *this;
}
```

이 방법은 C++가 가진 다음 두가지 특징을 활용해서 조금 다르게 구현할 수도 있습니다.
- 클래스의 복사 대입 연산자는 인자를 참조가 아닌 값으로 취하도록 선언하는 것이 가능하다.
- 값에 의한 전달을 수행하면 대상의 사본이 생긴다.

```c++
Widget& Widget::operator=(Widget rhs)
{
  swap(rhs); // *this의 데이터를 이 사본의 데이터와 바꿉니다.
  return this*
}
```

#### ***End Note***
***
- operator=을 구현할 때, 어떤 객체가 그 자신에 대입되는 경우를 제대로 처리하도록 만들자. 원본 객체와 복사대상 객체의 주소를 비교해도 되고, 문장의 순서를 적절히 조정할 수도 있고, 복사 후 맞바꾸기 기법을 써도 됩니다.
- 두 개 이상의 객체에 대해 동작하는 함수가 있따면, 이 함수에 넘겨지는 객체들이 사실 같은 객체인 경우에 정확하게 동작하는지 확인해 봅시다.

#### Reference 
***  
- ***Effective C++ (Scott Meyers)***

<body translate="no" oncontextmenu="return false" ondragstart="return false" onselectstart="return false">
  <div id="mouse_no" oncontextmenu="return false" ondragstart="return false" onselectstart="return false">
  </div>
</body>