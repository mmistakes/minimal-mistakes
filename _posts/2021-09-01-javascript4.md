---
layout: single
tags: 
 - javascript

toc: true
toc_sticky: true

title: "[javascript] 삼항연산자, forEach, reduce"
---

{% raw %}


### **! 삼항연산자**

```javascript
if ( condition ) {
  value if true;
} else {
  value if false;
}
```

```javascript
condition ? value if true : value if false
```

1. **condition**(조건) 이 당신이 실험하고 있는 것이다. 당신의 **condition**(조건)의 결과는 **진실** 또는 **거짓**입니다. 아니면 적어도 boolean 값은 일치해야한다.
2. A **?** 는 우리의 **conditional(조건부**)과 **true value** 값을 구분합니다. **?** 와 **:** 사이에 있는 모든 **condition(조건)**은 true(참)이면 실행된다.
3. 마지막으로 **:** 은 조건의 상태가 거짓으로 평가되면 **:** 이후에 나오는 코드는 실행된다.

```javascript
let person = {
  name: 'tony',
  age: 20,
  driver: null
};


if (person.age >= 16) {
  person.driver = 'Yes';
} else {
  person.driver = 'No';
}


person.driver = person.age >=16 ? 'Yes' : 'No';
```

### **! forEach문**

배열의 메서드

forEach는 for문과 마찬가지로 반복적인 기능을 수행할 때 사용합니다.

하지만 for문처럼 index와 조건식, 증감식을 정의하지 않아도 callback 함수를 통해 기능을 수행할 수 있습니다.

```javascript
const arr = [0,1,2,3,4,5,6,7,8,9,10];

arr.forEach(function(element){
    console.log(element); // 0 1 2 3 4 5 6 7 8 9 10
});
// 혹은 arrow 함수 가능
arr.forEach(element => console.log(element));
```

forEach는 return이 없습니다. 즉, callback 함수에 의해서 어떤 결과물을 내놓고 싶으면 함수 밖의 변수를 사용해야합니다.

```javascript
const arr = [0,1,2,3,4,5,6,7,8,9,10];
const oddArray = [];

arr.forEach(function(element){
    if(element%2==1) {
        oddArray.push(element);
    }
});

console.log(oddArray); // [ 1, 3, 5, 7, 9 ]
```

이런 경우에는 map 함수를 사용하는 것이 좋습니다.

```javascript
const arr = [0,1,2,3,4,5,6,7,8,9,10];

arr.forEach(function(element, index, array){
    console.log(`${array}의 ${index}번째 요소 : ${element}`);
});
/*
0,1,2,3,4,5,6,7,8,9,10의 0번째 요소 : 0
0,1,2,3,4,5,6,7,8,9,10의 1번째 요소 : 1
0,1,2,3,4,5,6,7,8,9,10의 2번째 요소 : 2
0,1,2,3,4,5,6,7,8,9,10의 3번째 요소 : 3
0,1,2,3,4,5,6,7,8,9,10의 4번째 요소 : 4
0,1,2,3,4,5,6,7,8,9,10의 5번째 요소 : 5
0,1,2,3,4,5,6,7,8,9,10의 6번째 요소 : 6
0,1,2,3,4,5,6,7,8,9,10의 7번째 요소 : 7
0,1,2,3,4,5,6,7,8,9,10의 8번째 요소 : 8
0,1,2,3,4,5,6,7,8,9,10의 9번째 요소 : 9
0,1,2,3,4,5,6,7,8,9,10의 10번째 요소 : 10
```

forEach의 callback 함수에는 배열의 요소 뿐만아니라 index, 전체 배열을 인자로 사용할 수 있습니다.

### **! reduce() 함수**

배열의 메서드

reduce() 메서드는 배열의 각 요소에 대해 주어진 **리듀서**(reducer) 함수를 실행하고, 하나의 결과값을 반환합니다.

map이 배열의 각 요소를 변형한다면 *reduce*는 배열 자체를 변형합니다. reduce라는 이름은 이 메서드가 보통 배열을 값 하나로 줄이는 쓰이기 때문에 붙었습니다. 예를 들어 배열에 들어있는 숫자를 더하거나 평균을 구하는 것은 배열을 값 하나로 줄이는 동작입니다. 하지만 reduce가 반환하는 값 하나는 객체일 수도 있고, 다른 배열일 수도 있습니다.

**리듀서** 함수는 네 개의 인자를 가집니다.

1. 누산기accumulator (acc)
2. 현재 값 (cur)
3. 현재 인덱스 (idx)
4. 원본 배열 (src)

리듀서 함수의 반환 값은 누산기에 할당되고, 누산기는 순회 중 유지되므로 결국 최종 결과는 하나의 값이 됩니다.

배열.reduce((누적값, 현잿값, 인덱스, 요소) => { return 결과 }, 초깃값);

초깃값을 적어주지 않으면 자동으로 초깃값이 0번째 인덱스의 값이 됩니다.

```javascript
const oneTwoThree = [1, 2, 3];
result = oneTwoThree.reduce((acc, cur, i) => {
  console.log(acc, cur, i);
  return acc + cur;
}, 0);
// 0 1 0
// 1 2 1
// 3 3 2
result; // 6
```


{% endraw %}
