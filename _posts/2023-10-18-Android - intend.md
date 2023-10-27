---
layout: single
title:  "Android - Intent"
categories: Android
tag: [Android, Intent]
author_profile: true
toc: true
toc_label: 목차
toc_icon: "fas fa-list"

---

<br>









# ◆componant



## 1. Activity

화면 UI를 담당하는 컴포넌트



## 2. Service

백그라운드 코트 처리를 담당하는 컴포넌트(화면이 없음)



## 3. BroadCast Receiver

시스템 또는 사용자가 발생하는 메시지를 수신하는 컴포넌트



## 4. Content Provider

앱 간의 데이터 공유를 위한 컴포넌트



***context**

context는 실행할 클래스 또는 acitivty를 적으면 된다.<br>``Toast.makeText(this, "${x}", Toast.LENGTH_SHORT).show() // context는 실핼할 클래스 또는 acitivty를 적으면 된다.``



| 구분                     | Broadcast receiver | ApplicationApplication | Activity | Service | content provider |
| ------------------------ | ------------------ | ---------------------- | -------- | ------- | ---------------- |
| show a dialog            | X                  | X                      | O        | X       | X                |
| start an Acitivy         | X                  | X                      | O        | X       | X                |
| layout infilation        | X                  | X                      | O        | X       | X                |
| start a service          | O                  | O                      | O        | O       | O                |
| bind a service           | X                  | O                      | O        | O       | O                |
| send a Broadcast         | O                  | O                      | O        | O       | O                |
| regist broadcastReceiver | X                  | O                      | O        | O       | O                |
| Load Resource Values     | O                  | O                      | O        | O       | O                |

<br>









# ◆Intent

Activity, Broadcast Receiver, Service 3개의 컴포넌트를 실행하기 위해 시스템에 전달되는 메시지 도구이며,<br>실행할 액티비티 지정할 수 있고, 데이터 전송가능하다.

<br>



## 1. intent 객체 활용

key, value 형식으로 담아주면 되고 코드와 같이 문자열, 숫가, 객체 등 모든 타입의 데이터를 넘길 수 있습니다.



## 1.1 startActivity 활용

mainActivity로 데이터값 반환하지 않고 SubActivity로 페이지 변환

### mainActivtiy

```kotlin
val intent = Intent(this, SubActivity::class.java)
// putExtra 메서드로 String, int, 객체 등 전달
intent.putExtra("data", "hello")
intent.putExtra("data2", 1)
startActivity(intent)
```



### subActivtiy

```kotlin
// 자신을 실행한 intent 객체 얻어오기(getIntent)
val intent = intent
// getXXXExtra를 사용하여 데이터를 받아오는데 두 번째 매개변수는 기본값
val stringData = intent.getStringExtra("data")
val intData = intent.getIntExtra("data2", 0)
```

<br>







### 1.2 startActivityForResult 활용

SubActivity에서 mainActivity로 데이터값을 반환받을 수 있도록 한다.

<br>

#### mainAcitivty

```kotlin
// Intent 객체 생성
val intent = Intent(this, DetailActivity::class.java)
// startActivityForResult의 두 번째 매개변수로 개발자 숫자 값을 지정해 결과를 되돌려 받았을 때
// 어느 요청이 들어온지 구분하기 위해 사용
startActivityForResult(intent, 10)
```

화면이 돌아올때 자동 호출

```kotlin
// 화면이 되돌아 왔을 때 자동 호출
override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
    if(requestCode == 10 && resultCode == RESULT_OK) {
        // 종료된 액티비티에서 넘어온 데이터
        val data = data?.getStringExtra("data")
        Toast.makeText(this, data, Toast.LENGTH_SHORT).show()
    }

    super.onActivityResult(requestCode, resultCode, data)
}
```



### subActivtiy

```kotlin
// 자신을 실행한 intent 객체 얻어오기(getIntent)
val intent = intent
// 받아온 intent에 데이터 넣기
intent.putExtra("data", "데이터 넘기기")
// 자신의 상태 입력하기(RESULT_OK를 지정하여 정상으로 처리되어 되돌린 것임을 명시)
setResult(RESULT_OK, intent)
// 종료
finish()
```

