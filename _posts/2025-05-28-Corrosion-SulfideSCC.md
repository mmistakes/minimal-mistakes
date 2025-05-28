---
layout: single
title: "5.Sulfide SCC Corrosion"
categories: Piping
tag: [Corrosion, H2S, SSC]
toc: true
---

# H₂S 환경에서의 SCC (Sulfide Stress Cracking)

**H₂S(Sulfide)**가 존재하는 환경에서는 금속 재질이 **응력 부식 균열(SCC)**에 매우 취약해집니다. 이러한 현상을 **Sulfide Stress Cracking (SSC)** 또는 넓은 의미에서 **HIC/SOHIC (수소 유기 균열)**로도 분류합니다.

특히 석유, 가스 생산 및 정제 공정에서 빈번히 발생하며, 이를 방지하기 위한 국제 기준으로는 **NACE MR0175 / ISO 15156**가 대표적입니다.

---

## 1. H₂S SCC란?

**SCC(Stress Corrosion Cracking)**은 특정 환경(부식 인자)과 응력의 복합 작용에 의해 금속 표면에 균열이 발생하는 현상입니다.  
그중 **H₂S SCC**, 또는 **황화수소 취성(Embrittlement)**은 황화수소가 존재하는 환경에서 **수소가 금속 내부로 침투**하면서 균열을 유도하는 메커니즘입니다.

- **SSC (Sulfide Stress Cracking)**: H₂S 환경에서 발생하는 전형적인 수소 취성 균열
- **HIC (Hydrogen Induced Cracking)**: 내부에 포획된 수소로 인해 층상 균열 발생
- **SOHIC (Stress-Oriented HIC)**: 방향성 응력에 의해 수소 유기 균열이 전파되는 형태

---

## 2. 발생 조건

- **환경**: H₂S 포함 습식 환경 (Wet Sour Service)
- **응력**: 잔류응력, 기계적 응력, 압력, 굽힘 응력 등
- **재질**: 탄소강, 저합금강이 주로 영향 받음

---

## 3. 주요 영향 대상

- **Welded Joints (용접부 및 HAZ)**
- **압력용기, 탱크, 배관의 내부 표면**
- **용접 후 PWHT가 누락된 설비**

---

## 4. 메커니즘 요약

1. 황화수소(H₂S)가 금속 표면에서 수소 이온(H⁺)을 생성
2. 이온이 **금속 내부로 확산**
3. 금속 조직 내 **트랩(Trap)에 포획된 수소**가 팽창 → 균열 발생
4. 특히 **응력 집중 지점**에서 균열이 시작되어 전파됨

---

## 5. 방지 대책

### ✅ NACE 기준 재질 사용
- **NACE MR0175 / ISO 15156**에 따라 재질 등급, 경도(HB ≤ 200 등), 열처리 조건 준수

### ✅ PWHT (Post Weld Heat Treatment)
- 용접부 **잔류응력 완화**로 SCC 저감
- 특히 탄소강, 저합금강은 PWHT 적용 권장

### ✅ 경도 제한 및 검사
- 재질 경도 초과 시 수소 취성 위험 증가
- HRC ≤ 22 또는 HB ≤ 200 등 경도 제한 기준 확인

### ✅ 코팅 및 라이닝
- **내산성 코팅 또는 라이닝**으로 금속 직접 노출 방지

### ✅ 운전 조건 제어
- pH 조절, H₂S 농도 모니터링, 산소 유입 방지

---

## 6. 실제 적용 사례

> 가스 플랜트의 **Wet H₂S 라인 배관(탄소강)**에서 운전 3년 후 SCC로 인한 누설 발생  
> 조사 결과, 해당 부위는 **PWHT 미적용**, 경도 초과로 NACE 기준 미준수 상태였음  
> 이후 해당 라인 전면 교체, **PWHT 수행 + 경도 관리**, **NACE 인증 재질 적용**으로 개선 완료

---

## 7. 참고 기준

- **NACE MR0175 / ISO 15156**: H₂S 환경에서의 재질 사용 기준
- **API 571**: SSC, HIC, SOHIC 메커니즘 설명
- **ASME B31.3**: 용접 열처리 및 설계 조건 관련 조항
- **API 582**: PWHT 가이드라인 및 SCC 관련 처리 방안

---

**결론:**
H₂S 환경은 예측 불가능한 균열을 유발할 수 있는 **고위험 부식 환경**입니다.  
초기 설계 단계에서부터 **재질 선정, PWHT 적용, 경도 관리** 등의 예방 조치를 철저히 해야 플랜트의 **안전한 장기 운전**이 가능합니다.



# 코드별 Sour Service 정의

## ✅ 1. **NACE MR0175 / ISO 15156**

- **정의**:

  > Sour Service란 H₂S가 포함된 유체가 **금속재와 접촉**하고, **균열(SCC, SSC)**이 발생할 수 있는 조건을 의미함.

- **적용 조건** (ISO 15156-2 기준):

  - **수분이 존재할 것** (물 없는 H₂S는 SCC 발생 안 함)
  - **유체에 H₂S가 용해되어 있을 것**
  - **인장 응력이 존재할 것**

- **출처**:

  - ISO 15156-1:2020(E), Petroleum and natural gas industries — Materials for use in H₂S-containing environments in oil and gas production
  - NACE MR0175:2015

------

## ✅ 2. **NACE MR0103**

- **정의**:

  > Downstream 환경(정유소, 화학공장 등)에서 사용되는 설비 및 부품 중, H₂S에 의한 **Sulfide Stress Cracking(SSC)** 위험이 있는 환경

- **적용 조건**:

  - 설비 내부에 **free water** 존재
  - 운전 조건에서 유체가 **Wet H₂S 환경**에 해당
  - 예시: **정제, 가공 플랜트의 Column, Heat Exchanger, Valve, Pump, Piping 등**

- **출처**:

  - NACE MR0103:2012, "Materials Resistant to Sulfide Stress Cracking in Corrosive Petroleum Refining Environments"

------

## ✅ 3. **ASME B31.3 (Process Piping Code)**

- **정의**:

  > ASME B31.3에서는 직접적으로 "Sour Service" 정의는 없지만, **Non-Mandatory Appendix W**와 NACE 기준(MR0175, MR0103)을 **참조하도록 요구**

- **주요 내용**:

  - **Par. 323.2.2(F)**: "If H₂S or other sour service conditions are present, materials shall meet NACE MR0175 requirements."

- **출처**:

  - ASME B31.3: 2022 Edition
  - Appendix W: Metallic Materials for H₂S Service (non-mandatory)

------

## ✅ 4. **API RP 941 (Nelson Curve - HTHA용)**

- **직접적인 sour service 정의는 없음**, 하지만 H₂S와 고온 환경에서의 **High-Temperature Hydrogen Attack (HTHA)** 위험을 평가할 때 간접적으로 고려됨

------

## ✅ 5. **API 571 (Damage Mechanisms)**

- **정의**:

  > Sour Service는 **Wet H₂S 환경**이며, **Sulphide Stress Cracking, Hydrogen Induced Cracking(HIC), Stepwise Cracking 등** 다양한 손상을 유발할 수 있는 조건

- **관련 기체 농도 기준**:

  - pH < 5, H₂S > 50 ppm (total pressure 기준) → SCC 가능성 존재

- **출처**:

  - API RP 571, "Damage Mechanisms Affecting Fixed Equipment in the Refining Industry", 2nd Edition

------

## ✅ 6. **Shell DEP (Design and Engineering Practices)**

- **Sour Service 정의**:

  > **> 0.05 bar (0.75 psi) partial pressure of H₂S** in the gas phase, AND **liquid water present**
  >  → 이 조건을 만족하면 Sour Service로 간주

- **출처**:

  - Shell DEP 31.22.05.10-Gen (Material Selection for Sour Services)

------

## 🔍 요약 비교표

| 기준            | 정의 요약                           | 적용 분야               | 참고 규격       |
| --------------- | ----------------------------------- | ----------------------- | --------------- |
| **NACE MR0175** | Upstream H₂S + Water + Stress 환경  | Oil & Gas 생산          | ISO 15156       |
| **NACE MR0103** | Downstream 설비에서의 SSC 방지      | 정유, 석유화학          | MR0103:2012     |
| **ASME B31.3**  | NACE 기준을 참조하되 직접 정의 없음 | 배관 설계               | ASME B31.3-2022 |
| **API 571**     | H₂S로 인한 SCC, HIC 메커니즘 설명   | 정유/석유화학 손상 분석 | API RP 571      |
| **Shell DEP**   | H₂S의 부분 압력 + 수분 존재 여부    | Shell 표준              | DEP 31.22.05.10 |