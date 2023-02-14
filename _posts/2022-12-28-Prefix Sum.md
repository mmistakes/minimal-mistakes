---
title: "구간 합(Prefix Sum)"
categories:
  - 알고리즘
#tags:
#  - 알고리즘
toc: true
toc_label: "목차"
#toc_icon:
toc_sticky: true
#last_modified_at:
---

## 1. 누적합(Prefix Sum)이란?
누적합은 말 그대로 구간의 누적합을 구하는 문제입니다.\
일반적으로 사용되는 배열에 값을 저장하고 지정된 인데스부터 하나씩 더해가는 방식은 최악의 경우 $O(n^2)$의 시간복잡도를 갖기 때문에 입력의 범위가 클 때 사용할 수 없습니다. 하지만 **Prefix Sum**방식을 사용하면 $O(n)$으로 해결할 수 있습니다.\
누적합의 각 요소는 해당 인데스까지의 **부분 합(Partial Sum)**을 의미합니다. 예를 들어 크기가 5인 배열에서 3번 index와 5번 index구간의 구간합을 구한다고 가정하면, 누적합은 prefix[5] - prefix[2]로 표현할 수 있습니다.

## 2.  1차원
### 2.1 예시
[2,4] 구간의 누적합??

### 2.2 크기가 5인 배열선언 및 누적합 저장
![asd](https://blog.kakaocdn.net/dn/pikBu/btq3cyNHvGc/0ZjVU7HgkgBGtkvNaa0YyK/img.png)

<br/><br/>

### 2.3 [2,4] 누적합구하기
겹치는 1,2구간을 제외해줘야 하기때문에 누적합 인덱스 4에서 1을 빼줘야 한다.

```java
public class Main{
    public static void main(String[] args){
        int[] arr = {1,2,3,4,5};
        int[] prefix = new int[5];
        prefix[0] = arr[0];
        for(int i=1; i<arr.length; i++){
            prefix[i] = prefix[i-1] + arr[i];
        }

        System.out.println("[2,4]구간 누적합 = " + (prefix[4]-prefix[1]));
    }
}

```

## 3. 2차원
누적합이 2차원으로 확장되면서 일차원 배열은 2차원 배열로 확장되고, 누적합 수열도 2차원 배열 형태로 확장된다. 직사각형 형태의 배열에 포함되는 직사각형 구간의 모든 원소의 합을 빠르게 구할 수 있게 된다.

다음과 같이 2차원 배열 a(i,j)와 2차원 누적합 배열 S(i,j)가 있다고 가정해보자.

![누적합1](https://t1.daumcdn.net/cfile/tistory/993525345AD1AA1B28?original)

가장 왼쪽 위를 a(1,1)라고 할 때 S(i,j)는 a(1,1)과 a(i,j)를 양 대각 끝 꼭지점으로 하는 직사각형 범위 면적 안의 모든 a 원소의 합으로 정의된다.

![누적합2](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Ft1.daumcdn.net%2Fcfile%2Ftistory%2F9933B24D5AD1AD9230)

a(2,2) a(3,3)의 부분합을 구하기 위해서는 S(3,3)에서 시작한다. S(3,3)값에서 S(1,3)값을 빼고, S(3,1)값을 빼면 초록색 부분의 합에서 주황색 부분의 합이 빠진 값이 된다.

왜냐하면 S(1,3)값에 주황색 부분이 포함되어 있고, S(3,1)부분에도 주황색 부분의 값이 포함되어 있으니 두 번 빠진 셈이다. 따라서 다시 주황색 부분에 해당하는 S(1,1)을 더해주면 초록색 부분의 구간합이 된다.

(sx, sy)부터 (dx, dy)까지의 합을 Range(a,b,c,d)라고 할 때 이를 S(i,j)로 나타내면 다음과 같다.

$Range(a,b,c,d) = S(dx, dy) - S(sx - 1, dy) - S(dx, sy - 1) + S(sx - 1, sy - 1)$

위 수식을 이용해서 직사각형 형태의 영역의 구간합을 $O(1)$의 시간복잡도에 구할 수 있다. 다만 구현 시 유의해야 할 점은 정수 오버플로에 유의해야 한다.\
2차원 구간합 수열의 경우 S(0,x)와 S(x,0)과 같은 형태로 나타나는 수열의 값은 모두 0이다. 따라서 해당 값에 0으로 값이 잘 들어가도록 하여 실수를 방지해야 한다.\
2차원 구간합 수열을 구하는 방법은 Row방향으로 한번 1차원 구간합을 모두 다 구한 뒤, Column 방향으로 구해진 구간합을 다시 구간합 하면 된다.

![누적합3](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Ft1.daumcdn.net%2Fcfile%2Ftistory%2F9973A44B5AD1B0FD1C)

a(i,j)에서 Row(가로)방향으로 누적합을 구하여서 s(i,j) 수열이 되고, 해당 수열을 Column(세로)방향으로 누적합을 구해서 최종적인 S(i,j) 수열이 된다.

## 4. 복잡도 분석
누적합을 사용하는데에는 2단계의 Step이 있다.
1. 전처리(Preprocessing) : 누적합 수열 S(i) 혹은 S(i,j)를 구한다.
2. 계산 : 원하는 구간의 구간합을 계산한다.

전처리 단계의 경우 1차원 누적합일 경우 $O(N)$의 시간복잡도와 공간 복잡도를 갖는다.\
2차원 누적합은 전처리 단계에서 $O(N^2)$의 시간복잡도와 공간복잡도를 갖는다.\
계산 단계의 경우 차원과 관계없이 $O(1)$의 상수 시간복잡도를 갖는다.

## 5. 누적합의 한계
누적합의 경우에는 합을 구하는 도중에 원본 수열값이 변하는 경우 누적합 수열을 다시 계산해야하는 단점이 있다. 따라서 원본 수열값이 변할 수 있는 경우에 구간 합을 빠르게 구해야하 할 경우에는 세그먼트 트리를 사용해야 한다.

## Ref.
[코딩무식자 전공생-누적합](https://jow1025.tistory.com/47)\
[TH-누적합](https://sskl660.tistory.com/77)\
[아인스트라세의 SW 블로그-2차원 누적합, 부분합 구하기](https://eine.tistory.com/entry/2%EC%B0%A8%EC%9B%90-%EB%88%84%EC%A0%81%ED%95%A9-%EB%B6%80%EB%B6%84%ED%95%A9-%EA%B5%AC%ED%95%98%EA%B8%B0)
