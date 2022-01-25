---
title: '2022-01-25-Java-Practice3-question4'
categories:
  - Java
tags:
  - Java
toc: true
toc_sticky: true
toc_label: 'Java'
---

# 문제 4

사용자로부터 배열의 크기를 입력 받은 후 해당 크기의 A, B 2개의 배열을 만들어야 한다.  
A는 2, 4, 6 ... 짝수로 구성되고, B는 1, 3, 5 ... 홀수로 구성되어있다.  
A와 B를 이용해서 배열 C = { 1, 2, 3, 4, 5, ... }를 만들어야 한다.

---

- C는 A와 B의 원소를 입력받는 형식으로 작성해야합니다. (직접숫자입력 X)  
  Ex) C[0] = B[0], C[1] = A[0] ...

---

## 콘솔 입출력 결과

```java
배열 크기를 입력해주세요: 10
배열 A: 2 4 6 8 10 12 14 16 18 20
배열 B: 1 3 5 7 9 11 13 15 17 19
배열 C: 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20
```

<br>

> **Answer**

### question4.java

```java
package practice3;

import java.util.Scanner;

public class question4 {
	public static void main(String args[]) {
		Scanner sc = new Scanner(System.in);

		int size;

		System.out.print("배열 크기를 입력해주세요: ");
		size = sc.nextInt();

		int[] a =  new int[size];
		int[] b =  new int[size];
		int[] c =  new int[size*2];

		System.out.print("배열 A: ");
		for(int i=0; i<size; i++) {
			a[i] = 2*(i+1);
			System.out.print(a[i]+" ");
		}
		System.out.println();

		System.out.print("배열 B: ");
		for(int j=0; j<size; j++) {
			b[j] = 2*(j+1)-1;
			System.out.print(b[j]+" ");
		}
		System.out.println();

		int l=0, m=0;
		System.out.print("배열 C: ");
		for(int k =0; k<2*size; k++) {
			if(k%2==0) {
				c[k]=b[l];
				l++;
			}
			else {
				c[k]=a[m];
				m++;
			}
			System.out.print(c[k]+" ");
		}
	}
}
```
