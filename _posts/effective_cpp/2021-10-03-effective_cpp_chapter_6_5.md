---
published: true
layout: single
title: "[Effective C++] 36. 상속 받은 비가상 함수를 파생 클래스에서 재정의하는 것은 금물!"
category: effectcpp
tags:
comments: true
sidebar:
  nav: "mainMenu"
---  
* * *

D라는 이름의 클래스가 B라는 이름의 클래스로부터 public 상속에 의해 파생되었고, B 클래스에는 mf라는 이름의 public 멤버 함수가 정의되어 있다고 가정합시다. 

```c++
class B
{
public:
  void mf();
  ...
};

class D : public B { ... };
```

B나 D, 혹은 mf에 대해 전혀 모르는 상태에서 D 타입의 객체인 x가 다음처럼 있다고 할 때, 두 개의 mf()가 동일하게 동작하는 것은 당연하겠지요.

```c++
D x; // x는 D 타입으로 생성된 객체입니다.

B *pb = &x;
pB->mf();
```

```
D *pb = &x;
pD->mf();
```

하지만, mf가 비가상 함수이고, D 클래스가 자체적으로 mf 함수를 또 정의하고 있으면 아래와 같이 동작할 것 입니다.

```c++
class D : public B
{
public:
  void mf();
  ...
};

pB->mf(); // B::mf를 호출합니다.
pD->mf(); // D::mf를 호출합니다.
```

 B::mf 및  D::mf 등의 비가상 함수는 정적 바인딩으로 묶이기 때문입니다. 무슨 뜻인고 하니, pDB는 B에 대한 포인터타입으로 선언되었기 때문에, pB를 통해 호출되는 비가상 함수는 항상 B클래스에 정의되어 있을 것이라고 결정해 버린다는 말입니다. 심지어 B에서 파생된 객체를 pB가 가리키고 있다 해도 해도 마찬가지입니다.  

 반면 가상 함수의 경우엔 동적 바인딩으로 묶입니다. 만약 여러분이 D 클래스를 만드는 도중에 B 클래스로부터 물려받은 비가상 함수인 mf를 재정의해 버리면, D 클래스는 일관성 없는 동작을 보이는 이상한 클래스가 됩니다. 특히, 분명히 D 객체인데도, 이 객체에서 mf 함수를 호출하면 B와 D 중 어디로 뛸지 모르는 길지자 행보를 보인다는 것입니다. 게다가 B냐 D냐를 좌우하는 요인이 해당 객체 자신이 아니라 그 객체를 가리키는 포인터의 타입이라는 점이 심각하게 이상해보입니다.

 지금 말씀드린 내용이 다형성을 부여한 기본 클래스의 소멸자를 반드시 가상함수로 만들어야하는 이유와도 일맥상통합니다. 즉 상속받은 비가상 함수를 재정의하는 일은 절대로 하지 맙시다.

 #### ***End Note***
***
- 상속받은 비가상 함수를 재정의하는 일은 절대로 하지맙시다.

#### Reference 
***  
- ***Effective C++ (Scott Meyers)***

<body translate="no" oncontextmenu="return false" ondragstart="return false" onselectstart="return false">
  <div id="mouse_no" oncontextmenu="return false" ondragstart="return false" onselectstart="return false">
  </div>
</body>