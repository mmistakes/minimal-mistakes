---
layout: single
title: "[ANDROID]BMI 계산기"
categories: Android Studio
tag: [androidstudio, java, kotlin]
toc: true
author_profile: true
sidebar:
  nav: "docs"
# search : false
---

## View Binding

1. build.gradle(Module) 파일에 추가

```kotlin
android{
  ...

  viewBinding{
    enabled = true
  }
}
```

2. Activity에서 binding 초기화 및 연결

```kotlin
class MainActivity : AppCompatActivity() {
    private lateinit var binding: ActivityMainBinding
    // 사용할 때 생성

    override fun onCreate(savedInstanceState: Bundle?) {
        binding = ActivityMainBinding.inflate(layoutInflater)
        // 초기화
        super.onCreate(savedInstanceState)
        setContentView(binding.root)
        // 연결

    }

    ...
}
```

## return @함수

- 어느 함수를 나갈 것인지 지명

```kotlin
binding.button.setOnClickListener {
  if(binding.height.text.isEmpty() || binding.kg.text.isEmpty()){
    Toast.makeText(this, " 값이 있습니다.", Toast.LENGTH_SHORT).show()

    return@setOnClickListener
    // 어느 함수를 나갈 것인지 지명
  }

  ...
}
```

## Toast

- 사용자에게 짧은 메시지 형식으로 정보를 전달하는 팝업
- 첫 번째 인자 : 현재 프로세스의 Context 정보
- 두 번째 인자 : 사용자에게 보여줄 문자열
- 세 번째 인자 : Toast 메시지를 화면에 띄우는 시간을 지정

```kotlin
Toast.makeText(this, " 값이 없습니다.", Toast.LENGTH_SHORT).show()
```

## Intent

- Messaging 객체로, 다른 앱 구성 요소로부터 작업을 요청하는 데 사용

```kotlin
val intent = Intent(this, ResultActivity::class.java)
// Intent 객체를 생성 -> 첫번째 인자 : 메세지를 보내는 액티비티, 두번째 인자 : 호출될 액티비티
intent.putExtra("result" ,result)
//데이터 전달
startActivity(intent)

--------------------------------

val bmi = intent.getDoubleExtra("result", 0.0)
// 데이터 수신
```
