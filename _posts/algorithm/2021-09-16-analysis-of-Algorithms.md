---
title:  "[Algorithm] analysis " 

categories:
  - algorithm
tags:
  - [analysis]

toc: true
toc_sticky: true
 

---

***

## Analysis of Algorithms

### Complexity Analysis

- Determination of how many times the **basic operation** is done for each value of the input size.
- Should be independent of CPU, OS, Programming languages...

In general, a **a time complexity analysis** of an algorithm is the determination of how many times the basic operation is done for each value of the input size.

### Every-case analysis
Regardless of the values of the numbers in the array, if there are same number of computational passes in a loop, then the **basic operation** is always done n times, T(n) = n
(e.g.) Addition algorithm for n integers in an array

```c++
number sum (int n, const number s[]){
    index i ;
    number result;
    
    result = 0;
    for(i=1; i<=n ; i++)
        result += S[i];
    return result;
}
```

(e.g.) Exchange sort
- Basic operation : the comparision of S[i] and S[j]
- input size : the number of items to be sorted
아무리 이미 정렬이 다 되어있더라도 정렬이 안되있을때와 마찬가지인 비교연산이 일어난다.
```c++
void exhangesort (int n, keytpye S[]){
    index i, j;
    for (i=1; i<=n-1; i++)
        for(j = i+1; j <= n ; j++)
            if(S[j] < S[i])
                exchange S[i] and S[j];
}
```
Time complexity analysis for **Exchangesort()**
- For each j-th loop, the if-statement will be executed once.
- The total number of if-statement
i = 1 : n-1 times
<br>
i = 2 : n-2 times
<br>
i = 3 : n-3 times
<br>
i = n-1 : n-(n-1) times
<br>

T(n) = (n-1) + (n-2) + ... + 1 = (n-1)n / 2



*** 
<br>

    🌜 주관적인 견해가 담긴 정리입니다. 다양한 의견이 있으실 경우
    언제든지 댓글 혹은 메일로 지적해주시면 감사하겠습니다! 😄

[맨 위로 이동하기](#){: .btn .btn--primary }{: .align-right}
