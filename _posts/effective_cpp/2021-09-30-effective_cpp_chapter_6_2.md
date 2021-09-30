---
published: true
layout: single
title: "[Effective C++] 33. 상속된 이름을 숨기는 일은 피하자"
category: effectcpp
tags:
comments: true
sidebar:
  nav: "mainMenu"
---  
* * *

제목에 '상속'이라는 말이 들어갔지만, 사실 상속과는 별 관계가 없습니다. 진짜 관계가 있는 것은 유효범위(Scope)입니다. 우선 다음의 코드를 보면서 시작하도록 하죠.

```c++
int x; // 전역 변수

void someFunc()
{
    double x; // 지역 변수
    std::cin >> x; // 입력을 받아서, 지역 변수 x에 값을 읽어 넣습니다
}
```

값을 읽어 x에 넣는 위의 코드에서 실제로 참조하는 x는 전역 변수 x가 아니라 지역 변수 x입니다. 안쪽 유효범위에 있는 이름이 바깥쪽 유효범위의 이름을 가리기 때문입니다. 너무나 잘 알고 있는 개념입니다. 하지만 상속 관계에서는 어떨까요?  

믿기 힘드시겠지만, public 관계로 상속 받은 기본 클래스의 함수들을 파생 클래스에서 접근 할 수 없을 수도 있습니다. 바로 이어서 알아봅시다.

#### using 선언
* * *
아래의 코드를 보고나면 이 것을 에러로 처리하는 것이 과연 올바른가?라고 생각하게 됩니다. 왜냐하면 public 상속의 경우 기본 클래스의 모든 것을 상속 받는다고 했기 때문입니다.
그런데 코드는 그렇지 않습니다. 오버로딩 된 함수들은 파생 클래스의 이름에 가려져서 에러를 발생시킵니다. 컴파일러는 이런 경우를 일종의 실수로 간주하겠다는 것입니다.

```c++
class Base
{
private:
    int x;

public:
    virtual void mf1() = 0;
    virtual void mf1(int);
    virtual void mf2();
    
    void mf3();
    void mf3(double);
    ...
};

class Derived : public Base
{
public:
    virtual void mf1();
    void mf3();
    void mf4();
};
```
```c++
Derived d;
int x;
...
d.mf1();  // 좋습니다. Derived::mf1을 호출합니다.
d.mf1(x); // 에러입니다! Derived::mf1이 Base::mf1을 가립니다.

d.mf2();  // Base::mf2를 호출합니다.

d.mf3();  // 문제 없습니다.
d.mf3(x); // 에러입니다! Derived::mf3이 Base::mf3을 가립니다.
```

<br>

이런 경우 기본 클래스의 함수에 접근할 방법이 없는 것일까요? 그렇지 않습니다. 우리는 using을 사용하여 기본 클래스 함수에 접근할 수 있습니다. 아래 예제를 함께 보시죠.

```c++
class Base
{
private:
    int x;

public:
    virtual void mf1() = 0;
    virtual void mf1(int);
    virtual void mf2();
    
    void mf3();
    void mf3(double);
    ...
};

class Derived : public Base
{
public:
    using Base::mf1; // Base에 있는 것들 중 mf1과 mf3을 이름으로 가진 것들을
    using Base::mf3; // Derived의 유효범위에서 볼 수 있도록 만듭니다.
    virtual void mf1();
    void mf3();
    void mf4();
};
```
```c++
Derived d;
int x;
...
d.mf1();  // 좋습니다. Derived::mf1을 호출합니다.
d.mf1(x); // 이제는 괜찮습니다. Base::mf1을 호출합니다.

d.mf2();  // Base::mf2를 호출합니다.

d.mf3();  // 문제 없습니다.
d.mf3(x); // 이제는 괜찮습니다. Base::mf1을 호출합니다.
```

using 선언을 통해 가려진 이름의 함수에 접근할 수 있게 됩니다.

<br>

#### Forwarding Function
* * *

자, using 선언 외에 또 한가지 다른 방법을 알아보겠습니다. Forwarding 함수가 바로 그것인데요. 아래 예제를 보시면 바로 이해할 수 있습니다. 
파생 클래스에서 기본 클래스의 함수를 호출하는 Forwarding 함수를 정의하는 것이 바로 그 방법입니다.

```c++
class Base
{
public:
    virtual void mf1() = 0;
    virtual void mf1(int);
    ...
};

class Derived : private Base
{
public:
    virtual void mf1()
    { Base::mf1(); }
    ...
};
```
```c++
...
Derived d;
int x;

d.mf1();  // Derived::mf1이 호출되면서 Base::mf1이 호출될 것 입니다./
d.mf1(x); // 에러 입니다.
```

#### ***End Note***
***
- 파생 클래스의 이름은 기본 클래스의 이름을 가립니다. public 상속에서만 이런 이름 가림 현상은 바람직하지 않습니다.
- 가려진 이름을 다시 볼 수 있게 하는 방법으로 using 선언 혹은 Forwarding 함수를 사용할 수 있습니다.

#### Reference 
***  
- ***Effective C++ (Scott Meyers)***

<body translate="no" oncontextmenu="return false" ondragstart="return false" onselectstart="return false">
  <div id="mouse_no" oncontextmenu="return false" ondragstart="return false" onselectstart="return false">
  </div>
</body>