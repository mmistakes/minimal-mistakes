---
layout: single
title: "알고리즘 - 팰린드룸, run, min-max, 전기버스 "
categories: 알고리즘
tag: [python, 문제, blog, github, 파이썬, 알고리즘, 기본, 기초, 팰린드룸, run, min-max, 전기버스, 멀티캠퍼스, swea, sw acdemy]
toc: true
sidebar:
  nav: "docs"
---

알고리즘 :현실의 문제를 컴퓨터가 해결하는 과정 (어떻게 해결할지 사람이 입력)

### 1. 팰린드룸


```python
# 앞에서부터 읽어도, 뒤에서부터 읽어도 같은 것을 팰린드룸이라고 한다.
word = input()

# 리스트 문법으로 뒤에서 부터 읽어와, 원래의 문자와 같은지 비교
if word == word[::-1]:
    print('뒤에서부터 읽어도 같아요.')
else:
    print('뒤에서부터 읽으면 다르네요.')
```

     aba


    뒤에서부터 읽어도 같아요.


### 2. run 구현 (ft. baby-ji 게임)


```python
# 풀이를 작성해 주세요

nums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
# 카드번호를 알려줄 list

cards = [8, 3, 2, 8, 1, 8]  # 카드숫자

# 숫자 0으로 구성된 요소 10개짜리 리스트
counts = [0 for i in range(10)]

# for문으로 vote 번호에 해당하는 list[i]를 1씩 증가시키기
for card in cards:
    counts[card] += 1

# num를 위에 표시, counts 아래 표시해서 
# triple과 run이 어떻게 나오는지 확인 할 수 있게끔 함
print(nums) 
print(counts)

for i in range(len(counts)):
    if counts[i] >= 3:
        print("tirplet") # 8이 3개 있어 triplet 

for i in range(len(counts)-2):
    if counts[i] >= 1 and counts[i+1] >= 1 and counts[i+2] >= 1:
        print("run") 
          # 1보다 큰 수가 연속으로 세개(1,2,3) 있어 run
```

    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    [0, 1, 1, 1, 0, 0, 0, 0, 3, 0]
    tirplet
    run


### 3. SWEA min max 문제


```python
# 풀이를 작성해 주세요
# max - min

# 계산반복횟수 'r' 
r = int(input())

# 반복되는 묶음은 for문으로 구현
# 결과값에 1을 표현해주기 위해 1부터 시작하되, r+1을 해줌
for i in range(1, r+1): 
    # 몇 개의 숫자를 입력할 지인데.. 표시되기만 할 뿐 입력 갯수를 제한하진 않음
    n = int(input()) 
    # 리스트 타입이어야 max 함수든, for문이든 적용이 가능함
    nums = list(map(int, input().split()))
    max = nums[0] # 첫번째 인덱스를 기준
    min = nums[0]

    # max , min 구하는 for문
    for num in nums[1:]:
        if max < num:
            max = num
        if num < min:
            min = num

    result = max - min
    # 순서와 결과값을 print
    print(f'#{i} {result}')
```

     1 
     5
     477162 658880 751280 927930 297191


    #1 630739


### 4. SWEA 전기버스 문제


```python
# step 조정을 위한 for문을 만들어줘야 한다 

# 반복횟수 입력
n = int(input())

for i in range(1, n+1):
# k(한번 충전에 이동거리), n(종점), m(충전정류장)
    k, n, m = map(int, input().split())
    # 충전소위치 입력
    charge = list(map(int, input().split()))

    bus = count = 0  # 버스위치 및 충전횟수

    # 버스위치가 종점(n)보다 크면 종료    
    while bus + k < n: 
        # k범위 안 (k=3이면 3,2,1)에서 이동했을 때, 
        for step in range(k, 0, -1):
            # 버스가 충전정류장으로 갈 수 있으면 
            if (bus + step) in charge :
                bus += step  # 버스를 step만큼 이동
                count += 1 # 충전횟수 증가
                break # for문을 종료 (step을 초기화)
        # 버스가 충전기 위치로 갈 수 없으면 count를 0으로 만들고 while문 종료
        else:
            count = 0  # chage를 0 으로 바꾸고 종료
            break

    print(f'#{i} {count}')
```

     1
     3 10 5
     1 3 7 8 9


    #1 4

