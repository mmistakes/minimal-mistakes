---
layout: single
title:  "순열 / 조합 / 부분 집합"
categories: 
    - ALGORITHM
tags: 
    - [2022-02, ALGORITHM, STUDY]
sidebar:
    nav: "docs"
---

# <a style="color:#00adb5">순열 / 조합 / 부분 집합</a>

## <a style="color:#00adb5">순열 ( Permutation ) </a>이란 무엇인가 ?
<b><a style="color:red">서로 다른 것들 중 몇 개를 뽑아서 한 줄로 나열하는 것</a></b><br>
서로 다른 N개 중 R개를 택하는 것<br>
<b><a style="color:red">순열은 순서가 상관이 있다 !!!</a></b><br>


- 다수의 알고리즘 문제들은 순서화된 요소들의 집합에서 최선의 방법을 찾는 것과 관련이 있다.
- N개의 요소들에 대해서 n! 개의 순열들이 존재한다.
- 만약 n > 12 일 경우 시간 복잡도가 폭발적으로 증가한다.
- 크기 (R) 이 고정되어 있으면 반복문 사용 가능 !!
- 크기 (R) 이 고정되어 있지 않으면 재귀 사용 !!
- boolean을 활용하여 체크

### 식

<b><a style="color:red">nPr</a></b><br>
nPr = n * ( n-1 ) * ( n-2 ) * .. * ( n-r-1 )<br><br>
<b><a style="color:red">nPn = n!</a></b><br>
n! = n * ( n-1 ) * ( n-2 ) * .. 2 * 1<br><br>

### 순열 실습 해보즈아 !
```java
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Arrays;
import java.util.StringTokenizer;

// nPr 구현하기

public class PermutationPractice {
	static StringTokenizer st;
	static int N, R;
	static int[] input, numbers;
	static boolean[] isChecked;

	public static void main(String[] args) throws NumberFormatException, IOException {
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		StringBuilder sb = new StringBuilder();

		N = Integer.parseInt(br.readLine());
		R = Integer.parseInt(br.readLine());

		// N 배열 ( 입력 수 )
		input = new int[N];
		// R 배열 ( 선택한 것 )
		numbers = new int[R];
		// 선택 여부
		isChecked = new boolean[N];

		// 배열 입력
		st = new StringTokenizer(br.readLine(), " ");
		for (int i = 0; i < N; i++) {
			input[i] = Integer.parseInt(st.nextToken());
		}

		permutation(0);

	}

	// 조합 구현
	static void permutation(int cnt) { // cnt = 직전 까지 뽑은 수의 개수
		
		// 기저 조건 ( R개 뽑혔으면 종료 )
		if (cnt == R) {
			System.out.println(Arrays.toString(numbers));
			return;
		}
		
		// 입력 받은 모든 수를 현재 자리에 넣어보기
		for (int i = 0; i < N; i++) {
			
			// 기존 수와 중복하는지 ? 중복하면 통과
			if (isChecked[i]) {
				continue;
			} 
			else {
				// 배열 입력 & 선택되었다고 표시 ( true )
				numbers[cnt] = input[i];
				isChecked[i] = true;

				// 다음수 뽑으러 가기
				permutation(cnt + 1); // 뒤에 다 왔다 갔다.
				isChecked[i] = false; // 백트래킹에서 원상 복구
			}
		}
	}
}
```
<a style="color:#00adb5"><b>출력 결과</b></a><br>
```
3
2
1 2 3
[1, 2]
[1, 3]
[2, 1]
[2, 3]
[3, 1]
[3, 2]
```
<hr>
 주석으로 설명을 해놓았지만 재귀로 계속해서 R개 만큼 뽑고 나서 R개가 채워지면 이제 다시 돌아오면서 isChecked를 통해 선택 여부를 초기화 시켜준다.<br>
 그래서 다시 돌아와서 다른 값으로 넘어가게 되는 것이다.<br>
 재귀에 대한 이해가 잘 되어있어야 쉽게 이해될 것이다.
<hr>


## <a style="color:#00adb5">조합 ( Combination ) </a>이란 무엇인가 ?
<b><a style="color:red">서로 다른 N개의 원소 중 R개를 순서 없이 골라낸 것</a></b><br>
<b><a style="color:red">조합은 순서가 상관이 없다 !!!</a></b><br>

- 규칙이 있다 ! 자기보다 큰 값만 확인하면 된다 !!

### 식

<b><a style="color:red">nCr</a></b><br>
nCr = n! / (n-r)!r!<br>
nCr = n-1 C r-1 + n-1 C r -> 재귀적 표현<br>
nC0 = 1<br><br>

### 조합 실습 해보즈아 !
```java
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Arrays;
import java.util.StringTokenizer;

// 조합 -> 순서가 상관이 없다
public class CombinationPractice {
	static StringTokenizer st;
	static int N, R;
	static int[] input, numbers; // input : 입력수 배열, numbers : 선택수 배열

	public static void main(String[] args) throws NumberFormatException, IOException {
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		StringBuilder sb = new StringBuilder();

		N = Integer.parseInt(br.readLine());
		R = Integer.parseInt(br.readLine());
				
		input = new int[N];
		numbers = new int[R];

		st = new StringTokenizer(br.readLine(), " ");
		for (int i = 0; i < N; i++) {
			input[i] = Integer.parseInt(st.nextToken());
		}

		combination(0, 0);

	}

	// 순열과 다르게 매개변수 start 추가 
	// 그 이유는 앞에 것을 더 이상 비교할 필요가 없기 때문에, start가 다음 값을 가리킨다.
	static void combination(int cnt, int start) {
		
		// 기저 조건
		if(cnt == R) {
			System.out.println(Arrays.toString(numbers));
			return;
		}
		
		// 시작이 start
		for(int i=start; i<N; i++) {
			numbers[cnt] = input[i];
			combination(cnt+1, i+1); 	// 다음 자리는 현재 뽑은 i의 다음수
		}
	}
}
```

<a style="color:#00adb5"><b>출력 결과</b></a><br>
```
3
2
1 2 3
[1, 2]
[1, 3]
[2, 3]
```

<hr>
 순열과 비슷한 구조긴 한데 중요한게 boolean으로 각 원소를 체크해주는거 대신 매개변수가 하나더 생겨서 다음 값을 가리키는 역할을 한다. <br>
 조합의 가장 중요한 점은 순서가 상관없어서 나를 탐색하고 그 다음은 무조건 나보다 다음 값부터만 탐색하면 된다.
<hr>

## <a style="color:#00adb5">부분 집합 ( SubSet ) </a>이란 무엇인가 ?
<b><a style="color:red">집합에 포함된 원소들을 선택하는 것</a></b><br>

- 다수의 중요 알고리즘들이 원소들의 그룹에서 최적의 부분 집합을 찾는 것이다.
- 부분집합의 수 : 집합의 원소가 n개 일 때, 공집합을 포함한 부분집합의 수는 2^n개 이다.

### 식

<b><a style="color:red">2^n</a></b><br>
n이 원소 개수<br><br>

### 부분 집합 실습 해보즈아 !
```java
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class SubtestPrac {
	static StringTokenizer st;
	static int N, input[];
	static boolean[] isSelected;
	
	
	public static void main(String[] args) throws NumberFormatException, IOException {
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		StringBuilder sb = new StringBuilder();
		
		N = Integer.parseInt(br.readLine());
		
		// 입력 배열
		input = new int[N];
		isSelected = new boolean[N];
		
		// 배열에 입력
		st = new StringTokenizer(br.readLine(), " ");
		for(int i=0; i<N; i++) {
			input[i] = Integer.parseInt(st.nextToken());
		}
		
		generateSubset(0);
				
	}
    
	// 부분집합에 고려해야 하는 원소, 직전까지 고려한 원소수
	static void generateSubset(int cnt) {
		
		// 기저 조건 ( 마지막 원소까지 부분집합에 다 고려된 상황 )
		if(cnt == N) {
			for(int i=0; i<N; i++) {
				// 만약 들어 있으면 
				if(isSelected[i]) {
					System.out.print(input[i] + " ");
				}
				// 안들어있으면
				else {
					System.out.print("X" + " ");
				}
			}
			System.out.println();
			return;
		}
		
		//파워셋 처리
		//현재 원소를 선택
		isSelected[cnt] = true;
		generateSubset(cnt+1);
		
		
		//현재 원소를 비선택
		isSelected[cnt] = false;
		generateSubset(cnt+1);
	}
}
```

<a style="color:#00adb5"><b>출력 결과</b></a><br>
```
3
1 2 3
1 2 3 
1 2 X 
1 X 3 
1 X X 
X 2 3 
X 2 X 
X X 3 
X X X 
```

<hr>
부분 집합도 파워셋 처리하는 부분이 제일 중요하다.<br>
먼저 true로 기저조건이 될 때까지 다 가고나서 반대로 하나씩 false 해주며 계속 왔다갔다 하는 개념이다.<br>
여기서도 재귀개념을 확실히 알아야 이해가 될 것이다.<br>
<hr>
