---
layout: single
title:  "네이버 블로스 API 활용예제 "
categories: coding
tag: [python, blog, jekyll]
---




```python
import os
import sys
import urllib.request
import pandas as pd
import json
import re

client_id = "XyBx9tytLniDDiCmtiVB"
client_secret = "vvaU6zjoZD"

query = urllib.parse.quote(input("검색 질의: "))
idx = 0
display = 10
start = 1
end = 10
sort = "sim"

blog_df = pd.DataFrame(columns=("Title","Link","Description","Blogger Name", "Blogger Link", "Post data"))

for start_index in range(start, end, display):

    url = "https://openapi.naver.com/v1/search/blog?query=" \
    + query + "&display="+str(display) \
    + "&start="+str(start_index) \
    + "&sort=" + str(sort)

    request = urllib.request.Request(url)
    request.add_header("X-Naver-Client-Id",client_id)
    request.add_header("X-Naver-Client-Secret",client_secret)
    response = urllib.request.urlopen(request)
    rescode = response.getcode()

    if(rescode==200):
        response_body = response.read()
        response_dict = json.loads(response_body.decode('utf-8'))
        items = response_dict['items']
        for item_index in range(0,len(items)):
            remove_tag = re.compile('<.*?>')
            title = re.sub(remove_tag,'',items[item_index]['title'])
            link = items[item_index]['link']
            description = re.sub(remove_tag,'',items[item_index]['description'])
            blogger_name = items[item_index]['bloggername']
            blogger_link = items[item_index]['bloggerlink']
            post_data = items[item_index]['postdate']
            blog_df.loc[idx] = [ title, link, description, blogger_name, blogger_link, post_data]
            idx += 1
    else:
        print("Error Code:" + rescode)
        
blog_df
```

    검색 질의: 컴퓨터
    




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Title</th>
      <th>Link</th>
      <th>Description</th>
      <th>Blogger Name</th>
      <th>Blogger Link</th>
      <th>Post data</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>컴퓨터활용능력2급 필기 과목별 전략</td>
      <td>https://blog.naver.com/rhdnsqlc12?Redirect=Log...</td>
      <td>OA 자격증은 직무 상관없이 필수라서 가장 먼저 취득 계획을 세웠고, 그 중 하나가...</td>
      <td>영화와 노는 것을 좋아하는 ENFP</td>
      <td>https://blog.naver.com/rhdnsqlc12</td>
      <td>20220811</td>
    </tr>
    <tr>
      <th>1</th>
      <td>컴퓨터활용능력1급 수월하게 준비하는 방법</td>
      <td>https://blog.naver.com/taiji7281?Redirect=Log&amp;...</td>
      <td>그 중 하나에 해당 되었던 것이 바로 ‘컴퓨터활용능력1급’ 이었어요! 현대사회에 접...</td>
      <td>minky</td>
      <td>https://blog.naver.com/taiji7281</td>
      <td>20220818</td>
    </tr>
    <tr>
      <th>2</th>
      <td>컴퓨터활용능력1급 상세한 공부방법</td>
      <td>https://blog.naver.com/kmin4015?Redirect=Log&amp;l...</td>
      <td>그 중 하나에 해당 되는 겅시 바로 ‘컴퓨터활용능력1급’ 이 있었죠! 대부분의 업무...</td>
      <td>나날</td>
      <td>https://blog.naver.com/kmin4015</td>
      <td>20220818</td>
    </tr>
    <tr>
      <th>3</th>
      <td>컴퓨터활용능력1급 필승 준비 전략</td>
      <td>https://blog.naver.com/zkfk1116?Redirect=Log&amp;l...</td>
      <td>바로 ‘컴퓨터활용능력1급’ 이었습니다. 제가 준비했던 과정을 자세하게 소개해드릴텐데...</td>
      <td>실버푸들아미</td>
      <td>https://blog.naver.com/zkfk1116</td>
      <td>20220818</td>
    </tr>
    <tr>
      <th>4</th>
      <td>컴퓨터활용능력2급 필기 실기 독학으로 준비!</td>
      <td>https://blog.naver.com/qghkfwjf?Redirect=Log&amp;l...</td>
      <td>혹여라도 도움이 될까 싶은 마음에 컴퓨터활용능력2급으로 시선을 돌리게 되었습니다. ...</td>
      <td>가넹이네</td>
      <td>https://blog.naver.com/qghkfwjf</td>
      <td>20220711</td>
    </tr>
    <tr>
      <th>5</th>
      <td>컴퓨터활용능력2급 공부과정 일목요연 정리!</td>
      <td>https://blog.naver.com/dambi85?Redirect=Log&amp;lo...</td>
      <td>컴퓨터활용능력2급은 난이도가 부담스럽지 않으면서도 취중생들에게는1티어 필수 자격증으...</td>
      <td>마마 리사킴의 유쾌한 일상 이야기</td>
      <td>https://blog.naver.com/dambi85</td>
      <td>20220809</td>
    </tr>
    <tr>
      <th>6</th>
      <td>컴퓨터활용능력1급 꼼꼼한 수험과정</td>
      <td>https://blog.naver.com/owlet21?Redirect=Log&amp;lo...</td>
      <td>그 중 하나가 바로 ‘컴퓨터 기술’ 이었습니다. 워낙 학교 생활을 할 때는 서치 o...</td>
      <td>장이의 블로그</td>
      <td>https://blog.naver.com/owlet21</td>
      <td>20220818</td>
    </tr>
    <tr>
      <th>7</th>
      <td>국비지원컴퓨터학원 수업과정 및 진행방법</td>
      <td>https://blog.naver.com/iiwish?Redirect=Log&amp;log...</td>
      <td>국비지원컴퓨터학원을 찾아보기 시작했습니다. 국비지원은 말 그대로 국가에서 교육 훈련...</td>
      <td>with 포인트쌤</td>
      <td>https://blog.naver.com/iiwish</td>
      <td>20220806</td>
    </tr>
    <tr>
      <th>8</th>
      <td>컴퓨터블루스크린 이렇게 해결 완료</td>
      <td>https://blog.naver.com/mansaa?Redirect=Log&amp;log...</td>
      <td>컴퓨터블루스크린 이렇게 해결 완료 아무래도 pc를 오랜 기간 사용하다보면 만날 수 ...</td>
      <td>비트컴퓨터온컴즈</td>
      <td>https://blog.naver.com/mansaa</td>
      <td>20220809</td>
    </tr>
    <tr>
      <th>9</th>
      <td>컴퓨터활용능력1급 준비에 필요한 핵심 포인트</td>
      <td>https://blog.naver.com/dbsrptkdgod?Redirect=Lo...</td>
      <td>제 상황에서 우선적으로 대비해 볼 수 있었던 것이 바로 '컴퓨터활용능력1급' 이었습...</td>
      <td>나</td>
      <td>https://blog.naver.com/dbsrptkdgod</td>
      <td>20220818</td>
    </tr>
  </tbody>
</table>
</div>




```python

```

    검색 질의: 파이썬
    




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Title</th>
      <th>Link</th>
      <th>image</th>
      <th>author</th>
      <th>discount</th>
      <th>publisher</th>
      <th>isbn</th>
      <th>description</th>
      <th>pubdate</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>혼자 공부하는 파이썬 (1:1 과외하듯 배우는 프로그래밍 자습서)</td>
      <td>https://blog.naver.com/dbsrptkdgod?Redirect=Lo...</td>
      <td>https://shopping-phinf.pstatic.net/main_325076...</td>
      <td>윤인성</td>
      <td>19800</td>
      <td>한빛미디어</td>
      <td>9791162245651</td>
      <td>『혼자 공부하는 파이썬』이 더욱 흥미있고 알찬 내용으로 개정되었습니다. 프로그래밍이...</td>
      <td>20220601</td>
    </tr>
    <tr>
      <th>1</th>
      <td>클린 코드, 이제는 파이썬이다 (한 권으로 읽는 파이썬 개발자 성장 프로젝트)</td>
      <td>https://blog.naver.com/dbsrptkdgod?Redirect=Lo...</td>
      <td>https://shopping-phinf.pstatic.net/main_338818...</td>
      <td>알 스웨이가트</td>
      <td>27000</td>
      <td>책만</td>
      <td>9791189909451</td>
      <td>가독성 높으며 유지 보수와 기능 확장이 쉬운 파이썬 코드를 원하는가? 기초적인 파이...</td>
      <td>20220816</td>
    </tr>
    <tr>
      <th>2</th>
      <td>CODING BASICS PYTHON (파이썬)</td>
      <td>https://blog.naver.com/dbsrptkdgod?Redirect=Lo...</td>
      <td>https://shopping-phinf.pstatic.net/main_324409...</td>
      <td>김상민^장성식^김일태</td>
      <td>18000</td>
      <td>렉스미디어닷넷</td>
      <td>9788959604210</td>
      <td>파이썬으로 다지는 프로그래밍의 기초\n\nㆍ 다양한 예제를 활용하여 초보자도 쉽게 ...</td>
      <td>20220210</td>
    </tr>
    <tr>
      <th>3</th>
      <td>파이썬 머신러닝 완벽 가이드 (다양한 캐글 예제와 함께 기초 알고리즘부터 최신 기법...</td>
      <td>https://blog.naver.com/dbsrptkdgod?Redirect=Lo...</td>
      <td>https://shopping-phinf.pstatic.net/main_324858...</td>
      <td>권철민</td>
      <td>36000</td>
      <td>위키북스</td>
      <td>9791158393229</td>
      <td>자세한 이론 설명과 파이썬 실습을 통해 머신러닝을 완벽하게 배울 수 있습니다!\n\...</td>
      <td>20220421</td>
    </tr>
    <tr>
      <th>4</th>
      <td>파이썬 알고리즘 인터뷰 (95가지 알고리즘 문제 풀이로 완성하는 코딩 테스트)</td>
      <td>https://blog.naver.com/dbsrptkdgod?Redirect=Lo...</td>
      <td>https://shopping-phinf.pstatic.net/main_324564...</td>
      <td>박상길</td>
      <td>32490</td>
      <td>책만</td>
      <td>9791189909178</td>
      <td>코딩 테스트와 인터뷰를 준비하는 취준생과 이직자를 위한 \n알고리즘 문제 풀이 완벽...</td>
      <td>20200715</td>
    </tr>
    <tr>
      <th>5</th>
      <td>파이썬</td>
      <td>https://blog.naver.com/dbsrptkdgod?Redirect=Lo...</td>
      <td>https://shopping-phinf.pstatic.net/main_324609...</td>
      <td>홍의경</td>
      <td>28800</td>
      <td>생능출판</td>
      <td>9788970506784</td>
      <td>코딩 실력을 키우는 지름길은 실습이다.\n\n2008년 즈음에 검인정 중학교 교과서...</td>
      <td>20220309</td>
    </tr>
    <tr>
      <th>6</th>
      <td>파이썬 (제2판)</td>
      <td>https://blog.naver.com/dbsrptkdgod?Redirect=Lo...</td>
      <td>https://shopping-phinf.pstatic.net/main_324362...</td>
      <td>염기원^오지영</td>
      <td>16200</td>
      <td>북두</td>
      <td>9791166750991</td>
      <td>책의 전반부는 비전공자의 입장에서 비전공자를 위한 파이썬 프로그래밍의 기초적인 내용...</td>
      <td>20220120</td>
    </tr>
    <tr>
      <th>7</th>
      <td>Do it! 점프 투 파이썬 (이미 200만명이 이 책으로 프로그래밍을 시작했다!)</td>
      <td>https://blog.naver.com/dbsrptkdgod?Redirect=Lo...</td>
      <td>https://shopping-phinf.pstatic.net/main_324568...</td>
      <td>박응용</td>
      <td>16920</td>
      <td>이지스퍼블리싱</td>
      <td>9791163030911</td>
      <td>파이썬 4년 연속 베스트셀러 1위!\n《Do it! 점프 투 파이썬》 전면 개정판 ...</td>
      <td>20190620</td>
    </tr>
    <tr>
      <th>8</th>
      <td>파이썬</td>
      <td>https://blog.naver.com/dbsrptkdgod?Redirect=Lo...</td>
      <td>https://shopping-phinf.pstatic.net/main_325050...</td>
      <td>서정원^김태령</td>
      <td>29000</td>
      <td>생능출판</td>
      <td>9788970509723</td>
      <td>이 책은 지금까지 경험하지 못한 코딩 교육의 진수를 보여준다. “코딩 교육이 가야 ...</td>
      <td>20190228</td>
    </tr>
    <tr>
      <th>9</th>
      <td>파이썬</td>
      <td>https://blog.naver.com/dbsrptkdgod?Redirect=Lo...</td>
      <td>https://shopping-phinf.pstatic.net/main_324381...</td>
      <td>김영천^류문형^안일열</td>
      <td>22500</td>
      <td>기한재</td>
      <td>9788970187990</td>
      <td>▶ 이 책은 Python(파이썬)을 다룬 이론서입니다. Python(파이썬)의 기초...</td>
      <td>20200225</td>
    </tr>
  </tbody>
</table>
</div>




```python

```
