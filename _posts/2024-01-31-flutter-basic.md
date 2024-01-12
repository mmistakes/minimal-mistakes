---
layout: single
title: "Flutter - Flutter 기본 설정"
categories: [flutter]
tag: [flutter, setup, basic, flutter doctor]
order: 1
author_profile: false
published: true
typora-root-url: ../
---

### Flutter 설치

```bash
flutter doctor
```

**Unable to get list of installed Simulator runtimes.**

```bash
xcodebuild -downloadPlatform iOS
```

**cmdline-tools component is missing**

Android studio를 켜서 Settings -> Languages & Frameworks -> Android SDK 창에 들어가 SDK Tools바에 들어간 뒤 Android SDK Command-line Tools를 체크한 후 apply를 눌러 설치

```bash
flutter doctor --android-licenses
```

```bash
sudo softwareupdate --install-rosetta --agree-to-license
```

```bash
sudo xcode-select --switch /Applications/Xcode.app/Contents/Developer
sudo xcodebuild -runFirstLaunch
```
