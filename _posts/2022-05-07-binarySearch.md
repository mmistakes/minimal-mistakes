---
layout: post
title: "이진탐색, 백준 1654번"
---

# 이진탐색 알고리즘
```
def binary_search(array, target, start, end):
    while start <= end:
        mid = (start + end) // 2

        # 원하는 값 찾은 경우 인덱스 반환
        if array[mid] == target:
            return mid
        # 원하는 값이 중간점의 값보다 작은 경우 왼쪽 부분(절반의 왼쪽 부분) 확인
        elif array[mid] > target:
            end = mid - 1
        # 원하는 값이 중간점의 값보다 큰 경우 오른쪽 부분(절반의 오른쪽 부분) 확인
        else:
            start = mid + 1

    return None
```
즉 배열이나 array에서 원하는 인덱스를 찾을 때 유리한 알고리즘이다  
시간복잡도는 O(logN)  
작년에 아무것도 모르고 알고리즘 수업 들을 때 배웠었다  
파이썬은 저렇게 쓸 필요도 없고 `bisect` 라이브러리를 쓰면 된다고 한다  

<br>

예전 수업때 핶던게 어렴풋이 기억나는데 막상 1654에 적용하려니 잘 모르겠다  
인덱스를 구하는 것에서 길이를 구하는 것으로 바뀐것인데  
그래도 응용하려니까 어렵다  

<br>

1. 오영식이 이미 가지고 있는 랜선의 개수 K, 필요한 랜선의 개수 N을 string token으로 받음  
2. 각각 랜선의 길이를 배열로 받음  
참고로 N, K, 각각 랜선의 길이는 int 범위에서 벗어나지 않으므로 int 타입  
3. 이진탐색 알고리즘을 활용할 것이므로 `min = 배열 값 중 가장 작은 값, max는 모든 배열의 값 중 가장 큰 값`  
`mid = (max + min) / 2`로 지정한다  
4. 루프를 통해 n개를 만들 수 있는 랜선의 최대 길이를 찾는다(int)  
4-1. 애초에 1 ~ mid 사이에 답은 존재함 max까지 갈 필요 X  
4-2. mid >= min 이므로 mid까지도 갈 필요 X  
4-3. 루프에서 선행될 조건은 `count == N`  
4-4. `count == N`일 경우 최대 값 answer를 내부 루프에서 찾는다  
5. 케이스문으로 루프 작성  
5-1. 먼저 min으로 count를 구함  
6. 이전 루프에서 나온 count를 가지고 case문 작성  
6-1. count > N  
6-2. count == N  
6-3. count < N  
총 세 가지 경우의 수로 이진탐색  

<br>

일단 루프 짜는거에서 막혔다  
그냥 정석대로 하면 쉽다  
결국 가장 큰 루프에서 min>max일 경우 반복을 멈추게하면 된다  

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
		StringTokenizer st = new StringTokenizer(br.readLine(), " ");
		
		int K = Integer.parseInt(st.nextToken()); // 첫번째로 받은 인자 String 타입을 int로 변환해 저장
		int N = Integer.parseInt(st.nextToken()); // 띄어쓰기 된 값들 K, N은 줄바꿈으로 다른 값들을 받는 buffer만으로 인식X
		int[] cableTie = new int[K];
		
		long max = 0;
		long min = 1;
		long mid = 0;
		int count = 1;
		
		// 각각 케이블의 길이를 배열에 저장 & 최대값 찾기
		for(int i=0; i<K; i++) {
			cableTie[i] = Integer.parseInt(br.readLine());
			if(max < cableTie[i]) {
				max = cableTie[i];
			}
		}
		
		while(min <= max) {
			
			mid = (min + max) / 2;
			
			for(int i=0; i<K; i++) {
				count += cableTie[i] / mid;
			
			if(count >= N) {
				min = mid + 1;
				
			}else if(count < N) {
				max = mid - 1;
			}
		}

		System.out.println(max);
		bw.flush();
		bw.close();
		br.close();	
	}	
}
```
이렇게 했는데 왜 안되나 계속 고민했는데  
count = 1로 해놓고 += 에, 반복될때마다 초기화해야되는데  
안해서 count 값이 이상하게 나옴ㅋㅋㅋㅋ...  
min빼고 0 넣어주면 되는데 왜저런건지...  

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
		StringTokenizer st = new StringTokenizer(br.readLine(), " ");
		
		int K = Integer.parseInt(st.nextToken()); // 첫번째로 받은 인자 String 타입을 int로 변환해 저장
		int N = Integer.parseInt(st.nextToken()); // 띄어쓰기 된 값들 K, N은 줄바꿈으로 다른 값들을 받는 buffer만으로 인식X
		int[] cableTie = new int[K];
		
		long max = 1;
		long min = 1;
		long mid = 1;
		
		// 각각 케이블의 길이를 배열에 저장 & 최대값 찾기
		for(int i=0; i<K; i++) {
			cableTie[i] = Integer.parseInt(br.readLine());
			if(max < cableTie[i]) {
				max = cableTie[i];
			}
		}
		
		while(min <= max) {
			
			int count = 0;
			
			mid = (min + max) / 2;
			
			for(int i=0; i<K; i++) {
				count += cableTie[i] / mid;
			}
			
			if(count >= N) {
				min = mid + 1;
				
			}else if(count < N) {
				max = mid - 1;
			}
		}

		System.out.println(max);
		bw.flush();
		bw.close();
		br.close();	
	}	
}
```
이러니까 된다!  

<br>

![image](https://user-images.githubusercontent.com/86642180/167282383-4c825d20-7807-4601-a2f7-a6b0bbe98dae.png)  
처음부터 맞출거 였는데 count 초기화 안함 & 처음부터 1넣어서 삽질했다  
