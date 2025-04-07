---
layout: single
title: Streamlit을 활용한 웹 프로토타입 구현하기
categories:
  - basic_ai_development
tags:
  - 부스트캠프
  - AITech
  - AIBasic
  - Streamlit
  - Prototype
author_profile: false
use_math: true
---
## 1. Streamlit을 활용한 웹 프로토타입 구현
### 1.1 프로토타입(Prototype)
- 완벽한 제품이 나오기 전, 확인 가능한 샘플 버전
- 런칭 전 Test를 위해 개발
	- AI 모델의 Input ⇒ Output을 확인할 수 있도록 설정<br><br>

### 1.2 프로토타입 개발의 필요성
- 협업의 관점에서, PM 및 FE 조직과 협업 시 필요
- 전사적으로 회사에서 다같이 사용할 때, 유용
- 데이터 Product 중요하다고 판단시 활용<br><br>

### 1.3 Streamlit의 등장 배경 및 사용이유
- 다른 조직의 도움 없이, 빠르게 웹 서비스를 만들어 많은 사람들과 공유가 원활할 수 있도록
- <mark style="background: #FFF3A3A6;">Python으로 FE를 구현</mark>할 수 있는 Streamlit 등장
- Streamlit의 장점
	- 장점
		- 엔지니어 입장에서, 쉽게 프로토타입 구현 가능
			- "HTML/JavaScript + Flask/FastAPI" 활용하여 개발
				- 커스텀은 가능하나, 개발 리소스 소모
				- AI - Python 구현 / 웹 - JavaScript 구현
			- <mark style="background: #FFF3A3A6;">기존 코드를 조금만 수정</mark>해서 <mark style="background: #FFF3A3A6;">효율적인 웹 서비스 개발</mark>이 가능토록
		- 기타 부가기능을 손쉽게 구현 가능
			- 대시보드 UI 구성
			- 쉬운 배포(Streamlit Cloud)
			- 화면 녹화 기능<br><br>

### 1.4 Streamlit 개발 흐름
1. AI/ML 모델링(by 파이썬 스크립트)
2. Streamlit 설계
	1. 목적, 기능 정의(인퍼런스, 결과도출, 파라미터 선택 등)
	2. UI 레이아웃 정의
	3. 사용할 Component 정의
3. Streamlit 개발
	1. 약간의 스크립트 수정
	2. UI 컴포넌트 추가
	3. 데이터 처리(전처리 시각화)
	4. 상호작용 로직 개발(로딩중 표시 등, 값 변경이나 제출시 작동)
4. 테스트 및 배포
	1. 배포
	2. Use Case 확인
5. 3-4의 과정을 반복하며 유지보수 → 요구조건 반영, 새 기능 개발<br><br>

## 2. Streamlit 핵심기능
### 2.1 Streamlit UI Component
![image1](../../images/2024-09-13-aitech-week6-7_3/image1.png)
1. Text 작성(Title, Header, Write)
	- 제목 및 굵은 글씨를 사용하고 싶은 경우
	
	```python
	import streamlit as st
	import pandas as pd
	import numpy as np
	import time

	st.title("Title")
	st.header ("Header")
	st.subheader ("subheader")

	st.write("Write Something")
	```
	
2. Streamlit Text/Number/Date Input
	- 사용자가 문자/숫자를 직접 입력하게 하고 싶은 경우
	
	```python
	text_input= St.text_input ("텍스트를 입력해주세요")
	st.write(text_input)
	
	password_input = st.text_input ("암호를 입력해주세요", type="password")
	
	number_input= st.number_input ("숫자를 입력해주세요")
	st.write (number_input)
	
	st.date_input ("날짜를 입력하세요")
	st.time_input ("시간을 입력하세요")
	```
	
	![image2](../../images/2024-09-13-aitech-week6-7_3/image2.png)
3. Streamlit File Uploader
	- 파일을 업로드하려는 경우
	
	```python
	uploaded_file = st.file_uploader("Choose a file", type=["png", "jpg", "jpeg"])
	```
	
	![image3](../../images/2024-09-13-aitech-week6-7_3/image3.png)
4. Streamlit Radio Button, Select Box
	- 여러 옵션 중 하나만 선택하게 하고 싶은 경우
	
	```python
	selected_item = st. radio ("Radio Part", ("A", "B", "C"))
	
	if selected_item == "A":
		st-write("A!!")
	elif selected_item == "B":
		st.write("B!")
	elif selected_item == "C":
		st.write("C!")
	
	option = st.selectbox('Please select in selectbox!', ('oliver', 'kjpark', 'croinda'))
	st.write('You selected:', option)
	```
	
	![image4](../../images/2024-09-13-aitech-week6-7_3/image4.png)
5. Streamlit Multi Select Box
	- 여러 옵션을 선택하게 하고 싶은 경우
	
	```python
	multi_select = st.multiselect( 'Please select somethings in multi selectbox!', ['A', 'B', 'C', 'D'])
	
	st.write('You selected:', multi_select)
	```
	
	![image5](../../images/2024-09-13-aitech-week6-7_3/image5.png)

6. Streamlit Slider
	- 주어진 범위에서, 값을 선택하게 하고 싶은 경우
	
	```python
	values = st.slider( 'Select a range of values', 0.0, 100.0, (25.0, 75.0))
	st.write('Values:', values)
	```
	
	![image6](../../images/2024-09-13-aitech-week6-7_3/image6.png)
7. Streamlit Check Box
	- True, False 옵션을 Input으로 받고 싶은 경우(체크박스 버튼)
		- SelectBox: 여러 개의 선택지
		- CheckBox: 두 개의 선택지
	- value에 Default 인자 설정 가능
	
	```python
	checkbox_btn = st.checkbox('체크박스 버튼', value=True)
	
	if checkbox_btn:
		st.write('체크박스 버튼 클릭!')
	```
	
8. Streamlit Button
	- 버튼을 명시적으로 누를 때, 특정 동작을 실행시키고 싶은 경우(특정 함수, ML 모델예측 등)
	
	```python
	if st. button("버튼이 클릭되면"):
	st. write("클릭 후 보이는 메세지!")
	
	if St. button("버튼이 클릭되면2"):
	st. write("클릭 후 보이는 메세지2!")
	```
	
	![image7](../../images/2024-09-13-aitech-week6-7_3/image7.png)
9. Streamlit Form
	- 여러 입력 그룹화하여 한번에 제출하려는 경우
	
	```python
	with st.form(key="g* form"):
		username = st. text_input("Username")
		password = st.text_input("Password", type="password")
		st.form_submit_button("login")
	```
	
	![image8](../../images/2024-09-13-aitech-week6-7_3/image8.png)
	
10. Streamlit Pandas Dataframe, Markdown
	- `st.write`: 문자, 숫자, Dataframe, 차트 등을 표시
		![image9](../../images/2024-09-13-aitech-week6-7_3/image9.png)
	- `st.dataframe`: Interactive한 Dataframe / column 클릭 및 정렬 가능
		- 인자로 style.highlight_max를 넣어서 강조할 수 있음
			![image10](../../images/2024-09-13-aitech-week6-7_3/image10.png)
	- `st.table`: Static한 Dataframe
		- 인자로 style.highlight_max를 넣어서 강조할 수 있음
			![image11](../../images/2024-09-13-aitech-week6-7_3/image11.png)
	
	```python
	df = pd.DataFrame({
	  'first column': [1, 2, 3, 4],
	  'second column': [10, 20, 30, 40]
	})
	
	st.markdown("======")
	
	st.write(df)
	st.dataframe(df)
	st.dataframe(df.style.highlight_max(axis=0))
	st.table(df)
	st.tabel(df.style.highlight_max(axis=0))
	```
	
11. Streamlit Metric, JSON
	- Metric: 지표를 표시하고 싶은 경우
	- JSON: JSON 데이터를 표시하고 싶은 경우
	
	```python
	st.metric("My metric", 42, 2)
	st.json(df.to_json())
	```
	
	![image12](../../images/2024-09-13-aitech-week6-7_3/image12.png)
	
12. Streamlit Line Chart
	- Line 차트를 그리고 싶은 경우
	
	```python
	chart_data = pd.DataFrame(
		np.random.randn(20, 3),
		columns=['a', 'b', 'c']
	)
	
	st.line_chart(chart_data)
	```
	
	![image13](../../images/2024-09-13-aitech-week6-7_3/image13.png)
	
13. Streamlit Map Chart
	- 지도에 데이터를 표시하고 싶은 경우
	
	```python
	map_data = pd.DataFrame(
		np.random.randn(1000, 2) / [50, 50] + [37.76, -122.4],
		columns=['lat', 'lon'])
	
	st.map(map_data)
	```
	
	![image14](../../images/2024-09-13-aitech-week6-7_3/image14.png)
	
14. Streamlit Caption, Code, Latex
	- Caption, Code, Latex를 보여주고 싶은 경우
	
	```python
	st.caption("This is Caption")
	st.code("a = 123")
	st.latex("\int a x^2 \,dx")
	```
	
15. Streamlit Spinner
	- 연산이 진행되는 도중 메세지를 보여주고 싶은 경우
	- `with`로 감싸서, 하위에 원하는 함수를 추가
	- 유사 기능: `st.status`
	
	```python
	with st.spinner("Please wait..."):
		time.sleep(5)
	```
	
	![image15](../../images/2024-09-13-aitech-week6-7_3/image15.png)
	
16. Streamlit Ballons
	- 화면에 풍선효과 표시 가능
		`st.balloons()`
17. Streamlit Status Box
	- 성공한 경우
	- 정보를 주고 싶은 경우
	- 경고, 에러 메시지를 표현하고 싶은 경우
	
	```python
	st.success("Success")
	st.info("Info")
	st.warning("Warning")
	st.error("Error message")
	```
	
	![image16](../../images/2024-09-13-aitech-week6-7_3/image16.png)
	
18. Streamlit Layout - Sidebar
	- Sidebar를 사용하고 싶은 경우
		- Sidebar에 파라미터를 지정하거나, 암호 설정 가능
	
	```python
	st.sidebar.button("hi")
	```
	
19. Streamlit Layout - Columns
	- 여러 칸으로 나누어, Component를 추가하고 싶은 경우
	
	```python
	col1, col2, col3, col4 = st.columns(4)
	
	col1.write("this is col1")
	col2.write("this is col2")
	col3.write("this is col3!!!")
	col4.write("this is col4~")
	```
	
	![image17](../../images/2024-09-13-aitech-week6-7_3/image17.png)
	
20. Streamlit Layout - Expander
	- 클릭해서 확장하는 부분이 필요한 경우
	
	```python
	with st.expander("클릭하면 열려요!"):
		st.write("content!")
	```
	
	![image18](../../images/2024-09-13-aitech-week6-7_3/image18.png)<br><br>

### 2.2 Session State - "Streamlit의 구조 특성"
- 화면에서 무언가가 업데이트 되면, <mark style="background: #FFF3A3A6;">Streamlit은 전체 코드 재실행</mark>
	1. Code가 수정되거나
	2. 사용자가 Streamlit의 위젯과 상호 작용하는 경우
- 활용도 - Global Variable처럼, <mark style="background: #FFF3A3A6;">공유 가능한 변수를 만들어 저장</mark>
	- 상태 유지
	- 특정 변수 공유
	- 사용자 로그인 상태 유지
	- (채팅)대화 히스토리 유지
	- 여러 단계의 Form<br><br>

1. Session State 없는 경우?
	- if문 실행 시, 끊임없이 초기 상태로 돌아감
	- 아래 코드 실행 시, Increment 및 Decrement 버튼을 누를 때마다 0으로 초기화
	
	```python
	st.title('Counter Example without session state')
	
	count_value = 0
	
	increment = st.button('Increment')
	if increment:
		count_value += 1
	
	decrement = st.button('Decrement')
	if decrement:
		count_value -= 1
	
	st.write('Count = ', count_value)
	```
	
2. Session State 있는 경우?
	- Session state에 Default Value를 받아주고, 특정 조건이 충족될 때마다 session_state 변수를 증가시켜줌
	
	```python
	st.title('Counter Example with session state')
	
	# 1. Session State에 count를 init
	if 'count' not in st.session_state:
		st.session_state.count = 0
	
	# 2. increment 버튼이 클릭되면, session state의 count에 1을 더함
	increment = st.button('Increment1')
	if increment:
		st.session_state.count += 1
	
	# 3. decrement 버튼이 클릭되면, session state의 count에 1을 빼줌
	decrement = st.button('Decrement2')
	if decrement:
		st.session_state.count -= 1
	
	st.write('Count = ', st.session_state. count)
	```
	<br><br>

### 2.3 Streamlit Caching - "캐싱을 해야 하는 이유?"
- UI가 변경될 때, 모든 코드를 다시 실행하게 됨에 따라, 아래와 같은 이슈 발생
	1. 데이터를 불러오는 코드도 다시 읽어옴 → 불필요한 시간 소모
	2. 객체 또한 계속 생성
- 이러한 이슈를 해결해주기 위해, <mark style="background: #FFF3A3A6;">캐싱 데코레이터</mark> 활용
	- 캐싱: 성능을 위해 데이터를 메모리 등에 저장
		- 캐싱을 활용해, <mark style="background: #FFF3A3A6;">함수 호출 결과를 Local에 저장</mark>하여 빠른 구동속도를 보임
		- 캐싱 값은 모든 사용자가 사용 가능함
			- 사용자 마다 다르게 접근해야 한다면, Session State에 저장
- 캐싱 방법 2가지
	1. <mark style="background: #FFF3A3A6;">@st.cache_data</mark>
		- 데이터, API Request의 Response
		- anything that <mark style="background: #FFF3A3A6;">you can store</mark> in a database
	2. <mark style="background: #FFF3A3A6;">@st.cache_resource</mark>
		- DB 연결, ML 모델 Load(from. HuggingFace etc.)
		- anything that <mark style="background: #FFF3A3A6;">you cant store</mark> in a database
	
	```python
	@st.cache_data
	def fetch_large_dataset():
		df = pd.read_csv("https://example.com/large_dataset.csv")
		return df
	```
	<br><br>

## 3. 결론
- 업무 시, 프로토타입은 중요하다 → 이를 다룰 수 있는 가장 간편한 tool인 "Streamlit"
- 일의 효율성을 높이기 위한 방안을 생각해보며 Streamlit에 대해 익혀두면 좋음
	- Streamlit 활용 시, <mark style="background: #FFF3A3A6;">"Session State"라는 특성</mark>에 대해서는 늘 숙지하기