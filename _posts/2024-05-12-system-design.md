---
layout: single
title: '[인프라] 가상 면접 사례로 배우는 대규모 시스템 설계 기초'
categories: JAVA
tag: [JAVA, Spring]
toc: true 
author_profile: false
sidebar:
    nav: "counts"
published: true

---
본격적으로 파이널 프로젝트를 시작하기 전에 대규모 시스템 설계에 대해 공부해보려고 한다. 멘토님이 추천해주신 [가상 면접 사례로 배우는 대규모 시스템 설계 기초] 의 1장 내용인 "사용자 수에 따른 규모 확장성" 을 정리했다. 


## 사용자 수에 따른 규모 확장성
한 명의 사용자를 지원하는 시스템에서 시작하여, 최종적으로 몇백만 사용자를 지원하는 시스템을 설계해보며 규모 확장성과 관련된 설계 문제를 푸는 데 쓰일 유용한 지식들을 마스터 해보자.

## 단일 서버 
모든 서버가 단 한대의 서버에서 실행되는 간단한 시스템 설계에 대한 그림은 아래와 같다. 


<div style="display: flex; justify-content: center;">
    <img src="{{site.url}}\images\2024-05-12-system-design\single-server.png" alt="Alt text" style="width: 60%; height: 100%; margin: 0px;">
</div>

<br>

웹, 앱, 데이터베이스, 캐시 등이 전부 서버 한 대 가동되는 것을 표현 한 것이다. 이 그림의 시스템 구성을 이해하기 위해서는 사용자의 요청이 처리되는 과정과 요청을 만드는 단말에 대한 이해가 필요하다. 

<br>


<div style="display: flex; justify-content: center;">
     <img src="{{site.url}}\images\2024-05-12-system-design\single-server-flow.png" alt="Alt text" style="width: 60%; height: 100%; margin: 0px;">
</div>

(1)  사용자는 도메인 이름(api.musite.com) 을 이용하여 웹사이트에 접속한다.  
    - 이 접속을 위해서는 도메인 이름을 도메인 이름 서비스(Domail Name Service) 를 이용하여 IP 주소로 변환하는 과정이 필요하다.
    - 보통 제3 사업자 (third party)가 제공하는 유료 서비스를 이용하게 되므로 우리 시스템의 일부는 아니다. 

><b><span style="font-size:16px;">DNS(Domail Name Service) 란?</span></b><br>
<span style="font-size:14px;">스마트폰이나 노트북부터 대규모 소매 웹 사이트의 콘텐츠를 서비스하는 서버에 이르기까지 인터넷상의 모든 컴퓨터는 숫자를 사용하여 서로를 찾고 통신합니다. 이러한 숫자를 IP 주소라고 합니다. 웹 브라우저를 열고 웹 사이트로 이동할 때는 긴 숫자를 기억해 입력할 필요가 없습니다. 그 대신 example.com과 같은 도메인 이름을 입력해도 원하는 웹 사이트로 갈 수 있습니다. - <a href="https://aws.amazon.com/ko/route53/what-is-dns/">AWS</a><br>
DNS(Domain Name System)은 사용자가 숫자로 된 인터넷 프로토콜 주소 대신 인터넷 도메인 이름과 검색 가능한 URL을 사용하여 웹사이트에 접속하는 것을 가능하게 합니다. 사용자는  93.184.216.34와 같은 IP 주소를  기억하는 대신  www.example.com을 검색할 수 있습니다 - <a href="https://www.ibm.com/kr-ko/topics/dns">IBM</a>.</span>


(2) DNS의 조회 결과로 IP 주소가 반환된다. 
    - 예제에서는 15.125.23.214 라고 표현했다. 이 주소는 그림 1-2의 웹서버 주소이다. 

(3) 해당 IP 주소로 HTTP(HyperText Transper Protocol) 요청이 전달된다. 

(4) 요청을 받은 웹서버는 HTML 페이지나 JSON 형태의 응답을 반납한다. 


실제 요청은 모바일 앱 또는 웹 앱을 통해서 전달된다. 

- 웹 애플리케이션 : 비즈니스 로직, 데이터 저장 등을 처리하기 위해서느 서버 구현용 언어(자바, 파이썬 등)를 사용하고 프레젠테이션용으로는 클라이언트 구현용 언어(HTML, 자바스크립트 등)를 사용한다. 

- 모바일 앱 : 모바일 앱과 웹 서버간 통신을 위해서는 HTTP 프로토콜은 이용한다. HTTP 프로토콜을 통헤서 반환될 응답 데이터릐 포맷으로는 보통 JSON(JavaScript Object Notation)이 널리 쓰인다. 

## 데이터베이스
사용자가 늘면 여러 서버를 두어야 한다. 하나는 웹/모바일 트래픽 처리 용도고, 다른 하나는 데이터베이스용이다. 

<div style="display: flex; justify-content: center;">
     <img src="{{site.url}}\images\2024-05-12-system-design\multi-server.png" alt="Alt text" style="width: 60%; height: 100%; margin: 10px;">
</div>

웹/모바일 트래픽 처리 서버(웹 계층)과 데이터베이스 서버(데이터 계층)을 분리하면 각각을 독립적으로 확장해 나갈 수 있게 된다. 


### 관계형 데이터베이스와 비관계형 데이터베이스 

<br>

<div style="display: flex; justify-content: center;">
     <img src="{{site.url}}\images\2024-05-12-system-design\SQL_NoSQL.png" alt="Alt text" style="width: 100%; height: 100%; margin: 10px;">
</div>

<p style="text-align:center;"><b><span style="font-size:16px;">SQL vs NoSQL</span></b></p>



>**관계형 데이터베이스**

- **관계형 데이터베이스 관리 시스템(Relation Data-base Management System, RDBMS)** 이라고도 부른다.
- MySQL, 오라클 데이터베이스, PostgreSQL 등이 있다. 
- 자료를 테이블과 열, 컬럼으로 표현한다. 
- 데이터 처리 언어인 SQL(Structured Query Language)을 사용하면 여러 테이블에 있는 데이터를 그 관계에 따라 조인 연산(JOIN)을 이용해 합칠 수 있다. 

>**비관계형 데이터베이스**

- **NoSQL**이라고도 부른다. 
- CouchDB, Neo4j, HBase, Amazon DynamoDB 등이 있다. 
- NoSQL 데이터베이스는 JSON 문서와 같은 하나의 데이터 구조 안에 데이터를 보관한다
- 키-값 저장소, 문서 저장소, 와이드-컬럼 저장소, 그래프 저장소와 같은 기본 데이터 모델 중 하나를 사용하여 정보를 관리한다. 
- 비관계형 데이터베이스는 일반적으로 조인 연산은 지원하지 않는다. 



>**DBMS와 NoSQL을 이용한 고객 주문 관리 예제** 

📰 관계형 모델에서는 개별 테이블이 고객 데이터, 주문 데이터, 제품 데이터를 별도로 관리하고 이 데이터들은 고객 ID 또는 주문 ID와 같은 고유한 공통 키를 통해 연결된다. 

📰 이 방법은 데이터를 빨리 저장하고 가져오는 데 유용하지만 상당한 메모리를 요구하며 메모리를 추가하려고 할 경우, SQL 데이터베이스는 수직적으로만 확장할 수 있고 수평적으로는 확장할 수 없기 때문에 하드웨어를 통해서만 메모리를 추가할 수 있다.

➡️ 그 결과, 수직적 확장이 궁극적으로 회사의 데이터 저장 및 가져오기 능력을 제한하게 된다.

-------
🗂️ NoSQL 데이터베이스는 비관계형이므로 테이블을 연결할 필요가 없다.내장된 샤딩 및 고가용성 기능이 수평적 확장을 용이하게 한다.

➡️  데이터베이스 서버 하나로 모든 데이터를 저장하거나 모든 쿼리를 처리할 수 없는 경우, 워크로드를 두 개 이상의 서버로 나눌 수 있으므로 데이터를 수평적으로 확장할 수 있다.

------ 

어느 데이터베이스를 선택할 것인가는 목표에 따라 결정된다. 

아래와 같은 경우에는 비-관계형 데이터 베이스가 바람직한 선택일 수 있다. 

- 아주 낮은 응답 지연시간이 요구됨 
- 다루는 데이터가 비정형이라 관계형 데이터가 아님
- 데이터(JSON, YAML, XML 등)를 직렬화하거나 역직렬화 할 수 있기만 하면 됨
- 아주 많은 양의 데이터를 저장할 필요가 있음 

## 수직적 규모 확장 VS 수평적 규모 확장 

**'스케일 업(scale up)'** 이라고도 하는 **수직적 규모 확장(vertical scaling)** 프로세스는 서버에 고사양 자원(CPU, RAM 등)을 추가하는 행위를 말한다. 

반면 **'스케일 아웃(scale out)'** 이라고도 하는 **수평적 규모 확장** 프로세스는 더 많은 서버를 추가하여 성능을 개선하는 행위를 말한다. 

서버에 유입되는 트래픽 양이 적을 떄는 수직적 확장이 좋은 선택이지만, 이 방법은 몇 가지 **심각한 단점**이 있다. 

- 

