---
layout: single
title: "데이터 분석, 빅데이터 : Seaborn 시본으로 데이터 배워보기"
categories: [Data]
tag: [python, data]
toc: true
---

시본 사이트 :https://seaborn.pydata.org/index.html

seaborn: statistical data visualization — seaborn 0.12.1 documentation

seaborn: statistical data visualization

seaborn.pydata.org

seaborn 사이트 각종 문서 및 예제, 데이터 분석, api등 열람 가능

 

## seaborn 이란?

Statistical Data Visualization library based on matplotlib.

matplotlib 기반의 통계 데이터 시각화 라이브러리.

 

1. 파이썬 오픈소스 라이브러리 중에 가장 널리 사용되는 시각화 라이브러리입니다.

2. 2002년부터 만들어졌으며, MATLAB의 기능들을 파이썬으로 가져오는 컨셉으로 시작되었습니다.

3. 각종 논문에서 figure를 그릴 때, 사용될 만큼 깔끔하게 그래프를 그려주는 것으로 유명합니다.

4. figure라는 도화지에 여러가지 component(요소)를 얹어서 그래프를 완성하는 컨셉으로 구현됩니다.

 

가장 큰 장점 : python파이썬에 DataFrame을 직접적으로 지원하기 때문에 편리하게 데이터를 시각화할 수 있습니다.

 

 

 

## 기본 plots 예제 소스 및 형태 입니다. 

**Lineplot**

https://seaborn.pydata.org/examples/errorband_lineplots.html

Timeseries plot with error bands — seaborn 0.12.1 documentation

Timeseries plot with error bands seaborn components used: set_theme(), load_dataset(), lineplot() import seaborn as sns sns.set_theme(style="darkgrid") # Load an example dataset with long-form data fmri = sns.load_dataset("fmri") # Plot the responses for d

seaborn.pydata.org

 

**Boxplot**

https://seaborn.pydata.org/examples/grouped_boxplot.html

 Grouped boxplots — seaborn 0.12.1 documentation

Grouped boxplots seaborn components used: set_theme(), load_dataset(), boxplot(), despine() import seaborn as sns sns.set_theme(style="ticks", palette="pastel") # Load the example tips dataset tips = sns.load_dataset("tips") # Draw a nested boxplot to show

seaborn.pydata.org

 

**Jointplot**

https://seaborn.pydata.org/examples/joint_kde.html

 Joint kernel density estimate — seaborn 0.12.1 documentation

Joint kernel density estimate seaborn components used: set_theme(), load_dataset(), jointplot() import seaborn as sns sns.set_theme(style="ticks") # Load the penguins dataset penguins = sns.load_dataset("penguins") # Show the joint distribution using kerne

seaborn.pydata.org

 

**Pairplot**

https://seaborn.pydata.org/examples/scatterplot_matrix.html

 Scatterplot Matrix — seaborn 0.12.1 documentation

Scatterplot Matrix seaborn components used: set_theme(), load_dataset(), pairplot() import seaborn as sns sns.set_theme(style="ticks") df = sns.load_dataset("penguins") sns.pairplot(df, hue="species")

seaborn.pydata.org

 

 

위에 주소로 들어가면 예제 코드 및 형태 모든게 있습니다.

 
