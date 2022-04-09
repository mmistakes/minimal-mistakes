---
layout: single
title: "파이썬(python) & 크롤링(crawling) - 015"
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


<h2>[파이썬(python) & 크롤링(crawling) - 015]</h2>


<h3> 크롤링(Crawling) 기본 - 15</h3>

<h3>크롤링(Crawling) - 여러페이지 크롤링, 엑셀로 저장</h3>
<h5>크롤링 할 페이지가 없는 경우 확인</h5>

  - HTTP 라는 프로토콜 규격에 따라서, 응답 데이터에 응답 코드(response code)를 넣어서 보내게 됨
  - requests 라이브러리의 경우, requests.get() 의 리턴변수.status_code 에서 응답 코드를 확인할 수 있음
  - HTTP 규격에 따라 응답 코드가 200 인 경우는 정상 응답, 그렇지 않으면 무언가 문제가 있다는 뜻
    - 특정 페이지 요청 후, 응답 코드가 200이면 정상, 아니면 특정 페이지가 없는 경우 또는 오류가 있는 경우임
    - https://ko.wikipedia.org/wiki/HTTP_%EC%83%81%ED%83%9C_%EC%BD%94%EB%93%9C

```python 
                import requests
                from bs4 import BeautifulSoup
                
                res = requests.get('https://크롤링할 사이트 주소')
                if res.status_code != 200:
                    print ('page not found')
                else:
                    soup = BeautifulSoup(res.content, 'html.parser')
                
                    data = soup.select('h4.list-text')
                    for item in data:
                        print (item.get_text())
                        
                # 출력값 : page not found

```
<br>
<h3>여러 페이지 크롤링</h3>
<h5>크롤링하고자 하는 사이트의 주소가 ~~~/page2, ~~~/page3의 형태로 구성되어 있는 경우</h5>

  - 첫페이지는 통상 페이지명이  ~~~/page1과 같이 작성되어 있지 않기에 2페이지부터 시작한다.
  - 따라서 이에 대해 조건문을 써서 기능을 구현한다.

```python
                import requests
                from bs4 import BeautifulSoup
                
                for page_num in range(10):
                    if page_num == 0:
                    # range(10)은 0~9까지를 의미 따라서 page_num==0은 첫번째 페이지를 의미
                        res = requests.get('https://크롤링할 사이트 주소')
                        # 만약 첫번째 페이지면 그냥 기본주소를 크롤링 대상으로 지정하는 의미
                    else:
                        res = requests.get('https://크롤링할 사이트 주소/page' + str(page_num + 1))
                        # 크롤링 주소가 기본주소가 아니면 크롤링 주소는 기본주소에 page 숫자가 추가
                    soup = BeautifulSoup(res.content, 'html.parser')
                
                    data = soup.select('h4.list-text')
                    for item in data:
                        print (item.get_text().strip())

```
<br>

<h3>크롤링 한 데이터를 openpyxl 라이브러리 활용하여 엑셀 파일에 담기</h3>
  - 확장자가 xlsx인 파일의 읽기, 저장 모두 가능
  - 설치 방법
    - 윈도우 실행 => cmd ==> pip install openpyxl 타이핑
    - 그러므로 다양한 조건 활용과 태그를 직관적으로 찾기 위해서는 find보다는 select를 사용하는 게 유리.
  - 아래와 같이 해당 라이브러리를 실행해야 적용 가능
    
```python
              import openpyxl                
              
              def write_excel_template(filename, sheetname, listdata):
                # filename: 파일명, sheetname: 시트명, listdata: 엑셀에 담을 데이터
                
                  excel_file = openpyxl.Workbook()
                  # 엑셀 파일을 생성 및 open한다는 의미
                  
                  excel_sheet = excel_file.active
                  # 기본적으로 생성된 엑셀파일 내 시트를 선택한다는 의미
                  
                  excel_sheet.column_dimensions['A'].width = 100
                  excel_sheet.column_dimensions['B'].width = 20
                  # 시트 내 각 열에 대한 가로 사이즈 조정
                  
                  if sheetname != '':
                      excel_sheet.title = sheetname
                  # 시트명이 비어있으면 그냥 넘어가고  시트 이름이 있으면 그 이름으로 시트명 저장
                                    
                  for item in listdata:
                      excel_sheet.append(item)
                      # 크롤링한 데이터가 append 함수를 이용해서 엑셀 파일 내 시트에 기록됨
                      
                  excel_file.save(filename)
                  # write_excel_template에서 받은 filename인자의 이름으로 파일을 저장 
                  # 저장위치는 jupyter로 open한 파일 위치와 동일 
                  
                  excel_file.close() 
                  # 엑셀 파일을 닫음
                      
```
<br> 

<h3>엑셀 파일을 파이썬에 읽어오기</h3>

```python
                import openpyxl
                
                excel_file = openpyxl.load_workbook('text.xlsx')
                # 파일명을 확인하고 위에 적을 것,  
                # 파일의 위치는 주피터 노트북에서 open한 파일과 동일한 위치일 경우, 파일명만 쓰면 됨.
                excel_sheet = excel_file.active
                # 엑셀 파일 내 특정 시트 선택하기 => 단 위의 내용은 엑셀 파일 내 시트가 하나인 경우 
                # excel_sheet = excel_file.get_sheet_by_name('IT뉴스') => 시트명을 이미 알고 있는 경우
                # 시트이름을 알고자 하는 경우 => excel_file.sheetnames => 출력값 예: ['상품정보']
                
                
                for data in excel_sheet.rows:
                    print(row[0].value, row[1].value)
                    엑셀 시트 내 각 행의 데이터(여기서는 첫번째행과 두번째 행)를 data라는 리스트에 담기
                
                excel_file.close()
```
<br>
<h3>urllib 라이브러리(일부 오래된 사이트 크롤링)</h3>

  - 요즘은 requests + bs4를 많이 사용하나 기존에는 urllib + bs4를 많이 사용
  - 따라서 requests 라이브러리를 사용해서 크롤링을 진행해보고, 문제가 있는 경우만, urllib 으로도 진행

```python         
                from urllib.request import urlopen
                from bs4 import BeautifulSoup
                
                res = urlopen('크롤링할 주소')
                soup = BeautifulSoup(res, 'html.parser')
                
                data = soup.select('h4.list-text')
                for item in data:
                    print (item.get_text().strip())
```
<br>

<h3>네이버 사이트 크롤링해보기</h3>

  - 네이버 국내증시, 인기 검색어 크롤링

```python         
                import requests
                from bs4 import BeautifulSoup
                
                res = requests.get('https://finance.naver.com/sise/')
                soup = BeautifulSoup(res.content, 'html.parser')
                
                # a 태그이면서 href 속성 값이 특정한 값을 갖는 경우 탐색
                data = soup.select("#popularItemList > li > a")
                
                for item in data:
                    print (item.get_text())
                    
                # 출력값
                  삼성전자
                  카카오
                  남선알미늄
                  고려아연
                  에코프로비엠
                  LG화학
                  NAVER
                  두산중공업
                  포스코케미칼
                  SK아이이테크놀로지
```
<br>

- 네이버 주요 해외지수 크롤링

```python         
                
                    import requests
                from bs4 import BeautifulSoup
                
                res = requests.get('https://finance.naver.com/sise/')
                soup = BeautifulSoup(res.content, 'html.parser')
                
                data = soup.select("div.rgt > ul.lst_major > li")
                
                for item in data:
                  print (item.find('a').get_text().strip(), item.find('span').get_text(), item.find('em').get_text())
                    
                    
                # 출력값
                  다우산업 34,583.57 상승
                  나스닥 13,897.30 상승
                  홍콩H 7,449.50 하락
                  상해종합 3,245.49 상승
                  니케이225 26,907.26 상승
```
