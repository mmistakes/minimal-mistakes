---
title:  "Unity C# > UnityEngine : JsonUtility" 

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


# 👩‍🦰 JsonUtility

`JSON`은 텍스트로 되어 있어서 사람이 이해하기 쉽고 <u>직렬화</u> 되어 저장되기 때문에 통신에 있어 데이터를 스트림으로 주고받기 쉬운 포맷이다.

## 🚀 함수

### ✈  ToJson

> public static string ToJson(object obj);

```c#
[System.Serializable] // 직렬화 해야 한 줄로 데이터들이 나열되어 저장 장치에 읽고 쓰기가 쉬워진다.
public class SaveData
{
    // ... SaveData는 직렬화된 클래스
}
private SaveData saveData = new SaveData();
string json = JsonUtility.ToJson(saveData);
File.WriteAllText(SAVE_DATA_DIRECTORY + SAVE_FILENAME, json);
```

- 인수로 넘긴 객체를 <u>직렬화된 Json 포맷의(String 텍스트)으로 리턴</u>한다.
  - Json 은 직렬화 하여 저장되는 포맷이므로 인수로 넘긴 객체는 직렬화 가능한 객체여야 한다. 
    - 객체 타입인 *SaveData* 는 직렬화한 클래스라 가능

<br>


### ✈  FromJson

> public static T FromJson(string json);

```c#
string loadJson = File.ReadAllText(SAVE_DATA_DIRECTORY + SAVE_FILENAME); // 파일에서 Json 포맷의 문자열을 읽어 loadJson에 저장
saveData = JsonUtility.FromJson<SaveData>(loadJson);
```

- `JsonUtility.FromJson<T>(string)`
  - 인수로 넘긴 Json 포맷의 문자열을 `T` 타입의 인스턴스로 리턴한다.
    - Json 포맷의 문자열인 `loadJson`에서 데이터들을 읽어 SaveData 클래스의 멤버 변수들에 저장하고 이를 객체 인스턴스로 만들어 `saveData`에 리턴한다.
- 주의 사항
  - `saveData`의 멤버들은 반드시 public 하거나 혹은 `[SerializeField]`여야 한다. 그래야 저장 가능.


***
<br>

    🌜 개인 공부 기록용 블로그입니다. 오류나 틀린 부분이 있을 경우 
    언제든지 댓글 혹은 메일로 지적해주시면 감사하겠습니다! 😄

[맨 위로 이동하기](#){: .btn .btn--primary }{: .align-right}