---
layout: single
title: "메서드 Math"
---

[메서드 Math](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math "### 메서드 Math")
##### Math.abs(n)
인수의 절댓값을 반환한다.

    Math.abs('-1');  // 1
    Math.abs('');  // 0
    Math.abs('fish');  // NaN
	
##### Math.random() 
0과 1 사이의 난수를 반환한다.

	alert( Math.random() ); // 0.1234567894322
	
##### Math.sqrt()
인수의 제곱근을 반환한다.

	Math.sqrt(9);  // 3
	Math.sqrt(2);  // 1.414213562373095
	
##### Math.min() / Math.max()
인수들중 가장 작은 수, 가장 큰 수를 반환한다.

	Math.min(1, 2, -1, -2, 100, 0);  //-2
	Math.max(1, 2, -1, -2, 100, 0); //100
	
##### Math.pow(a, b)
인수 a를 b로 거듭제곱하여 반환한다.

	Math.pow(2, 8);  // 256
	Math.pow(2, -1); // 0.5
