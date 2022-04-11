---
layout: single
title: "파이썬(python) & 크롤링(crawling) - 021"
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


<h2>[파이썬(python) & 크롤링(crawling) - 021]</h2>


<h3> 크롤링(Crawling) 기본 - 21</h3>

<h3>크롤링 실습</h3>
<h5>G마켓의 베스트상품 크롤링해보기</h5><br>
<div align="center">
<img src="http://drive.google.com/uc?export=view&id=1gErzAI9japvVSl9UqlgXEtWu0Vm-GR3b"><br><br>
<img src="http://drive.google.com/uc?export=view&id=1gG6jpbtuXsODyk0ihe4aKuRBCoZv6ge1" width="900px"><br><br>
<img src="http://drive.google.com/uc?export=view&id=1gKUvTBs_PBAJ7QmbRGKMMLCPYnL5hjCj" width="900px" ><br><br>
<img src="http://drive.google.com/uc?export=view&id=1gLs9nQxeR151jR3AMPuXmiV1IGEFwdgu" width="900px"><br><br>
<img src="http://drive.google.com/uc?export=view&id=1gNeYpjzqhkxWKswoJ4qnR1SuujbKxQuT" width="900px"><br><br>
<img src="http://drive.google.com/uc?export=view&id=1gTxE1ha5Qqr8NWZywl2SWYAyH0BhbhrB" width="900px"><br><br>

<img src="http://drive.google.com/uc?export=view&id=1gZP4rPIx_3J9xAsSGKekt_ZAxvTZyByu" width="900px"><br><br>
<img src="http://drive.google.com/uc?export=view&id=1get6iIPAaz7-JMzItJiWGs0JnZlhm5wA" width="900px"><br><br>
<img src="http://drive.google.com/uc?export=view&id=1gdM3S5ZYSbXgrtKLhVuj04gMSs67W95u" width="900px"><br><br>
<img src="http://drive.google.com/uc?export=view&id=1gjlaYVBrBJq03N3zIEmfQH3DdqxKt3pr" width="900px"><br><br>
<img src="http://drive.google.com/uc?export=view&id=1gmFX6SapXmITQJ7N6Vpd9Gv_X0rQcHyK" width="900px"><br><br>
<img src="http://drive.google.com/uc?export=view&id=1gvqdWBf4bMmzPDdZ9bzfF_kr-_KjGhvv" width="900px"><br><br>

</div>
<br><br>

```python

                import requests, openpyxl
                from bs4 import BeautifulSoup
                
                excel_file = openpyxl.Workbook()
                excel_sheet = excel_file.active
                excel_sheet.append(['랭킹', '상품명', '판매가격', '상품상세링크', '판매처'])
                excel_sheet.column_dimensions['B'].width = 80
                excel_sheet.column_dimensions['C'].width = 20
                excel_sheet.column_dimensions['D'].width = 80
                excel_sheet.column_dimensions['E'].width = 20
                
                
                res = requests.get('http://corners.gmarket.co.kr/Bestsellers?viewType=G&groupCode=G07')
                soup = BeautifulSoup(res.content, 'html.parser')
                bestlists = soup.select('div.best-list')
                bestitems = bestlists[1]
                products = bestitems.select('ul > li')
                
                for index, product in enumerate(products):
                    title = product.select_one('a.itemname')
                    price = product.select_one('div.s-price > strong')
                    
                    res_info = requests.get(title['href'])
                    soup_info = BeautifulSoup(res_info.content, 'html.parser')
                    provider_info = soup_info.select_one(' div.item-topinfo_headline > p > span.text__seller > a')
                    
                    print (index + 1, title.get_text(), price.get_text(), title['href'], provider_info.get_text())
                
                    excel_sheet.append([index + 1, title.get_text(), price.get_text(), title['href'], provider_info.get_text()])
                    excel_sheet.cell(row=index+2 , column=4).hyperlink = title['href']
                        
                excel_file.save('GMARKET_BestFood100.xlsx')
                excel_file.close()
                
```