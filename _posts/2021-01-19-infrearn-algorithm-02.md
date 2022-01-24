---
layout: single
title: "[algorithm] JS - 배열요소 최솟값 구하기, 나열하기, 삼각형 성립조건"
categories: Algorithm
tag: [JavaScript, algorithm]
---



>**문제 1: 배열 요소 중 최솟값 구하기 (기본 최솟값 문제가 몇개있어서 한문제만 올리기)**

 - 접근방식 1) : Math.min() 최솟값을 구해주는 메소드로 구해주하기, 스프래드 문법사용!
 - 접근방식 2) : arr.sort() 오름차순으로 배열의 요소를 정렬하여, 가장작은 첫번째 요소를 출력한다.

```js
 function solution2(arr) {
        // 배열을 인자로 넘겨줘야하므로, ...arr 로 배열의 요소를 풀어서 담아준다.
				return Math.min(...arr); 
      }
      console.log(solution2([5, 7, 1, 3, 2, 9, 11]); // 1
                  
function solution2(arr) {
        // [1, 2, 3, 5, 7, 9, 11][0] === arr[0]  => 1
        return arr.sort((a,b) => a - b)[0];  
      }
      console.log(solution2([5, 7, 1, 3, 2, 9, 11])); //1
```



>**문제 2 : 길이가 서로 다른 A, B, C 세 개의 막대 길이가 주어짐, 세 막대로 삼각형을 만들 수 있 으면 “OK"를 출력하고,만들 수 없으면 ”NO"를 출력해라.**

- 접근 방식 : 세 막대(세 변이) 삼각형이 될 수 없는 조건과 될 수 있는 조건을 생각해라

  조건 : 세변의 길이가 주어질때, 가장 긴변의 길이는 나며지 두 변의 길이의 합보다 작아야한다고 한다.

    [삼각형성립조건](https://m.blog.naver.com/PostView.naver?isHttpsRedirect=true&blogId=sugang2004&logNo=130144597008)

    풀이) 

  1. 모든 변의 길이를 오름차순으로 정렬한다. 
  2. 정렬한 배열의 작을 요소 앞의 두 요소의 합이 마지막 요소 보다 크면?  "OK" 아닐시 "NO" 삼항연산자로 구성

- 레퍼런스 코드는 거의 비슷하게 다른 방식으로 푸셨다.
  전체 변의 길이 - 가장 큰변의 길이를 뺀 값과 전체변의 길이에서 두변의 길이를 뺀 값을 다시 비교하는 방식히였다.

```js
 // 내 코드
function solution(a, b, c) {
  let arr = [a,b,c].sort((a,b) => a - b);
  return arr[2] < arr[0] + arr[1] ? "OK" : "NO"
}
console.log(solution(33, 30, 50)); // OK

// if문으로 쓴다면? 이런 방식이다.
function solution(a, b, c) {
  let arr = [a,b,c].sort((a,b) => a - b);
  if (arr[2] < arr[0] + arr[1]) {
  	return "OK" 
  } else {
  	return "NO"
	}        
}
  console.log(solution(33, 30, 50)); 

```

> **문제 3 : n명의 학생에게 1명당 연필 1자루를 나누어 줄때 몇 다스가 필요한지 구해라. (1다스 =12자루/ 학생수 <= 1000명)**

- 접근 방식

  - (1다스에 12자루 === 학생 12명 일때  1다스 ) 라는 것!
    13이면? 12(1다스) + 1 자루가 필요해서,  1자루가 부족하더라도 2다스가 필요하다.

    

    풀이) 

    1. 12자루가 1다스니깐,  학생수 n / 12로 나눠서 다스의 개수를 구한다.

    2. 이때 소숫점( 자루 )가 나올경우를 생각하여 Math메소드를 사용하여 올림을 해준다.

       (소숫점있을 시 다스 +1 한개 늘어남)

```js
function solution(n) {
	return Math.ceil(n / 12);
  //(n / 12) => 178/12 => 14.833333333333334  // 소수점이 나올경우 !
  // Math.ceil() => 15가 된다.
  }

 console.log(solution(178));
```

>**문제 4: 1부터 자연수 N까지의 합을 출력해라 **

풀이) 

1. 더한 값을 담을 변수선언 0할당.
2. 반복문으로 초기값) i = 1을 +1씩 증가시키며,  N이 될때까지의 수를 모두 반복하며 더한다.

```js
function solution(n){
  let result=0;
  for(let i = 1; i <= n; i++){
 		// result = result + i;
    result += i;
  }
  	return result;
  }
console.log(solution(5)) // 15
```



>**문제 5:   자신이 난쟁이라고 하는 9명이있다. 진짜 난쟁이 7명 키의 합은 100이라고 한다. 진짜 난쟁이를 찾아 일곱 난쟁이의 키를 나열해라** **

- 주어지는 값 : 난쟁이 9명 키 : [20, 7, 23, 19, 10, 15, 25, 8, 13]

- 접근 방법) 7명의 난쟁이들의 키가 100이니깐,  2명의 난쟁이의 키만 뺴서 100이 나오면된다.  

풀이) 

1. 모든 난쟁이들의 키를 구하기 위해, reduce로 모든 배열요소의 누적값을 구한다.
2. 이중 포문으로 배열의 요소 난쟁이 2명의 모든 경우의 키를 조회하며, 
3. 누적값에서 해당 두 난쟁이의 키를 뺀 값이 100된 경우 , 
4. 배열에서 해당 두 요소를 뺀다 => arr. splice(i, 1), arr.splice(j-1, 1)  
5. 두 요소가 빠진 배열을 출력한다.

- **splice(index,el) : 이 메소드는 이렇게 작성 시 해당 index번째에 있는 요소를 제거한다! -> 기억하기**

```js
function solution(arr){
  let sum = arr.reduce((acc,cur)=> acc + cur,0);;
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
     	if((sum - (arr[i] + arr[j])) === 100) {
      console.log(arr); //[20, 7, 23, 19, 10, 15, 25, 8, 13] // 15, 25 가 제거되는 상황
        arr.splice(i, 1); //인덱스(i)번째 요소 1개 제거
        console.log(arr); // [20, 7, 23, 19, 10, 25, 8, 13]
        arr.splice(j-1, 1);  // 15가 제거되어 15의 인덱스가 6 -> 5로 바뀜

// 인덱스 i번째 요소가 제거되어서 전체적인 베열이 1 인덱스씩 당겨지므로 -1 을 해야 삭제되길 원하는 요소가 삭제된다.
	    }
    } 

  }
return arr; 
}
let arr=[20, 7, 23, 19, 10, 15, 25, 8, 13];
console.log(solution(arr)); // [20, 7, 23, 19, 10, 8, 13]

```
