### 팩토리얼
```python
#10872
def fact(N):
  if N==1:
     return 1
  return N*fact(N-1)

N=int(input())
print(fact(N))

#N=5\n",
# 5*fact(4)\n",
#    =>4*fact(3)\n",
#         => 3*fact(2)\n",
#              =>2*fact(1)\n",
#                   =>1\n",
# => 5*4*3*2*1"
```


### 피보나치 수열
```python
#10870 
def p(n):
  if n<=1:
    return n
  else:
    return p(n-1)+p(n-2) #재귀 (결국 1과 0만 리턴, )
n=int(input())
print(p(n))
```


### 별찍기
```python
#2447 -> 질문 확인
def draw_star(n) :
    global Map
    
    if n == 3 :
        Map[0][:3] = Map[2][:3] = [1]*3
        Map[1][:3] = [1, 0, 1]
        return

    a = n//3
    draw_star(n//3)
    for i in range(3) :
        for j in range(3) :
            if i == 1 and j == 1 :
                continue
            for k in range(a) :
                Map[a*i+k][a*j:a*(j+1)] = Map[k][:a] #이해 안감
N = int(input())      

# 메인 데이터 선언
Map = [[0 for i in range(N)] for i in range(N)]

draw_star(N)

for i in Map :
    for j in i :
        if j :
            print('*', end = '')
        else :
            print(' ', end = '')
    print()
```

### 하노이탑
```python
def hanoi(n, a, b):
    if n > 1:
        hanoi(n-1, a, 6-a-b)              # 기둥이 1개 이상이면 그룹으로 묶인 n-1개 원판을 중간으로 먼저 다 옮긴다
    print(a, b)
    if n > 1:
        hanoi(n-1, 6-a-b, b)              #기둥의 역할 변경(a->보조)
n = int(input())

print(2**n -1)                               #총 이동해야 하는 횟수
hanoi(n, 1, 3) 
```
