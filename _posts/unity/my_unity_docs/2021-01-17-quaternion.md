---
title:  "Unity C# > UnityEngine : Quaternion" 

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


# 👩‍🦰 Quaternion

> 쿼터니언과 관련된 함수들 집합. `3차원 회전`을 위한 함수.

## 🚀 변수/프로퍼티

### ✈ eulerAngles

  - 쿼터니언을 오일러각으로 변환시킨다. 즉 Vector3로 변환한다. 
    - Quaternion.Euler(Vector3)와 반대.
  - 오일러 각도의 회전 값을 나타내며 Vector3 를 사용해 회전 값을 설정할 수 있다.
  - 📢 주의 사항
    - 밑에 코드와 같이 절대적인 회전 Vector3 값으로 설정하는 것이 아닌, 이만큼 더 회전해라! 하는 델타 값 의미로 `eulerAngles`에 Vector3를 더하고 빼주는건 안된다.
    - <u>오일러 각도는 360도를 넘어가면 값의 계산에 실패하기 때문에</u> `eulerAngles`를 얼만큼 더 회전할지의 델타 회전값으로 `+=` 사용하는 것은 권장하지 않는다.
      ```c#
      transform.eulerAngles += new Vector3(0.0f, _yAngle, 0.0f);  // '+=' ❌❌❌
      ``` 
  - 월드 좌표 회전값
  - x, y, z 방향으로 얼마큼 회전 할 것인지

<br>

### ✈ localEulerAngles

  - 쿼터니언을 오일러각으로 변환시킨다. 즉 Vector3로 변환한다. 
  - 로컬 회전값

<br>

### ✈ identity

  - `static` 프로퍼티다.
  - 0도, 0도, 0도로 회전한 쿼터니언 값.

<br>


## 🚀 함수

### ✈ Euler

> public static Quaternion Euler(float x, float y, float z);

- 매개변수로 받은 Vector3를 Quaternion타입으로 변환하여 리턴해주는 함수

인수로 받은 Vector3 를 쿼터니언으로 변환하고 이를 리턴해준다. Euler() 함수로 Vector3를 쿼터니언으로 변환하면, 쿼터니언 타입은 `transform.rotation`에 할당이 가능해진다.

```c#
transform.rotation = Quaternion.Euler(new Vector3(0.0f, _yAngle, 0.0f));
```

<br>

### ✈ LookRotation

> public static Quaternion LookRotation(Vector3 forward, Vector3 upwards = Vector3.up);

  - 벡터를 매개변수로 넣어주면 오브젝트가 그 벡터의 방향을 쳐다보게끔 자기 자신의 방향을 회전한다.
  - 현재 위치좌표에서 매개변수로 들어온 <u>벡터만큼 더한 목적지 위치 좌표를 바라보게</u> 된다. 
    - 따라서 `벡터의 뺄셈`으로 `목적지 위치좌표 - 출발지 위치좌표` 해주어 필요한 방향과 거리를 나타낼 벡터를 구해주는 것이 좋다. 그리고 매개변수로 넘기기.

우리가 원하는 방향을 쳐다 보는 회전 값을 쿼터니언으로 리턴한다. Vector3를 인수로 넘기면 인수로 넘긴 Vector3의 방향을 쳐다보는 회전값(쿼터니언)을 리턴한다.

```c#
        if (Input.GetKey(KeyCode.S))
        {
            transform.rotation = Quaternion.LookRotation(Vector3.back);
        }
```

`S`키를 누르면 Vector3.back 방향을 바라보는 회전 상태를 쿼터니언으로 반환한다. 이를 `transform.rotation`으로 설정하면 그 방향으로 오브젝트가 회전할 것이다.


<br>

### ✈ Lerp

> public static Quaternion Lerp(Quaternion a, Quaternion b, float t);

  - 두 개의 회전 값(Vector3)을 정하면 float 비율만큼의 적당한 회전값을 리턴
  - `Quaternion.Lerp(aRotation, bRotation, 0.5f);`
  - `0.5f`면 딱 중간
  - `1.0f`면 bRotation을 그대로 따름
  - `0.0f`면 aRotation을 그대로 따름
  - `0.2f`면 aRotation에 좀 더 가깝게 회전

<br>

### ✈ Slerp

> public static Quaternion Slerp(Quaternion a, Quaternion b, float t);

A 에서 B 까지 0.0 ~ 1.0 퍼센트 비율로 보간. Lerp 와 같다!

- 🎈 Lerp 와의 차이점
  - Lerp 
    - 선형 보간법
  - **Slerp** 
    - 구면 선형 보간법
    - <u>회전이나 방향을 보간할 때 주로 쓰인다.</u>

Lerp와 마찬가지로 좀 더 부드럽게 회전시킬 수 있다. A 벡터와 B 벡터 사이를 `t` 퍼센트로 보간한 결과를 쿼터니언으로 리턴한다.

```c#
transform.rotation = Quaternion.Slerp(transform.rotation, Quaternion.LookRotation(Vector3.forward), Time.time * speed);
```

<br>

### ✈ AngleAxis

> public static Quaternion AngleAxis(float angle, Vector3 axis);

![image](https://user-images.githubusercontent.com/42318591/91792755-40175b00-ec51-11ea-84b5-5537a296cdc3.png)

- 축 axis 주위를 angle 만큼 회전한 rotation을 생성하고 리턴한다.
  - 예를 들어 중심 축이 되는 `axis`가 y 축이라면 회전 값이 y 값은 변하지않고 x, z 값만 변한다.


<br>

### ✈ RotateTowards

> public static Quaternion RotateTowards(Quaternion from, Quaternion to, float maxDegreesDelta);


현재의 쿼터니언 회전값 `from`에서 목표 회전값 `to`까지 `maxDegreesDelta`의 속도로 회전한 결과인 **Quaternion 를 리턴**한다.

```c#
realCube.rotation = Quaternion.RotateTowards(realCube.rotation, destRot, spinSpeed * Time.deltaTime);
```


***
<br>

    🌜 개인 공부 기록용 블로그입니다. 오류나 틀린 부분이 있을 경우 
    언제든지 댓글 혹은 메일로 지적해주시면 감사하겠습니다! 😄

[맨 위로 이동하기](#){: .btn .btn--primary }{: .align-right}