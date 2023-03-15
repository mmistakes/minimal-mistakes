---
layout: single
title:  "Project 5"
categories: project
tag: [python, project, machine_learning]
toc: true
author_profile: false
color: white
sidebar:
    nav: "docs"
---
## 2022 Qatar World Cup Power Ranking and Winner(Simulation)

# <strong>Introduction: 2022 Qatar World Cup Power Ranking and Winner(Simulation)</strong><br>
Introduction: Predicting the winner of 2022 Qatar World Cup<br>
Method:
1. Read Data
2. Feature Selection:
    - Goal Difference = AVG(Offense Score) - AVG(Diffense Score)
    - Current Rank
    - Average Rank for 10 years
    - Not Friendly Game

3. Model Selection: Logistic Regresion, XGBoost, Gradinet Boosting, Ada Boosting
4. Simulation
5. Visualization


This project was based on the following project: https://www.kaggle.com/code/agostontorok/soccer-world-cup-2018-winner/notebook<br>
Data Source:
- results: https://www.kaggle.com/datasets/martj42/international-football-results-from-1872-to-2017 (modified by Jay Jung)
- Qatar2022-teams: Written by Jay Jung
- fifaRanking2020-10-06: https://www.kaggle.com/datasets/cashncarry/fifaworldranking (modified by Jay Jung)<br>

Data Modification: Modified data because the affecting data for this World Cup are up to 10 years. <br>
Wokred with Goolge Colab and Jupyter Notebook

## 1. Read Data


```python
import numpy as np
import pandas as pd
import warnings
warnings.filterwarnings(action = 'ignore')

rankings = pd.read_csv('./worldCupData/fifaRanking2020-10-06.csv', encoding='windows-1252')
matches = pd.read_csv('./worldCupData/results.csv', encoding='windows-1252')
groups = pd.read_csv('./worldCupData/Qatar2022-teams.csv')
```


```python
# Unified countries name
rankings = rankings.replace({"IR Iran": "Iran"})
rankings = rankings.replace({"Korea Republic": "South Korea"})
rankings['rank_date'] = pd.to_datetime(rankings['rank_date'])
matches['date'] = pd.to_datetime(matches['date'])
matches = matches.replace({"United States": "USA"})
```


```python
#rankings.head()
```

## 2. Feature Engineering

### 2.1 Extract team list for 2022 Qatar World Cup


```python
country_list = groups['Team'].values.tolist()
country_list = sorted(country_list)
# country_list
```


```python
# Get Average rankings for 10 years for each country
avgRanking = rankings.groupby(['country_full']).mean()
avgRanking = avgRanking.reset_index()
```


```python
matches.columns
```




    Index(['date', 'home_team', 'away_team', 'home_score', 'away_score',
           'tournament', 'country', 'neutral'],
          dtype='object')



Different number of data <br>
so extract countries which join the 2022 Qatar World Cup <br><br>
Countries: ['Senegal', 'Qatar', 'Netherlands', 'Ecuador', 'Iran', 'England', 'USA', 'Wales', 'Argentina', 'Saudi Arabia', 'Mexico', 'Poland', 'Denmark', 'Tunisia', 'France', 'Australia', 'Germany', 'Japan', 'Spain', 'Costa Rica', 'Morocco', 'Croatia', 'Belgium', 'Canada', 'Switzerland', 'Cameroon', 'Brazil', 'Serbia', 'Uruguay', 'South Korea', 'Portugal', 'Ghana']


```python
# Different number of data
home_offense = matches.groupby(['home_team']).mean()['home_score'].fillna(0)
len(home_offense)
```




    283




```python
# Different number of data
away_offense = matches.groupby(['away_team']).mean()['away_score'].fillna(0)
len(away_offense)
```




    278



### 2.2 Goal Difference(GD) for each team
Offense Score = avg(home score) * 0.3 + avg(away score) * 0.7
(Additional points are given because it is more difficult to score in away games.)<br>
Defense Score = avg(away score) + avg(home score)<br>
GD = Offense Score - Deffense Score


```python
home = home_offense.to_frame().reset_index()
away = away_offense.to_frame().reset_index()
```


```python
home = home[home['home_team'].isin(country_list)].reset_index()
home = home.drop(['index'], axis = 1)
#home
```


```python
away = away[away['away_team'].isin(country_list)].reset_index()
away = away.drop(['index'], axis = 1)
# away
```


```python
wc_score = pd.DataFrame()
wc_score['country_name'] = country_list
wc_score['offense_score'] = round((home['home_score'] * 0.3 + away['away_score'] * 0.7), 2) # Most gmaes are away game so I weighted more in away_score
# wc_score
```


```python
home_diffense = matches.groupby(['home_team']).mean()['away_score'].fillna(0)
away_diffense = matches.groupby(['away_team']).mean()['home_score'].fillna(0)
home = home_diffense.to_frame().reset_index()
away = away_diffense.to_frame().reset_index()
home = home[home['home_team'].isin(country_list)].reset_index()
home = home.drop(['index'], axis = 1)
away = away[away['away_team'].isin(country_list)].reset_index()
away = away.drop(['index'], axis = 1)
wc_score['diffense_score'] = round(home['away_score'] * 0.3 + away['home_score'] * 0.7, 2) # most games are away
wc_score['GD'] = (wc_score['offense_score'] - wc_score['diffense_score']) # Goals Difference
# wc_score
```

### 2.3 Average Rankings for 10 years


```python
avgRanking = avgRanking[['country_full', 'rank']]
avgRanking.head()
```





  <div id="df-1f74c69e-21fd-4726-b787-f66851e1d283">
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
      <th>country_full</th>
      <th>rank</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>Afghanistan</td>
      <td>146.207921</td>
    </tr>
    <tr>
      <th>1</th>
      <td>Albania</td>
      <td>56.524752</td>
    </tr>
    <tr>
      <th>2</th>
      <td>Algeria</td>
      <td>37.930693</td>
    </tr>
    <tr>
      <th>3</th>
      <td>American Samoa</td>
      <td>190.396040</td>
    </tr>
    <tr>
      <th>4</th>
      <td>Andorra</td>
      <td>173.128713</td>
    </tr>
  </tbody>
</table>
</div>
      <button class="colab-df-convert" onclick="convertToInteractive('df-1f74c69e-21fd-4726-b787-f66851e1d283')"
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
          document.querySelector('#df-1f74c69e-21fd-4726-b787-f66851e1d283 button.colab-df-convert');
        buttonEl.style.display =
          google.colab.kernel.accessAllowed ? 'block' : 'none';

        async function convertToInteractive(key) {
          const element = document.querySelector('#df-1f74c69e-21fd-4726-b787-f66851e1d283');
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
avgRank = avgRanking[avgRanking['country_full'].isin(country_list)].reset_index()
avgRank = avgRank.drop(['index'], axis = 1)
# avgRank
```

### 2.4 Win Rate for each Team


```python
matches['score_difference_home'] = matches['home_score'] - matches['away_score']
matches['score_difference_away'] = matches['away_score'] - matches['home_score']
matches['home win'] = ((matches['score_difference_home'] > 0) & (matches['tournament'] != 'Friendly'))
matches['away win'] = ((matches['score_difference_away'] > 0) & (matches['tournament'] != 'Friendly'))
matches = matches[(matches['home_team'].isin(country_list)) | matches['away_team'].isin(country_list)]
# matches
```


```python
winRate = {'country' : [], 'winrate': []}
for i in country_list:
    count = matches[(matches['home_team'] == i) | (matches['away_team'] == i) == True]
    winRate['country'].append(i)
    winRate['winrate'].append((len(count[count['home win']] == True) + len(count[count['away win']] == True)) / len(count))
    
winRate = pd.DataFrame(winRate)
#winRate
```


```python
curRank = rankings[rankings['country_full'].isin(country_list)]
curRank = curRank.loc[curRank['rank_date'] == '2022-10-06'][['country_full', 'rank']]
curRank = curRank.sort_values('country_full')
wc_score['current_rank']= curRank['rank'].values.tolist()
wc_score['avgRank'] = round(avgRank['rank'], 2)
wc_score['winRate'] = round(winRate['winrate'], 2)
wc_score = wc_score[['country_name', 'current_rank', 'avgRank', 'GD', 'winRate']]
wc_score = wc_score.sort_values('current_rank').reset_index().drop(['index'], axis = 1)
wc_score
```





  <div id="df-84297cc8-7367-489b-bb1c-a60567dd3969">
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
      <th>country_name</th>
      <th>current_rank</th>
      <th>avgRank</th>
      <th>GD</th>
      <th>winRate</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>Brazil</td>
      <td>1</td>
      <td>5.06</td>
      <td>1.63</td>
      <td>0.47</td>
    </tr>
    <tr>
      <th>1</th>
      <td>Belgium</td>
      <td>2</td>
      <td>4.49</td>
      <td>1.40</td>
      <td>0.65</td>
    </tr>
    <tr>
      <th>2</th>
      <td>Argentina</td>
      <td>3</td>
      <td>4.47</td>
      <td>0.97</td>
      <td>0.49</td>
    </tr>
    <tr>
      <th>3</th>
      <td>France</td>
      <td>4</td>
      <td>9.69</td>
      <td>0.86</td>
      <td>0.47</td>
    </tr>
    <tr>
      <th>4</th>
      <td>England</td>
      <td>5</td>
      <td>9.68</td>
      <td>1.28</td>
      <td>0.54</td>
    </tr>
    <tr>
      <th>5</th>
      <td>Spain</td>
      <td>7</td>
      <td>6.72</td>
      <td>1.18</td>
      <td>0.55</td>
    </tr>
    <tr>
      <th>6</th>
      <td>Netherlands</td>
      <td>8</td>
      <td>14.15</td>
      <td>0.98</td>
      <td>0.54</td>
    </tr>
    <tr>
      <th>7</th>
      <td>Portugal</td>
      <td>9</td>
      <td>6.43</td>
      <td>1.05</td>
      <td>0.53</td>
    </tr>
    <tr>
      <th>8</th>
      <td>Denmark</td>
      <td>10</td>
      <td>23.78</td>
      <td>0.75</td>
      <td>0.51</td>
    </tr>
    <tr>
      <th>9</th>
      <td>Germany</td>
      <td>11</td>
      <td>5.98</td>
      <td>1.17</td>
      <td>0.56</td>
    </tr>
    <tr>
      <th>10</th>
      <td>Croatia</td>
      <td>12</td>
      <td>13.71</td>
      <td>0.54</td>
      <td>0.55</td>
    </tr>
    <tr>
      <th>11</th>
      <td>Mexico</td>
      <td>13</td>
      <td>16.49</td>
      <td>0.42</td>
      <td>0.45</td>
    </tr>
    <tr>
      <th>12</th>
      <td>Uruguay</td>
      <td>14</td>
      <td>10.92</td>
      <td>0.41</td>
      <td>0.54</td>
    </tr>
    <tr>
      <th>13</th>
      <td>Switzerland</td>
      <td>15</td>
      <td>11.40</td>
      <td>0.56</td>
      <td>0.55</td>
    </tr>
    <tr>
      <th>14</th>
      <td>USA</td>
      <td>16</td>
      <td>23.20</td>
      <td>0.29</td>
      <td>0.50</td>
    </tr>
    <tr>
      <th>15</th>
      <td>Senegal</td>
      <td>18</td>
      <td>37.26</td>
      <td>0.70</td>
      <td>0.54</td>
    </tr>
    <tr>
      <th>16</th>
      <td>Wales</td>
      <td>19</td>
      <td>25.69</td>
      <td>0.06</td>
      <td>0.56</td>
    </tr>
    <tr>
      <th>17</th>
      <td>Iran</td>
      <td>20</td>
      <td>35.85</td>
      <td>1.23</td>
      <td>0.48</td>
    </tr>
    <tr>
      <th>18</th>
      <td>Serbia</td>
      <td>21</td>
      <td>37.39</td>
      <td>0.38</td>
      <td>0.48</td>
    </tr>
    <tr>
      <th>19</th>
      <td>Morocco</td>
      <td>22</td>
      <td>57.43</td>
      <td>0.64</td>
      <td>0.45</td>
    </tr>
    <tr>
      <th>20</th>
      <td>Japan</td>
      <td>24</td>
      <td>42.30</td>
      <td>0.72</td>
      <td>0.61</td>
    </tr>
    <tr>
      <th>21</th>
      <td>Poland</td>
      <td>26</td>
      <td>31.25</td>
      <td>0.73</td>
      <td>0.54</td>
    </tr>
    <tr>
      <th>22</th>
      <td>South Korea</td>
      <td>28</td>
      <td>47.90</td>
      <td>0.28</td>
      <td>0.40</td>
    </tr>
    <tr>
      <th>23</th>
      <td>Tunisia</td>
      <td>30</td>
      <td>33.86</td>
      <td>0.31</td>
      <td>0.52</td>
    </tr>
    <tr>
      <th>24</th>
      <td>Costa Rica</td>
      <td>31</td>
      <td>32.92</td>
      <td>-0.06</td>
      <td>0.45</td>
    </tr>
    <tr>
      <th>25</th>
      <td>Australia</td>
      <td>38</td>
      <td>50.19</td>
      <td>0.46</td>
      <td>0.52</td>
    </tr>
    <tr>
      <th>26</th>
      <td>Canada</td>
      <td>41</td>
      <td>88.90</td>
      <td>0.76</td>
      <td>0.52</td>
    </tr>
    <tr>
      <th>27</th>
      <td>Cameroon</td>
      <td>43</td>
      <td>50.97</td>
      <td>0.14</td>
      <td>0.46</td>
    </tr>
    <tr>
      <th>28</th>
      <td>Ecuador</td>
      <td>44</td>
      <td>37.77</td>
      <td>0.01</td>
      <td>0.45</td>
    </tr>
    <tr>
      <th>29</th>
      <td>Qatar</td>
      <td>50</td>
      <td>82.69</td>
      <td>0.25</td>
      <td>0.45</td>
    </tr>
    <tr>
      <th>30</th>
      <td>Saudi Arabia</td>
      <td>51</td>
      <td>73.40</td>
      <td>0.24</td>
      <td>0.54</td>
    </tr>
    <tr>
      <th>31</th>
      <td>Ghana</td>
      <td>61</td>
      <td>41.77</td>
      <td>0.31</td>
      <td>0.50</td>
    </tr>
  </tbody>
</table>
</div>
      <button class="colab-df-convert" onclick="convertToInteractive('df-84297cc8-7367-489b-bb1c-a60567dd3969')"
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
          document.querySelector('#df-84297cc8-7367-489b-bb1c-a60567dd3969 button.colab-df-convert');
        buttonEl.style.display =
          google.colab.kernel.accessAllowed ? 'block' : 'none';

        async function convertToInteractive(key) {
          const element = document.querySelector('#df-84297cc8-7367-489b-bb1c-a60567dd3969');
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
corr = wc_score.corr()
corr.style.background_gradient()
```




<style type="text/css">
#T_a0eb8_row0_col0, #T_a0eb8_row1_col1, #T_a0eb8_row2_col2, #T_a0eb8_row3_col3 {
  background-color: #023858;
  color: #f1f1f1;
}
#T_a0eb8_row0_col1 {
  background-color: #045788;
  color: #f1f1f1;
}
#T_a0eb8_row0_col2, #T_a0eb8_row1_col3, #T_a0eb8_row2_col0, #T_a0eb8_row2_col1 {
  background-color: #fff7fb;
  color: #000000;
}
#T_a0eb8_row0_col3 {
  background-color: #fef6fa;
  color: #000000;
}
#T_a0eb8_row1_col0 {
  background-color: #045483;
  color: #f1f1f1;
}
#T_a0eb8_row1_col2 {
  background-color: #f0eaf4;
  color: #000000;
}
#T_a0eb8_row2_col3 {
  background-color: #65a3cb;
  color: #f1f1f1;
}
#T_a0eb8_row3_col0 {
  background-color: #d6d6e9;
  color: #000000;
}
#T_a0eb8_row3_col1 {
  background-color: #ece7f2;
  color: #000000;
}
#T_a0eb8_row3_col2 {
  background-color: #348ebf;
  color: #f1f1f1;
}
</style>
<table id="T_a0eb8_" class="dataframe">
  <thead>
    <tr>
      <th class="blank level0" >&nbsp;</th>
      <th class="col_heading level0 col0" >current_rank</th>
      <th class="col_heading level0 col1" >avgRank</th>
      <th class="col_heading level0 col2" >GD</th>
      <th class="col_heading level0 col3" >winRate</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th id="T_a0eb8_level0_row0" class="row_heading level0 row0" >current_rank</th>
      <td id="T_a0eb8_row0_col0" class="data row0 col0" >1.000000</td>
      <td id="T_a0eb8_row0_col1" class="data row0 col1" >0.827994</td>
      <td id="T_a0eb8_row0_col2" class="data row0 col2" >-0.675269</td>
      <td id="T_a0eb8_row0_col3" class="data row0 col3" >-0.299605</td>
    </tr>
    <tr>
      <th id="T_a0eb8_level0_row1" class="row_heading level0 row1" >avgRank</th>
      <td id="T_a0eb8_row1_col0" class="data row1 col0" >0.827994</td>
      <td id="T_a0eb8_row1_col1" class="data row1 col1" >1.000000</td>
      <td id="T_a0eb8_row1_col2" class="data row1 col2" >-0.502896</td>
      <td id="T_a0eb8_row1_col3" class="data row1 col3" >-0.313125</td>
    </tr>
    <tr>
      <th id="T_a0eb8_level0_row2" class="row_heading level0 row2" >GD</th>
      <td id="T_a0eb8_row2_col0" class="data row2 col0" >-0.675269</td>
      <td id="T_a0eb8_row2_col1" class="data row2 col1" >-0.502896</td>
      <td id="T_a0eb8_row2_col2" class="data row2 col2" >1.000000</td>
      <td id="T_a0eb8_row2_col3" class="data row2 col3" >0.383654</td>
    </tr>
    <tr>
      <th id="T_a0eb8_level0_row3" class="row_heading level0 row3" >winRate</th>
      <td id="T_a0eb8_row3_col0" class="data row3 col0" >-0.299605</td>
      <td id="T_a0eb8_row3_col1" class="data row3 col1" >-0.313125</td>
      <td id="T_a0eb8_row3_col2" class="data row3 col2" >0.383654</td>
      <td id="T_a0eb8_row3_col3" class="data row3 col3" >1.000000</td>
    </tr>
  </tbody>
</table>




current_rank and avgRank have high correlation.


```python
# Merge matches and rankings data for the simulation
rankings = rankings.set_index(['rank_date'])\
            .groupby(['country_full'], group_keys=False)\
            .resample('D').first()\
            .fillna(method='ffill')\
            .reset_index()

# join the ranks
matches = matches.merge(rankings, 
                        left_on=['date', 'home_team'], 
                        right_on=['rank_date', 'country_full'])
matches = matches.merge(rankings, 
                        left_on=['date', 'away_team'], 
                        right_on=['rank_date', 'country_full'], 
                        suffixes=('_home', '_away'))
```


```python
matches.tail().columns
```




    Index(['date', 'home_team', 'away_team', 'home_score', 'away_score',
           'tournament', 'country', 'neutral', 'score_difference_home',
           'score_difference_away', 'home win', 'away win', 'rank_date_home',
           'rank_home', 'country_full_home', 'country_abrv_home',
           'total_points_home', 'previous_points_home', 'rank_change_home',
           'confederation_home', 'rank_date_away', 'rank_away',
           'country_full_away', 'country_abrv_away', 'total_points_away',
           'previous_points_away', 'rank_change_away', 'confederation_away'],
          dtype='object')




```python
matches['score_diff'] = matches['home_score'] - matches['away_score']
matches['win'] = matches['score_diff'] > 0 # draw is not win
matches['is_stake'] = matches['tournament'] != 'Friendly'
matches['rank_diff'] = matches['rank_home'] - matches['rank_away']
matches['avg_rank'] = (matches['rank_home'] + matches['rank_away'])/2
matches['avg_diff'] = -(matches['total_points_home'] - matches['total_points_away'])/10
```

## 3. Modeling


```python
from sklearn import ensemble
from sklearn.model_selection import train_test_split
from sklearn.metrics import confusion_matrix, roc_curve, roc_auc_score
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import PolynomialFeatures
from matplotlib import pyplot as plt
```


```python
from xgboost import XGBClassifier
from sklearn import linear_model
from sklearn.ensemble import GradientBoostingClassifier
from sklearn.ensemble import AdaBoostClassifier
from sklearn.svm import SVC
```

### 3.1 Model Selection


```python
X, y = matches.loc[:,['avg_rank', 'rank_diff', 'avg_diff', 'is_stake']], matches['win']
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state = 42)
acc_score = {'model_name' : [], 'score': []}
```


```python
clf = linear_model.LogisticRegression(random_state = 42, max_iter = 1000)
clf.fit(X_train, y_train)
clf_acc = clf.score(X_test, y_test)
acc_score['model_name'].append('logistic regression')
acc_score['score'].append(clf_acc)
```


```python
xgb = XGBClassifier(n_estimators = 100, learning_rate = 0.1)
xgb.fit(X_train, y_train)
xgb_acc = xgb.score(X_test, y_test)
acc_score['model_name'].append('XGB')
acc_score['score'].append(xgb_acc)
```


```python
gbdt = GradientBoostingClassifier(random_state = 42)
gbdt.fit(X_train, y_train)
gbdt_acc = gbdt.score(X_test, y_test)
acc_score['model_name'].append('GBDT')
acc_score['score'].append(gbdt_acc)
```


```python
ada = AdaBoostClassifier(random_state = 42)
ada.fit(X_train, y_train)
ada_acc = ada.score(X_test, y_test)
acc_score['model_name'].append('ADA')
acc_score['score'].append(ada_acc)
```


```python
acc_score = pd.DataFrame(acc_score)
```


```python
acc_score = acc_score.sort_values(['score'], ascending = False)
```


```python
plt.figure(figsize=(3,4))
plt.bar(acc_score['model_name'], acc_score['score'])
plt.xticks(rotation = 90)
plt.show()
```


![](/images/worldCup/worldCup2022Simulation_42_0.png)


Best accuracy is lositic regression for this data

### 3.2 Performance of Model 


```python
clf = linear_model.LogisticRegression()

features = PolynomialFeatures(degree=2)
model = Pipeline([
    ('polynomial_features', features),
    ('logistic_regression', clf)
])
model = model.fit(X_train, y_train)

# figures 
fpr, tpr, _ = roc_curve(y_test, model.predict_proba(X_test)[:,1])
plt.figure(figsize=(15,5))
ax = plt.subplot(1,3,1)
ax.plot([0, 1], [0, 1], 'k--')
ax.plot(fpr, tpr)
ax.set_title('AUC score is {0:0.3}%'.format(100 * roc_auc_score(y_test, model.predict_proba(X_test)[:,1])))
ax.set_aspect(1)

ax = plt.subplot(1,3,2)
cm = confusion_matrix(y_test, model.predict(X_test))
ax.imshow(cm, cmap='Greens', clim = (0, cm.max())) 

ax.set_xlabel('Predicted label')
ax.set_title('Performance on the Test set')

ax = plt.subplot(1,3,3)
cm = confusion_matrix(y_train, model.predict(X_train))
ax.imshow(cm, cmap='Blues', clim = (0, cm.max())) 
ax.set_xlabel('Predicted label')
ax.set_title('Performance on the Training set')
pass
```


![](/images/worldCup/worldCup2022Simulation_45_0.png)


## 4. Simulation


```python
wc_score = wc_score.set_index('country_name')
```


```python
wc_score['country_abrv'] = ['BRA', 'BEL', 'ARG', 'FRA', 'ENG', 'ESP', 'NED', 'POR', 'DEN', 'GER', 'CRO', 'MEX',
                            'URU','SUI', 'USA', 'SEN', 'WAL', 'IRN', 'SER','MAR', 'JPN', 'POL', 'KOR', 'TUN',
                           'CRC', 'AUS', 'CAN', 'CMR', 'ECU', 'QAT', 'KSA', 'GHA']
```


```python
from itertools import combinations
margin = 0.05
groups['points'] = 0
groups['total_prob'] = 0
groups = groups.set_index('Team')
opponents = ['First match \nagainst', 'Second match\n against', 'Third match\n against']
```


```python
set(groups['Group'])
```




    {'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'}




```python
for group in set(groups['Group']):
    print('----------------------Group {}----------------------'.format(group))
    for home, away in combinations(groups.query('Group == "{}"'.format(group)).index, 2):
        print("{} vs. {}: ".format(home, away), end='')
        row = pd.DataFrame(np.array([[np.nan, np.nan, np.nan, True]]), columns=X_test.columns)
        #row = row.fillna(0)
        home_rank = wc_score.loc[home, 'current_rank']
        home_avg = wc_score.loc[home, 'avgRank']
        opp_rank = wc_score.loc[away, 'current_rank']
        opp_avg = wc_score.loc[away, 'avgRank']
        row['avg_rank'] = (home_rank + opp_rank) / 2
        row['rank_diff'] = home_rank - opp_rank
        row['avg_diff'] = home_avg - opp_avg
        home_win_prob = model.predict_proba(row)[:,1][0]
        groups.loc[home, 'total_prob'] += home_win_prob
        groups.loc[away, 'total_prob'] += 1-home_win_prob
        
        points = 0
        if home_win_prob <= 0.5 - margin:
            print("{} wins with {:.2f}".format(away, 1-home_win_prob))
            groups.loc[away, 'points'] += 3
        if home_win_prob > 0.5 - margin:
            points = 1
        if home_win_prob >= 0.5 + margin:
            points = 3
            groups.loc[home, 'points'] += 3
            print("{} wins with {:.2f}".format(home, home_win_prob))
        if points == 1:
            print("Draw")
            groups.loc[home, 'points'] += 1
            groups.loc[away, 'points'] += 1
```

    ----------------------Group C----------------------
    Argentina vs. Saudi Arabia: Argentina wins with 0.76
    Argentina vs. Mexico: Argentina wins with 0.58
    Argentina vs. Poland: Argentina wins with 0.67
    Saudi Arabia vs. Mexico: Mexico wins with 0.79
    Saudi Arabia vs. Poland: Poland wins with 0.69
    Mexico vs. Poland: Mexico wins with 0.58
    ----------------------Group H----------------------
    Uruguay vs. South Korea: Uruguay wins with 0.56
    Uruguay vs. Portugal: Portugal wins with 0.56
    Uruguay vs. Ghana: Uruguay wins with 0.77
    South Korea vs. Portugal: Portugal wins with 0.71
    South Korea vs. Ghana: South Korea wins with 0.68
    Portugal vs. Ghana: Portugal wins with 0.80
    ----------------------Group D----------------------
    Denmark vs. Tunisia: Denmark wins with 0.63
    Denmark vs. France: France wins with 0.59
    Denmark vs. Australia: Denmark wins with 0.68
    Tunisia vs. France: France wins with 0.73
    Tunisia vs. Australia: Draw
    France vs. Australia: France wins with 0.73
    ----------------------Group B----------------------
    Iran vs. England: England wins with 0.67
    Iran vs. USA: USA wins with 0.57
    Iran vs. Wales: Draw
    England vs. USA: England wins with 0.58
    England vs. Wales: England wins with 0.61
    USA vs. Wales: Draw
    ----------------------Group F----------------------
    Morocco vs. Croatia: Croatia wins with 0.68
    Morocco vs. Belgium: Belgium wins with 0.77
    Morocco vs. Canada: Morocco wins with 0.58
    Croatia vs. Belgium: Belgium wins with 0.60
    Croatia vs. Canada: Croatia wins with 0.56
    Belgium vs. Canada: Belgium wins with 0.67
    ----------------------Group E----------------------
    Germany vs. Japan: Germany wins with 0.57
    Germany vs. Spain: Draw
    Germany vs. Costa Rica: Germany wins with 0.63
    Japan vs. Spain: Spain wins with 0.70
    Japan vs. Costa Rica: Draw
    Spain vs. Costa Rica: Spain wins with 0.66
    ----------------------Group A----------------------
    Senegal vs. Qatar: Senegal wins with 0.65
    Senegal vs. Netherlands: Netherlands wins with 0.63
    Senegal vs. Ecuador: Senegal wins with 0.64
    Qatar vs. Netherlands: Netherlands wins with 0.82
    Qatar vs. Ecuador: Ecuador wins with 0.56
    Netherlands vs. Ecuador: Netherlands wins with 0.73
    ----------------------Group G----------------------
    Switzerland vs. Cameroon: Switzerland wins with 0.65
    Switzerland vs. Brazil: Brazil wins with 0.63
    Switzerland vs. Serbia: Draw
    Cameroon vs. Brazil: Brazil wins with 0.82
    Cameroon vs. Serbia: Serbia wins with 0.69
    Brazil vs. Serbia: Brazil wins with 0.66



```python
pairing = [0, 3, 4, 7, 8, 11, 12, 15, 1, 2, 5, 6, 9, 10, 13, 14]

groups = groups.sort_values(by=['Group', 'points', 'total_prob'], ascending=False).reset_index()
next_round_wc = groups.groupby('Group').nth([0, 1]) # select the top 2
next_round_wc = next_round_wc.reset_index()
next_round_wc = next_round_wc.loc[pairing]
next_round_wc = next_round_wc.set_index('Team')

finals = ['Round_of_16', 'Quarterfinal', 'Semifinal', 'Final']

labels = list()
odds = list()

for f in finals:
    print("----------------------{}----------------------".format(f))
    iterations = int(len(next_round_wc) / 2)
    winners = []

    for i in range(iterations):
        home = next_round_wc.index[i*2]
        away = next_round_wc.index[i*2+1]
        print("{} vs. {}: ".format(home,
                                   away), 
                                   end='')
        row = pd.DataFrame(np.array([[np.nan, np.nan, np.nan, True]]), columns=X_test.columns)
        home_rank = wc_score.loc[home, 'current_rank']
        avgRank = wc_score.loc[home, 'avgRank']
        opp_rank = wc_score.loc[away, 'current_rank']
        opp_avg = wc_score.loc[away, 'avgRank']
        row['avg_rank'] = (home_rank + opp_rank) / 2
        row['rank_diff'] = home_rank - opp_rank
        row['avg_diff'] = home_avg - opp_avg
        home_win_prob = model.predict_proba(row)[:,1][0]
        if model.predict_proba(row)[:,1] <= 0.5:
            print("{0} wins with probability {1:.2f}".format(away, 1-home_win_prob))
            winners.append(away)
        else:
            print("{0} wins with probability {1:.2f}".format(home, home_win_prob))
            winners.append(home)

        labels.append("{}({:.2f}) vs. {}({:.2f})".format(wc_score.loc[home, 'country_abrv'], 
                                                        1/home_win_prob, 
                                                        wc_score.loc[away, 'country_abrv'], 
                                                        1/(1-home_win_prob)))
        odds.append([home_win_prob, 1-home_win_prob])
                
    next_round_wc = next_round_wc.loc[winners]
    print("\n")
```

    ----------------------Round_of_16----------------------
    Netherlands vs. USA: Netherlands wins with probability 0.56
    Argentina vs. Denmark: Argentina wins with probability 0.57
    Spain vs. Croatia: Spain wins with probability 0.53
    Brazil vs. Uruguay: Brazil wins with probability 0.59
    Senegal vs. England: England wins with probability 0.62
    Mexico vs. France: France wins with probability 0.58
    Germany vs. Belgium: Belgium wins with probability 0.58
    Switzerland vs. Portugal: Portugal wins with probability 0.56
    
    
    ----------------------Quarterfinal----------------------
    Netherlands vs. Argentina: Argentina wins with probability 0.55
    Spain vs. Brazil: Brazil wins with probability 0.55
    England vs. France: France wins with probability 0.51
    Belgium vs. Portugal: Belgium wins with probability 0.54
    
    
    ----------------------Semifinal----------------------
    Argentina vs. Brazil: Brazil wins with probability 0.52
    France vs. Belgium: Belgium wins with probability 0.52
    
    
    ----------------------Final----------------------
    Brazil vs. Belgium: Brazil wins with probability 0.50
    
    


## 5. Visualization of result


```python
# ## using graphviz 
# !apt-get -qq install -y graphviz && pip install -q pydot
# import pydot
# ## Those are not necessary but for the safe compile 
# !apt-get install graphviz libgraphviz-dev pkg-config
# !pip install pygraphviz
```


```python
import networkx as nx
import pydot
from networkx.drawing.nx_pydot import graphviz_layout
```


```python
node_sizes = pd.DataFrame(list(reversed(odds)))
scale_factor = 0.3 # for visualization
G = nx.balanced_tree(2, 3)
pos = nx.nx_agraph.graphviz_layout(G, prog='twopi', args='')
centre = pd.DataFrame(pos).mean(axis=1).mean()

plt.figure(figsize=(10, 10))
ax = plt.subplot(1,1,1)
# add circles 
circle_positions = [(235, 'black'), (180, 'blue'), (120, 'red'), (60, 'yellow')]
[ax.add_artist(plt.Circle((centre, centre), 
                          cp, color='grey', 
                          alpha=0.2)) for cp, c in circle_positions]

# draw first the graph
nx.draw(G, pos, 
        node_color=node_sizes.diff(axis=1)[1].abs().pow(scale_factor), 
        node_size=node_sizes.diff(axis=1)[1].abs().pow(scale_factor)*2000, 
        alpha=1, 
        cmap='Reds',
        edge_color='black',
        width=10,
        with_labels=False)

# draw the custom node labels
shifted_pos = {k:[(v[0]-centre)*0.9+centre,(v[1]-centre)*0.9+centre] for k,v in pos.items()}
nx.draw_networkx_labels(G, 
                        pos=shifted_pos, 
                        bbox=dict(boxstyle="round,pad=0.3", fc="white", ec="black", lw=.5, alpha=1),
                        labels=dict(zip(reversed(range(len(labels))), labels)))

texts = ((10, 'Best 16', 'black'), (70, 'Quarter-\nfinal', 'blue'), (130, 'Semifinal', 'red'), (190, 'Final', 'yellow'))
[plt.text(p, centre+20, t, 
          fontsize=12, color='grey', 
          va='center', ha='center') for p,t,c in texts]
plt.axis('equal')
plt.title('2022 Qatar World Cup Simulation', fontsize=20)
plt.show()
```
![](/images/worldCup/worldCup2022Simulation_56_0.png)


<strong>The Winner of my 2022 Qatar World Cup Simulation is Brazil


