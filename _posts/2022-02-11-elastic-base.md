---
title:  "[elasticsearch] "
excerpt: ""

categories:
- Elasticsearch
tags:
- elastic
- 
last_modified_at: 2022-02-11
---

-세그먼트의 구조
세그먼트 delete - 딜리트 플래그만 추가될 뿐, 실제로 딜리트되지 않음

- 키바나는 node.js기반

#### 메뉴 살펴보기
- [discover]
요구사항: "shoes"를 검색할거야 (필터링)

좋지 않은예시 
검색창에서 shose 검색 - 모든 필드에서 검색하는 거라 효율 떨어짐
똑똑한 예시
category : "Shose" 검색 - 선언을 하고 검색하는 방법

discover의 [inspect] 에서 어떤 쿼리를 던졌는지 확인 가능
discover의 add filter 로 자주쓰는 필터를 기억할 수 있음
discover의 save 후에 open이나 share로 팀원과 공유가능 

- [Visualize Library]
제공된 샘플 참고하면서 만들어보자

- [dev tools]
실행 단축키: 컨트롤+엔터
정렬 단축키: 컨드롤+i


좋지 않은 검색
`GET /covid19-time/_search`: _search는 모든 필드에서 검색
똑똑한 검색 방법
[discover]에서 썻던 inspect에서 쿼리를 복사해서 { } 안에 붙여넣음
```
GET /covid19-time/_search
{
    붙여넣기
}
```
- [Stack Management]
[Stack Management] - [Advanced Settings] 에서 주의할 것들 
  1) dateFormat:tz 엘라스틱에서 시간 정보는 UTC로 맞춘다. (검색해보기)
  2) 디폴트 인덱스 주의

#### beat와 로그스태시
beat로 수집할 수 있는 게 있고, 로그스태시로 수집할 수 있는 게 있다. beat는 안정적이고 가벼워서 ~한 특징이 있지만, RDBMS는 로그스태시로 수집할 수 밖에 없어서 RDBMS를 수집해야 할 때, 더 다양한 프리프로세싱작업을 갖고싶을 때 로그스태시로 수집한다. 로그스태시는 자바 위에서 돌아가기 때문에 beats 보다 무겁지만 할 수 있는게 많다

### beat로 데이터 집어넣기

- 엘라스틱서치 [Stack Management] - [Index Management]
data가 잘 들어갔는 지, output.elasticsearch.index 에서 설정한 index 가 잘 들어왔는 지, health가 yellow인지 확인

<br>

yellow인 이유: 리플리카를 잃어버렸다고 판단하고 yellow로 표시

<br>

- kibana index pattern 만들기 ( kibana index pattern 만들어야 하는 중요한 이유? )

#### text 타입을 keyword 타입으로 변환하기 + 옐로우>그린으로 만들기

- 텍스트와 키워드의 차이 ?

- component templates 만들기
[Stack Management] - [Index Management] - [component templates] - [create] <br>

매핑타입을 지정하지 않고 엘라스틱에 데이터를 집어넣었기 때문에 엘라스틱 서치에서 매핑 설정해야 함 <br>

[mapping]
```
{
          "strings_as_keyword": {
            "mapping": {
              "ignore_above": 1024,
              "type": "keyword"
            },
            "match_mapping_type": "string"
          }
        }
```
dynamic templates 에서 코드 복사 - **여기 잘 모르겠어** <br>


여기까지 lab-seoul component templates 만듦. <br>

이제 lab-seoul-setting component templates 만들 거야, <br>
- [setting]
```
# 옐로우>그린으로 만들기

"index": {
    "number_of_shards": "1",
    "number_of_replicas": "0"
  }
``` 
(아마 Stack Management-Index patterns-[lab-seoul-code] 에서 확인 가능할듯)<br>

- index templates에서 templates생성 (바탕화면 캡처화면 참고)

index template 를 만들거나, 업데이트가 되지 않는다면 filebeat나 logstash 재구동시켜보기 



<br>

- 데브툴에서 실습
index 생성하는 방법 -  생성 후 인덱스 매니지먼트에 확인해봐
리인덱스 

- 이렇게 인덱스를 엘라스틱에서 만져도 키바나에서 인덱스 패턴을 생성해줘야하는 걸 잊지말래 (자세히 알아보자)

- Bool 복합 쿼리 - Bool Query (discover-inspect 에서 쿼리를 컨닝했었어)
"filter" 속도가빠르고 스코어 계산이없음
must, must_not, should 


