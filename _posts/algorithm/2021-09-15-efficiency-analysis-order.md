---
title:  "[Algorithm] Efficiency, Analysis, and Order " 

categories:
  - algorithm
tags:
  - [efficiency,analysis,order]

toc: true
toc_sticky: true
 

---

***

## Algorithms


Our concern in this category(algorithm) is not the design of entire programs, but rather the design of the individual modules that accomplish the **specific tasks**
we must specify a general step-by-step procedure for producing the solution to each instance. This step-by-step procedure is called an algorithm. We say that the algorithm solves the problem.
### pseudocode

- we only use a for loop when we actually need to refer to the control variable within the loop.
- If the parameter is not an array, it is declared with an ampersand(&) at the end of the data type name. this means that the parameter contains a value returned by the algorithm.
- we use const to indicater that the array does not contain values returned by the algorithm.
- 


### Sequential Search
**Problem** : Is the key x in the array S of n keys?
**Inputs(parameters)** : positive integer n , array of keys S indexed from 1 to n, and a key x.
**Outputs** : location, the location of x in S (0 if x is not in S)

```pseudocode
void seqsearch(int n,
				const keytype S[],
				keytype x,
				index& location)
		{
			location = 1;
			while (location <= n && S[location] != x)
				location++;
			if(location > n)
				location = 0;
		}
```

The notation S[2..n] means an array S indexed from 2 to n is strictly pseudocode.

### Add Array Members
**Problem** : Add all the numbers in the array S of n numbers
**Inputs(parameters)** : positive integer n, array of numbers S indexed from 1 to n.
**Outputs** : sum, the sum of the numbers in S.
```pseudocode
number sum (int n, const number S[ ])
{
	index i;
	number result;
	
	result = 0;
	for(i = 1; i<=n; i++){
		result = result + S[i];
	}
	return result;
}
```
### Exchange Sort
**Problem** : Sort n keys in nondecreasing order.
**Inputs(parameters)** : positive integer n, array of keys S indexed from 1 to n.
**Outputs** : the array S containing the keys in nondecreasing order.

```pseudocode
void exchangesort (int n, keytype S[])
{
	index i,j;
	for(i=1;i<=n;i++)
		for (j=i+1; j<=n; j++)
			if(S[j] < S[i])
				exchange S[i] and S[j];
}
```

### Matrix Multiplication
**Problem** : Determine the product of two n x n matrices.
**Inputs(parameters)** : a positive integer n, two-dimensional arrays of numbers A and B, each of which has both its rows and columns indexed from 1 to n.
**Outputs** : a two-dimensional array of numbers C, which has both its rows and columns indexed from 1 to n, containing the product of A and B.

```pseudocode
void matrixmult (int  n, 
		const number A[] [][][],
		const number B[] [],
		number C[][])
{ 
	index i,j,k;
	for (i=1;i<=n;i++)
		for(j=1;j<=n;j++)
			C[i][j] = 0;
				for(k=1; k<=n; k++)
					C[i][j] = C[i][j] + A[i][k] * B[k][j]
}
```


처음의 행렬곱의 알고리즘을 봤을때 Output에는 분명히 2차원 배열 C를 반환한다고 명시되어있었는데 pseudocode 의 return 값은 void 라서 의문점을 가졌었다. 하지만, C자체도 Input 으로 받아서 
그 배열에 값을 설정해주면 외부에서 C[] [] 내부의 값들은 exchangesort method 를 통과하면 설정되기 때문에 의문점이 해결되었다.
Output을 꼭 pseudocode 에서 return 할 필요는 없음.
행렬곱을 구현하기위해서 3번 for 분을 nested 시켜야 한다는 사실을 알았다. k를 도입하는 코드는 신선했다.



***
<br>

    🌜 주관적인 견해가 담긴 정리입니다. 다양한 의견이 있으실 경우
    언제든지 댓글 혹은 메일로 지적해주시면 감사하겠습니다! 😄

[맨 위로 이동하기](#){: .btn .btn--primary }{: .align-right}
