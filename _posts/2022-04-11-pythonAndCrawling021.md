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
<h5>G마켓의 베스트상품 크롤링해보기</h5>
<div align="center">
<img src="http://drive.google.com/uc?export=view&id=1gErzAI9japvVSl9UqlgXEtWu0Vm-GR3b"><br><br>
<img src="http://drive.google.com/uc?export=view&id=1gG6jpbtuXsODyk0ihe4aKuRBCoZv6ge1" width="800px"><br><br>
<img src="http://drive.google.com/uc?export=view&id=1gKUvTBs_PBAJ7QmbRGKMMLCPYnL5hjCj" width="800px" ><br><br>
<img src="http://drive.google.com/uc?export=view&id=1gLs9nQxeR151jR3AMPuXmiV1IGEFwdgu" width="800px"><br><br>
<img src="http://drive.google.com/uc?export=view&id=1gNeYpjzqhkxWKswoJ4qnR1SuujbKxQuT" width="800px"><br><br>
<img src="http://drive.google.com/uc?export=view&id=1gTxE1ha5Qqr8NWZywl2SWYAyH0BhbhrB" width="800px"><br><br>
</div>
<br><br>

```python

                import requests
                from bs4 import BeautifulSoup
                res=requests.get('http://corners.gmarket.co.kr/Bestsellers?viewType=G&groupCode=G07')
                soup = BeautifulSoup(res.content, 'html.parser')
                bestlists = soup.select('div.best-list')
                bestItems = bestlists[1]
                products = bestItems.select('ul > li')
                for index, product in enumerate(products):
                    title = product.select_one('a.itemname')
                    price = product.select_one('div.s-price > strong')
                    print(index+1, title.get_text(), price.get_text())
                
```