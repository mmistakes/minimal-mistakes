---
title:  "[C#] 인터페이스의 암묵적, 명시적 구현" 

categories:
  -  C Sharp
tags:
  - [Programming, C Sharp]

toc: true
toc_sticky: true

date: 2021-01-09
last_modified_at: 2021-01-09
---


## 🚀 암묵적 구현

![image](https://user-images.githubusercontent.com/42318591/104096032-7343b800-52dd-11eb-8ebb-d1b7def62371.png)

> `public`으로 구현하는 방식

```c#
public class Person : IAct, IRun {

    public void Act()  // 💛암묵적 구현
    {
        Console.WriteLine("A");
    }
}
```

암묵적 구현은 `public`이므로 외부에서 객체를 통해 호출이 가능하다.

<br>

## 🚀 명시적 구현

![image](https://user-images.githubusercontent.com/42318591/104095955-0af4d680-52dd-11eb-8e69-489806a34b01.png)

> `private`으로 구현하며 `[인터페이스이름.함수명]` 형식으로 함수 이름을 표시하는 방식

```c#
public class Person : IAct, IRun {

    void IAct.Act() // 💎명시적 구현
    {
        Console.WriteLine("B");
    }

    void IRun.Act() // 💎명시적 구현
    {
        Console.WriteLine("C");
    }
}
```  

명시적 구현은 `private`하기 떄문에 외부에서 객체를 통해 호출할 수 없다. <u>하지만 객체를 인터페이스 타입으로 업캐스팅하면 호출할 수 있다.</u>

<br>

## 🚀 둘의 차이

### ✈ 예제 1

```c#
public interface IAction
{
    void Act();
    void React();
}

public class Person : IAction
{
    public void Act() // 💛암묵적 구현
    {            
    }

    void IAction.React() // 💎명시적 구현
    {         
    }
}
```
```c#
public class App
{
    public void Run()
    {
        Person p = new Person();
        p.Act();
        p.React(); // ❌컴파일 에러

        // 인터페이스 통한 접근
        IAction itf = p;
        itf.Act();    // OK
        itf.React(); // OK

        // 인터페이스 캐스팅
        ((IAction)p).React(); // OK
    }
}
```

- 명시적으로 구현한 *React()*의 경우
  - `private`하기 때문에 Person 객체인 `p`로 호출이 불가능하다. 
  - ✨그러나! *IAction itf = p* `p`를 `IAction` 인터페이스로 업캐스팅한 경우에는 `((IAction)p).React()` 이렇게 호출이 가능해진다!


<br>


### ✈ 예제 2

```c#
public interface IAct {
    void Act();
}

public interface IRun {
    void Act();
}

public class Person : IAct, IRun {
    public void Act()  // 💛암묵적 구현
    {
        Console.WriteLine("A");
    }

    void IAct.Act() // 💎명시적 구현
    {
        Console.WriteLine("B");
    }

    void IRun.Act() // 💎명시적 구현
    {
        Console.WriteLine("C");
    }
}
```
```c#
class Program
{
    static void Main(string[] args)
    {
        Person p = new Person();
        p.Act();             // A
        ((IAct)p).Act();   // B
        ((IRun)p).Act();  // C
    }
}
```

- **경우에 따라 반드시 명시적 인터페이스명을 써야하는 경우도 있다.**
  - 위와 같이 *Act()* 함수가 2 개의 동일한 함수 명을 가진다. 이때 `public void Act()`와 `void IAct.Act()`는 이름은 동일하나 오버로딩 되듯이 다른 함수로 구현된 것이나 마찬가지다. 둘 다 마찬가지로 IAct 인터페이스의 Act()를 오버라이딩 한 것이다.
- 클래스가 인터페이스를 구현하더라도 인터페이스의 모든 메서드들을 public으로 노출할 필요가 없는 경우에 유용할 수 있다.


<br>

## 💛 출처

- [C# Study](https://www.csharpstudy.com/DevNote/Article/4)
- [인터페이스 멤버를 명시적으로 구현하는 방법 : Microsoft 문서](https://docs.microsoft.com/ko-kr/dotnet/csharp/programming-guide/interfaces/how-to-explicitly-implement-interface-members)

***
<br>

    🌜 개인 공부 기록용 블로그입니다. 오류나 틀린 부분이 있을 경우 
    언제든지 댓글 혹은 메일로 지적해주시면 감사하겠습니다! 😄

[맨 위로 이동하기](#){: .btn .btn--primary }{: .align-right}