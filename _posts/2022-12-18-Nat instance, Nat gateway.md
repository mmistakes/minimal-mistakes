---
title: "[AWS]Nat instance, Nat gateway"
categories: AWS
tag: [AWS,네트워크, network]
toc: true
author_profile: false
sidebar:
 nav: "docs"
#search: false
---

# **Nat instance, Nat gateway 무엇을 선택해야할까**



  

# **Nat Instance**

NAT = Network Address Translation

- 개인 서브넷의 EC2 인스턴스가 인터넷에 연결할 수 있도록 허용합니다.
- 공용 서브넷에서 시작해야 함
- EC2 설정을 사용하지 않도록 설정해야 합니다. Source /destination 확인 필요
- Elastic IP가 연결되어 있어야 합니다.
- 개인 서브넷에서 NAT 인스턴스로 트래픽을 라우팅하도록 라우팅 테이블을 구성해야 함
- Bastion 서버로 겸용가능(병목우려)
  
    

<img src="../images/2022-12-18-Nat%20instance,%20Nat%20gateway/631a3ac8180c7dc85beb056969243f0f4f93a8b3.png" title="" alt="nat1.png" data-align="inline">

![nat2.png](../images/2022-12-18-Nat%20instance,%20Nat%20gateway/b4b816c99cad60f709d6959a688d7da95e4cfdc2.png)

미리 구성된 Amazon Linux AMI를 사용할 수 있음

- 2020년 12월 31일 표준 지원 종료.(올드함)
- 즉시 사용할 수 있는 고가용성/복원성 설정 제공
- 다중 AZ + 복원력 있는 사용자 데이터 스크립트에서 ASG를 생성.
- 인터넷 트래픽 대역폭은 EC2 인스턴스 유형에 따라 달라짐.
- Security Group 및 규칙을 관리해야 함.
- Inbound:
  개인 서브넷에서 수신되는 HTTP/HTTPS 트래픽 허용
  홈 네트워크에서 SSH 허용(인터넷 게이트웨이를 통해 액세스 제공)
  Outbound: 인터넷에 대한 HTTP/HTTPS 트래픽 허용

# **Nat gateway**

![nat3.png](../images/2022-12-18-Nat%20instance,%20Nat%20gateway/f883e8884bd7db3a4074cd93e17d907811160653.png)

- AWS 관리 NAT, 더 높은 대역폭, 고가용성(HA), 관리 없음
- 사용량 및 대역폭에 대한 시간당 지불(24시간 가동시 요금많이듦)
- NATGW는 특정 가용성 영역에서 생성됨, Elp 통해서만 지원
- 동일한 서브넷의 EC2 인스턴스에서 사용할 수 없음(다른 서브넷에서만 사용)
- IGW 필요(전용 서브넷 => NATGW => IGW)
- 최대 45Gbps의 자동 확장 기능을 갖춘 5Gbps 대역폭
- 관리할 Security Group 없음 (SG에 영향받지않음)

<img src="../images/2022-12-18-Nat%20instance,%20Nat%20gateway/8578616f6955554b4f78591fd27a76c30962ba95.png" title="" alt="nat4.png" width="422">

- 프로젝트에 Nat gateway로 선택한 이유
1. Nat instance는 EC2이기때문에 꺼지면 죽는다. 죽으면 서비스가 중지된다.(ASG적용 , Multiple AZ 적용 등 필요)
2. 성능이나 유지관리면에서 Nat instance보다 우월함.(다량의 트래픽테스트에서 고가용성확보에 유리)
3. NAT 트래픽 처리에 최적화되어 있다.
4. Nat gateway 기본요금 시간당 약 0.06달러.. 돈드니깐 될수록 나중에 달아야겠다.
   테스트 시 추가비용발생 주의
