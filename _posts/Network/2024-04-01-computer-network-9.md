---
title: "2.3 인터넷 전자메일"
excerpt: "2.3 인터넷 전자메일"
categories: ['Computer Network']
tags:
  - computer
  - network

toc: true
toc_sticky: true
use_math: true
 
date: 2024-04-01
last_modified_at: 2024-04-01
---

&nbsp;&nbsp;인터넷 메일 시스템에는 **사용자 에이전트**(user agent), **메일 서버**(mail server), **SMTP**(Simple Mail Transfer Protocol) 3개의 주요 요소가 있다.

* **사용자 에이전트**
  * 이메일을 작성하고 읽는 데 사용되는 응용 프로그램 또는 인터페이스
  * 사용자가 메시지를 읽고, 응답하고, 전달하고, 저장하고, 구성하게 해준다.
  * 사용자가 메시지 작성을 끝내면, 사용자 에이전트는 메시지를 메일 서버로 보내고, 메일 서버의 출력 메시지 큐에 들어간다.
  * 수신자가 메시지를 읽고 싶을 때, 수신자의 사용자 에이전트는 메일 서버에 있는 메일박스에서 메시지를 가져온다.
  * 아웃룩, 지메일 등이 해당

* **메일박스**(mailbox)
  * 수신자는 메일 서버 안에 메일박스를 가지고 있으며 수신자에게 온 메시지를 유지하고 관리한다.
  * 송신자의 사용자 에이전트 $\rightarrow$ 송신자의 메일 서버 $\rightarrow$ 수신자의 메일 서버 $\rightarrow$ 수신자의 메일 서버
  * 송신자의 메일 서버는 수신자의 메일 서버 고장에 대처해야 한다. 송신자 서버가 수신자 서버로 메일을 전달할 수 없다면, 송신자 서버는 전송 실패 메일을 **메시지 큐**(message queue)에 보관하고 약 30분마다 전송을 시도한다. 며칠 동안 시도해도 성공하지 못한다면 서버는 그 메시지를 제거하고 송신자에게 전자메일로 통보한다.

* SMTP
  * 인터넷 전자메일을 위한 주요 애플리케이션 계층 프로토콜
  * 메일을 송신자의 메일 서버로부터 수신자의 메일 서버로 전송하는데 **TCP**의 신뢰적인 데이터 전송 서비스를 이용한다.
  * 메일 서버가 메일을 받을 때는 SMTP의 서버로, 보낼 때는 SMTP의 클라이언트로 동작한다.


## 1. SMTP

```
S: 220 hamburger.edu
C: HELO crepes.fr
S: 250 Hel1lo crepes.fr, pleased to meet you
C: MAIL FROM: <alice@crepes.fr>
S: 250 alice@crepes.fr … Sender ok
C: RCPT TO: <bob@hamburger.edu>
S: 250 bob@hamburger.edu … Recipient ok
C: DATA
S: 354 Enter mail, end with "." on a line by itself
C: Do you like ketchup?
C: How about pickles?
C: .
S: 250 Message accepted for delivery
C: QUIT
S: 221 hamburger.edu closing connection
```


## 2. 메일 메시지 포맷

## 3. 메일 접속 프로토콜