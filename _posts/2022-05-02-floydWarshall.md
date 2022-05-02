---
layout: post
title: 플로이드 와샬 알고리즘 (백준 11403)
---

# Floyd Warshall Algorithm
1. 모든 정점 --> 모든 정점으로 가는 모든 경우의 수를 2차원 배열에 저장  
2. 기존의 경로 값 vs 특정 노드를 거치는 경우 경로 값 비교 뒤 더 작은거 저장  

<br>

참고 자료  
https://www.youtube.com/watch?time_continue=879&v=9574GHxCbKc&feature=emb_logo  

<br>

# 백준 11403
- 문제  
가중치 없는 방향 그래프 G가 주어졌을 때, 모든 정점 (i, j)에 대해서,  
i에서 j로 가는 경로가 있는지 없는지 구하는 프로그램을 작성하시오.  

<br>

그냥 for문을 통해 플로이드 와샬 알고리즘을 작성하라는 뜻이다  

<br>

- 의사코드
1. G와 주어지는 G X G 행렬을 스캔 뒤 각각 n, temp에 저장  
2. answer 그래프 생성 및 int 최대값으로 초기화(최소를 구하니까!)   
3. `for(i=0; i<G; i++)`  루프 거쳐가는 노드 i  
3-1. `for(j=0; j<G; j++)` 루프 출발하는 노드 j  
3-2. `for(k=0; k<Gl k++)` 루프는 도착하는 노드 k  
3-3. 세번째 for 루프 안에서 `if(x[i][k] + x[k][i] < x[j][k])`면 answer[j][k]값 갱신  
4. answer 출력  

<br>

모든 정점에서 정점으로 가는 모든 경우의 수를 비교하는 것이므로  
if 조건으로 x[j][k] == 0이면 하지 마라 이런거 할 필요 X  

<br>

- 코드
맨날 scanner 썼는데 scanner보다 buffer가 더 빠르다고 해서 써봄  
왜냐하면 입력된 데이터가 바로 전달되지 않고 버퍼를 거쳐 전달되기 때문  

<br>
- 첫번째 시도
```
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.util.StringTokenizer;
import java.io.IOException;

public class Main {

	public static void main(String[] args) throws NumberFormatException, IOException {
		
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
		StringTokenizer st;
		
		int n = Integer.parseInt(br.readLine()); // 첫번째로 받은 인자 String 타입을 int로 변환해 저장
		int[][] temp = new int[n][n];
		
		// 두번째로 받은 파라미터 문자열을 쪼개서 배열로 저장
		for(int i=0; i<n; i++) {
			
			// scanner든 buffer든 항상 한 줄 단위로 입력됨!!
			// 그래서 첫 로우를 첫번째 루프에서 읽는다
			st = new StringTokenizer(br.readLine());
			
			for(int j=0; j<n; j++) {
				// 받은 첫 로우를 .nextToken을 통해 잘라서 각각 answer에 저장
				temp[i][j] = Integer.parseInt(st.nextToken());
			}
		}
		
		// 모든 정점들을 비교한 뒤 최소값을 넣는 answer 배열 생성
		/*
		 * int[][] answer = new int[n][n];
		 * 
		 * for(int i=0; i<n; i++) { for(int j=0; j<n; j++) { answer[i][j] = 99999999; }
		 * }
		 */
		
		// temp에서 모든 정점들에서 정점으로 가는 경우의 수(경로 값 비교)
		for(int i=0; i<n; i++) { // 거치는 노드
			for(int j=0; j<n; j++) { // 출발 노드
				for(int k=0; k<n; k++) { // 도착 노드
					if(temp[j][i] + temp[i][k] < temp[j][k]) {
						temp[j][k] = temp[j][i] + temp[i][k];
					}
				}
			}
		}
		
		// 답 출력
		StringBuilder sb = new StringBuilder();
		for(int i=0; i<n; i++) {
			for(int j=0; j<n; j++) {
				sb.append(temp[i][j] + " ");
			}
			sb.append("\n");
		}
		
		bw.write(sb.toString());
		bw.flush();
		bw.close();
		br.close();
	}	
}
```
틀림  
맞는거같은데 왜인가 참고하는 코드를 보고 예제도 봤다  
정석대로의 플루이드 알고리즘 아닌가?  
예제를 보니까 아니었다  
문제 좀 똑바로 읽자...  

<br>

![image](https://user-images.githubusercontent.com/86642180/166187741-87a10884-57c5-4704-b2a9-a88bc0ba6dc7.png)  
만약에 가는 경로가 있다면 1, 없다면 0임을 누가봐도 알 수 있다^^..  
즉 내 코드로 치환하자면  
출발하는 j노드에서 도착지점인 k노드에 갈 때,  
j👉i👉k 혹은 k👉i👉j가 가능하다면 temp에 1을 집어넣는다  

<br>

- 2차시도
```
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.util.StringTokenizer;
import java.io.IOException;

public class Main {

	public static void main(String[] args) throws NumberFormatException, IOException {
		
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
		StringTokenizer st;
		
		int n = Integer.parseInt(br.readLine()); // 첫번째로 받은 인자 String 타입을 int로 변환해 저장
		int[][] temp = new int[n][n];
		
		// 두번째로 받은 파라미터 문자열을 쪼개서 배열로 저장
		for(int i=0; i<n; i++) {
			
			// scanner든 buffer든 항상 한 줄 단위로 입력됨!!
			// 그래서 첫 로우를 첫번째 루프에서 읽는다
			st = new StringTokenizer(br.readLine());
			
			for(int j=0; j<n; j++) {
				// 받은 첫 로우를 .nextToken을 통해 잘라서 각각 answer에 저장
				temp[i][j] = Integer.parseInt(st.nextToken());
			}
		}

		
		// temp에서 모든 정점들에서 정점으로 가는 경우의 수(경로 값 비교)
		for(int i=0; i<n; i++) { // 거치는 노드
			for(int j=0; j<n; j++) { // 출발 노드
				for(int k=0; k<n; k++) { // 도착 노드
					if(temp[j][i] == 1 || temp[i][k] == 1) {
						temp[j][k] = 1;
					}
				}
			}
		}
		
		// 답 출력
		StringBuilder sb = new StringBuilder();
		for(int i=0; i<n; i++) {
			for(int j=0; j<n; j++) {
				sb.append(temp[i][j] + " ");
			}
			sb.append("\n");
		}
		
		bw.write(sb.toString());
		bw.flush();
		bw.close();
		br.close();
	}	
}
```
또 틀렸다  

<br>

- 3차시도
뭐 코드가 틀렸나해서 예시 1번 배열도 만들고 그대로 적용해봄  
```
int[][] test = new int[3][3];

		test[0][0] = 0;
		test[0][1] = 1;
		test[0][2] = 0;
		test[1][0] = 0;
		test[1][1] = 0;
		test[1][2] = 1;
		test[2][0] = 1;
		test[2][1] = 0;
		test[2][2] = 0;

		for (int i = 0; i < 3; i++) { // 거치는 노드
			for (int j = 0; j < 3; j++) { // 출발 노드
				for (int k = 0; k < 3; k++) { // 도착 노드
					if (test[j][i] == 1 || test[i][k] == 1) {
						test[j][k] = 1;
					}
				}
			}
		}

		for(int i=0; i<3; i++) {
			for(int j=0; j<3; j++) {
				System.out.print(test[i][j]);
			}
			System.out.println("");
		}
```
출력값  
![image](https://user-images.githubusercontent.com/86642180/166189164-dba83c64-94cf-4495-9d29-914dfa95fe9a.png)  
잘나온다!  
그런데 왜?  

<br>

`j👉i👉k 혹은 k👉i👉j가 가능하다면 temp에 1을 집어넣고 아니면 0이다`  
틀림ㅋㅋ  
둘 중 하나만 가능하면 전부 왔다갔다가 안되니까...  
서로 왕복이 되는 경우였음 예제 2보니까  
![image](https://user-images.githubusercontent.com/86642180/166190071-7858e4a1-701f-4f21-b2d1-86dd82de4ba8.png)
![image](https://user-images.githubusercontent.com/86642180/166190107-93722385-f99f-4397-a1b2-c92f510c9df1.png)  
만약 둘 중 하나라도 경로가 있는데 1이라면  
노드 3에도 1이 들어가야함 (7-->3)  
하지만 0인걸 보면 쌍방으로 이동 가능해야만 1을 추가할 수 있음  

<br>

```
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.util.StringTokenizer;
import java.io.IOException;

public class Main {

	public static void main(String[] args) throws NumberFormatException, IOException {
		
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
		StringTokenizer st;
		
		int n = Integer.parseInt(br.readLine()); // 첫번째로 받은 인자 String 타입을 int로 변환해 저장
		int[][] temp = new int[n][n];
		
		// 두번째로 받은 파라미터 문자열을 쪼개서 배열로 저장
		for(int i=0; i<n; i++) {
			
			// scanner든 buffer든 항상 한 줄 단위로 입력됨!!
			// 그래서 첫 로우를 첫번째 루프에서 읽는다
			st = new StringTokenizer(br.readLine());
			
			for(int j=0; j<n; j++) {
				// 받은 첫 로우를 .nextToken을 통해 잘라서 각각 answer에 저장
				temp[i][j] = Integer.parseInt(st.nextToken());
			}
		}

		
		// temp에서 모든 정점들에서 정점으로 가는 경우의 수(경로 값 비교)
		for(int i=0; i<n; i++) { // 거치는 노드
			for(int j=0; j<n; j++) { // 출발 노드
				for(int k=0; k<n; k++) { // 도착 노드
					if(temp[j][i] == 1 && temp[i][k] == 1) {
						temp[j][k] = 1;
					}
				}
			}
		}
		
		// 답 출력
		StringBuilder sb = new StringBuilder();
		for(int i=0; i<n; i++) {
			for(int j=0; j<n; j++) {
				sb.append(temp[i][j] + " ");
			}
			sb.append("\n");
		}
		
		bw.write(sb.toString());
		bw.flush();
		bw.close();
		br.close();
	}	
}
```

![image](https://user-images.githubusercontent.com/86642180/166190345-4a7c2ad9-ff72-4d53-b99a-ae15a1ae919e.png)



<br>

# 기타 질문
사바사겠지만 연습장에 손으로 풀면서 문제 푸는거보다  
컴퓨터에 타자치며 코테 진행하는 것이 더 나은지??  
이런 노드 탐색은 손으로 노드 그리는거 아니면 어떻게 푸는지?????  
