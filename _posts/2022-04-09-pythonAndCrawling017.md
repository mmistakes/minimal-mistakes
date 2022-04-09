---
layout: single
title: "파이썬(python) & 크롤링(crawling) - 017"
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


<h2>[파이썬(python) & 크롤링(crawling) - 017]</h2>


<h3> 크롤링(Crawling) 기본 - 17</h3>

<h3>네이버 Open API 실제 크롤링하기</h3>

```python 

                import requests
                import pprint
                # pprint는 결과값을 좀 더 보기 좋게 출력해 줌
                
                client_id = '자신의 인증키 기입'
                client_secret = '자신의 Secret 기입'
                
                naver_open_api = 'https://openapi.naver.com/v1/search/shop.json?query=에스프레소'
                header_params = {"X-Naver-Client-Id":client_id, "X-Naver-Client-Secret":client_secret}
                res = requests.get(naver_open_api, headers=header_params)
                # 크롤링한 로우 데이터를 보려면 res.json()하고 shift+enter로 확인 가능
                
                if res.status_code == 200:
                    data = res.json()
                    for index, item in enumerate(data['items']):
                        print (index + 1, item['title'], item['link'])
                else:
                    print ("Error Code:", res.status_code)
                    
                    
                # 출력값
                  1 일리 캡슐 커피(네스프레소 호환 스타벅스 로르 네스카페) 개별포장 8개 https://search.shopping.naver.com/gate.nhn?id=80217165369
                  2 1kg 커피창고 에티오피아 예가체프 케냐AA 콜롬비아 수프리모 과테말라 안티구아 브라질 디카페인 이든 블랜드 드립 <b>에스프레소</b> 분쇄 당일 로스팅 맛있는 고소한 원두 커피 홀빈 가루 https://search.shopping.naver.com/gate.nhn?id=12126547821
                  3 일리 캡슐 커피 (네스프레소 호환 캡슐 스타벅스 캡슐 라바짜) 10 18 21 개별포장 https://search.shopping.naver.com/gate.nhn?id=82330465832
                  4 일리 캡슐 커피 <b>에스프레소</b> 아메리카노 필터캡슐 18개입 과테말라 인텐소 디카페인 https://search.shopping.naver.com/gate.nhn?id=82667959707
                  5 동서식품 스타벅스 더블샷 <b>에스프레소</b>앤크림 200ml https://search.shopping.naver.com/gate.nhn?id=6806810879
                  6 네스프레소 버츄오 캡슐 43종 전제품 입고 https://search.shopping.naver.com/gate.nhn?id=83365643857
                  7 매일유업 바리스타룰스 250ml x 10개입 5종 컵커피 바리스타 <b>에스프레소</b>라떼 카페라떼 https://search.shopping.naver.com/gate.nhn?id=81412716875
                  8 라바짜 스타벅스 네스프레소 호환 캡슐 커피 <b>에스프레소</b> 디카페인 골라담기 https://search.shopping.naver.com/gate.nhn?id=82919331611
                  9 JARDIN 쟈뎅 <b>에스프레소</b> 스틱 콜롬비아 수프리모 로얄 헤이즐넛 1g x 100개입 https://search.shopping.naver.com/gate.nhn?id=13721791049
                  10 네스프레소 버츄오 캡슐 플러스 넥스트 커피 디카페인 <b>에스프레소</b> 라떼 거품커피 카푸치노 https://search.shopping.naver.com/gate.nhn?id=82922697114  
    
```
<br>
<h3>크롤링한 데이터를 엑셀파일로 저장하기</h3>

```python 

                import requests
                import openpyxl
                
                client_id = '자신의 인증키
                client_secret = '자신의 Secret'
                start, num = 1, 0
                
                excel_file = openpyxl.Workbook()
                excel_sheet = excel_file.active
                excel_sheet.column_dimensions['B'].width = 100
                excel_sheet.column_dimensions['C'].width = 100
                excel_sheet.append(['랭킹', '제목', '링크'])
                
                for index in range(10):
                    start_number = start + (index * 100)
                    naver_open_api = 'https://openapi.naver.com/v1/search/blog?query=에스프레소&display=100&start=' + str(start_number)
                    header_params = {"X-Naver-Client-Id":client_id, "X-Naver-Client-Secret":client_secret}
                    res = requests.get(naver_open_api, headers=header_params)
                    if res.status_code == 200:
                        data = res.json()
                        for item in data['items']:
                            num += 1
                            excel_sheet.append([num, item['title'], item['link']])
                    else:
                        print ("Error Code:", res.status_code)
                
                excel_file.save('espresso.xlsx')
                excel_file.close()

```
<br>
