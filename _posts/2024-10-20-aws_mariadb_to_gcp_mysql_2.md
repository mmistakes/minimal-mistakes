---
title: "[GCP] AWS MariaDB 를 GCP MySQL 로 이전(2)"
excerpt: "AWS DMS를 이용하여 AWS RDS MariaDB를 GCP Cloud SQL MySQL로 이전하는 내용을 정리합니다."
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

### 📝AWS DMS 를 이용한 AWS RDS MariaDB 의 GCP Cloud SQL MySQL 이전
--- 
**[지난번 포스팅](https://duhokim0901.github.io/aws/aws_mariadb_to_gcp_mysql_1/#gcp-cloud-sqlmysql-%EC%9D%B4%EC%A0%84-%EB%B0%B0%EA%B2%BD)**에서 AWS RDS MariaDB를 GCP Cloud SQL MySQL 에 이전해야하는 배경과 이전 방안에 대해 정리하였습니다. AWS의 관리형 데이터베이스(RDS)를 GCP의 관리형 데이터베이스(Cloud SQL)로 이전하는 이유가 성능이나 관리적 이점(HA,RPO,RTO)으로 인한 점이 아닌 회사 내부 상황에 의한 비용 효율화 측면에서의 이전 이었다는 점과 사용하고 있는 플랫폼 및 관리형 데이터베이스의 제약 사항으로 인한 이전 방식의 결정 이었다는 점을 유념하고 글을 읽어주시면 좋겠습니다.(어느 클라우드 플랫폼이 좋다 나쁘다로 인한 이전이 아니었음을 다시한번 강조드립니다.) DMS 서비스를 이용하여 작업하기 이전에 아래와 같은 작업 절차가 필요했습니다.

<br>

| 순서 | 작업 절차                                                      |
|------|---------------------------------------------------------------|
| 1    | GCP Cloud SQL 생성                                             |
| 2    | 방화벽 Rule 허용 작업                                          |
| 3    | DMS 인스턴스, 소스/타겟 엔드포인트, DMS 태스크 생성             |
| 4    | 사용자 계정 및 권한 생성 스크립트                               |
| 5    | 데이터베이스 덤프 / 리스토어 (--no-data, --routines, --triggers, --events)|
| 6    | DMS 실행                                                       |
| 7    | Cloud DNS 변환                                                 |
| 8    | 컷오버                                                         |
| 9    | AWS RDS 정지                                                   |

<br>

위의 작업 중 1 ~ 6 까지가 사전 작업에 필요한 내용이고, 실제로 7번부터가 전환할 시점에서 이루어져야 할 작업입니다. 이제부터 각 단계 별 작업을 간단하게 정리해보려고 합니다.

<br>

### ✏️마이그레이션 방안
---


<br>

### 📝마이그레이션 방안 선정
---


<br/>

### 🚀GCP MySQL 이전을 위한 최종 결정
---



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

{% assign posts = site.categories.Mysql %}
{% for post in posts %} {% include archive-single2.html type=page.entries_layout %} {% endfor %}