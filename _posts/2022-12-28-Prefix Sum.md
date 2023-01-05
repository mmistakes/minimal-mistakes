---
title: "구간 합(Prefix Sum)"
categories:
  - 알고리즘
tags:
  - 알고리즘
toc: true
toc_label: "목차"
#toc_icon:
toc_sticky: true
#last_modified_at:
---

### 1. 누적합(Prefix Sum)이란?
누적합은 말 그대로 구간의 누적합을 구하는 문제입니다.\
일반적으로 사용되는 배열에 값을 저장하고 지정된 인데스부터 하나씩 더해가는 방식은 최악의 경우 $O(n^2)$의 시간복잡도를 갖기 때문에 입력의 범위가 클 때 사용할 수 없습니다. 하지만 **Prefix Sum**방식을 사용하면 $O(n)$으로 해결할 수 있습니다.\
누적합의 각 요소는 해당 인데스까지의 **부분 합(Partial Sum)**을 의미합니다. 예를 들어 크기가 5인 배열에서 3번 index와 5번 index구간의 구간합을 구한다고 가정하면, 누적합은 prefix[5] - prefix[2]로 표현할 수 있습니다.

### 2. 예시
[2,4] 구간의 누적합??

#### 2.1 크기가 5인 배열선언 및 누적합 저장
![asd](https://blog.kakaocdn.net/dn/pikBu/btq3cyNHvGc/0ZjVU7HgkgBGtkvNaa0YyK/img.png)

<br/><br/>

#### 2.2 [2,4] 누적합구하기
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
## Ref.
[코딩무식자 전공생-누적합](https://jow1025.tistory.com/47)\
[TH-누적합](https://sskl660.tistory.com/77)
