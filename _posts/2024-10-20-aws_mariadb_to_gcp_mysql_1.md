---
title: "[GCP] AWS MariaDB 를 GCP MySQL 로 이전 - 계획편"
excerpt: "AWS MariaDB를 GCP MySQL로의 이전 계획을 정리합니다."
#layout: archive
categories:
 - Gcp
tags:
  - [aws, rds, gcp, cloudsql, mysql, mariadb]
#permalink: mysql-architecture
toc: true
toc_sticky: true
date: 2024-10-20
last_modified_at: 2024-10-20
comments: true
---

### 🤔GCP Cloud SQL(MySQL) 이전 배경
--- 

제가 속한 회사는 멀티 클라우드 환경에서 AWS, GCP, AZURE 클라우드를 활용해 플랫폼을 운영하고 있습니다. 이런 구조에서 종종 GCP의 GKE에서 AWS의 RDS에 연결해야 하는 경우가 발생하기도 했는데, 이는 운영 비용 증가를 유발하기도 했습니다. 특히, GCP에서 AWS로의 데이터 전송은 DTO(Data Transfer Out)를 발생시켜 불필요한 비용을 부담해야하는 상황을 만들었습니다. GCP의 같은 리전 내 모든 플랫폼이 구축되어 있을 경우 DTO는 무비용이 되는 반면 AWS <-> GCP 를 경유할 경우 중간다리 역할을 하는 AWS Transit Gateway 의 사용량을 증가시켜 비용을 발생시켰기 때문입니다.

![Transit Gateway peering across Regions](https://github.com/user-attachments/assets/b0c7317b-9d18-4f7f-95b1-eb75358ed554)    
[그림] Transit Gateway peering across Regions

<br>

위의 그림은 AWS 에서 제공하는 다른 리전간에 VPC를 서로 연결시키기 위해 Transit Gateway를 생성하고 각 VPC 간 Attachment 를 생성한 구조입니다. 요금 구조를 보면 Attachment 당 데이터 전송량을 기준으로 비용을 청구하고 있습니다.(Transit Gateway 간의 피어링 구간에서는 이중 청구되진 않고 한쪽의 전송량을 기준으로 청구됩니다.)


![AWS TransitGateway 발생비용](https://github.com/user-attachments/assets/01601e96-da1d-4342-aec2-c16cf73a3d5d)    
[그림1] AWS TransitGateway 발생비용

<br>

\[그림1\]은 평균적으로 초당 20mb의 egress를 TransitGateway가 처리했을 때 발생하는 비용입니다. 보는 바와 같이 월 청구 비용은 1,063.60 USD 가 됩니다. 연으로 계산하면 대략 1,800만원 정도 발생하는 비용입니다. 금액이 작다고 하면 작은(?) 금액일 수 있습니다만 충분히 줄일 수 있는 금액입니다. 그리고 회사 내부 상황상 AWS RI 만료시점과 GCP의 약정사용할인(CUD) 계약이 맞물리면서 Migration에 대한 명분이 가속화 되었던 측면도 있었습니다. 덕분에 AWS RDS MariaDB 를 GCP Cloud SQL(MySQL) 로 이전하는 것을 계획하게 되었습니다.

<br>

### ✏️마이그레이션 방안
---

AWS 의 RDS MariaDB 엔진을 GCP Cloud SQL 로 변경하기 위한 작업을 위해 아래와 같은 방법을 고민했었습니다. (참고로 저희는 AWS 환경에서는 MariaDB 10.6 버전을 사용중에 있었고, GCP MySQL 8.0.34 버전을 사용하였습니다.)

![그림2](https://github.com/user-attachments/assets/87b5b2cd-607a-4bf2-9fd5-df0a1783c1c6)    
[그림2] 데이터베이스 마이그레이션 이전 방안

<br>

\[그림2\]에 나와 있는대로 크게 3가지 정도를 고민했었습니다. 1안은 논리 백업 / 복원을 이용한 방식, 2안은 CHANGE REPLICATION SOURCE TO 명령어를 수행한 자체 복제 기능 가능여부(혹은 유사한 외부 복제 지원 기능), 3안은 클라우드 벤더에서 제공하는 DMS 를 활용하는 방안입니다. 각 이전 방법에 대한 장,단점을 나열해 보면 아래와 같았습니다.

| 이전방법                                | 장점                                             | 단점                                                         |
|-----------------------------------|--------------------------------------------------|--------------------------------------------------------------|
| 1안. 논리 백업 / 복원             | 작업 방식 단순화, 용이성                          | 백업 시점 이후 발생된 변경 데이터 소실, 복구 시간동안 다운타임 발생|
| 2안. MariaDB와 MySQL 간 복제 연동 | DBMS 자체 복제 기능을 이용, 다운타임 최소화            | 최신 MySQL, MariaDB에 대한 이기종 복제 가능 여부 검토 필요 → 확인 결과 복제 불가능         |
| 3안. DMS(Data Migration Service) 사용 | 이기종 DBMS에 대한 이관 가능, 다운타임 최소화                    | 계정생성, 보조 인덱스와 이벤트 스케줄러, 프로시저 등의 생성 작업은 별도로 진행해야 함 |

<br>

### 📝마이그레이션 방안 선정
---

GCP Cloud SQL(MySQL)로 이전을 하기 위해 저희는 3안을 사용하기로 결정하였습니다. 3안을 결정하는데 있어서 가장 큰 이유는 다운타임을 최소화 할 수 있었기 때문입니다. 그런데 3안의 경우도 2가지를 고민하게 되었는데요. 이유는 **[Private Service Access](https://cloud.google.com/vpc/docs/private-services-access)** 때문입니다. 

![Private Service Access 개념](https://github.com/user-attachments/assets/dd4930ae-0798-4bc0-b9dc-e539eb93c6d9)    
[그림3] GCP Priavte Service Access

<br>

GCP Cloud SQL과 같은 관리형 상품들은 내부 VPC 망에서만 Inter Connect 할 수 있는 전용 서브넷을 설정해야 하는데 이것이 Private Service Access(PSA)입니다. 해당 설정은 GCP Cloud SQL(MySQL)을 구성하려면 필수적으로 사용해야만 합니다. 즉, 내부 VPC에서만 연결 가능한 서브넷에 구축되기 때문에 외부 VPC 에서는 연결이 기본적으로 불가능합니다.  그렇다면 이관 자체가 불가능한 상황이기 때문에 이를 해결할려면 외부망과 연결해줘야하는 작업이 수반되어야 했습니다. 저희의 경우 AWS 망에서도 GCP Cloud SQL에 직접 연결하려면 Cloud VPN 연결 설정을 해야만 했습니다. 이전 시점에는 해당 설정이 안되어 있어 보안팀의 작업 지원이 필요했습니다. 만일 직접 통신이 가능하면 이관 방식은 \[그림4\]를 사용할 예정이었습니다.


![AWS DMS 단독사용](https://github.com/user-attachments/assets/fe960a1b-c27a-4776-bd97-2059a854e676)    
[그림4] AWS DMS를 이용한 데이터 마이그레이션

<br>

\[그림4\]는 AWS RDS 서브넷 그룹 과 GCP Cloud SQL의 PSA 네트워크 대역과 통신이 가능한 AWS DMS 전용 서브넷 그룹에 AWS의 Database Migration Service 를 구축하여 이관하는 방법입니다. 작업자 입장에서 제일 깔끔한 방법입니다. AWS가 발전해오는 동안 DMS 또한 상당히 많이 발전되어 개인적으로 현존하는 Cloud 3사의 DMS 중 가장 안정성이 높다고 생각하여 최우선적으로 선정하였습니다.(GCP에도 DMS가 존재하지만 GTID 모드가 필수로 설정되어야하는데 AWS MariaDB RDS 는 GTID 모드 설정이 불가능했기에 이관 방안에서 애초에 제외되기도 했었습니다.) 개발환경 테스트 시에도 특별한 문제가 없었습니다.

<br>

그러나 Cloud VPN 설정작업을 하는 동안 GCP 망의 모든 리소스에 순단이 발생할 가능성이 있어 보안팀에서 작업을 주저하기도 하였습니다. 하지만 작업 시간이 길지 않다는점, 그리고 현재 GCP 내부망에 있는 리소스들이 메인서비스들이 아니었기 때문에 CTO님의 책임과 권한(?)으로 얼마든지 작업은 가능했었습니다. 👍👍👍👍👍 

또한 향후 AWS 내부에 있는 시스템들도 GCP 플랫폼으로 전환하려는 계획을 갖고 있었기 때문에 향후에 언제 한번은 꼭 작업이 이루어져야하기도 했습니다.(AWS 시스템을 전체 이전하더라도 DB 만 GCP로 잠시 먼저 이관될 시점도 존재할 수 있기 때문에 해당 상황을 고려하면 언젠가는 해야 할 작업이기도 했습니다.)

하지만 네트워크 작업이 불가능할 경우도 대비하여 아래와 같은 시나리오도 마련해두었습니다.

![경유 DBMS 구축](https://github.com/user-attachments/assets/4a792916-5af4-4afa-b901-cf7d93680e51)
[그림5] AWS DMS + GCP IaaS MySQL + GCP 외부복제기능사용

<br>

\[그림5\]는 PSA 망에 있는 GCP Cloud SQL 로 직접 이관이 불가능하기 때문에 PSA 망이 아닌 일반 서브넷에 GCP MySQL을 IaaS 형태로 구축 후 1차 이관(이 때 IaaS MySQL에는 GTID 모드가 활성화 되어 있어야함), 2차이관으로 GCP Cloud SQL 외부 복제 기능을 사용합니다.(AWS의 rds_set_external_master 프로시져와 유사한기능, 단 GCP에서는 MySQL 내부에서 프로시져를 호출하는 방법이 아니라 curl 을 이용한 REST API 호출 방식이라 테스트 해보면 불편하고 다소 어색한 느낌이 드실겁니다.)   

위의 구조는 이관을 위해 AWS에는 DMS 를 생성하고 GCP에는 MySQL 리소스 생성과 외부복제 기능을 설정해야하는 작업이 발생하여 \[그림4\]에 비해 추가적인 작업들이 필요해 여러모로 불편한 방식이었습니다. 하지만 VPN 설정 작업을 하지 않아도 DBMS 이전은 가능한 방식이었습니다.

<br/>



### 🚀GCP MySQL 이전을 위한 최종 결정
---

작업 방식을 어떻게 정했을까요?    
위의 이전계획들을 정리하여 유관자들을 초청하여 회의를 열고 작업방식을 선정한 끝에 AWS DMS 를 단독으로 사용하는 방법을 쓰기로 결정하였습니다. 현재의 DTO 를 유발하는 프로젝트 뿐만 아니라 기존의 AWS 시스템들을 GCP 로 이전해야 할 시나리오도 고민해본다면 지금 VPN을 설정하는 것이 낫겠다는 판단 때문이었습니다. 

단, AWS 시스템을 이전할 때 완전 이전 과정에서 AWS EKS <-> GCP Cloud SQL 간의 DTO 가 발생할 것을 우려하기도 하였지만 내부 기술력을 믿고 빠르게 완수해줄 것이라 믿어준 내부 책임자들의 멋진 결정이었습니다. 그리하여 사용량이 적은 새벽 시간대에 외부망과 PSA 대역의 통신허용을 위한 VPN 작업을 수행하게 되었습니다.

![VPN 설정 작업](https://github.com/user-attachments/assets/758b4799-5407-4033-b02c-8c9e84d50667)   
[그림4] 사용중인 GCP 망의 네트워크 순단을 유발했던 VPN 설정 작업

<br>

AWS DMS 를 이용한 이전 작업은 역시나 이관 작업의 효율성을 매우 높여주었습니다. 물론 MySQL 엔진으로 전환하면서 추가로 작업해야할 사항도 있었지만 해결할 수 있는 문제들이었습니다.

![image](https://github.com/user-attachments/assets/c156b852-9932-4042-a444-ee20519d4ce4)
[그림5] 성황리에 마친(?) GCP SQL로의 이관작업

이후 포스팅에서는 AWS DMS 를 사용하여 이관을 하는 시나리오에 대해 별도로 글을 작성할 예정입니다. 그리고 번외로 외부망과 Private Service Access 망 연결이 불가능할 때의 작업 방법도 포스팅해도록 하겠습니다. 감사합니다.


<br>

### 📚 참고자료
---
- [AWS Database Migration Service](https://docs.aws.amazon.com/ko_kr/dms/latest/userguide/Welcome.html)
- [AWS DMS - MySQL을 소스로 사용](https://docs.aws.amazon.com/ko_kr/dms/latest/userguide/CHAP_Source.MySQL.html)
- [AWS DMS best practices for moving large tables with table parallelism settings](https://aws.amazon.com/ko/blogs/database/aws-dms-best-practices-for-moving-large-tables-with-table-parallelism-settings/)
- [GCP Cloud SQL 가격정책](https://cloud.google.com/sql/pricing?hl=ko#storage-networking-prices)
- [AWS RDS 서비스 전송 비용](https://aws.amazon.com/ko/blogs/korea/exploring-data-transfer-costs-for-aws-managed-databases/)
- [AWS RDS 가격 정책](https://aws.amazon.com/ko/rds/mysql/pricing/)
- [공통 아키텍처에 대한 데이터 전송 비용 개요](https://aws.amazon.com/ko/blogs/architecture/overview-of-data-transfer-costs-for-common-architectures/)

<br/>
---

{% assign posts = site.categories.Gcp %}
{% for post in posts %} {% include archive-single2.html type=page.entries_layout %} {% endfor %}