---
layout: single
title: '데이터 직무 톺아보기'
author_profile: false
published: true
sidebar:
    nav: "counts"
---

데이터 엔지니어 직무 분석이 부족하단 생각이 들어 데이터 엔지니어링 로드맵을 톺아보기로 했다.

##  데이터 분석가 vs 데이터 사이언티스트 vs 데이터 엔지니어 
데이터 분석 분야에 관심이 있는 사람이라면 데이터 분석가, 데이터 사이언티스트, 데이터 엔지니어를 한번쯤 들어봤을 거다.  채용공고를 보면 각 직무를 구분하지 않는 경우도 있지만 각 직무가 무엇인지 명확하게 알 필요가 있다.

<div style="display: flex; justify-content: center;">
  <img src="{{site.url}}\images\2024-02-10-data-engineer-roadmap\data_job.png" alt="Alt text" style="width: 80%; margin: 50px;">
</div>

### <span style="font-size: 22px;font-weight: bold; background-color:#F1F5FE;">🧑‍💻 데이터 분석가 (Data Analyst, DA)</span>
데이터를 수집하고 분석하여 비즈니스 의사결정에 도움을 주는 일을 한다. 주로 기술적인 면보다는 비즈니스 인사이트에 중점을 둔다. 

데이터 분석가는 일반적으로 기술 직군이라기보다 경영/비즈니스 직군에 가까운 느낌이다.

<span style="font-size: 18px;font-weight: bold; background-color:#FFFBD7;">필요한 스킬 </span>

- 해당 비즈니스 전반에 대한 도메인 지식 
    - 도메인을 제대로 알아야 데이터를 분서하여 인사이트를 도출할 수 있다.
<br>
- 데이터 시각화 능력과 커뮤니케이션 능력<br>
    - 의사결정권자 앞에서 분석된 데이터를 보고하고 설득해야 하기 때문에 power BI, Tableau, Google Analytics와 같은 시각화 툴을 사용할 수 있어야한다. 
    - 프로그래밍 능력이 필수로 요구되지 않으나 데이터를 가공하고 분석하는 과정에서 SQL, Python, R 기초적인 수준 필요하다.

-------

### <span style="font-size: 22px;font-weight: bold; background-color:#F1F5FE;">👨‍💻 데이터 사이언티스트 (Data Scientist, Machine/Deep Learning Engineer, DS) </span>
데이터 사이언티스트는 비즈니스 문제를 정의하고, 문제를 해결하기 위해서 데이터 분석, 통계, 기계 학습, 예측 모델링, 데이터 시각화 등 다양한 분야의 기술을 활용하여 데이터 분석 모델을 만드는 역할을 한다. 

<span style="font-size: 18px;font-weight: bold; background-color:#FFFBD7;">필요한 스킬 </span>

- 해당 비즈니스 전반에 대한 도메인 지식
    - 도메인을 제대로 알아야 어떤 문제가 있는지 파악하고 데이터를 분석해서 예측 모델을 개발한다

- 모델을 개발하기 위한 수학, 통계, 프로그래밍 능력
    - 프로그래밍 언어(python, R, scala 등)와 딥러닝 모델을 다루는 pytorch, tensorflow 와 같은 라이브러리들도 능숙하게 다뤄야한다.
    - 데이터를 읽을 수 있어야 하므로 hadoop이나 Spark에 대한 지식이 플러스 요인으로 작용한다.

-----

### <span style="font-size: 22px;font-weight: bold; background-color:#F1F5FE;">🧑‍💻 데이터 엔지니어 (Data Engineer, DE)</span>
데이터 엔지니어는 데이터를 수집, 저장, 처리 및 관리하기 위한 데이터 아키텍처를 구축하고 유지 보수하는 역할을 수행하는 전문가이다. 분석, 비즈니스에 대한 이해 요구는 다른 데이터 직무에 비해서 상대적으로 적은 편이다.

데이터 엔지니어는 그 안에서 직군이 세분화된다. 

-  <span style="font-size: 20px;font-weight: bold; background-color:#F1F5FE;">Analytics Data Engineer</span> 
- 데이터를 활용한 인사이트 도출 또는 의사결정의 영역보다 조직 차원에서 누구나 데이터를 잘 활용할 수 있는 환경 을 만드는 것에 목표를 둔다.
    -  Data Analysis와 Data Engineering 사이의 영역 
    - 데이터 엔지니어가 수집한 데이터에 대한 정화 작업 진행 (Data Hygiene)
    - 데이터 엔지니어와 협력하여 프로세스를 간소화하여 프로세스 초기에 데이터를 더 명확하게 구축
    - 필요에 따라 분석 프로젝트의 개발 및 설계 지원
    - Skill : 분석 + 소프트웨어 엔지니어링 관련된 기술 및 도구들이 포함
        - SQL
        - Python
        - Data Mining
        - Data Visualization
        - Data Tools (e.g. BigQuery, DBT, Snowflake, Redshift, …)


- <span style="font-size: 20px;font-weight: bold; background-color:#F1F5FE;">Data Platform Data Engineer</span> 
- 데이터의 생성, 가공, 적재를 담당할 플랫폼을 구축하고, 데이터 엔지니어가 문제를 쉽게 해결할 수 있도록 플랫폼을 안정적으로 운영하며, 플랫폼이 성능, 효율성, 안정성을 갖출 수 있도록 고도화한다. 
    - 빅데이터 분산시스템이 생기면서 이 시스템을 개발, 운영하기 위해 새로 생긴 직군
    - 데이터 분야의 SRE(Site Reliability Engineering)
    - Software Engineering과 Devops의 역량을 모두 요구
    - 데이터 파이프라인을 구성하는 각 세부기술에 대한 깊은 이해 필요 
    - Skill : <b>Hadoop, Linux</b>, Hive, YARN, Spark, Map-Reduce or HBase등의 빅데이터 기술
    - Java/python 에 관한 높은 수준의 프로그래밍 능력 요구 

------


<span style="font-size: 18px;">별개로 DevOps 에 관한 지식이 부족해서 추가적으로 찾아 봤다. </span>

<span style="font-size: 20px;font-weight: bold; background-color:#F1F5FE;">DevOps 엔지니어</span>

DevOps는 Development Operations의 약어로, 소프트웨어 개발과 운영을 통합하여 효율성, 협력, 속도, 안정성을 개선하는 개발 및 운영 방법론이다. 

프트웨어 개발부터 배포, 운영, 모니터링까지의 전체 생명주기를 관리하며, 개발과 운영 간의 협업을 강화하여 릴리즈 주기를 단축하고 문제를 신속히 해결할 수 있도록 도우며, 개발과 운영의 조화로운 협업을 통해 비즈니스 성과를 추진하고 지속적인 프로세스 개선을 이끌어낸다. 

즉, 개발팀과 운영팀 사이에서 커뮤니케이션을 하며 각 팀들이 업무에만 집중할 수 있도록 전체 생명주기를 관리하는 Project Manager 라고 생각하면 될 것 같다. 

-------------

다음 그림으로 데이터 직군들을 살펴보면 데이터 분석가는 비즈니스 직군의 느낌이 강하며, 데이터 엔지니어는 기술적인 역량을 중요시한다.  

<div style="display: flex; justify-content: center;">
  <img src="{{site.url}}\images\2024-02-10-data-engineer-roadmap\data_stack.png" alt="Alt text" style="width: 80%; margin: 50px;">
</div>

현재 내가 희망하는 직무는 데이터 엔지니어이며, 그 중에서도 Data Platform Data Engineer 이다. 

그럼 데이터 엔지니어에게 필요한 역량을 더 세세하게 톺아보자 ! 




## 데이터 엔지니어링 로드맵 

데이터 엔지니어는 데이터 파이프라인을 구현할 수 있는 프로그래밍 능력, 데이터베이스의 높은 이해도, 클라우드 서비스와 같은 "하드 스킬” 과 더불어 비개발직군과도 협업을 자주 해야하므로 원활한 “커뮤니케이션 능력”도 필요하다. 

2021년 버전이지만 데이터 엔지니어의 로드맵을 살펴보자

<div style="display: flex; justify-content: center;">
  <img src="{{site.url}}\images\2024-02-10-data-engineer-roadmap\roadmap.png" alt="Alt text" style="width: 80%; margin: 50px;">
</div>

한눈에 살펴보기 어려울 정도로 방대한 지식이 필요하다는 걸 알 수 있다. CS 기초부터 프로그래밍 언어, 데이터베이스,  데이터 웨어하우스, 클러스터 컴퓨팅 등 채용 공고에서 익숙하게 봤던 역량들이 눈에 띈다. 

주니어 레벨의 데이터 엔지니어에게 로드맵에 있는 모든 스택을 요구하는 경우는 없기 때문에 데이터 엔지니어 직무에 필요한 역량이 무엇인지 인지하고 하나씩 준비해가는 것이 중요한 것 같다. 


### 데이터 엔지니어 채용 공고 살펴보기 
카카오 뱅크의 데이터 엔지니어(플랫폼) 직무 채용 공고를 가져왔다. 

<div style="display: flex; justify-content: center;">
  <img src="{{site.url}}\images\2024-02-10-data-engineer-roadmap\kakaobank_de.png" alt="Alt text" style="width: 80%; margin: 50px;">
</div>

CS 가초, 파이프라인 구축 및 운영, 대용량 데이터 처리, 높은 수준의 프로그래밍 능력 등 로드맵에서 확인한 역량들을 요구하는 걸 확인할 수 있다. 

### 데이터 엔지니어 역량 
마지막으로 데이터 엔지니어가 갖춰야 할 역량을 다시 정리해보자. <a href = 'https://nephtyws.github.io/story/what-is-data-engineer/'> 데이터 엔지니어란 무엇인가?</a> 를 참고하여 정리했다.


<span style="font-size: 18px;font-weight: bold; background-color:#F1F5FE;">Tech Skill</span>
- 분산 처리에 대한 기본적인 이해
    - 데이터 엔지니어들이 주로 사용하는 고수준 프레임워크인 Spark, Athena (Presto), BigQuery, Hive 등은 전부 분산 컴퓨팅을 바탕으로 만들어진 프레임워크들이다.
    - 기본적으로 분산 처리에 대한 이해와 이러한 프레임워크들이 어떻게 동작하는지 알아야한다. 
- 데이터베이스/SQL에 대한 이해
    - 데이터 엔지니어는 데이터베이스를 뺴고 생각할 수 없다. DB에 대한 이해는 필수이다.  
    - 데이터 조회와 삽입/삭제까지 SQL을 이용해서 하기 때문에 SQL을 매우 잘 다루는 것이 더욱 중요해졌다.
- 프로그래밍 언어 
    - 최소 한 개 이상의 프로그래밍 언어에 아주 능숙해야한다.
    - Airflow와 같은 workflow engine은 Python
    - Spark와 같은 분산 처리 프레임워크 활용은 Scala
    - 데이터 조회/처리는 SQL
    - production 백엔드 서버를 구축할 때는 Go 
- 인프라에 대한 이해
    -  인프라 관리에 익숙해야 하고, 클라우드를 잘 활용해서 인프라를 잘 운영할 수 있어야 한다.

<span style="font-size: 18px;font-weight: bold; background-color:#F1F5FE;">Soft skill</span>
- 서비스에 대한 이해
    - 작은 규모의 스타트업, 혹은 데이터 문화가 잘 조성되지 않은 회사에서는 더욱 중요한 기술
    - 데이터 문화가 제대로 조성되어있지 않은 환경에서는 데이터를 제대로 보기 어렵고 오히려 이상한 데이터를 보며 잘못된 의사결정을 만들어내는 단초가 될 수 있다.
- 뛰어난 커뮤니케이션 스킬
    -  데이터 조직은 협업을 하지 않고서는 전사적으로 크나큰 변화를 만들기 어려운 직군
    - 데이터 엔지니어나 데이터 조직이 무슨 일을 하는지 잘 모르는 단계에서는 이를 위해 사내의 세일즈 조직처럼 움직여야 한다. 

---- 

<br>

지금까지 데이터 엔지니어가 되기 위해 취업 준비를 하고 있지만 방향성을 제대로 잡지 못하고 있는 느낌이었는데, 필수 역량들을 정리하면서 지금 내게 필요한 스킬이 무엇인지 파악하는 계기가 된 것 같다. 

내가 하고 싶은 직무도 제대로 파악하지 못하고 취업 준비를 하고 있었다니, 그동안 가장 기본적인 걸 놓치고 있었단 생각이 든다. 

막연히 데이터 엔지니어링이 되고 싶다는 생각에서 이제 내가 어떤 걸 준비해야 할지 다시 점검해보는 시간이었다.


<br>
<br>

----
Reference
- 데이터분석가 vs 데이터엔지니어 vs 데이터과학자  
    -  <a href = 'https://socrates-dissatisfied.tistory.com/9#recentComments'>엔지니어의 노트</a>
    -  <a href = 'https://www.codeit.kr/tutorials/50/data-career'>코드잇</a>

- Data Platform Data Engineer
    - <a href = 'https://tech.kakao.com/2022/10/21/data-platform-engineering/'>kakao Tech</a>
- Analytics Data Engineer
    - <a href = 'https://playinpap.github.io/what-is-analytics-engineering/'>박종익</a>
- 엔지니어링 로드맵 
    - <a href = 'https://www.codestates.com/blog/content/%EB%8D%B0%EC%9D%B4%ED%84%B0%EC%97%94%EC%A7%80%EB%8B%88%EC%96%B4%EB%A1%9C%EB%93%9C%EB%A7%B5'>codestates</a>   
    - <a href = 'https://github.com/datastacktv/data-engineer-roadmap'>data-engineer-roadmap</a>    
- DevOps
    - <a href = 'https://www.netapp.com/ko/devops-solutions/what-is-devops/'>netapp</a> 
- 데이터 엔지니어링 역량 분석 
    - <a href = 'https://nephtyws.github.io/story/what-is-data-engineer/'>Woong Seok Kang</a> 