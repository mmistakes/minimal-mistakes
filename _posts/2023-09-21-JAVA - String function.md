---
layout: single
title:  "JAVA - String function"
categories: Java
tag: [JAVA]
author_profile: true
toc: true
toc_label: 목차
toc_icon: "fas fa-list"

---

<br>







#  ◆split

Java의 String 클래스에서 제공하는 split() 메서드는 특정 문자열 또는 정규식을 기반으로 문자열을 분리합니다.<br>분리된 문자열은 배열로 구성되며, 결과적으로 분리된 문자열 배열이 반환된다. split은 `sperator(구분자)`와, 분리할 `문자열의 개수 limit`을 인자로 받는다.

문법

```java
str.split([separator[, limit]])
```

<br>







## 1) 구분자로만 인자 전달한 경우

```java
const string = 'hello, world, javascript';
console.log(string.split(','));
```

결과

```java
['hello', 'world', 'javascript']
```

<br>





## 2) 구분자와 limit을 전달한 경우

limit은 구분자로 분리할 문자열의 개수를 나타낸다. 0을 전달하면 빈배열을 리턴하며, 1을 전달하면 구분자로 1개의 문자열만 잘라서 배열을 리턴한다.

```java
const string = 'hello, world, javascript';
console.log(string.split(',', 0));
console.log(string.split(',', 1));
console.log(string.split(',', 2));
console.log(string.split(',', 3));
```

결과:

```java
[],
['hello',]
['hello', 'world']
['hello', 'world', 'javascript']
```

<br>





## 3) 구분자와 limit을 전달하지 않는 경우

```java
const string = 'hello, world, javascript';
console.log(string.split());
```

결과:

```java
['hello', 'world', 'javascript']
```

<br>







# ◆substr()

특정 index에서 원하는 길이만큼 잘라서 문자열로 리턴한다.

문법

```java
str.substr(start[, length])
```

<br>





## 1) start가 양수일때

```java
let str = 'HelloWorldJavascript';

let a = str.substr(5);
let b = str.substr(0, 5);
let c = str.substr(0, 10);

console.log(a);
console.log(b);
console.log(c);
```

결과:

```java
WorldJavascript //5번째 인덱스 부터 문자열 마지막까지
Hello //0번째 인덱스 부터, 길이 5만큼
HelloWorld // 0번째 인덱스 부터, 길이 10만큼
```

<br>





## 2) start가 음수일때

```java
let str = 'HelloWorldJavascript';

let a = str.substr(-6);
let b = str.substr(-6, 3);
let c = str.substr(-6, 5);

console.log(a);
console.log(b);
console.log(c);
```

결과:

```java
script // 뒤에서부터 6번째 까지
scr // 뒤에서 6번째부터 3번째자리까지
scrip // 뒤에서 6번째 부터 5번째자리까지
```

<br>







# ◆substring()

시작 index에서 끝 index전까지 문자열 잘라서 리턴한다(공백 미포함). start 는 포함하고 end는 포함하지 않는다. 예를 들어 `str.substring(0,4)` 이면 0번째 인덱스 부터 4번째는 포함되지 않는 인덱스 까지 즉, 0~3까지의 문자열을 잘라서 리턴한다.

문법

```java
str.substring(start, end)
```



```java
let str = 'Hello World Javascript';

let a = str.substring(6); //6번째 인덱스 부터 끝까지
let b = str.substring(6, 8); //6번째 인덱스 부터 7번째 까지

console.log(a);
console.log(b);
```

결과 :

```java
World Javascript
Wo
```

<br>







# ◆slice()

시작 index에서 끝 index전까지 문자열 잘라서 리턴한다(공백 미포함).<br>substring과의 차이점은 인자로 음수가 전달되었을 때, `substring()`은 빈 문자열을 리턴합니다. 하지만 slice()는 음수 Index를 적용하여 문자열을 자른다.

문법

```java
arr.slice([begin[, end]])
```



```java
let str = 'Hello World Javascript';

let a = str.substring(0, -6);
let b = str.slice(0, -6);

console.log(a);
console.log(b);
```

결과:

```java
//빈문자열 리턴함
Hello World Java //뒤에서부터 -6 인덱스 적용
```

<br>







# ◆trim()

문자열 양 끝의 공백을 제거한다. 문자열 중간의 공백은 제거해주지 않는다.

```java
String str = "      Hello world!     "
str = str.trim()
    
console.log(str);
```

결과 :

```java
Hello world!
```

<br>







# ◆replaceAll()

정규식에 일치하는 문자열을 원하는 문자열로 치환해 준다. (전체)

문법

```java
str.replace("바꿔줄 대상", "치환대상")
```



```java
String str = "aabbaabbaabb"

String str1 = str.replace("ab", "00"); // "a00ba00ba00b"

String str2 = str.replace("[ab]", "00"); // "000000000000"
```

결과 :

```java
a00ba00ba00b // "ab"에 해당하는 문자열 치환
000000000000 // 정규식 "[ab]"에 해당하는 문자열 치환 즉, a 또는 b인 문자를 치환
```

<br>








# ◆concat()

문자열을 합치는 메서드

문법

```java
str.concat("붙여줄 문자")
```



```java
String str = "ABC";

String strResult = str.concat("DE").concat("FG");

System.out.println(strResult); 
```

결과:

```java
ABCDEFG
```




참고 블로그 : <a href="https://umanking.github.io/2022/07/17/javascript-string-substring/">umanking.github.io</a>

