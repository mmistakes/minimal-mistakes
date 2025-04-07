# 위키백과 텍스트 크롤링 (r코드)
```
library(rvest)

# 1. 조선 국왕 리스트
kings <- c("태조_(조선)", "정종_(조선)", "태종_(조선)", "세종", "문종_(조선)", "단종_(조선)", "세조_(조선)", "예종_(조선)", "성종_(조선)", "연산군",
           "중종_(조선)", "인종_(조선)", "명종_(조선)", "선조_(조선)", "광해군", "인조_(조선)", "효종_(조선)", "현종_(조선)", "숙종_(조선)", "경종_(조선)",
           "영조_(조선)", "정조_(조선)", "순조_(조선)", "헌종_(조선)", "철종_(조선)", "고종_(조선)", "순종_(조선)")

# 2. 새로운 폴더 생성 (파일 저장할 위치)
dir.create("kings_full_texts", showWarnings = FALSE)

# 3. 모든 국왕의 위키백과 본문 크롤링 & 저장
for (king in kings) {
  # 왕의 위키백과 URL 만들기
  url <- paste0("https://ko.wikipedia.org/wiki/", king)
  
  # HTML 읽기
  page <- try(read_html(url), silent = TRUE)
  
  if (inherits(page, "try-error")) {
    print(paste("페이지 오류:", king))
    next
  }
  
  # 본문 전체 가져오기
  full_text <- page %>%
    html_nodes("#mw-content-text") %>%
    html_text(trim = TRUE)
  
  # 텍스트 파일로 저장
  file_name <- paste0("kings_full_texts/", king, ".txt")
  writeLines(full_text, file_name, useBytes = TRUE)
  
  print(paste("저장 완료:", file_name))  # 진행 상황 출력
}

print("모든 국왕의 위키백과 본문을 텍스트 파일로 저장 완료!")
```

# 고전 db 사이트 도서 리스트 크롤링 (python)
```{python}
!pip install playwright
!playwright install

import asyncio
from playwright.async_api import async_playwright
import pandas as pd

async def run():
    data = []

    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()

        # 원하는 페이지 수만큼 반복
        for i in range(1, 14):  # 예: 1~13페이지까지
            print(f"크롤링 중: {i}페이지")
            url = f"https://db.itkc.or.kr/dir/item?itemId=MO#/dir/list?qw=&q=&grpId=&itemId=MO&gubun=book&cate1=&cate2=&upSeoji=&listType=simple&sortField=&sortOrder=&pageIndex={i}&pageUnit=100"
            await page.goto(url)
            await page.wait_for_timeout(2000)  # JS 로딩 시간 대기

            rows = await page.query_selector_all("tbody > tr")
            for row in rows:
                cols = await row.query_selector_all("td")
                if len(cols) >= 4:
                    title = await cols[0].inner_text()
                    author = await cols[1].inner_text()
                    year = await cols[2].inner_text()
                    collection = await cols[3].inner_text()
                    data.append({
                        "서명": title,
                        "저자": author,
                        "간행년": year,
                        "집수명": collection
                    })

        await browser.close()

    # DataFrame 생성 및 저장
    df = pd.DataFrame(data)
    df.to_csv("itkc_books.csv", index=False)
    print("CSV 저장 완료!")

# 비동기 실행
await run()
```


