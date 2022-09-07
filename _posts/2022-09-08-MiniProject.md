# 개요

목소리로 성별을 판별할 수 있는 머신러닝 및 딥러닝 모델들을 구현해보았습니다.

# 목소리 데이터 확인

필요한 라이브러리를 불러옵니다.


```python
# 기본 라이브러리
import os
import warnings 
import numpy as np 
import pandas as pd

# 시각화 라이브러리
import seaborn as sns
import matplotlib.pyplot as plt
import plotly.express as px
import plotly.graph_objects as go

# 머신러닝 라이브러리
import tensorflow as tf
from sklearn import linear_model
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.neighbors import KNeighborsClassifier
from sklearn.model_selection import train_test_split, cross_val_score, GridSearchCV, KFold, RepeatedStratifiedKFold, StratifiedKFold
import sklearn.model_selection, sklearn.linear_model, sklearn.svm, sklearn.metrics
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import *
from sklearn.svm import SVC

# 딥러닝 라이브러리
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, LSTM, Dropout
from tensorflow.keras.callbacks import ModelCheckpoint, EarlyStopping

warnings.filterwarnings('ignore')
pd.set_option('display.max_columns',None)
```

CSV 파일을 **voice_df** 데이터프레임으로 저장합니다.


```python
# CSV 파일로 데이터프레임 만들기
voice_df = pd.read_csv('voice.csv')

# 우리 테스트 데이터프레임 만들기
test_df = pd.read_csv('voice_test.csv')
```

데이터프레임이 잘 만들어졌는지 확인해보고...


```python
# 데이터프레임이 잘 만들어졌는지 확인하기
voice_df.head() # voice 파일을 불러와서 df라는 파일 이름으로 저장을 하였음.
```





  <div id="df-3597eb59-13fd-49c3-b80b-0db6e94267af">
    <div class="colab-df-container">
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
      <th>meanfreq</th>
      <th>sd</th>
      <th>median</th>
      <th>Q25</th>
      <th>Q75</th>
      <th>IQR</th>
      <th>skew</th>
      <th>kurt</th>
      <th>sp.ent</th>
      <th>sfm</th>
      <th>mode</th>
      <th>centroid</th>
      <th>meanfun</th>
      <th>minfun</th>
      <th>maxfun</th>
      <th>meandom</th>
      <th>mindom</th>
      <th>maxdom</th>
      <th>dfrange</th>
      <th>modindx</th>
      <th>label</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>0.059781</td>
      <td>0.064241</td>
      <td>0.032027</td>
      <td>0.015071</td>
      <td>0.090193</td>
      <td>0.075122</td>
      <td>12.863462</td>
      <td>274.402906</td>
      <td>0.893369</td>
      <td>0.491918</td>
      <td>0.000000</td>
      <td>0.059781</td>
      <td>0.084279</td>
      <td>0.015702</td>
      <td>0.275862</td>
      <td>0.007812</td>
      <td>0.007812</td>
      <td>0.007812</td>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>male</td>
    </tr>
    <tr>
      <th>1</th>
      <td>0.066009</td>
      <td>0.067310</td>
      <td>0.040229</td>
      <td>0.019414</td>
      <td>0.092666</td>
      <td>0.073252</td>
      <td>22.423285</td>
      <td>634.613855</td>
      <td>0.892193</td>
      <td>0.513724</td>
      <td>0.000000</td>
      <td>0.066009</td>
      <td>0.107937</td>
      <td>0.015826</td>
      <td>0.250000</td>
      <td>0.009014</td>
      <td>0.007812</td>
      <td>0.054688</td>
      <td>0.046875</td>
      <td>0.052632</td>
      <td>male</td>
    </tr>
    <tr>
      <th>2</th>
      <td>0.077316</td>
      <td>0.083829</td>
      <td>0.036718</td>
      <td>0.008701</td>
      <td>0.131908</td>
      <td>0.123207</td>
      <td>30.757155</td>
      <td>1024.927705</td>
      <td>0.846389</td>
      <td>0.478905</td>
      <td>0.000000</td>
      <td>0.077316</td>
      <td>0.098706</td>
      <td>0.015656</td>
      <td>0.271186</td>
      <td>0.007990</td>
      <td>0.007812</td>
      <td>0.015625</td>
      <td>0.007812</td>
      <td>0.046512</td>
      <td>male</td>
    </tr>
    <tr>
      <th>3</th>
      <td>0.151228</td>
      <td>0.072111</td>
      <td>0.158011</td>
      <td>0.096582</td>
      <td>0.207955</td>
      <td>0.111374</td>
      <td>1.232831</td>
      <td>4.177296</td>
      <td>0.963322</td>
      <td>0.727232</td>
      <td>0.083878</td>
      <td>0.151228</td>
      <td>0.088965</td>
      <td>0.017798</td>
      <td>0.250000</td>
      <td>0.201497</td>
      <td>0.007812</td>
      <td>0.562500</td>
      <td>0.554688</td>
      <td>0.247119</td>
      <td>male</td>
    </tr>
    <tr>
      <th>4</th>
      <td>0.135120</td>
      <td>0.079146</td>
      <td>0.124656</td>
      <td>0.078720</td>
      <td>0.206045</td>
      <td>0.127325</td>
      <td>1.101174</td>
      <td>4.333713</td>
      <td>0.971955</td>
      <td>0.783568</td>
      <td>0.104261</td>
      <td>0.135120</td>
      <td>0.106398</td>
      <td>0.016931</td>
      <td>0.266667</td>
      <td>0.712812</td>
      <td>0.007812</td>
      <td>5.484375</td>
      <td>5.476562</td>
      <td>0.208274</td>
      <td>male</td>
    </tr>
  </tbody>
</table>
</div>
      <button class="colab-df-convert" onclick="convertToInteractive('df-3597eb59-13fd-49c3-b80b-0db6e94267af')"
              title="Convert this dataframe to an interactive table."
              style="display:none;">

  <svg xmlns="http://www.w3.org/2000/svg" height="24px"viewBox="0 0 24 24"
       width="24px">
    <path d="M0 0h24v24H0V0z" fill="none"/>
    <path d="M18.56 5.44l.94 2.06.94-2.06 2.06-.94-2.06-.94-.94-2.06-.94 2.06-2.06.94zm-11 1L8.5 8.5l.94-2.06 2.06-.94-2.06-.94L8.5 2.5l-.94 2.06-2.06.94zm10 10l.94 2.06.94-2.06 2.06-.94-2.06-.94-.94-2.06-.94 2.06-2.06.94z"/><path d="M17.41 7.96l-1.37-1.37c-.4-.4-.92-.59-1.43-.59-.52 0-1.04.2-1.43.59L10.3 9.45l-7.72 7.72c-.78.78-.78 2.05 0 2.83L4 21.41c.39.39.9.59 1.41.59.51 0 1.02-.2 1.41-.59l7.78-7.78 2.81-2.81c.8-.78.8-2.07 0-2.86zM5.41 20L4 18.59l7.72-7.72 1.47 1.35L5.41 20z"/>
  </svg>
      </button>

  <style>
    .colab-df-container {
      display:flex;
      flex-wrap:wrap;
      gap: 12px;
    }

    .colab-df-convert {
      background-color: #E8F0FE;
      border: none;
      border-radius: 50%;
      cursor: pointer;
      display: none;
      fill: #1967D2;
      height: 32px;
      padding: 0 0 0 0;
      width: 32px;
    }

    .colab-df-convert:hover {
      background-color: #E2EBFA;
      box-shadow: 0px 1px 2px rgba(60, 64, 67, 0.3), 0px 1px 3px 1px rgba(60, 64, 67, 0.15);
      fill: #174EA6;
    }

    [theme=dark] .colab-df-convert {
      background-color: #3B4455;
      fill: #D2E3FC;
    }

    [theme=dark] .colab-df-convert:hover {
      background-color: #434B5C;
      box-shadow: 0px 1px 3px 1px rgba(0, 0, 0, 0.15);
      filter: drop-shadow(0px 1px 2px rgba(0, 0, 0, 0.3));
      fill: #FFFFFF;
    }
  </style>

      <script>
        const buttonEl =
          document.querySelector('#df-3597eb59-13fd-49c3-b80b-0db6e94267af button.colab-df-convert');
        buttonEl.style.display =
          google.colab.kernel.accessAllowed ? 'block' : 'none';

        async function convertToInteractive(key) {
          const element = document.querySelector('#df-3597eb59-13fd-49c3-b80b-0db6e94267af');
          const dataTable =
            await google.colab.kernel.invokeFunction('convertToInteractive',
                                                     [key], {});
          if (!dataTable) return;

          const docLinkHtml = 'Like what you see? Visit the ' +
            '<a target="_blank" href=https://colab.research.google.com/notebooks/data_table.ipynb>data table notebook</a>'
            + ' to learn more about interactive tables.';
          element.innerHTML = '';
          dataTable['output_type'] = 'display_data';
          await google.colab.output.renderOutput(dataTable, element);
          const docLink = document.createElement('div');
          docLink.innerHTML = docLinkHtml;
          element.appendChild(docLink);
        }
      </script>
    </div>
  </div>




- 0   meanfreq 평균주파수
- 1   sd        주파수의 표준 편차
- 2   median   중앙값
- 3   Q25       첫 번째 분위수(kHz 단위)
- 4   Q75       세 번째 분위수(kHz 단위)
- 5   IQR       분위수 범위(kHz 단위)
- 6   skew      왜곡(스펙프롭 설명의 참고 사항 참조
- 7   kurt      (specprop 설명의 참고 사항 참조)
- 8   sp.ent    스펙트럼 엔트로피
- 9   sfm       스펙트럼 평탄도
- 10  mode      주파수 빈도
- 11  centroid   주파수 중심으로 스펙프로프 참조
- 12  meanfun  음향 신호에서 측정된 기본 주파수의 평균
- 13  minfun    음향 신호에서 측정되는 최소 기본 주파수
- 14  maxfun    음향 신호에서 측정되는 최대 기본 주파수
- 15  meandom   음향 신호에서 측정된 지배적 주파수의 평균
- 16  mindom    음향 신호에서 측정되는 최소 지배적 주파수
- 17  maxdom    음향 신호에서 측정되는 지배적 주파수의 최대
- 18  dfrange   음향 신호에서 측정되는 지배적 주파수 범위
- 19  modindx   변조 인덱스. 기본 주파수의 인접 측정치와 주파수 범위를 나눈 누적된 절대 차이로 계산됩니다.
- 20  label     남녀구분


describe()와 info()를 통해서 전반적으로 데이터를 확인해봅니다.


```python
voice_df.describe() # df의 값을 대략적으로 요약
```





  <div id="df-0a150ad5-4f2a-4e1e-96b1-79d27a0d6d7a">
    <div class="colab-df-container">
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
      <th>meanfreq</th>
      <th>sd</th>
      <th>median</th>
      <th>Q25</th>
      <th>Q75</th>
      <th>IQR</th>
      <th>skew</th>
      <th>kurt</th>
      <th>sp.ent</th>
      <th>sfm</th>
      <th>mode</th>
      <th>centroid</th>
      <th>meanfun</th>
      <th>minfun</th>
      <th>maxfun</th>
      <th>meandom</th>
      <th>mindom</th>
      <th>maxdom</th>
      <th>dfrange</th>
      <th>modindx</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>count</th>
      <td>3168.000000</td>
      <td>3168.000000</td>
      <td>3168.000000</td>
      <td>3168.000000</td>
      <td>3168.000000</td>
      <td>3168.000000</td>
      <td>3168.000000</td>
      <td>3168.000000</td>
      <td>3168.000000</td>
      <td>3168.000000</td>
      <td>3168.000000</td>
      <td>3168.000000</td>
      <td>3168.000000</td>
      <td>3168.000000</td>
      <td>3168.000000</td>
      <td>3168.000000</td>
      <td>3168.000000</td>
      <td>3168.000000</td>
      <td>3168.000000</td>
      <td>3168.000000</td>
    </tr>
    <tr>
      <th>mean</th>
      <td>0.180907</td>
      <td>0.057126</td>
      <td>0.185621</td>
      <td>0.140456</td>
      <td>0.224765</td>
      <td>0.084309</td>
      <td>3.140168</td>
      <td>36.568461</td>
      <td>0.895127</td>
      <td>0.408216</td>
      <td>0.165282</td>
      <td>0.180907</td>
      <td>0.142807</td>
      <td>0.036802</td>
      <td>0.258842</td>
      <td>0.829211</td>
      <td>0.052647</td>
      <td>5.047277</td>
      <td>4.994630</td>
      <td>0.173752</td>
    </tr>
    <tr>
      <th>std</th>
      <td>0.029918</td>
      <td>0.016652</td>
      <td>0.036360</td>
      <td>0.048680</td>
      <td>0.023639</td>
      <td>0.042783</td>
      <td>4.240529</td>
      <td>134.928661</td>
      <td>0.044980</td>
      <td>0.177521</td>
      <td>0.077203</td>
      <td>0.029918</td>
      <td>0.032304</td>
      <td>0.019220</td>
      <td>0.030077</td>
      <td>0.525205</td>
      <td>0.063299</td>
      <td>3.521157</td>
      <td>3.520039</td>
      <td>0.119454</td>
    </tr>
    <tr>
      <th>min</th>
      <td>0.039363</td>
      <td>0.018363</td>
      <td>0.010975</td>
      <td>0.000229</td>
      <td>0.042946</td>
      <td>0.014558</td>
      <td>0.141735</td>
      <td>2.068455</td>
      <td>0.738651</td>
      <td>0.036876</td>
      <td>0.000000</td>
      <td>0.039363</td>
      <td>0.055565</td>
      <td>0.009775</td>
      <td>0.103093</td>
      <td>0.007812</td>
      <td>0.004883</td>
      <td>0.007812</td>
      <td>0.000000</td>
      <td>0.000000</td>
    </tr>
    <tr>
      <th>25%</th>
      <td>0.163662</td>
      <td>0.041954</td>
      <td>0.169593</td>
      <td>0.111087</td>
      <td>0.208747</td>
      <td>0.042560</td>
      <td>1.649569</td>
      <td>5.669547</td>
      <td>0.861811</td>
      <td>0.258041</td>
      <td>0.118016</td>
      <td>0.163662</td>
      <td>0.116998</td>
      <td>0.018223</td>
      <td>0.253968</td>
      <td>0.419828</td>
      <td>0.007812</td>
      <td>2.070312</td>
      <td>2.044922</td>
      <td>0.099766</td>
    </tr>
    <tr>
      <th>50%</th>
      <td>0.184838</td>
      <td>0.059155</td>
      <td>0.190032</td>
      <td>0.140286</td>
      <td>0.225684</td>
      <td>0.094280</td>
      <td>2.197101</td>
      <td>8.318463</td>
      <td>0.901767</td>
      <td>0.396335</td>
      <td>0.186599</td>
      <td>0.184838</td>
      <td>0.140519</td>
      <td>0.046110</td>
      <td>0.271186</td>
      <td>0.765795</td>
      <td>0.023438</td>
      <td>4.992188</td>
      <td>4.945312</td>
      <td>0.139357</td>
    </tr>
    <tr>
      <th>75%</th>
      <td>0.199146</td>
      <td>0.067020</td>
      <td>0.210618</td>
      <td>0.175939</td>
      <td>0.243660</td>
      <td>0.114175</td>
      <td>2.931694</td>
      <td>13.648905</td>
      <td>0.928713</td>
      <td>0.533676</td>
      <td>0.221104</td>
      <td>0.199146</td>
      <td>0.169581</td>
      <td>0.047904</td>
      <td>0.277457</td>
      <td>1.177166</td>
      <td>0.070312</td>
      <td>7.007812</td>
      <td>6.992188</td>
      <td>0.209183</td>
    </tr>
    <tr>
      <th>max</th>
      <td>0.251124</td>
      <td>0.115273</td>
      <td>0.261224</td>
      <td>0.247347</td>
      <td>0.273469</td>
      <td>0.252225</td>
      <td>34.725453</td>
      <td>1309.612887</td>
      <td>0.981997</td>
      <td>0.842936</td>
      <td>0.280000</td>
      <td>0.251124</td>
      <td>0.237636</td>
      <td>0.204082</td>
      <td>0.279114</td>
      <td>2.957682</td>
      <td>0.458984</td>
      <td>21.867188</td>
      <td>21.843750</td>
      <td>0.932374</td>
    </tr>
  </tbody>
</table>
</div>
      <button class="colab-df-convert" onclick="convertToInteractive('df-0a150ad5-4f2a-4e1e-96b1-79d27a0d6d7a')"
              title="Convert this dataframe to an interactive table."
              style="display:none;">

  <svg xmlns="http://www.w3.org/2000/svg" height="24px"viewBox="0 0 24 24"
       width="24px">
    <path d="M0 0h24v24H0V0z" fill="none"/>
    <path d="M18.56 5.44l.94 2.06.94-2.06 2.06-.94-2.06-.94-.94-2.06-.94 2.06-2.06.94zm-11 1L8.5 8.5l.94-2.06 2.06-.94-2.06-.94L8.5 2.5l-.94 2.06-2.06.94zm10 10l.94 2.06.94-2.06 2.06-.94-2.06-.94-.94-2.06-.94 2.06-2.06.94z"/><path d="M17.41 7.96l-1.37-1.37c-.4-.4-.92-.59-1.43-.59-.52 0-1.04.2-1.43.59L10.3 9.45l-7.72 7.72c-.78.78-.78 2.05 0 2.83L4 21.41c.39.39.9.59 1.41.59.51 0 1.02-.2 1.41-.59l7.78-7.78 2.81-2.81c.8-.78.8-2.07 0-2.86zM5.41 20L4 18.59l7.72-7.72 1.47 1.35L5.41 20z"/>
  </svg>
      </button>

  <style>
    .colab-df-container {
      display:flex;
      flex-wrap:wrap;
      gap: 12px;
    }

    .colab-df-convert {
      background-color: #E8F0FE;
      border: none;
      border-radius: 50%;
      cursor: pointer;
      display: none;
      fill: #1967D2;
      height: 32px;
      padding: 0 0 0 0;
      width: 32px;
    }

    .colab-df-convert:hover {
      background-color: #E2EBFA;
      box-shadow: 0px 1px 2px rgba(60, 64, 67, 0.3), 0px 1px 3px 1px rgba(60, 64, 67, 0.15);
      fill: #174EA6;
    }

    [theme=dark] .colab-df-convert {
      background-color: #3B4455;
      fill: #D2E3FC;
    }

    [theme=dark] .colab-df-convert:hover {
      background-color: #434B5C;
      box-shadow: 0px 1px 3px 1px rgba(0, 0, 0, 0.15);
      filter: drop-shadow(0px 1px 2px rgba(0, 0, 0, 0.3));
      fill: #FFFFFF;
    }
  </style>

      <script>
        const buttonEl =
          document.querySelector('#df-0a150ad5-4f2a-4e1e-96b1-79d27a0d6d7a button.colab-df-convert');
        buttonEl.style.display =
          google.colab.kernel.accessAllowed ? 'block' : 'none';

        async function convertToInteractive(key) {
          const element = document.querySelector('#df-0a150ad5-4f2a-4e1e-96b1-79d27a0d6d7a');
          const dataTable =
            await google.colab.kernel.invokeFunction('convertToInteractive',
                                                     [key], {});
          if (!dataTable) return;

          const docLinkHtml = 'Like what you see? Visit the ' +
            '<a target="_blank" href=https://colab.research.google.com/notebooks/data_table.ipynb>data table notebook</a>'
            + ' to learn more about interactive tables.';
          element.innerHTML = '';
          dataTable['output_type'] = 'display_data';
          await google.colab.output.renderOutput(dataTable, element);
          const docLink = document.createElement('div');
          docLink.innerHTML = docLinkHtml;
          element.appendChild(docLink);
        }
      </script>
    </div>
  </div>




✅ 목소리 데이터에는 결측치가 없는 것을 확인할 수 있습니다.


```python
voice_df.info()
```

    <class 'pandas.core.frame.DataFrame'>
    RangeIndex: 3168 entries, 0 to 3167
    Data columns (total 21 columns):
     #   Column    Non-Null Count  Dtype  
    ---  ------    --------------  -----  
     0   meanfreq  3168 non-null   float64
     1   sd        3168 non-null   float64
     2   median    3168 non-null   float64
     3   Q25       3168 non-null   float64
     4   Q75       3168 non-null   float64
     5   IQR       3168 non-null   float64
     6   skew      3168 non-null   float64
     7   kurt      3168 non-null   float64
     8   sp.ent    3168 non-null   float64
     9   sfm       3168 non-null   float64
     10  mode      3168 non-null   float64
     11  centroid  3168 non-null   float64
     12  meanfun   3168 non-null   float64
     13  minfun    3168 non-null   float64
     14  maxfun    3168 non-null   float64
     15  meandom   3168 non-null   float64
     16  mindom    3168 non-null   float64
     17  maxdom    3168 non-null   float64
     18  dfrange   3168 non-null   float64
     19  modindx   3168 non-null   float64
     20  label     3168 non-null   object 
    dtypes: float64(20), object(1)
    memory usage: 519.9+ KB
    

저희의 타겟 데이터인 성별 label은 object 형태여서 숫자로 바꿔주었습니다.


```python
# object 형태인 데이터를 숫자로 바꿔주기 - female => 0, male => 1
voice_df.replace(to_replace="female", value=0, inplace=True)
voice_df.replace(to_replace="male", value=1, inplace=True)
voice_df.label.unique() # df의 label명을 여성은 0, 남성은 1로 변환했음.
```




    array([1, 0])



✅ 확인해보니 남자와 여자 데이터의 비율이 같아서 데이터를 나눌 때 비율에 신경쓰지 않아도 됩니다.


```python
plt.figure(figsize=(18, 8))
plt.subplot(1, 2, 1)
voice_df.label.value_counts().plot(kind="pie",
                                           fontsize=16,
                                           labels=["Male", "Female"],
                                           ylabel="Male vs Female",
                                           autopct='%1.1f%%');

plt.subplot(1, 2, 2)     # 데이터 내에서 Male과 Female의 비중이 얼마나 되는지 확인했습니다. 
sns.countplot(x="label",data=voice_df, palette="pastel")    # 데이터 내에서 Male과 Female의 갯수가 얼마나 되는지 확인해봤습니다.
plt.show()
```


    
![png](output_16_0.png)
    


성별 label 값을 기준으로 해서 어떤 column이 가장 영향을 미칠 수 있는지 heatmap을 통해서 확인을 했지만 유의미한 결과를 확인하기는 어려울 것으로 예상됩니다.


```python
# 변수 상관관계 확인하기
plt.figure(figsize=(15,10),dpi=100)
sns.heatmap(voice_df.corr(),cmap="viridis",annot=True,linewidth=0.5)
```




    <matplotlib.axes._subplots.AxesSubplot at 0x7f701a29e8d0>




    
![png](output_18_1.png)
    


바그래프를 통해 각 피쳐가 label 값을 구분하는데 얼마나 영향력을 미치는지 확인을 했습니다.


```python
plt.figure(figsize=(12,8))
data = voice_df.corr()["label"].sort_values(ascending=False)
indices = data.index
labels = []
corr = []
for i in range(1, len(indices)):
    labels.append(indices[i])
    corr.append(data[i])
sns.barplot(x=corr, y=labels, palette='viridis')
plt.title('Correlation coefficient between different features and Label')
plt.show()
```


    
![png](output_20_0.png)
    


meanfun(기본 주파수의 평균)이 가장 구분에 영향력이 크다고 생각되어 얼마나 구분이 상세하게 되어있을지를 그래프를 통해서 확인을 해봤습니다.


```python
sns.displot(voice_df, x="meanfun", hue="label",palette=["#ff0000","#0000FF"])
```




    <seaborn.axisgrid.FacetGrid at 0x7f701571a090>




    
![png](output_22_1.png)
    



```python
plt.subplots(4,5,figsize=(25,20))
for k in range(1,21):
    plt.subplot(4,5,k)
    plt.title(voice_df.columns[k-1])
    sns.kdeplot(voice_df.loc[voice_df['label'] == 0, voice_df.columns[k-1]], color= 'green', label='F')
    sns.kdeplot(voice_df.loc[voice_df['label'] == 1, voice_df.columns[k-1]], color= 'red', label='M')
```


    
![png](output_23_0.png)
    


결과적으로 가장 영향을 미치는 독립변수
- 분위수의 범위(IQR) : 상위75% 지점의 값과 하위 25% 지점의 값에 대한 차이
- 1분위값(Q25) : 하위 25%에 대한 값
- 주파수의 평균(meanfun) : 목소리 높이의 평균

위 세개의 요소가 label(성별), 즉 타겟을 잘 설명한다고 생각하여 위 세개의 피쳐를 이용해 머신러닝을 돌려보았습니다.

## 데이터를 분리하였습니다.


```python
#features = voice_df.iloc[:, :-1]                       # 모든 feature 변수 넣기
features = voice_df.loc[:,['Q25', 'meanfun', 'IQR']]    # 가장 상관관계가 높은 변수만 포함하기
target = voice_df.iloc[:,-1]
features.shape, target.shape
type(features), type(target)
```




    (pandas.core.frame.DataFrame, pandas.core.series.Series)




```python
X_train, X_test, y_train, y_test = train_test_split(features, target, test_size=0.2, random_state=121)
X_train.shape, y_train.shape
```




    ((2534, 3), (2534,))



# 머신러닝 모델 (feature 3개)

**LogisticRegression**


```python
regressionModel = LogisticRegression()  #로지스틱 회귀방법을 통해 정확도를 예측해봤습니다.
regressionModel.fit(X_train,y_train)
regressionModel.score(X_train,y_train)
```




    0.919889502762431



**KNeighborsClassifier**


```python
KNNModel = KNeighborsClassifier(n_neighbors=3) # K_neeghbor Classfier를 통해서 정확도를 예측해봤습니다.
KNNModel.fit(X_train,y_train)
KNNModel.score(X_train,y_train)
```




    0.9850039463299132



**Support Vector Machine**
- 분류 과제에 사용할 수 있는 강력한 머신러닝 지도학습 모델
- 2차원에서 기본적으로 두 개의 그룹(데이터)을 분리하는 방법으로 데이터들과 거리가 가장 먼 초평면(hyperplane)을 선택하여 분리하는 방법. 
-즉 분류를 위한 기준 선을 정의하는 모델입니다. 
-그래서 분류되지 않은 새로운 점이 나타나면 경계의 어느 쪽에 속하는지 확인해서 분류 과제를 수행할 수 있게 된다. 
-데이터를 분리하기 위해 직선(경계선)이 필요
-적당한 C값을 찾아나가는 과정 C가 작으면 에러 많이 허용 -> 언더피팅 C가 많으면 에러 거의 없게 -> 오버피팅
-정규분포일때 rbf
-다항식일때 poly


```python
svmRbfModel=sklearn.svm.SVC(kernel='rbf',C=10) 
svmRbfModel.fit(X_train,y_train)
svmRbfModel.score(X_train,y_train)
```




    0.9798737174427782




```python
svmPolyModel=sklearn.svm.SVC(kernel='poly',C=10000)
#다항식을 이용할 경우 poly
svmPolyModel.fit(X_train,y_train)
svmPolyModel.score(X_train,y_train)
```




    0.9727703235990529



**RandomForestClassifier**


```python
randomFModel = RandomForestClassifier(max_depth=3,min_samples_split=2) 
randomFModel.fit(X_train, y_train)
randomFModel.score(X_train,y_train)
```




    0.9723756906077348



**DecisionTreeClassifier**


```python
dTreeModel = DecisionTreeClassifier(max_depth=3,min_samples_split=2) 
randomFModel.fit(X_train, y_train)
dTreeModel.fit(X_train, y_train)
dTreeModel.score(X_train,y_train)
```




    0.9743488555643252




```python
trainScores = [regressionModel.score(X_train, y_train), KNNModel.score(X_train, y_train),svmRbfModel.score(X_train, y_train),svmPolyModel.score(X_train, y_train), randomFModel.score(X_train,y_train), dTreeModel.score(X_train,y_train)]
testScores = [regressionModel.score(X_test, y_test), KNNModel.score(X_test, y_test), svmRbfModel.score(X_test, y_test),svmPolyModel.score(X_test, y_test), randomFModel.score(X_test,y_test), dTreeModel.score(X_test,y_test)]
indices = ['Logistic Regression', 'KNN', 'SVM-RBF','SVM-Poly', 'RandomForest', 'DecisionTree']
scores = pd.DataFrame({'Training Score': trainScores,'Testing Score': testScores}, index=indices) #모델별로 train 정확도와 test정확도의 결과값들을 비교해봤습니다.
```


```python
scores #정확도의 차이는 이렇게 표로 나타낼 수 있었고
```





  <div id="df-82058b8e-4cad-4356-9fa8-522931d5e585">
    <div class="colab-df-container">
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
      <th>Training Score</th>
      <th>Testing Score</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>Logistic Regression</th>
      <td>0.919890</td>
      <td>0.899054</td>
    </tr>
    <tr>
      <th>KNN</th>
      <td>0.985004</td>
      <td>0.955836</td>
    </tr>
    <tr>
      <th>SVM-RBF</th>
      <td>0.979874</td>
      <td>0.962145</td>
    </tr>
    <tr>
      <th>SVM-Poly</th>
      <td>0.972770</td>
      <td>0.952681</td>
    </tr>
    <tr>
      <th>RandomForest</th>
      <td>0.973165</td>
      <td>0.955836</td>
    </tr>
    <tr>
      <th>DecisionTree</th>
      <td>0.974349</td>
      <td>0.955836</td>
    </tr>
  </tbody>
</table>
</div>
      <button class="colab-df-convert" onclick="convertToInteractive('df-82058b8e-4cad-4356-9fa8-522931d5e585')"
              title="Convert this dataframe to an interactive table."
              style="display:none;">

  <svg xmlns="http://www.w3.org/2000/svg" height="24px"viewBox="0 0 24 24"
       width="24px">
    <path d="M0 0h24v24H0V0z" fill="none"/>
    <path d="M18.56 5.44l.94 2.06.94-2.06 2.06-.94-2.06-.94-.94-2.06-.94 2.06-2.06.94zm-11 1L8.5 8.5l.94-2.06 2.06-.94-2.06-.94L8.5 2.5l-.94 2.06-2.06.94zm10 10l.94 2.06.94-2.06 2.06-.94-2.06-.94-.94-2.06-.94 2.06-2.06.94z"/><path d="M17.41 7.96l-1.37-1.37c-.4-.4-.92-.59-1.43-.59-.52 0-1.04.2-1.43.59L10.3 9.45l-7.72 7.72c-.78.78-.78 2.05 0 2.83L4 21.41c.39.39.9.59 1.41.59.51 0 1.02-.2 1.41-.59l7.78-7.78 2.81-2.81c.8-.78.8-2.07 0-2.86zM5.41 20L4 18.59l7.72-7.72 1.47 1.35L5.41 20z"/>
  </svg>
      </button>

  <style>
    .colab-df-container {
      display:flex;
      flex-wrap:wrap;
      gap: 12px;
    }

    .colab-df-convert {
      background-color: #E8F0FE;
      border: none;
      border-radius: 50%;
      cursor: pointer;
      display: none;
      fill: #1967D2;
      height: 32px;
      padding: 0 0 0 0;
      width: 32px;
    }

    .colab-df-convert:hover {
      background-color: #E2EBFA;
      box-shadow: 0px 1px 2px rgba(60, 64, 67, 0.3), 0px 1px 3px 1px rgba(60, 64, 67, 0.15);
      fill: #174EA6;
    }

    [theme=dark] .colab-df-convert {
      background-color: #3B4455;
      fill: #D2E3FC;
    }

    [theme=dark] .colab-df-convert:hover {
      background-color: #434B5C;
      box-shadow: 0px 1px 3px 1px rgba(0, 0, 0, 0.15);
      filter: drop-shadow(0px 1px 2px rgba(0, 0, 0, 0.3));
      fill: #FFFFFF;
    }
  </style>

      <script>
        const buttonEl =
          document.querySelector('#df-82058b8e-4cad-4356-9fa8-522931d5e585 button.colab-df-convert');
        buttonEl.style.display =
          google.colab.kernel.accessAllowed ? 'block' : 'none';

        async function convertToInteractive(key) {
          const element = document.querySelector('#df-82058b8e-4cad-4356-9fa8-522931d5e585');
          const dataTable =
            await google.colab.kernel.invokeFunction('convertToInteractive',
                                                     [key], {});
          if (!dataTable) return;

          const docLinkHtml = 'Like what you see? Visit the ' +
            '<a target="_blank" href=https://colab.research.google.com/notebooks/data_table.ipynb>data table notebook</a>'
            + ' to learn more about interactive tables.';
          element.innerHTML = '';
          dataTable['output_type'] = 'display_data';
          await google.colab.output.renderOutput(dataTable, element);
          const docLink = document.createElement('div');
          docLink.innerHTML = docLinkHtml;
          element.appendChild(docLink);
        }
      </script>
    </div>
  </div>





```python
plot = scores.plot.bar(figsize=(16, 8), rot=0)
plt.title('Training and Testing Scores')
plt.show()  #모델별로 train 정확도와 test의 정확도의 결과값들을 그래프로 나타내봤습니다.
```


    
![png](output_42_0.png)
    



```python
predRegression = regressionModel.predict(X_test) #xtest의 예측값들을 각 모델별로 확인
predSVMRbf = svmRbfModel.predict(X_test)
predKNN = KNNModel.predict(X_test)
predSVMPoly = svmPolyModel.predict(X_test)
predRandomF = randomFModel.predict(X_test)
predDTree = dTreeModel.predict(X_test)
predVals = pd.DataFrame(data={'truth': y_test, 'regression': predRegression, 'knn': predKNN, 'svm-rbf': predSVMRbf, 'svm-poly': predSVMPoly, 'random-forest': predRandomF, 'decision-tree': predDTree})
```

## 음성데이터를 통해 확인
학습한 모델이 잘 돌아가는지 확인하기 위해 음성데이터 수집
- 카운터테너 목소리 데이터
- 일반 남자 고음 목소리 데이터
- 일반 남자 저음 목소리 데이터
- 배우 김혜수님 목소리 데이터
- 일반 여자 목소리 데이터
- 짱구 목소리 데이터

## 1차 테스트 (feature 3개로만 예측)


```python
test_df1 = test_df.copy()
```


```python
test_df1.drop(['meanfreq','maxdom','sd','median','Q75','skew','kurt','sp.ent','sfm','mode','centroid','minfun','maxfun','meandom','mindom','dfrange','modindx'], axis = 1,inplace=True)
```


```python
pred = KNNModel.predict(test_df1.drop(['label'],axis=1))
pred
```




    array([1, 1, 1, 1, 1, 1])



- 앞선 모델들의 정확도가 높아서 좋아했는데 알고보니 이는 과적합으로 인해 높게 나타나는 결과였다.
- 높은 상관관계를 가지는 feature들을 이용해도 정확도가 낮게 나올 수 있다. ex) 수업시간 타이타닉

**피드백**
- 너무 낮은 변수들로 인해 나타난 과적합 --> 전체 변수들에 대해서 label(성별)과 비교해보았습니다.

# 머신러닝 모델 (모든 feature)

## 데이터를 분리하였습니다.


```python
# object 형태인 데이터를 숫자로 바꿔주기 - female => 0, male => 1
voice_df.replace(to_replace="female", value=0, inplace=True)
voice_df.replace(to_replace="male", value=1, inplace=True)
voice_df.label.unique() # df의 label명을 여성은 0, 남성은 1로 변환했음.
```




    array([1, 0])




```python
features = voice_df.iloc[:, :-1]                       # 모든 feature 변수 넣기
#features = voice_df.loc[:,['Q25', 'meanfun', 'IQR']]    
target = voice_df.iloc[:,-1]
features.shape, target.shape
type(features), type(target)
```




    (pandas.core.frame.DataFrame, pandas.core.series.Series)




```python
X_train, X_test, y_train, y_test = train_test_split(features, target, test_size=0.2, random_state=121)
X_train.shape, y_train.shape
```




    ((2534, 20), (2534,))



## 데이터 다시 돌리기

**LogisticRegression**


```python
regressionModel = LogisticRegression()  #로지스틱 회귀방법을 통해 정확도를 예측해봤습니다.
regressionModel.fit(X_train,y_train)
regressionModel.score(X_train,y_train)
```




    0.9088397790055248



**KNeighborsClassifier**


```python
KNNModel = KNeighborsClassifier(n_neighbors=3) # K_neeghbor Classfier를 통해서 정확도를 예측해봤습니다.
KNNModel.fit(X_train,y_train)
KNNModel.score(X_train,y_train)
```




    0.8579321231254933



**Support Vector Machine**


```python
svmRbfModel=sklearn.svm.SVC(kernel='rbf',C=10) 
svmRbfModel.fit(X_train,y_train)
svmRbfModel.score(X_train,y_train)
```




    0.6890292028413575




```python
svmPolyModel=sklearn.svm.SVC(kernel='poly',C=10000)
#다항식을 이용할 경우 poly
svmPolyModel.fit(X_train,y_train)
svmPolyModel.score(X_train,y_train)
```




    0.6377269139700079



**RandomForestClassifier**


```python
randomFModel = RandomForestClassifier(max_depth=3,min_samples_split=2) 
randomFModel.fit(X_train, y_train)
randomFModel.score(X_train,y_train)
```




    0.9771112865035517



**DecisionTreeClassifier**


```python
dTreeModel = DecisionTreeClassifier(max_depth=3,min_samples_split=2)   
randomFModel.fit(X_train, y_train)
dTreeModel.fit(X_train, y_train)
dTreeModel.score(X_train,y_train)
```




    0.9755327545382794




```python
trainScores = [regressionModel.score(X_train, y_train), KNNModel.score(X_train, y_train),svmRbfModel.score(X_train, y_train),svmPolyModel.score(X_train, y_train), randomFModel.score(X_train,y_train), dTreeModel.score(X_train,y_train)]
testScores = [regressionModel.score(X_test, y_test), KNNModel.score(X_test, y_test), svmRbfModel.score(X_test, y_test),svmPolyModel.score(X_test, y_test), randomFModel.score(X_test,y_test), dTreeModel.score(X_test,y_test)]
indices = ['Logistic Regression', 'KNN', 'SVM-RBF','SVM-Poly', 'RandomForest', 'DecisionTree']
scores = pd.DataFrame({'Training Score': trainScores,'Testing Score': testScores}, index=indices) #모델별로 train 정확도와 test정확도의 결과값들을 비교해봤습니다.
```


```python
scores #정화도의 차이는 이렇게 표로 나타낼 수 있었고
```





  <div id="df-9f25bf04-f15f-413a-82e1-83308a0a2ba2">
    <div class="colab-df-container">
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
      <th>Training Score</th>
      <th>Testing Score</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>Logistic Regression</th>
      <td>0.908840</td>
      <td>0.878549</td>
    </tr>
    <tr>
      <th>KNN</th>
      <td>0.857932</td>
      <td>0.697161</td>
    </tr>
    <tr>
      <th>SVM-RBF</th>
      <td>0.689029</td>
      <td>0.668770</td>
    </tr>
    <tr>
      <th>SVM-Poly</th>
      <td>0.637727</td>
      <td>0.659306</td>
    </tr>
    <tr>
      <th>RandomForest</th>
      <td>0.972770</td>
      <td>0.955836</td>
    </tr>
    <tr>
      <th>DecisionTree</th>
      <td>0.975533</td>
      <td>0.955836</td>
    </tr>
  </tbody>
</table>
</div>
      <button class="colab-df-convert" onclick="convertToInteractive('df-9f25bf04-f15f-413a-82e1-83308a0a2ba2')"
              title="Convert this dataframe to an interactive table."
              style="display:none;">

  <svg xmlns="http://www.w3.org/2000/svg" height="24px"viewBox="0 0 24 24"
       width="24px">
    <path d="M0 0h24v24H0V0z" fill="none"/>
    <path d="M18.56 5.44l.94 2.06.94-2.06 2.06-.94-2.06-.94-.94-2.06-.94 2.06-2.06.94zm-11 1L8.5 8.5l.94-2.06 2.06-.94-2.06-.94L8.5 2.5l-.94 2.06-2.06.94zm10 10l.94 2.06.94-2.06 2.06-.94-2.06-.94-.94-2.06-.94 2.06-2.06.94z"/><path d="M17.41 7.96l-1.37-1.37c-.4-.4-.92-.59-1.43-.59-.52 0-1.04.2-1.43.59L10.3 9.45l-7.72 7.72c-.78.78-.78 2.05 0 2.83L4 21.41c.39.39.9.59 1.41.59.51 0 1.02-.2 1.41-.59l7.78-7.78 2.81-2.81c.8-.78.8-2.07 0-2.86zM5.41 20L4 18.59l7.72-7.72 1.47 1.35L5.41 20z"/>
  </svg>
      </button>

  <style>
    .colab-df-container {
      display:flex;
      flex-wrap:wrap;
      gap: 12px;
    }

    .colab-df-convert {
      background-color: #E8F0FE;
      border: none;
      border-radius: 50%;
      cursor: pointer;
      display: none;
      fill: #1967D2;
      height: 32px;
      padding: 0 0 0 0;
      width: 32px;
    }

    .colab-df-convert:hover {
      background-color: #E2EBFA;
      box-shadow: 0px 1px 2px rgba(60, 64, 67, 0.3), 0px 1px 3px 1px rgba(60, 64, 67, 0.15);
      fill: #174EA6;
    }

    [theme=dark] .colab-df-convert {
      background-color: #3B4455;
      fill: #D2E3FC;
    }

    [theme=dark] .colab-df-convert:hover {
      background-color: #434B5C;
      box-shadow: 0px 1px 3px 1px rgba(0, 0, 0, 0.15);
      filter: drop-shadow(0px 1px 2px rgba(0, 0, 0, 0.3));
      fill: #FFFFFF;
    }
  </style>

      <script>
        const buttonEl =
          document.querySelector('#df-9f25bf04-f15f-413a-82e1-83308a0a2ba2 button.colab-df-convert');
        buttonEl.style.display =
          google.colab.kernel.accessAllowed ? 'block' : 'none';

        async function convertToInteractive(key) {
          const element = document.querySelector('#df-9f25bf04-f15f-413a-82e1-83308a0a2ba2');
          const dataTable =
            await google.colab.kernel.invokeFunction('convertToInteractive',
                                                     [key], {});
          if (!dataTable) return;

          const docLinkHtml = 'Like what you see? Visit the ' +
            '<a target="_blank" href=https://colab.research.google.com/notebooks/data_table.ipynb>data table notebook</a>'
            + ' to learn more about interactive tables.';
          element.innerHTML = '';
          dataTable['output_type'] = 'display_data';
          await google.colab.output.renderOutput(dataTable, element);
          const docLink = document.createElement('div');
          docLink.innerHTML = docLinkHtml;
          element.appendChild(docLink);
        }
      </script>
    </div>
  </div>





```python
plot = scores.plot.bar(figsize=(16, 8), rot=0)
plt.title('Training and Testing Scores')
plt.show()  #모델별로 train 정확도와 test의 정확도의 결과값들을 그래프로 나타내봤습니다.
```


    
![png](output_69_0.png)
    



```python
predRegression = regressionModel.predict(X_test) #xtest의 예측값들을 각 모델별로 확인
predSVMRbf = svmRbfModel.predict(X_test)
predKNN = KNNModel.predict(X_test)
predSVMPoly = svmPolyModel.predict(X_test)
predRandomF = randomFModel.predict(X_test)
predDTree = dTreeModel.predict(X_test)
predVals = pd.DataFrame(data={'truth': y_test, 'regression': predRegression, 'knn': predKNN, 'svm-rbf': predSVMRbf, 'svm-poly': predSVMPoly, 'random-forest': predRandomF, 'decision-tree': predDTree})
```

## 음성데이터를 통해 확인
학습한 모델이 잘 돌아가는지 확인하기 위해 음성데이터 수집
- 카운터테너 목소리 데이터
- 일반 남자 고음 목소리 데이터
- 일반 남자 저음 목소리 데이터
- 배우 김혜수님 목소리 데이터
- 일반 여자 목소리 데이터
- 짱구 목소리 데이터

## 2차 테스트 (전체 feature로 예측)


```python
test_df2 = test_df.copy()
```


```python
# object 형태인 데이터를 숫자로 바꿔주기 - female => 0, male => 1
test_df2.replace(to_replace="female", value=0, inplace=True)
test_df2.replace(to_replace="male", value=1, inplace=True)
test_df2.label.unique() # df의 label명을 여성은 0, 남성은 1로 변환했음.
```




    array([1, 0])




```python
pred = dTreeModel.predict(test_df2.drop(['label'],axis=1))
pred
```




    array([1, 0, 1, 0, 0, 0])




```python
accuracy_score((test_df2.label), pred)
```




    0.8333333333333334



# 딥러닝 모델

## Sigmoid 모델


```python
# relu -> sigmoid & dropout 세줄에 한번 추가
model = Sequential()
model.add(Dense(256, input_shape=(20,)))
model.add(Dense(128, activation="relu"))
model.add(Dense(64, activation="relu"))
model.add(Dropout(0.3))
model.add(Dense(32, activation="relu"))
model.add(Dense(16, activation="relu"))
model.add(Dense(1, activation="sigmoid"))

# sigmoid와 binary crossentropy를 이용한 이유는 male/female 2개의 바이너리이기 때문에

model.compile(loss="binary_crossentropy", metrics=["accuracy"], optimizer=tf.keras.optimizers.Adam(lr=0.001))

model.fit(X_train, y_train, epochs=100,
          batch_size=64, validation_split=0.25,
          callbacks=[EarlyStopping(monitor='val_loss', patience=10)])
```

    Epoch 1/100
    30/30 [==============================] - 1s 13ms/step - loss: 0.7870 - accuracy: 0.4984 - val_loss: 0.6791 - val_accuracy: 0.5110
    Epoch 2/100
    30/30 [==============================] - 0s 6ms/step - loss: 0.7954 - accuracy: 0.5084 - val_loss: 0.6807 - val_accuracy: 0.5016
    Epoch 3/100
    30/30 [==============================] - 0s 5ms/step - loss: 0.7584 - accuracy: 0.5095 - val_loss: 0.7473 - val_accuracy: 0.5363
    Epoch 4/100
    30/30 [==============================] - 0s 5ms/step - loss: 0.7348 - accuracy: 0.5358 - val_loss: 0.6610 - val_accuracy: 0.5063
    Epoch 5/100
    30/30 [==============================] - 0s 5ms/step - loss: 0.6923 - accuracy: 0.5874 - val_loss: 0.6444 - val_accuracy: 0.6278
    Epoch 6/100
    30/30 [==============================] - 0s 6ms/step - loss: 0.6518 - accuracy: 0.6142 - val_loss: 0.6330 - val_accuracy: 0.6404
    Epoch 7/100
    30/30 [==============================] - 0s 7ms/step - loss: 0.6570 - accuracy: 0.6553 - val_loss: 0.5695 - val_accuracy: 0.7334
    Epoch 8/100
    30/30 [==============================] - 0s 5ms/step - loss: 0.6025 - accuracy: 0.6874 - val_loss: 0.5947 - val_accuracy: 0.7366
    Epoch 9/100
    30/30 [==============================] - 0s 5ms/step - loss: 0.5969 - accuracy: 0.6911 - val_loss: 0.4973 - val_accuracy: 0.7461
    Epoch 10/100
    30/30 [==============================] - 0s 7ms/step - loss: 0.5639 - accuracy: 0.7253 - val_loss: 0.4880 - val_accuracy: 0.7539
    Epoch 11/100
    30/30 [==============================] - 0s 6ms/step - loss: 0.5645 - accuracy: 0.7253 - val_loss: 0.4564 - val_accuracy: 0.7697
    Epoch 12/100
    30/30 [==============================] - 0s 5ms/step - loss: 0.5194 - accuracy: 0.7453 - val_loss: 0.4223 - val_accuracy: 0.8091
    Epoch 13/100
    30/30 [==============================] - 0s 6ms/step - loss: 0.4816 - accuracy: 0.7684 - val_loss: 0.4130 - val_accuracy: 0.8091
    Epoch 14/100
    30/30 [==============================] - 0s 5ms/step - loss: 0.4750 - accuracy: 0.7837 - val_loss: 0.4019 - val_accuracy: 0.8202
    Epoch 15/100
    30/30 [==============================] - 0s 5ms/step - loss: 0.4668 - accuracy: 0.7858 - val_loss: 0.3919 - val_accuracy: 0.8218
    Epoch 16/100
    30/30 [==============================] - 0s 6ms/step - loss: 0.4349 - accuracy: 0.8058 - val_loss: 0.3600 - val_accuracy: 0.8391
    Epoch 17/100
    30/30 [==============================] - 0s 5ms/step - loss: 0.4447 - accuracy: 0.7947 - val_loss: 0.3458 - val_accuracy: 0.8454
    Epoch 18/100
    30/30 [==============================] - 0s 5ms/step - loss: 0.4407 - accuracy: 0.8147 - val_loss: 0.3471 - val_accuracy: 0.8517
    Epoch 19/100
    30/30 [==============================] - 0s 6ms/step - loss: 0.4151 - accuracy: 0.8232 - val_loss: 0.3169 - val_accuracy: 0.8644
    Epoch 20/100
    30/30 [==============================] - 0s 6ms/step - loss: 0.4391 - accuracy: 0.8037 - val_loss: 0.3819 - val_accuracy: 0.8155
    Epoch 21/100
    30/30 [==============================] - 0s 6ms/step - loss: 0.3833 - accuracy: 0.8326 - val_loss: 0.3037 - val_accuracy: 0.8691
    Epoch 22/100
    30/30 [==============================] - 0s 6ms/step - loss: 0.3483 - accuracy: 0.8568 - val_loss: 0.2736 - val_accuracy: 0.8785
    Epoch 23/100
    30/30 [==============================] - 0s 6ms/step - loss: 0.3486 - accuracy: 0.8521 - val_loss: 0.2577 - val_accuracy: 0.8864
    Epoch 24/100
    30/30 [==============================] - 0s 6ms/step - loss: 0.3250 - accuracy: 0.8621 - val_loss: 0.3118 - val_accuracy: 0.8565
    Epoch 25/100
    30/30 [==============================] - 0s 6ms/step - loss: 0.3434 - accuracy: 0.8632 - val_loss: 0.2606 - val_accuracy: 0.8864
    Epoch 26/100
    30/30 [==============================] - 0s 6ms/step - loss: 0.3044 - accuracy: 0.8705 - val_loss: 0.2128 - val_accuracy: 0.8991
    Epoch 27/100
    30/30 [==============================] - 0s 7ms/step - loss: 0.2943 - accuracy: 0.8853 - val_loss: 0.2667 - val_accuracy: 0.8533
    Epoch 28/100
    30/30 [==============================] - 0s 5ms/step - loss: 0.2830 - accuracy: 0.8784 - val_loss: 0.2137 - val_accuracy: 0.9022
    Epoch 29/100
    30/30 [==============================] - 0s 6ms/step - loss: 0.2603 - accuracy: 0.8932 - val_loss: 0.1995 - val_accuracy: 0.9101
    Epoch 30/100
    30/30 [==============================] - 0s 6ms/step - loss: 0.2644 - accuracy: 0.8905 - val_loss: 0.2296 - val_accuracy: 0.8975
    Epoch 31/100
    30/30 [==============================] - 0s 6ms/step - loss: 0.2785 - accuracy: 0.8853 - val_loss: 0.1903 - val_accuracy: 0.9054
    Epoch 32/100
    30/30 [==============================] - 0s 6ms/step - loss: 0.3020 - accuracy: 0.8763 - val_loss: 0.2051 - val_accuracy: 0.8991
    Epoch 33/100
    30/30 [==============================] - 0s 6ms/step - loss: 0.2771 - accuracy: 0.8805 - val_loss: 0.1743 - val_accuracy: 0.9117
    Epoch 34/100
    30/30 [==============================] - 0s 6ms/step - loss: 0.2954 - accuracy: 0.8668 - val_loss: 0.2195 - val_accuracy: 0.8896
    Epoch 35/100
    30/30 [==============================] - 0s 5ms/step - loss: 0.2711 - accuracy: 0.8811 - val_loss: 0.1793 - val_accuracy: 0.9196
    Epoch 36/100
    30/30 [==============================] - 0s 6ms/step - loss: 0.2594 - accuracy: 0.8826 - val_loss: 0.1905 - val_accuracy: 0.9101
    Epoch 37/100
    30/30 [==============================] - 0s 6ms/step - loss: 0.2539 - accuracy: 0.8932 - val_loss: 0.1929 - val_accuracy: 0.9038
    Epoch 38/100
    30/30 [==============================] - 0s 5ms/step - loss: 0.2365 - accuracy: 0.9037 - val_loss: 0.1916 - val_accuracy: 0.9180
    Epoch 39/100
    30/30 [==============================] - 0s 6ms/step - loss: 0.2313 - accuracy: 0.8979 - val_loss: 0.1958 - val_accuracy: 0.9069
    Epoch 40/100
    30/30 [==============================] - 0s 5ms/step - loss: 0.2326 - accuracy: 0.9011 - val_loss: 0.1703 - val_accuracy: 0.9085
    Epoch 41/100
    30/30 [==============================] - 0s 5ms/step - loss: 0.2395 - accuracy: 0.8932 - val_loss: 0.2530 - val_accuracy: 0.8580
    Epoch 42/100
    30/30 [==============================] - 0s 6ms/step - loss: 0.2463 - accuracy: 0.8868 - val_loss: 0.1605 - val_accuracy: 0.9196
    Epoch 43/100
    30/30 [==============================] - 0s 5ms/step - loss: 0.2199 - accuracy: 0.9011 - val_loss: 0.1547 - val_accuracy: 0.9211
    Epoch 44/100
    30/30 [==============================] - 0s 5ms/step - loss: 0.2173 - accuracy: 0.9121 - val_loss: 0.1471 - val_accuracy: 0.9243
    Epoch 45/100
    30/30 [==============================] - 0s 5ms/step - loss: 0.2270 - accuracy: 0.9037 - val_loss: 0.1857 - val_accuracy: 0.9101
    Epoch 46/100
    30/30 [==============================] - 0s 6ms/step - loss: 0.2232 - accuracy: 0.9047 - val_loss: 0.1612 - val_accuracy: 0.9322
    Epoch 47/100
    30/30 [==============================] - 0s 5ms/step - loss: 0.2544 - accuracy: 0.8968 - val_loss: 0.1776 - val_accuracy: 0.9164
    Epoch 48/100
    30/30 [==============================] - 0s 5ms/step - loss: 0.1971 - accuracy: 0.9179 - val_loss: 0.1526 - val_accuracy: 0.9464
    Epoch 49/100
    30/30 [==============================] - 0s 5ms/step - loss: 0.2574 - accuracy: 0.8989 - val_loss: 0.1523 - val_accuracy: 0.9401
    Epoch 50/100
    30/30 [==============================] - 0s 6ms/step - loss: 0.2096 - accuracy: 0.9026 - val_loss: 0.1505 - val_accuracy: 0.9464
    Epoch 51/100
    30/30 [==============================] - 0s 5ms/step - loss: 0.2002 - accuracy: 0.9132 - val_loss: 0.1536 - val_accuracy: 0.9432
    Epoch 52/100
    30/30 [==============================] - 0s 5ms/step - loss: 0.1961 - accuracy: 0.9189 - val_loss: 0.1424 - val_accuracy: 0.9464
    Epoch 53/100
    30/30 [==============================] - 0s 5ms/step - loss: 0.1996 - accuracy: 0.9084 - val_loss: 0.1672 - val_accuracy: 0.9353
    Epoch 54/100
    30/30 [==============================] - 0s 6ms/step - loss: 0.2104 - accuracy: 0.9074 - val_loss: 0.1401 - val_accuracy: 0.9527
    Epoch 55/100
    30/30 [==============================] - 0s 5ms/step - loss: 0.2232 - accuracy: 0.9011 - val_loss: 0.1566 - val_accuracy: 0.9385
    Epoch 56/100
    30/30 [==============================] - 0s 6ms/step - loss: 0.1890 - accuracy: 0.9289 - val_loss: 0.1346 - val_accuracy: 0.9511
    Epoch 57/100
    30/30 [==============================] - 0s 5ms/step - loss: 0.1872 - accuracy: 0.9300 - val_loss: 0.1483 - val_accuracy: 0.9448
    Epoch 58/100
    30/30 [==============================] - 0s 5ms/step - loss: 0.1890 - accuracy: 0.9205 - val_loss: 0.1474 - val_accuracy: 0.9432
    Epoch 59/100
    30/30 [==============================] - 0s 5ms/step - loss: 0.1730 - accuracy: 0.9316 - val_loss: 0.1365 - val_accuracy: 0.9527
    Epoch 60/100
    30/30 [==============================] - 0s 6ms/step - loss: 0.1951 - accuracy: 0.9263 - val_loss: 0.1339 - val_accuracy: 0.9543
    Epoch 61/100
    30/30 [==============================] - 0s 6ms/step - loss: 0.1876 - accuracy: 0.9237 - val_loss: 0.1965 - val_accuracy: 0.9148
    Epoch 62/100
    30/30 [==============================] - 0s 5ms/step - loss: 0.2250 - accuracy: 0.9021 - val_loss: 0.1320 - val_accuracy: 0.9558
    Epoch 63/100
    30/30 [==============================] - 0s 5ms/step - loss: 0.1787 - accuracy: 0.9358 - val_loss: 0.1254 - val_accuracy: 0.9574
    Epoch 64/100
    30/30 [==============================] - 0s 6ms/step - loss: 0.1724 - accuracy: 0.9332 - val_loss: 0.1226 - val_accuracy: 0.9574
    Epoch 65/100
    30/30 [==============================] - 0s 5ms/step - loss: 0.1608 - accuracy: 0.9379 - val_loss: 0.1344 - val_accuracy: 0.9432
    Epoch 66/100
    30/30 [==============================] - 0s 6ms/step - loss: 0.1865 - accuracy: 0.9232 - val_loss: 0.1437 - val_accuracy: 0.9432
    Epoch 67/100
    30/30 [==============================] - 0s 6ms/step - loss: 0.1689 - accuracy: 0.9353 - val_loss: 0.1214 - val_accuracy: 0.9606
    Epoch 68/100
    30/30 [==============================] - 0s 6ms/step - loss: 0.1674 - accuracy: 0.9379 - val_loss: 0.1301 - val_accuracy: 0.9464
    Epoch 69/100
    30/30 [==============================] - 0s 6ms/step - loss: 0.1589 - accuracy: 0.9432 - val_loss: 0.1254 - val_accuracy: 0.9590
    Epoch 70/100
    30/30 [==============================] - 0s 6ms/step - loss: 0.1733 - accuracy: 0.9295 - val_loss: 0.1325 - val_accuracy: 0.9432
    Epoch 71/100
    30/30 [==============================] - 0s 5ms/step - loss: 0.1613 - accuracy: 0.9353 - val_loss: 0.1588 - val_accuracy: 0.9290
    Epoch 72/100
    30/30 [==============================] - 0s 5ms/step - loss: 0.1736 - accuracy: 0.9321 - val_loss: 0.1152 - val_accuracy: 0.9606
    Epoch 73/100
    30/30 [==============================] - 0s 5ms/step - loss: 0.1574 - accuracy: 0.9411 - val_loss: 0.1430 - val_accuracy: 0.9495
    Epoch 74/100
    30/30 [==============================] - 0s 6ms/step - loss: 0.1988 - accuracy: 0.9258 - val_loss: 0.2341 - val_accuracy: 0.8817
    Epoch 75/100
    30/30 [==============================] - 0s 5ms/step - loss: 0.1976 - accuracy: 0.9126 - val_loss: 0.1510 - val_accuracy: 0.9479
    Epoch 76/100
    30/30 [==============================] - 0s 6ms/step - loss: 0.1681 - accuracy: 0.9311 - val_loss: 0.1171 - val_accuracy: 0.9543
    Epoch 77/100
    30/30 [==============================] - 0s 6ms/step - loss: 0.1568 - accuracy: 0.9395 - val_loss: 0.1149 - val_accuracy: 0.9637
    Epoch 78/100
    30/30 [==============================] - 0s 5ms/step - loss: 0.1518 - accuracy: 0.9416 - val_loss: 0.1121 - val_accuracy: 0.9590
    Epoch 79/100
    30/30 [==============================] - 0s 5ms/step - loss: 0.1361 - accuracy: 0.9495 - val_loss: 0.1145 - val_accuracy: 0.9511
    Epoch 80/100
    30/30 [==============================] - 0s 6ms/step - loss: 0.1318 - accuracy: 0.9500 - val_loss: 0.1064 - val_accuracy: 0.9653
    Epoch 81/100
    30/30 [==============================] - 0s 6ms/step - loss: 0.1315 - accuracy: 0.9516 - val_loss: 0.1283 - val_accuracy: 0.9511
    Epoch 82/100
    30/30 [==============================] - 0s 6ms/step - loss: 0.1266 - accuracy: 0.9500 - val_loss: 0.0978 - val_accuracy: 0.9653
    Epoch 83/100
    30/30 [==============================] - 0s 5ms/step - loss: 0.1397 - accuracy: 0.9479 - val_loss: 0.1153 - val_accuracy: 0.9495
    Epoch 84/100
    30/30 [==============================] - 0s 5ms/step - loss: 0.1360 - accuracy: 0.9500 - val_loss: 0.1592 - val_accuracy: 0.9385
    Epoch 85/100
    30/30 [==============================] - 0s 5ms/step - loss: 0.1343 - accuracy: 0.9532 - val_loss: 0.1065 - val_accuracy: 0.9606
    Epoch 86/100
    30/30 [==============================] - 0s 6ms/step - loss: 0.1396 - accuracy: 0.9432 - val_loss: 0.1150 - val_accuracy: 0.9495
    Epoch 87/100
    30/30 [==============================] - 0s 6ms/step - loss: 0.1612 - accuracy: 0.9358 - val_loss: 0.1090 - val_accuracy: 0.9637
    Epoch 88/100
    30/30 [==============================] - 0s 6ms/step - loss: 0.1497 - accuracy: 0.9479 - val_loss: 0.1041 - val_accuracy: 0.9621
    Epoch 89/100
    30/30 [==============================] - 0s 6ms/step - loss: 0.1306 - accuracy: 0.9505 - val_loss: 0.1472 - val_accuracy: 0.9432
    Epoch 90/100
    30/30 [==============================] - 0s 5ms/step - loss: 0.1204 - accuracy: 0.9511 - val_loss: 0.1073 - val_accuracy: 0.9574
    Epoch 91/100
    30/30 [==============================] - 0s 5ms/step - loss: 0.1147 - accuracy: 0.9600 - val_loss: 0.0936 - val_accuracy: 0.9716
    Epoch 92/100
    30/30 [==============================] - 0s 6ms/step - loss: 0.1484 - accuracy: 0.9442 - val_loss: 0.2829 - val_accuracy: 0.8612
    Epoch 93/100
    30/30 [==============================] - 0s 5ms/step - loss: 0.2304 - accuracy: 0.8858 - val_loss: 0.1512 - val_accuracy: 0.9274
    Epoch 94/100
    30/30 [==============================] - 0s 7ms/step - loss: 0.1706 - accuracy: 0.9268 - val_loss: 0.1080 - val_accuracy: 0.9558
    Epoch 95/100
    30/30 [==============================] - 0s 6ms/step - loss: 0.1500 - accuracy: 0.9411 - val_loss: 0.1054 - val_accuracy: 0.9621
    Epoch 96/100
    30/30 [==============================] - 0s 5ms/step - loss: 0.1152 - accuracy: 0.9553 - val_loss: 0.1049 - val_accuracy: 0.9637
    Epoch 97/100
    30/30 [==============================] - 0s 6ms/step - loss: 0.1168 - accuracy: 0.9558 - val_loss: 0.0966 - val_accuracy: 0.9574
    Epoch 98/100
    30/30 [==============================] - 0s 6ms/step - loss: 0.1127 - accuracy: 0.9595 - val_loss: 0.0893 - val_accuracy: 0.9637
    Epoch 99/100
    30/30 [==============================] - 0s 6ms/step - loss: 0.1251 - accuracy: 0.9537 - val_loss: 0.1208 - val_accuracy: 0.9574
    Epoch 100/100
    30/30 [==============================] - 0s 6ms/step - loss: 0.1232 - accuracy: 0.9542 - val_loss: 0.0929 - val_accuracy: 0.9653
    




    <keras.callbacks.History at 0x7fe96a9c6290>




```python
# evaluating the model using the testing set
print(f"Evaluating the model using {len(X_test)} samples...")
loss, accuracy = model.evaluate(X_test,y_test, verbose=0)
print(f"Loss: {loss:.4f}")
print(f"Accuracy: {accuracy*100:.2f}%")
```

    Evaluating the model using 634 samples...
    Loss: 0.1439
    Accuracy: 94.16%
    

## 음성데이터를 통해 확인
학습한 모델이 잘 돌아가는지 확인하기 위해 음성데이터 수집
- 카운터테너 목소리 데이터
- 일반 남자 고음 목소리 데이터
- 일반 남자 저음 목소리 데이터
- 배우 김혜수님 목소리 데이터
- 일반 여자 목소리 데이터
- 짱구 목소리 데이터

### 2차 테스트 예측 결과 (sigmoid)


```python
test_df2.label
```




    0    1
    1    1
    2    1
    3    0
    4    0
    5    0
    Name: label, dtype: int64




```python
pred = model.predict(test_df2.drop(['label'],axis=1))
# 0,0,1,0,0,0      # 1,1,1,0,0,0
# 남자를 잘 못 맞혔다
```




    array([[3.5717976e-01],
           [1.6104305e-01],
           [9.9165469e-01],
           [3.8860559e-02],
           [1.4352798e-04],
           [2.2471845e-03]], dtype=float32)



![image.png](data:image/png;base64,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)


```python
# 테스트한
print(f"Evaluating the model using {len(X_test)} samples...")
loss, accuracy = model.evaluate(test_df2.drop(['label'],axis=1), test_df2.label, verbose=0)
print(f"Loss: {loss:.4f}")
print(f"Accuracy: {accuracy*100:.2f}%")
```

    Evaluating the model using 634 samples...
    Loss: 0.4843
    Accuracy: 66.67%
    

## Softmax 모델


```python
# relu -> softmax & dropout
model = Sequential()
model.add(Dense(256, input_shape=(20,)))
model.add(Dense(128, activation="relu"))
model.add(Dense(64, activation="relu"))
model.add(Dropout(0.3))
model.add(Dense(32, activation="relu"))
model.add(Dense(16, activation="relu"))
model.add(Dense(2, activation="softmax"))

model.compile(loss="sparse_categorical_crossentropy", metrics=["accuracy"], optimizer="adam")

model.fit(X_train, y_train, epochs=100,
          batch_size=64,
          callbacks=[EarlyStopping(monitor='val_loss', patience=10)])
```

    Epoch 1/100
    33/40 [=======================>......] - ETA: 0s - loss: 0.9581 - accuracy: 0.5062

    WARNING:tensorflow:Early stopping conditioned on metric `val_loss` which is not available. Available metrics are: loss,accuracy
    

    40/40 [==============================] - 1s 5ms/step - loss: 0.9312 - accuracy: 0.5138
    Epoch 2/100
    38/40 [===========================>..] - ETA: 0s - loss: 0.7357 - accuracy: 0.5469

    WARNING:tensorflow:Early stopping conditioned on metric `val_loss` which is not available. Available metrics are: loss,accuracy
    

    40/40 [==============================] - 0s 6ms/step - loss: 0.7380 - accuracy: 0.5485
    Epoch 3/100
    33/40 [=======================>......] - ETA: 0s - loss: 0.6941 - accuracy: 0.6359

    WARNING:tensorflow:Early stopping conditioned on metric `val_loss` which is not available. Available metrics are: loss,accuracy
    

    40/40 [==============================] - 0s 5ms/step - loss: 0.6862 - accuracy: 0.6369
    Epoch 4/100
    39/40 [============================>.] - ETA: 0s - loss: 0.6267 - accuracy: 0.6635

    WARNING:tensorflow:Early stopping conditioned on metric `val_loss` which is not available. Available metrics are: loss,accuracy
    

    40/40 [==============================] - 0s 6ms/step - loss: 0.6266 - accuracy: 0.6646
    Epoch 5/100
    40/40 [==============================] - ETA: 0s - loss: 0.5799 - accuracy: 0.7017

    WARNING:tensorflow:Early stopping conditioned on metric `val_loss` which is not available. Available metrics are: loss,accuracy
    

    40/40 [==============================] - 0s 6ms/step - loss: 0.5799 - accuracy: 0.7017
    Epoch 6/100
    35/40 [=========================>....] - ETA: 0s - loss: 0.5582 - accuracy: 0.7165

    WARNING:tensorflow:Early stopping conditioned on metric `val_loss` which is not available. Available metrics are: loss,accuracy
    

    40/40 [==============================] - 0s 7ms/step - loss: 0.5519 - accuracy: 0.7190
    Epoch 7/100
    36/40 [==========================>...] - ETA: 0s - loss: 0.5397 - accuracy: 0.7296

    WARNING:tensorflow:Early stopping conditioned on metric `val_loss` which is not available. Available metrics are: loss,accuracy
    

    40/40 [==============================] - 0s 6ms/step - loss: 0.5327 - accuracy: 0.7344
    Epoch 8/100
    35/40 [=========================>....] - ETA: 0s - loss: 0.5076 - accuracy: 0.7696

    WARNING:tensorflow:Early stopping conditioned on metric `val_loss` which is not available. Available metrics are: loss,accuracy
    

    40/40 [==============================] - 0s 6ms/step - loss: 0.5077 - accuracy: 0.7699
    Epoch 9/100
    36/40 [==========================>...] - ETA: 0s - loss: 0.4780 - accuracy: 0.7812

    WARNING:tensorflow:Early stopping conditioned on metric `val_loss` which is not available. Available metrics are: loss,accuracy
    

    40/40 [==============================] - 0s 6ms/step - loss: 0.4800 - accuracy: 0.7766
    Epoch 10/100
    31/40 [======================>.......] - ETA: 0s - loss: 0.4830 - accuracy: 0.7742

    WARNING:tensorflow:Early stopping conditioned on metric `val_loss` which is not available. Available metrics are: loss,accuracy
    

    40/40 [==============================] - 0s 5ms/step - loss: 0.4646 - accuracy: 0.7885
    Epoch 11/100
    32/40 [=======================>......] - ETA: 0s - loss: 0.4478 - accuracy: 0.7983

    WARNING:tensorflow:Early stopping conditioned on metric `val_loss` which is not available. Available metrics are: loss,accuracy
    

    40/40 [==============================] - 0s 5ms/step - loss: 0.4386 - accuracy: 0.8031
    Epoch 12/100
    38/40 [===========================>..] - ETA: 0s - loss: 0.4101 - accuracy: 0.8195

    WARNING:tensorflow:Early stopping conditioned on metric `val_loss` which is not available. Available metrics are: loss,accuracy
    

    40/40 [==============================] - 0s 4ms/step - loss: 0.4100 - accuracy: 0.8181
    Epoch 13/100
    34/40 [========================>.....] - ETA: 0s - loss: 0.4131 - accuracy: 0.8153

    WARNING:tensorflow:Early stopping conditioned on metric `val_loss` which is not available. Available metrics are: loss,accuracy
    

    40/40 [==============================] - 0s 5ms/step - loss: 0.4155 - accuracy: 0.8137
    Epoch 14/100
    36/40 [==========================>...] - ETA: 0s - loss: 0.3869 - accuracy: 0.8325

    WARNING:tensorflow:Early stopping conditioned on metric `val_loss` which is not available. Available metrics are: loss,accuracy
    

    40/40 [==============================] - 0s 5ms/step - loss: 0.3885 - accuracy: 0.8331
    Epoch 15/100
    34/40 [========================>.....] - ETA: 0s - loss: 0.3514 - accuracy: 0.8470

    WARNING:tensorflow:Early stopping conditioned on metric `val_loss` which is not available. Available metrics are: loss,accuracy
    

    40/40 [==============================] - 0s 5ms/step - loss: 0.3498 - accuracy: 0.8500
    Epoch 16/100
    34/40 [========================>.....] - ETA: 0s - loss: 0.3367 - accuracy: 0.8580

    WARNING:tensorflow:Early stopping conditioned on metric `val_loss` which is not available. Available metrics are: loss,accuracy
    

    40/40 [==============================] - 0s 5ms/step - loss: 0.3273 - accuracy: 0.8619
    Epoch 17/100
    28/40 [====================>.........] - ETA: 0s - loss: 0.3019 - accuracy: 0.8800

    WARNING:tensorflow:Early stopping conditioned on metric `val_loss` which is not available. Available metrics are: loss,accuracy
    

    40/40 [==============================] - 0s 4ms/step - loss: 0.3124 - accuracy: 0.8749
    Epoch 18/100
    32/40 [=======================>......] - ETA: 0s - loss: 0.3274 - accuracy: 0.8540

    WARNING:tensorflow:Early stopping conditioned on metric `val_loss` which is not available. Available metrics are: loss,accuracy
    

    40/40 [==============================] - 0s 3ms/step - loss: 0.3281 - accuracy: 0.8560
    Epoch 19/100
    33/40 [=======================>......] - ETA: 0s - loss: 0.2964 - accuracy: 0.8717

    WARNING:tensorflow:Early stopping conditioned on metric `val_loss` which is not available. Available metrics are: loss,accuracy
    

    40/40 [==============================] - 0s 4ms/step - loss: 0.2900 - accuracy: 0.8749
    Epoch 20/100
    30/40 [=====================>........] - ETA: 0s - loss: 0.2652 - accuracy: 0.8990

    WARNING:tensorflow:Early stopping conditioned on metric `val_loss` which is not available. Available metrics are: loss,accuracy
    

    40/40 [==============================] - 0s 4ms/step - loss: 0.2642 - accuracy: 0.8974
    Epoch 21/100
    31/40 [======================>.......] - ETA: 0s - loss: 0.2348 - accuracy: 0.9103

    WARNING:tensorflow:Early stopping conditioned on metric `val_loss` which is not available. Available metrics are: loss,accuracy
    

    40/40 [==============================] - 0s 4ms/step - loss: 0.2375 - accuracy: 0.9088
    Epoch 22/100
    31/40 [======================>.......] - ETA: 0s - loss: 0.2481 - accuracy: 0.9042

    WARNING:tensorflow:Early stopping conditioned on metric `val_loss` which is not available. Available metrics are: loss,accuracy
    

    40/40 [==============================] - 0s 4ms/step - loss: 0.2444 - accuracy: 0.9049
    Epoch 23/100
    29/40 [====================>.........] - ETA: 0s - loss: 0.2443 - accuracy: 0.9057

    WARNING:tensorflow:Early stopping conditioned on metric `val_loss` which is not available. Available metrics are: loss,accuracy
    

    40/40 [==============================] - 0s 4ms/step - loss: 0.2511 - accuracy: 0.9081
    Epoch 24/100
    33/40 [=======================>......] - ETA: 0s - loss: 0.3995 - accuracy: 0.8362

    WARNING:tensorflow:Early stopping conditioned on metric `val_loss` which is not available. Available metrics are: loss,accuracy
    

    40/40 [==============================] - 0s 3ms/step - loss: 0.3804 - accuracy: 0.8441
    Epoch 25/100
    32/40 [=======================>......] - ETA: 0s - loss: 0.2426 - accuracy: 0.9019

    WARNING:tensorflow:Early stopping conditioned on metric `val_loss` which is not available. Available metrics are: loss,accuracy
    

    40/40 [==============================] - 0s 4ms/step - loss: 0.2437 - accuracy: 0.9013
    Epoch 26/100
    30/40 [=====================>........] - ETA: 0s - loss: 0.2431 - accuracy: 0.9021

    WARNING:tensorflow:Early stopping conditioned on metric `val_loss` which is not available. Available metrics are: loss,accuracy
    

    40/40 [==============================] - 0s 4ms/step - loss: 0.2451 - accuracy: 0.8966
    Epoch 27/100
    29/40 [====================>.........] - ETA: 0s - loss: 0.2369 - accuracy: 0.9019

    WARNING:tensorflow:Early stopping conditioned on metric `val_loss` which is not available. Available metrics are: loss,accuracy
    

    40/40 [==============================] - 0s 4ms/step - loss: 0.2416 - accuracy: 0.9009
    Epoch 28/100
    32/40 [=======================>......] - ETA: 0s - loss: 0.2307 - accuracy: 0.9111

    WARNING:tensorflow:Early stopping conditioned on metric `val_loss` which is not available. Available metrics are: loss,accuracy
    

    40/40 [==============================] - 0s 4ms/step - loss: 0.2307 - accuracy: 0.9136
    Epoch 29/100
    30/40 [=====================>........] - ETA: 0s - loss: 0.2074 - accuracy: 0.9177

    WARNING:tensorflow:Early stopping conditioned on metric `val_loss` which is not available. Available metrics are: loss,accuracy
    

    40/40 [==============================] - 0s 4ms/step - loss: 0.2068 - accuracy: 0.9211
    Epoch 30/100
    33/40 [=======================>......] - ETA: 0s - loss: 0.2153 - accuracy: 0.9167

    WARNING:tensorflow:Early stopping conditioned on metric `val_loss` which is not available. Available metrics are: loss,accuracy
    

    40/40 [==============================] - 0s 3ms/step - loss: 0.2147 - accuracy: 0.9155
    Epoch 31/100
    31/40 [======================>.......] - ETA: 0s - loss: 0.2175 - accuracy: 0.9123

    WARNING:tensorflow:Early stopping conditioned on metric `val_loss` which is not available. Available metrics are: loss,accuracy
    

    40/40 [==============================] - 0s 4ms/step - loss: 0.2272 - accuracy: 0.9084
    Epoch 32/100
    31/40 [======================>.......] - ETA: 0s - loss: 0.2019 - accuracy: 0.9264

    WARNING:tensorflow:Early stopping conditioned on metric `val_loss` which is not available. Available metrics are: loss,accuracy
    

    40/40 [==============================] - 0s 4ms/step - loss: 0.1991 - accuracy: 0.9274
    Epoch 33/100
    33/40 [=======================>......] - ETA: 0s - loss: 0.1949 - accuracy: 0.9228

    WARNING:tensorflow:Early stopping conditioned on metric `val_loss` which is not available. Available metrics are: loss,accuracy
    

    40/40 [==============================] - 0s 5ms/step - loss: 0.1896 - accuracy: 0.9258
    Epoch 34/100
    30/40 [=====================>........] - ETA: 0s - loss: 0.1666 - accuracy: 0.9406

    WARNING:tensorflow:Early stopping conditioned on metric `val_loss` which is not available. Available metrics are: loss,accuracy
    

    40/40 [==============================] - 0s 4ms/step - loss: 0.1726 - accuracy: 0.9392
    Epoch 35/100
    32/40 [=======================>......] - ETA: 0s - loss: 0.1904 - accuracy: 0.9248

    WARNING:tensorflow:Early stopping conditioned on metric `val_loss` which is not available. Available metrics are: loss,accuracy
    

    40/40 [==============================] - 0s 4ms/step - loss: 0.1881 - accuracy: 0.9274
    Epoch 36/100
    31/40 [======================>.......] - ETA: 0s - loss: 0.2022 - accuracy: 0.9304

    WARNING:tensorflow:Early stopping conditioned on metric `val_loss` which is not available. Available metrics are: loss,accuracy
    

    40/40 [==============================] - 0s 4ms/step - loss: 0.2025 - accuracy: 0.9274
    Epoch 37/100
    32/40 [=======================>......] - ETA: 0s - loss: 0.1710 - accuracy: 0.9390

    WARNING:tensorflow:Early stopping conditioned on metric `val_loss` which is not available. Available metrics are: loss,accuracy
    

    40/40 [==============================] - 0s 4ms/step - loss: 0.1693 - accuracy: 0.9388
    Epoch 38/100
    32/40 [=======================>......] - ETA: 0s - loss: 0.1901 - accuracy: 0.9316

    WARNING:tensorflow:Early stopping conditioned on metric `val_loss` which is not available. Available metrics are: loss,accuracy
    

    40/40 [==============================] - 0s 4ms/step - loss: 0.1974 - accuracy: 0.9278
    Epoch 39/100
    31/40 [======================>.......] - ETA: 0s - loss: 0.1980 - accuracy: 0.9299

    WARNING:tensorflow:Early stopping conditioned on metric `val_loss` which is not available. Available metrics are: loss,accuracy
    

    40/40 [==============================] - 0s 3ms/step - loss: 0.1991 - accuracy: 0.9262
    Epoch 40/100
    30/40 [=====================>........] - ETA: 0s - loss: 0.2705 - accuracy: 0.8927

    WARNING:tensorflow:Early stopping conditioned on metric `val_loss` which is not available. Available metrics are: loss,accuracy
    

    40/40 [==============================] - 0s 4ms/step - loss: 0.2704 - accuracy: 0.8891
    Epoch 41/100
    32/40 [=======================>......] - ETA: 0s - loss: 0.2161 - accuracy: 0.9224

    WARNING:tensorflow:Early stopping conditioned on metric `val_loss` which is not available. Available metrics are: loss,accuracy
    

    40/40 [==============================] - 0s 3ms/step - loss: 0.2093 - accuracy: 0.9211
    Epoch 42/100
    30/40 [=====================>........] - ETA: 0s - loss: 0.2209 - accuracy: 0.9057

    WARNING:tensorflow:Early stopping conditioned on metric `val_loss` which is not available. Available metrics are: loss,accuracy
    

    40/40 [==============================] - 0s 4ms/step - loss: 0.2175 - accuracy: 0.9061
    Epoch 43/100
    32/40 [=======================>......] - ETA: 0s - loss: 0.1759 - accuracy: 0.9238

    WARNING:tensorflow:Early stopping conditioned on metric `val_loss` which is not available. Available metrics are: loss,accuracy
    

    40/40 [==============================] - 0s 4ms/step - loss: 0.1646 - accuracy: 0.9309
    Epoch 44/100
    35/40 [=========================>....] - ETA: 0s - loss: 0.1796 - accuracy: 0.9344

    WARNING:tensorflow:Early stopping conditioned on metric `val_loss` which is not available. Available metrics are: loss,accuracy
    

    40/40 [==============================] - 0s 3ms/step - loss: 0.1759 - accuracy: 0.9373
    Epoch 45/100
    33/40 [=======================>......] - ETA: 0s - loss: 0.1765 - accuracy: 0.9375

    WARNING:tensorflow:Early stopping conditioned on metric `val_loss` which is not available. Available metrics are: loss,accuracy
    

    40/40 [==============================] - 0s 3ms/step - loss: 0.1762 - accuracy: 0.9353
    Epoch 46/100
    33/40 [=======================>......] - ETA: 0s - loss: 0.1624 - accuracy: 0.9394

    WARNING:tensorflow:Early stopping conditioned on metric `val_loss` which is not available. Available metrics are: loss,accuracy
    

    40/40 [==============================] - 0s 4ms/step - loss: 0.1591 - accuracy: 0.9408
    Epoch 47/100
    34/40 [========================>.....] - ETA: 0s - loss: 0.1463 - accuracy: 0.9458

    WARNING:tensorflow:Early stopping conditioned on metric `val_loss` which is not available. Available metrics are: loss,accuracy
    

    40/40 [==============================] - 0s 3ms/step - loss: 0.1573 - accuracy: 0.9404
    Epoch 48/100
    33/40 [=======================>......] - ETA: 0s - loss: 0.1575 - accuracy: 0.9418

    WARNING:tensorflow:Early stopping conditioned on metric `val_loss` which is not available. Available metrics are: loss,accuracy
    

    40/40 [==============================] - 0s 3ms/step - loss: 0.1620 - accuracy: 0.9424
    Epoch 49/100
    35/40 [=========================>....] - ETA: 0s - loss: 0.1570 - accuracy: 0.9429

    WARNING:tensorflow:Early stopping conditioned on metric `val_loss` which is not available. Available metrics are: loss,accuracy
    

    40/40 [==============================] - 0s 3ms/step - loss: 0.1597 - accuracy: 0.9428
    Epoch 50/100
    35/40 [=========================>....] - ETA: 0s - loss: 0.1422 - accuracy: 0.9491

    WARNING:tensorflow:Early stopping conditioned on metric `val_loss` which is not available. Available metrics are: loss,accuracy
    

    40/40 [==============================] - 0s 3ms/step - loss: 0.1420 - accuracy: 0.9503
    Epoch 51/100
    36/40 [==========================>...] - ETA: 0s - loss: 0.1779 - accuracy: 0.9314

    WARNING:tensorflow:Early stopping conditioned on metric `val_loss` which is not available. Available metrics are: loss,accuracy
    

    40/40 [==============================] - 0s 3ms/step - loss: 0.1768 - accuracy: 0.9305
    Epoch 52/100
    34/40 [========================>.....] - ETA: 0s - loss: 0.1419 - accuracy: 0.9453

    WARNING:tensorflow:Early stopping conditioned on metric `val_loss` which is not available. Available metrics are: loss,accuracy
    

    40/40 [==============================] - 0s 3ms/step - loss: 0.1444 - accuracy: 0.9444
    Epoch 53/100
    31/40 [======================>.......] - ETA: 0s - loss: 0.1702 - accuracy: 0.9385

    WARNING:tensorflow:Early stopping conditioned on metric `val_loss` which is not available. Available metrics are: loss,accuracy
    

    40/40 [==============================] - 0s 4ms/step - loss: 0.1616 - accuracy: 0.9416
    Epoch 54/100
    34/40 [========================>.....] - ETA: 0s - loss: 0.1344 - accuracy: 0.9550

    WARNING:tensorflow:Early stopping conditioned on metric `val_loss` which is not available. Available metrics are: loss,accuracy
    

    40/40 [==============================] - 0s 3ms/step - loss: 0.1383 - accuracy: 0.9534
    Epoch 55/100
    34/40 [========================>.....] - ETA: 0s - loss: 0.1216 - accuracy: 0.9614

    WARNING:tensorflow:Early stopping conditioned on metric `val_loss` which is not available. Available metrics are: loss,accuracy
    

    40/40 [==============================] - 0s 3ms/step - loss: 0.1266 - accuracy: 0.9590
    Epoch 56/100
    31/40 [======================>.......] - ETA: 0s - loss: 0.1516 - accuracy: 0.9441

    WARNING:tensorflow:Early stopping conditioned on metric `val_loss` which is not available. Available metrics are: loss,accuracy
    

    40/40 [==============================] - 0s 3ms/step - loss: 0.1441 - accuracy: 0.9467
    Epoch 57/100
    34/40 [========================>.....] - ETA: 0s - loss: 0.1155 - accuracy: 0.9573

    WARNING:tensorflow:Early stopping conditioned on metric `val_loss` which is not available. Available metrics are: loss,accuracy
    

    40/40 [==============================] - 0s 3ms/step - loss: 0.1162 - accuracy: 0.9562
    Epoch 58/100
    36/40 [==========================>...] - ETA: 0s - loss: 0.1162 - accuracy: 0.9579

    WARNING:tensorflow:Early stopping conditioned on metric `val_loss` which is not available. Available metrics are: loss,accuracy
    

    40/40 [==============================] - 0s 3ms/step - loss: 0.1214 - accuracy: 0.9558
    Epoch 59/100
    34/40 [========================>.....] - ETA: 0s - loss: 0.1429 - accuracy: 0.9481

    WARNING:tensorflow:Early stopping conditioned on metric `val_loss` which is not available. Available metrics are: loss,accuracy
    

    40/40 [==============================] - 0s 3ms/step - loss: 0.1411 - accuracy: 0.9491
    Epoch 60/100
    36/40 [==========================>...] - ETA: 0s - loss: 0.1366 - accuracy: 0.9475

    WARNING:tensorflow:Early stopping conditioned on metric `val_loss` which is not available. Available metrics are: loss,accuracy
    

    40/40 [==============================] - 0s 3ms/step - loss: 0.1355 - accuracy: 0.9471
    Epoch 61/100
    33/40 [=======================>......] - ETA: 0s - loss: 0.1313 - accuracy: 0.9536

    WARNING:tensorflow:Early stopping conditioned on metric `val_loss` which is not available. Available metrics are: loss,accuracy
    

    40/40 [==============================] - 0s 3ms/step - loss: 0.1341 - accuracy: 0.9507
    Epoch 62/100
    33/40 [=======================>......] - ETA: 0s - loss: 0.1362 - accuracy: 0.9531

    WARNING:tensorflow:Early stopping conditioned on metric `val_loss` which is not available. Available metrics are: loss,accuracy
    

    40/40 [==============================] - 0s 3ms/step - loss: 0.1363 - accuracy: 0.9538
    Epoch 63/100
    33/40 [=======================>......] - ETA: 0s - loss: 0.1423 - accuracy: 0.9470

    WARNING:tensorflow:Early stopping conditioned on metric `val_loss` which is not available. Available metrics are: loss,accuracy
    

    40/40 [==============================] - 0s 3ms/step - loss: 0.1438 - accuracy: 0.9467
    Epoch 64/100
    31/40 [======================>.......] - ETA: 0s - loss: 0.1557 - accuracy: 0.9410

    WARNING:tensorflow:Early stopping conditioned on metric `val_loss` which is not available. Available metrics are: loss,accuracy
    

    40/40 [==============================] - 0s 3ms/step - loss: 0.1457 - accuracy: 0.9440
    Epoch 65/100
    31/40 [======================>.......] - ETA: 0s - loss: 0.1354 - accuracy: 0.9466

    WARNING:tensorflow:Early stopping conditioned on metric `val_loss` which is not available. Available metrics are: loss,accuracy
    

    40/40 [==============================] - 0s 4ms/step - loss: 0.1517 - accuracy: 0.9388
    Epoch 66/100
    31/40 [======================>.......] - ETA: 0s - loss: 0.1581 - accuracy: 0.9441

    WARNING:tensorflow:Early stopping conditioned on metric `val_loss` which is not available. Available metrics are: loss,accuracy
    

    40/40 [==============================] - 0s 4ms/step - loss: 0.1476 - accuracy: 0.9463
    Epoch 67/100
    27/40 [===================>..........] - ETA: 0s - loss: 0.1230 - accuracy: 0.9508

    WARNING:tensorflow:Early stopping conditioned on metric `val_loss` which is not available. Available metrics are: loss,accuracy
    

    40/40 [==============================] - 0s 4ms/step - loss: 0.1324 - accuracy: 0.9471
    Epoch 68/100
    32/40 [=======================>......] - ETA: 0s - loss: 0.1163 - accuracy: 0.9580

    WARNING:tensorflow:Early stopping conditioned on metric `val_loss` which is not available. Available metrics are: loss,accuracy
    

    40/40 [==============================] - 0s 3ms/step - loss: 0.1147 - accuracy: 0.9582
    Epoch 69/100
    33/40 [=======================>......] - ETA: 0s - loss: 0.1159 - accuracy: 0.9555

    WARNING:tensorflow:Early stopping conditioned on metric `val_loss` which is not available. Available metrics are: loss,accuracy
    

    40/40 [==============================] - 0s 3ms/step - loss: 0.1181 - accuracy: 0.9550
    Epoch 70/100
    31/40 [======================>.......] - ETA: 0s - loss: 0.1143 - accuracy: 0.9536

    WARNING:tensorflow:Early stopping conditioned on metric `val_loss` which is not available. Available metrics are: loss,accuracy
    

    40/40 [==============================] - 0s 4ms/step - loss: 0.1194 - accuracy: 0.9530
    Epoch 71/100
    29/40 [====================>.........] - ETA: 0s - loss: 0.1189 - accuracy: 0.9558

    WARNING:tensorflow:Early stopping conditioned on metric `val_loss` which is not available. Available metrics are: loss,accuracy
    

    40/40 [==============================] - 0s 4ms/step - loss: 0.1096 - accuracy: 0.9601
    Epoch 72/100
    30/40 [=====================>........] - ETA: 0s - loss: 0.1066 - accuracy: 0.9604

    WARNING:tensorflow:Early stopping conditioned on metric `val_loss` which is not available. Available metrics are: loss,accuracy
    

    40/40 [==============================] - 0s 4ms/step - loss: 0.1015 - accuracy: 0.9633
    Epoch 73/100
    31/40 [======================>.......] - ETA: 0s - loss: 0.1033 - accuracy: 0.9637

    WARNING:tensorflow:Early stopping conditioned on metric `val_loss` which is not available. Available metrics are: loss,accuracy
    

    40/40 [==============================] - 0s 4ms/step - loss: 0.1080 - accuracy: 0.9617
    Epoch 74/100
    32/40 [=======================>......] - ETA: 0s - loss: 0.1126 - accuracy: 0.9561

    WARNING:tensorflow:Early stopping conditioned on metric `val_loss` which is not available. Available metrics are: loss,accuracy
    

    40/40 [==============================] - 0s 3ms/step - loss: 0.1164 - accuracy: 0.9546
    Epoch 75/100
    34/40 [========================>.....] - ETA: 0s - loss: 0.1393 - accuracy: 0.9458

    WARNING:tensorflow:Early stopping conditioned on metric `val_loss` which is not available. Available metrics are: loss,accuracy
    

    40/40 [==============================] - 0s 3ms/step - loss: 0.1359 - accuracy: 0.9463
    Epoch 76/100
    33/40 [=======================>......] - ETA: 0s - loss: 0.1242 - accuracy: 0.9522

    WARNING:tensorflow:Early stopping conditioned on metric `val_loss` which is not available. Available metrics are: loss,accuracy
    

    40/40 [==============================] - 0s 3ms/step - loss: 0.1165 - accuracy: 0.9542
    Epoch 77/100
    37/40 [==========================>...] - ETA: 0s - loss: 0.1227 - accuracy: 0.9506

    WARNING:tensorflow:Early stopping conditioned on metric `val_loss` which is not available. Available metrics are: loss,accuracy
    

    40/40 [==============================] - 0s 3ms/step - loss: 0.1230 - accuracy: 0.9503
    Epoch 78/100
    35/40 [=========================>....] - ETA: 0s - loss: 0.1106 - accuracy: 0.9558

    WARNING:tensorflow:Early stopping conditioned on metric `val_loss` which is not available. Available metrics are: loss,accuracy
    

    40/40 [==============================] - 0s 3ms/step - loss: 0.1110 - accuracy: 0.9562
    Epoch 79/100
    36/40 [==========================>...] - ETA: 0s - loss: 0.1168 - accuracy: 0.9562

    WARNING:tensorflow:Early stopping conditioned on metric `val_loss` which is not available. Available metrics are: loss,accuracy
    

    40/40 [==============================] - 0s 3ms/step - loss: 0.1189 - accuracy: 0.9554
    Epoch 80/100
    34/40 [========================>.....] - ETA: 0s - loss: 0.1296 - accuracy: 0.9531

    WARNING:tensorflow:Early stopping conditioned on metric `val_loss` which is not available. Available metrics are: loss,accuracy
    

    40/40 [==============================] - 0s 4ms/step - loss: 0.1255 - accuracy: 0.9550
    Epoch 81/100
    33/40 [=======================>......] - ETA: 0s - loss: 0.1018 - accuracy: 0.9621

    WARNING:tensorflow:Early stopping conditioned on metric `val_loss` which is not available. Available metrics are: loss,accuracy
    

    40/40 [==============================] - 0s 3ms/step - loss: 0.0980 - accuracy: 0.9629
    Epoch 82/100
    34/40 [========================>.....] - ETA: 0s - loss: 0.1112 - accuracy: 0.9591

    WARNING:tensorflow:Early stopping conditioned on metric `val_loss` which is not available. Available metrics are: loss,accuracy
    

    40/40 [==============================] - 0s 3ms/step - loss: 0.1178 - accuracy: 0.9562
    Epoch 83/100
    31/40 [======================>.......] - ETA: 0s - loss: 0.1316 - accuracy: 0.9506

    WARNING:tensorflow:Early stopping conditioned on metric `val_loss` which is not available. Available metrics are: loss,accuracy
    

    40/40 [==============================] - 0s 4ms/step - loss: 0.1256 - accuracy: 0.9530
    Epoch 84/100
    30/40 [=====================>........] - ETA: 0s - loss: 0.0960 - accuracy: 0.9651

    WARNING:tensorflow:Early stopping conditioned on metric `val_loss` which is not available. Available metrics are: loss,accuracy
    

    40/40 [==============================] - 0s 4ms/step - loss: 0.1020 - accuracy: 0.9629
    Epoch 85/100
    35/40 [=========================>....] - ETA: 0s - loss: 0.0973 - accuracy: 0.9634

    WARNING:tensorflow:Early stopping conditioned on metric `val_loss` which is not available. Available metrics are: loss,accuracy
    

    40/40 [==============================] - 0s 5ms/step - loss: 0.0980 - accuracy: 0.9629
    Epoch 86/100
    40/40 [==============================] - ETA: 0s - loss: 0.1047 - accuracy: 0.9546

    WARNING:tensorflow:Early stopping conditioned on metric `val_loss` which is not available. Available metrics are: loss,accuracy
    

    40/40 [==============================] - 0s 6ms/step - loss: 0.1047 - accuracy: 0.9546
    Epoch 87/100
    39/40 [============================>.] - ETA: 0s - loss: 0.0997 - accuracy: 0.9619

    WARNING:tensorflow:Early stopping conditioned on metric `val_loss` which is not available. Available metrics are: loss,accuracy
    

    40/40 [==============================] - 0s 6ms/step - loss: 0.0988 - accuracy: 0.9621
    Epoch 88/100
    37/40 [==========================>...] - ETA: 0s - loss: 0.0934 - accuracy: 0.9679

    WARNING:tensorflow:Early stopping conditioned on metric `val_loss` which is not available. Available metrics are: loss,accuracy
    

    40/40 [==============================] - 0s 7ms/step - loss: 0.0942 - accuracy: 0.9669
    Epoch 89/100
    39/40 [============================>.] - ETA: 0s - loss: 0.1387 - accuracy: 0.9479

    WARNING:tensorflow:Early stopping conditioned on metric `val_loss` which is not available. Available metrics are: loss,accuracy
    

    40/40 [==============================] - 0s 6ms/step - loss: 0.1376 - accuracy: 0.9487
    Epoch 90/100
    40/40 [==============================] - ETA: 0s - loss: 0.0996 - accuracy: 0.9645

    WARNING:tensorflow:Early stopping conditioned on metric `val_loss` which is not available. Available metrics are: loss,accuracy
    

    40/40 [==============================] - 0s 8ms/step - loss: 0.0996 - accuracy: 0.9645
    Epoch 91/100
    37/40 [==========================>...] - ETA: 0s - loss: 0.1074 - accuracy: 0.9611

    WARNING:tensorflow:Early stopping conditioned on metric `val_loss` which is not available. Available metrics are: loss,accuracy
    

    40/40 [==============================] - 0s 6ms/step - loss: 0.1072 - accuracy: 0.9609
    Epoch 92/100
    33/40 [=======================>......] - ETA: 0s - loss: 0.0949 - accuracy: 0.9678

    WARNING:tensorflow:Early stopping conditioned on metric `val_loss` which is not available. Available metrics are: loss,accuracy
    

    40/40 [==============================] - 0s 7ms/step - loss: 0.0978 - accuracy: 0.9669
    Epoch 93/100
    31/40 [======================>.......] - ETA: 0s - loss: 0.0937 - accuracy: 0.9652

    WARNING:tensorflow:Early stopping conditioned on metric `val_loss` which is not available. Available metrics are: loss,accuracy
    

    40/40 [==============================] - 0s 6ms/step - loss: 0.0981 - accuracy: 0.9637
    Epoch 94/100
    38/40 [===========================>..] - ETA: 0s - loss: 0.1016 - accuracy: 0.9634

    WARNING:tensorflow:Early stopping conditioned on metric `val_loss` which is not available. Available metrics are: loss,accuracy
    

    40/40 [==============================] - 0s 7ms/step - loss: 0.1030 - accuracy: 0.9633
    Epoch 95/100
    35/40 [=========================>....] - ETA: 0s - loss: 0.1244 - accuracy: 0.9531

    WARNING:tensorflow:Early stopping conditioned on metric `val_loss` which is not available. Available metrics are: loss,accuracy
    

    40/40 [==============================] - 0s 6ms/step - loss: 0.1284 - accuracy: 0.9495
    Epoch 96/100
    38/40 [===========================>..] - ETA: 0s - loss: 0.1271 - accuracy: 0.9498

    WARNING:tensorflow:Early stopping conditioned on metric `val_loss` which is not available. Available metrics are: loss,accuracy
    

    40/40 [==============================] - 0s 6ms/step - loss: 0.1235 - accuracy: 0.9515
    Epoch 97/100
    38/40 [===========================>..] - ETA: 0s - loss: 0.1028 - accuracy: 0.9626

    WARNING:tensorflow:Early stopping conditioned on metric `val_loss` which is not available. Available metrics are: loss,accuracy
    

    40/40 [==============================] - 0s 9ms/step - loss: 0.1009 - accuracy: 0.9633
    Epoch 98/100
    39/40 [============================>.] - ETA: 0s - loss: 0.1135 - accuracy: 0.9563

    WARNING:tensorflow:Early stopping conditioned on metric `val_loss` which is not available. Available metrics are: loss,accuracy
    

    40/40 [==============================] - 0s 6ms/step - loss: 0.1125 - accuracy: 0.9566
    Epoch 99/100
    38/40 [===========================>..] - ETA: 0s - loss: 0.1166 - accuracy: 0.9576

    WARNING:tensorflow:Early stopping conditioned on metric `val_loss` which is not available. Available metrics are: loss,accuracy
    

    40/40 [==============================] - 0s 6ms/step - loss: 0.1166 - accuracy: 0.9578
    Epoch 100/100
    38/40 [===========================>..] - ETA: 0s - loss: 0.1009 - accuracy: 0.9671

    WARNING:tensorflow:Early stopping conditioned on metric `val_loss` which is not available. Available metrics are: loss,accuracy
    

    40/40 [==============================] - 0s 6ms/step - loss: 0.0998 - accuracy: 0.9665
    




    <keras.callbacks.History at 0x7fe96a423ed0>




```python
# 평가하는 세트
print(f"Evaluating the model using {len(X_test)} samples...")
loss, accuracy = model.evaluate(X_test,y_test, verbose=0)
print(f"Loss: {loss:.4f}")
print(f"Accuracy: {accuracy*100:.2f}%")
```

    Evaluating the model using 634 samples...
    Loss: 0.1686
    Accuracy: 94.01%
    

### 2차 테스트 예측 결과 (softmax)


```python
pred = model.predict(test_df2.drop(['label'],axis=1))
pred
# 0,0,1,0,0,0
```




    array([[7.6749623e-01, 2.3250371e-01],
           [8.5192752e-01, 1.4807250e-01],
           [2.6076129e-03, 9.9739242e-01],
           [5.7367176e-01, 4.2632824e-01],
           [9.9943155e-01, 5.6848244e-04],
           [9.8048556e-01, 1.9514462e-02]], dtype=float32)



![image.png](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAXMAAAE1CAIAAACa2Ze0AAAgAElEQVR4nOydd3wUxfvHn9ndu0ty6aQQktASCC2UUFVCDUWqBhUsIKiIKKj8EBBQsSOiNLHwjRQpgvJFReVLVQw1IQQIvSQE0i+X5Equ3+3O748NZ4AkXC43R0Lm/cofubLPzLMz+7nd2Z3PIIwxUCgUikth7ncFKBTKAwhVFgqF4nqoslAoFNdDlYVCobgeqiwUCsX1UGWhUCiuhyoLhUJxPVRZKBSK66HKQqFQXA9VFgqF4nqoslAoFNdDlYVCobgeqiwUCsX1UGWhUCiuhyoLhUJxPVRZKBSK6+Hs/6Wkn72P9aBQKA2RPt07V/k+V/lFt9j2bqkMhUJ5EDh97lJ1H9GrIQqF4nqoslAoFNfDVfluDSc5FAqlkePIsEnVygLVD8zck7Zt2y5fvjw0NFQQBOci1AxC6Pr1682bN+c4jsTCAwzDaLVanU4XHh7O87zL44tF3Lx5MyQkRCaTkYiPEDKZTMXFxS1atCDUCizL5ubm+vn5+fj4kCgCIWSz2fLy8lq2bEloeQmGYRQKBcdxTZo0IbSXAODGjRstWrRACJEIzjCMSqWyWCzkDjeGYbKzsyMiIuyHm8B6OLJhtcriNBKJpF27dlFRUS6PXJmuXbtyHEeowUpLSxUKRYcOHUgEF2FZtk2bNt7e3oTi63S6a9eudevWjVB8APDw8AgNDQ0KCiIRHGNss9k4juvZsyeJ+CJZWVkymSwiIoJQfIwxxrhnz54MQ2rYIT8/32g0RkdHkwhuscLn32JPxnfs2JZSqVR808GbyK5PmNDRfh8LIgTR+iOE3LB/yBUhRiadghviI4TIyQoQbuhyHXz9Bv/3SR8niqAjuBQnaejK7gYa+jKBOgMGAJkHdiIRqiwUCqVqyvUAADJPZ0YbqbJQKJSq0RsQAEg9nBkbpspCoVCqRqcHAAj2tDmxLVUWCoVSNeV6DAD+cme2pcpCoVCqRjxnkdNxFgqltmzbtq1p06a///47ACxatKhJkya7du2635WqL4jK4uPljLK4/kk5CqWhkJaWlpKSEhcXt2LFCgCwWCyjRo0i9/hig0NnAACQe9IRXAphjEbj1KlTH3744djY2DVr1gAAz/Mff/yxUqmsbhOlUjl79my9Xu9I/G3btvXp0wch1K5dO5dVunpYll22bNnUqVOPHj26e/fuTz/99Icffujfv78bim4Q6A0YALycOmdxXlmOHTv22GOPDRo0aODAgaNHj87KynI6FKWh8NZbb61bt2779u0SiWTjxo16vX7EiBFt2rQJDg6ubpPg4OCePXsOHz5cp9PdM/6ECROSk5NdWuWaiIuLYxhm4MCBFotl9OjR9Nm/OyjXAQB4y914zrJu3bqxY8e+9957f//996pVq/78889p06Y5F4rSgNixY0doaGh4ePhPP/20bdu2OXPmsCw7fvz4mreaMGGCXC5ftGiRI0UQmqVZA9u2bQsJCTl58iQAFBYWGgwGN1eg3iKeaLrvnKW4uPiNN9749ttv4+LiAMDDw2PAgAGTJ092IhSlYaFUKn18fACgTZs2Op3u559/nj59uiMbvvbaa6tXr87OziZcwVpw4MCBl1566fjx4zk5OS+++OL27dszMzNnzpx5v+tVj9DpgAWQcM7MUXBmBHfp0qU8z48dO1Z82aZNm4MHD94WlCM7MMyyLNEiWJZlWZZcfCCfwvV89sOvm7aLdsHM+hlTULMQtHPnzqSkJEEQ8vLyRo0a9csvv/z4448A0LdvX/FrO3bsePnll8vKyhYuXDhr1qykpKT58+dPnTr1448/DgkJeeSRRywWy8qVK8WxUkfgOE6cy6dUKufOnZufn48xbtas2RdffCFefBkMhsWLF+/cuTM8PBwA3nnnnTVr1uzcuTMhIWHHjh33jG+xWM6cOfPrr79u3LixqKhox44d48aN++2337y8vJzbUXdDejoiALAsS64IvR6k4cAwjBN91ZnOfezYscDAwMuXL8+aNSstLS08PHz+/PkTJ04UP7VarZmZmXq9nqi5iZgtiRlfCCGtVqvRaGw2Gzlzk5s3b5rNZk9PT0IpHD7GHv++zXFwQf07t87u2M7UunXrxYsX79q1KyAgYPHixdeuXTt8+LCXl1dBQUFeXh4AtG3b9pNPPpk+ffqxY8fGjx+fm5s7duzYmTNnKhQKhUIBAF5eXn///fe5c+ccKVSn02VkZNy8edNms40aNapnz55ffPEFAMybN69Tp047d+6Uy+Xz5s3bvXv3qlWrBgwYsHfv3r59+7766quzZ8/28fFxpJSWLVtu376d47grV64IgvDf//5XLNfBGjpITk6OVCol589SUlJis9mMRiOJw+1mVkvESXJy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)


```python
# 평가하는 세트
print(f"Evaluating the model using {len(X_test)} samples...")
loss, accuracy = model.evaluate(test_df2.drop(['label'],axis=1), test_df2.label, verbose=0)
print(f"Loss: {loss:.4f}")
print(f"Accuracy: {accuracy*100:.2f}%")
```

    Evaluating the model using 634 samples...
    Loss: 0.6579
    Accuracy: 66.67%
    

# 🐳 결론

- 머신러닝 모델인 DecisionTreeClassifier의 결과값은 [1, 0, 1, 0, 0, 0], 정확도는 83.3% --> 일반 남자 고음 목소리 데이터 구별 못함
- 딥러닝 모델 결과값은 [0 ,0 ,1, 0, 0, 0], 정확도는 66% --> 일반 남자 저음 목소리 데이터만 구별함
- 딥러닝이 머신러닝보다 더 발전됐다 믿었으나 예상외에 결과를 보였다.
- 데이터가 적을 때는 머신러닝이 효율적인 모습을 보였다.
