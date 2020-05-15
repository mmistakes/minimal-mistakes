---
title: "BLE (6) - Nordic BLE chip 개발하기 (1): nRF52-DK 개발환경 구축"
categories:
  - BLE
tags:
  - Nordic Semiconductor
  - Keil compiler
  - getting started
toc: true
toc_sticky: true
---

## 6. nRF52-DK 개발환경 구축

사실 임베디드 보드를 다루고 펌웨어 프로그래밍을 해보면 진짜 어려운 건 실제 로직을 짜는 것보다 처음에 개발환경을 구축하는 것. 개발환경은 말 그대로 내가 프로그래밍할 준비를 하는 일련의 과정.
아두이노를 예로 들면 아두이노에 프로그램을 업로드하기 위해 아두이노 IDE를 설치하고, 필요한 라이브러리를 추가하는 과정이라고 보면 된다.

대부분 칩을 완전 하드웨어 레벨에서 제어하기 보다는, 관련 함수들을 제공해준다. UART 통신을 한다고 해서 펌웨어에서는 일일이 START/STOP 조건을 확인하고 하는게 아님..
내가 원하는 기능들 라이브러리가 어디에 있고, 어떻게 사용하는지를 찾는게 더 어렵지
실제 프로그램 동작에 대해 고민하는 것은 그 다음의 이야기

본 포스트에서는 Nordic Semiconductor 사의 BLE 개발 보드인 nRF52-DK (development kit) 보드의 개발 환경 구축하는 과정을 다룬다. 

당연히 nRF52-DK 보드가 필요하고, 해당 보드에는 nRF52832 BLE chip 있다.

현재는 Nordic 에서 SES 를 사용하는 것을 권장하는 것 같은데... 아직 호환이 안된다고 하는 글 종종 보이고,

내가 처음 접한 플랫폼이 편해서...

SES 이용하는 것에 대해서는 다음 링크 참조



### 6.1 Nordic SDK 다운받기

nRF52832 와 관련된 SDK softdevice 다운받아야함.

softdevice는 이거 그리고 sdk 는 이거 받자 호환되는 거로 받아야함

example 보면 여러 예제가 있다.

각각은 BLE 프로토콜 스택이랑 관련 라이브러리/예제 모아놓은 거라고 생각

https://www.nordicsemi.com/ 사이트에 들어가보면

상단의 메뉴 바에서 이거이거 고르면 이렇게 보임

SDK 를 일단 고르자

그 아래에 Comapatible downloads 항목 있음

여기서 SDK 버전을 고르면, 그거랑 호환되는 softdevice 함께 다운로드 가능

일단 SDK 12.2.0 을 골라보겠음 그리고 

nRF52-DK 보드에는 nRF52832 chip 있기 때문에 softdevice는 

저것만 받으면 된다.


---

### 6.2 nRF command line Tool 설치하기

https://www.nordicsemi.com/Software-and-Tools/Development-Tools/nRF-Command-Line-Tools/Download#infotabs

설치하셈

본인 PC 운영체제 확인하고 다운로드

최신 버전으로 설치하자 (크게 중요하지 않을 것 같다)

그래서 nrfjprog --help 인가?
이거 해보면 암 제대로 되었는지.

### 6.3 Keil compiler 설치하기

https://www2.keil.com/mdk5

여기서 받으면 된다

혹은 

keil.com 들어가서 download 메뉴에서 MDK-ARM 선택하면 된다
작성일 기준 최신 버전 v5.30 이고, v5.XX 버전을 받아야하는 것으로 알고 있음

처음 시작할 때만 해도 keil compiler 사용했는데, 요새는 seggar embedded studio 사용하는 것 같음. 이유는 모르겠지만.. 나는 keil comiler 이용하는 방법을 정리할 예정

먼저 compiler 다운 받고나면 필요한 패키지 알아서 설치함
버전은 이렇게 있는데 32 KB 이내라면 사용가능

처음 설치하고 실행시켜보면 각종 패키지 설치하는데 시간 걸림.

기다리셈

여기까지 다 되었으면 오케이