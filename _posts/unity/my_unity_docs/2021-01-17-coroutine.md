---
title:  "Unity C# > 코루틴 관련 함수, YieldInstruction" 

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

## 🚀 UnityEngine.Coroutine

`co` 객체는 *UnityEngine.Coroutine* 타입으로, 단순히 *StopCoroutine*의 인수로 넘겨 코루틴을 종료시키기 위해 존재하는 타입이다. 

![image](https://user-images.githubusercontent.com/42318591/104106215-8bc0cc00-52f7-11eb-9e68-dd007869b731.png)

![image](https://user-images.githubusercontent.com/42318591/104106222-967b6100-52f7-11eb-8fc2-a7c7060a7d63.png)

- *StartCoroutine* 👉 `Coroutine` 타입의 객체를 리턴한다. 
  - 오버로딩 매개 변수
    - IEnumerator : IEnumerator 리턴하는 코루틴 함수 **리턴값**
      - *StartCoroutine(CoExplodeAfterSeconds(4.0f));*
    - String : IEnumerator 리턴하는 코루틴 함수의 **이름**
      - 함수의 인수는 0~1개밖에 못 넘긴다는 제약 사항
      - 이름으로 함수를 찾기 때문에 성능이 저하될 수 있다고 한다.
      - *StartCoroutine("CoExplodeAfterSeconds", 4.0f);*

![image](https://user-images.githubusercontent.com/42318591/104106229-9da26f00-52f7-11eb-8fe0-3ddc9291b79c.png)

- *StartCoroutine* 👉 `Coroutine` 타입을 파라미터로 받는 오버로딩도 있다.
  - *StartCoroutine*을 실행시켜 리턴받은 `Coroutine`객체를 *StartCoroutine*에 넘기면 해당 코루틴 함수를 중지시킬 수 있다.
  - 이렇게 `Coroutine`은 *StartCoroutine*에 넘기려는 용도로밖에 사용이 안된다. 


```c#
    IEnumerator CoStopExplode(float seconds)
    {
        Debug.Log("Stop Enter");
        //WaitForSeconds 인식하고 seconds 만큼 대기하고 호출한곳 갔다가 다시 돌아옴
        yield return new WaitForSeconds(seconds);
        Debug.Log("Stop Execute");
        if (co != null) // 무언가 실행 중이라면
        {
            StopCoroutine(co);
            co = null;
        }
    }
```

- 근데 위와 같이도 사용이 가능한 것 같다. 
  - `Coroutine` 객체 `co`가 null 이 아니라는 것은 현재 어떤 코루틴 함수가 실행 중이라는 뜻이나 마찬가지다.
    - *if (co != null)* 체크 가능.

<br>


## 🚀‍ 코루틴 함수

### ✈ StartCoroutine

```c#
StartCoroutine(FindSightActivateCoroutine());
```

- FindSightActivateCoroutine() 코루틴 함수를 실행시킨다.


### ✈ StopCoroutine

```c#
Coroutine co = StartCoroutine(FindSightActivateCoroutine());
StopCoroutine(co);
```

- 파라미터로 넘겨받은 코루틴 중지.

### ✈ StopAllCoroutines

```c#
StopAllCoroutines();
```

- 병렬적으로 현재 실행 중인 모든 코루틴 함수를 중단시킨다.


<br>

## 🚀 YieldInstruction, CustonYieldInstruction

### ✈ WaitForSeconds(float)

```c#
yield return new WaitForSeconds(0.2f);  // 0.2 초 대기
```

지정 시간동안 대기

### ✈ WaitUntil(Func<Bool>))

```c#
// 람다 함수로 넘긴 경우

yield return new WaitUntil(() => HandController.isActivate);  
```

> 지정된 함수가 True 를 리턴할 때까지 대기.

- Bool 타입을 리턴하는 함수의 포인터 혹은 람다함수를 인수로 넘기고 True 값을 리턴할 때까지 대기한다.
- 예시 코드에선 `HandController.isActivate`가 True가 될 때까지 대기한다. 


***
<br>

    🌜 개인 공부 기록용 블로그입니다. 오류나 틀린 부분이 있을 경우 
    언제든지 댓글 혹은 메일로 지적해주시면 감사하겠습니다! 😄

[맨 위로 이동하기](#){: .btn .btn--primary }{: .align-right}