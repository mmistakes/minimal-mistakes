---
layout: single
title: "Damage Mechanisms in API571 vs. API580"
categories: Piping
tag: [Damage Mechanisms, API571, API580]
toc: true
---

> **API 571**은 *“어떤 손상이 왜·어떻게 생기고, 어떻게 찾을 것인가”*를 깊이 파고드는 **카탈로그**이고,  
> **API 580**은 RBI 프로세스 안에서 *“그 손상이 설비 위험도에 어떤 영향을 주는가”*를 **프레임워크**로 다룬다.

---

## 1️⃣ 문서 목적부터 다르다

| 구분          | API 571 (3rd Ed., 2020)                                      | API 580 (3rd Ed., 2021)                                      |
| :------------ | :----------------------------------------------------------- | :----------------------------------------------------------- |
| **정식 명칭** | *Damage Mechanisms Affecting Fixed Equipment in the Refining Industry* | *Risk-Based Inspection*                                      |
| **주요 목적** | 정유·석화 설비에 발생 가능한 **~70 여 가지 손상 메커니즘**의 _발생 원인, 영향 인자, 감지·완화 방법_ 제시 | **RBI 프로세스**(팀 구성→DM 식별→PoF/CoF 평가→검사전략) 최소 요구 사항 정의 |
| **사용 대상** | 검사·재료·무결성 엔지니어, API 510/570 시험 대비             | 자산 무결성·RBI 프로그램 오너                                |
| **참조 관계** | –                                                            | DM 식별 단계에서 **API 571·API RP 941 등** 인용을 요구 |

---

## 2️⃣ “Damage Mechanism” 서술 방식 비교

### 🟢 API 571 ― *Deep Dive Catalog*

- **5개 대분류**  
  1. 일반 부식/마모 (General Metal Loss)  
  2. 고온 손상 (High-Temperature)  
  3. 수소 손상 (Hydrogen Damage)  
  4. 환경취성·SCC (EAC)  
  5. 기계적·물리적 손상 (Mechanical) 
- **8-항목 템플릿**  
  _Description → Affected Materials → Critical Factors → Appearance/ Morphology → Prevention / Mitigation → Inspection / Monitoring → Related Mechanisms → References_

> ➡️ 손상 “백과사전” 역할. 설비에 나타난 징후를 보고 *역추적*하기 좋다.

### 🔵 API 580 ― *Risk Lens & Gatekeeper*

- **손상 자체를 상세히 설명하지 않는다.**  
  대신 ‘RBI 팀은 **모든 잠재적 DM**을 식별해야 하며, 필요 시 **API 571을 참고**하라’고 요구 
- Annex A·B 등에서 **예시 카테고리**만 제시  
  - 외부 부식, 내부 저온/고온 부식, SCC, 유동가속 손상 등  
  - 각 카테고리별로 *“해당되면 PoF 계산 시 고려”*라고 지침

> ➡️ 손상 설명은 얕고, **PoF·CoF 산정** 과정(빈도 테이블, 신뢰도 계수)에 집중.

---

## 3️⃣ Workflow 상 위치

```mermaid
flowchart LR
  A(API 580<br>§5 DM Identification) --> B{DM 존재?}
  B -- Yes --> C(API 571<br>메커니즘 세부 이해·검증)
  C --> D(API 580<br>PoF 등급 결정)
  D --> E(API 581<br>정량 계산 선택 가능)