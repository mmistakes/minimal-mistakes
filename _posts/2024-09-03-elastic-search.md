---
layout: single
title: '[Elastic Search] Docker와 Python 을 이용해서 Elastic Search 시작하기'
categories: Elastic Search
tag: [Elastic Search]
toc: true 
author_profile: false
sidebar:
    nav: "counts"
published: true

---

현재 진행 중인 부동산 실거래 매매가 데이터 프로젝트에서 Elasticsearch를 활용해 데이터 검색 및 분석 기능을 구현하고자 한다.

이 프로젝트에서는 Docker를 사용하여 Elasticsearch 이미지를 다운로드하고, Python을 이용해 데이터를 처리할 예정이다. 

실거래 매매가 데이터는  [국토교통부 실거래공개시스템](https://rt.molit.go.kr/pt/xls/xls.do?mobileAt=)에서 제공하는 CSV 파일을 활용한다. 전체적인 흐름은  Selenium을 사용해 CSV 파일을 자동으로 다운로드한 후, Elasticsearch 클라이언트를 설정하고, 전처리된 데이터를 Elasticsearch에 인덱싱할 계획이다.

## 작업환경

- 운영체제: Windows 11 Home
- Python 버전: 3.10
- Elasticsearch 버전: 8.15.0
- Docker 버전: 27.1.1

## Docker를 이용한 Elasticsearch 설치

공식사이트 [Install Elasticsearch with Docker](https://www.elastic.co/guide/en/elasticsearch/reference/current/docker.html) 를 참고하여 설치했다. 

혹시 도커가 설치 안되어있다면 다음 사이트에 설치 방법이 자세히 나와있다 > [\[Docker\]Windows 11 Pro에서 Docker 설치](https://mz-moonzoo.tistory.com/40)
### 1. 도커 네트워크를 생성

>docker network create elastic


### 2.  Elasticsearch Docker image 다운로드

>docker pull docker.elastic.co/elasticsearch/elasticsearch:8.15.0

❗Docker Desktop - WSL distro terminated abruptly 에러가 발생한다면  `reset netsh winsock` 실행 후 재시작하면 해결된다.

### 3. Elasticsearch container 실행

>docker run --name es01 --net elastic -p 9200:9200 -it -m 1GB docker.elastic.co/elasticsearch/elasticsearch:8.15.0

```
✅ Elasticsearch security features have been automatically configured!
✅ Authentication is enabled and cluster connections are encrypted.
```
문구 밑에 elastic password and enrollment token 정보가 나오는 데 저장해두자!

만약 저장하지 못했다면 아래 명령어로 다시 생성할 수 있다. 

>docker exec -it es01 /usr/share/elasticsearch/bin/elasticsearch-reset-password -u elastic <br>
>docker exec -it es01 /usr/share/elasticsearch/bin/elasticsearch-create-enrollment-token -s kibana

### 4. Elasticsearch 접속

https://localhost:9200/ 에 접속하면 Elasticsearch 서버가 정상적으로 실행 중인걸 확인할 수 있다.  

<div style="display: flex; justify-content: center;">
     <img src="{{site.url}}\images\2024-09-03-elastic-search\es_9200.png" alt="Alt text" style="width: 30%; height: 30%; margin: 20px">
     <img src="{{site.url}}\images\2024-09-03-elastic-search\es_result.png" alt="Alt text" style="width: 40%; height: 40%; margin: 20px">
</div>


## 파이썬을 이용해 Elasticsearch에 데이터 인덱싱

###  1. Elasticsearch 객체 생성 

```python
es = Elasticsearch(
    'https://localhost:9200',
    basic_auth=("elastic", password),
    # TlsError 방지
    verify_certs=False
)
```
### 2. 데이터 인덱싱

Elasticsearch에 인덱싱할 각 문서(document)를 정의한 후 row에서 데이터프레임의 각 열(column)을 가져와서, Elasticsearch에 저장될 필드 이름에 매핑한 후 apartsalesprice라는 이름의 인덱스에 데이터를 저장했다.  Elasticsearch에서 인덱스는 데이터베이스의 테이블과 유사한 개념이다. 

```python
def elastic_data(es, df):

    for index, row in df.iterrows():
        doc = {
            'district' : row['district'],
            'lotNumber' : row['lotNumber'],
            'mainNumber' : row['mainNumber'],
            'complexName' : row['complexName'],
            'areaSqm' : row['areaSqm'],
            'contractDay' : row['contractDay'],
            'transactionAmount' : row['transactionAmount'],
            'building' : row['building'],
            'floor' : row['floor'],
            'yearBuilt' : row['yearBuilt'],
            'roadName':  row['roadName'],
            'transactionType' : row['transactionType'],
            'brokerLocation' : row['brokerLocation'],
            'registrationDate' : row['registrationDate']
        }

        # Elasticsearch에서 인덱스 이름은 소문자여야 함
        es.index(index='apartsalesprice',  document=doc)
    


```

### 3. 데이터 확인

```python

# 인덱스에서 데이터를 조회
response = es.search(index="apartsalesprice", size=10)  # size를 통해 조회할 문서 수를 설정

# 조회한 데이터를 출력
for hit in response['hits']['hits']:
    print(hit['_source'])
```
```
{'district': '경기도 광주시 송정동', 'lotNumber': '55', 'mainNumber': 55, 'complexName': '송정동현대아이파크', 'areaSqm': 84.96, 'contractDay': '2024-08-28T00:00:00', 'transactionAmount': '33,700', 'building': None, 'floor': 2, 'yearBuilt': 2002, 'roadName': '광주대로129번길 11-5', 'transactionType': '중개거래', 'brokerLocation': '경기 광주시', 'registrationDate': None}
{'district': '전라남도 목포시 상동', 'lotNumber': '1019', 'mainNumber': 1019, 'complexName': '신안2', 'areaSqm': 59.94, 'contractDay': '2024-08-28T00:00:00', 'transactionAmount': '10,100', 'building': None, 'floor': 5, 'yearBuilt': 1996, 'roadName': '하당로 14', 'transactionType': '중개거래', 'brokerLocation': '전남 목포시', 'registrationDate': None}
{'district': '전북특별자치도 전주시 완산구 중화산동1가', 'lotNumber': '329', 'mainNumber': 329, 'complexName': '현대(A단지)', 'areaSqm': 84.97, 'contractDay': '2024-08-28T00:00:00', 'transactionAmount': '21,500', 'building': None, 'floor': 8, 'yearBuilt': 1999, 'roadName': '안행로 175', 'transactionType': '중개거래', 'brokerLocation': '전북 전주시 완산구', 'registrationDate': None}
{'district': '강원특별자치도 강릉시 내곡동', 'lotNumber': '758', 'mainNumber': 758, 'complexName': '벽산블루밍더베스트아파트', 'areaSqm': 49.967, 'contractDay': '2024-08-28T00:00:00', 'transactionAmount': '21,500', 'building': None, 'floor': 15, 'yearBuilt': 2022, 'roadName': '범일로579번길 29-6', 'transactionType': '중개거래', 'brokerLocation': '강원 강릉시', 'registrationDate': None}
{'district': '충청남도 예산군 삽교읍 목리', 'lotNumber': '1275', 'mainNumber': 1275, 'complexName': '충남내포신도시1차대방엘리움더퍼스티지아파트', 'areaSqm': 75.7975, 'contractDay': '2024-08-28T00:00:00', 'transactionAmount': '24,110', 'building': None, 'floor': 9, 'yearBuilt': 2023, 'roadName': '충예로 215', 'transactionType': '중개거래', 'brokerLocation': '충남 예산군', 'registrationDate': None}
{'district': '강원특별자치도 춘천시 후평동', 'lotNumber': '529-4', 'mainNumber': 529, 'complexName': '에리트', 'areaSqm': 63.396, 'contractDay': '2024-08-28T00:00:00', 'transactionAmount': '13,700', 'building': None, 'floor': 2, 'yearBuilt': 1981, 'roadName': '삭주로 89-7', 'transactionType': '중개거래', 'brokerLocation': '강원 춘천시', 'registrationDate': None}
{'district': '경상북도 포항시 남구 오천읍 문덕리', 'lotNumber': '1359', 'mainNumber': 1359, 'complexName': '신문덕코아루', 'areaSqm': 84.992, 'contractDay': '2024-08-28T00:00:00', 'transactionAmount': '26,900', 'building': None, 'floor': 10, 'yearBuilt': 2018, 'roadName': '해병로489번길 9', 'transactionType': '중개거래', 'brokerLocation': '경북 포항시 남구', 'registrationDate': None}
{'district': '강원특별자치도 강릉시 견소동', 'lotNumber': '289', 'mainNumber': 289, 'complexName': '송정해변신도브래뉴아파트', 'areaSqm': 59.99, 'contractDay': '2024-08-28T00:00:00', 'transactionAmount': '19,700', 'building': None, 'floor': 1, 'yearBuilt': 2005, 'roadName': '경강로2539번길 22', 'transactionType': '중개거래', 'brokerLocation': '강원 강릉시', 'registrationDate': None}
{'district': '전라남도 여수시 신월동', 'lotNumber': '1-4', 'mainNumber': 1, 'complexName': '대주', 'areaSqm': 84.99, 'contractDay': '2024-08-28T00:00:00', 'transactionAmount': '21,400', 'building': None, 'floor': 6, 'yearBuilt': 1993, 'roadName': '신월2길 35', 'transactionType': '중개거래', 'brokerLocation': '전남 여수시', 'registrationDate': None}
{'district': '전라남도 광양시 광양읍 구산리', 'lotNumber': '832-1', 'mainNumber': 832, 'complexName': '덕진광양의봄', 'areaSqm': 84.9941, 'contractDay': '2024-08-28T00:00:00', 'transactionAmount': '15,666', 'building': '103', 'floor': 14, 'yearBuilt': 2013, 'roadName': '서평1길 9', 'transactionType': '직거래', 'brokerLocation': None, 'registrationDate': '24.08.29'}

```

## 생각해 볼 점 

현재 파이썬 코드에서 직접 모든 작업을 수행하고 있는데, 이 과정을 Dockerfile로 정리하여 환경 설정부터 실행까지 한 번에 자동화할 수 있도록 개선해보자.

한 달의 데이터를 인덱싱하는 데 1시간이 소요되고 있어, 이를 개선하기 위한 방안을 고민해봐야 한다. 대량의 데이터를 다룰 때 성능 최적화를 위해 데이터를 일괄 처리(batch processing)하거나, Elasticsearch의 대량 삽입(bulk insert) 기능을 활용하는 방법을 고려할 수 있다.

현재 로컬에서 Elasticsearch를 사용하고 있지만, Elastic Cloud로 이전하여 더 나은 성능과 확장성을 활용할 수 있다.


