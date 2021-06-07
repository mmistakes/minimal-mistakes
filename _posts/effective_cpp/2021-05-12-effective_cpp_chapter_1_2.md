---
published: true
layout: single
title: "[Effective C++] 2. #define을 쓰려거든 const, enum, inline을 떠올리자"
category: effectcpp
tags:
comments: true
sidebar:
  nav: "mainMenu"
---  

*Effective C++ 제 3판 - Chapter 1 - 2*
* * *  

### 시작하기에 앞서서...
책을 읽고 챕터를 공부해가면서, 너무 당연하다고 생각했던 중요한 것들을 많이 놓치고 있다는 것을 느꼈습니다. 선언과 정의도 그러하지요. 진도를 나가면서 모르는 내용은 확실히 짚고 넘어가도록 하겠습니다. 본 챕터에서 선언과 정의에 대한 개념이 작게나마 사용되더군요. (사실 한 줄 적혀 있었던건 안비밀). 여러분도 함께 공부해봅시다. 단 아래의 내용은 C++ 외의 언어에도 해당된다고 자신있게 말씀드릴 수 없습니다. 다만 큰 숲을 보시면 다른 컴파일 언어를 이해하시는데에 도움이 될 것이라고 생각합니다. ^_^

### 선언(declaration)과 정의(definition)의 차이
- #1 변수, 클래스 등의 링커가 작동하는 모든 종류의 Code Entitiy를 심볼이라고 칭합니다. 즉 선언과 정의는 심볼의 선언과 정의인 것 입니다.
- #2 선언은 컴파일러에게 특정 심볼의 존재에 대해서만 알려주는 것 입니다. 그리고 해당 심볼의 메모리 주소 또는 저장이 필요하지 않은 모든 곳에서 심볼을 참조할 수 있게 허락합니다. (즉, 컴파일러는 실제 심볼의 정의는 알 수 없으나 어딘가에 잘 있겠지하는 겁니다.)
- #3 그렇다면 컴파일러에게 선언만으로 충분하지 않아 정의를 필요로 하는 경우는 어떤 경우일까요?, 가장 간단한 예는 클래스의 멤버 값이 참조 또는 값(포인터를 제외한)일 경우 입니다. 포인터는 해당하지 않습니다. 왜 그럴까요?, 포인터는 고정된 메모리 용량(주소 값을 위한)이 필요하고 가리키는 유형에 의존하지 않기 때문에 정의 되지 않고 선언만 된 유형에 대한 포인터를 가질 수 있습니다. 이해가 잘 가지 않으신다구요? 아래의 예제를 통해서 함께 확인해봅시다.
- #4 여기서 자세히 다루지는 않겠지만, 동적 라이브러리의 경우, 심볼만 컴파일러에게 알려주고 (Header만 include를 하고) 심볼의 정의는 동적 라이브러리안에 있으므로 해당 라이브러리를 링킹하여 빌드를 진행합니다. 동적 라이브러리와 정적 라이브러리의 개념은 현업에서 상황에 따라 유연하게 사용해야하는 경우가 많으므로 반드시 이해하고 있는 것이 좋습니다.

***

먼저, 예제를 통해 선언과 정의를 분류해보겠습니다.

#### 선언  
```c++
extern int a; // extern 변수의 경우 선언에 해당합니다, 정의는 다른 코드의 전역에 위치하고 있습니다.

int a();

struct a;

typedef usigned int UINT;

#define SUM(a, b) (a + b)
```  
  
#### 정의
```c++
int a; // 변수의 경우는 선언과 정의가 동시에 이루어집니다. 초기화를 하지 않아도 정의 입니다.

int a()
{
  return 0;
}

struct x
{
  int x;
  int y;
}

enum Color { RED, GREEN, BLUE };

const double DEFAULT_TOLERANCE = 1.0e-6;

class testClass1; // testClass1의 선언

class testClass2 // testClass2의 선언 및 정의
{ 
private:
    static int member;
    // 클래스 내의 정적 정수류 멤버(bool, char, int 등)는 클래스 내부에서 선언 되는 것입니다. 
    // 즉 맨 윗줄의 변수 선언은 곧 정의라는 것은 클래스 내부의 정적 정수류 type에 대해서는 예외 입니다.
    // 단 컴파일러는 선언만 되있는 클래스의 정적 정수류 멤버에 대해 오류를 검출하지 않습니다.
};


template <class T> void sort(const T** array, int size) { /* ... */ };
```
위의 예를 보니 감이 조금 오시나요?, 선언과 정의의 가장 큰 차이점은 메모리가 할당 되는지 입니다. 물론 선언 그 자체에 대한 메모리를 사용하지만, 그 선언이 가리키는 실체에 대해 메모리는 할당하지는 않는다는 것 입니다. 비유하자면 건물의 명칭은 있지만, 실제 건물을 짓지는 않은 상황이겠죠.  
<br>
너무도 당연한 이치겠지만, 당연히 정의는 한번만 할 수 있습니다. 그렇다면 선언은 여러번할 수 있다는건가요?라는 질문을 하실 수 있습니다. 답을 하자면, 네 할 수 있습니다. 아주 간단한 예를 하나 들어보겠습니다. 아래 코드를 보시죠

```c++
#include <stdio.h>
struct UnDefined;
struct UnDefined;

int main()
{
  printf("Hello World\n");
  return 0;
}
```
빌드가 될까요???... 네.. 됩니다..., 위에서 말씀드렸던 #2에 해당하는 예라고 볼 수 있습니다.  
그렇다면 #3의 선언만 되고 정의되지 않은 유형에 대한 포인터를 멤버 변수로 가지는 클래스의 예를 함께 보실까요? 
```c++
#include <stdio.h>
struct UnDefined;

class UnDefinedClass
{
private:
  UnDefined* m_unDefined; // 포인터가 아닌 정의되지 않은 멤버 변수의 경우 Build Error 발생 합니다.
};

int main()
{
  UnDefinedClass testClass;
  printf("Hello World\n");
  return 0;
}
```  
네 당연히 이 예제도 빌드가 됩니다. 이 선언과 정의의 개념은 더 깊게 들어가서 오브젝트 파일의 생성, 컴파일과 링킹, namespace까지 확장이 될 수 있습니다. 다만 모든 개념을 설명하기에 이 포스트는 ***Effective C++ Chapter 1-2***의 이해를 위해 설명한 것이므로 이정도로 충분한 것 같습니다. 궁금하신 분들은 아래 Refference page를 참고해주세요. 아주 설명이 잘되어있고 저도 해당 페이지를 참고하여 설명한 것 입니다 ^_^.

자.. 너무도 멀리 왔습니다. 사실상 Chapter의 내용보다 선언과 정의에 대한 설명을 더 많이 해버렸습니다.
자 그럼 본 교재의 내용을 공부해볼까요?  

#### #define 매크로 대신 상수를 사용하자  
***  

매크로 대신 상수를 사용해야하는 이유는 뭘까요?, 다음의 2가지를 들 수 있습니다.  
```c++
#define PI 3.141592 // Macro
const double PI = 3.142592
```  

- #define 매크로는 컴파일러 입장에서 심볼 이름을 알 수 없습니다, 그로 인해 컴파일 에러 발생 시 원인을 찾기 어려울 수 있습니다.
- 매크로 사용시 코드에 매크로가 등장할 때 마다 전처리 단계에서 치환만을 하기 때문에 컴파일된 Object File의 크기가 상수를 사용했을 때보다 더 큽니다.

더 깊게 들어간다면, 심볼 테이블과 Obejct Code에 대해 다뤄보고 싶지만 여기서 다루기엔 너무 긴 내용일 것 같아서 각자 찾아보시길 추천합니다. (기회가 된다면 다뤄보도록 하겠습니다.)

#### #define 매크로를 상수로 바꾸려고 한다면 주의할 점.
***  

그렇다면 #define 매크로를 사용중인 코드를 상수를 사용하도록 변경해야할 때 주의할 점은 없을까요? 다음을 보시죠.

- 포인터 상수 선언 시, 포인터가 가르키는 대상까지 const로 선언하는 것을 명심해야 합니다.
- 클래스 멤버의 상수를 정의하는 경우, 어떤 상수의 유효범위를 클래스로 한정하고자 할 때는 그 상수를 해당 클래스의 멤버로 만들어야 할 것입니다. (너무도 당연한 말이죠?), 단 그 상수의 개수가 한 개를 넘지 못하게 하고 싶다면 static 멤버로 만들어야 합니다. 다음 예를 함께 볼까요?  

```c++
class GamePlayer
{
public:
  static const int NUM_TURNS = 5;  // 상수 선언
  int scores[NUM_TURNS];           // 상수 사용 부분
}
```  

위의 static const int NUM_TURNS = 5;는 실제로 선언문 입니다. (정의라고 생각하실 수 있지만 아닙니다. 위의 예를 참고하세요) 하지만 컴파일러에서 예외로 처리해주기 때문에 컴파일에는 대부분 문제가 없습니다. 단 주소를 구하려고 한다든지, 오래된 컴파일러의 경우 정의를 달라고 떼를 쓰는 경우가 있습니다. 잘 이해가 안가신다구요? 아래 예를 통해 알아 봅시다. 사실 시작하기에 앞서서 선언과 정의에 대해 조금이나마 공부한 것은 지금을 위해서였습니다.  


아래 코드는 문제 없이 동작합니다  
(물론, 정의부가 없기 때문에 오래된 컴파일러에서 동작하지 않을 수 있습니다.)
```c++
class GamePlayer
{
private:
  static const int NUM_TURNS = 5;  // 상수 선언
  int scores[NUM_TURNS];           // 상수 사용 부분

public:
  const int* GetAddress()
  {
    return &NUM_TURNS;
  }
};

int main()
{
  GamePlayer player;
  return 0;
}
```  
<br>
그렇다면 아래 코드는 어떨까요? 오래된 컴파일러뿐만 아니라 모든 컴파일러에서 동작하지 않을 것 입니다. 변수의 주소를 사용하려고 하는데 정적 변수에 대한 정의가 없기 때문이죠.

```c++
class GamePlayer
{
private:
  static const int NUM_TURNS = 5;  // 상수 선언
  int scores[NUM_TURNS];           // 상수 사용 부분

public:
  const int* GetAddress()
  {
    return &NUM_TURNS;
  }
};

int main()
{
  GamePlayer player;
  const int* pInteger = player.GetAddress();
  return 0;
}
```

어라? 그런데 빌드가 됩니다. 실행도 잘되는군요. 아마도 제가 빌드한 환경은 window visual studio 2019인데, 해당 환경에서는 컴파일에러를 일으키지 않는 것 같습니다. CMake로 구성하여 wsl에서 linux gcc로 빌드해보도록 하겠습니다 (언젠가 CMake에 관한 글도 써보도록 하죠). 자, 빌드를 했더니 아래와 같이 컴파일 에러가 발생합니다. 리눅스 환경에 익숙하지 않으신 분들은 아! 그냥 Linux GCC로 빌드를 했구나, 그랬더니 책에서 말한대로 에러가 발생하는구나는 정도만 알고 넘어 가셔도 될 것 같습니다.

![Image Alt 텍스트](https://github.com/ysbaekFox/ysbaekFox.github.io/blob/master/_data/images/effectiveCpp_1_2_linux_build.PNG?raw=true)  
<br>
자 그렇다면, 아래와 같이 정의부를 추가한 코드는 어떨까요?, 예상하였듯이 빌드가 정상적으로 잘 됩니다.
```c++
class GamePlayer
{
private:
  static const int NUM_TURNS = 5;  // 상수 선언
  int scores[NUM_TURNS];           // 상수 사용 부분

public:
  const int* GetAddress()
  {
    return &NUM_TURNS;
  }
};

const int GamePlayer::NUM_TURNS;

int main()
{
	GamePlayer player;
	const int* pInteger = player.GetAddress();
	return 0;
}
```
마지막으로 오래된 컴파일러의 경우 선언부에서 초기화를 하는 문법을 받아들이지 않는 경우가 있다고 합니다. 저가 컴파일한 환경에서는 발생하지 않았지만 혹시 모르니 오래된 컴파일러에서 선언부가 아닌 정의부에서 초기화를 하도록 합시다. 따로 코드는 첨부하지 않겠습니다. ^_^

#### 클래스 상수를 #define으로 만들어?  
***
너무나도 당연한 말인데, 책에서는 클래스의 상수를 define으로 만들지 말라고 하고 있습니다. 설마 클래스의 멤버 상수를 define으로 작성하여 사용하고 계시거나, 사용하시려는 분은 없겠죠? define으로 정의하면 캡슐화도 불가능합니다. 하지 맙시다.

#### Enum Hack(나열자 둔갑술)  
***
왠만한 경우라면, 이제 대부분 Error를 발생시키지 않겠지만 딱한가지 추가적인 예외가 더 있습니다. 바로 컴파일하는 도중에 클래스의 상수 값을 필요로 하는 경우 입니다. 위의 예에서는 이미 클래스의 상수 값을 필요로 하고 있죠, 그리고 제가 컴파일한 Linux, Window 환경에서는 모두 정상 동작 중입니다. 하지만 오래된 컴파일러에서는 여전히 발생할 수 있습니다. (이것은 표준에 어긋난 구식 입니다, 정상 동작해야하는 것이 맞습니다.) 이때 사용하는 방식이 Enum hack 입니다. 간단한 예제만으로 이해가 되실 겁니다. 아래 예제를 보시죠.

```c++
class GamePlayer
{
private:
  enum { NUM_TURNS = 5, };  // 상수 선언
  int scores[NUM_TURNS];    // 상수 사용 부분
};

int main()
{
  return 0;
}
```  
그리고 이 Enum Hack을 알아야하는 이유는 컴파일 에러 문제 말고도 몇가지가 더 있습니다.  
- 첫째, Enum Hack 방식은 #define스러운 상수 선언입니다. 사용자는 enum의 주소를 취할 수 없기 때문입니다. 사용자가 해당 상수의 주소나 참조를 쓰는 것을 코드 상에서 방지하고 싶다면 Enum Hack이 자물쇠 역할을 할 것 입니다.  
- 둘째, 상당히 많은 코드에서 Enum Hack 방식을 사용 중입니다. 템플릿 메타프로그래밍의 핵심 기술이기도 하구요. 이런 코드를 쉽게 알아볼 수 있는 눈을 단련시켜줄 겁니다.

  
#### 함수처럼 쓰이는 매크로를 만들때 inline을 생각해라!  
***
자, 드디어 마지막 입니다. 아래의 매크로 함수를 어디한번 같이 볼까요?  

```c++
#define CALL_WITH_MAX(a, b) f( (a) > (b) ? (a) : (b) )
```  
언뜻 보기에도 문제가 있습니다. 조금만 생각해보아도 아래의 괴현상이 발생할 것이라는 것을 알 수 있습니다.

```cpp
int a = 5, b = 0;

CALL_WITH_MAX(++a, b);     // a가 두 번 증가합니다.
CALL_WITH_MAX(++a, b+10);  // a가 한 번 증가합니다.
```

(물론 책에는 이렇게 나와있긴 하지만, 저의 입장에서 함수 호출 파라미터로 증감연산자를 바로 사용한다는게 조금 납득이 안갑니다. 하지만 현업에서 누가 어떻게 코드를 작성할지 전혀 예측할 수 없습니다. 일어나지 않았지만 일어날 수 있는 문제에 대해서 미연에 방지하는 것은 중요하다고 생각합니다.)  

자 그렇다면 우리에겐 어떤 선택지가 있을까요? 우리에겐 inline 함수에 대한 template을 작성하는 방법이 있습니다. 아래 예제를 보실까요? template에 익숙하지 않지만 간결하고 템플릿의 아름다움?이 느껴집니다. 차차 공부를 해나가다보면 언젠가 템플릿을 자유자재로 쓸 수 있겠죠?

```c++
#include <iostream>

template<typename T>
inline void callWithMax(const T& a, const T& b)
{
  std::cout << (a > b ? a : b);
}

int main()
{
  callWithMax(1.1, 4.5);
  return 0;
}
```  
<br>
너무나도 고생하셨습니다 ㅎㅎ(나에게 하는 말...)  
이제부터는 코드를 작성하실 때 const / enum / inline을 가까이하시고 #define은 저 멀리로 보내주는 노력을 합시다 여담으로 제가 일하는 회사의 레거시 코드들은 #define이 아닌 const / enum / inline를 사용하고 있었습니다. 선배 사우분들이 작성하신 코드를 통해 저도 모르는 사이 좋은 코딩 습관을 가지게 되었다고 생각하니 감사할 따름입니다.

#### Reference 
***  
- ***Effective C++ (Scott Meyers)***
- ***<http://www.goldsborough.me/c/c++/linker/2016/03/30/19-34-25-internal_and_external_linkage_in_c++/>***


<body translate="no" oncontextmenu="return false" ondragstart="return false" onselectstart="return false">
  <div id="mouse_no" oncontextmenu="return false" ondragstart="return false" onselectstart="return false">
  </div>
</body>