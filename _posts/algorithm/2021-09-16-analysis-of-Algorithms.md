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

### Worst-case analysis
#### Sequential search
- Basic operation : (S[location] != x)
- Input size : the number of items in an array , n
- Worst case happens if **x** is in the last element of S[n]
- Therefore, W(n) = n.
- Every-case analysis is **not** possible for sequential search ( 상황에 따라 복잡도가 다를 수 있기 때문에)

Although the worst-case analysis informs us of the absolute maximum amount of time consumed, in some cases we may be more interested in knowing how the algorithm performs on the average.

### Average-case analysis
![image](https://user-images.githubusercontent.com/69495129/133468241-b9840227-eda8-4730-860a-b672f862b83d.png)
![image](https://user-images.githubusercontent.com/69495129/133468262-97213dd1-21ce-4e47-9be5-f246762f6391.png)
Case1인 경우는 x가 항상 배열안에 있다고 가정한 것이다. Case2는 x가 배열안에 있을 확률 p 를 도입한다.
즉 Case2 같은 경우는 x가 배열안에 있을 확률 p 에따라서 시간복잡도가 달라진다.

***
Before proceeding, we offer a word of caution about the average. Although an average is often referred to as a typical occurrence, one must be careful in interpreting the average in this manner. Recall in the previous analysis that A(n) is (n + 1)/2 when it is known that x is in the array. This is not the typical search time, because all search times between 1 and n are equally typical. Such considerations are important in algorithms that deal with response time. For example, consider a system that monitors a nuclear power plant. If even a single instance has a bad response time, the results could be catastrophic. It is therefore important to know whether the average response time is 3 seconds because all response times are around 3 seconds or because most are 1 second and some are 60 seconds.
A final type of time complexity analysis is the determination of the smallest number of times the basic operation is done. For a given algorithm, B(n) is defined as the minimum number of times the algorithm will ever do its basic operation for an input size of n. So B(n) is called the best-case time complexity of the algorithm, and the determination of B(n) is called a best-case time complexity analysis.

***
### Best-case analysis
#### Sequential search
- Basic operation : (S[location] != x)
- Input size : the number of items in an array , n
- Best case happens if x is the first element of S[n], i.e. S[1] or S[0]
- Therefore, B(n) = 1.




*** 
<br>

    🌜 주관적인 견해가 담긴 정리입니다. 다양한 의견이 있으실 경우
    언제든지 댓글 혹은 메일로 지적해주시면 감사하겠습니다! 😄

[맨 위로 이동하기](#){: .btn .btn--primary }{: .align-right}
