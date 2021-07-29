---
published: true
layout: single
title: "[Effective C++] 28. 내부에서 사용하는 객체에 대한 핸들을 반환하는 코드는 되도록 피하자"
category: effectcpp
tags:
comments: true
sidebar:
  nav: "mainMenu"
---  
* * *

사각형을 사용하는 어떤 응용 프로그램을 만들고 있습니다. 사각형은 좌측 상단 및 우측 하단 꼭짓점 두 개로 나타낼 수 있지요.  

그래서 꼭짓점을 나타내는 클래스와 2개의 꼭짓점으로 사각형의 영역을 정의하는 클래스를 정의하기로 마음 먹었습니다. 그리고 메모리 부담을 줄이고 싶다는 생각에 RectData라는 실제 꼭짓점 영역을 가지는 클래스를 정의하고 RectData를 가리키는 Rectangle 클래스를 또 정의하였습니다.

```c++
class Point
{
public:
  Point(int x, int y);
  ...
  void setX(int newVal);
  void setY(int newVal);
  ...
};

struct RectData
{
  Point ulhc; // 좌측 하단, upper left-hand corner
  Point lrhc; // 우측 하단, lower right-hand corner
};

class Rectangle
{
  ...
private:
  std::shared_ptr<RectData> pData;
};
```

Rectangle 클래스의 사용자는 분명히 영역정보를 알아내어 쓸 때가 있을 것이므로, Rectangle 클래스에는 upperleft 및 lowerRight 함수가 멤버 함수로 아래와 같이 들어 있다고 해봅시다. 또한 "값에 의한 전달 방식보다 참조에 의한 전달 방식이 좋다"라는 생각이 들어서 참조를 반환하도록 구현했다고 해보죠.

```c++
class Rectangle
{
public:
  ...
  Point& upperLeft() const { return pData->ulhc; }
  Point& lowerRight() const { return pData->lrhc; }
  ...
};
```
컴파일은 잘 됩니다. 그런데 결정적으로 틀렸습니다. 먼저 upperLeft 함수와 lowerRight 함수는 상수 멤버 함수 입니다. 그렇지만 이들이 반환하는 값들은 private 멤버에 대한 참조 값 들입니다. 잘 이해가 가지 않으신다구요? 아래 예제를 보도록 합시다.

```c++
Point coord1(0, 0);
Point coord2(100, 100);

const Rectangle rec(coord1, coord2); // 0, 0부터 100, 100의 영역을 초기화
rec.upperLeft().setX(50); // upperLeft()를 통해 반환 받은 참조 값으로 private 멤버의 값을 수정했습니다.
```

private로 선언된 멤버를 반환한 핸들을 통해 접근하여 수정하고 있습니다. 즉 우리는 다음과 같은 교훈을 얻을 수 있을 겁니다.

- 클래스 데이터 멤버는 아무리 숨겨도 그 멤버의 참조자를 반환하는 함수들의 최대 접근도에 따라 캡슐화 정도가 정해진다.
- 어떤 객체에서 호출한 상수 멤버 함수에서 반환된 참조자 값의 실제 데이터가 그 객체의 바깥에 저장되어 있다면, 이 함수의 호출부에서 그 데이터의 수정이 가능하다는 점입니다. 사실 이건 비트수준 상수성의 한계가 가진 부수적 성질에 불과합니다 [항목3](/effectcpp/effective_cpp_chapter_1_3/)

지금까지 참조자를 반환하는 멤버 함수에 대해 얘기했지만, 포인터나 반복자(iterator)를 반환하도록 되어 있었다 해도 마찬가지입니다.  

그리고 또 한가지, 내부요소라고 하는 것은 데이터 멤버만 생각할 수 있겠지만 사실 멤버 함수도 내부요소에 속하지요. 그러니 멤버 함수 포인터를 반환하는 멤버 함수라고 다르지 않겠지요?

자! 하지만 멤버 함수의 포인터를 반환하는 함수가 그렇게 흔치 않은 것은 사실이므로, 다시 Rectangle 클래스로 돌아가보도록 합시다. 그렇다면 어떻게 해주어야 쓸만한 클래스가 될까요?

```c++
class Rectangle
{
public:
  ...
  const Point& upperLeft() const { return pData->ulhc; }
  const Point& lowerRight() const { return pData->lrhc; }
  ...
};
```

자 위와 같이 반환 타입에 const를 붙여주면 사용자는 정의하는 꼭짓점 쌍을 읽을 수는 있지만, 쓸 수는 없게 됩니다. const로 반환된 값을 변경할 수는 없겠지요.  

하지만, 아직도 뭔가 찜찜합니다. upperLeft 함수와 lowerRight 함수를 보면 내부 데이터에 대한 핸들을 반환하고 있는 부분이 남아 있습니다. 이것을 남겨두면 다른 쪽에서 문제가 될 수 있지요. 무효참조 핸들(dangling handle)이 바로 그것 입니다.  

예를 하나 들어 보겠습니다.

```c++
class GUIObject { ... };
const Rectangle boundingBox(const GUIObject& obj);

GUIObject *pgo // pgo를 사용하여 GUIObject를 가리키도록 합시다
... 
... // 여기서 pgo에 GUIObject를 할당하는 동작을 합니다.
...
const Point *pUpperLeft  = &(boundingBox(*pgo).upperLeft());
```

위의 코드가 실행되고 나면, pUpperLeft에는 어떤 값이 남을까요? 찬찬히 살펴봅시다. boundingBox는 pgo를 사용하여 Rectangle 임시 객체를 반환할 것 입니다. 그리고 upperLeft를 호출하여 임시 객체의 Point 값을 반환하고, 마지막으로 &가 붙어 있으니 주소 값을 pUpperLeft에 할당하겠지요.  

그런데 해당 라인이 끝나고 나면 임시 객체는 소멸 된다는 사실을 잊어서는 안됩니다 (Lvalue, Rvalue 개념). 다시 말해 이 코드들은 무용한 코드라는 말이 됩니다. 객체 내부의 핸들을 반환하는 것이 위험하다는 것은 바로 이러한 이유들 때문에 나오는 것입니다.

그렇다고 해서, 핸들을 반환하는 멤버 함수를 **절대로** 두지 말라는 것은 아닙니다. 예를 들어 operatorp[] 연산자는 string이나 vector 등의 클래스에서 개개의 원소를 참조할 수 있게 만드는 용도로 제공되고 있는데, 실제로 이 연산자는 내부적으로 해당 컨테이너에 들어 있는 개개의 원소 데이터에 대한 참조자를 반환하는 식으로 동작하고 있지요

#### ***End Note***
***
- 어떤 객체의 내부요소에 대한 핸들(참조자, 포인터, 반복자)을 반환하는 것은 되도록 피하세요. 캡슐화 정보를 높이고, 상수 멤버 함수가 객체의 상수성을 유지한 채로 동작할 수 있도록 하며, 무효참조 핸들이 생기는 경우를 최소화할 수 있습니다.

#### Reference 
***  
- ***Effective C++ (Scott Meyers)***

<body translate="no" oncontextmenu="return false" ondragstart="return false" onselectstart="return false">
  <div id="mouse_no" oncontextmenu="return false" ondragstart="return false" onselectstart="return false">
  </div>
</body>