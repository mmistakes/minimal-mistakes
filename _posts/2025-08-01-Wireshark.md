---
layout: single
title:  "Wireshark를 활용한 패킷 흐름 살펴보기"
categories: 패킷
tag: [wireshark, 패킷, 네트워크,  통신]
toc: true
toc_label: 목차
author_profile: false
---

# 네트워크 보안

Wireshark를 활용하여 웹서핑 시의 패킷 흐름을 살펴본다

## Wireshark 설치

먼저 Wireshark를 설치해보겠습니다

설치 사이트 -> https://www.wireshark.org/download.html

![Wireshark 다운로드 웹 사이트](/image/2025-08-01-Linux3/Wireshark 다운로드 웹 사이트.png)

본인 PC 환경에 맞는 것을 선택해서 설치하면 된다

## 패킷 캡처

Wireshark 설치가 완료되었으면 Wireshark를 관리자 권한으로 실행을 해준다

![Wireshark 캡처](/image/2025-08-01-Linux3/Wireshark 캡처.png)

네트워크 카드를 선택 후 캡처를 진행해야 하는데 현재 공유기 와이파이를 사용하고 있기 때문에
Wi-Fi를 선택한 뒤 위 캡처를 누르고 시작버튼을 누른다

![Web Site 패킷  캡처](/image/2025-08-01-Linux3/Web Site 패킷  캡처.png)

시작을 하면 패킷의 흐름이 계속 캡처되는데 이 때 웹 브라우저로 웹 사이트에 접속하면
패킷이 캡처된다

## 패킷 분석

캡처한 패킷에서 어떤 프로토콜들이 활성화 되었는지 분석하기 위해 분석 > 활성화된 프로토콜을
누르게 되면 

![활성화된 프로토콜](/image/2025-08-01-Linux3/활성화된 프로토콜.png)

위 사진처럼 활성화 되었던 프로토콜들을 알 수 있다
