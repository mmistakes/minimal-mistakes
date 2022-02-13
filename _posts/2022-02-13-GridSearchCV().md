----

안녕하세요. 데이터 사이언티스트를 위한 정보를 공유하고 있습니다.

M1 Macbook Air를 사용하고 있으며, 블로그의 모든 글은 Mac을 기준으로 작성된 점 참고해주세요.

----

# GridSearchCV

GridSearchCV는 교차 검증을 하며 하이퍼 파라미터 튜닝을 동시에 진행해 주는 API입니다.

Grid는 격자라는 뜻을 갖고 있는데

GridSearchCV는 말 그대로 여러 가지의 하이퍼 파라미터를 격자로 촘촘히 세팅을 하고,

하나하나 순차적으로 모델의 하이퍼 파라미터로서 적용해 보면서 교차 검증을 통해 최적의 하이퍼 파라미터 값을 찾아주는 방식입니다.

GridSearchCV가 어떻게 사용되는지 예시를 통해 먼저 살펴보겠습니다.


```python
from sklearn.datasets import load_iris
from sklearn.model_selection import GridSearchCV, train_test_split
from sklearn.tree import DecisionTreeClassifier
from sklearn.metrics import accuracy_score

import pandas as pd

iris_data = load_iris()
# 붓꽃 데이터 가져오기
X_train, X_test, y_train, y_test = train_test_split(iris_data.data, iris_data.target,
                                                    test_size = 0.2, random_state = 4)
# 붓꽃 데이터의 20%를 테스트 데이터 세트로 지정
dt = DecisionTreeClassifier()
# Decision Tree 분류기를 dt라는 이름으로 생성

parameters = {"max_depth": [1, 2, 3],
              "min_samples_split": [2, 3, 4]}
# GridSearchCV에서 사용될 하이퍼 파라미터들을 딕셔너리 형태로 세팅

grid_dt = GridSearchCV(dt, param_grid = parameters, cv = 5, refit = True)
# GridSearchCV 객체를 grid_dt라는 이름으로 생성
grid_dt.fit(X_train, y_train)
# grid_dt가 학습 데이터로 학습 및 검증

scores = pd.DataFrame(grid_dt.cv_results_)
# 학습 및 검증 결과를 판다스 데이터 프레임의 형태로 받기
scores[["params", "mean_test_score", "rank_test_score", "split0_test_score", "split1_test_score", "split2_test_score", "split3_test_score", "split4_test_score"]]
# 결과값 중 8개의 열만 추출하여 보여줌
```





  <div id="df-6aed4009-75dd-49c3-8df8-c9bf0f1fdd42">
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
      <th>params</th>
      <th>mean_test_score</th>
      <th>rank_test_score</th>
      <th>split0_test_score</th>
      <th>split1_test_score</th>
      <th>split2_test_score</th>
      <th>split3_test_score</th>
      <th>split4_test_score</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>{'max_depth': 1, 'min_samples_split': 2}</td>
      <td>0.658333</td>
      <td>7</td>
      <td>0.666667</td>
      <td>0.666667</td>
      <td>0.666667</td>
      <td>0.666667</td>
      <td>0.625000</td>
    </tr>
    <tr>
      <th>1</th>
      <td>{'max_depth': 1, 'min_samples_split': 3}</td>
      <td>0.658333</td>
      <td>7</td>
      <td>0.666667</td>
      <td>0.666667</td>
      <td>0.666667</td>
      <td>0.666667</td>
      <td>0.625000</td>
    </tr>
    <tr>
      <th>2</th>
      <td>{'max_depth': 1, 'min_samples_split': 4}</td>
      <td>0.658333</td>
      <td>7</td>
      <td>0.666667</td>
      <td>0.666667</td>
      <td>0.666667</td>
      <td>0.666667</td>
      <td>0.625000</td>
    </tr>
    <tr>
      <th>3</th>
      <td>{'max_depth': 2, 'min_samples_split': 2}</td>
      <td>0.925000</td>
      <td>4</td>
      <td>1.000000</td>
      <td>0.875000</td>
      <td>0.916667</td>
      <td>0.875000</td>
      <td>0.958333</td>
    </tr>
    <tr>
      <th>4</th>
      <td>{'max_depth': 2, 'min_samples_split': 3}</td>
      <td>0.925000</td>
      <td>4</td>
      <td>1.000000</td>
      <td>0.875000</td>
      <td>0.916667</td>
      <td>0.875000</td>
      <td>0.958333</td>
    </tr>
    <tr>
      <th>5</th>
      <td>{'max_depth': 2, 'min_samples_split': 4}</td>
      <td>0.925000</td>
      <td>4</td>
      <td>1.000000</td>
      <td>0.875000</td>
      <td>0.916667</td>
      <td>0.875000</td>
      <td>0.958333</td>
    </tr>
    <tr>
      <th>6</th>
      <td>{'max_depth': 3, 'min_samples_split': 2}</td>
      <td>0.975000</td>
      <td>1</td>
      <td>1.000000</td>
      <td>0.958333</td>
      <td>0.958333</td>
      <td>1.000000</td>
      <td>0.958333</td>
    </tr>
    <tr>
      <th>7</th>
      <td>{'max_depth': 3, 'min_samples_split': 3}</td>
      <td>0.975000</td>
      <td>1</td>
      <td>1.000000</td>
      <td>0.958333</td>
      <td>0.958333</td>
      <td>1.000000</td>
      <td>0.958333</td>
    </tr>
    <tr>
      <th>8</th>
      <td>{'max_depth': 3, 'min_samples_split': 4}</td>
      <td>0.975000</td>
      <td>1</td>
      <td>1.000000</td>
      <td>0.958333</td>
      <td>0.958333</td>
      <td>1.000000</td>
      <td>0.958333</td>
    </tr>
  </tbody>
</table>
</div>
      <button class="colab-df-convert" onclick="convertToInteractive('df-6aed4009-75dd-49c3-8df8-c9bf0f1fdd42')"
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
          document.querySelector('#df-6aed4009-75dd-49c3-8df8-c9bf0f1fdd42 button.colab-df-convert');
        buttonEl.style.display =
          google.colab.kernel.accessAllowed ? 'block' : 'none';

        async function convertToInteractive(key) {
          const element = document.querySelector('#df-6aed4009-75dd-49c3-8df8-c9bf0f1fdd42');
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




GridSearchCV()의 주요 파라미터를 살펴보겠습니다.

첫 번째는 역시나 **estimator**, 즉 분류 모델이 들어갑니다.

**param_grid**: 순차적으로 적용될 모델의 하이퍼 파라미터들을 딕셔너리의 형태로 넣어줍니다.

**scoring**: 예측 성능 평가 지표를 결정합니다.

**cv**: 폴드의 수를 결정합니다.

**refit**: true로 지정되면 GridSearch로 찾게 된 최적의 하이퍼 파라미터를 기준으로 estimator를 재학습시킵니다. default는 true입니다.

학습 및 검증 후 GridSearchCV의 객체(예시에서 gird_dt) 속성을 살펴봅시다.

**cv_results_**: GridSearchCV 교차 검증 별로, 각 하이퍼 파라미터 별로 검증 결과가 저장되어 있는데 판다스의 데이터 프레임으로 확인하면 좋습니다.

**best_params_**: 최적의 하이퍼 파라미터 조합을 나타냅니다.

**best_score_**: 최적의 하이퍼 파라미터를 적용하였을 때의 검증 결과를 나타냅니다.


```python
print(f"GridSearchCV 최적 파라미터: {grid_dt.best_params_}")
print(f"GridSearchCV 최고 정확도: {grid_dt.best_score_:.4f}")
```

    GridSearchCV 최적 파라미터: {'max_depth': 3, 'min_samples_split': 2}
    GridSearchCV 최고 정확도: 0.9750


파라미터 설정 시 refit은 true로 지정하였기 때문에

최적의 하이퍼 파라미터로 학습한 분류 모델(estimator)은 **best_estimator_**에 저장되어 있습니다.

해당 최적의 모델을 테스트 데이터 세트로 테스트를, 즉 최종 성능 평가를 진행해 보겠습니다.


```python
estimator = grid_dt.best_estimator_
# GridSearchCV의 refit으로 최적의 하이퍼 파라미터로 학습된 estimator 반환

y_pred = estimator.predict(X_test)
print(f"예측 정확도: {accuracy_score(y_test, y_pred):.4f}")
```

    예측 정확도: 0.9667


약 96.67%의 결과를 확인할 수 있습니다.

----

읽어주셔서 감사합니다.

정보 공유의 목적으로 만들어진 블로그입니다.

미흡한 점은 언제든 댓글로 지적해주시면 감사하겠습니다.

----
