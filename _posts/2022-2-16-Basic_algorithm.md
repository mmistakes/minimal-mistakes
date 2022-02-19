---
layout: single
title: "알고리즘 - 스택&큐 , DFS&BFS"
categories: 알고리즘
tag: [python, 문제, blog, github, 파이썬, 알고리즘, 기본, 기초, 스택, 큐, DFS, BFS]
toc: true
sidebar:
  nav: "docs"
---
# 기본 알고리즘 정리 
- 출처 : 최적의 코딩을 결정하는 기본알고리즘 수업(멀티캠퍼스)

## 1. 스택 & 큐

### 스택과 큐

- 스택 활용 - 리스트에서 `append → pop`
- 스택 최상단부터 출력 `statck[::-1]`
- 큐는 입구가 모두 뚫려있는 터널을 연상


```python
from collections import deque 

# deque 라이브러리 -> 큐(Queue) 구현
queue = deque()

# 삽입*4, 삭제*1, 삽입*2, 삭제*1 
queue.append(5)
queue.append(2)
queue.append(3)
queue.append(7)
queue.popleft()  
	# 가장 왼쪽에 있는 데이터 꺼내기
queue.append(1)
queue.append(4)
queue.popleft()

print(queue) # 먼저 들어온 순서대로 출력
queue.reverse() # 역순으로 바꾸기
print(queue) # 나중에 들어온 원소부터 출력
```

    deque([3, 7, 1, 4])
    deque([4, 1, 7, 3])


힙(heap) 활용해야 빠름 → 복잡도 O(logN)
- 루트노드 크기에 따라 `최소 힙 vs 최대 힙`
    - `최소 힙` 가장 작은 데이터 먼저  `최대 힙`은 반대

## 2. 정렬

### 선택정렬 
- 가장 작은 데이터를 맨 앞 데이터 바꿈


```python
array = [7,5,9,0,3,1,6,2,4,8]

for i in range(len(array)):
	min_index = i 
	for j in range(i + 1, len(array)):
		if array[min_index] > array[j]:
			min_index = j
	array[i], array[min_index] = array[min_index], array[i]	# 스왓 연산
print(array)
```

    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]


### 삽입정렬 
- 하나씩 앞의 데이터와 비교해서 위치를 바꿈 


```python
array = [7,5,9,0,3,1,6,2,4,8]

for i in range(1, len(array)): 
    for j in range(i, 0, -1): # 인덱스 i부터 1씩 감소하며 반복하는 문법
        if array[j] < array[j - 1]: # 한칸씩 왼쪽으로 이동
            array[j], array[j - 1] = array[j - 1], array[j]
        else: 
            break # 자기보다 작은 데이터를 만나면 그 위치에서 멈춤
            
print(array)            
```

    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]


### 퀵정렬 
- 기준보다 큰 데이터와 작은 데이터의 위치를 바꿈

보통 첫번째 데이터를 기준(pivot)으로 분류한 뒤, 재귀적으로 반복


```python
array = [5, 7 , 9, 0, 3, 1, 6 ,2, 4, 8]

def quick_sort(array, start, end): 
    if start >= end: # 원소가 1개인 경우 종료
        return
    pivot = start # 피벗은 첫번째 원소
    left = start + 1
    right = end 
    while(left <= right):
        # 피벗보다 큰 데이터를 찾을 때까지 반복 
        while(left <= end and array[left] <= array[pivot]):
            left += 1
        # 피벗보다 작은 데이터를 찾을 때까지 반복
        while(right > start and array[right] >= array[pivot]):
            right -= 1
        if(left > right): # 엇갈렸다면 작은 데이터와 피벗을 교체
            array[right], array[pivot] = array[pivot], array[right]
        else: # 엇갈리지 않았다면 작은 데이터와 큰 데이터를 교체
            array[left], array[right] = array[right], array[left]
        # 분할 이후 왼쪽 부분과 오른쪽 부분에서 각각 정렬 수행
    quick_sort(array, start, right - 1)
    quick_sort(array, right + 1, end)
    
quick_sort(array, 0, len(array) -1)
print(array)
```

    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]



```python
array = [5, 7 , 9, 0, 3, 1, 6 ,2, 4, 8]

def quick_sort(array):
    # 리스트가 하나 이하의 원소만을 담고 있다면 종료 
    if len(array) <= 1:
        return array
    pivot = array[0] # 피벗은 첫 번째 원소
    tail = array[1:] # 피벗을 제외한 리스트 
    
    left_side = [ x for x in tail if x <= pivot ] # 분할된 왼쪽 부분 
    right_side = [ x for x in tail if x >= pivot ] # 분할된 오른쪽 부분
    
    # 분할 이후 왼쪽 부분과 오른쪽 부분에서 각각 정렬 수행하고, 전체 리스트 반환
    return quick_sort(left_side) + [pivot] + quick_sort(right_side)

print(quick_sort(array))
```

    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]


### 계수정렬 
- 인덱스를 활용해서 몇번 등장했는지 확인한 뒤 정렬
- 데이터 크기 범위가 정수로 표현가능 할 때 사용


```python
# 모든 원소의 값이 0보다 크거나 같다고 가정 
array = [7,5,9,0,3,1,6,2,9,1,4,8,0,5,2]
# 모든 범위를 포함하는 리스트 선언(모든 값은 0으로 초기화)
count = [0] * (max(array) + 1)

for i in range(len(array)):
    count[array[i]] += 1 # 각 데이터에 해당하는 인덱스의 값 증가
    
for i in range(len(count)): # 리스트에 기록된 정렬 정보 확인
    for j in range(count[i]): 
        print(i, end=' ') # 띄어쓰기를 구분으로 등장한 횟수만큼 인덱스 출력
```

    0 0 1 1 2 2 3 4 5 5 6 7 8 9 9 

### 두 배열의 원소교체 문제

a 와 b의 원소를 교체하여 a 최댓값 만들기 (최대 3회 교체 가능)  

a = [1,2,5,4,3]  -> [6,6,5,4,5]  
b = [5,5,6,6,5]  -> [3,5,1,2,5]  

1과 6 바꾸기 -> 2와 6 바꾸기 -> 3과 5바꾸기


```python
# n, k = map(int, input().split()) # n과 k 입력받기
# a = list(map(int, input().split())) # 배열 A의 모든 원소를 입력 받기
# b = list(map(int, input().split())) # 배열 b의 모든 원소 입력받기
```


```python
n = 5
k = 3 
a = [1,2,5,4,3] 
b = [5,5,6,6,5] 

a.sort() # 배열 A는 오름차순 정렬 수행
b.sort(reverse=True) # 배열 B는 내림차순 정렬 수행

# 첫 번째 인덱스부터 확인하며, 두 배열의 원소를 최대 k번 비교
for i in range(k):
    # a의 원소가 b보다 작은 경우 
    if a[i] < b[i]: 
        a[i], b[i] = b[i], a[i]
    else:
        break 
        
print(sum(a))
```

    26


## 3. DFS & BFS 

### DFS (Depth-First Search)


```python
# DFS 메서드 정의 

def dfs(graph, v, visited): 
    # 현재 노드를 방문 처리
    visited[v] = True
    print(v, end=' ')
    # 현재 노드와 연결된 다른 노드를 재귀적으로 방문
    for i in graph[v]:
        if not visited[i]: 
            dfs(graph, i, visited)
```


```python
graph = [
    [],
    [2,3,8],
    [1, 7],
    [1, 4, 5],
    [3, 5],
    [3, 4],
    [7],
    [2, 6, 8],
    [1, 7],
]

# 각 노드가 방문된 정보를 표현 (1차원 리스트)
visited = [False] * 9

# 정의된 DFS 함수 호출
dfs(graph, 1, visited)
```

    1 2 7 6 8 3 4 5 

### BFS (Breadth-First Search)


```python
from collections import deque

# BFS 메서드 정의
def bfs(graph, start, visited):
    # 큐(Queue) 구현을 위해 deque 라이브러리 사용
    queue = deque([start])
    # 현재 노드를 방문 처리
    visited[start] = True
    # 큐가 빌 때까지 반복 
    while queue: 
        # 큐에서 하나의 원소를 뽑아 출력하기
        v = queue.popleft()
        print(v, end=' ')
        # 아직 방문하지 않은 인접한 원소들을 큐에 삽입
        for i in graph[v]:
            if not visited[i]:
                queue.append(i)
                visited[i] = True
```


```python
graph = [
    [],
    [2,3,8],
    [1, 7],
    [1, 4, 5],
    [3, 5],
    [3, 4],
    [7],
    [2, 6, 8],
    [1, 7],
]

# 각 노드가 방문된 정보를 표현 (1차원 리스트)
visited = [False] * 9

# 정의된 BFS 함수 호출
bfs(graph, 1, visited)
```

    1 2 3 8 7 4 5 6 

### DFS 문제 : 아이스크림 얼려먹기

- 첫 번째 줄에 얼음 틀의 세로(4), 가로(5)가 주어짐  
- 얼음 틀에서 뚫린 부분은 0, 막힌 부분은 1 로 입력  
- 동서남북 뚫린 부분이 이어져 1개의 아이스크림이 나옴   
  (1개만 따로 뚫려있어도 1개의 아이스크림)

입력된 얼음틀에서 나오는 아이스크림 갯수를 구하시오. 


```python
# DFS로 특정 노드를 방문하고 연결된 모든 노드들도 방문
def dfs(x, y): 
    # 주어진 범위를 벗어나는 경우에는 즉시 종료
    if x <= -1 or x >= n or y <= -1 or y >= m:
        return False
    # 현재 노드를 아직 방문하지 않았다면 
    if graph[x][y] == 0:
        # 해당 노드 방문 처리
        graph[x][y] = 1 
        # 상, 하, 좌, 우 위치들도 모두 재귀적으로 호출
        dfs(x - 1, y)
        dfs(x, y - 1)
        dfs(x + 1, y)
        dfs(x, y + 1)
        return True
    return False
```


```python
# N, M을 공백으로 기준으로 입력받기
n, m = map(int, input().split())

# 2차원 리스트의 맵 정보 입력 받기
graph = []
for i in range(n):
    graph.append(list(map(int,input())))
    
# 모든 노드(위치)에 대하여 음료수 채우기
result = 0
for i in range(n):
    for j in range(m):
        # 현재 위치에서 DFS 수행
        if dfs(i, j) == True:
            result += 1

print(result) # 정답출력   

```

     4 5
     00110
     00011
     11111
     00000


    3


### BFS 문제 : 미로 탈출

- 길동이는 N x M 의 괴물의 미로에 갇혔다.  
- 현재 위치는 (1,1)이며 미로의 출구는 (N,M)에 있다.  
- 한번에 한칸씩 이동할 수 있고, 괴물이 있는 곳은 0, 없는 곳은 1로 표시 되어있다.   
  

길동이가 괴물을 피해 탈출할 때 가장 적게 움직이는 칸 수를 구하시오.   
(미로는 반드시 탈출 가능한 형태로 입력돼야함)


```python
def bfs(x,y):
    # 큐(Queue) 구현을 위해 deque 라이브러리 사용
    queue = deque()
    queue.append((x,y))
    # 큐가 빌 때까지 반복하기
    while queue:
        x, y = queue.popleft()
        # 현재 위치에서 4가지 방향으로의 위치 확인
        for i in range(4):
            nx = x + dx[i]
            ny = y + dy[i]
            # 미로 찾기 공간을 벗어난 경우 무시 
            if nx < 0 or nx >= n or ny < 0 or ny >= m:
                continue
            # 벽인 경우 무시
            if graph[nx][ny] == 0:
                continue
            # 해당 노드를 처음 방문하는 경우에만 최단 거리 기록 
            if graph[nx][ny] == 1:
                graph[nx][ny] = graph[x][y] + 1 
                queue.append((nx,ny))
    # 가장 오른쪽 아래까지 최단 거리 반환
    return graph[n - 1][m - 1]
```


```python
from collections import deque

# N, M을 공백을 기준으로 구분하여 입력 받기
n, m = map(int, input().split())
# 2차원 리스트 맵 정보 입력 받기
graph = []
for i in range(n):
    graph.append(list(map(int,input())))
    
# 이동할 네 가지 방향 정의 (상, 하, 좌, 우) 
dx = [-1, 1, 0, 0]
dy = [0, 0, -1, 1]

# BFS 수행 결과 출력
print(bfs(0,0))
```

     5 6 
     101010
     111111
     000001
     111111
     111111


    10



```python

```
