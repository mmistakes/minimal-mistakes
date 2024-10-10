---
title: "[AWS] AWS RDS의 보안그룹(Security Group)을 정리하기"
excerpt: "AWS RDS 의 보안그룹(Security Group)을 정리하기 위해 cli 를 실행하고 DB에 적재하여 정리합니다."
#layout: archive
categories:
 - Aws
tags:
  - [aws, rds]
#permalink: mysql-architecture
toc: true
toc_sticky: true
date: 2024-10-10
last_modified_at: 2024-10-10
comments: true
---

### 📝보안그룹 정리하기
--- 
운영을 하다보면 원하든 원치않든 RDS의 네트워크 토폴로지를 작성할 일이 생기게 됩니다. 초기 프로젝트 진행 과정에서도 그렇고 프로젝트 오픈 후에도 이것저것 부가적인 서비스들이 붙어지고 나면 기존에 내가 알고 있던 토폴로지와 거리가 상당히 멀어지는 경우가 있습니다. 그래서 추가적인 서비스가 들어올 때 토폴로지를 최신화 해서 DBMS의 시스템 현황을 체크해볼 필요가 있습니다.(언제 부장님, 그룹장님, 본부장님 등등 어떤 분들께서 불시에 달라고 할지 몰라요😆) 또는 마이그레이션이 필요한 프로젝트에 투입할 경우에도 Taget DBMS 의 방화벽을 신규로 열어야 하는 상황이라면 더더욱이 네트워크 토폴로지가 필요한 상황일 수 있습니다. 

물론 IDC 환경의 경우 이런 네트워크 허용에 관한 관리를 DBA가 하지 않았기 때문에 네트워크를 담당하는 시스템 엔지니어나 정보보안팀이 전담마크 했던 영역이었으나 클라우드 환경에서 DBMS 를 운영하는 관리자들은 이제 손쉽게 방화벽 규칙을 웹 콘솔에서 찾아볼수 있게 되었습니다. R&R 구분으로 잏내 직접 룰을 변경하지 않더라도 Read 는 손쉽게 할 수 있기 때문에 DBA 들도 이제는 적극적으로 해당 정보를 잘 활용해야 한다고 생각하고 있습니다.

<br>

### ✏️보안그룹의 소스 유형 
---

아마도 클라우드 환경을 많이 접하신 분들 께서는 VPC, Subnet, Avaialability-Zone 등의 개념들은 알고 계실거라 생각합니다. 그리고 각 인스턴스들은 Subnet 영역 내에 특정 private address 를 할당받고 있습니다. 마찬가지로 EKS 클러스터의 경우에도 특정 VPC의 서브넷안에서 내부적으로 생성된 인스턴스들의 private address 를 할당받아 운영되는 골자는 변하지 않습니다. 그리고 각 인스턴스간의 통신을 제어하는 영역은 여러가지가 있지만 이 글에서는 보안그룹(Security Group)의 항목을 잘 추려보는 것을 할 예정입니다.


![AWS 네트워크 기본 리소스](https://github.com/user-attachments/assets/bacf25c6-8e99-49cc-8e9f-dc726f0c9cc0)    
[그림1] [AWS 네트워크 기본 리소스](https://docs.aws.amazon.com/ko_kr/AWSEC2/latest/UserGuide/using-regions-availability-zones.html)

<br>

아래는 RDS에 등록된 Security Group의 예시입니다. 

![보안그룹예시](https://github.com/user-attachments/assets/2870b990-536c-40cc-bf4e-b1ee27d0ef6d)   
[그림2] 보안그룹 내 인바운드 보안규칙(Inbound Rules)

<br>

위의 그림은 네트워크 인바운드에 대한 제어를 할 수 있는 화면입니다. 기본적으로 화이트 리스트 방식으로 네트워크를 제어할 수 있고 IP version, Protocol, Port, Source 를 설정하여 허용하고 싶은 규칙을 정할 수 있습니다.

일반적으로 IPv4, TCP 포트 연결로 DBMS 와의 연결을 허용시킬 수 있습니다. Source 란에 연결 허용을 하고 싶은 서브넷 대역 또는 ip 를 직접 작성하면 됩니다.

그런데 특이한 설정도 보입니다. Source 란에 "sg-" 접두어가 붙은 설정과 "pl-" 이 붙은 설정입니다. 이 항목들은 어떤 의미일까요? 

보안그룹에 지정할 수 있는 Source 는 3가지로 분류할 수 있습니다. 바로 Cidr Blocks, Prefix lists, Security Groups 입니다.

![보안그룹 Source 종류](https://github.com/user-attachments/assets/0270a2b3-b9ce-4ec0-ad4e-0bb28042c87f)   
[그림3] 보안그룹 규칙의 Source 종류

<br>

#### 1. Cidr Blocks


#### 2. Prefix lists


#### 3. Security Groups

<br>

### 🧑‍🎓보안그룹을 정리하기 위한 CLI 
---

하지만 보안그룹을 정리하다 보면 

<br>

### ⚠️보안그룹의 실행결과를 DBMS에 넣어 관리하자
---

![테이블 스키마](https://github.com/user-attachments/assets/917d5495-fcd6-4253-9d30-541c3650204e)   
[그림x] 대략적인 테이블 스키마

<br/>

### 😸결과
---


<br/>

### 🚀추가로 해야할 일(자동화)
---


<br>

### 📚 참고자료
---
- [관리형 접두사 목록으로 네트워크 CIDR 블록 통합 및 관리](https://docs.aws.amazon.com/ko_kr/vpc/latest/userguide/managed-prefix-lists.html)
- [보안 그룹 참조](https://docs.aws.amazon.com/ko_kr/vpc/latest/userguide/security-group-rules.html#security-group-referencing)
- [리전 및 영역](https://docs.aws.amazon.com/ko_kr/AWSEC2/latest/UserGuide/using-regions-availability-zones.html)
- [보안 그룹 규칙 구성](https://docs.aws.amazon.com/ko_kr/vpc/latest/userguide/working-with-security-group-rules.html)

<br/>
---

{% assign posts = site.categories.Mysql %}
{% for post in posts %} {% include archive-single2.html type=page.entries_layout %} {% endfor %}