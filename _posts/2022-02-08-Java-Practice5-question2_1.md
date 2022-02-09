---
title: 'Java - Practice5 - question2_1'
categories:
  - Java
tags:
  - Java
toc: true
toc_sticky: true
toc_label: 'Java'
---

# 문제 2_1

BufferedWriter, BufferedReader를 이용해서 txt파일을 작성하셔야 합니다.  
Txt파일에 들어가는 내용은 exit을 입력하기 전까지 계속 입력이 가능해야 하며 exit을 입력하게 되면 입력이 좋료되며 exit문장은 txt파일 내에 존재해서는 안됩니다.  
<br>

> **Answer**

```java
package practice5;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStreamReader;

public class question2_1 {
	public static void main(String args[]) throws IOException {
		File file = new File("test2_1.txt");
		FileWriter fw = new FileWriter(file);
		BufferedWriter bw = new BufferedWriter(fw);
		InputStreamReader isr = new InputStreamReader(System.in);
		BufferedReader br = new BufferedReader(isr);

		String str = "";
		System.out.println("문서 내용을 작성해주세요");

		while (!str.equals("exit")) {
			bw.write(str);
			str = br.readLine();
		}


		br.close();
		isr.close();
		bw.close();
		fw.close();
	}
}

```
