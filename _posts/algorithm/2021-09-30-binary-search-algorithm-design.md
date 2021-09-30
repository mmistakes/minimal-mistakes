---
title:  "[Algorithm] Binary Search(Divide and conquer) " 

categories:
  - algorithm
tags:
  - [divide,conquer,binary,search]

toc: true
toc_sticky: true
 

---

***
이 **포스트**는 한양대학교 김태형 교수님의 **알고리즘 설계와 분석** 과목의 **강의** 와 **강의자료**를 참고하였습니다.
이 포스트에서 사용하는 **divide-and-conquer** 에 대한 설명은 [포스트](https://chanhyukpark-tech.github.io/algorithm/Divide-and-conquer/) 를 참고해주세요.

***

## Binary Search Algorithm Design

- Problem
  - Is the key x in the array S of n keys?
  - Determine whether x is in the **sorted** array S of n keys.
- Inputs (parameters)
  - Positive integer **n** , **sorted**(non-decreasing order) array of keys S indexed from 1 to n, a key x
- Outputs
  - The location of x in S (0 if x is not in S)
- Design Strategy
  - `Divide` the array into two subarrays about half as large. If x is smaller than the middle item, choose the left subarray. If x is larger, choose the right one.
  - `Conquer`(solve) the subarray by determining whether x is in that subarray. Unless the subarray is suffciently small, use recursion to do this.
  - `Obtain` the solution to the array from the solution to the subarray.


![image](https://user-images.githubusercontent.com/69495129/135332624-bf356725-a061-47dd-9ab1-757caa227dbd.png)

## Recursive algorithm

```pseudocode
index location (index low, index high){
	index mid;
	
	if(low > high)
		return 0;
	else{
		mid = (low + high) / 2
		if(x == S[mid])
			return mid;
		else if (x < S[mid])
        	return location(low,mid-1);
        else
        	return location(mid+1,high);
	}	
}
```

## Points of Observation
- Reason for using a local variable **locationout**
  - Input parameters,n,S,x will **not be changed** during running the algorithm
  - Dragging those unchanging variables for every recursive call would incur a source of unnecessary inefficiency.
  - immutable 한 변수들을 끌고 다니는것은 낭비이다. 굳이 안해도 될일
- Tail-recursion removal
  - No operations are done after the recursive call.
  - It is **straightforward** to produce an iterative version.
  - Recursion **clearly illustrates** the divide-and-conquer process.
  - However, running recursions is over-burdensome due to excessive uses of **activation records**
  - A substantial amount of memory can be saved by elimination the stack for activation records.
  - Iterative version is better only as constant factor. Order is same
  - recursion 이란 compiler 에서 stack 을 사용해서 처리 되는 경우가 많다. 이는 depth 가 길어질 경우 퍼포먼스 상에서 문제가 일어날 수 있다. 그러므로 tail-recursion 형식으로 코드를 작성하면 Scala 같은 언어에서는 자동으로 Iterative version 으로 Compile 을 해준다.
    아마 Java 에서는 지원해주지 않는 것 같다. 
  - 이때 중요한 것은 아무리 Iterative version 으로 바꾼다고 해도 order 가 바뀌는 것이아닌 constant 정도만 퍼포먼스가 향상된다는 것이다.


## Worst-Case Time Complexity
- Basic operation : the comparision of x with S[mid]
- Input size : n, the number of items in the array.

증명과정은 그림을 보면 알 수 있다. n이 2의 지수승 일때, 그리고 n 이 홀수,짝수 인 경우를 증명했다.
<br>
![image](https://user-images.githubusercontent.com/69495129/135333726-65c4a906-ac7e-4be6-a7c2-ac870da5cdb4.png)
![image](https://user-images.githubusercontent.com/69495129/135333741-c0169d29-f6ec-4f21-a5c9-169ccec55a0a.png)
![image](https://user-images.githubusercontent.com/69495129/135333774-87470fa3-d585-43e5-b027-257d8df77d8c.png)
![image](https://user-images.githubusercontent.com/69495129/135333796-6df74242-7f32-4528-abf2-d9a3f415aa99.png)


*** 
<br>

    🌜 주관적인 견해가 담긴 정리입니다. 다양한 의견이 있으실 경우
    언제든지 댓글 혹은 메일로 지적해주시면 감사하겠습니다! 😄

[맨 위로 이동하기](#){: .btn .btn--primary }{: .align-right}
