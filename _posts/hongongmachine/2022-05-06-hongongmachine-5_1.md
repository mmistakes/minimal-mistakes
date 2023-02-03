---
layout: single
title: "[혼공머신러닝] 5 - 1 결정트리"
categories: Hongong_mldl
tag: [python, Machine Learning]
toc: true
---

## 결정 트리

---

### 1. 용어 정리

결정트리 : 예 / 아니오에 대한 질문을 이어나가면서 정답을 찾아 학습하는 알고리즘입니다.

불순도 : 결정 트리가 최적의 질문을 찾기 위한 기준입니다. 사이킷런은 지니 불순도와 엔트로피 불순도를 제공합니다.

정보 이득 : 부모 노드와 자식 노드의 불순도 차이입니다. 결정 트리 알고리즘은 정보 이득이 최대화되도록 학습합니다.

특성 중요도 : 결정 트리에 사용된 특성이 불순도를 감소하는데 기여한 정도를 나타내는 값입니다.

---

### 2. 로지스틱 회귀로 와인 분류하기

이번 미션은 알코올 도수, 당도, pH 값에 로지스틱 회귀 모델을 적용해 화이트 와인인지, 레드 와인인지 판별해야 하는게 이번 챕터의 목표이다.<br>
wine 데이터셋을 이용해 데이터프레임으로 제대로 읽었는지 처음 5개의 샘플을 확인해보겠습니다.

```python
import pandas as pd

wine = pd.read_csv('https://bit.ly/wine_csv_data')

wine.head()
```

  <div id="df-4a7b2775-9e56-49dc-8c87-5d23194114a9">
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
      <th>alcohol</th>
      <th>sugar</th>
      <th>pH</th>
      <th>class</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>9.4</td>
      <td>1.9</td>
      <td>3.51</td>
      <td>0.0</td>
    </tr>
    <tr>
      <th>1</th>
      <td>9.8</td>
      <td>2.6</td>
      <td>3.20</td>
      <td>0.0</td>
    </tr>
    <tr>
      <th>2</th>
      <td>9.8</td>
      <td>2.3</td>
      <td>3.26</td>
      <td>0.0</td>
    </tr>
    <tr>
      <th>3</th>
      <td>9.8</td>
      <td>1.9</td>
      <td>3.16</td>
      <td>0.0</td>
    </tr>
    <tr>
      <th>4</th>
      <td>9.4</td>
      <td>1.9</td>
      <td>3.51</td>
      <td>0.0</td>
    </tr>
  </tbody>
</table>
</div>
      <button class="colab-df-convert" onclick="convertToInteractive('df-4a7b2775-9e56-49dc-8c87-5d23194114a9')"
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
          document.querySelector('#df-4a7b2775-9e56-49dc-8c87-5d23194114a9 button.colab-df-convert');
        buttonEl.style.display =
          google.colab.kernel.accessAllowed ? 'block' : 'none';

        async function convertToInteractive(key) {
          const element = document.querySelector('#df-4a7b2775-9e56-49dc-8c87-5d23194114a9');
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

info() 메서드를 통해 데이터가 누락이 되있는지 확인을 해 봅니다.

```python
wine.info()
```

    <class 'pandas.core.frame.DataFrame'>
    RangeIndex: 6497 entries, 0 to 6496
    Data columns (total 4 columns):
     #   Column   Non-Null Count  Dtype
    ---  ------   --------------  -----
     0   alcohol  6497 non-null   float64
     1   sugar    6497 non-null   float64
     2   pH       6497 non-null   float64
     3   class    6497 non-null   float64
    dtypes: float64(4)
    memory usage: 203.2 KB

이번에는 describe() 메서드를 통해 평균, 표준편차, 최소, 최대, 사분위수 등의 값을 확인해봅니다.

```python
wine.describe()
```

  <div id="df-fa8e79b8-ed50-4ec9-812a-d387b16cee83">
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
      <th>alcohol</th>
      <th>sugar</th>
      <th>pH</th>
      <th>class</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>count</th>
      <td>6497.000000</td>
      <td>6497.000000</td>
      <td>6497.000000</td>
      <td>6497.000000</td>
    </tr>
    <tr>
      <th>mean</th>
      <td>10.491801</td>
      <td>5.443235</td>
      <td>3.218501</td>
      <td>0.753886</td>
    </tr>
    <tr>
      <th>std</th>
      <td>1.192712</td>
      <td>4.757804</td>
      <td>0.160787</td>
      <td>0.430779</td>
    </tr>
    <tr>
      <th>min</th>
      <td>8.000000</td>
      <td>0.600000</td>
      <td>2.720000</td>
      <td>0.000000</td>
    </tr>
    <tr>
      <th>25%</th>
      <td>9.500000</td>
      <td>1.800000</td>
      <td>3.110000</td>
      <td>1.000000</td>
    </tr>
    <tr>
      <th>50%</th>
      <td>10.300000</td>
      <td>3.000000</td>
      <td>3.210000</td>
      <td>1.000000</td>
    </tr>
    <tr>
      <th>75%</th>
      <td>11.300000</td>
      <td>8.100000</td>
      <td>3.320000</td>
      <td>1.000000</td>
    </tr>
    <tr>
      <th>max</th>
      <td>14.900000</td>
      <td>65.800000</td>
      <td>4.010000</td>
      <td>1.000000</td>
    </tr>
  </tbody>
</table>
</div>
      <button class="colab-df-convert" onclick="convertToInteractive('df-fa8e79b8-ed50-4ec9-812a-d387b16cee83')"
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
          document.querySelector('#df-fa8e79b8-ed50-4ec9-812a-d387b16cee83 button.colab-df-convert');
        buttonEl.style.display =
          google.colab.kernel.accessAllowed ? 'block' : 'none';

        async function convertToInteractive(key) {
          const element = document.querySelector('#df-fa8e79b8-ed50-4ec9-812a-d387b16cee83');
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

판다스 데이터 프레임을 넘파이 배열로 바꾼 후 이제 와인 데이터를 타깃과 데이터로 분류 후, 테스트 세트와 훈련 세트로 또 분류합니다.
각 개수를 6번 코드를 통해 확인 해보니 훈련 세트 5197개, 테스트 세트 1300개로 나뉘어집니다.

```python
data = wine[['alcohol', 'sugar', 'pH']].to_numpy()
target = wine['class'].to_numpy()

from sklearn.model_selection import train_test_split

train_input, test_input, train_target, test_target = train_test_split(data, target, test_size=0.2, random_state=42)

print(train_input.shape, test_input.shape)
```

    (5197, 3) (1300, 3)

```python
from sklearn.linear_model import LogisticRegression

lr = LogisticRegression()
lr.fit(train_scaled, train_target)

print(lr.score(train_scaled, train_target))
print(lr.score(test_scaled, test_target))
```

    0.7808350971714451
    0.7776923076923077

이러한 계수와 절편은 일반인에게 설명하기는 어렵습니다. 우리도 이 모델이 이러한 값을 학습했는지 정확히 이해하기 어렵다. 이 숫자가 어떤 의미인지 설명하기 어렵기 때문에, 쉽게 설명하기 방법으로 **결정 트리(Decision Tree)** 모델을 사용합니다.

결정 트리 모델은 스무고개와 같이 질문을 하나씩 던져서 정답과 맞춰가는 겁니다.

```python
print(lr.coef_, lr.intercept_)
```

    [[ 0.51270274  1.6733911  -0.68767781]] [1.81777902]

### 3. 결정트리

사이킷런의 DecisionTreeClassfier 클래스를 사용해 결정 트리 모델을 훈련해 봅니다.<br>
훈련 세트에 대한 점수는 매우 높지만, 그에 비해 테스트 세트의 성능은 낮은 것을 볼 수 있습니다. 즉 과대적합 모델이라고 볼 수 있습니다.

```python
from sklearn.tree import DecisionTreeClassifier

dt = DecisionTreeClassifier(random_state=42)
dt.fit(train_scaled, train_target)

print(dt.score(train_scaled, train_target))
print(dt.score(test_scaled, test_target))
```

    0.996921300750433
    0.8592307692307692

결정 트리는 위에서 아래로 거꾸로 자랍니다. 맨 위의 노드를 **루트 노드**라고 하고 맨 아래 끝에 달린 노드를 **리프 노드**라고 한다.
filled 매개변수에서 클래스에 맞게 노드의 색을 칠할 수 있습니다.feature_names 매개변수는 특성의 이름을 전달합니다.

```python
plt.figure(figsize=(10,7))
plot_tree(dt, max_depth=1, filled=True, feature_names=['alcohol', 'sugar', 'pH'])
plt.show
```

![png](https://i.esdrop.com/d/f/uVJApfFjHN/BNRNZUvMAC.jpg)

<br>

![png](https://i.esdrop.com/d/f/uVJApfFjHN/SluwRDp6m9.jpg)

<br>

![png](https://i.esdrop.com/d/f/uVJApfFjHN/p7D60x6hZ3.jpg)

하나씩 살펴보면 처음 루트 노드는 당도가 -0.239이하인지를 질문합니다. 어떤 샘플의 당도가 -0.239와 같거나 작으면 왼쪽으로 가고 그렇지 않으면 오른쪽 가지로 이동합니다. 총 샘플 5197개에서 왼쪽으로 2922개, 오른쪽으로 2275개가 이동한 것입니다. value는 [음성클래스 개수, 양성클래스 개수]입니다.

### 3 - 1. 불순도

![png](https://i.esdrop.com/d/f/uVJApfFjHN/m1gI2jE5SO.png)

빨간색 동그라미 친 gini는 **지니 불순도**를 의미합니다.
지니 불순도는 클래스의 비율을 제곱해서 더한 다음 1에서 빼면 됩니다.
$$지니 불순도 = 1 - (음성 클래스 비율^2 + 양성 클래스 비율^2)$$

<br>

결정 트리 모델은 부모 노드와 자식 노드의 불순도 차이가 가능 크도록 트리를 성장시킵니다.
부모와 자식 노드 사이의 불순도 차이를 **정보 이득(information gain)**이라 합니다.

<br>

결정 트리도 '가지 치기'라는 작업이 필요합니다. 무작정 끝까지 자라면 훈련 세트에는 아주 잘 맞지만 테스트 세트에는 그에 못미치게 됩니다.
DecisionTreeClassifier 클래스의 max_depth 매개변수를 3으로 지정해 모델을 만들어 봅니다.

<br>

훈련세트의 성능은 낮아졌지만 테스트 세트의 성능은 거의 그대로입니다.

```python
dt = DecisionTreeClassifier(max_depth=3, random_state=42)
dt.fit(train_scaled, train_target)

print(dt.score(train_scaled, train_target))
print(dt.score(test_scaled, test_target))
```

    0.8454877814123533
    0.8415384615384616

plot_tree()함수로 그려봅니다.

```python
plt.figure(figsize=(20,15))
plot_tree(dt, filled=True, feature_names=['alcohol', 'sugar', 'pH'])
plt.show()
```

![png](https://i.esdrop.com/d/f/uVJApfFjHN/bdoOdQFU2G.png)

두 번째 특성인 당도가 0.87로 제일 중요하고 그다음 알코올 도수, pH순으로 중요합니다.

```python
print(dt.feature_importances_)
```

    [0.12345626 0.86862934 0.0079144 ]

공부한 전체 코드는 깃허브에 올렸습니다.
<https://github.com/mgskko/Data_science_Study-hongongmachine/blob/main/%ED%98%BC%EA%B3%B5%EB%A8%B8%EC%8B%A0_5%EA%B0%95_1.ipynb>
