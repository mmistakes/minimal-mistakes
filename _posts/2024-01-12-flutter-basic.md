---
layout: single
title: "MacOS에서 Flutter 개발 환경 구축하기"
categories: [flutter]
tag: [mac, macos, m1, m2, m3, flutter, setup, basic, flutter doctor, ios, aos, android-studio, Xcode]
order: 1
published: true
typora-root-url: ../
---

`Flutter`는 `Cross-Platform` 개발을 위한 프레임워크입니다.

IOS, AOS를 모두 개발하기 위해서는 XCode의 필요성으로 `Mac`을 이용하여 개발하는 것을 추천드립니다.



### Flutter SDK 설치

[**웹사이트**](https://flutter-ko.dev/get-started/install/macos)를 참조 하여 설치하는 방법도 있지만 포스팅한 글 중이 [**MacOS 재설치 - Homebrew 설치 및 설정 & App Store**](https://gennyoon.github.io/macos/macos-setup1/)을 참조하면 `brew`를 통해서 초기 설정에 설치 할 수 있거나 Flutter 하나만 설치한다면 다음의 명령어를 `터미널`에 붙여 넣고 실행하시면 됩니다.

```bash
brew install --cask flutter
```



### Android Studio 설치 & Xcode 설치

Flutter로 개발을 한다면 역시 IOS, AOS를 모두 동시 개발이 되어야 한다고 생각합니다.  XCode는 App Store에서 설치를 진행하시면 되고, brew를 통하여 Android Studio 역시 설치하면 됩니다.

```bash
brew install --cask android-studio
```

설치 이후에는 모두 실행하여 중간에 설정 또는 추가 설치가 있습니다.  진행하시고 종료하시면 됩니다.



### Flutter Doctor를 통한 설치 또는 미설치에 대한 정보 확인

Flutter는 개발을 진행하기 위해 필요한 것의 설치여부를 확인 할 수 있습니다.

```bash
flutter doctor -v
```

다음의 명령어를 초반 실행하면 진행된 내용과 미진행 된 내용을 한눈에 알 수 있습니다.  또는 해결방법을 제시해 주기도 합니다.



### Flutter Doctor의 미진행 해결하기

**Unable to get list of installed Simulator runtimes.**

```bash
xcodebuild -downloadPlatform iOS
```

현재 구동가능한 시뮬레이터가 존재 하지 않을 때 나옵니다.   저는 IOS 시뮬레이터를 좋아하니 IOS쪽을 설치합니다.  (개인적으로 실제 Device에 넣어서 시행해보는 것이 제일 좋다고 생각합니다.)



**cmdline-tools component is missing**

Android Studio에 Command-Line Tools가 설치되어 있지 않을때 나옵니다. `Android studio`를 켜서 `Settings -> Languages & Frameworks -> Android SDK` 창에 들어가 `SDK Tools`바에 들어간 뒤 `Android SDK Command-line Tools`를 체크한 후 apply를 눌러 설치



**Android License 약관 수락**

```bash
flutter doctor --android-licenses
```

다음의 명령어로 문서가 보이는데 (A)gree 의 A를 눌러가며 수락하다보면 해결됩니다.



**Apple License 약관 수락**

```bash
sudo xcodebuild -license accept
```



**로제타2가 필요하여 설치해야할 때**

```bash
sudo softwareupdate --install-rosetta --agree-to-license
```



**Xcode의 경로를 다시 설정해야할 때**

```bash
sudo xcode-select --switch /Applications/Xcode.app/Contents/Developer

```



### 마무리

Flutter Doctor의 모든 내용을 클리어 했으면 설치는 모두 마무리 된 것입니다.  이제 나의 Workspace로 이동하여 프로젝트를 생성하면 됩니다.

```bash
flutter craete --org com.example.app -a kotlin -i swift --platforms-ios,android {app_name}
```

그냥 옵션 없이 진행해도 상관없지만 생성 후 자기 입맛에 수정하기는 것이 더 힘들 수 있습니다.  다음과 같이 생성며 프로젝트를 진행해보세요.
