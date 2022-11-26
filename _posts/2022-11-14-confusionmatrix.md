---
title: '[DL/BASIC] 혼동행렬 : 모델 성능 시각화하기 📊'
layout : single
toc: true
toc_sticky: true
categories:
  - basics
---

## 6. 오차행렬 (confusion matrix)

### 6.1 오차행렬 알아보기
오차 행렬(confusion matrix)은 이중 분류 모델의 평가 결과를 나타낼 때 많이 사용하는 방법 중 하나이다. 오차 행렬의 뜻을 해석해보면 학습된 분류 모델이 예측을 수행면서 얼마나 혼동하고 있는지 보여주는 지표라고 생각하면 된다. 오차 행렬은 다음 이미지와 같이 2x2 크기의 배열이다. 배열의 행은 정답 클래스에 해당하고, 열은 예측 클래스에 해당한다.

이번 글에서 오차 행렬로 성능을 평가할 모델은 mnist 데이터를 LogisticRegression로 예측한 모델이다. 오차 행렬을 다루는 것이 글의 주제이기 때문에 logistic regression 모델에 대해서는 자세히 다루지 않겠다. 먼저 오차행렬을 적용하기 위한 모델을 간단히 설정한다.


```python
# 기본 설정
# 노트북이 코랩에서 실행 중인지 체크

# 사이킷런 최신 버전을 설치
!pip install -q --upgrade scikit-learn
# mglearn을 다운.
!wget -q -O mglearn.tar.gz https://bit.ly/mglearn-tar-gz
!tar -xzf mglearn.tar.gz
# 나눔 폰트를 설치
!sudo apt-get install -y fonts-nanum
!sudo fc-cache -fv
!rm ~/.cache/matplotlib -rf

import sklearn
from preamble import *
import matplotlib

# 나눔 폰트 사용
matplotlib.rc('font', family='NanumBarunGothic')
matplotlib.rcParams['axes.unicode_minus'] = False

```

    Reading package lists... Done
    Building dependency tree       
    Reading state information... Done
    fonts-nanum is already the newest version (20170925-1).
    The following package was automatically installed and is no longer required:
      libnvidia-common-460
    Use 'sudo apt autoremove' to remove it.
    0 upgraded, 0 newly installed, 0 to remove and 5 not upgraded.
    /usr/share/fonts: caching, new cache contents: 0 fonts, 1 dirs
    /usr/share/fonts/truetype: caching, new cache contents: 0 fonts, 3 dirs
    /usr/share/fonts/truetype/humor-sans: caching, new cache contents: 1 fonts, 0 dirs
    /usr/share/fonts/truetype/liberation: caching, new cache contents: 16 fonts, 0 dirs
    /usr/share/fonts/truetype/nanum: caching, new cache contents: 10 fonts, 0 dirs
    /usr/local/share/fonts: caching, new cache contents: 0 fonts, 0 dirs
    /root/.local/share/fonts: skipping, no such directory
    /root/.fonts: skipping, no such directory
    /var/cache/fontconfig: cleaning cache directory
    /root/.cache/fontconfig: not cleaning non-existent cache directory
    /root/.fontconfig: not cleaning non-existent cache directory
    fc-cache: succeeded



```python
# 모델에 사용할 데이터 준비
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.datasets import load_digits

digits = load_digits()
y = digits.target == 9

X_train, X_test, y_train, y_test = train_test_split(
    digits.data, y, random_state=0)

logreg = LogisticRegression(C=0.1, max_iter=1000).fit(X_train, y_train)

# 테스트 세트 예측 결과 저장
pred_logreg = logreg.predict(X_test)
```


```python
from sklearn.metrics import confusion_matrix

confusion = confusion_matrix(y_test,pred_logreg)
print('오차 행렬: \n',confusion)
```

    오차 행렬: 
     [[402   1]
     [  6  41]]


출력값의 배열에서 4가지의 값이 발생했는데, 행은 정답 클래스에 해당하고, 열은 예측 클래스에 해당한다. 각 항목의 숫자는 얼마나 많이 열에 해당하는 클래스로 분류되었는지를 나타낸다.


```python
mglearn.plots.plot_confusion_matrix_illustration()
```




    
![png](Untitled0_files/Untitled0_5_0.png)
    



오차 행렬의 대각 행렬은 정확히 분류된 경우이고, 다른 항목들은 잘못 분류된 경우가 얼마나 많은지를 나타낸다. 숫자 9를 양성(positive) 클래스로 설정하면 다음과 같이 나타낼 수 있다.


```python
mglearn.plots.plot_binary_confusion_matrix()
```




    
![png](Untitled0_files/Untitled0_7_0.png)
    



위의 배열에서 4가지의 값이 발생했는데, TN과 TP는 각각 True Negative와 True Positive로 올바르게 예측한 횟수이고 FN과 FP는 False Negative와 False Positive로 잘못 예측한 횟수이다. 

scikit-learn에서 제공하는 ConfusionMatrixDisplay 클래스를 이용해서 오차행렬을 그릴수 있다. ConfusionMatrixDisplay 클래스는 추정기 객체로부터 오차행렬을 그리는 from_estimator 함수와 예측 결과로부터 오차 행렬을 그리는 from_predictions 함수를 제공한다.


```python
# from_estimator 함수 사용
from sklearn.metrics import ConfusionMatrixDisplay

ConfusionMatrixDisplay.from_estimator(logreg, X_test, y_test,
                                      display_labels=['9 아님','9 맞음'])
plt.show()
```




    
![png](Untitled0_files/Untitled0_9_0.png)
    




```python
# from_predictions 함수 사용
ConfusionMatrixDisplay.from_predictions(y_test,pred_logreg,
                                        display_labels = ['9 아님','9 맞음'])
plt.show()
```




    
![png](Untitled0_files/Untitled0_10_0.png)
    



### 6.2 오차행렬로 얻을 수 있는 지표
이제 이 TP,TN,FP,FN 이 4가지 값들을 가지고 어떤 의미있는 지표를 계산할 수 있는지 알아보자.

#### 6.2.1 정확도 (accuracy)
정확도는 모델이 입력 데이터에 대해서 얼마나 정확하게 예측했는지를 나타내는 지표다. 정확도는 (올바르게 예측한 횟수) / (전체 데이터수)로 계산한다.
\begin{equation}
\text{Accuracy} = \frac{\text{TP} + \text{TN}}{\text{TP} + \text{TN} + \text{FP} + \text{FN}}
\end{equation}

#### 6.2.2 정밀도 (precision)
정밀도는 양성으로 예측된 것 중 얼마나 많은 데이터가 진짜 양성인지를 측정한다. 

\begin{equation}
\text{정밀도} = \frac{\text{TP}}{\text{TP} + \text{FP}}
\end{equation}

정밀도는 거짓 양성(FP)를 줄이는 것이 목표일 때 성능 지표로 사용한다.

#### 6.2.3 재현율 (recall)
재현율은 모든 전체 양성 샘플 중에서 얼마나 많은 샘플이 양성 클래스로 분류 되었는지를 측정한다.

\begin{equation}
\text{재현율} = \frac{\text{TP}}{\text{TP} + \text{FN}}
\end{equation}

재현율은 모든 양성 샘플을 식별해야 할 때 (거짓 음성을 피하는 것이 중요 할 때) 성능 지표로 사용한다. 

#### 6.2.4 f1 점수
정밀도와 재현율의 조화 평균인 f 점수는 정밀도와 재현율을 하나로 요약해준다.

\begin{equation}
\text{F} = 2 \cdot \frac{\text{정밀도} \cdot \text{재현율}}{\text{정밀도} + \text{재현율}}
\end{equation}

정밀도와 재현율을 같이 고려하기 때문에 **불균형한 이진 분류 데이터셋에서는 유용한 지표**이다.

classification_report 함수를 사용하면 정밀도, 재현율, f1 점수를 깔끔하게 출력 가능하다.


```python
from sklearn.metrics import classification_report
print(classification_report(y_test, pred_logreg, target_names=['9 아님','9 맞음'],
                            zero_division=0))
```

                  precision    recall  f1-score   support
    
            9 아님       0.99      1.00      0.99       403
            9 맞음       0.98      0.87      0.92        47
    
        accuracy                           0.98       450
       macro avg       0.98      0.93      0.96       450
    weighted avg       0.98      0.98      0.98       450
    


### 6.3 다중 분류의 평가 지표
이진 분류 평가에 대해 다뤄 보았으니 이제 다중 분류를 평가하는 지표를 알아보자. 다중 분류를 위한 지표는 이진 분류 평가 지표에서 유도되었다. 다만 모든 클래스에 대해 평균을 냈다는 것만 다른 점이다. 그렇기 때문에 클래스가 불균형할 때는 정확도는 좋은 지표가 되지 못한다. 일반적으로 다중 분류의 결과는 이진 분류 결과보다 이해하기 어렵다. mnist 데이터셋의 10개 손글씨 숫자를 분류한 모델에 오차 행렬을 적용해보겠다.


```python
from sklearn.metrics import accuracy_score
X_train, X_test, y_train, y_test = train_test_split(digits.data, digits.target, random_state=0)
lr = LogisticRegression(max_iter=5000).fit(X_train,y_train)
pred = lr.predict(X_test)
print('정확도 : {:.3f}'.format(accuracy_score(y_test,pred)))
print('오차 행렬 : \n', confusion_matrix(y_test,pred))
```

    정확도 : 0.953
    오차 행렬 : 
     [[37  0  0  0  0  0  0  0  0  0]
     [ 0 40  0  0  0  0  0  0  2  1]
     [ 0  0 41  3  0  0  0  0  0  0]
     [ 0  0  0 44  0  0  0  0  1  0]
     [ 0  0  0  0 37  0  0  1  0  0]
     [ 0  0  0  0  0 46  0  0  0  2]
     [ 0  1  0  0  0  0 51  0  0  0]
     [ 0  0  0  1  1  0  0 46  0  0]
     [ 0  3  1  0  0  0  1  0 43  0]
     [ 0  0  0  0  0  1  0  0  2 44]]



```python
scores_image = mglearn.tools.heatmap(
    confusion_matrix(y_test,pred),xlabel='예측 클래스',
    ylabel ='정답 클래스',xticklabels=digits.target_names,
    yticklabels = digits.target_names, cmap = plt.cm.gray_r, fmt='%d')
plt.title('오차행렬')
plt.gca().invert_yaxis()
```




    
![png](Untitled0_files/Untitled0_15_0.png)
    



위의 오차 행렬은 이진 분류에서처럼 각 행은 정답 클래스에 해당하며, 열은 예측 클래스에 해당한다. classification_report 함수를 사용해서 정밀도, 재현율과 f1점수를 출력해보겠다.


```python
print(classification_report(y_test,pred))
```

                  precision    recall  f1-score   support
    
               0       1.00      1.00      1.00        37
               1       0.91      0.93      0.92        43
               2       0.98      0.93      0.95        44
               3       0.92      0.98      0.95        45
               4       0.97      0.97      0.97        38
               5       0.98      0.96      0.97        48
               6       0.98      0.98      0.98        52
               7       0.98      0.96      0.97        48
               8       0.90      0.90      0.90        48
               9       0.94      0.94      0.94        47
    
        accuracy                           0.95       450
       macro avg       0.95      0.95      0.95       450
    weighted avg       0.95      0.95      0.95       450
    


다중 클래스용 f1점수는 한 클래스를 양성 클래스로 두고 나머지 클래스들을 음ㅅ어 클래스로 간주해서 클래스마다 f1 점수를 계산한다음, 클래스별 f1점수를 다음 중 하나를 사용해서 평균을 낸다.

* macro 평균 : 클래스별 f1 점수에 가중치를 주지 않고 평균을 낸다.
* weighted 평균 : 클래스별 샘플수에 대한 가중칠르 두어 f1 점수의 평균을 낸다.
* micro 평균 : 모든 클래스의 FP,FN,TP의 총 수를 헤아린 다음 f1 점수를 이 수치로 계산한다.
