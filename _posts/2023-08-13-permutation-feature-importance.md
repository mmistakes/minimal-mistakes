---
layout: single
title: Permutation Feature Importance
author-id: Chingis Maksimov
tags: [model explainability, feature importance]
classes: wide
---

Investigating feature importances for a developed model is a very important step in achieving the goal of interpretable machine learning. This not only allows to confirm that the important features have been picked up by the model but also to catch leakages in developed pipelines when, for example, unimportant (or even random) features happen to have significant predictive power. One model-agnostic approach is **permutation feature importance**. The approach works by measuring the importance of a given feature by observing by how much the performance of the model drops with respect to the metric of choice when this feature is randomly shuffled in the dataset. The larger the drop in the performance of the model, the more important the feature. 

The algorithm to estimate permutation importance of a given feature can be described as follows:
1. Estimate baseline model performance on a dataset, $P_b$;
2. For each $i\in \{1, 2, ..., N\}$ do:
    - Permute the feature in the dataset;
    - Estimate the resulting model performance, $P_{i}$;
3. Estimate importance of the feature as the mean decrease in model performance:

$$
\begin{equation*}
P_b - \frac{1}{N}\sum_{i=1}^{N}P_i
\end{equation*}
$$

As with any statistical method, there are certain underlying assumptions:
- one needs to be careful when investigating importance of a feature that is highly correlated with other features in the dataset: the true decrease in the model's performance may be masked by the presence of correlated features in which case the feature may appear more or less important than it actually is; 
- the model possesses predictive power for the task under consideration. Important feature for a bad model is not necessarily important for a good model;
- permutation feature importances depend on the chosen measure of model performance, i.e., relative feature importances may differ for the same estimator instance if different measures of model performance are used;
- permutation feature importances depend on the chosen modeling approach. This means that different prediction algorithms may not agree on the relative importances of the features. 

In the next section we will implement the algorithm in Python and test it on an actual dataset.

# Python implementation

We begin by loading the required libraries.


```python
import numpy as np
np.random.seed(4)
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.ensemble import RandomForestClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import roc_auc_score
from sklearn.base import BaseEstimator, is_classifier
from sklearn.utils.validation import check_is_fitted
from sklearn.exceptions import NotFittedError
from typing import List, Optional, Callable, Union
```

Below we define `permutation_feature_importance` function that implements the permutation feature importance algorithm.


```python
def permutation_feature_importance(estimator: BaseEstimator,
                                   X: pd.DataFrame,
                                   y: Union[pd.Series, np.ndarray],
                                   N: int=30,
                                   features: Optional[List[str]]=None,
                                   metric: Optional[Callable[[Union[pd.Series, np.ndarray], Union[pd.Series, np.ndarray]], float]]=None,
                                   use_proba: bool=False,
                                   mode: str="max",
                                   random_seed: Optional[int]=None) -> pd.DataFrame:
    """
    Estimate permutation feature importances.
    
    :param estimator: estimator that has been fit to data
    :param X: dataframe of features with shape (N_samples, N_features)
    :param y: true labels
    :param N: number of times to permute each feature
    :param features: list of features for which to estimate importances
    :param metric: custom metric
    :param use_proba: if True, use probabilities of positive class instead of class predictions
    :param mode: if "max", higher values of `metric` are associated with better performance
    :param random_seed: random seed for reproducibility
    """
    _check_estimator(estimator)
    if N < 1 or not isinstance(N, int):
        raise ValueError("Parameter `N` should be a positive integer.")
    if features:
        for feature in features:
            assert feature in X.columns, f"'{feature}' could not be found in the columns of the dataframe."
    else:
        features = list(X.columns)
        
    if mode not in ("max", "min"):
        raise ValueError("Parameter `mode` should be in ['max', 'min'].")
    multiplier = 1 if mode == "max" else -1
    
    if random_seed:
        np.random.seed(random_seed)
        
    if metric is None:
        baseline_score = estimator.score(X.values, y)
    else:
        preds = estimator.predict_proba(X.values)[:, 1] if use_proba else estimator.predict(X.values)
        baseline_score = metric(y, preds)
        
    res = pd.DataFrame(index=features, columns=["mean", "std"])
    
    for feature in features:
        score_changes = []
        for i in range(N):
            X_copy = X.copy()
            X_copy[feature] = np.random.permutation(X_copy[feature])
            if metric is None:
                permuted_score = estimator.score(X_copy.values, y)
            else:
                preds = estimator.predict_proba(X_copy.values)[:, 1] if use_proba else estimator.predict(X_copy.values)
                permuted_score = metric(y, preds)
            score_changes.append((baseline_score - permuted_score) * multiplier)
        res.loc[feature] = [np.mean(score_changes), np.std(score_changes)]
    res.reset_index(names="features", inplace=True)
    res.sort_values(["mean"], ascending=False, inplace=True)
    return res


def _check_estimator(estimator: BaseEstimator) -> None:
    """
    Check if estimator has been fit to data and has required methods.
    
    :param estimator: estimator to check
    """
    assert isinstance(estimator, BaseEstimator), "Estimator is not an instance of `BaseEstimator`."
        
    try:
        check_is_fitted(estimator)
    except NotFittedError:
        print("The estimator has not been fit to data. Please, fit the estimator to data first.")
```

Continuing with the theme of model explainability, we will use the heart failure clinical records dataset that can be downloaded from [UC Irvine Machine Learning Repository](https://archive.ics.uci.edu/dataset/519/heart+failure+clinical+records). Let us load the dataset as pandas dataframe. 


```python
df = pd.read_csv("data/heart_failure_clinical_records_dataset.csv")
print(f"Dataset shape: {df.shape}")
df.head()
```

    Dataset shape: (299, 13)





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
      <th>age</th>
      <th>anaemia</th>
      <th>creatinine_phosphokinase</th>
      <th>diabetes</th>
      <th>ejection_fraction</th>
      <th>high_blood_pressure</th>
      <th>platelets</th>
      <th>serum_creatinine</th>
      <th>serum_sodium</th>
      <th>sex</th>
      <th>smoking</th>
      <th>time</th>
      <th>DEATH_EVENT</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>75.0</td>
      <td>0</td>
      <td>582</td>
      <td>0</td>
      <td>20</td>
      <td>1</td>
      <td>265000.00</td>
      <td>1.9</td>
      <td>130</td>
      <td>1</td>
      <td>0</td>
      <td>4</td>
      <td>1</td>
    </tr>
    <tr>
      <th>1</th>
      <td>55.0</td>
      <td>0</td>
      <td>7861</td>
      <td>0</td>
      <td>38</td>
      <td>0</td>
      <td>263358.03</td>
      <td>1.1</td>
      <td>136</td>
      <td>1</td>
      <td>0</td>
      <td>6</td>
      <td>1</td>
    </tr>
    <tr>
      <th>2</th>
      <td>65.0</td>
      <td>0</td>
      <td>146</td>
      <td>0</td>
      <td>20</td>
      <td>0</td>
      <td>162000.00</td>
      <td>1.3</td>
      <td>129</td>
      <td>1</td>
      <td>1</td>
      <td>7</td>
      <td>1</td>
    </tr>
    <tr>
      <th>3</th>
      <td>50.0</td>
      <td>1</td>
      <td>111</td>
      <td>0</td>
      <td>20</td>
      <td>0</td>
      <td>210000.00</td>
      <td>1.9</td>
      <td>137</td>
      <td>1</td>
      <td>0</td>
      <td>7</td>
      <td>1</td>
    </tr>
    <tr>
      <th>4</th>
      <td>65.0</td>
      <td>1</td>
      <td>160</td>
      <td>1</td>
      <td>20</td>
      <td>0</td>
      <td>327000.00</td>
      <td>2.7</td>
      <td>116</td>
      <td>0</td>
      <td>0</td>
      <td>8</td>
      <td>1</td>
    </tr>
  </tbody>
</table>
</div>



We have already performed exploratory data analysis of this dataset in the [previous post](https://chingismaksimov.github.io/partial-dependence-plots/) on partial dependence plots. Therefore, we will just provide a summary statistics table below but will not spend time discussing the dataset.


```python
def describe_df(df: pd.DataFrame) -> pd.DataFrame:
    """
    Describe pandas dataframe.
    
    :param df: input dataframe
    :return: description of the dataset
    """
    col_types = df.dtypes
    col_types.name = "dtype"
    
    n_missing = df.isna().astype(int).sum(axis=0)
    n_missing.name = "n_missing"
    
    pct_missing = n_missing / len(df)
    pct_missing.name = "pct_missing"
    
    n_unique = df.nunique()
    n_unique.name = "n_unique"
    
    skewness = df.skew()
    skewness.name = "skewness"
    
    kurtosis = df.kurt()
    kurtosis.name = "kurtosis"
    
    return pd.concat([col_types, n_missing, pct_missing, n_unique, df.describe().T, skewness, kurtosis], 
                     axis=1)

describe_df(df)
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
      <th>dtype</th>
      <th>n_missing</th>
      <th>pct_missing</th>
      <th>n_unique</th>
      <th>count</th>
      <th>mean</th>
      <th>std</th>
      <th>min</th>
      <th>25%</th>
      <th>50%</th>
      <th>75%</th>
      <th>max</th>
      <th>skewness</th>
      <th>kurtosis</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>age</th>
      <td>float64</td>
      <td>0</td>
      <td>0.0</td>
      <td>47</td>
      <td>299.0</td>
      <td>60.833893</td>
      <td>11.894809</td>
      <td>40.0</td>
      <td>51.0</td>
      <td>60.0</td>
      <td>70.0</td>
      <td>95.0</td>
      <td>0.423062</td>
      <td>-0.184871</td>
    </tr>
    <tr>
      <th>anaemia</th>
      <td>int64</td>
      <td>0</td>
      <td>0.0</td>
      <td>2</td>
      <td>299.0</td>
      <td>0.431438</td>
      <td>0.496107</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>1.0</td>
      <td>1.0</td>
      <td>0.278261</td>
      <td>-1.935563</td>
    </tr>
    <tr>
      <th>creatinine_phosphokinase</th>
      <td>int64</td>
      <td>0</td>
      <td>0.0</td>
      <td>208</td>
      <td>299.0</td>
      <td>581.839465</td>
      <td>970.287881</td>
      <td>23.0</td>
      <td>116.5</td>
      <td>250.0</td>
      <td>582.0</td>
      <td>7861.0</td>
      <td>4.463110</td>
      <td>25.149046</td>
    </tr>
    <tr>
      <th>diabetes</th>
      <td>int64</td>
      <td>0</td>
      <td>0.0</td>
      <td>2</td>
      <td>299.0</td>
      <td>0.418060</td>
      <td>0.494067</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>1.0</td>
      <td>1.0</td>
      <td>0.333929</td>
      <td>-1.901254</td>
    </tr>
    <tr>
      <th>ejection_fraction</th>
      <td>int64</td>
      <td>0</td>
      <td>0.0</td>
      <td>17</td>
      <td>299.0</td>
      <td>38.083612</td>
      <td>11.834841</td>
      <td>14.0</td>
      <td>30.0</td>
      <td>38.0</td>
      <td>45.0</td>
      <td>80.0</td>
      <td>0.555383</td>
      <td>0.041409</td>
    </tr>
    <tr>
      <th>high_blood_pressure</th>
      <td>int64</td>
      <td>0</td>
      <td>0.0</td>
      <td>2</td>
      <td>299.0</td>
      <td>0.351171</td>
      <td>0.478136</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>1.0</td>
      <td>1.0</td>
      <td>0.626732</td>
      <td>-1.618076</td>
    </tr>
    <tr>
      <th>platelets</th>
      <td>float64</td>
      <td>0</td>
      <td>0.0</td>
      <td>176</td>
      <td>299.0</td>
      <td>263358.029264</td>
      <td>97804.236869</td>
      <td>25100.0</td>
      <td>212500.0</td>
      <td>262000.0</td>
      <td>303500.0</td>
      <td>850000.0</td>
      <td>1.462321</td>
      <td>6.209255</td>
    </tr>
    <tr>
      <th>serum_creatinine</th>
      <td>float64</td>
      <td>0</td>
      <td>0.0</td>
      <td>40</td>
      <td>299.0</td>
      <td>1.393880</td>
      <td>1.034510</td>
      <td>0.5</td>
      <td>0.9</td>
      <td>1.1</td>
      <td>1.4</td>
      <td>9.4</td>
      <td>4.455996</td>
      <td>25.828239</td>
    </tr>
    <tr>
      <th>serum_sodium</th>
      <td>int64</td>
      <td>0</td>
      <td>0.0</td>
      <td>27</td>
      <td>299.0</td>
      <td>136.625418</td>
      <td>4.412477</td>
      <td>113.0</td>
      <td>134.0</td>
      <td>137.0</td>
      <td>140.0</td>
      <td>148.0</td>
      <td>-1.048136</td>
      <td>4.119712</td>
    </tr>
    <tr>
      <th>sex</th>
      <td>int64</td>
      <td>0</td>
      <td>0.0</td>
      <td>2</td>
      <td>299.0</td>
      <td>0.648829</td>
      <td>0.478136</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>1.0</td>
      <td>1.0</td>
      <td>1.0</td>
      <td>-0.626732</td>
      <td>-1.618076</td>
    </tr>
    <tr>
      <th>smoking</th>
      <td>int64</td>
      <td>0</td>
      <td>0.0</td>
      <td>2</td>
      <td>299.0</td>
      <td>0.321070</td>
      <td>0.467670</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>1.0</td>
      <td>1.0</td>
      <td>0.770349</td>
      <td>-1.416080</td>
    </tr>
    <tr>
      <th>time</th>
      <td>int64</td>
      <td>0</td>
      <td>0.0</td>
      <td>148</td>
      <td>299.0</td>
      <td>130.260870</td>
      <td>77.614208</td>
      <td>4.0</td>
      <td>73.0</td>
      <td>115.0</td>
      <td>203.0</td>
      <td>285.0</td>
      <td>0.127803</td>
      <td>-1.212048</td>
    </tr>
    <tr>
      <th>DEATH_EVENT</th>
      <td>int64</td>
      <td>0</td>
      <td>0.0</td>
      <td>2</td>
      <td>299.0</td>
      <td>0.321070</td>
      <td>0.467670</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>1.0</td>
      <td>1.0</td>
      <td>0.770349</td>
      <td>-1.416080</td>
    </tr>
  </tbody>
</table>
</div>



We will introduce a random feature to the dataset. This is done to show how a random feature may appear to have predictive power if there were issues with the model development process. In this case we will train a random forest algorithm (which can be considered as a relatively high-capacity algorithm for the dataset under consideration) on the whole dataset thereby introducing overfitting.


```python
df["rand_feature"] = np.random.normal(0, 1, (df.shape[0]))

target = "DEATH_EVENT"
features = [col for col in df.columns if col not in ["time", target]]
```

Below we fit the algorithm on the whole dataset.


```python
estimator = RandomForestClassifier(random_state=4)
X, y = df[features].values, df[target].values
estimator.fit(X, y);
```

Before estimating permutation feature importances we need to make sure that the model possess predictive power. By default, `permutation_feature_importance` function relies on the estimator's `score` method. For random forest algorithm of sklearn it is mean accuracy. We will also check AUROC metric that is a very common metric for binary classification tasks.


```python
print(f"Mean accuracy: {estimator.score(X, y)}")
print(f"AUROC: {roc_auc_score(y, estimator.predict_proba(X)[:, 1])}")
```

    Mean accuracy: 1.0
    AUROC: 0.9999999999999999


The model achieved the highest possible values on both metrics. This also means that the model is clearly overfit to the dataset.

Let us now check permutation feature importances using the default accuracy metric. 


```python
importances = permutation_feature_importance(estimator, df[features], y, random_seed=4)
```


```python
sns.barplot(importances, x="mean", y="features")
plt.xlabel("Feature importance")
plt.ylabel("")
plt.title("Accuracy-based Permutation Feature Importances");
```


    
**Figure 1. Accuracy-based Permutation Feature Importances. Random Forest**
<p align='center'>
    <img src='/assets/img/posts/permutation_feature_importances/accuracy_based_importances.png' width=800>
</p>
    


As can be seen from Figure 1, the two most important features for predicting death following a heart failure event are "ejection_fraction" and "serum_creatinine". At the same time "smoking" appears to have no importance whatsoever. The random feature that we introduced appears near the middle and is more important than "high_blood_pressure" and "anaemia" explanatory variables. To verify that the obtained feature importances are reasonable, we compare them with the feature importances reported in "Machine learning can predict survival of patients with heart failure from serum creatinine and ejection fraction alone" by Chicco and Jurman (2020). 

**Figure 2. Random Forest Feature Selection**
<p align='center'>
    <img src='/assets/img/posts/permutation_feature_importances/feature_importances. external.png' width=800>
</p>

By comparing the permutation feature importances (Figure 1) with the feature importances based on accuracy reduction and gini impurity as reported by the authors of the paper (Figure 2), we can see they mostly align with some disagreements. This confirms that the obtained permutation feature importances are reasonable. 

We continue by estimating permutation feature importances using AUROC as the metric.


```python
importances = permutation_feature_importance(estimator, 
                                             df[features], y, 
                                             metric=roc_auc_score, 
                                             use_proba=True,
                                             random_seed=4)
```


```python
sns.barplot(importances, x="mean", y="features")
plt.xlabel("Feature importance")
plt.ylabel("")
plt.title("AUROC-based Permutation Feature Importances");
```


    
**Figure 3. AUROC-based Permutation Feature Importances. Random Forest**
<p align='center'>
    <img src='/assets/img/posts/permutation_feature_importances/auroc_based_importances.png' width=800>
</p>
    


We can see that changing the metric resulted in changes in the relative importances of the features. As such, "platelets" is now less important than "creatinine_phosphokinase". Also, some features completely "lost their importance": "diabetes", "anaemia", "sex" and "high_blood_pressure". 

Finally, to show that permutation feature importances are dependent on the chosen modeling approach, we will fit logistic regression to the same dataset and estimate the resulting permutation feature importances. 


```python
estimator_log_r = LogisticRegression(random_state=4)
estimator_log_r.fit(X, y);
```


```python
print(f"Mean accuracy: {estimator_log_r.score(X, y)}")
print(f"AUROC: {roc_auc_score(y, estimator_log_r.predict_proba(X)[:, 1])}")
```

    Mean accuracy: 0.7558528428093646
    AUROC: 0.7497434318555009


Logistic regression is certainly a lower-capacity algorithm and as such scored lower with respect to both accuracy and AUROC compared to the random forest algorithm. While any model's goodness of fit can only be assessed in relation to the task at hand, we will assume that logistic regression does possess predictive power and, therefore, can be used to assess permutation feature importances. 


```python
importances_log_r = permutation_feature_importance(estimator_log_r, df[features], y, random_seed=4)
```


```python
sns.barplot(importances_log_r, x="mean", y="features")
plt.xlabel("Feature importance")
plt.ylabel("")
plt.title("Accuracy-based Permutation Feature Importances");
```


    
**Figure 4. Accuracy-based Permutation Feature Importances. Logistic Regression**
<p align='center'>
    <img src='/assets/img/posts/permutation_feature_importances/logistic_regression_importances.png' width=800>
</p>
    


We observe a drastic change in feature importances. There are only three features that appear to have any predictive power: "age", "ejection_fraction" and "creatinine_phosphokinase". "serum_creatinine" appears to have completely lost its importance. On the other hand, random feature no longer appears to have any predictive power as should indeed be the case.

# References

1. Chicco, D., Jurman, G. Machine learning can predict survival of patients with heart failure from serum creatinine and ejection fraction alone. BMC Med Inform Decis Mak 20, 16 (2020). https://doi.org/10.1186/s12911-020-1023-5
