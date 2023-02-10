---
layout: single
title: python-study-02 python tuple
tags: python
---

## tuple  
string의 값은 item assignment를 지원하지 않는다.  
list는 가능하다  
두 개체의 차이는?  

Ownership : 프로그램이 변수에 접근할수 있는 범위  
데이터 구조나 타입은 mutable(변경가능) 하거나 immutable(변경불가능)하다  

mutable : list, dictionary, set ,and user-defined classes  
immutable : int, float, decimal, bool, string, tuple ,and range  
python이 immutable한 개체는 내용변경을 허용하지 않음  

list : Fixed-size Writeable  
tuple : Fixed-size Read-only(immutable)  
tuple은  
1. 메모리 소모가 적다  
2. 더 빠른 반복을 지원함  
3. 에러발생 가능성 감소

```python
def testTuple():
    str_list=["p","i","t","h",0,"n"]
    print(str_list[1]) # i
    print(str_list[4:]) # [0,'n']
    str_list[1]="y" # list는 mutable
    print(str_list) # ['p','y','t','h',0,'n'] list의 내용이 바뀜

    del str_list[0] # 메모리에서 지워버린다, string에서는 이렇게 못함
    print(str_list)
    return None

def main():
    testTuple()
    return None

if (__name__=="__main__"):
    main()
```

## immutable  
```python

def TestTuple():
    idx = 0
    nums= (23,-1,15,9,0,890,10,19,777)    #tuple
    nums_list= [23,-1,15,9,0,890,10,19,777]    #a list
    #print all elts
    idx = 0
    while(idx < len(nums)):
        print(nums[idx])
        idx = idx + 1


    #update the tulpe & the list
    #nums[1] = -2 #work ? => immutable
    '''
    tuple은 immutable
    nums[1] = -2
    이런 업데이트는 작동하지 않는다
    '''
    nums_list[1] = -2 #work => mutable
    print(nums_list)

    return None

# main function
def main():
    TestTuple()
    return None

# main entrance
if(__name__ == "__main__"):
    main()
```

## tuple 연산과 silcing
```python
# test

def TestTupleOp():
    evenT = (0, 2, 4, 6, 8)
    oddT = (1, 3, 5, 7, 9)
    # concatenate two tuples
    T1 = evenT + oddT
    T2 = T1 * 2 # repitition
    print(T1)
    print(T2)
    print(T1[-1]) # negative index
    print(T1[3:6])
    print(evenT > T1) #comparison 
    print(len(T1))

    print(2 in evenT) # membership check: in and not in
    return None

# main function
def main():
    TestTupleOp()
    return None

# main entrance
if(__name__ == "__main__"):
    main()
```


## tuple method
```python
# Comparison between homogeneous tuples
t1 = (1,2,3)
t2 = (1,2,4)

print(t1!=t2) #true
print(t1<t2) #true

t3 = (1,2,3,4)
t4 = (1,2,3,4,5,5)
print(t3>t4) #false
print(t3==t4) #false

# Built-in functions
print(min(t1),max(t1))
print(sum(t1))
print(len(t1))

# Tuple Methods
# tuple의 모든 요소는 변경불가 (move, delete, change)
# .sort(), .append(), .reverse() 사용불가
t2 = tuple(t4)
print(t2)
#print(dir(tuple)) #dir 내장함수는 어떤 객체를 인자로 넣어주면 해당 객체가 어떤 변수와 메소드를 가지고 있는지 나열해줍니다.
print("t4 안에 5의 개수는 : ", t4.count(5)) # 2
print("t4 안에 4의 index는 : ", t4.index(4)) # 3
# find()는 리스트, 튜플, 딕셔너리 자료형에서 사용불가. 문자열에서만 가능

# sorted() built-in function 사용가능. 정렬한것을 반환한다(리스트로...)
t6 = (1,5,3,2)
t7 = sorted(t6) #sorted(object, key, reverse=False)
print(t7)
t8 = (1,5,3,2,1)
print(t8.pop())
print(t8.reverse())
```
