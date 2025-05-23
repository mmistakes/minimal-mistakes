---
layout: single
title: "1.염화물 응력 부식균열 (Chloride SCC)"
categories: Piping
tag: [Corrosion, SCC]
toc: true
---

# 염화물 응력 부식균열 (Chloride SCC) – NACE & API 571 기준 정리

**염화물 응력 부식균열(Cl-SCC, Chloride Stress Corrosion Cracking)**은 오스테나이트계 스테인리스강이 **염화물 이온(Cl⁻)**, **인장 응력**, **상대적으로 높은 온도** 조건이 동시에 존재할 때 발생하는 파괴 메커니즘입니다.

이 손상은 외관상 거의 식별되지 않다가 **갑작스러운 파단**으로 이어질 수 있어 석유화학, 정유, LNG 플랜트 등에서 매우 중요한 **재료 선정 및 유지관리 이슈**입니다.

---

## 1. 정의 및 메커니즘

| 항목               | 내용                                                         |
| ------------------ | ------------------------------------------------------------ |
| **손상명**         | Chloride Stress Corrosion Cracking (Cl-SCC)                  |
| **원인 조합**      | Cl⁻ 이온 + 인장 응력(잔류응력 포함) + 온도 상승              |
| **주요 피해 재질** | 오스테나이트계 스테인리스강 (예: 304, 316, 321 등)           |
| **손상 형태**      | 외관상 거의 보이지 않는 미세균열 → 다발성 균열 및 급격한 파괴 |

Cl-SCC는 특히 고온에서 보온재가 덮인 배관이나 장비에서 발생하며, **CUI와 결합되어 발생 가능성**이 높습니다.

---

## 2. 발생 조건 (API 571 & NACE 기준)

### 📌 필수 3요소 (API 571 5.1.1.3)

1. **염화물 존재 (Chloride ion)**  
   - 보온재, 해안 지역, 담수 세척 불량 등으로 인한 염소 이온 축적
2. **인장 응력 (Tensile Stress)**  
   - 잔류응력, 용접응력, 열팽창 억제응력
3. **온도 (Temperature)**  
   - 일반적으로 **60°C 이상**에서 급격히 SCC 발생률 증가

> 참고: Cl-SCC는 일반적으로 **60~150°C** 범위에서 가장 빈번히 발생  
> (NACE 및 API 571 기준)

---

## 3. 취약 재질 및 대표 온도 조건

| 재질                   | 발생 위험 온도 범위 | 비고                                         |
| ---------------------- | ------------------- | -------------------------------------------- |
| 300계 SS (304, 316 등) | **60 ~ 150°C**      | 가장 민감                                    |
| 듀플렉스 SS            | 140°C 이상          | 상대적으로 내성이 있지만 고온에서는 SCC 가능 |
| 400계 SS               | 낮음                | 주로 Cr이 많고 오스테나이트 구조 아님        |

---

## 4. 대표 사례

- 보온 대상 스테인리스 배관에서 CUI와 함께 **Cl-SCC가 동시에 발생**
- 보온재(예: 칼슘 실리케이트 등)에 포함된 염화물이 고온에서 응축 → 균열 발생
- 플랜트 배관, 열교환기 튜브, 탱크 노즐, 응력 집중부에서 다수 발생

---

## 5. 예방 및 관리 대책

| 구분              | 내용                                                         |
| ----------------- | ------------------------------------------------------------ |
| **재질 변경**     | 필요 시 316L → Alloy 825, Duplex SS 등 고내식 재질로 대체    |
| **도장(Coating)** | 보온 대상 스테인리스 표면에 염화물 침투 방지용 비염소계 코팅 |
| **보온재 선택**   | **Low-Chloride Insulation** 사용, 또는 hydrophobic insulation 채택 (***#1 참조***) |
| **응력 제거**     | 설계 시 응력 집중 최소화, PWHT (Post Weld Heat Treatment) 고려(***#2 참조***) |
| **점검 및 검사**  | UT, PT, RT 등 비파괴검사 및 Cl-SCC 고위험부 정기 점검 (***#3 참조***) |
| **환경 제어**     | 탈염수 세척, 응축수 방지 설계, 가스켓·씰링 부식 방지 관리    |

---

## 6. 관련 기준 요약

| 표준                        | 내용                                           |
| --------------------------- | ---------------------------------------------- |
| **API 571 5.1.1.3**         | 오스테나이트계 스테인리스강의 Cl-SCC 상세 설명 |
| **NACE SP0198**             | 보온재 하 Cl-SCC 및 CUI 예방 가이드            |
| **NACE MR0175 / ISO 15156** | H₂S 및 SCC 관련 재질 요구사항 명시             |

---

## 7. 결론

염화물 응력 부식균열은 단순한 표면 부식이 아닌, **Damage Mechanism**으로서 반드시 사전 예방이 필요합니다.  
설계자 및 유지보수 담당자는 재질 선정, 도장, 보온재, 응력 해석 전반에 걸쳐 Cl-SCC 리스크를 평가하고 관리해야 하며, **API 571 및 NACE 기준을 실무 설계에 반영**하는 것이 필수적입니다.







## ***#1. Hydrophobic insulation과 Hygroscopic insulation***

**Hydrophobic insulation과 Hygroscopic insulation**은 보온재의 수분과의 상호작용 방식을 나타내는 용어로, **CUI(Corrosion Under Insulation)** 방지에 매우 중요한 차이를 가집니다.

---

### 🔍 차이 요약

| 구분            | **Hydrophobic**                                  | **Hygroscopic**                         |
| --------------- | ------------------------------------------------ | --------------------------------------- |
| **뜻**          | 물을 튕겨냄 (발수성)                             | 공기 중 수분을 흡수함                   |
| **동작 원리**   | 표면이 물과 결합하지 않음 → 물방울이 맺혀 떨어짐 | 보온재 자체가 수분을 빨아들임           |
| **CUI에 영향**  | ✅ 매우 유리 (물 흡수 차단)                       | ❌ 부식 위험 증가 (수분 보유)            |
| **예시 보온재** | Aerogel, Closed-cell Foamglass                   | Mineral Wool, Calcium Silicate          |
| **주 용도**     | 극저온, 해양, 부식 민감 배관                     | 고온 배관, 증기라인 등 (배수 설계 필요) |

---

### ✅ Hydrophobic Insulation (발수성 보온재)

- **특징:** 물과 접촉해도 흡수되지 않고 표면에서 튕겨 나감

#### 장점:
- 물 침투로부터 배관/장비를 보호
- **CUI 예방에 효과적**
- 장기간 단열 성능 유지

#### 대표 제품:
- Aerogel (Pyrogel, Cryogel)
- Foamglass (유리 발포 단열재)
- 일부 고성능 Polyisocyanurate (PIR)

---

### ❌ Hygroscopic Insulation (흡습성 보온재)

- **특징:** 공기 중 수증기나 물기를 흡수함

#### 단점:
- 장시간 수분 노출 시 보온재 내부까지 물이 침투
- 수분이 고이면서 **CUI, 박리, 부피 팽창** 발생 가능

#### 대표 제품:
- Mineral Wool (암면, 유리면)
- Calcium Silicate
- Perlite (개방형 구조)

> 💡 **주의:** 이들 제품은 드레인 처리, 표면 방수 코팅, 배수 설계, 알루미늄 재킷 등의 **추가 조치 없이는 CUI에 매우 취약**합니다.

---

### 🧾 실무 적용 포인트

- **스테인리스 배관**, **CUI 민감 계통**, **야외 보온**에서는 반드시 **Hydrophobic 보온재 우선 적용**
- **Hygroscopic 보온재 사용 시**, 반드시 다음 조치 필요:
  - Low-Chloride 기준 충족
  - 방수층(Vapor Barrier) 설계
  - Drainage 및 Vent hole 설계
  - 주기적 유지보수 계획 포함



## ***#2. Austenitic Stainless Steel의 PWHT 적용***

> [Austenite Stainless Steal 은 P.W.H.T가 필요없을까?](https://susupapa25.github.io/AusteniteStainlessSteal-PWHT-Requirement/)



## #3.Cl- SCC 점검 방법

**TML(Thickness Monitoring Location)**과 **CML(Corrosion Monitoring Location)**은 배관 또는 장비의 부식 상태를 관리하기 위해 설정하는 위치를 의미합니다. 이들은 자산 무결성(Integrity) 유지와 장기 운전 신뢰성을 위한 핵심 관리 포인트입니다.

---

### ✅ 용어 정의

| 구분 | 용어                          | 정의                                                         |
| ---- | ----------------------------- | ------------------------------------------------------------ |
| TML  | Thickness Monitoring Location | 특정 부위의 **두께를 주기적으로 측정**하여 부식이나 마모를 감시하는 지점 |
| CML  | Corrosion Monitoring Location | TML을 포함하는 더 포괄적인 개념으로, **부식 및 마모 상태를 모니터링**하는 위치. 두께 측정 외에 **기타 측정 방법(예: UT, RT, IRIS 등)**도 포함할 수 있음 |

> ※ 실제로는 **TML ≈ CML**로 사용되기도 하나, **ASME/API 기준에서는 CML이 상위 개념**으로 구분됨

---

### 🔍 주요 차이점 요약

| 항목      | TML                             | CML                                       |
| --------- | ------------------------------- | ----------------------------------------- |
| 목적      | 두께 감소 감시                  | 전반적인 부식 감시                        |
| 측정 방법 | 보통 UT (Ultrasonic Test)       | UT, RT, VT, ER Probe, IRIS 등 다양한 방식 |
| 범위      | 특정 지점                       | 시스템 또는 구성요소의 전략적 영역        |
| 기준 문서 | 회사 내 Asset Integrity Program | API 570, ASME B31.3 등                    |

---

### 📘 관련 기준 (API 및 ASME)

- **API 570 – _Piping Inspection Code_**  
  > CML is a designated area on piping where periodic examinations and measurements are conducted.

- **ASME B31.3 – _Process Piping_**  
  > Monitoring areas may be designated for corrosion and wear control; these are typically known as TMLs or CMLs.

---

### 🛠️ 선정 기준

| 고려 항목                 | 설명                                                |
| ------------------------- | --------------------------------------------------- |
| **부식 가능성 높은 위치** | Low-point, Dead-leg, Elbow, Reducer, Nozzle 근처 등 |
| **운전 조건**             | 고온, 고압, 유체 속도 등                            |
| **과거 부식 이력**        | Data가 있는 부위에 우선 설정                        |
| **배관 재질**             | Carbon Steel 등 부식 취약 재질 중심                 |

**예시:**

- 🔹 **Dead-leg**  
  → CML 또는 TML을 **Dead-leg 끝단 50 mm 내외**에 위치 설정

- 🔹 **Elbow 하부**  
  → 고속 유체 마찰로 인한 Erosion 가능성 있어 우선 감시

---

### 📏 설치 및 측정 예

- 일반적으로 **Ultrasonic Thickness Gauge (UT)**로 측정  
- **측정 주기**: 위험도 기반(RBI, Risk-Based Inspection)에 따라 다름 (예: 6개월 ~ 5년 주기)

---

### ✅ 정리

| 용어    | 정의               | 핵심 목적               |
| ------- | ------------------ | ----------------------- |
| **TML** | 두께 측정 지점     | 벽 두께 감소 감시       |
| **CML** | 부식 모니터링 지점 | 포괄적인 부식 상태 감시 |