---
layout: single
title:  "JAVA - equals"
categories: Java
tag: [JAVA]
author_profile: true
toc: true
toc_label: 목차
toc_icon: "fas fa-list"

---

<br>



# ◆String equals



## 1)문자열 값 비교

-String은 클래스이기 때문에 new 연산자를 사용하여 생성할때 새로운 주소값이 부여되어서, 같은값을 부여하더라도 서로간의 주소값이 다르다.<br/> 그렇기 때문에 == 연산자를 사용하여 비교하게 되면 서로의 주소값이 달라서 서로의 값이 다르다는 결론이 나오기 때문에 equals(대상의 값을 비교)사용해야한다.<br/>

```java
public class Main {
    public static void main(String[] args) {
        String s1 = "abcd";
        String s2 = new String("abcd");
		
        if(s1.equals(s2)) {
            System.out.println("두개의 값이 같습니다.");
        }else {
            System.out.println("두개의 값이 같지 않습니다.");
        }
    }
}
```

String클래스 안에 있는 equals라는 메서드를 사용하면 주소값이 아닌 데이터 값을 비교하기 때문에 "두개의 값이 같습니다."가 출력된다.
