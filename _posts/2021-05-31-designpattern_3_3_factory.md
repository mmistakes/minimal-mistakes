---
published: true
layout: single
title: "[MORDERN C++ DESIGN PATTERN] 3-3 Factory"
category: designpattern
tags:
comments: true
sidebar:
  nav: "mainMenu"
---  
*MODERN C++ DESIGN PATTERN*
* * *

### 시나리오
***
다음과 같은 직교좌표계의 좌표점 정보를 저장해서 사용하는 상황을 가정해봅시다.

```c++
struct Point
{
    Point(const float x, const float y)
        : x{x}, y{y} {}
    float x, y; // 직교 좌표계의 값
};
```

여기까지는 아무 문제가 없습니다. 하지만 극좌표계(각도와 거리를 써서 나타내는 2차원 좌표계)로 좌푯값을 저장해야한다면 어떻게 될까요?.   

가장 쉽게 생각해보면 극좌표계용 생성자를 추가하면 되지 않을까하고 생각할 수 있습니다.

```c++
Point(const float r, const float theta)
{
    x = r * cos(theta);
    y = r * sin(theta);
}
```
하지만 안타깝게도 문제가 있습니다. 직교좌표계 생성자도 두 개의 float 값을 파라미터로 하기 때문에 극좌표계의 생성자와 구분할 수가 없습니다.  

또 단순한 방법을 한가지 생각해본다면 다음과 같이 좌표계 종류를 구분하는 enum 타입 값을 파라미터에 추가하는 것이지요.  

```c++
enum class PointType
{
    cartesian,
    polar
};

Point(float a, float b, PointType type = PointType::cartesian)
{
    if(type == PointType::cartesian)
    {
        x = a;
        y = b;
    }
    else
    {
        x = a * cos(b);
        y = b * sin(b);
    }
}
```

생성자에서 좌표값을 지정하는 변수의 이름이 x,y 에서 a,b로 변경되었습니다. 
왜냐하면 x,y와 직교좌표계를 의미하기 때문에 극좌표계의 값도 의미할 수 있도록 중립적인 이름을 사용한 것 입니다.  

이러한 부분은 분명 직관적 표현을 하는데 있어서 손해입니다. x, y 그리고 r, 
theta로 변수를 각각 지정할 수 있으면 훨씬 더 그 의미를 전달하기 쉬울 것 입니다.  

### 팩터리 메소드
***

위의 예에서 생성자의 문제는 항상 타입과 같은 이름을 가진다는 것입니다. 
즉 일반적인 함수 이름과 달리 생성자의 이름에는 추가적인 정보를 표시할 수가 없다는 점입니다.  

그러면 어떻게 하는 것이 좋을까요? 생성자는 직접 사용할 수 없게 protected로 캡슐화하고, 대신 Point 객체를 만들어서 
반환하는 static 함수를 제공하는 것은 어떨까요?

```c++
struct Point 
{
protected:
    Point(const float x, const float y)
        : x{x}, y{y} {}

public:
    static Point NewCartesian(float x, float y)
    {
        return {x, y};
    }

    static Point NewPolar(float r, float theta)
    {
        return {r * cos(theta), r * sin(theta)};
    }
};
```

여기서 각각의 static 함수들을 팩터리 메서드라고 부릅니다. 
이러한 메소드가 하는 일은 Point 객체를 생성하여 return하는 일 뿐입니다. 
함수의 이름과 좌표 파라미터의 이름 모두 그 의미가 무엇인지, 
어떤 값이 인자로 주어져야 하는지 명확하게 표현하고 있습니다.  

이제 좌표점을 생성할 때 다음과 같이 명료하게 표현할 수 있습니다.
```c++
auto p = Point::NewPolar(5, M_PI_4);
```

### 팩터리
***
Point를 생성하는 함수들을 별도의 클래스에 몰아넣을 수 있습니다. 그러한 클래스를 팩터리라고 부릅니다. 팩터리 클래스를 만들기 위해, 
먼저 Point 클래스를 다음과 같이 다시 정의합니다.

```c++
struct Point
{
    float x, y;
    friend class PointFactory;
private:
    Point(float x, float y) : x(x), y(y) {}
};

class PointFactory
{
    static Point NewCartesian(float x, float y)
    {
        return Point{x, y};
    }

    static Point NewPolar(float r, float theta)
    {
        return Point{ r*cos(theta), r*sin(theta) };
    }
};
```

눈여겨볼 부분이 두가지 있습니다.

- Point의 생성자는 private로 선언되어 사용자가 직접 생성자를 호출할 수 없게 합니다.
- Point는 PointFacotory를 firend 클래스로 선언합니다. 이 부분은 팩터리가 Point의 생성자에 접근할 수 있게 하려는 의도입니다.
이 선언이 없으면 팩터리에서 Point의 인스턴스를 생성할 수가 없습니다(private 생성자 이니깐요). 또한 이 부분은 생성할 클래스와 그 팩터리 클래스는 
동시에 만들어져야 한다는 것을 암시합니다.  

이후 PointFactory에 New{XXX} 함수들을 정의하기만 하면 됩니다. 이제 다음과 같이 인스턴스를 생성할 수 있을 겁니다.

```c++
auto my_point = PointFactory::NewCartesian(3, 4);
```

### 내부 팩터리

내부 팩터리는 생성할 타입의 내부 클래스로서 존재하는 간단한 팩터리를 말합니다. 
C#, JAVA 등 friend 키워드에 해당하는 문법이 없는 프로그래밍 언어들에서는 내부 팩터리를 흔하게 사용합니다. 

내부 팩터리의 장점은 내부 클래스이기 때문에 private 멤버들에 자동적으로 자유로운 접근 권한을 가진다는 점입니다. 
거꾸로 내부 클래스를 보유한 외부 클래스도 내부 클래스의 private 멤버들에 접근할 수 있습니다. 자 다음의 코드를 봅시다.

```c++
struct Point
{
private:
    Point(float x, float y) : x(x), y(y) {}

    struct PointFactory
    {
    private:
        PointFactory() {}
    public:
        static Point NewCartesian(float x, float y)
        {
            return {x, y};
        }
        static Point NewPolar(float r, float theta)
        {
            return {r*cos(theta), r*sin(theta)}
        }
    };

public:
    float x, y;
    static PointFactory Factory;
};
```

뭐가 어떻게 되고 있는 걸까? 팩터리가 생성할 바로 그 클래스 안에 팩터리 클래스가 들어가 있습니다. 
이러한 방법은 팩터리가 생성해야 할 클래스가 단 한종류 일 때만 유용합니다. 
왜냐하면 팩터리가 여러 타입을 활용하여 객체를 생성해야하는 경우라면, 객체 생성에 필요한 다른 타입들의 private 멤버에 접근하기는 사실상 불가능하기 때문입니다.

그리고 아래와 같이 코드를 개선하는 방법도 있습니다. 

<details markdown="1">
<summary>::와 .을 섞어쓰는 것이 마음에 들지 않을 때</summary>

```c++
// PointFactory를 public으로 선언

struct Point
{
private:
    Point(float x, float y) : x(x), y(y) {}

public:
    struct PointFactory
    {
    private:
        PointFactory() {}
    public:
        static Point NewCartesian(float x, float y)
        {
            return { x, y };
        }
        static Point NewPolar(float r, float theta)
        {
            return { r * cos(theta), r * sin(theta) };
        }
    };

    float x, y;
    static PointFactory Factory;
};
```
<!-- summary 아래 한칸 공백 두고 내용 삽입 -->

</details>

<details markdown="1">
<summary>Point가 중복해서 쓰이는것이 거슬릴 때</summary>

```c++
// typedef를 사용하여 PointFactory를 Factory로 선언

struct Point
{
private:
    Point(float x, float y) : x(x), y(y) {}

public:
    struct PointFactory
    {
    private:
        PointFactory() {}
    public:
        static Point NewCartesian(float x, float y)
        {
            return { x, y };
        }
        static Point NewPolar(float r, float theta)
        {
            return { r * cos(theta), r * sin(theta) };
        }
    };

    float x, y;
    static PointFactory Factory;
    typedef PointFactory Factory;
};
```
<!-- summary 아래 한칸 공백 두고 내용 삽입 -->

</details>
<br>
위와 같이 개선할 경우 가장 자연스러운 표현을 가능하게 합니다. 
그리고 클래스 내부에 팩토리를 만들어 놓으면 API 사용성이 좋아집니다. 
예를 들어 Point::라고 입력했을 때 나타나는 자동완성 목록에서 팩토리로 생성할 수 있는 단서들을 찾을 수 있겠지요.  

### 추상 팩터리
***

지금까지 객체 한 개를 생성하는 경우를 살펴보았습니다. 그렇다면 여러 종류의 연관된 객체들을 생성하는 경우에 대해 알아봅시다. 추상 팩터리는 앞서 말한 여러 종류의 연관된 객체들을 생성해야하는 경우에 사용 됩니다. 다음과 같은 상황을 생각해봅시다. 뜨거운 차와 커피를 판매하는 카페를 운영한다고 할 때, 이 두 음료는 완전히 다른 장비로 만들어지겠지요. 그렇다면 이 부분을 모델링할 수 있을 겁니다. 다음의 코드를 함께 봅시다.

```c++
class HotDrink
{
public:
    virtual void prepare(int volume) = 0;
};

class Tea : public HotDrink
{
public:
    void prepare(int volume) override
    {
        cout << "prepare Tea : " << volume << "ml" << endl;
    }
};

class Coffee : public HotDrink
{
public:
    void prepare(int volume) override
    {
        cout << "prepare Coffee : " << volume << "ml" << endl;
    }
};


unique_ptr<HotDrink> make_drink(string type)
{
    unique_ptr<HotDrink> drink;

    if (type == "tea")
    {
        drink = make_unique<Tea>();
        drink->prepare(200);
    }
    else
    {
        drink = make_unique<Coffee>();
        drink->prepare(50);
    }
	
    return drink;
}
```

```c++
unique_ptr<HotDrink> tea = make_drink("tea");
unique_ptr<HotDrink> coffee = make_drink("coffee");
```

위의 코드의 최상단에는 뜨거운 음료를 추상화하는 HotDrink를 정의하고 있습니다. prepare() 함수는 지정된 용량의 뜨거운 음료를 준비할 때 호출합니다. 그리고 HotDrink를 상속 받아 Tea와 Coffee Class를 구현하였습니다.  

그리고 나서, make_drink 함수를 만들었습니다. make_drink 함수는 음료의 이름을 받아 그 해당 음료를 생성하여 반환합니다.  

그런데 앞서 언급했듯이 차를 만드는 장비와 커피를 만드는 장비가 다릅니다. 따라서 팩터리를 만들기로 해봅시다. (위의 코드는 팩터리가 아닙니다. 단순히 type에 따라 객체를 생성하여 반환하는 함수이지요)  

먼저 HotDrink 기반으로 음료들이 추상화 되어있으므로, 음료들을 생성할 Factory 클래스 HotDrinkFactory를 아래와 같이 만듭시다.

```c++
class HotDrinkFactory
{
public:
    virtual unique_ptr<HotDrink> make() const = 0;
};
```

이 HotDrinkFactory가 바로 추상 팩터리 입니다. 어떤 특정 인터페이스를 규정하고 있지만, 구현 클래스가 아니라 추상 클래스 입니다. 즉, HotDrinkFactory가 인자로서 사용될 수 있지만, 실제 객체 생성을 하려면 구체화된 구현 클래스가 필요합니다.  아래의 CoffeeFactory와 TeaFactory를 봅시다.

```c++
class CoffeeFactory : public HotDrinkFactory
{
    unique_ptr<HotDrink> make() const override
    {
        return make_unique<Coffee>();
    }
};

class TeaFactory : public HotDrinkFactory
{
    unique_ptr<HotDrink> make() const override
    {
        return make_unique<Tea>();
    }
};
```

그리고 추상 클래스를 구체화한 팩터리들에 대한 참조를 내부로 가지고 있는 클래스를 아래와 같이 만들 수 있습니다. DrinkFactory를 사용하여 string을 통해 생성할 객체를 선택할 수 있습니다. 또한 내부적으로 예외처리를 한다면 정의되지 않은 음료에 대해서도 처리할 수 있겠지요. 또한 예제에서는 volume(음료의 양)은 고정된 값이지만 가변 parameter로 구현할 수도 있을 겁니다.

```c++
class DrinkFactory
{
    map<string, unique_ptr<HotDrinkFactory>> hot_factories;

public:
    DrinkFactory()
    {
        hot_factories["coffee"] = make_unique<CoffeeFactory>();
        hot_factories["tea"] = make_unique<TeaFactory>();
    }

    unique_ptr<HotDrink> make_drink(const string& name)
    {
        auto drink = hot_factories[name]->make();
        drink->prepare(150);
        return drink;
    }
};
```
```c++
unique_ptr<HotDrink> teaDrinkFactory = DrinkFactory().make_drink("tea");
unique_ptr<HotDrink> coffeeDrinkFactory = DrinkFactory().make_drink("coffee");
```

참고 : 팩터리 타입은 객체가 아닌 스마트 포인터로 저장 (객체 슬라이싱 문제 발생 방지)


### 함수형 팩터리
***

팩터리와 관련된 마지막 주제 입니다.  
보통 팩터리라고 말할 때 다음의 두가지 중 하나를 의미합니다.

1. 객체를 어떻게 생성하는지 알고 있는 클래스  
2. 호출했을 때 객체를 생성하는 함수

2번의 경우 팩터리 메서드의 한 종류라고 볼 수 있을 것 같지만, 사실 다릅니다. 함수형 팩터리는 어떤 타입 T를 반환하는 std::function을 어떤 함수의 인자로 넘겨서 객체를 생성하는 것을 의미합니다.  

즉 함수형 팩터리는 멤버 함수가 아니라 객체를 생성하는 std::function를 의미하는 것 입니다. (메소드의 의미는 어떤 클래스의 멤버함수를 의미하는 것이므로 팩터리 메소드의 한 종류라고 하는 것은 의미가 많이 다르지요)  

자! 아래의 예제를 볼까요? DrinkWithVolumeFactory 클래스의 factories 멤버는 <string, function>을 key, value로 가지는 map container 변수 입니다. 클래스의 생성자 내부에서는 factories에 람다 함수로 구현한 function을 넣고 있습니다. 아래와 같이 구현하면 팩터리를 포인터에 저장하는 방법이었던 DrinkFactroy와 달리 200ml의 음료를 생성하는 절차까지 수행하고 객체를 반환하도록 구현이 가능합니다.

```c++
class DrinkWithVolumeFactory
{
    map<string, function<unique_ptr<HotDrink>()>> factories;

public:
    DrinkWithVolumeFactory()
    {
        factories["tea"] = [] {
            auto tea = make_unique<Tea>();
            tea->prepare(200);
            return tea;
        };

        factories["coffee"] = [] {
            auto tea = make_unique<Coffee>();
            tea->prepare(50);
            return tea;
        };
    }

    unique_ptr<HotDrink> make_drink(const string& name);
};
```


```c++
inline unique_ptr<HotDrink>
DrinkWithVolumeFactory::make_drink(const string& name)
{
    return factories[name]();
}
```

```c++
unique_ptr<HotDrink> teaDrinkWithVolumeFactory = DrinkWithVolumeFactory().make_drink("tea");
unique_ptr<HotDrink> coffeeDrinkWithVolumeFactory = DrinkWithVolumeFactory().make_drink("coffee");
```

### 요약
***
##### 정리
- 팩터리 메서드는 생성할 타입의 멤버 함수로 객체를 생성하여 반환 합니다. 이 메서드는 생성자를 대신 합니다. 생성자는 protected로 캡슐화하고 static으로 선언하여 사용할 수 있습니다.
- 팩터리는 별도의 클래스로서 목적하는 객체의 생성 방법을 알고 있는 클래스 입니다. 클래스 대신 std::function의 형태로 존재하여 인자로서 사용될 수 있는 경우도 팩터리에 해당 합니다.
- 추상 팩터리는 구현 클래스에서 상속 받는 추상 클래스 입니다. 이를 통해 다형성을 부여 할 수 있습니다.

##### 생성자 호출 대비 장점
- 팩터리는 가독성 높은 명명이 가능 합니다.
- 팩터리는 객체의 생성을 거부할 수 있습니다. 생성자는 Exception을 발생시키는 방법 밖에 없지만 팩터리는 nullptr를 리턴하는 방법으로 문제를 해결할 수 있습니다.
- 팩터리는 다형성을 부여할 수 있습니다. 서브 클래스에서 인스턴스를 만들도록 구현하고 부모 클래스에서 인스턴스의 참조나 포인터를 반환하도록 구현할 수 있습니다.