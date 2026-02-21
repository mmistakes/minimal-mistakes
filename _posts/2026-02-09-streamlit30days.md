---
layout: single
title: "[Python] 30 Days of Streamlit 완주기: 데이터 앱 프로토타이핑의 신세계"
categories: coding
tags: [Python, Streamlit, WebApp, Dashboard, Data]
---

# 30 Days of Streamlit: 빠르고 강력한 데이터 웹앱 만들기

최근 파이썬 데이터 생태계를 공부하면서 Pandas나 Plotly 같은 라이브러리를 통해 데이터를 분석하고 시각화하는 방법을 다뤄왔다. 하지만 분석 결과를 나만 보는 것이 아니라 다른 사람과 웹 상에서 공유하고 인터랙션하게 만들려면 프론트엔드 작업이 필수적이다.

이 간극을 채워주는 가장 완벽한 도구가 바로 **Streamlit(스트림릿)**이다. 단순히 파이썬 스크립트 몇 줄만 작성하면 번거로운 HTML, CSS, JS 작성 없이도 곧바로 웹 애플리케이션이 뚝딱 만들어진다. 이번에는 공식 홈페이지에서 제공하는 [30 Days of Streamlit](https://30days.streamlit.app/) 챌린지를 따라가보며 핵심 기능들을 실습해봤다.

---

## 1. 챌린지를 통한 핵심 기능 완스터디

30일 챌린지는 단순 텍스트(`st.write`) 출력부터 시작해서, 체크박스나 슬라이더 같은 기본 위젯, 그리고 캐싱(`@st.cache_data`)과 세션 상태(`st.session_state`)를 활용한 최적화 알고리즘까지 점진적으로 난이도가 올라간다.

가장 인상적이었던 두 가지 실습을 꼽아 정리해본다.

### 1.1 간결함의 미학: 유튜브 썸네일 추출기

웹 개발 경험이 있다면, 사용자에게 URL을 입력받고 외부 API로 이미지를 긁어와 화면에 뿌려주는 작업이 은근히 손이 많이 간다는 걸 알 것이다. 스트림릿에서는 이 과정이 믿을 수 없을 만큼 간결하다.

```python
import streamlit as st

st.title('🖼️ yt-img-app')
st.header('YouTube Thumbnail Image Extractor App')

# 사이드바에서 이미지 화질 셋팅 메뉴 구성
st.sidebar.header('Settings')
img_dict = {'Max': 'maxresdefault', 'High': 'hqdefault', 'Medium': 'mqdefault', 'Standard': 'sddefault'}
selected_img_quality = st.sidebar.selectbox('Select image quality', ['Max', 'High', 'Medium', 'Standard'])
img_quality = img_dict[selected_img_quality]

yt_url = st.text_input('Paste YouTube URL', 'https://youtu.be/JwSS70SZdyM')

def get_ytid(input_url):
  if 'youtu.be' in input_url:
    ytid = input_url.split('/')[-1]
  if 'youtube.com' in input_url:
    ytid = input_url.split('=')[-1]
  return ytid

if yt_url != '':
  ytid = get_ytid(yt_url)
  yt_img = f'http://img.youtube.com/vi/{ytid}/{img_quality}.jpg'
  st.image(yt_img)
  st.write('YouTube video thumbnail image URL: ', yt_img)
```

`st.sidebar.selectbox`로 좌측 셋팅바를 순식간에 구현하고, `st.text_input`으로 URL을 받자마자 파이썬의 문자열 파싱 로직을 거쳐 `st.image`로 뿌려주는 구조다. 복잡한 라우팅이나 상태 관리 없이 코드가 위에서 아래로 물 흐르듯 실행된다는 점이 매력적이다.

### 1.2 프레임워크의 확장: Streamlit Elements 대시보드

Day 27에서는 `streamlit-elements`를 사용해 크기 조절과 드래그 앤 드롭이 가능한 대화형 대시보드를 구성하는 실습을 진행했다. 기본 제공 위젯만으로는 아쉬운 고차원적 UI 구성을 Material UI, Nivo 차트, Monaco 에디터 등을 융합해 해결하는 방법이다.

```python
from streamlit_elements import elements, dashboard, mui, editor, media, lazy, sync, nivo

# ... 중략 (데이터 초기화 로직) ...

layout = [
    dashboard.Item("editor", 0, 0, 6, 3),
    dashboard.Item("chart", 6, 0, 6, 3),
    dashboard.Item("media", 0, 2, 12, 4),
]

with elements("demo"):
    with dashboard.Grid(layout, draggableHandle=".draggable"):

        # 1. 코드 에디터 (Monaco)
        with mui.Card(key="editor", sx={"display": "flex", "flexDirection": "column"}):
            mui.CardHeader(title="Editor", className="draggable")
            with mui.CardContent(sx={"flex": 1, "minHeight": 0}):
                editor.Monaco(
                    defaultValue=st.session_state.data,
                    language="json",
                    onChange=lazy(sync("data"))
                )
            with mui.CardActions:
                mui.Button("Apply changes", onClick=sync())

        # 2. 범프 차트 (Nivo Bump Chart)
        with mui.Card(key="chart", sx={"display": "flex", "flexDirection": "column"}):
            mui.CardHeader(title="Chart", className="draggable")
            with mui.CardContent(sx={"flex": 1, "minHeight": 0}):
                nivo.Bump(
                    data=json.loads(st.session_state.data),
                    # 차트 파라미터 세팅...
                )
```

처음에는 React 기반의 컴포넌트를 파이썬 코드 안으로 가져오는 개념을 이해하는 게 조금 어려웠다. 하지만 원리는 명확했다. 에디터 컴포넌트(`Monaco`)의 `onChange` 이벤트에 `sync("data")`를 묶어 Streamlit의 세션 상태(`st.session_state.data`)와 실시간으로 동기화시키고, 이를 옆에 있는 차트(`Nivo Bump`)가 바라보게 만드는 것이다.

`lazy()` 래퍼를 통해 의미 없는 리렌더링을 방지하는 최적화 패턴까지, 인터랙티브 대시보드의 기초 체력을 다지는데 큰 도움이 되었다.

---

## 2. 실습 중 마주한 고민과 해결 방식

이번 30일 챌린지를 진행하며 느낀 가장 큰 허들은 바로 **"Streamlit의 작동 방식(실행 흐름)에 대한 이해"**였다.

일반적인 웹이나 GUI 앱은 이벤트 기반으로 돌지만, 시스템의 입력값이 변할 때마다 Streamlit은 냅다 **전체 스크립트를 재실행(Rerun)**해버린다. 편리하지만 무거운 연산이 끼어있다면 극악의 성능 저하를 부를 수 있다.

이를 방지하기 위해 사용했던 핵심 무기들이 있다.

1. `@st.cache_data` 머신러닝 모델 로드나 무거운 CSV 파일 읽기에 데코레이터를 붙여 한 번 얹어둔 데이터를 재사용했다.
2. `st.session_state` 버튼을 누르거나 페이지가 새로고침되어도 유지되어야 하는 상태값을 관리할 수 있었다. 폼(Form)을 활용한 일괄 제출(`st.form_submit_button`)도 렌더링을 최소화하는데 유용했다.

---

## 3. 향후 실제 프로젝트 적용 방향

이번 챌린지를 기점으로 파이썬 코드를 웹 기반 인터페이스로 단번에 띄우는 역량을 갖추게 되었다. 앞으로의 실제 장기 프로젝트나 업무 환경에서는 다음과 같이 적극 도입할 예정이다.

- **AI 및 LLM 챗봇 프로토타이핑:** 복잡한 백엔드 서버 없이도 사용자와 상호작용 가능한 프롬프트 테스트 앱을 기획하고 빠르게 내부 리뷰를 받을 목적으로 활용.
- **데이터 분석 대시보드 사내 배포:** 앞서 학습한 Plotly와 Pandas의 결과물을 Streamlit 앱에 결합해 의사결정권자가 직접 필터나 슬라이더를 돌려가며 데이터를 탐색할 수 있는 BI 도구를 구축.
- **머신러닝 파라미터 튜너 제작:** `st.slider`나 `st.number_input`으로 하이퍼파라미터를 입력받고 실시간으로 SHAP value나 모델 정확도를 렌더링하는 디버깅 포탈 제작.

---

## 마무리

React나 Vue처럼 본격적인 클라이언트 사이드 고도화를 노린다면 한계가 있을 수 있겠지만, "데이터 툴"이나 "AI 모델 시연"이라는 도메인 한정으로는 Streamlit만큼 속도감 있고 훌륭한 생산성을 보여주는 프레임워크는 드물다. 기본기를 단단히 다진 만큼, 이제는 배운 것들을 응용하여 작은 나만의 도구들을 하나씩 찍어낼 일만 남았다.

- 작업 코드 보기: https://github.com/kinkos1234/python_study/tree/main/Streamlit
