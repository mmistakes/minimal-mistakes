---
layout: single
title:  "JAVA - Wrapper class"
categories: Java
tag: [JAVA]
author_profile: true
toc: true
toc_label: 목차
toc_icon: "fas fa-list"

---

<br>







# ◆Wrapper class

-기본 자료타입(primitive type)을 객체로 다루기 위해서 사용하는 클래스들을 래퍼 클래스(wrapper class)라고 한다.

-모든 래퍼 클래스는 자바에서 기본적으로 제공하여 주며, java.lang패키지에 소속되어 있다.

![박싱_언박싱](C:\Users\hwang\pueser.github.io\images\2023-07-25-Wrapper class\박싱_언박싱.png)

<br>







## 박싱(boxing), 언박싱(un-boxing)

-박싱(boxing) : 기초 자료형의 데이터를 래퍼 클래스의 객체로 만드는 과정<br/>-언박싱(un boxing) : 래퍼클래스의 객체자료형의 데이터를 기초자료형으로 만드는 과정<br/>

<br>



**<박싱>**

 valueOf 메소드 활용

```java
public class Main {
    public static void main(String[] args)  {
        
        int str = "10";
        int str2 = "10.5";
        int str3 = "true";
        
        Byte b = Byte.valueOf(str);
        Integer i = Integer.valueOf(str);
        Short s = Short.valueOf(str);
        Long l = Long.valueOf(str);
        Float f = Float.valueOf(str2);
        Double d = Double.valueOf(str2);
        Boolean bool = Boolean.valueOf(str3);
		
    }
}
```

<br>



**<언박싱>**

parse** 메소드 활용

```java
public class Main {
    public static void main(String[] args)  {
        String str = "10";
        String str2 = "10.5";
        String str3 = "true";
        
        byte b = Byte.parseByte(str);
        int i = Integer.parseInt(str);
        short s = Short.parseShort(str);
        long l = Long.parseLong(str);
        float f = Float.parseFloat(str2);
        double d = Double.parseDouble(str2);
        boolean bool = Boolean.parseBoolean(str3);
		
    }
}
```

