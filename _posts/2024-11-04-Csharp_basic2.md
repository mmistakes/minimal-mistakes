---
layout: single
title: "C# 기본 문법 2"
categories: Csharp
tags: [Csharp]
---

### 1. 접근한정자

- public
  - 해당 멤버는 모든 코드에서 접근할 수 있음. 제약이 없음.
- private
  - 해당 멤버는 선언된 클래스 내에서만 접근할 수 있음
  - 멤버에 안쓰면 private
- protected
  - 해당 멤버는 선언된 클래스와 그 클래스를 상속받은 하위 클래스에서 접근할 수 있음
- internal
  - 해당 멤버는 같은 어셈블리(즉, 같은 프로젝트) 내에서만 접근할 수 있음
  - 클래스에 안쓰면 internal
- protected internal
  - 동일 어셈블리 내에서 자유롭게 접근 가능
  - 그리고 다른 어셈블리지만 상속된 하위 클래스라면 접근 가능
- private protected
  - C# 7.2에서 추가된 접근 제한자로, 해당 멤버는 같은 클래스 내에서만, 또는 같은 어셈블리 내에서 상속받은 하위 클래스에서만 접근할 수 있습니다.

### 2. 생성자와 소멸자

```csharp
class MyClass
{
    string msg;
  
    // 기본 생성자
    public MyClass() {
        msg = "기본 생성자 호출";
    }

    public MyClass(string msg) {
        this.msg = msg;
    }

    // 소멸자
    ~MyClass() {
        Console.WriteLine("destroyed " + msg);
    }

    public void showMsg() {
        Console.WriteLine(msg);
    }
}

MyClass a = new MyClass();
a.showMsg()

MyClass b = new MyClass("b class");
b.showMsg();
```

### 3. 객체의 레퍼런스

```csharp
MyClass a = new MyClass();
MyClass b = a;
```

### 4. class property (getter, setter)

```csharp
class MyClass
{
    int number;
    string name;

    public int Number {
        get { return number; }
        set { number = value; }
    }

    // Auto-Implemented Properties
    public string Name { get; set; } = "ilyoung"; 
}
```

### 5. indexer

```csharp
public class SampleCollection<T>
{
    private T[] arr = new T[100];

    public T this[int i] {
        get { return arr[i]; }
        set { arr[i] = value; }
    }
}

SampleCollection<string> collection = new SampleCollection<string>();
collection[0] = "Hello, World!";
Console.WriteLine(collection[0]);
```

### 6. 배열

- 고정 배열

```csharp
int[] arr = new int[3] {1,2,3};
int[] arr = new int[] {1,2,3};
int[] arr = {1,2,3};

//find web
```

- 가변 배열

```csharp
int[][] arr = new int[2][];
arr[0] = new int[2] {1,2};
arr[1] = new int[3] {4,5,6};

int[][] arr = new int[][] {
    new int[] {1,2},
    new int[] {4,5,6}
};
arr[1][2] = 1;
```

### 7. delegate

- delegate는 일종의 참조 타입으로, 특정 메서드를 가리킬 수 있는 "메서드 포인터" 역할을 합니다.

```csharp
delegate void MyDelegate(string msg);;

class Program
{
    static void PrintA(string msg) {
        Console.WriteLine("A : " + msg);
    }

    static void PrintB(string msg) {
        Console.WriteLine("B : " + msg);
    }

    static void Main()
    {
        MyDelegate fn = PrintA;
        fn += PrintB;
        fn("Hello, World!");
    
        fn -= PrintA;
        fn("Hello, World!");
    }
}
```

### 8. event

- 이벤트는 특정 동작이나 상태 변화가 발생했을 때 이를 알리기 위해 사용됨
- 이벤트는 델리게이트를 기반으로 하며, 주로 사용자 인터페이스(UI)나 시스템의 상태 변화를 처리하는 데 사용
- 이벤트의 기본 구조:
  - 이벤트 선언: 이벤트를 선언하여 외부에서 접근할 수 있게 함
  - 이벤트 발생: 이벤트가 발생하면, 이를 구독하고 있는 메서드를 호출
  - 이벤트 처리기: 이벤트가 발생했을 때 실행될 메서드를 정의

```csharp
public class Publisher
{
    // 이벤트 선언
    public event EventHandler MyEvent;  
    
    public void DoSomething() {
        // 이벤트 발생
        OnMyEvent(EventArgs.Empty);
    }

    protected virtual void OnMyEvent(EventArgs e) {
        MyEvent?.Invoke(this, e);
    }
}

public class Subscriber
{
    public void HandleMyEvent(object sender, EventArgs e) {
        Console.WriteLine("Event handled.");
    }
}

public class Program
{
    public static void Main()
    {
        Publisher pub = new Publisher();
        Subscriber sub = new Subscriber();
        // 이벤트 구독
        pub.MyEvent += sub.HandleMyEvent;
        // 이벤트 발생
        pub.DoSomething();
    }
}
```

- 설명
  - 이벤트 선언: Publisher 클래스는 EventHandler 델리게이트를 사용하여 MyEvent 이벤트를 선언
  - 이벤트 발생: OnMyEvent 메서드는 MyEvent 이벤트를 발생시키고, 이벤트가 발생했을 때 구독된 모든 메서드를 호출
  - 이벤트 처리기: Subscriber 클래스는 HandleMyEvent 메서드를 정의하고, 이 메서드는 이벤트가 발생했을 때 실행
  - 이벤트 구독: pub.MyEvent += sub.HandleMyEvent;를 통해 Subscriber의 이벤트 처리기를 이벤트에 구독

### 9. inheritance

- 생성자 호출 순서 : 부모 생성자 -> 자식 생성자
- 소멸자 호출 순서 : 자식 소멸자 -> 부모 소멸자ㅇ
- sealed : 상속 불가 (클래스 전체 or 메서드)

```csharp
sealed class A {
    ...
}

class A {
    sealed public void method() {
    }
}
```

- base : 부모 클래스의 this

```csharp
class A
{
    readonly int number;
    protected string name = "AName";

    public A(int number) {
        this.number = number;
    }
    public void PrintA() {
        Console.WriteLine(this.number);
    }
}

class B : A
{
    new readonly string name = "BName";
    public B(int number) : base(number) {
    }
    public void PrintB() {
        Console.WriteLine($"{base.name} , {this.name}");
    }
}
```

- 위 코드에서 new 키워드는 기본 클래스에서 상속된 멤버를 숨기고, 파생 클래스에서 해당 멤버를 새로 정의할 때 사용

### 10. virtual 과 override

- 메서드나 속성을 파생 클래스에서 재정의할 수 있도록 만드는 데 사용
- virtual 메서드나 속성을 재정의하지 않아도 됨
- 재정의하려면 override 키워드를 사용

```csharp
class A
{
    public virtual void Print() {
        Console.WriteLine("A");
    }
}

class B : A
{
    public override void Print() {
        Console.WriteLine("B");
    }
}

B b = new B();
b.Print();
A a = b;
a.Print();
```

### 11. abstract

- 하나 이상의 추상 메서드(구현이 없는 메서드)를 포함하는 클래스
- 추상 클래스는 인스턴스를 생성할 수 없음
- 이를 상속받은 파생 클래스에서 추상 메서드를 반드시 구현해야 함

```csharp
abstract class A
{
    int number = 3;
    public abstract void Print();
    public void PrintNumber() {
        Console.WriteLine(this.number);
    }
}

class B : A
{
    public override void Print() {
        Console.WriteLine("B");
    }
}

B b = new B();
b.Print();
b.PrintNumber();
```

### 12. boxing 과 unboxing

- 값 형식(int, struct)을 참조 형식으로 변환하는 과정을 박싱(boxing)이라고 하고
- 그 반대의 과정을 언박싱(unboxing)이라고 함

```csharp
int n = 3;          // 스택에 메모리가 할당
object obj = n;     // 힙에 메모리가 할당되고 obj는 힙에 있는 값을 참조

int val = (int)obj; // 힙에 있는 값을 스택에 넣음
```

### 13. upcasting 과 downcasting (참조 변환)

- 최상위 클래스 object는 상속관계에 있으므로 참조 변환이 가능

```csharp
B b = new B();
object obj = b;
A a = (A)obj;
```

### 14. object 클래스

- 모든 데이터 타입의 기본 클래스(Base class)로 .NET 타입 시스템의 루트 타입
- System.Object라는 클래스는 C#의 모든 타입이 직접 또는 간접적으로 상속받는 클래스이기 때문에
- 모든 타입은 기본적으로 object의 멤버를 상속받음
- 주요 기능과 멤버
  - Equals(object obj): 두 객체가 같은지 비교
  - GetHashCode(): 객체의 해시 코드를 반환
  - ToString(): 객체를 문자열 표현을 반환
  - GetType(): 객체의 런타임 타입 정보를 제공

```csharp
public class Example
{
    public static void Main()
    {
        object obj1 = 42;             // 박싱된 int
        object obj2 = "Hello World";  // string은 기본적으로 참조 타입
        object obj3 = new Example();  // 사용자 정의 클래스의 객체

        Console.WriteLine(obj1);      // "42"
        Console.WriteLine(obj2);      // "Hello World"
        Console.WriteLine(obj3);      // "Example"의 기본 ToString() 출력

        // Equals 사용 예제
        Console.WriteLine(obj1.Equals(42)); // True

        // GetType 사용 예제
        Console.WriteLine(obj1.GetType());  // System.Int32
        Console.WriteLine(obj2.GetType());  // System.String
        Console.WriteLine(obj3.GetType());  // Example
    }

    public override string ToString() {
        return "This is an Example object";
    }
}
```

### 15. interface

- 구현없이 형식만 정의 (기능의 추상화)
- 다중 상속 가능
- 모든 멤버는 public, abstract
- 이벤트, 인덱서, 속성, 메서드 등 모든 멤버 포함 가능

```csharp
public interface IPrintable
{
    string Msg { get; set; }
    void Print();
}

public class A : IPrintable
{
    public string Msg { get; set; }

    public void Print() {
        Console.WriteLine(this.Msg);
    }
}

public class Program
{
    public static void Main()
    {
        IPrintable a = new A { Msg = "Buddy" };
        a.Print();
    }
}
```
