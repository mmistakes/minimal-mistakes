---
title: "2018 2학기 자료구조 과목 정렬 알고리즘 보고서"
date: 2019-03-23 05:10:00
categories:
- Study
tags:
- Sunrin-Study
---

# 작성자
선린인터넷고등학교 소프트웨어과 18학번 나정휘

# 정렬알고리즘이란?

### 의미
정렬 알고리즘이란 리스트에서 원소들을 일정한 순서대로 열거하는(재배열하는) 알고리즘이다.

### 정렬 알고리즘의 분류
정렬 알고리즘은 특정 기준에 따라 몇 가지 종류로 나뉘게 된다.<br>
**ㄱ. 안정/불안정 정렬** <br>
같은 키 값에 대해 정렬 전과 후의 순서가 같다면 안정 정렬(Stable Sort)<br>
그렇지 않으면 불안정 정렬(Unstable Sort)라고 한다.<br>
**ㄴ. 내부/외부 정렬** <br>
이 보고서와 대부분의 알고리즘 설명, PS/CP대회에서 다루는 정렬은 내부 정렬이고, 외부 정렬은 자료의 일부분만 조금씩 불러오며 정렬을 하는 알고리즘이다.

# 시간 복잡도

### 알고리즘 성능의 척도
알고리즘의 우수함을 가리는 대표적인 기준은 나열해보자면,

1. 정확성 (얼마나 정확한가)
2. 작업량 (얼마나 적은 연산을 필요로 한가)
3. 메모리 사용량 (얼마나 적은 공간을 필요로 하는가)
4. 단순성 (얼마나 단순한가)
5. 최적성 (더 이상의 개선의 여지가 없을 만큼 최적화가 잘 되어 가는가)

이렇게 나열할 수 있다.

1. 정확성은 해당 알고리즘이 input data에 대해 정확한 output을 내는 지의 여부를 나타낸다.
2. 작업량은 요구되는 기능을 수행하는데 필요로 하는 작업의 양을 의미한다.
3. 메모리 사용량은 해당 알고리즘이 특정 작업을 수행하는데 필요한 메모리의 양을 의미한다.
4. 단순성은 말 그대로 얼마나 흐름이 단순한가를 의미한다.
5. 최적성은 더 이상 개선할 수 없을 정도로 최적화가 잘 되어 있는지를 나타내는 척도이다.

시간 복잡도는 위에서 나열한 알고리즘의 우수함을 가리는 5개의 기준 중에서 작업량을 중점으로 다룬다. 프로그램의 실행 시간은 연산의 양과 관련이 크기 때문에 작업량을 기준으로 시간 복잡도를 계산한다.<br>
알고리즘 수행 시간 분석의 목표는 다음 3가지를 찾는 것을 목표로 한다.

1. 최선의 경우<br>
딱히 필요 없다. 마치 로또에 당첨될 것이라는 기대만 하고 있는 것과 유사하다고 할 수 있다. 그리고, 최선의 경우는 많이 찾아오지 않기에 성능을 개선하는 데에는 거의 쓰이지 않는다.
2. 평균의 경우<br>
일반적인 상황에서 소요되는 시간을 의미한다. 어떤 경우에는 이보다 더 빠르게, 또 다른 경우에는 더 느리게 동작할 수 있다.
3. 최악의 경우<br>
어떠한 경우라도 최악의 경우보다 나쁘지 않다. 해당 알고리즘은 아무리 느려도 최악의 경우의 시간을 보장한다. 알고리즘 문제를 풀 때는 TestCase를 통해서 최악의 경우(BoundaryCase, EdgeCase)를 시험하는 경우가 대부분이고, 그렇기 때문에 문제 풀이를 할 때 최악의 경우를 고려해서 알고리즘을 설계한다.

### 점근 표기법
점근 표기법에서의 “점근”은 한자(漸近, 차츰 점, 가까울 근)을 보면 알 수 있듯이 수행 시간을 대략적으로 나타내는 방법이다.<br>
n개의 데이터를 처리할 때 A알고리즘은 n^2+5n번 계산하고, B알고리즘은 27n번 계산한다고 가정해보자.

* n = 1인 경우: A알고리즘은 6번, B알고리즘은 27번 계산한다.
* n = 5인 경우: A알고리즘은 50번, B알고리즘은 135번 계산한다.
* n = 10인 경우: A알고리즘은 150번, B알고리즘은 270번 계산한다.

여기 까지만 보면 A알고리즘이 더 빠른 것처럼 보인다. 하지만, 알고리즘 속도의 차이는 데이터가 많아질수록 더 확연히 드러난다.

* n = 100인 경우: A알고리즘은 10,500번, B알고리즘은 2,700번 계산한다.
* n = 1000인 경우: A알고리즘은 1,005,000번, B알고리즘은 27,000번 계산한다.

n이 커질수록 차이가 더욱 벌어지게 된다.<br>
계속해서 이렇게 계산을 하게 되면, 다음과 같은 결론을 도출할 수 있다.<br>
각 문자에 곱해진 계수나 다른 항보다 최고차항의 차수가 가장 큰 영향을 미친다.<br>
위 결론을 이용해서 시간 복잡도를 점근 표기법을 이용해 나타내게 된다. 점근 표기법은 보통 세 가지를 많이 쓴다. 점근 표기법을 알기 전에 증가 함수를 먼저 알아야 한다.<br>
증가 함수는 데이터의 크기에 대해 알고리즘의 수행 시간이 늘어나는 비율을 함수로 나타낸 것이다. 증가 함수를 점근 표기법으로 나타낼 때에는 위에서 유도한 결론을 이용해 간결하게 나타내게 된다. 예를 들어 수행 시간이 5n^2+10n+5라면 가장 먼저 문자에 곱해진 계수를 제거한다. 그 후, 최고차항을 제외한 모든 항을 제거한다. 그러면 n^2이 나오게 된다.

1. 빅-오 표기법<br>
최악의 경우를 나타낸다. 다시 말해, 아무리 열악한 환경일지라도 빅-오 표기법으로 표현한 수준에서 종료된다. 표기법은 O(증가함수)이다.<br>
예를 들어, 최대 수행 시간이 5n^2+10n+5라면 O(n^2)으로 나타낼 수 있다.<br>
꼭 알아야 할 것은, O(n^2)은 상한 수행 시간이 n^2을 넘지 않는 모든 증가 함수들의 “집합”이다. 10n+25도 상한 수행 시간이 n^2를 넘지 않기 때문에 O(n^2)로 나타낼 수 있다.
2. 빅-오메가 표기법<br>
최선의 경우를 나타낸다. 다시 말해, 아무리 좋아도 빅-오메가 표기법으로 표현한 수준보다 빠를 수 없다. 표기법은 Ω(증가함수)이다.<br>
Ω(n^2)은 수행시간이 n^2보다 크거나 같은 증가 함수들의 “집합”이다.
3. 빅-세타 표기법
빅-세타 표기법은 평균의 경우를 나타낸다. 빅-세타 표기법은 θ(증가함수)로 나타낸다.<br>
빅-세타 표기법은 θ(f(n))=O(f(n))∩ Ω(f(n))을 만족하는 f(n)의 집합이다.<br>
빅-세타 표기법은 위 두 표기법과는 다르게 자신과 증가율이 같은 증가함수만을 포함한다.



# 간단한 정렬 알고리즘

### Bubble Sort
버블 정렬은 인접한 두 원소를 비교해 정렬한다.<br>
55 07 78 12 42를 버블 정렬을 이용해 정렬해보자.<br>
<img src = "https://i.imgur.com/V27wlZ9.png" width = "300px">

이런 과정을 거쳐 정렬이 된다. 뒤쪽부터 정렬이 된다는 것을 알 수 있다.<br>
코드로 짜보자.

```cpp
void bubbleSort(int *arr, int n) {
  for(int i=0; i<n; i++) {
      for(int j=0; j<n-i+1; j++) {
        if(arr[j] > arr[j+1]) swap(arr[j], arr[j+1]);
      }
    }
}
```

버블 정렬은 정렬 도중 완전히 정렬이 되었는데도 불구하고 계속 연산을 하는 경우가 있다. 그 비효율적인 행동을 막을 수 있다.<br>
먼저 flag라는 변수를 만든 뒤, 바깥쪽 for문 내부 맨 위에서 1이라고 초기화 해준다. 그리고, swap이 일어나면 0으로 바꾼다.<br>
안쪽 for문이 끝났을 때 flag가 1이면 이미 정렬이 완료된 것이기 때문에 더 이상 연산을 할 필요가 없다. 최종 코드는 아래와 같다.<br>

```cpp
for(int i=0; i<n; i++) {
    int flag = 1;
    for(int j=0; j<n-i+1; j++) {
        if(arr[j] > arr[j+1]) {
            flag = 0;
            int tmp = arr[j];
            arr[j] = arr[j+1];
            arr[j+1] = tmp;
        }
    }
    if(flag) break;
}
```

바깥쪽 for문은 n번, 안쪽 for문은 n-i번 돈다.<br>
i가 0일 때 n<br>
1일 때 n-1<br>
2일 때 n-2<br>
n-1일 때 1번돈다.<br>
총 시간 복잡도는 ∑<sub>i=1</sub><sup>n</sup>i ∈ O(n<sup>2</sup>) 이다.

### Selection Sort
버블 정렬은 인접한 두 수를 비교해가며 교체를 했다. 선택 정렬은 리스트 전체에서 최솟값을 선택해서 맨 앞으로 옮겨주는 방법을 통해 정렬한다.<br>
2 5 3 1 4 7 6을 선택 정렬을 이용해 정렬해보자. (빨간색: 최솟값, 초록색: 정렬 완료)

<img src = "https://i.imgur.com/POhahmM.png" width = "300px">

이러한 과정을 통해 정렬이 된다. 버블 정렬과는 달리 앞쪽부터 정렬된다.<br>
코드로 구현해보자.

```cpp
for(int i=0; i<n; i++) {
    int indexMin = i;
    for(int j=i+1; j<n; j++) {
        if(arr[j] < arr[indexMin]) indexMin = j;
    }
    int tmp = arr[i];
    arr[i] = arr[indexMin];
    arr[indexMin] = tmp;
}
```
시간 복잡도를 알아보자.<br>
바깥쪽 for문은 n번, 안쪽 for문은 n-i번 돈다. 버블 정렬과 같이 시간 복잡도는 ∑<sub>i=1</sub><sup>n</sup>i ∈ O(n<sup>2</sup>) 이다.

### Insertion Sort
버블 정렬은 인접한 원소를 비교/교체하고, 선택 정렬은 가장 작은 값을 선택해가며 정렬을 했다.<br>
삽입 정렬은 모든 자료를 앞에서부터 차례대로 이미 정렬된 부분과 비교하여 적절한 위치에 삽입하는 방식으로 정렬을 진행한다.

<img src = "https://i.imgur.com/GIuJTqG.png" width = "300px">

코드로 구현해보자.

```cpp
for(int i=0; i<n-1; i++) {
    int key = arr[i+1];
    int j;
    for(j=i; j>=0; j--) {
        if(arr[j] > key) arr[j+1] = arr[j];
        else break;
    }
    arr[j+1] = key;
}
```

시간 복잡도를 분석해보자.<br>
첫 번째 for문은 n-1번, 두 번째 for문은 최소 0번 최대 i번 돈다.<Br>
그러므로 최선의 경우에는 Ω(n), 최악의 경우에는 O(n^2)이다.

# 효율적인 정렬 알고리즘

### Quick Sort
퀵 정렬은 분할 정복이라는 알고리즘 설계 패러다임을 사용한다.<br>
정렬 과정을 간단하게 알아보자.

1. 리스트에서 원소를 하나 선택한다. 그 원소를 “피벗”이라고 한다.
2. 피벗보다 작은 원소는 모두 피벗의 왼쪽으로, 큰 원소는 모두 오른쪽으로 이동한다.
3. 피벗을 기준으로 분할된 두 개의 부분 리스트에 대해 리스트의 크기가 0 또는 1이 될 때까지 재귀적으로 1, 2번 항목을 반복한다.

조금 더 자세히 알아보자.

1. pivot보다 큰 값을 pivot보다 왼쪽에서 탐색 (가장 왼쪽부터 시작해 큰 값이 나타날 때까지 i 증가)
2. pivot보다 작은 값을 pivot보다 오른쪽에서 탐색 (가장 오른쪽부터 시작해 작은 값이 나타날 때까지 j 감소)
3. 1, 2번 항목 완료 후 i와 j 위치의 원소 비교
4. j의 원소가 더 크면 swap
5. i<=j이면 1~4항목 반복
6. 피벗 왼쪽과 오른쪽 부분 리스트에 대해 재귀 호출

코드로 구현을 하면 다음과 같다.

```cpp
void quickSort(int arr[], int left, int right) {
    int i = left, j = right;
    int pivot = arr[(left + right) / 2];
    int temp;
    do {
        while (arr[i] < pivot)
            i++;
        while (arr[j] > pivot)
            j--;
        if (i<= j) {
            temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
            i++;
            j--;
        }
    } while (i<= j);

    if (left < j)
        quickSort(arr, left, j);

    if (i < right)
        quickSort(arr, i, right);
}
```

시간 복잡도를 분석해보자.<br>
먼저 do-while문은 θ(n)이다. 퀵 정렬은 데이터의 분포에 따라 성능이 달라지기 때문에 최선/평균/최악의 상황을 모두 감안해서 성능을 분석해야 한다.<br>
참고로, T(n)은 데이터의 개수가 n일때의 시간 복잡도이고, c는 아주 작은 상수이다.

1. 최악의 경우<br><img src = "https://i.imgur.com/ZNawCKo.png" width = "300px">
2. 최선의 경우<br><img src = "https://i.imgur.com/XrWbGpR.png" width = "300px">
3. 평균의 경우<br><img src = "https://i.imgur.com/Dt6647R.png" width = "300px"><br><img src = "https://i.imgur.com/F3A7ygl.png" width = "300px">

정리하자면, 최선/평균의 경우에는 O(n log⁡ n)이고, 최악의 경우에는 O(n<sup>2</sup>)이다.

### Merge Sort
퀵 정렬과 같이 합병 정렬도 분할 정복 기법을 사용한다.<br>
합병 정렬 과정을 크게 3가지로 나눠보자.

1. 분할 - 해결하고자 하는 문제를 작은 크기의 동일한 문제로 분할
2. 정복 - 각각의 작은 문제를 해결
3. 합병 - 작은 문제의 해를 합하여 전체 문제에 대한 해 도출

조금 더 자세히 나눠보자.

1. 리스트의 0 또는 1이면 이미 정렬된 것으로 본다.
2. 정렬되지 않은 리스트를 절반으로 잘라 비슷한 크기의 두 부분 리스트로 나눈다.
3. 각 부분 리스트에 대해 크기가 0 또는 1이 될 때까지 계속해서 두 부분으로 나눈다.
4. 정렬된 두 부분 리스트를 다시 하나의 정렬된 리스트로 합병한다.

{1, 7, 5, 3, 4, 2, 6, 8}를 합병 정렬을 이용해 정렬해보자.<br>
두 개의 리스트로 분할하면 {1, 7, 5, 3}, {4, 2, 6, 8}이 된다.<br>
부분 리스트의 크기가 1보다 크기 때문에 다시 분할한다. {1, 7}, {5, 3}, {4, 2}, {6, 8}<Br>
다시 분할한다. {1}, {7}, {5}, {3}, {4}, {2}, {6}, {8}

모든 부분 리스트의 크기가 1 이하이기 때문에 각각의 부분 리스트는 정렬이 되었다는 것이 자명하다.<br>
이제 정복을 해야 한다.

{1}, {7}을 합쳐서 정렬하면 {1, 7}<Br>
{5}, {3}을 합쳐서 정렬하면 {3, 5}<Br>
{4}, {2}를 합쳐서 정렬하면 {2, 4}<Br>
{6}, {8}을 합쳐서 정렬하면 {6, 8} 이 된다.<Br>
{1, 7}, {3, 5}를 합쳐서 정렬하면 {1, 3, 5, 7}<Br>
{4, 2}, {6, 8}을 합쳐서 정렬하면 {2, 4, 6, 8} 이 된다.<Br>
마지막으로 전체를 합쳐서 정렬하면 {1, 2, 3, 4, 5, 6, 7, 8}이 나온다.

코드로 구현하면 아래와 같이 된다.

```cpp
void merge(int arr[], int p, int q, int r){ //정복
    int i = p, j = q+1, k = p;
    int tmp[n] = {0};
    while(i <= q || j <= r) {
        if(i > q) tmp[k++] = arr[j++];
        else if(j > r) tmp[k++] = arr[i++];
        else if(arr[i] <= arr[j]) tmp[k++] = arr[i++];
        else tmp[k++] = arr[j++];
    }
    for(int i=p; i<=r; i++) arr[i] = tmp[i];
}

void mergeSort(int arr[], int p, int r){ //분할
    if(p<r) {
        int q = (p+r)/2;
        mergeSort(arr, p, q);
        mergeSort(arr, q+1, r);
        merge(arr, p, q, r);
    }
}
```

합병 정렬의 시간 복잡도의 증명은 퀵 정렬에서 최선의 시간 복잡도 증명과 유사하다.<br>
merge과정은 θ(n)이다.<br>
T(n) = 2T(n/2) + n이기 때문에 마스터 정리에 의해 O(n log n)이 된다.

### Heap Sort
힙 정렬은 힙 구조를 이용하여 정렬을 수행한다.<br>
힙 정렬은 크게 3가지 과정으로 나뉩니다.

1. 리스트를 힙 구조로 변형시킨다.
2. 힙의 최대값을 리스트의 맨 뒤 원소와 swap한다.
3. 1~2의 과정을 n번 반복한다.

조금 더 자세히 나누면 4가지 과정으로 나뉜다.

1. 전체 리스트를 힙 구조로 변형시킨다.
2. (i번째 단계) 힙의 최대값과 n-i+1번째 원소를 swap한다.
3. (i번째 단계) 1 ~ n-i번째 원소들을 힙 구조로 변형시킨다.
4. 2~3 항목을 n-1번 반복한다.

코드로 구현하면 아래와 같이 된다.

```cpp
void swap(int* a, int* b) {
	int tmp = * a;
	* a = * b;
	* b = tmp;
}

void makeHeap(int *arr, int n) {
	for(int i=1; i<n; i++) {
		int now = i;
		while(now > 0) {
			int par = now-1>>1;
			if(arr[par] < arr[now]) swap(arr+par, arr+now);
			now = par;
		}
	}
}

void heapSort(int *arr, int n) {
	makeHeap(arr, n);
	for(int i=n-1; i>0; i--) {
		swap(arr, arr+i);
		int left = 1, right = 2;
		int sel = 0, par = 0;
		while(1) {
			if(left >= i) break;
			if(right >= i) sel = left;
			else {
				if(arr[left] < arr[right]) sel = right;
				else sel = left;
			}
			if(arr[sel] > arr[par]) {
				swap(arr+sel, arr+par);
				par = sel;
			} else break;
			left = (par<<1) +1;
			right = left+1;
		}
	}
}
```
시간 복잡도를 분석해보자.<br>
맨 처음에 전체 리스트를 힙 구조로 변환하는 과정을 수행한다. 원소를 하나씩 힙에 넣기 때문에  O(∑<sub>k=1</sub><sup>n</sup> log ⁡k)= O(log⁡ n!)=O(n log⁡ n)이 소요된다.<br>
그 다음에 정렬을 해가는 과정은 힙에서 최댓값을 삭제하는 과정과 유사한 과정을 n번 반복하기 때문에 O(∑<sub>k=1</sub><sup>n</sup> log ⁡k) = O(log ⁡n!) = O(n log ⁡n)이다.<br>
최종 시간 복잡도는 O(nlog⁡ n)이다.

# 특수한 정렬 알고리즘

### Radix Sort
기수 정렬은 정수 데이터에서 주로 쓰인다.<Br>
기수 정렬은 몇 개의 키를 기준으로 정렬이 진행되는데, 모든 수가 세 자리 이하인 경우에는 1의 자리, 10의 자리, 100의 자리 등으로 나누어지는 것이 일반적이다.

기수 정렬은 낮은 자리부터 정렬하는 LSD(Least Significant Digit, 최하위 자릿수 우선)와 높은 자리부터 정렬하는 MSD(Most Significant Digit, 최상위 자릿수 우선) 방식이 있다. 이 보고서에서는 LSD 방식을 다룬다.<Br>
170 45 75 90 2 24 802 66을 기수 정렬을 이용해 정렬해보자.

먼저 1의 자리만 보고 정렬하되, 1의 자리가 같으면 먼저 나온 것이 앞에 오게 한다.<Br>
170 90 2 802 24 45 75 66이 된다.

이번에는 이 리스트를 10의 자리를 기준으로 정렬한다.<Br>
2 802 24 25 66 170 75 90이 된다.

마지막으로 100의 자리에 대해 정렬을 하면,<Br>
2 24 45 66 75 90 170 802가 된다.<Br>

구현할 때에는 자료구조 큐(Queue)를 사용한다.<Br>
키 값을 기준으로 큐에 넣어서 꺼내는 방식으로 진행을 한다.<Br>

35 31 55 41 54 49 를 기수 정렬을 할 건데, 그 전에 0번부터 9번까지의 큐를 생성한다.<Br>
그 다음에 1의 자리를 기준으로 큐에 삽입한다.

* 1번 큐에는 31, 41
* 4번 큐에는 54
* 5번 큐에는 35, 55
* 9번 큐에는 49

가 들어가 있다.

이제 큐에서 차례대로 꺼내면 31 41 54 35 55 49가 되면서 1의 자리를 기준으로 정렬이 된다.

이제 10의 자리를 기준으로 큐에 삽입을 하면,<Br>
* 3번 큐에는 31, 35
* 4번 큐에는 41, 49
* 5번 큐에는 54, 55

가 들어가게 되고, 순서대로 꺼내면<Br>
31, 35, 41, 49, 54, 55 가 나오면서 정렬이 완료된다.<Br>
코드로 구현하면 아래와 같다.

```cpp
void radixSort(int *arr, int n) {
	queue<int> q[10];
	int maxi = arr[0];
	for(int i=1; i<n; i++) maxi = max(maxi, arr[i]);

	for(int i=1; i<=maxi; i*=10) {
		int idx = 0;
		for(int j=0; j<n; j++) q[ arr[j]/i%10 ].push(arr[j]);
		for(int j=0; j<10; j++) {
			while(!q[j].empty()) {
				arr[idx++] = q[j].front();
				q[j].pop();
			}
		}

	}
}
```
원소들이 최대 d자리일 때, 리스트 전체를 d번 순회하기 때문에 시간 복잡도는 O(dn)이 된다.

### Counting Sort
이 알고리즘은 자연수 범위에서 주로 쓰이고, 다른 경우에는 구현이 까다롭기 때문에 잘 쓰이지 않는다.<Br>
기수 정렬은 정렬하기 전에 각 숫자가 몇 번 나왔는지 카운팅을 한다.

* 0은 3번
* 1은 1번
* 2는 3번
* 3은 2번
* 4는 2번
* 5는 1번 나왔다.

<table>
<tr><th>숫자</th> <td>0</td> <td>1</td> <td>2</td> <td>3</td> <td>4</td> <td>5</td> </tr>
<tr><th>개수</th> <td>3</td> <td>1</td> <td>3</td> <td>2</td> <td>2</td> <td>1</td> </tr>
</table>

누적합을 구해보자.

<table>
<tr><th>숫자</th> <td>0</td> <td>1</td> <td>2</td> <td>3</td> <td>4</td> <td>5</td> </tr>
<tr><th>누적합</th> <td>3</td> <td>4</td> <td>7</td> <td>9</td> <td>11</td> <td>12</td> </tr>
</table>

누적합으로 바꾸면 새로운 정보를 얻을 수 있다.

* 0은 0부터 2번 인덱스,
* 1은 3번 인덱스,
* 2는 4부터 6번 인덱스,
* 3은 7, 8번 인덱스,
* 4는 9, 10번 인덱스,
* 5는 11번 인덱스에 들어간다.

이제, 각 숫자를 해당하는 인덱스에 넣어주면 된다.<br>
코드는 아래와 같다.

```cpp
void countingSort(int *arr, int n) {
	int *cntArr;
	int maxi = arr[0];
	for(int i=1; i<n; i++) maxi = max(maxi, arr[i]);
	cntArr = (int*) malloc(sizeof(int) * (maxi+1));
	for(int i=0; i<=maxi; i++) cntArr[i] = 0;
	for(int i=0; i<n; i++) cntArr[ arr[i] ]++;
	for(int i=1; i<=maxi; i++) cntArr[i] += cntArr[i-1];
	int tmp[10]; for(int i=0; i<n; i++) tmp[i] = arr[i];
	for(int i=n-1; i>=0; i--) {
		arr[ cntArr[tmp[i]] - 1 ] = tmp[i];
		cntArr[ tmp[i] ]--;
	}
}
```
원소의 최대값을 d라고 하면, 시간 복잡도는 O(dn)이 된다.

# 하이브리드 정렬 알고리즘

### Intro Sort
인트로 정렬은 C++ STL에서 기본적으로 제공되는 정렬 함수이다. 인트로 정렬은 퀵 정렬, 힙 정렬, 삽입 정렬로 이루어져 있다.<br>
퀵 정렬은 평균의 경우에는 매우 빠른 알고리즘이지만, 최악의 경우에서는 느려지게 된다. 그 단점을 보완한 알고리즘이 인트로 정렬이다.<br>
인트로 정렬의 과정은 다음과 같다.

1. 리스트의 크기가 16 이하라면 삽입 정렬을 한다.
2. 전체 리스트에 대해 퀵 정렬을 수행한다.
3. 수행 도중 재귀 호출의 깊이가 2⌈log⁡n ⌉을 넘어가게 되면 4번 항목으로 넘어간다.
4. 쪼개진 부분 리스트의 크기가 16 이하라면 그대로 놔둔다.<br>16보다 크다면 해당 부분 리스트에 대해 힙 정렬을 수행한다.
5. 3, 4번 항목이 모두 완료된 후, 대부분 정렬이 된 전체 리스트에 대해 삽입 정렬을 수행한다.

데이터가 적을 때에는 삽입 정렬이 퀵 정렬보다 더 빠르다는 것이 증명이 되어 있고, 16을 휴리스틱 하게 구해진 값이다. 또한, 데이터가 “거의 다” 정렬이 된 경우에는 삽입 정렬이 가장 빠르다.<br>
퀵 정렬을 2⌈log⁡ n⌉ 까지만 수행하기 때문에 최악의 경우에도 O(n^2)이 나오지 않게 된다.<br>
코드는 퀵 정렬, 힙 정렬, 삽입 정렬을 이용해 짜면 된다.

```cpp
void __swap(int * a, int * b) {
	int tmp = * a;
	* a = * b;
	* b = tmp;
}

void __makeHeap(int *arr, int left, int right) {
	for(int i=left; i<=right; i++) {
		int now = i;
		while(now > 0) {
			int par = now-1>>1;
			if(arr[par] < arr[now]) __swap(arr+par, arr+now);
			now = par;
		}
	}
}

void __heapSort(int *arr, int left, int right) {
	__makeHeap(arr, left, right);
	for(int i=right; i>left; i--) {
		__swap(arr, arr+i);
		int left = 1, right = 2;
		int sel = 0, par = 0;
		while(1) {
			if(left >= i) break;
			if(right >= i) sel = left;
			else {
				if(arr[left] < arr[right]) sel = right;
				else sel = left;
			}
			if(arr[sel] > arr[par]) {
				__swap(arr+sel, arr+par);
				par = sel;
			} else break;
			left = (par<<1) + 1;
			right = left+1;
		}
	}
}

void __insertionSort(int arr[], int left, int right) {
	for(int i=left; i<right; i++) {
		int key = arr[i+1];
		int j;
		for(j=i; j>=left; j--) {
			if(arr[j] > key) arr[j+1] = arr[j];
			else break;
		}
		arr[j+1] = key;
	}
}


void __quickSort(int arr[], int left, int right, int depth) {
	if(depth == 0) {
		int size = right-left+1;
		if(size > 16) {
			__heapSort(arr, left, right);
		}
		return;
	}

	int i = left, j = right;
    int pivot = arr[(left + right) / 2];
    int temp;
    do {
        while (arr[i] < pivot)
            i++;
        while (arr[j] > pivot)
            j--;
        if (i<= j) {
            __swap(arr+i, arr+j);
            i++;
            j--;
        }
    } while (i<= j);

    if (left < j)
        __quickSort(arr, left, j, depth-1);

    if (i < right)
        __quickSort(arr, i, right, depth-1);

}

void introSort(int arr[], int n) {
	int limit = 2*ceil(log2(n));
	if(n <= 16){
		__insertionSort(arr, 0, n-1);
		return;
	}
	__quickSort(arr, 0, n-1, limit);
	__insertionSort(arr, 0, n-1);
}
```

시간 복잡도는 최선의 경우에는 퀵 정렬의 최선의 시간 복잡도와 같고, 최악의 경우에는 힙 정렬의 최악의 시간 복잡도와 같다. 즉, 항상 O(n log⁡ n)이다.

# 각종 정리 & 증명

### Master Theorem
마스터 정리는 재귀 알고리즘의 시간 복잡도를 쉽게 구하도록 도와주는 정리이다.

<img src = "https://i.imgur.com/ogy8gfM.png" width = "300px"><br>
꼴의 관계식이 주어졌다고 하자.

여기서 a, b>=0이고, f(n)은 점근적으로 양수 함수 값을 갖는 함수이다.
먼저, g(x)=log_b⁡a 이고, ε 을 0보다 큰 어떤 상수라고 가정하자.
마스터 정리는 아래 3가지로 나뉘게 된다.

1. f(n)∈O(n<sup>g(x)-ε</sup>) 이면 T(n)∈ θ(n<sup>g(n)</sup>)
2. f(n)∈O(n<sup>g(x)</sup>) 이면 T(n)∈ θ(n<sup>g(n)</sup> log⁡n)
3. f(n)∈O(n<sup>g(x)+ε</sup>) 이고 af(n/b)≤cf(n) 인 상수 c<1이 존재하면 T(n)∈ θ(f(n))

위에서 마스터 정리를 이용해 재귀 기반 정렬 알고리즘인 퀵 정렬과 합병 정렬의 시간 복잡도를 유도해냈다.

### 극한을 이용한 시간 복잡도 증명
빅-오 표기법, 빅-세타 표기법, 빅-오메가 표기법 모두 극한을 이용하여 증명할 수 있다.

<img src = "https://i.imgur.com/0IhfYsj.png" width = "300px">

### log (n!)
D에서 비교 정렬 알고리즘의 하한을 증명하기 위해서, log⁡n!이 어느 함수에 근사하는지 알 필요가 있다.

n! 은 다음과 같이 나타낼 수 있다.<br>
n! = (1*n) * (2*(n-1)) * (3*(n-2)) * …<br>
그리고 각각의 항은 n보다 크거나 같다.<br>
그러므로, n! 은 n^(n/2)보다 크거나 같다. 그리고 n^n보다는 작거나 같다.

모든 항에 로그를 취해보자.<br>
n/2 * log n⁡ ≤ log ⁡n! ≤n log ⁡n 이 된다.<br>
그러므로 log⁡ n! ∈ θ(n log⁡ n)이다.

이 사실을 이용해 힙 정렬 첫 단계에서 힙을 생성하는데 소요되는 시간과 아래에서 설명할 비교 정렬 알고리즘의 하한을 유도해낼 수 있다.

### 비교 기반 정렬 알고리즘 하한 증명
데이터가 n개가 있다면 재배열을 해서 나올 수 있는 모든 경우의 수는 n! 이다.<br>
각각의 경우를 정점으로 하는 Decision Tree를 만들자.<br>
트리의 높이 h는 h ≥ log⁡n! ∈ θ(n log⁡ n) 이다.<br>
따라서 어떤 비교 정렬도 θ(n log⁡ n)보다 빠를 수는 없다.

# 결론
약 2년 전부터 알고리즘을 공부해왔고, 그 중 초반에 공부한 알고리즘 분류 중 하나가 정렬 알고리즘이다. 최근 블로그에 정리를 하면서 복습을 했었고, 이번 보고서를 통해서 확실하게 알고 가게 된 것 같다. 또한, 이번 기회를 통해 전에는 구현해보지 않았던 intro sort도 구현하게 되어서 큰 의미가 있었던 것 같다.

# 참고 문헌
극한을 이용한 시간 복잡도 증명: http://web.skhu.ac.kr/~mckim1/Lecture/DS/dna/class02/class02_04.html<br>
introsort, log n! 증명: ioi 여름학교 수업<br>
시간 복잡도, 정렬 알고리즘: http://나정휘.kr<br>
마스터 정리: https://ko.wikipedia.org/wiki/마스터_정리<br>
비교 정렬 알고리즘 하한: https://wraithkim.wordpress.com/2018/07/08/정렬-알고리즘/
