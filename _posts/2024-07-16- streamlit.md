## streamlit 정의

streamlit 이란? 챗gpt에게 물어봤다.
 Streamlit은 데이터 과학 및 머신 러닝 애플리케이션을 간단하게 만들기 위한 오픈 소스 파이썬 라이브러리다. 데이터 과학자나 머신러닝 엔지니어가 최소한의 웹 개발 지식만으로도 웹 애플리케이션을 만들 수 있도록 설계되었다. 데이터와 모델을 웹 상에서 아름답고 인터랙티브하게 시각화할 수 있는 다양한 기능을 제공한다.

Streamlit은 개발 과정에서 **라이브 코딩**이 가능하기 때문에, 코드를 수정할 때마다 앱이 실시간으로 업데이트되어 생산성을 높일 수 있다. 이는 개발 생산성을 높이는 핵심 기능 중 하나다.

## 순서

### 1. 깃허브 dashboard 만들기

자신의 깃허브 홈에서 'new'를 클릭해 만든다.

![image](https://github.com/user-attachments/assets/22c7c797-05b7-4066-8441-06430454f6d1)

### 2. gitbash 가상화 연결 및 파일 생성

git clone 주소 입력

![image](https://github.com/user-attachments/assets/5486c7b8-2ab4-43a1-b7b2-d9c0905d9a29)

cd 파일명 -> requirements.txt , app.py 파일 생성

![image](https://github.com/user-attachments/assets/f74a5286-e2cd-4faa-861b-06cb2495a4e9)


```python
touch requirments.txt
touch app.py
```

### 3. requirements.txt(메모장)에 코드 저장 


```python
streamlit
numpy
pandas
matplotlib
```

![스크린샷 2024-07-15 172057](https://github.com/user-attachments/assets/e5886153-4186-4904-b30a-3520a9376c2e)

### 4. VScode.app 에 코드 저장 및 가상화 연결

예시 코드


```python
import streamlit as st
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

# Title of the dashboard
st.title('Sample Streamlit Dashboard')

# Sidebar for user input
st.sidebar.header('User Input Parameters')
n = st.sidebar.slider('Number of data points', 10, 100, 50)
option = st.sidebar.selectbox('Select a chart type', ('Line Chart', 'Bar Chart'))

# Generate random data
data = pd.DataFrame({
    'x': np.arange(n),
    'y': np.random.randn(n).cumsum()
})

# Display the data
st.write('### Generated Data', data)

# Plot the data
st.write('### Chart')
if option == 'Line Chart':
    st.line_chart(data.set_index('x'))
elif option == 'Bar Chart':
    fig, ax = plt.subplots()
    ax.bar(data['x'], data['y'])
    st.pyplot(fig)

# Adding a map
st.write('### Map')
map_data = pd.DataFrame(
    np.random.randn(100, 2) / [50, 50] + [37.76, -122.4],
    columns=['lat', 'lon'])
st.map(map_data)

```

VScode가상화 연결

![스크린샷 2024-07-15 101956](https://github.com/user-attachments/assets/1fd8e172-7018-4b4d-8db3-9f9ab13d63b2)

VScode 가상화 연결 후, gitbash에서 이전에 설치한 requirements.txt 설치한다.

### 4-1 data폴더 만들기

github로 만든 파일을 바탕화면에서 클릭한 후 그 안에 'data'라는 폴더를 생성한다. 

![스크린샷 2024-07-16 093820](https://github.com/user-attachments/assets/4070650d-126e-45cd-bd57-e2b647829bb6)

이제 이 'data'라는 폴더 안에 csv 등 파일을 넣으면 된다.

### 5. steamlit 사이트 로그인한 후 깃허브와 해당파일 연동

![스크린샷 2024-07-15 094558](https://github.com/user-attachments/assets/9805800f-d8ec-4ac6-8421-250dd4adc988)

#### 5-1. 파일 올리고 싶으면 후속 폴더를 만들어 그 안에 csv 등 저장

### 6. app.py

아까 만들어둔 'data' 폴더에 넣은 데이터 'titanic'를 불러오는 코드다.
연습하고 싶으면 4번 예시코드 맨 밑에 추가하면 된다.


```python
titanic = pd.read_csv("./data/titanic.csv")
st.write(titanic)
```

### 7.깃허브 푸쉬

github desktop에 만들어둔 파일을 추가한 후 

![스크린샷 2024-07-16 090856](https://github.com/user-attachments/assets/d3192f84-318e-4195-9334-9d9510cd787f)

github desktop으로 변경사항 push한다

### 7-1 VScode로 업로드 

![스크린샷 2024-07-15 102159](https://github.com/user-attachments/assets/7645c31b-e1e7-4495-9ef9-1253dc96714c)

끝!
