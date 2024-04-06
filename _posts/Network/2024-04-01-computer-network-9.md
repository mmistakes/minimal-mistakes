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


## 1. SMTP

* 인터넷 전자메일을 위한 주요 애플리케이션 계층 프로토콜
* 메일을 송신자의 메일 서버로부터 수신자의 메일 서버로 전송하는데 **TCP**의 신뢰적인 데이터 전송 서비스를 이용한다.
* 메일 서버가 메일을 받을 때는 SMTP의 서버로, 보낼 때는 SMTP의 클라이언트로 동작한다.
* SMTP는 메일을 보낼 때 두 메일 서버가 먼 거리에 떨어져 있더라도 중간 메일 서버를 사용하지 않는다. 만일 수신자의 메일 서버가 죽어 있다면 송신자의 메일 서버에 남아 새로운 시도를 위해 대기한다.

### SMTP 프로토콜

1. 클라이언트 SMTP(송신 메일 서버 호스트)는 서버 SMTP(수신 메일 서버 호스트)의 25번 포트로 TCP 연결 설정
2. TCP 연결 설정되면 서버와 클라이언트는 애플리케이션 계층 핸드셰이킹을 수행
3. SMTP 클라이언트는 송신자의 전자메일 주소와 수신자의 전자메일 주소 제공
4. SMTP 클라이언트와 서버가 서로에 대한 소개를 마치면, 클라이언트는 메시지를 보냄. 오류 없이 메시지를 전달하기 위해 TCP의 신뢰적인 데이터 전송 서비스에 의존
5. 메시지를 모두 보내면 TCP에게 연결을 닫을 것을 명령

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

```
From: alice@crepes.fr
To: bob@hamburger.edu
Subject: Searching for the meaning of life.
```
* 모든 헤더는 `From:` 헤더 라인과 `To:` 헤더 라인을 반드시 존재해야 한다.

## 3. 메일 접속 프로토콜

### POP3 (Post Office Protocol version 3)
&nbsp;&nbsp;POP3는 이메일 클라이언트가 메일 서버로부터 이메일을 가져오는 데 사용되는 프로토콜이다. 이메일을 가져와 클라이언트의 로컬 컴퓨터에 저장하며, 일반적으로 이메일 서버에서 메시지를 삭제한다. POP3는 전송된 이메일을 서버에서 삭제하기 때문에 한 번만 다운로드할 수 있다.

### IMAP (Internet Message Access Protocol)
&nbsp;&nbsp;IMAP은 이메일 클라이언트가 메일 서버와 연결되어 있는 동안에도 서버에 있는 이메일을 직접 읽고 조작할 수 있도록 하는 프로토콜이다. 이메일 클라이언트는 메일 서버에 있는 이메일을 읽을 수 있을 뿐만 아니라, 서버에서 이메일을 삭제하거나 폴더를 관리할 수도 있다. IMAP는 클라이언트와 서버 간에 이메일의 상태를 동기화하기 때문에 여러 디바이스에서 동일한 이메일을 볼 수 있다.