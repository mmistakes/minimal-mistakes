---
layout: single
title:  "Logistic function"
categories: scikit-learn
tag: [python, scikit-learn]
toc: false
author_profile: false
---

<head>
  <style>
    table.dataframe {
      white-space: normal;
      width: 100%;
      height: 240px;
      display: block;
      overflow: auto;
      font-family: Arial, sans-serif;
      font-size: 0.9rem;
      line-height: 20px;
      text-align: center;
      border: 0px !important;
    }

    table.dataframe th {
      text-align: center;
      font-weight: bold;
      padding: 8px;
    }
    
    table.dataframe td {
      text-align: center;
      padding: 8px;
    }
    
    table.dataframe tr:hover {
      background: #b8d1f3; 
    }
    
    .output_prompt {
      overflow: auto;
      font-size: 0.9rem;
      line-height: 1.45;
      border-radius: 0.3rem;
      -webkit-overflow-scrolling: touch;
      padding: 0.8rem;
      margin-top: 0;
      margin-bottom: 15px;
      font: 1rem Consolas, "Liberation Mono", Menlo, Courier, monospace;
      color: $code-text-color;
      border: solid 1px $border-color;
      border-radius: 0.3rem;
      word-break: normal;
      white-space: pre;
    }

  .dataframe tbody tr th:only-of-type {
      vertical-align: middle;
  }

  .dataframe tbody tr th {
      vertical-align: top;
  }

  .dataframe thead th {
      text-align: center !important;
      padding: 8px;
  }

  .page__content p {
      margin: 0 0 0px !important;
  }

  .page__content p > strong {
    font-size: 0.8rem !important;
  }

  </style>
</head>

원본 사이트: <a href='https://scikit-learn.org/stable/auto_examples/linear_model/plot_logistic.html' target='blank'> https://scikit-learn.org/stable/auto_examples/linear_model/plot_logistic.html <br></a>


<h1 style='background-color: #CDE8EF'>로지스틱 함수</h1>


이 합성 데이터 세트로 로지스틱 회귀가 로지스틱 곡선을 사용하여 값을 0 또는 1, 즉 클래스 1 또는 2로 분류하는 방법이 그래프에 표시됩니다.


![image.png](data:image/png;base64,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)



```python
# Code source: Gael Varoquaux
# License: BSD 3 clause

import numpy as np
import matplotlib.pyplot as plt

from sklearn.linear_model import LogisticRegression, LinearRegression
from scipy.special import expit     # expit(x) = 1/(1+exp(-x))

# 약간의 가우스 잡음이 있는 직선인 토이 데이터 세트를 생성:
xmin, xmax = -5, 5
n_samples = 100
np.random.seed(0)   # 매 실행마다 같은 결과를 내기 위한 seed 설정
X = np.random.normal(size=n_samples)    # (100,) 정규분포 추출
y = (X > 0).astype(float)               # (100,) 0 또는 1
X[X > 0] *= 4
X += 0.3 * np.random.normal(size=n_samples) # 잡음 추가

X = X[:, np.newaxis]                    # (100,) -> (100, 1)

# 분류기 학습
clf = LogisticRegression(C=1e5)         # 규제가 있는 로지스틱 회귀 분류기
clf.fit(X, y)

# 결과 출력
plt.figure(1, figsize=(4, 3))
plt.clf()
plt.scatter(X.ravel(), y, color="black", zorder=20)
X_test = np.linspace(-5, 10, 300)      # (300,)

loss = expit(X_test * clf.coef_ + clf.intercept_).ravel()
plt.plot(X_test, loss, color="red", linewidth=3)

ols = LinearRegression()
ols.fit(X, y)
plt.plot(X_test, ols.coef_ * X_test + ols.intercept_, linewidth=1)
plt.axhline(0.5, color=".5")

plt.ylabel("y")
plt.xlabel("X")
plt.xticks(range(-5, 10))
plt.yticks([0, 0.5, 1])
plt.ylim(-0.25, 1.25)
plt.xlim(-4, 10)
plt.legend(
    ("Logistic Regression Model", "Linear Regression Model"),
    loc="lower right",
    fontsize="small"
)
plt.tight_layout()
plt.show()
```

<pre>
<Figure size 288x216 with 1 Axes>
</pre>

<span style='color:#808080'>ⓒ 2007 - 2021, scikit-learn developers (BSD License).</span> <a href='https://scikit-learn.org/stable/_sources/auto_examples/linear_model/plot_logistic.rst.txt' target='blanck'>Show this page source</a>