---
published: true
layout: single
title: "[Effective C++] 4. 객체를 사용하기 전에 반드시 그 객체를 초기화 하자"
category: effectcpp
tags:
comments: true
sidebar:
  nav: "mainMenu"
---  

*Effective C++ 제 3판 - Chapter 1 - 4*
* * *

C++에서 객체(여기서 말하는 객체는 기본 타입을 포함하는 광범위한 객체를 말합니다.)는 특정 상황에서는 자동으로 초기화가 되지만 또 어떤 상황에서는 초기화가 되지 않습니다. 즉 다음과 같이 했을 때

```c++
int x;
```  

어떤 상황에서는 x의 값이 0으로 초기화되지만, 다른 상황에서는 그것이 보장되지 않는다는 것이죠. 예를 한개 더 봅시다.

```c++
class Point
{
    ...
private:
    int x;
    int y;
};

...

Point p;
```  

이 상황도 마찬가지 입니다. 하지만 c++의 객체 초기화가 실제로 랜덤하게 초기화가 이루어지는 것은 아닙니다. 분명히 명확한 규칙이 존재합니다. 하지만 이 규칙들은 생각보다 복잡하고, 전부 암기하기에는 비효율적입니다. 즉 가장 좋은 방법은 **기본 제공 타입으로 만들어진 비멤버 객체에 대해서는 초기화를 손수 하라** 입니다.

```c++
...
int x = 0;
const char * text = "A C-style string";
double d;
std::cin >> d;
...
```

#### 대입(assignment) & 초기화(initialization)  
***

자 이제 C++의 남은 초기화 부분은 생성자로 귀결됩니다. 생성자에서 지킬 규칙은 간단합니다. **그 객체의 모든 것을 초기화하자!** 입니다. 이것만 지키면 모든 것이 괜찮습니다. 다음의 예제를 봅시다.

```c++
class PhoneNumber {...};

class ABEntry
{
public:
    ABEntry(const std::string& name, 
            const std::string& address, const std::list<PhoneNumber>& phones);
private:
    std::string theName;
    std::string theAddress;
    std::list<PhoneNumber> thePhones;
    int numTimesConsulted;
};

ABEntry::ABEntry(const std::string& name,
                 const std::string& address, const std::list<PhoneNumber>& phones)
{
    theName = name;
    theAddress = address;
    thePhones = phones;
    numTimesConsulted = 0;
}
```
<br>
위의 예제는 아무 문제없이 동작할 것 입니다. 하지만 이 예제에서 멤버들은 초기화되고 있는 것이 아니라 어떤 값이 대입되고 있는 것 입니다. C++ 규칙에 의하면 초기화라는 것은 객체 생성자의 본문이 실행되기 전에 초기화되어야 한다고 명시되어 있습니다.어떻게 해야 대입이 아닌 초기화에 알맞은 코드를 작성할 수 있을까요?. 초기화 리스트를 사용하면 됩니다.  
```c++
ABEntry::ABEntry(const std::string& name,
                 const std::string& address, const std::list<PhoneNumber>& phones)
                 : theName(name),
                   theAddress(address),
                   thePhones(phones),
                   numTimesConsulted(0)
{ }
```  

기본 제공 타입의 경우 대입하는 방법과의 비용 차이가 거의 없지만 그래도 초기화 리스트를 사용하는 습관을 들이는 것이 좋습니다. 또한 데이터 멤버의 경우 기본 생성자로 초기화하고 싶다면 아래와 같이 사용할 수 있습니다.  

```c++
ABEntry::ABEntry()
    : theName(),
      theAddress(),
      thePhones(),
      numTimesConsulted(0)
{ }
```

위와 같이 하는 것이 오버가 아닌가라고도 생각할 수 있지만, numTimesConsulted가 초기화 리스트에 빠졌다고 생각해보면 실수를 방지하기 위해 모든 멤버를 초기화하는게 좋지 않을까요?. 이러한 습관은 문제를 미연에 방지해줄 것 입니다.

#### 서로 다른 번역 단위에 정의된 비지역 정적 객체들 사이의 초기화 순서
***
C++에서 멤버들의 초기화 순서는 어떻게 될까요? 다음을 보시죠.  
1. 기본 클래스는 파생 클래스보다 먼저 초기화 된다.
2. 클래스 데이터 멤버는 그들이 선언된 순서대로 초기화 된다.

클래스 멤버의 초기화 순서는 선언된 순서와 같습니다. 그러니 초기화 리스트의 순서도 선언된 순서와 동일하게 맞추어 주는 것이 좋습니다. (무척이나 발견하기 힘든 동작 버그를 피하기 위해)  

자 그렇다면, 걱정거리는 한가지가 남게 됩니다. 바로 **비지역 정적 객체의 초기화 순서는 개별 번역 단위에서 정해진다**라는 것 입니다.  

정적 객체(static object)는 자신이 생성된 시점부터 프로그램이 끝날 때까지 살아 있는 객체를 일컫습니다. 정적 객체의 범주에 들어가는 것은 아래 5가지가 있지요.

1. 전역 객체
2. 네임스페이스 유효범위에서 선언된 객체
3. 클래스 안에서 static으로 선언된 객체
4. 함수 안에서 static으로 선언된 객체
5. 파일 유효범위에서 static으로 선언된 객체  

이들 중 함수 안에 있는 정적 객체는 **지역 정적 객체**라고 하고, 나머지는 **비지역 정적 객체**라고 합니다. 이 다섯 종류의 객체는 프로그램이 끝날 때 소멸 됩니다. 즉 main() 함수의 실행이 끝날 때 정적 객체의 소멸자가 호출된다는 이야기입니다.  

자 그렇다면 위에서 언급한 **번역 단위**라는 것은 무슨 의미일까요?. 컴파일을 통해 Object File을 만드는 바탕이 되는 코드의 묶음?이라고 볼 수 있습니다. 이 때 #include하는 파일(들)까지 합쳐서 하나의 번역 단위가 되죠.  

자 정리하자면, 컴파일된 Object File이 두 개 이상 있을 때 각 소스 파일에 정적 객체가 한 개 이상 들어있는 경우에 어떻게 되냐는 것이죠. 한쪽 번역 단위에 있는 비정적 객체의 초기화가 진행되면서 다른 쪽 번역 단위에 있는 비지역 정적 객체가 사용된다면 사용되는 비지역 정적 객체의 경우 초기화를 장담할 수 없다는 것 입니다. 예제를 보실까요? 예제의 클래스들은 한개의 소스 파일에 작성된 것 처럼 보이지만 실제로 다른 2개의 소스 파일에 작성된 것이라고 가정하겠습니다.

```c++
// FileSystemClass.cpp
class FileSystem
{
public:
    ...
    std::size_t numDisks() const;
    ...
};

extern FileSystem tfs;

}

// DirectoryClass.cpp
class Directory
{
public:
    Directory(params);
    ...
};

Directory::Directory(params)
{
    ...
    std::size_t disks = tfs.numDisks(); // tfs 객체를 여기서 사용함.
    ...
}

//
...
    Directory tempDir(params); // 임시로 파일을 담는 디렉토리
...

```

위의 코드에서는 앞서 언급한 문제가 발생합니다. tfs가 tempDir보다 먼저 초기화되지 않으면, tempDir의  생성자는 fts가 초기화되지도 않았는데 fts를 사용하려고 할 것 입니다. 이 방법을 해결할 방법이 있을까요? 다행스러운 점은 약간의 변화를 주어 이 문제를 사전에 봉쇄할 수 있습니다. 바로 기존에 비지역 정적 객체로 선언했던 변수들을 하나씩 맡을 함수를 선언하고 그 함수 안에서 지역 정적 객체로 선언하는 것 입니다.(이것은 디자인 패턴에서 싱글톤 패턴의 전형적인 방식입니다.)  

어떻게 이것이 가능할까요? C++에서는 지역 정적 객체는 함수 호출 중에 그 객체의 정의에 최초로 닿았을 때 초기화되도록 만들어져 있기 때문입니다. 따라서 비지역 정적 객체를 직접 접근하지 않고 지역 정적 객체에 대한 참조자를 반환하는 쪽으로 변경하여 이 문제를 해결할 수 있습니다. 대신 참조자로 얻어낸 객체는 반드시 초기화된 객체여야하도록 구현해야 하겠지요. 자 그럼 예제 코드를 봅시다.

```c++
class FileSystem {...};

FileSystem fts()
{
    static FileSystem fs;
    return fs;
}

class Directory {...};

Directory::Directory(params)
{
    ...
    std::size_t disks = fts().numDisks();
    ...
}

Directory& tempDir()
{
    static Directory td;
    return td;
}
```  

자 이제부터는 문제 없이 프로그래밍을 계속 하실 수 있습니다. 다만 참조자 반환 함수는 내부적으로 정적 객체를 쓰기 때문에 다중 스레드 시스템에서 문제가 발생할 수 있습니다. 다중 스레드 시스템에서 비상수 정적 객체(지역이든 비지역이든)는 온갖 골칫거리의 시한폭탄이라고 보시면 됩니다. 골칫거리를 다루는 한 가지 방법으로 다중스레드로 돌입하기 전의 시동 단계에서 참조자 반환 함수를 전부 손으로 호출해줄 수 있습니다. (이미 한번씩 호출해줫으니 순서를 생각해볼 필요가 없겠죠?)  

또한 참조자 반환 함수를 사용하는 아이디어는 객체의 초기화 순서를 개발자가 정확히 맞춰준다는 전제조건이 있어야 합니다. B가 초기화 되기전에 A가 초기화 되어야 하는데 A의 초기화가 B의 초기화에 의존하도록 구현된다면 문제가 생기겠죠. 이러한 문제만 잘 생각해서 코드를 작성한다면 적어도 단일 스레드 환경에서 문제 없이 동작할 것이라고 장담합니다.

#### ***End Note***
***

자!, 공부한 내용을 마지막으로 정리해봅시다.
- 기본 제공 타입의 객체는 반드시 명시적으로 초기화 해주는 것이 실수를 미연에 방지할 수 있습니다.
- 객체 생성자에서는 대입을 통한 초기화가 아닌 초기화 리스트를 사용하여 초기화를 해야합니다.
- 여러 번역 단위에 있는 비지역 정적 객체들의 초기화 순서 문제는 피해서 설계해야 합니다. 비지역 정적 객체를 지역 정적 객체로 바꾸면 됩니다.

#### Reference 
***  
- ***Effective C++ (Scott Meyers)***

<body translate="no" oncontextmenu="return false" ondragstart="return false" onselectstart="return false">
  <div id="mouse_no" oncontextmenu="return false" ondragstart="return false" onselectstart="return false">
  </div>
</body>