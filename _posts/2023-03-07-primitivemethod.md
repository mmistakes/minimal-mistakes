---
layout: single
title: "원시값 메서드"
---

### 원시값에서 메서드 사용하기

객체에서 사용하는 편리한 메서드를 원시형에서도 사용할 수 있다.
원시형의 종류는 문자(string), 숫자(number), bigint, 불린(boolean), 심볼(symbol), null, undefined형으로 총 일곱 가지이다.

    let str = "Hello";
    
    alert( str.toUpperCase() ); // HELLO
	
위의 경우 str의 프로퍼티값에 접근할경우 문자열의 값과 메서드toUpperCase() 가지고있는 특별한 객체가 생성된 후, 메서드를 실행, 값을 반환한 다음 특별한 객체는 파괴된다.
