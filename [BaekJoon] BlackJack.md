```python
#블랙잭
```


```python
N,M=map(int,input().split()) #카드 장수, 한도
C=list(map(int,input().split()))
result=0

for i in range(N):
  for j in range(i+1,N):
    for k in range(j+1,N):
      sum = C[i]+C[j]+C[k]
      if sum <= M:
       result=max(result, sum)
print(result)
```


```python

```
