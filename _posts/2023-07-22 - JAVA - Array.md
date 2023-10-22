---
layout: single
title:  "JAVA - Array"
categories: Java
tag: [JAVA, Array]
author_profile: true
toc: true
toc_label: 목차
toc_icon: "fas fa-list"

---

<br/>







# ◆배열

-**동일한 자료형**의 데이터를 연속된 공간에 저장하기 위한 자료구조이다.<br/>-한번 생성된 배열은 길이를 늘리거나 줄일 수 없다.<br/>-배열 변수는 **참조 변수**에 속하기 때문에 배열도 객체이므로 힙 영역에 생성되고 배열 변수는 힙 영역의 배열 객체를 참조하게 된다. 만일 참조할 배열 객체가 없다면 배열 변수는 null 값으로 초기화될 수 있다.<br/>

-**인덱스** :배열 항목에 붙인 번호로 **0부터** 1까지의 범위를 가진다.<br/>

<br>





## 1)값 목록으로 생성

-형식 : ``타입[] 변수 = { 값0, 값1, 값2, 값3, … };``<br/>

```java
public class Main {
    public static void main (String[] args){
        String [] arr = {"안녕","반가워","바보"};
        
        for(int i = 0; i < 3; i++){
           System.out.println(arr[i]);
       }
    }
}
```

배열을 값 목록으로 생성할 수 있는데 int의 데이터 타입에 arr라는 배열을 변수명을 지정하고 그 배열안에는 "안녕","반가워","바보" 데이터 값이 들어간다. <br/>

-System.out.println (arr[0]) = 안녕<br/>-System.out.println (arr[1]) = 반가워<br/>-System.out.println (arr[2]) = 바보

<br/>





## 2)new 연산자로 배열 생성

-형식 : ``타입[] 변수 =  new 타입 [길이];``

```java
public class Main {
    public static void main (String[] args){
        int [] arr = new int [3];
        arr[0] = 30;
        arr[1] = 45;
        arr[2] = 60;
        
        for(int i = 0; i < 3; i++){
           System.out.println(arr[i]);
       }
    }
}
```

배열을 new연산자로 생성할 수 있는데, int데이터 타입에 arr라는 배열의 변수명을 지정하고 new연산자를 사용하여 arr[0]~ arr[2]까지 모두 기본값 0으로 초기화 된다. 그러고 나서 인덱스을 활용하여 각 인덱스에 데이터 값을 지정하면 된다.<br/>

-System.out.println (arr[0]) = 30<br/>-System.out.println (arr[1]) = 45<br/>-System.out.println (arr[2]) = 60
