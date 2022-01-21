---
layout: single
title: "[알고리즘] 인프런강의 알고리즘, 문자열 6-7 문제  - <br> 정규표현식 맛보기, split(문자구분자), 아스키코드활용"
categories: Algorithm-1 
tag: [JavaScript, algorithm]
---

* 강의의 레퍼런스 코드는 선생님의 강의 자료 풀이설명 및 답안이 담겨있어서 공개 X

**문제 1:   영어단어가 입력되면  단어에 포함된 ‘A'를 모두 ’#‘으로 바꾸어 출력해라**

---

풀이) 

1. A 를 찾아야하니, 입력되는 영어단어를 대문자로 바꿔준다.-> 메소드 toUpperCase()로 변환  

2. for of문으로 문자열의 모든 문자를 조회하여 A를 찾을 경우 result 에 #을 담아준다. 

3. 아닌경우 result 에 문자를 그대로 담아준다.

4. 반복문이 끝나면 result를 출력한다.

   ---

- 정규표현식으로 찾는 다면? 
  1. str.replace(/A/g, '#')  => replace(선택값,  바꿀값)메소드로 선택한 값을 원하는 값으로 변환한다.
  2. 이때 정규표현식으로 /A/ 대문자 A만 설정, g붙이면 모든 A를 선택한다.  /A/g   = "#"으로 바꿔주는 식

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



**문제 2 : 특정문자 t 가 입력받은 문자열s (길이 100이하) 에 몇개가 존재하나?**

---

풀이) 

1. 개수를 셀 변수 count 선언 0 할당(0개니깐 첨에는)
1. 문자열의 모든 문자르 조회하여 t 문자와 같다면 ? 
1. count ++ 개수를 1개늘린다. 모든 문자를 비교했다면 count 출력한다.

- 신선한 방법 : split(구분자)활용!
   split(구분자) : 구분자로 문자열을 구분하여 배열에 담아주는 메소드

  구분자로  문자를 넣어줄 수 있다는 것, 상상을 못했다.

**비슷한문제 :  대문자가 몇개인지?**

---

- 신선한 방법 : 아스키코드 charcodeAt(); 
  charcodeAt();  : 해당 문자의 아스키코드 넘버를 리턴하는메소드

  방법 문자들에게 지정되어있는 수를 활용

  대문자 알파벳은 65 ~ 90까지! 26개
  소문자 :  (a)97 ~ (z)122 

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



