---
published: true
layout: single
title: "[Effective C++] 43. 템플릿으로 만들어진 기본 클래스 안의 이름에 접근하는 방법을 알아 두자"
category: effectcpp
tags:
comments: true
sidebar:
  nav: "mainMenu"
---  
* * *

아래의 코드는 컴파일 에러가 발생합니다. 템플릿으로 만들어진 파생 클래스에서 기본 클래스에 접근하려고 하면 문제가 발생하도록 설계되어 있습니다.  

```c++
class LoggingMsgSender : public MsgSender<Company>
{
public:
    ...
    void senderClearMsg(const MsgInfo& info)
    {
      sendClear(info); // (이 함수는 기본 클래스에 정의되어 있습니다.)
                      // 기본 클래스 함수를 호출하는데, Compile Error 발생!
    }
    ...
};
```

왜 컴파일러는 에러를 발생시킬까요?, 우리 눈에는 기본 클래스에 들어있는 sendClear 함수가 버젓이 보이는데도, 컴파일러는



#### 템플릿 파생 클래스에서 기본 클래스에 접근하는 방법
* * *
문제를 해결하기 위한 방법은 간단합니다. 바로 확인해봅시다. 3가지 방법이 있습니다.  

1\. 함수 호출문 앞에 "this->"를 붙인다.
```c++
class LoggingMsgSender : public MsgSender<Company>
{
public:
    ...
    void senderClearMsg(const MsgInfo& info)
    {
      this->sendClear(info);
    }
    ...
};
```
2\. using 선언을 사용한다.
```c++
class LoggingMsgSender : public MsgSender<Company>
{
public:
    using MsgSender<Company>::sendClear;
    ...
    void senderClearMsg(const MsgInfo& info)
    {
      sendClear(info);
    }
    ...
};
```
3\. 호출할 함수가 기본 클래스의 함수라는 것을 명시적으로 지정한다.
```c++
class LoggingMsgSender : public MsgSender<Company>
{
public:
    using MsgSender<Company>::sendClear;
    ...
    void senderClearMsg(const MsgInfo& info)
    {
      MsgSender<Company>::sendClear(info);
    }
    ...
};
```

단, 마지막 방법은 그리 추천하고 싶지 않습니다. 호출되는 함수가 가상 함수인 경우에는, 
이런 식으로 명시적 한정을 해 버리면 가상 함수 바인딩이 무시되기 때문 입니다.  

위의 3가지 방법은 모두 원리가 같습니다. 기본 클래스 템플릿이 이후에 어떻게 특수화되더라도 원래의 일반형 템플릿에서
 제공하는 인터페이스를 그대로 제공할 것이라고 컴파일러에게 약속하는 것 입니다. 예를 들어 이후의 소스 코드가 다음과 같이 되어 있다면, sendClearMsg 호출문은 컴파일이 되지 않습니다.

 ```c++
 LoggingMsgSender<CompanyZ> zMsgSender; // LoggingMsgSender의 기본 클래스인
                                        // MsgSender<CompanyZ>에 sendClear가 없다고 가정
 MsgInfo msgData;
 ... // msgData Init
 ...
 zMsgSender.sendClearMsg(msgData);      // 이 경우 컴파일러는 sendClear가 존재하지 않는다는 것을
                                        // 알고 있기 때문에 컴파일 에러 발생
 ```

 c++은 이른바 '이른 진단(carly diagnose)'을 선호하는 정책으로 결정한 것 입니다. 파생 클래스가 템플릿으로부터 인스턴스화 될 때 컴파일러가 
 기본 클래스의 내용에 대해 아무것도 모르는 것으로 가정하는 이유도 이제 이해할 수 있을 것 입니다.

#### ***End Note***
***
- 파생 클래스 템플릿에서 기본 클래스 템플릿의 이름을 참조할 때는, "this->"를 접두사로 붙이거나
 기본 클래스의 한정문을 명시적으로 써주는 것으로 해결합시다.

#### Reference 
***  
- ***Effective C++ (Scott Meyers)***

<body translate="no" oncontextmenu="return false" ondragstart="return false" onselectstart="return false">
  <div id="mouse_no" oncontextmenu="return false" ondragstart="return false" onselectstart="return false">
  </div>
</body>
