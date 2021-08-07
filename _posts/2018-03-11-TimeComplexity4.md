---
title:  "[시간복잡도] 재귀 알고리즘의 시간복잡도"
date:   2018-03-11 04:31:00
categories:
- Easy-Algorithm
tags:
- Time-Complexity
---

### 서론
반복문으로 이루어진 알고리즘은 시간 복잡도를 구하기가 비교적 쉽습니다.<br>
그러면, 재귀 호출로 이루어진 알고리즘의 시간 복잡도는 어떻게 구할까요?<br>
이것이 이 글의 주제입니다.

### 재귀방정식
재귀방정식에 대해 먼저 살펴봅시다.<br>
재귀 방정식은 이름 그대로 자기 자신을 항으로 갖는 방정식입니다.<br>
팩토리얼을 생각해봅시다.<br>
<b>n! = n * (n-1) * (n-2) * ... * 2 * 1</b> 입니다.<br>
팩토리얼은 다른 방식으로도 표현 가능합니다.<br>
<b>n! = n * (n-1)!</b><br>
이런 식으로 표현 가능합니다.

팩토리얼을 재귀 방정식으로 나타내면,
<img src = "https://i.imgur.com/AWljLIH.png"><br>
와 같이 나타낼 수 있습니다.

이 알고리즘의 시간복잡도를 구해봅시다.

입력 데이터 크기 n에 대한 알고리즘의 수행 시간을 T(n)이라고 합시다.<br>
상수 c는 재귀 호출 외에 알고리즘에서 요구하는 처리 비용을 뜻합니다. 팩토리얼 함수에서는 n과 f(n-1)을 곱하는 비용이 c 에 해당합니다.<br>
T(n) = T(n-1) + c<br>
이 식을 전개하면<br>
T(n) = T(n-1) + c<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;= T(n-2) + 2c<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;= T(n-3) + 3c<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;= ......<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;= T(2) + (n-2)c<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;= T(1) + (n-1)c<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;≤ c + (n-1)c = c + cn - c = cn

이 과정을 거치면서 <b>T(n) ≤ cn</b> 이라는 결론을 얻을 수 있습니다.<br>
c는 상수이기 때문에 n만 문자 취급합니다. 점근 표기법으로 나타내면<br>
<b>O(n)</b> 으로 나타낼 수 있습니다.

### 퀵정렬의 성능 분석
```cpp
void quickSort(int arr[], int l, int r){
  if(l < r){
      int idx = par(arr, l, r);
      quickSort(arr, l, idx-1);
      quickSort(arr, idx+1, r);
  }
}
```

위 코드는 퀵정렬을 구현한 코드의 일부입니다.<br>
퀵정렬의 수행 시간은 분할하는데 소요되는 시간 + 2개의 재귀 호출에 드는 수행 시간 입니다.<br>
퀵정렬은 데이터의 분포에 따라 성능이 달라지기 때문에, 최선, 최악, 평균의 상황을 감안해서 성능을 분석할 것 입니다.<br>
각각의 경우를 보기 전에, par 함수에 대한 시간복잡도를 먼저 구합시다.

#### 파티션을 나누는 작업
```cpp
int par(int arr[], int l, int r){
  int first = l;
  int pivot = arr[first];
  l++;
  while(l < r){
    while(arr[l] <= pivot) l++;
    while(arr[[r] > pivot) r--;
    if(l < r){
      std::swap(arr[l], arr[r]);
    }
    else break;
  }
  std::swap(arr[first], arr[r]);
  return r;
}
```
위 코드를 보면 par함수는 n번만큼 비교를 수행한다는 것을 알 수 있습니다.<br>
따라서 시간복잡도는 Θ(n) 입니다.

#### 최악의 경우
최악의 경우는 pivot이 가장 작을 때 입니다. 이 경우에는 배열을 1 : n-1로 분할하기 때문에<br>
T(n) = T(n-1) + cn 이고<br>
n을 1씩 줄여나가면<br>
T(n) = T(n-1) + cn<br>
T(n-1) = T(n-2) + c(n-1)<br>
...<br>
T(3) = T(2) + c(3)<br>
T(2) = T(1) + c(2)<br><br>
모두 더하면<br>
T(n)+ ... + T(2) = T(n-1) + ... + T(1) + cn + c(n-1) + ... + c(2)<br>
가 되고, T(1) = 0입니다.<br>
공통 부분을 소거하면,<br>
<img src = "https://i.imgur.com/5JM4gJn.png"><br>
이 되고, T(n) = <b>O(n<sup>2</sup>)</b>이 됩니다.

#### 최선의 경우
퀵정렬에서 최선의 경우는 분할이 1 : 1 로 되는 상황입니다.<br>
길이가 n일 때 최선의 경우로 분할이 되면<br>
T(n)은 2*T(n/2) + cn 이 됩니다.<br>
양 변을 n으로 나누면<br>
<img src = "https://i.imgur.com/waDPpQ5.png"><br>
가 됩니다.<br><br>
그리고 이 식을 2의 n제곱 으로 나누어 나가면 다음과 같은 식을 얻어낼 수 있습니다.<br>
<img src = "https://i.imgur.com/lLqsGNv.png"><br>
T(n) / n 이 T(2) / 2 가 되기 까지는 log<sub>2</sub>n번 나누어야 합니다.<br><br>
이제 위 식을 하나씩 더할겁니다. 우선 T(n) / n과 T(n/2) / (n/2) 를 먼저 더해봅시다.<br>
<img src = "https://i.imgur.com/CEM0rXH.png"><br><br>
다음 단계로 넘어가면<br>
<img src = "https://i.imgur.com/Zd5aZXF.png"><br>
이 됩니다.<br>
이런 식으로 더해나가면<br>
T(n) / n = T(1) + c log(2) n 이 됩니다.<br><br>
양 변에 n을 곱하면<br>
T(n) = cn log(2) n + n이고, 빅-오 표기법으로 나타내면<br>
<b>O(n log<sub>2</sub>n)</b>입니다.

#### 평균의 경우
pivot이 i번째 데이터라면 분할 후 왼쪽 데이터는 i-1개, 오른쪽 데이터는 n-i개 가 됩니다.<br>
여기서 평균적 성능을 구하면<br>
<b>T(n) = T(n-1) + T(n-i) + cn</b><br>
분할 시 가장 이상적인 경우는 i = n/2일 때 이고, 최악의 경우는 첫 번째나 n번째인 경우입니다. 따라서, 평균의 경우에는 최선부터 최악까지 모든 경우를 평균 낸 것 이라고 할 수 있습니다.<br>
<img src = "https://i.imgur.com/9oc6gw1.png"><br>
이런 식이 나옵니다.<br><br>
양 변에 n을 곱하고<br>
<img src = "https://i.imgur.com/B5hveOR.png"><br>
n 대신에 n-1을 대입합니다.<br>
<img src = "https://i.imgur.com/EFmepNa.png"><br><br>
이제 시그마를 없애봅시다.<br>
nT(n)에서 (n-1)T(n-1)을 빼면 다음과 같이 정리됩니다.<br>
<img src = "https://i.imgur.com/SDMX32c.png"><br>
c는 n이 커질수록 시간복잡도에 끼치는 영향이 매우 작아지니 맨 뒤에 있는 c를 제거합니다. 그리고 위 식을 nT(n)에 대해 정리하면<br>
<img src = "https://i.imgur.com/wAbPLA9.png"><br>
이제 이 식을 T(n)에 대해 정리해야 하는데, 일단 nT(n)을 n(n+1)로 나누어봅시다.<br>
<img src = "https://i.imgur.com/UvWySpL.png"><br>
이 식에 n 대신 n-1, n-2, n-3 ... 3, 2까지 대입을 하면<br>
<img src = "https://i.imgur.com/vNpuVuu.png"><br>
이 되고 모두 더하면 다음 식을 얻게 됩니다.<br>
<img src = "https://i.imgur.com/YGMDbaO.png"><br>
계산을 하면<br>
<img src = "https://i.imgur.com/qbytzxL.png"><br>
이 되고, 따라서<br>
<img src = "https://i.imgur.com/s5ddqUS.png"><br>
가 되며, T(n)은 최종적으로<br>
<b>T(n) = O(n log n)</b><br>
이 됩니다.
