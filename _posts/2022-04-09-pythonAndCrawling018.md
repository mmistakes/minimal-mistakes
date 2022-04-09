---
layout: single
title: "파이썬(python) & 크롤링(crawling) - 018"
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


<h2>[파이썬(python) & 크롤링(crawling) - 018]</h2>


<h3> 크롤링(Crawling) 기본 - 18</h3>

<h3>공공데이터 크롤링하기</h3>
<h5>공공데이터 포털(data.go.kr) 회원가입 및 크롤링하고자 하는 항목에 대한 인증키 신청를 신청한다.<br>
    중요한 점은 인증키를 받았다고 해서 바로 사용이 가능한 것은 아니다.<br>
    최소 1~3시간 이후 인증키가 정상적으로 작동된다.</h5><br>


<div align="center">
<img src="http://drive.google.com/uc?export=view&id=1g-_lCO18cM-vMWQKcutGHxxejj3MD8tq" width="800"><br><br>
<img src="http://drive.google.com/uc?export=view&id=1g1z5KdBAR2_XKpYQZBFqj7sa4W_wxtIC" width="800"><br><br>
<img src="http://drive.google.com/uc?export=view&id=1g7C48JOy_cM73sEbxCTzydoTgIjfITpI" width="800"><br><br>
<img src="http://drive.google.com/uc?export=view&id=1g9gbz1VyoAojY_8s_s5HV0rfGIZ7egKQ" width="800"><br><br>
</div>
<br>
<h3>XML 데이터 다루기</h3>
<h5>XML(Extensible Markup Language)</h5>

  - 특정 목적에 따라 데이터를 태그로 감싸서 마크업하는 범용적인 포맷임
  - 마크업 언어는 태그 등을 이용하여 데이터의 구조를 기술하는 언어의 한 가지로 가장 친숙한 마크업 언어가 HTML임
  - XML은 HTML과 마찬가지로 데이터를 계층 구조로 표현함
  - XML 기본 구조:  <태그 열기 속성="속성값">내용</태그 닫기>
  - 태그와 속성은 특정 목적에 따라 임의로 이름을 정해서 사용
  - 다른 요소와 그룹으로 묶을 수도 있음

``` xml
            <products type="전자제품>
              <product id="M001" price="300000">32인치 LCD 모니터</product>
              <product id="M002" price="210000">24인치 LCD 모니터</product>
            </products>
            
``` 

<br>

<h5>크롤링 한 로우데이터가 XML 포맷인경우 find_all이나 find 함수를 이용하여 출력한다. </h5>
```python 

                import requests
                from bs4 import BeautifulSoup # XML도 BeautifulSoup 사용
                
                service_key = '자신의 서비스 키'
                params = '&numOfRows=10&pageNo=1&sidoName=서울&searchCondition=DAILY'
                open_api = 'http://openapi.airkorea.or.kr/openapi/services/rest/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty?ServiceKey=' + service_key + params
                
                res = requests.get(open_api)
                soup = BeautifulSoup(res.content, 'html.parser') # html.parser 이용
                
                data = soup.find_all('item') # CSS가 아닌 HTML tag이기에 find_all과 find 함수 이용
                for item in data:
                    stationname = item.find('stationname')
                    pm10grade = item.find('pm10grade')
                    print (stationname.get_text(), pm10grade.get_text())

```
<br>
