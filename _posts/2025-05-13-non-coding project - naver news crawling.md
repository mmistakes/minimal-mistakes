---
title: "노코딩 프로젝트 Non-coding Prjoects - 네이버 뉴스 검색 및 요약해서 telegram으로 보내기 (n8n 이용)"
categories:
  - Non-coding
tags:
  - AI
  - n8n
  - Gemini
  - telegram
  - 노코딩
  - jina.ai
  - Crawling
last_modified_at: 2024-05-13T10:00:00+11:30
---

## 전체 workflow

1. 미리 지정된 키워드들로 네이버 뉴스를 검색
2. 검색된 뉴스 URL 추출(trigger 시점을 기준으로 1주일 전 뉴스 URL)
3. 추출된 URL의 뉴스 컨텐츠 요약
4. 텔레그램으로 전송


![네이버 뉴스 스크래핑(1차)](/assets/images/NAVER%20NEWS_V1.0.png)



## 주요 이슈사항

### gemini가 코드블록으로 json 형식( ` ```json `)을 출력
     AI Agent의 structured output paser 노드 활용
### website contents 추출(Crawling)
- jian.ai 활용하여 이슈 해결
- apify.com의 actor([website-content-crawler](https://apify.com/apify/website-content-crawler))를 사용하여 해결 가능할 수 있음


## 참고 
- [솔브잇 Youtube](https://youtube.com/watch?v=T5va0A7wvHk&si=5xEwNEqyGTzO_YdO)
- https://n8n.io/workflows/2957-essential-multipage-website-scraper-with-jinaai
- https://jina.ai/reader/



## 향후계획
   - [ ] 뉴스 내용을 기초로 점수화 및 카테고리화하여 분류(솔브잇 참고)
   - [ ] 사용자로 부터 검색키워드를 직접 입력 받기 
   - [ ] 커뮤니티, 블로그 등 검색 대상 URL 추가


---

