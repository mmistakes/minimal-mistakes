---
title:  "Unity C# > UnityEngine : Resources" 

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


# 👩‍🦰 Resources

> 📂Resource 폴더 안에 있는 에셋을 불러올 수 있다. 이름이 "Resource"인 폴더를 생성하면 된다.

![image](https://user-images.githubusercontent.com/42318591/94338812-238ff800-0030-11eb-90e0-ac70fd45b839.png)


## 🚀 함수

### ✈ Load

> public static T Load(string path);

```c#
GameObject obj = Resources.Load<GameObject>("Prefabs/Tank");
```

- **Resources.Load<에셋타입>(에셋경로)**
  - 불러오려는 에셋의 타입과 에셋의 경로를 지정해주면 해당 에셋을 로컬 환경(📂Resources)에서 찾아 GameObject로서 불러오고 이를 리턴하는 함수다.
  - 📂Assets/Resources 로컬 폴더에서 에셋을 가져온다.
    - 그러니 위의 예에선 📂Assets/Resources/Prefabs 폴더에 있는 "Tank" 프리팹을 가져오게 되는 것이다.
    - 📂Resources가 없다면 만들어주자.
- 프리팹을 직접 유니티 에디터에서 일일이 변수에 할당해줄 필요 없이 게임 중에 코드상으로 불러올 프리팹이 있다면 📂Resources 폴더 안에 넣어두고 Resources.Load 함수를 사용하여 할당하자.
  - GetComponent 와 비슷한 것 같다. 에셋을 로컬 폴더에서 찾아서 불러오는 에셋 버전 GetComponent



***
<br>

    🌜 개인 공부 기록용 블로그입니다. 오류나 틀린 부분이 있을 경우 
    언제든지 댓글 혹은 메일로 지적해주시면 감사하겠습니다! 😄

[맨 위로 이동하기](#){: .btn .btn--primary }{: .align-right}