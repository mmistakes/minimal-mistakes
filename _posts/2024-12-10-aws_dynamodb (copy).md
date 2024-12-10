---
layout: single
title: "Amazon DynamoDB Overview part2"
categories: AWS
tag: [blog, AWS]
search: true
typora-root-url: ../













---



**[**AWS**]**[**Amazon DynamoDB Overview Part 2**](https://park-chanyeong.github.io)
{: .notice--primary}



## DynamoDB Overview: Part 2 

### Advanced DynamoDB Concepts

#### 1. **Transactions**
- DynamoDB는 **ACID 트랜잭션**을 지원하여 데이터 일관성과 무결성을 보장.
- 트랜잭션은 하나 이상의 테이블에서 여러 항목을 읽고 쓸 수 있음.
- 주요 API:
  - `TransactWriteItems`: 여러 항목에 대한 원자적 쓰기.
  - `TransactGetItems`: 여러 항목에 대한 일관된 읽기.
- 트랜잭션의 제한사항:
  - 한 번의 트랜잭션으로 최대 25개의 항목 작업 가능.
  - 4MB 크기 제한 존재.
- **사용 예시**:
  - 은행 애플리케이션에서 계좌 이체 작업 (A 계좌에서 출금하고 B 계좌에 입금).
  - 전자상거래 애플리케이션에서 주문 생성 시 재고 업데이트.

#### 2. **Partitioning and Performance**
- DynamoDB는 **Partition Key**를 기준으로 데이터를 파티셔닝하여 성능과 확장성을 보장.
- 파티션 설계:
  - **균등한 분배**가 중요. 핫 파티션(hot partition) 문제를 피해야 함.
  - 예시: 날짜를 Partition Key로 사용하지 말고, 사용자 ID와 결합하여 키를 다양화.
- 읽기/쓰기 처리량:
  - 파티션당 최대 처리량 제한 있음. 균형 잡힌 키 설계가 필수.
  - 예시: 글로벌 애플리케이션의 사용자 데이터를 지역별로 분배.

---

### DynamoDB Accelerator (DAX)

#### DAX 정의
- DAX는 DynamoDB의 인메모리 캐시 서비스로, 읽기 성능을 대폭 향상시키는 데 사용됨.
- **특징**:
  - 최대 10배 빠른 읽기 성능 제공.
  - 지연 시간이 마이크로초 단위로 감소.
  - API 호출 수정 없이 기존 DynamoDB 애플리케이션과 통합 가능.

#### DAX의 작동 방식
- DynamoDB 요청이 먼저 DAX 캐시로 전달됨.
  - 캐시에 데이터가 있을 경우 즉시 반환.
  - 캐시에 없는 경우 DynamoDB에서 조회 후 DAX에 캐싱.
- **일관성 모델**:
  - Eventual Consistency만 지원.

#### DAX 활용 사례
1. **읽기 집약적인 애플리케이션**:
   - 예시: 인기 상품 정보를 빠르게 조회하는 전자상거래 사이트.
2. **리더보드 시스템**:
   - Sort Key와 결합하여 빠른 순위 계산 제공.
   - 예시: 모바일 게임에서 실시간 리더보드.
3. **IoT 데이터 조회**:
   - 수백만 개의 IoT 장치 데이터를 빠르게 검색.
   - 예시: 스마트 홈 장치 상태 조회.

#### DAX 구성
- DAX 클러스터는 다중 노드로 구성 가능 (최대 10개).
  - **Primary Node**: 쓰기 작업 담당.
  - **Replica Node**: 읽기 작업 담당.
- 노드 간 자동 복제 및 장애 복구 지원.

---

### Backup and Restore

#### 1. **On-Demand Backup**
- 데이터 손실에 대비하여 언제든지 테이블의 전체 백업 생성 가능.
- 백업 생성 중에도 읽기/쓰기 작업에 영향을 미치지 않음.
- **사용 예시**:
  - 대규모 애플리케이션 업데이트 전 데이터 백업.

#### 2. **Point-in-Time Recovery (PITR)**
- 특정 시점으로 데이터 복구 가능.
- 최근 35일 내 데이터를 복원.
- **사용 예시**:
  - 실수로 데이터가 삭제되거나 수정된 경우 이전 상태로 복구.

---

### Security in DynamoDB

#### 1. **Encryption**
- **DynamoDB는 기본적으로 데이터를 암호화**하여 저장.
- AWS Key Management Service (KMS)를 사용하여 고객 관리형 키로 데이터 암호화 가능.
- **사용 예시**:
  - 민감한 사용자 데이터를 저장하는 애플리케이션.

#### 2. **Access Control**
- IAM 정책을 사용하여 사용자와 애플리케이션의 접근을 제어.
- Fine-grained access control:
  - 특정 항목 수준에서 권한을 부여 가능.
  - 예시: 특정 사용자만 자신의 데이터를 읽고 쓰도록 제한.

---

### Cross-Region Replication

- **Global Tables**: DynamoDB 테이블을 다중 리전에 걸쳐 복제하여 글로벌 애플리케이션 지원.
- **특징**:
  - 모든 리전에서 읽기 및 쓰기 가능.
  - 데이터 충돌 해결을 위한 최종 쓰기 승리 정책 적용.
- **사용 예시**:
  - 글로벌 사용자 기반을 가진 소셜 미디어 애플리케이션.

---

### Advanced Data Modeling

#### 1. **One-to-Many Relationships**
- **테이블 설계**:
  - Partition Key와 Sort Key를 조합하여 관계를 표현.
  - 예시: 사용자 ID를 Partition Key로, 주문 ID를 Sort Key로 사용하여 주문 기록 저장.

#### 2. **Many-to-Many Relationships**
- **테이블 설계**:
  - 보조 인덱스(GSI)를 활용하여 관계 탐색.
  - 예시: 학생과 수업 관계에서 학생 ID와 수업 ID를 각각 GSI로 설정.

---

### DynamoDB의 확장 사례

#### 1. **IoT Data Storage**
- 수백만 개의 IoT 장치에서 데이터를 실시간으로 수집하고 저장.
- **예시**: 스마트 가전제품의 상태 데이터.

#### 2. **Real-Time Analytics**
- DynamoDB Streams와 Lambda를 사용하여 실시간 데이터 분석 파이프라인 구축.
- **예시**: 사용자 활동 데이터를 기반으로 추천 시스템 작동.

#### 3. **Gaming Leaderboards**
- Sort Key를 활용하여 순위를 저장하고 조회.
- **예시**: 게임에서 상위 100명의 플레이어를 실시간으로 표시.
- DAX와 결합하여 읽기 속도를 극대화하여 수천만 사용자 지원 가능.