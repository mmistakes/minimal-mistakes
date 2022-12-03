---
title:  "[C#] IEnumerable, IEnumerator 그리고 yield" 

categories:
  -  C Sharp
tags:
  - [Programming, C Sharp]

toc: true
toc_sticky: true

date: 2021-01-09
last_modified_at: 2021-01-09
---


- `enumerate` 영어로 수를 세다. 카운팅 하다!
- 두 인터페이스는 **열거자**와 관련이 있다.(반복자와 동일한...것 같다. 아닐수도..)
- `using System.Collections;`
  - C#의 모든 Collections 컬렉션은 <u>IEnumerable, IEnumerator를 상속받아 구현하고 있다.</u>
    - 그래서 List, Array 같은 컬렉션 클래스 객체들을 `foreach`문에서 돌릴 수 있는 것!
      - 자세한건 밑에서 후술


- IEnumerator 👉 데이터를 리턴(Getter)하는 열거자
- IEnumerable 👉 열거자를 리턴하는 Getter의 Getter


## 🚀 IEnumerator : 열거자

> `IEnumerator` : 열거자를 구현하는데 필요한 *인터페이스*

클래스 내부의 컬렉션에 대해 반복할 수 있도록 도와준다. 

```c#
public interface IEnumerator
{
    object Current { get; }
    bool MoveNext();
    void Reset();
}
```

이렇게 생겼다. `IEnumerator`는 반복자 구현에 필요한 함수 3 가지를 구현하게 강제하는 인터페이스다. 인터페이스는 텅텅 비어있꼬 아~무것도 기능하는게 없다. 그자체로는!! 반복자를 구현하기 위해선 최소한 저 위의 3 개 함수를 알아서 구현하시면 될거에요~ 라고 틀을 잡아주는 것 뿐이다.

- *Current* 
  - 읽기 전용 프로퍼티로 <u>현재 위치의 데이터</u>를 `object` 타입으로 리턴한다.
    - `object`는 `System.Object`와 같다.
- *MoveNext*
  - 다음 위치로 이동하는데 다음 위치에 데이터 있으면 true, 없으면 false.
  - 그래서 <u>보통 컬렉션 인덱스를 1씩 증가 시켜</u> 컬렉션의 끝에 도달 했는지 여부를 나타내는 bool을 반환하는 식으로 구현함.
- *Reset*
  - 인덱스를 초기 상태 위치로 ㄱㄱ
  - 보통 컬렉션의 인덱스를 `-1`로 설정하는식으로 구현

IEnumerator 를 리턴하는 모든 함수는 `ref`, `out` 매개변수가 허용되지 않는다. 또한 람다 함수에 사용할 수도 없다.

<br>

## 🚀 IEnumerable : 열거자 IEnumerator를 리턴

> `IEnumerable` : 열거자 *IEnumerator*를 Get하는데 필요한 *인터페이스*

클래스 내부의 컬렉션에 대해 반복할 수 있도록 도와주는 **IEnumerator**를 노출시킨다. 열거할 수 있는 제네릭이 아닌 모든 컬렉션에 대 한 기본 인터페이스. (제네릭 IEnumerator, IEnumerable도 따로 있는데 이는 나중에 마주치면 그때 정리하자ㅠ)

```c#
public interface IEnumerable
{
    IEnumerator GetEnumerator();
}
```

객체로 `foreach`문을 돌리기 위해서는 그 객체 타입이 `IEnumerable`을 상속받은 클래스여야 한다. `IEnumerable`을 상속받아 **GetEnumerator()**을 구현한 클래스이어야 `foreach`로 내부 데이터를 열거할 수 있다.
  
- *GetEnumerator*
  - 컬렉션을 반복하는 데 사용할 수 있는 **IEnumerator**를 리턴해야 한다. 즉, 순회하며 **IEnumerator**을 하나하나 가져올 수 있도록! 
    - 리턴받은 이 **IEnumerator**의 3 가지 함수를 통해 컬렉션을 반복할 수 있다.

이렇게 IEnumerable 로 각각의 독립적인 IEnumerator 객체들을 관리할 수도 있다. IEnumerator 객체들을 여러가지 쓸 수도 있지 않은가. 각각은 다 독립적인 열거자일 것이다. 

마찬가지로 IEnumerable 를 리턴하는 모든 함수는 `ref`, `out` 매개변수가 허용되지 않는다. 또한 람다 함수에 사용할 수도 없다.

<br>

## 🚀 예제 코드 

### ✈ 첫 번째

#### IEnumerable 상속 및 구현

```c#
// Simple business object.
public class Person
{
    public Person(string fName, string lName)
    {
        this.firstName = fName;
        this.lastName = lName;
    }

    public string firstName;
    public string lastName;
}
```

사람 한명을 표현하는 `Person` 

```c#
// Collection of Person objects. This class
// implements IEnumerable so that it can be used
// with ForEach syntax.
public class People : IEnumerable
{
    private Person[] _people;
    public People(Person[] pArray)
    {
        _people = new Person[pArray.Length];

        for (int i = 0; i < pArray.Length; i++)
        {
            _people[i] = pArray[i];
        }
    }

// Implementation for the GetEnumerator method.
    IEnumerator IEnumerable.GetEnumerator()
    {
       return (IEnumerator) GetEnumerator();
    }

    public PeopleEnum GetEnumerator()
    {
        return new PeopleEnum(_people);
    }
}
```

> `People` 👉 `Person` 객체들을 관리. 즉 모든 사람을 관리함 하나 하나

- *IEnumerable* 상속받고 *GetEnumerator* 구현
  - 즉 사람 한명 한명을 순회하며 접근할 수 잇는 열거자를 제공하는 함수 *GetEnumerator*를 구현한다.
    - 위의 경우에선 2 가지 *GetEnumerator*를 구현했다.
      - ***public PeopleEnum GetEnumerator()***
        - 밑에서 후술할 *IEnumerator*을 상속받은 `PeopleEnum` 객체를 리턴
          - `PeopleEnum` 클래스는 밑에 후술
        - 이건 IEnumerable 인터페이스를 구현한 함수가 아니다. `PeopleEnum` 리턴이니까..!! 
      - ***IEnumerator IEnumerable.GetEnumerator()***
        - 위의 *GetEnumerator()* 을 실행시켜서 리턴받은 `PeopleEnum` 객체를 `IEnumerator`로 업캐스팅 형변환해 리턴함
        - 이게 바로 IEnumerable 인터페이스를 구현한 함수. 알맞게 *IEnumerator*를 리턴한다.
         - [인터페이스의 명시적 구현 참고](https://ansohxxn.github.io/c%20sharp/interface/)

```c#

    public IEnumerator GetEnumerator()
    {
        return new PeopleEnum(_people);
    }
```

그냥 이렇게 해도 되는 것 같다. `PeopleEnum(_people)`이 `IEnumerator`로 형변환되어 리턴되도록! 


<br>

#### IEnumerator 상속 및 구현

```c#
// When you implement IEnumerable, you must also implement IEnumerator.
public class PeopleEnum : IEnumerator
{
    public Person[] _people;

    // Enumerators are positioned before the first element
    // until the first MoveNext() call.
    int position = -1; // 👉 _people 배열 인덱스로 활용할 것.

    public PeopleEnum(Person[] list)
    {
        _people = list;
    }

    public bool MoveNext()
    {
        position++;
        return (position < _people.Length);
    }

    public void Reset()
    {
        position = -1;
    }

    object IEnumerator.Current
    {
        get
        {
            return Current;
        }
    }

    public Person Current
    {
        get
        {
            try
            {
                return _people[position];
            }
            catch (IndexOutOfRangeException)
            {
                throw new InvalidOperationException();
            }
        }
    }
}
```

> `PeopleEnum` 👉 `Person` 객체들, 즉 사람 한명 한명을 순회하며 접근할 수 잇는 열거자

- *IEnumerator* 상속받고 
  - *MoveNext* 구현
    - `_people`의 인덱스 `position`를 증가시킨다. 
    - `position`가 `_people` 배열 크기를 넘어버리는데 도달했다면 더 이상 MoveNext가 불가능하므로 false 리턴
  - *Reset* 구현
    -  `_people`의 인덱스 `position`를 -1 로 초기화
  - *Current* 구현
    - 2 가지 *Current*를 구현했다.
      - ***public Person Current***
        - `Person`객체인 `_people[position]`를 리턴함. 
        - 이건 IEnumerable 인터페이스를 구현한 프로퍼티가 아니다. `Person` 리턴이니까..!! 
      - ***object IEnumerator.Current***
        - 위의 *Current* 을 실행시켜서 리턴받은 `Person` 객체를 `object`(System.Object)로 업캐스팅 형변환해 리턴함
        - 이게 바로 IEnumerable 인터페이스를 구현한 프로퍼티. 알맞게 *object*를 리턴한다.
          - [인터페이스의 명시적 구현 참고](https://ansohxxn.github.io/c%20sharp/interface/)

```c#

    public object Current
    {
        get
        {
            try
            {
                return _people[position];
            }
            catch (IndexOutOfRangeException)
            {
                throw new InvalidOperationException();
            }
        }
    }
```

그냥 이렇게 해도 되는 것 같다. `_people[position]`이 `object`로 형변환되어 리턴되도록! 


<br>

#### foreach 에 객체를 넣으려면 ⭐

> `foreach`문을 객체에 대해 돌리려면 그 객체의 클래스는 *Ienumerable* 를 상속받는 클래스여야 한다. 그래야 열거할 수 있다.

- `foreach`는 객체의 *GetEnumerator()* 함수를 통해 열거자 *IEnumerator* 객체를 리턴 받고 이를 통해 데이터를 순회한다.
  - 따라서 객체를 `foreach`에서 돌리려면 반드시 *Ienumerable* 를 상속받을 필요는 없지만 *IEnumerator* 객체를 리턴하는 *GetEnumerator()*가 반드시 구현되어 있어야 한다. 근데 이러려면 *IEnumerator* 상속 받는 클래스도 구현해야 할 것 같다.. (아니면 yield를 사용하거나?)
    - 마찬가지로 반드시 *IEnumerator* 인터페이스를 상속 받는 클래스를 만들 필요는 없다. 다만 *MoveNext, Reset 및 Current 멤버*는 반드시 구현되어 있어야 한다.

```c#
class App
{
    static void Main()
    {
        Person[] peopleArray = new Person[3]
        {
            new Person("John", "Smith"),
            new Person("Jim", "Johnson"),
            new Person("Sue", "Rabon"),
        };

        // ⭐⭐⭐⭐⭐
        People peopleList = new People(peopleArray);
        foreach (Person p in peopleList)
            Console.WriteLine(p.firstName + " " + p.lastName);
    }
}
```

- *IEnumerator* 를 리턴받을 수 있는 *Ienumerable*인 객체 `peopleList` 생성
- `peopleList` 안에는 *GetEnumerator()* 함수가 구현되어 있으며 또한 *IEnumerator*를 상속받아 3 가지 함수 모두 구현한 객체도 있기 때문에
  - foreach문에서 `Person p in peopleList`를 동작시켜 `peopleList`의 내부 데이터 `_people`의 원소들을 차례대로 리턴받을 수 있게 되었다.

```c#
IEnumerator enumerator = peopleList.GetEnumerator();
while(enumerator.MoveNext())
    Console.WriteLine(Current.firstName + " " + Current.lastName);
```

`foreach`문을 실행하면 컴파일러가 위와 같은 코드로 변경해 실행하는 것이나 마찬가지가 된다. `foreach`문은 `peopleList`의 *GetEnumerator()*를 호출하고 그 *IEnumerator* 열거자를 통해 *MoveNext()*와 *Current*를 사용하여 차례차례 `peopleList`의 `_people`배열을 순회할 수 있게 된다.

<br>

### ✈ 두 번째

```c#
using System;
using System.Collections;
namespace ConsoleEnum
{
    public class cars : IEnumerator,IEnumerable  // 👉다중 상속
    {
       private car[] carlist;
       int position = -1;
       //Create internal array in constructor.
       public cars()
       {
           carlist= new car[6]
           {
               new car("Ford",1992),
               new car("Fiat",1988),
               new car("Buick",1932),
               new car("Ford",1932),
               new car("Dodge",1999),
               new car("Honda",1977)
           };
       }
       //IEnumerator and IEnumerable require these methods.
       public IEnumerator GetEnumerator()
       {
           return (IEnumerator)this;  // 👉이 클래스는 IEnumerator를 상속받기도 하므로 (IEnumerator)this 형변환만 해주면 땡
       }
       //IEnumerator
       public bool MoveNext()
       {
           position++;
           return (position < carlist.Length);
       }
       //IEnumerable
       public void Reset()
       {
           position = 0;
       }
       //IEnumerable
       public object Current
       {
           get { return carlist[position];}
       }
    }
  }
```

<br>

## 🚀 yield

> `yield`는 IEnumerator/IEnumerable 의 간편표기법이다. 

`yield`를 통해 *IEnumerable*, *IEnumerator* 를 상속받는 객체를 간단하게 구현할 수 있는 것이나 마찬가지다. **마치 일시정지와 같은 기능이다.**


### ✈ yield 장점

  - `yield`를 사용하면 *Ienumerable*, *IEnumerator*를 상속받는 클래스를 작성해 줄 필요 없다.
    - *IEnumerable* 클래스에서 GetEnumerator() 메서드를 구현하는 한 방법으로 `yield` 를 사용할 수 있다. 
      - 즉, GetEnumerator() 메서드에서 `yield return`를 사용하여 컬렉션 데이타를 순차적으로 하나씩 넘겨주는 코드를 구현하고, 리턴타입으로 *IEnumerator* 인터페이스를 리턴할 수 있다. 
      - C#에서 Iterator 방식으로 yield 를 사용하면, 명시적으로 별도의 Enumerator 클래스를 작성할 필요가 없다. 컴파일러가 알아서 만들어주기 때문이다! (밑에 참고)
  - 비동기적 실행이 가능
    - ⭐ `yield return`문을 만나면 함수를 호출한 곳에 리턴을 해준 후 다시 돌아와서 다음 `yield return`문을 실행한다. 즉, 하나의 함수가 끝까지 다 실행할 때까지 기다리는 것이 아니라 `yield`를 만나면 잠시 함수 중간에 빠져나와 호출한 곳에 리턴 값을 전달해주고 다시 돌아와 마저 함수를 진행하는 식으로 왔다 갔다 하며 실행되는 것이다!
  - 유니티에서는 `yield return WaitForSeconds(float)` 같은 것을 사용하면 프레임마다 직접 초를 세면서 대기하는 것으로 코딩하는 것보다 훨씬 성능상 유리하다. 
    - 이건 [링크 참고](https://ansohxxn.github.io/unity%20lesson%202/ch11/)


1. 함수의 상태를 저장/복원 하는게 가능
  - 엄청 오래 걸리는 작업을 잠시 끊거나
  - 원하는 타이밍에 함수를 잠시 스탑했다가 복원하려는 경우
2. 리턴은 우리가 원하는 타입으로 가능
  - 심지어 클래스 타입 리턴도 가능



### ✈ yield의 호출 순서

> 코드의 출처는 [서동왕자님 블로그](https://m.blog.naver.com/happybaby56/221322535793) 입니다.

```c#
class Program
{
    static IEnumerable Number()
    {
        int num = 0;

        while (true)
        {
            num++;
            yield return num;

            if (num >= 100)
            {
                yield break;
            }
        }
    }

    static void Main(string[] args)
    {
        foreach (var tmp in Number())
        {
            Console.Write(tmp + " ");
        }
    }
}
```
```
💎출력💎

1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 49 50 51 52 53 54 55 56 57 58 59 60 61 62 63 64 65 66 67 68 69 70 71 72 73 74 75 76 77 78 79 80 81 82 83 84 85 86 87 88 89 90 91 92 93 94 95 96 97 98 99 100 
```

1. *Number()* 호출
2. *Number()* 호출했던 위치에 `yield return`을 통해 `1` 리턴. *Number()* 함수는 이 위치를 기억해놓음.
3. tmp = 1 이 되어 출력 
4. <u>Number()에서 중단되었던 위치로 다시 돌아감</u>
  - 일반 함수와의 차이점임. 일반함수는 그냥 `return` 만나면 끝이고 절대 다시 돌아가는일 따위는 없는데 IEnumerator/IEnumerable 가 리턴타입이며 `yield`를 사용하는 함수는 이게 가능하다! 다시 돌아감.
5. 다시 돌아와서 마저 함수 실행한다. *if (num >= 100)* 실행

이런식으로 쭉쭉 실행하고 `num`이 100을 넘어버리면 `yield break`로 완전히 중단되어 다시 안돌아갈 것이다. `yield break` 없었으면 int 가 표현할 수 있는 최대값인 21억 어쩌구까지 계속 출력됐을 것이다..

<u>계속 이렇게 왔다갔다 하면서 돌아오니까 진짜 열거자를 제공하는 IEnumerable 리턴함수 답다.</u>


<br>


### ✈ yield return 을 만나면 생기는 일

> IEnumerable/IEnumerator 클래스를 컴파일러가 알아서 만들어준다.

```c#
IEnumerable Test()
{
    yield return 1;
    yield return 2;
    yield return 3;
}
```

자동으로 컴파일러가 `IEnumerable`, `IEnumerator` 클래스를 알아서 생성해준다. 인덱스의 초기값은 -1 인 상태에서 시작한다. *MoveNext()*를 통해 다음 yield 구문을 만날 때까지 다음 실행을 한다. 

- *MoveNext()* 가 실행되어 *yield return 1* 이전까지만 실행되고 인덱스 값은 0 이 된다. 이때 *Current*를 읽고 1 을 리턴한다.
- 리턴 후 다시 돌아오면 *MoveNext()* 가 실행되어 *yield return 2;* 이전까지만 실행되고 인덱스 값은 1 이 된다. 이때 *Current*를 읽고 2 을 리턴한다.
- 리턴 후 다시 돌아오면 *MoveNext()* 가 실행되어 *yield return 3;* 이전까지만 실행되고 인덱스 값은 2 이 된다. 이때 *Current*를 읽고 3 을 리턴한다.
- 리턴 후 다시 돌아오니 더 이상 *yield* 가 없어서 *MoveNext()* 가 false를 리턴한다. 그러므로 이제 완전 종료된다.

IEnumerator 혹은 IEnumerable 을 리턴하는 함수안에 `yield return`을 사용하기만 하면, 컴파일러가 알아서 IEnumerable, IEnumerator클래스를 만들어준다. 즉, `IEnumerator`를 상속받고 구현한 클래스를 만들어 줄 필요가 없는 것이다.

```c#
using System;
using System.Collections;

public class MyList
{
    private int[] data = { 1, 2, 3, 4, 5 };
    
    public IEnumerator GetEnumerator()
    {
        int i = 0;
        while (i < data.Length)
        {
            yield return data[i];
            i++;                
        }
    }

    //...
}

class Program
{
    static void Main(string[] args)
    {
        // (1) foreach 사용하여 Iteration
        var list = new MyList();

        foreach (var item in list)  
        {
            Console.WriteLine(item); // 1 2 3 4 5 
        }

        // (2) 수동 Iteration
        IEnumerator it = list.GetEnumerator();
        it.MoveNext();
        Console.WriteLine(it.Current);  // 1
        it.MoveNext();
        Console.WriteLine(it.Current);  // 2
    }
}
```

```c#
public static class GalaxyClass
{
    public static void ShowGalaxies()
    {
        var theGalaxies = new Galaxies();
        foreach (Galaxy theGalaxy in theGalaxies.NextGalaxy)
        {
            Debug.WriteLine(theGalaxy.Name + " " + theGalaxy.MegaLightYears.ToString());
        }
    }

    public class Galaxies
    {

        public System.Collections.Generic.IEnumerable<Galaxy> NextGalaxy
        {
            get
            {
                yield return new Galaxy { Name = "Tadpole", MegaLightYears = 400 };
                yield return new Galaxy { Name = "Pinwheel", MegaLightYears = 25 };
                yield return new Galaxy { Name = "Milky Way", MegaLightYears = 0 };
                yield return new Galaxy { Name = "Andromeda", MegaLightYears = 3 };
            }
        }
    }

    public class Galaxy
    {
        public String Name { get; set; }
        public int MegaLightYears { get; set; }
    }
}
```

<br>

### ✈ yield return 종류 

- `yield return 땡땡`
  - 땡땡에는 `System.Object`를 상속 받는 것이라면 무엇이든간에 다 들어갈 수 있다. 즉 `object` 리턴.
    - 뭐든 리턴할 수 있다는 얘기!.
    - IEnumerator 객체의 `Current`값에 해당 `object` 리턴 값이 대입된다. 
- `yield return null`
  - null을 리턴하므로 마땅히 리턴되는건 없지만 사실상 이 null을 리턴해주고 다시 돌아오는 과정을 거치므로 1프레임 정도 한박자 쉬어주는 셈이다.
- `yield break`
  - 일반 함수의 `return`과 같다. 다시는 돌아가지 않으며 완전히 종료된다. 

<br>

### ✈ yield 를 사용하면 좋은 경우

> 출처 [C# Study](http://www.csharpstudy.com/CSharp/CSharp-yield.aspx)

- 만약 데이타의 양이 커서 모든 데이타를 한꺼번에 리턴하는 것하는 것 보다 조금씩 리턴하는 것이 더 효율적일 경우. 
  - 예를 들어, 어떤 검색에서 1만 개의 자료가 존재하는데, UI에서 10개씩만 On Demand로 표시해 주는게 좋을 수도 있다. 즉, 사용자가 20개를 원할 지, 1000개를 원할 지 모르기 때문에, 일종의 지연 실행(Lazy Operation)을 수행하는 것이 나을 수 있다.
- 어떤 메서드가 무제한의 데이타를 리턴할 경우. 
  - 예를 들어, 랜덤 숫자를 무제한 계속 리턴하는 함수는 결국 전체 리스트를 리턴할 수 없기 때문에 yield 를 사용해서 구현하게 된다.
- 모든 데이타를 미리 계산하면 속도가 느려서 그때 그때 On Demand로 처리하는 것이 좋은 경우. 
  - 예를 들어 소수(Prime Number)를 계속 리턴하는 함수의 경우, 소수 전체를 구하면 (물론 무제한의 데이타를 리턴하는 경우이기도 하지만) 시간상 많은 계산 시간이 소요되므로 다음 소수만 리턴하는 함수를 만들어 소요 시간을 분산하는 지연 계산(Lazy Calculation)을 구현할 수 있다.

<br>

### ✈ yield 와 예외

- `yield return`문은 try-catch 문 안에서 쓸 수 없다. 
- `yield break`문은 try-catch 문 안에선 쓸 수 있지만 finally 에선 쓸 수 없다.

<br>

## 💛 Reference

- Microsoft 문서 (코드 참고)
  - [IEnumerator](https://docs.microsoft.com/ko-kr/dotnet/api/system.collections.ienumerator?redirectedfrom=MSDN&view=net-5.0)
  - [IEnumerable](https://docs.microsoft.com/ko-kr/dotnet/api/system.collections.ienumerable?view=net-5.0)
  - [yield](https://docs.microsoft.com/ko-kr/dotnet/csharp/language-reference/keywords/yield)
- [C# Study](http://www.csharpstudy.com/CSharp/CSharp-yield.aspx)
- [서동왕자님 블로그](https://m.blog.naver.com/happybaby56/221322535793)
- [박정수님 피피티](https://www.slideshare.net/jungsoopark104/ienumerator)

***
<br>

    🌜 개인 공부 기록용 블로그입니다. 오류나 틀린 부분이 있을 경우 
    언제든지 댓글 혹은 메일로 지적해주시면 감사하겠습니다! 😄

[맨 위로 이동하기](#){: .btn .btn--primary }{: .align-right}