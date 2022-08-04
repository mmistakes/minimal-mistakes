---
layout: single
title:  "메뉴 리뉴얼"
categories: Programmers, Class2
tag: [combination]
toc: true
author_profile: false
sidebar: 
nav: "docs"
---

# Programmers, 메뉴 리뉴얼

## 최초 접근법

combination과 dictionary를 사용하여 접근하였다. 

1. 각 코스요리의 요리 개수만큼 조합을 구성한다. 

2. 구성된 요리들을 key, 반복되는 개수를 value로 dictionary를 만들었다. 

위의 방식으로 접근한 후 데이터를 잘 정렬하여 뽑아내려했는데 생각보다 쉽지 않았다. 

이를 해결하기 위해 lambda 정렬을 이용하였다. 

## 코드

```python
from itertools import combinations


def solution(orders, course):
    answer = []
    menues = dict()

    for m in orders:
        menu = sorted(list(m))
        for n in course:
            set_menu = list(combinations(menu, n))
            for i in set_menu:
                if i in menues:
                    menues[i][1] += 1
                else:
                    menues[i] = [n, 1]
    # 메뉴들을 많이 중복된 순서대로 정렬 후 리스트로 반환
    menues = sorted(menues.items(), key=lambda x: x[1], reverse=True)

    flag = 0
    index = 0
    for i in range(len(menues)):
        if menues[i][1][1] > 1:
            answer.append(''.join(menues[i][0]))
            index = i
            maximum = menues[i][1][1]
            break
    else:
        return answer

    for i in range(index+1, len(menues)):
        if menues[i][1][0] == len(answer[-1]) and menues[i][1][1] == maximum:
            answer.append(''.join(menues[i][0]))
        elif menues[i][1][0] != len(answer[-1]):
            answer.append(''.join(menues[i][0]))
            maximum = menues[i][1][1]

    answer.sort()
    return answer
```

## 설명

1. 각 코스요리의 요리 개수만큼 요리들의 조합을 구성한다. 
2. 조합을 key, 반복되는 개수를 value로 dictionary를 구성한다. 
   - value를 [코스요리의 요리개수, 반복되는 개수]
   - 이것을 list로 만들어주어야 반복되는 개수를 계속 더해나갈 수 있다. tuple로 해주면 immutable이기 때문에 값을 변경해갈 수 없다. 

3. 만들어진 dictionary를 lambda 정렬을 이용해서 조합이 많은 순으로 정렬한다. 
4. 반복되는 코스가 1이상이 나올 때까지 for문을 돌면서 탐색한다. 
   - 1 이상인 코스가 나오면 해당 index를 받고 개수의 최댓값 maximum 변수를 업데이트한다. 
   - 만약 반복되는 횟수가 1이상인 코스가 없다면 빈 list인 answer를 반환한다. 

5. 반환된 index의 다음 index부터 끝까지 검사를 시작한다. 
6. 만약 요리의 개수가 같고 반복되는 횟수가 같다면 
   - 똑같은 최대값이므로 추가해준다. 
7. 만약 요리의 개수가 다른것이 나온다면 
   - 새로운 최대값이 나온 것으므로 추가해주고 maximum 변수를 업데이트해준다. 

8. answer를 정렬해주고 반환한다. 

## 요점 및 배운점

- 코드를 수정해가다보니 조금은 비효율적인 구성이 나온것같다. 

- collection 모듈의 Counter().most_common() 함수를 사용하면 가장 많이 반복되는 것을 쉽게 알 수 있다. 

  이런 모듈을 많이 알수록 더 쉽고 간단하게 접근할 수 있는 것 같다. 

- lambda 정렬
  - dictionary를 정렬할 때, value들을 정렬하려면 lambda정렬을 이용하면 된다. 
  - sorted() --> 정렬한 후 list를 반환한다. 
  - sorted(dict.items()) --> dictionary를  정렬한다. 
  - sorted(dict.items(), key=lambda x: x[0]) --> value의 첫번째 원소를 기준으로 오름차순 정렬한다. 값을 1로 주면 두번째 원소를 기준으로 오름차순 정렬한다. 
  - sorted(dict.items(), key=lambda x: x[0], reverse=True) --> 똑같이 value의 첫번째 원소를 기준으로 정렬하지만 내림차순으로 정렬한다. 

- join의 사용이 조금씩 익숙해져가는 것 같다. 
- 이 문제는 그래도 lambda 정렬과 dictionary, join을 알고 있어서 생각이 꼬이지 않고 실수만 하지 않는다면 풀 수 있는 문제였다. 
- 좀 더 develop하기 위해서는 collection 라이브러리를 잘 사용하면 좋을 것 같다. 
