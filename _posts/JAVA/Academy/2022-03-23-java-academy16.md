---
layout: single
title:  " DAY-16. 자바 국비지원 수업"
categories: JAVA-academy
tag: [JAVA, IO스트림]
toc: true
toc_sticky: true
author_profile: false
sidebar:
  nav: "docs"
---

# 📌2022-03-23

## 자바 수업 

<!--Quote-->
> *본 내용은 국비수업을 바탕으로 작성*


# 2022-03-23

## 1️⃣ 텍스트 파일 읽기

```java
	// try~with~resource
	// try(객체 자동반납을 해주고 싶은 생성문) -> try문이 끝나면 알아서 객체를 반납(close)
		
	// 1.번 코드 
	try(FileInputStream fis = new FileInputStream("test.txt")) {
		System.out.println((char)fis.read()); // 한글자 출력 

	}catch(Exception e) {
		e.printStackTrace();
	}
	

	// 2.번 코드  
	// 1번의 코드와 같다. fis.close를 쓰려면 try ~ catch를 또 써야하기 때문에 1번 코드와 같이 간단하게 사용
	// 파일 입력 -> Stream -> InputStream

	FileInputStream fis = null;
	try {
		// 파일과 관련된 객체 인스턴스를 만들었을 때에는 객체 반납을 마지막에 해줘야 함 
		fis = new FileInputStream("test.txt");

	}catch (Exception e) {
		e.printStackTrace();

	}finally { // 만약 try 문 안쪽에서 예외가 발생하더라도 finally 안쪽의 코드는 무조건 실행 됨.
	
	try {
		fis.close();  // 객체 반납
	} catch (Exception e) {
		e.printStackTrace();
	}

	}
		
```

- **fis.close()를 사용하기 위해서는 try~catch를 반복해야 하기 때문에 try문 안에다가 FileInputStream fis = new FileInputStream("test.txt")를 써준다 → try~with~resource 구문**

### 1) 반복문을 활용해 읽기

```java
	// 1.번 코드 
	try(FileInputStream fis = new FileInputStream("test.txt")) { // test.txt에는 abc가 담겨있음 
		//System.out.println((char)fis.read()); // 한글자 출력 // a			
		//System.out.println((char)fis.read()); // 한글자 출력 // b			
		//System.out.println((char)fis.read()); // 한글자 출력 // c

		// 데이터를 한번에 읽어오기 
		byte[] fileContents = new byte[100];
		fis.read(fileContents);
		// test.txt 파일로부터 읽어들여온 데이터를 fileContents 배열안에 모두 담아준다.
			
		for(byte b : fileContents) {
			System.out.print(b + " "); // 아스키코드 32는 띄어쓰기, 엔터 13
		}
		
	}catch(Exception e) {
		e.printStackTrace();
	}
```

- **FileInputStream은 byte자료형을 활용 → 배열을 활용**
- **아스키코드에서 32는 띄어쓰기, 엔터는 13**

### 2) 텍스트 파일 복사 퀴즈

```java
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.FileWriter;

public class CopyFile {
	public static void main(String[] args) {
		// A.txt 파일을 복사해서 B.txt 파일로 만들어 보세요. 
		try(FileInputStream fis = new FileInputStream("A.txt");
			FileOutputStream fos = new FileOutputStream("B.txt")){
			
			byte[] temp = new byte[1024];
			
			fis.read(temp);
			System.out.println(new String(temp));
			
		}catch (Exception e) {
			e.printStackTrace();
		}
	}

}
```

### 3) FileReader / BufferedReader

```java
package com.fileIO.exam;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;

public class Exam04_FileRead02 {
	public static void main(String args[]) {
		
		// FileReader : text file character 단위로 읽어오는 클래스 
		// BufferedReader : 데이터를 한 줄 단위로 읽어들여올 수 있게 해줌 
		
		try {
			File file = new File("test.txt");
			FileReader fr = new FileReader(file);
			BufferedReader reader = new BufferedReader(fr);
			//System.out.println((char)fr.read());
			//System.out.println((char)fr.read());
			//System.out.println((char)fr.read());
			String str; 
			while((str = reader.readLine()) != null ) {
				System.out.println(str);
			}
			
		}catch(Exception e) {
			e.printStackTrace();
		}
	}
}
```