---
published: true
layout: single
title: "[Effective C++] 9. 객체 생성 및 소멸 과정 중에는 절대로 가상 함수를 호출하지 말자"
category: effectcpp
tags:
comments: true
sidebar:
  nav: "mainMenu"
---  
*Effective C++ 제 3판 - Chapter 2 - 5*
* * *

객체의 생성 및 소멸 과정 중에는 가상 함수를 호출하면 절대로 안됩니다. 왜 그런지는 아래의 예제를 통해 같이 한번 확인해봅시다.  

아래의 예제는 주식 거래를 본떠 만든 클래스 입니다. 주식을 사고 팔때는 반드시 거래에 대한 기록을 남겨야 하는데요. 그 기능을 하는 것이 logTransaction() 메소드 입니다. 결국 다음과 같이 클래스 타입에 따라 다른 기능을 하는 가상 함수를 다음과 같이 구현할 수 있겠지요. 

```c++
class Transaction
{
public:
    virtual void logTransaction() const = 0;
    
    ...
};

Transaction::Transaction()
{
    ...
    logTransaction();
}

class BuyTransaction : public Transaction
{
public:
    virtual void logTransaction() const; // 타입에 따른 구현은 어딘가에 되어 있다고 가정합시다.
    ...
};

class SellTransaction : public Transaction
{
public:
    virtual void logTransaction() const; // 타입에 따른 구현은 어딘가에 되어 있다고 가정합시다.
    ...
};
```
<br>
이제 아래의 코드가 실행된다고 가정해봅시다.
```c++
BuyTransaction b;
```

BuyTransaction의 생성자가 호출 되겠지요. 물론 그보다 먼저 Transaction 생성자가 호출 될 것 입니다. 그리고 Transaction 생성자의 마지막 부분을 보면 가상 함수를 호출 하고 있습니다. 이 때 가상 함수 logTransaction는 BuyTransaction을 따를까요? 아니면 Transaction을 따를까요? 정답은 기본 클래스인 Transaction를 따르게 되어 있습니다.  

즉, 파생 클래스의 생성 중에 실행 되는 가상 함수는 파생 클래스가 아닌 기본 클래스를 따르도록 되어 있습니다. 이와 같은 규칙을 가지는 것에는 나름의 이유가 있습니다. 파생 클래스가 생성 중이라면 파생 클래스의 멤버의 초기화가 모두 완료 되었다고 보장할 수 없기 때문에 C++에서는 이런 실수를 막도록 설계된 것입니다.

#### 파생 클래스는 기본 클래스 부분이 생성되는 동안은 타입이 기본 클래스이다.
***
지금까지의 내용은 단순히 가상 함수가 기본 클래스와 파생 클래스 중 어떤 클래스를 따르냐에 대해 얘기하였지만, 좀 더 본질적인 내용을 알 필요가 있습니다.  

바로 파생 클래스 객체의 기본 클래스가 생성되는 동안은 파생 클래스의 타입은 기본 클래스 타입이라는 것 입니다. 호출되는 모든 가상 함수는 기본 클래스의 것으로 환원되고, 런타임 타입 정보를 사용하는 요소들(dynamic_cast, typeid)도 모두 기본 클래스 타입의 객체로 취급합니다.  

이것은 앞서 말씀드렸듯이, 파생 클래스의 객체 초기화가 완료된 상태가 아니기 때문에 파생 클래스는 아예 없었던 것처럼 취급하는 편이 최고로 안전하다는 것 입니다.

그렇다면, 객체가 소멸할 때는 어떨까요? 반대로 생각해보면 쉽습니다. 파생 클래스의 소멸자가 호출되고 나면 기본 클래스의 소멸자가 호출 될 텐데, 이때의 타입은 기본 클래스가 되겠지요.

#### 생성자 내부에서 호출되는 비가상 함수에서 가상 함수를 호출하는 경우
***

자, 이제 위의 예제를 다시 한번 봅시다. Transaction 생성자에서 가상 함수를 직접 호출하고 있습니다. 이번 챕터의 지침을 위반한 것인데 아주 쉽게 확인이 가능합니다. 이런 경우엔 경고를 출력하는 컴파일러도 더러 있지요.  

하지만, 생성자/소멸자 내의 가상 함수를 찾는 일이 항상 쉬운 것은 아닙니다. 아래의 예제를 함께 볼까요?

```c++
class Transaction
{
public:
    Transaction()
    {
        init();
    }

    virtual void logTransaction() const = 0;
    ...

private:
    void init()
    {
        ...
        logTransaction();
    }
};
```
앞의 코드와 비교했을 때 개념적으로는 생성자 내부에서 가상 함수를 호출하고 있다는 것이 같지만 굉장히 사악한 코드입니다. 왜냐하면 컴파일도 잘되고 링크도 말끔하게 되기 때문이죠. 좀 더 최악의 상황을 가정해보면, 보통의 시스템은 순수 가상 함수가 호출되면 프로그램을 바로 끝내 버립니다. 그러니 위의 예, 정도면 아주 고마운 수준입니다. 만약 순수 가상 함수가 아니고 Transaction의 logTransaction 메소드가 구현되어 있다면 원인을 알지 못하는 이상 사태 파악을 못하는 경우가 생기고 말 겁니다.  

그러나 Transaction 클래스 계통의 객체가 새로 생성될 때마다 logTransaction 가상 함수의 호출이 제대로 이루어지도록 맞추는 일도 결코 만만한 일은 아닙니다. 그러니 이 문제의 해결 방법에 대해 같이 알아보도록 합시다.

#### 비가상 멤버 함수를 사용하여 객체 타입마다 비슷하지만 다른 기능을 구현하는 방법
***

이 문제의 해결 방법은 logTransaction을 Transaction 클래스의 미가상 멤버 함수로 바꾸는 것입니다. 그러고 나서 파생 클래스의 생성자들로 하여금 필요한 로그 정보를 Transaction의 생성자로 넘겨야 한다는 규칙을 만듭니다.  

결과적으로 logTransaction이 비가상 함수이기 때문에 Transaction의 생성자는 이 함수를 안전하게 호출할 수 있습니다. 즉 정리하자면, 기본 클래스 부분이 생성 될 때는 가상 함수를 호출한다 해도 기본 클래스의 울타리를 넘어 파생 클래스로 넘어갈 수 없기 때문에, 역으로 파생 클래스 쪽에서 기본 클래스의 생성자 쪽으로 **올려**주도록 만듦으로써 원하는 기능을 동일하게 구현할 수 있다는 것입니다.  

```c++
class Transaction
{
public:
    explicit Transaction(const std::string& loginfo);
    void logTransaction(const std::string& loginfo);
};

Transaction::Transaction(const std::string& loginfo)
{
    logTransaction(loginfo);
}

void Transaction::logTransaction(const std::string& loginfo)
{
    printf("%s Transaction Executed!!!", loginfo.c_str());
}
```

```c++
class BuyTransaction : public Transaction
{
public:
    BuyTransaction()
        : Transaction(createLogType())
    {}
private:
    static std::string createLogType();
};

std::string BuyTransaction::createLogType()
{
    return "BUY";
}
```

```c++
BuyTransaction buyTransaction;

----------------------
BUY Transaction Executed!!!
----------------------
```

또한 위 예제의 createLogType 함수를 한 번 더 짚고 넘어가도록 합시다. 이 함수는 기본 클래스 생성자 쪽으로 넘길 값을 생성하는 용도로 사용하는 도우미 함수입니다. 이 함수는 기본 클래스의 초기화 멤버가 만수산 드렁칡처럼 얽혀 있을 때 매우 유용하며, 정적 멤버로 되어있기 때문에 BuyTransaction 객체의 미 초기화된 멤버를 건드릴 일도 없습니다. (static 메소드의 내부에 비정적 멤버를 사용하려고 하면 컴파일 에러가 나므로)

#### ***End Note***
***
- 생성자 혹은 소멸자 안에서 가상 함수를 호출해서는 안됩니다. 파생 클래스의 생성자 내부에서 호출된 가상 함수는 파생 클래스가 아닌 기본 클래스를 따라 동작하기 때문 입니다.

#### Reference 
***  
- ***Effective C++ (Scott Meyers)***

<body translate="no" oncontextmenu="return false" ondragstart="return false" onselectstart="return false">
  <div id="mouse_no" oncontextmenu="return false" ondragstart="return false" onselectstart="return false">
  </div>
</body>