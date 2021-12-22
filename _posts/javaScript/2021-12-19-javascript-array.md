---
layout: single
title: "자바스크립트의 배열"
excerpt: 'js array'
categories: javaScript
tag: javaScript, dom, element, array
---
# 자바스크립트의 배열
- **가변길이 배열**이다.
- **다양한 메소드를 제공**한다.
- 프로퍼티
  + length: 배열의 길이를 반환한다.
- 주요 메소드
  + 메소드
  + push(값);		: 배열의 끝에 새 값을 추가한다
  + pop();			: 배열의 맨 마지막값을 삭제하고, 그 값을 반환한다
  + shift();		: 배열의 맨 처음값을 삭제하고 그 값을 반환한다
  + unshift(값);		: 배열의 맨 처음에 새 값을 추가한다
  + splice(index, many, 값, 값, 값, ...)
  + index : 값을 삭제하거나 추가할 위치를 정한다
	  + many	: 삭제할 개수를 지정한다, 0을 입력하면 삭제하지 않는다
	  + 값		: 추가할 값을 지정한다, 생략하면 삭제만 할 수 있다
  + join(연결문자);	: 배열의 값을 지정된 연결문자로 연결한 문자열로 반환한다

## 배열의 모든 값 출력하기
```javascript
  var array1 = [100, 200, 300, 400, 500];
  
  // 첫번째 방법
  for (var i = 0; i < array1.length; i++) {
    console.log(array1[i]);
  }
  
  // 두번째 방법
  for (var i in array1) {
    console.log(array1[i];
  }
  
  // 세번째 방법
  // forEach(함수) : 지정된 함수를 배열의 길이만큼 실행한다.
  array1.forEach(function(item) {
    console.log(item);
  });
  
  // 세가지 방법 모두 같은 값을 반환한다.
```

## forEach(function)의 사용 예제
```jsp
<div class="row">
  <div class="col">
    <input type="text" class="form-control w-50" name="score" value="90"/>
    <input type="text" class="form-control w-50" name="score" value="70"/>
    <input type="text" class="form-control w-50" name="score" value="60"/>
    <input type="text" class="form-control w-50" name="score" value="50"/>
    <input type="text" class="form-control w-50" name="score" value="100"/>
    <input type="text" class="form-control w-50" name="score" value="80"/>
    <input type="text" class="form-control w-50" name="score" value="70"/>
  </div>
</div>
  
<script>
  // 위에서 name이 score인 엘리먼트들을 모두 가져온다.
  // scores를 콘솔에 찍어보면 노드리스트의 형태로 반환된다.
  var scores = document.querySelectorAll('[name=score]');
  var totalScore = 0;
  
  // 첫번째 방법
  scores.forEach(function(score) {
	// score의 값을 숫자로 바꿔주어야 한다
	var score = parseInt(score.value);
	totalScore += score;
});
  
  // 두번째 방법, 코드가 훨씬 더 간결해진다
  scores.forEach((score) => totalScore += parseInt(score.value));
</script>
```

## filter(function)의 사용 예제
- array.filter(function)은 지정된 함수를 배열의 길이만큼 실행한다. 함수가 true를 반환하는 값만 포함된 배열을 반환한다.
```javascript
  var names = ['김수영', '한올', '민수', '옥상달빛', '서자영', '사월'];
  
  // names의 배열에서 길이가 2인 문자열만 shortNames에 담아서 반환한다
  var shortNames = names.filter(function(name) {
    return name.length == 2;
  });
  
  shortNames = names.filter(name => name.length == 2);
```
- forEach는 배열의 모든 값을 순환하고, filter는 배열의 값 중에서 true인 값만 포함된 배열을 반환한다.

## map(function)의 사용 예제
- 원본 배열을 사용해서 새로운 정보가 들어있는 배열을 만들 때 사용하는 것이 map 메소드이다.

```javascript
var data = [
	{name:"홍길동", kor:100, eng:70, math:70},
	{name:"김유신", kor:90, eng:90, math:60},
	{name:"강감찬", kor:70, eng:50, math:40},
	{name:"이순신", kor:80, eng:100, math:70},
	{name:"유관순", kor:100, eng:80, math:80}
];

var names = data.map(function (student) {
	return student.name;
});

names = data.map(student => student.name;
```

## reduce(function)의 사용 예제
- 배열의 요소를 처리해서 최종적으로 값 하나를 반환한다
- 배열.reduce(function(total, value) { return total + value; })
- total의 초기값은 0이다
- 지정된 함수의 반환값이 다음번 실행되는 함수의 total로 전달된다
- value에는 배열의 값이 순서대로 전달된다

```javascript
   var numbers = [1, 2, 3, 4, 5];
   var totals = numbers.reduce(function(subtotal, num) {
   	return subtotal + num;
   });
   
   // 아래와 같이도 쓸 수 있다
   numbers = [1, 2, 3, 4, 5].reduce((subtotal, num) => subtotal + num);
```
- 특히 reduce와 map은 빅데이터에서 중요하게 여기는 개념 중 하나이다.
- map은 원본 데이터에서 내가 필요한 데이터로 가공하는 것이고, <br> reduce는 가공된 데이터를 취합하는 용도로 자주 사용된다.
