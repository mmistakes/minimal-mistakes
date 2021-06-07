---
published: true
layout: single
title: "[Effective C++] 8. 예외가 소멸자를 떠나지 못하도록 붙들어 놓자"
category: none_effectcpp
tags:
comments: true
sidebar:
  nav: "mainMenu"
---  
*Effective C++ 제 3판 - Chapter 2 - 4*
* * *

소멸자로부터 예외가 터져 나가는 경우를 C++에서 막고 있지는 않지만, 실제로 발생하는 상황을 보면 막아야 합니다. 아래 예를 보시죠.

```c++
class Widget
{
public:
    ...
    ~Widget() {...} // 이 소멸자에서 예외가 발생
};

void dosomething()
{
    std::vector<Widget> vec;
    ...
}
```

vector 타입의 객체 vec가 소멸될 때, 거느리고 있는 Widget들 전부를 소멸시킬 책임은 벡터에 있겠지요. 그런데 vec에 들어있는 Widget이 총 10개라고 할 때, 첫번째 Widget을 소멸시키는 도중에 예외가 발생했다고 가정합시다. 그리고 나머지 아홉개는 여전히 소멸되어야 하는 상황인데, vec은 이들에 대해 소멸자를 호출해야겠지요.  

그리고 이 과정에서 또 문제가 발생했다고 가정해봅시다. 현재 활성화된 예외가 최소 2개 이상 만들어진 상태인데, C++ 2개 이상의 예외가 동시에 발생한 상황에서 조건이나 상황에 따라 프로그램이 종료되거나, 정의되지 않은 동작을 할 것 입니다. 이것은 다른 vector뿐만 아니라 다른 STL도 마찬가지이며 배열도 예외는 아닙니다.  

완전하지 못한 프로그램 종료나 미정의 동작의 원인은 바로 예외가 터져 나오는 것을 내버려 두는 소멸자에게 있습니다. 즉, 컨테이너나 배열을 쓰지 않아도 마찬가지 입니다. 아래의 예제를 같이 확인해봅시다.

```c++
class DBConnection
{
public:
  ...
  static DBConnection create(); // DBConnection 객체를 반환하는 함수
                                // 매개변수는 편의상 생략

  void close(); // 연결을 닫습니다.
                // 이때 , 연결이 실패하면 예외를 던집니다.
};
```

보다시피 사용자가 close()를 직접 호출해야하는 설계 입니다. 사용자가 close를 호출하는 것을 망각하는 것에 대비하는 좋은 방법으로 DBConnection에 대한 자원 관리 클래스를 만들어서 그 클래스의 소멸자에서 close를 호출하게 만드는 방법이 있습니다. 이번엔 아래 예제를 같이 봅시다.

```c++
class DBConn
{
public:
  ...
  ~DBConn()
  {
    db.close();
  }

private:
  DBConnection db;
}
```
<br>
위와 같이 구현하면 아래와 같은 프로그래밍이 가능해집니다.

```c++
{
  DBConn dbc(DBConnection::create()); // DBConnection 객체를 생성하고
                                      // 이것을 DBConn 객체로 넘겨서 관리를 맡깁니다.
                                      
  ...                                 // DBConn 인터페이스를 통해
                                      // DBConnection 객체를 사용합니다. 

}                                     // 블록이 끝나면, DBConn 객체가 소멸됩니다.
                                      // 따라서 DBConnection 객체에 대한 close 함수의 호출이
                                      // 자동으로 이루어집니다.
```

close 호출만 일사천리로 성공하면 아무 문제가 없는 코드입니다. 그러나 close를 호출했는데 소멸자 안에서 예외가 발생했다고 가정하면 어떻게 될까요? DBConn의 소멸자는 분명히 이 예외를 전파할 것 입니다. 쉽게 말해 그 소멸자에서 예외가 나가도록 내버려 둔다는 거죠 바로 이것이 문제 입니다. DBConn의 소멸자는 아래의 두가지 중 하나를 선택할 수 있을 겁니다.

1\) close에서 에외가 발생하면 프로그램을 바로 종료합니다. (대개 abort를 호출합니다.)

```c++
DBConn::~DBConn()
{
  try 
  { 
    db.close(); 
  }
  catch(...)
  {
    printf("DBConn::~DBConn close Failed")
    std::abort();
  }
}
```

이 선택은 객체 소멸이 진행되다가 에러가 발생한 후에 프로그램 실행을 계속할 수 없는 상황이라면 괜찮은 선택입니다. 정의되지 않은 동작을 하는 것을 막는거이죠. abort를 호출해서 발생할 수 있는 최악을 상황을 미리 막는 것 입니다.

2\) close를 호출한 곳에서 일어난 예외를 삼켜 버립니다.

```c++
DBconn::~DBConn()
{
  try 
  { 
    db.close(); 
  }
  catch(...)
  {
    printf("DBConn::~DBConn close Failed")
  }
}
```

대부분의 경우, 예외를 삼키는 것은 그리 좋은 발상이 아닙니다. 중요한 정보가 묻혀 버리기 때문이죠. 무엇이 잘못 됐는지를 알려주는 정보 말입니다.  

하지만 때에 따라서는 불완전한 프로그램의 종료 혹은 미정의 동작을 감수하는 것보다 그냥 예외를 먹어버리는게 나을 수도 있습니다. 단 예외삼키기를 선택한 경우에는 예외를 무시한 뒤라도 프로그램이 신뢰성 있게 실행을 지속할 수 있어야 하겠지요.  

자, 그렇다면 두가지 방식 중 어떤 방식이 더 나은 방식이라고 할 수 있을까요?, 어느 쪽을 택하든 특별히 좋진 않아 보입니다. 이번에는 아래의 예제를 함께 봅시다.

```c++
class DBConn
{
public:
  ...
  void close()
  {
    db.close();
    closed = true;
  }

  ~DBconn()
  {
    if(false == closed)
    {
      try
      {
        db.close();
      }
      catch(...)
      {
        printf("DBConn::~DBConn close Failed")
        ...
      }
    }
  }
};
```

위의 코드는 close 호출의 책임을 DBConn 소멸자에서 DBConn의 사용자로 떠넘기는 아주 약한 수준의 안전망을 가진 코드라고 볼 수 있습니다. 사용자가 DBConn::close()를 직접 호출하도록 구현하는 것을 기도하는 것만이 앞서 말한 문제들에 대한 안전장치에 자물쇠를 거는 것이라고 느낄 수도 있겠죠.  

하지만 중요한 것은 어떤 동작이 예외를 일으키면서 실패할 가능성이 있고 또 그 예외를 처리해야 할 필요가 있다면, 그 예외는 반드시 **소멸자가 아닌 다른 함수에서 비롯된 것이어야 한다**라는 것 입니다.  

즉 위의 예제는 단순히 사용자가 close()를 직접 호출하는 것을 기도하는 것이 아니라, 사용자에게 에러를 처리할 기회를 주는 것이라고 볼 수 있죠. 물론 사용자는 그 기회를 사용하지 않을 수 도 있지만, 너무 걱정은 하지마세요. 소멸자에서 어떻게든 마무리 해줄 것이라고 믿는 구석이 생기니깐요. 어찌됐든 그 기회를 사용하지 않은 사용자의 잘못이라고 할 수 있겠죠.

#### ***End Note***
***
- 소멸자에서는 예외가 빠져나가면 안됩니다. 만약 소멸자 안에서 호출된 함수가 예외를 던질 가능성이 있다면 어떤 예외이든지 소멸자에서 모두 받아낸 후에 삼켜 버리든지, 프로그램을 끝내든지 해야 합니다.
- 어떤 클래스의 연산이 진행되다가 발생한 예외에 대해 사용자가 반응해야할 필요가 있다면, 해당 연산을 제공하는 함수는 반드시 소멸자가 아니어야 합니다.

#### Reference 
***  
- ***Effective C++ (Scott Meyers)***

<body translate="no" oncontextmenu="return false" ondragstart="return false" onselectstart="return false">
  <div id="mouse_no" oncontextmenu="return false" ondragstart="return false" onselectstart="return false">
  </div>
</body>