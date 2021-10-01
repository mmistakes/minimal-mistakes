---
published: true
layout: single
title: "[Effective C++] 35. 가상 함수 대신 쓸 것들도 생각해 두는 자세를 시시때때로 길러 두자"
category: effectcpp
tags:
comments: true
sidebar:
  nav: "mainMenu"
---  
* * *

여러분이 게임 개발팀에서 일을 하고 있다고 칩시다. 그리고 아래와 같은 게임 캐릭터 클래스를 선언하였습니다.

```c++
class GameCharacter
{
public:
  virtual int healthValue() const;
  ...
}
```

이 클래스를 확인해 보니 healthValue()라는 비순수 가상함수를 제공하고 있네요. 순수 가상 함수가 아니므로 우리는 이 함수가 기본 구현을 제공할 것이라는 것을 알 수 있습니다. 또한 파생 클래스에서 체력치를 계산하는 함수를 재정의 할 수도 있겠지요.  

이것은 누가 뭐라 할 것도 없는 당연한 설계이지만, 이와 동시에 어떤 의미로는 이것이 약점 입니다. 다른 방법이 없는지 한번 알아보도록 합시다.

#### 비가상 인터페이스 관용구를 통한 템플릿 메서드 패턴
* * *

가상 함수는 반드시 private 멤버로 두어야 한다라고 주장하는 소위 '가상 함수 은폐론'으로 시작해보겠습니다. 이 이론을 따르는 사람들이 제안하는 더 괜찮은 설계는
 healthValue를 public 함수로 그대로 두되 비가상 함수로 선언하고, 내부적으로는 실제 동작을 맡은 private 가상 함수를 호출하는 식으로 만드는 것 입니다.

```c++
class GameCharacter
{
public:
  int healthValue() const
  {
    ...
    int retVal = doHealthValue();
    ...
    return retVal;
  }
  ...
private:
  virtual int doHealthValue() const
  {
    ...
  }
};
```

여기까지가 기본 설계 입니다. 사용자로 하여금 public 비가상 멤버 함수를 통해 private 가상 함수를 간접적으로 호출하게
 만드는 방법으로 비가상 함수 인터페이스 NVI 관용구라고 많이 알려져 있지요. 
 사실 이 관용구는 템플릿 메서드라 불리는 고전 디자인 패턴을 C++ 식으로 구현한 것 입니다.

그러고 보니 위의 doHealthValue가 가상 함수이다 보니 파생 클래스에서 재정의하겠구나 
라고 생각하시는 분이 당연히 있을 것 입니다. 
그런데 이 가상 함수는 재정의를 한다손 치더라도 호출할 수 없습니다. 어떻게 된걸까요? 설계상의 모순일까요?
아닙니다. 가상 함수의 구현 여부는 파생 클래스에서 결정하지만 가상 함수가 호출되는 시점은 기본 클래스만의 고유 권한으로 두겠다는 것입니다.

또 한가지, NVI 관용구에서 가상 함수는 private 멤버여야 할 필요가 있을까요? 
꼭 그렇지만은 않습니다. 파생 클래스에서 재정의된 함수가 기본 클래스의 같은 이름의 함수 호출할 것을 예상하고 설계된 구조도 있습니다. (항목 27) 
이런 경우 protected 멤버여야만 하겠지요. 하지만 public이라면? 굳이 NVI 관용구를 적용하는 의미가 없을 것 입니다.


#### 함수 포인터로 구현한 Strategy 패턴
* * *

NVI 관용구는 public 가상 함수를 대신할 수 있는 괜찮은 방법이지만, 클래스 설계의 관점에서 보면 눈속임이나 다름 없습니다. 여전히 가상 함수를 사용하고 있으니깐요. 
이번에는 캐릭터 타입과 별개로 체력치를 계산하는 작업을 별개로 놓는 설계를 해보겠습니다. 각 캐릭터의 생성자에 체력치 계산용 함수의 포인터를 넘기게 만들고 이 함수를 호출해서 실제 계산을 수행하게 해보면 되지 않을까요?  

```c++
class GameCharacter; // 전방 선언

int defaultHealthCalc(const GameCharacter& gc);

class GameCharacter
{
public:
  typedef int (*HealthCalcFunc)(const GameCharacter&); // 함수 포인터
  
  explicit GameCharacter(HealthCalcFunc hcf = defaultHealthCalc)
    : healthFunc(hcf)
  { }

  int healthValue() const
  { return healthFunc(*this); }
  ...

private:
  HealthCalcFunc healthFunc;
};
```
```c++
class EvilBadGuy : public GameCharacter
{
public:
  explicit EvilBadGuy(HealthCalFunc hcf = defaultHealthCalc)
    : GameCharacter(hcf) // 상속받은 멤버는 자식 클래스에서 직접 초기화할 수 없기 때문에
                         // 초기화 리스트를 사용하여 부모에게 요청해야 합니다.
    { ... }
  ...
} ;
...
...

int loseHealthQuickly(const GameCharacter&);
int loseHealthSlowly(const GameCharacter&);

EvilBadGuy ebg1(loseHealthQuickly);
EvilBadGuy ebg2(loseHealthSlowly);
```

이 방법은 디자인 패턴의 전략(Strategy) 패턴의 단순한 응용 예 입니다. 또한 이 방법은  게임이 실행되는 도중에 특정 
캐릭터에 대한 체력치 계산 함수를 교체할 수도 있습니다.  

하지만, 체력치 계산 함수가 GameCharacter 클래스의 멤버 함수가 아니라는 점은 체력치가 
계산되는 대상 객체의 비공개 데이터는 이 함수로 접근할 수 없다는 뜻 입니다.  

만약 접근을 하고 싶다면 friend 선언을 한다던지 public으로 캡슐화를 약화시키는 방법 밖에는 없습니다. 
이러한 선택의 기로에서 위의 설계 방법을 선택할지 말지는 스스로의 판단에 맡기도록 하겠습니다.

#### std::funcion으로 구현한 Strategy 패턴
* * *

std::function을 사용하여 구현한 Strategy 패턴에 대해 알아보겠습니다. 
기존의 함수 포인터와의 가장 큰 차이점은 매개변수와 반환 타입의 암시적 변환이 가능해진다는 것 입니다. 
굳이 다른 점을 찾는다면 GameCharacter가 이제는 std::function 객체, 그러니깐 좀 더 일반화된 함수 포인터를 가지게 된다는 것 뿐입니다.

```c++
class GameCharacter;
int defaultHealthCalc(const GameCharacter& gc);

class GameCharacter
{
public:
  typedef std::function<int (const GameCharacter&)> HealthCalcFunc;

  explicit GameCharacter(HealthCalcFunc hcf = defaultHealthCalc)
  : healthFunc(hcf)
  { }

  int healthValue() const
  { return healthFunc(*this); }
  ...

private:
  HealthCalcFunc healthFunc;
};
```
<br>
즉, 아래의 예제와 같이 사용이 가능해집니다.

```c++
short calcHealth(const GameCharater&);

struct HealthCalculator // 체력 계산용 함수 객체를 만들기 위한 클래스
{
  int operator()(const GameCharacter&) const
  { ... }
};

class GameLevel
{
public:
  float health(const GameCharacter&) const;
  ...
};

class EvilBadGuy : public GameCharacter
{
  ...
};

EvilBadGuy ebg1(calcHealth); // return short
EyeCandyCharacter ecc1(HealthCalulator()); // struct HealthCalculator의 operator()를 호출하는데 return과 매개변수가 기존 함수 형태와 완전히 동일합니다.

GameLevel currentLevel;
EvilBadGuy ebg2(std::bind(&GameLevel::health, currentLevel, std::placeholders::_1)); // std::bind 사용
```

#### 고전적인 Strategy 패턴
* * *

이번에는 더 전통적인 방법으로 구현한 전략 패턴을 알아보겠습니다. 체력치 계산 함수를 나타내는 클래스 계통을 아예 따로 만들고, 
실제 체력치 계산 함수는 이 클래스 계통의 가상 멤버 함수로 만드는 것 입니다.

```c++
class GameCharacter; // 전방 선언

class HealthCalcFunc
{
public:
  ...
  virtual int calc(const GameCharacter& gc) const
  { ... }
  ...
};

HealthCalcFunc defaultHealthCalc;

class GameCharacter
{
public:
  explicit GameCharacter(HealthCalcFunc *phcf = &defaultHealthCalc)
  : pHealthCalc(phcf)
  { }

  int healthValue() const
  { return pHealthCalc->calc(*this); }
  ...
private:
  HealthCalcFunc *pHealthCalc;
}
```

이 방법은 표준적인 전략 패턴의 구현 방법에 익숙한 경우 빨리 이해할 수 있다는 점에서 매력적입니다. 게다가 HealthCalcFunc 클래스 계통에 파생 클래스를 추가함으로써 기존의 체력치 계산 알고리즘을 조정/개조할 수 있는 가능성을 열어 놓았다는 점도 플러스 요인입니다.


#### ***End Note***
***
- 가상 함수 대신에 쓸 수 있는 다른 방법으로 NVI 관용구 및 전략 패턴을 들 수 있습니다. 이 중 NVI 관용구는 그 자체가 템플릿 메서드의 한 예입니다.
- 객체에 필요한 기능을 멤버 함수로부터 클래스 외부의 비멤버 함수로 옮기면, 그 비멤버 함수는 그 클래스의 public 멤버가 아닌 것들은 접근할 수 없다는 단점이 있습니다.
- std::function 객체는 일반화된 함수 포인터처럼 동작합니다. 이 객체는 주어진 대상 시그니처와 호환되는 모든 함수호출성 객체를 지원합니다.

#### Reference 
***  
- ***Effective C++ (Scott Meyers)***

<body translate="no" oncontextmenu="return false" ondragstart="return false" onselectstart="return false">
  <div id="mouse_no" oncontextmenu="return false" ondragstart="return false" onselectstart="return false">
  </div>
</body>