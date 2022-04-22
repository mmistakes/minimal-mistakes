---
layout: single
title:  "[파이썬(Python)] open 함수"
categories: Python
tag: [Python, 파이썬, open(), 파일 읽기, 파일 쓰기]
toc: true
toc_sticky: true
---



# [파이썬(Python)] open 함수

## 1) line by line 으로 파일 읽기

f_input 이라는 변수에 파일 위치를 저장한다. 혹시라도 패스를 바꾸고 싶을 때 손쉽게 하기 위함이다. fp 라는 변수에 open() 함수 사용해 파일을 열어볼 수 있도록 저장한다. 읽을 때는 'r'이라는 인자를 넣어야 하지만 디폴트가 'r' 이기 때문에 넣지 않아도 된다. 'w'이라는 인자는 쓸 때 넣어준다.


```python
f_input = 'C:\\Users\\junho\\Desktop\\height.txt'
fp = open(f_input)
```

각 라인 별로 값을 출력하고 싶을 때는 for 문을 사용한다.


```python
for a in fp:
    print(a)
```

    4885	KNIHGR006101	161.8
    
    4886	KNIHGR006447	149.8
    
    4887	KNIHGR005811	155
    
    4888	KNIHGR001715	161.8
    
    4889	KNIHGR003156	168.1
    
    4890	KNIHGR002556	150.3
    
    4891	KNIHGR002134	168.3
    
    4892	KNIHGR002594	153.5
    
    4893	KNIHGR007449	168.8
    
    4894	KNIHGR007973	166.6
    
    4895	KNIHGR008787	152.8
    
    4898	KNIHGR003860	155.2
    
    4899	KNIHGR004443	171.1
    
    4900	KNIHGR000048	156.5
    
    4901	KNIHGR000530	162.5
    
    4902	KNIHGR008097	166.8
    
    4903	KNIHGR009059	159.7
    
    4904	KNIHGR000354	152
    
    4905	KNIHGR006138	163.7
    
    4906	KNIHGR007207	153
    
    

## 2) 리스트 형태로 데이터를 한꺼번에 읽기

readlines() 함수를 적용하면 각 라인에 대한 정보에서 \n을 추가하여 리스트 형태로 저장해 준다.


```python
f_input = 'C:\\Users\\junho\\Desktop\\height.txt'
fp = open(f_input)
print(fp.readlines())
```

    ['4885\tKNIHGR006101\t161.8\n', '4886\tKNIHGR006447\t149.8\n', '4887\tKNIHGR005811\t155\n', '4888\tKNIHGR001715\t161.8\n', '4889\tKNIHGR003156\t168.1\n', '4890\tKNIHGR002556\t150.3\n', '4891\tKNIHGR002134\t168.3\n', '4892\tKNIHGR002594\t153.5\n', '4893\tKNIHGR007449\t168.8\n', '4894\tKNIHGR007973\t166.6\n', '4895\tKNIHGR008787\t152.8\n', '4898\tKNIHGR003860\t155.2\n', '4899\tKNIHGR004443\t171.1\n', '4900\tKNIHGR000048\t156.5\n', '4901\tKNIHGR000530\t162.5\n', '4902\tKNIHGR008097\t166.8\n', '4903\tKNIHGR009059\t159.7\n', '4904\tKNIHGR000354\t152\n', '4905\tKNIHGR006138\t163.7\n', '4906\tKNIHGR007207\t153\n']
    
