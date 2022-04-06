---
layout: single
title: "파이썬(python) & 크롤링(crawling) - 008"
categories: python
tag: [python, 파이썬, crawling, 크롤링]
toc: true
author_profile: false
toc: false
sidebar:
nav: "docs"
search: true
---

<center>**[공지사항]** <strong> [개인적인 공부를 위한 내용입니다. 오류가 있을 수 있습니다.] </strong></center>
{: .notice--success}


<h2>[파이썬(python) & 크롤링(crawling) - 008]</h2>


<h3> 파이썬(python) 기본 - 08</h3>

<h3>데이터 구조</h3>

### 집합(set)
  - 중괄호로도 선언은 가능하나 공식적으로는 data_set = set()로 선언한다.
  - 집합은 딕셔너리와 다르게 값(value)만 나열한다.
  - type을 확인하고자 할 때 ==> type(data_set)  ==> 출력값: set
  - 값이 하나만 있는 집합은 {}가 아닌 ()로 선언이 가능 ==> data_set = set('apple')
    - 단 두개 이상은 괄호()로 선언 불가능
    
  - 읽기 : index 번호를 지원하지 않는다 다만 반복문은 지원한다.

```python
              'nokia' in data_set
              
              # 출력값 
              False
              
              'apple' in data_set
              # 출력값 
              True              
```
<br> 

  - 집합 안에 데이터가 있는지 확인

```python
              data_dict = {'한국':'KR', '일본':'JP'}
              del data_dict['한국']
              data_dict
              
              # 출력값 
               {'일본': 'JP', '미국': 'US'}
```
<br>  

  - 합집합 ==> A | B
  - 교집합 == A & B
  - 차집합(합집합 - 교집합) ==> A - B
  - A집합에만 있거나 B집합에만 있는 데이터 추출 ==> A ^ B

```python
              # 스마트폰 생산업체
              data1 = {'apple', 'samsumg', 'lg'} 
              
              # TV 생산업체
              data2 = {'samsumg', 'lg', 'xiaomi'} 
               
              #스마트폰 또는 TV를 생산하는 업체는?(합집합)
              data1 | data2
                       
              # 출력값 
              {'apple', 'lg', 'samsumg', 'xiaomi'}
              
              
              #스마트폰과 TV를 동시에 생산하는 업체는?(교집합)
              data1 & data2
                       
              # 출력값 
              {'lg', 'samsumg'}
              
              
              #오직 스마트폰만 생산하는 업체는?(차집합)
              data1 - data2
                       
              # 출력값 
              {'lg', 'samsumg'}
                            
              
              #스마트폰과 TV 중 둘 중 하나만 생산하는 업체는?(합집합-교집합)
              data1 ^ data2
                       
              # 출력값 
              {'apple', 'xiaomi'}
        
```
<br>

  - 데이터 key만 출력 ==> list 형식으로 출력 됨

```python
              data_dict.keys()
              # 출력값
              dict_keys(['일본', '미국'])
              
              #반복문을 돌려 하나씩 출력되게 하기
              for key in data_dict.keys():
                print(key)
                
              # 출력값
                일본
                미국
```
<br>

  - 데이터 값(value)만 출력 ==> list 형식으로 출력 됨

```python
              data_dict.values()
              # 출력값
              dict_values(['JR', 'US'])
              
              #반복문을 돌려 하나씩 출력되게 하기
              for value in data_dict.values():
                print(value)
                
              # 출력값
                JR
                US
```
<br>

  - 데이터 키(key)와 값(value) 전체 출력 ==> list 형식으로 출력 됨

```python
              data_dict.items()
              # 출력값
              dict_items([('일본', 'JR'), ('미국', 'US')])
              
              #반복문을 돌려 하나씩 출력되게 하기
              for keyAndValue in data_dict.items():
                print(keyAndValue)
                
              # 출력값 ==> tuple 형식으로 출력 됨
                ('일본', 'JR')
                ('미국', 'US')
```
<br>

  - 실제로 많이 사용되는 경우는 key값을 모두 가져오고 그 key값을 모두 출력하는 것이다.

```python
              for key in data_dict.keys():
                  print(data_dict[key])
                  
              # 출력값
                JR
                US
```
<br>

  - 집합은 index 번호로 지칭되지 않기에 순서가 없고 중복이 없다.<br>list안에 중복데이터를 제거하고자 할 때 집합을 많이 사용한다.

```python
              data_list = ['apple', 'dell', 'samsung', 'apple', 'dell', 'nokia']
              
              # data_list를 집합으로 변경 시 중복값은 자동으로 제거된다.
              set(data_list)
                  
              # data_list를 다시 dataA에 담아 list 형식으로 만들기
              dataA = set(data_list)
              
              # dataA를 list 형식으로 출력하기
              list(dataA)
              
              # 출력값
              ['dell', 'samsung', 'apple', 'nokia']
```
<br>

  - number_list가 다음과 같은 리스트일 때 중복 숫자를 제거한 number_list1 집합을 만들고, 출력하세요

```python
              number_list = [5, 1, 2, 2, 3, 3, 4, 5, 5, 6, 7, 8, 9, 9, 10, 10]
              number_list1 = set(number_list)
              number_list1
              
              # 출력값
              {1, 2, 3, 4, 5, 6, 7, 8, 9, 10}
```
<br>

  - number_list2에 다음과 같은 데이터를 순서대로 추가하고, 제거하세요<br>선언: [1, 2, 3]<br>
추가: 4<br>
추가(업데이트): [5, 6]<br>
제거: 2

```python
                number_list2 = {1, 2, 3}
                number_list2.add(4) # 하나의 데이터를 추가할 때는 add
                number_list2.update([5, 6]) # 여러 데이터를 추가할 때는 리스트 형태로 update 함수를 사용
                number_list2.remove(2) # 특정 데이터를 삭제할 때는 remove
                number_list2
              
              # 출력값
              {1, 3, 4, 5, 6}
```
<br>

