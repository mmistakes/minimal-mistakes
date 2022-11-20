---
title: '[Kaggle/CV] Protein Atlas - 데이터 살펴보기, baseline model 🧬'
toc: true
toc_sticky: true
categories:
  - kaggle
---
## 1. Protein Atlas

### 1.0 들어가며
Protein Atlas에는 다양한 단백질 소기관들의 사진이 있는데, 데이터셋에는 28 종류의 단백질 소기관 이미지들이 들어있다. 따라서 우리의 목표는 각 단백질 이미지들이 28개의 단백질 종류 중 어떤 종류의 단백질 소기관이 들어있는지 예측하는 모델을 구축해서 문제를 푸는 것이다. 이번 Protein Atlas 문제의 데이터셋은 굉장히 크고 어려운 문제이기 때문에 데이터를 살펴보는 과정부터 차근차근 나아간다. 이번 코드는 (https://www.kaggle.com/code/allunia/protein-atlas-exploration-and-baselinehttps://www.kaggle.com/code/allunia/protein-atlas-exploration-and-baseline)의 코드를 참고해서 작성했다.

### 1.1 데이터 살펴보기

#### 1.1.1 데이터, 패키지 로드하기



```python
import numpy as np
import pandas as pd

import seaborn as sns
import matplotlib.pyplot as plt
%matplotlib inline
from PIL import Image
from imageio import imread

import tensorflow as tf
sns.set()

import os
print(os.listdir('../input'))

import warnings
warnings.filterwarnings("ignore", category=DeprecationWarning)
warnings.filterwarnings("ignore", category=UserWarning)
warnings.filterwarnings("ignore", category=FutureWarning)
```

    ['human-protein-atlas-image-classification']



```python
train_labels = pd.read_csv('../input/human-protein-atlas-image-classification/train.csv')
train_labels.head()
```




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
      <th>Id</th>
      <th>Target</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>00070df0-bbc3-11e8-b2bc-ac1f6b6435d0</td>
      <td>16 0</td>
    </tr>
    <tr>
      <th>1</th>
      <td>000a6c98-bb9b-11e8-b2b9-ac1f6b6435d0</td>
      <td>7 1 2 0</td>
    </tr>
    <tr>
      <th>2</th>
      <td>000a9596-bbc4-11e8-b2bc-ac1f6b6435d0</td>
      <td>5</td>
    </tr>
    <tr>
      <th>3</th>
      <td>000c99ba-bba4-11e8-b2b9-ac1f6b6435d0</td>
      <td>1</td>
    </tr>
    <tr>
      <th>4</th>
      <td>001838f8-bbca-11e8-b2bc-ac1f6b6435d0</td>
      <td>18</td>
    </tr>
  </tbody>
</table>
</div>




```python
# 훈련 데이터 이미지 개수
train_labels.shape[0]
```




    31072




```python
# 우리가 예측해야하는 테스트 이미지 살펴보기
test_path = "../input/human-protein-atlas-image-classification/test/"
submission = pd.read_csv("../input/human-protein-atlas-image-classification/sample_submission.csv")
submission.head()
```




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
      <th>Id</th>
      <th>Predicted</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>00008af0-bad0-11e8-b2b8-ac1f6b6435d0</td>
      <td>0</td>
    </tr>
    <tr>
      <th>1</th>
      <td>0000a892-bacf-11e8-b2b8-ac1f6b6435d0</td>
      <td>0</td>
    </tr>
    <tr>
      <th>2</th>
      <td>0006faa6-bac7-11e8-b2b7-ac1f6b6435d0</td>
      <td>0</td>
    </tr>
    <tr>
      <th>3</th>
      <td>0008baca-bad7-11e8-b2b9-ac1f6b6435d0</td>
      <td>0</td>
    </tr>
    <tr>
      <th>4</th>
      <td>000cce7e-bad4-11e8-b2b8-ac1f6b6435d0</td>
      <td>0</td>
    </tr>
  </tbody>
</table>
</div>



위의 출력 값을 보면 테스트 데이터에는 레이블이 정해져있지 않다. 이제 우리가 모델을 만들어서 Predicted 칸을 채워야 하는 것이다. 다음 코드에서 테스트 데이터들의 이름들을 출력해보고, 예측해야하는 테스트 데이터 개수를 출력해보자.


```python
test_names = submission.Id.values
print(len(test_names))
print(test_names[0])
```

    11702
    00008af0-bad0-11e8-b2b8-ac1f6b6435d0


이제 훈련 데이터의 데이터프레임을 만들것인데, 문제를 풀기 쉽게 하기 위해서 각 데이터가 해당되는 타깃값에 대해서만 '1'을 부여하고 해당되지 않는 클래스는 '0'을 부여해서 이진분류의 형식으로 데이터를 분석하기 쉬워졌다.


```python
label_names = {
    0:  "Nucleoplasm",  
    1:  "Nuclear membrane",   
    2:  "Nucleoli",   
    3:  "Nucleoli fibrillar center",   
    4:  "Nuclear speckles",
    5:  "Nuclear bodies",   
    6:  "Endoplasmic reticulum",   
    7:  "Golgi apparatus",   
    8:  "Peroxisomes",   
    9:  "Endosomes",   
    10:  "Lysosomes",   
    11:  "Intermediate filaments",   
    12:  "Actin filaments",   
    13:  "Focal adhesion sites",   
    14:  "Microtubules",   
    15:  "Microtubule ends",   
    16:  "Cytokinetic bridge",   
    17:  "Mitotic spindle",   
    18:  "Microtubule organizing center",   
    19:  "Centrosome",   
    20:  "Lipid droplets",   
    21:  "Plasma membrane",   
    22:  "Cell junctions",   
    23:  "Mitochondria",   
    24:  "Aggresome",   
    25:  "Cytosol",   
    26:  "Cytoplasmic bodies",   
    27:  "Rods & rings"
}

reverse_train_labels = dict((v,k) for k,v in label_names.items())

def fill_targets(row):
    row.Target = np.array(row.Target.split(" ")).astype(np.int)
    for num in row.Target:
        name = label_names[int(num)]
        row.loc[name] = 1
    return row

for key in label_names.keys():
    train_labels[label_names[key]] = 0

train_labels = train_labels.apply(fill_targets, axis=1)
train_labels.head()
```




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
      <th>Id</th>
      <th>Target</th>
      <th>Nucleoplasm</th>
      <th>Nuclear membrane</th>
      <th>Nucleoli</th>
      <th>Nucleoli fibrillar center</th>
      <th>Nuclear speckles</th>
      <th>Nuclear bodies</th>
      <th>Endoplasmic reticulum</th>
      <th>Golgi apparatus</th>
      <th>...</th>
      <th>Microtubule organizing center</th>
      <th>Centrosome</th>
      <th>Lipid droplets</th>
      <th>Plasma membrane</th>
      <th>Cell junctions</th>
      <th>Mitochondria</th>
      <th>Aggresome</th>
      <th>Cytosol</th>
      <th>Cytoplasmic bodies</th>
      <th>Rods &amp; rings</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>00070df0-bbc3-11e8-b2bc-ac1f6b6435d0</td>
      <td>[16, 0]</td>
      <td>1</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>...</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
    </tr>
    <tr>
      <th>1</th>
      <td>000a6c98-bb9b-11e8-b2b9-ac1f6b6435d0</td>
      <td>[7, 1, 2, 0]</td>
      <td>1</td>
      <td>1</td>
      <td>1</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>1</td>
      <td>...</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
    </tr>
    <tr>
      <th>2</th>
      <td>000a9596-bbc4-11e8-b2bc-ac1f6b6435d0</td>
      <td>[5]</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>1</td>
      <td>0</td>
      <td>0</td>
      <td>...</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
    </tr>
    <tr>
      <th>3</th>
      <td>000c99ba-bba4-11e8-b2b9-ac1f6b6435d0</td>
      <td>[1]</td>
      <td>0</td>
      <td>1</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>...</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
    </tr>
    <tr>
      <th>4</th>
      <td>001838f8-bbca-11e8-b2bc-ac1f6b6435d0</td>
      <td>[18]</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>...</td>
      <td>1</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
    </tr>
  </tbody>
</table>
<p>5 rows × 30 columns</p>
</div>



나중에 사용할 제출용 테스트 데이터에 대한 데이터 프레임도 이진 분류 형식으로 만들어주자.


```python
test_labels = pd.DataFrame(data=test_names, columns = ['Id'])
for col in train_labels.columns.values:
    if col != 'Id':
        test_labels[col] = 0
test_labels.head(3)
```




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
      <th>Id</th>
      <th>Target</th>
      <th>Nucleoplasm</th>
      <th>Nuclear membrane</th>
      <th>Nucleoli</th>
      <th>Nucleoli fibrillar center</th>
      <th>Nuclear speckles</th>
      <th>Nuclear bodies</th>
      <th>Endoplasmic reticulum</th>
      <th>Golgi apparatus</th>
      <th>...</th>
      <th>Microtubule organizing center</th>
      <th>Centrosome</th>
      <th>Lipid droplets</th>
      <th>Plasma membrane</th>
      <th>Cell junctions</th>
      <th>Mitochondria</th>
      <th>Aggresome</th>
      <th>Cytosol</th>
      <th>Cytoplasmic bodies</th>
      <th>Rods &amp; rings</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>00008af0-bad0-11e8-b2b8-ac1f6b6435d0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>...</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
    </tr>
    <tr>
      <th>1</th>
      <td>0000a892-bacf-11e8-b2b8-ac1f6b6435d0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>...</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
    </tr>
    <tr>
      <th>2</th>
      <td>0006faa6-bac7-11e8-b2b7-ac1f6b6435d0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>...</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
    </tr>
  </tbody>
</table>
<p>3 rows × 30 columns</p>
</div>



당연하지만, 아직 모델을 구축해서 예측을 진행하지 않았기 때문에 모든 테스트 데이터 이미지는 어떤 타깃값에도 해당되지 않는다.

#### 1.1.2 훈련 데이터의 분포 살펴보기
훈련 데이터에 각 클래스에 해당하는 이미지가 얼마나 있는지 확인해보는 것 또한 좋은 방법이다. 


```python
target_counts = train_labels.drop(['Id','Target'],axis=1).sum(axis=0).sort_values(ascending=False)
plt.figure(figsize=(15,15))
sns.barplot(y=target_counts.index.values, x=target_counts.values, order=target_counts.index)
```




    <AxesSubplot:>




    
![kaggle_pro1](https://user-images.githubusercontent.com/77332628/202901044-c2241c92-4dfc-4271-b1f2-ab7d942bb618.png)
    


데이터의 분포를 확인해보니 무시할 수 있을 정도로 적은 수의 타깃값들이 있다. 예를 들어 Lipid droplets, Peroxisomes, Endosomes, Lysosomes, Microtubule ends, Rods&rings는 훈련 데이터에 굉장히 적은 수가 있기 때문에 모델이 정확한 예측을 하기 어려울 것으로 예상된다.

이번엔 각 이미지마다 몇개의 클래스들이 해당되는지 살펴보자.


```python
train_labels['number_of_targets'] = train_labels.drop(['Id','Target'], axis=1).sum(axis=1)
count_perc = np.round(100*train_labels['number_of_targets'].value_counts() / train_labels.shape[0],2)
plt.figure(figsize=(20,5))
sns.barplot(x=count_perc.index.values, y=count_perc.values, palette='Reds')
plt.xlabel('Number of targets per image')
plt.ylabel('percentage of train data')
```




    Text(0, 0.5, 'percentage of train data')




    
![kaggle_pro2](https://user-images.githubusercontent.com/77332628/202901045-9c72a405-de96-41f2-84ab-aefdd567658b.png)
    


분석해보니 4개 이상의 타깃값을 가지는 데이터는 무시할 수 있을 정도로 적다. 그렇기 때문에 3개 이하의 클래스를 가진 이미지만을 모델이 정확히 분류할 것이라고 예상할 수 있다.

#### 1.1.3 데이터간 연관성 확인하기
다음으로 데이터 분석으로 각각의 클래스들이 얼마나 연관되어 있는지 살펴보자.


```python
plt.figure(figsize=(15,15))
sns.heatmap(train_labels[train_labels.number_of_targets>1].drop(['Id','Target','number_of_targets'],axis=1).corr(), cmap='RdYlBu',vmin=-1,vmax=1)
```




    <AxesSubplot:>




    
![kaggle_pro3](https://user-images.githubusercontent.com/77332628/202901046-34f0105b-623d-4fff-8953-512a4c84c858.png)
    


출력된 히트맵을 보면 대부분의 클래스들은 서로 작은 연관성을 가지고 있다는 것을 알 수 있다. 하지만 lysosomes와 endosomes는 강한 연관성을 가지고 있다. 그리고 이 둘이 endoplasmatic reticulum과 어느 정도의 연관성을 띄는 것으로 보아 lysosomes와 endosomes는 endoplasmatic reticulum에 위치해있다는 것을 알 수 있다. 그리고 mitotic spindle과 cytokinetic bridge도 서로 어느정도의 연관성을 보이고, 이 둘은 또 microtubules와 연관성이 있다는 것을 확인할 수 있다.

마지막으로 위 바 그래프 형태를 통해서 알아본 희소한 수의 데이터에 해당되는 클래스들이 어떤 다른 클래스들과 어떻게 연관되어 있는지 살펴보자. 


```python
def find_counts(special_target, labels):
    counts = labels[labels[special_target] == 1].drop(['Id','Target','number_of_targets'],axis=1).sum(axis=0)
    counts = counts[counts>0]
    counts = counts.sort_values()
    return counts
```


```python
lyso_endo_counts = find_counts('Lysosomes',train_labels)
plt.figure(figsize=(10,3))
sns.barplot(x=lyso_endo_counts.index.values, y=lyso_endo_counts.values, palette='Blues')
plt.ylabel('Counts in train data')
plt.title('Lysosomes and Endosomes')
```




    Text(0.5, 1.0, 'Lysosomes and Endosomes')




    
![kaggle_pro4](https://user-images.githubusercontent.com/77332628/202901048-7978d994-f61a-4bdc-a3a7-844319d259aa.png)
    


위의 히트맵에서 분석한대로 lysosomes과 endosomes는 거의 항상 같은 위치에서 발견되고, 이 둘이 endoplamic reticulum에 위치해 있는 이미지 데이터도 11개정도 있는 것을 확인할 수 있다.


```python
rod_rings_counts = find_counts('Rods & rings',train_labels)
plt.figure(figsize=(10,3))
sns.barplot(x=rod_rings_counts.index.values, y=rod_rings_counts.values, palette='Greens')
plt.ylabel('Counts in train data')
plt.title('Rod & rings')
```




    Text(0.5, 1.0, 'Rod & rings')




    
![kaggle_pro5](https://user-images.githubusercontent.com/77332628/202901049-1265b39c-803b-4185-b3f3-db881d23d595.png)
    



```python
peroxi_counts = find_counts('Peroxisomes',train_labels)
plt.figure(figsize=(10,3))
sns.barplot(x=peroxi_counts.index.values, y=peroxi_counts.values, palette='Reds')
plt.ylabel('Counts in train data')
plt.xticks(rotation='30')
plt.title('Peroxisomes')
```




    Text(0.5, 1.0, 'Peroxisomes')




    
![kaggle_pro6](https://user-images.githubusercontent.com/77332628/202901050-56f8252c-7e7a-456a-9c1d-128c2f51d4c8.png)
    



```python
tubeends_counts = find_counts('Microtubule ends',train_labels)
plt.figure(figsize=(10,3))
sns.barplot(x=tubeends_counts.index.values, y=tubeends_counts.values, palette='Oranges')
plt.ylabel('Counts in train data')
plt.title('Microtubule ends')
```




    Text(0.5, 1.0, 'Microtubule ends')




    
![kaggle_pro7](https://user-images.githubusercontent.com/77332628/202901053-eda5e4b6-f776-4177-9f88-d74ec23a7f90.png)



```python
nuclear_speckles_counts = find_counts('Nuclear speckles',train_labels)
plt.figure(figsize=(10,3))
sns.barplot(x=nuclear_speckles_counts.index.values, y=nuclear_speckles_counts.values, palette='Purples')
plt.ylabel('Counts in train data')
plt.xticks(rotation='70')
plt.title('Nuclear speckles')
```




    Text(0.5, 1.0, 'Nuclear speckles')




    
![kaggle_pro8](https://user-images.githubusercontent.com/77332628/202901054-900013f6-f898-442e-9445-9863cb4c1073.png)
    


위의 분석을 통해서 우리는 아주 드물게 나타나는 클래스일지라도 다른 클래스들과 연관성이 있고 이 연관성을 통해 우리는 단백질 소기관이 어디에 위치해 있는지 알 수 있다. 예를 들어, rod&rings는 nucleus와 연관되어있고, peroxisomes는 nucleus와 cytosol에 위치해 있다는 것을 확인할 수 있다.

#### 1.1.4 이미지 시각화하기
먼저 train 폴더에 있는 이미지 파일들의 파일명을 출력해보자


```python
from os import listdir

files = listdir('../input/human-protein-atlas-image-classification/train')
for n in range(10) : # 첫 열개만 샘플로 출력
    print(files[n])
```

    5e3a2e6a-bb9c-11e8-b2b9-ac1f6b6435d0_red.png
    9891a4fa-bba4-11e8-b2b9-ac1f6b6435d0_red.png
    315a9edc-bbc6-11e8-b2bc-ac1f6b6435d0_yellow.png
    437fa1ce-bb9f-11e8-b2b9-ac1f6b6435d0_yellow.png
    8a51782e-bb9b-11e8-b2b9-ac1f6b6435d0_green.png
    0df0c3aa-bbca-11e8-b2bc-ac1f6b6435d0_blue.png
    bf0b3946-bbba-11e8-b2ba-ac1f6b6435d0_red.png
    641a0682-bbb7-11e8-b2ba-ac1f6b6435d0_green.png
    05d32f36-bba3-11e8-b2b9-ac1f6b6435d0_red.png
    168cbdc8-bb9f-11e8-b2b9-ac1f6b6435d0_red.png



```python
len(files) / 4 == train_labels.shape[0]
```




    True



출력된 파일명들을 보면 확장자 앞에 red,yellow,greend,blue의 색 이름이 붙어있다. 각 이미지 id 하나당 다음의 4가지 필터가 씌워져있다.
* target protein structure -> 초록
* nuclues -> 파랑
* microtubules -> 빨강
* endoplasmatic reticulum -> 노랑
(이미지 사이즈 512x512)

이제 본격적으로 필터가 씌워진 이미지들을 시각화해보자.


```python
train_path = '../input/human-protein-atlas-image-classification/train/'

def load_image(basepath, image_id):
    images = np.zeros(shape=(4,512,512))
    images[0,:,:] = imread(basepath + image_id + "_green" + ".png")
    images[1,:,:] = imread(basepath + image_id + "_red" + ".png")
    images[2,:,:] = imread(basepath + image_id + "_blue" + ".png")
    images[3,:,:] = imread(basepath + image_id + "_yellow" + ".png")
    return images

def make_image_row(image,subax,title):
    subax[0].imshow(image[0], cmap='Greens')
    subax[0].set_title(title)
    subax[1].imshow(image[1], cmap='Reds')
    subax[1].set_title('stained microtubules')
    subax[2].imshow(image[2], cmap='Blues')
    subax[2].set_title('stained nucleus')
    subax[3].imshow(image[3], cmap='Oranges')
    subax[1].set_title('stained endoplasmatic reticulum')
    return subax

def make_title(file_id):
    file_targets = train_labels.loc[train_labels.Id==file_id, 'Target'].values[0]
    title=' - '
    for n in file_targets:
        title += label_names[n] + ' - '
    return title
```


```python
class TargetGroupIterator:
    def __init__(self, target_names,batch_size, basepath):
        self.target_names = target_names
        self.target_list = [reverse_train_labels[key] for key in target_names]
        self.batch_shape = (batch_size, 4, 512, 512)
        self.basepath = basepath
    
    def find_matching_data_entries(self):
        train_labels['check_col'] = train_labels.Target.apply(
            lambda l : self.check_subset(l))
        self.images_identifier = train_labels[train_labels.check_col==1].Id.values
        train_labels.drop('check_col',axis=1,inplace=True)
        
    def check_subset(self,targets):
        return np.where(set(self.target_list).issubset(set(targets)),1,0)
    
    def get_loader(self):
        filenames = []
        idx = 0
        images = np.zeros(self.batch_shape)
        for image_id in self.images_identifier:
            images[idx,:,:,:] = load_image(self.basepath, image_id)
            filenames.append(image_id)
            idx += 1
            if idx == self.batch_shape[0]:
                yield filenames, images
                filenames = []
                images = np.zeros(self.batch_shape)
                idx = 0
        if idx > 0:
            yield filenames, images
            
```

위에서 이미지 출력을 위한 클래스와 함수를 정의했으니, 특정 클래스를 정해서 이미지를 출력하면 된다. 나는 lysosomes와 endosomes를 선택했는데, 본인이 원하는 클래스를 선택해서 이미지를 출력하면 된다.


```python
my_choice = ['Lysosomes','Endosomes']
my_batch_size = 20

imageloader = TargetGroupIterator(my_choice, my_batch_size, train_path)
imageloader.find_matching_data_entries()
iterator = imageloader.get_loader()
```


```python
file_ids, images = next(iterator)
fig,ax = plt.subplots(len(file_ids),4,figsize=(20,5*len(file_ids)))
if ax.shape==(4,):
    ax = ax.reshape(1,-1)
for n in range(len(file_ids)):
    make_image_row(images[n],ax[n],make_title(file_ids[n]))
```


    
![kaggle_pro9](https://user-images.githubusercontent.com/77332628/202901056-77a15b1a-3825-4ef1-90a2-19a3eaaf1ab6.png)
    


### 1.2 베이스라인 모델 구축하기

#### 1.2.0 Kernel Setting
계산시간을 줄이기 위해 이미 훈련된 결과값을 가져오기 위해 커널 설정을 해준다.




```python
class KernelSettings:
    
    def __init__(self, fit_baseline=False,
                 fit_improved_baseline=True,
                 fit_improved_higher_batchsize=False,
                 fit_improved_without_dropout=False):
        self.fit_baseline = fit_baseline
        self.fit_improved_baseline = fit_improved_baseline
        self.fit_improved_higher_batchsize = fit_improved_higher_batchsize
        self.fit_improved_without_dropout = fit_improved_without_dropout
kernelsettings = KernelSettings(fit_baseline=False,
                                fit_improved_baseline=False,
                                fit_improved_higher_batchsize=False,
                                fit_improved_without_dropout=False)
use_dropout = True
```

#### 1.2.1 K-Fold Cross Validation 사용하기
먼저 훈련 데이터에 대한 테스트 데이터의 비율을 알아보자.


```python
train_files = os.listdir("../input/human-protein-atlas-image-classification/train")
test_files = os.listdir("../input/human-protein-atlas-image-classification/test")
percentage = np.round(len(test_files) / len(train_files) * 100)
print('test set size turns out to be {} % compared to the train set.'.format(percentage))
```

    test set size turns out to be 38.0 % compared to the train set.


이번 글에서는 모델의 성능을 평가하기 위해서 **k-fold 검증**을 사용할 것이다. kfold 검증 방법을 간단히 설명하면 훈련 데이터를 k개로 나눠서 그 중 하나를 검증 데이터로 사용하는 것이다. kfold 검증에 대한 자세한 글은 [**이 글**](https://hamin-chang.github.io/basics/kfold/)을 참고하면 된다. 하지만 단백질 소기관 데이터의 특성상 k개의 폴드 중 검증 데이터로 사용했을 때 유독 좋은 검증 성능이 나올 수 있다. 예를 들어, 만약 검증 데이터로 사용한 폴드에 희소한 클래스가 들어 있으면 나쁜 검증 성능이 나올 것이다. 이러한 현상의 영향을 줄이기 위해 kfold 검증 방법을 여러번 반복한다.

위의 코드에서 테스트 데이터가 훈련 데이터의 38% 정도이기 때문에 kfold를 3개로 나눠서 진행하면 훈련 데이터의 33%를 검증 데이터로 사용하는 것이기 때문에 적절할 것으로 보인다. 3개의 폴드로 나누는 kfold 교차 검증을 2번 반복하겠다.


```python
from sklearn.model_selection import RepeatedKFold
splitter = RepeatedKFold(n_splits=3, n_repeats=1, random_state=0)
```

위에서 정의한 splitter를 이미지 id에다가 적용할 것이다. kfold가 시간이 오래 걸리기 때문에 n_repeats를 1로 지정해서 훈련 데이터를 3개로 나누는 것을 한번만 반복하도록 한다.


```python
partitions = []
for train_idx, valid_idx in splitter.split(train_labels.index.values):
    partition = {}
    partition['train'] = train_labels.Id.values[train_idx]
    partition['validation'] = train_labels.Id.values[valid_idx]
    partitions.append(partition)
    print('TRAIN:',train_idx,'VALIDATION:',valid_idx)
    print('TRAIN:',len(train_idx),'TEST:',len(valid_idx))
    
    
```

    TRAIN: [    1     2     3 ... 31063 31064 31065] VALIDATION: [    0     4     6 ... 31069 31070 31071]
    TRAIN: 20714 TEST: 10358
    TRAIN: [    0     4     6 ... 31069 31070 31071] VALIDATION: [    1     2     3 ... 31060 31061 31065]
    TRAIN: 20715 TEST: 10357
    TRAIN: [    0     1     2 ... 31069 31070 31071] VALIDATION: [   10    11    13 ... 31062 31063 31064]
    TRAIN: 20715 TEST: 10357



```python
partitions[0]['train'][0:5]
```




    array(['000a6c98-bb9b-11e8-b2b9-ac1f6b6435d0',
           '000a9596-bbc4-11e8-b2bc-ac1f6b6435d0',
           '000c99ba-bba4-11e8-b2b9-ac1f6b6435d0',
           '001bcdd2-bbb2-11e8-b2ba-ac1f6b6435d0',
           '002daad6-bbc9-11e8-b2bc-ac1f6b6435d0'], dtype=object)



#### 1.2.2 Basline 모델 구축하기
이제 본격적인 문제 해결을 위한 딥러닝 모델을 만들어 볼건데, 이번 글에서는 단순한 베이스라인 모델을 만들것이다. 베이스라인 모델은 케라스 라이브러리를 이용해서 만들것이다. 베이스라인 모델은 다음 몇가지 아이디어들을 포함해서 구축한다.
* 단순한 모델을 만들기 위해 네가지 필터 사진들중 타깃값에 대한 가장 많은 정보를 담고 있는 초록색 필터 이미지를 사용한다.
* 간단한 이미지 전처리 클래스를 정의해서 사용한다. 
* 데이터 로더와 이미지 전처리와 베이스라인 모델에서 사용할 파라미터들을 담고 있는 클래스를 정의해서 사용한다.

사용할 파라미터들을 담고 있는 클래스를 먼저 정의해보자.


```python
class ModelParameter:
    def __init__(self, basepath,
                num_classes=28,
                image_rows=512,
                image_cols=512,
                batch_size=200,
                n_channels=1,
                row_scale_factor=4,
                col_scale_factor=4,
                shuffle=False,
                n_epochs=1):
        self.basepath = basepath
        self.num_classes = num_classes
        self.image_rows = image_rows
        self.image_cols = image_cols
        self.batch_size = batch_size
        self.n_channels = n_channels
        self.shuffle = shuffle
        self.row_scale_factor = row_scale_factor
        self.col_scale_factor = col_scale_factor
        self.scaled_row_dim = np.int(self.image_rows / self.row_scale_factor)
        self.scaled_col_dim = np.int(self.image_cols / self.col_scale_factor)
        self.n_epochs = n_epochs
```

이제 이 클래스를 datagenerator, 베이스라인 모델, 이미지 전처리에 전달하기 위해 정의한다.


```python
parameter = ModelParameter(train_path)
```

그 다음 이미지 전처리를 위한 클래스를 정의한다. 


```python
from skimage.transform import resize

class ImagePreprocessor :
    def __init__(self, modelparameter):
        self.parameter = modelparameter
        self.basepath = self.parameter.basepath
        self.scaled_row_dim = self.parameter.scaled_row_dim
        self.scaled_col_dim = self.parameter.scaled_col_dim
        self.n_channels = self.parameter.n_channels
    
    def preprocess(self,image):
        image = self.resize(image)
        image = self.reshape(image)
        image = self.normalize(image)
        return image
    
    def resize(self,image):
        image = resize(image, (self.scaled_row_dim, self.scaled_col_dim))
        return image
    
    def reshape(self,image):
        image = np.reshape(image, (image.shape[0],image.shape[1], self.n_channels))
        return image
    
    def normalize(self,image):
        image /= 255
        return image
    
    def load_image(self,image_id):
        image = np.zeros(shape=(512,512,4))
        image[:,:,0] = imread(self.basepath + image_id + '_green' + '.png')
        image[:,:,1] = imread(self.basepath + image_id + '_blue' + '.png')
        image[:,:,2] = imread(self.basepath + image_id + '_red' + '.png')
        image[:,:,3] = imread(self.basepath + image_id + '_yellow' + '.png')
        return image[:,:,0:self.parameter.n_channels]
```

이미지 전처리 클래스를 datagenerator에 전달하기 위해 정의한다.


```python
preprocessor = ImagePreprocessor(parameter)
```

전처리된 이미지 샘플을 출력해보자.


```python
example = images[0,0]
preprocessed = preprocessor.preprocess(example)
print(example.shape) # 전처리 전 이미지 크기
print(preprocessed.shape) # 전처리 후 이미지 크기

fig, ax = plt.subplots(1,2,figsize=(20,10))
ax[0].imshow(example, cmap='Greens')
ax[1].imshow(preprocessed.reshape(parameter.scaled_row_dim, parameter.scaled_col_dim), cmap='Greens')
ax[0].set_title('before preprocess')
ax[1].set_title('after preprocess')
```

    (512, 512)
    (128, 128, 1)





    Text(0.5, 1.0, 'after preprocess')




    
![kaggle_pro10](https://user-images.githubusercontent.com/77332628/202901058-8bd32df8-f5a5-42aa-9b22-4d7f11f58be0.png)
    


출력된 전처리 이미지를 보니 이미지 크기를 줄이니 더 자세한 정보가 보인다!

베이스라인 모델을 만들기 전에 마지막으로 데이터를 준비하는 클래스를 정의한다.


```python
import keras
import tensorflow

class DataGenerator(tensorflow.keras.utils.Sequence):
    def __init__(self,list_IDs,labels,modelparameter, imagepreprocessor):
        self.current_epoch = 0
        self.params = modelparameter
        self.labels = labels
        self.list_IDs = list_IDs
        self.dim = (self.params.scaled_row_dim, self.params.scaled_col_dim)
        self.batch_size = self.params.batch_size
        self.n_channels = self.params.n_channels
        self.num_classes = self.params.num_classes
        self.shuffle = self.params.shuffle
        self.preprocessor = imagepreprocessor
        self.on_epoch_end()
        
    def on_epoch_end(self):
        self.indexes = np.arange(len(self.list_IDs))
        if self.shuffle == True:
            np.random.shuffle(self.indexes, random_state=self.current_epoch)
            self.current_epoch += 1
    
    def get_targets_per_image(self,identifier):
        return self.labels.loc[self.Id == identifier].drop(
        ['Id','Target','number_of_targets'],axis=1).values
    
    def __data_generation(self,list_IDs_temp) :
        # Generates data containing batch_size samples
        X = np.empty((self.batch_size, *self.dim, self.n_channels))
        y = np.empty((self.batch_size, self.num_classes), dtype=int)
        # Generate data
        for i, identifier in enumerate(list_IDs_temp):
            image = self.preprocessor.load_image(identifier)
            image = self.preprocessor.preprocess(image)
            X[i] = image
            y[i] = self.get_targets_per_image(identifier)
        return X,y

    def __len__(self):
        return int(np.floor(len(self.list_IDs) / self.batch_size))
    
    def __get_item__(self,index):
        indexes = self.indexes[index*self.batch_size : (index+1)*self.batch_size]
        list_IDs_temp = [self.list_IDs[k] for k in indexes]
        X,y = self.__data_generation(list_IDs_temp)
        return X,y
```


```python
class PredictGenerator : 
    def __init__(self, predict_Ids, imagepreprocessor, predict_path):
        self.preprocessor = imagepreprocessor
        self.preprocessor.basepath = predict_path
        self.identifiers = predict_Ids
        
    def predict(self, model):
        y = np.empty(shape=(len(self.identifiers), self.preprocessor.parameter.num_classes))
        for n in range(len(self.identifiers)):
            image = self.preprocessor.load_image(self.identifiers[n])
            image = self.preprocessorpre.preprocess(image)
            image = image.reshape((1,*image.shape))
            y[n] = model.predict(image)
        return y
```
이제 베이스라인 모델을 만들어보자. 베이스라인 모델은 keras의 Sequential을 사용해서 layer들을 쌓아간다.

```python
from keras.models import Sequential
from keras.layers import Dense,Dropout,Flatten
from keras.layers import Conv2D, MaxPooling2D
from keras.losses import binary_crossentropy
from tensorflow.keras.optimizers import Adadelta
from keras.initializers import VarianceScaling # 초기 가중치 설정

class BaseLineModel:
    def __init__(self,modelparameter):
        self.params = modelparameter
        self.num_classes = self.params.num_classes
        self.img_rows = self.params.scaled_row_dim
        self.img_cols = self.params.scaled_col_dim
        self.n_channels = self.params.n_channels
        self.input_shape = (self.img_rows, self.img_cols, self.n_channels)
        self.my_metrics = ['accuracy']
        
    def build_model(self):
        self.model = Sequential()
        self.model.add(Conv2D(16,kernel_size=(3,3), activation = 'relu',input_shape=self.input_shapein,
                             kernel_initializer=VarianceScaling(seed=0)))
        self.model.add(Conv2D(32,(3,3),activation='relu',kernel_initializer=VarianceScaling(seed=0)))
        self.model.add(MaxPooling2D(pool_size=(2,2)))
        self.model.add(Dropout(0.25))
        self.model.add(Flatten())
        self.model.add(Dense(64,activation='relu',
                            kernel_initializer=VarianceScaling(seed=0)))
        self.model.add(Dropout(0.5))
        # 이진 분류이기 때문에 마지막 필터는 sigmoid 활성화 사용
        self.model.add(Dense(self.num_classes, activation = 'sigmoid'))
        
    def compile_model(self):
        self.model.compile(loss=keras.binary_crossentropy,
                          optimizer = keras.optimizers.Adadelta(),
                          metrics = self.my_metrics)
    
    def set_generators(self,train_generator,validation_generator):
        self.training_generator = train_generator
        self.validation_generator = validation_generator
        
    def learn(self):
        return self.model.fit_generator(generator=self.training_generator,
                                       validation_data =self.validation_generator,
                                       epochs = self.params.n_epochs,
                                       use_multiprocessing = True,
                                       workers=8)
    
    def score(self):
        return self.model.evaluate_generator(generator=self.validation_generator,
                                            use_multiprocessing=True, workers=8)
    
    def predict(self,predict_generator):
        y = predict_generator.predict(self.model)
        return y
    
    def save(self, model_output_path):
        self.model.save(model_output_path)
        
    def load(self, model_input_path):
        self.model = load_model(model_input_path)
```

이제 첫번째 cross validation 폴드에서 훈련을 시작할건데, 훈련을 시작하기에 앞서 훈련에 필요한 데이터를 준비한다.


```python
# 첫번째 cross validation 데이터 준비
partition = partitions[0]
labels = train_labels

print('Number of data in train : ',len(partition['train']))
print('Number of data in validation : ',len(partition['validation']))
```

    Number of data in train :  20714
    Number of data in validation :  10358



```python
training_generator = DataGenerator(partition['train'],labels,parameter,preprocessor)
validation_generator = DataGenerator(partition['validation'],labels,parameter,preprocessor)
```

그리고 성능 평가를 위한 검증 데이터에 대한 예측 generator와 테스트 데이터를 위한 전처리를 정의해주고, 제출을 위한 테스트 데이터에 대한 예측 generator를 정의한다.


```python
predict_generator = PredictGenerator(partition['validation'], preprocessor,train_path)
test_preprocessor = ImagePreprocessor(parameter)
submission_predict_generator = PredictGenerator(test_names, test_preprocessor, test_path)
```


```python
target_names = train_labels.drop(['Target','number_of_targets','Id'],axis=1).columns
if kernelsettings.fit_baseline == True:
    model = BaseLineModel(parameter)
    model.build_model()
    model.compile_model()
    model.set_generators(training_generator, validation_generator)
    history = model.learn()
    
    proba_predictions = model.predict(predict_generator)
    baseline_proba_predictions = pd.DataFrame(index=partition['validation'],
                                              data = proba_predictions,
                                              columns=target_names)
    baseline_proba_predictions.to_csv('baseline_predictions.csv')
    baseline_losses = pd.DataFrame(history.history['loss'], 
                                  columns = ['train_loss'])
    baseline_losses['val_loss'] = history.history['val_loss']
    baseline_losses.to_csv('baseline_losses.csv')
    submission_proba_predictions = model.predict(submission_predict_generator)
    baseline_labels = test_labels.copy()
    baseline_labels.loc[:, test_labels.drop(["Id", "Target"], axis=1).columns.values] = submission_proba_predictions
    baseline_labels.to_csv("baseline_submission_proba.csv")
    # 만약 훈련(fit)을 한번 했다면 결과를 다운받는다. 
    # you can load predictions as csv and further fitting is not neccessary:
else:
    baseline_proba_predictions = pd.read_csv("../input/proteinatlaseabpredictions/baseline_predictions.csv", index_col=0)
    baseline_losses = pd.read_csv("../input/proteinatlaseabpredictions/baseline_losses.csv", index_col=0)
    baseline_labels = pd.read_csv("../input/proteinatlaseabpredictions/baseline_submission_proba.csv", index_col=0)

```

#### 1.2.3 훈련 결과 분석하기


```python
validation_labels = train_labels.loc[train_labels.Id.isin(partition["validation"])].copy()
validation_labels.shape
```




    (10358, 31)




```python
baseline_proba_predictions.shape
```




    (10358, 28)




```python
from sklearn.metrics import accuracy_score as accuracy

y_true = validation_labels.drop(['Id','Target','number_of_targets'],axis=1).values
y_pred = np.where(baseline_proba_predictions.values > 0.5,1,0)
accuracy(y_true.flatten(), y_pred.flatten())
```




    0.9413152015005655



WOW 첫 베이스라인 모델에 검증 정확도가 94.1%나 된다! 하지만 이 정확도는 믿을 수 없는 정확도다. 왜그런지 알아보자.


```python
y_pred[0]
```




    array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
           0, 0, 0, 0, 0, 0])




```python
y_true[0]
```




    array([1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0,
           0, 0, 0, 0, 0, 0])




```python
proba_predictions = baseline_proba_predictions.values
hot_values = validation_labels.drop(['Id','Target','number_of_targets'], axis=1).values.flatten()
one_hot = (hot_values.sum()) / hot_values.shape[0] * 100
zero_hot = (hot_values.shape[0] - hot_values.sum()) / hot_values.shape[0] * 100

fig,ax = plt.subplots(1,2,figsize=(20,5))
sns.distplot(proba_predictions.flatten() * 100, color='DodgerBlue',ax=ax[0])
ax[0].set_xlabel("Probability in %")
ax[0].set_ylabel("Density")
ax[0].set_title("Predicted probabilities")
sns.barplot(x=["label = 0", "label = 1"], y=[zero_hot, one_hot], ax=ax[1])
ax[1].set_ylim([0,100])
ax[1].set_title("True target label count")
ax[1].set_ylabel("Percentage");
```


    
![kaggle_pro11](https://user-images.githubusercontent.com/77332628/202901059-85f35fa5-b552-4ed6-987f-e34077b6e806.png)


위의 왼쪽 그래프를 보면 모델이 단백질 구조를 10% 이상 맞힌 데이터는 굉장히 적은 것을 볼 수 있다. 그리고 오른쪽 그래프를 보면 label이 0인 클래스가 1인 클래스보다 월등히 많은 것을 알 수 있다. 이는 당연한것이, 대부분의 데이터는 1개 또는 2개의 타깃만 포함하고 나머지는 모두 0으로 label 되었기 때문이다. 따라서 위의 94.3%의 정확도는 모델이 label이 0인, 즉 데이터에 '존재하지 않는' 타깃값을 예측한 정확도를 포함한 것이다.

그럼 어떤 모델이 어떤 데이터를 높은 정확도로 예측했고, 어떤 데이터를 낮은 정확도로 예측했는지 확인해보자.


```python
mean_predictions = np.mean(proba_predictions, axis=0)
std_predictions = np.std(proba_predictions, axis=0)
mean_targets = validation_labels.drop(['Id','Target','number_of_targets'],axis=1).mean()

labels =  validation_labels.drop(["Id", "Target", "number_of_targets"], axis=1).columns.values
fig,ax = plt.subplots(1,2,figsize=(20,5))
sns.barplot(x=labels,y=mean_predictions,ax=ax[0])
ax[0].set_xticklabels(labels=labels, rotation=90)
ax[0].set_ylabel('Mean predicted probability')
ax[0].set_title('Mean predicted probility per class over all datas')\

sns.barplot(x=labels,y=std_predictions,ax=ax[1])
ax[1].set_xticklabels(labels=labels,rotation=90)
ax[1].set_ylabel('Standard deviation')
ax[1].set_title('Standard deviation of predicted probabilty per class over all datas')
```




    Text(0.5, 1.0, 'Standard deviation of predicted probabilty per class over all datas')




    
![kaggle_pro12](https://user-images.githubusercontent.com/77332628/202901060-41c8ba24-8d81-436f-978b-18c99ddb9829.png)



```python
fig,ax = plt.subplots(1,1,figsize=(20,5))
sns.barplot(x=labels,y=mean_targets.values,ax=ax)
ax.set_xticklabels(labels=labels,rotation=90)
ax.set_ylabel('Percentage of hot (1)')
ax.set_title('Percentage of hot counts (ones) per target class')
```




    Text(0.5, 1.0, 'Percentage of hot counts (ones) per target class')




    
![kaggle_pro13](https://user-images.githubusercontent.com/77332628/202901061-f9a4d0af-9280-46a5-ae90-0a6b0dcc5e3e.png)

    


출력한 바 그래프들을 보면 대부분의 예측한 데이터들이 낮은 정확도를 보인 것을 보인다. 따라서 베이스라인 모델은 그렇게 좋은 성능을 보여주지는 못한다는 것을 알 수 있다. 

다음 글에선 베이스라인에서 한 단계 더 발전한 모델에 대해 다뤄보도록 하겠다.
