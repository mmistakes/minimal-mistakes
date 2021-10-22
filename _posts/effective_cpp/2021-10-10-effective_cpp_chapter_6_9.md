---
published: true
layout: single
title: "[Effective C++] 40. 다중 상속은 심사숙고해서 사용하자"
category: effectcpp
tags:
comments: true
sidebar:
  nav: "mainMenu"
---  
* * *

다중 상속에 대한 C++ 개발자들의 견해는 아직도 의견이 분분한 편입니다. 다중 상속하면 바로 떠오르는 하나는 다중 상속 때문에 모호성이 생긴다는 것이지요.

```c++
class BorrowableItem
{
public:
    void checkOut();
    ...
};

class ElectronicGadget
{
private:
    bool checkOut() const;
    ...
};

class MP3Player : public BorrowableItem, public ElectronicGadget
{
    ...
};

MP3Player mp;
mp.checkOut(); // 모호성 발생!!
```
  
위의 구조에서는, MP3Player 클래스에서 호출하는 checkOut 함수는 public, private에 의해 BorrowableItem::checkOut이 되어야 하겠지만, 실제로는 그렇지 않다는 것 입니다. 우리의 생각과는 달리 모호성이 발생한다는 것이지요. 이것은 C++의 규칙에 따른 것이고, 작금의 모호성을 해결하기 위해서는 호출할 기본 클래스의 함수를 사용자가 손수 지정해 주어야 합니다.

```c++
mp.BorrowableItem::checkOut(); // 당연히 ElectronicGadget::checkOut은 안되겠지요?, 
                               // private 함수를 호출한다는 에러가 나올 겁니다.
```

#### 가상(virtual) 기본 클래스의 상속과 비용
* * *

다중 상속의 의미는 그냥 '둘 이상의 클래스로부터 상속을 받는 것'일 뿐이지만, 상위 단계의 기본 클래스를 여러 개 갖는 클래스에서 심심치 않게 눈에 띕니다. 이런 구조의 계통에서는 소위 죽음의 MI 마름모 꼴이라고 알려진 좋지 않은 모양이 나올 수 있습니다.

```c++
class File { ... };

class InputFile : public File { ... };

class OutputFile : public File { ... };

class IOFile : public InputFile, public OutputFile { ... };
```

즉, IOFile 클래스는 2개의 기본 클래스를 통해, 최상위 File 클래스에서 동일한 이름의 fileName 데이터 멤버를 2개 상속 받게 되고 다중 상속 받은 파생 클래스에서 fileName에 접근하려면 어느 클래스를 통해 접근할 클래스인지 명시적으로 지정해주어야한다는 말씀입니다.

만약 데이터 멤버의 중복 생성을 원하지 않는다면요? 그럴 땐 virtual 상속을 통해서 중복 생성을 막을 수 있습니다. 그렇지만 사실, 데이터 멤버의 중복 생성을 막기 위해서는 컴파일러의 숨은 꼼수가 필요합니다. 그리고 그 꼼수 덕택에, 가상 상속을 사용하는 클래스로 만들어진 객체는 가상 상속을 쓰지 않은 것보다 일반적으로 크기가 더큽니다. 즉 가상 상속의 비용은 비쌉니다. 또한 가상 상속 받은 기본 클래스의 초기화와 관련된 규칙은 훨씬 복잡하고 직관성도 떨어지지요.

- 초기화가 필요한 가상 기본 클래스로부터 클래스가 파생된 경우, 이 파생 클래스는 가상 기본 클래스와의 거리에 상관 없이 가상 기본 클래스의 존재를 염두에 두고 있어야 한다. (기본 클래스의 초기화를 떠맡아야 한다.)
- 기존의 클래스 계통에 파생 클래스를 새로 추가할 때도, 그 파생 클래스는 가상 기본 클래스의 초기화를 떠맡아야 한다.  

정리하자면, 가상 기본 클래스에 대해 드릴 수 있는 조언은 지극히 간단합니다. 첫째 구태여 쓸 필요가 없으면 가상 기본 클래스를 사용하지마세요. 둘째, 가상 기본 클래스를 정말 쓰지 않으면 안 될 상황이라면, 가상 기본 클래스에는 데이터를 넣지 않는 쪽으로 최대한 신경을 쓰세요.

#### 다중 상속을 적법하게 사용할 수 있는 경우
* * *

책에는 구구절절 서론이 길고, 타당성을 설명하기 위해 예를 들고 있지만 굳이 여기서 설명하지 않겠습니다. 여러 시나리오 중 하나이겠지만 파생되는 2개의 클래스 중 하나는 인터페이스 클래스이고, 다른 하나는 기능만을 가져오는 private 상속을 할 때 입니다. 이런 경우 객체 기향 기법의 도구 중 하나로서 매우 유용하게 사용할 수 있습니다.

#### ***End Note***
***
- 다중 상속은 단일 상속보다 확실히 복잡합니다. 새로운 모호성 문제를 일으킬 뿐만 아니라 가상 상속이 필요해질 수도 있습니다.
- 가상 상속을 쓰면 크기 비용, 속도 비용이 늘어나며, 초기화 및 대입 연산의 복잡도가 커집니다. 따라서 가상 기본 클래스에는 데이터를 두지 않는 것이 현실적으로 가장 실용적 입니다.
- **다중 상속을 적법하게 쓸 수 있는 경우가 있습니다. 여러 시나리오 중 하나는, 인터페이스 클래스로부터 public 상속을 시킴과 동시에 구현을 돕는 클래스로부터 private 상속을 시키는 것 입니다.**

#### Reference 
***  
- ***Effective C++ (Scott Meyers)***

<body translate="no" oncontextmenu="return false" ondragstart="return false" onselectstart="return false">
  <div id="mouse_no" oncontextmenu="return false" ondragstart="return false" onselectstart="return false">
  </div>
</body>