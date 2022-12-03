---
title:  "Unity C# > Attributes" 

categories:
  -  UnityDocs
tags:
  - [Game Engine, Unity]

toc: true
toc_sticky: true

date: 2021-01-17
last_modified_at: 2021-01-17
---

공부하면서 알게된 것만 정리합니다.😀
{: .notice--warning}

## 🚀 [SerializeField]


```c#
[SerializeField] private GameObject gameoverUI;
```

- private 이지만 `[SerializeField]`이 붙으면 <u>private 하더라도 유니티 엔진의 Inspector 창에서 슬롯이 열려</u> 이를 수정할 수 있다.
  - 유니티 Inpector 창에서 이제 보고 직접 값도 할당할 수 있지만 private 보호 수준은 유지 된다.
- 📢 그러나 [SerializeField] 넣는다고 무조건 인스펙터 창에 뜨는건 아니다. 예외도 있다. 

<br>

## 🚀 [Range]

```c#
[Range(0.0f, 12.0f)] public float Size = 12.0f;
```

- 유니티 엔진의 Inspector 창에서 해당 최소값 ~ 최대값을 범위로 가지는 <u>슬라이더 슬롯</u>이 열린다.

<br>

## 🚀 [HideInInspector]

- public 이어도 유니티 엔진의 Inspector 창에선 해당 멤버 변수가 보이지 않게 된다. 슬롯이 열리지 않음.

<br>

## 🚀 [RequireComponent(typeof(컴포넌트 이름))]

해당 컴포넌트를 이 스크립트가 붙어 있는 오브젝트에 자동으로 붙여준다.

```c#
[RequireComponent(typeof(GunController))]       // 자동으로 이 스크립트가 활성화되면 📜GunController.cs 가 이 스크립트가 붙어있는 오브젝트에 붙게 된다. 실수 방지(📜GunController.cs가 필요하다고 강제함)
```

<br>

## 🚀 [System.Serializable] 🌼직렬화🌼

```c#
[System.Serializable]
public class Test
{
  public int x;
  public int y;
}

public class Gun : MonoBehaviour
{
  [SerializeField] private Test test;
}
```

MonoBehaviour을 상속 받지 않는 <u>일반 C# 클래스의 멤버들</u>을 유니티의 Inspector 슬롯으로 띄우고 싶다면 해당 클래스에 `[System.Serializable]`을 붙여주면 된다. 다른 클래스에서 이 클래스를 참조할 때 private 멤버로 참조함다면 `[SerializeField]`도 함께 붙여주어야 한다.

```c#
[System.Serializable]
public class Test
{
  public int x;
  public int y;
}

public class Gun : MonoBehaviour
{
  private Test test = new Test();
  text.x = 2;
  text.y = 3;
}
```

혹은 유니티 에디터상에서 멤버 변수 값을 지정해주고 인스턴스를 만들 필요 없이 이렇게 바로 인스턴스를 만들어줄 수도 있다.


> **직렬화** 유니티 공식문서 참고 <https://docs.unity3d.com/kr/530/Manual/script-Serialization.html>

- 이렇게 직렬화를 하면 데이터들을 **<u>일렬로 나열된 한 줄의 바이너리 스트림 형태로 파일에 저장</u>**이 되기 때문에, 저장 장치로부터 읽고 쓰기가 쉬워진다.
  - `[System.Serializable]`을 클래스에 붙여 객체를 저장하면 모든 인스턴스 멤버 변수들의 값을 일렬로 직렬화해 파일로 저장한겠다는 의미다.
  - 객체가 아무리 복잡해도 이렇게 객체들을 바이너리 형태로 직렬화해 저장하게 되면 파일 또는 네트워크로 스트림 통신이 가능해진다는 것이다.
  - Json 포맷으로 저장할 수 있게 된다. 

### ✈ 직렬화가 가능하려면

![image](https://user-images.githubusercontent.com/42318591/102185769-eaf81000-3ef4-11eb-9f80-9d9f1514049f.png)

직렬화가 안되는 데이터 타입도 있다.

### ✈ 직렬화가 안되는 타입

![image](https://user-images.githubusercontent.com/42318591/102185856-0fec8300-3ef5-11eb-948a-b71c9d10c8fb.png)

위와 같은 데이터 타입이 아니라면 직렬화 할 수 없다. 인벤토리 슬롯과 퀵슬롯들 정보도 저장할 것이기 때문에 **Slot** 타입의 객체를 저장하는 것도 필요한데, 이런 `[Serializable]`가 아닌 사용자 정의 타입 객체인 **Slot** 타입의 객체는 이 SaveData 클래스의 멤버 변수가 될 수 없다. Slot 클래스는 `[Serializable]`가 아니라서 직렬화로 저장될 수가 없어서! 따라서 List 로 따로 저장했다. 배열이나 `List<T>`도 직렬화가 가능하다. 단, 다차원 배열, 가변 배열 등의 중첩 타입의 컨테이너는 직렬화를 할 수 없다.

***
<br>

    🌜 개인 공부 기록용 블로그입니다. 오류나 틀린 부분이 있을 경우 
    언제든지 댓글 혹은 메일로 지적해주시면 감사하겠습니다! 😄

[맨 위로 이동하기](#){: .btn .btn--primary }{: .align-right}