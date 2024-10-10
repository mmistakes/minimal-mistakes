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

물론 IDC 환경의 경우 이런 네트워크 허용에 관한 관리를 DBA가 하지 않았기 때문에 네트워크를 담당하는 시스템 엔지니어나 정보보안팀이 전담마크 했던 영역이었으나 클라우드 환경에서 DBMS 를 운영하는 관리자들은 이제 손쉽게 방화벽 규칙을 웹 콘솔에서 찾아볼수 있게 되었습니다. R&R 구분으로 인해 직접 룰을 변경하지 않더라도 Read 는 손쉽게 할 수 있기 때문에 DBA 들도 이제는 적극적으로 해당 정보를 잘 활용해야 한다고 생각하고 있습니다.

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

Cidr 이란 IP 주소 할당 방법을 논하는 말인데 일반적으로 사용하는 IPv4 방식의 IP 주소도 이에 해당합니다. 인터넷에 연결되는 모든 컴퓨터, 서버 및 디바이스에 설정된 IP 주소들을 모두 통칭하는 것으로 보면 됩니다. CIDR 표기는 IP 주소 와 네트워크 식별자 비트를 혼합하여 사용합니다.예를 들어 192.168.1.0을 22비트 네트워크 식별자를 사용하여 192.168.1.0/22로 표현할 수 있습니다.

#### 2. Prefix lists

Managed Prefix lists 또는 Prefix lists로 불리는데 이 개념은 하나 이상의 CIDR 블록 세트를 말합니다. 아래 그림과 같이 prefix lists 에는 여러개의 CIDR 블록 세트가 존재합니다. 아래는 콘솔창에서 Managed prefix lists 라는 항목으로 검색을 해보시고 특정 prefix list 하나를 클릭하면 확인할 수 있습니다.

![Managed prefix lists](https://github.com/user-attachments/assets/12bb68aa-f38c-4cac-8ecb-78f50d145ce4)   
[그림3] Managed prefix lists

위의 그림처럼 Prefix lists를 이용하여 자주 사용하는 IP 주소들을 하나로 묶어 사용하면 보안그룹에 모든 규칙을 일일이 적을 필요가 없고 유지보수 하기 용이해집니다. 예를들어 100개의 Cidr Block을 10대의 RDS 인스턴스의 보안그룹에 추가한다고 할 때 "A" 라는 Prefix lists에 100개의 룰을 등록하고 RDS 보안그룹에는 A prefix lists 를 소스에 추가해주기만 하면 됩니다.

#### 3. Security Groups

다음은 보안그룹(Security Groups) 입니다. 보안 그룹 내에서 Source 로 보안 그룹을 설정할 수 있습니다. 저는 처음에 AWS 의 방화벽 정책을 보았을 때 이 부분이 헷갈리곤 했었는데요. AWS 공식문서의 [**보안 그룹 참조**](https://docs.aws.amazon.com/ko_kr/vpc/latest/userguide/security-group-rules.html#security-group-referencing) 페이지에 나와 있는 글을 빌리면 다음과 같습니다. 

> 보안 그룹을 규칙의 소스 또는 대상으로 지정할 경우 규칙은 보안 그룹과 연결된 모든 인스턴스에 영향을 줍니다. 인스턴스는 인스턴스의 프라이빗 IP 주소를 사용하여 지정된 프로토콜 및 포트를 통해 지정된 방향으로 통신할 수 있습니다.
> 
> 예를 들어 다음은 보안 그룹 sg-0abcdef1234567890을(를) 참조하는 보안 그룹에 대한 인바운드 규칙을 나타냅니다. 이 규칙에서는 sg-0abcdef1234567890과(와) 연결된 인스턴스에서 발생한 인바운드 SSH 트래픽이 허용됩니다.

![Security Groups 참조 예시](https://github.com/user-attachments/assets/5b724c75-5c98-42a4-977a-288ead393d70)   
[그림4] [보안 그룹 참조 예시](https://docs.aws.amazon.com/ko_kr/vpc/latest/userguide/security-group-rules.html#security-group-referencing)

<br>

위의 문서를 읽고 처음에는 sg-0abcdef1234567890 에 명시된 Source 룰을 말하는 것으로 이해했으나 그것은 아니고 sg-0abcdef1234567890 가 Attach 된 인스턴스(ec2, eks cluster, elb, rds, lambda 등)를 말하는 것입니다. 이점을 꼭 이해하셔야 합니다. 그리고 아래의 유의사항도 참고해야 합니다.

- 두 보안 그룹 모두 동일한 VPC 또는 피어링된 VPC에 속해야 합니다.
- 참조된 보안 그룹의 규칙은 해당 그룹을 참조하는 보안 그룹에 추가되지 않습니다.
- 인바운드 규칙의 경우 보안 그룹과 연결된 EC2 인스턴스는 참조된 보안 그룹과 연결된 EC2 인스턴스의 프라이빗 IP 주소로부터 인바운드 트래픽을 수신할 수 있습니다.
- 아웃바운드 규칙의 경우 보안 그룹과 연결된 EC2 인스턴스는 참조된 보안 그룹과 연결된 EC2 인스턴스의 프라이빗 IP 주소로 아웃바운드 트래픽을 보낼 수 있습니다.


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