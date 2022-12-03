---
title:  "[C#] extension 확장 메서드" 

categories:
  -  C Sharp
tags:
  - [Programming, C Sharp]

toc: true
toc_sticky: true

date: 2021-01-01
last_modified_at: 2021-01-01
---

<br>

## 🚀 Extension 확장 메서드

> 특수한 종류의 `static` 메서드인데, 마치 다른 클래스의 메서드인 것 처럼 호출해 사용할 수 있다.

- 확장 메서드는 `static` 클래스 안에 `static` 메서드로 정의한다.
- 확장 메서드의 첫 번째 매개 변수가 바로 그 다른 클래스의 메서드인 것처럼 호출할 수 있는 그 호출의 주체로 정의한다. 
  - 첫 번째 매개변수 앞에 `this`를 써준다. 

<br>

### ✈ 예시 1

```c#
public static class Extension
{
  // 확장 메서드
	public static T GetOrAddComponent<T>(this GameObject go) where T : UnityEngine.Component 
	{
		return Util.GetOrAddComponent<T>(go);
	}

  // 확장메서드
	public static void BindEvent(this GameObject go, Action<PointerEventData> action, Define.UIEvent type = Define.UIEvent.Click) 
	{
		UI_Base.BindEvent(go, action, type);
	}
}
```

- Extension 클래스가 `"staic" class Extension`인 것과 함수들이 `static`인 것에 주목! 👉 확장 메서드
  - 클래스는 Monobehavior 상속 X 
- *GetOrAddComponent* 
  - 매개 변수가 없는 함수다! 
  - `GameObject` 파라미터에서 호출할 수 있게 되었다. 마치 `GameObject`의 메서드인 것처럼 사용할 수 있게 됨.
    - `this GameObject go`
- *GetOrAddComponent* 
  - 매개 변수가 action, Define 2 개인 함수다!
  - `GameObject` 파라미터에서 호출할 수 있게 되었다. 마치 `GameObject`의 메서드인 것처럼 사용할 수 있게 됨.
    - `this GameObject go`

```c#
GetButton((int)Buttons.PointButton).gameObject.BindEvent(OnButtonClicked);
```

바로 *GetButton* 함수로 부터 리턴받은 버튼 오브젝트에서 바~~~로 `BindEvent(OnButtonClicked)` 이렇게 함수를 호출할 수 있게 되었다. 마치 GameObject 에 원래 있던 메서드를 호출하는 것처럼 호출할 수 있게 된 것이다. 

<br>

### ✈ 예시 2

```c#
namespace ExtensionMethods
{
    public static class MyExtensions
    {
        public static int WordCount(this String str)
        {
            return str.Split(new char[] { ' ', '.', '?' },
                             StringSplitOptions.RemoveEmptyEntries).Length;
        }
    }
}
```

확장메서드 *WordCount*는 마치 `String`의 메서드인 것처럼 사용할 수 있게 된다. 매개 변수는 없는 함수다.

```c#
string s = "Hello Extension Methods";
int i = s.WordCount();
```

이렇게 사용할 수 있게 되었음. `string` 인스턴스에서 바로 호출할 수 있게 되었다. C# 의 특별한 문법!!

[코드 출처 : Microsoft Docs](https://docs.microsoft.com/ko-kr/dotnet/csharp/programming-guide/classes-and-structs/extension-methods)

***
<br>

    🌜 개인 공부 기록용 블로그입니다. 오류나 틀린 부분이 있을 경우 
    언제든지 댓글 혹은 메일로 지적해주시면 감사하겠습니다! 😄

[맨 위로 이동하기](#){: .btn .btn--primary }{: .align-right}