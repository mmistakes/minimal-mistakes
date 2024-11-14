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

int[,] arr = new int[,] {{1,2,3},{4,5,6}};
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
