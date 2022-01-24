---
layout: single
title: "[algorithm] JS - 특정 단어 다른 단어로 변경하기 (정규표현식 활용)"
categories: Algorithm
tag: [JavaScript, algorithm]
title: "[알고리즘] 인프런강의 알고리즘, 수 1-5문제 - 최솟값(...문법, sort(), 난쟁이 키합(조합) splice활용!"



> **문제 :   영어단어가 입력되면  단어에 포함된 ‘A'를 모두 ’#‘으로 바꾸어 출력해라**

풀이) 

1. A 를 찾아야하니, 입력되는 영어단어를 대문자로 바꿔준다.-> 메소드 toUpperCase()로 변환  
2. for of문으로 문자열의 모든 문자를 조회하여 A를 찾을 경우 result 에 #을 담아준다. 
3. 아닌경우 result 에 문자를 그대로 담아준다.
4. 반복문이 끝나면 result를 출력한다.

```js
function solution(str){
  let result = '';
  str = str.toUpperCase()
  for (let s of str){
    if (s === 'A') {
      result+= '#';
    }
    else { 
      result+= s;
    }
  }
    return result;
}
let str = "YAyaYaA";            
console.log(solution(str)); //Y#Y#Y##
```
> **새로 배운 방법 : 정규표현식으로 찾는 방법 **
>  - str.replace(/A/g, '#')  => replace(선택값,  바꿀값)메소드로 선택한 값을 원하는 값으로 변환한다.
>  - 정규표현식으로 /A/ 대문자 A만 설정, g붙이면 모든 A를 선택한다.  /A/g   = "#"으로 바꿔주는 식

```js
// 정규표현식 활용 훨씬 간단한 이 기분..
function solution(str){
  let result = '';
  str = str.toUpperCase()
  str.replace(/A/g, '#') 
   // 대문자 A를 찾아서 #으로 바꿔라! g 전역을 붙여주면 모든 A를 찾아라는 뜻
  }
    return result; 
}
let str = "YAyaYaA";            
console.log(solution(str));//Y#Y#Y##
```
