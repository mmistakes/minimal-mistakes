---
title:  "Unity C# > 컴포넌트 : NavMeshAgent 와 프로퍼티/함수 모음" 

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

# 👩‍🦰 NavMeshAgent

> `AI`로 이 컴포넌트를 오브젝트에 붙이면 해당 오브젝트가 목표까지 최단 거리를 계산해 추적하는 역할을 하며 충돌을 회피하는 기능을 제공한다. 

- 지나갈 수 있는 영역과 없는 영역을 미리 구워 놔서 `NavMesh` 데이터들을 만들어 놔야 한다. 

![image](https://user-images.githubusercontent.com/42318591/95546570-ea965100-0a3b-11eb-9568-8632804a72c5.png)

원기둥 같은 이 영역의 크기를 기준으로 돼지가 통과할 수 있는 곳 인지를 연산하게 된다. 이 원기둥이 돼지의 `Nav Mesh Agent` 이다.

![image](https://user-images.githubusercontent.com/42318591/95546698-3ea13580-0a3c-11eb-9995-11cc7184a57d.png)

<br>

## 🚀 에디터

- Base Offset 
  - `Nav Mesh Agent`이 Y 축 방향 위치. 
- Radius
  - `Nav Mesh Agent` 반지름
- Height
  - `Nav Mesh Agent` 높이


## 🚀 변수/프로퍼티

### ✈ radius

- Agent의 반경
- 이 반경을  Agent들간의 충돌을 계산할 수도 있고 장애물을 어떻게 돌아갈 것인지에 계산될 수 있다.

<br>

### ✈ stoppingDistance

- Agent가 목표를 추적하다가 목표 위치에 가까워졌을시 서서히 정지하는 근접 거리.

<br>

### ✈ speed

- Agent의 최대 이동 속도

<br>

### ✈ remainingDistance

- 현재 경로에서 목표 지점까지 남아있는 거리

<br>

### ✈ desiredVelocity

- NavMeshAgent의 `desiredVelocity`은 음 목적지로 향하는 목표 속도를 나타낸다. 실제 속도는 아님! 현재 속도로 설정하고 싶은 원하는 속도 값. `desiredVelocity` 속도로 움직이게 하고 싶지만 실제론 관성이나 어떤 장애물에 의해 실제 속도(`velocity`)와는 차이가 날 수 있다.
  - 예를 들어 우리가 원하는 속도가 50인데 현재 캐릭터가 장애물에 막혀 제자리에서 뛰고 있다면 속도는 실제로는 0 이다.

<br>

### ✈ isStopped

- True 해주면 Agent는 움직임을 멈추고 정지.
- False 해주면 멈췄었던 Agent가 다시 움직임.

<br>

### ✈ enabled

- false 하면 AI 추적을 중지하고 내비메쉬 컴포넌트를 비활성화
  - true 하면 AI 추적 시작하고 내비메쉬 컴포넌트를 활성화
  - `isStopped`과의 차이
    - <u>Nav Mesh Agent들끼리는 내비게이션 추적에 있어 서로를 장애물로 인식하고 피하고 다니기 때문에</u> 완전히 비활성화 해주지 않고 그냥 추적만 멈추는 `isStopped = true`를 사용해주게 되면 나중에 좀비가 많이 죽었을 때 쓸데없이 크게 돌아와야 하기 때문에 이런 경우에는 아예 `enabled = false`를 통해 완전히 비활성화 해주는 것이 좋다.

<br>



## 🚀 함수

### ✈ Move

> public void Move(Vector3 offset);

- 파라미터 만큼 이동한다. (상대적 이동)
- NavMesh 로 구워진 갈 수 있는 경로 내에서만 이동하게 된다.
- 그렇게까지 정밀하게 이동되진 않는다.

<u>NavMeshAgent를 붙여서 이동하는 방식은 기본적으로 Agent들은 서로 피해가도록 되어 있어 너무 인접하게 붙으면 의도치 않게 상대를 밀치기도 한다.</u> Obstacle Avoidance 속성 때문이다. 이를 해결하는 방법 중 하나는 NavMeshAgent 의 *Move* 를 사용하지 않고 레이저를 쏴서 이동 가능한지를 확인 한 후 일반적인 플레이어 위치 세팅으로 이동을 하는 것이다. *-출처 : Rookiss님 답변-*

<br>

### ✈ SetDestination

> public bool SetDestination(Vector3 target);

- 목표 위치를 인수로 넘기면 agent가 해당 목표 지점까지 움직이게 하는 함수.
- <u>인수로 들어간 Vector3 를 목적지</u>로 하여 그 위치로 `Nav Mesh Agent`가 붙어있는 오브젝트가 이동하게 한다. 
- 해당 목적지로 이동하기 위해 새로운 Path 경로를 최단경로로 찾아 설정한다. 
- <u>이 함수를 사용하면 회전도 자동으로 이루어진다.</u> 목적지를 바라보도록 자연스럽게 회전도 같이 이루어짐.
- 해당 목적지로 갈 수 있는 <u>최단 경로로 이동한다.</u>
  - Bake 한 지형들을 바탕으로 해당 목적지까지의 최단 경로를 계산 함. 
- `Nav Mesh Agent` 컴포넌트에 속성으로 있는 최대 이동 속도 `Speed`, 회전 속도 `Angular Speed` 값을 <u>속도</u>로 하여 목적지로 알아서 이동한다.

<u>Rigidbody 보다 Nav Mesh Agent 가 우선시 되기 때문에</u>,  Nav Mesh Agent 컴포넌트가 붙게 되면 **더 이상 rigid.MovePosition, rigid.MoveRotation 함수로 이동, 회전 할 수 없게 된다.** ⭐이 Rigidbody 함수들이 freeze 되어 먹히지 않는다.⭐ <u>따라서 돼지를 Nav Mesh Agent 전용 이동 함수를 사용하여 이동시켜야 한다.</u> 👉 **SetDestination(Vector3)**


<br>

### ✈ ResetPath

> public void ResetPath();

- SetDestination(Vector3) 함수로 인하여 현재 설정되어 있던 경로를 지운다. 
  - 이에 따라, <u>현재 이동중이었다면 이동을 멈추게 된다.</u>
- 해당 `Nav Mesh Agent`는 새로운 SetDestination(Vector3) 호출이 있을 때까지 경로를 찾지 않는다. 이동도 하지 않는다.

<br>

### ✈ CalculatePath

> public bool CalculatePath(Vector3 targetPosition, NavMeshPath path);

> Nav Mesh Agent 는 최단 경로로 목적지에 도달하려고 한다. 

- 출발지는 필수 인수는 아닌듯 하다. Raycast 처럼 오버로딩 종류 여러가지임.

```c#
        NavMeshPath _path = new NavMeshPath();
        nav.CalculatePath(_targetPos, _path);
```

- Nav Mesh Agent 의 *CalculatePath* 함수
  - Nav Mesh Agent 위치로부터 목적지 `_targetPos`까지의 최단 경로를 계산한 후
  - `Nav Mesh Path` 타입의 데이터 `_path`에 <u>최단 경로의 코너(정점)들을 배열로 저장한다.</u>
    - 정확히는 `_path.corners` 배열에 최단 경로의 코너들의 위치 벡터가 저장됨
      - 단, 출발지와 목적지는 저장되지 않는다.
  - 최단 경로 코너들을 저장하기 위해선 `Nav Mesh Path` 타입의 객체를 미리 생성해주어야 한다.

![image](https://user-images.githubusercontent.com/42318591/95650785-b21c7300-0b20-11eb-839e-54001ae8ac81.png)

Nav Mesh Agent 는 갈 수 있는 지형을 판단하고 연산한 Bake 된 지형에만 갈 수 있다. 그림 속 가운데 장애물을 갈 수 없다면 Nav Mesh Agent 는 <u>돌아가야 하며 이를 감안한 최단 경로를 찾는다.</u>

- *CalculatePath* 함수
  - 최단 경로를 구한다.
  - 연산된 최단 경로에서 꺾이는 부분의 위치 벡터들을 `Nav Mesh Path` 타입의 객체의 `corners` 멤버 배열에 저장한다. 
    - 즉, 길을 저장함
- 그림과 같이 꺾이는 두 부분의 좌표가 `corners` 배열에 저장 된다.

> `bool`을 리턴한다.

```c#
            NavMeshPath path = new NavMeshPath();
            if (nma.CalculatePath(randPos, path))
                break;
```

목적지가 갈 수 있는 곳이라면 `true`, 갈 수 없는 지역이라면 `false`를 리턴한다. 이를 통해 조건문 안에서 쓸 수도 있다!



***
<br>

    🌜 개인 공부 기록용 블로그입니다. 오류나 틀린 부분이 있을 경우 
    언제든지 댓글 혹은 메일로 지적해주시면 감사하겠습니다! 😄

[맨 위로 이동하기](#){: .btn .btn--primary }{: .align-right}