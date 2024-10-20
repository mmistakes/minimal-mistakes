---
title: "[GCP] AWS MariaDB 를 GCP MySQL 로 이전하기"
excerpt: "AWS MariaDB를 GCP MySQL로 이전하는 내용을 정리합니다."
#layout: archive
categories:
 - Aws
tags:
  - [aws, rds]
#permalink: mysql-architecture
toc: true
toc_sticky: true
date: 2024-10-20
last_modified_at: 2024-10-20
comments: true
---

### 🤔GCP MySQL로 이전하는 배경
--- 

제가 속한 회사는 멀티 클라우드 환경에서 AWS, GCP, Azure를 활용해 플랫폼을 운영하고 있습니다. 이런 구조에서 종종 GCP의 GKE에서 AWS의 RDS에 연결해야 하는 경우가 발생하기도 했는데, 이는 운영 비용 증가를 유발하기도 했습니다. 특히, GCP에서 AWS로의 데이터 전송은 DTO(Data Transfer Out)를 발생시켜 불필요한 비용을 부담해야하는 상황을 만들었습니다. GCP의 같은 리전 내 모든 플랫폼이 구축되어 있을 경우 DTO는 무비용이 되는 반면 AWS <-> GCP 를 경유할 경우 중간다리 역할을 하는 AWS Transit Gateway 의 사용량을 증가시켜 비용을 발생시켰기 때문입니다.

![Transit Gateway peering across Regions](https://github.com/user-attachments/assets/b0c7317b-9d18-4f7f-95b1-eb75358ed554)

<br>

위의 그림은 AWS 에서 제공하는 다른 리전간에 VPC를 서로 연결시키기 위해 Transit Gateway를 생성하고 각 VPC 간 Attachment 를 생성한 구조입니다. 요금 구조를 보면 Attachment 당 데이터 전송량을 기준으로 비용을 청구하고 있습니다.(Transit Gateway 간의 피어링 구간에서는 이중 청구되진 않고 한쪽의 전송량을 기준으로 청구됩니다.)


![AWS TransitGateway 발생비용](https://github.com/user-attachments/assets/01601e96-da1d-4342-aec2-c16cf73a3d5d)
[그림1] AWS TransitGateway 발생비용

<br>

\[그림1\]은 평균적으로 초당 20mb의 egress를 TransitGateway가 처리했을 때 발생하는 비용입니다. 보는 바와 같이 월 청구 비용은 1,063.60 USD 가 됩니다. 연으로 계산하면 대략 1,800만원 정도 발생하는 비용입니다. 금액이 작다고 하면 작은(?) 금액일 수 있습니다만 충분히 줄일 수 있는 금액입니다. 그리고 회사 내부 상황상 AWS RI의 만료시점과 GCP의 약정사용할인(CUD) 계약이 맞물리면서 Migration에 대한 명분이 가속화 되었던 측면도 있었습니다. 덕분에 AWS RDS MariaDB 를 GCP SQL(MySQL) 로 이전하는 것을 계획하게 되었습니다.

<br>

### ✏️마이그레이션 방법 선정
---

AWS 의 RDS MariaDB 엔진을 GCP Cloud SQL 로 변경하기 위한 작업을 수행하기 위해 아래와 같은 방법을 고민했었습니다. (참고로 저희는 AWS 환경에서는 MariaDB 10.6 버전을 사용중에 있었고, GCP MySQL 8.0.34 버전을 사용하였습니다.)

![그림2](https://github.com/user-attachments/assets/87b5b2cd-607a-4bf2-9fd5-df0a1783c1c6)
[그림2] 데이터베이스 마이그레이션 이전 방안

<br>

\[그림2\]에 나와 있는대로 크게 3가지 정도를 고민했었습니다. 1안은 논리 백업 / 복원을 이용한 방식, 2안은 CHANGE REPLICATION SOURCE TO 명령어를 수행한 자체 복제 기능 가능여부, 3안은 클라우드 벤더에서 제공하는 DMS 를 활용하는 방안입니다. 각 이전 방법에 대한 장,단점을 나열해 보면 아래와 같았습니다.

| 이전방법                                | 장점                                             | 단점                                                         |
|-----------------------------------|--------------------------------------------------|--------------------------------------------------------------|
| 1안. 논리 백업 / 복원             | 작업 방식 단순화, 용이성                          | 백업 시점 이후 발생된 변경 데이터 소실, 복구 시간동안 다운타임 발생|
| 2안. MariaDB와 MySQL 간 복제 연동 | DBMS 자체 복제 기능을 이용, 다운타임 최소화            | 최신 MySQL, MariaDB에 대한 이기종 복제 가능 여부 검토 필요 → 확인 결과 복제 불가능 필요         |
| 3안. DMS(Data Migration Service) 사용 | 이기종 DBMS에 대한 이관 가능, 다운타임 최소화                    | 계정생성, 보조 인덱스와 이벤트 스케줄러, 프로시저 등의 생성 작업은 별도로 진행해야 함 |

<br>

### 📝GCP MySQL 이전을 위한 최종 결정
---

GCP Cloud SQL(MySQL)로 이전을 하기 위해 저희는 3안을 사용하기로 결정하였습니다. 3안을 결정하는데 있어서 가장 큰 이유는 다운타임을 최소화 할 수 있었기 때문입니다. 그런데 3안의 경우도 2가지를 고민하게 되었는데요. 이유는 **[Private Service Access](https://cloud.google.com/vpc/docs/private-services-access)** 때문입니다. 

![Private Service Access 개념](https://github.com/user-attachments/assets/dd4930ae-0798-4bc0-b9dc-e539eb93c6d9)
[그림3] GCP Priavte Service Access

<br>

GCP SQL과 같은 관리형 상품들을 내부 VPC 망에서만 Inter Connect 할 수 있는 전용 서브넷을 설정할 수 있는데 이 것이 Private Service Access(PSA)입니다. 해당 설정은 GCP SQL(MySQL)을 구성하려면 필수적으로 사용해야만 합니다. 즉, 내부 VPC에서만 연결 가능한 서브넷에 구축되기 때문에 외부 VPC 에서는 연결이 기본적으로 불가능합니다.  그렇다면 이관 자체가 불가능한 상황이기 때문에 이를 해결할려면 외부망과 연결해줘야하는 작업이 수반되어야 했습니다. 하이브리드 네트워킹 시나리오에서는 Cloud VPN 연결 설정을 통해 AWS 망에서도 GCP Cloud SQL에 직접 연결이 가능했습니다. 이전 시점에는 직접 통신하는 설정이 불가능했기 때문에 보안팀에서 작업 지원이 필요했습니다. 만일 직접 통신이 가능했다면 이관 방식은 아래와 같았습니다.


![AWS DMS 단독사용](https://github.com/user-attachments/assets/fe960a1b-c27a-4776-bd97-2059a854e676)    
[그림4] AWS DMS를 이용한 데이터 마이그레이션

<br>

단순합니다. AWS RDS Subnet Group 과 GCP Cloud SQL의 PSA 네트워크 대역과 통신이 가능한 AWS DMS 전용 서브넷 그룹에 AWS의 Database Migration Service 를 구축하여 이관하는 방법입니다. 작업자 입장에서 제일 깔끔한 방법입니다. AWS가 발전해오는 동안 DMS 또한 상당히 많이 발전되어 개인적으로 현존하는 Cloud 3사의 DMS 중 가장 안정성이 높다고 생각하고 있습니다.(GCP에도 DMS가 존재하지만 GTID 모드가 필수로 설정되어야하는데 AWS MariaDB RDS 는 GTID 모드 설정이 불가능했기에 이관 방안에서 애초에 제외되기도 했었습니다.)


![VPN 설정 작업](https://github.com/user-attachments/assets/7ac5de3b-c296-4316-8b94-8d082d455135)     
[그림4] 사용중인 GCP 망의 네트워크 순단을 유발했던 VPN 설정 작업


<br/>



### 🚀이관 작업 계획
---

지금까지 RDS 의 연결 현황을 정리하기 위한 유용한 cli 들에 대해 소개해드렸습니다. 하지만 해당 cli 만을 이용하여 필요한 정보를 손쉽게 추출하기에는 어려움이 있을 수 있습니다. 그래서 cli 를 통해 raw 데이터를 받아오고 DBMS 테이블에 적재시킨 뒤 원하는 정보들만 SQL 로 질의하면 조금 더 데이터를 유용하게 다룰 수 있습니다. 다음 포스팅에서는 Python 코드를 이용하여 cli 를 실행하여 테이블에 적재하고, 필요한 정보를 조회하는 과정을 다뤄보도록 하겠습니다. 감사합니다.

<br>

### 📚 참고자료
---
- [AWS Database Migration Service](https://docs.aws.amazon.com/ko_kr/dms/latest/userguide/Welcome.html)
- [AWS DMS - MySQL을 소스로 사용](https://docs.aws.amazon.com/ko_kr/dms/latest/userguide/CHAP_Source.MySQL.html)
- [AWS DMS best practices for moving large tables with table parallelism settings](https://aws.amazon.com/ko/blogs/database/aws-dms-best-practices-for-moving-large-tables-with-table-parallelism-settings/)
- [GCP SQL 가격정책](https://cloud.google.com/sql/pricing?hl=ko#storage-networking-prices)
- [AWS RDS 서비스 전송 비용](https://aws.amazon.com/ko/blogs/korea/exploring-data-transfer-costs-for-aws-managed-databases/)
- [AWS RDS 가격 정책](https://aws.amazon.com/ko/rds/mysql/pricing/)
- [공통 아키텍처에 대한 데이터 전송 비용 개요](https://aws.amazon.com/ko/blogs/architecture/overview-of-data-transfer-costs-for-common-architectures/)

<br/>
---

{% assign posts = site.categories.Mysql %}
{% for post in posts %} {% include archive-single2.html type=page.entries_layout %} {% endfor %}