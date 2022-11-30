---
layout: single
title: "[Java]StringTokenizer사용법?"
excerpt : "문자열 분리"
categories: java
---

## 1. 라이브러리

```java
import java.util.StringTokenizer;
```
- import를 해주셔야 사용이 가능합니다.

---
## 2. 생성 방법
    1. StringTokenizer st = new StringTokenizer(문자열);
    2. StringTokenizer st = new StringTokenizer(문자열, 구분자);
    3. StringTokenizer st = new StringTokenizer(문자열, 구분자, true/false);

- StringTokenizer는 기본적으로 띄어쓰기를 기점으로 분리합니다.

```java
import java.util.*;

public class Main {
    public static void main(String[] args) {

        String str = "안녕하세요, Spring 개발자입니다.";

        StringTokenizer st = new StringTokenizer(str);

        while(st.hasMoreTokens()){
            System.out.println(st.nextToken());
        }
    }
}
```

```
안녕하세요,
Spring
개발자입니다.

종료 코드 0(으)로 완료된 프로세스
```

- 구분자를 적어줄 경우 띄어쓰기가 아닌 구분자를 기점으로 분리합니다.

```java
public class Main {
    public static void main(String[] args) {

        String str = "안녕하세요, Spring 개발자입니다.";

        StringTokenizer st = new StringTokenizer(str, ",");

        while(st.hasMoreTokens()){
            System.out.println(st.nextToken());
        }
    }
}
```


```
안녕하세요
 Spring 개발자입니다.

종료 코드 0(으)로 완료된 프로세스
```

- 구분자와 더불어 세 번째 파라메터에 true를 주게 되면 구분자 또한 토큰으로 취급합니다.

```java
import java.util.*;

public class Main {
    public static void main(String[] args) {

        String str = "안녕하세요, Spring 개발자입니다.";

        StringTokenizer st = new StringTokenizer(str, ",", true);

        while(st.hasMoreTokens()){
            System.out.println(st.nextToken());
        }
    }
}
```

```
안녕하세요
,
 Spring 개발자입니다.

종료 코드 0(으)로 완료된 프로세스
```

---
## StringTokenizer 메소드 

|리턴값|메서드명|역활|
|-----|-----|----------|
|bolean|hasMoreTokens()|남아있는 토큰이 있으면 true 없으면 false 반환|
|String|nextToken()|다음 토큰을 반환|
|String|nextToken(String delim)|delim기준으로 다음 토큰을 반환|
|bolean|hasMoreElements()|hasMoreTokens()와 동일하다.|
|Object|nextElement()|nextToken()과 동일하지만 객체를 반환|
|int|countTokens()|총 토큰의 개수를 반환|

---

## StringTokenizer VS split
- 둘 다 문자열을 파싱할 때 사용한다는 공통점이 있다. 
- StringTokenizer는 문자, 문자열로 구분한다. split은 정규표현식으로 구분한다.
- StringTokenizer는 빈 문자열을 Token으로 인식하지 않는다.  
반면 split은 빈 문자열을 Token으로 인식한다. 
- StringTokenizer는 결과값이 문자열이라면 split은 결과값이 문자열 배열이다.
- 성능적으로는 배열에 담아 반환하는 split이 StringTokenizer보다 뒤쳐진다.  
하지만 그렇게 큰 차이는 없으므로 편한 방식을 사용하면 된다. 