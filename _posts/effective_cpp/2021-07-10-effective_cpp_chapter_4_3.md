---
published: true
layout: single
title: "[Effective C++] 20. '값에 의한 전달'보다는 '상수객체 참조자에 의한 전달'방식을 택하는 편이 대개 낫다."
category: effectcpp
tags:
comments: true
sidebar:
  nav: "mainMenu"
---  
* * *

#### 값에 의한 전달에 드는 비용
***

기본적으로 c++ 함수로부터 객체를 전달받거나 함수에 객체를 전달할 때 '값에 의한 전달(pass-by-value)'방식을 사용합니다.  

함수 매개변수는 실제 인자의 '사본'을 통해 초기화되며, 어떤 함수를 호출한 ㅉ고은 그 함수가 반환한 값을 '사본'을 돌려받습니다. 이들 사본을 만들어내는 원천이 바로 복사 생성자 입니다. 이 점 때문에 '값에 의한 전달'이 고비용의 연산이 되기도 합니다.

어째서 그럴까요? 아래의 예제를 함께 봅시다.

```c++
bool validStudent(Student student);

Student ysbaek;
bool ysbaekIsOK = validStudent(ysbaek);
```
<br>
위 코드가 실행될 때 일어나는 일은 다음과 같습니다.
- validStudent가 호출되면 해당 함수의 인자 student에 ysbaek의 복사 생성자가 호출되고 stduent가 초기화됩니다.
- 생성자 내부에서 추가적인 동작이 있다면 해당 동작들을 수행합니다.
- 함수가 반환될 때 student는 더이상 필요가 없으므로 stduent의 소멸자가 호출 됩니다.

<br>
과연 여기서 끝일까요? Student 클래스는 사실 Person Class에서 파생된 Class 였습니다.

```c++
class Person
{
...
...
std::string name;
std::string address;
};

class Stduent : public Person
{
...
...
};
```

그러니 Person 객체의 std::string 멤버들의 생성자와 소멸자가 추가로 호출될 것 입니다. 이렇게 보니 너무나 많은 비용이 사용되고 있습니다.  

우리는 이러한 비용을 참조에 의한 전달을 통해서 줄일 수 있습니다. 아래의 예제를 함께 봅시다.

#### 참조에 의한 전달
***

아래의 예제는 더 이상 복사 생성자를 호출하지 않습니다. 또한 const 키워드를 추가함으로서 인자로 전달된 객체가 변형되어 버리는 상황도 막을 수 있습니다.

```c++
bool validStudent(const Student& student);
```

#### 복사손실 문제(slicing problem)
또한 복사손실 문제의 상황에서도 참조자는 사용될 수 있습니다. 아래의 상황을 보시죠

```c++
class Window
{
public:
...
...
    std::string name() const;
    virtual void display() const;
}

class WindowWithScrollBars : public Window
{
public:
...
    virtual void display() const;
}

void printNameAndDisplay(Window w)
{
    std::cout << w.name();
    w.display();
}

...
...
WindowWithScrollBars wwsb;
printNameAndDisplay(wwsb);
...
...
```

위와 같은 상황에서 무슨일이 벌어질까요? 매개변수 w가 생성되기는 하겠지요. 하지만 Window 객체로 만들어지면서 wwsb가 printNameAndDisplay 객체의 구실을 할 수 있는 부속 정보가 전부 싹둑 잘려 버립니다.  

WindowWithScrollBars::display()는 영원히 호출될 수 없지요. 마찬가지로 복사손실 문제에서 벗어나려면 참조자를 인자로 사용하도록 만들면 됩니다.

#### 항상 참조자가 올바른 선택은 아니다.
***
그렇다면 참조자를 인자로 전달하는 것이 항상 옳은 선택일까요? 그렇지 않습니다. 참조자로 넘기는 것보다 값으로 넘기는 편이 더 효율적일 때가 있지요.  

기본 제공 타입이 바로 그러합니다. 기본 제공 타입은 크기가 작지요. 그렇다면 크기가 항상 작으면 값으로 전달해도 괜찮은 것 일까요?  

그렇지 않습니다. 컴파일러 중에는 기본제공 타입과 사용자 정의 타입을 아예 다르게 취급하는 것들이 있습니다. 이를테면 기본 타입 double은 레지스터에 넣어주지만, 사용자 정의 타입 객체에 double만 덩그러니 있는 경우엔 레지스터에 넣지 않는 경우이지요. 이런 개발 환경에서 일하는 분은 차라리 참조에 의한 전달을 쓰는 편이 좋습니다. 포인터는 레지스터에 확실히 들어갈테니깐요.  

또한 크기가 작다고 해서 무조건 값으로 전달할 수 없는 이유가 있습니다. 사용자 정의 타입은 변화에 노출되어 있다는 것이지요. 지금의 크기가 작을지 몰라도 나중에는 커질 수 도 있다는 것입니다.

#### ***End Note***
***
- 값에 의한 전달보다는 상수 객체 참조자에의한 전달을 선호합시다. 대체적으로 효율적일뿐만 아니라 복사손실 문제까지 막아줍니다.
- 이번 항목에서 다룬 법칙은 **기본제공 타입 및 STL 반복자, 그리고 함수 객체 타입에는 맞지 않습니다.** 이들에 대해서는 값에 의한 전달이 더 적절합니다.

#### Reference 
***  
- ***Effective C++ (Scott Meyers)***

<body translate="no" oncontextmenu="return false" ondragstart="return false" onselectstart="return false">
  <div id="mouse_no" oncontextmenu="return false" ondragstart="return false" onselectstart="return false">
  </div>
</body>