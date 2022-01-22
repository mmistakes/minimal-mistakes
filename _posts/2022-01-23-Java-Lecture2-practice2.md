---
title: 'Java - Lecture2 - practice2'
categories:
  - Java
tags:
  - Java
toc: true
toc_sticky: true
toc_label: 'Java'
---

# 기본형(primitive type) 예제

다음 코드는 오류가 날까요?  
난다고 생각하면 코드를 수정하시오

```java
package lecture2;

public class practice2 {
	public static void main(String args[]){
		int i=0;
		while(1){
			if(i==3) break;
			System.out.println(i);
			i=i+1;
		}
	}
}
```

> **Answer**

```java
package lecture2;

public class practice2 {
	public static void main(String args[]){
		int i=0;
		while(true){
			if(i==3) break;
			System.out.println(i);
			i=i+1;
		}
	}
}
```
