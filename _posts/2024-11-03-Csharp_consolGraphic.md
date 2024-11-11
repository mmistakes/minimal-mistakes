---
layout: single
title: "C# Console Graphic"
categories: Csharp
tags: [Csharp]
---

### 1. 간단한 예제

```csharp
static void Main(string[] args)
{
    if (args is null)
    {
        throw new ArgumentNullException(nameof(args));
    }

    Console.SetWindowSize(100, 40);
    Random rand = new Random();
    ConsoleColor[] color = { ConsoleColor.Blue, ConsoleColor.Cyan,
                                ConsoleColor.Red, ConsoleColorGreen,
                                ConsoleColor.Yellow,ConsoleColorWhite };
    while (true)
    {
        Console.Clear();
        for (int i = 0; i < 30; i++)
        {
            Console.ForegroundColor = color[rand.Next(colorLength)];
            Console.SetCursorPosition(rand.Next(100), rand.Next(40));
            Console.Write("hellow world!!");
        }
        Thread.Sleep(200);
    }
}
```

### 2. 미니 프로젝트

- 스마트 밥솥은 일단 스킵
