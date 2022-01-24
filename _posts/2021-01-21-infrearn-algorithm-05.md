---
layout: single
title: "[algorithm] JS - 문자열에서 특정문자의 개수 (split, 아스키코드)"
categories: Algorithm
tag: [JavaScript, algorithm]
title: "[알고리즘] 인프런강의 알고리즘, 수 1-5문제 - 최솟값(...문법, sort(), 난쟁이 키합(조합) splice활용!"



> **문제 1 : 특정문자 t 가 입력받은 문자열s (길이 100이하) 에 몇개가 존재하나?**

내 풀이) 

1. 개수를 셀 변수 count 선언 0 할당(0개니깐 첨에는)
1. 문자열의 모든 문자르 조회하여 t 문자와 같다면 ? 
1. count ++ 개수를 1개늘린다. 모든 문자를 비교했다면 count 출력한다.

> **새로 배운 방법 : split(구분자)활용!**
> split(구분자) : 구분자로 문자열을 구분하여 배열에 담아주는 메소드 (구분자로  문자를 넣어줄 수 있다는 것, 상상을 못했다.)

```js
 // 내 코드

function solution(s, t){
	let count = 0;  
  for (let el of s) {
    if (el === t) {
      count++;
    }
  }
  return count;
}

//  split(구분자)활용!
function solution(s, t){
	let count = s.split(t).length
  // t(R)을 구분자로 문자열을 배열로 나눈다.  
  // ['COMPUTE', 'P', 'OG', 'AMMING']
  // R을 기준으로 3번 나눠진것! 즉 마지막 요소는 R이 없었기 떄문에 -1 을 하면 3이나온다.
  return count-1; 
  }
  
  let s="COMPUTERPROGRAMMING";
  console.log(solution(s, 'R')); 
```
> **문제  2 : 문자열에서 대문자가 몇개인지?**

> ** 새로 배운 부분 : 아스키코드 charcodeAt(); 를 활용한 방법을 알려주셨다. **
> charcodeAt();  : 해당 문자의 아스키코드 넘버를 리턴하는 메소드를 사용하여  문자들에게 지정되어있는 수를 활용한다! 

대문자 알파벳은 65 ~ 90까지! 26개
소문자 :  (a)97 ~ (z)122 
```js
// 아스키코드로 대문자 개수구하기
// 대문자 알파벳은 65 ~ 90까지! 26개
// 소문자 :  (a)97 ~ (z)122 
function solution(s){         
  let count=0;
	for(let el of s){
		let num = el.charcodeAt();
		if(num>=65 && num<=90) { 
      result++
    }
}
  return count; 
}
  let str="KoreaTimeGood";
  console.log(solution(str));
```
