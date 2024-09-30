```python
#4948 베르트랑 공준
def countPrime(a):
    count = 0
    for i in range(a, 2*a):
        c = is_Prime(i)
        if c == True: count = count + 1
    return count

def is_Prime(n):
    a_prime = True
    for i in range(2, n):
        if n%i == 0:
            a_prime = False
    return a_prime
    
while(True):
    count = 0
    a = int(input())
    if a == '0': break
    else: count += countPrime(a)
    print(count)


```

     1
    

    1
    

     10
    

    4
    

     13
    

    4
    

     100
    

    21
    

     1000
    

    135
    

     10000
    

    1033
    

     100000
    


```python
import random
```


```python
words =['h','o','n','g','s','h','i','n','y','e','o','n','g']
random.shuffle(words)
print(words)
```

    ['n', 'e', 'i', 'n', 's', 'h', 'o', 'g', 'n', 'h', 'g', 'o', 'y']
    


```python

```


```python
def solution(nums):
    answer = 0
    l = len(nums)
    pocketmons = {} #dic {포켓몬 번호 : 개수}
    for i in nums:
        if i in pocketmons:
            pocketmons[i] += 1 #키가 있다면 개수 + 1
        else:
            pocketmons[i] = 1 #키가 없다면 1로 초기화

    # 포켓몬 키 값 개수(중복 없음)
    answer = len(pocketmons.keys())
    
    #구한 값이 l/2와 같거나 크다면 l/2가 답
    if answer >= l/2: 
        answer = l/2
        
    return answer

```


```python

```
