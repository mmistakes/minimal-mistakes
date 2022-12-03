---
title:  "UE4 여러 이벤트&함수들 정리" 

categories:
  -  UE4Docs
tags:
  - [Game Engine, UE4]

toc: true
toc_sticky: true

date: 2020-09-05
last_modified_at: 2020-09-05
---

공부하면서 알게된 <u>여러 이벤트&함수들 정리</u>  
{: .notice--warning}

***

> 언리얼 공식 매뉴얼 <https://docs.unrealengine.com/ko/index.html>

## 👩‍🦰 레퍼런스

- C++ 프로그래밍
  - 언리얼 오브젝트를 참조하는 안전한 C++ 포인터
- 블루프린트
  - <u>물체에 명령을 전달할 수 있는 핀을 가진 노드</u>

## 👩‍🦰 블루프린트 종류

- 레벨 블루프린트 
  - <u>다른 레벨에선 동작하지 않고 해당 레벨에서만 동작하게 된다</u>
  - 추가 방법 👉 툴바 - 블루프린트 - 레벨 블루프린트 열기
- 클래스 블루프린트
  - <u>오브젝트별로 동작</u>하게 할 수 있으며 레벨 프린트와 다르게 여러개 생성할 수 있고 <u>다른 레벨에서도 쓸 수 있다.</u>
  - 추가 방법 👉 콘텐츠 브라우저에서 우클 - 블루프린트 클래스 - 부모 클래스를 선택한다.
    - 이렇게 만든 클래스를 더블클릭하면 블루프린트 창이 뜬다.

### 클래스 블루프린트 부모클래스 종류

- Actor 
- Character 
- Animation
  - 애니메이션의 상태 머신 + 이벤트 그래프
- GameInstance
  - 싱글톤과 비슷한 개념. 
  - 인스턴스가 오로지 하나로만 게임 내내 유지가 된다.
  - 프로젝트 세팅에서 직접 블루프린트를 할당해주어야 사용이 가능하다.
- GameMode
  - 게임에 대한 전반적인 규칙들을 여기서 스크립팅 한다.
    - 레벨마다 게임 모드를 지정해줄 수 있다. 
    - 레벨간의 전환, 스폰 규칙 등등..
  - 개발자가 직접 게임 모드 블루프린트를 생성하지 않으면 언리얼 엔진에 기본적으로 마련이 되어 있는 GameMode 블루프린트가 사용된다.
- Widget
  - UI 를 제작하는 블루프린트
  - 디자이너 모드로 시각적으로 UI 요소를 캔버스에 배치할 수도 있고
  - 이벤트 그래프로 스크립팅도 가능하다.
- SaveGame
  - 게임 상태를 로컬 환경에 저장하고 불러오는 기능을 쓸 수 있다.
  - 게임 데이터를 저장하면 📂Saved/SaveGames 폴더에 게임 데이터가 저장된다.
  - 이 블루프린트 안에서 작성하는 변수들의 상태는 로컬 환경에도 그대로 보존이 된다.
- CameraShake
  - 카메라가 흔들리는 효과를 줄 수 있는 부모 클래스다.
    - 플레이어가 때리거나 보스가 걸어올 때 등등 카메라를 흔들리게 할 수 있다.

<br>

## 👩‍🦰 클래스 블루프린트

> 마치 유니티에서의 `Prefab`과 같다.

프리팹처럼 클래스 블루 프린트를 작성하여 미리 에셋으로 생성해둔 후, 뷰포트에 드래그 앤 드롭하여 오브젝트화 할 수 있다.

- 뷰포트에 현재 존재하고 있는 액터에 컴포넌트 추가하듯이(유니티에서 C# 스크립트 추가하듯이) 블루프린트를 추가할 수도 있고
- 프리팹을 미리 만들어 두듯이 콘텐츠 브라우저에 블루프린트 클래스를 미리 생성해둘 수도 있다.

### 컴포넌트

- `큐브`
  - 큐브 모양을 입힘
  - 꼭 큐브 아니라도 디테일 창의 Static Mesh 에서 여러가지 모양의 컴포넌트를 선택할 수 있다.
    - ![image](https://user-images.githubusercontent.com/42318591/92304027-5c026000-efb5-11ea-96ab-b0440194b834.png){: width="60%" height="60%"}{: .align-center}

### 이벤트

- **클래스 블루프린트 같은 경우에는 다음과 같은 이벤트들이 미리 생성이 되어 있음**
  - ![image](https://user-images.githubusercontent.com/42318591/92304203-cc5db100-efb6-11ea-9f67-713175196bc0.png){: width="60%" height="60%"}{: .align-center}
    - `BeginPlay` 👉 게임이 시작되자마자 발생하는 이벤트 
    - `ActorBeginOverlap` 👉 오브젝트끼리 겹쳤을 때, 충돌했을 때 발생하는 이벤트
    - `Event Tick` 👉 계속 매 프레임 호출이 된다. 마치 유니티의 **Update** 함수


<br>

## 👩‍🦰 노드 핀

![image](https://user-images.githubusercontent.com/42318591/92994064-f886ae00-f531-11ea-940a-56c781fb923e.png)

- 핀 연결 끊기 단축키 `Alt + 클릭`
- **실행 핀** (재생 버튼 모양)
  - 노드를 서로 연결하여 실행 흐름을 만드는 데 사용된다.
  - 이벤트 노드를 제외하고, <u>입력 실행 핀이 활성화 되어야 그 노드가 실행된다.</u>
  - 다른 노드와 실행 핀끼리 연결된다.
- **데이터 핀**
  - 노드에서 어떤 데이터를 입력(Input) 받거나 데이터를 리턴(Output)하는데 사용된다.
  - 다른 노드와 데이터 핀끼리 연결할 수 있다.
  - 데이터 유형에 따라 와이어 색깔이 다르다.
  - 데이터 핀끼리 연결할때 형변환이 가능한 경우엔 자동으로 형변환을 해준다.

<br>

## 👩‍🦰 노드 종류

- 노드 추가시 원하는 노드가 검색해도 안나오는 이유는 `맥락 의존적(Context Sensitive)`에 체크가 되어 있어서 현재 맥락과 관련있는 노드만 검색되기 때문이다.
  - 따라서 이를 체크 해제해주면 검색이 될 것이다.

<br>

### 🔔 알아야 할 점

- `변수`를 노드로 끌어오면 변수 값을 설정할 수 있는 Setter 노드와 Getter 노드를 선택해서 만들 수 있다. 
- `self` 자기 자신(이 블루프린트가 붙어있는 액터/오브젝트)을 노드로 만들 수 있다. self 검색하면 나오는 "자기 자신 레퍼런스" 선택
- 커스텀 이벤트는 해당 커스텀 이벤트를 호출해주는 함수 노드를 추가해 주어야 이벤트를 발생시킬 수 있다.

![image](https://user-images.githubusercontent.com/42318591/94087404-9b9bc980-fe48-11ea-8685-5d83aba3f4f4.png)

- 이렇게 직접 개발자가 함수를 생성할 수도 있다.
- 사용자 지정 함수인 `Show Stage Select Widget` 이름의 함수를 직접 만들어주었다.
  - 왼쪽 상단의 '함수' 에서 플러스 버튼을 누르면 함수를 생성할 수 있다.
  - 디테일 패널에서 '입력'. 즉, 이 함수의 '파라미터'를 `isShow`라는 Boolean 타입의 매개 변수으로 지정해주었다.

<br>

### 🔔 Event

[이벤트 노드 종류 문서](https://docs.unrealengine.com/ko/Engine/Blueprints/UserGuide/Events/index.html)

> 이벤트가 발생할 때 실행 핀이 활성화된다.

- `BeginPlay`
  - 게임이 실행되자마자 가장 먼저 실행됨
  - 1회 실행
- `Tick`
  - 유니티의 Update() 함수처럼 매 프레임마다 발생하는 이벤트다.
  - <u>Delta seconds</u>를 출력한다.
    - 프레임간의 사이에 경과된 시간을 초 단위로 출력한다. 첫번째 프레임과 두번째 프레임 사이에 20ms가 경과 되었다면 Delta Seconds는 0.02로 출력된다. 
- `Actor Begin Overlap`
  - 유니티에서의 **Trigger 충돌 이벤트**처럼 이 액터가 다른 액터와 겹칠 때 발생하는 이벤트. (물리적 충돌로 튕겨지는게 아니라 통과될 때, 즉 겹칠 때)
- `Any Damage`
  - 나 자신에게 어떤 데미지를 가하는 이벤트가 들어왔을 때
    - **Damage** 👉 들어온 데미지 양을 나타낸다. 
- 키보드/마우스 입력 이벤트
  - ex)
    - `Left Shift` : 이 블루프린트로 만든 액터를 입력 및 조작할 때 `shift` 키보드 입력이 들어 올 때 발생하는 이벤트
    - `Forward Backward` : 이 블루프린트로 만든 액터를 입력 및 조작할 때 매 프레임마다 액터의 Forward Backward 방향 축의 값(float)을 리턴함 
    - `Left Right` : 이 블루프린트로 만든 액터를 입력 및 조작할 때 매 프레임마다 액터의 Left Right 방향 축의 값(float)을 리턴함 
    - `Left Mouse Button` : 이 블루프린트로 만든 액터를 입력 및 조작할 때 마우스 좌클릭 입력시 발생하는 이벤트
- 캐릭터들만 타겟이 되는 이벤트
  - 땅에 착지한다던지 등등 Character 항목 참고

#### 컴포넌트 이벤트

- Collision 
  - Overlapped Actor : 해당 콜리전 컴포넌트 가진 액터
  - Other Actor : 충돌한 다른 액터
  - `On Component Begin Overlap`
    - 호출한 콜리전 컴포넌트에 다른 액터가 겹치기 시작하는 순간에 1 번 발동되는 이벤트이다.
  - `On Component End Overlap`
    - 호출한 콜리전 컴포넌트에 다른 액터가 더 이상 겹치지 않고 빠져나가는 순간에 1 번 발동되는 이벤트이다.

<br>

### 🔔 Input


- 키보드 이벤트
  - 예를들어 `A` 노드를 추가하면 `A` 키보드 키에 대한 레퍼런스 노드가 생성됨. 
- `Enable Input`
  - 기본적으로 언리얼은 액터가 Input을 받아들이는게 비활성화 되어있는 상태라 키보드 입력을 받으려면 이 노드를 추가해 주어야 한다.
    - 컨트롤러로 `Get Player Controller` 리턴값을 연결해주어야 함
- `Disable Input`
  - '타겟'으로 들어온 Actor 의 Player Controller에 대하여 입력을 비활성화 한다.
  - 이 노드를 연결해주면 해당 액터는 더 이상 키보드, 마우스 입력을 받을 수 없다.
- 사용자 지정 입력 축 (Axis Mapping)
  -  Axis Mapping 추가하기
  - 블루프린트창 - 편집 - 프로젝트 세팅 - 입력 - Axis Mappings + 추가 버튼 누르기. 
    - 다음과 같이 추가 (이름은 "LeftRight")
      - ![image](https://user-images.githubusercontent.com/42318591/92319631-7ee45100-f055-11ea-9a60-32ad75ee6beb.png){: width="60%" height="60%"}{: .align-center}
    - A 키를 누르면 Axis Value 로 -1.0 을 리턴하고
    - D 키를 누르면 Axis Value 로 1.0 을 리턴하고
    - **아무 키도 누르지 않으면 Axis Value 는 0.0을 리턴하는**
    - "LeftRight" 이벤트를 이제 노드로 추가할 수 있다!
  - 이런 <u>Axix Mapping 이벤트 노드는 매 프레임마다 실행이 된다</u>
    - 따라서 '누르는 동안' 이런거 구현하기 좋다.
- `Add Movement Input`
  - 캐릭터 같은 `Pawn`의 경우 `SetActorLocation`처럼 트랜스폼 벡터 위치값을 변경해주는 방식이 아닌 이 노드를 사용하여 이동해야 액터끼리의 충돌 처리가 된다.
    - 타겟은 `Pawn`만 연결 가능하다.
  - 입력 값을 리턴하는 핀과 `Scale Value` 핀과 연결해주면 입력에 따라 움직일 수 있게 된다.
  - 현재 위치로부터  `Scale Value`(float)의 크기만큼 `World Direction` 방향으로 이동하게 된다.
    - 보통 `World Direction`에 Normalized 한 방향 벡터를 연결해준다.


<br>

### 🔔 String

- `PrintString`
  - 노드에 적힌 메세지를 화면에 출력한다.
- `Build String` 
  - 문자열로 변환해주고 또한 이를 Append To 문자열에 이를 붙여 준다. 
  - Append To + Prefix + (문자열로 변환하고자 하는 데이터) + Suffix 순으로 붙여진 하나의 문자열을 리턴한다.

<br>

### 🔔 Transform 

- `Set Actor Location`
  - 액터의 트랜스폼 위치를 지정한다
    - 타겟의 위치를 New Location 위치로 지정한다.
- `Set Actor Rotation`
  - 액터의 트랜스폼 회전 값을 지정한다.
    - 타겟의 회전값을 New Rotation 값으로 지정한다.
- `Get Actor Location`
  - 액터의 현재 위치를 리턴한다.
- `Add Actor World Rotation`
  - 해당 값만큼 더하여 회전한다.
- `Make Transform`
  - 트랜스폼을 생성한다. (Location, Rotation, Scale)을 입력으로 받아 하나의 Transform으로 생성 및 리턴
- `Get World Location`
  - 입력 받은 컴포넌트의 위치를 리턴.

<br>

### 🔔 Utility

- `Delay`
  - 지연 시간을 둔다
- `Branch`
  - if 문과 같다. Boolean 타입을 리턴하는 것과 Condition 핀을 연결하고 True, False 에 따라 실행시킬 노드를 연결한다.
- `형변환` `cast`
  - 입력으로 들어온 오브젝트를 해당 유형으로 형변환하여 리턴할 수 있다.
- `Print String`
  - 입력 받은 string을 화면에 출력한다. 
  - ✨디버깅 해볼 때 편리할 것 같다. 노드가 잘 동작하는지!✨
- `Get Display Name`
  - 입력 받은 Object의 이름을 리턴한다.
- `Destroy Actor`
  - 입력 받은 액터를 삭제한다.
- `Actor Has Tag`
  - 입력 받은 액터의 Tag 배열에 해당 원소가 있다면 True 리턴, 없다면 False 리턴.
- `Get All Actors with Tag`
  - 해당 액터 Tag를 가진 **모든 액터들을 배열에 담아** 리턴한다. 
- `IsValid`
  - 오브젝트 레퍼런스를 입력 받은 후 이 레퍼런스가 유효할 때의 출력 실행 핀, 유효하지 않을 때의 출력 실행 핀. 이렇게 두가지의 출력 실행핀을 가진다.
  - 유효 하다 👉 레퍼런스가 참조하는 오브젝트가 존재한다.
  - 유효하지 않는다 👉 레퍼런스가 아무것도 참조하지 않는다.
- `스위치`
  - 입력으로 들어온 **Enum** 변수의 값에 따라 이 Enumeration에 속한 모든 **Enum** 상태들 중, 입력으로 들어온 **Enum** 변수의 값과 일치하는 상태와 연결된 실행 핀 와이어를 실행한다.
- `배열 만들기`
  - 입력 핀으로 원소들을 각각 지정한다.
  - 입력 받은 원소들로 배열을 만든 후 Array 출력 핀으로 이를 출력한다.
- `ForEach`
  - For문 돌릴 배열을 입력 받는다.
  - 입력 받은 배열의 모든 원소들 하나 하나에 대해 반복을 진행한다. 배열의 모든 원소 순회가 끝나면 자연스레 종료 됨.
    - Loop Body : 일반 실행 핀과 동일. foreahc 문이 돌건 말건 반복 시켜 놓고 바로 다음 실행. 
    - Array Element : 매 반복의 원소
    - Array Index : 매 반복의 인덱스 
    - Completed : foreach 문이 다 끝나면 실행 되는 핀
  - `Set Timer by Event`
    - 시간(float)과 호출 시킬 이벤트를 입력 받는다.
    - 시간(Float)을 입력 받아, 해당 시간을 타이머로 하여 **이 시간이 지나고난 후에 입력 받은 이벤트를 호출한다.**
  - `Set Timer by Function Name`
    - 입력 받은 시간이 지나고 난 후에 입력 받은 이름을 가진 함수를 실행한다. 
    - Looping에 체크 했다면 입력 받은 시간 주기마다 해당 함수를 실행시킨다.
  - `Clear Timer by Funcion Name`
    - Timer 를 중지시킨다.
      - 돌아가고 있는 Timer가 있는 Object를 입력으로 받고(안 주면 기본적으로 self. 같은 블루프린트 內) 입력으로 받은 함수 Timer 를 더 이상 돌지 않게 한다. 
- `Get All Actors Of Class`
  - 해당 레벨의 특정 클래스 타입인, 혹은 그 특정 클래스의 자식 타입인 모든 Actor 들을 찾아 배열에 담아 리턴한다.
    - 따라서 레벨에 액터가 많다면 성능에 부하가 생길 것이다.
  - 유니티의 FindObjectOfType 같은 함수인듯 하다.
- `Set Actor Tick Enabled`
  - 입력 받은 액터의 Tick 이벤트를 활성화/비활성화 할 수 있다.
  - 즉, 입력 받은 액터들이 매 프레임마다 하는 기능들을 정지시킬 수 있다.



<br>

### 🔔 Physics

- `Set Simulate Physics`
  - 유니티의 Rigidbody처럼 중력, 마찰력 같은 물리 효과를 적용한다.
  - *Static Mesh Component* 에만 적용할 수 있음

<br>

### 🔔 Collision

- `Set Collision Enabled`
  - 타겟으로 들어온 Collision 컴포넌트를 끌건지 활성화시킬건지 노드에서 결정할 수 있다.
- `Set Actor Enable Collision`
  - 타겟으로 들어온 액터의 모든 컴포넌트를 활성화할건지 비활성화할건지 boolean 타입 입력을 받는다.

<br>

### 🔔 Math

- `Vector + Vector`
  - A + B
    - 어떤 Vector 값을 리턴하는 노드의 실행핀과 연결하면 그게 A 가 되고 `Vector + Vector` 노드에 입력하는 벡터값은 B가 된다.
    - 최종적으로 A + B 두 벡터의 값을 리턴한다.
- `Vector + float`
  - A + B
    - 벡터가 되는 핀과 float이 되는 핀을 각각 연결해와서 결과를 도출해도 되고
    - 연결 되지 않은 피연산자 핀은 입력하면 된다.
- `float >= float`

#### Vector

- `Get Velocity` 
  - 입력 액터의 속도를 Vector3 로 리턴한다.
- `Vector Length`
  - 입력 Vector3 의 스칼라 float 크기를 리턴한다.
- `Lerp` 
  - Vector 간의 선형 보간.
    - A 벡터 값에서 B 벡터 값 사이에서 `alpha` 비율(보통 0~1 사이의 실수)에 해당하는 곳을 리턴
  - `alpha` 값에 `Delta Seconds`를 사용하면 매 프레임마다 부드럽게 A 벡터에서 B 벡터로 변화하게끔 만들 수 있다. 
    - `Delta Seconds`란 현재 프레임과 다음 프레임과의 간격을 초 단위로 표현한 것이다.
      - 프레임간의 간격이 20ms 이라면 `Delta Seconds` 값은 0.02가 된다.
    - 유니티 C# 코드로 따지면 *transform.position = Vector3.Lerp(transform.position, standardPos.position, Time.fixedDeltaTime * smooth);*
      - smooth는 부드럽게 하는 정도를 뜻하겠다. 
  - `Break Vector`
    - Vector를 입력 받아 해당 벡터의 x, y, z 값을 각각 출력한다. 3 가지 float 값으로.
    - x, y, z 값 중 한 두개만 추출하려고 할 때 사용.
    - 말 그대로 벡터를 분해!
  - `Make Vector`
    - 반대로 3 가지 float 값을 입력받아 이 3 가지 값으로 하나의 Vector를 만들어 이를 리턴한다.

<br>

### 🔔 Game

- `GetPlayerController`
  - Player Controller를 리턴하는데 플레이어 컨트롤러는 플레이어에게서 받은 입력을 어떤 동작으로 변환하는 함수성을 구현하는, 사람 플레이어의 의지를 나타낸다
  - 온라인 게임이 아니라면 "Player Index 0" 로컬 플레이어에 대한 컨트롤러가 기본으로 리턴 됨
- `Set View Target with Blend` 
  - ![image](https://user-images.githubusercontent.com/42318591/92445321-2b0d6f80-f1ef-11ea-8643-c9c765380a80.png){: width="80%" height="80%"}{: .align-center}
  - Player Controller 타입의 클래스로, <u>현재의 카메라(혹은 기본 카메라)로부터 다른 카메라로 뷰를 변경하고자 할 때</u> 사용하는 노드이다.
    - **타겟**
      - Player Controller
      - `Get Player Controller` 노드로 "Player Index 0 (로컬 플레이어)" 에 대한 플레이어 컨트롤러를 가져와 연결
    - **New View Target**
      - 변경하고자 하는 뷰를 찍는 카메라를 여기에 연결해주어야 한다.
      - 되고자 하는 뷰를 가진 카메라의 레퍼런스 혹은 카메라를 담고 있는 변수를 여기에 연결해주자.
- `Apply Damage` 
  - 데미지를 가한다.
    - **Damaged Actor** 👉 데미지를 가할 대상. 
    - **Base Damage** 👉 데미지양 
    - **Damage Causer** 👉 데미지를 주는 대상. 
- `Get Game Mode` 
  - 게임 모드 블루프린트를 부모 클래스 GameModeBase로서 가져온다.
- `Open Level`
  - 레벨을 불러오고 열어준다. (LoadScene 같은 느낌)
  - Level Name 에 해당 레벨 이름을 입력하면 그 레벨이 열리게 할 수 있다.
- `Get Game Instance`
  - 현재 할당되어 있는 게임 인스턴스를 불러온다. 
  - 게임 인스턴스 블루프린트는 언리얼에서 싱글톤 같은 개념이며 게임 내내 유지되며 단 하나만 존재할 수 있도록 해준다. 
    - 게임 인스턴스 블루프린트는 프로젝트 세팅 - GameMode 에서 할당할 수 있으며 이 할당해준 게임 인스턴스 블루프린트를 **부모 클래스 GameInstance** 타입으로 불러오게 된다.  할당해준 게임 인스턴스 블루프린트로 호출하려면 형변환이 필요.
- `Create Save Game Object`
  - SaveGame 타입의 블루프린트를 할당해주면 SaveGame 인스턴스를 생성할 수 있다.
- `Save Game Slot`
  - 입력 받은 SaveGame 타입 블루프린트 인스턴스의 변수 혹은 설정 값들을 Slot Name 이름의 로컬 파일로 저장한다.
- `Load Game Slot`
  - Slot Name 이름의 로컬 파일을 SaveGame 타입으로 불러온다.
- `Client Play Camera Shake`
  - 카메라를 진동시킨다.
    - 타겟은 Player Controller
    - Shake 에 CameraShake 부모클래스를 상속 받는 블루프린트를 할당한다.
    - Scale로 카메라 진동 세기를 설정
- `Spawn Actor from Class`
  - 지정한 블루프린트(Class)로 액터를 생성한다.(스폰)
  - Spawn Transform 입력 받아 해당 Transform 을 가진 액터로 생성시킬 수 있다.

<br>

### 🔔 Component

- `Component Has Tag`
  - 입력 받은 컴포넌트의 Tag 배열에 해당 원소가 있다면 True 리턴, 없다면 False 리턴.
- `Get World Location`
  - 입력 받은 컴포넌트의 위치를 리턴.
- `Set World Location`
  - 입력 받은 컴포넌트(타겟)을 입력 받은 Vector인 New Location 위치로 세팅한다.

<br>

### 🔔 Character

- `Jump`
  - 타겟으로 할당된 캐릭터에게 점프를 요청하는 함수
- `Stop Jumping`
  - 타겟으로 할당된 캐릭터에게 점프를 중지하는 함수
- `On Landed`
  - 캐릭터가 낙하 하다가 착지하면 자동으로 발생하는 이벤트
- `isFalling`
  - 타겟으로 할당된 캐릭터가 낙하중이면 True 아니면 False 리턴
- `Launch Character`
  - 타겟으로 들어온 캐릭터를 Lauch Velocity 벡터값 만큼 강제로 이동시킨다.  

<br>

### 🔔 Animation

- `Get Owining Actor` 
  - 이 애니메이션 블루프린트(Animinstance)를 소유하고 있는 액터를 리턴한다. 
- `Play Anim Montage`
  - 애님 몽타주를 재생시킨다.
    - Anim Montage : 재생시킬 애님 몽타주를 할당한다.
    - Return Value : 애님 몽타주 총 재생 길이 초단위로 float으로 리턴한다.
- `Stop Anim Montage`
  - 애님 몽타주를 재생을 멈춘다.
    - Anim Montage에 멈출 애님 몽타주를 할당한다.
- `Try Get Pawn Owner`
  - 이 애니메이션 블루프린트를 가지고 있는 폰을 리턴한다.

#### 애니메이션 블루프린트의 이벤트 그래프에서만 사용할 수 있는 노드

- `Blueprint Update Animation`
  - 애니메이션 블루프린트 에 필요한 값 계산이나 업데이트를 할 수 있도록 하기 위해 매 프레임 실행되는 이벤트.
  - 애니메이션 블루프린트의 `Tick` 같은 이벤트.

<br>

## 🔔 Material

- `Vector Parameter`
  - Material Instance를 만드는데 필요한 파라미터로, 색상 값을 다르게 하는 파라미터다.
  - [참고](https://ansohxxn.github.io/ue4%20lesson%201/ch4-1/#material과-material-innstance)

<br>

## 🔔 User Interface (UI)

- 이벤트
  - `Contruct`
    - BeginPlay 와 같이 이 위젯 블루프린트가 활성화될 때 처음 발생하는 이벤트.
- `Create Widget`
  - 위젯을 생성한다.
  - Player Controller가 HUD를 소유하므로 Player Controller를 Owining Player를 통해 입력 받아야 한다.
  - Class에 생성할 위젯 블루프린트를 할당한다.
- `Add to Viewport`
  - 타겟으로 들어온 위젯 오브젝트를 화면상에 띄운다.
- `Remove from Parent`
  - 타겟으로 들어온 위젯 오브젝트를 부모 위젯으로부터 지운다.
  - 타겟으로 들어온 위젯이 플레이어의 화면 또는 뷰포트에 추가되 있는 경우 지워준다.
    - 타겟으로 들어온 위젯을 완전히 삭제, 제거 한다는 것은 아닌 듯 하며 단순히 위젯이 표시되시 않도록 하는 것 같다.
- `Set Is Enabled`
  - 타겟으로 들어온 위젯을 `Is Is Enabled` 입력 핀으로 들어온 Boolean 값이 True 면 활성화 하고 False 면 비활성화 한다.
- `Play Animation`
  - In Animation으로 들어온 위젯(애니메이션이 있는) 타겟으로 들어온 위젯으로 하여금 그 애니메이션을 재생시킨다. 
  - Num Loops to Play 를 0 으로 해주면 무한 반복 재생한다. 그외에는 재생 횟수가 된다.
- **Progress Bar**
  - `Set Percent`
    - Progress Bar UI 의 값을 설정한다.
    - 이 설정된 값만큼 Progress Bar UI에 채워지게 된다.
    - 최대 값은 1.0 이며 0.0 ~ 1.0 에 해당하는 값이 들어와야 한다. 
- `Get User Widget Object` 
  - 입력 받은 위젯 **컴포넌트**를 오브젝트Object 로서 리턴한다.
  - 오브젝트로서 리턴하는 이유는 컴포넌트가 참조하는 위젯 블루프린트를 Object로 가져오고 본인 타입으로 형변환하여 위젯 블루프린트의 함수나 변수 등을 호출하기 위하여 (컴포넌트 상태로는 못 가져오나보다.)
- **Text**
  - `Set Text`
  - `Set XScale`, `Set YScale` 👉 Text Render 컴포넌트의 크기 설정 함수
- **여러 Slate들**
  - `Set 슬레이트이름`

### Slate 

> 언리얼 공식 문서에 따르면 `Slate`란 언리얼의 커스텀 UI 프레임워크다. UI 모듈과 같다.

![image](https://user-images.githubusercontent.com/42318591/100496733-c0d6ec00-3199-11eb-9290-22b0928e4edd.png)

**UI 요소의 디테일 패널에서 볼 수 있는 사진 속 각각의 모듈들이 Slate 이다.** 이미지 UI 요소엔 이렇게 `Brush`라는 **<u>Slate</u>** 가 있다. 이 `Brush` Slate의 `Image`에서 이미지 파일을 설정할 수 있기 때문에 따로 `Brush` Slate 를 만들어서 이 `Image_BossPic`의 Slate로 적용시켜줄 것이다~!

#### Make Slate뫄뫄

[출처 포스트](https://ansohxxn.github.io/ue4%20lesson%201/ch10-3/)

![image](https://user-images.githubusercontent.com/42318591/100496412-4016f080-3197-11eb-9b24-5cc1a8afeeb1.png)

- `Change Boss Image`라는 함수를 만든다. 이 함수는 *Texture 2D* 타입의 `Boss Texture` 매개 변수를 가지도록 설정해주었다. 
  - *Texture 2D* 타입 변수는 이미지 파일 (.png)를 참조한다.
  - 우선 **<u>Brush Slate</u>**를 만든다. ***(Make SlateBrush)***
    - `Image`에 파라미터로 들어온 `Boss Texture` 매개 변수값을 연결해준다. 
  - 방금 만든 이 Brush Slate를 보스 이미지 `Image_BossPic`의 Brush Slate로 세팅해준다.***(Set Brush)***

`Change Boss Image`라는 함수가 실행되면 파라미터로 받은 이미지 파일을 `Image_BossPic` 이미지 UI 요소의 Brush 슬레이트의 Image에 설정한다. 




<br>

## 🔔 Player Controller

- `Set Show Mouse Cursor`
  - Player Controller를 입력으로 받으며, 마우스 커서를 보이게 할건지 아닌지를 설정할 수 있다. 

<br>

## 🔔 Development

- `Execute Console Command `
  - 콘솔 명령을 실행하는 노드이다. Command에 실행할 명령어를 입력하면 된다.
  - EXIT 을 실행하게 하여 게임을 종료시킬 수 있다.

<br>

## 🔔 Audio

- `Play Sound at Location` 
  - 거리를 고려하여 사운드를 재생한다. 즉 3D로 재생한다.
  - 거리가 멀면 작게 들리고 거리가 멀면 크게 들린다.
- `Play Sound 2D`
  - 거리를 고려하지 않고 사운드를 재생한다.
  - 주로 UI 소리 같은 것을 재생할 때 사용한다.

<br>

## 🔔 Particle System

- `Spawn Emitter Attached` 👉 파티클 시스템을 생성
  - Emitter Emplate
    -  생성할 파티클 시스템 파일
  - Attach to Component
    - 어떤 컴포넌트에 생성시킬 것인지.
      - 예를 들어 CapsuleComponent 즉, 몬스터의 전체적인 캡슐 콜리전을 할당해 주면 👉 CapsuleComponent 의 기준점 위치에서 파티클 시스템이 생성 됨
- `Activate` 
  - 타겟으로 들어온 파티클 시스템 재생
- `Deactivate` 
  - 타겟으로 들어온 파티클 시스템 정지

<br>

## 🔔 Timeline

키를 만들어 간단한 애니메이션 구현 가능한 노드. [Timeline]() 포스트 참고.

<br>

## 🔔 Cinematic Sequence

- `Create Level Sequence Player`
  - 레벨 시퀀스를 재생하기 위해선 우선 만들어 둔 레벨 시퀀스를 생성해야 한다.
- `Play`
  - 위에서 생성한 레벨 시퀀스를 타겟으로 하여 영상 재생
- `Get Length`
  - 입력 받은 Level Sequence Player 의 전체 영상 길이를 float 로 리턴한다.
  - 해당 시퀀스 시간을 구할 수 있다.

<br>

## 🔔 Rendering 

- `Set Actor Hidden in Game`
  - 입력으로 받은 액터를 렌더링 하지 않는다. 즉 보이지 않게 한다.
- `Toggle Visibility`
  - 입력으로 받은 컴포넌트의 Visible 값을 전환시킨다. 
    - Visible 값이 체크 해제 상태였다면 체크하여 보이게 하고, Visible 값이 체크 상태였다면 해제하여 안보이게 한다.
  - `Toggle`은 On/Off 이렇게 2 가지 값만 가진 스위치를 뜻한다. 
  - 따라서 토글은 상황이 오직 두가지 밖에 없기 때문에 토글을 실행만 해도 상태가 전환된다. Off 상태였다면 On 으로, On 상태였다면 Off 로.
    - Caps Lock 같은 것도 일종의 토글 스위치다. 체크 박스 같은 것도!


***
<br>

    🌜 개인 공부 기록용 블로그입니다. 오류나 틀린 부분이 있을 경우 
    언제든지 댓글 혹은 메일로 지적해주시면 감사하겠습니다! 😄

[맨 위로 이동하기](#){: .btn .btn--primary }{: .align-right}