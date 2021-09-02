# [백준 2108] 통계학
```python
from collections import Counter

def avg(N,num):
  average=sum(num)/N
  return round(average) #소수 첫째자리에서 반올림

#중앙값
def med(N,num):
  num.sort()
  return num[N//2]

#최빈값
def freq(num):
  fq=Counter(num).most_common()
  if len(fq) > 1 and fq[1][0] == fq[0][0]:
    return fq[1][0]
  else:
    return fq[0][0]

#범위
def rng(num):
  result=max(num)-min(num)
  return result

#입출력
N = int(input())
num=[]
for i in range(N):
  num.append(int(input()))

print(avg(N,num))
print(med(N,num))
print(freq(num))
print(rng(num))
```

## 알게 된 것
데이터의 개수를 셀 때 유용한 파이썬의 collections 모듈의 Counter 클래스 

```python
#사용예시
from collections import Counter
Counter('hello world').most_common() 
#most_common() : 빈도수가 높은 것 순으로 정렬
#반환형태:  [('l', 3), ('o', 2), ('h', 1), ('e', 1), (' ', 1), ('w', 1), ('r', 1), ('d', 1)]
#딕셔너리로 치면 [ ][0]:key, [ ][1]: value
```
