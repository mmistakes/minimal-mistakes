---
title: \[JAVA] String 객체는 어떻게 저장될까? (String Pool)

categories:  java

tags:  
 - java
 - string pool
 - string literal
 - heap

last_modified_at: 2021-06-05 16:44:06

---

일단, 자바에서 String은 immutable(불변)입니다. 그래서 한번 생성된 것이 수정되지 않습니다. 
그렇기 때문에 자칫하면 메모리 낭비로 이어질 수 있습니다. 이를 해결하기 위해서 String Pool이라는 것을 이용합니다.

# String Pool

String 선언 예제에서 `str`, `str1` 은 메모리에 적재되는 형태가 다릅니다.

```java
String LiteralString str = "Kim";
String ObjectString str1 = new String("Kim");
```

첫 번째 방식을 리터럴 방식이라고 하고, 두 번째 방식을 객체 생성 방식이라고 합니다.

## String Interning

리터럴의 사용/생성 과정을 **String Interning** 이라고 합니다. 

- 메모리 내부에 String pool 이라는 공간을 만들어 두고 고유한 리터럴 문자열을 저장하여 이를 참조하여 사용하도록 하는 방법을 사용해서 말이죠.

동일한 문자열을 가지는 String 리터럴을 선언하는 예제를 확인해보겠습니다.

1. 기본적으로 String 변수를 생성하고 문자열을 할당 (리터럴) 하게 되면 JVM 내부에서는 문자열 값이 String Pool 에 존재하는지 확인합니다.
2. 이때 발견이 된다면 Java 컴파일러는 해당 문자열 리터럴의 주소에 대한 참조를 반환
3. 찾지 못한다면 해당 문자열의 리터럴을 Pool에 저장한 후에 참조를 반환

```java
String str1 = "Kim";
String str2 = "Kim";

//두 String 객체의 주소(Heap에 할당된)는 동일합니다.
assertThat(str1).isSameAs(str2);
```


## String Object

String 생성자를 이용해서 String 객체를 생성하는 경우를 살펴봅시다.

- 기본적으로 `new` 키워드가 등장을 하면 Java 컴파일러는 새로운 객체를 heap 공간에 할당하여 저장합니다.
- 그렇기 때문에 `new`로 생성된 String 객체들은 각자 Heap 공간상에 적재되게 됩니다.

```
String str1 = "Kim";
String str2 = new String("Kim");

//두 String 객체의 주소(Heap에 할당된)는 다릅니다.
assertThat(str1).isNotSameAs(str2);
```


## String Literal vs String Object

- 결론적으로 Literal 선언이 재사용을 하기 때문에 new로 생성하는 것 보다는 빠릅니다.
    - 다만 큰차이는 나지 않습니다 ..
- 그래서 String에서 제공하는 `intern()` 이라는 메소드를 통해서 new로 생성된 String 객체를 String pool에 넣을 수는 있습니다.
    - 다만.. `intern()` 이 생각보다 비싸서 오히려 부작용이 생길수 있습니다.

# 마무리

기본적으로 String은 String Pool을 이용하는 게 좋고, 리터럴로 사용하자 가 결론입니다.  

굳이, new 해서 사용할 경우가 있을까 싶습니다!

## 출처

- [진성 소프트](https://jinseongsoft.tistory.com/365)
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTEyNTk1NzgxNzNdfQ==
-->