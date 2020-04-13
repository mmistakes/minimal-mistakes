---
title:  "C# Basics - Null Coalescing (??) Operator" 
categories: dev 
description: Null Coalescing Operator ?? in C#
tag: 
  - csharp
--- 

The `??` operator is called `null-coalescing operator`.  

This operator is used to provide a default value if the value of the operand on the left-hand side of the operator is `null`.

The usage is as follows: `var variable = operand ?? default value;`  

``` csharp

class Program
{
    public int Value { get; set; }

    public Program(int value)
    {
        Value = value;
    }

    static void Main(string[] args)
    {
        string input = GetName();

        string name = input ?? "Alen Alex";

        string inputAddress = GetAddress();

        string address = inputAddress ?? "NA";

        Program p1 = GetProgram();

        Program p2 = p1 ?? new Program(10);

        Console.WriteLine(name);

        Console.WriteLine(address);

        Console.WriteLine(p2.Value);
    }

    private static string GetAddress()
    {
        return "<<Proper Address>>";
    }

    private static Program GetProgram()
    {
        return null;
    }

    private static string GetName()
    {
        return null;
    }
}
```

The output of this would be:

```
Alen Alex
<<Proper Address>>
10
```

Reference: [Microsoft Docs](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/operators/null-coalescing-operator)