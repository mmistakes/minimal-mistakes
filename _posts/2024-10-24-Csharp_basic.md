---
layout: single
title: "C# 기본 문법"
categories: Csharp
tags: [Csharp]
---

### 1. value type 과 reference type

- value type
  - 기본 데이터형
  - struct
  - enum
- reference type
  - class
  - array
  - string

### 2. 콘솔 입력

```csharp
ConsoleKeyInfo keyInfo;
do {
    keyInfo = Console.ReadKey(true);
    if(keyInfo.KeyChar == 'A')
        Console.WriteLine("A키임");
} while (ConsoleKey.Escape != keyInfo.Key);
Console.WriteLine();

ConsoleKeyInfo keyinfo;
int kor;
Console.Write("국어점수를 입력해주세요 : ");
kor = Convert.ToInt32(Console.ReadLine());
Console.WriteLine("국어점수는 {0}입니다", kor);
```

### 3. 데이터형과 nullable데이터형

```csharp
int a = null;
Console.WriteLine("{0}", a.GetType());

int? a = null;
Console.WriteLine("{0}", a.HasValue);
```

### 4. struct 와 class

- 메서드 위에서 f1을 누르면 msdn으로 이동

```csharp
public struct MyStruct {
    public int age;
}

public class MyClass {
    public int age;
}

MyStruct test;
test.age = 5;
Console.WriteLine("{0}", test.age);

MyClass c = new MyClass();
Console.WriteLine("{0}", c.age);
```

### 5. boxing 과 unboxing

```csharp
//boxing : 값 타입(int, struct)을 참조 타입으로 변환
int n = 5;
object obj = n;

//unboxing : 참조 타입을 값 타입으로 변환
int t = (int)obj;
Console.WriteLine(t);
```

### 6. is 연산자

- 캐스팅이 가능한지 bool 타입으로 리턴

```csharp
int n = 6;
if (n is float)
    Console.WriteLine("형식 호환 됨");
else
    Console.WriteLine("형식 호환 안됨");
  
int? a = 5;
if (a is null)
    Console.WriteLine("a is null");
else
    Console.WriteLine($"a is {a}");
```

### 7. as 연산자

- 형변환(cast연산자와 같음), 실패시 null 리턴, 참조타입만 사용가능

```csharp
string s = "123";
object obj = s;
string ret = obj as string;
Console.WriteLine(ret);
```

### 8. ?? null 병합 연산자

- 앞의 변수가 null이면 뒤의 값 대입

```csharp
int? a = null;
int b = a ?? -1;
Console.WriteLine(b);
```

### 9. null 조건부 연산자

- null 이면 null 반환
- short circuit evaluation

```csharp
int[] a = null;
Console.WriteLine(a?[0]);

MyClass c = null;
Console.WriteLine(c?.age);
```

### 10. exception

```csharp
ArrayList ar = new ArrayList();
try
{
    ar.Add(1);
    ar.Add(2);
    ar[3] = 10;
}
catch (Exception e)
{
    Console.WriteLine("Exception 발생");
    Console.WriteLine(e.ToString());
}

foreach (var item in ar)
    Console.Write($"{item} ");
Console.WriteLine();
```

### 11. Array

```csharp
static int[] MakeArray1(int len)
{
    int[] ret = new int[len];
    int val = 0;
    for (int i = 0; i < len; ++i)
        ret[i] = ++val;
    return ret;
}

static int[,] MakeArray2(int row, int col)
{
    int[,] ret = new int[row,col];
    int val = 0;
    for (int i = 0; i < row; ++i)
        for (int j = 0; j < col; ++j)
            ret[i,j] = ++val;
    return ret;
}

int[] ar1 = MakeArray1(5);
foreach (int val in ar1)
    Console.Write($"{val} ");
Console.WriteLine();

int[,] ar2 = MakeArray2(5, 4);
for (int i = 0; i < ar2.GetLength(0); ++i)
{
    for (int j = 0; j < ar2.GetLength(1++j); ++j)
        Console.Write($"{ar2[i, j]} ");
    Console.WriteLine();
}

Array.Clear(ar1, 2, ar1.Length - 2);

int[] cloneAr1 = (int[])ar1.Clone();
```

### 12. 자원 관리

- 일반적인 타입 : garbage collecter에 의해 자동으로 관리
- 파일, 네트워크, 데이터베이스 등 : Dispose() 메서드를 호출해서 명시적으로 자원을 해지해야 함

```csharp
FileStream fs = new FileStream("./test.txt", FileMode.Create);
fs.Close(); // Close()에서 Dispose() 호출
```

- using 구문으로 Close() 생략 가능

```csharp
using (FileStream fs = new FileStream("./test.txt", FileMode.Create))
{
    // 이 블럭을 벗어나면 자동으로 Dispose() 호출
}
```

### 13. 파일 입출력

- 파일에 쓰기

```csharp
int val = 12;
float pi = 3.14f;
string s = "hellow world!!";
using (StreamWriter sw = new StreamWriter("test.txt"))
{
    sw.WriteLine(val);
    sw.WriteLine(pi);
    sw.WriteLine(s);
}
```

- 파일에서 읽기

```csharp
using (StreamReader sr = new StreamReader("test.txt"))
{
    int val = int.Parse(sr.ReadLine());
    float pi = float.Parse(sr.ReadLine());
    string str = sr.ReadLine();
    Console.WriteLine($"{val}, {pi}, {str}");
}
```

### 14. Serialize 와 NonSerialize

- NonSerialized 속성을 사용하면 직렬화 대상에서 제외

```csharp
[Serializable]
struct Data
{
    public int a;
    public float b;

    [NonSerialized]
    public string c;

    public Data(int a, float b, string c)
    {
        this.a = a;
        this.b = b;
        this.c = c;
    }
}

List<Data> dataList = new List<Data>
{
    new Data(7, 3.14f, "test1"),
    new Data(12, 0.5f, "test2")
}

using (FileStream fs = new FileStream("test.dat", FileMode.Create))
{
    BinaryFormatter bf = new BinaryFormatter();
    bf.Serialize(fs, dataList);
}

List<Data> resData;
using (FileStream fs = new FileStream("test.dat", FileMode.Open))
{
    BinaryFormatter bf = new BinaryFormatter();
    resData = (List<Data>)bf.Deserialize(fs);
}

foreach (var item in resData)
    Console.WriteLine($"{item.a}, {item.b}");
```

### 15. List 와 ArrayList

- List : 단일 데이터형만 쓸 수 있다.
- ArrayList : 다양한 데이터형을 쓸 수 있지만 그만큼 성능이 느리다. 그래서 거의 안 씀.
