---
title: 'Java - Practice5 - question3_1'
categories:
  - Java
tags:
  - Java
toc: true
toc_sticky: true
toc_label: 'Java'
---

# 문제 3_1

txt파일 경로를 입력받으면 해당 파일의 문장 개수와, 문자 개수를 출력하는 코드를 작성하시오.

- 개행문자는 문자 개수에 포함되면 안됩니다.(공백은 포함)  
  <br>

> **Answer**

```java
package practice5;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;

public class question3_1 {
	public static void main(String args[]) throws IOException {
		File file1 = new File("C:\\Users\\SeungHyun Lee\\eclipse-workspace\\Practice5\\sample.txt");
		FileReader fr1 = new FileReader(file1);
		BufferedReader br = new BufferedReader(fr1);

		File file2 = new File("C:\\Users\\SeungHyun Lee\\eclipse-workspace\\Practice5\\sample.txt");
		FileReader fr2 = new FileReader(file2);

		int i1 = 0;
		while (br.readLine() != null) {
			i1++;
		}
		System.out.println("문장 개수는 " + i1 + "개입니다.");

		int str = fr2.read(), i2=0;
		while(str!=-1) {
			str=fr2.read();
			i2++;
		}
		fr2.close();

		int result = i2-(i1-1);
		System.out.println("문자 개수는 " + result + "개입니다.");
	}
}

```
