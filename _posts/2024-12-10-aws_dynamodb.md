---
layout: single
title: "Amazon DynamoDB Overview part1"
categories: AWS
tag: [blog, AWS]
search: true
typora-root-url: ../













---



**[**AWS**]**[**Amazon DynamoDB Overview Part 1**](https://park-chanyeong.github.io)
{: .notice--primary}

## DynamoDB Overview

![image-20241211035030209](/images/2024-12-10-aws_dynamodb/image-20241211035030209.png)

### What is DynamoDB?
- **DynamoDB**: AWS의 완전 관리형 NoSQL 데이터베이스 서비스.
  - 데이터는 고가용성을 위해 다중 AZ에 자동 복제됨.
  - 완전 분산형 데이터베이스로 확장 가능한 워크로드를 처리 가능.
  - 초당 수백만 건의 요청, 테라바이트급 스토리지를 지원.

#### 주요 특징
1. **스키마리스 데이터 구조**
   - 고정된 스키마 없이 데이터를 저장하며, 각 항목의 속성은 필요에 따라 추가 가능.
   - 예시: 온라인 쇼핑몰에서 상품 데이터가 각기 다른 속성을 가질 때 유용.
     - 상품 A: {"이름": "노트북", "가격": 1000, "카테고리": "전자기기"}
     - 상품 B: {"이름": "책", "저자": "홍길동", "카테고리": "서적"}
2. **빠른 성능**
   - 낮은 지연 시간과 일관된 성능 제공.
   - 예시: IoT 센서에서 실시간으로 수집된 데이터를 처리할 때.
3. **보안**
   - IAM 통합으로 인증 및 권한 관리 가능.
   - 예시: 특정 사용자 그룹에 읽기 전용 권한 제공.
4. **자동 확장성**
   - 수요에 따라 용량 자동 조정.
   - 예시: 블랙프라이데이와 같은 트래픽 급증 상황에서 유연한 확장 가능.

---

### DynamoDB 테이블 기본 구성
1. **테이블**:
   - 테이블은 항목(row)과 속성(column)으로 구성.
   - 테이블은 Primary Key로 항목을 고유하게 식별.
   - 예시: "사용자 테이블"에 고유 사용자 ID를 Primary Key로 사용.

2. **Primary Key**:
   - Partition Key (HASH Key): 고유 식별자를 사용하여 항목 분배.
     - 예시: 사용자 ID, 주문 번호 등.
     - ![image-20241211035129809](/images/2024-12-10-aws_dynamodb/image-20241211035129809.png)
   - Partition Key + Sort Key (HASH + RANGE Key): 정렬 가능한 추가 키로 데이터 그룹화.
     - 예시: "사용자 ID" + "주문 날짜" 조합으로 사용자별 주문 이력 관리.
     - ![image-20241211035110509](/images/2024-12-10-aws_dynamodb/image-20241211035110509.png)
   
3. **속성**:
   - 지원 데이터 타입:
     - 스칼라 타입: String, Number, Binary, Boolean, Null.
     - 문서 타입: List, Map.
     - 집합 타입: String Set, Number Set, Binary Set.
   - 항목 크기 제한: 400KB.
   - 예시: 사용자 프로필 데이터에 다양한 데이터 타입 활용.
     - {"이름": "홍길동", "나이": 25, "취미": ["축구", "독서"]}

---

### Capacity Modes
1. **프로비저닝 모드**:
   - 읽기 및 쓰기 용량을 명시적으로 설정.
   - **WCU (Write Capacity Unit)**: 1초 동안 1KB 데이터 쓰기 가능.
   - **RCU (Read Capacity Unit)**: 1초 동안 Strongly Consistent Read 기준 4KB 데이터 읽기 가능.
   - 예시: 매일 일정량의 데이터를 처리하는 로그 저장 시스템.
2. **온디맨드 모드**:
   - 사용량에 따라 자동으로 처리 용량 조정.
   - 초기 설정 없이 탄력적인 리소스 관리 가능.
   - 예시: 트래픽 패턴이 예측 불가능한 스타트업의 애플리케이션.

---

### 데이터 읽기/쓰기
1. **데이터 읽기**
   - **Strongly Consistent Read**: 항상 최신 데이터 보장.
     - 예시: 금융 거래 시스템에서 실시간 계좌 잔액 확인.
   - **Eventually Consistent Read**: 지연된 일관성, 더 높은 처리량 제공.
     - 예시: 뉴스 애플리케이션에서 뉴스 댓글 로딩.
2. **데이터 쓰기**
   - 항목이 Primary Key를 기준으로 테이블에 저장.
   - 예시: 온라인 주문 처리 시스템에서 주문 데이터 저장.

---

### Indexes
1. **Global Secondary Index (GSI)**:
   - 기존 Primary Key 외 다른 속성으로 데이터 조회 가능.
   - 별도 용량(WCU/RCU)을 프로비저닝.
   - 예시: 사용자 테이블에서 이메일 주소로 검색 가능하도록 설정.
2. **Local Secondary Index (LSI)**:
   - 동일한 Partition Key를 공유하는 데이터 조회.
   - 테이블 생성 시에만 추가 가능.
   - 예시: 사용자 ID를 기준으로 최신 로그를 시간순으로 조회.

---

### DynamoDB Streams
- **DynamoDB Streams**: 항목의 생성, 수정, 삭제 작업을 스트림 데이터로 기록.
  - 스트림 데이터는 24시간 동안 보존.
  - **사용 사례**:
    - 실시간 이벤트 처리 (예: 신규 사용자 환영 이메일).
    - 데이터 분석.
    - 교차 리전 복제.
  - 예시: 채팅 애플리케이션에서 메시지 업데이트 이벤트를 실시간 반영.

---

### Time To Live (TTL)
- **TTL**: 지정된 시간 이후 데이터가 자동 삭제되도록 설정.
  - 스토리지 최적화 및 규정 준수를 위해 유용.
  - 예시: 30일이 지난 쿠폰 데이터를 자동 삭제.

---

### DynamoDB의 데이터 엔지니어링 활용 사례
1. **데이터 처리 파이프라인**:
   - DynamoDB Streams를 활용하여 실시간 데이터 스트리밍 구축.
   - 예시: IoT 센서 데이터가 DynamoDB로 입력되고 스트림을 통해 분석 시스템으로 전송.
2. **규모 확장이 필요한 애플리케이션**:
   - IoT 데이터 수집 및 처리.
   - 예시: 스마트 홈 시스템에서 수백만 개의 장치 상태를 저장.
3. **빅데이터 처리**:
   - MapReduce 작업의 중간 상태 저장소로 사용.
   - 예시: DynamoDB에 중간 데이터를 저장하고 Amazon EMR로 최종 분석 수행.