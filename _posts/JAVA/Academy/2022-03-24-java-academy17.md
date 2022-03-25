---
layout: single
title:  " DAY-17. 자바 국비지원 수업"
categories: JAVA-academy
tag: [JAVA, 소켓, 네트워크]
toc: true
toc_sticky: true
author_profile: false
sidebar:
  nav: "docs"
---

# 📌2022-03-24

## 자바 수업 

<!--Quote-->
> *본 내용은 국비수업을 바탕으로 작성*

> ❗ 개인이 공부한 내용을 적은 것 이기에 오류가 많을 수도 있음 


## **1️⃣ 네트워크 용어 정리**

- 각각의 컴퓨터(장치) 들이 통신(데이터를 주고받는일)을 할 수 있게 해주는 망
- 서버(Server) : 데이터(서비스)를 전송/제공해주는 컴퓨터 , 장치
- 클라이언트(Client) : 서버에 접속해서 데이터(서비스)를 요청하는 컴퓨터, 장치
- IP주소 (Internet Protocol Address) : 각 컴퓨터,장치에 부여되는 고유한 주소값 → 네트워크를 통해 통신을 할때 각 컴퓨터, 장치 를 구별한 고유값이 필요한데 그 역할을 IP주소가 한다
- IPV4 → 4바이트
- Port번호 : 컴퓨터(장치) 내에 존재하는 각 프로그램을 구별하는 식별 번호 → 대표적인 포트번호 80(Web server) / 21(FTP) / 1521(Oracle) , 0 ~ 65335 포트번호 존재 / 0 ~ 1024번 까지는 보통 시스템에서 주로 사용되는 포트번호

> 간단하게 설명하면 IP주소는 컴퓨터를 찾을 때 필요한 주소를 나타내며, 포트는 컴퓨터 안에서 프로그램을 찾을 때 를 나타내는 것이다.

> 서버/ 클라이언트 통신을 할때는 IP 주소 Port 번호는 필수


- 프로토콜 (Protocol) : 시스템이 원활하게 통신하기 위한 약속(통신규약) → 인터넷 http, 파일 전송 FTP, 이메일 smtp 등이 존재
- TCP : 데이터 전송 → 신뢰성이 있음, 속도가 느림
- TCP 동작 방식 : 서버가 먼저 가동 → 소켓(데이터를 받기 위한 문) 생성 → 클라이언트가 접속하길 대기 → 클라이언트는 서버에 접속해서 데이터를 전송(요청) → 서버가 클라이언트의 접속을 허가 Accept하고 받은 요청을 처리 → 처리한 내용을 클라이언트한테 다시 되돌려 보냄(응답)
- UDP : 데이터를 보내고 끝, 제대로 전송됐는지 확인 X 상대방이 받을 준비가 됐는지 확인 X , 속도가 빠름 , 신뢰성이 떨어짐 → 스트리밍 서비스에 많이 이용
- 소켓(Socket) : 각 장치에 데이터가 실제 입출력이 되기 위해 최종적으로 통과해야하는 문과 같음, 즉 프로그램이 네트워크에서 데이터를 통신할 수 있도록 연결해주는 연결부

## **2️⃣ 자바 소켓 통신 - Server와 Client 구현**

### 1) Server

```java
package com.network.message;

import java.io.DataInputStream;
import java.io.DataOutputStream;
import java.net.ServerSocket;
import java.net.Socket;

public class Server {

	public static void main(String[] args) {
					
		try {
			// 서버에서 보내면 Write하면 클라이언트에서는 Read 해야한다 
			// 클라이언트에서 Write하면 서버에서는 Read 해야한다 
			// 서버가동 -> 클라이언트 접속 -> 서버에서 클라이언트에게 "접속 ~ "전송
					
			ServerSocket server = new ServerSocket(8000); //포트 8000번 서버 생성 
			Socket sock = server.accept(); // 서버가 허용 되면 소켓 생성 ->클라이언트가 접속하면 소캣 생성 
					
			// 클라이언트한테 데이터 보내기 
			// 소켓에서 데이터를 보내기 위한 객체 생성 (스트림 생성)
			DataOutputStream dos = new DataOutputStream(sock.getOutputStream()); 
			String msg = "★★★★ 접속하신걸 환영합니다 ★★★★";
			dos.writeUTF(msg); // msg 데이터를 보낸다 
			dos.flush(); // 한번에 보낸다 
					
				while(true) {
					// 클라이언트한테 데이터 받아오기
					DataInputStream dis = new DataInputStream(sock.getInputStream());
					String message = dis.readUTF();
					System.out.println(sock.getLocalAddress() + " : " + message);
				}
					
		}catch(Exception e) {
			e.printStackTrace();
		}
	}
}
```

### 2) Client

```java
package com.network.message;

import java.io.DataInputStream;
import java.io.DataOutputStream;
import java.net.Socket;
import java.util.Scanner;

public class Client {

	public static void main(String[] args) {
			
		Scanner sc = new Scanner(System.in);
		
		try{
			Socket client = new Socket("192.168.0.4",8000); // 소캣 객체 만들기// 포트번호와 ipv4 번호 
	
			// 메세지를 서버에서 받기 
			DataInputStream dis = new DataInputStream(client.getInputStream()); // 데이터를 받을 객체 만들기 
			String msg = dis.readUTF(); // 데이터를 받아온걸 msg에 저장 
			System.out.println("msg : " + msg); // msg 출력
			
				while(true) {
					// 메세지를 서버에게 보내기 
					System.out.print("메세지를 입력하세요 >> "); String message = sc.nextLine();
					DataOutputStream dos = new DataOutputStream(client.getOutputStream());
					dos.writeUTF(message);
					dos.flush();
				}
				
		}catch(Exception e) {
			e.printStackTrace();
		}
	}
}
```

### 순서도

| 서버                                             | 방향 | 클라이언트                                                                      |
| ------------------------------------------------ | ---- | ------------------------------------------------------------------------------- |
| ServerSocket : 클라이언트의 요청을 받기위한 준비 |      |                                                                                 |
| accept : 클라이언트의 접속 요청 승인             | ←    | Socket : 서버에 접속 요청(서버의 ServerSocket의 포트번화와 나의 IPV4번호를 삽입 |
| dos.writeUTF : 서버에서 문자를 보냄              | →    | dis.readUTF() : 서버에서 보낸 문자를 읽음                                       |
| dis.readUTF() : 클라이언트에서 보낸 문자를 받음  | ←    | dos.writeUTF(message) : 서버로 문자를 보냄                                      |

💡 Tip

- 한쪽에서 데이터를 보내면(Write) 다른 쪽은 받아야한다(Read).
- 데이터를 내보내기 위해서 DataOutputStream 데이터를 받아들이기 위해선 DataInputStream 사용
- 이클립스 서버 종료시 server 먼저 끄고 client 끄기

## 3️⃣ 랜덤 숫자 뽑기(중복제거) - 로또

### 1) 배열 이용

```java
	Random random = new Random();
	int[] numArray = new int[6];
	for(int i = 0; i < numArray.length; i++) {
		numArray[i] = random.nextInt(45) + 1;
			
		for(int j = 0; j < i; j++) {
			if(numArray[i] == numArray[j]) {
				i--; // 값은 값이면 i를 하나빼서 다시 반복문 돌게
				break;
			}
		}
```

### 2) 컬렉션 이용 HashSet이용

```java

	Random rand = new Random();
	HashSet<Integer> lotto = new HashSet<>();
	while(lotto.size() < 6) {
		lotto.add(rand.nextInt(45)+1);
	}
	
	
```

- HashSet -> 중복되지 않는 값만 저장
