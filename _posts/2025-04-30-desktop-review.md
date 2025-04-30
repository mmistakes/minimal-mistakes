---
layout: single
title:  "컴퓨터 리뷰"
toc: true
toc_sticky: true # 주석하면 고정
toc_label: 컴퓨터 리뷰 # 오른쪽 목차 이름 변경가능
author_profile: true # true false로 왼쪽 삭제가능능
search: true # 검색기능에 나오게 할건지 여부       
---

## 컴퓨터 리뷰 영상



## 왜 이 PC를 맞췄는가

기존에 사용하던 PC는 AMD Ryzen 5 3500과 RX 580 2048SP 조합으로, 가벼운 웹 개발이나 간단한 게임 플레이에는 큰 무리가 없었지만, 점점 늘어나는 작업량 환경에선 한계를 느끼기 시작했다.
RAM과 GPU 성능 부족이 체감될 정도였고, AI 관련 작업이나 빌드 속도 개선을 위한 CPU에 대한 필요성도 커졌다.
이번 업그레이드는 단순한 부품 교체가 아니라, 개발·게임·AI 작업을 모두 쾌적하게 수행할 수 있는 데스크톱 환경을 새로 구축하는 것이 목적이었다.
이번에 업그레이드한 부품은 차후 업그레이드까지 생각하여 선택한 부품이다.

## 내 PC 사양 정리

| 부품       | Before                 | After               |
|------------|------------------------|--------------------|
| CPU        | AMD Ryzen 5 3500       | AMD Ryzen 7 9700X    |
| GPU        | RX 580 2048SP          | [PALIT] 지포스 RTX 5070 Ti GAMINGPRO D7 16GB 이엠텍   |
| RAM        | ESSENCORE KLEVV DDR4-3200 CL22 파인인포 8gbx2       | TEAMGROUP DDR5-5600 CL46 Elite 서린 32Gx2  |
| SSD        | CT500MX500SSD1         | SOLIDIGM P44 2TB          |
| CASE       | ???                    | 아이구주 VENTI D2000       |
| POWER      | 500w                   | SuperFlower SF-1000F14XG LEADEX 4 GOLD    |
| COOLER     | 기본쿨러러              | DEEPCOOL AG620 듀얼타워 공랭               |
| mainboard  | msi a320m-a pro        | MSI MAG B850 토마호크 맥스 WIFI        |

### 컴퓨터 견적서

[![컴퓨터 견적서]({{site.url}}/images/2025-04-30-desktop-review/컴퓨터 견적서.png)]({{site.url}}/images/2025-04-30-desktop-review/컴퓨터 견적서.png)

유튜브나 컴퓨터 업체 견적서 보시면 됩니다.

## 조립 및 설치

### 부품사진

[![반본체]({{site.url}}/images/2025-04-30-desktop-review/반본체.png)]({{site.url}}/images/2025-04-30-desktop-review/반본체.png)

[![그래픽카드]({{site.url}}/images/2025-04-30-desktop-review/그래픽카드.png)]({{site.url}}/images/2025-04-30-desktop-review/그래픽카드.png)

### 조립방법

[![메인보드]({{site.url}}/images/2025-04-30-desktop-review/메인보드.png)]({{site.url}}/images/2025-04-30-desktop-review/메인보드.png)

영상에 간단한 설명!

### 메인보드 제조사별 BIOS 진입 키

| 제조사        | BIOS 진입 키         | 부가 설명 |
|---------------|----------------------|------------|
| **ASUS**      | `Del` 또는 `F2`      | 대부분의 ASUS 메인보드에서 공통 |
| **MSI**       | `Del`                | 부팅 시 MSI 로고 나올 때 연타 |
| **Gigabyte**  | `Del`                | 일부 오래된 모델은 `F2` 가능 |
| **ASRock**    | `Del` 또는 `F2`      | 모델에 따라 둘 다 가능 |
| **Biostar**   | `Del` 또는 `F2`      | 일반적으로 `Del` 권장 |
| **Intel**     | `F2`                 | 인텔 정품 메인보드 기준 |
| **HP (OEM)**  | `Esc` → `F10`        | 먼저 `Esc`로 메뉴 진입 후 `F10` |
| **Dell (OEM)**| `F2`                 | 로고 뜰 때 연타 |
| **Lenovo**    | `F1` 또는 `Fn + F2`  | 데스크탑은 `F1`, 노트북은 Fn 조합 |
| **Acer**      | `Del` 또는 `F2`      | 모델마다 상이, 둘 다 시도 |
| **Samsung**   | `F2` 또는 `Esc`      | 부팅 로고 중 `F2`, 안 되면 `Esc` |
| **Sony**      | `F2` 또는 `Assist` 버튼 | Assist 버튼 있는 경우 우선 |
| **Toshiba**   | `F2`                 | 간혹 `Esc` 후 `F1`도 있음 |

컴퓨터 전원을 키고 로고가 나오면 진입 키를 연타해주세요

### 윈도우 설치 방법

부팅 USB 준비

링크로 들어가서 Windows 11 설치 미디어 만들기 클릭후 부팅 USB에에 다운로드

[Windows 11 다운로드](https://www.microsoft.com/ko-kr/software-download/windows11)

부팅 USB 컴퓨터 결합 후 전원키고 바이오스 진입

BIOS에서 부팅 순서 변경 후 저장(키보드 F10이 저장입니다.)

[![부팅순서변경]({{site.url}}/images/2025-04-30-desktop-review/부팅순서변경.png)]({{site.url}}/images/2025-04-30-desktop-review/부팅순서변경.png)

윈도우 전부 설치 후 부팅 USB 탈거

컴퓨터 전원끄고 바이오스 진입하셔서 부팅 순서를 다시 메인 SSD로 변경하시면 설치 끝입니다.

### 드라이버 설치방법

수동 드라이브 설치시 제조사 메인보드명을 치고 드라이브 설치 (보통 자동으로 나옴)  

[MSI MAG B850 토마호크 맥스 WIFI 드라이버 설치 바로가기](https://kr.msi.com/Motherboard/MPG-B850-EDGE-TI-WIFI/support#driver)

### 바이오스 업데이트 링크

<span style="color:red">※ 별문제 없다면 바이오스 업데이트X (벽돌이 됩니다.)</span>

[MSI MAG B850 토마호크 맥스 WIFI 바이오스 업데이트 바로가기](https://kr.msi.com/Motherboard/MPG-B850-EDGE-TI-WIFI/support#bios)

{% include video id="AjvrEFjI0wM" provider="youtube" %}

### 완본체 사진

[![완본체]({{site.url}}/images/2025-04-30-desktop-review/완본체.png)]({{site.url}}/images/2025-04-30-desktop-review/완본체.png)

### 조립 참고 영상 링크

{% include video id="3-UWe9ccUpg" provider="youtube" %}

{% include video id="fxrIOYvp1ts" provider="youtube" %}

## 드래곤볼 VS 컴퓨터 업체 장단점 정리

| 항목         | 드래곤볼 (자작 PC)                                   | 컴퓨터 업체 (조립 대행/반본체/완본체)                   |
|--------------|------------------------------------------------------|--------------------------------------------------|
| **가격**     | 부품 직접 구매로 유통마진 없이 저렴하게 가능            | 마진 포함되어 상대적으로 비쌀 수 있음               |
| **구성 자유도** | 원하는 부품만 골라 100% 커스터마이징 가능             | 일부 제한 있음 (패키지 구성 변경 어려움)            |
| **성능/가성비** | 가격 대비 최고의 성능 조합을 직접 구성 가능           | 가성비보다는 안정성과 브랜드 중심                    |
| **조립 난이도** | 직접 조립해야 하며, 실수 가능성 있음                  | 조립 및 테스트 완료된 상태로 받아서 편리함            |
| **트러블 대응** | 문제 발생 시 스스로 원인 분석 및 A/S 분리 대응 필요   | 통합 A/S 제공 (한 번에 맡길 수 있음)                |
| **성취감**     | 완성 후 뿌듯함과 배우는 재미가 있음                  | 빠르고 편하긴 하지만 재미나 배움 요소는 적음          |
| **시간 소모**  | 부품 선택, 배송, 조립 등 시간 많이 소요               | 클릭 몇 번이면 끝, 빠르게 사용 가능                  |
| **초보자 추천도** | 낮음 – 컴퓨터 기본 지식 필요                        | 높음 – 누구나 쉽게 구매하고 바로 사용 가능           |

Ecoding의 추천  
부품 가격이 비쌀수록 → 드래곤볼 추천 (단 지식 있고 혼자 문제없이 만들 수 있는 사람만 추천)  
부품 가격이 저렴할수록 → 업체 PC 추천 (기본 추천)

## 총평 & 추천 여부

이번 조립 PC는 고사양 작업을 효율적으로 수행할 수 있도록 구성되었으며, 간단한 테스트만으로도 빠른 퍼포먼스를 체감할 수 있었다.
컴퓨터 부품은 균형 있게 조율되는 것이 가장 중요하며, 조립 PC는 한 번쯤 직접 도전해보는 것을 추천한다.

<span style="color:red">※ 단, 조립 및 윈도우 설치, 드라이버 설정 등의 초기 세팅은 일정 수준의 지식이 있는 사용자에게 적합하다.</span>
초보자의 경우 시간과 시행착오가 필요할 수 있으므로 사전에 충분한 정보를 습득하는 것이 좋다.
시간과 노력이 들지만, 그만큼 뿌듯한 결과물이 보장되는 선택지였다.
