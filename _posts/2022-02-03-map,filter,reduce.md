---
layout: single
title: "map, filter, reduce 익혀보기"
categories: [JavaScript]
tag: [JS, map, filter, reduce]
toc: true
author_profile: false
sidebar:
    nav: "docs"
---

# ES6 문법 map, filter, reduce 

우리는 보통 반복문을 사용해야 할 경우 전통적인 반복문 for를 사용한다.

예제를 활용하여 전통적인 반복문 3가지 정도를 보여주겠다.

```js
const animals = [
	{name: 'lion', size: 'big', isAggressive: true, weight: 200},
	{name: 'monkey', size: 'medium', isAggressive: true, weight: 30},
	{name: 'cat', size: 'small', isAggressive: true, weight: 10},
	{name: 'rabbit', size: 'small', isAggressive: true, weight: 2},
]
```

 ```js
 // 전통적인 반복문
 // 1번 
 for (let i = 0; i < animals.length; i++) {
     console.log(animals[i].name);      //lion monkey cat rabbit
 }   
 
 // 2번
 for (let animal of animals) {
 	console.log(animal)   //{name: 'lion', size: 'big', isAggressive: true, weight: 200}
 }                         //{name: 'monkey', size: 'medium', isAggressive: true, weight: 30}
                           //{name: 'cat', size: 'small', isAggressive: true, weight: 10}
                           //{name: 'rabbit', size: 'small', isAggressive: true, weight: 2}
 // 3번
 let i = 0;
 while(i < 10) {
 	console.log(i);
 	i++;
 }
 
 ```



이러한 전통적인 반복문 말고 ES6에 새로 추가된 반복문 forEach, map, filter, reduce 가 있다.



## forEach

```js
animals.forEach(function(animal, index) {
	console.log(animal)   //{name: 'lion', size: 'big', isAggressive: true, weight: 200}
                          //{name: 'monkey', size: 'medium', isAggressive: true, weight: 30}
                          //{name: 'cat', size: 'small', isAggressive: true, weight: 10}
                          //{name: 'rabbit', size: 'small', isAggressive: true, weight: 2}
	console.log(index)    // 0 1 2 3 
});

```



## map

- map(맵)은 어떤 배열을 다른 형태의 배열로 재생성할 때 사용하는 반복문이다.

  ```js
  const animalsNames = animals.map(function(animal){
  	return animal.name;
  });
  console.log(animalsNames); // ["lion", "monkey", "cat", "rabbit"]
  ```



## filter

- filter는 배열 안에서 특정 조건을 가진 아이템들을 뽑아서 배열로 나타내주는 반복문이다.

  ```js
  const smallAnimal = animals.filter(function(item) {
  	return item.size === 'small';
  })
  console.log(smallAnimal); // {name: 'cat', size: 'small', isAggressive: true, weight: 10}
                            // {name: 'rabbit', size: 'small', isAggressive: true, weight: 2}
  ```



## reduce

- reduce는 배열 안에 값들의 합을 구할 때 사용한다.

  ```js
  const numbers = [1, 10, 11, 23, 444];
  const total = numbers.reduce(function(acc, cur) {
  	return acc+cur;
  })
  console.log(total); // 489
  
  const totalWeight = animals.reduce(function(acc, cur) {
  	return acc + cur.weight;
  }, 0) //0으로 초기화
  console.log(totalWeight); // 242
  
  
  ```

  
