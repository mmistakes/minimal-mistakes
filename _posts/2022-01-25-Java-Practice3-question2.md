---
title: '2022-01-25-Java-Practice3-question2'
categories:
  - Java
tags:
  - Java
toc: true
toc_sticky: true
toc_label: 'Java'
---

# 문제 2

아래 그림과 같은 피라미드를 만드는 클래스를 하나 생성한다.  
이 클래스는 printStar(), setInfo() 2개의 함수를 반드시 포함해야 한다.  
printStar() 함수는 피라미드를 출력하는 기능을 하며, setInfo() 함수는 문자의 모양과 피라미드 줄 수를 결정하는 기능을 한다.

---

- 테스트용 클래스를 만들어서 객체를 생성, 실행하셔야 합니다.

---

## question2.java

```java
package practice3;

public class question2 {
	public static void main(String args[]) {
		Star s = new Star();
		s.printStar();
		s.setInfo();
		s.printStar();
	}
}
```

## 콘솔 입출력 결과

```java
   *
  ***
 *****
Input character: 0
Input line number: 7
       0
      000
     00000
    0000000
   000000000
  00000000000
 0000000000000
```

<br>

> **Answer**

### star.java

```java
package practice3;

import java.util.Scanner;

public class Star {
	String ch = "*";
	int line_num = 3;

	void setInfo() {
		Scanner sc = new Scanner(System.in);

		System.out.print("Input character: ");
		ch = sc.nextLine();
		System.out.print("Input line number: ");
		line_num = sc.nextInt();
	}

	void printStar(){
		for(int i=1; i<=line_num; i++) {
			for(int j=line_num-i; j>=0; j--) {
				System.out.print(" ");
			}
			for(int k=1; k<=2*i-1; k++) {
				System.out.print(ch);
			}
			System.out.println();
		}
	}
}
```
