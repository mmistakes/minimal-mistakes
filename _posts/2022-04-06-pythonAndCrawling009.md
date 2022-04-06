---
layout: single
title: "파이썬(python) & 크롤링(crawling) - 009"
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


<h2>[파이썬(python) & 크롤링(crawling) - 009]</h2>


<h3> 파이썬(python) 기본 - 09</h3>

<h3>사용 예제</h3>
    
  - 리스트에 있는 숫자를 역 방향으로 출력(단, 리스트에 있는 숫자들은 한 라인에 하나씩 출력)

```python
              data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
              
              data.reverse()
              
              for item in data:
                  print (item)
              
              # 출력값 
                10
                9
                8
                7
                6
                5
                4
                3
                2
                1            
```
<br> 

  - 리스트에서 확장자를 제거하고 파일 이름만 출력

```python
              filelist = ['exercise01.docx', 'exercise02.docx', 'exercise03.docx', 'exercise04.docx', 'exercise05.docx']
              
              for filename in filelist:
                filelist_item = filename.split(".")
                print (filelist_item[0])
              
              # 출력값 
                exercise01
                exercise02
                exercise03
                exercise04
                exercise05         
```
<br> 

  - 리스트에서 확장자가 .txt 인 파일만 리스트를 출력

```python
              filelist = ['exercise01.docx', 'exercise02.csv', 'exercise03.txt', 'exercise04.hwp']
              
              for filename in filelist:
                if filename.split(".")[1] == 'txt':
                  print (filename)
              
              # 출력값 
                exercise03.txt     
```
<br> 

  - prices 변수는 100 ~ 999 달러 까지 입력이 가능하고 원화 환률은 1112원이다.<br>달러 금액을 입력받아 원화로 출력 

```python
              prices = input()
              
              if prices[4:] == '달러':
                  print (int(prices[:4]) * 1112, '원')
              
              # 출력값(100 입력 시)
                111200 원                    
```
<br>

  - 달러 또는 위안 금액을 입력받은 후 원화로 계산, 입력받는 숫자는 100~999<br>
    금액과 통화명 사이에 공백을 넣어 입력하고 환률은 달러는 1112원, 위안은 171원

```python
              prices = input()
              
              if prices[4:] == '달러':
                  print (int(prices[:4]) * 1112, '원')
              elif prices[4:] == '위안':
                  print (int(prices[:4]) * 171, '원')
              
              # 출력값(110 달러 입력 시)
                122320 원                    
```
<br> 

  - 통화단위와 원화 환율을 가진 딕셔너리로 만들고 사용자로부터 달러, 엔, 또는 위안 금액을 입력받는다<br> 
    이 금액을 원으로 바꿔서 계산한다. 사용자는 100 ~ 999 달러, 위안, 또는 엔 과 같이 금액과 통화명 사이에<br> 공백을 넣어 입력한다.<br> ※ 환율 기준(달러: 1112원, 위안: 171원, 엔: 1010원)

```python
                exchange = {'달러':1112, '위안':171, '엔':1010}
                prices = input()
                for exchange_item in exchange.keys():
                    if prices[4:] == exchange_item:
                        print (int(prices[:4]) * exchange[exchange_item], '원')
              
              # 출력값(100 달러 입력 시)
                111200 원                    
```
<br> 


  - 구구단을 2단부터 9단까지 한줄씩 출력하세요

```python
                for index1 in range(2, 10):
                    for index2 in range(1, 10):
                        print (index1, "X", index2, "=", index1 * index2)
              
              # 출력값
                2 X 1 = 2
                2 X 2 = 4 
                ~~~   ~~~
                9 X 8 = 72
                9 X 9 = 81                
```
<br> 

  - 위의 출력된 구구단에서 계산값이 짝수인 경우에만 출력

```python
                for index1 in range(2, 10):
                    for index2 in range(1, 10):
                      if(index1 * index2) % 2 == 0: 
                        print (index1, "X", index2, "=", index1 * index2)
              
              # 출력값
                2 X 1 = 2
                2 X 2 = 4 
                ~~~   ~~~
                9 X 6 = 54
                9 X 8 = 72                
```
<br> 

  - 동과 호를 배분하여 출력하되 동 사이에는 하나의 공백라인 삽입

```python
                dongs = ["6209동", "6208동", "6207동"]
                hos = ["101호", "102호", "103호", "104호"]
                
                for dong in dongs:
                    for ho in hos:
                        print (dong, ho)
                    print ("\n")
              
              # 출력값
                6209동 101호
                6209동 102호
                6209동 103호
                6209동 104호
                
                
                6208동 101호
                6208동 102호
                6208동 103호
                6208동 104호
                
                
                6207동 101호
                6207동 102호
                6207동 103호
                6207동 104호           
```
<br> 

  - a, b, c, d, e를 저장하는 튜플을 만들고 첫 번째 튜플값과 마지막 번째 튜플값을 출력

```python
                data = ('a', 'b', 'c', 'd', 'e')
                print (data[0], data[-1])
              
              # 출력값
                a e      
```
<br> 

  - a, b, c, d, e를 저장하는 튜플을 만들고 첫 번째 튜플값과 마지막 번째 튜플값을 출력

```python
                data = ('a', 'b', 'c', 'd', 'e')
                print (data[0], data[-1])
              
              # 출력값
                a e      
```
<br> 