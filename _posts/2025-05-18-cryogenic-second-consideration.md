---
layout: single
title:  "2. Cryogenic Service 설계 기준"
---

## ⚙️ 설계 시 고려해야 할 주요 기준

Cryogenic 환경에서는 다음과 같은 요소를 고려한 설계가 필요합니다:

### 1. **설계 최소 금속 온도 (MDMT: Minimum Design Metal Temperature)**

- ASME B31.3 기준에 따르면, 설계 금속의 최소 온도가 -29℃(-20℉) 이하일 경우 Impact Test가 요구됩니다.
- MDMT는 재료의 취성 파괴를 방지하기 위한 기준이며, 운영 온도와 재질 특성에 따라 결정됩니다.

### 2. **충격 시험 (Impact Test)**

- 극저온에서 금속의 인성이 감소하므로, 설계 재료는 Charpy V-Notch Test를 통해 저온 충격 시험을 통과해야 합니다.
- 일반적으로 -46℃, -101℃ 등의 시험 온도가 사용되며, ASME Section II Part D 또는 ASTM 기준에 따라 판단합니다.

### 3. **재료 선정**

- 일반 탄소강(P-No.1)은 -29℃ 이하에서는 사용이 제한되며, 극저온 전용 재질 사용이 필요합니다.
- 대표적 극저온용 재질:
  - **A333 Gr.6**: -46℃까지 사용 가능
  - **A333 Gr.8 (9%Ni)**: MDMT –196°C , LNG(-162℃) 조건에서 사용가능
  - **Austenitic Stainless Steel (304L, 316L 등)**: MDMT –196°C, 우수한 인성과 내식성 제공

### 4. **용접 및 PWHT 고려**

- 극저온 배관은 용접 후 열처리(PWHT)를 생략하는 경우도 있으나, 응력 해소 여부를 프로젝트 스펙과 비교 검토해야 함
- 용접 재료도 저온 충격 특성을 만족해야 하며, WPS/PQR 승인 시 충격 시험 결과 포함 필요

### 5. **보온 및 열손실 방지 설계**

- 극저온 배관 및 탱크는 단열재 사용해 열손실을 최소화해야 하며, Frost 발생을 방지해야 함
- Cold Box, Vacuum Jacket 등의 구조도 채택 가능

------

## 🧰 코드 및 표준 참고

| 코드/표준       | 적용 내용                                    |
| --------------- | -------------------------------------------- |
| ASME B31.3      | MDMT, Impact Test 요구사항 명시              |
| API 620 / 625   | 극저온 탱크 설계 기준 및 이중 격벽 구조 정의 |
| ASTM A333, A352 | 극저온용 탄소강 및 주강 재질 정의            |
| ISO 21009       | 극저온 압력 장비 국제 표준                   |

------

## ✅ 경험 및 조사 사례

- **LNG 배관 시스템**:   한국가스공사의 생산기지에서는 ASTM A312 TP304/304L 재질 사용 (출처 : 한국가스공사_초저온 배관 규격표준_20211224)
- **LP Ethylene(Liquid) Line**: Min. Design Temperature : -110℃ 조건에서 ASTM A312 TP304/304L 을 사용하는 Piping Class 적용함, Impact test 제외. (ASME B31.3 의 323.2.2(C) "*Austenitic stainless steels may be used at temperatures down to –325°F (–198°C) without impact testing*")
- **Cryogenic Valve**: Bonnet Extension(Valve Stem 파손 구조적 방지 용도), Cavity Vent hole (Cavity 내 극저온 액체가 기화로 인한 압력 팽창 현상 해소 용도)
