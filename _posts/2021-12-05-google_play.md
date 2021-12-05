---
layout: single
title:  "구글 플레이 크롤링 후 슬랙에 내용 보내기"
categories : Python
tag : [python, pandas, 크롤링]
---





```python
from selenium import webdriver
import pandas as pd
from bs4 import BeautifulSoup
from datetime import datetime, timedelta


#최고 매출 순위 크롤링
url = 'https://play.google.com/store/apps/collection/cluster?clp=0g4YChYKEHRvcGdyb3NzaW5nX0dBTUUQBxgD:S:ANO1ljLhYwQ&gsr=ChvSDhgKFgoQdG9wZ3Jvc3NpbmdfR0FNRRAHGAM%3D:S:ANO1ljIKta8&hl=ko&gl=KR'

driver = webdriver.Chrome()

driver.get(url)

result_html = driver.page_source
result_soup = BeautifulSoup(result_html, 'html.parser')

texts = result_soup.findAll('div', {'class':'WsMG1c nnK0zc'})


title_list=[]

for i in texts:
    title_list.append(i.text)



app_list = pd.DataFrame(title_list)
app_list['순위'] = (app_list.index + 1)
app_list.columns =['최고 매출','순위']

app_list = app_list[['순위','최고 매출']]

driver.close()


#인기 순위 크롤링
popular_url = ' https://play.google.com/store/apps/collection/cluster?clp=0g4cChoKFHRvcHNlbGxpbmdfZnJlZV9HQU1FEAcYAw%3D%3D:S:ANO1ljJ_Y5U&gsr=Ch_SDhwKGgoUdG9wc2VsbGluZ19mcmVlX0dBTUUQBxgD:S:ANO1ljL4b8c&hl=ko&gl=KR'

web_driver = webdriver.Chrome()

web_driver.get(popular_url)

popular_result_html = web_driver.page_source
popular_result_soup = BeautifulSoup(popular_result_html, 'html.parser')

popular_texts = popular_result_soup.findAll('div', {'class':'WsMG1c nnK0zc'})


popular_title_list=[]

for i in popular_texts:
    popular_title_list.append(i.text)

popular_app_list = pd.DataFrame(popular_title_list)
popular_app_list.columns =['인기 앱/게임']

web_driver.close()


#앱 리스트 만들기
app_list = pd.concat([app_list, popular_app_list], axis =1, ignore_index=True)

app_list.columns =['순위','최고 매출', '인기 앱/게임']

#슬랙에 보낼 순위는 30위까지
message = app_list[:30]



#슬랙에 보내기
import slack
from slacker import Slacker
from tabulate import tabulate

text = tabulate(message, headers ='keys', tablefmt='presto', showindex=False)

slack_token = "슬랙토큰"

slack = Slacker(slack_token)

today = datetime.today()
today = today.strftime("%Y-%m-%d")

slack.chat.post_message("#슬랙채널", str(f'{today}') + " `구글 순위 Top 30`", as_user=True)
slack.chat.post_message("#슬랙채널", text, as_user=True)
```



hj_bot이라는 슬랙봇 미리 만들어 두고

hj_bot의 슬랙 토큰 사용

![image-20211205194346763](../../img/2021-12-05-google_play/image-20211205194346763.png)





p.s. 21년12월에 구글 플레이 UI 변경으로 코드 수정 필요