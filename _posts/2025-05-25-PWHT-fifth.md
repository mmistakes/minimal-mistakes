---
layout: single
title: "5.WPS와 PQR (Feat. PWHT 대상유무는 필수변수)"
categories: Piping
tag: [PWHT, WPS, PQR]
toc: true
---

### 정의

| 용어    | 풀네임                              | 핵심 개념                                                    |
| ------- | ----------------------------------- | ------------------------------------------------------------ |
| **WPS** | **Welding Procedure Specification** | “어떻게 용접할 것인가”를 기술하는 *공식 작업 지침서*         |
| **PQR** | **Procedure Qualification Record**  | WPS가 **실제 시험**을 통해 요구 기계적 성질을 충족했음을 기록·증명하는 *시험 성적서* |



> **요약:**
>
> - **WPS** = 설계도(Recipe)
> - **PQR** = 그 설계도가 실제로 **괜찮다는 증거(Certificate)**

------

### 왜 필요한가?

| 관점     | 필요 이유                                       |
| -------- | ----------------------------------------------- |
| **품질** | 용접부 강도·인성·내식성을 **재현성** 있게 확보  |
| **안전** | 고압·극저온·화학 플랜트에서 *파괴 사고* 예방    |
| **규정** | ASME IX, AWS D1.1 등 **국제 코드** 준수 의무    |
| **책임** | EPC / Owner / 감리 간 **분쟁 대비** (문서 근거) |



------

### WPS 작성 절차

1. **목표 범위 설정**
   - 모재 P-No., 두께, 배관경, 용접자격 범위 등
2. **공정 변수 선정**
   - 공정(GTAW, SMAW, GMAW…), 전류·전압·열입력, 예열·인터패스, 보호가스
3. **초안 WPS 작성**
   - 필수 & 비필수 변수 표기
4. **사전 검토**
   - QC/QA·감리·Owner 승인

> **Tip.** 프로젝트 초기에 “범용 WPS” 몇 개를 미리 만들어 두면, 공정 변경 시 수정·추가가 수월합니다.

------

### PQR(용접절차 검증시험) 절차

| 단계                      | 설명                             | 주요 기준                        |
| ------------------------- | -------------------------------- | -------------------------------- |
| **Test Plate/ Pipe 준비** | WPS 범위 내 모재·두께·Joint      | ASME IX QW-451                   |
| **시험 용접**             | WPS 초안대로 100 % 수행          | 데이터 로깅 필수                 |
| **비파괴 검사(NDT)**      | VT → RT/UT → MT/PT               | 결함 ZERO 요구                   |
| **기계시험**              | 인장·굽힘, 경도, 샤르피(V notch) | *Acceptance* = ASME IX QW-153 등 |
| **PQR 작성**              | 실측 변수 & 시험 결과 기록       | 서명·날인 후 보관                |
| **WPS 최종 승인**         | PQR 근거로 WPS 확정              | 감리/Owner 서명                  |



------

### Essential · Non-Essential · Supplementary Essential 변수

| 구분                                  | 변수 유형                                 | 대표 변수 예시                                               | 변경 시 재자격검증 필요 여부                  | ASME IX 조항 |
| ------------------------------------- | ----------------------------------------- | ------------------------------------------------------------ | --------------------------------------------- | ------------ |
| **Essential Variables**               | 기계적 성질(인장강도·경도 등)에 직접 영향 | • Base Metal P-Number • Filler Metal F-Number • Welding Process (SMAW, GMAW 등) • Base Metal Thickness (시험 범위 외) • Electrical Characteristics (AC/DC, Polarity) • **PWHT 시행 여부·온도·시간** • Joint Design (Root opening, Groove angle) • Backing 방식 (Strip ↔ Gas) | ▶ 변경 시 **PQR 재인증** 필요                 | QW-251.2     |
| **Supplementary Essential Variables** | 충격시험(Impact Test) 요구 시만 필수      | • Minimum Preheat Temperature • Maximum Interpass Temperature • Heat Input limits • PWHT 유지조건 (충격시험용 시편) • Notch-toughness 시험편 치수·조건 | ▶ 충격시험 요건일 때만 **PQR 재인증** 필요    | QW-256       |
| **Non-Essential Variables**           | 기계적 성질에 영향 미미                   | • Welding Position (1G, 2F 등) • Travel Speed & Heat Input (시험 범위 내) • Shielding Gas Flow Rate (시험 범위 내) • Electrode/Flux Trade Name • Root Opening Gap (시험 허용치 내) • Cleaning Method & 횟수 | ▶ 변경 시 **재인증 불필요**, 단 WPS 기록 필수 | QW-251.3     |

> **코드 핵심(ASME IX QW-250)**
>
> - 충격시험(–20 °C 이하 설계 등)이 요구되면 **Supplementary Essential**도 **PQR 재검증** 대상
> - PWHT 스킵 ↔ 실시 전환 = **새 PQR** 필수

------



### ✅PWHT와 관련된 실무 사례

**PWHT대상** 유무에 대해 현장 QC 팀으로 전달되는 과정은 아래와 같다.
1. Line list 상 라인별 PWHT 대상 적용 
- PWHT Requirment 있는 Piping Class -> 고온/고압 또는 H2S 환경 등
- P no. 별 두께 조건 적용
- 인허가 요구사항 반영
2. 현장 QC 팀에서 PQR의 여러 조건 (PWHT 적용 여부 포함) 확인하여 PQR 승인(혹은 차용), WPS 승인 진행함 

**PWHT 의 적용 여부**가 바뀌었을 때 PQR, WPS 재승인 업무가 필요하게 됨