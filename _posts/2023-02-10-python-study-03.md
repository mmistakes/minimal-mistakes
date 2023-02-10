---
layout: single
title: python-study-03 python dictionary
tags: python
---

## dictionary  
단일 변수에 많은 값을 갖도록 허용
정렬되지 않은 collection이다. each value with its own label
영어사전을 찾는것과 같다. commend > c부터 하나씩 찾아들어간다.> 마지막에 찾으면 뜻 1,2,3
정수 인덱스 대신 키워드를 사용하여 찾음

java.util.HashMap in java
std::map in C++
std::collections::HashMap in Rust

The dictionary data type models a super fast searchable collection of (key-values) items
키값은 중복될수 없다(집합과 똑같음)
Keys must be immutable and hashable

```python
def testDict():
    dict1 = {
        # key : values
        "Sicario" : [2015],
        "Arrival" : "2016",
        "Blade Runner 2049" : 2017,
        "Dune" : 2021
    }
    dict2 = {
        2021 : ["Dune", "Gray man", "starwars"],
        2019 : ("Sicario","Arrival")
    }
    print("dict1:items =>", dict1.items())
    list1 = dict1.items()
    # print("list1[1]", list1[1]) #실제 리스트로 받는게 아니라서 슬라이싱 불가, 실행 창에서도 dict_items()타입으로 받는것 확인가능
    print("list1[1]", type(list1)) #실제 리스트롤 받아서 막 바꿔버리면 dictonary의 의미가 없어서...

    print("dict2:keys =>", dict2.keys())
    print("dict1:values =>", dict1.values())
    print("Values = ", dict2.get(2021)) #value를 리스트로 받아온다, 조작가능. key는 조작불가

    return None

def main():
    testDict()
    return None

if(__name__ == "__main__"):
    main()
```

## dictionary unpacking  
```python
def doDict():
    dict1 = {"a" : 1, "b" : 253, "c" : 356, "d" : 407} # 집합기호 => 순서는 상관x
    dict2 = dict([("e", 654), ("f", 906)]) # tuple쌍을 list로 감싼 dict 형식도 가능하다

    #check if a key in a dictonary
    a_key = "a" in dict1
    print(a_key) #true
    a_value = 1 in dict1
    print(a_value) #안됨 false
    # 사전에 없는 키값을 찾으면 에러가 나온다 dict1["aaa"]=> keyerror


    # add a element to dict1
    # dict2 <= ("d" : 0001) error 키값은 중복될수 없다
    print("Before: ", dict1)
    dict1["g"] = 1510 # update
    print("After: ", dict1)
    dict1["g"] = 1519 # 이건 update
    print("AAfter: ", dict1)
    # delete : dict2 = dict([("e", 654), ("f", 906)]) => dict([("e", 654)])
    del dict1["g"] # 명령어라고 생각하기
    print("AAAfter: ", dict1)
    del dict2 # delete


    #list up
    #for [k,v] in dict1.items(): 이것도 가능하지만 key, value 값 날아갈수 있음
    # unpacking of all dictionary items into
    # a pair of key and value
    for k,v in dict1.items():
        print("(key= ", k,"Value= ", v, ")")

    
    dict1 = {"a" : 1, "b" : 253, "c" : 356, "d" : 407}
    dict1.update({"aa":11})
    print(dict1) 
    #>> {'a': 1, 'b': 253, 'c': 356, 'd': 407, 'aa': 11}
    return None

def main():
    doDict()
    return None

if (__name__ == "__main__"):
    main()
```

## dictionary method  
```python
dict1 = {"a" : 1, "b" : 253, "c" : 356, "d" : 407} # 집합기호 => 순서는 상관x
dict2 = dict([("e", 654), ("f", 906)]) # tuple쌍을 list로 감싼 dict 형식도 가능하다

# method : dict_name.keys()
print(dict1.keys()) # Returns a list containing the dictionary’s keys(실제 리스트는 아니라서 슬라이싱 불가)
# method : dict_namee.values()
print(dict1.values()) # Returns a list of all the values in the dictionary
# method : dict_name.get(key_value)
print(dict1.get('a')) # 1 (키 'a' 의 value는 1, value는 가져와서 조작가능, key는 불가)
print(dict1.get(1)) # None (키 1은 없음, Returns the value of the specified key)
# method : dict_name.items()
print(dict1.items()) # Returns a list containing a tuple for each key value pair


# method: pop, popitem, copy
dict1.pop("a")
print(dict1)
dict1.popitem() #delete the last item
print(dict1)
dict3 = dict1.copy()
print(dict3)
dict4 = dict1
print(dict4)
dict2.clear()
print(dict2)

#update
d1 = { "a":1, "b":2 }
d2 = { "c":3 }
#d3 = d1 + d2 불가능, key 겹칠경우 우선순위를 알수가 없게되므로 update 사용
d3 = dict()
d3.update(d1)
d3.update(d2)
print(d3)


# list(enumerate(['A', 'B', 'C'])) 
# enumerate() 함수는 인자로 넘어온 목록을 기준으로 인덱스와 원소를 차례대로 접근하게 해주는 반복자(iterator) 객체를 반환해주는 함수
# >> [(0, 'A'), (1, 'B'), (2, 'C')]
```

