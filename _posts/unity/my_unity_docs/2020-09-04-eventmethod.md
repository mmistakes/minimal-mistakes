---
title:  "Unity C# > 이벤트 함수 정리" 

categories:
  -  UnityDocs
tags:
  - [Game Engine, Unity]

toc: true
toc_sticky: true

date: 2020-09-04
last_modified_at: 2020-09-04
---

공부하면서 알게 된 **이벤트 함수**들을 정리한 문서입니다.😀
{: .notice--warning}

- 유니티 공식 매뉴얼 <https://docs.unity3d.com/kr/current/Manual/UnityManual.html>
- Scripting Overview <http://www.devkorea.co.kr/reference/Documentation/ScriptReference/index.html>


# 이벤트 함수

> they are not 'real' methods that you have to override, they are messages that are called only if they were implemented.

> 실수로 이름 오타나면 절대 실행 안된다!! (당연한 얘기지만.. 😂)

- 오타여도 사용자 지정 함수인 줄 알고 잡아주지도 않음 ㅠ ㅠ OnTriggerEnter 인데 onTriggerEnter 라고 소문자로 써서 계속 실행되지 않았었는데 한참을 헤맸다...
- 이름 실수 하지 않도록 주의 하자!!

## 이벤트 함수 실행 순서

[유니티 공식 문서 <이벤트 함수의 실행 순서> 참고](https://docs.unity3d.com/kr/2018.4/Manual/ExecutionOrder.html#InBetweenFrames)

## 상속과 이벤트 함수

```c#
    // 부모 클래스
    void Start()
    {
        // ...
    }

    // 자식 클래스
    void Start()
    {
        // ...
    }
```

- 부모 클래스에 Start 함수 有
- 자식 클래스에도 Start 함수 有
- 오브젝트엔 자식 클래스 스크립트가 붙어있음

이 상황에선 자식 클래스의 Start 함수만 실행된다. 유니티에서는 이벤트를 그저 쫙 뿌릴 뿐이고, <u>오브젝트에 컴포넌트로서 붙어서 이벤트를 감지할 수 있는 스크립트일 경우에만</u> 실행되는듯 하다. 즉, 부모의 Start와 자식의 Start 두 이벤트 함수는 별개이며, 오브젝트에 컴포넌트로서 붙어 있는건 현재 자식 스크립트이므로 자식만 Start 메세지를 받을 수 있기 때문이다. "이벤트 콜백 함수"는 오브젝트에 붙어서 컴포넌트로 작동중일 때만 이벤트를 감지하여 실행되는듯 하다!  

```c#
    // 부모 클래스
    public override void Init()
    {
        
    }

    // 자식 클래스
    private void Start()
    {
        Init();
    }

    public override void Init()
    {
        base.Init();  // 부모의 Init() 실행

        // ...
	  }
```

따라서 Start 함수는 부모로부터 상속받을게 있으면 이벤트함수인 Start 를 사용하지 말고 Init 가상함수를 따로 만들어서 이를 자식이 오버라이딩한 Init 에서 `base.Init()`으로 호출하게 하고 이 Init 을 자식의 Start()안에서 실행시키는 식으로 코딩하면 될 것 같다.

```c#
    // 부모 클래스
    void Start()
    {
        
    }

    // 자식 클래스
```

오브젝트엔 자식 클래스 스크립트가 붙어있는 상황에서 만약 부모에만 Start()가 있으면 이땐 상속처리가 되어 자식 클래스는 부모 클래스의 Start()를 물려 받아 실행한다. 

<br>

## 👩‍🦰 void Start()
- <u>컴포넌트 초기화</u> 부분
  - <u>스크립트가 붙은 해당 오브젝트가 처음으로 생성 되는 그 순간</u> and <u>오브젝트 활성화 상태일 때 최초로 1 회 실행된다.</u>
    - 유니티가 Start 메세지를 브로드캐스팅 하여 뿌려 온 컴포넌트들을 각자 구현된 Start 내용대로 초기화 시킨다.
    - 유니티는 게임 시작할때 Start 메세지를 뿌린다.
- Awake() 후 + Update() 전에 1회 동작하는 이벤트 함수다.
- **오브젝트가 최초 생성될 때 실행 순서**
  - <u>Awake() 👉 OnEnable() 👉 Start()</u>
- **Awake 와의 차이점**
  - 둘 다 오브젝트가 생성될 때(스크립트가 최초로 실행될 때) 최초 1회 실행된다는 점에서 같다.
  - 그러나 
    - Awake() 
      - 코루틴 실행이 안된다. Start()보다 먼저 실행된다.
      - <u>스크립트(컴포넌트)가 비활성화인 상태에서도 실행된다.</u> 꺼져있어도 실행 됨. 오브젝트가 활성화되있기만 하면 된다.
        - 오브젝트는 SetActive(true) 해야 하고 & 스크립트 this.enabled = false; 인 상태에선 호출된다는 얘기! 
        - 오브젝트 자체가 비활이면 Awake()도 실행 안된다.
    - Start()
      - 코루틴 실행이 가능하다.
      - 스크립트(컴포넌트)가 활성화 되어있는 상태에서만 실행된다. 
- **OnEnable 와의 차이점**
  - OnEnable
    - 오브젝트가 '활성화'될 때마다 실행된다.(꺼졌다가 켜졌을 때 OR 오브젝트가 최초 생성될 때) Start()보다 먼저 실행된다.
  - Start() 
    - 오브젝트가 최초 생성될 때 1회 실행
- **이말은 즉, Awake는 오브젝트가 활성화되자마자 실행되고, 뒤이어 OnEnable과 Start는 스크립트(컴포넌트)가 활성화 되야 실행된다는 얘기다.**


<br>

## 👩‍🦰 void Awake()
- Start()와 비슷한데 Start()보다도 먼저 실행되는 시작 함수다.
  - Start 함수의 이전 및 프리팹의 인스턴스화 직후에 호출
- 생성 하자마자 들어가는 1회 동작 함수
- Start 메세지보다 더 빨리 호출되므로 다른 스크립트들의 Start보다 더 빨리 실행되야 하는 내용이 있으면 Awake에 구현하면 된다.
- **오브젝트가 최초 생성될 때 실행 순서**
  - <u>Awake() 👉 OnEnable() 👉 Start()</u>
- **Start 와의 차이점**
  - 둘 다 오브젝트가 생성될 때(스크립트가 최초로 실행될 때) 최초 1회 실행된다는 점에서 같다.
  - 그러나 
    - Awake() 
      - 코루틴 실행이 안된다. Start()보다 먼저 실행된다.
      - <u>스크립트(컴포넌트)가 비활성화인 상태에서도 실행된다.</u> 꺼져있어도 실행 됨. 오브젝트가 활성화되있기만 하면 된다.
        - 오브젝트는 SetActive(true) 해야 하고 & 스크립트 this.enabled = false; 인 상태에선 호출된다는 얘기! 
        - 오브젝트 자체가 비활이면 Awake()도 실행 안된다.
    - Start()
      - 코루틴 실행이 가능하다.
      - <u>스크립트(컴포넌트)가 활성화 되어있는 상태에서만 실행된다. </u>
  - **이말은 즉, Awake는 오브젝트가 활성화되자마자 실행되고, 뒤이어 OnEnable과 Start는 스크립트(컴포넌트)가 활성화 되야 실행된다는 얘기다.**

<br>

## 👩‍🦰 void Update()
- 1초에 수십번씩 자신의 상태를 갱신하고 주기적으로 계속 실행 
  - 외부에서 직접 찾아 실행할 필요 없음. 
- <u>스스로 매 프레임마다 실행 됨.</u>
- <u>프레임 속도는 환경마다 다르기 때문에 물리 처리를 update() 함수에서 해주면 환경에 따라 물리 처리 오차가 발생할 수 있어 비추천</u>

<br>

## 👩‍🦰 void FixedUpdate()

> 디폴트로 0.02초 (초당 50회)마다 실행된다.

- <u>Update()처럼 매번 반복 실행</u>되나 프레임에 기반하지 않고 어떤 고정적이고 동일한 시간에 기반하여 실행된다.
  - Update()와의 차이점
    - Update()는 화면 한번 깜빡일때마다 실행되서 렉걸리거나 환경이 안좋거나 하면 그만큼 Update()도 적게 실행되지만
    - Fixedupdate()는 환경에 상관없이 무조건 실행 횟수를 지킨다. 정해진 수만큼 무조건 실행 함
- <u>프레임과 상관없이 고정적인 시간마다 실행되기 때문에 환경에 상관없이 물리처리를 오차 없이 실행시킬 수 있다.</u>
  - 물리처리는 **FixedUpdate()** 안에서 해주기.
- `Time.fixedDeltaTime` 의 시간 간격으로 실행이 된다. 디폴트로 `Time.fixedDeltaTime` 값은 0.02f 이다.

> `FixedUpdate`와 `Update`의 차이점

- **FixedUpdate**
  - 프레임마다 호출되지 않는다. 독립적인 타이머가 존재하여 정해진, 고정적인 시간 간격으로 호출된다.
    - 프레임과 관계없이 규칙적으로 호출되므로 물리적인 연산을 할 때 이 곳에서 하는게 좋다.
      - 프레임은 시스템 환경을 따라가므로 컴퓨터 환경이 좋지 않으면 느리고 불규칙적으로 변할 수 있기 때문에 Rigidbody 같은 어떤 물리 효과가 적용된 움직임 처리를 *Update* 안에 구현하는건 좋지 않다.
  - `TimeSCale`에 의존하기 때문에 `Time.timeScale = 0;`이 될 때 실행되지 않는다.
    - `Time.fixedDeltaTime`마다 실행된다. 이는 `0.02`초로 고정되어 있다.
- *Update*
  - 프레임마다 호출된다. 
  - `TimeSCale`에 의존하지 않기 때문에 `Time.timeScale = 0;`이 될 때도 Update 함수 자체는 실행이 된다.
    - 다만 이 안에서 `deltaTime`을 사용하여 움직임을 제어한게 있었다면 멈추겠지! 

*Except for realtimeSinceStartup and fixedDeltaTime, timeScale affects all the time and delta time measuring variables of the Time class. If you lower timeScale it is recommended to <u>also lower Time.fixedDeltaTime by the same amount.</u> FixedUpdate functions will not be called when timeScale is set to zero.* <https://docs.unity3d.com/ScriptReference/Time-timeScale.html>

<br>

## 👩‍🦰 void LateUpate()
  - 유니티 함수로, <u>매 프레임마다 실행되지만 Update()함수 보다 늦게 실행된다.</u>
    - <u>Update() 함수 실행이 다 끝난 후에, Update()함수의 종료 시점에 맞춰서 LateUpdate() 가 실행</u>된다.
  - 예를 들어 캐릭터의 이동 방향 계산은 Update() 에서 끝내준 후,Update()에서 계산 끝낸 캐릭터의 이동 방향에 따라 LateUpdate()에서 카메라가 캐릭터를 따라가도록 하는 식으로 구현한다.
    - ⭐ 만약 Update() 함수로 했다면, 📜PlayerController.cs 에서  플레이어의 위치와 회전값을 업데이트 하는 것과 📜CameraController.cs 에서 플레이어의 위치와 회전을 업데이트 하는 것이 같은 *Update()*로서 동시에 섞여 실행되기 때문에 아직 업데이트 되지 않은 플레이어의 위치와 회전값으로 카메라가 따라가게 되는 프레임이 발생할 수 있다.
      - 정확히 말하자면 📜PlayerController.cs 에서 `플레이어의 위치와 회전값을 업데이트 하는 OnKeyboard() 함수는 액션에 등록되어 📜Manager.cs 의 *Update()* 에서 실행 됨
    - 따라서 <u>반드시 플레이어의 위치와 회전값을 업데이트 하는 일은 📜PlayerController.cs 에서 먼저 이루어지고 난 후에</u> 업데이트 된 플레이어의 위치와 회전 값을 가지고 <u>카메라의 위치와 회전 값을 업데이트 해야 한다.</u>
      - 그래서 📜CameraController.cs 에선 카메라의 위치와 회전값을 업데이트 하는 일을 Update 보다 더 늦게 호출되는 *LateUpdate()* 안에서 한다. 📜PlayerController.cs 에서 플레이어의 위치와 회전값 업데이트를 마친 후에 그 업데이트 된 값을 `_delta` 여유를 두고 따라가도록 하기 위하여 

<br>

## 👩‍🦰 void OnTriggerEnter(Collider other)
- On<u>Trigger</u>Enter : `Trigger`인 Collider와 충돌할 때 자동으로 실행된다. 
  - `Is Trigger`가 <u>체크된 Collider와 충돌하는 경우 발생되는 메세지</u>
  - 사실 충돌하는 두 오브젝트 중 하나만 Trigger 라도 두 오브젝트 모두 이 함수가 실행된다.
    - 즉 물리적 충돌은 일어나지 않고 닿기 만 하더라도, 뚫고 지나가지만 그래도 이벤트 발생은 시켜야 하는 경우.
- <u>오브젝트끼리 충돌하면 유니티에서 OnTriggerEnter 메세지를</u> ***<u>충돌한 오브젝트들</u>*** 에게 브로드캐스팅 한다.
  - 충돌한 두 오브젝트끼리는 서로 독립적이고 연관이 없으니 서로 충돌한 사실을 모르지만 두 오브젝트가 충돌하면 유니티에서 두 오브젝트에게 OnTriggerEnter 메세지를 뿌리므로 두 오브젝트는 <u>OnTriggerEnter 함수 안에 구현한 내용대로 충돌 처리를 한다.</u>
- 유니티는 충돌한 상대 오브젝트의 정보를`Collider`타입의 `other`가 참조하도록 넘겨준다.  
  - 충돌한 <u>상대 오브젝트에 붙어있는 Collider 컴포넌트</u> 
    - `Collider` 컴포넌트 👉🏻 <u>물리적 표면</u>
- 이 스크립트가 붙은 오브젝트(나 자신)가 다른 오브젝트와 충돌시 `OnTriggerEnter` 이벤트가 발생하기 위한 조건. 아래 조건을 전부 만족해야 이 이벤트가 발생할 수 있다.
  1. 내가 혹은 상대방 둘 중 하나는 꼭 Rigidbody 컴포넌트를 가지고 있어야 한다. 
    - `IsKinematic` 체크 여부는 상관 없다.
  2. 나 그리고 상대방 둘 다 모두 Collider 컴포넌트를 가지고 있어야 한다.
    - 단, 둘 중 하나라도 `IsTrigger`는 반드시 켜져 있어야 함

```c#
void OnTriggerEnter(Collider other)
{
    Debug.Log("충돌 발생!");
} 
```
- 위 스크립트가 붙어있는 오브젝트에서 충돌이 일어날 때마다 콘솔창에 "충돌 발생" 메세지 출력.

<br>

### OnTriggerEnter, OnTriggerExit, OnTriggerStay의 차이
- OnTrigger<u>Enter</u> : `Enter`는 충돌하는 순간
- OnTrigger<u>Exit</u> : `Exit`는 떼어지는 순간. 더 이상 붙어 있지 않는 순간.
- OnTrigger<u>Stay</u> : `Stay`는 충돌 중인, 붙어 있는 동안.

<br>

## 👩‍🦰 void OnCollisionEnter(Collision other)
- On<u>Collision</u>Enter : Trigger가 체크되지 않은 <u>일반 Collider를 가진 오브젝트와 충돌한 경우</u> 자동으로 실행된다.
- `Collider`와 `Collision`의 차이
  - `Collision`은 충돌한 상대 오브젝트에 대한 많은 정보를 담고 있다. 나랑 부딪친 오브젝트의 Transform, Collider, GameObject, Rigidbody, 상대 속도 등등이 `Collision`에 담겨서 들어 온다. 물리적인 정보가 더 많이 들어 있다.
  - `Collider`는 `Collision`보다는 담고 있는 정보가 적다. 물리적인 정보는 담고 있지 않아서.

```c#
    private void OnCollisionEnter(Collision collision)
    {
        Debug.Log(collision.gameObject.name);
    }
```

- 이 스크립트가 붙은 오브젝트(나 자신)가 다른 오브젝트와 충돌시 `OnCollisionEnter` 이벤트가 발생하기 위한 조건. 아래 조건을 전부 만족해야 이 이벤트가 발생할 수 있다.
  1. 내가 혹은 상대방 둘 중 하나는 꼭 <u>Rigidbody 컴포넌트</u>를 가지고 있어야 한다. 
    - `IsKinematic`은 꺼져 있어야 함
    - 즉, 둘 중 하나는 꼭 충돌로 인한 물리적인 힘에 영향을 받을 수 있는 상태여야 함. 그래서 OnCollisionEnter는 뭔가 물리적인 힘에 의한 충돌 느낌
  2. 나 그리고 상대방 둘 다 모두 Collider 컴포넌트를 가지고 있어야 한다.
    - `IsTrigger`는 꺼져 있어야 함

FPS 게임 같은데서 총알이 사람에게 맞으면 총알 입장에선 사람 오브젝트 정보가 Collision으로 들어오게 되므로 그 사람의 체력을 깎거나 하는 처리를 할 수 있다.


<br>

## 👩‍🦰 void OnEnable()

> 해당 스크립트(컴포넌트) 혹은 스크립트가 붙어있는 오브젝트가 <u>활성화 될 때마다 자동으로 실행된다.</u>

`컴포넌트`가 꺼져 있다가 켜지는 상태마다 발동된다. Start()와 비슷하지만 Start()는 게임 시작시 한번 발동되는 반면 OnEnable()은 컴포넌트가 꺼져있다가 켜질 때마다 1회씩 실행된다. 
- 게임 시작되자마자 `enabled = true` 상태인 컴포넌트들에게 발동
- 게임 도중에`enabled = false`이다가 `enabled = true`가 되는 컴포넌트들에게 발동
  - 오브젝트 끌 때는 `SetActive(false)`
  - 컴포넌트나 스크립트를 끌 때는 `enabled = false`
- **오브젝트가 최초 생성될 때 실행 순서**
  - <u>Awake() 👉 OnEnable() 👉 Start()</u>
- **Start 와의 차이점**
  - OnEnable 👉 오브젝트가 '활성화'될 때마다 실행된다.(꺼졌다가 켜졌을 때 OR 오브젝트가 최초 생성될 때) Start()보다 먼저 실행된다.
  - Start() 👉 오브젝트가 최초 생성될 때
  - 둘 다 코루틴 사용이 가능하다.
- **이말은 즉, Awake는 오브젝트가 활성화되자마자 실행되고, 뒤이어 OnEnable과 Start는 스크립트(컴포넌트)가 활성화 되야 실행된다는 얘기다.**

<br>

## 👩‍🦰 void OnDisable()

> 해당 스크립트(컴포넌트) 혹은 스크립트가 붙어있는 오브젝트가 <u>비활성화 될 때마다 자동으로 실행된다.</u>

`컴포넌트`가 켜져 있다가 꺼지는 상태마다 발동된다. 

<br>

## 👩‍🦰 void OnDestroy()
오브젝트가 Destroy 될 때 자동 호출되는 이벤트 함수다. 마치 소멸자 같은 것.

<br>

## 👩‍🦰 void OnAnimatiorIK()

- 애니메이션의 관절 꺾는 IK 정보가 갱신될 때마다 발동되는 이벤트 함수.
- Animator와 관련된 이벤트로 애니메이터가 붙어있는 오브젝트만 이 이벤트 함수를 동작시킬 수 있다.
- 씬상에 존재하기는 하나 아직 보이지는 않는 그런 오브젝트들을 기즈모를 통해 보여줌으로서 위치 조정을 쉽게 해주는 등등 개발자 편의를 돕는다. 

<br>

## 👩‍🦰 void OnDrawGizmos()

- 유디터 에디터 내에서만, 씬 상에서만 <u>매 프레임 기즈모를 그리는 역할</u>을 한다.
- 이 함수가 소속된 스크립트가 컴포넌트로서 붙은 오브젝트가 Scene 화면 상에서 항상 보이도록 하는 이벤트 함수.
- 씬상에 존재하기는 하나 아직 보이지는 않는 그런 오브젝트들을 기즈모를 통해 보여줌으로서 위치 조정을 쉽게 해주는 등등 개발자 편의를 돕는다. 

<br>

## 👩‍🦰 void OnDrawGizmosSelected()

- 유디터 에디터 내에서만, 씬 상에서만 <u>Hierarchy 창에서 선택된 오브젝트에 한해서만 매 프레임 기즈모를 그리는 역할</u>을 한다.
- 이 함수가 소속된 스크립트가 컴포넌트로서 붙은 오브젝트가 선택됐을때만 보이도록 하는 이벤트 함수.

<br>

## 👩‍🦰 사용자 지정 이벤트

해당 이벤트에 원하는 함수가 들어 있는 스크립트들을 드래그 해 와서 발동시킬 함수들을 선택하면 해당 이벤트를 발동시켰을 때 등록한 함수들도 다 같이 실행된다. 

```c#
using UnityEngine.Events;

public UnityEvent myEvent;

myEvent.invoke();
```

1. *using UnityEngine.Events;*
2. myEvent라는 이름의 사용자 지정 이벤트 변수를 선언한다. 
3. 이제 유니티에서 myEvent 슬롯이 열릴텐데 여기에 원하는 스크립트를 드래그 앤 드롭해준다.
4. 원하는 함수들을 선택한다.
5. invoke() 해주면 등록한 함수들이 모두 실행된다. 

### ✈ Invoke()

MonoBehaviour 에서 지원하는 함수로, 함수 혹은 이벤트를 실행시킨다.
- 이벤트이름.Invoke() : 이벤트 발동
- Invoke(string) : 이름을 문자열로 넣으면 그 이름의 함수를 실행시킨다. 
- Invoke(string, floaT) : 매개 변수로 시간도 넣을 수 있다. *Invoke("Restart", 5f)* 해주면 <u>5초 뒤에 Restart() 함수를 실행시켜라</u>라는 의미다.


***
<br>

    🌜 개인 공부 기록용 블로그입니다. 오류나 틀린 부분이 있을 경우 
    언제든지 댓글 혹은 메일로 지적해주시면 감사하겠습니다! 😄

[맨 위로 이동하기](#){: .btn .btn--primary }{: .align-right}