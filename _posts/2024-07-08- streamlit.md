streamlit 이란? 챗gpt에게 물어봤다.
 Streamlit은 데이터 과학 및 머신 러닝 애플리케이션을 간단하게 만들기 위한 오픈 소스 파이썬 라이브러리다. 데이터 과학자나 머신러닝 엔지니어가 최소한의 웹 개발 지식만으로도 웹 애플리케이션을 만들 수 있도록 설계되었다. 데이터와 모델을 웹 상에서 아름답고 인터랙티브하게 시각화할 수 있는 다양한 기능을 제공한다.

Streamlit은 개발 과정에서 **라이브 코딩**이 가능하기 때문에, 코드를 수정할 때마다 앱이 실시간으로 업데이트되어 생산성을 높일 수 있다. 이는 개발 생산성을 높이는 핵심 기능 중 하나다.

## visual studio code 에서 streamlit 열기

### 파일 생성 및 가상화 연결


```python
source venv/Scripts/activate
```

![스크린샷 2024-07-08 144038](https://github.com/jiyoungeeeeeeeeeeeeeeeeeeeee/pp/assets/173663630/28192875-5445-4565-837d-b0632481c08e)



```python
cd 폴더명
```

![스크린샷 2024-07-08 144047](https://github.com/jiyoungeeeeeeeeeeeeeeeeeeeee/pp/assets/173663630/a442a528-6385-44e7-b09f-55015aab8d11)



```python
streamlit run 파일명
```

![스크린샷 2024-07-08 144059](https://github.com/jiyoungeeeeeeeeeeeeeeeeeeeee/pp/assets/173663630/40293043-a76b-46aa-87ae-4ea4da830371)



```python
import streamlit as st 
import pandas as pd 
import matplotlib.pyplot as plt 
import seaborn as sns 
import plotly 
import numpy as np 
import matplotlib as mpl
import streamlit.components.v1 as components # JavaScript 개발용

@st.cache_data
def get_data():
    # data = pd.read_csv("train.csv") / size가 크면 streamlit에서 배포 안됨
    data = sns.load_dataset("tips")
    return data

def main():
    st.title("Hello Streamlit World!")
    st.write("streamlit version:", st.__version__)
    st.write("pandas version:", pd.__version__)

    tips = get_data()
    st.dataframe(tips, use_container_width = True)

    st.markdown("HTML CSS 마크다운 적용")
    html_css = """
    <style>
        table.customTable {
        width: 100%;
        background-color: #FFFFFF;
        border-collapse: collapse;
        border-width: 2px;
        border-color: #7ea8f8;
        border-style: solid;
        color: #000000;
        }
    </style>

    <table class="customTable">
      <thead>
        <tr>
          <th>이름</th>
          <th>나이</th>
          <th>직업</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Evan</td>
          <td>25</td>
          <td>데이터 분석가</td>
        </tr>
        <tr>
          <td>Sara</td>
          <td>25</td>
          <td>프로덕트 오너</td>
        </tr>
      </tbody>
    </table>
    """

    st.markdown(html_css, unsafe_allow_html=True)


    st.markdown("HTML JS Streamlit 적용")
    js_code = """ 
    <h3>Hi</h3>

    <script>
    function sayHello() {
        alert('Hello from JavaScript in Streamlit Web');
    }
    </script>

    <button onclick="sayHello()">Click me</button>
    """
    components.html(js_code)

    tip_max = tips['tip'].max()
    tip_min = tips['tip'].min()

    st.metric(label = "Tip 최대값", value = tip_max)
    st.metric(label = "Tip 최소값", value = tip_min)

    # matplotlib & seaborn
    fig, ax = plt.subplots()
    ax.set_title("Hello World!")

import numpy as np
import seaborn as sns
import matplotlib.pyplot as plt
sns.set_theme(style="dark")

# Simulate data from a bivariate Gaussian
n = 10000
mean = [0, 0]
cov = [(2, .4), (.4, .2)]
rng = np.random.RandomState(0)
x, y = rng.multivariate_normal(mean, cov, n).T

# Draw a combo histogram and scatterplot with density contours
fig, ax = plt.subplots(figsize=(6, 6))
sns.scatterplot(x=x, y=y, s=5, color=".15")
sns.histplot(x=x, y=y, bins=50, pthresh=.1, cmap="mako")
sns.kdeplot(x=x, y=y, levels=5, color="w", linewidths=1)

st.pyplot(fig) # plt.show()



if __name__ == "__main__":
    main()

```

[streamlit 웹](http://localhost:8501/)


```python

import streamlit as st 
import pandas as pd 
import matplotlib.pyplot as plt 
import seaborn as sns 
import plotly 
import numpy as np 
import matplotlib as mpl

@st.cache_data
def get_data():
    # data = pd.read_csv("train.csv") / size가 크면 streamlit에서 배포 안됨
    data = sns.load_dataset("tips")
    return data

def main():
    price = st.slider("단가:", 1000, 10000, value = 5000)
    total_sales = st.slider("전체 판매 갯수:", 1, 1000, value = 500) 

    if st.button("매출액 계산"):
        revenue = price * total_sales
        st.write(f"전체매출액 : {revenue}")

    tips = get_data()
    st.dataframe(tips)

    show_plot = st.checkbox("시각화를 보여줄까요?")

    tip_max = tips['tip'].max() # tip의 최대
    tip_min = tips['tip'].min() # tip의 min
    tip = st.slider("tip의 입력값", tip_min, tip_max)
    # tips2 = tips.loc[tips['tip'] >= tip, :]
    option = st.selectbox(
    "요일을 선택하세요",
    ("Thur", "Fri", "Sun", "Sat"))
    st.write(option, tip)
    tips2 = tips.loc[(tips['day'] == option) | (tips['tip'] >= tip), :]
    import plotly.express as px 
    fig = px.scatter(data_frame = tips2, x = "total_bill", y = "tip")
    st.plotly_chart(fig)

    if show_plot:

        fig, ax = plt.subplots()
        ax.set_title("Hello World")
        st.pyplot(fig)
    




if __name__ == "__main__":
    main()
```

[streamlit 웹](http://localhost:8502/)


```python

```
