---
published: true
layout: single
title: "[Effective C++] 31. 파일 사이의 컴파일 의존성을 최대로 줄이자"
category: effectcpp
tags:
comments: true
sidebar:
  nav: "mainMenu"
---  
* * *

여러분이 오랬동안 묵혀두었던 어떤 클래스를 다시 작업하였다고 가정해봅시다. 여러분이 프로그램 빌드를 실행한 순간 몇줄 고치지 않는 코드가 예상과는 달리 몽땅 다시 컴파일 되고 다시 링크 되는 것을 마주하게 되었습니다. 이 문제의 핵심은 C++가 인터페이스와 구현을 깔끔하게 분리하는 일에 별로 일가견이 없다는데 있습니다.

```c++
class Person
{
public:
    Person(const std::string& name, const Date& birthDay, const Address& addr);
    std::string name() const;
    std::string birthDate() const;
    std::string address() const;
    ...

private:
    std::string theName;
    Date theBirthDate;
    Address theAddress;
};
```

위의 코드만 가지고 Person 클래스가 컴파일될 수 있을까요?, string, Date, Address가 어떻게 정의됐는지를 모르면 컴파일 자체가 불가능합니다. 따라서 대개 아래와 비슷한 코드를 발견하게 될 것 입니다.

```c++
#include <string>
#include "date.h"
#include "address.h"
```

유감스럽게도, 이 녀석들이 바로 골칫덩이들 입니다. 위의 #include문은 Person을 정의한 파일과 위의 헤더 파일들 사이에 컴파일 의존성이란 것을 엮어 버립니다. 그러면 위의 헤더 파일 셋 중 하나라도 바뀌거나, 이들과 또 엮여 있는 헤더 파일들이 바뀌기만 해도, Person 클래스를 정의한 파일은 코 꿰이듯 컴파일러에게 끌려가야 합니다. 심지어 Person을 사용하는 다른 파일들까지도 몽땅 다시 컴파일 되어야 합니다.


#### 클래스 전방선언
* * *

클래스 전방 선언이라는 개념에 대해 알아보겠습니다. 클래스 전방 선언은 불필요한 #include를 대체하는 방법입니다. 아래 예제를 통해 알아봅시다.

```c++
/*
* /ObjectB/ObjectB.hpp
* ObjectB 클래스에서는 ObjectA를 전방 선언만 하고 정의부를 include 하지 않습니다.
* 단, 컴파일러는 객체의 정의부를 만나면 객체의 크기를 알아야 하므로, 전방 선언된 클래스는 포인터 형으로만 선언하여 사용 가능합니다.
*/

class ObjectA;

class ObjectB
{
public:
    ObjectA* objA;
};
```

```c++
/*
* ObjectA.hpp
*/

class ObjectA
{
    int a;
};
```

```c++
/*
* main.cpp
* 그리고 실제로 ObjectB를 사용하는 부분에서 ObjectA의 정의부를 include하여 사용합니다.
*/

#include "ObjectA.hpp"
#include "ObjectB/ObjectB.hpp"

int main()
{   
    ObjectB objB;
    objB.objA = new ObjectA();
    
    return 0;
}
```

위의 예제를 통해 전방 선언을 사용해서 불필요한 컴파일러 의존성을 낮출 수 있습니다. 이렇게 하면 여러분이 만든 라이브러리를 사용하는 사용자 입장에서 실제로 사용하지 않는 객체에 대한 컴파일 의존성을 낮추고 나아가 라이브러리 사용자가 직접 조작할 수 있다는 장점이 있습니다. 이번에는 이 전방 선언을 이용한 pimpl idom을 알아봅시다.

#### pimpl idom(관용구)
* * *

```c++
#include "Person.h"
#include <memory>

class PersonImpl; // Person의 구현 클래스, 전방 선언
                  // Person을 상속 받습니다.

class Date;     // 전방 선언
class Address;  // 전방 선언
                // PersonImpl이 수정하더라도 실제로 PersonImpl을 사용하지 않는 Person의 경우 컴파일을 다시할 필요가 없습니다.

class Person
{
public:
    Person(const std::string& name, 
           const Date& birthday, 
           const Address& addr);
    
    std::string name() const;
    std::string birthDate() const;
    std::string address() const;
    ...
private:
    std::shared_ptr<PersonImpl> pImpl;
};
```
```c++
#include "Person.h"
#include "PersonImpl.h"

Person::Person(const std::string& name, const Date& birthday, const Address& addr)
: pImpl(new PersonImpl(name, birthday, addr))

std::string Person::name() const
{
    return pImpl->name();
}
```

```c++
class PersonImpl : public Person
{
public:
    PersonImpl(const std::string& name, const Date& birthday, const Address& addr)
    : theName(name), theBirthDate(birthDay), theAddress(addr))
    ()

}

```

이렇게 설계해두며느 Person 클래스에 대한 구현 클래스 부분은 언제든지 마음대로 고칠 수 있고, Person의 사용자 쪽에서는 컴파일을 다시할 필요가 없습니다. 게다가 Person이 어떻게 구현되어 있는지를 들여다볼 수 없기 때문에, 구현 세부 사항에 발을 걸치는 코드를 작성할 여지가 사라집니다. 그야말로 인터페이스와 구현이 뼈와 살이 분리되듯 떨어지는 것 입니다.  

이렇게 인터페이스와 구현을 둘로 나누는 열쇠는 정의부에 대한 의존성을 선언부에 대한 의존성으로 바꾸어 놓는데 있습니다.
**객체 참조자 및 포인터로 충분한 경우에는 객체를 직접 쓰지 않습니다**
- 어떤 타입에 대한 참조자 및 포인터를 정의할 때는 그 타입의 선언부만 필요합니다. 반면, 어떤 타입의 객체를 정의할 때는 그 타입의 정의가 준비되어 있어야 합니다.
**할 수 있으면 클래스 정의 대신 클래스 선언에 최대한 의존하도록 만듭니다**
- 어떤 클래스를 사용하는 함수를 선언할 때는 그 클래스의 정의를 가져오지 않아도 됩니다. 심지어 그 클래스 객체를 값으로 전달하거나 반환하더라도 클래스 정의가 필요하지 않습니다.

#### 인터페이스 클래스(Interface Class) / Factory 함수.
* * *
```c++
```

#### export 키워드
* * *

export 키워드 본문.

#### 정의부가 아닌 선언부에 대해 의존성을 갖도록 만들자
* * *
- 객체 참조자 및 포인터로 충분한 경우에는 객체를 직접 사용하지 않습니다.
- 할 수 있으면 클래스 정의 대신 클래스 선언에 최대한 의존하도록 만듭니다.