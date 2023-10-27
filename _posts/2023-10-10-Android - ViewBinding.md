---
layout: single
title:  "Android - ViewBinding"
categories: Android
tag: [Android, ViewBinding]
author_profile: true
toc: true
toc_label: 목차
toc_icon: "fas fa-list"

---

<br>









# ◆ ViewBinding이란?

xml에서 해당 뷰값을 변경하려는 작업을하려면 findViewById를 이용하여 변경해야했는데 문제점은 뷰가 많아지면 작성해야되는 코드가 많아져 번거러움이 있다. 이걸 해결하기 위해 ViewBinding을 사용한다.

**findViewById 사용했을 때**

```kotlin
val visibleButton:Button = findViewById(R.id.visiblerBtn1)
val targetView:TextView = findViewById(R.id.targetView1)
val invisible:Button = findViewById(R.id.invisible1)

visibleButton.setOnClickListener(){
    targetView.visibility = View.VISIBLE
}
invisible.setOnClickListener(){
    targetView.visibility = View.INVISIBLE
}
```

<br>









# ◆ ViewBinding 사용방법



## 1.build.gradel.kts(:app)에 android 태그안에 코드 작성

```kotlin
buildFeatures {
        viewBinding = true
    }
```



## 2. 바인딩 객체 취득

```kotlin
class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
//        setContentView(R.layout.activity_main) ->주석처리
	
        //바인딩 객체 취득
        val binding = ActivityMainBindng.inflate(layoutInflater)
        setContentView(binding.root)
}
```



## 3. 뷰 받아오기

문법 ``binding.변수이름.이벤트``

예제

```kotlin
binding.invisible1.setOneClickListener{
           binding.targetView1.visibility = View.INVISIBLE
}
```

invisible1의 id값을 가지고 있는 뷰를 클릭했을 때 id값이 targetView1인 뷰를 보여주겠다라는 의미이다.





