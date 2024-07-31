## 시각화 연습
- matplotlib와 seaborn을 활용하여 다양한 시각화를 해본다.
- 시각화는 2 x 2 형태로 나오도록 한다. (예시)
![](tips_visualization.png)
- 시각화는 [seaborn 라이브러리](https://seaborn.pydata.org/) 참조해서 적용 (~9시 20분)
- [폰트 참조](https://dschloe.github.io/python/2023/02/matplotlib_koreanfont/)


```python
import seaborn as sns
import matplotlib.pyplot as plt
tips = sns.load_dataset('tips')

plt.rcParams['font.family'] = 'Malgun Gothic' # 옵션 설정
fig, ax = plt.subplots(2, 2, figsize=(14, 10))


# 첫 번째 서브플롯
sns.violinplot(data=tips, x="day", y="total_bill", hue="smoker", split=True, ax=ax[0, 0])

# 두 번째 서브플롯
sns.swarmplot(data=tips, x="day", y="total_bill", hue="smoker", ax=ax[0, 1])

#세 번째 서브플롯
sns.boxplot(data=tips, x="day", y="total_bill", hue="smoker", ax=ax[1, 0])

#네 번째 서브플롯
sns.stripplot(data=tips, x="day", y="total_bill", hue="smoker", ax=ax[1, 1])



plt.tight_layout() # 간격 조정
plt.savefig('yourname.png', dpi=300) # 시각화 내보내기
plt.show()
```

    C:\ProgramData\anaconda3\Lib\site-packages\seaborn\categorical.py:641: FutureWarning: The default of observed=False is deprecated and will be changed to True in a future version of pandas. Pass observed=False to retain current behavior or observed=True to adopt the future default and silence this warning.
      grouped_vals = vals.groupby(grouper)
    C:\ProgramData\anaconda3\Lib\site-packages\seaborn\_oldcore.py:1119: FutureWarning: use_inf_as_na option is deprecated and will be removed in a future version. Convert inf values to NaN before operating instead.
      with pd.option_context('mode.use_inf_as_na', True):
    C:\ProgramData\anaconda3\Lib\site-packages\seaborn\_oldcore.py:1119: FutureWarning: use_inf_as_na option is deprecated and will be removed in a future version. Convert inf values to NaN before operating instead.
      with pd.option_context('mode.use_inf_as_na', True):
    C:\ProgramData\anaconda3\Lib\site-packages\seaborn\categorical.py:641: FutureWarning: The default of observed=False is deprecated and will be changed to True in a future version of pandas. Pass observed=False to retain current behavior or observed=True to adopt the future default and silence this warning.
      grouped_vals = vals.groupby(grouper)
    C:\ProgramData\anaconda3\Lib\site-packages\seaborn\_oldcore.py:1119: FutureWarning: use_inf_as_na option is deprecated and will be removed in a future version. Convert inf values to NaN before operating instead.
      with pd.option_context('mode.use_inf_as_na', True):
    C:\ProgramData\anaconda3\Lib\site-packages\seaborn\_oldcore.py:1119: FutureWarning: use_inf_as_na option is deprecated and will be removed in a future version. Convert inf values to NaN before operating instead.
      with pd.option_context('mode.use_inf_as_na', True):
    


    
![png](output_1_1.png)
    


![output_1_1](https://github.com/jiyoungeeeeeeeeeeeeeeeeeeeee/pp/assets/173663630/66e92096-7983-491a-92a6-dc6b2051cdc0)


## plotly 시각화 기본 예제


```python
import seaborn as sns 
import plotly.graph_objects as go 
import plotly.express as px
```


```python
# 데이터 가져오기 
diamonds = sns.load_dataset("diamonds")
diamonds.head(1)
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
      <th>carat</th>
      <th>cut</th>
      <th>color</th>
      <th>clarity</th>
      <th>depth</th>
      <th>table</th>
      <th>price</th>
      <th>x</th>
      <th>y</th>
      <th>z</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>0.23</td>
      <td>Ideal</td>
      <td>E</td>
      <td>SI2</td>
      <td>61.5</td>
      <td>55.0</td>
      <td>326</td>
      <td>3.95</td>
      <td>3.98</td>
      <td>2.43</td>
    </tr>
  </tbody>
</table>
</div>



## 첫번째 방식 : Graph Objects 


```python


fig = go.Figure(
    data = go.Scatter(
        x = diamonds['carat'], y = diamonds['price'], mode = 'markers'
    )
)

fig.show()
```


![output_7_0](https://github.com/jiyoungeeeeeeeeeeeeeeeeeeeee/pp/assets/173663630/c85e43dd-8600-4e2a-ba28-30a9de712132)


## 두 번째 방식 : [ploty express](https://plotly.com/python-api-reference/plotly.express.html#px)


```python
fig = px.scatter(data_frame = diamonds, x = 'carat', y = 'price', title = 'Carat vs Price')
fig.show()
```


![output_9_0](https://github.com/jiyoungeeeeeeeeeeeeeeeeeeeee/pp/assets/173663630/5dbee93e-b72b-440f-8486-29684a2bdd02)

## ploty 참고 사이트

[plotly](https://plotly.com/python-api-reference/index.html)

[위키독스 plotly](https://wikidocs.net/book/8909)


## ploty 참고 도서
[Plotly로 시작하는 인터랙티브 데이터 시각화 in R & 파이썬](https://www.yes24.com/Product/Goods/123706075)
