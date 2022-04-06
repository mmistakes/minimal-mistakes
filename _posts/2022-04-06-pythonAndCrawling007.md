---
layout: single
title: "파이썬(python) & 크롤링(crawling) - 007"
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


<h2>[파이썬(python) & 크롤링(crawling) - 007]</h2>


<h3> 파이썬(python) 기본 - 07</h3>

<h3>데이터 구조</h3>

### dictionary
  - 중괄호로 선언하며 key와 value로 구성된다.
    - data_dict = { '한국':'KR', '일본':'JP'}
  - 변수명(key)을 읽고자 할 때
    - data_dict['한국']  ==>  출력값: 'KR'
  - 데이터 추가 : 변수명['새로운 키'] = '새로운 값'  

```python
              data_dict = {'한국':'KR', '일본':'JP'}
              data_dict['미국'] = 'US'
              data_dict
              
              # 출력값 
               {'한국': 'KR', '일본': 'JP', '미국': 'US'}
```
<br> 

  - 데이터 삭제 : del 변수명['삭제할 키'] 

```python
              data_dict = {'한국':'KR', '일본':'JP'}
              del data_dict['한국']
              data_dict
              
              # 출력값 
               {'일본': 'JP', '미국': 'US'}
```
<br>  

  - 데이터 수정 : 변수명['수정할 키'] = '수정값' 

```python
              data_dict
              # 출력값
               {'일본': 'JP', '미국': 'US'}
               
              data_dict['일본'] = 'JR'
              data_dict
              
              # 출력값 
               {'일본': 'JR', '미국': 'US'}
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


  - data 전체 출력하기, key값만, value값만은 리스트로 출력해보기<br>
    environment: 환경<br>
    company: 회사<br>
    government: 정부<br>
    face: 얼굴<br>

```python
                data = {'environment': '환경', 'company': '회사', 'government': '정부, 정치', 'face': '얼굴'}
                
                keys = data.keys()
                values = data.values()
                
                print (data)
                print (list(keys))
                print (list(values))
                  
              # 출력값
                {'environment': '환경', 'company': '회사', 'government': '정부', 'face': '얼굴'}
                ['environment', 'company', 'government', 'face']
                ['환경', '회사', '정부', '얼굴']
```
<br>


  - 반복문을 이용해서 한 줄에 하나씩 출력해보기<br>
    environment: 환경<br>
    company: 회사<br>
    government: 정부<br>
    face: 얼굴<br>

```python
                data = {'environment': '환경', 'company': '회사', 'government': '정부, 정치', 'face': '얼굴'}
                
                for item in data.keys():
                print (item, ":", data[item])
                    
              # 출력값
                environment: 환경
                company: 회사
                government: 정부
                face: 얼굴
```
<br>


  - 아래 데이터를 딕셔너리 변수로 만들고 외움표시가 X 인 영단어만 출력<br>

     영단어&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;       의미     암기여부  
    environment 환경     &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;X <br>
    company &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;회사         &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;O<br>
    government&nbsp; 정부      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;X<br>
    face &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;얼굴            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;X<br><br>
    ※ 출력값<br>
    environment<br>
    government<br>
    face
  


```python
                data = {'environment': ['환경', 'X'], 'company': ['회사', 'O'], 'government': ['정부', 'X'], 'face': ['얼굴', 'X']}
                
                for item in data.keys():
                    data_list = data[item]
                    if data_list[1] == 'X':
                        print (item)
                    
              # 출력값
                environment
                government
                face
```
<br>

  - 아래 데이터를 딕셔너리 변수로 만들고 사용자로부터 영어단어를 입력받으면 해당 영어단어의 외움표시를 O로 수정하고, 외움표시가 X 인 단어만 출력<br>

    - 영단어&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;       의미     암기여부  
    - environment 환경     &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;X <br>
    - company &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;회사         &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;O<br>
    - government&nbsp; 정부      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;X<br>
    - face &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;얼굴            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;X<br><br>

```python
                data = {'environment': ['환경', 'X'], 'company': ['회사', 'O'], 'government': ['정부', 'X'], 'face': ['얼굴', 'X']}
                
                english = input()
                if english in data.keys():  # 입력 단어가 딕셔너리에 없을 때 발생할 수 있는 에러방지를 위해 삽입한 코드
                    data[english][1] = 'O'
                
                for item in data.keys():
                    data_list = data[item]
                    if data_list[1] == 'X':
                        print (item)
                    
              # 출력값
                사용자 입력: environment
                결과값: government
                       face
```
<br>