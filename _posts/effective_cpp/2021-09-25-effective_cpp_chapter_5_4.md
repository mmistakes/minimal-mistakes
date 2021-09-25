---
published: true
layout: single
title: "[Effective C++] 29. 예외 안전성이 확보되는 그날 위해 싸우고 또 싸우자!"
category: effectcpp
tags:
comments: true
sidebar:
  nav: "mainMenu"
---  
* * *

스레딩 환경에서 동작할 수 있도록 설계된,  배경 화면을 제어할 수 있는 클래스가 있다고 가정해봅시다.

```c++
class PrettyMenu
{
public:
    ...
    void changeBackground(std::istream& imgSrc):
    ...

private:
    Mutex mutex;
    Image *bgImage; // 현재 배경 그림
    int imageChanges;
};

void PrettyMenu::changeBackground(std::istream& imgSrc)
{
    lock(&mutex);
    delete bgImage;
    ++imageChanges;
    bgImage = new Image(imgSrc);
    unlock(&mutex);
}
```

예외 안전성의 측면에서 위의 함수는 매우 나쁜 예라고 할 수 있습니다. 적어도 예외 안전성을 가진 함수라면 아래와 같이 동작해야겠지요.

#### 자원이 새도록 만들지 않습니다. 
- 그런데 위의 코드에서는 자원이 새고 잇습니다. new Image(imgSrc)에서 예외를 던질 경우 unlock 함수가 실행돠ㅣ지 않게 되어 뮤텍스가 계속 자원을 점유한채로 남기 때문입니다.

#### 자료구조가 더럽혀지는 것을 허용하지 않아야 합니다. 
- 그런데 위의 코드에서 new Image(imgSrc)에서 예외를 던질 경우 bgImage가 가리키는 객체는 이미 delete 되고 난 후 입니다. 게다가 새 그림이 제대로 깔린 게 아님에도 imageChanges 변수는 증가됩니다.

<br>
자원이 새는 문제는 그리 까다로운 것이 아닙니다. 다음 예제는 항목 14에서 가져온 구현 입니다(RAII).

```c++
void PrettyMenu::changeBackground(std::istream& imgSrc)
{
    Lock ml(&mutex); // 소멸자 호출 시점에 자원 해제를 하는 RAII Lock Class

    delete bgImage;
    ++imageChanges;
    bgImage = new Image(imgSrc);
}
```

이렇게 해서 자원 누수 문제는 해결했지만, 여전히 자료 구조 오염이라는 문제는 남아 있습니다. 지금부터는 자료 구조 오염 문제에 대한 해결 방법을 알아보겠습니다. 단 그전에 우리가 고를 수 있는 예외 안전성에 대한 보장의 형태에는 무엇이 있는지 공부해봅시다.

#### 예외 안전성 보장의 3가지 형태
* * *
- 기본적인 보장(basic gurantee) : 함수 동작 중에 예외가 발생하면 실행 중인 프로그램에 관련된 모든 것들을 유효한 상태로 유지하겠다는 보장입니다. 예를 들어 changeBackground 함수가 동작하다가 예외가 발생했을 때 PrettyMenu 객체는 바로 이전의 배경그림을 그대로 계속 그릴 수도 있고, 디폴트 배경 그림을 사용할 수도 있고.. 등등 함수를 만든 사람에 전적으로 달려 있는 보장 입니다.
- 강력한 보장(strong gurantee) : 함수 동작 중에 예외가 발생하면, 프로그램의 상태를 절대로 변경하지 않는다는 보장입니다. "사용하기 편리한가"의 측면에서 보면 강력한 보장을 제공하는 함수가 기본 보장을 제공하는 함수보다 더 쉽습니다. 함수가 성공적으로 실행을 마친 후의 상태, 아니면 함수가 호출 될 때의 상태, 2가지만 존재하는 것 입니다.
- 예외불가 보장(nothrow gurantee) : 예외를 절대로 던지지 않겠다는 보장입니다. 약속한 동작은 언제나 끝까지 완수하는 함수라는 뜻입니다. 기본제공 타입에 대한 모든 연산은 예외를 던지지 않게 되어 있습니다(즉 예외불가 보장이 제공됩니다).  

어떤 예외도 던지지 않게끔 명시적으로 예외 지정이 된 함수는 "예외불가 보장"에 해당하지 않습니다. 즉 아래의 예는 우리가 원하는 예외 안전성이 보장되는 형태의 코드가 아니라는 것 입니다. (지정되지 않은 예외가 발생했을 경우에 실행되는 처리자인 unexpected 함수가 호출되어야 한다는 뜻입니다.)  

```c++
int doSometing() throw(); 
// (since c++17)
// int doSometing() noexcept; 
```  
  
자, 위의 세 가지 보장 중에 하나를 고르라면 아무래도 실용성이 있는 강력한 보장이 괜찮아 보입니다. 예외 안전성의 관점에서 보았을 때 예외불가 보장이 가장 훌륭하겠지만, 동적 할당 메모리를 사용하는 쪽(STL 컨테이너가 실제로 그렇습니다)만 보아도, 요청에 맞는 메모리를 확보할 수 없으면 bad_alloc 예외를 던지도록 구현되어 있지 않습니까?, 즉 현실적으로는 대부분의 함수에 있어서 기본적인 보장 또는 강력한 보장 중 하나를 고르게 됩니다.  

changeBackground의 경우, 강력한 보장을 **거의** 제공하는 것은 어렵지 않습니다.

```c++
class PrettyMenu
{
    ...
    std::shared_ptr<Image> bgImage;
    ...
};

void PrettyMenu::changeBackground(std::istream& imgSrc)
{
    Lock m1(&mutex);
    bgImage.reset(new Image(imgSrc));
    ++imageChange;
}
```

자, 이제는 이전의 Image 객체를 프로그래머가 직접 삭제할 필요가 없습니다. 게다가 새로운 배경 그림이 제대로 만들어졌을 때만, 배경 그림의 삭제 작업이 이루어지도록 바뀐 점도 눈에 들어옵니다. (즉, reset 함수가 정상 호출 돠려면 new 동작에서 예외를 던지지 않는 경우겠지요.)  

#### pimpl idom을 활용한 copy-and-swap 예외 안전 보장.
* * *
자 이번엔 pimpl 관용구와 swap을 사용하여 강력한 예외 안전성을 보장하는 함수를 구현해보겠습니다.

```c++
struct PrettyMenuImpl
{
    std::shared_ptr<Image> bgImage;
    int imageChanges;
};

class PrettyMenu
{
    ...
private:
    Mutex mutex;
    std::shared_ptr<PrettyMenuImpl> pImpl;
};

void PrettyMenu::changeBackground(std::istream& imgSrc)
{
    using std::swap;

    Lock ml(&mutex);
    std::shared_ptr<PrettyMenuImpl> pNew(new PrettyMenuImpl(*pImpl));
    pNew->bgImage.reset(new Image(imgSrc));
    ++pNew->imageChanges;

    swap(pImpl, pNew);
}
```

위의 copy-and-swap 방식은 객체의 상태를 전부 바꾸거나 또는 아예 바꾸지 않거나 (all-or-nothing) 방식으로 유지하려는 경우에 아주 적절합니다. 그러나 함수 전체가 강력한 예외 안전성을 갖도록 보장하지 않는다는 것이 정설입니다. 왜그럴까요? 아래의 예를 봅시다.

```c++
void someFunc()
{
    ... // do copy
    f1();
    f2();
    ... // do swap
}
```

자 이제 뚜렷하게 보입니다. 만약 f1 또는 f2에서 보장하는 예외 안전성이 강력하지 못하면 위의 구조로는 강력한 예외 안전성 보장이 불가능합니다. 또한 f1과 f2가 강력한 보장을 한다고 해도 문제 입니다. 예를 들어 f1이 잘 실행되고 나면 프로그램 상태는 f1에 어떻게든 변해 있을 것이고 f2가 실행되다가 예외를 던지면 그 프로그램의 상태는 someFunc가 호출 될 때의 상태와 이미 달라져 있으므로 all-or-nothing이 불가능합니다.  

즉, 다시 정리해보자면 자기 자신에만 국한된 것들의 상태를 바꾸며 동작하는 함수의 경우에는 강력한 보장을 제공하기가 비교적 수월하지만 비지역 데이터에 대해 조작하는 경우 어떻게 손을 쓸 방법이 없습니디ㅏ. 예를 들어 그 데이터가 DB일 경우 이미 Commit 되었다면 다른 사용자가 변경 사항을 이미 참조했을 수 있겠지요.  

강력한 예외 안전성 보장을 제공하고 싶어서 아무리 열을 내더라도 이런 문제 때문에 발목을 잡힐 수 있다는 사실을 알고 계셔야 합니다. 또한 복사 및 맞바꾸기 하는데 드는 비용도 무시할 수 없겠지요. 현업에서는 위와 같은 문제로 기본적인 보장을 제공해야만 하는 경우가 더 많을 것 입니다.

#### ***End Note***
***
- 예외 안전성을 갖춘 함수는 실행 중 예외가 발생되더라도 자원을 누출시키지 않으며 자료구조를 더럽힌 채로 내버려 두지 않습니다. 이런 함수들이 제공할 수 있는 예외 안전성 보장은 기본적인 보장, 강력한 보장, 예외 금지 보장이 있습니다.
- 강력한 예외 안전성 보장은 복사-후-맞바꾸기 방법을 써서 구현할 수 있지만, 모든 함수에 대해 강력한 보장이 실용적인 것은 아닙니다.
- 어떤 함수가 제공하는 예외 안전성 보장의 강도는, 그 함수가 내부적으로 호출하는 함수들이 제공하는 가장 약한 보장을 넘지 않습니다.

#### Reference 
***  
- ***Effective C++ (Scott Meyers)***

<body translate="no" oncontextmenu="return false" ondragstart="return false" onselectstart="return false">
  <div id="mouse_no" oncontextmenu="return false" ondragstart="return false" onselectstart="return false">
  </div>
</body>