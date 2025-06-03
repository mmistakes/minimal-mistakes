---
layout: single
title: "SSC, Sour Service와 Piping (Feat.NACE MR0103)"
categories: Piping
tag: [H2S, NACE MR0103, SOUR SERVICE, SSC, Corrosion]
toc: true
---

# NACE MR0103과 Sour Service 환경에서 Piping Engineer가 고려해야 할 사항

석유화학 및 정유 플랜트에서는 황화수소(H₂S)가 포함된 유체를 다루는 배관이 빈번하게 존재하며, 이로 인해 **Sulfide Stress Cracking (SSC)**과 같은 균열 손상이 발생할 수 있다 
[5.Sulfide SCC Corrosion]({{ site.baseurl }}/piping/Corrosion-SulfideSCC/). 

본 포스팅에서는 NACE MR0103이란 무엇인지, Sour Service의 정의와 그에 따라 **Piping Engineer가 설계 시 고려해야 할 핵심사항**들을 정리하였다.

---

## 1️⃣ NACE MR0103이란?

- **정식 명칭**: *Materials Resistant to Sulfide Stress Cracking in Corrosive Petroleum Refining Environments*
- **주요 목적**: 황화수소(H₂S)가 존재하는 정유 환경에서 **Sulfide Stress Cracking (SSC)**에 저항성을 가지는 재료의 요구사항을 명시
주의할 점은 NACE MR0103은 **정유 및 석유화학 공정 (Downstream)**에 적용되며, **Upstream 설비**에는 **NACE MR0175**가 적용된다는 점이다.

---

## 2️⃣ Sour Service란?

Sour Service는 황화수소(H₂S)가 포함된 유체를 다루는 환경으로, 다음 조건을 만족할 경우 Sour로 분류된다.

- **H₂S의 Partial Pressure ≥ 0.0003 MPa (0.05 psi)**  
  → 이는 **NACE MR0103**에서 정의한 기준이다.

Sour Service에서는 유체 내 H₂S가 금속에 침투하여 수소취성(Hydrogen Embrittlement), 응력 부식균열(SSC)을 유발하므로, 별도의 재료관리 및 설계기준을 적용해야 한다.

---

## 3️⃣ Piping Engineer가 설계 시 고려할 사항

### (1) 기준 적용 판단

- 프로젝트가 **Sour Service** 환경인지 여부 확인
- 해당 환경이 **NACE MR0103 적용 대상(정유/석유화학)**인지 또는 **MR0175 적용 대상(Upstream, 생산설비)**인지 구분 필요

### (2) 재료 선택 (Material Selection)

- NACE MR0103에서 다루는 재료 사용 필요
- 특히 탄소강 및 저합금강은 **경도 제한**이 존재  
  → 일반적으로 **HRC 22 이하**

### (3) PWHT 요건 (Post Weld Heat Treatment)

NACE MR0103에서는 특정 재질의 SSC 저항성을 확보하기 위해 **PWHT 적용을 요구**한다. 아래는 주요 재질군 별 요건이다:

| 재질군 | PWHT 요구 여부 | 주요 요구 사항 |
|--------|----------------|----------------|
| **Carbon Steel (A106 Gr.B, A105 등)** | 대부분 필수 | 용접 후 PWHT 적용 필요, 용접부 및 HAZ 경도 HRC 22 이하로 유지 |
| **Low Alloy Steel (A335 P11/P22 등)** | 조건부 필수 | 설계 및 열처리 조건에 따라 PWHT 요구됨. 경도 기준 반드시 충족 필요 |
| **Austenitic Stainless Steel (SS304/316 계열)** | 일반적으로 면제 | 오스테나이트계는 SSC에 상대적으로 안전하므로 PWHT 면제됨 |
| **Nickel Alloys (Inconel 625 등)** | 대부분 면제 | 고합금 강종은 내SSC 성능 우수하므로 PWHT 요구 없음 |

> **탄소강/저합금강 계열은 PWHT가 미적용 시 경도 기준을 초과할 가능성 높으므로, 설계 및 용접 절차서(WPS)에서 PWHT 포함 필수 여부를 명확히 정의해야 한다.**

### (4) 배관재료사양 관리

- PMS(Piping Material Specification) 상 Sour Service 전용 Piping Class 별도 지정 필요
- NACE MR0103 대응 자재 및 벤더 리스트 관리 필수

### (5) 내식 및 부식여유

- Sour 환경은 부식 위험이 크므로 일반적으로 **3 mm 이상 부식 여유(Corrosion Allowance)** 부여
- 내부 코팅(Epoxy 등) 또는 Lining 적용 여부 검토

---

## 실무 적용 정리

| 항목 | 내용 |
|------|------|
| 기준 구분 | Downstream (정유/석유화학) → **NACE MR0103** 적용 |
| Sour 판단 기준 | **Partial Pressure of H₂S ≥ 0.0003 MPa (0.05 psi)** |
| 재료 기준 | MR0103 등재 재료만 사용 가능, 경도 제한 필수 |
| PWHT 요건 | 재질에 따라 적용 필요 (Carbon/Low Alloy는 일반적으로 필수) |
| PMS 관리 | Sour 전용 Piping Class 별도 분리 및 관리 |

---

## 실무 적용 포인트 요약

1. **LINE LIST 상 SOUR SERVICE 대상 여부**를 명확히 구분해야 함.  
   - 기준: NACE MR0103 기준 **Partial Pressure of H₂S ≥ 0.0003 MPa (0.05 psi)**

2. **PMS(PIPING MATERIAL SPECIFICATION)**에서 Sour Service 대상 라인은 별도 **PIPING CLASS**로 관리되어야 함.

3. 해당 **PIPING CLASS**는 **MR0103 등재 재료**를 적용해야 함.

4. SOUR SERVICE 대상 라인은 "용접 및 검사" 시 **PROJECT SPEC. Requirement**을 따라야 하며,  
   - **PWHT 적용 및 경도시험 필수 수행** 등이 포함됨

➕ 즉, SOUR SERVICE 환경은 **SSC(Sulfide SCC) 방지**를 위해 별도 관리가 필요하며, **NACE MR0103을 반드시 준수해야 한다.**

---
