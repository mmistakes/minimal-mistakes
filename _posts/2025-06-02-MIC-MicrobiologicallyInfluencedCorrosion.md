---
layout: single
title: "MIC(Microbiologically Influenced Corrosion)"
categories: Piping
tag: [Corrosion, MIC]
toc: true
---

## Microbiologically Influenced Corrosion (MIC) – 개요 

*배관 & 플랜트 엔지니어가 알아야 할 미생물 부식 리스크*

------

### 1️⃣ MIC란 무엇인가?

MIC( **M**icrobiologically **I**nfluenced /**I**nduced **C**orrosion )은 **세균·곰팡이·조류 등 미생물 군집이 금속 표면에서 전기화학 반응을 촉진** 하거나 부식성 부산물을 생성해 배관·탱크·열교환기 등을 급격히 손상시키는 현상이다. 석유·가스, 수처리, 발전, 해양 구조물 같은 습윤 환경의 설비에서 주요 손상 기구(Damage Mechanism)로 분류된다.

------

### 2️⃣ MIC가 일어나는 메커니즘 

| 주요 균종                           | 특징                     | 부식 촉진 방식                                |
| ----------------------------------- | ------------------------ | --------------------------------------------- |
| **SRB** (Sulfate-Reducing Bacteria) | 혐기성, SO₄²⁻ → H₂S 환원 | H₂S 생성 → 황화철(FeS) 막 형성·산화 피막 파괴 |
| **APB** (Acid-Producing Bacteria)   | 유기산·무기산 생성       | pH 저하·국부 산성화에 의한 pitting            |
| **IRB** (Iron-Reducing Bacteria)    | Fe³⁺ → Fe²⁺ 환원         | 산화 피막(Fe₂O₃) 붕괴 → 보호층 손실           |
| **SFB** (Slime-Forming Bacteria)    | 점액성 biofilm 형성      | 산소 농도 구배 형성 → 차동(갈바닉) 부식       |



> **핵심 개념**
>
> - **Biofilm** 내부는 **무산소·저속 흐름** 조건이 되기 쉽고, 전기화학 반응이 국부적으로 집중되어 *deep pitting*을 유발한다.
> - 일반 전기화학 부식과 달리 **미생물 자체 대사산물이 전극 반응 지배** (예: SRB의 황화물).

------

### 3️⃣ MIC 위험을 키우는 조건 

- **유수속도 ↓** : `< 0.3–0.6 m/s` 에서 침전·biofilm 성장 가속
- **유·수 2상 혼합** : 유분 위 수분 포켓이 생겨 무산소 영역 형성
- **영양소** : 질소·인·황 및 탄소원(Crude oil 자체)
- **정체 구간 및 Dead-leg**
- **중간온도(20–60 °C)** : 다수 세균의 최적 성장 범위
- **보호 피막 열화** : 내부 코팅/페인트 탈락, 기계적 스크래치

------

### 4️⃣ Crude Oil 시스템에서 MIC가 특히 문제인 이유 

1. **물 함유(Free Water Cut)** → 미생물 생존 필수 수분 공급
2. **유속 확보 어려움** → 점도가 높아 저유속·정체 구간 형성
3. **유기물 풍부** → APB 성장 촉진, 유기산 농도 상승
4. **황·질소 화합물 존재** → SRB, NRB(Nitrate-Reducing Bacteria) 영양원
5. **Wax·Asphaltene 침전** → Biofilm Sub-strate 제공, 피그 제거 어려움

------

### 5️⃣ MIC 진단·모니터링 기법 

- **내부 부식 쿠폰(Weight-loss & Pitting Probe)**
- **배관 스케일/피그 배출 슬러지 분석** (SEM-EDS, XRD)
- **유·수 샘플의 ATP/세포 수 계수, qPCR**
- **전기화학 기법** : LPR(Linear Polarization Resistance), EIS
- **Inline Inspection(ILI)** : MFL·UT 위주 pitting 매핑
- **온라인 부식 센서** : ER(전자저항) Probe, ZRA(Galvanic) Probe

------

### 6️⃣ MIC 저감·관리 전략 

1. **설계 단계**
   - *Dead-leg 최소화*, 경사 확보로 Water Pooling 방지
   - **최소 설계유속 V<sub>min</sub> > 1 m/s** (API RP 14E, ISO 13623 등)
2. **운영·유지관리**
   - 정기 **Pigging** : Wax, Biofilm 제거 + 고속 스와빙 효과
   - **Batch / Continuous Biocide 주입** : Glutaraldehyde, THPS, DBNPA 등
   - **유속 유지** 또는 정기적 고속 Flush 운전
   - **내부 코팅 & Inhibitor** 병행 (FBE, Epoxy phenolic 등)
3. **재질·보호**
   - 내식성 합금(13Cr, 22Cr Duplex), *plastic-lined* 스풀
   - **CP(Cathodic Protection)** : 외부 MIC에 특히 유효
4. **모니터링 체계**
   - NACE SP0106 / SP0775에 따라 **Sampling Plan** 수립
   - KPI : pitting rate (mm/y), SRB cell count (CFU/mL), biocide demand

------

### 7️⃣ 적용 규격 & 참고 문헌

- **NACE SP0106** – MIC 현장 검사·평가 가이드
- **NACE SP0775** – 내면 부식 쿠폰 적용법
- **NACE SP0104** – 가스 수송관 Biocide 처리
- **NACE MR0175 (ISO 15156)** – 유황 환경 재료 요구 사항
- **API 571** §5.1.4 “Microbiological Induced Corrosion”
- **API RP 14E / ISO 13623** – 배관 최소 유속 선정 기준

------

## 8️⃣ 사례 연구 – 지중 Idle Line → 연결 재사용 계획

> **시나리오**
>
> - 기존 **지중 배관**(Long-term Idle) + **Crude Oil 운송** 계획
> - 설비 진입부에 **Branch Line** 연결 후 유속 ≈ 0.2 m/s 예상
> - Corrosion Professional(CP) : “**낮은 유속 + Crude Oil 내 SRB 존재** → MIC Risk 높아 승인 불가”

### (1) 거절 사유 기술

| 항목                | 설명                                    | 리스크                                     |
| ------------------- | --------------------------------------- | ------------------------------------------ |
| **저유속(0.2 m/s)** | Wax·Water Drop-out, Biofilm 성장        | 국부 pitting → 穿孔 (최대 > 3 mm/y)        |
| **Idle 기간**       | 잔류 Water Pocket, 산소 고갈 → 혐기조건 | SRB 활성, H₂S 포켓                         |
| **지중 배관**       | 온도 일정·무산소 → SRB 성장 최적        | 내부·외부 MIC 동시 진행                    |
| **Branch Dead-leg** | 30"→12" 관경 전이부 Flow Separation     | Mottling pitting, Erosion-Corrosion 시너지 |



### (2) 권장 대응 조치

1. **사전(Pre-commissioning) 클리닝**
   - Mechanical Pigging (Brush + BID) → High-Rate Flush > 2 m/s
   - *Chemical Cleaning* + Biocide (500–1000 ppm Glutaraldehyde for 6 h)
2. **재질·보호 강화**
   - 전이부 12" 스풀을 **03Cr-Duplex** 또는 **FBE Lined Pipe**로 교체
   - 내부 코팅 완료 후 **Holiday Test < 5 V/µm**
3. **운영 조건 재설계**
   - 정상 운전 **V ≥ 1 m/s** 및 **주 1회 고속 Flush 2 m/s, 1 h**
   - 연속 Biocide (Dual Program: Oxidizing + Non-Oxidizing) 투입
4. **모니터링 체계 구축**
   - 12" Branch 저점에 **Sampling Valve + Corrosion Coupon** 설치
   - 6 개월 주기로 **ILI-UT** 또는 **Smart Pig** 실시
   - KPI 알람 : pitting rate > 0.13 mm/y(5 mpy), SRB > 10⁴ CFU/mL

> **결론** : CP의 우려는 설계·운영 변경으로 상당 부분 완화할 수 있으나, *운전 속도*와 *모니터링·Biocide 주입*이 확보되지 않으면 재사용은 경제·안전 측면에서 타당하지 않다.

------

## 9️⃣ 마무리 – MIC 관리의 핵심 포인트 

- **“물 + 미생물 + 정체 = MIC”** 삼박자를 끊어라
- 계획 단계에서부터 **Dead-leg 제거·최소유속 확보** 설계
- **Pigging·Biocide·모니터링** 3종 세트를 주기적으로 실행
- NACE / API 권고치를 준수해 **데이터 기반 의사결정** 수립





