---
title: "면접 준비: 백엔드"

---


### <mark style='background-color: #fff5b1'><font color='#951d47'>배포란?</font></mark>

- 빌드의 결과물을 사용자가 접근할 수 있는 환경에 배치하는 것

---

### <mark style='background-color: #fff5b1'><font color='#951d47'>CI란?</font></mark>

- 지속적 통합이라는 뜻으로 개발을 진행하면서도 품질을 관리할 수 있도록 여러 명이 하나의 코드에 대해서 수정을 진행해도 지속적으로 통합하면서 관리할 수 있음을 의미

---

### <mark style='background-color: #fff5b1'><font color='#951d47'>CD란?</font></mark>

- CI으 연장선
- 지속적 배포라는 뜻으로 빌드의 결과물을 프로덕션으로 릴리스하는 작업을 자동화하는 것을 의미

---

### <mark style='background-color: #fff5b1'><font color='#951d47'>무중단 배포 빙법?</font></mark>

- AWS에서 Blue-Green 무중단 배포
- 도커를 이용한 무중단 배포
- L4, L7 스위치를 이용한 무중단 배포
- Nginx를 이용한 무중단 배포

---

### <mark style='background-color: #fff5b1'><font color='#951d47'>리버스 프록시란?</font></mark>

- 인터넷과 서버 사이에 위치한 중계 서버
- 클라이언트가 요청한 내용을 캐싱
- 서버 정보를 클라이언트로부터 숨길 수 있어 보안에 용이

---

### <mark style='background-color: #fff5b1'><font color='#951d47'>로드 밸런싱이란?</font></mark>

- 부하 분산을 해줌
- 로드 밸런싱 알고리즘 공부해보가

---

### <mark style='background-color: #fff5b1'><font color='#951d47'>무중단 배포 방식</font></mark>

- Rolling 배포
  - 서버를 차례대로 배포한다.
  - 장점
    - 인스턴스를 추가하지 않아도 돼서 관리가 편함
  - 단점
    - 사용중인 인스턴스에 트래픽이 몰릴 수 있음
    - 구버전과 신버전의 공존으로 인한 호환성 문제
- Canary 배포
  - 신버전을 소수의 사용자들에게만 배포
  - 문제가 없는 것이 확인되면 점진적으로 다른 서버에 신버전 배포
  - 장점
    - 문제 상황을 빠르게 감지 가능
    - A/B 테스트로 활용 가능
  - 단점
    - 모니터링 관리 비용
    - 구버전과 신버전의 공존으로 호환성 문제
- Blue/Green 배포
  - Blue를 구버전, Green을 신버전으로 지칭
  - 구버전과 동일하게 신버전의 인스턴스를 구성
  - 신버전 배포시 로드 밸런서를 통해 신버전으로만 트래픽을 전환
  - 장점
    - 배포하는 속도가 빠르다
    - 신속하게 롤백 가능
    - 남아 있는 기존 버전을 다음 배포에 재사용
  - 단점
    - 시스템 자원이 2배로 필요

---

### <mark style='background-color: #fff5b1'><font color='#951d47'>API 란?</font></mark>

- 애플리케이션 프로그래밍 인터페이서의 줄임말
- 두 소프트웨어 구성 요소가 서로 통신할 수 있게 하는 메커니즘

### <mark style='background-color: #fff5b1'><font color='#951d47'>REST 란?</font></mark>

- REST는 Representational State Transfer라는 용어의 약자
- 구성
  - 자원(URI)
  - 행위(HTTP METHOD)
  - 표현
- 특징
  - Uniform 인터페이스
  - Stateless(무상태성)
  - Cacheable(캐시 가능)
  - Self-descriptiveness(자체 표현 구조)
  - Client - Server 구조
  - 계층형 구조

참조
- [NHN Cloud REST API](https://meetup.nhncloud.com/posts/92)