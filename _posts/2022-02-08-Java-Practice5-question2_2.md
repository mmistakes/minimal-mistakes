---
title: 'Java - Practice5 - question2_2'
categories:
  - Java
tags:
  - Java
toc: true
toc_sticky: true
toc_label: 'Java'
---

# 문제 2_2

FileReader를 사용해서 위에서 작성한 txt파일을 한글자씩 읽어서 출력해보고, BufferedReader를 이용해서 한 문장씩 읽어서 출력해본다.  
<br>

> **Answer**

```java
package practice5;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;

public class question2_2 {
	public static void main(String args[]) throws IOException {
		File file = new File("C:\\Users\\SeungHyun Lee\\eclipse-workspace\\Practice5\\test2_1.txt");
		FileReader fr = new FileReader(file);

		int str = fr.read();
		while(str!=-1) {
			System.out.println((char)str);
			str = fr.read();
		}

		File _file = new File("C:\\\\Users\\\\SeungHyun Lee\\\\eclipse-workspace\\\\Practice5\\\\test2_1.txt");
		FileReader _fr = new FileReader(_file);
		BufferedReader br = new BufferedReader(_fr);

		System.out.println(br.readLine());

		br.close();
		_fr.close();
	}
}
```
