---
layout: single
title: "[알고리즘] 인프런강의 알고리즘 1-5문제 풀어보기 - 삼각형 성립조건, 최솟값(수에서, 배열요소중) "
categories: Algorithm-1
tag: [JavaScript, algorithm]
---

* 강의의 레퍼런스 코드는 선생님의 강의 자료 풀이설명 및 답안이 담겨있어서 공개 X

**문제 1: 100이하의 자연수 A, B, C를 입력받아 세 수 중 가장 작은 값을 출력해라. (정렬 메소드 쓰지말고 해보라 하심)**

- 풀이) sort 정렬 메소드 안쓴다면?

1) 가장 작은 값을 담는 변수 min 선언 (값을 비교하기 위해서 )
2) Math.min() 메소드로 a,b,c에 들어올 값 중 가장 작은 값 걸러주기 
3) 조건문) min 가장 작은 값과  a , b, c 중 같은 값을 찾는다.
4) 찾은 가장 작은 값을 answer 결과 변수에 해당 값을 담아주고 리턴한다.

- 레퍼런스 코드는 기초문제여서 그런지 if문으로 푸셨고  Math메소드를 사용안하시고 값들을 비교하여 작은 값을 추출해 나가시는 방식이였다.

```js
// 내 코드 정렬메소드 안쓰고
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

```



**문제 2 : 길이가 서로 다른 A, B, C 세 개의 막대 길이가 주어짐, 세 막대로 삼각형을 만들 수 있 으면 “OK"를 출력하고,
		 만들 수 없으면 ”NO"를 출력해라.**

- 접근 방식

  - 세 막대(세 변이) 삼각형이 될 수 없는 조건과 될 수 있는 조건을 생각해라

    세변의 길이가 주어질때, 가장 긴변의 길이는 나며지 두 변의 길이의 합보다 작아야한다고 한다.

    [삼각형성립조건](https://m.blog.naver.com/PostView.naver?isHttpsRedirect=true&blogId=sugang2004&logNo=130144597008)

    풀이) 

  1. 모든 변의 길이를 오름차순으로 정렬한다. 
  2. 정렬한 배열의 작을 요소 앞의 두 요소의 합이 마지막 요소 보다 크면?  "OK" 아닐시 "NO" 삼항연산자로 구성

- 레퍼런스 코드는  다른 방식으로 푸셨다.
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

 **문제 3 : n명의 학생에게 1명당 연필 1자루를 나누어 줄때 몇 다스가 필요한지 구해라. (1다스 =12자루/ 학생수 <= 1000명)**

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

**문제 4: 1부터 자연수 N까지의 합을 출력해라 **

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



**문제 5: 7개 배열 요소 중 최솟값 구하기 **

- 메소드를 사용하는 방법과 사용하지 않는 방법으로 구해보려고 한다.
- 메소드 사용 x 
- 메소드 사용 
  - Math.min() 최솟값을 구해주는 메소드로 구해주는데 이때 주의 점 수만 인자로 받을 수 있다. 스프래드 문법사용!
  - arr.sort() 오름차순으로 배열의 요소를 정렬하여, 가장작은 첫번째 요소를 출력한다.

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

