---
layout: single
title: "[HTTP] PORT와 DNS란?"
categories: HTTP
tag: [HTTP, network]
toc: true
author_profile: true
# sidebar:
#   nav: "docs"
---

## ✔ PORT

- Port(포트)를 간단히 이해하기 위해서 아래 예시를 생각 해보자
- 아파트(IP) 안에 있는 호수(Port)

### 한 번에 둘 이상의 서버를 연결?

- Client의 PC에서 게임, 화상 통화, 웹 브라우저 요청을 동시에 한다고 가정
- 위 같은 상황에서는 어떤 프로그램(P/G)에서 요청을 보냈는지 알 수 없다
  - Client의 IP주소는 100.x.x.1로 동일하기 때문이다
- 즉, 이 때 사용이 되는 정보가 PORT(포트)다

### TCP/IP 패킷 정보

- TCP/IP 패킷
  - 목적지 및 출발지 **PORT번호**
  - 전송 제어 정보
  - 인증 정보
  - 전송 데이터

### PORT 번호 규약

- PORT 번호는 0 ~ 65535번까지 할당 가능하다
- 0 ~ 1023은 잘 알려진 포트로 사용하는 것을 지양.

### 대표적인 PORT 정보

- FTP
  - 20, 21
- TELNET
  - 23
- HTTP
  - 80
- HTTPS
  - 443

## ✔ DNS

> 우선 DNS(Domain Name Server)가 탄생한 배경과 사용이유에 대해 고민 해보자

- 과거에는 컴퓨터 개수가 많지 않고 IP주소만 사용하여 클라이언트 - 서버 간의 정보 공유
- 인터넷망이 점점 거대해짐에 따라 수억개의 IP 주소를 인간이 기억하는것은 불가능하다
- 위 같은 이유로 인해 나온 기술이 DNS(Domain Name Server)다
- <u>클라이언트의 요청(Request)를 받은 후 해당 URI를 DNS 서버에 보내 IP에 맞는 주소 반환</u>

### DNS == 주소록?

> 조금 더 현실적으로 생각을 해보자면 전화번호부를 연상 해보자

#### 전화번호부

1. <u>전화번호부에서 번호를 찾을 때 우리는 번호를 찾는것이 아닌 이름을 찾는다</u>
2. 이렇게 찾은 이름을 통해, 해당 이름과 매핑되어 있는 번호를 알게 된다
3. 즉, DNS 서버는 클라이언트가 브라우저를 통해 입력한 URL 정보를 통해 응답을 반환한다

### DNS 주소 매칭

- 아래와 같이 IP주소를 DNS로 매핑 해주면, 해당 도멘인명을 통해 접근이 가능하다
  - [holiday.com](http://holiday.com) : 200.200.200.8
  - [helloworld.com](http://helloworld.com) : 210.210.210.3

### DNS 주소 변환 과정

<img width="550" alt="스크린샷 2021-07-02 오후 6 34 35" src="https://user-images.githubusercontent.com/53969142/124254641-3b1e8300-db64-11eb-95ba-d1cec5b20513.png">

<img width="550" alt="스크린샷 2021-07-04 오후 4 55 47" src="https://user-images.githubusercontent.com/53969142/124377777-bc068780-dce8-11eb-9034-66f494b465ff.png">

- 클라이언트가 브라우저를 통해 URL 입력
- 로컬 DNS 서버에서 해당 URL의 IP에 매핑되어있는 도메인명 조회
  - 이 때, 로컬 DNS에 해당 IP에 매핑이 안되있는 도메인이 존재할 수 있음
- 매핑 정보가 없을 경우 루트 DNS에 해당 URL을 전달 후 질의
- 루트 DNS로부터 **TLD 서버정보**를 전달 받은 후 TLD 서버에 해당 도메인명 질의
- 후에 루트부터 시작되는 3단계 과정을 거친 후 클라이언트에게 도메인명을 반환
  - 1단계 : .com (상위 도메인명)
  - 2단계 : name.com (도메인명)
  - 3단계 : naver.com
- Recursive Query
  - 로컬 DNS가 여러 DNS 서버를 차례대로 질의하여 답을 찾아가는 과정

### 참고 자료

- [DNS 주소 변환 과정](https://ijbgo.tistory.com/27)
- [DNS 동작 원리](https://ijbgo.tistory.com/27)
