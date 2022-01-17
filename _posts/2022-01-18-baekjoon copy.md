---
layout: post
title:  "백준 10773 제로 파이썬(python) "
---

[백준 10773 링크](https://www.acmicpc.net/problem/10773)

```
 a =[]
 for i in range(int(input())):
     n = int(input())
     if n != 0:
         a.append(n)
     else:
         a.pop()
 print(sum(a))
 ```

 1. 먼저 빈 리스트를 만들고 for문을 돌려 입력을 받는다

 2. 입력받은 숫자가 0이 아니라면 리스트에 append 해주고 0이라면 pop을 사용해 가장 최근에 입력된 값 중 0이 아닌 것을 삭제한다

 3. 마지막으로 sum을 이용해 list내 요소를 모두 더해 출력한다


 ㅣ
 ㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣ