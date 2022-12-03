---
title:  "Unity C# > 컴포넌트 : Transform 와 프로퍼티/함수 모음" 

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

# 👩‍🦰 Transform

> 오브젝트의 위치, 회전, 크기를 나타내는 컴포넌트다.

- 오브젝트를 생성하면 기본으로 붙어있는 디폴트 컴포넌트다.
  - `Transform myTransform`하고 변수 선언을 해준 후 `myTransform.Rotate()` 이런식으로 쓰는 일반적인 방법도 있긴 하지만 Transform 컴포넌트는 모든 오브젝트들이 디폴트로 갖고 있는 컴포넌트기 때문에 그냥 변수 선언 없이 `transform` 소문자 transform으로 바로 사용하는게 가능하다. `transform.Rotate()` 이런 식으로.
  
    - 함수 `SetParent(부모 Transform)` 로 부모 오브젝트를 지정해줄 수 있다.
      ```c#
      effect.transform.SetParent(parent);
      ```

- ![image](https://user-images.githubusercontent.com/42318591/93081328-1424bc80-f6ca-11ea-8a48-f79355216c04.png){: width="60%" height="60%"}

- 만약 오브젝트가 회전해 있는 상태여서 위치 축이 월드 좌표 축과 일치하지 않는다면 오브젝트의 위쪽 방향과 절대 적인 위쪽 방향은 다르다.

> Transform 타입의 오브젝트를 대상으로 하면 그 오브젝트의 자식들을 순회할 수 있다.

```c#
foreach(Transform tf_Child in transform)
{
      Material [] newMaterials = new Material[tf_Child.GetComponent<Renderer>().materials.Length];

      for (int i = 0; i < newMaterials.Length; i++)
      {
          newMaterials[i] = mat;
      }

      tf_Child.GetComponent<Renderer>().materials = newMaterials;
}
```

이 스크립트가 붙은 오브젝트를 Transform 타입으로 참조(`transform`)한 후 이를 순회하면 Transform 타입으로 <u>자식 오브젝트들에게 접근할 수 있다.</u>

이렇게 `transform`을 foreach 문에서 순회할 수 있는 이유는, 그리고 자식 오브젝트들을 순회할 수 있는 이유는 <u>Transform 컴포넌트가 enumerator를 지원하기 때문이다.</u> foreach문을 객체에 대해서 순회하려면 그 객체는 GetEnumerator() 함수를 지원해야 한다. 자세한 이유는 [링크 참고](https://ansohxxn.github.io/c%20sharp/enumerate/)


## 🚀 변수/프로퍼티

### ✈ position, rotation, scale

- 오브젝트의 `position`, `rotation`, `scale` 는 월드 좌표계 위치, 회전, 크기를 담당한다. 
  - `transform.position = Vector3(...)` 이런 식은 현재 위치와 상관 없이 오브젝트의 월드 좌표계 위치를 바꿔버리는 셈이 된다.

<br>

### ✈ localPosition, localRotation, localScale

- `localPosition`, `localRotation`, `localScale`은 Local좌표계에서의 위치. 부모로부터 떨어진 거리. 부모를 기준으로 한 회전 값. 부모를 기준으로 한 싱대적 크기.

<br>

### ✈ forward, right, left, backward

- `transform.forward` : 월드 기준에서 오브젝트 입장에서의 ***앞 쪽*** (월드 기준 z 축) 을 향하는 <u>방향 벡터</u> (길이가 1인)
  - 오브젝트의 로컬 z 축 기준에서의 양의 방향 벡터
- `transform.right` : 월드 기준에서 오브젝트의 입장에서의 ***오른 쪽*** (월드 기준 x 축) 을 향하는 <u>방향 벡터</u> (길이가 1인)


<br>

### ✈ parent

- ✨ <u>부모 자식 관계</u> 또한 Transform이 관리한다.
  - `transform.parent` : 내 부모 오브젝트를 뜻한다.

<br>

### ✈ eulerAngles

- `eulerAngles`
  ```c#
  transform.eulerAngles = new Vector3(0.0f, _yAngle, 0.0f);  // Y 축으로 _yAngle 각도 만큼 회전한다.
  ```
  - 오일러 각도의 회전 값을 나타내며 Vector3 를 사용해 회전 값을 설정할 수 있다.
  - 📢 주의 사항
    - 밑에 코드와 같이 절대적인 회전 Vector3 값으로 설정하는 것이 아닌, 이만큼 더 회전해라! 하는 델타 값 의미로 `eulerAngles`에 Vector3를 더하고 빼주는건 안된다.
    - 오일러 각도는 360도를 넘어가면 값의 계산에 실패하기 때문에 `eulerAngles`를 얼만큼 더 회전할지의 델타 회전값으로 사용하는 것은 권장하지 않는다.
      ```c#
      transform.eulerAngles += new Vector3(0.0f, _yAngle, 0.0f);  // '+=' ❌❌❌
      ```


<br>

## 🚀 함수

### ✈ Translate

> public void Translate(Vector3 translation, Space relativeTo = Space.Self);

- 매개변수로 들어온 현재 위치로부터 해당 벡터만큼 평행이동 시킨다. <u>상대적인 이동</u>
- <u>상대적인 벡터의 방향으로</u> 평행 이동 한다.
  - 예를 들어 인수로 들어온 Vector3의 방향이 Vector3.forward 라면 절대적인 월드 좌표계 기준에서의 forward 방향이 아니라 자신을 기준으로 한 forward 방향힘을 나타낸다.
- 기본적으로 Local 좌표계를 기준으로 평행이동한다. (Space.Self가 디폴트)
- `Translate(Vector3), Space.World)`
  - Translate 함수 매개변수로 Space.World를 넘기면 Global 좌표계를 기준으로 평행이동한다.
  - 매개변수 디폴트 값은 Space.self (Local)
    - Translate, Rotate함수는 `Local`인 반면 그냥 바로 변수로 접근하는 `position`, `rotation`같은 것들은 `Global`좌표계 기준이다.
      - 다만 부모가 있는 자식 오브젝트라면 `Local`임

<br>

### ✈ Rotate

> public void Rotate(Vector3 eulerAngles, Space relativeTo = Space.Self);

- <u>현재 회전에서</u> 매개변수로 들어온 상대적인 Vector3만큼 <u>더</u> x, y, z 방향으로 각각 a, b, c도 만큼 <u>회전</u>을 시킨다.
- Translate과 마찬가지로 Space.Self가 디폴트라 로컬 좌표계를 기준으로 회전한다.

<br>

### ✈ RotateAround

> public void RotateAround(Vector3 point, Vector3 axis, float angle);

이 함수는 <u>공전</u>과 잘 어울린다. `point`지점을 지나는 `axis`축을 기준으로 `angle`만큼 회전한다. 

```c#
void Update()
{
    earth.RotateAround(sun.position, Vector3.up, 90f * Time.deltaTime);
}
```

예를 들어 지구가 태양을 공전하게 하고 싶다면 위와 같이 짤 수 있을 것 같다. 지구는 태양의 Y 축을 기준으로 1초에 90도씩 회전한다. 

```c#
fakeCube.RotateAround(transform.position, rotDir, spinSpeed); //공전
``` 

`fakeCube`라는 오브젝트가 내 위치에서의 `rotDit`을 기준으로 1 프레임 당 `spinSpeed` 각도만큼 회전.

<br>

### ✈ SetParent

> public void SetParent(Transform parent, bool worldPositionStays);

- 함수 `SetParent(부모 Transform)` 로 부모 오브젝트를 지정해줄 수 있다.
  ```c#
  effect.transform.SetParent(parent);
  ```

<br>

### ✈ TransformDirection

> public Vector3 TransformDirection(Vector3 direction);

```c#
Vector3 pos = transform.TransformDirection(Vector3.forward); // 내 로컬 좌표로서의 (0, 0, 1) 로컬 좌표 위치를 월드 좌표계 기준으로 변환하여 리턴해준다.
```
  
  - 인수로 받은 좌표 Vector3 를 *로컬 좌표계 기준에서 월드 좌표계 기준으로*  방향만 변환하여 이를 리턴해준다.(벡터 길이는 변하지 않음)
  - `transform.TransformDirection(Vector3.forward)`와 `transform.forward` 는 같다.


<br>

### ✈ GetChild

> public Transform GetChild(int index);

```c#
Transform tf_child = trnasform.GetChild(1); // 두 번째 자식 리턴받기
```

직속 자식들 중 `index`에 해당하는 `index + 1` 번 째 오브젝트의 Transform 을 리턴 함.

<br>

### ✈ InverseTransformDirection

> public Vector3 InverseTransformDirection(Vector3 direction);
  
- 인수로 받은 좌표 Vector3 를 *월드 좌표계 기준에서 로컬 좌표계 기준으로*  방향만 변환하여 이를 리턴해준다.(벡터 길이는 변하지 않음)

<br>

### ✈ LookAt

> public void LookAt(Transform target, Vector3 worldUp = Vector3.up);

```c#
transform.LookAt(_player.transform);
```

인수로 들어온 해당 Vector3 위치값을 바라보게끔 회전시킨다. `Quaternion.LookRotation` 함수는 회전시키는 것이 아닌, 해당 방향을 바라보게끔 회전하려면 얼만큼 회전해야하는지 그 회전값을 리턴해주는 함수고 `Transform`의 `LookAt`은 <u>직접 인수로 들어온 그 '위치'를 바라보게끔 회전시킨다.</u>

***
<br>

    🌜 개인 공부 기록용 블로그입니다. 오류나 틀린 부분이 있을 경우 
    언제든지 댓글 혹은 메일로 지적해주시면 감사하겠습니다! 😄

[맨 위로 이동하기](#){: .btn .btn--primary }{: .align-right}