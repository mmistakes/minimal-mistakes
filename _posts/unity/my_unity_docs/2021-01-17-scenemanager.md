---
title:  "Unity C# > UnityEngine : SceneManager" 

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


# 👩‍🦰 SceneManager

scene과 scene을 넘나 드는 작업을 하고 싶을 때 사용.

## 🚀 함수

### ✈ LoadScene

> public static void LoadScene(string sceneName, SceneManagement.LoadSceneMode mode = LoadSceneMode.Single);

해당 씬을 로드한다.

- 첫번째 인수로 씬의 이름 문자열이나 씬의 인덱스를 넘긴다.
- 모드는 `LoadSceneMode.Single`, `LoadSceneMode.Additive` 이렇게 2가지 있는 Single이 디폴트 값이다. 따라서 인수 한개만 넘기면 싱글 모드로 씬을 로드한다.
  - `LoadSceneMode.Single` : 현재 씬의 오브젝트들을 모두 Destroy하고 새롭게 씬을 로드
  - `LoadSceneMode.Additive` : 현재 씬에 새로운씬을 추가적으로 덧대어 로드. 말풍선을 덧붙이는 느낌.

<br>

### ✈ GetActiveScene

> public static SceneManagement.Scene GetActiveScene();

- 현재 활성화 되있는 씬을 리턴한다.
- SceneManager.GetActiveScene().`buildIndex`
  - 현재 활성화 되있는 씬의 인덱스 리턴
- SceneManager.GetActiveScene().`name`
  - 현재 활성화 되있는 씬의 이름 리턴
  
  ```c#
  SceneManager.LoadScene(SceneManager.GetActiveScene().name);  // 현재 활성화 되어있는 씬을 재시작
  ```

<br>

### ✈ LoadSceneAsync

> public static AsyncOperation LoadSceneAsync(string sceneName, SceneManagement.LoadSceneMode mode = LoadSceneMode.Single);

> public static AsyncOperation LoadSceneAsync(int sceneBuildIndex, SceneManagement.LoadSceneMode mode = LoadSceneMode.Single);

> public static AsyncOperation LoadSceneAsync(string sceneName, SceneManagement.LoadSceneParameters parameters);

> public static AsyncOperation LoadSceneAsync(int sceneBuildIndex, SceneManagement.LoadSceneParameters parameters);


```c#
        AsyncOperation operation = SceneManager.LoadSceneAsync(sceneName); // 비동기적으로 로딩 

        while(!operation.isDone) // 위 로딩이 끝나지 않았다면.. 1프레임 정도씩 대기 시간을 가짐
        {
            yield return null;
        }
```

> 보통의 경우엔 LoadScene 보다는 LoadSceneAsync 를 더 많이 사용한다고 한다.

- 씬 호출 외에 아무 작업도 하지 않고 기다리는식으로 동기적으로 씬을 불러오는 `LoadScene`와 달리 `LoadSceneAsync`는 씬을 호출시키는 작업과 현재 진행 중인 작업을 병렬적으로 계속 실행하고, 씬의 호출이 완료되면 그때 씬을 불러온다.   
  - 비동기적인 실행이 가능하므로, 씬 전환과 로딩이 완전히 이루어질 때까지 코루틴으로 대기하고 있으면 된다. 코루틴 또한 비동기적으로 이루어지기 때문.
- 해당 씬을 비동기적으로 로드하며 이 로딩 작업에 대한 정보를 AsyncOperation 타입의 인스턴스로 리턴한다.
  - 비동기적 연산을 위한 코루틴을 제공한다.
  - AsyncOperation 인스턴스를 통해 전환 진행도, 전환이 끝났는지 등등을 알 수 있는 정보를 받을 수도 있다.
  - **ArsyncOperation 프로퍼티들 참고하기**
    - `allowSceneActivation` : 씬 활성화
    - `isDone` : 씬 전환이 완료되었다면 True, 아니라면 False
    - `progress` : 씬의 호출이 얼마나 이루어 졌는지 알려주는 값이다. 0~1.0사이의 값을 가진다. 
    - `priority` : 멀티씬을 로드할 때 씬 호출하는 순서


***
<br>

    🌜 개인 공부 기록용 블로그입니다. 오류나 틀린 부분이 있을 경우 
    언제든지 댓글 혹은 메일로 지적해주시면 감사하겠습니다! 😄

[맨 위로 이동하기](#){: .btn .btn--primary }{: .align-right}