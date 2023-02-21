---
layout: single
title:  "[이것이 데이터 분석이다(with 파이썬)] 국가별 음주 데이터 분석하기"
categories: DataAnalysis
tag: [python, DataAnalysis]
toc: true
---


**[참고 깃허브 링크](<https://github.com/yoonkt200/python-data-analysis>)**
{: .notice--primary}


### step.1 탐색: 데이터의 기초 정보 살펴보기

```python
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
file_path = '../data/drinks.csv'
drinks = pd.read_csv(file_path)
print(drinks.info())
drinks.head(5)
```

![image](https://user-images.githubusercontent.com/100071667/220413851-1675adbf-9d20-4c78-965a-f4a82eb84e14.png)


### step.2 인사이트의 발견: 탐색과 시각화 하기

피처 간의 상관 관계를 통계적으로 탐색하는 방법은 크게 두가지로 첫 번째 방법은 피처가 2개일 때의 상관계수를 계산하는 **단순 상관 분석 방법**이며,두번째 방법은 대상 피처가 여러 개일 때 상호 간의 연관성을 분석하는 **다중 상관 분석**이다.

- 상관 분석
상관 분석이란 두 변수 간의 선형적 관계를 산관 계수로 표현하는 것이다. 상관 계수를 구하는 것은 공분산의 개념을 포함한다. 공분산은 2개의 확률 변수에 대한 상관 정도로, 2개의 변수 중 하나의 값이 상승하는 경향을 보일때 다른 값도 상승하는 경향을 수치로 나타낸 것이다.-1과 1 사이의 값으로 변환한다. 이를 **상관 계수**라고 한다. 만약 상관 계수가 1에 가깝다면 서로 강한 양의 상관 관계가 있는 것이고, -1에 가깝다면 음의 상관 관계가 있는 것이다.

```python
# 두 피처 간의 상관 계수를 계산한다.
#pearson은 상관 계수를 구하는 계산 방법 중 하나를 의미하며, 가장 널리 쓰이는 방법이다.
corr = drinks[['beer_servings', 'wine_servings']].corr(method = 'pearson')
print(corr)
```

```
               beer_servings  wine_servings
beer_servings       1.000000       0.527172
wine_servings       0.527172       1.000000
```

beer_servings와 wine_servings 두 피처 간의 상관 계수는 0.52정도로 나타난다.

```python
import seaborn as sns
import matplotlib.pyplot as plt

cols_view = ['beer','spirit','wine','alcohol'] # 그래프 출력을 위한 cols 이름을 축약합니다.
sns.set(font_scale = 1.5)
hm = sns.heatmap(corr.values,
                cbar = True,
                annot = True,
                square = True,
                fmt = '.2f',
                annot_kws = {'size': 15},
                yticklabels = cols_view,
                xticklabels = cols_view)

plt.tight_layout()
plt.show()
```

![image](https://user-images.githubusercontent.com/100071667/220419347-dedc8fb4-4981-4481-91d1-2c9396d6fdc3.png)

total_litres_of_pure_alcohol 피처가 대체적으로 모든 피처와 상관 관계가 있는 것으로 보이며, 특히 beer_serving와의 상관성이 매우 높은 것으로 나타낸다.

```python
#시각화 라이브러리를 이용한 피처 간의 산점도 그래프를 출력합니다.
sns.set(style = 'whitegrid', context = 'notebook')
sns.pairplot(drinks[['beer_servings', 'spirit_servings', 'wine_servings' , 'total_litres_of_pure_alcohol']], height = 2.5)
plt.show()
```


![image](https://user-images.githubusercontent.com/100071667/220419740-cf2cdb36-952c-40e6-9bab-87fffef275a4.png)

첫 번째 그래프가 heatmap그래프, 두 번째 그래프가 pairplot 그래프이다.

### step.3 탐색적 분석: 스무고개로 개념적 탐색 분석하기

continent 피처에 존재하는 결측 데이터를 처리해보고 대륙에 대한 정보가 없는 국가를 fillna()함수를 사용해 'OT'라는 대륙으로 새롭게 정의를 해줍니다.

```python
# 결측 데이터를 처리합니다: 기타 대륙으로 통합 -> 'OT'
drinks['continent'] = drinks['continent'].fillna('OT')
drinks.head(10)
```

![image](https://user-images.githubusercontent.com/100071667/220420954-5dbf4435-6a5b-4b81-977f-6bfc160bce1f.png)


```python
#파이차트로 시각화하기
labels = drinks['continent'].value_counts().index.tolist()
fracs1 = drinks['continent'].value_counts().values.tolist()
explode = (0, 0, 0, 0.25, 0, 0)

plt.pie(fracs1, explode=explode, labels=labels, autopct='%.0f%%', shadow=True)
plt.title('null data to \'OT\'')
plt.show()
```

![image](https://user-images.githubusercontent.com/100071667/220421999-bda27056-2410-445a-b143-47d50195e1bf.png)

#### 대륙별 spirit_servings의 통계적 정보 확인하기

agg()함수는 apply()함수와 거의 동일한 기능을 하지만 apply()에 들어가는 함수 파라미터를 병렬로 설정하여 **그룹에 대한 여러 가지 연산 결과를 동시에 얻을 수 있는 함수**이다.


```python
#agg()함수를 이용해 대륙별로 분석하기
# 대륙별 spirit_servings의 평균, 최소, 최대, 합계를 계산합니다.
result = drinks.groupby('continent').spirit_servings.agg(['mean','min','max','sum'])
result.head()
```

![image](https://user-images.githubusercontent.com/100071667/220423760-8a6cde54-efc3-4f6b-8305-9c87b21157cf.png)

####  전체 평균보다 많은 알코올을 섭취하는 대륙은 어디일까?

전체 평균보다 많은 알코올을 섭취하는 대륙을 탐색할 때는 mean()함수만으로도 가능하다.

```python
total_mean = drinks.total_litres_of_pure_alcohol.mean()
continent_mean = drinks.groupby('continent')['total_litres_of_pure_alcohol'].mean()
continent_over_mean = continent_mean[continent_mean >= total_mean]
print(continent_over_mean)
```

```
continent
EU    8.617778
OT    5.995652
SA    6.308333
Name: total_litres_of_pure_alcohol, dtype: float64
```


#### 평균 beer_servings가 가장 높은 대륙은 어디일까?

mean()함수만을 이용한 탐색에 idxmax()함수를 적용하면 평균 'beer_servings'가 가장 높은 대륙이 어디인지 찾을 수 있다.
- idxmax()는 시리즈 객체에서 값이 가장 큰 index를 반환하는 기능

```python
beer_continent = drinks.groupby('continent').beer_servings.mean().idxmax()
print(beer_continent)
```

```
EU
```

AF,AS,EU,OC,OT 대륙 중 EU,OT,AS만이 평균보다 많이 알코올을 섭취하는 대륙인 것을 알 수 있다. 또한 맥주를 가장 좋아하는 대륙은 유럽이라는 결과를 확인할 수 있다.
 
#### 시각화

```python
# 대륙별 spirit_servings의 평균, 최소, 최대, 합계를 계산합니다.
n_groups = len(result.index)
means = result['mean'].tolist()
mins = result['min'].tolist()
maxs = result['max'].tolist()
sums = result['sum'].tolist()

index = np.arange(n_groups)
bar_width = 0.1

rects1 = plt.bar(index, means, bar_width, color='r', label = 'Mean')
rects2 = plt.bar(index + bar_width, mins, bar_width, color='g', label = 'Min')
rects3 = plt.bar(index + bar_width * 2, maxs, bar_width, color='b', label = 'Max')
rects4 = plt.bar(index + bar_width * 3, sums, bar_width, color='y', label = 'Sum')

plt.xticks(index, result.index.tolist())
plt.legend()
plt.show()
```

![image](https://user-images.githubusercontent.com/100071667/220429991-dfbf5826-8996-4e17-a37e-b8671fdfab16.png)


```python
#대륙별 total_litres_of_pure_alcohol을 시각화합니다.
continents = continent_mean.index.tolist()
continents.append('mean')
x_pos = np.arange(len(continents))
alcohol = continent_mean.tolist()
alcohol.append(total_mean)

bar_list = plt.bar(x_pos,alcohol,align='center',alpha = 0.5)
bar_list[len(continents) - 1].set_color('r')
plt.plot([0.,6], [total_mean, total_mean],"k--")
plt.xticks(x_pos,continents)

plt.ylabel('total_litres_of_pure_alcohol')
plt.title('total_litres_of_pure_alcohol by Continent')

plt.show()
```

![image](https://user-images.githubusercontent.com/100071667/220430901-9ad650e3-9696-4bdc-b095-75bca2e3b4cf.png)  

```python
# 대륙별 beer_servings을 시각화합니다.

beer_group = drinks.groupby('continent')['beer_servings'].sum()
continents = beer_group.index.tolist()
y_pos = np.arange(len(continents))
alcohol = beer_group.tolist()

bar_list = plt.bar(y_pos, alcohol,align='center',alpha = 0.5)
bar_list[continents.index("EU")].set_color('r')
plt.xticks(y_pos, continents)
plt.ylabel('beer_servings')
plt.title('beer_servings by Continent')
 
plt.show()
```

![image](https://user-images.githubusercontent.com/100071667/220431923-f2ca7d6e-6607-48e5-a708-93e8f6432c61.png)



### step.4 통계적 분석: 분석 대상 간의 통계적 차이 검정하기

지금까지 한 분석은 데이터에서 인사이트를 발견하는 데 있어서 매우 유용한 방법이다. 하지만 이는 분석가의 주관에 따라 도출된 내용이기 때문에 분석 자체의 **타당성**을 증명하기에는 한계가 있다. 따라서 분석 결과에 타당성을 부여하기 위해 통계적으로 차이를 검정하는 과정이 필요하다. 그 중 가장 기본적인 방법인 t-test를 통해 분석 대상 간에 통계적 차이를 검정하는 방법을 알아봅시다.

 - t-test
 t-test란 두 집단 간 평균의 차이에 대한 검정 방법으로,**모집단의 평균**등과 같이 실제 정보를 모를 때 현재의 데이터만으로 두 집단의 차이에 대해 검정할 수 있는 방법이다.
 단 t-test는 검정 대상인 두 집단의 데이터 개수가 비슷하면서 두 데이터가 정규 분포를 보이는 경우에 신뢰도가 높은 검정 방식이다.

#### 아프리카와 유럽 간의 맥주 소비량 차이 검정하기

```python
africa = drinks.loc[drinks['continent'] == 'AF']
europe = drinks.loc[drinks['continent'] == 'EU']

from scipy import stats
tTestResult = stats.ttest_ind(africa['beer_servings'], europe['beer_servings'])
tTestResultDiffVar = stats.ttest_ind(africa['beer_servings'],
                                    europe['beer_servings'], equal_var=False)

print("The t-statistic and p-value assuming equal variances is %.3f and %.3f." % tTestResult)
print("The t-statistic and p-value assuming equal variances is %.3f and %.3f." % tTestResultDiffVar)
```

```
The t-statistic and p-value assuming equal variances is -7.268 and 0.000.
The t-statistic and p-value assuming equal variances is -7.144 and 0.000.
```


실행 결과에 등장하는 t-statistic은 t-test의 검정 통계량을 의미하는 것으로, 함께 출력되는 **p-value**와 연관 지어 해석해야 한다. **p-value**는 가설이 얼마나 믿을만한 것인지를 나타내는 지표로, 데이터를 새로 샘플링 했을 때 귀무 가설이 맞다는 전제하에 현재 나온 통계값 이상이 나올 확률 이라고 정의할 수 있다. 만약 **p-value**가 너무 낮으면 귀무 가설이 일어날 확률이 너무 낮기 때문에 귀무 가설을 기각하게 된다. 보통 그 기준은 0.05나 0.01을 기준으로 하며, 이를 **p-value**라고 한다.

#### 대한민국은 얼마나 술을 독하게 마시는 나라일까?

이번엔 '대한민국은 얼마나 독하게 술을 마시는 나라일까'에 대한 탐색 코드를 살펴볼 차례이다. 이를 판단하는 기준으로, alcohol_rate 피처를 생성한다. 이 피처는 total_litres_of_pure_alcohol 피처를 모든 술의 총 소비량으로 나눈 것이다. 그리고 alcohol_rate는 sort_values() 함수를 사용하여 국가를 기준으로 정렬한다.

```python
# total_servings 피처를 생성한다.
drinks['total_servings'] = drinks['beer_servings'] + drinks['wine_servings'] + drinks['spirit_servings']

# 술 소비량 대비 알코올 비율 피처를 생성한다.
drinks['alcohol_rate'] = drinks['total_litres_of_pure_alcohol'] / drinks['total_servings']
drinks['alcohol_rate'] = drinks['alcohol_rate'].fillna(0)

# 순위 정보를 생성한다.
country_with_rank = drinks[['country', 'alcohol_rate']]
country_with_rank = country_with_rank.sort_values(by=['alcohol_rate'], ascending=0)
country_with_rank.head(5)
```

![image](https://user-images.githubusercontent.com/100071667/220435243-55fe1d56-38b0-483d-bc53-3ee87b959626.png)


```python
country_list = country_with_rank.country.tolist()
x_pos = np.arange(len(country_list))
rank = country_with_rank.alcohol_rate.tolist()

bar_list = plt.bar(x_pos, rank)
bar_list[country_list.index("South Korea")].set_color('r')
plt.ylabel('alcohol rate')
plt.title('liquor drink rank by country')
plt.axis([0, 200, 0, 0.3])

korea_rank = country_list.index("South Korea")
korea_alc_rate = country_with_rank[country_with_rank['country'] == 'South Korea']['alcohol_rate'].values[0]
plt.annotate('South Korea : ' + str(korea_rank +1),
            xy=(korea_rank, korea_alc_rate),
            xytext=(korea_rank + 10, korea_alc_rate + 0.05),
            arrowprops=dict(facecolor='red', shrink = 0.05))
plt.show()
```

![image](https://user-images.githubusercontent.com/100071667/220435322-a3c6ae3b-3d05-46ee-a304-0fd46e1f94d6.png)

---

공부한 전체 코드는 깃허브에 올렸습니다.


**[깃허브 주소](<https://github.com/mgskko/Python_Data_Analysis/blob/main/chapter1/02-drinks-eda.ipynb>)**
{: .notice--primary}

