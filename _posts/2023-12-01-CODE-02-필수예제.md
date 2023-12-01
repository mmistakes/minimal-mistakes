```python
#백설공주와 일곱 난쟁이 (pg 50)
#방법 1
from itertools import combinations

for i in combinations([int(input()) for _ in range(9)],7):
  if sum(i)==100:
    for j in sorted(i):
      print(j)

    break
```


```python
#백설공주와 일곱 난쟁이 (pg 50)
#방법 2
h=[int(input()) for _ in range(9)]
tot=sum(h)

def solve():
  for i in range(8):
    for j in range(i+1,9):
      if tot-h[i]-h[j]==100:
        for k in h:
          if k!= h[i] and k != h[j]:
            print(k)

        return
solve()
```


```python
#유레카 이론(pg 53)
T=[n*(n+1) // 2 for n in range(46)]
def is_possible(K):
  for i in range(1,46):
    for j in range(i,46):
      for k in range(j,46):
        if T[i]+T[j]+T[k]==K:
          return 1
    return 0

for _ in range(int(input())):
  print(is_possible(int(input())))
```


```python
#사탕 게임 (pg 55)
#INDEX 다시 확인하기!!!
N=int(input())
board=[list(input() for _ in range(N))]
ans=1

def search():
  global ans
  for i in range(N):
    cnt=1
    for j in range(1,N):
      if board[i][j-1]==board[i][j]:
        cnt+=1
        ans=max(ans,cnt)
      else:
        cnt=1
    for j in range (N):
      cnt=1
      for i in range(1,N):
        if board[i-1][j]==board[i][j]:
          cnt+=1
          ans=max(ans,cnt)
        else:
          cnt=1

for i in range(N):
  for j in range(N):
    if j+1<N:
      board[i][j], board[i][j+1]=board[i][j+1],board[i][j]
      search()
      board[i][j],board[i][j+1]=board[i][j+1],board[i][j] #원상복구
    if i+1 <N:
      board[i][j], board[i+1][j]=board[i+1][j],board[i][j]
      search()
      board[i][j], board[i+1][j]=board[i+1][j],board[i][j]

  print(ans)
```
