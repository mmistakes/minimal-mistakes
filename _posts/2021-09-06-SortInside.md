### [백준 1427] 소트인사이드

```python
N=input()
li=[]

for i in range(len(N)):
  li.append(N[i])

li.sort(reverse=True)
#reverse=True : 내림차순 정렬

for i in li:
  print(i,end='')
```
