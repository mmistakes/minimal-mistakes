---
title: StringBuffer 와 StringBuilder의 차이점은 무엇인가? 왜 사용하는가?
permalink: /difference/stringbuffer-stringbuilder

categories: 
   - java
   - string

tags:
   - java
   - string
   - stringbuffer
   - stringbuilder

last_modified_at: 2020-06-09  18:47:59.77 

---
Java를 개발하다보면 String에 대해서 별다른 고민없이 (“Some text” + “ added text”)와 같이 ‘+’기호를 통해 스트링을 더하곤 한다.  
하지만 Java 개발자라면 고민을 더 해보고 Class를 선택해야한다. String과 StringBuilder, 그리고 StringBuffer를 어떤 경우에 사용하는지 확인해보자.

----------

# 각 클래스의 특징

String타입에 공부하다보면 String을 직접 더하는 것보다는 StringBuffer나 StringBuilder를 사용하라는 말이 있다. 이유에 대해서 살펴보자.

```java
String stringValue1 = "TEST 1";
String stringValue2 = "TEST 2";

System.out.println("stringValue1: " + stringValue1.hashCode());
System.out.println("stringValue2: " + stringValue2.hashCode());

stringValue1 = stringValue1 + stringValue2;
System.out.println("stringValue1: " + stringValue1.hashCode());

StringBuffer sb = new StringBuffer();

System.out.println("sb: " + sb.hashCode());

sb.append("TEST StringBuffer");
System.out.println("sb: " + sb.hashCode());

결과:
    stringValue1: -1823841245
    stringValue2: -1823841244
    stringValue1: 833872391
    sb: 1956725890
    sb: 1956725890

```

위에서 보는바와 같이 생성된 클래스의 주소값이 다른 것을 볼 수 있다. String은 새로운 값을 할당할 때마다 새로 생성되기 때문이다. 

String의 경우 immutable 하다.

즉, 불변의 성질을 가지고 있다.  

또한, String은 새로운 값을 더하게 되면 새롭게 객체가 생성되고 이는 가비지 컬렉터가 호출되어 정리하기 전까지 heap에 지속적으로 쌓이고 이는 메모리 측면에서 치명적이라고 볼 수 있다.

이와 달리 StringBuffer는 값은 memory에 append하는 방식으로 클래스를 직접생성하지 않는다. 논리적으로 따져보면 클래스가 생성될 때 method들과 variable도 같이 생성되는데, StringBuffer는 이런 시간을 사용하지 않는다.

------

String의 특징을 알아봤으니 memory에 값을 append하는 StringBuilder와 StringBuffer에 대해서 알아보자. api는 아래와 같다.

해석해보면 StringBuilder는 변경가능한 문자열이지만 synchronization이 적용되지 않았다. 하지만 StringBuffer는 thread-safe라는 말에서처럼 변경가능하지만 multiple thread환경에서 안전한 클래스라고 한다. 이것이 StringBuilder와 StringBuffer의 가장 큰 차이점이다.

즉, StringBuffer는 동기적으로 작동하기 때문에 multi thread 환경에서 다른 값을 변경하지 못하도록 하므로 좀 더 안전하다.
그러므로 web 이나 소켓등 비동기적으로 동작하는 경우는 StringBuffer를 사용하는 것이 좋다!  

multi thread 환경이 아닐 경우 StringBuilder를 쓰는 것이 조금 더 속도가 빠르다!

결과를 보면 multi thread의 StringBuilder의 경우 비동기적 처리를 하기 때문에 무시되는 append가 존재하고 이 때문에 올바른 값을 얻을 수 없을 경우도 생긴다!  

```java
StringBuffer stringBuffer = new StringBuffer();
StringBuilder stringBuilder = new StringBuilder();

new Thread(() -> {
    for(int i=0; i<10000; i++) {
        stringBuffer.append(i);
        stringBuilder.append(i);
    }
}).start();

new Thread(() -> {
    for(int i=0; i<10000; i++) {
        stringBuffer.append(i);
        stringBuilder.append(i);
    }
}).start();

new Thread(() -> {
    try {
        Thread.sleep(5000);

        System.out.println("StringBuffer.length: "+ stringBuffer.length());
        System.out.println("StringBuilder.length: "+ stringBuilder.length());
    } catch (InterruptedException e) {
        e.printStackTrace();
    }
}).start();

결과: 
    StringBuffer.length: 77780
    StringBuilder.length: 76412
```
<!--stackedit_data:
eyJoaXN0b3J5IjpbMzI0MTQ1NTI5XX0=
-->