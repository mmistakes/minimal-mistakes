---
title:  "Unity C# > C# 문법, C# 라이브러리" 

categories:
  -  UnityDocs
tags:
  - [Game Engine, Unity]

toc: true
toc_sticky: true

date: 2020-12-16
last_modified_at: 2020-12-16
---

공부하면서 알게 된 **이벤트 함수**들을 정리한 문서입니다.😀
{: .notice--warning}

- 유니티 공식 매뉴얼 <https://docs.unity3d.com/kr/current/Manual/UnityManual.html>
- Scripting Overview <http://www.devkorea.co.kr/reference/Documentation/ScriptReference/index.html>


## 👩‍🦰 C# 라이브러리

### 🌼 System.IO

```c#
using System.IO;
```

#### Directory : 디렉터리 

디렉터리와 하위 디렉터리에서 만들기 등등과 관련된 함수들 제공

##### Directory.Exists(String)

```c#
private string SAVE_DATA_DIRECTORY;

if (!Directory.Exists(SAVE_DATA_DIRECTORY))
```

인수로 넘긴 파일 경로(string 문자열)가 존재한다면 True, 존재하지 않는다면 False

##### Directory.CreateDirectory(String)

```c#
private string SAVE_DATA_DIRECTORY;

Directory.CreateDirectory(SAVE_DATA_DIRECTORY)
```

이미 존재하지 않는 한 지정된 경로에 모든 디렉터리와 하위 디렉터리를 만듭니다.

<br>

#### File : 파일 읽고 쓰기

##### File.WriteAllText(String, String)

```c#
private string SAVE_DATA_DIRECTORY;  // 저장할 폴더 경로
private string SAVE_FILENAME = "/SaveFile.txt"; // 파일 이름
SAVE_DATA_DIRECTORY = Application.dataPath + "/Save/";

private SaveData saveData = new SaveData();
string json = JsonUtility.ToJson(saveData); 

File.WriteAllText(SAVE_DATA_DIRECTORY + SAVE_FILENAME, json);
```

첫 번째 인수인 "경로 + 파일"에 두 번째 인수인 텍스트 정보를 쓴다. 즉, 📂Asset/📂Save 경로에 있는 📄SaveFile.txt 파일에 `json` 문자열을 기록한다.

##### File.ReadAllText(String)

```c#
string loadJson = File.ReadAllText(SAVE_DATA_DIRECTORY + SAVE_FILENAME);
```

인수로 넘긴 경로(String)의 텍스트 파일을 열고, 파일의 모든 텍스트를 문자열로 읽어 들여 리턴한다. 즉, 📂Asset/📂Save 경로에 있는 📄SaveFile.txt 파일을 열 것인데 JSon 포맷의 텍스트가 저장되어 있으니 `loadJson`은 Json 포맷의 일렬의 문자열일 것이다.

***
<br>

    🌜 개인 공부 기록용 블로그입니다. 오류나 틀린 부분이 있을 경우 
    언제든지 댓글 혹은 메일로 지적해주시면 감사하겠습니다! 😄

[맨 위로 이동하기](#){: .btn .btn--primary }{: .align-right}