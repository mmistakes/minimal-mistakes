---
title:  "Unity C# > 컴포넌트 : Rigidbody 와 프로퍼티/함수 모음" 

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

# 👩‍🦰 Rigidbody

오브젝트에 <u>현실적이고 사실적인 물리 기능</u>을 추가해준다.

## 🚀 에디터 

  - `Use Gravity` 체크 해제하면 중력 영향 안받게 됨
- 중력 말고도 질량, 마찰력 등등 현실 세계에 존재하는 물리적인 힘들 설정 가능. 
  -  `Is Kinematic`가 체크가 되어 있다면!! 중력은 물론이고 모든 물리적인 힘들을 받지 않게 된다.
- <u>Collider에 물리학을 입힌다.</u>
- `Constraints`로 특정 축으로는 이동, 회전 안되게 제한할 수 있다.
- `Mass` 질량
  - 질량이 클수록 무거워서 물리적인 힘을 덜 받는다. 
- `Drag` 저항
  - 0 이면 저항이 없어 무중력 상태와 같고
  - 1 이면 지구와 비슷한 환경의 저항
  - 10 정도면 달과 같은 환경
- `Angular drag` 밀리는 정도
  - 크면 클 수록 물리적인 힘에 의해 밀려나는 정도가 덜 하다

<br>

## 🚀 변수/프로퍼티

### ✈ velocity

  - 현재 속도. Vector3 벡터이다.
    - 이 `velocity`를 사용해 속도 벡터를 직접 인위적으로 설정해주면 `velocity`만큼 움직이게 된다. 
  - cf) 점프를 구현할 땐 AddForce 함수보단 `velocity`를 사용하는게 낫다.
    - `AddForce` 함수로 Vector.up 방향으로 힘을 주어 점프를 하게 한다면 위의 힘을 서서히 받아 지수 그래프 모양으로 움직이기 때문에 점프가 순간적으로 되지 않는다. 서서히 위로 올라가는 그림으로 연출된다. 
    - 반면에 `velocity`값을 수정 해주면 인위적으로 수정한 `velocity` 벡터 값 만큼 순간적으로 이동하게 되므로 점프 같이 순간적으로 바로 이동해야 하는 것을 구현하기에 딱이다.
      - 순간적으로 `velocity` 만큼 이동(점프)한 후에는, Rigidbody 답게 중력에 의하여 서서히 떨어지게 된다. `velocity` 벡터 값도 이제는 중력 같은 물리적인 현상 아래에 있게 되므로 점프를 하고 난 다음에는 `velocity` 벡터 값이 중력 가속도 등의 영향을 받아 알아서 물리적인 현상에 의해 바뀌게 된다.


<br>

### ✈ useGravity

중력을 쓸지 말지 체크, 체크 해제 할 수 있다. Boolean 타입.

<br>

## 🚀 함수

### ✈ Addforce

> public void AddForce(Vector3 force, ForceMode mode = ForceMode.Force);

  - 오브젝트가 x, y, z 축 방향으로 물리적인 힘을 받도록 한다. 
  - 힘의 정도를 매개변수로 받아서 관성, 마찰력, 중력 등등 여러가지를 고려해서 내부적으로 계산한 힘을 처리한다.

<br>

### ✈ AddExplosionForce

> public void AddExplosionForce(float explosionForce, Vector3 explosionPosition, float explosionRadius, float upwardsModifier = 0.0f, ForceMode mode = ForceMode.Force));

  - 매개변수로 넘겨받은 정보를 가지고 폭발에 대한 물리처리를 해준다. 폭발 시키기!
  - 첫번째 매개변수 : 폭발력
  - 두번째 매개변수 : 폭발 지점
  - 세번째 매개변수 : 폭발 반경 반지름

<br>

### ✈ MovePosition

> public void MovePosition(Vector3 position);

- 인수로 들어온 그 위치로 이동한다.

<br>

### ✈ MoveRotation

> public void MoveRotation(Quaternion rot);

- 인수로 들어온 그 회전값이 되게끔 회전한다.

***
<br>

    🌜 개인 공부 기록용 블로그입니다. 오류나 틀린 부분이 있을 경우 
    언제든지 댓글 혹은 메일로 지적해주시면 감사하겠습니다! 😄

[맨 위로 이동하기](#){: .btn .btn--primary }{: .align-right}