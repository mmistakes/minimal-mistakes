---
layout: single
title: Partial Dependence Plots
author-id: Chingis Maksimov
tags: [model explainability, graphical tools]
classes: wide
---

The topic of model interpretability has gained a lot of attention recently with the rapid development of highly complex machine learning algorithms for dealing with 'big data'. While these complex algorithms outperform classical linear algorithms, like linear regression and logistic regression, with respect to predictive power and ability to take non-linear relationships between explanatory and target variables into consideration, this comes at the expense of reduced model transparency and interpretability. This further creates obstacles for the adoption of these algorithms in certain domains that are subject to regulatory scrutiny and approval. A good example is credit risk models that are used for regulatory capital estimation. See, for instance, [EBA Discussion Paper on Machine Learning for IRB Models](https://www.eba.europa.eu/sites/default/documents/files/document_library/Publications/Discussions/2022/Discussion%20on%20machine%20learning%20for%20IRB%20models/1023883/Discussion%20paper%20on%20machine%20learning%20for%20IRB%20models.pdf).

Given the size and importance of the problem, some distinct approaches have been devised for relating model inputs to model outputs and explaining model predictions:
- measuring feature importances to make sure they make sense;
- explaining model output by investigating contributions of each of the input variables as in [Shapley values](https://shap.readthedocs.io/en/latest/example_notebooks/overviews/An%20introduction%20to%20explainable%20AI%20with%20Shapley%20values.html);
- explaining model outputs by fitting locally interpretable surrogate models, like [Local Interpretable Model-agnostic Explanations (LIME)](https://www.kdd.org/kdd2016/papers/files/rfp0573-ribeiroA.pdf). 

However, graphical tools remain some of the most revealing and easy-to-understand ways for investigating complex machine learning algorithms. Partial dependence plot (PDP), which is the subject of this blog post, is one such tool. The idea behind PDP is to graphically investigate the relationship between model output and a set of target features, usually one or two, while marginalizing over the remaining features. Mathematically, 

$$
\begin{align}
PD_{X_T}(x_T) &:= E_{X_T^C}\left[f\left(x_T, X_T^C\right)\right] \notag \\
&= \int f\left(x_T, x_T^C\right)p(x_T^C)dx_T^C \label{eq:partial_dependence},
\end{align}
$$

where

- $X_T$: set of target features;
- $x_t$: point, i.e., particular values of target features, at which partial dependence is estimated;
- $X_T^C$: set of remaining features;
- $PD_{X_T}(x_T)$: partial dependence at point $x_t$;
- $f$: estimator (model).

The value of the integral in ($\ref{eq:partial_dependence}$) can be approximated from a sample as follows:

$$
\begin{equation}
\label{eq:partial_dependence_implementation}
PD_{X_T}(x_T) \approx \frac{1}{N} \sum_{i=1}^{N} f\left(x_T, x_{T, i}^C\right),
\end{equation}
$$

where $N$ is the number of observations in the sample.

The underlying assumption of the PDP methodology is that the target features are not correlated with each other and not correlated with the remaining features. If this assumption does not hold, which is often the case in practice, there may be invalid points used when estimating partial dependence values.

In the following section we will provide Python implementation of equation ($\ref{eq:partial_dependence_implementation}$) and create plotting functions.

# Python Implementation

Below we load required Python libraries. 


```python
import pandas as pd
import numpy as np
from sklearn.base import BaseEstimator
from sklearn.ensemble import RandomForestClassifier
from sklearn.utils.validation import check_is_fitted
from sklearn.exceptions import NotFittedError
from sklearn.base import is_classifier
import matplotlib.pyplot as plt
import seaborn as sns
from typing import Tuple, List, Union, Optional
import warnings
warnings.filterwarnings("ignore")
```

We start off by defining `partial_dependence_1d` function that implements equation ($\ref{eq:partial_dependence_implementation}$) when there is a single target feature.


```python
def partial_dependence_1d(estimator: BaseEstimator,
                          X: pd.DataFrame, 
                          feature: Union[List[str], str]) -> pd.Series:
    """
    Partial dependence for `feature`.
    
    :param estimator: estimator that has been fit to data
    :param X: dataframe of features with shape (N_samples, N_features)
    :param feature: feature for which partial dependence is estimated
    :return: estimated partial dependence
    """
    _check_estimator(estimator)
    if isinstance(feature, list):
        feature = feature[0]
    assert feature in X.columns, f"`{feature}` column could not be found in the dataframe."
    
    X = X.copy()
    unique_vals = np.sort(X[feature].unique())
    res = pd.Series(np.zeros_like(unique_vals), index=unique_vals, name=feature)
    for i, val in enumerate(unique_vals):
        X[feature] = val
        if is_classifier(estimator):
            preds = estimator.predict_proba(X.values)[:, 1]
        else:
            preds = estimator.predict(X.values)
        res.iloc[i] = np.mean(preds, axis=0)
    return res
    

def _check_estimator(estimator: BaseEstimator) -> None:
    """
    Check if estimator has been fit to data and has required methods.
    
    :param estimator: estimator to check
    """
    assert isinstance(estimator, BaseEstimator), "Estimator is not an instance of `BaseEstimator`."
    
    if is_classifier(estimator):
        assert "predict_proba" in dir(estimator), "There is no `predict_proba` method."
    else:
        assert "predict" in dir(estimator), "There is no `predict` method."
        
    try:
        check_is_fitted(estimator)
    except NotFittedError:
        print("The estimator has not been fit to data. Please, fit the estimator to data first.")
```

We continue by defining `partial_dependence_2d` function that implements equation ($\ref{eq:partial_dependence_implementation}$) for two target features.


```python
def partial_dependence_2d(estimator: BaseEstimator,
                          X: pd.DataFrame, 
                          features: List[str]) -> pd.DataFrame:
    """
    Partial dependence for `features`.
    
    :param estimator: estimator that has been fit to data
    :param X: dataframe of features with shape (N_samples, N_features)
    :param feature: features for which partial dependence is estimated. Must be a list of length 2
    :return: estimated partial dependence
    """
    if len(features) != 2:
        raise ValueError(f"`features` should be a list of length two.")
    for feature in features:
        if not feature in X.columns:
            raise RuntimeError(f"{feature} not in dataframe.")
                    
    X = X.copy()
    unique_vals = np.sort(X[features[0]].unique())
    res = pd.DataFrame(columns=unique_vals)
    for i, val in enumerate(unique_vals):
        X[features[0]] = val
        partial_dependence = partial_dependence_1d(estimator, X, features[1])
        res.loc[:, val] = partial_dependence
    res.index = partial_dependence.index
    return res
```

Finally, we create the plotting function below.


```python
def partial_dependence_plot(estimator: BaseEstimator,
                            X: pd.DataFrame,
                            features: Union[str, List[str]],
                            figsize: Tuple=(10, 5)) -> plt.Figure:
    """
    Return partial dependence plot:
    - plot of partial dependence if `features` is a string or a list of length 1
    - contour plot of partial dependence if `features` is a list of length 2
    
    :param estimator: estimator that has been fit to data
    :param X: dataframe of features with shape (N_samples, N_features)
    :param feature: target feature(s)
    :param figsize: size of plot
    :return: partial dependence plot
    """
    if isinstance(features, str) or len(features)==1:
        return partial_dependence_plot_1d(estimator, X, features, figsize)
    return partial_dependence_plot_2d(estimator, X, features, figsize)


def partial_dependence_plot_1d(estimator: BaseEstimator,
                               X: pd.DataFrame,
                               feature: Union[str, List[str]],
                               figsize: Tuple=(10, 5)) -> plt.Figure:
    """
    Return partial dependence plot for a single target feature.
    
    :param estimator: estimator that has been fit to data
    :param X: dataframe of features with shape (N_samples, N_features)
    :param feature: target feature
    :param figsize: size of plot
    :return: partial dependence plot
    """
    if isinstance(feature, list):
        feature = feature[0]
    pd = partial_dependence_1d(estimator, X, feature)
    fig = plt.figure(figsize=figsize)
    plt.plot(pd)
    plt.ylabel("Partial Dependence")
    plt.xlabel(f"{pd.name}")
    if len(pd) < 10:
        plt.xticks(pd.index)
    plt.grid()
    plt.close()
    return fig


def partial_dependence_plot_2d(estimator: BaseEstimator,
                               X: pd.DataFrame,
                               features: List[str],
                               figsize: Tuple=(10, 5)) -> plt.Figure:
    """
    Return partial dependence plot for two target features.
    
    :param estimator: estimator that has been fit to data
    :param X: dataframe of features with shape (N_samples, N_features)
    :param feature: list of two features
    :param figsize: size of plot
    :return: partial dependence plot
    """
    pd = partial_dependence_2d(estimator, X, features)
    fig = plt.figure(figsize=figsize)
    plt.contourf(pd.columns, pd.index, pd)
    plt.colorbar()
    plt.xlabel(f"{features[0]}")
    plt.ylabel(f"{features[1]}")
    plt.close()
    return fig
```

To demonstrate what partial dependence plots actually look like, we will work with the heart failure clinical records dataset that can be downloaded [here](https://archive.ics.uci.edu/dataset/519/heart+failure+clinical+records). We will fit a random forest classifier to this dataset and then investigate the relationship between some of the explanatory variables and the predicted probabilities of positive class from the model using PDPs. 

Let us start by loading the dataset into pandas dataframe.


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



The dataset contains information about 299 patients who had heart failure. There are 13 clinical features that were collected in the period following the medical event:
- age: age of the patient (years);
- anaemia: decrease of red blood cells or hemoglobin (boolean);
- high blood pressure: if the patient has hypertension (boolean);
- creatinine phosphokinase  (CPK): level of the CPK enzyme in the blood (mcg/L);
- diabetes: if the patient has diabetes (boolean);
- ejection fraction: percentage of blood leaving the heart at each contraction  (percentage);
- platelets: platelets in the blood (kiloplatelets/mL);
- sex: woman or man (binary);
- serum creatinine: level of serum creatinine in the blood (mg/dL);
- serum sodium: level of serum sodium in the blood (mEq/L);
- smoking: if the patient smokes or not (boolean);
- time: follow-up period (days);
- [target] death event: if the patient deceased during the follow-up period (boolean).

Let us perform a quick look into the description of the dataset.


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



We can make the following observations:
- we are only dealing with numerical data;
- there are no missing observations;
- there is a mix of continuous and binary variables;
- the dataset is not balanced with the percentage of positive class observations equal to 32.1%;
- "time" is not a feature and can be dropped from further consideration.


```python
features = [col for col in df.columns if col not in ["time", "DEATH_EVENT"]]
target = "DEATH_EVENT"
```

As mentioned previously, the key assumption of the PDP methodology is that there is no correlation among target features, and between target features and remaining features. Therefore, below we plot the heatmap of Pearson's correlations between all pairs of features.


```python
sns.heatmap(df[features].corr(), cmap="crest")
plt.xticks(rotation=80);
```


**Figure 1. Correlation Heatmap**
<p align='center'>
    <img src='/assets/img/posts/partial_dependence_plots/correlation_matrix.png' width=800>
</p>
    


The only two variables with high pairwise correlation are "sex" and "smoking". Therefore, if we end up using any of these two features as our target features, we need to be careful when interpreting the resulting PDP. 

As random forest algorithm does not require any special data preprocessing, we can proceed by fitting the algorithm to our dataset. For the purposes of this exposition, we will fit the classifier to the whole dataset, i.e., we will not be leaving any data for validation or out-of-sample testing. While this will most certainly lead to overfitting, given the size of the dataset, the rationale is that we are only interested in investigating the learned relationships between explanatory variables and the output from the model. We do not plan to use the model for any other purposes. 


```python
estimator = RandomForestClassifier()
X = df[features].values
y = df[target].values
estimator.fit(X, y)
```






Having fitted the random forest algorithm to data, we can investigate PDPs for some of the features. According to "[Machine learning can predict survival of patients with heart failure from serum creatinine and ejection fraction alone](https://bmcmedinformdecismak.biomedcentral.com/articles/10.1186/s12911-020-1023-5)" by Chicco and Jurman (2020), that worked with the exact same dataset, the two most predictive features are "ejection_fraction" and "serum_creatinine". Therefore, we will only investigate partial dependence plots for these two features. Below we plot the PDP for "ejection_fraction" variable. 


```python
partial_dependence_plot(estimator, df[features], "ejection_fraction")
```




    
**Figure 2. Partial Dependence Plot. Ejection Fraction**
<p align='center'>
    <img src='/assets/img/posts/partial_dependence_plots/ejection_fraction_pdp.png' width=800>
</p>
    



From the partial dependence plot it becomes clear that the ejection fraction levels in the range from 35 to 60 appear to be associated with the highest probabilities of survival. According to "[Ejection Fraction: What the Numbers Mean](https://www.pennmedicine.org/updates/blogs/heart-and-vascular-blog/2022/april/ejection-fraction-what-the-numbers-mean#:~:text=What%20do%20ejection%20fraction%20numbers,cause%20of%20sudden%20cardiac%20arrest.)" by Penn Medicine (2022), 
- ejection fraction in the range from 55 to 70%: normal heart function;
- ejection fraction in the range from 40 to 55%: below normal heart function. Can indicate previous heart damage from heart attack or cardiomyopathy;
- ejection fraction higher than 75%: can indicate a heart condition like hypertrophic cardiomyopathy, a common cause of sudden cardiac arrest;
- ejection fraction less than 40%: may confirm the diagnosis of heart failure.

Therefore, the relationship learned by the model between "ejection_fraction" feature and the probability that a patient dies post heart failure appears valid and is confirmed by an independent source. 

We proceed by plotting partial dependence plot for "serum_creatinine". 


```python
partial_dependence_plot(estimator, df[features], "serum_creatinine")
```




    
**Figure 3. Partial Dependence Plot. Serum Creatinine**
<p align='center'>
    <img src='/assets/img/posts/partial_dependence_plots/serum_creatinine_pdp.png' width=800>
</p>
    



It is clear from the above plot that higher measurements of serum creatinine are associated with lower probabilities of survival. Serum creatinine levels below 1.5 are the "safest". According to the [article](https://www.mayoclinic.org/tests-procedures/creatinine-test/about/pac-20384646) by Mayo Clinic on serum creatinine, the typical ranges are:
- adult men: 0.74 to 1.35 mg/dL;
- adult women: 0.59 to 1.04 mg/dL.

Thus, the relationship between serum creatinine and probability of death is correctly captured by the random forest algorithm. 

Finally, we plot partial dependence plot for a pair of "ejection_fraction" and "serum_creatinine" variables. 


```python
partial_dependence_plot(estimator, df[features], ["serum_creatinine", "ejection_fraction"])
```




    
**Figure 4. Partial Dependence Plot. Serum Creatinine and Ejection Fraction**
<p align='center'>
    <img src='/assets/img/posts/partial_dependence_plots/contour_plot.png' width=800>
</p>
    



The resulting contour plot comes with no surprises. As such, patients with the highest probability of survival have ejection fractions in the range from 35% to 60% with serum creatinine readings below 1 mg/dL. On the other hand, for serum creatinine levels above 2 mg/dL, patients with either very low or very high ejection fractions are associated with the highest probabilities of dying. 
