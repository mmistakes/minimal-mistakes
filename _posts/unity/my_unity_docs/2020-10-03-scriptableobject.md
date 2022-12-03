---
title:  "Unity C# > ScriptableObject" 

categories:
  -  UnityDocs
tags:
  - [Game Engine, Unity]

toc: true
toc_sticky: true

date: 2020-10-03
last_modified_at: 2020-10-03
---

- 유니티 공식 매뉴얼 <https://docs.unity3d.com/kr/current/Manual/UnityManual.html>
- Scripting Overview <http://www.devkorea.co.kr/reference/Documentation/ScriptReference/index.html>

> ScriptableObject 공식 문서 👉 <https://docs.unity3d.com/kr/2018.4/Manual/class-ScriptableObject.html>


## ScriptableObject

> 데이터들을 저장하는데 사용할 수 있는 데이터 컨테이너 <u>에셋</u>

![image](https://user-images.githubusercontent.com/42318591/94980300-5face680-0563-11eb-86c9-d16526950ba0.png)

각각의 좀비 오브젝트들은 체력, 시야, 속도 값이 모두 같다고 가정해보자. 좀비 프리팹으로 좀비 오브젝트 3개를 찍어내면 동일한 이 체력, 시야, 속도 값이 3 개나 사본으로 생성되는 셈이다. 어차피 동일한 데이터를 사용하니까 체력, 시야, 속도 값을 한군데 만들어두고 이를 인스턴스들이 이를 참조하게 만들면 메모리를 더 아낄 수 있다.

![image](https://user-images.githubusercontent.com/42318591/94980303-62a7d700-0563-11eb-9f7d-65a788617dc9.png)

모든 좀비들이 가지는 동일한 데이터들을 `ScriptableObject` 로서 한 군데에 에셋으로서 모아 관리하고 생성되는 오브젝트들이 이 동일한 에셋을 <u>참조</u>하면 메모리를 효율적으로 쓸 수 있게 된다. 예를 들어 `ScriptableObject` 을 상속 받는 `ZombieData` 클래스를 만들고 이 곳에 좀비가 가지는 데이터들을 모아 두고 이를 에셋으로 생성하여서 좀비 오브젝트들이 이 곳을 참조하게 하면 된다!
 
- 메모리 사용을 줄인다. 👉 여러 사본들이 생성되는 것을 방지
  - 이 `ScriptableObject`을 참조하게 된다.
- `MonoBehavior` 대신 `ScriptableObject`를 상속 받는다면
  - 다른 스크립트와 달리 <u>오브젝트에 컴포넌트로서 붙일 수 없다.⭐</u> `MonoBehavior`를 상속 받지 못 했으니까!
  - 이벤트는 OnEnable, OnDisable, OnDestroy 만 받을 수 있다.
  - <u>
- 스크립트는 아닌 <u>에셋</u>이다. 어떤 고유한 파일로서.
  - `클래스이름.CreateInstance` 와 `클래스이름.CreateAsset` 으로, 이 클래스의 인스턴스를 만들고 이를 하나의 에셋으로서 생성할 수 있다.
  - 그냥 스크립트나 폴더 추가하듯이 `[CreateAssetMenu]`로 에셋 생성 메뉴에 쉽게 추가할 수 있도록 할 수도 있다.
    ```c#
    [CreateAssetMenu](filename, menuName, order)
    // filename 이 에셋을 생성하게 되면 기본적으로 지어질 이름
    // menuName 유니티 에셋-우클-Create- 메뉴에 보일 이름
    // order 메뉴에 보일 순서 (기본적으론 첫 번째)
    ```


```c#
[CreateAssetMenu(fileName = "New Item", menuName = "New Item/item")]
public class Item : ScriptableObject  
{

}
```

- `Item` 클래스는 *ScriptableObject* 를 상속받는다.
  - 다른 스크립트와 달리 오브젝트에 컴포넌트로서 붙일 수가 없다.
  - 아이템들이 가지는 기본적인 데이터들을 관리한다.
  - 에셋으로서 만들어 둘 수 있다.

![image](https://user-images.githubusercontent.com/42318591/94980617-478a9680-0566-11eb-81d0-e03d22dd7269.png)

에셋에서 우클 - Create 에 `New Item/item`이 생긴 것을 볼 수 있다. 이제 `New Item/item` 메뉴가 생겨 이것으로 📜Item.cs을 ScriptableObject 타입의 에셋으로서 생성할 수 있게 됨.

![image](https://user-images.githubusercontent.com/42318591/94980629-5f621a80-0566-11eb-8b2e-7c3fda8eb2a7.png)

에셋으로 생성해주면 `fileName`으로 설정했었던 "New Item" 이름을 기본적으로 하여 생성 된다.

![image](https://user-images.githubusercontent.com/42318591/94980639-77d23500-0566-11eb-9fde-d14b9d43c393.png)

📜Item.cs 에서 정의한 데이터 속성들을 확인할 수 있다.

![image](https://user-images.githubusercontent.com/42318591/94980649-8b7d9b80-0566-11eb-9bfa-aae2506b14ae.png)

모든 바위 아이템들이 공통적으로 같은 값을 가지는 데이터 에셋으로서 사용하기 위하여 이름을 Rock 으로 바꾸고 바위 아이템 값에 맞는 데이터들을 할당해주었다. 이제 이 `Rock` ScriptableObject 에셋을 참조하는 모든 오브젝트는 동일한 이 `Rock` ScriptableObject 에셋 한 군데를 참조하게 되는 것이고, 이에 따라 모두 동일한 데이터 값을 가지게 된다. 모든 바위 아이템들은 Item Name이 Rock 이며 Item Type이 Ingredient 가 될 것이다.

***
<br>

    🌜 개인 공부 기록용 블로그입니다. 오류나 틀린 부분이 있을 경우 
    언제든지 댓글 혹은 메일로 지적해주시면 감사하겠습니다! 😄

[맨 위로 이동하기](#){: .btn .btn--primary }{: .align-right}