---
layout: single
title: "[알고리즘] 인프런 강의와 함께 풀어보는 알고리즘 1 - 가장 작은 값"
categories: Algorithm-1
tag: [JavaScript, algorithm]
---

문제 : 100이하의 자연수 A, B, C를 입력받아 세 수 중 가장 작은 값을 출력해라. (정렬 메소드 쓰지말고 해보라 하심)\

sort 정렬 메소드 안쓴다면?

1) 가장 작은 값을 담는 변수 min 선언 (값을 비교하기 위해서 )
2) Math.min() 메소드로 a,b,c에 들어올 값 중 가장 작은 값 걸러주기 
3) 조건문) min 가장 작은 값과  a , b, c 중 같은 값을 찾는다.
4) 찾은 가장 작은 값을 answer 결과 변수에 해당 값을 담아주고 리턴한다.

```js
// 내 코드
function solution(a, b, c){
	let result;
  let min = Math.min(a,b,c);
  if(min === a) {
  	result = a
  } else if (min === b){
    result = b
  } else  if (min === c) {
    result = c
  }
  return result;
  }
					
// 내 코드 2) 정렬 메소드 쓸 경우 
function solution(a, b, c){
// sort 메소드 오름차순 정렬 식을 사용하면 [1, 2, 5]
  let arr = [a,b,c].sort((a,b) => a-b)
  // arr.slice(0.1) 0번쨰 인덱스 값만 잘라 리턴한다. 오름차순이니 가장 작은 값
	return arr.slice(0,1)   // 1
}
  console.log(solution(4, 3, 1));
// 레퍼런스 코드! if문으로만 구성하는 기본을 알려주고 싶으셨다.
function solution2(a, b, c){
	// 2, 5, 1 
  let result
  // a,b 둘부터 비교 a,b 둘 중에 작은값 담기
  // 2 < 5 true =>  a
  if(a<b) result = a;
  else result = b;
  // c 1 < a 2   => c
  if(c < result) result = c;
  return result; // c / 1
  }
```



​           
