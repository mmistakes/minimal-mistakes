---
layout: single
title: "[algorithm] JS - 문자열에서 중복된 문자를 제거하고 출력하기 (indexOf, includes)"
categories: Algorithm
tag: [JavaScript, algorithm]
title: "[알고리즘] 인프런강의 알고리즘, 수 1-5문제 - 최솟값(...문법, sort(), 난쟁이 키합(조합) splice활용!"



>**문제 : 중복된 문자를 제거하고 출력해라**

- 접근방법 : includes를 사용) 이미 포함하고 있는 문자는 넘어가고, 없는 문자만 빈 문자열에 담는 방식 
풀이) 
1. 문자를 담을 변수 result 선언 빈 문자열 할당
2. for of) 로 문자열을 조회한다.
3. continue문) 문자열에 해당 문자가 담겨있을 경우 다음 실행으로 넘어간다.
4. result에 해당 문자가 없는 경우 해당문자를 담아준다.
```js
// 내 코드 
        function solution(str) {
        let result = "";
        for (let el of str) {
          if (result.includes(el)){
              continue;
            }
            result += el;
          }
        return result;
      }
      console.log(solution("ksekkset")); //kset
```
> **새로 배운 방법 : indexOf() 특징 활용하는 방식**
 - 1번째 방법: 해당문자의 인덱스 출력하는데,같은 문자가 존재하면 맨 앞의 인덱스만 출력한다.
 해당문자의 본연의 인덱스와 indexOf(str[i])로 조회한 문자의 인덱스가 같은경우만 출력! 
    -> 초기의 값이 같지 않을경우? 같은 문자가 뒤에 존재한다는 뜻이다.
      indexOf()는 중복문자 중 맨 앞의 문자의 인덱스만 출력하기 때문에 뒤에 같은 문자가 있어도 조회하지않는다.
      즉 조회되는 인덱스의 i번째의 문자만 출력하면된다.
- 2번째 방법 : indexOf 존재하지않는 문자면 -1을 리턴하고, 

```js
function solution(str) {
  let result = "";
  for (let i = 0; i < str.length; i++) {
    if (str.indexOf(str[i]) === i) {
      result += str[i];
    }
  }
    return result;
}
      console.log(solution("ksekkset")); //kset
```
