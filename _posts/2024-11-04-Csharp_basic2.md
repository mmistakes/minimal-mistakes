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
