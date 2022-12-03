---
title:  "Unity C# > 전처리기" 

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


# 👩‍🦰 전처리기

> **전처리기** 👉 특정 상황에 따라 스크립트를 컴파일할지 말지 결정할 수 있다.

- 유니티는 여러 플랫폼을 빌드할 수 있다. iOS, 안드로이드, 윈도우, 맥OS 등등..
  - 플랫폼에 따른 각각의 코드들을 만들 때 <u>특정 플랫폼에만 컴파일 되는 전처리기를 만들 수 있다.</u>
  - 예를들어 iOS 전처리기 부분은 게임 개발이 완성된 후 iOS로 빌드될 때만 포함된다. 안드로이드로 빌드 될 때는 이 부분의 코드가 빌드에 포함되지 않는다.

## 🚀 UNITY_EDITOR

```c#
    #if UNITY_EDITOR 
      Debug.Log("Unity Editor");  // 유니티 에디터에서만 나오는 로그
    #endif
```

<br>

## 🚀 UNITY_IOS

```c#
    #if UNITY_IOS
      Debug.Log("Iphone");   // iOS 에서만 나오는 로그. iOS로 빌드할 때만 빌드 된다.
    #endif
```

<br>

## 🚀 UNITY_STANDALONE_OSX

```c#
    #if UNITY_STANDALONE_OSX
    Debug.Log("Stand Alone OSX");   // 맥 OS 에서만 나오는 로그. 맥 OS로 빌드할 때만 빌드 된다.
    #endif
```

<br>

## 🚀 UNITY_STANDALONE_WIN

```c#
    #if UNITY_STANDALONE_WIN
      Debug.Log("Stand Alone Windows");  // 윈도우에서만 나오는 로그. 윈도우로 빌드할 때만 빌드 된다.
    #endif
```


***
<br>

    🌜 개인 공부 기록용 블로그입니다. 오류나 틀린 부분이 있을 경우 
    언제든지 댓글 혹은 메일로 지적해주시면 감사하겠습니다! 😄

[맨 위로 이동하기](#){: .btn .btn--primary }{: .align-right}