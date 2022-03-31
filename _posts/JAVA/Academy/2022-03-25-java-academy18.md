---
layout: single
title:  " DAY-18. 자바 네트워크 심화"
categories: JAVA-academy
tag: [JAVA, 네트워크 연습]
toc: true
toc_sticky: true
author_profile: false
sidebar:
  nav: "docs"
---

# 📌2022-03-25

## 자바 

<!--Quote-->

> ❗ 개인이 공부한 내용을 적은 것 이기에 오류가 많을 수도 있음 



## 1️⃣ readAllBytes

- 실제 파일의 데이터의 크기를 배열로 바이트 배열로 받기

### 1) Server

```java
package com.network.download01;

import java.io.DataOutputStream;
import java.io.FileInputStream;
import java.net.ServerSocket;
import java.net.Socket;

public class Server {
	public static void main(String[] args) {
		
		String path = "경로";
		String fileName = "파일명";
		
		
		try(ServerSocket server = new ServerSocket(9000);
			Socket sock = server.accept();
			FileInputStream fis = new FileInputStream(path+fileName); // 실제 파일 읽어들이기 
			DataOutputStream dos = new DataOutputStream(sock.getOutputStream());) {
			
			// 실제 파일의 데이터의 크기를 배열로 바이트 배열로 받기 
			byte[] arr = fis.readAllBytes();
			System.out.println(arr.length); // 90880

			// 클라이언트에게 실제 파일 전송 
			// 1. 데이터의 크기를 먼저 전송 (클라이언트 먼저 데이터의 크기를 알 수 있게)
			// 2. 데이터를 전송 -> 위의 배열에다가 데이터를 받아줌.
			dos.writeInt(arr.length); // 크기가 정수기때문에 
			dos.write(arr);
			dos.flush();
			
		}catch(Exception e) {
			e.printStackTrace();
		}
		
	}
}
```

### 2) Client

```java
package com.network.download01;

import java.io.DataInputStream;
import java.io.DataOutputStream;
import java.io.FileOutputStream;
import java.net.Socket;

public class Client {

	public static void main(String[] args) {
		
		String path = "경로";
		
		try(Socket client = new Socket("ipv4 주소",9000);
			DataInputStream dis = new DataInputStream(client.getInputStream());) {
			
			// 데이터의 크기를 받아들임
			int size = dis.readInt();
			byte[] arr = new byte[size];
			
			// 데이터를 받아오기 
			dis.readFully(arr); // readFully로 받아야 파일이 안깨진다
			System.out.println(arr.length); // 데이터의 길이를 알아보기 
			
			// 서버에서 보내준 이미지의 확장자와 같아야 한다
			// 실제 파일 생성해주기 -> FileOutputStream
			try(FileOutputStream fos = new FileOutputStream(path + "파일이름.jpg");){ 
				fos.write(arr);
				fos.flush();
				System.out.println("다운로드 성공");
				
			}catch(Exception e) {
				e.printStackTrace();
			}
			
		}catch(Exception e) {
			e.printStackTrace();
		}
		
	}

}
```

## 2️⃣ listFiles

- 디렉토리의 파일목록(디렉토리 포함)을 File배열로 반환한다.

> File[] files = file.listFiles() 와 같이 사용


### 1) Server

```java
package excercise;

import java.io.DataOutputStream;
import java.io.File;
import java.net.ServerSocket;
import java.net.Socket;

public class Server {

	public static void main(String[] args) {
		
		String path = "경로";
		
		try {
			ServerSocket server = new ServerSocket(9000);
			Socket sock = server.accept();
			DataOutputStream dos = new DataOutputStream(sock.getOutputStream());
			File file = new File(path);
			File[] files = file.listFiles();
			
			// 파일 배열의 크기 보내기 
			dos.writeInt(files.length);
			
			System.out.println(sock.getLocalAddress()+"님 접속완료");
			for(File f : files) {  // 폴더 안에 있는 내용 보여주기 위해 for문 사용
				System.out.println(f.getName());
				dos.writeUTF(f.getName());
			}
			
		}catch(Exception e) {
			e.printStackTrace();
		}
	}

}
```

### 2) Client

```java
package excercise;

import java.io.DataInputStream;
import java.net.Socket;

public class Client {
	public static void main(String[] args) {
		
		
		try {
			Socket client = new Socket("ipv4 주소",9000); 
			DataInputStream dis = new DataInputStream(client.getInputStream());
			
			int size = dis.readInt(); // 배열의 사이즈를 먼저 받아오기 
			
			System.out.println("===== 파일 목록 =====");
			for(int i = 0; i < size; i++) {
				System.out.println(dis.readUTF());
			}
			
			
		}catch(Exception e) {
			e.printStackTrace();
		}
	}
}
```

- writeInt로 보내면 readInt로 받아줘야 한다