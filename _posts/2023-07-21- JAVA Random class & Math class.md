---
layout: single
title:  "JAVA - Random class & Math class"
categories: Java
tag: [JAVA, Random, Math]
author_profile: true
toc: true
toc_label: 목차
toc_icon: "fas fa-list"

---

<br/>



# ◆Math 클래스

-Math.random()메서드 : 0.0~ 1.0 사이의 **double** 난수를 얻는데 사용된다.

```java
public class Main {
    public static void main(String[] args) {
        System.out.println(Math.random()); // 0.4893738499595
        System.out.println((int)Math.random(10)+1);
    }
}
```

Math클래스는 Object클래스 안에 있으므로 굳이 따로 import시켜주지 않아도 된다.<br/> Math.random함수에  10을 곱해준위 int값으로 casting하면 0~9까지 출력되고 +1 값을 더해주면 1부터 10까지 출력할 수 있게된다.

<br/>





# ◆Random 클래스

-Random 클래스는 **boolean, int, char, float, double** 난수를 얻는데 사용된다.<br/>

```java
import java.util.Random;

public class Main {
    public static void main(String[] args){
        Random rand = new Random();
        
        System.out.println(rand.netxInt(10)+1); // 1~10까지 출력
        System.out.println(rand.nextFloat()); //
        System.out.println(rand.nextDouble()); //
    }
}
```

위와 같이 Random클래스를 생성하고 원하는 타입형을 호출하면 된다.<br/>

값은 0부터 시작하기 때문에 10의 값을 넣으면 0부터 9까지 출력되기 때문에 1부터 10까지의 값을 호출하고 싶으면 마지막에 1의 값을 더해주면 된다.<br/>



