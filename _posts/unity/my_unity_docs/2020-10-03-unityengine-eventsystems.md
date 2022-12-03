---
title:  "Unity C# > EventSystems" 

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

> 이벤트 시스템 공식 문서 👉 <https://docs.unity3d.com/kr/530/Manual/SupportedEvents.html>

```c#
using UnityEngine.EventSystems;
```

- 호출하려는 이벤트를 담당하는 인터페이스를 상속 받고, 인터페이스의 이벤트 함수를 오버라이딩 해야 한다.

<br>

# ⭐ EventSystem

- 이벤트를 받을 수 있으려면 
  - 1️⃣ Raycast를 받을 수 있어야 한다.
  - 2️⃣ 어떤 종류의 이벤트인지 (클릭, 드래그 등등) 감지 할 수 있어야 한다.
    - 👉 이 일을 `EventSystem` 오브젝트가 해준다.
      - Create -> UI -> Event System
- `UnityEngine.EventSystems` 관련 이벤트들이 발생할 수 있으려면 다음과 같은 사항들을 고려해야 한다.
  - 다 만족할 필요는 없고 몇 개만. 1️⃣,2️⃣ 를 고려하여.

1. Added `EventSystem` game object to scene (Create -> UI -> Event System)
2. Camera has a `Physics Raycaster` (Select Main Camera, Add Component -> Event -> Physics Raycaster)
3. Selectable object is a MonoBehavior-derived class that implements IPointerClickHandler, IPointerDownHandler, and IPointerUpHandler (see accepted answer).
4. Selectable game object includes selectable object `MonoBehavior` script.
5. Selectable game object includes a `collider` (box, mesh, or any other collider type). 👉 `Raycast`를 받을 수 있도록
6. Check Raycaster Event Mask vs. game object's Layer mask
7. Verify no collider (possibly without a mesh) is obscuring the selectable game object.
8. If collider is a trigger, verify that Queries Hit Triggers is enabled in Physics settings.

[참고 링크](https://answers.unity.com/questions/1077069/implementing-ipointerclickhandler-interface-does-n.html)


  - 이벤트에 대한 Raycast는 Canvas의 Graphic Raycaster 컴포넌트에서 쏴주고
  - 어떤 종류의 이벤트인지에 대한 답을 Raycast 로 쏴주는건 `EventSystem` 오브젝트이다.
  - 이 이벤트에 대한 Raycast를 받기 위해선 UI들은 `Raycast Target` 가 체크 되어 있어야 하며 일반 오브젝트들은 Collider 가 붙어 있어야 한다.


<br>

## 🚀 함수

### ✈ IsPointerOverGameObject()

```c#
using UnityEngine.EventSystems;

//..

if (EventSystem.current.IsPointerOverGameObject())
    return;
```

- `IsPointerOverGameObject()` 
  - <u>마우스 클릭 이벤트가 UI 위에서 이루어졌다면</u> `true` 리턴
    - 정확히 말하면 마우스 포인터가 EventSystem 오브젝트 위에 있다면 True
  - 플레이어가 마우스 클릭한 곳으로 이동하는 로직이 있다면, 클릭 버튼을 누를 때 플레이어가 그 클릭 버튼으로 이동하면 안된다. 그냥 클릭 버튼 이벤트만 처리 되야 한다. 따라서 이럴때 마우스 클릭 이벤트가 UI 위에서 이루어진 것이라면 위와 같은 코드를 통해 플레이어 이동을 하지 않도록 할 수 있다.
  - `current` 👉 현재 EventSystem 리턴
- 파라미터로 마우스 포인터 ID가 들어갈 수 있다.
  - `IsPointerOverGameObject(-1)` 마우스 좌클릭(디폴트)
    - PC 혹은 유니터 상에서는 `-1`
  - `IsPointerOverGameObject(0)` 첫 번째 터치
    - 모바일 환경에서는 `0`
  - `IsPointerOverGameObject(Input.GetTouch(0).fingerId))`

<br>

# ⭐ 이벤트 인터페이스 종류

<u>반드시 해당 인터페이스의 함수를 오버라이딩 해야 한다.</u> 인터페이스니까..

<br>

## PointerEventData

마우스 혹은 터치 입력 이벤트에 관한 정보들이 담겨 있다. 이벤트가 들어온 버튼, 클릭 수, 마우스 위치, 현재 마우스 움직이고 있는지 여부 등등 여라가지를 담고 있다. [공식 문서 참고](https://docs.unity3d.com/kr/530/ScriptReference/EventSystems.PointerEventData.html)

<br>

## 마우스 클릭 - IPointerClickHandler

```c#
using UnityEngine;
using UnityEngine.EventSystems;
public class Test : MonoBehaviour, IPointerClickHandler
{

}
```

- `IPointerClickHandler` 인터페이스
  - 이 인터페이스를 상속 받은 스크립트라면 마우스 이벤트를 받을 수 있다.
  - 마우스 클릭 될 때 발생하는 이벤트 함수를 오버라이딩 해야 한다. 
    - *<u>OnPointerClick</u>(PointerEventData eventData)*
      - 이 스크립트가 붙은 오브젝트에 마우스 클릭 이벤트 발생시 호출

<br>

## 마우스 드래그 - IBeginDragHandler, IDragHandler, IEndDragHandler

```c#
using UnityEngine;
using UnityEngine.EventSystems;
public class Test : MonoBehaviour, IBeginDragHandler, IDragHandler, IEndDragHandler
{
    public void OnBeginDrag(PointerEventData eventData)
    {

    }

    public void OnDrag(PointerEventData eventData)
    {

    }

    public void OnEndDrag(PointerEventData eventData)
    {

    }
}
```

- `IBeginDragHandler` 인터페이스
  - *<u>OnBeginDrag</u>(PointerEventData eventData)*
    - 이 스크립트가 붙은 <u>오브젝트에다가 마우스 드래그를 시작 했을 때</u> 호출
- `IDragHandler` 인터페이스
  - *<u>OnDrag</u>(PointerEventData eventData)*
    - 이 스크립트가 붙은 <u>오브젝트에다가 마우스 드래그 중인 동안 계속</u> 호출
- `IEndDragHandler` 인터페이스
  - *<u>OnEndDrag</u>(PointerEventData eventData)*
    - 이 스크립트가 붙은 <u>오브젝트를 마우스 드래그 하는 것을 끝냈을 때</u> 호출   

<br>

## 마우스 드롭 - IDropHandler

```c#
using UnityEngine;
using UnityEngine.EventSystems;
public class Test : MonoBehaviour, IDropHandler
{
    public void OnDrop(PointerEventData eventData)
    {
        if (DragSlot.instance.dragSlot != null)
            ChangeSlot();
    }
}
```

- `IDropHandler` 인터페이스
  - *<u>OnDrop</u>(PointerEventData eventData)*
    - 이 스크립트가 붙은 오브젝트에 마우스 드롭 이벤트가 발생했을 때.

- *OnEndDrag* 👉 나 자신을 드래그 하는 것을 끝냈을 때 호출
  - 내가 드래그 되는 것이 끝났을 때!
  - 드래그가 종료했을 때, 드래그 대상이 되었던 오브젝트에서 호출 됨.
- *OnDrop* 👉 누군지 모르겠지만 내 자신한테 드롭 된 무언가가 있을 때 호출. 
  - 나한테 누가 드롭 되었을 때!
  - 드래그를 멈춘 위치에 있는 오브젝트에서 호출 됨.
- <u>드롭 된 다른 곳의 OnDrop 이, 드래그를 끝낸 내 OnEndDrag 보다 먼저 실행된다.</u>

<br>

## 마우스 커서가 해당 오브젝트 위에 있을 때 - IPointerEnterHandler

```c#
using UnityEngine;
using UnityEngine.EventSystems;
public class Test : MonoBehaviour, IPointerEnterHandler
{
    public void OnPointerEnter(PointerEventData eventData)
    {
        
    }
}
```

- **IPointerEnterHandler** 인터페이스 
  - *<u>OnPointerEnter</u>(PointerEventData eventData)*
    - 마우스 커서가 이 스크립트가 붙은 오브젝트에 들어갈 때 발동
<br>

## 마우스 커서가 해당 오브젝트 위에 있을 때 - IPointerExitrHandler

```c#
using UnityEngine;
using UnityEngine.EventSystems;
public class Test : MonoBehaviour, IPointerExitrHandler
{
    public void OnPointerExit(PointerEventData eventData)
    {
        
    }
}
```


- **IPointerExitHandler** 인터페이스 - 
  - *<u>OnPointerExit</u>(PointerEventData eventData)*
    - 마우스 커서가 이 스크립트가 붙은 오브젝트에서 빠져나올 때 발동

***
<br>

    🌜 개인 공부 기록용 블로그입니다. 오류나 틀린 부분이 있을 경우 
    언제든지 댓글 혹은 메일로 지적해주시면 감사하겠습니다! 😄

[맨 위로 이동하기](#){: .btn .btn--primary }{: .align-right}