---
layout: single
title: "[Elasticsearch] Elastic Stack 사용 사례"
categories: Elasticsearch
tag: [Elasticsearch, Kibana, Logstash]
toc: true
author_profile: true
# sidebar:
#   nav: "docs"
---

## ✔ Elastic Stack

### Splunk vs Elastic Stack

- `스플렁크(Splunk)`와 `엘라스틱 스택(Elastic Stack)`은 최고의 `Enterprise solution`
- <u>**5.x 버전**부터는 고가의 **장비**와 사용하지 않는 다수의 **부가 서비스**를 포함해 **ELK**가 **스플렁크**를 대체하기 시작</u>
- 스플렁크는 **비용**이 크고 **관리**가 힘들다
- 즉, 이러한 **스플렁크**를 **엘라스틱**이 대체하고 있는 상황

### Splunk와 Elastic Stack

`Splunk`와 `Elastic Stack`은 기능상에서 비슷한 점수를 받고 있다

|                            | Splunk  | ELK     |
| -------------------------- | ------- | ------- |
| **Capabilty Set**          | 5/5     | 5/5     |
| **Ease of Use**            | 4/5     | 4/5     |
| **Community Support**      | 5/5     | 5/5     |
| **Release Rate**           | 5/5     | 5/5     |
| **Pricing and Support**    | 4/5     | 4/5     |
| **API and Extensibility**  | 5/5     | 5/5     |
| **3rd Party Integrations** | 5/5     | 4/5     |
| **Companies that Use it**  | 5/5     | 4/5     |
| **Learning Curve**         | 3/5     | 4/5     |
| **CSTAR**                  | **787** | **836** |

### [엘라스틱을 활용한 대표적인 성공 사례](https://www.elastic.co/kr/customers/)

> SDS, Posco, asana 등의 기업에서 많은 성공 사례가 존재  
> 자세한 부분을 링크를 참조

- **NSHC** : Dark Web에서 Elasticsearch를 활용한 보안 데이터 수집 및 분석
- **eBay Korea** : 내부 툴을 위한 검색, 상품 검색, 주소록, 자동완성 기능을 위해 사용

## ✔ 대표적인 대시보드 종류

### 스플렁크의 대시보드

<img src="https://user-images.githubusercontent.com/53969142/146675405-8aa4ad67-7f92-4b94-a2ef-c3477ef774e1.PNG" alt="splunk image" width="650px" height="350px" />

[출처](https://m.blog.naver.com/PostView.naver?isHttpsRedirect=true&blogId=d2x_cloud&logNo=222057533414)

- `데이터 수치 표현`
- `통계 분석`
- `30일 공격 내역 조회`

### 쿠버네티스 대시보드

<img src="https://user-images.githubusercontent.com/53969142/146675504-b5fb6b66-1240-476d-93e6-37fa1a7d1a38.PNG" alt="쿠버네티스" width="650px" height="350px" />

[출처](https://discuss.elastic.co/t/dec-19th-2017-en-kibana-a-brief-tour-of-kubernetes-monitoring-with-the-elastic-stack/112038)

- `쿠버네티스 컨테이너 관리 대시보드`
- `노드 개수 조회`
- `팟 개수 조회`
- `로그 시각화 툴 제공`

### WAS 메트릭 모니터링

> 이미지는 추후 넣어두겠습니다

- `모니터링 툴 제공`

### Apache 로그 대시보드

<img src="https://user-images.githubusercontent.com/53969142/146675701-d873d9ba-269c-4faa-9269-07a5d918b464.PNG" alt="아파치" width="650px" height="350px" />

[출처](https://www.elastic.co/kr/blog/filebeat-modiles-access-logs-and-elasticsearch-storage-requirements)

- `Apache를 통해 Log를 관찰`
- `IP 대역을 통해 실시간 대응`
- `변화의 흐름에 맞춰 실시간으로 대응하기 위해 사용`

### 참고 자료

- [엘라스틱 스택 사용 사례](https://www.inflearn.com/course/ELK-%ED%86%B5%ED%95%A9%EB%A1%9C%EA%B7%B8%EC%8B%9C%EC%8A%A4%ED%85%9C-IT%EB%B3%B4%EC%95%88/lecture/27412?tab=note&mm=null)
