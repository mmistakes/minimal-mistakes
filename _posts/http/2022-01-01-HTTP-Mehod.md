---
layout: single
title: "[HTTP] HTTP 메서드란?"
categories: HTTP
tag: [HTTP, network]
toc: true
author_profile: true
# sidebar:
#   nav: "docs"
---

## ✔ HTTP 메서드

- HTTP API 생성
- HTTP 메서드 - GET, POST
- HTTP 메서드 - PUT, PATCH, DELETE
- HTTP 메서드의 속성

### HTTP API를 만들어보자

> 요구사항: 회원 정보 관리 API를 만들어라.

- 회원 목록 조회
- 회원 조회
- 회원 등록
- 회원 수정
- 회원 삭제

### API URI 설계

#### URI(Uniform Resource Indentifier)

> 초보 개발자에게 URI 설계가 맞겨진 상황, 이름에 따라 URI 설계를 해볼까?  
> API 설계에서 가장 중요한 부분은 리소스와 행위를 구분하는 것이다

- 회원 목록 조회 /read-memeber-list
- 회원 조회 /read-member-by-id
- 회원 등록 /create-memeber
- 회원 수정 /update-member
- 회원 삭제 /delete-member

### API URI 고민

#### URI(Uniform Resource Indentifier)

```Java
@RequestMapping(value = "/members/insertMembers", method = "RequestMethod.POST")
public String insertMembers(@RequestParam HashMap<String, Object> paramMap) {}
```

- 리소스의 의미는 뭘까?
  - 회원을 등록하고 수정하고 조회하는게 리소스가 아니다!
  - ex) 미네랄을 캐라 → **미네랄**이 리소스.
  - 회원이라는 개념 자체가 바로 리소스다.
- 리소스를 어떻게 식별하는게 좋을까?
  - 회원을 등록, 수정, 삭제, 조회하는 것을 모두 배제
  - 회원이라는 리소스만 식별하면 된다. → 회원 리소스를 URI에 매핑

### API URI 설계

리소스 식별, URI 계층 구조 활용

- 회원 목록 조회 /members
- 회원 조회 /memebers/{id} → 어떻게 구분하지?
- 회원 등록 /memebers/{id} → 어떻게 구분하지?
- 회원 수정 /memebers/{id} → 어떻게 구분하지?
- 회원 삭제 /memebers/{id} → 어떻게 구분하지?

### 리소스와 행위를 분리

- 가장 중요한 것은 리소스를 식별하는 것
- URI는 리소스만 식별!
- 리소스와 해당 리소스를 대상으로 하는 행위를 분리
  - 리소스: 회원
  - 행위: 조회, 등록, 삭제, 변경
- 리소스는 명사, 행위는 동사 (미네랄을 캐라)
- 행위(메서드)는 어떻게 구분?

## ✔ HTTP 메서드 - GET, POST

> HTTP 메서드는 클라이언트가 서버에 요청을 할 때 기대하는 행동이다.

### 주요 메서드

- GET: 리소스 조회
- POST: 요청 데이터 처리, 주로 등록에 사용
- PUT: 리소스를 대체, 해당 리소스가 없으면 생성
- PATCH: 리소스 부분 변경
- DELETE: 리소스 삭제

### 기타 메서드

- HEAD: GET과 동일하지만 메시지 부분을 제외하고, 시작 라인과 헤더만 반환
- OPTIONS: 대상 리소스에 대한 통신 가능 옵션(메서드)을 설명(주로 CORS에서 사용)
- CONNECT: 대상 자원으로 식별되는 서버에 대한 터널을 설정
- TRACE: 대상 리소스에 대한 경로를 따라 메시지 루프백 테스트를 수행

### GET

```bash
GET /search?q=hello&hl=ko HTTP/1.1
Host: www.google.com
```

- 리소스 조회
- 서버에 전달하고 싶은 데이터는 쿼리 스트링을 통해 전달
- 메시지 바디를 사용해서 데이터를 전달할 수 있지만 권장하지 않음

### POST

```bash
POST /members HTTP/1.1
Content-Type: application/json

{
  "username": "hello",
  "age": 20
}
```

- 요청 데이터 처리
- 메시지 바디를 통해 서버로 요청 데이터 전달
- 서버는 요청 데이터를 처리
  - 메시지 바디를 통해 들어온 데이터를 처리하는 모든 기능을 수행한다.
- 주로 전달된 데이터로 신규 리소스 등록, 프로세스 처리에 사용

### POST - 요청 데이터를 어떻게 처리한다는 뜻일까?

> POST 메서드는 대상 리소스가 리소스의 고유한 의미 체계에 따라 요청에
> 포함된 표현을 처리하도록 요청 합니다. (구글 번역)

- 예를 들어 POST는 다음과 같은 기능에 사용됩니다.
  - HTML 양식에 입력 된 필드와 같은 데이터 블록을 데이터 처리 프로세스에 제공
    - ex) HTML FORM 태그에 입력한 정보로 회원 가입, 주문 등에서 사용
  - 게시판, 뉴스 그룹, 메일링 리스트, 블로그 또는 유사한 기사 그룹에 메시지 게시
    - ex) 게시판 글쓰기, 댓글 달기
  - 서버가 아직 식별하지 않은 새 리소스 생성
    - ex) 신규 주문 생성
  - 기존 자원에 데이터 추가
    - ex) 한 문서 끝에 내용 추가하기
- URI에 POST 요청이 오면 요청 데이터를 어떻게 처리할지 리소스마다 따로 정해야 함
- 즉, 정해진 것이 없기에 해당 URI를 설계하는 개발자가 정해야 한다.

### POST - 정리

- 새 리소스 생성(등록)
  - 서버가 아직 식별하지 않은 새 리소스 생성하는 경우 사용
- 요청 데이터 처리
  - 단순히 데이터 생성, 변경이 아닌 프로세스를 처리해야 하는 경우 사용
  - ex) 주문 → 결재완료 → 배달시작 → 배달완료 처럼 단순한 값 변경이 아닌, 프로세스 변경인 경우
  - POST의 결과로 새로운 리소스가 생성되지 않을 수도 있음
  - ex) POST /orders/{orderId}/start-delivery (컨트롤 URI)
- 다른 메서드로 처리하기 애매한 경우
  - ex) JSON으로 조회 데이터를 넘겨야 하는데, GET 메서드를 사용하기 어려운 경우
  - 애매하면 POST

## ✔ HTTP 메서드 - PUT, PATCH, DELETE

### PUT

```bash
PUT /members/100 HTTP/1.1
Content-Type: application/json

{
  "username": "hello",
  "age": 20
}
```

- 리소스를 대체
  - 리소스가 있으면 대체
  - 리소스가 없으면 생성
  - 쉽게 이야기해서 덮어버림
- 중요! 클라이언트가 리소스를 식별
  - 클라이언트가 리소스 위치를 알고 URI 지정
  - POST와 차이점
    - 라이언트가 리소스 위치를 모르지만, PUT은 리소스 전체 경로를 알고 있다.

### PATCH

```bash
PATCH /members/100 HTTP/1.1
Content-Type: application/json

{
  "age": 50
}
```

- PUT 메서드 사용 시 부분적인 데이터 변경이 불간으하다
- 하지만 PATCH를 사용하면 부분적으로 데이터 변경이 가능하다

### DELETE

```bash
DELETE /members/100 HTTP/1.1
Host: localhost:8080
```

- 리소스 제거 시 사용

## ✔ HTTP 메서드의 속성

- 안전(Safe Methods)
- 멱등(Idempotent Methods)
- 캐시가능(Cacheable Methods)

### 안전 (Safe)

- 호출해도 리소스를 변경하지 않는다.
  - HTTP 메서드 호출 시 리소스가 변경이 되지 않으면 안전하다
- 그래도 계속 호출해서, 로그 같은게 쌓여서 장애가 발생한다면?
- 안전은 해당 리소스가 변하는지 안 변하는지만 고려한다. 그런 부분까지 고려 안함

### 멱등 (Idempotent)

- f(f(x)) = f(x)
- 한 번 호출하든 두 번 호출하든 100번 호출하든 결과가 똑같다.
- 멱등 메서드
  - GET: 한 번 조회하든, 두 번 조회하든 같은 결과 조회
  - PUT: 결과 대체, 따라서 같은 요청을 여러번 해도 최종 결과 같음
    - 똑같은 파일, 똑같은 요청 → 파일 결과 같음
  - DELETE: 결과 삭제, 같은 요청을 여러번 해도 삭제 최종 결과 같음
    - 똑같은 파일이 계속 삭제 됨
  - POST: 멱등이 아니다! 두 번 호출하면 같은 결제가 중복 발생할 수 있음
    - 두 번 결재하면 두 번 결재가 됨
    - 배송 두번 눌러도 안됨
- 활용
  - 자동 복구 메커니즘
  - 서버 TIMEOUT → 정상 응답 x → 클라이언트가 같은 요청을 해도 되는가? 판단 근거
- Q: 재요청 중간에 다른 곳에서 리소스 변경하면?
  - 사용자1: GET → username:A, age:20
  - 사용자2: PUT → username:A, age:30 → 데이터 변경
  - 사용자1: GET → username:A, age:30
- A: 멱등은 외부 요인으로 중간 리소스가 변경되는 것 까지 고려 안함

### 캐시가능 (Cacheable)

- 웹 브라우저에 이미지 요청 → 똑같은 이미지 요청 필요 x → 로컬 PC에 저장(캐시)
- 응답 결과를 캐시해서 사용해도 되는가?
- GET, HEAD, POST, PATCH 캐시가능
- 실제로는 GET, HEAD 정도만 캐시로 사용
  - POST, PATCH는 본문 내용까지 캐시 키로 고려해야 하는데, 구현 쉽지 않음

### 참고 자료

-[HTTP 메서드](https://www.inflearn.com/course/http-%EC%9B%B9-%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC/lecture/61364?tab=curriculum&volume=1.00&quality=auto)
