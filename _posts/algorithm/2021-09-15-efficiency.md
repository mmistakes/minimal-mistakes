---
title:  "[Algorithm] Efficiency " 

categories:
  - algorithm
tags:
  - [efficiency]

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



### Sequential Search
**Problem** : Is the key x in the array S of n keys?
<br>
**Inputs(parameters)** : positive integer n , array of keys S indexed from 1 to n, and a key x.
<br>
**Outputs** : location, the location of x in S (0 if x is not in S)

```c++
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



The notation S[2..n] means an array S indexed from 2 to n is strictly pseudocode.

### Add Array Members
**Problem** : Add all the numbers in the array S of n numbers
<br>
**Inputs(parameters)** : positive integer n, array of numbers S indexed from 1 to n.
<br>
**Outputs** : sum, the sum of the numbers in S.
```c++
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
<br>
**Inputs(parameters)** : positive integer n, array of keys S indexed from 1 to n.
<br>
**Outputs** : the array S containing the keys in nondecreasing order.

```c++
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
<br>
**Inputs(parameters)** : a positive integer n, two-dimensional arrays of numbers A and B, each of which has both its rows and columns indexed from 1 to n.
<br>
**Outputs** : a two-dimensional array of numbers C, which has both its rows and columns indexed from 1 to n, containing the product of A and B.

```c++
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


## The Importance of Developing Efficient Algorithms

### Binary Search
**Problem** : Determine whether x is in the **sorted array** S of n keys. (정렬된 배열이라는 사실이 중요하게 작용한다)
<br>
**Inputs(parameters)** : positive integer n, sorted (nondecreasing order) array of keys S indexed from 1 to n, a key x.
<br>
**Outputs** : location, the location of x in S ( 0 if x is not in S). (worst case 는 x 가 배열 S안에 없을 경우)

```c++
void binsearch(int n,
              const keytype S[],
              keytype x,
              index& location)
{
    index low, high, mid;
    low = 1; high = n;
    location = 0; // 발견되지 않는다면 0 을 return 한다.
    
    while(low <= high && location == 0 )  // 발견 되지 않을때까지 반복한다
    {
        mid = floor((low + high) / 2);
        if(x == S[mid])
            location = mid;
        else if ( x<S[mid])	// 앞 배열에 존재한다.
            high = mid - 1;
        else 				// 뒷 배열에 존재한다.
            low = mid + 1;
    }
}
```
Let's compare the work done by Sequential Search and Binary Search. 
<br>
O(n) should be clear that this is the largest number of comparisons Sequential Search ever makes when searching an array of size n.
That is, if x is in the array, the number of comparisions is no greater than n.
Suppose we double the size of the array so that it contains 64 items. Binary Search does only one comparision more because the first comparision cuts the array in half, resulting in a subarray of size 32 that is searched. ( n = 32 일때 계산 한거 2개에 그 둘을 합치는 한번의 연산만 더해주면 된다)



|  Array Size   | Number of Comparisions by Sequential Search (n) | Number of Comparisions by Binary Search (logn + 1) |
| :-----------: | ----------------------------------------------- | -------------------------------------------------- |
|      128      | 128                                             | 8                                                  |
|     1,024     | 1,024                                           | 11                                                 |
|   1,048,576   | 1,048,576                                       | 21                                                 |
| 4,294,967,296 | 4,294,967,296                                   | 33                                                 |


<br>
In Chapter 2, We will return to Binary Search as an example of the divide-and-conquer approach, which is the focus of that chapter. At that time we will consider arrays whose
sizes can be any positive integer.



### The Finonacci Sequence

**Problem** : Determine the nth term in the Fibonacci sequence.
<br>
**Inputs(parameters)** : a nonnegative integer n.
<br>
**Outputs** : fib, the nth term of the Fibonacci sequence.

```c++
int fib (int n)
{
    if ( n <= 1)
        return n;
    else 
        return fib(n-1) + fib(n-2);
}
```

Although the algorithm was easy to create and is understandable, it is extremely inefficient.

![image](https://user-images.githubusercontent.com/69495129/133460391-716156bc-f950-4160-a156-818611489209.png)

let's develop an efficient algorithm for computing the nth Fibonacci term. Recall that the problem with the recursive algorithm is that the same value is computed **over** and **over**.

new version finonacci algorithm (more efficiency)
**Problem** : Determine the nth term in the Fibonacci sequence.
<br>
**Inputs(parameters)** : a nonnegative integer n.
<br>
**Outputs** : fib2, the nth term of the Fibonacci sequence.

```c++
int fib2 (int n)
{
    index i;
    int f[0..n];
    
    f[0] = 0;
    if(n > 0)
        f[1] = 1;
    		for( i=2; i<=n; i++)
                f[i] = f[i-1] + f[i-2];
    return f[n];
}
```

fib2 algorithm can be written without using the array f because only the two most recent terms are needed in each iteration of the loop.

![image](https://user-images.githubusercontent.com/69495129/133461366-6adeb0de-9088-4da9-9be1-969aac958526.png)

This comparision shows why the efficiency of an algorithm remains an important consideration regarless of how fast computers become.

***
<br>

    🌜 주관적인 견해가 담긴 정리입니다. 다양한 의견이 있으실 경우
    언제든지 댓글 혹은 메일로 지적해주시면 감사하겠습니다! 😄

[맨 위로 이동하기](#){: .btn .btn--primary }{: .align-right}
