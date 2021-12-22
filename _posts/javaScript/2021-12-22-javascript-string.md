---
layout: single
title: "자바스크립트의 문자열"
excerpt: 'js string'
categories: javaScript
tag: javaScript, dom, element
---

# 자바스크립트의 문자열
- 문자(문자열), 숫자, boolean, null, undefined
- 특징
  + 기본자료형이지만 객체처럼 다룰 수 있다. 기본자료형이지만 프로퍼티(멤버변수)도 있고, 메소드도 있다.

```javascript
  var a = "홍길동";  // 기본자료형
  var b - 3.141592; // 기본자료형
  a.toUpperCase();  // 메소드 실행 시 "홍길동"은 객체로 변한다
  b.toFixed(2);     // 메소드 실행 시 3.141592는 객체로 변한다
```

## 자바스크립트의 String 주요 프로퍼티와 메소드
- 주요 프로퍼티
  + length

```javascript
  var str1 = "홍길동:
  console.log(str1.length); // 3
```

- 주요 메소드
  + split(구분자) : 문자열을 구분자 기준으로 나누고, 배열에 담아 반환한다.

```javascript
  var str2 = "김유신,이순신,강감찬";
  var names = str2.split(',');
  console.log(names[0], names[1], names[2]);
```

- replace(문자, 대체할 문자) / replace(정규표현식, 대체할 문자) : 문자 혹은 정규표현식에 해당하는 문자를 지정된 문자로 반환한다.

```javascript
  var str3 = "나는 빨간색 지붕 빨간색 대문을 가진 집에서 살고 있다.";
  console.log(str3.replace("빨간", "노란");  // 첫번째로 발견된 문자열만 지정된 문자열로 대체한다
  console.log(str3.replace(/빨간/g, "노란"); // 정규표현식을 사용해 "빨간"에 사용되는 모든 문자열을 지정된 문자열로 대체할 수 있다 
```

- substring(start, end) : start부터 end 범위의 문자열을 반환한다.
- substr(start, length) : start부터 length만큼의 문자열을 반환한다.

```javascript
  var str4 = "가나다라마바사";
  console.log(str4.substring(1, 2)); // 1번째 글자부터 end-1 문자에 해당하는 문자를 반환한다 (나)
  console.log(str4.substr(1, 2));    // 1번째 글자부터 총 두 글자에 해당하는 문자를 반환한다 (나다)
```

- trim() : 문자열의 좌, 우에 있는 의미없는 공백이 제거된 문자열을 반환한다.

```javascript
  var str5 = "        abc       def         ";
  console.log(str5.trim()); // abc       def가 반환된다! 문자열 사이에 있는 공백은 제거되지 않는다
```
