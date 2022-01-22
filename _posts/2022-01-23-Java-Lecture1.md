---
title: 'Java - Lecture1'
categories:
  - Java
tags:
  - Java
toc: true
toc_sticky: true
toc_label: 'Java'
---

# 객체 만들기 예제

다음과 같은 출력물이 나오는 코드를 생각해 보세요.
<br><br>
**Mary says Ruff Ruff**  
**Doory says Ruff Ruff**

<br>

> **Source**

```java
package lecture1;

public class DogTestDrive {	//Test class
	public static void main(String arge[]) {
		Dog d = new Dog();
		d.size=40;
		d.name="Mary";
		System.out.print(d.name+" says ");
		d.bark();

		Dog d2 = new Dog();
		d.size=40;
		d.name="Doory";
		System.out.print(d.name+" says ");
		d2.bark();
	}
}

```
