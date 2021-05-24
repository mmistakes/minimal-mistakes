---
published: true
layout: single
title: "[Effective C++] 5. C++가 은근슬쩍 만들어 호출해 버리는 함수들에 촉각을 세우자"
category: effectcpp
tags:
comments: true
sidebar:
  nav: "mainMenu"
---  
*Effective C++ 제 3판 - Chapter 2 - 1*
* * *

클래스가 비어 있지만 비어 있는게 아닐 때가 있습니다. 아래의 예를 봅시다.

```c++
class Empty {};
```

이 클래스는 실제로 비어 있을까요? 그렇지 않습니다. 실제로는 아래의 코드와 동일하다고 볼 수 있죠.

```c++
class Empty
{
public:
    Empty() { ... }
    Empty(const Empty& rhs) { ... }
    ~Empty() { ... }
}
```

위의 기본 생성자, 기본 소멸자, 복사 생성자, 복사 대입 연산자는 컴파일러가 여러분 대신 선언해 놓습니다. 그리고 이들은 public 멤버이며 inline 함수 입니다. 단 이들은 항상 생성되는 것은 아닙니다. 컴파일러가 필요하다고 판단할 때만 만들어 집니다. 그리고 필요하다고 판단하는 조건은 아래와 같습니다.

```c++
Empty e1; // 기본 생성자, 기본 소멸자

Empty e2(e1) // 복사 생성자

e2 = e1 // 복사 대입 생성자
```

그렇다면 컴파일러가 만드는 함수들은 어떤 역할을 할까요? 생성자와 소멸자에는 기본 클래스 및 비정적 데이터 멤버의 생성자와 소멸자를 호출하는 코드가 생성됩니다. 그리고 이 때 소멸자는 클래스가 상속한 기본 클래스의 소멸자가 가상 소멸자로 되어 있지 않으면 똑같이 비가상 소멸자로 만들어 집니다. (즉 소멸자의 가상성을 상속 받는 다는 점을 기억 합시다.)  

복사 생성자와 복사 대입 연산자의 경우는 어떨까요? 그들의 경우 하는 일은 매우 간단 합니다. 원본 객체를 사본 객체에 복사하는 일이 전부이지요. 아래의 예를 어디한번 같이 볼까요?  

```c++
template<typename T>
class NamedObject
{
public:
    NamedObject(const char *name, const T& value);
    NamedObject(const std::string& name, const T& value);
    ...

private:
    std::string nameValue;
    T objectValue;
};
```

이 NamedObject 템플릿 클래스 내부에는 생성자가 선언되어 있으므로 컴파일러는 기본생성자를 생성하지 않습니다. 그러니 인자를 받지 않는 생성자를 필요로 하지 않아서 선언하지 않는다면, 컴파일러가 자동으로 생성하면 어떡하지라는 걱정은 안해도 됩니다.  

반면, 위의 예제에는 복사 생성자나 복사 대입 연산자는 없습니다. 그러니 컴파일러에 의해 자동으로 생성되겠지요. 만약 위의 T가 int라면 아래의 예에서 복사 생성자는 어떻게 동작할까요?

```c++
NamedObject<int> no1("Smallest Prime Number", 2);
NamedObject<int> no2(no1);
```

컴파일러가 생성한 복사 생성자는 no1.nameValue와 no1.objectValue를 사용해서 no2.nameValue와 no2.objectValue를 초기화 해야할 것 입니다. std::string은 자체 복사 생성자를 가지고 있으므로 초기화가 이루어지겠죠. 그러면 int type은 어떨까요? 기본 제공 타입인 int는 비트를 그대로 복사해 오는 것으로 끝납니다. (너무나도 당연하게 이해가 됩니다)  

그렇다면 복사 대입 연산자는 어떨까요? 근본적으로는 동작 원리가 같습니다. 자동 생성을 거부하는 경우가 있습니다. 예를 들어 다음의 코드를 같이 보시죠.  

```c++
template<class T>
class NamedObject
{
public:
    NamedObject(std::string& name, const T& value);
    ...

private:
    std::string& nameValue;  // 참조자 멤버
    const T objcetValue;     // 상수 멤버
}

...

NamedObject<int> p(newDog, 2);

NamedObject<int> s(oldDog, 37);

p = s;
...
```

위의 코드는 컴파일러가 허용할 수 있을까요?. 상식적으로 허용할 수 없습니다. 참조자는 한번 초기화 되고 나면 다른 객체를 참조 할 수 없죠. nameValue는 참조자 멤버인데 어떻게 동작해야할까요? 게다가 상수는 변경이 불가능한데 값이 바뀌어야 하는건가요? (말이 안됩니다.)

잠깐 여기서 "참조자는 한번 초기화되고 나면 다른 객체를 더 이상 참조할 수 없습니다", 이 말이 잘 이해가 가지 않으신다구요? 그래서 준비했습니다. 아래 예제를 보시죠. 아래의 ref는 value1을 참조하도록 초기화 되었습니다 이후 value2를 ref에 대입했지만 ref는 value2를 참조하는 것이 아니라 여전히 value1을 참조하고 있다는 것을 알 수 있습니다. (참조가 변경 되었다면 value2를 대입하고 7을 대입했다면 value2가 7로 변경 되었어야 했겠죠?)

```c++
#include <iostream>

int main()
{
    int value1 = 5;
    int value2 = 6;

    int& ref = value1;

    std::cout << "value1 : " << ref << std::endl;
	
    ref = value2;
    ref = 7;

    std::cout << "value1 : " << value1 << ", value2 : " << value2 << std::endl;
}

-----------------------------
value1 : 5
value1 : 7, value2 : 6
-----------------------------

```

자 다시 돌아와서 이런 말도 안되는 경우에 대해 컴파일러는 거부합니다. 즉 상수 멤버와 참조자 멤버를 가지는 객체의 경우 복사 대입 연산자 정의를 직접해줄 필요가 있습니다. 기억합시다!.

#### ***End Note***
- Empty Class는 사실 생성자, 소멸자, 복사 생성자, 복사 대입 연산자를 기본으로 가집니다. 그리고 그것들은 항상 생성되는 것은 아니고 필요한 경우 컴파일러가 생성합니다.
- 기본 생성자의 경우 생성자를 사용자가 정의한다면 생성되지 않습니다.
- 소멸자의 경우 가상 함수에서 파생된 클래스가 아니라면 가상 소멸자를 가지지 않습니다.
- 참조자, 상수를 멤버로 가지는 클래스의 경우 대입 연산자를 직접 정의해주어야 합니다. 

#### Reference 
***  
- ***Effective C++ (Scott Meyers)***

<body translate="no" oncontextmenu="return false" ondragstart="return false" onselectstart="return false">
  <div id="mouse_no" oncontextmenu="return false" ondragstart="return false" onselectstart="return false">
  </div>
</body>