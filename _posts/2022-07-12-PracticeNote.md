---
title: "2022-07-12-PracticeNote"
excerpt: "2022-07-12 : 공부 필기 노트 및 실습 연습"

categories: [Blogs, practiceNote]
tags: [blog, today_i_learn, daily, practiceNote]
# categories:
#  - Blog
# tags:
#  - Blog
# date : YYYY-MM-DD HH:MM:SS
# last_modified_at: {date.}
date : "2022-07-22 17:36:16"
last_modified_at: {page.date}

url: "https://syoh5188.github.io/TIL/"
url_checklist: "https://docs.google.com/spreadsheets/d/1miHpDl_mfFurk3LYEWKegsOZrm9Fg7pUbhgndJjDjbw/edit#gid=749267764"
check_list : "나의 일별 체크 리스트"
url_online_1 : "https://fastcampus.app/course-detail/209597"
online_1 : "한 번에 끝내는 데이터 엔지니어링 초격차 패키지 Online"
url_statistic : "https://wikidocs.net/book/7982"
statistic : "Introduction to Basic Statistics in Python"

---
# E: Basic info of post
# S: --------- POST Content ---------

{{page.title}}

- {{page.date}} 오늘 공부한 내용에 대해서 정리합니다.

---------

# 인강 

## Part 1. 강의 로드맵

## Ch 01. 데이터 엔지니어 이해하기
### Ch_01 ~ 03 
요약 : 데이터 엔지니어의 채용 공고를 통해 파악할 수 있는 정보에 대한 이해도를 올릴 수 있으며 담당업무의 내용을 통해 해당 회사에서 필요한 인재상에 대한 내용을 이해할 수 있음.
예를 들어, "개발자들이 쉽게 데이터를 여러가지 목적으로 활용할 수 있도록 Data Platform 을 개발" -> client 가 developer 일 수 있다. 혹은 "대용량 분산시스템 처리에 대한 경험을 원한다" -> 분산시스템에 대한 이론적인 이해와 활용 경험이 있는 인재를 바람. 등 맥락 이해도 up

### Ch_01 ~ 03 요약과 키워드

#### 요약

- 자격요견과 담당업무를 통해 내가 할 수 있는 것과 나에게 맞는 것을 읽을 줄 알아야 한다.
- 다양한 플랫폼과 서비스를 경험해보면 좋지만 필수적인 것들 할 수 있어야 한다.
- 엔지니어링만 잘 하는 게 아니라 팀의 업무에 따라서 커뮤니케이션 중시할 수 있음.
- 기초여도 된다는 거랑 초보여도 된다는 거랑 아예 다름! 다 하지 못하더라고 기술스택(실무 수준) 경험 어디든 강하게 선호함 → 플젝 많이!!
- 대기업은 운영 / 중견기업은 구축migration(호환)에 더 관심이 많음

#### 키워드
- CS 지식, DB, SQL 쿼리문, 함수, Hive, Spark, Hadoop, 도메인, 분산시스템, 

### Ch01_04 ~ 요약과 키워드

#### 1. 데이터 전달 시스템
⇒ Streaming : 실시간으로 데이터를 다른 저장소에 전달 / 데엔 전문이 아닌 백엔드 서버를 다루는 일반 서버 어플리케이션 및 분산 시스템 등 : Storm, Flink, Spark Streaming 등으로도 가능

⇒ Batch : **주기적으로** 데이터를 백업, 다른 저장소로 이동 / **주기적으로** 데이터를 병합(merge), 삭제 / **주기적으로** 데이터를 가공 일반적으로 Quartz, Spring Batch, Airflow, Spark 사용.

#### 2. 데이터 가공 시스템
⇒ ETL(Extract-Transform-Load) 
⇒ raw data를 가공해서 목적purpose 에 맞도록 데이터를 생성(데이터 전처리?)
⇒ 유효한 데이터(적절한 데이터)를 판별 drop/making/transform ⇒ feature engineering? 처럼 데이터 전처리data preprocessing 같은 걸까?
⇒ 데이터 전달에서 활용하는 도구 사용

#### 3. 데이터 분석 및 활용 시스템
⇒ 분석가들이 쉽게 활용하는 도구(SQL, Jupyter Notebook)를 활용할 수 있어야 함.
⇒ AI관련 렌지니어/연구자(Data Science)들이 활용하는 도구(Jupyter Notebook, Tensorflow)등을 활용할 수 있으면 좋음. MLOps 라는 방향 흐름 새로 있음.
⇒ 빠르게 조회할 수 있는 데이터 저장소API 서비스 개발 혹은 데이터베이스에 데이터 적재 할 수 있는 환경 구축 필요.  빠른 환경!
⇒ 기술키워드  : Elastic Search, Kibana, Haddop, Dive, Jupyter, Spark, Presto, Druid

#### 4. 데이터 저장소
⇒ 전통적으로 DBA의 영역이지만 데이터 엔지니어가 해야하는 경우도 있음!
⇒ 대용량 분산 시스템인 Hadoop 의 경우 회사의 환경에 따라서 운영 방향이 다르므로 제대로 이해하는 것 중요
⇒ DBA 있더라도 데이터 엔지니어로서 데이터를 다루는(전달, 가공, 활용 시스템)을 하는 부분으로서 저장소를 이해&모니터링&데이터의 신뢰성 보장하는 부분 역시 제대로 이해할 수 있어야 함.
⇒ 데이터 유실되지 않도록 보장!!
⇒ 데이터 저장소 안정적으로 되도록 시스템 구축(Hadoop - smaill file problem 등) 및 활용 방법을 가이드 할 수 있어야 함.
⇒ 기술 키워드 : Elastic Search, Hadoop

### Ch01_05

#### 데이터 엔지니어에 대한 QnA

- **Q1. 데이터 엔지니어로 일하려면 백엔드(서버) 엔지니어 경험이 필수인가요?**
	⇒ 현재는 데이터 엔지니어링이라는 분야가 아직은 신생이라서 백엔드 쪽의 경험이 없더라도 데이터 엔지니어링에 대한 이해도가 높다면 괜찮으며 백엔드 경험이 있다면 이점이 될 수 있다. 이 강의에서 기초적 linux, 백엔드 관련 정보, 서버의 동작원리 등도 있으니 백엔드 쪽에 대한 정보고 강의 잘 들을 것. 
	
- **Q2. 데이터 엔지니어는 어떤 언어를 재워야 하나요?**
⇒ 자바 언어가 가장 활용도가 높은 것은 사실이다. Airflow는 무조건 Python, Spark는 Java,Scala, Python 셋 모두 가능, 다만 한국은 Java 기반이 많으므로(대기업은 기존의 흐름, 스타트업은 새로운 Python등을 이용하기도 함) 강사님은 Java를 추천. 최소한 다른 사람의 Java 코드를 읽고 이해하고 리뷰할 수 있어야 함. JVM(자바 돌아가는 환경)을 모니터링 할 수 있어야 함. 

- **Q3. 데이터 엔지니어링을 하려면 수학, 통계를 잘 해야 하나요?**
⇒ 엔지니어링 기술부터 제대로 하는 것이 좋다. 다만 분석을 잘 하면 이점이 된다 데이터 다루는 쪽의 이점이므로. 그리고 데이터 모델링의 결과나 데이터 처리 시스템 자체적으로 수학적인 내용이 필요할 수 있으며, 컴퓨터 공학의 자료구조/알고리즘 쪽에서 성능 표현할 수 있는 파트정도의 수학적인 지식은 필요하다.

- **Q4. 이 강의의 모든 내용을 알아야 데이터 엔지니어가 될 수 있나요?**
⇒ 해당 강의는 초보 개발자 → 데이터 엔지니어링 분야의 요건과 실무 스킬 배우게 하는 강의다. 맞는 강의를 들으시는 것을 추천.

---

## Ch 02. 강의의 구성과 활용방법 (필수시청)

### Ch 02_01. 강의의 특징, 수강 대상 안내

#### 01. 강의의 특징

- 이론 중심 강의로서 실습은 이론을 알지 못하면(이해못하면) 따라올 수 없으므로 주의.
- 이론적으로 서버, 아키텍쳐, 코드의 구동을 머리로 이해하고 유추할 수 있어야 문제를 풀 수 있음
- 기술 스템마다 앞에서 배운 지식과 실습이 반복됨. → 실무 운영 수준까지 갈 수 있음.
- CS기초, 백엔드 기초를 초반 강의에서만 다루며 설명 반복 안 하므로 후반부 들을 떄 주의
- 경험자 아니라면 반복해서 소화할 것 추천

#### 02. 난이도에 대한 기준

- 최하(개발입문) > 하(프로그래밍 언어 하나 이상 배워봄) > 중(해당 기술, 용어, 개념을 처음 접해도 반복하면 이해 가능) > 상(적극적인 노력 및 CS기초 지식 있음) > 최상(관련 분야 기술 다뤄보지 않으면 이해 어려움. CS 기초, 기술 경험을 통해 이해하려고 해야 함)

#### 03. 수강 대상

- 초보 개발자 or 취준생 : 기초적 CS 지식 한 번 이상 공부해보거나 웹 app의 튜토리얼/강의 따라해봤지만 실무 경험 없는 초보 개발자 / 컴공 공학 전공했으나 웹개발 해본 적이 없을 경우 / 비전공 출신이지만 프로그래밍 경력은 있으나 웹 서비스 경험 없을 경우
- 유관분야 경력자 : 클라이언트 개발자로 서버 개발자와 업무 경험 있는 경우 / 백엔드(서버) 개발자로서 업무 해본 경험이 있는 경우 / 데이터 분석가, ML 엔지니어로 로직만 짠 것이 아닌 배포를 경험해본 적이 있는 분
- 데이터 엔지니어링 분야 경력자 : 데엔 여러 분야와 기술수택 두루 경험하고 싶은 경우 / 데엔에서 다루는 시스템을 안정적으로 운영하고 싶은 경우 / 기술분야를 실무 기술스택과 함꼐 이론적인 공부 하고 싶은 경우

#### 04. 수강 하지 말아야 할 분

- 비전공생 & 컴공/컴과를 공부해본 적이 없는데 데이터 엔지니어링에 입문하고 싶은 경우
- 비전공생이고 코딩 경험이 거의 없고 코딩테스트만 경험해본 경우
- 이미 데이터 엔지니어링을 하고 있고 특정 기술에 대해 심화된 내용을 원하는 경우

##### 05. 수강 대상별 특징

- 초보 개발자or취준생 : 모든 강의 순서대로 듣고 꼼꼼하게 공부하고 실습 모두 따라하고 앞의 초반부 강의 복습할 것
- 유관분야 경력자: 경험과 지식 여부의 따라 Part 2, 4 skip가능
- 데이터 엔지니어링 분야 경력자 : 필요한 부분만 수강 가능

### Ch 02_02. 파트별 강의의 특징과 활용법

#### 01. 강의 특징
- 강의에서 다루는 기초적 지식/기술을 배움.
- 이해가 안된다면 반복 수강할 것 후반부에서 반복 안 함.
- 배울 내용 : 개발환경 세팅(최하), Linux 기본 활용(최하), AWS 활용 기초(최하), Java 기초(최하), Python 기초(최하), Scala 기초(최하), JVM 이해하기(중)

#### 02. 유틸리티 강의
- 유틸리티에 대한 활용 배운적이 없다면 강의를 듣고, 이미 들었거나 이해했다면 실습이나 필요한 부분만 듣고 진행하면 된다.

#### 03. 웹 서비스와 데이터 기초
- 웹 서비스에서 어떤 데이터를 다루는지 이해한다. 웹에 대한 기초적인 이해 필요.
- 예제 및 데이터의 기초적 설명 파트는 모른다면 들을 것, 난이도 최하

#### 04. 서버 엔지니어링
- Server(Backend) Engineering 기초 :  Data Engineering 기술은 기본적으로 백엔드(서버사이드) 기술을 포함하므로 해당의 기초 및 기본적인 내용 이해해야 함. 이후 분석시스템을 이해하는 기초가 되며 심화된 내용도 다룰 것이므로 주의. Observability는 백엔드, 데이터 엔지니어링 상관없이 활용해야하는 부분이므로 해당 Observability 를 활용하는 능력 중요함.
    - 데이터 관리하는 API 서버 만들 수 있다.
    - 서비스를 외부에 런칭하기 위한 인프라와 주변 시스템을 이해하고 세팅할 수 있다.
    - ELK로 간단한 로그 수집 파이프 라인을 만들 수 있다
    - 데이터 모델링의 기초를 배운다
    - 서버 엔지니어가 아는 도구만으로 작은 규모의 분석 환경을 세팅하는 법을 배운다
    - 운영중인 어플리케이션, 리소스를 모니터링하는 기본적인 방법을 배운다.
    - 데이터 엔지니어가 모니터링 해야하는 대상의 종류와 특징을 알 수 있어야 한다.
    - 스스로가 원하는 metric 정의, 수집, 시각화 할 수 있어야 한다.

#### 05. Observability -1, 2, 3
- 챕터(난이도) : 백엔드 엔지니어링[RDBMS(하), NoSQL DB(하), Cache DB 응답시간 단축(중), DNS로 서비스 노출(중), LoadBalancer로 요청 분산(중), 웹서버 사용(중), API Gateway 사용(하), ELK 서버 로그 수집(중), DataBase_RDBMS의 구조와 동작방식을 MySQL을 기초로 이해(상), Data Modeling(중), 스타트업의 데엔일 경우: 빠르게&작게 분석환경 세팅(중), Observability 기초 개념(하), Prometheus 로 메트릭 구성(하), Grafana로 대시보드 구성(하), host/networking mornitorimg(중), application/processing monitoring(중), Application 에서 Prometheus Client 사용하여 특정 Metric남기기(중)]

#### 06. 분산 시스템 Fundermental
- 분산시스템의 기초 이론 & 풀고자 하는 대표적 문제화 해결방법&많이 사용하는 zookeeper(coordinator)의 원리와 활용 방법 배우기
- 챕터(난이도) : 분산시스템의 이해(중), Zookeeper이해하고 사용하기(중)

#### 07. Elastic Search(Open Search) - 1, 2
- Elastic Search 의 구성과 동작 원리 이해 및 활용
- 데이터 엔지니어로서 Elastic Search 의 index 관리, Cluster 구성 방법 배우기
- 챕터(난이도) : Lucene의 indexing 방법(상), 그 외(중) 

#### 08. Hadoop, Hive, HBase
- 대용량 데이터를 관리하는 대표 시스템 Hadoop의 구성과 원리 이해
- Hadoop 환경을 위한 대표 resource manager Yarn 배움
- Hadoop eco system 의 대표 metadata store인 Hive 배움
- 대용량 NoSQL 의 대표인 HBase를 배우고 활용
- 실제 서비스의 use-case로 활용
- 기본적으로 AWS의 ERM 환경을 기본으로 설치하고 배움.
- Hadoop 환경 필수이므로 꼭 세팅할 것
- HBase에서는 이론적인 이해화 설계의 중요성 배울 수 있음. 엔지니어링 성계와 의사결정 방법 중요함.

#### 09. Batch, ETL, Workflow Scheduler
- 대용량 데이터를 관리하는 대표 시스템 Hadoop의 구성과 원리 이해
- Hadoop 환경을 위한 대표 resource manager Yarn 배움
- Hadoop eco system 의 대표 metadata store인 Hive 배움
- 대용량 NoSQL 의 대표인 HBase를 배우고 활용
- 실제 서비스의 use-case로 활용
- 기본적으로 AWS의 ERM 환경을 기본으로 설치하고 배움.
- Hadoop 환경 필수이므로 꼭 세팅할 것
- HBase에서는 이론적인 이해화 설계의 중요성 배울 수 있음. 엔지니어링 성계와 의사결정 방법 중요함.

#### 10. Distributed Streaming Processing - 1, 2
- 실시간 데이터 처리를 위한 시스템 구성
- 분산 메세지 큐인 Kafka 이해하고 활용
- 실시간 데이터 처리 중요한 기술적 이슈 이해, 비용과 해결방법 제시
- 실시간 데이터 처리 프레임워크의 기술의 한계와 극복방법 이해, 스트리밍 기술의 발전 흐름 이해
- Kafka(현대 분산시스템의 대표적 제품) - 중요함
- 실시간 데이터 처리는 중요함. 과정을 이해하는 것이 필요
- 챕터(난이도) : Streaming 데이터 처리의 필요성 ~ Kafka Strams(하), Storm~마지막(중)

#### 11. Spark
- 분산 데이터 처리 프레임워크인 Spark의 개념 이해 및 활용 가능
- Spark → 단일 프레임워크 중 데이터 분야에서 가장 많은 일 처리할 수 있는 프레임워크로 SparkSQL, DataFrame, DataSet 으로 프로그래밍 가능 시 데이터 처리&분석 모두 가능.
- 다만 Spark의 퍼포먼서를 깊게 보지는 않으므로 주의. 개발보다는 운영이 더 어렵고 중요하므로 해당 내용의 실습 필수.(영상은 Scala만 자료는 Python, Scala 있음.)
- Spark 운영시 고려할 점, 대책 마련
- Spark로 배치, 실시간 처리, 데이터 분석
- 챕터(난이도) : Spark 어플리케이션 운영방법(상), 그 외(중)

#### 12. BigData OLAP
- 대용량 데이터 분석을 위한 분석시스템 구축 가능
- 분석시스템의 장단점 파악&선택 가능
- Presto, Druid 가 대용량 데이터를 어떻게 빠르게 조회하는지 배움.
- 대용량 데이터의 indexing과 processing 관련해서 구현가능한 형태 배움 가능
- 챕터(난이도) : Presto, Druid 각각의 indexing과 processing(상 또는 최상), 그 외(중)

#### 13. 대용량 데이터 에코 시스템 구축하기
- 요구사항 분석하여 대용량 데이터를 수집&저장&활용 하는 아키텍쳐 구성 가능
- 분석시스템의 장단점 파악 및 선택 가능
- Data Warehouse, Data Lake, Data Mart의 개념 학습, 배운 시스템 활용하여 아키텍처 구성.
- Lake house 의 개념과 이론 이해 및 오픈소스 프로젝트
- 데이터 시스템 수준 설계의 이론 강의 - 실습 없음.
- 챕터(난이도) : 모두(최상)

#### 14. Enginner Way
- 전반적으로 개발자/엔지니어로 취업&성장을 위한 강의임.

### Ch 02_03. 강의에서 사용하는 소프트웨어의 버전에 관한 정책

#### 01. 개발언어와 코드 에디터
- ava - JDK 1.8 : JDK 1.8 환경 호환이 가장 많음.
- Python - Python 3.6.5
- Scala
- [IntelliJ IDEA 다운]([https://www.jetbrains.com/idea/download/](https://www.jetbrains.com/idea/download/)) - Community : For JVM and Android development
- 파이썬은 파이참(VSC 쓰기)

#### 02. 서버 환경
- AWS 의 EC2 사용 - 베이스 이미지는 AWS Ubuntu 18.04 LTS AMI 사용. 

#### 03. 오픈소스
- 기본적으로 오픈소스 활용 버전은 가능한한 LTS(Long Term Support) 버전 사용 LTS 버전 없으면 가장 최신의 GA(General Availibility) release 버전 사용

#### 04. 오픈 소스로 배우는 이유
- 사용자가 많다. → 해결책이 많다
- 코드가 공개되어 문제 찾을 수 있으며 상용 제품도 오픈소스 기반이 많음. → 동작방식이나 내부구조 유추 가능 및 아이디어나 원리 유사한 경우 많음.
- 공유 정신 배울 수 있음.

---

## Introduction to Basic Statistics in Python
→ google Colab으로 실습 및 코드 연습 / 해당의 문제는 퓨쳐스킬을 통해 풀기.


### 1.1. Probability
- 문제 풀이 완료
-> [실습 코랩](https://colab.research.google.com/drive/1e0014U1VNVAxoSD4P6fZOwqhwIAbYQZm#scrollTo=BVjPHKS_IsPi)

#### 분포의 모형 종류들
- **t-test**: 이름에서 알 수 있듯 t분포를 사용.
- **베르누이 분포**: 전환률이나 사망률 등 모든 확률의 문제는 베르누이 분포로 환원 가능. 결과가 두 가지인 분류 문제, 예컨대 - Logsitic regression이 베르누이 분포와 연관있음.
- **선형 회귀Linear Regression**: 잔차outlier에 대해 일관된 분산과 독립성을 가정. 가정이 맞지 않다면 계수Coefficient를 의도대로 해석할 수 없다. ANOVA 또한 선형 회귀의 특수한 케이스로 볼 수 있다고 함.
- **K-means**: 각 클러스터에 대해 독립적이며 분산 variance이 같은 정규분포normal distribution를 가정. 공분산covariance 행렬의 제약을 풀면 GMM이 된다고 함. 이러한 한계를 이해하려면 Multi-variate normal distribution를 이해 필수.
- **잠재 디리클레 할당(LDA)**: 이름에서 보듯 디리클레 분포를 직접적으로 사용하며, 이는 다항 분포(이항 분포의 확장)와도 관련있다고 함.

### 용어(이해를 위해 따로 찾아봄)
통계를 위한 정리는 계속 추가 중 : [통계 정리중](https://syoh5188.notion.site/Statistics-5f61a964d91e4c8a9b7c2c0aff5a9d60)
- 확률변수 random variable : 
	- 확률적인 결과에 따라 결과값이 바뀌는 변수를 묘사하는 통계학 및 확률론의 개념. 
	- 표본공간에서 정의된 실수값 함수 → 실수가 아니면 확률분포함수 정의할 수 없음
	- 일정 확률을 가지고 발생하는 사건에 수치를 부여한 것
	- 변수가 어떤 값을 취하는지가 확률적으로 결정됨.
	- 통계적 규칙성은 있다고 봄

- 확률 probability : 
	- 확률 : 사건의 발생 가능성에 대한 척도 혹은 모든 경우의 수에 대한 특정 사건이 발생하는 비율.
    →  즉 표본공간 *S*가 *n*개의 근원사건(elementary event, 근원사상 또는 기본사건)으로 이루어져 있고, 각 근원사건이 일어날 가능성이 같다면, 확률은 (근원사건의 개수)/*n*으로 주어진다는 고교과정에서 일반적으로 배우는 정의. 여기서 **'모든 사건이 동일하게 일어날 수 있다고 할 때에,** 가 가장 중요 포인트. 근원사건이 같은 정도여야 함. → 이산적Discrete 상황에서만 성립
	- 통계학에서의 확률을, 어떤 사건을 반복하였을 때(독립시행) 일어나는 상대 빈도수로 보는 것을 빈도적 확률(frequentist probability)이라 한다.

- 확률 분포 probability distribution: 
	- 확률변수의 값과, 확률을 대응시켜 표, 그래프, 함수로 표현한 것
	- 시행에서 확률변수(random variable)가 어떤 값을 가질지에 대한 확률을 나타낸다. 
	- 종류 : 이산확률분포(discrete probability distribution), 연속확률분포(continuous probability distribution)

- 통계학에서 **공정(fair)** 하다는 것은 **각 사건의 확률이 동일하다는 것을 의미**

---
## ERD

ERD : Entity Realtionship Diagram 으로 말로 되어있는 요구 분석사항(클라이언트의 요청 사항)을 그림(다이어그램)으로 그려서 관계(relationship)을 도식화 한 것. 

1. 사용할 내용은 이전에 강사님이 제공해주셨던 Package Delivery System 관련 pdf의 내용을 가지고 모든 기능이 아닌 특정 기능 간단히 하여 1~2개 정도를 골라서 전체적으로 배포할 수 있는 부분으로 pesudo code 및 문장&그림으로 정리 해볼 것.
2. 주제 선정, 목표 확인, 기능 분리, 흐름 분리, 엔티티 정의 및 관계 정의&분리(핵심 개체, 핵심 속성, 관계, 식별자 등 고민)

해당의 요청사항은 간단하게는 : 
shipping packages 택배 배달
receiving packages 택배 수령(양방향)
browse shippers’ web sites. (사이트에서 배달 과정/위치 추적)
우선 목표는 package delivery system으로서 패키지 배달 시스템(FedEX나 DHL 같은)으로서 패키지(물건, 배달상품)을 배달delivery 하는 동안의 추적track하는 것이다. 정리하자면, 
물건을 보내는 sender -> deilivery 접수 -> package를 등록&저장 -> package를 배달시작(과정 중 위치 추적track 혹은 배달 단계 표기(예를 들어서 배달 주문 접수(택배발송)) - 이동&집화처리 - 간선상차&하차 - 허브hub -> 간선상차&하차 -> 배송출고 -> 배달출발 -> 배송 완료)-> 배달 끝.

이걸 다 하거나 모든 관계를 할 수는 없고 택배의 종류도 너무 많으므로 택배의 종류는 딱 상자, 봉투 2개 정도로만 간략화 하며 택배 내용물의 경우도 특정으로 고정하는 것 고민(늘릴 수 있는 가능성 열어놓기)하고 과정도 간략화 필요.

문서 제대로 정독 필요.


---
### 추천/새로 들은 정보
- \[NLP\] 이어드림 스쿨_김기현의 딥러닝을 활용한 자연어처리 입문 올인원 패키지 Online. 의 [Ch 03. Probabilistic Perspective - 02. 기본 확률 통계](https://fastcampus.app/courses/212233/clips/740361?organizationProductId=10701&hasCodeEditor=false)가 좋다고 함.


# E: --------- POST Content ---------
# S : endwith
- scope:
      path: ""
      type: posts
    values:
      layout: single
      author_profile: true
      read_time: true
      comments: true
      share: false
      related: true
# E : endwith