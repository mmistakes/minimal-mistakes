---
layout: single
title: python-study-01 파이썬 기초
tags: python
---

## python string method  

```python
def python_study():
    a = "Hello"
    print(a.startswith("He")) #원본 문자열이 입력한 문자열로 시작되는지> True

    print(a.endswith("lo")) #원본 문자열이 입력한 문자열로 끝나는지> True

    print(a.find("k")) #매개변수로 입력한 문자열이 존재하는 위치 앞에서부터 찾기> -1(없음)
    print(a.find("l")) # 지정 문자열 처음 위치(l이 2개 있는데 그중 앞에것) > 2
    print(a.rfind("l")) # 지정 문자열 끝 위치> 3

    print(a.count("l")) #입력한 문자열 등장횟수 세기 > 2

    
    b = "    Test    "
    print(b.lstrip())
    print(b.rstrip())
    print(b.strip()) #공백제거

    c="abb"
    print(c.isalpha()) #알파벳으로만 이루어져있는지 > T
    print(c.isnumeric()) #수로만 이루어져 있는지 > F
    print(c.isalnum()) #알파벳과 수로만 이루어져 있는지 > T
    
    d = "Hello, world"
    e = d.replace("world","korea")
    print(d,e,sep=" // ")

    
    f = "Apple, Orange, Kiwi"
    g = f.split(",")
    print(g, type(g), sep=" // ")

    h = f.upper()
    print(h)
    i = f.lower()
    print(i)


    a1 = 'my name is {0}. I am {1} years old.'.format("abc",33)
    print(a1)
    b1 = 'my name is {0}. I am {1} years old.'
    print(b1.format("3232",322))
    c1 = 'my name is {name}. I am {age} years old.'.format(name='gg',age=242)
    print(c1)
    return None

def main():
    python_study()
    return None

if(__name__=="__main__"):
    main()
```


## python list method  

```python
def python_Study():
    a = [1, 2, 3]
    a.append(4) # 끝에 새 요소 추가
    print(a)
    a.extend([4,5,6]) # 다른 리스트를 이어붙임 +와 같은기능
    print(a)

    a.insert(0,99) # 0위치에 99삽입
    print(a)
    a.insert(3,99)
    print(a)

    a.remove(99) # 매개변수로 입력한 데이터를 리스트에서 찾아 발견한 첫번째 요소를 제거
    print(a)

    print(a.pop()) # 리스트의 마지막 요소를 뽑아냄
    print(a)

    print(a.pop(2)) #2번 자리를 뽑아냄 0,1,2...
    print(a)

    print(a.index(3))
    
    #print(a.index(7))

    print(a.count(4))

    a1 = [3,4,5,1,2]
    a1.sort()
    print(a1)

    a1.sort(reverse = True) # 이름을 명시하는 매개변수, 키워드 매개변수 라고 함
    print(a1)

    b = [1,7,4,3]
    print(b)
    b.reverse() #순서를 뒤집음(반환값은 none)
    print(b)


    return None

def main():
    python_Study()
    return None

if(__name__=="__main__"):
    main()
```


## python sys.exit()  

```python
import sys
def python_study():
    print("수를 입력하세요 : ")
    a = int(input())

    '''
    if a==0:
        print("0은 나눗셈에 이용할수 없습니다")
    else:
        print('3 /',a,'=', 3/a)'''
    
    if a == 0: #if not a와 동일한 코드
        # a가 0이 아닌 어떤 숫자라면 not a는 false가 된다
        # a가 0이라면 not a는 true 가 된다
        print(not a)
        print('0은 나눗셈에 이용할수 없습니다')
        sys.exit(0)
    
    print('3 /', a ,'=', 3/a)

    return None

def main():
    python_study()
    return None

if(__name__=="__main__"):
    main()
```

## python continue, break  
```python
def python_study():
    
    for i in range(10):
        if i%2==1:
            continue #홀수일때 다음 반복으로 건너뛴다
        print(i)


    k = 0
    while True:
        print(k)
        k = k + 1
        if k == 1000:
            print('k가 {0}이 되었습니다. 반복문을 중단합니다'.format(k))
            break    

    return None

def main():
    python_study()
    return None

if(__name__=="__main__"):
    main()
```

