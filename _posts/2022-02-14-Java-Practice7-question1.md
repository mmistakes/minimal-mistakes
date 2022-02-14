---
title: 'Java - Practice7 - question1'
categories:
  - Java
tags:
  - Java
toc: true
toc_sticky: true
toc_label: 'Java'
---

# 문제 1

아래 테스트클래스를 실행시키면 오른쪽 그림과 같은 문구가 출력이 된다.  
해당 코드를 실행시키기 위한 클래스를 작성하시오

- Animal 클래스는 추상클래스, bark()함수는 추상 메소드로 작성
  <br>

```java
package practice7;

public class Test1 {
	public static Animal[] animals;

	public static void main(String[] args) {
		animals = new Animal[3];
		animals[0] = new Cat();
		animals[1] = new Dog();
		animals[2] = new Cow();

		for(int i=0; i<animals.length; i++) {
			animals[i].bark();
		}
	}
}
```

```
Yawong~
Bow wow
Hmme~
```

> **Answer**

- Animal.java

```java

package practice7;

abstract class Animal {
	public abstract void bark();
}

```

- Cat.java

```java
package practice7;

public class Cat extends Animal{
	public void bark() {
		System.out.println("Yawong~");
	}
}
```

- Dog.java

```java
package practice7;

public class Dog extends Animal{
	public void bark() {
		System.out.println("Bow wow");
	}
}
```

- Cow.java

```java
package practice7;

public class Cow extends Animal{
	public void bark() {
		System.out.println("Hmme~");
	}
}
```
