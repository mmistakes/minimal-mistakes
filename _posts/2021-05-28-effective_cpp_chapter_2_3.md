---
published: true
layout: single
title: "[Effective C++] 7. 다형성을 가진 기본 클래스에서는 소멸자를 반드시 가상 소멸자로 선언하자"
category: effectcpp
tags:
comments: true
sidebar:
  nav: "mainMenu"
---  
*Effective C++ 제 3판 - Chapter 2 - 3*
* * *

아래의 기본 클래스에서 파생된 클래스들이 있다고 칩시다.

```c++
class TimeKeeper
{
public:
    TimeKeeper();
    ~TimeKepper();
    ...
};

class AtomicClock: public TimeKeeper {...};
class WaterClock: public TimeKeeper {...};
class WristWatch: public TimeKeeper {...};
```
<br>
이 클래스의 사용자들은 시간 정보에 접근하고 싶습니다. 물론 시간 계산이 어떻게 되는지는 신경쓰고 싶지 않겠지요. 어떤 시간기록 인스턴스에 대한 포인터를 가져오는 용도로 팩토리 함수를 만들어 놓읍시다.

```c++
TimeKeeper* getTimeKeeper();
```
<br>
팩토리 함수의 기존 규약을 그대로 따라간다면, getTimeKeeper 함수에서 반환되는 객체는 힙 영역에 존쟈하므로, 결국 메모리 및 기타 자원의 누출을 막기 위해 해당 객체를 적절히 삭제(delete)해야 합니다. 잘 이해가 가지 않으신다구요? 네 그럼 팩토리 함수와 메모리 영역에 대해 먼저 짚고 넘어 가도록 해봅시다. (저도 까먹어서 복습하는 겁니다 ㅎㅎ.. 모른다고 자책하지 마세요)  

#### 메모리 구조
OS에서 프로세스에 메모리를 할당할 때 기능에 따라 4가지 영역으로 분류하여 메모리를 할당합니다. 각 영역은 아래의 4가지 영역이고, 각 영역이 언제 할당되고 어떤 기능과 연관이 있는지 알아봅시다.

- 코드 영역 : 코드 영역에는 실행할 프로그램의 코드가 저장되는 영역으로 텍스트 영역이라고도 불립니다. CPU는 코드 영역에 저장된 명령어를 하나씩 가져가 서 처리하게 됩니다.
- 데이터 영역 : 메모리의 데이터 영역에는 프로그램의 전역 변수와 정적 변수가 저장됩니다. 데이터 영역의 프로그램의 시작과 함께 할당되며 프로그램이 종료하면 소멸합니다.
- 스택 영역 : 스택 영역은 함수의 호출과 연관되는 지역 변수와 매개 변수가 저장되는 영역입니다. 스택 영역은 함수의 호출과 함께 할당되며, 함수의 호출이 완료되면 소멸합니다. 이름에서 알 수 있듯이 스택 영역은 스택 자료구조의 원리로 동작합니다.
- 힙 영역 : 힙 영역은 사용자가 직접 관리할 수 있는 그리고 해야하만 하는 영역 입니다. 사용자에 의해 메모리 공간이 동적으로 할당되고 해제됩니다. 즉 런타임에 메모리 영역의 크기가 동적으로 바뀝니다. 사용자가 동적 할당(malloc, new 등)을 하면 힙 영역에 할당 됩니다.  

이 정도면, 메모리 영역에 대한 기초 개념으로는 충분한 것 같네요. 사실 억지로 암기하지 않아도 필요할 때마다 찾아보는 것만으로도 충분한 것 같습니다.

#### 팩토리 메소드 패턴

자, 이번에는 디자인 패턴 중 하나인 팩토리 메소드 패턴에 대해 알아봅시다. 팩토리 메소드 패턴은 추상 클래스에서 객체를 만드는 인터페이스만 제공하고 실제로 어떤 객체가 생성될지는 서브클래스에서 결정하도록 하는 디자인 패턴입니다.  

```c++

```


<body translate="no" oncontextmenu="return false" ondragstart="return false" onselectstart="return false">
  <div id="mouse_no" oncontextmenu="return false" ondragstart="return false" onselectstart="return false">
  </div>
</body> 