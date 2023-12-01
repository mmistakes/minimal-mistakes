```python
#요세푸스 문제: pg 26

N, K= map(int,input().split())
peo=[i for i in range(1,N+1)]
pt=0 #current position/index in peo
ans=[] #답

for i in range (N):
  pt+=K-1
  pt%=len(peo)
  ans.append(peo.pop(pt))

print(f"<{','.join(map(str, ans))}>")
```


```python
#괄호문제 (VPS): pg29
for i in range(int(input())):
  stk=[]
  ans='yes'
  for c in input():
    if c=='(':
      stk.append(c)
    else:
      if len(stk)>0:
        stk.pop()
      else:
        ans='no'

  if len(stk)>0:
    ans='no'
  print(ans)
```


```python
#카드2: pg33
#덱 (deque) 사용
from collections import deque

dq=deque()
for i in range(1, int(input())+1):
  dq.append(i)

while len(dq)>1:
  dq.popleft()
  dq.append(dq.popleft())

print(dq.pop())
```


```python
#베스트셀러: pg40
#map 활용

books=dict()

for i in range(int(input())):
  name=input()
  if name in books:
    books[name]+=1
  else:
    books[name]=1

max_val=max(books.values()) #가장 많이 입력된 책 찾기 (key with the biggest value)

#가장 많이 팔린 책이 중복될 경우, 즉 팔린 횟수가 중복될 경우를 위함
arr=[] #가장 많이 팔린 책 리스트
for k, v in books.items():
  if v == max_val:
    arr.append(k)

arr.sort() #오름차순 정렬
print(arr[0])
```
