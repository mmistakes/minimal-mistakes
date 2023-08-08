---
title: "Hilt와 Compose 버전 호환성"
excerpt: "Hilt, Kotlin, Compose 버전"

writer: DaeYoungEE
categories:
  - kotlin
tags:
  - [Kotlin, Compose]

toc: true
toc_sticky: true

data: 2023-08-08
last_modified_at: 2022-08-08

published: true
---

## Gradle

### project 수준

```kotlin
buildscript {
    ext {
        compose_ui_version = '1.4.1'
        hilt_version = "2.45"
    }
    dependencies {
        classpath "com.google.dagger:hilt-android-gradle-plugin:$hilt_version"
    }
}
plugins {
    ...
    id 'org.jetbrains.kotlin.android' version '1.8.10' apply false
}
```

### module 수준

```kotlin
android {
    composeOptions {
        kotlinCompilerExtensionVersion '1.4.3'
    }
}
```

## 한눈에 보는 버전 호환

| Kotlin | Compose | Hilt |
| :----: | :-----: | :--: |
| 1.8.10 |  1.4.1  | 2.45 |

## 버전 관리의 중요성

필자는 Compose에서 Hilt를 공부하던 과정에서 빌드 도중 오류가 많이 났다. 결론적으로 말하면 버전간의 호환이 안된다는 문제였고 Compose 버전, Kotlin 버전, Hilt 버전 등 이 3가지의 모두 호환되는 버전을 찾아야된다.

## Reference

[안드로이드 공식 홈페이지, compose와 kotlin 버전 호환성](https://developer.android.com/jetpack/androidx/releases/compose-kotlin?hl=ko#pre-release_kotlin_compatibility)
