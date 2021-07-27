---
published: true
layout: single
title: "[Effective C++] 26. 변수 정의는 늦출 수 있는 데까지 늦추는 근성을 발휘하자"
category: effectcpp
tags:
comments: true
sidebar:
  nav: "mainMenu"
---  
* * *

변수를 정의하면 반드시 물게되는 비용이 두개 있습니다. 하나는 프로그램 제어 흐름이 변수의 정의에 닿을 때 생성자가 호출되는 비용이고, 또 하나는 그 변수가 유효범위를 벗어날 때 소멸자가 호출되는 비용입니다. 이 비용은 변수가 실제로 사용되지 않는 경우에도 부과되므로, 웬만한 경우가 아니면 물고 싶지 않겠지요.  

사용하지 않을 변수를 누가 정의하겠냐고 큰소리치는 독자도 물론 있겠지만, 그것이 생각보다 호락호락하지 않습니다.

```c++
std::string encryptedPassWord(const std::string& password)
{
  using namespace std;

  string encrypted;
  if(password.length() < MinimumPasswordLength>)
  {
    throw logic_error("Password is too short");
  }
  ...
  ... // 여기서 주어진 비밀번호를 암호화하여
  ... // encrypted 변수에 넣는데 필요한 일들을 합니다.
  ...
  return encrypted;
}
```

encrypted 객체가 사실 이 함수에서 완전히 안쓰인다고 말할 수 없지만, 예외가 발생하게 되면 이 변수는 사용하지 않게 됩니다. 그러니 에외를 던지는 조건문 아래에 encrypted를 위치시키는게 좋을 것 입니다.  

[항목4](/effectcpp/effective_cpp_chapter_1_4/)를 공부하셨다면, 객체를 생성하고 값을 대입하는 방법이 초기화 리스트를 이용하는 방법보다 왜 효율이 좋지 않은지 아실겁니다.  

그렇다면 우리는 기본 생성자를 호출하는 것이 아니라, 아래와 같이 코드를 작성해야한다는 것을 알 수 있겠지요

```c++
std::string encryptedPassWord(const std::string& password)
{
  using namespace std;

  if(password.length() < MinimumPasswordLength>)
  {
    throw logic_error("Password is too short");
  }
  ...
  std::string encrpyted(password);
  encrypt(encrypted);
  return encrypted;
}
```

#### 반복 Loop에서 사용할 변수 선언 시점
***
이번에는 Loop문에서 사용할 변수의 선언 시점에 대해 고민해봅시다. 자 아래의 예제를 봅시다.

```c++
// A 방법
Widget w;
for(int i = 0; i < n; ++i)
{
  // w에 i 값에 따라 달라지는 값을 데이터를 대입
  // 아랫 줄에서 GetData 호출로 인해 생기는 비용은 무시합시당~~
  w.data = GetData(i);
}

// B 방법
for(int i = 0; i < n; ++i)
{
  // i 값에 내부 동작이 달라지는 생성자 호출
  Widget w(i);
}
```

두 방법의 비용을 정리해보면 다음과 같습니다.
- A방법 : 생성자 1번 + 소멸자 1번 + 대입 n번
- B방법 : 생성자 n번 + 소멸자 n번

클래스 중에는 대입에 들어가는 비용이 생성자-소멸자 쌍보다 적게 나오는 경우가 있는데 Widget 클래스가 이런 종류에 속한다면 A 방법이 일반적으로 좋겠지요. 이 차이는 특히 n이 커질수록 더 커집니다.  

반면 그렇지 않은 경우엔 B 방법이 더 좋을 것이고요. 다만 B 방법을 쓰게 되면 유효범위가 더 좁아지기 때문에 프로그램에 대한 이해도와 유지보수성이 역으로 좋아질 수도 있습니다.  

그러니깐 이렇게 하기로 합시다. 대입이 생성자, 소멸자 쌍보다 비용이 덜 나가지 않고, 전체 코드에서 수행 성능에 민감한 부분을 건드리는 중이라고 생각하지 않는다면, 앞 뒤 볼 것 없이 B 방법으로 가는 것이 좋습니다.

#### ***End Note***
***
- 변수 정의는 늦출 수 있을 때까지 늦춥시다!. 프로그램이 더 깔끔해지며 효율도 좋아집니다.

#### Reference 
***  
- ***Effective C++ (Scott Meyers)***

<body translate="no" oncontextmenu="return false" ondragstart="return false" onselectstart="return false">
  <div id="mouse_no" oncontextmenu="return false" ondragstart="return false" onselectstart="return false">
  </div>
</body>