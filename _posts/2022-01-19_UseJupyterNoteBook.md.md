# Jupyter Notebook

주피터 노트북은 웹 브라우저 상에서 개발을 할 수 있는 도구이며, 코드를 Cell 단위로 묶어서 실행하고 그래프나 표, 그리고 이미지나 영상 등을 쉽게 볼 수 있어서 특히 데이터 관련 작업을 할 때 많이 활용 됩니다.

> 교육을 위한 강의 노트로도 아주 훌륭해요!

![image.png](attachment:image.png)

![anaconda.png](attachment:anaconda.png)

## 특징

1. 코드를 Cell 단위로 작성 및 실행
1. 마크다운을 통한 문서화
1. 그래프나 표 등을 실시간으로 확인
1. html. pdf 등 파일로 저장

## 사전 학습 자료

다음 링크에서 파이썬 기본편에 대한 학습을 하실 수 있습니다.  
[나도코딩 블로그](https://nadocoding.tistory.com)


```python
%%HTML
<iframe width="640" height="360" src="https://www.youtube.com/embed/PjhlUzp_cU0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
```


<iframe width="640" height="360" src="https://www.youtube.com/embed/PjhlUzp_cU0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>



## 파이썬 기본 문법


```python
print("Hello World")
```

    Hello World
    


```python
print("환영합니다")
```

    환영합니다
    


```python
name = "연탄이"
print(name)
```

    연탄이
    


```python
print("Ctrl + Enter : 현재 Cell 실행")
```

    Ctrl + Enter : 현재 Cell 실행
    


```python
print("Shift + Enter : 현재 Cell 실행 후 다음 Cell 선택")
```

    Shift + Enter : 현재 Cell 실행 후 다음 Cell 선택
    


```python
print("Alt + Enter : 현재 Cell 실행 후 다음 위치에 Cell 삽입")
```

    Alt + Enter : 현재 Cell 실행 후 다음 위치에 Cell 삽입
    

---

## 시각화 예제 1 : 그래프

- matplotlib를 이요하면 다양한 그래프를 그릴 수 있으며 수행 결과를 바로 확인할 수 있습니다.


```python
import matplotlib as mpl
import matplotlib.pyplot as plt
import numpy as np

fig, ax = plt.subplots()  # Create a figure containing a single axes.
ax.plot([1, 2, 3, 4], [1, 4, 2, 3]);  # Plot some data on the axes.
```


    
![png](output_14_0.png)
    


## 시각화 예제 2:테이블

- pandas는 복잡한 데이터를 분석할 때 아주 유용합니다.


```python
import pandas as pd
import numpy as np

df = pd.DataFrame([[38.0, 2.0, 18.0, 22.0, 21, np.nan],[19, 439, 6, 452, 226,232]],
                  index=pd.Index(['Tumour (Positive)', 'Non-Tumour (Negative)'], name='Actual Label:'),
                  columns=pd.MultiIndex.from_product([['Decision Tree', 'Regression', 'Random'],['Tumour', 'Non-Tumour']], names=['Model:', 'Predicted:']))
df.style
```




<style type="text/css">
</style>
<table id="T_6ce57_">
  <thead>
    <tr>
      <th class="index_name level0" >Model:</th>
      <th class="col_heading level0 col0" colspan="2">Decision Tree</th>
      <th class="col_heading level0 col2" colspan="2">Regression</th>
      <th class="col_heading level0 col4" colspan="2">Random</th>
    </tr>
    <tr>
      <th class="index_name level1" >Predicted:</th>
      <th class="col_heading level1 col0" >Tumour</th>
      <th class="col_heading level1 col1" >Non-Tumour</th>
      <th class="col_heading level1 col2" >Tumour</th>
      <th class="col_heading level1 col3" >Non-Tumour</th>
      <th class="col_heading level1 col4" >Tumour</th>
      <th class="col_heading level1 col5" >Non-Tumour</th>
    </tr>
    <tr>
      <th class="index_name level0" >Actual Label:</th>
      <th class="blank col0" >&nbsp;</th>
      <th class="blank col1" >&nbsp;</th>
      <th class="blank col2" >&nbsp;</th>
      <th class="blank col3" >&nbsp;</th>
      <th class="blank col4" >&nbsp;</th>
      <th class="blank col5" >&nbsp;</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th id="T_6ce57_level0_row0" class="row_heading level0 row0" >Tumour (Positive)</th>
      <td id="T_6ce57_row0_col0" class="data row0 col0" >38.000000</td>
      <td id="T_6ce57_row0_col1" class="data row0 col1" >2.000000</td>
      <td id="T_6ce57_row0_col2" class="data row0 col2" >18.000000</td>
      <td id="T_6ce57_row0_col3" class="data row0 col3" >22.000000</td>
      <td id="T_6ce57_row0_col4" class="data row0 col4" >21</td>
      <td id="T_6ce57_row0_col5" class="data row0 col5" >nan</td>
    </tr>
    <tr>
      <th id="T_6ce57_level0_row1" class="row_heading level0 row1" >Non-Tumour (Negative)</th>
      <td id="T_6ce57_row1_col0" class="data row1 col0" >19.000000</td>
      <td id="T_6ce57_row1_col1" class="data row1 col1" >439.000000</td>
      <td id="T_6ce57_row1_col2" class="data row1 col2" >6.000000</td>
      <td id="T_6ce57_row1_col3" class="data row1 col3" >452.000000</td>
      <td id="T_6ce57_row1_col4" class="data row1 col4" >226</td>
      <td id="T_6ce57_row1_col5" class="data row1 col5" >232.000000</td>
    </tr>
  </tbody>
</table>



