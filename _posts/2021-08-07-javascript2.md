# 배열이 필요한 이유와 선언하는 방법

**배열(Array)을 통해 여러개의 데이터를 한 곳에 저장할 수 있습니다.** 따라서 변수를 여러개 만들 필요 없이 1개의 배열에 여러 값을 넣을 수 있습니다. 배열은 대괄호로 감싸여져 있으며, 데이터의 요소와 요소는 쉼표로 구분합니다.

```js
let sandwich = ["peanut butter", "jelly", "bread"];
```

 배열 안에는 또 다른 배열이 요소로 포함될 수 있습니다.

```js
[["Bulls", 23], ["White Sox", 45]]
```

이와 같은 형태의 배열을 다차원배열(*multi-dimensional array)*이라고 부른다.



# 배열의 값을 추가, 수정, 삭제하는 방법

인덱스(index)를 사용해 배열 안의 데이터에 접근할 수 있습니다.

```js
let array = [50,60,70];
array[0]; // equals 50
array[1]; // equals 60
```

다차원배열의 데이터는 아래와 같이 접근할 수 있습니다.

```js
let arr = [
  [1,2,3],
  [4,5,6],
  [7,8,9],
  [[10,11,12], 13, 14]
];
 
arr[3]; // equals [[10,11,12], 13, 14]
arr[3][0]; // equals [10,11,12]
arr[3][0][1]; // equals 11
```

배열의 요소는 쉽게 접근하여 수정할 수 있습니다.

```js
let ourArray = [50,40,30];
ourArray[0] = 15; // --> ourArray equals [15,40,30]
```

 **`.push()` 메서드를 사용하여 배열의 끝에 하나 이상의 요소를 추가할 수 있습니다.**

```js
let arr = [1,2,3];
arr.push(4); 
// arr is now [1,2,3,4]
```

**`.unshift()` 메서드를 사용하여 배열의 맨 앞에 요소를 추가할 수 있습니다.**

```js
let arr = [1,2,3];
arr.unshift(0); 
// arr is now [0,1,2,3]
```

**`.pop()` 메소드는 배열의 마지막 요소를 제거하며 제거된 요소를 반환합니다.**

```js
let threeArr = [1, 4, 6];
let oneDown = threeArr.pop();
 
console.log(oneDown); // Returns 6
console.log(threeArr); // Returns [1, 4]
```

**`.shift()` 메소드는 배열의 첫번째 요소를 제거하며 제거된 요소를 반환합니다.**

```js
let arr = [1, 2, 3];
let arr2 = arr.shift()

console.log(arr); // Returns [2,3]
console.log(arr2); // Returns 1
```



# 반복문이 필요한 이유와 사용하는 방법

반복문은 자료의 개수가 많고 같은 작업을 반복할 때 필요합니다.

for 반복문은 어떤 특정한 조건이 거짓으로 판별될 때까지 반복합니다.

```js
for(초기화문; 조건문; 증감식){
// 반복할 코드 작성
}

let result = 0;
for(let i=0; i <= 10 ; i++) {
  result += i
}
console.log(result) // 45

let ourArray = [];
for (var i = 0; i < 5; i++) {
  ourArray.push(i);
}
 
//ourArray will now contain [0,1,2,3,4].
```

> 초기화문

- 초기화문 작성 시 변수 선언자를 써주어야 합니다.
- 변수명은 보통 index를 의미하는 i로 선언합니다.
- index가 증가할 경우 숫자는 보통 0부터 시작합니다.

> 조건문

- index의 범위를 설정합니다.
- index가 증가할 경우 특정한 숫자 미만 혹은 이하로 설정합니다.
- index가 감소할 경우 0 이상으로 설정합니다.
- 조건문이 true일 경우 반복문을 계속 실행합니다.
- 조건문이 false일 경우 반복문이 종료됩니다.

> 증감식

- index가 1씩 증가할 경우 ++을 써줍니다.(index의 숫자가 하나씩 증가)
- index가 1씩 감소할 경우 --를 써줍니다.(index의 숫자가 하나씩 감소)
- i++은 i = i+1 을 줄여서 쓴 것입니다. i += 1 로 표현할 수도 있습니다.
- i++는 ++1로 표현할 수 있습니다.



# 배열과 반복문을 함께 자주 사용하는 이유

여러개의 값이 저장되어있는 배열과 반복문을 함께 사용하면 배열의 각 요소들을 순회하며 원하는 값을 도출할 수 있습니다.

배열에 있는 각각의 요소들마다 따로 코드를 입력하지 않아도 되기 때문에 코드의 가독성이 좋아지고 수정도 간편해집니다.

```js
let arr = [10, 9, 8, 7, 6];
for (let i = 0; i < arr.length; i++) {
   console.log(arr[i]);
}
/* 
10
9
8
7
6
*/

// 배열과 반복문을 함께 사용하여 배열에 들어있는 값들의 제곱값을 구할 때
let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let arr2 = [];
for (let i = 0; i < arr.length; i++) {
  arr2.push(arr[i]*arr[i])
}
console.log(arr2); // [1,  4,  9, 16,  25, 36, 49, 64, 81, 100]

/// 반복문을 사용하지 않았을 때
console.log(arr[0] * arr[0]) // 1
console.log(arr[1] * arr[1]) // 4
console.log(arr[2] * arr[2]) // 9
console.log(arr[3] * arr[3]) // 16
console.log(arr[4] * arr[4]) // 25
console.log(arr[5] * arr[5]) // 36
console.log(arr[6] * arr[6]) // 49
console.log(arr[7] * arr[7]) // 64
console.log(arr[8] * arr[8]) // 81
console.log(arr[9] * arr[9]) // 100
```



# 배열의 메서드 5가지와 사용 방법

## .slice

slice 메서드는 배열 내의 **특정한 요소의 index 범위에 따라 새로운 배열을 리턴**합니다.

splice 메서드와는 다르게 slice 메서드는 원본 배열을 변형시키지 않습니다.

그렇기 때문에 이 메서드를 사용할 때는 slice 메서드를 적용한 새로운 변수를 선언해주어야 합니다.

#### slice ( start , end )

필요에 따라 인자는 최소 1개만 쓸 수도 있습니다.

- 첫번째 인자 : 배열의 index의 시작점
- 두번째 인자 : 배열의 index의 끝점

```js
let nums = [1,2,3,4,5]
let nums_new = nums.slice(1,4)

console.log(nums) // [ 1, 2, 3, 4, 5 ]
console.log(nums_new) // [ 2, 3, 4 ]
```

slice 메서드를 사용한 이후에 원본 배열인 nums를 콘솔창에서 확인해보면 변함없는 것을 확인할 수 있습니다.

그렇기 때문에 **slice를 사용할 때는 꼭 새로운 변수명을 할당해주어야 합니다.**

```js
let nums = [1,2,3,4,5]
let nums_new = nums.slice(-2)

console.log(nums) // [ 1, 2, 3, 4, 5 ]
console.log(nums_new) // [ 4, 5 ]

let nums = [1,2,3,4,5]
let nums_new = nums.slice(1)
console.log(nums_new) // [ 2,3,4,5]
```

## .splice

splice 메서드는 배열 내의 특정한 요소를 삭제하거나, 다른 요소로 대치하거나 새로운 요소를 추가할 때 사용합니다.

splice 메서드를 쓸 때는 인자의 순서에 주의해야 합니다.

#### splice ( start, delete, item )

```js
.splice('인덱스 위치','삭제 할 요소의 개수','추가 할 요소','추가 할 요소2','추가할 요소3',... '추가할 요소 n')
```

필요에 따라 인자는 최소 1개만 쓸 수도 있습니다.

- 첫번째 인자 : 배열의 index의 시작점
- 두번째 인자 : 삭제할 요소의 개수
- 세번째 인자 이후 : 추가하고 싶은 요소

```js
let num = [1,2,3,4,5];
num.splice(2,1,10); 
console.log(num); // [ 1, 2, 10, 4, 5 ]

let num = [3,4,5];
num.splice(0,0,1,2);
console.log(num); // [1,2,3,4,5] 삭제할 개수를 0으로 지정하면 추가만 할 수 있습니다.
```

## .filter

filter() 메서드는 array 관련 메서드로 조건에 맞는 요소들만 모아서 새로운 배열을 반환합니다.

만약 조건에 부합되는 요소가 아무것도 없다면 빈 배열을 반환합니다.

filter() 메서드도 map() 메서드와 마찬가지로 크게 filter(callbackFunction, thisAgr) 2개의 인자를 가집니다.

그리고 callbackFunction 안에서 3개의 인자 (element, index, array) 를 가지는데 첫번째 부분인 element 인자만 필수로 지정되어야하고 나머지는 선택적입니다.

```js
let numbers = [10, 4, 32, 17, 5, 2];
 
// 첫번째 방법 (filter()의 인자에서 바로 함수를 써주는 방법) 
let result = numbers.filter((value)=> value > 10);
 
console.log(result);      // [ 32, 17 ]
 
// 두번째 방법 (밖에서 함수를 선언하고 filter()인자에서 callback하는 방법) 
function isBiggerThanTen (value) {
    return value > 10;
}
 
let result = numbers.filter(isBiggerThanTen);
 
console.log(result);      // [ 32, 17 ]
```

## .concat

concat() 메서드는 주어진 배열에 기존 배열을 합쳐서 새로운 배열을 반환합니다.

원본 배열은 변하지 않으며 새로운 배열이나 원본 배열을 수정해도 서로 영향을 받지 않습니다.

```js
let alphabet = ['a', 'b', 'c'];
let hangeul = ['ㄱ', 'ㄴ', 'ㄷ'];
 
alphabet.concat(hangeul);      // [ 'a', 'b', 'c', 'ㄱ', 'ㄴ', 'ㄷ' ]
```

```js
const alpha = ['a', 'b', 'c'];
 
// 배열 2개 이어붙이기 
const arr = [1, [2, 3]];     
alpha.concat(arr);             // [ 'a', 'b', 'c', 1, [ 2, 3 ] ]

// 배열 3개 이어붙이기 
alpha.concat(1, [2, 3]);       // [ 'a', 'b', 'c', 1, 2, 3 ]
```

## .map

배열 내 모든 요소 각각에 대하여 주어진 함수를 호출한 결과를 모아 새로운 배열을 반환합니다.

```javascript
let arr = [1, 2, 3, 4, 5];
let arr2 = arr.map(value => value + value);
console.log(arr2);//[ 2, 4, 6, 8, 10 ]
```

## .forEach

배열의 각 요소들을 순회하며 처리합니다.

```javascript
let arr = [1, 2, 3, 4, 5];
arr.forEach(function (item, index, array) {
	console.log(item, index);
});
/*
1 0
2 1
3 2
4 3
5 4
*/
```

## .includes

배열이 특정 요소를 포함하고 있는지 판별합니다. 

```javascript
let arr = [1, 2, 3, 4, 5, 6];
console.log(arr.includes(4)); //true
console.log(arr.includes(7)); //false
```

## .join

배열의 모든 요소를 연결해 하나의 문자열로 만듭니다.

```javascript
let arr = [1, 2, 3];
console.log(arr.join()); //"1,2,3"
console.log(arr.join('')); //"123"
console.log(arr.join('-')); //"1-2-3"
```

## .indexOf

배열 안 요소의 인덱스를 찾아줍니다.

```javascript
let arr = [1, 2, 3, 4, 5];
let a = arr.indexOf(2)
console.log(a); // 1
```

## .reverse

배열의 순서를 반전합니다.

```javascript
let arr = [1, 2, 3, 4, 5];
arr.reverse();
console.log(arr); //[5, 4, 3, 2, 1]
```

