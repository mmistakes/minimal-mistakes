---
published: true
layout: single
title: "[Effective C++] 13. 자원 관리에는 객체가 그만! - 1"
category: effectcpp
tags:
comments: true
sidebar:
  nav: "mainMenu"
---  
*Effective C++ 제 3판 - Chapter 3 - 1*
* * *

이번 챕터에서는 자원 관리를 효과적으로 도와주는 도구들에 대해 공부해보도록 하죠. 교재는 오래된 책이라 그런지 현재는 사용하지 않거나, C++11 이상의 최신 기술에 대한 설명은 미흡한 부분이 많습니다. (물론 C++11도 최신 기술이라고 하기엔 오래된 편입니다만...)  

그래서, 책의 내용 중 불필요한 내용은 과감히 버리고(미안해요 스콧옹), 필요한 내용은 새로 채워 넣도록 하겠습니다.

#### RAII(Resource Acquisition Is Initialization)
***
RAII는 디자인 패턴의 한 종류입니다. RAII는 Resource Acquisition Is Initialization의 약자인데, 이름만 보면 초기화나 생성자와 연관이 있을 것 같지만 실제로는 소멸자와 연관성 있습니다. C++에서는 자원 관리를 위해 RAII를 많이 사용 중이고, 또 표준 라이브러리에서도 RAII를 활용하여 구현된 것들이 많습니다.  

자 그럼 RAII를 간단한 예를 통해서 알아봅시다.

```c++
#include <iostream>
#include <mutex>

class AutoLock
{
public:
    AutoLock()
    {
        m_locker = new std::mutex();
    }

    ~AutoLock()
    {
        m_locker->unlock();
        delete m_locker;
        std::cout << "[AutoLock] ~AutoLock()" << std::endl;
    }
    
    void Lock();

private:
    std::mutex* m_locker;
};

void AutoLock::Lock()
{
    m_locker->lock();
    std::cout << "[AutoLock] Lock()" << std::endl;
}

int main()
{
    AutoLock locker;
    locker.Lock();
}
```

위의 예를 보면 감이 오시나요? 아직 감이 오지 않으신다구요? 더 쉬운 예를 들어보겠습니다. 만약 함수 내부에서 동적 할당을 하는 코드가 있다고 칩시다. 해당 내부에서 할당한 자원을 다시 회수하지 않으면 메모리 누수가 발생하겠지요. 그래서 사용자는 자원을 회수하도록 구현을 합니다. 하지만 시간이 흘러 함수 내부에 코드가 늘어나고 자원을 회수하기 전에 return으로 빠져나가거나 함수 내부에서 예외가 발생하여 자원을 회수하지 못하는 상황이 발생한다면요? 그런 경우가 발생하는 것을 100% 다 예측하여 모든 예외와 반환하는 곳에서 자원 회수 동작을 추가하기란 어려운 일이란 것을 잘 아실겁니다.  

그럼 위의 예를 다시 봅시다. 어떤가요? 함수를 빠져나오게 되면 AutoLock의 소멸자가 호출 될 것 입니다. 그러면 자동으로 소멸자에서 자원을 안전하게 회수하겠지요. 자 이제 RAII의 의도가 눈에 보이신다구요?, 그러면 이제부터는 이미 할당된 객체에 대해 RAII를 수행하도록 도와주는 스마트 포인터들에 대해서 알아봅시다.

#### unique_ptr\<T>
***
본 교재에서는 unique_ptr이 아닌 auto_ptr을 설명하고 있습니다. [TR1](#footnote_1)에 포함 되었던 아주 올드한 친구입니다. 이 녀석은 C++11부터 사용 중지 권고됐고, C++17부터는 아예 삭제되었지요. 왜 auto_ptr이 삭제 되었냐구요? 저는 알고 싶지 않지만, 간단히 설명하자면 **복사 생성자와 할당 연산자 구현이 멤버 데이터에 대한 깊은 복사 대신 얕은 복사를 하도록 되어 있기 때문입니다.** (굳이 궁금해하지말고 unique_ptr을 쓰도록 합시다.)  

자 그럼 unique_ptr의 기능 및 문법에 대해 알아 봅시다. 동적 할당을 통해 메모리를 사용하다보면 메모리를 가르키고 있는 포인터를 잃어버리는 일이 생깁니다. 사용자의 실수 또는 예외의 발생 등의 이유로 말이죠. 그런 경우를 위해 RAII를 사용한다고 하였습니다. 그런데 말이죠. RAII로 구현되지 않은 기본 타입 및 배열들과 STL type 등은 어떨까요? 이 때 우리는 unique_ptr을 사용할 수 있습니다.  

먼저 unique_ptr에 대해 간략히 알아봅시다. 아래는 unique_ptr의 특징입니다.
- <memotry> 헤더파일을 사용합니다.
- 괄호를 빠져나가면 unique_ptr이 소유하고 있던 메모리는 자동적으로 해제 됩니다.
- 다수의 인스턴스가 동일한 하나의 객체를 가르키는 것을 방지하기 위해서 사용합니다.
- 새로운 소유자로 이동은 가능하지만 복사하거나 공유할 수 없습니다.
- 자동 해제 외에 reset()과 release() 이후 delete 하는 방법으로 메모리 해제가 가능합니다.

자주 사용하는 unique_ptr의 기능은 다음과 같습니다.  

**1) 선언 방법**  
```c++
std::unique_ptr<T> ua2{new T(10)}; // c++ 11 이후
std::unique_ptr<T> ua3 = std::make_unique<T>(10); // c++ 14 이후
```
<br>
**2) reset()**  
- 다른 포인터로 초기화 할시에 사용 가능
- nullptr 초기화시에 사용 가능

```c++
std::unique_ptr<int> num = std::make_unique<int>(28);
std::cout << *num << std::endl; // 28 출력

num.reset(new int(29));
std::cout << *num << std::endl; // 29 출력

num.reset();
if (nullptr == num)
{
    std::cout << "nullptr" << std::endl; // nullptr 출력
}
```
<br>
**3) get()**
- 원시 포인터 반환

```c++
std::unique_ptr<int> num = std::make_unique<int>(28);
int* pNum = num.get();
std::cout << *pNum << std::endl;
```
<br>
**3) release()**
- 원시 포인터 반환 후 포인터에 대한 소유권 박탈
- release() 호출 후 get() 호출하면 nullptr 반환

```c++
int* pNum = num.release();
if (nullptr == num.get())
{
    std::cout << "nullptr" << std::endl;
}

std::cout << *pNum << std::endl;
```
<br>
지금부터는 unique_ptr의 사용 예제들입니다. 아래의 예제들을 통해서 unique_ptr의 사용법을 거의 대부분 알 수 있습니다. 
또한 unique_ptr을 사용하지 않는 코드에 unique_ptr을 호환시키는 올바른 방법도 알 수 있습니다.


**1) 원시 포인터를 unique_ptr을 통해 관리할 때**
```c++
class Integer
{
public:
    Integer() : num(0)
    { }

    Integer(int _num) : num(_num)
    { }

    ~Integer()
    { }

    int GetValue()
    {
        return num;
    }

private:
    int num;
};
```

```c++
Integer* p_integer = new Integer(10);
std::unique_ptr<Integer> u_integer(p_interger);
-----------------------------------------------
Integer* p_integer = new Integer(20);
std::unique_ptr<Integer> u_integer;
u_integer.reset(p_integer);
-----------------------------------------------
Integer* p_integer = nullptr;
std::unique_ptr<Integer> u_integer(new Integer(30));
p_integer = u_integer.get();
-----------------------------------------------
```
<br>
**2) 인자로 값을 받는 경우**
```c++
void FunctionCallValue(std::unique_ptr<Integer> u_integer)
{
    std::cout << "value : " << u_integer->GetValue() << std::endl;
}

int main()
{
    std::unique_ptr<Integer> num = std::make_unique<Integer>(10);
    functionCallValue(std::move(num)); // std::move()는 Rvalue를 Lvalue로 변환시켜주는 기능을 합니다.
    //functionCallValue(num); std::move 사용하지 않으면 컴파일 error 발생
    return 0;
}
```
<br>
**3) 인자로 참조를 받는 경우**
```c++
void FunctionCallReference(std::unique_ptr<Integer>& u_integer)
{
    std::cout << "value : " << u_integer->GetValue() << std::endl;
}
```
```c++
int main()
{
    std::unique_ptr<Integer> u_integer = std::make_unique<Integer>(30);
    FunctionCallReference(u_integer);
    std::cout << "value : " << u_integer->GetValue() << std::endl;
    return 0;
}
```
<br>
**4) 인자로 RValue 참조(&&)를 받는 경우 - 소유권 이동(X)**
```c++
void FunctionCallRValueReference(std::unique_ptr<Integer>&& u_integer)
{
    std::cout << "value : " << u_integer->GetValue() << std::endl;
}
```

```c++
int main()
{
    std::unique_ptr<Integer> u_integer = std::make_unique<Integer>(30);
    FunctionCallRValueReference(std::move(u_integer));
    std::cout << "value : " << u_integer->GetValue() << std::endl;
    return 0;
}
```

<br>
**5) 인자로 RValue 참조(&&)를 받는 경우 - 소유권 이동(O)**

```c++
// 함수의 파라미터로 이름이 명명된 rvalue는 lvalue로 취급되어 집니다.
// 그러므로 std::move를 다시 사용.
void FunctionCallRValueReference(std::unique_ptr<Integer>&& u_integer)
{	
    std::cout << "value : " << u_integer->GetValue() << std::endl;
    std::unique_ptr<Integer> newUniquePtr = std::move(u_integer);
}
```

```c++
int main()
{
    std::unique_ptr<Integer> u_integer = std::make_unique<Integer>(30);
    FunctionCallRValueReference(std::move(u_integer));

    if (nullptr == u_integer.get())
    {
        std::cout << "nullptr" << std::endl;
    }
}
```

**6) ** 

#### ***End Note***
***

#### Reference 
***  
- ***Effective C++ (Scott Meyers)***
- ***<https://stackoverflow.com/questions/35859942/the-difference-between-raii-and-smart-pointers-in-c/>***

#### Remark
***
<a name="footnote_1">TR1</a>: 정식 명칭은 ISO/IEC TR 19768:2007이며, C++ 표준화 이후 사실상 언어에 변화를 가한 첫 번째 사양입니다. 엄밀하게 표준안은 아니라서 컴파일러 제작사가 원하면 넣고 아니면 마는 수준의 선택적인 확장안이었습니다. 그래서인지 전부 std 네임스페이스에 들어가 있지 않고 대신 std::tr1 네임스페이스로 분리되어 들어갑니다. 이후 C++TR1의 기능들은 대부분 C++11 표준 사양으로 흡수되었습니다.


<body translate="no" oncontextmenu="return false" ondragstart="return false" onselectstart="return false">
  <div id="mouse_no" oncontextmenu="return false" ondragstart="return false" onselectstart="return false">
  </div>
</body>