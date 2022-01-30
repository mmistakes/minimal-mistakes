---
title: "Java - Practice4 - question3"
categories:
  - Java
tags:
  - Java
toc: true
toc_sticky: true
toc_label: "Java"
---

# 문제 3

3명의 이름과 성적을 입력 받고 해당 학생들의 등급에 대해 출력하는 코드가 있다.

```java
package practice3;

import java.util.Scanner;

public class temp {
	public static void main(String[] args) {
		Scanner sc = new Scanner(System.in);

		String u_name[];
		int u_score[];
		int size = 3;
		u_name = new String[size];
		u_score = new int[size];
		int num = 0;

		while (num < size) {
			System.out.print("이름을 입력해주세요 : ");
			u_name[num] = sc.nextLine();
			num++;
		}
		num = 0;
		while (num < size) {
			System.out.print("점수를 입력해주세요 : ");
			u_score[num] = sc.nextLine();
			num++;
		}
		num = 0;

		while (num < size) {
			if (u_score[num] >= 85)
				System.out.println(u_name[num] + " grade is A");
			else
				System.out.println(u_name[num] + " grade is not A");
			num++;
		}
	}
}
```

위 코드를 다음과 같이 변경해야 합니다.

- 이름과 점수를 이중배열을 이용해 하나의 배열로 구현.
- 모든 While문을 for문으로 변경
  -if else -> A ? B : C 조건연산자로 변경

<br>

> **Answer**

```java
package practice3;

import java.util.Scanner;

public class Problem3 {

	public static void main(String[] args) {
		Scanner sc = new Scanner(System.in);

		String u_array[][];

		int size = 3;
		u_array = new String[size][2];

		int num;

		for(num =0; num<size; num++) {
				System.out.print("이름을 입력해주세요 : ");
				u_array[num][0] = sc.nextLine();
				System.out.print("점수를 입력해주세요 : ");
				u_array[num][1] = sc.nextLine();
		}

		for(num = 0; num<size; num++) {
			System.out.println((Integer.parseInt(u_array[num][1]) >= 85) ?
					(u_array[num][0] + " grade is A") :
					(u_array[num][0] + " grade is not A"));
		}
	}
}
```
