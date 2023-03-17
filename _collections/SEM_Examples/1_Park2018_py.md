---
layout: single
author_profile: true
title: "1-Progression of Dengue illness phenotype (using Park et al 2018 data) in Python"
categories: ['SEM','CB-SEM','Python']
shorttitle: "SEM_Park2018_py"
shortdesc: "Modelling progression of the dengue illness phenotype. Replication of the SEM analysis presented in 
Park, S., Srikiatkhachorn, A., Kalayanarooj, S., Macareo, L., Green, S., Friedman, J. F., & Rothman, A. L. (2018)."
Method: "CB-SEM using Python's `semopy` Package."
Case: "a partial replication of an intermediary step in modelling
progression of the dengue illness phenotype."
Case_code: 'Park_2018'
Datafrom: "Park S, Srikiatkhachorn A, Kalayanarooj S, Macareo L, Green
S, Friedman JF, et al. (2018). Use of structural equation models to
predict dengue illness phenotype. PLoS Negl Trop Dis 12 (10): e0006799.
<https://doi.org/10.1371/journal>. pntd.0006799"
image: "https://github.com/TomoeGusberti/tomoegusberti.github.io/blob/master/_collections/SEM_Examples/1_Park2018_files/Park2018_py.png?raw=true"
excerpt: "Code examples using Python"
header:
  overlay_color: "#333"
permalink: /collections/SEM_Examples/1_Park2018_py
author: "Tomoe Gusberti"
date: "2022-10-07"
output: 
  html_document:
    keep_md: true
editor_options: 
  markdown: 
    wrap: 72
---

# Objective

Modelling progression of the dengue illness phenotype. Replication of
the SEM analysis presented in:

Park, S., Srikiatkhachorn, A., Kalayanarooj, S., Macareo, L., Green, S.,
Friedman, J. F., & Rothman, A. L. (2018). Use of structural equation
models to predict dengue illness phenotype. PLoS Neglected Tropical
Diseases, 12(10), 1--14. <https://doi.org/10.1371/journal.pntd.0006799>

The paper was worried about the evolution of the Dengue virus (DENV)
infection, which, in severe cases, lead to Dengue Hemorrhagic Fever
(DHF), characterized by fever, plasma leakage, bleeding diathesis and
trombocytopenia. Platelet counts and hepatic parameters like ALT were
monitored in three moments of time to model the progression of the
phenotype in dengue illness.

## Tools and methods

**Original method:** SEM using Mplus 8 statistical software. SEM
parameters were estimated using the weighted least squares means and
variances adjusted estimator with the theta parameterization

**Method applied in this analysis:** CB-SEM with 'DWLS' (Diagonally
Weighted Least Squares) estimator in Pythons's package `semopy`.

As originally this .md was exported from a RMarkdown, it uses R's
package `reticulate` to run python.



And the python package for CB-SEM used is `semopy`




```python
import semopy
```

# Data acquisition


```python
import pandas as pd
data = pd.read_excel("Park2018.xlsx")
data['age_t']=data['age2'].str.extract('(\d+)')
data['age_t']=data['age_t'].astype(float)
```

# Model

In this markdown, for shortness, the optimization steps are omitted, and
we go directly to an adjusted model:


```python
model="""
# structural part
## the influence of all time -1 in dhf
dhf~alt_m1+max_hct_m1+platelets_m1
## the influence of all time -2 variables in time -1 variables
alt_m1~alt_m3+ast_m3
max_hct_m1~wbc_m3+max_hct_m3+lymph_m3+age_t
platelets_m1~wbc_m3+platelets_m3
## age as possible influential factor for -3 (baseline) levels
alt_m3~age_t
max_hct_m3~age_t

# covariances
## variables at time -3 correlating each other
ast_m3~~wbc_m3+platelets_m3 
"""
mod = semopy.Model(model)
```

# SEM

For optimization, we employ 'DWLS' (Diagonally Weighted Least Squares -
also known as robust WLS) estimator. WLS is also known for Asymptotic
Distribution-Free Estimator.


```python
res = mod.fit(data, obj="DWLS")
print(res)
```

```
## Name of objective: DWLS
## Optimization method: SLSQP
## Optimization successful.
## Optimization terminated successfully
## Objective value: 0.209
## Number of iterations: 57
## Params: 0.001 0.022 -0.000 1.795 1.000 -0.000 0.591 -0.043 0.227 5.662 0.607 1.735 0.379 -33246.649 -656491.391 348.077 9.497 1487.481 0.131 3281007555.300 8.347
```

Let's inspect the parameter estimates, with standardized coefficients.
This standardization is important to better assess the relative
importance of the variables in the model, as the original variables have
different numerical magnitudes in the scale.


```python
print(mod.inspect(std_est=True).to_markdown())
```

```
## |    | lval         | op   | rval         |          Estimate |   Est. Std |         Std. Err |   z-value |     p-value |
## |---:|:-------------|:-----|:-------------|------------------:|-----------:|-----------------:|----------:|------------:|
## |  0 | alt_m1       | ~    | alt_m3       |       1.79503     |   0.526453 |      0.123808    |  14.4985  | 0           |
## |  1 | alt_m1       | ~    | ast_m3       |       0.999859    |   0.624984 |      0.0580907   |  17.212   | 0           |
## |  2 | max_hct_m1   | ~    | wbc_m3       |      -0.00019341  |  -0.186285 |      5.58961e-05 |  -3.46017 | 0.00053984  |
## |  3 | max_hct_m1   | ~    | max_hct_m3   |       0.590561    |   0.458327 |      0.0665372   |   8.87565 | 0           |
## |  4 | max_hct_m1   | ~    | lymph_m3     |      -0.0425822   |  -0.176098 |      0.0136259   |  -3.1251  | 0.00177743  |
## |  5 | max_hct_m1   | ~    | age_t        |       0.227214    |   0.176829 |      0.0739312   |   3.07332 | 0.0021169   |
## |  6 | platelets_m1 | ~    | wbc_m3       |       5.66221     |   0.263295 |      0.991856    |   5.7087  | 1.13841e-08 |
## |  7 | platelets_m1 | ~    | platelets_m3 |       0.606823    |   0.586877 |      0.0476892   |  12.7245  | 0           |
## |  8 | alt_m3       | ~    | age_t        |       1.73547     |   0.279739 |      0.371538    |   4.67105 | 2.99671e-06 |
## |  9 | max_hct_m3   | ~    | age_t        |       0.379131    |   0.380186 |      0.0575341   |   6.58967 | 4.40805e-11 |
## | 10 | dhf          | ~    | alt_m1       |       0.00108203  |   0.179761 |      0.000344737 |   3.13871 | 0.00169692  |
## | 11 | dhf          | ~    | max_hct_m1   |       0.0222176   |   0.224212 |      0.00567704  |   3.91358 | 9.09371e-05 |
## | 12 | dhf          | ~    | platelets_m1 |      -1.16768e-06 |  -0.244079 |      2.75992e-07 |  -4.23083 | 2.32833e-05 |
## | 13 | ast_m3       | ~~   | wbc_m3       |  -33246.6         |  -0.207074 |   8242.24        |  -4.03369 | 5.49076e-05 |
## | 14 | ast_m3       | ~~   | platelets_m3 | -656491           |  -0.196597 | 182101           |  -3.60509 | 0.000312049 |
## | 15 | alt_m3       | ~~   | alt_m3       |     348.077       |   0.921746 |     30.7061      |  11.3358  | 0           |
## | 16 | max_hct_m1   | ~~   | max_hct_m1   |       9.49689     |   0.586248 |      0.83778     |  11.3358  | 0           |
## | 17 | alt_m1       | ~~   | alt_m1       |    1487.48        |   0.338816 |    131.22        |  11.3358  | 0           |
## | 18 | platelets_m1 | ~~   | platelets_m1 |       3.28101e+09 |   0.472087 |      2.89438e+08 |  11.3358  | 0           |
## | 19 | max_hct_m3   | ~~   | max_hct_m3   |       8.34678     |   0.855458 |      0.736321    |  11.3358  | 0           |
## | 20 | dhf          | ~~   | dhf          |       0.131203    |   0.824841 |      0.0115743   |  11.3358  | 0           |
```

## Visualization

Visualization with standard estimates.


```python
g = semopy.semplot(mod, "./1_Park2018_files/Park2018_py.png",std_ests=True)
```



![Park2018_py.png](https://github.com/TomoeGusberti/tomoegusberti.github.io/blob/master/_collections/SEM_Examples/1_Park2018_files/Park2018_py.png?raw=true)

Note:

-   the measures at time -1 day defining DHF are ALT, max HCT
    (hematocrit), and platelet count.

-   the age has indirect effect on DHF through max HCT, and ALT at day
    -3 (which in turn define alt at day-1)

-   the white blood cell and lymphocytes count also have indirect
    effect, thought platelet and HCT levels, and HCT level,
    respectively.

## Fit measures

We observe the adjusted model fits well.


```python
stats = semopy.calc_stats(mod)
print(stats.T)
```

```
##                     Value
## DoF             45.000000
## DoF Baseline    60.000000
## chi2            53.665873
## chi2 p-value     0.176204
## chi2 Baseline  745.885420
## CFI              0.987365
## GFI              0.928051
## AGFI             0.904068
## NFI              0.928051
## TLI              0.983154
## RMSEA            0.027427
## AIC             36.554261
## BIC            111.084859
## LogLik           2.722870
```
