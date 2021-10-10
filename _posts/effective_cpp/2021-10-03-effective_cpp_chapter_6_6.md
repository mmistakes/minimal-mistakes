---
published: true
layout: single
title: "[Effective C++] 37. 어떤 함수에 대해서도 상속받은 기본 매개변수 값은 절대로 재정의하지 말자"
category: effectcpp
tags:
comments: true
sidebar:
  nav: "mainMenu"
---  
* * *

우선 앞서 배운 내용으로 주제를 축소 시켜보겠습니다. 
비가상 함수는 어떠한 경우에도 재정의하면 안되므로, 
이번 주제는 기본 매개변수 값을 가진 가상함수를 상속하는 경우로 범위를 좁히겠습니다.

그러면 가상 함수의 기본 매개변수를 재정의하는 것은 왜 하면 안될까요? 이유는 가상 함수는 동적으로 바인딩되지만, 기본 매개변수 값은 정적으로 바인딩되기 때문입니다. 우선 아래의 예를 보겠습니다.

```c++
class Shape
{
public:
    enum ShapeColor { Red, Green, Blue };

    virtual void raw(ShapeColor color = Red) const = 0;
    ...
};

class Rectangle : public Shape
{
public:
    // 기본 매개변수 값이 달라진 부분을 놓치지 마세요. 큰일 났습니다.!
    virtual void draw(ShapeColor color = Green) const;
    ...
};

class Circle : public Shape
{
public:
    virtual void draw(ShapeColor color) const;
    ...
};
```
<br>
이번에는 위의 클래스를 사용해서 포인터를 사용해보겠습니다.

```c++
Shape *ps;                     // 정적 타입 Shape*
Shape *pc = new Circle;        // 정적 타입 Shape*
Shape *pr = new Rectangle;     // 정적 타입 Shape*
```

이 객체의 정적 타입은 모두 Shape*입니다. 그렇다면 동적 타입은 무엇일까요?. 동적 타입은 현재 그 객체가 진짜로 무엇이냐에 따라 결정되는 타입입니다. pc의 동적 타입은 Circle*이고, pr의 동적 타입은 Rectangle*입니다. ps의 경우엔 동적 타입이 없습니다.  

동적 타입은 이름에서 풍기는 느낌 그대로 프로그램이 실행되는 도중에 바뀔 수 있습니다.

```c++
ps = pc; // ps 동적 타입은 이제 Circle*가 됩니다.
ps = pr; // ps 동적 타입은 이제 Rectangle*가 됩니다.
```

여기까지는 한번쯤은 공부하신 C++ 책에서도 나온 내용일 것 입니다. 가상 함수도 무엇인지 대부분 알고 계시겠지요. 그런데 기본 매개변수 값이 정해진 가상 함수로 오게 되면 뭔가 꼬이기 시작합니다.  

이유는 앞서 말씀드렸듯이, 가상 함수는 동적으로 바인딩되어 있지만, 기본 매개변수는 정적으로 바인딩되어 있기 때문입니다. 그러니깐 **파생 클래스에서 정의된 가상 함수를 호출하면서 기본 클래스에 정의된 기본 매개변수 값을 사용해 버릴 수 있다는 이야기 입니다.** 기본 클래스의 가상 함수의 기본 매개 변수를 파생 클래스에서 재정의하는 것은 말이 안된다는 것이지요.

```c++
// Shape::draw의 기본 매개변수는 Red
// Rectangle::draw의 기본 매개변수는 Green
pr->draw(); // Rectangle* 객체가 Rectangle::draw(Green)이 아닌 
            // Rectangle::draw(Red)를 호출합니다!!!
```

즉, 예제를 확인해보면 위와 같은 말도 안되는 동작이 발생해버립니다. 그러면 결국 우리는 기본 클래스의 가상함수의 매개변수와 파생 클래스에서 재정의된 함수의 매개변수를 항상 동일하게 맞춰주어야 하겠지요. 아래 예제를 같이 확인해봅시다.

```c++
class Shape
{
public:
    enum ShapeColor { Red, Green, Blue };
    virtual void draw(ShapeColor color = Red) const = 0;
    ...
};

class Rectangle : public Shape
{
public:
    virtual void draw(ShapeColor color = Red) const;
    ...
};
```

이것으로 된 걸까요? 중복 코드는 물론이거니와 Shape 기본 클래스의 기본 매개 변수를 변경해야하는 상황이 오면 모든 파생 클래스의 매개 변수도 모두 수정해야하는 번거로움이 생깁니다. 물론 사용자가 수정 누락을 하지 않는다는 보장도 없구요. 더 아름다운 방법이 없을까요? 우리는 방법이 있습니다. 바로 NVI 관용구를 사용할 수 있습니다. 예제를 통해 알아봅시다.

#### Non-Virtual Interface (NVI) 관용구
* * *

```c++
class Shape
{
public:
    enum ShapeColor { Red, Green, Blue };
    void draw(ShapeColor color = Red) const // 이제는 비가상 함수 입니다.
    {
        // doDraw는 기본 매개변수를 가질 수 없습니다.
        // draw를 통해서 항상 매개 변수가 들어가기 때문이지요.
        doDraw(color); // 가상 함수를 호출 합니다.
    }
    ...
private:
    virtual void doDraw(ShapeColor color) const = 0; // 실제 동작은 여기서 이루어 집니다.
};


class Rectangle : public Shape
{
public:
    ...
private:
    virtual void doDraw(ShapeColor color) const; // 매개변수 값이 없습니다.
    ...
};
```

비가상 함수는 파생 클래스에서 오버라이드 되면 안 되기 때문에 위와 같이 설계하면 draw 함수의 color 매개변수에 기본값을 깔끔하게 Red로 고정시킬 수 있습니다.

#### ***End Note***
***
- 상속받은 기본 매개변수 값은 절대로 재정의해서는 안됩니다. 왜냐하면 기본 매개변수 값은 정적으로 바인딩되는 반면, 가상 함수는 동적으로 바인딩 되기 때문입니다.

#### Reference 
***  
- ***Effective C++ (Scott Meyers)***

<body translate="no" oncontextmenu="return false" ondragstart="return false" onselectstart="return false">
  <div id="mouse_no" oncontextmenu="return false" ondragstart="return false" onselectstart="return false">
  </div>
</body>