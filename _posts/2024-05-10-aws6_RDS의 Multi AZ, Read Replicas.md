---
layout: single
title:  "RDS의 Multi AZ, Read Replicas"
categories: [AWS]
tag: [AWS, RDS]
toc: true
toc_sticky: true
post-header: false

---

## Multi AZ

- 원래 존재하는 RDS DB에 무언가 변화(ex. write)가 생길 때 다른 Availability Zone에 똑같은 복제본이 만들어짐 = Synchronize
- AWS에 의해서 자동으로 관리가 이루어짐 (No admin intervention)
- 원본 RDS DB에 문제가 생길 시 자동으로 다른 AZ의 복제본이 사용됨 (Disaster Recovery)
- 성능 개선을 위해서 사용되지는 않음 → 성능 개선을 기대하기 위해선 Read Replica 사용

![스크린샷 2024-08-24 오후 10.00.31.png](/assets/images/aws06/1.png)

- 3개의 인스턴스가 하나의 프로덕션 RDS DB에 연결되어 있고 쓰기 기능이 실행된다면,
- 현재 RDS 엔드포인트는 ap-northeast-2a 이지만 쓰기 기능이 실행된 후 똑같은 복제본이 다른 AZ(ap-northeast-2b)에 쓰여진다.
- 만약 AZ 2a의 RDS에 문제가 생긴다면 RDS는 자동으로 AZ 2b로 failover를 한다.

## Read Replica

- 프로덕션 DB의 읽기 전용 복제본이 생성됨
- 주로 Read-Heavy DB 작업시 효율성의 극대화를 위해 사용된다 (Scaling)
- Disaster Recovery 용도가 아님
- 최대 5개의 Read Replica DB가 허용됨
- Read Replica의 Read Replica 생성이 가능(단, 약간의 Latency 발생)
- 각각의 Read Replica는 자기만의 고유 엔드포인트가 존재한다.
- RDS DB는 IP 주소가 아닌 엔드포인트로 고유 식별을 할 수 있다.

![스크린샷 2024-08-24 오후 10.29.56.png](/assets/images/aws06/2.png)

- 3개의 인스턴스가 하나의 메인 프로덕션 RDS에 연결되어 있을 때 쓰기 작업이 실행될 시 read replica에 의해 똑같은 RDS 복제본이 생성된다,
- 그리고 3개의 인스턴스에서 Read Traffic이 일어날 때, 메인 프로덕션 DB로 모두 연결시키는것이 아니라 하나의 EC2 인스턴스를 각각의 Read Replica로 연결시켜줌
- 따라서, 메인 DB의 워크로드를 현저히 낮출 수 있으며 성능 개선 효과를 누릴 수 있다.