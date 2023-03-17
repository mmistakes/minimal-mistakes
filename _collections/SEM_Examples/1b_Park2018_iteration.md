---
layout: single
author_profile: true
title: "1_Iteration cycle in CB-Structural Equation Modelling"
categories: ['SEM','CB-SEM','R','Causality']
shorttitle: "SEM_Park2018"
shortdesc: "Example of iteration cycle in CB-Structural Equation Modelling"
Method: "CB-SEM using R's `Lavaan` Package. The visualization was
generated using the `semPlots`'s Package."
Case: "Focused discussion of the partial replication of an intermediary step in modelling progression of the dengue illness phenotype. Original study: 
Park, S., Srikiatkhachorn, A., Kalayanarooj, S., Macareo, L., Green, S., Friedman, J. F., & Rothman, A. L. (2018)."
Case_code: 'Park_2018'
Datafrom: "Park S, Srikiatkhachorn A, Kalayanarooj S, Macareo L, Green
S, Friedman JF, et al. (2018). Use of structural equation models to
predict dengue illness phenotype. PLoS Negl Trop Dis 12 (10): e0006799.
<https://doi.org/10.1371/journal>. pntd.0006799"
image: "https://github.com/TomoeGusberti/tomoegusberti.github.io/blob/master/_collections/SEM_Examples/1_Park2018_files/Park2018_iteration0.png?raw=true"
excerpt: "Some code examples using R"
header:
  overlay_color: "#333"
permalink: /collections/SEM_Examples/1_Park2018_iteration
date: "2022-05-27"
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
infection, which, in severe cases, leads to Dengue Haemorrhagic Fever
(DHF), characterized by fever, plasma leakage, bleeding diathesis, and
thrombocytopenia. Platelet counts and hepatic parameters like ALT were
monitored in three moments of time to model the progression of the
phenotype in dengue illness.

**Original method:** SEM using Mplus 8 statistical software. SEM
parameters were estimated using the weighted least squares means and
variances adjusted estimator with the theta parameterization

**Method applied in this analysis:** CB-SEM with MLR estimator in R's
package `Lavaan`. For simplicity, we are not discussing weighted models
yet in this post. So, note this is not an exact replication. We are
taking a lot of freedom in adjusting models and analysis here.

# Data acquisition


```r
library(openxlsx)
data<-read.xlsx("Park2018.xlsx")
```



Let's explore the data structure.


```r
str(data)
```

```
## 'data.frame':	257 obs. of  22 variables:
##  $ age2        : chr  "12-13" "4-5" "4-5" "8-9" ...
##  $ sex         : num  1 1 2 2 1 1 1 1 2 2 ...
##  $ dengue      : num  1 1 0 1 1 0 1 1 1 1 ...
##  $ dhf         : num  1 0 0 0 0 0 0 0 0 0 ...
##  $ dhf34       : num  0 0 0 0 0 0 0 0 0 0 ...
##  $ ast_m3      : num  25 38 27 167 29 39 32 48 36 35 ...
##  $ alt_m3      : num  10 14 9 109 13 15 10 23 18 16 ...
##  $ wbc_m3      : num  3600 7200 9200 2200 9500 8000 5200 5000 2800 6000 ...
##  $ lymph_m3    : num  16 21 13 34 7 21 16 18 37 11 ...
##  $ albumin_m3  : num  4.5 5.6 4.6 4.8 5 5.9 4.6 3.9 4 4.2 ...
##  $ max_hct_m3  : num  42.5 38 37 40 38 40 42.5 39 38 40 ...
##  $ platelets_m3: num  271000 272000 216000 227000 204000 287000 266000 307000 206000 273000 ...
##  $ tourn_no_m3 : num  21 21 10 21 5 8 21 4 6 4 ...
##  $ ast_m1      : num  53 36 26 248 34 35 43 43 240 97 ...
##  $ alt_m1      : num  15 14 11 174 14 11 9 24 126 28 ...
##  $ wbc_m1      : num  2300 5100 3800 1600 6500 7300 2800 3800 600 3300 ...
##  $ lymph_m1    : num  32 60 41 39 61 45 24 35 42 32 ...
##  $ albumin_m1  : num  4.3 4.6 3.7 4.5 4.9 4.9 3.9 3.8 4.4 4.5 ...
##  $ max_hct_m1  : num  43 39 37 40 36 37 41 39 38 45 ...
##  $ platelets_m1: num  73000 263000 200000 116000 163000 262000 168000 147000 180000 106000 ...
##  $ tourn_no_m1 : num  21 21 0 21 2 4 21 20 14 21 ...
##  $ age_t       : num  12 4 4 8 6 4 8 8 4 6 ...
```

In this dataset, outcomes cannot be described by a single parameter, but
by a set of complementary and possibly multicollinear parameters. Note
also that the parameters are monitored and assessed multiple times over
a specific period, as the time for results to become apparent can also
vary. Such sequential measures are certainly associated. Notably, the
intervention improves or worsens, but the ultimate level of results
depends on the initial measure.

The same parameters (like platelet count and ALT levels) are assessed 3
days and 1 day before the event (indicated with m3 and m1 at the end of
the variable name).

# initial model:


```r
library(lavaan)
model="
  dhf~ast_m1+alt_m1+wbc_m1+lymph_m1+albumin_m1+max_hct_m1+platelets_m1+tourn_no_m1
  ast_m1~ast_m3  
  alt_m1~alt_m3
  wbc_m1~wbc_m3
  lymph_m1~lymph_m3
  albumin_m1~albumin_m3
  max_hct_m1~max_hct_m3
  platelets_m1~platelets_m3
  tourn_no_m1~tourn_no_m3
  
  alt_m3~age_t
  wbc_m3~age_t
  lymph_m3~age_t
  max_hct_m3~age_t
  platelets_m3~age_t
  tourn_no_m3~age_t
  
  "
fit=sem(model=model, data=data,std.ov=TRUE,estimator="MLR",fixed.x = FALSE)
```

the model reflect:

-   causal relation among DHF (dengue hemorrhagic fever) and measures 1
    day before the event

-   the measures at 1 day before the event as potentially influenced by
    the same variable, measured at 3 days before the event.

-   hypotheses about the influence of age on measures at m3

-   For now, we are ignoring that measurements can be correlated with each other (eg ALT and AST are known enzymes associated with hepatotoxicity, for example).

## Visualization

Visualization was generated using R's package `semPlots`, with some
adjustment of the coordinates for each of the variables, and also adding
p values for paths.

Visualization generated with R's package `semPlots` is the following:


```r
#17 nodes
ly<-matrix(NA,18,2)
depVar='dhf'
med1=c('ast_m1','alt_m1','wbc_m1','lymph_m1','albumin_m1','max_hct_m1','platelets_m1','tourn_no_m1')
med2=c('ast_m3','alt_m3','wbc_m3','lymph_m3','albumin_m3','max_hct_m3','platelets_m3','tourn_no_m3')
indepVar='age_t'
labels=c()
labels[1]=depVar
ly[1,]=c(1,0)
y=1
for (x in c(1:length(med1))){
  ly[y+x,]=c(0.6,(x/8*1.6-1))
  labels[(x+y)]<-med1[x]
}
y=9
for (x in c(1:length(med2))){
  ly[y+x,]=c(-1,(x/8*1.6-1))
  labels[(x+y)]<-med2[x]
}
labels[18]=indepVar
ly[18,]=c(-0.5,1)

table2<-parameterEstimates(fit,standardized=TRUE)%>%as.data.frame()
table2<-table2[!table2$lhs==table2$rhs,]
b<-gettextf('%.3f \n p=%.3f', table2$std.all, digits=table2$pvalue)

semPaths(fit, layout=ly,
         edgeLabels=b,
         residuals=FALSE,
         style='ram',
         what='est',
         whatLabels = "std",
         cut=0.3,
         sizeMan = 10, # Size of manifest variables
  sizeMan2=3,edge.label.cex = 0.8,label.cex=1,
  
  nCharNodes = 0,fade=TRUE,
  mar = c(1,3,1,3))
```

![](1b_Park2018_iteration_files/figure-html/unnamed-chunk-5-1.png)<!-- -->
![InitialModel](https://github.com/TomoeGusberti/tomoegusberti.github.io/blob/master/_collections/SEM_Examples/1_Park2018_files/Park2018_iteration0.png?raw=true)

## Parameter table

The summarization on fit measures and parameter estimates are presented
bellow. 


```r
summary(fit, fit.measures=TRUE)
```

```
## lavaan 0.6-12 ended normally after 1 iterations
## 
##   Estimator                                         ML
##   Optimization method                           NLMINB
##   Number of model parameters                        43
## 
##   Number of observations                           257
## 
## Model Test User Model:
##                                               Standard      Robust
##   Test Statistic                               935.588     688.731
##   Degrees of freedom                               128         128
##   P-value (Chi-square)                           0.000       0.000
##   Scaling correction factor                                  1.358
##     Yuan-Bentler correction (Mplus variant)                       
## 
## Model Test Baseline Model:
## 
##   Test statistic                              2022.763    1286.756
##   Degrees of freedom                               150         150
##   P-value                                        0.000       0.000
##   Scaling correction factor                                  1.572
## 
## User Model versus Baseline Model:
## 
##   Comparative Fit Index (CFI)                    0.569       0.507
##   Tucker-Lewis Index (TLI)                       0.495       0.422
##                                                                   
##   Robust Comparative Fit Index (CFI)                         0.574
##   Robust Tucker-Lewis Index (TLI)                            0.500
## 
## Loglikelihood and Information Criteria:
## 
##   Loglikelihood user model (H0)              -6006.068   -6006.068
##   Scaling correction factor                                  4.208
##       for the MLR correction                                      
##   Loglikelihood unrestricted model (H1)      -5538.274   -5538.274
##   Scaling correction factor                                  2.075
##       for the MLR correction                                      
##                                                                   
##   Akaike (AIC)                               12098.136   12098.136
##   Bayesian (BIC)                             12250.747   12250.747
##   Sample-size adjusted Bayesian (BIC)        12114.424   12114.424
## 
## Root Mean Square Error of Approximation:
## 
##   RMSEA                                          0.157       0.131
##   90 Percent confidence interval - lower         0.147       0.122
##   90 Percent confidence interval - upper         0.166       0.139
##   P-value RMSEA <= 0.05                          0.000       0.000
##                                                                   
##   Robust RMSEA                                               0.152
##   90 Percent confidence interval - lower                     0.141
##   90 Percent confidence interval - upper                     0.163
## 
## Standardized Root Mean Square Residual:
## 
##   SRMR                                           0.167       0.167
## 
## Parameter Estimates:
## 
##   Standard errors                             Sandwich
##   Information bread                           Observed
##   Observed information based on                Hessian
## 
## Regressions:
##                    Estimate  Std.Err  z-value  P(>|z|)
##   dhf ~                                               
##     ast_m1            0.076    0.112    0.674    0.500
##     alt_m1            0.082    0.104    0.784    0.433
##     wbc_m1            0.006    0.057    0.101    0.920
##     lymph_m1         -0.082    0.058   -1.411    0.158
##     albumin_m1        0.022    0.059    0.379    0.704
##     max_hct_m1        0.186    0.058    3.224    0.001
##     platelets_m1     -0.215    0.064   -3.358    0.001
##     tourn_no_m1       0.156    0.058    2.665    0.008
##   ast_m1 ~                                            
##     ast_m3            0.611    0.111    5.506    0.000
##   alt_m1 ~                                            
##     alt_m3            0.639    0.185    3.450    0.001
##   wbc_m1 ~                                            
##     wbc_m3            0.735    0.051   14.423    0.000
##   lymph_m1 ~                                          
##     lymph_m3          0.419    0.058    7.265    0.000
##   albumin_m1 ~                                        
##     albumin_m3        0.531    0.056    9.456    0.000
##   max_hct_m1 ~                                        
##     max_hct_m3        0.581    0.073    7.953    0.000
##   platelets_m1 ~                                      
##     platelets_m3      0.660    0.056   11.762    0.000
##   tourn_no_m1 ~                                       
##     tourn_no_m3       0.526    0.051   10.302    0.000
##   alt_m3 ~                                            
##     age_t             0.100    0.056    1.788    0.074
##   wbc_m3 ~                                            
##     age_t            -0.186    0.053   -3.523    0.000
##   lymph_m3 ~                                          
##     age_t            -0.345    0.061   -5.639    0.000
##   max_hct_m3 ~                                        
##     age_t             0.341    0.061    5.618    0.000
##   platelets_m3 ~                                      
##     age_t            -0.274    0.062   -4.422    0.000
##   tourn_no_m3 ~                                       
##     age_t             0.116    0.062    1.866    0.062
## 
## Covariances:
##                    Estimate  Std.Err  z-value  P(>|z|)
##   ast_m3 ~~                                           
##     albumin_m3       -0.188    0.080   -2.360    0.018
##     age_t            -0.036    0.060   -0.594    0.553
##   albumin_m3 ~~                                       
##     age_t             0.068    0.060    1.136    0.256
## 
## Variances:
##                    Estimate  Std.Err  z-value  P(>|z|)
##    .dhf               0.781    0.075   10.464    0.000
##    .ast_m1            0.624    0.408    1.532    0.125
##    .alt_m1            0.590    0.165    3.577    0.000
##    .wbc_m1            0.458    0.061    7.460    0.000
##    .lymph_m1          0.821    0.082   10.067    0.000
##    .albumin_m1        0.716    0.091    7.905    0.000
##    .max_hct_m1        0.659    0.082    7.998    0.000
##    .platelets_m1      0.562    0.052   10.910    0.000
##    .tourn_no_m1       0.721    0.055   13.124    0.000
##    .alt_m3            0.986    0.409    2.411    0.016
##    .wbc_m3            0.962    0.248    3.882    0.000
##    .lymph_m3          0.878    0.083   10.547    0.000
##    .max_hct_m3        0.880    0.099    8.869    0.000
##    .platelets_m3      0.922    0.091   10.103    0.000
##    .tourn_no_m3       0.983    0.060   16.407    0.000
##     ast_m3            0.996    0.428    2.329    0.020
##     albumin_m3        0.996    0.102    9.727    0.000
##     age_t             0.996    0.068   14.642    0.000
```

The fit measures can be also extracted using:


```r
fitmeasures(fit)
```

```
##                          npar                          fmin 
##                        43.000                         1.820 
##                         chisq                            df 
##                       935.588                       128.000 
##                        pvalue                  chisq.scaled 
##                         0.000                       688.731 
##                     df.scaled                 pvalue.scaled 
##                       128.000                         0.000 
##          chisq.scaling.factor                baseline.chisq 
##                         1.358                      2022.763 
##                   baseline.df               baseline.pvalue 
##                       150.000                         0.000 
##         baseline.chisq.scaled            baseline.df.scaled 
##                      1286.756                       150.000 
##        baseline.pvalue.scaled baseline.chisq.scaling.factor 
##                         0.000                         1.572 
##                           cfi                           tli 
##                         0.569                         0.495 
##                          nnfi                           rfi 
##                         0.495                         0.458 
##                           nfi                          pnfi 
##                         0.537                         0.459 
##                           ifi                           rni 
##                         0.574                         0.569 
##                    cfi.scaled                    tli.scaled 
##                         0.507                         0.422 
##                    cfi.robust                    tli.robust 
##                         0.574                         0.500 
##                   nnfi.scaled                   nnfi.robust 
##                         0.422                         0.500 
##                    rfi.scaled                    nfi.scaled 
##                         0.373                         0.465 
##                    ifi.scaled                    rni.scaled 
##                         0.516                         0.507 
##                    rni.robust                          logl 
##                         0.574                     -6006.068 
##             unrestricted.logl                           aic 
##                     -5538.274                     12098.136 
##                           bic                        ntotal 
##                     12250.747                       257.000 
##                          bic2             scaling.factor.h1 
##                     12114.424                         2.075 
##             scaling.factor.h0                         rmsea 
##                         4.208                         0.157 
##                rmsea.ci.lower                rmsea.ci.upper 
##                         0.147                         0.166 
##                  rmsea.pvalue                  rmsea.scaled 
##                         0.000                         0.131 
##         rmsea.ci.lower.scaled         rmsea.ci.upper.scaled 
##                         0.122                         0.139 
##           rmsea.pvalue.scaled                  rmsea.robust 
##                         0.000                         0.152 
##         rmsea.ci.lower.robust         rmsea.ci.upper.robust 
##                         0.141                         0.163 
##           rmsea.pvalue.robust                           rmr 
##                            NA                         0.166 
##                    rmr_nomean                          srmr 
##                         0.166                         0.167 
##                  srmr_bentler           srmr_bentler_nomean 
##                         0.167                         0.167 
##                          crmr                   crmr_nomean 
##                         0.176                         0.176 
##                    srmr_mplus             srmr_mplus_nomean 
##                         0.167                         0.167 
##                         cn_05                         cn_01 
##                        43.689                        47.185 
##                           gfi                          agfi 
##                         0.746                         0.661 
##                          pgfi                           mfi 
##                         0.558                         0.208 
##                          ecvi 
##                         3.975
```

And parameter estimates can also obtained by:


```r
parameterestimates(fit,standardized = TRUE)
```

```
##             lhs op          rhs    est    se      z pvalue ci.lower ci.upper
## 1           dhf  ~       ast_m1  0.076 0.112  0.674  0.500   -0.144    0.295
## 2           dhf  ~       alt_m1  0.082 0.104  0.784  0.433   -0.122    0.285
## 3           dhf  ~       wbc_m1  0.006 0.057  0.101  0.920   -0.107    0.118
## 4           dhf  ~     lymph_m1 -0.082 0.058 -1.411  0.158   -0.195    0.032
## 5           dhf  ~   albumin_m1  0.022 0.059  0.379  0.704   -0.093    0.138
## 6           dhf  ~   max_hct_m1  0.186 0.058  3.224  0.001    0.073    0.299
## 7           dhf  ~ platelets_m1 -0.215 0.064 -3.358  0.001   -0.341   -0.090
## 8           dhf  ~  tourn_no_m1  0.156 0.058  2.665  0.008    0.041    0.270
## 9        ast_m1  ~       ast_m3  0.611 0.111  5.506  0.000    0.393    0.828
## 10       alt_m1  ~       alt_m3  0.639 0.185  3.450  0.001    0.276    1.002
## 11       wbc_m1  ~       wbc_m3  0.735 0.051 14.423  0.000    0.635    0.835
## 12     lymph_m1  ~     lymph_m3  0.419 0.058  7.265  0.000    0.306    0.532
## 13   albumin_m1  ~   albumin_m3  0.531 0.056  9.456  0.000    0.421    0.641
## 14   max_hct_m1  ~   max_hct_m3  0.581 0.073  7.953  0.000    0.438    0.725
## 15 platelets_m1  ~ platelets_m3  0.660 0.056 11.762  0.000    0.550    0.770
## 16  tourn_no_m1  ~  tourn_no_m3  0.526 0.051 10.302  0.000    0.426    0.626
## 17       alt_m3  ~        age_t  0.100 0.056  1.788  0.074   -0.010    0.210
## 18       wbc_m3  ~        age_t -0.186 0.053 -3.523  0.000   -0.289   -0.082
## 19     lymph_m3  ~        age_t -0.345 0.061 -5.639  0.000   -0.464   -0.225
## 20   max_hct_m3  ~        age_t  0.341 0.061  5.618  0.000    0.222    0.460
## 21 platelets_m3  ~        age_t -0.274 0.062 -4.422  0.000   -0.395   -0.152
## 22  tourn_no_m3  ~        age_t  0.116 0.062  1.866  0.062   -0.006    0.237
## 23          dhf ~~          dhf  0.781 0.075 10.464  0.000    0.635    0.927
## 24       ast_m1 ~~       ast_m1  0.624 0.408  1.532  0.125   -0.174    1.423
## 25       alt_m1 ~~       alt_m1  0.590 0.165  3.577  0.000    0.267    0.913
## 26       wbc_m1 ~~       wbc_m1  0.458 0.061  7.460  0.000    0.338    0.578
## 27     lymph_m1 ~~     lymph_m1  0.821 0.082 10.067  0.000    0.661    0.981
## 28   albumin_m1 ~~   albumin_m1  0.716 0.091  7.905  0.000    0.538    0.893
## 29   max_hct_m1 ~~   max_hct_m1  0.659 0.082  7.998  0.000    0.498    0.821
## 30 platelets_m1 ~~ platelets_m1  0.562 0.052 10.910  0.000    0.461    0.663
## 31  tourn_no_m1 ~~  tourn_no_m1  0.721 0.055 13.124  0.000    0.613    0.828
## 32       alt_m3 ~~       alt_m3  0.986 0.409  2.411  0.016    0.184    1.788
## 33       wbc_m3 ~~       wbc_m3  0.962 0.248  3.882  0.000    0.476    1.447
## 34     lymph_m3 ~~     lymph_m3  0.878 0.083 10.547  0.000    0.715    1.041
## 35   max_hct_m3 ~~   max_hct_m3  0.880 0.099  8.869  0.000    0.686    1.075
## 36 platelets_m3 ~~ platelets_m3  0.922 0.091 10.103  0.000    0.743    1.100
## 37  tourn_no_m3 ~~  tourn_no_m3  0.983 0.060 16.407  0.000    0.865    1.100
## 38       ast_m3 ~~       ast_m3  0.996 0.428  2.329  0.020    0.158    1.834
## 39       ast_m3 ~~   albumin_m3 -0.188 0.080 -2.360  0.018   -0.344   -0.032
## 40       ast_m3 ~~        age_t -0.036 0.060 -0.594  0.553   -0.153    0.082
## 41   albumin_m3 ~~   albumin_m3  0.996 0.102  9.727  0.000    0.795    1.197
## 42   albumin_m3 ~~        age_t  0.068 0.060  1.136  0.256   -0.050    0.186
## 43        age_t ~~        age_t  0.996 0.068 14.642  0.000    0.863    1.129
##    std.lv std.all std.nox
## 1   0.076   0.079   0.079
## 2   0.082   0.085   0.085
## 3   0.006   0.006   0.006
## 4  -0.082  -0.085  -0.085
## 5   0.022   0.023   0.023
## 6   0.186   0.194   0.194
## 7  -0.215  -0.225  -0.225
## 8   0.156   0.163   0.163
## 9   0.611   0.611   0.612
## 10  0.639   0.639   0.639
## 11  0.735   0.735   0.735
## 12  0.419   0.419   0.419
## 13  0.531   0.531   0.532
## 14  0.581   0.581   0.581
## 15  0.660   0.660   0.660
## 16  0.526   0.526   0.526
## 17  0.100   0.100   0.100
## 18 -0.186  -0.186  -0.186
## 19 -0.345  -0.345  -0.345
## 20  0.341   0.341   0.342
## 21 -0.274  -0.274  -0.274
## 22  0.116   0.116   0.116
## 23  0.781   0.856   0.856
## 24  0.624   0.627   0.627
## 25  0.590   0.592   0.592
## 26  0.458   0.460   0.460
## 27  0.821   0.824   0.824
## 28  0.716   0.718   0.718
## 29  0.659   0.662   0.662
## 30  0.562   0.565   0.565
## 31  0.721   0.724   0.724
## 32  0.986   0.990   0.990
## 33  0.962   0.965   0.965
## 34  0.878   0.881   0.881
## 35  0.880   0.883   0.883
## 36  0.922   0.925   0.925
## 37  0.983   0.987   0.987
## 38  0.996   1.000   0.996
## 39 -0.188  -0.189  -0.188
## 40 -0.036  -0.036  -0.036
## 41  0.996   1.000   0.996
## 42  0.068   0.069   0.068
## 43  0.996   1.000   0.996
```

# Testing forced orthogonality

The lavaan's 'sem' function set the remaining paths free for covariance estimation. But in some tools, like in those interface/graphics- oriented tools, not drawn covariates are set as zero, forcing orthogonality. 
The following code attempt to do so using a lavaan's function just for illustration. Note how an error message is thrown.


```r
fit_forcedOrth=try(lavaan(model=model, data=data,std.ov=TRUE,estimator="MLR",fixed.x = FALSE,orthogonal.x=TRUE))
```

```
## Warning in lav_start_check_cov(lavpartable = lavpartable, start = START): lavaan WARNING: non-zero covariance element set to zero, due to fixed-to-zero variances
##                   variables involved are: ast_m3 albumin_m3
```

```
## Warning in lav_start_check_cov(lavpartable = lavpartable, start = START): lavaan WARNING: non-zero covariance element set to zero, due to fixed-to-zero variances
##                   variables involved are: ast_m3 age_t
```

```
## Warning in lav_start_check_cov(lavpartable = lavpartable, start = START): lavaan WARNING: non-zero covariance element set to zero, due to fixed-to-zero variances
##                   variables involved are: albumin_m3 age_t
```

```
##       [,1] [,2] [,3] [,4] [,5] [,6] [,7] [,8] [,9] [,10] [,11] [,12] [,13]
##  [1,]    0    0    0    0    0    0    0    0    0     0     0     0     0
##  [2,]    0    0    0    0    0    0    0    0    0     0     0     0     0
##  [3,]    0    0    0    0    0    0    0    0    0     0     0     0     0
##  [4,]    0    0    0    0    0    0    0    0    0     0     0     0     0
##  [5,]    0    0    0    0    0    0    0    0    0     0     0     0     0
##  [6,]    0    0    0    0    0    0    0    0    0     0     0     0     0
##  [7,]    0    0    0    0    0    0    0    0    0     0     0     0     0
##  [8,]    0    0    0    0    0    0    0    0    0     0     0     0     0
##  [9,]    0    0    0    0    0    0    0    0    0     0     0     0     0
## [10,]    0    0    0    0    0    0    0    0    0     0     0     0     0
## [11,]    0    0    0    0    0    0    0    0    0     0     0     0     0
## [12,]    0    0    0    0    0    0    0    0    0     0     0     0     0
## [13,]    0    0    0    0    0    0    0    0    0     0     0     0     0
## [14,]    0    0    0    0    0    0    0    0    0     0     0     0     0
## [15,]    0    0    0    0    0    0    0    0    0     0     0     0     0
## [16,]    0    0    0    0    0    0    0    0    0     0     0     0     0
## [17,]    0    0    0    0    0    0    0    0    0     0     0     0     0
## [18,]    0    0    0    0    0    0    0    0    0     0     0     0     0
##       [,14] [,15] [,16] [,17] [,18]
##  [1,]     0     0     0     0     0
##  [2,]     0     0     0     0     0
##  [3,]     0     0     0     0     0
##  [4,]     0     0     0     0     0
##  [5,]     0     0     0     0     0
##  [6,]     0     0     0     0     0
##  [7,]     0     0     0     0     0
##  [8,]     0     0     0     0     0
##  [9,]     0     0     0     0     0
## [10,]     0     0     0     0     0
## [11,]     0     0     0     0     0
## [12,]     0     0     0     0     0
## [13,]     0     0     0     0     0
## [14,]     0     0     0     0     0
## [15,]     0     0     0     0     0
## [16,]     0     0     0     0     0
## [17,]     0     0     0     0     0
## [18,]     0     0     0     0     0
##       [,1] [,2] [,3] [,4] [,5] [,6] [,7] [,8] [,9] [,10] [,11] [,12] [,13]
##  [1,]    0    0    0    0    0    0    0    0    0     0     0     0     0
##  [2,]    0    0    0    0    0    0    0    0    0     0     0     0     0
##  [3,]    0    0    0    0    0    0    0    0    0     0     0     0     0
##  [4,]    0    0    0    0    0    0    0    0    0     0     0     0     0
##  [5,]    0    0    0    0    0    0    0    0    0     0     0     0     0
##  [6,]    0    0    0    0    0    0    0    0    0     0     0     0     0
##  [7,]    0    0    0    0    0    0    0    0    0     0     0     0     0
##  [8,]    0    0    0    0    0    0    0    0    0     0     0     0     0
##  [9,]    0    0    0    0    0    0    0    0    0     0     0     0     0
## [10,]    0    0    0    0    0    0    0    0    0     0     0     0     0
## [11,]    0    0    0    0    0    0    0    0    0     0     0     0     0
## [12,]    0    0    0    0    0    0    0    0    0     0     0     0     0
## [13,]    0    0    0    0    0    0    0    0    0     0     0     0     0
## [14,]    0    0    0    0    0    0    0    0    0     0     0     0     0
## [15,]    0    0    0    0    0    0    0    0    0     0     0     0     0
## [16,]    0    0    0    0    0    0    0    0    0     0     0     0     0
## [17,]    0    0    0    0    0    0    0    0    0     0     0     0     0
## [18,]    0    0    0    0    0    0    0    0    0     0     0     0     0
##       [,14] [,15] [,16] [,17] [,18]
##  [1,]     0     0     0     0     0
##  [2,]     0     0     0     0     0
##  [3,]     0     0     0     0     0
##  [4,]     0     0     0     0     0
##  [5,]     0     0     0     0     0
##  [6,]     0     0     0     0     0
##  [7,]     0     0     0     0     0
##  [8,]     0     0     0     0     0
##  [9,]     0     0     0     0     0
## [10,]     0     0     0     0     0
## [11,]     0     0     0     0     0
## [12,]     0     0     0     0     0
## [13,]     0     0     0     0     0
## [14,]     0     0     0     0     0
## [15,]     0     0     0     0     0
## [16,]     0     0     0     0     0
## [17,]     0     0     0     0     0
## [18,]     0     0     0     0     0
##       [,1] [,2] [,3] [,4] [,5] [,6] [,7] [,8] [,9] [,10] [,11] [,12] [,13]
##  [1,]    0    0    0    0    0    0    0    0    0     0     0     0     0
##  [2,]    0    0    0    0    0    0    0    0    0     0     0     0     0
##  [3,]    0    0    0    0    0    0    0    0    0     0     0     0     0
##  [4,]    0    0    0    0    0    0    0    0    0     0     0     0     0
##  [5,]    0    0    0    0    0    0    0    0    0     0     0     0     0
##  [6,]    0    0    0    0    0    0    0    0    0     0     0     0     0
##  [7,]    0    0    0    0    0    0    0    0    0     0     0     0     0
##  [8,]    0    0    0    0    0    0    0    0    0     0     0     0     0
##  [9,]    0    0    0    0    0    0    0    0    0     0     0     0     0
## [10,]    0    0    0    0    0    0    0    0    0     0     0     0     0
## [11,]    0    0    0    0    0    0    0    0    0     0     0     0     0
## [12,]    0    0    0    0    0    0    0    0    0     0     0     0     0
## [13,]    0    0    0    0    0    0    0    0    0     0     0     0     0
## [14,]    0    0    0    0    0    0    0    0    0     0     0     0     0
## [15,]    0    0    0    0    0    0    0    0    0     0     0     0     0
## [16,]    0    0    0    0    0    0    0    0    0     0     0     0     0
## [17,]    0    0    0    0    0    0    0    0    0     0     0     0     0
## [18,]    0    0    0    0    0    0    0    0    0     0     0     0     0
##       [,14] [,15] [,16] [,17] [,18]
##  [1,]     0     0     0     0     0
##  [2,]     0     0     0     0     0
##  [3,]     0     0     0     0     0
##  [4,]     0     0     0     0     0
##  [5,]     0     0     0     0     0
##  [6,]     0     0     0     0     0
##  [7,]     0     0     0     0     0
##  [8,]     0     0     0     0     0
##  [9,]     0     0     0     0     0
## [10,]     0     0     0     0     0
## [11,]     0     0     0     0     0
## [12,]     0     0     0     0     0
## [13,]     0     0     0     0     0
## [14,]     0     0     0     0     0
## [15,]     0     0     0     0     0
## [16,]     0     0     0     0     0
## [17,]     0     0     0     0     0
## [18,]     0     0     0     0     0
##       [,1] [,2] [,3] [,4] [,5] [,6] [,7] [,8] [,9] [,10] [,11] [,12] [,13]
##  [1,]    0    0    0    0    0    0    0    0    0     0     0     0     0
##  [2,]    0    0    0    0    0    0    0    0    0     0     0     0     0
##  [3,]    0    0    0    0    0    0    0    0    0     0     0     0     0
##  [4,]    0    0    0    0    0    0    0    0    0     0     0     0     0
##  [5,]    0    0    0    0    0    0    0    0    0     0     0     0     0
##  [6,]    0    0    0    0    0    0    0    0    0     0     0     0     0
##  [7,]    0    0    0    0    0    0    0    0    0     0     0     0     0
##  [8,]    0    0    0    0    0    0    0    0    0     0     0     0     0
##  [9,]    0    0    0    0    0    0    0    0    0     0     0     0     0
## [10,]    0    0    0    0    0    0    0    0    0     0     0     0     0
## [11,]    0    0    0    0    0    0    0    0    0     0     0     0     0
## [12,]    0    0    0    0    0    0    0    0    0     0     0     0     0
## [13,]    0    0    0    0    0    0    0    0    0     0     0     0     0
## [14,]    0    0    0    0    0    0    0    0    0     0     0     0     0
## [15,]    0    0    0    0    0    0    0    0    0     0     0     0     0
## [16,]    0    0    0    0    0    0    0    0    0     0     0     0     0
## [17,]    0    0    0    0    0    0    0    0    0     0     0     0     0
## [18,]    0    0    0    0    0    0    0    0    0     0     0     0     0
##       [,14] [,15] [,16] [,17] [,18]
##  [1,]     0     0     0     0     0
##  [2,]     0     0     0     0     0
##  [3,]     0     0     0     0     0
##  [4,]     0     0     0     0     0
##  [5,]     0     0     0     0     0
##  [6,]     0     0     0     0     0
##  [7,]     0     0     0     0     0
##  [8,]     0     0     0     0     0
##  [9,]     0     0     0     0     0
## [10,]     0     0     0     0     0
## [11,]     0     0     0     0     0
## [12,]     0     0     0     0     0
## [13,]     0     0     0     0     0
## [14,]     0     0     0     0     0
## [15,]     0     0     0     0     0
## [16,]     0     0     0     0     0
## [17,]     0     0     0     0     0
## [18,]     0     0     0     0     0
```

```
## Warning in lavaan(model = model, data = data, std.ov = TRUE, estimator = "MLR", : lavaan WARNING:
##     Model estimation FAILED! Returning starting values.
```

```
## Error in Sigma.inv * sample.cov : non-conformable arrays
```


## Adjustments

Note that the fit measures does not indicate a good fit (following filter the fit measures to some key ones):


```r
fitmeasures(fit)[c('cfi.robust','tli.robust','rmsea.robust','rmsea.ci.lower.robust' , 'rmsea.ci.upper.robust')]
```

```
##            cfi.robust            tli.robust          rmsea.robust 
##             0.5737408             0.5004775             0.1521680 
## rmsea.ci.lower.robust rmsea.ci.upper.robust 
##             0.1411162             0.1634234
```

The above fit measures indicate the model-implied covariance-matrix does not fit well with the sample covariance matrix.

Any attempt to make interpretations on the parameter table can be useless, whereas the fit measures do not show at least a reasonable fit.


### Residual covariances
As mentioned, the fit measures reflect how the model-implied covariance matrix and sample covariance matrix are close or not. Consequently, we can talk about residual covarinces.


```r
lavResiduals(fit,zstat=TRUE, type='cor')
```

```
## $type
## [1] "cor.bollen"
## 
## $cov
##              dhf    ast_m1 alt_m1 wbc_m1 lymp_1 albm_1 mx_h_1 pltl_1 trn__1
## dhf           0.000                                                        
## ast_m1        0.132  0.000                                                 
## alt_m1        0.148  0.777  0.000                                          
## wbc_m1       -0.150 -0.066 -0.095  0.000                                   
## lymph_m1     -0.028 -0.020 -0.037 -0.259  0.000                            
## albumin_m1   -0.098 -0.015 -0.130 -0.025  0.026  0.000                     
## max_hct_m1    0.088 -0.040  0.047 -0.141 -0.103 -0.009  0.000              
## platelets_m1 -0.100 -0.242 -0.247  0.476 -0.080  0.280 -0.260  0.000       
## tourn_no_m1   0.124  0.171  0.207 -0.186 -0.163 -0.136  0.208 -0.250  0.000
## alt_m3        0.100  0.339  0.000 -0.040 -0.021 -0.192  0.068 -0.152  0.154
## wbc_m3       -0.187 -0.169 -0.202  0.000 -0.281  0.072 -0.095  0.437 -0.234
## lymph_m3      0.023 -0.026  0.012 -0.130  0.000 -0.043 -0.170 -0.117 -0.040
## max_hct_m3   -0.033  0.090  0.120 -0.039 -0.129 -0.006  0.000 -0.090  0.111
## platelets_m3 -0.013 -0.247 -0.227  0.289 -0.061  0.219 -0.172  0.000 -0.160
## tourn_no_m3   0.099  0.075  0.075 -0.125 -0.008 -0.096  0.015 -0.132  0.000
## ast_m3        0.165  0.000  0.692  0.003  0.006 -0.142 -0.040 -0.216  0.204
## albumin_m3    0.018 -0.036 -0.209 -0.107  0.006  0.000  0.023  0.087 -0.099
## age_t         0.071  0.051  0.079 -0.145 -0.118  0.012  0.219 -0.076  0.170
##              alt_m3 wbc_m3 lymp_3 mx_h_3 pltl_3 trn__3 ast_m3 albm_3 age_t 
## dhf                                                                        
## ast_m1                                                                     
## alt_m1                                                                     
## wbc_m1                                                                     
## lymph_m1                                                                   
## albumin_m1                                                                 
## max_hct_m1                                                                 
## platelets_m1                                                               
## tourn_no_m1                                                                
## alt_m3        0.000                                                        
## wbc_m3       -0.131  0.000                                                 
## lymph_m3      0.020 -0.397  0.000                                          
## max_hct_m3    0.084 -0.013 -0.031  0.000                                   
## platelets_m3 -0.106  0.319 -0.174 -0.091  0.000                            
## tourn_no_m3   0.033 -0.203  0.141  0.056 -0.049  0.000                     
## ast_m3        0.745 -0.214  0.087  0.104 -0.206  0.123  0.000              
## albumin_m3   -0.174  0.066 -0.094  0.139  0.180 -0.032  0.000  0.000       
## age_t         0.000  0.000  0.000  0.000  0.000  0.000  0.000  0.000  0.000
## 
## $cov.z
##              dhf    ast_m1 alt_m1 wbc_m1 lymp_1 albm_1 mx_h_1 pltl_1 trn__1
## dhf           0.000                                                        
## ast_m1        0.817  0.000                                                 
## alt_m1        2.319  0.987  0.000                                          
## wbc_m1       -3.128 -0.938 -1.460  0.000                                   
## lymph_m1     -0.858 -0.236 -0.498 -3.061  0.000                            
## albumin_m1   -2.324 -0.147 -1.148 -0.517  0.409  0.000                     
## max_hct_m1    2.544 -0.530  0.746 -2.567 -1.675 -0.136  0.000              
## platelets_m1 -2.586 -2.537 -2.295  3.431 -1.332  3.419 -3.356  0.000       
## tourn_no_m1   4.914  1.684  1.730 -2.588 -2.630 -2.083  3.143 -3.111  0.000
## alt_m3        1.591  0.998  0.000 -0.716 -0.370 -1.515  0.955 -1.958  1.499
## wbc_m3       -2.682 -2.265 -2.181  0.000 -2.944  1.109 -1.642  3.369 -2.855
## lymph_m3      0.376 -0.469  0.284 -2.223  0.000 -0.708 -3.086 -2.010 -0.707
## max_hct_m3   -0.480  0.519  0.782 -0.567 -2.096 -0.085  0.000 -1.420  1.684
## platelets_m3 -0.292 -1.362 -1.425  3.005 -0.977  3.185 -2.572  0.000 -2.213
## tourn_no_m3   1.793  1.671  1.501 -1.905 -0.130 -1.522  0.256 -1.850  0.000
## ast_m3        0.926  0.000  0.907  0.036  0.078 -2.280 -0.564 -2.020  1.391
## albumin_m3    0.328 -0.358 -1.519 -1.747  0.098  0.000  0.448  1.596 -1.535
## age_t         1.331  0.687  0.912 -2.490 -1.893  0.190  3.751 -1.229  2.932
##              alt_m3 wbc_m3 lymp_3 mx_h_3 pltl_3 trn__3 ast_m3 albm_3 age_t 
## dhf                                                                        
## ast_m1                                                                     
## alt_m1                                                                     
## wbc_m1                                                                     
## lymph_m1                                                                   
## albumin_m1                                                                 
## max_hct_m1                                                                 
## platelets_m1                                                               
## tourn_no_m1                                                                
## alt_m3        0.000                                                        
## wbc_m3       -2.109  0.000                                                 
## lymph_m3      0.465 -4.005  0.000                                          
## max_hct_m3    0.780 -0.245 -0.542  0.000                                   
## platelets_m3 -1.143  3.187 -2.490 -1.305  0.000                            
## tourn_no_m3   0.615 -2.805  2.223  0.915 -0.743  0.000                     
## ast_m3        1.050 -1.853  1.675  0.508 -1.079  1.629  0.000              
## albumin_m3   -1.411  1.334 -1.617  2.242  2.516 -0.504  0.000  0.000       
## age_t         0.000  0.000  0.000  0.000  0.000  0.000  0.000  0.000  0.000
## 
## $summary
##                            cov
## crmr                     0.176
## crmr.se                  0.071
## crmr.exactfit.z          0.794
## crmr.exactfit.pvalue     0.214
## ucrmr                    0.131
## ucrmr.se                 0.121
## ucrmr.ci.lower          -0.067
## ucrmr.cilupper           0.329
## ucrmr.closefit.h0.value  0.050
## ucrmr.closefit.z         0.671
## ucrmr.closefit.pvalue    0.251
```

But note the attempt to adjust based in this matrix can be really messy.

### Modification indices

To adjust further the model, one useful output is the modification
indices:


```r
modificationindices(fit,standardized = TRUE)%>%arrange(-mi)
```

```
##              lhs op          rhs      mi    epc sepc.lv sepc.all sepc.nox
## 1         alt_m3  ~       ast_m3 144.348  0.746   0.746    0.746    0.748
## 2         ast_m3  ~       alt_m3 136.768  0.720   0.720    0.720    0.720
## 3         alt_m1  ~       ast_m1 136.180  0.560   0.560    0.560    0.560
## 4         ast_m1 ~~       alt_m1 126.805  0.426   0.426    0.702    0.702
## 5         ast_m3  ~       alt_m1 114.892  0.658   0.658    0.658    0.658
## 6         ast_m1  ~       alt_m1  51.312  0.354   0.354    0.354    0.354
## 7         wbc_m3  ~ platelets_m1  49.241  0.437   0.437    0.437    0.437
## 8       lymph_m3  ~       wbc_m3  47.503 -0.411  -0.411   -0.411   -0.411
## 9         wbc_m3 ~~     lymph_m3  47.503 -0.395  -0.395   -0.430   -0.430
## 10        wbc_m3  ~     lymph_m3  47.503 -0.450  -0.450   -0.450   -0.450
## 11         age_t  ~       alt_m3  41.209  5.545   5.545    5.545    5.545
## 12  platelets_m1  ~       wbc_m1  37.130  0.286   0.286    0.286    0.286
## 13        wbc_m3 ~~ platelets_m3  29.204  0.317   0.317    0.337    0.337
## 14        wbc_m3  ~ platelets_m3  29.204  0.344   0.344    0.344    0.344
## 15  platelets_m3  ~       wbc_m3  29.204  0.330   0.330    0.330    0.330
## 16        alt_m3  ~       ast_m1  29.003  0.334   0.334    0.334    0.334
## 17        wbc_m3  ~     lymph_m1  24.912 -0.309  -0.309   -0.309   -0.309
## 18  platelets_m1  ~       wbc_m3  23.496  0.227   0.227    0.227    0.227
## 19  platelets_m1 ~~       wbc_m3  21.352  0.212   0.212    0.288    0.288
## 20    max_hct_m1  ~        age_t  21.000  0.247   0.247    0.247    0.248
## 21    max_hct_m1 ~~   max_hct_m3  21.000 -0.638  -0.638   -0.837   -0.837
## 22    max_hct_m3  ~   max_hct_m1  21.000 -0.967  -0.967   -0.967   -0.967
## 23         age_t  ~   max_hct_m1  20.575  0.368   0.368    0.368    0.368
## 24        alt_m1  ~       ast_m3  20.326  0.216   0.216    0.216    0.217
## 25    albumin_m1  ~ platelets_m1  19.527  0.234   0.234    0.234    0.234
## 26  platelets_m3  ~       wbc_m1  17.671  0.255   0.255    0.255    0.255
## 27    max_hct_m1  ~ platelets_m1  16.870 -0.209  -0.209   -0.209   -0.209
## 28        wbc_m3  ~          dhf  16.281 -0.351  -0.351   -0.336   -0.336
## 29  platelets_m3  ~       ast_m1  15.107 -0.233  -0.233   -0.233   -0.233
## 30        wbc_m1  ~     lymph_m3  14.663  0.162   0.162    0.162    0.162
## 31    albumin_m1 ~~ platelets_m1  14.651  0.151   0.151    0.239    0.239
## 32        wbc_m1  ~       ast_m3  14.392  0.160   0.160    0.160    0.161
## 33         age_t  ~ platelets_m3  14.338 -3.384  -3.384   -3.384   -3.384
## 34   tourn_no_m1  ~   max_hct_m1  14.196  0.200   0.200    0.200    0.200
## 35        wbc_m1 ~~ platelets_m1  13.932  0.118   0.118    0.233    0.233
## 36    max_hct_m1  ~          dhf  13.808  0.316   0.316    0.303    0.303
## 37  platelets_m3  ~   albumin_m1  13.740  0.223   0.223    0.223    0.223
## 38        wbc_m1  ~   albumin_m3  13.526 -0.156  -0.156   -0.156   -0.156
## 39        wbc_m1  ~ platelets_m1  13.460  0.155   0.155    0.155    0.155
## 40      lymph_m1  ~       wbc_m1  13.118 -0.205  -0.205   -0.205   -0.205
## 41        ast_m3  ~          dhf  12.827  0.279   0.279    0.267    0.267
## 42    max_hct_m1 ~~  tourn_no_m1  12.430  0.152   0.152    0.220    0.220
## 43        wbc_m3  ~       ast_m3  12.173 -0.214  -0.214   -0.214   -0.214
## 44        wbc_m1 ~~       wbc_m3  12.133 -0.776  -0.776   -1.169   -1.169
## 45        wbc_m1  ~        age_t  12.133 -0.150  -0.150   -0.150   -0.150
## 46        wbc_m3  ~       wbc_m1  12.133 -1.695  -1.695   -1.695   -1.695
## 47         age_t  ~  tourn_no_m1  11.865  0.253   0.253    0.253    0.253
## 48  platelets_m3  ~       ast_m3  11.845 -0.207  -0.207   -0.207   -0.207
## 49    albumin_m1  ~          dhf  11.749 -0.307  -0.307   -0.293   -0.293
## 50  platelets_m3  ~       alt_m1  11.728 -0.206  -0.206   -0.206   -0.206
## 51   tourn_no_m1  ~ platelets_m1  11.529 -0.180  -0.180   -0.180   -0.180
## 52    max_hct_m1 ~~ platelets_m1  11.503 -0.129  -0.129   -0.212   -0.212
## 53        ast_m3  ~ platelets_m1  11.225 -0.209  -0.209   -0.209   -0.209
## 54        ast_m3  ~       wbc_m3  11.204 -0.209  -0.209   -0.209   -0.209
## 55        wbc_m3 ~~  tourn_no_m3  11.169 -0.203  -0.203   -0.208   -0.208
## 56        wbc_m3  ~  tourn_no_m3  11.169 -0.206  -0.206   -0.206   -0.206
## 57   tourn_no_m3  ~       wbc_m3  11.169 -0.211  -0.211   -0.211   -0.211
## 58        alt_m1  ~ platelets_m3  10.995 -0.159  -0.159   -0.159   -0.159
## 59         age_t  ~       wbc_m1  10.983 -0.309  -0.309   -0.309   -0.309
## 60        wbc_m3  ~  tourn_no_m1  10.973 -0.203  -0.203   -0.203   -0.203
## 61   tourn_no_m1  ~        age_t  10.418  0.172   0.172    0.172    0.173
## 62   tourn_no_m1 ~~  tourn_no_m3  10.418 -1.467  -1.467   -1.743   -1.743
## 63   tourn_no_m3  ~  tourn_no_m1  10.418 -2.035  -2.035   -2.035   -2.035
## 64  platelets_m1  ~          dhf  10.172 -0.231  -0.231   -0.221   -0.221
## 65   tourn_no_m1  ~       alt_m1   9.988  0.168   0.168    0.168    0.168
## 66        wbc_m1 ~~     lymph_m1   9.873 -0.120  -0.120   -0.196   -0.196
## 67  platelets_m1  ~   max_hct_m1   9.856 -0.147  -0.147   -0.147   -0.147
## 68        alt_m1  ~ platelets_m1   9.793 -0.150  -0.150   -0.150   -0.150
## 69        alt_m3  ~   albumin_m1   9.723 -0.194  -0.194   -0.194   -0.194
## 70      lymph_m3  ~       wbc_m1   9.605 -0.183  -0.183   -0.183   -0.183
## 71        ast_m3  ~  tourn_no_m1   9.553  0.190   0.190    0.190    0.190
## 72  platelets_m3  ~     lymph_m3   9.526 -0.197  -0.197   -0.197   -0.197
## 73      lymph_m3  ~ platelets_m3   9.526 -0.188  -0.188   -0.188   -0.188
## 74      lymph_m3 ~~ platelets_m3   9.526 -0.173  -0.173   -0.193   -0.193
## 75  platelets_m1  ~  tourn_no_m1   9.426 -0.144  -0.144   -0.144   -0.144
## 76        wbc_m3  ~       alt_m1   9.423 -0.189  -0.189   -0.189   -0.189
## 77    max_hct_m1  ~     lymph_m3   9.103 -0.154  -0.154   -0.154   -0.154
## 78  platelets_m3  ~   albumin_m3   9.025  0.181   0.181    0.181    0.181
## 79   tourn_no_m1  ~     lymph_m1   8.959 -0.159  -0.159   -0.159   -0.159
## 80        alt_m1 ~~ platelets_m3   8.861 -0.137  -0.137   -0.186   -0.186
## 81        ast_m3  ~ platelets_m3   8.596 -0.187  -0.187   -0.187   -0.187
## 82  platelets_m1  ~   albumin_m1   8.316  0.135   0.135    0.135    0.135
## 83    max_hct_m1  ~  tourn_no_m1   7.929  0.143   0.143    0.143    0.143
## 84        wbc_m1 ~~     lymph_m3   7.921  0.111   0.111    0.176    0.176
## 85        alt_m3  ~   albumin_m3   7.914 -0.175  -0.175   -0.175   -0.175
## 86    albumin_m3  ~   max_hct_m3   7.566  0.179   0.179    0.179    0.179
## 87    albumin_m1  ~       ast_m3   7.511 -0.148  -0.148   -0.148   -0.148
## 88        ast_m3  ~   albumin_m1   7.486 -0.198  -0.198   -0.198   -0.198
## 89        alt_m1  ~          dhf   7.347  0.195   0.195    0.187    0.187
## 90    albumin_m3  ~   albumin_m1   7.023 -0.962  -0.962   -0.962   -0.962
## 91   tourn_no_m1  ~       ast_m3   6.853  0.139   0.139    0.139    0.139
## 92        wbc_m3  ~       ast_m1   6.739 -0.159  -0.159   -0.159   -0.159
## 93      lymph_m1  ~  tourn_no_m1   6.647 -0.146  -0.146   -0.146   -0.146
## 94   tourn_no_m1  ~       alt_m3   6.644  0.137   0.137    0.137    0.137
## 95   tourn_no_m1  ~          dhf   6.586  0.240   0.240    0.230    0.230
## 96   tourn_no_m1  ~ platelets_m3   6.428 -0.135  -0.135   -0.135   -0.135
## 97    albumin_m1 ~~ platelets_m3   6.220  0.126   0.126    0.156    0.156
## 98      lymph_m3  ~ platelets_m1   6.212 -0.148  -0.148   -0.148   -0.148
## 99   tourn_no_m1  ~       ast_m1   6.156  0.132   0.132    0.132    0.132
## 100       alt_m1  ~       wbc_m3   6.135 -0.119  -0.119   -0.119   -0.119
## 101       ast_m1 ~~       alt_m3   6.068 -0.121  -0.121   -0.154   -0.154
## 102     lymph_m1 ~~       wbc_m3   6.015 -0.136  -0.136   -0.153   -0.153
## 103       ast_m1  ~ platelets_m3   6.005 -0.121  -0.121   -0.121   -0.121
## 104  tourn_no_m3  ~     lymph_m3   5.843  0.160   0.160    0.160    0.160
## 105     lymph_m3  ~  tourn_no_m3   5.843  0.143   0.143    0.143    0.143
## 106     lymph_m3 ~~  tourn_no_m3   5.843  0.140   0.140    0.151    0.151
## 107   albumin_m3  ~ platelets_m3   5.776  0.153   0.153    0.153    0.153
## 108  tourn_no_m1  ~       wbc_m3   5.758 -0.127  -0.127   -0.127   -0.127
## 109   max_hct_m3  ~   albumin_m3   5.622  0.139   0.139    0.139    0.140
## 110       alt_m3  ~ platelets_m1   5.591 -0.149  -0.149   -0.149   -0.149
## 111   max_hct_m1  ~ platelets_m3   5.574 -0.120  -0.120   -0.120   -0.120
## 112       ast_m1  ~       alt_m3   5.512 -0.116  -0.116   -0.116   -0.116
## 113   albumin_m1  ~ platelets_m3   5.467  0.124   0.124    0.124    0.124
## 114   max_hct_m1  ~       wbc_m1   5.443 -0.119  -0.119   -0.119   -0.119
## 115     lymph_m1 ~~  tourn_no_m1   5.295 -0.110  -0.110   -0.144   -0.144
## 116 platelets_m1 ~~  tourn_no_m1   5.255 -0.091  -0.091   -0.143   -0.143
## 117        age_t  ~       alt_m1   5.217  0.185   0.185    0.185    0.185
## 118  tourn_no_m1  ~       wbc_m1   5.168 -0.121  -0.121   -0.121   -0.121
## 119  tourn_no_m1 ~~       alt_m3   5.144  0.119   0.119    0.141    0.141
## 120       alt_m1  ~  tourn_no_m1   5.119  0.109   0.109    0.109    0.109
## 121       ast_m3  ~   max_hct_m3   5.085  0.147   0.147    0.147    0.147
## 122       ast_m1 ~~ platelets_m3   5.082 -0.107  -0.107   -0.141   -0.141
## 123       ast_m1  ~ platelets_m1   4.948 -0.110  -0.110   -0.110   -0.110
## 124        age_t  ~     lymph_m1   4.941 -0.162  -0.162   -0.162   -0.162
## 125       alt_m3  ~  tourn_no_m1   4.907  0.138   0.138    0.138    0.138
## 126     lymph_m3  ~     lymph_m1   4.905 -0.415  -0.415   -0.415   -0.415
## 127     lymph_m1  ~        age_t   4.905 -0.134  -0.134   -0.134   -0.134
## 128     lymph_m1 ~~     lymph_m3   4.905 -0.340  -0.340   -0.401   -0.401
## 129       alt_m1 ~~       wbc_m3   4.876 -0.104  -0.104   -0.138   -0.138
## 130       ast_m1 ~~   albumin_m1   4.736  0.091   0.091    0.136    0.136
## 131  tourn_no_m1  ~     lymph_m3   4.653 -0.115  -0.115   -0.115   -0.115
## 132       alt_m3 ~~       wbc_m3   4.608 -0.130  -0.130   -0.134   -0.134
## 133       wbc_m3  ~       alt_m3   4.608 -0.132  -0.132   -0.132   -0.132
## 134       alt_m3  ~       wbc_m3   4.608 -0.136  -0.136   -0.136   -0.136
## 135 platelets_m1  ~  tourn_no_m3   4.540 -0.100  -0.100   -0.100   -0.100
## 136        age_t  ~       wbc_m3   4.377 -1.830  -1.830   -1.830   -1.830
## 137 platelets_m1  ~       alt_m1   4.339 -0.098  -0.098   -0.098   -0.098
## 138     lymph_m1  ~   max_hct_m3   4.251 -0.118  -0.118   -0.118   -0.118
## 139       alt_m1  ~   albumin_m3   4.170 -0.098  -0.098   -0.098   -0.098
## 140     lymph_m1  ~       wbc_m3   4.112 -0.115  -0.115   -0.115   -0.115
## 141          dhf  ~   max_hct_m3   4.097 -0.138  -0.138   -0.144   -0.144
## 142          dhf ~~   max_hct_m1   4.097  0.156   0.156    0.218    0.218
## 143  tourn_no_m3  ~ platelets_m1   4.087 -0.127  -0.127   -0.127   -0.127
## 144       alt_m3  ~          dhf   4.060  0.164   0.164    0.157    0.157
## 145  tourn_no_m3  ~       ast_m3   3.942  0.123   0.123    0.123    0.123
## 146   max_hct_m1  ~       ast_m3   3.932 -0.101  -0.101   -0.101   -0.101
## 147       alt_m1 ~~  tourn_no_m1   3.871  0.080   0.080    0.123    0.123
## 148 platelets_m1 ~~  tourn_no_m3   3.825 -0.091  -0.091   -0.122   -0.122
## 149       ast_m3  ~  tourn_no_m3   3.701  0.119   0.119    0.119    0.119
## 150        age_t  ~ platelets_m1   3.685 -0.165  -0.165   -0.165   -0.165
## 151   albumin_m1 ~~       alt_m3   3.685 -0.101  -0.101   -0.120   -0.120
## 152        age_t  ~     lymph_m3   3.645  1.748   1.748    1.748    1.748
## 153 platelets_m3  ~   max_hct_m1   3.645 -0.117  -0.117   -0.117   -0.117
## 154 platelets_m3  ~  tourn_no_m1   3.594 -0.114  -0.114   -0.114   -0.114
## 155   albumin_m1  ~       alt_m3   3.563 -0.100  -0.100   -0.100   -0.100
## 156          dhf ~~   max_hct_m3   3.505 -0.116  -0.116   -0.140   -0.140
## 157  tourn_no_m3  ~          dhf   3.452  0.141   0.141    0.135    0.135
## 158       wbc_m1  ~   albumin_m1   3.406 -0.078  -0.078   -0.078   -0.078
## 159  tourn_no_m1 ~~       wbc_m3   3.368 -0.095  -0.095   -0.114   -0.114
## 160   max_hct_m1  ~       ast_m1   3.294 -0.092  -0.092   -0.092   -0.092
## 161       alt_m3 ~~ platelets_m3   3.147 -0.105  -0.105   -0.111   -0.111
## 162       alt_m3  ~ platelets_m3   3.147 -0.114  -0.114   -0.114   -0.114
## 163 platelets_m3  ~       alt_m3   3.147 -0.107  -0.107   -0.107   -0.107
## 164   max_hct_m3  ~       ast_m3   3.141  0.104   0.104    0.104    0.104
## 165  tourn_no_m3  ~       wbc_m1   3.100 -0.110  -0.110   -0.110   -0.110
## 166 platelets_m1  ~       alt_m3   3.068 -0.082  -0.082   -0.082   -0.082
## 167   max_hct_m1  ~       wbc_m3   3.023 -0.088  -0.088   -0.088   -0.088
## 168  tourn_no_m1 ~~ platelets_m3   2.968 -0.088  -0.088   -0.107   -0.107
## 169 platelets_m1  ~       ast_m3   2.924 -0.080  -0.080   -0.080   -0.080
## 170 platelets_m1  ~       ast_m1   2.838 -0.079  -0.079   -0.079   -0.079
## 171 platelets_m1  ~        age_t   2.830 -0.082  -0.082   -0.082   -0.082
## 172 platelets_m1 ~~ platelets_m3   2.830 -0.276  -0.276   -0.384   -0.384
## 173 platelets_m3  ~ platelets_m1   2.830 -0.491  -0.491   -0.491   -0.491
## 174   albumin_m1 ~~   max_hct_m3   2.814 -0.083  -0.083   -0.105   -0.105
## 175       wbc_m1 ~~       alt_m3   2.813  0.070   0.070    0.105    0.105
## 176       wbc_m1  ~   max_hct_m1   2.808 -0.071  -0.071   -0.071   -0.071
## 177       alt_m3  ~       alt_m1   2.752 -1.337  -1.337   -1.337   -1.337
## 178       alt_m1 ~~       alt_m3   2.752 -0.788  -0.788   -1.034   -1.034
## 179       alt_m1  ~        age_t   2.752  0.080   0.080    0.080    0.080
## 180     lymph_m3  ~   max_hct_m1   2.735 -0.099  -0.099   -0.099   -0.099
## 181  tourn_no_m1  ~   albumin_m1   2.635 -0.086  -0.086   -0.086   -0.086
## 182   albumin_m3  ~       wbc_m1   2.600 -0.100  -0.100   -0.100   -0.100
## 183   max_hct_m1 ~~     lymph_m3   2.594 -0.076  -0.076   -0.100   -0.100
## 184 platelets_m3  ~   max_hct_m3   2.590 -0.103  -0.103   -0.103   -0.103
## 185   max_hct_m3  ~ platelets_m3   2.590 -0.098  -0.098   -0.098   -0.098
## 186   max_hct_m3 ~~ platelets_m3   2.590 -0.090  -0.090   -0.100   -0.100
## 187       ast_m1  ~     lymph_m3   2.580 -0.079  -0.079   -0.079   -0.079
## 188     lymph_m3  ~   albumin_m3   2.572 -0.094  -0.094   -0.094   -0.094
## 189 platelets_m1 ~~       alt_m3   2.550 -0.074  -0.074   -0.100   -0.100
## 190   max_hct_m3  ~       alt_m1   2.532  0.093   0.093    0.093    0.093
## 191   albumin_m1  ~  tourn_no_m1   2.526 -0.084  -0.084   -0.084   -0.084
## 192 platelets_m3  ~     lymph_m1   2.488 -0.096  -0.096   -0.096   -0.096
## 193  tourn_no_m3  ~   albumin_m1   2.459 -0.097  -0.097   -0.097   -0.097
## 194       wbc_m1 ~~   max_hct_m1   2.421 -0.053  -0.053   -0.097   -0.097
## 195  tourn_no_m1  ~   albumin_m3   2.399 -0.082  -0.082   -0.082   -0.082
## 196  tourn_no_m1  ~   max_hct_m3   2.390  0.082   0.082    0.082    0.082
## 197   max_hct_m3  ~     lymph_m1   2.347 -0.091  -0.091   -0.091   -0.091
## 198   albumin_m1 ~~  tourn_no_m3   2.339 -0.080  -0.080   -0.095   -0.095
## 199        age_t  ~   max_hct_m3   2.315 -1.391  -1.391   -1.391   -1.391
## 200          dhf ~~ platelets_m1   2.271 -0.095  -0.095   -0.143   -0.143
## 201          dhf  ~ platelets_m3   2.271  0.111   0.111    0.116    0.116
## 202   albumin_m1  ~   max_hct_m3   2.252 -0.079  -0.079   -0.079   -0.079
## 203     lymph_m3  ~       ast_m3   2.233  0.088   0.088    0.088    0.088
## 204   albumin_m1  ~  tourn_no_m3   2.230 -0.079  -0.079   -0.079   -0.079
## 205          dhf  ~   albumin_m3   2.219  0.098   0.098    0.102    0.102
## 206          dhf ~~   albumin_m1   2.219 -0.132  -0.132   -0.176   -0.176
## 207       ast_m1  ~   albumin_m1   2.155  0.073   0.073    0.073    0.073
## 208       alt_m1  ~       wbc_m1   2.083 -0.069  -0.069   -0.069   -0.069
## 209   max_hct_m3  ~       alt_m3   2.066  0.085   0.085    0.085    0.085
## 210       alt_m3 ~~   max_hct_m3   2.066  0.084   0.084    0.090    0.090
## 211       alt_m3  ~   max_hct_m3   2.066  0.095   0.095    0.095    0.095
## 212        age_t  ~          dhf   2.038  0.101   0.101    0.097    0.097
## 213     lymph_m1 ~~   max_hct_m3   2.026 -0.075  -0.075   -0.089   -0.089
## 214     lymph_m1  ~          dhf   2.020 -0.158  -0.158   -0.152   -0.152
## 215          dhf ~~  tourn_no_m3   1.945  0.089   0.089    0.102    0.102
## 216   albumin_m3  ~       alt_m1   1.941 -0.085  -0.085   -0.085   -0.085
## 217       alt_m1  ~   max_hct_m3   1.926  0.067   0.067    0.067    0.067
## 218       wbc_m1  ~       ast_m1   1.893  0.058   0.058    0.058    0.058
## 219       ast_m1  ~       wbc_m1   1.882 -0.068  -0.068   -0.068   -0.068
## 220   albumin_m3  ~     lymph_m3   1.818 -0.088  -0.088   -0.088   -0.088
## 221          dhf ~~ platelets_m3   1.794  0.092   0.092    0.108    0.108
## 222       ast_m1 ~~     lymph_m3   1.775 -0.062  -0.062   -0.083   -0.083
## 223       wbc_m1  ~       alt_m3   1.759  0.056   0.056    0.056    0.056
## 224          dhf  ~  tourn_no_m3   1.748  0.086   0.086    0.090    0.090
## 225          dhf ~~  tourn_no_m1   1.748 -0.118  -0.118   -0.157   -0.157
## 226       wbc_m1  ~ platelets_m3   1.711  0.055   0.055    0.055    0.055
## 227       wbc_m1  ~       alt_m1   1.627  0.054   0.054    0.054    0.054
## 228       alt_m1 ~~ platelets_m1   1.570 -0.045  -0.045   -0.078   -0.078
## 229       wbc_m1  ~     lymph_m1   1.566 -0.053  -0.053   -0.053   -0.053
## 230   max_hct_m3  ~       ast_m1   1.536  0.073   0.073    0.073    0.073
## 231   max_hct_m1 ~~ platelets_m3   1.486 -0.059  -0.059   -0.076   -0.076
## 232       ast_m3  ~     lymph_m3   1.478  0.079   0.079    0.079    0.079
## 233       wbc_m3  ~   albumin_m1   1.460  0.074   0.074    0.074    0.074
## 234       ast_m1 ~~       wbc_m1   1.414 -0.040  -0.040   -0.074   -0.074
## 235     lymph_m1  ~  tourn_no_m3   1.394 -0.067  -0.067   -0.067   -0.067
## 236   albumin_m3  ~  tourn_no_m1   1.368 -0.072  -0.072   -0.072   -0.072
## 237   max_hct_m1  ~   albumin_m3   1.286 -0.058  -0.058   -0.058   -0.058
## 238   max_hct_m3  ~          dhf   1.273 -0.083  -0.083   -0.079   -0.079
## 239       alt_m1  ~  tourn_no_m3   1.254  0.054   0.054    0.054    0.054
## 240  tourn_no_m1 ~~     lymph_m3   1.253 -0.056  -0.056   -0.070   -0.070
## 241   max_hct_m3  ~ platelets_m1   1.241 -0.066  -0.066   -0.066   -0.066
## 242       ast_m1 ~~  tourn_no_m1   1.241  0.047   0.047    0.069    0.069
## 243  tourn_no_m3  ~       ast_m1   1.235  0.069   0.069    0.069    0.069
## 244       alt_m1 ~~   albumin_m1   1.214  0.045   0.045    0.069    0.069
## 245        age_t  ~  tourn_no_m3   1.214  0.953   0.953    0.953    0.953
## 246        age_t  ~       ast_m1   1.167  0.085   0.085    0.085    0.085
## 247       wbc_m3  ~   albumin_m3   1.154  0.066   0.066    0.066    0.066
## 248          dhf ~~       wbc_m3   1.144 -0.084  -0.084   -0.097   -0.097
## 249  tourn_no_m3  ~       alt_m1   1.134  0.066   0.066    0.066    0.066
## 250       ast_m1  ~          dhf   1.107  0.080   0.080    0.077    0.077
## 251       ast_m1  ~        age_t   1.064  0.051   0.051    0.051    0.051
## 252          dhf  ~       ast_m3   0.992  0.070   0.070    0.073    0.073
## 253          dhf ~~       ast_m1   0.992 -0.071  -0.071   -0.102   -0.102
## 254       wbc_m1 ~~  tourn_no_m3   0.976  0.041   0.041    0.062    0.062
## 255   max_hct_m3  ~  tourn_no_m3   0.910  0.056   0.056    0.056    0.056
## 256   max_hct_m3 ~~  tourn_no_m3   0.910  0.055   0.055    0.060    0.060
## 257  tourn_no_m3  ~   max_hct_m3   0.910  0.063   0.063    0.063    0.063
## 258   max_hct_m1 ~~       wbc_m3   0.905 -0.047  -0.047   -0.059   -0.059
## 259     lymph_m1 ~~  tourn_no_m3   0.895 -0.053  -0.053   -0.059   -0.059
## 260   albumin_m1 ~~  tourn_no_m1   0.894 -0.042  -0.042   -0.059   -0.059
## 261       ast_m1  ~  tourn_no_m1   0.891  0.047   0.047    0.047    0.047
## 262          dhf  ~       wbc_m3   0.876 -0.076  -0.076   -0.080   -0.080
## 263          dhf ~~       wbc_m1   0.876  0.048   0.048    0.079    0.079
## 264       alt_m1 ~~  tourn_no_m3   0.875  0.044   0.044    0.058    0.058
## 265       alt_m1 ~~   max_hct_m1   0.833 -0.036  -0.036   -0.057   -0.057
## 266       wbc_m3  ~   max_hct_m1   0.832 -0.057  -0.057   -0.057   -0.057
## 267     lymph_m1 ~~ platelets_m1   0.826 -0.039  -0.039   -0.057   -0.057
## 268   max_hct_m3  ~  tourn_no_m1   0.824  0.053   0.053    0.053    0.053
## 269   albumin_m3  ~          dhf   0.794  0.066   0.066    0.063    0.063
## 270     lymph_m3  ~          dhf   0.787  0.059   0.059    0.056    0.056
## 271       alt_m1 ~~   max_hct_m3   0.768  0.039   0.039    0.055    0.055
## 272   max_hct_m1 ~~  tourn_no_m3   0.727 -0.043  -0.043   -0.053   -0.053
## 273   albumin_m3  ~ platelets_m1   0.723  0.053   0.053    0.053    0.053
## 274 platelets_m1  ~     lymph_m1   0.722 -0.040  -0.040   -0.040   -0.040
## 275 platelets_m3 ~~  tourn_no_m3   0.668 -0.049  -0.049   -0.051   -0.051
## 276 platelets_m3  ~  tourn_no_m3   0.668 -0.049  -0.049   -0.049   -0.049
## 277  tourn_no_m3  ~ platelets_m3   0.668 -0.053  -0.053   -0.053   -0.053
## 278       ast_m1 ~~ platelets_m1   0.653 -0.030  -0.030   -0.050   -0.050
## 279   albumin_m3  ~       ast_m1   0.646 -0.062  -0.062   -0.062   -0.062
## 280     lymph_m1  ~   albumin_m3   0.634  0.045   0.045    0.045    0.045
## 281     lymph_m1 ~~   max_hct_m1   0.604  0.036   0.036    0.048    0.048
## 282     lymph_m1  ~   albumin_m1   0.599  0.044   0.044    0.044    0.044
## 283       ast_m1  ~       wbc_m3   0.592 -0.038  -0.038   -0.038   -0.038
## 284       ast_m1 ~~   max_hct_m1   0.581 -0.031  -0.031   -0.048   -0.048
## 285       alt_m3  ~   max_hct_m1   0.581  0.048   0.048    0.048    0.048
## 286   albumin_m1 ~~       wbc_m3   0.568  0.039   0.039    0.047    0.047
## 287       wbc_m1 ~~  tourn_no_m1   0.565 -0.027  -0.027   -0.047   -0.047
## 288       ast_m1  ~   albumin_m3   0.543 -0.037  -0.037   -0.037   -0.037
## 289     lymph_m1  ~       alt_m1   0.542 -0.042  -0.042   -0.042   -0.042
## 290          dhf  ~     lymph_m3   0.497  0.043   0.043    0.045    0.045
## 291          dhf ~~     lymph_m1   0.497 -0.084  -0.084   -0.105   -0.105
## 292       wbc_m1  ~   max_hct_m3   0.496 -0.030  -0.030   -0.030   -0.030
## 293   albumin_m1  ~       wbc_m3   0.488  0.037   0.037    0.037    0.037
## 294 platelets_m1  ~   albumin_m3   0.463 -0.032  -0.032   -0.032   -0.032
## 295     lymph_m3  ~       alt_m1   0.451  0.039   0.039    0.039    0.039
## 296     lymph_m3  ~   albumin_m1   0.437 -0.039  -0.039   -0.039   -0.039
## 297 platelets_m1 ~~     lymph_m3   0.430 -0.029  -0.029   -0.041   -0.041
## 298 platelets_m1  ~   max_hct_m3   0.420 -0.031  -0.031   -0.031   -0.031
## 299       ast_m3  ~       ast_m1   0.359 -0.244  -0.244   -0.244   -0.244
## 300   albumin_m1  ~       wbc_m1   0.358  0.032   0.032    0.032    0.032
## 301       ast_m1 ~~       wbc_m3   0.346 -0.028  -0.028   -0.037   -0.037
## 302       wbc_m1  ~  tourn_no_m3   0.343  0.025   0.025    0.025    0.025
## 303       alt_m1 ~~     lymph_m3   0.343  0.026   0.026    0.037    0.037
## 304   albumin_m3  ~       alt_m3   0.334 -0.036  -0.036   -0.036   -0.036
## 305   albumin_m1 ~~   max_hct_m1   0.325  0.024   0.024    0.036    0.036
## 306     lymph_m3 ~~   max_hct_m3   0.323 -0.031  -0.031   -0.035   -0.035
## 307     lymph_m3  ~   max_hct_m3   0.323 -0.035  -0.035   -0.035   -0.035
## 308   max_hct_m3  ~     lymph_m3   0.323 -0.035  -0.035   -0.035   -0.035
## 309     lymph_m1  ~   max_hct_m1   0.313 -0.032  -0.032   -0.032   -0.032
## 310       alt_m1 ~~       wbc_m1   0.310  0.018   0.018    0.035    0.035
## 311   max_hct_m1  ~     lymph_m1   0.304 -0.028  -0.028   -0.028   -0.028
## 312     lymph_m1  ~ platelets_m1   0.303 -0.031  -0.031   -0.031   -0.031
## 313     lymph_m1  ~       ast_m3   0.298 -0.031  -0.031   -0.031   -0.031
## 314          dhf ~~     lymph_m3   0.292  0.030   0.030    0.037    0.037
## 315       alt_m3 ~~  tourn_no_m3   0.291  0.033   0.033    0.034    0.034
## 316       alt_m3  ~  tourn_no_m3   0.291  0.034   0.034    0.034    0.034
## 317  tourn_no_m3  ~       alt_m3   0.291  0.034   0.034    0.034    0.034
## 318       ast_m1  ~   max_hct_m3   0.290  0.027   0.027    0.027    0.027
## 319          dhf  ~        age_t   0.277 -0.031  -0.031   -0.032   -0.032
## 320       alt_m1 ~~     lymph_m1   0.273 -0.023  -0.023   -0.033   -0.033
## 321     lymph_m1  ~       alt_m3   0.273 -0.030  -0.030   -0.030   -0.030
## 322       ast_m3  ~   max_hct_m1   0.266 -0.032  -0.032   -0.032   -0.032
## 323  tourn_no_m3  ~   albumin_m3   0.261 -0.032  -0.032   -0.032   -0.032
## 324       wbc_m1 ~~   max_hct_m3   0.245  0.020   0.020    0.031    0.031
## 325       alt_m1  ~     lymph_m1   0.233 -0.023  -0.023   -0.023   -0.023
## 326  tourn_no_m1 ~~   max_hct_m3   0.230  0.024   0.024    0.030    0.030
## 327       ast_m1  ~     lymph_m1   0.224 -0.023  -0.023   -0.023   -0.023
## 328   max_hct_m1  ~       alt_m1   0.209 -0.023  -0.023   -0.023   -0.023
## 329   albumin_m1  ~     lymph_m1   0.186  0.023   0.023    0.023    0.023
## 330   albumin_m3  ~       wbc_m3   0.185  0.027   0.027    0.027    0.027
## 331       alt_m3  ~       wbc_m1   0.174 -0.026  -0.026   -0.026   -0.026
## 332     lymph_m1 ~~   albumin_m1   0.172  0.020   0.020    0.026    0.026
## 333   albumin_m1  ~   max_hct_m1   0.167 -0.022  -0.022   -0.022   -0.022
## 334       wbc_m1 ~~ platelets_m3   0.148  0.016   0.016    0.024    0.024
## 335   max_hct_m1  ~       alt_m3   0.148  0.020   0.020    0.020    0.020
## 336     lymph_m1 ~~ platelets_m3   0.145 -0.021  -0.021   -0.024   -0.024
## 337       wbc_m1  ~          dhf   0.137 -0.021  -0.021   -0.020   -0.020
## 338   albumin_m1  ~       alt_m1   0.128 -0.019  -0.019   -0.019   -0.019
## 339   max_hct_m1  ~  tourn_no_m3   0.122 -0.018  -0.018   -0.018   -0.018
## 340       alt_m3 ~~     lymph_m3   0.119  0.020   0.020    0.022    0.022
## 341     lymph_m3  ~       alt_m3   0.119  0.020   0.020    0.020    0.020
## 342       alt_m3  ~     lymph_m3   0.119  0.023   0.023    0.023    0.023
## 343       wbc_m1  ~  tourn_no_m1   0.110 -0.014  -0.014   -0.014   -0.014
## 344       ast_m3  ~       wbc_m1   0.109 -0.020  -0.020   -0.020   -0.020
## 345          dhf ~~       alt_m3   0.100  0.022   0.022    0.026    0.026
## 346     lymph_m1 ~~       alt_m3   0.100 -0.018  -0.018   -0.020   -0.020
## 347     lymph_m3  ~  tourn_no_m1   0.097  0.018   0.018    0.018    0.018
## 348       ast_m1  ~   max_hct_m1   0.094 -0.015  -0.015   -0.015   -0.015
## 349          dhf  ~       alt_m3   0.063  0.018   0.018    0.019    0.019
## 350          dhf ~~       alt_m1   0.063 -0.017  -0.017   -0.025   -0.025
## 351   albumin_m3  ~     lymph_m1   0.055  0.014   0.014    0.014    0.014
## 352   albumin_m1  ~        age_t   0.050  0.012   0.012    0.012    0.012
## 353   albumin_m1 ~~     lymph_m3   0.049  0.011   0.011    0.014    0.014
## 354       ast_m1 ~~     lymph_m1   0.048  0.010   0.010    0.014    0.014
## 355   max_hct_m3  ~       wbc_m3   0.048 -0.013  -0.013   -0.013   -0.013
## 356       wbc_m3 ~~   max_hct_m3   0.048 -0.013  -0.013   -0.014   -0.014
## 357       wbc_m3  ~   max_hct_m3   0.048 -0.014  -0.014   -0.014   -0.014
## 358     lymph_m1  ~ platelets_m3   0.041  0.012   0.012    0.012    0.012
## 359       ast_m1 ~~   max_hct_m3   0.039  0.009   0.009    0.012    0.012
## 360   max_hct_m3  ~       wbc_m1   0.032  0.011   0.011    0.011    0.011
## 361  tourn_no_m3  ~   max_hct_m1   0.031 -0.011  -0.011   -0.011   -0.011
## 362   max_hct_m3  ~   albumin_m1   0.028 -0.010  -0.010   -0.010   -0.010
## 363        age_t  ~   albumin_m1   0.026  0.012   0.012    0.012    0.012
## 364     lymph_m1  ~       ast_m1   0.025 -0.009  -0.009   -0.009   -0.009
## 365       alt_m3  ~     lymph_m1   0.023 -0.010  -0.010   -0.010   -0.010
## 366       alt_m1  ~   albumin_m1   0.022 -0.007  -0.007   -0.007   -0.007
## 367   albumin_m3  ~  tourn_no_m3   0.020 -0.009  -0.009   -0.009   -0.009
## 368     lymph_m3  ~       ast_m1   0.020 -0.008  -0.008   -0.008   -0.008
## 369   albumin_m1  ~     lymph_m3   0.017  0.007   0.007    0.007    0.007
## 370       ast_m1 ~~  tourn_no_m3   0.016 -0.006  -0.006   -0.008   -0.008
## 371       wbc_m1 ~~   albumin_m1   0.016  0.004   0.004    0.008    0.008
## 372   max_hct_m1  ~   albumin_m1   0.014 -0.006  -0.006   -0.006   -0.006
## 373 platelets_m1 ~~   max_hct_m3   0.010 -0.004  -0.004   -0.006   -0.006
## 374  tourn_no_m3  ~     lymph_m1   0.009  0.006   0.006    0.006    0.006
## 375   albumin_m1  ~       ast_m1   0.006  0.004   0.004    0.004    0.004
## 376       ast_m3  ~     lymph_m1   0.005  0.004   0.004    0.004    0.004
## 377       alt_m1  ~   max_hct_m1   0.004  0.003   0.003    0.003    0.003
## 378 platelets_m1  ~     lymph_m3   0.003 -0.003  -0.003   -0.003   -0.003
## 379   max_hct_m1 ~~       alt_m3   0.002 -0.002  -0.002   -0.003   -0.003
## 380   albumin_m3  ~   max_hct_m1   0.001  0.002   0.002    0.002    0.002
## 381       alt_m1  ~     lymph_m3   0.000 -0.001  -0.001   -0.001   -0.001
## 382 platelets_m3  ~          dhf   0.000  0.001   0.001    0.001    0.001
## 383       ast_m1  ~  tourn_no_m3   0.000  0.000   0.000    0.000    0.000
```
Note the indication to  add an association among AST and ALT measures at time 1 and time 3, pointing the following alternatives:

- alt_m3	~	ast_m3 (ast_m3 as having effect on alt_m3);

- ast_m3	~	alt_m3 (alt_m3 as having effect on ast_m3);

- alt_m1	~	ast_m1 (ast_m1 as having effect on alt_m1);

- ast_m1	~	alt_m1  (alt_m1 as having effect on ast_m1);

which does not make sense theoretically. But the following one makes sense:

- ast_m1	~~	alt_m1 (covariance among two enzyme levels)

Both are enzymes which are well known to be increased when hepatotoxicity or liver inflammatory process is involved. Covariances are expected among variables with a common cause, like AST and ALT. And we can add such a relationship for both times -3 and -1 day. 

And possibly considering the evolution in time, it is also reasonable to consider the effect of AST at time day -3 on the ALT at time -1, but not the following:
 - alt_m3	~	ast_m1
 
But note the covariance or correlation measures assess association without no directionality. So, considering the relationship between ALT and AST is reasonable, apparently, such an effect exists, just the algorithm is not able to identify the directionality.


## Adjusted model

```r
library(lavaan)
model="
  dhf~ast_m1+alt_m1+wbc_m1+lymph_m1+albumin_m1+max_hct_m1+platelets_m1+tourn_no_m1
  ast_m1~ast_m3  + alt_m3
  alt_m1~alt_m3 + ast_m3
  wbc_m1~wbc_m3
  lymph_m1~lymph_m3
  albumin_m1~albumin_m3
  max_hct_m1~max_hct_m3
  platelets_m1~platelets_m3
  tourn_no_m1~tourn_no_m3
  
  alt_m3~age_t
  wbc_m3~age_t
  lymph_m3~age_t
  max_hct_m3~age_t
  platelets_m3~age_t
  tourn_no_m3~age_t
  
  ast_m1~~alt_m1
  ast_m3~~alt_m3
  
  "
fit=sem(model=model, data=data,std.ov=TRUE,estimator="MLR",fixed.x = FALSE)
```



```r
fitmeasures(fit)[c('cfi.robust','tli.robust','rmsea.robust','rmsea.ci.lower.robust' , 'rmsea.ci.upper.robust')]
```

```
##            cfi.robust            tli.robust          rmsea.robust 
##            0.79909545            0.75763895            0.10551648 
## rmsea.ci.lower.robust rmsea.ci.upper.robust 
##            0.09572743            0.11548461
```
Look how it improved. But still not sufficient.

```r
parameterestimates(fit,standardized = TRUE)
```

```
##             lhs op          rhs    est    se      z pvalue ci.lower ci.upper
## 1           dhf  ~       ast_m1  0.076 0.112  0.674  0.500   -0.144    0.295
## 2           dhf  ~       alt_m1  0.082 0.104  0.784  0.433   -0.122    0.285
## 3           dhf  ~       wbc_m1  0.006 0.057  0.101  0.920   -0.107    0.118
## 4           dhf  ~     lymph_m1 -0.082 0.058 -1.411  0.158   -0.195    0.032
## 5           dhf  ~   albumin_m1  0.022 0.059  0.379  0.704   -0.093    0.138
## 6           dhf  ~   max_hct_m1  0.186 0.058  3.224  0.001    0.073    0.299
## 7           dhf  ~ platelets_m1 -0.215 0.064 -3.358  0.001   -0.341   -0.090
## 8           dhf  ~  tourn_no_m1  0.156 0.058  2.665  0.008    0.041    0.270
## 9        ast_m1  ~       ast_m3  0.802 0.117  6.856  0.000    0.573    1.031
## 10       ast_m1  ~       alt_m3 -0.258 0.064 -4.022  0.000   -0.383   -0.132
## 11       alt_m1  ~       alt_m3  0.282 0.162  1.741  0.082   -0.035    0.600
## 12       alt_m1  ~       ast_m3  0.481 0.090  5.351  0.000    0.305    0.657
## 13       wbc_m1  ~       wbc_m3  0.735 0.051 14.423  0.000    0.635    0.835
## 14     lymph_m1  ~     lymph_m3  0.419 0.058  7.265  0.000    0.306    0.532
## 15   albumin_m1  ~   albumin_m3  0.531 0.056  9.456  0.000    0.421    0.641
## 16   max_hct_m1  ~   max_hct_m3  0.581 0.073  7.953  0.000    0.438    0.725
## 17 platelets_m1  ~ platelets_m3  0.660 0.056 11.762  0.000    0.550    0.770
## 18  tourn_no_m1  ~  tourn_no_m3  0.526 0.051 10.302  0.000    0.426    0.626
## 19       alt_m3  ~        age_t  0.127 0.040  3.135  0.002    0.048    0.206
## 20       wbc_m3  ~        age_t -0.186 0.053 -3.523  0.000   -0.289   -0.082
## 21     lymph_m3  ~        age_t -0.345 0.061 -5.639  0.000   -0.464   -0.225
## 22   max_hct_m3  ~        age_t  0.341 0.061  5.618  0.000    0.222    0.460
## 23 platelets_m3  ~        age_t -0.274 0.062 -4.422  0.000   -0.395   -0.152
## 24  tourn_no_m3  ~        age_t  0.116 0.062  1.866  0.062   -0.006    0.237
## 25       ast_m1 ~~       alt_m1  0.385 0.193  1.998  0.046    0.007    0.763
## 26       alt_m3 ~~       ast_m3  0.743 0.274  2.710  0.007    0.206    1.281
## 27          dhf ~~          dhf  0.781 0.075 10.464  0.000    0.635    0.927
## 28       ast_m1 ~~       ast_m1  0.595 0.404  1.473  0.141   -0.196    1.386
## 29       alt_m1 ~~       alt_m1  0.486 0.153  3.183  0.001    0.187    0.785
## 30       wbc_m1 ~~       wbc_m1  0.458 0.061  7.460  0.000    0.338    0.578
## 31     lymph_m1 ~~     lymph_m1  0.821 0.082 10.067  0.000    0.661    0.981
## 32   albumin_m1 ~~   albumin_m1  0.716 0.091  7.905  0.000    0.538    0.893
## 33   max_hct_m1 ~~   max_hct_m1  0.659 0.082  7.998  0.000    0.498    0.821
## 34 platelets_m1 ~~ platelets_m1  0.562 0.052 10.910  0.000    0.461    0.663
## 35  tourn_no_m1 ~~  tourn_no_m1  0.721 0.055 13.124  0.000    0.613    0.828
## 36       alt_m3 ~~       alt_m3  0.987 0.408  2.417  0.016    0.187    1.787
## 37       wbc_m3 ~~       wbc_m3  0.962 0.248  3.882  0.000    0.476    1.447
## 38     lymph_m3 ~~     lymph_m3  0.878 0.083 10.547  0.000    0.715    1.041
## 39   max_hct_m3 ~~   max_hct_m3  0.880 0.099  8.869  0.000    0.686    1.075
## 40 platelets_m3 ~~ platelets_m3  0.922 0.091 10.103  0.000    0.743    1.100
## 41  tourn_no_m3 ~~  tourn_no_m3  0.983 0.060 16.407  0.000    0.865    1.100
## 42       ast_m3 ~~       ast_m3  0.996 0.428  2.329  0.020    0.158    1.834
## 43   albumin_m3 ~~   albumin_m3  0.996 0.102  9.727  0.000    0.795    1.197
## 44   albumin_m3 ~~        age_t  0.068 0.060  1.136  0.256   -0.050    0.186
## 45        age_t ~~        age_t  0.996 0.068 14.642  0.000    0.863    1.129
##    std.lv std.all std.nox
## 1   0.076   0.079   0.079
## 2   0.082   0.085   0.085
## 3   0.006   0.006   0.006
## 4  -0.082  -0.085  -0.085
## 5   0.022   0.023   0.023
## 6   0.186   0.193   0.193
## 7  -0.215  -0.224  -0.224
## 8   0.156   0.162   0.162
## 9   0.802   0.803   0.803
## 10 -0.258  -0.259  -0.259
## 11  0.282   0.283   0.283
## 12  0.481   0.480   0.480
## 13  0.735   0.735   0.735
## 14  0.419   0.419   0.419
## 15  0.531   0.531   0.532
## 16  0.581   0.581   0.581
## 17  0.660   0.660   0.660
## 18  0.526   0.526   0.526
## 19  0.127   0.126   0.127
## 20 -0.186  -0.186  -0.186
## 21 -0.345  -0.345  -0.345
## 22  0.341   0.341   0.342
## 23 -0.274  -0.274  -0.274
## 24  0.116   0.116   0.116
## 25  0.385   0.716   0.716
## 26  0.743   0.750   0.750
## 27  0.781   0.848   0.848
## 28  0.595   0.598   0.598
## 29  0.486   0.487   0.487
## 30  0.458   0.460   0.460
## 31  0.821   0.824   0.824
## 32  0.716   0.718   0.718
## 33  0.659   0.662   0.662
## 34  0.562   0.565   0.565
## 35  0.721   0.724   0.724
## 36  0.987   0.984   0.984
## 37  0.962   0.965   0.965
## 38  0.878   0.881   0.881
## 39  0.880   0.883   0.883
## 40  0.922   0.925   0.925
## 41  0.983   0.987   0.987
## 42  0.996   1.000   1.000
## 43  0.996   1.000   0.996
## 44  0.068   0.069   0.068
## 45  0.996   1.000   0.996
```

And that's because other relationships, as indicated further by modification indices:

```r
modificationindices(fit,standardized = TRUE)%>%arrange(-mi)
```

```
##              lhs op          rhs     mi    epc sepc.lv sepc.all sepc.nox
## 1         wbc_m3  ~ platelets_m1 49.241  0.437   0.437    0.437    0.437
## 2         wbc_m3  ~     lymph_m3 47.503 -0.450  -0.450   -0.450   -0.450
## 3       lymph_m3  ~       wbc_m3 47.503 -0.411  -0.411   -0.411   -0.411
## 4         wbc_m3 ~~     lymph_m3 47.503 -0.395  -0.395   -0.430   -0.430
## 5   platelets_m1  ~       wbc_m1 37.130  0.286   0.286    0.286    0.286
## 6         wbc_m3 ~~ platelets_m3 29.204  0.317   0.317    0.337    0.337
## 7         wbc_m3  ~ platelets_m3 29.204  0.344   0.344    0.344    0.344
## 8   platelets_m3  ~       wbc_m3 29.204  0.330   0.330    0.330    0.330
## 9         wbc_m3  ~     lymph_m1 24.912 -0.309  -0.309   -0.309   -0.309
## 10  platelets_m1  ~       wbc_m3 23.496  0.227   0.227    0.227    0.227
## 11  platelets_m1 ~~       wbc_m3 21.352  0.212   0.212    0.288    0.288
## 12    max_hct_m3  ~   max_hct_m1 21.000 -0.967  -0.967   -0.967   -0.967
## 13    max_hct_m1 ~~   max_hct_m3 21.000 -0.638  -0.638   -0.837   -0.837
## 14    max_hct_m1  ~        age_t 21.000  0.247   0.247    0.247    0.248
## 15         age_t  ~   max_hct_m1 20.732  0.370   0.370    0.370    0.370
## 16    albumin_m1  ~ platelets_m1 19.527  0.234   0.234    0.234    0.234
## 17  platelets_m3  ~       wbc_m1 17.671  0.255   0.255    0.255    0.255
## 18    max_hct_m1  ~ platelets_m1 16.870 -0.209  -0.209   -0.209   -0.209
## 19        wbc_m3  ~          dhf 15.966 -0.344  -0.344   -0.331   -0.331
## 20  platelets_m3  ~       ast_m1 15.138 -0.234  -0.234   -0.234   -0.234
## 21        wbc_m1  ~     lymph_m3 14.663  0.162   0.162    0.162    0.162
## 22    albumin_m1 ~~ platelets_m1 14.651  0.151   0.151    0.239    0.239
## 23        wbc_m1  ~       ast_m3 14.392  0.160   0.160    0.160    0.160
## 24   tourn_no_m1  ~   max_hct_m1 14.196  0.200   0.200    0.200    0.200
## 25        wbc_m1 ~~ platelets_m1 13.932  0.118   0.118    0.233    0.233
## 26        wbc_m1 ~~       ast_m3 13.908  0.104   0.104    0.154    0.154
## 27  platelets_m3  ~   albumin_m1 13.740  0.223   0.223    0.223    0.223
## 28        wbc_m1  ~   albumin_m3 13.526 -0.156  -0.156   -0.156   -0.156
## 29        wbc_m1  ~ platelets_m1 13.460  0.155   0.155    0.155    0.155
## 30    max_hct_m1  ~          dhf 13.454  0.308   0.308    0.297    0.297
## 31      lymph_m1  ~       wbc_m1 13.118 -0.205  -0.205   -0.205   -0.205
## 32    max_hct_m1 ~~  tourn_no_m1 12.430  0.152   0.152    0.220    0.220
## 33        wbc_m3  ~       ast_m3 12.157 -0.214  -0.214   -0.214   -0.214
## 34        wbc_m1  ~        age_t 12.133 -0.150  -0.150   -0.150   -0.150
## 35        wbc_m1 ~~       wbc_m3 12.133 -0.776  -0.776   -1.169   -1.169
## 36        wbc_m3  ~       wbc_m1 12.133 -1.695  -1.695   -1.695   -1.695
## 37    albumin_m3  ~       alt_m1 11.898 -0.215  -0.215   -0.215   -0.215
## 38  platelets_m3  ~       ast_m3 11.830 -0.206  -0.206   -0.206   -0.206
## 39  platelets_m3  ~       alt_m1 11.674 -0.205  -0.205   -0.205   -0.205
## 40   tourn_no_m1  ~ platelets_m1 11.529 -0.180  -0.180   -0.180   -0.180
## 41    max_hct_m1 ~~ platelets_m1 11.503 -0.129  -0.129   -0.212   -0.212
## 42    albumin_m1  ~          dhf 11.389 -0.297  -0.297   -0.286   -0.286
## 43         age_t  ~  tourn_no_m1 11.297  0.247   0.247    0.247    0.247
## 44        wbc_m3 ~~  tourn_no_m3 11.169 -0.203  -0.203   -0.208   -0.208
## 45        wbc_m3  ~  tourn_no_m3 11.169 -0.206  -0.206   -0.206   -0.206
## 46   tourn_no_m3  ~       wbc_m3 11.169 -0.211  -0.211   -0.211   -0.211
## 47        wbc_m3  ~  tourn_no_m1 10.973 -0.203  -0.203   -0.203   -0.203
## 48         age_t  ~       wbc_m1 10.921 -0.308  -0.308   -0.308   -0.308
## 49   tourn_no_m3  ~  tourn_no_m1 10.418 -2.035  -2.035   -2.035   -2.035
## 50   tourn_no_m1 ~~  tourn_no_m3 10.418 -1.467  -1.467   -1.743   -1.743
## 51   tourn_no_m1  ~        age_t 10.418  0.172   0.172    0.172    0.173
## 52  platelets_m3 ~~       ast_m3 10.166 -0.126  -0.126   -0.132   -0.132
## 53   tourn_no_m1  ~       alt_m1  9.970  0.167   0.167    0.168    0.168
## 54  platelets_m1  ~          dhf  9.950 -0.226  -0.226   -0.217   -0.217
## 55        wbc_m1 ~~     lymph_m1  9.873 -0.120  -0.120   -0.196   -0.196
## 56  platelets_m1  ~   max_hct_m1  9.856 -0.147  -0.147   -0.147   -0.147
## 57      lymph_m3  ~       wbc_m1  9.605 -0.183  -0.183   -0.183   -0.183
## 58        alt_m3  ~       alt_m1  9.529 -0.961  -0.961   -0.959   -0.959
## 59      lymph_m3 ~~ platelets_m3  9.526 -0.173  -0.173   -0.193   -0.193
## 60      lymph_m3  ~ platelets_m3  9.526 -0.188  -0.188   -0.188   -0.188
## 61  platelets_m3  ~     lymph_m3  9.526 -0.197  -0.197   -0.197   -0.197
## 62  platelets_m1  ~  tourn_no_m1  9.426 -0.144  -0.144   -0.144   -0.144
## 63        wbc_m3  ~       alt_m1  9.379 -0.188  -0.188   -0.188   -0.188
## 64        ast_m3  ~ platelets_m3  9.166 -0.128  -0.128   -0.128   -0.128
## 65    max_hct_m1  ~     lymph_m3  9.103 -0.154  -0.154   -0.154   -0.154
## 66         age_t  ~ platelets_m3  9.025 -2.835  -2.835   -2.835   -2.835
## 67    albumin_m3  ~ platelets_m3  9.025  0.194   0.194    0.194    0.194
## 68  platelets_m3  ~   albumin_m3  9.025  0.181   0.181    0.181    0.181
## 69    albumin_m3  ~       ast_m3  8.962 -0.186  -0.186   -0.186   -0.186
## 70   tourn_no_m1  ~     lymph_m1  8.959 -0.159  -0.159   -0.159   -0.159
## 71  platelets_m1  ~   albumin_m1  8.316  0.135   0.135    0.135    0.135
## 72        ast_m3  ~       alt_m1  8.230  1.164   1.164    1.165    1.165
## 73        wbc_m3 ~~       ast_m3  8.052 -0.115  -0.115   -0.117   -0.117
## 74    max_hct_m1  ~  tourn_no_m1  7.929  0.143   0.143    0.143    0.143
## 75        wbc_m1 ~~     lymph_m3  7.921  0.111   0.111    0.176    0.176
## 76    albumin_m3  ~       alt_m3  7.908 -0.176  -0.176   -0.176   -0.176
## 77    max_hct_m1 ~~       ast_m3  7.907 -0.094  -0.094   -0.116   -0.116
## 78        ast_m3  ~       wbc_m3  7.533 -0.114  -0.114   -0.114   -0.114
## 79    albumin_m1  ~       ast_m3  7.243 -0.142  -0.142   -0.142   -0.142
## 80   tourn_no_m1  ~       ast_m3  6.852  0.139   0.139    0.139    0.139
## 81        alt_m1 ~~       alt_m3  6.822 -0.276  -0.276   -0.398   -0.398
## 82        alt_m1  ~        age_t  6.822  0.081   0.081    0.081    0.081
## 83        alt_m1 ~~       ast_m3  6.822  0.370   0.370    0.531    0.531
## 84        ast_m3  ~ platelets_m1  6.753 -0.108  -0.108   -0.108   -0.108
## 85        wbc_m3  ~       ast_m1  6.753 -0.159  -0.159   -0.159   -0.159
## 86      lymph_m1  ~  tourn_no_m1  6.647 -0.146  -0.146   -0.146   -0.146
## 87   tourn_no_m1  ~       alt_m3  6.600  0.136   0.136    0.136    0.136
## 88   tourn_no_m1  ~ platelets_m3  6.428 -0.135  -0.135   -0.135   -0.135
## 89   tourn_no_m1  ~          dhf  6.403  0.233   0.233    0.224    0.224
## 90    albumin_m1 ~~ platelets_m3  6.220  0.126   0.126    0.156    0.156
## 91      lymph_m3  ~ platelets_m1  6.212 -0.148  -0.148   -0.148   -0.148
## 92        ast_m3  ~  tourn_no_m1  6.195  0.103   0.103    0.103    0.103
## 93   tourn_no_m1  ~       ast_m1  6.165  0.132   0.132    0.132    0.132
## 94    albumin_m3  ~       ast_m1  6.063 -0.153  -0.153   -0.153   -0.153
## 95      lymph_m1 ~~       wbc_m3  6.015 -0.136  -0.136   -0.153   -0.153
## 96      lymph_m3 ~~  tourn_no_m3  5.843  0.140   0.140    0.151    0.151
## 97      lymph_m3  ~  tourn_no_m3  5.843  0.143   0.143    0.143    0.143
## 98   tourn_no_m3  ~     lymph_m3  5.843  0.160   0.160    0.160    0.160
## 99   tourn_no_m1  ~       wbc_m3  5.758 -0.127  -0.127   -0.127   -0.127
## 100  tourn_no_m3 ~~       ast_m3  5.698  0.098   0.098    0.099    0.099
## 101        age_t  ~   max_hct_m3  5.622 -2.289  -2.289   -2.289   -2.289
## 102   max_hct_m3  ~   albumin_m3  5.622  0.139   0.139    0.139    0.140
## 103   albumin_m3  ~   max_hct_m3  5.622  0.157   0.157    0.157    0.157
## 104   max_hct_m1  ~ platelets_m3  5.574 -0.120  -0.120   -0.120   -0.120
## 105   albumin_m1  ~ platelets_m3  5.467  0.124   0.124    0.124    0.124
## 106       ast_m3  ~  tourn_no_m3  5.457  0.097   0.097    0.097    0.097
## 107   max_hct_m1  ~       wbc_m1  5.443 -0.119  -0.119   -0.119   -0.119
## 108       ast_m3  ~   albumin_m1  5.390 -0.096  -0.096   -0.096   -0.096
## 109     lymph_m1 ~~  tourn_no_m1  5.295 -0.110  -0.110   -0.144   -0.144
## 110 platelets_m1 ~~  tourn_no_m1  5.255 -0.091  -0.091   -0.143   -0.143
## 111  tourn_no_m1  ~       wbc_m1  5.168 -0.121  -0.121   -0.121   -0.121
## 112        age_t  ~     lymph_m1  4.953 -0.162  -0.162   -0.162   -0.162
## 113     lymph_m1 ~~     lymph_m3  4.905 -0.340  -0.340   -0.401   -0.401
## 114     lymph_m3  ~     lymph_m1  4.905 -0.415  -0.415   -0.415   -0.415
## 115     lymph_m1  ~        age_t  4.905 -0.134  -0.134   -0.134   -0.134
## 116  tourn_no_m1  ~     lymph_m3  4.653 -0.115  -0.115   -0.115   -0.115
## 117       wbc_m3  ~       alt_m3  4.605 -0.132  -0.132   -0.133   -0.133
## 118 platelets_m1  ~  tourn_no_m3  4.540 -0.100  -0.100   -0.100   -0.100
## 119       ast_m1 ~~     lymph_m3  4.444 -0.066  -0.066   -0.092   -0.092
## 120 platelets_m1  ~       alt_m1  4.330 -0.097  -0.097   -0.098   -0.098
## 121     lymph_m1  ~   max_hct_m3  4.251 -0.118  -0.118   -0.118   -0.118
## 122     lymph_m1  ~       wbc_m3  4.112 -0.115  -0.115   -0.115   -0.115
## 123          dhf  ~   max_hct_m3  4.099 -0.138  -0.138   -0.143   -0.143
## 124          dhf ~~   max_hct_m1  4.099  0.156   0.156    0.218    0.218
## 125  tourn_no_m3  ~ platelets_m1  4.087 -0.127  -0.127   -0.127   -0.127
## 126        age_t  ~       alt_m1  4.024  0.128   0.128    0.128    0.128
## 127   max_hct_m1 ~~       alt_m3  4.002  0.067   0.067    0.083    0.083
## 128  tourn_no_m3  ~       ast_m3  3.937  0.123   0.123    0.123    0.123
## 129   max_hct_m1  ~       ast_m3  3.931 -0.101  -0.101   -0.101   -0.101
## 130 platelets_m1 ~~  tourn_no_m3  3.825 -0.091  -0.091   -0.122   -0.122
## 131       ast_m3  ~     lymph_m3  3.793  0.083   0.083    0.083    0.083
## 132 platelets_m3  ~   max_hct_m1  3.645 -0.117  -0.117   -0.117   -0.117
## 133 platelets_m3  ~  tourn_no_m1  3.594 -0.114  -0.114   -0.114   -0.114
## 134   albumin_m1 ~~       ast_m3  3.558 -0.066  -0.066   -0.078   -0.078
## 135   albumin_m1  ~       alt_m3  3.539 -0.099  -0.099   -0.099   -0.099
## 136          dhf ~~   max_hct_m3  3.505 -0.116  -0.116   -0.140   -0.140
## 137     lymph_m3 ~~       ast_m3  3.479  0.072   0.072    0.077    0.077
## 138       wbc_m1  ~   albumin_m1  3.406 -0.078  -0.078   -0.078   -0.078
## 139  tourn_no_m3  ~          dhf  3.403  0.139   0.139    0.134    0.134
## 140       ast_m3  ~       ast_m1  3.395  0.682   0.682    0.682    0.682
## 141  tourn_no_m1 ~~       wbc_m3  3.368 -0.095  -0.095   -0.114   -0.114
## 142   max_hct_m1  ~       ast_m1  3.299 -0.092  -0.092   -0.092   -0.092
## 143        age_t  ~ platelets_m1  3.294 -0.156  -0.156   -0.156   -0.156
## 144       ast_m3  ~   max_hct_m1  3.277 -0.076  -0.076   -0.076   -0.076
## 145   albumin_m3  ~  tourn_no_m1  3.162 -0.111  -0.111   -0.111   -0.111
## 146 platelets_m3  ~       alt_m3  3.144 -0.107  -0.107   -0.107   -0.107
## 147   max_hct_m3  ~       ast_m3  3.137  0.104   0.104    0.104    0.104
## 148       ast_m1  ~     lymph_m3  3.121 -0.060  -0.060   -0.060   -0.060
## 149       alt_m3  ~       ast_m1  3.115 -0.497  -0.497   -0.495   -0.495
## 150  tourn_no_m3  ~       wbc_m1  3.100 -0.110  -0.110   -0.110   -0.110
## 151       alt_m3  ~   max_hct_m1  3.072  0.073   0.073    0.073    0.073
## 152 platelets_m1  ~       alt_m3  3.049 -0.082  -0.082   -0.082   -0.082
## 153   max_hct_m1  ~       wbc_m3  3.023 -0.088  -0.088   -0.088   -0.088
## 154  tourn_no_m1 ~~ platelets_m3  2.968 -0.088  -0.088   -0.107   -0.107
## 155 platelets_m1  ~       ast_m3  2.924 -0.080  -0.080   -0.080   -0.080
## 156 platelets_m1  ~       ast_m1  2.842 -0.079  -0.079   -0.079   -0.079
## 157       ast_m3  ~          dhf  2.837  0.086   0.086    0.082    0.082
## 158 platelets_m3  ~ platelets_m1  2.830 -0.491  -0.491   -0.491   -0.491
## 159 platelets_m1 ~~ platelets_m3  2.830 -0.276  -0.276   -0.384   -0.384
## 160 platelets_m1  ~        age_t  2.830 -0.082  -0.082   -0.082   -0.082
## 161   albumin_m1 ~~   max_hct_m3  2.814 -0.083  -0.083   -0.105   -0.105
## 162       wbc_m1  ~   max_hct_m1  2.808 -0.071  -0.071   -0.071   -0.071
## 163     lymph_m3  ~   max_hct_m1  2.735 -0.099  -0.099   -0.099   -0.099
## 164       wbc_m1 ~~       alt_m3  2.642 -0.045  -0.045   -0.067   -0.067
## 165  tourn_no_m1  ~   albumin_m1  2.635 -0.086  -0.086   -0.086   -0.086
## 166   max_hct_m1 ~~     lymph_m3  2.594 -0.076  -0.076   -0.100   -0.100
## 167   max_hct_m3 ~~ platelets_m3  2.590 -0.090  -0.090   -0.100   -0.100
## 168 platelets_m3  ~   max_hct_m3  2.590 -0.103  -0.103   -0.103   -0.103
## 169   max_hct_m3  ~ platelets_m3  2.590 -0.098  -0.098   -0.098   -0.098
## 170        age_t  ~     lymph_m3  2.572  1.550   1.550    1.550    1.550
## 171     lymph_m3  ~   albumin_m3  2.572 -0.094  -0.094   -0.094   -0.094
## 172   albumin_m3  ~     lymph_m3  2.572 -0.106  -0.106   -0.106   -0.106
## 173       alt_m1  ~       wbc_m3  2.565 -0.049  -0.049   -0.049   -0.049
## 174   albumin_m1  ~  tourn_no_m1  2.526 -0.084  -0.084   -0.084   -0.084
## 175   max_hct_m3  ~       alt_m1  2.520  0.093   0.093    0.093    0.093
## 176   albumin_m3  ~       wbc_m1  2.492 -0.099  -0.099   -0.099   -0.099
## 177 platelets_m3  ~     lymph_m1  2.488 -0.096  -0.096   -0.096   -0.096
## 178  tourn_no_m3  ~   albumin_m1  2.459 -0.097  -0.097   -0.097   -0.097
## 179       wbc_m1 ~~   max_hct_m1  2.421 -0.053  -0.053   -0.097   -0.097
## 180  tourn_no_m1  ~   albumin_m3  2.399 -0.082  -0.082   -0.082   -0.082
## 181  tourn_no_m1  ~   max_hct_m3  2.390  0.082   0.082    0.082    0.082
## 182   max_hct_m3  ~     lymph_m1  2.347 -0.091  -0.091   -0.091   -0.091
## 183       alt_m1  ~   max_hct_m1  2.343  0.047   0.047    0.047    0.047
## 184   albumin_m1 ~~  tourn_no_m3  2.339 -0.080  -0.080   -0.095   -0.095
## 185          dhf  ~ platelets_m3  2.272  0.111   0.111    0.115    0.115
## 186          dhf ~~ platelets_m1  2.272 -0.095  -0.095   -0.143   -0.143
## 187   albumin_m3  ~ platelets_m1  2.258  0.095   0.095    0.095    0.095
## 188   albumin_m1  ~   max_hct_m3  2.252 -0.079  -0.079   -0.079   -0.079
## 189   albumin_m1  ~  tourn_no_m3  2.230 -0.079  -0.079   -0.079   -0.079
## 190     lymph_m3  ~       ast_m3  2.230  0.087   0.087    0.087    0.087
## 191  tourn_no_m1 ~~       ast_m3  2.204  0.052   0.052    0.061    0.061
## 192          dhf  ~   albumin_m3  2.198  0.097   0.097    0.100    0.101
## 193          dhf ~~   albumin_m1  2.198 -0.130  -0.130   -0.174   -0.174
## 194   max_hct_m3  ~       alt_m3  2.065  0.085   0.085    0.085    0.085
## 195       alt_m3 ~~  tourn_no_m3  2.052 -0.058  -0.058   -0.059   -0.059
## 196       alt_m3  ~  tourn_no_m3  2.052 -0.059  -0.059   -0.059   -0.059
## 197     lymph_m1 ~~   max_hct_m3  2.026 -0.075  -0.075   -0.089   -0.089
## 198        age_t  ~          dhf  1.994  0.099   0.099    0.095    0.095
## 199     lymph_m1  ~          dhf  1.950 -0.153  -0.153   -0.147   -0.147
## 200          dhf ~~  tourn_no_m3  1.945  0.089   0.089    0.102    0.102
## 201       wbc_m1  ~       ast_m1  1.896  0.058   0.058    0.058    0.058
## 202       alt_m1 ~~     lymph_m3  1.863  0.039   0.039    0.059    0.059
## 203       ast_m3  ~   albumin_m3  1.857 -0.056  -0.056   -0.056   -0.056
## 204          dhf ~~ platelets_m3  1.794  0.092   0.092    0.108    0.108
## 205          dhf ~~  tourn_no_m1  1.748 -0.118  -0.118   -0.157   -0.157
## 206          dhf  ~  tourn_no_m3  1.748  0.086   0.086    0.089    0.089
## 207       wbc_m1  ~       alt_m3  1.748  0.056   0.056    0.056    0.056
## 208       wbc_m1  ~ platelets_m3  1.711  0.055   0.055    0.055    0.055
## 209       alt_m1  ~   albumin_m3  1.663 -0.039  -0.039   -0.039   -0.039
## 210       alt_m1  ~   max_hct_m3  1.653  0.039   0.039    0.039    0.039
## 211       wbc_m1  ~       alt_m1  1.624  0.054   0.054    0.054    0.054
## 212       alt_m1  ~       wbc_m1  1.608 -0.039  -0.039   -0.039   -0.039
## 213       wbc_m1  ~     lymph_m1  1.566 -0.053  -0.053   -0.053   -0.053
## 214   max_hct_m3  ~       ast_m1  1.539  0.073   0.073    0.073    0.073
## 215   max_hct_m1 ~~ platelets_m3  1.486 -0.059  -0.059   -0.076   -0.076
## 216       alt_m3 ~~ platelets_m3  1.480  0.048   0.048    0.050    0.050
## 217       alt_m3  ~ platelets_m3  1.480  0.052   0.052    0.052    0.052
## 218       alt_m1  ~  tourn_no_m1  1.474  0.037   0.037    0.037    0.037
## 219       wbc_m3  ~   albumin_m1  1.460  0.074   0.074    0.074    0.074
## 220       alt_m1  ~ platelets_m1  1.430 -0.036  -0.036   -0.036   -0.036
## 221        age_t  ~       ast_m1  1.411  0.076   0.076    0.076    0.076
## 222     lymph_m1  ~  tourn_no_m3  1.394 -0.067  -0.067   -0.067   -0.067
## 223       alt_m1  ~ platelets_m3  1.390 -0.036  -0.036   -0.036   -0.036
## 224       alt_m3  ~     lymph_m3  1.368 -0.051  -0.051   -0.051   -0.051
## 225       alt_m3 ~~     lymph_m3  1.368 -0.045  -0.045   -0.048   -0.048
## 226       alt_m1 ~~       wbc_m3  1.309 -0.034  -0.034   -0.050   -0.050
## 227   max_hct_m1  ~   albumin_m3  1.286 -0.058  -0.058   -0.058   -0.058
## 228   max_hct_m3  ~          dhf  1.254 -0.081  -0.081   -0.078   -0.078
## 229  tourn_no_m1 ~~     lymph_m3  1.253 -0.056  -0.056   -0.070   -0.070
## 230   max_hct_m3  ~ platelets_m1  1.241 -0.066  -0.066   -0.066   -0.066
## 231  tourn_no_m3  ~       ast_m1  1.238  0.069   0.069    0.069    0.069
## 232          dhf  ~       ast_m3  1.214  0.085   0.085    0.089    0.089
## 233       ast_m1 ~~       wbc_m1  1.211 -0.025  -0.025   -0.048   -0.048
## 234       ast_m1 ~~   albumin_m1  1.186  0.031   0.031    0.047    0.047
## 235       ast_m1  ~   albumin_m1  1.176  0.036   0.036    0.037    0.037
## 236       ast_m1 ~~ platelets_m3  1.155 -0.035  -0.035   -0.047   -0.047
## 237   albumin_m3  ~       wbc_m3  1.154  0.068   0.068    0.068    0.068
## 238       wbc_m3  ~   albumin_m3  1.154  0.066   0.066    0.066    0.066
## 239        age_t  ~       wbc_m3  1.154 -0.992  -0.992   -0.992   -0.992
## 240          dhf ~~       ast_m3  1.153  0.047   0.047    0.053    0.053
## 241          dhf ~~       wbc_m3  1.144 -0.084  -0.084   -0.097   -0.097
## 242  tourn_no_m3  ~       alt_m1  1.129  0.066   0.066    0.066    0.066
## 243   max_hct_m3 ~~       ast_m3  1.099  0.041   0.041    0.043    0.043
## 244       alt_m1 ~~  tourn_no_m1  1.039  0.026   0.026    0.044    0.044
## 245       alt_m1  ~          dhf  1.024  0.047   0.047    0.045    0.045
## 246       wbc_m1 ~~  tourn_no_m3  0.976  0.041   0.041    0.062    0.062
## 247       alt_m1 ~~   max_hct_m1  0.927  0.024   0.024    0.042    0.042
## 248   max_hct_m3 ~~  tourn_no_m3  0.910  0.055   0.055    0.060    0.060
## 249  tourn_no_m3  ~   max_hct_m3  0.910  0.063   0.063    0.063    0.063
## 250   max_hct_m3  ~  tourn_no_m3  0.910  0.056   0.056    0.056    0.056
## 251   max_hct_m1 ~~       wbc_m3  0.905 -0.047  -0.047   -0.059   -0.059
## 252     lymph_m1 ~~  tourn_no_m3  0.895 -0.053  -0.053   -0.059   -0.059
## 253   albumin_m1 ~~  tourn_no_m1  0.894 -0.042  -0.042   -0.059   -0.059
## 254          dhf ~~       wbc_m1  0.876  0.048   0.048    0.079    0.079
## 255          dhf  ~       wbc_m3  0.876 -0.076  -0.076   -0.079   -0.079
## 256       wbc_m3  ~   max_hct_m1  0.832 -0.057  -0.057   -0.057   -0.057
## 257     lymph_m1 ~~ platelets_m1  0.826 -0.039  -0.039   -0.057   -0.057
## 258   max_hct_m3  ~  tourn_no_m1  0.824  0.053   0.053    0.053    0.053
## 259       ast_m3  ~   max_hct_m3  0.784  0.038   0.038    0.038    0.038
## 260     lymph_m3  ~          dhf  0.778  0.058   0.058    0.056    0.056
## 261       ast_m1  ~ platelets_m3  0.745 -0.029  -0.029   -0.029   -0.029
## 262       alt_m1 ~~     lymph_m1  0.739 -0.024  -0.024   -0.037   -0.037
## 263       alt_m3  ~   albumin_m3  0.736 -0.035  -0.035   -0.035   -0.035
## 264       ast_m1  ~   max_hct_m1  0.733 -0.029  -0.029   -0.029   -0.029
## 265   max_hct_m1 ~~  tourn_no_m3  0.727 -0.043  -0.043   -0.053   -0.053
## 266 platelets_m1  ~     lymph_m1  0.722 -0.040  -0.040   -0.040   -0.040
## 267          dhf ~~       ast_m1  0.721 -0.049  -0.049   -0.071   -0.071
## 268 platelets_m1 ~~       ast_m3  0.680 -0.025  -0.025   -0.034   -0.034
## 269 platelets_m3 ~~  tourn_no_m3  0.668 -0.049  -0.049   -0.051   -0.051
## 270 platelets_m3  ~  tourn_no_m3  0.668 -0.049  -0.049   -0.049   -0.049
## 271  tourn_no_m3  ~ platelets_m3  0.668 -0.053  -0.053   -0.053   -0.053
## 272       ast_m1 ~~   max_hct_m1  0.645 -0.022  -0.022   -0.035   -0.035
## 273     lymph_m1  ~   albumin_m3  0.634  0.045   0.045    0.045    0.045
## 274       ast_m1  ~ platelets_m1  0.622 -0.027  -0.027   -0.027   -0.027
## 275     lymph_m1 ~~   max_hct_m1  0.604  0.036   0.036    0.048    0.048
## 276     lymph_m1  ~   albumin_m1  0.599  0.044   0.044    0.044    0.044
## 277   albumin_m1 ~~       wbc_m3  0.568  0.039   0.039    0.047    0.047
## 278       wbc_m1 ~~  tourn_no_m1  0.565 -0.027  -0.027   -0.047   -0.047
## 279       ast_m1 ~~     lymph_m1  0.556  0.023   0.023    0.032    0.032
## 280     lymph_m1  ~       alt_m1  0.540 -0.042  -0.042   -0.042   -0.042
## 281       alt_m3 ~~       wbc_m3  0.500  0.028   0.028    0.029    0.029
## 282       alt_m3  ~       wbc_m3  0.500  0.030   0.030    0.029    0.029
## 283          dhf ~~     lymph_m1  0.497 -0.084  -0.084   -0.105   -0.105
## 284          dhf  ~     lymph_m3  0.497  0.043   0.043    0.045    0.045
## 285       wbc_m1  ~   max_hct_m3  0.496 -0.030  -0.030   -0.030   -0.030
## 286   albumin_m1  ~       wbc_m3  0.488  0.037   0.037    0.037    0.037
## 287       alt_m1 ~~   albumin_m1  0.473  0.018   0.018    0.030    0.030
## 288 platelets_m1  ~   albumin_m3  0.463 -0.032  -0.032   -0.032   -0.032
## 289     lymph_m3  ~       alt_m1  0.448  0.039   0.039    0.039    0.039
## 290     lymph_m3  ~   albumin_m1  0.437 -0.039  -0.039   -0.039   -0.039
## 291       alt_m1  ~  tourn_no_m3  0.436  0.020   0.020    0.020    0.020
## 292 platelets_m1 ~~     lymph_m3  0.430 -0.029  -0.029   -0.041   -0.041
## 293       ast_m1  ~          dhf  0.428 -0.038  -0.038   -0.037   -0.037
## 294 platelets_m1  ~   max_hct_m3  0.420 -0.031  -0.031   -0.031   -0.031
## 295       ast_m1  ~  tourn_no_m3  0.409 -0.022  -0.022   -0.022   -0.022
## 296       ast_m1 ~~       alt_m3  0.408  0.075   0.075    0.097    0.097
## 297       ast_m1  ~        age_t  0.408 -0.022  -0.022   -0.022   -0.022
## 298       ast_m1 ~~       ast_m3  0.408 -0.100  -0.100   -0.130   -0.130
## 299       alt_m1  ~     lymph_m1  0.377 -0.019  -0.019   -0.019   -0.019
## 300       ast_m1  ~       wbc_m3  0.374  0.021   0.021    0.021    0.021
## 301   albumin_m1  ~       wbc_m1  0.358  0.032   0.032    0.032    0.032
## 302       alt_m3  ~       wbc_m1  0.356 -0.025  -0.025   -0.025   -0.025
## 303          dhf ~~       alt_m3  0.349 -0.025  -0.025   -0.029   -0.029
## 304       wbc_m1  ~  tourn_no_m3  0.343  0.025   0.025    0.025    0.025
## 305       ast_m3  ~        age_t  0.328 -0.036  -0.036   -0.036   -0.036
## 306       ast_m3  ~       alt_m3  0.328 -0.282  -0.282   -0.283   -0.283
## 307       ast_m1 ~~  tourn_no_m3  0.326 -0.019  -0.019   -0.025   -0.025
## 308   albumin_m1 ~~   max_hct_m1  0.325  0.024   0.024    0.036    0.036
## 309     lymph_m3 ~~   max_hct_m3  0.323 -0.031  -0.031   -0.035   -0.035
## 310     lymph_m3  ~   max_hct_m3  0.323 -0.035  -0.035   -0.035   -0.035
## 311   max_hct_m3  ~     lymph_m3  0.323 -0.035  -0.035   -0.035   -0.035
## 312     lymph_m1  ~   max_hct_m1  0.313 -0.032  -0.032   -0.032   -0.032
## 313       alt_m1 ~~ platelets_m1  0.310 -0.013  -0.013   -0.024   -0.024
## 314   max_hct_m1  ~     lymph_m1  0.304 -0.028  -0.028   -0.028   -0.028
## 315     lymph_m1  ~ platelets_m1  0.303 -0.031  -0.031   -0.031   -0.031
## 316     lymph_m1  ~       ast_m3  0.298 -0.031  -0.031   -0.031   -0.031
## 317          dhf ~~     lymph_m3  0.292  0.030   0.030    0.037    0.037
## 318  tourn_no_m3  ~       alt_m3  0.291  0.034   0.034    0.034    0.034
## 319       ast_m3  ~       wbc_m1  0.284  0.022   0.022    0.022    0.022
## 320     lymph_m1 ~~       ast_m3  0.281 -0.020  -0.020   -0.022   -0.022
## 321          dhf  ~        age_t  0.278 -0.031  -0.031   -0.032   -0.032
## 322     lymph_m1  ~       alt_m3  0.271 -0.029  -0.029   -0.030   -0.030
## 323  tourn_no_m3  ~   albumin_m3  0.261 -0.032  -0.032   -0.032   -0.032
## 324   albumin_m3  ~  tourn_no_m3  0.261 -0.032  -0.032   -0.032   -0.032
## 325        age_t  ~  tourn_no_m3  0.261  0.467   0.467    0.467    0.467
## 326       ast_m1 ~~       wbc_m3  0.254  0.017   0.017    0.022    0.022
## 327       wbc_m1 ~~   max_hct_m3  0.245  0.020   0.020    0.031    0.031
## 328       alt_m1 ~~ platelets_m3  0.245 -0.014  -0.014   -0.022   -0.022
## 329  tourn_no_m1 ~~   max_hct_m3  0.230  0.024   0.024    0.030    0.030
## 330       alt_m3  ~ platelets_m1  0.223  0.020   0.020    0.020    0.020
## 331       alt_m3  ~  tourn_no_m1  0.219 -0.019  -0.019   -0.019   -0.019
## 332   max_hct_m1  ~       alt_m1  0.208 -0.023  -0.023   -0.023   -0.023
## 333       alt_m1 ~~   max_hct_m3  0.188  0.012   0.012    0.019    0.019
## 334   albumin_m1  ~     lymph_m1  0.186  0.023   0.023    0.023    0.023
## 335     lymph_m1 ~~   albumin_m1  0.172  0.020   0.020    0.026    0.026
## 336       alt_m3  ~          dhf  0.172 -0.021  -0.021   -0.020   -0.020
## 337 platelets_m1 ~~       alt_m3  0.168 -0.013  -0.013   -0.017   -0.017
## 338   albumin_m1  ~   max_hct_m1  0.167 -0.022  -0.022   -0.022   -0.022
## 339       alt_m1  ~     lymph_m3  0.159  0.012   0.012    0.012    0.012
## 340       wbc_m1 ~~ platelets_m3  0.148  0.016   0.016    0.024    0.024
## 341   max_hct_m1  ~       alt_m3  0.147  0.019   0.019    0.019    0.019
## 342     lymph_m1 ~~ platelets_m3  0.145 -0.021  -0.021   -0.024   -0.024
## 343       wbc_m1  ~          dhf  0.135 -0.021  -0.021   -0.020   -0.020
## 344       alt_m1 ~~  tourn_no_m3  0.134  0.011   0.011    0.016    0.016
## 345        age_t  ~       ast_m3  0.134 -0.023  -0.023   -0.023   -0.023
## 346   albumin_m1  ~       alt_m1  0.128 -0.019  -0.019   -0.019   -0.019
## 347   max_hct_m1  ~  tourn_no_m3  0.122 -0.018  -0.018   -0.018   -0.018
## 348       ast_m1  ~   max_hct_m3  0.121 -0.012  -0.012   -0.012   -0.012
## 349     lymph_m3  ~       alt_m3  0.119  0.020   0.020    0.020    0.020
## 350       alt_m3  ~   albumin_m1  0.113 -0.014  -0.014   -0.014   -0.014
## 351       wbc_m1  ~  tourn_no_m1  0.110 -0.014  -0.014   -0.014   -0.014
## 352  tourn_no_m1 ~~       alt_m3  0.109  0.012   0.012    0.014    0.014
## 353        age_t  ~       alt_m3  0.098 -0.026  -0.026   -0.026   -0.026
## 354     lymph_m3  ~  tourn_no_m1  0.097  0.018   0.018    0.018    0.018
## 355       ast_m3  ~     lymph_m1  0.096  0.013   0.013    0.013    0.013
## 356       ast_m1  ~   albumin_m3  0.092  0.010   0.010    0.010    0.010
## 357       ast_m1  ~       wbc_m1  0.088 -0.010  -0.010   -0.010   -0.010
## 358       ast_m1 ~~ platelets_m1  0.085 -0.007  -0.007   -0.013   -0.013
## 359          dhf  ~       alt_m3  0.071  0.020   0.020    0.021    0.021
## 360       alt_m3  ~     lymph_m1  0.067 -0.011  -0.011   -0.011   -0.011
## 361   albumin_m3  ~     lymph_m1  0.051  0.014   0.014    0.014    0.014
## 362     lymph_m1 ~~       alt_m3  0.051  0.008   0.008    0.009    0.009
## 363   albumin_m1  ~        age_t  0.050  0.012   0.012    0.012    0.012
## 364        age_t  ~   albumin_m1  0.050  0.016   0.016    0.016    0.016
## 365   albumin_m3  ~   albumin_m1  0.050 -0.240  -0.240   -0.240   -0.240
## 366   albumin_m1 ~~     lymph_m3  0.049  0.011   0.011    0.014    0.014
## 367       wbc_m3  ~   max_hct_m3  0.048 -0.014  -0.014   -0.014   -0.014
## 368       wbc_m3 ~~   max_hct_m3  0.048 -0.013  -0.013   -0.014   -0.014
## 369   max_hct_m3  ~       wbc_m3  0.048 -0.013  -0.013   -0.013   -0.013
## 370       ast_m1 ~~  tourn_no_m1  0.046  0.006   0.006    0.009    0.009
## 371     lymph_m1  ~ platelets_m3  0.041  0.012   0.012    0.012    0.012
## 372          dhf ~~       alt_m1  0.033 -0.008  -0.008   -0.012   -0.012
## 373   max_hct_m3  ~       wbc_m1  0.032  0.011   0.011    0.011    0.011
## 374  tourn_no_m3  ~   max_hct_m1  0.031 -0.011  -0.011   -0.011   -0.011
## 375   max_hct_m3  ~   albumin_m1  0.028 -0.010  -0.010   -0.010   -0.010
## 376       alt_m3  ~   max_hct_m3  0.027  0.007   0.007    0.007    0.007
## 377       alt_m3 ~~   max_hct_m3  0.027  0.006   0.006    0.007    0.007
## 378     lymph_m1  ~       ast_m1  0.025 -0.009  -0.009   -0.009   -0.009
## 379       ast_m1  ~  tourn_no_m1  0.024 -0.005  -0.005   -0.005   -0.005
## 380     lymph_m3  ~       ast_m1  0.020 -0.008  -0.008   -0.008   -0.008
## 381       ast_m1 ~~   max_hct_m3  0.020 -0.004  -0.004   -0.006   -0.006
## 382   albumin_m1 ~~       alt_m3  0.020  0.005   0.005    0.006    0.006
## 383       alt_m1 ~~       wbc_m1  0.018 -0.003  -0.003   -0.006   -0.006
## 384   albumin_m3  ~   max_hct_m1  0.018  0.008   0.008    0.008    0.008
## 385   albumin_m1  ~     lymph_m3  0.017  0.007   0.007    0.007    0.007
## 386       wbc_m1 ~~   albumin_m1  0.016  0.004   0.004    0.008    0.008
## 387   max_hct_m1  ~   albumin_m1  0.014 -0.006  -0.006   -0.006   -0.006
## 388       alt_m1  ~   albumin_m1  0.010 -0.003  -0.003   -0.003   -0.003
## 389 platelets_m1 ~~   max_hct_m3  0.010 -0.004  -0.004   -0.006   -0.006
## 390   albumin_m3  ~          dhf  0.009  0.007   0.007    0.007    0.007
## 391  tourn_no_m3  ~     lymph_m1  0.009  0.006   0.006    0.006    0.006
## 392   albumin_m1  ~       ast_m1  0.006  0.004   0.004    0.004    0.004
## 393       ast_m1  ~     lymph_m1  0.004 -0.002  -0.002   -0.002   -0.002
## 394 platelets_m1  ~     lymph_m3  0.003 -0.003  -0.003   -0.003   -0.003
## 395 platelets_m3  ~          dhf  0.000  0.001   0.001    0.001    0.001
```
## more adjustment

Further adjustments which sounded reasonable were:
- platelet at the time -1D being influenced by white blood cell at -3d
- lymphocytes and all white blood cell counts are obviously correlated:

  `lymph_m1	~~	wbc_m1`
- platelets and albumin levels at m3 also affect the hepatotoxicity at m1, alongside the alt and ast levels.

  `ast_m1~ast_m3  + alt_m3+platelets_m3
  alt_m1~alt_m3 + ast_m3+albumin_m3`
  
- not considered initially, but reasonable: influence of age and haematocrit or white blood cell, thought possibly not exactly a direct causal relationship

  `wbc_m1+max_hct_m1+tourn_no_m1 ~age_t`
  
-  the hepatotoxicity or liver inflammatory process influencing the later haematocrit levels

  `max_hct_m1~max_hct_m3+ast_m3`
  


```r
library(lavaan)
model="
  dhf~alt_m1+lymph_m1+max_hct_m1+platelets_m1+tourn_no_m1
  ast_m1~ast_m3  + alt_m3+platelets_m3
  alt_m1~alt_m3 + ast_m3+albumin_m3
  wbc_m1~wbc_m3 +ast_m3
  lymph_m1~lymph_m3+wbc_m3
  albumin_m1~albumin_m3+platelets_m3
  max_hct_m1~max_hct_m3+ast_m3
  platelets_m1~platelets_m3+wbc_m3
  tourn_no_m1~tourn_no_m3
  
  alt_m3~age_t
  wbc_m3~age_t
  lymph_m3~age_t
  max_hct_m3~age_t
  platelets_m3~age_t
  tourn_no_m3~age_t
  
  wbc_m1+max_hct_m1+tourn_no_m1 ~age_t
  
  ast_m3~~alt_m3
  wbc_m3	~~	lymph_m3+platelets_m3+tourn_no_m3
  ast_m1~~alt_m1+tourn_no_m1+max_hct_m1
  lymph_m1	~~	wbc_m1 +tourn_no_m1
  platelets_m1	~~	max_hct_m1+wbc_m1+albumin_m1
  
  "
fit=sem(model=model, data=data,std.ov=TRUE,estimator="MLR",fixed.x = FALSE)

fitmeasures(fit)[c('cfi.robust','tli.robust','rmsea.robust','rmsea.ci.lower.robust' , 'rmsea.ci.upper.robust')]
```

```
##            cfi.robust            tli.robust          rmsea.robust 
##            0.93149480            0.89890495            0.06814811 
## rmsea.ci.lower.robust rmsea.ci.upper.robust 
##            0.05613666            0.08017566
```

```r
modificationindices(fit,standardized = TRUE)%>%arrange(-mi)
```

```
##              lhs op          rhs     mi    epc sepc.lv sepc.all sepc.nox
## 1       lymph_m3  ~       wbc_m3 14.937 -0.777  -0.777   -0.756   -0.756
## 2         alt_m1  ~       ast_m1 12.800  1.849   1.849    1.833    1.833
## 3       lymph_m1 ~~     lymph_m3 10.959 -0.364  -0.364   -0.432   -0.432
## 4     albumin_m3  ~       alt_m1 10.678 -0.236  -0.236   -0.234   -0.234
## 5         ast_m3  ~       alt_m1 10.582  1.241   1.241    1.234    1.234
## 6          age_t  ~  tourn_no_m1 10.114  1.424   1.424    1.412    1.412
## 7   platelets_m3  ~       wbc_m3 10.057  0.503   0.503    0.489    0.489
## 8   platelets_m3  ~       ast_m1  9.755 -0.211  -0.211   -0.207   -0.207
## 9     max_hct_m1 ~~  tourn_no_m1  9.669  0.120   0.120    0.186    0.186
## 10      lymph_m3  ~ platelets_m3  9.526 -0.188  -0.188   -0.188   -0.188
## 11  platelets_m3  ~     lymph_m3  9.526 -0.197  -0.197   -0.197   -0.197
## 12      lymph_m3 ~~ platelets_m3  9.526 -0.173  -0.173   -0.193   -0.193
## 13         age_t  ~     lymph_m1  9.422 -0.236  -0.236   -0.237   -0.237
## 14      lymph_m1  ~        age_t  9.374 -0.192  -0.192   -0.191   -0.191
## 15      lymph_m3  ~     lymph_m1  9.359 -0.370  -0.370   -0.372   -0.372
## 16        alt_m1 ~~       ast_m3  9.300  0.445   0.445    0.643    0.643
## 17        alt_m1  ~        age_t  9.300  0.097   0.097    0.098    0.098
## 18        alt_m1 ~~       alt_m3  9.300 -0.332  -0.332   -0.482   -0.482
## 19        ast_m3  ~ platelets_m3  9.166 -0.128  -0.128   -0.128   -0.128
## 20    albumin_m3  ~ platelets_m3  9.025  0.194   0.194    0.194    0.194
## 21         age_t  ~ platelets_m3  9.025 -2.835  -2.835   -2.835   -2.835
## 22      lymph_m1 ~~       wbc_m3  9.007 -0.310  -0.310   -0.362   -0.362
## 23  platelets_m3  ~   albumin_m3  8.970  0.172   0.172    0.172    0.173
## 24    albumin_m3  ~       ast_m3  8.962 -0.186  -0.186   -0.186   -0.186
## 25  platelets_m3  ~   albumin_m1  8.453  0.269   0.269    0.268    0.268
## 26   tourn_no_m1  ~ platelets_m1  8.144 -0.155  -0.155   -0.151   -0.151
## 27        alt_m1 ~~   albumin_m1  8.095  0.099   0.099    0.171    0.171
## 28        ast_m3  ~       wbc_m3  7.964 -0.121  -0.121   -0.118   -0.118
## 29    albumin_m3  ~       alt_m3  7.908 -0.176  -0.176   -0.176   -0.176
## 30        alt_m3  ~       alt_m1  7.765 -0.835  -0.835   -0.828   -0.828
## 31   tourn_no_m1  ~   max_hct_m1  7.559  0.154   0.154    0.155    0.155
## 32        wbc_m1  ~   albumin_m3  7.502 -0.103  -0.103   -0.101   -0.102
## 33   tourn_no_m1  ~       ast_m3  7.374  0.139   0.139    0.141    0.141
## 34  platelets_m3 ~~       ast_m3  7.325 -0.102  -0.102   -0.107   -0.107
## 35        ast_m3  ~ platelets_m1  7.244 -0.116  -0.116   -0.112   -0.112
## 36  platelets_m3  ~       ast_m3  7.191 -0.154  -0.154   -0.154   -0.154
## 37  platelets_m3  ~       alt_m1  7.156 -0.154  -0.154   -0.154   -0.154
## 38   tourn_no_m1  ~       alt_m1  7.121  0.138   0.138    0.138    0.138
## 39    max_hct_m1  ~          dhf  7.021  0.206   0.206    0.200    0.200
## 40        ast_m3  ~  tourn_no_m1  6.452  0.107   0.107    0.106    0.106
## 41    albumin_m3  ~       ast_m1  6.231 -0.158  -0.158   -0.155   -0.155
## 42        alt_m1  ~ platelets_m3  6.112 -0.107  -0.107   -0.108   -0.108
## 43   tourn_no_m1  ~       ast_m1  6.049  0.153   0.153    0.152    0.152
## 44   tourn_no_m3  ~       wbc_m3  5.931 -0.346  -0.346   -0.337   -0.337
## 45        wbc_m3  ~     lymph_m1  5.879 -0.302  -0.302   -0.312   -0.312
## 46      lymph_m3  ~  tourn_no_m3  5.843  0.143   0.143    0.143    0.143
## 47   tourn_no_m3  ~     lymph_m3  5.843  0.160   0.160    0.160    0.160
## 48      lymph_m3 ~~  tourn_no_m3  5.843  0.140   0.140    0.151    0.151
## 49   tourn_no_m1 ~~  tourn_no_m3  5.773 -0.745  -0.745   -0.903   -0.903
## 50   tourn_no_m1 ~~       wbc_m3  5.773 -0.104  -0.104   -0.131   -0.131
## 51        wbc_m1  ~   albumin_m1  5.762 -0.168  -0.168   -0.165   -0.165
## 52    albumin_m3  ~   max_hct_m3  5.622  0.157   0.157    0.157    0.157
## 53    max_hct_m3  ~   albumin_m3  5.622  0.139   0.139    0.139    0.140
## 54         age_t  ~   max_hct_m3  5.622 -2.289  -2.289   -2.289   -2.289
## 55        wbc_m1  ~     lymph_m3  5.508  0.103   0.103    0.102    0.102
## 56        ast_m3  ~  tourn_no_m3  5.457  0.097   0.097    0.097    0.097
## 57        wbc_m1  ~     lymph_m1  5.426  0.243   0.243    0.241    0.241
## 58        ast_m3  ~   albumin_m1  5.424 -0.096  -0.096   -0.096   -0.096
## 59        alt_m1  ~       wbc_m1  5.329 -0.080  -0.080   -0.082   -0.082
## 60      lymph_m1  ~   max_hct_m3  5.155 -0.124  -0.124   -0.124   -0.124
## 61        ast_m3  ~       ast_m1  5.114  0.710   0.710    0.699    0.699
## 62    max_hct_m1 ~~     lymph_m3  5.049 -0.091  -0.091   -0.125   -0.125
## 63        wbc_m1 ~~     lymph_m3  5.041  0.074   0.074    0.123    0.123
## 64      lymph_m1  ~  tourn_no_m1  4.923 -0.236  -0.236   -0.232   -0.232
## 65   tourn_no_m1  ~       alt_m3  4.882  0.114   0.114    0.115    0.115
## 66        wbc_m3  ~  tourn_no_m1  4.834 -0.138  -0.138   -0.141   -0.141
## 67   tourn_no_m1  ~       wbc_m3  4.769 -0.120  -0.120   -0.118   -0.118
## 68    max_hct_m1 ~~       ast_m3  4.762 -0.090  -0.090   -0.117   -0.117
## 69    max_hct_m1 ~~       alt_m3  4.762  0.067   0.067    0.088    0.088
## 70    max_hct_m1  ~       alt_m3  4.762  0.156   0.156    0.157    0.157
## 71   tourn_no_m3 ~~       ast_m3  4.682  0.087   0.087    0.088    0.088
## 72        alt_m1  ~   albumin_m1  4.592  0.106   0.106    0.106    0.106
## 73      lymph_m3  ~   max_hct_m1  4.547 -0.126  -0.126   -0.125   -0.125
## 74    max_hct_m1  ~  tourn_no_m1  4.437  0.102   0.102    0.102    0.102
## 75        wbc_m3  ~       alt_m1  4.413 -0.111  -0.111   -0.113   -0.113
## 76        ast_m3  ~          dhf  4.406  0.096   0.096    0.093    0.093
## 77        ast_m1 ~~     lymph_m3  4.344 -0.060  -0.060   -0.084   -0.084
## 78        wbc_m3  ~       ast_m3  4.321 -0.109  -0.109   -0.112   -0.112
## 79         age_t  ~       alt_m1  4.104  0.130   0.130    0.130    0.130
## 80    albumin_m1  ~       ast_m3  4.071 -0.102  -0.102   -0.102   -0.102
## 81           dhf  ~   max_hct_m3  4.046 -0.138  -0.138   -0.142   -0.142
## 82    max_hct_m1  ~ platelets_m3  3.830 -0.098  -0.098   -0.099   -0.099
## 83   tourn_no_m1 ~~     lymph_m3  3.829 -0.087  -0.087   -0.112   -0.112
## 84        ast_m3  ~     lymph_m3  3.793  0.083   0.083    0.083    0.083
## 85        alt_m1  ~ platelets_m1  3.791 -0.069  -0.069   -0.067   -0.067
## 86        alt_m1  ~       wbc_m3  3.779 -0.063  -0.063   -0.062   -0.062
## 87    max_hct_m1 ~~       wbc_m3  3.756 -0.078  -0.078   -0.105   -0.105
## 88         age_t  ~   max_hct_m1  3.685  0.573   0.573    0.570    0.570
## 89           dhf ~~   max_hct_m1  3.648  0.127   0.127    0.186    0.186
## 90    max_hct_m1  ~ platelets_m1  3.619 -0.135  -0.135   -0.131   -0.131
## 91        alt_m3  ~   max_hct_m1  3.553  0.085   0.085    0.084    0.084
## 92        alt_m1  ~  tourn_no_m1  3.544  0.072   0.072    0.072    0.072
## 93        alt_m3  ~       ast_m1  3.489 -0.470  -0.470   -0.462   -0.462
## 94    albumin_m3  ~  tourn_no_m1  3.357 -0.118  -0.118   -0.117   -0.117
## 95  platelets_m1  ~        age_t  3.234 -0.080  -0.080   -0.083   -0.083
## 96           dhf ~~   max_hct_m3  3.181 -0.106  -0.106   -0.128   -0.128
## 97    max_hct_m3  ~       ast_m3  3.137  0.104   0.104    0.104    0.104
## 98        ast_m1  ~     lymph_m3  3.107 -0.059  -0.059   -0.060   -0.060
## 99   tourn_no_m1  ~   albumin_m1  3.102 -0.091  -0.091   -0.091   -0.091
## 100  tourn_no_m1  ~   albumin_m3  3.085 -0.090  -0.090   -0.091   -0.091
## 101       wbc_m3  ~       ast_m1  3.085 -0.093  -0.093   -0.095   -0.095
## 102       wbc_m3  ~       alt_m3  3.020 -0.091  -0.091   -0.094   -0.094
## 103       wbc_m1  ~       alt_m3  2.971 -0.098  -0.098   -0.097   -0.097
## 104       wbc_m1 ~~       alt_m3  2.971 -0.042  -0.042   -0.066   -0.066
## 105       wbc_m1 ~~       ast_m3  2.971  0.057   0.057    0.089    0.089
## 106     lymph_m1  ~          dhf  2.913 -0.184  -0.184   -0.177   -0.177
## 107  tourn_no_m1  ~ platelets_m3  2.853 -0.090  -0.090   -0.091   -0.091
## 108          dhf  ~   albumin_m1  2.755  0.172   0.172    0.178    0.178
## 109   max_hct_m1  ~     lymph_m3  2.718 -0.083  -0.083   -0.083   -0.083
## 110   max_hct_m1  ~   albumin_m3  2.718 -0.078  -0.078   -0.078   -0.078
## 111 platelets_m3  ~ platelets_m1  2.694  0.296   0.296    0.286    0.286
## 112     lymph_m3  ~   albumin_m3  2.691 -0.089  -0.089   -0.089   -0.089
## 113  tourn_no_m3  ~       ast_m3  2.620  0.099   0.099    0.099    0.099
## 114     lymph_m3  ~       wbc_m1  2.611  0.126   0.126    0.128    0.128
## 115 platelets_m1  ~       ast_m1  2.594 -0.069  -0.069   -0.070   -0.070
## 116        age_t  ~ platelets_m1  2.593 -0.146  -0.146   -0.141   -0.141
## 117   max_hct_m3  ~ platelets_m3  2.590 -0.098  -0.098   -0.098   -0.098
## 118   albumin_m3  ~       wbc_m1  2.588 -0.103  -0.103   -0.104   -0.104
## 119  tourn_no_m1  ~       wbc_m1  2.580 -0.086  -0.086   -0.088   -0.088
## 120        age_t  ~     lymph_m3  2.572  1.550   1.550    1.550    1.550
## 121   albumin_m3  ~     lymph_m3  2.572 -0.106  -0.106   -0.106   -0.106
## 122  tourn_no_m1 ~~       ast_m3  2.556  0.054   0.054    0.065    0.065
## 123   max_hct_m3  ~       alt_m1  2.554  0.094   0.094    0.094    0.094
## 124  tourn_no_m3  ~   albumin_m1  2.539 -0.098  -0.098   -0.097   -0.097
## 125 platelets_m3  ~   max_hct_m3  2.509 -0.097  -0.097   -0.097   -0.097
## 126   max_hct_m3 ~~ platelets_m3  2.509 -0.085  -0.085   -0.094   -0.094
## 127 platelets_m3  ~   max_hct_m1  2.482 -0.099  -0.099   -0.098   -0.098
## 128       alt_m1  ~   max_hct_m3  2.449  0.048   0.048    0.049    0.049
## 129     lymph_m1  ~  tourn_no_m3  2.434 -0.087  -0.087   -0.086   -0.086
## 130   albumin_m3  ~ platelets_m1  2.431  0.102   0.102    0.099    0.099
## 131          dhf  ~   albumin_m3  2.430  0.086   0.086    0.089    0.089
## 132       wbc_m3  ~          dhf  2.420 -0.090  -0.090   -0.090   -0.090
## 133   max_hct_m3  ~     lymph_m1  2.296 -0.089  -0.089   -0.089   -0.089
## 134 platelets_m1  ~       alt_m1  2.295 -0.063  -0.063   -0.065   -0.065
## 135  tourn_no_m3  ~          dhf  2.292  0.111   0.111    0.108    0.108
## 136       alt_m1  ~   max_hct_m1  2.281  0.056   0.056    0.056    0.056
## 137  tourn_no_m1  ~          dhf  2.280  0.136   0.136    0.133    0.133
## 138 platelets_m1  ~  tourn_no_m1  2.248 -0.061  -0.061   -0.063   -0.063
## 139   max_hct_m1  ~       wbc_m3  2.222 -0.075  -0.075   -0.074   -0.074
## 140  tourn_no_m3  ~ platelets_m1  2.186 -0.099  -0.099   -0.095   -0.095
## 141       alt_m3 ~~  tourn_no_m3  2.124 -0.058  -0.058   -0.059   -0.059
## 142   albumin_m1 ~~   max_hct_m3  2.101 -0.068  -0.068   -0.087   -0.087
## 143   max_hct_m3  ~       alt_m3  2.065  0.085   0.085    0.085    0.085
## 144   albumin_m1  ~        age_t  2.053  0.075   0.075    0.075    0.075
## 145     lymph_m1 ~~  tourn_no_m3  2.052 -0.076  -0.076   -0.086   -0.086
## 146       alt_m3  ~  tourn_no_m3  2.052 -0.059  -0.059   -0.059   -0.059
## 147     lymph_m1 ~~   max_hct_m3  2.021 -0.072  -0.072   -0.085   -0.085
## 148   albumin_m1  ~       alt_m3  2.000 -0.071  -0.071   -0.072   -0.072
## 149 platelets_m3  ~       wbc_m1  1.954  0.112   0.112    0.114    0.114
## 150 platelets_m1 ~~ platelets_m3  1.927 -0.207  -0.207   -0.304   -0.304
## 151          dhf  ~ platelets_m3  1.920  0.099   0.099    0.102    0.102
## 152       wbc_m1  ~ platelets_m3  1.887  0.058   0.058    0.057    0.057
## 153       ast_m3  ~   albumin_m3  1.857 -0.056  -0.056   -0.056   -0.056
## 154          dhf ~~ platelets_m3  1.841  0.080   0.080    0.094    0.094
## 155     lymph_m1 ~~   max_hct_m1  1.830  0.055   0.055    0.079    0.079
## 156 platelets_m3  ~  tourn_no_m1  1.768 -0.080  -0.080   -0.079   -0.079
## 157       ast_m3  ~       wbc_m1  1.749 -0.061  -0.061   -0.062   -0.062
## 158 platelets_m1  ~          dhf  1.711 -0.086  -0.086   -0.086   -0.086
## 159   max_hct_m1 ~~ platelets_m3  1.695 -0.058  -0.058   -0.077   -0.077
## 160       wbc_m3  ~   max_hct_m1  1.673 -0.074  -0.074   -0.076   -0.076
## 161       wbc_m1  ~ platelets_m1  1.671  0.098   0.098    0.094    0.094
## 162          dhf  ~  tourn_no_m3  1.625  0.083   0.083    0.086    0.086
## 163       wbc_m1 ~~       wbc_m3  1.614  0.085   0.085    0.139    0.139
## 164     lymph_m3 ~~       ast_m3  1.602  0.045   0.045    0.048    0.048
## 165   max_hct_m3  ~       ast_m1  1.582  0.075   0.075    0.074    0.074
## 166   max_hct_m1  ~       wbc_m1  1.571 -0.063  -0.063   -0.064   -0.064
## 167       alt_m3 ~~ platelets_m3  1.545  0.047   0.047    0.049    0.049
## 168   albumin_m1 ~~       ast_m3  1.517 -0.041  -0.041   -0.049   -0.049
## 169          dhf ~~       ast_m3  1.484  0.047   0.047    0.053    0.053
## 170       alt_m3  ~ platelets_m3  1.480  0.052   0.052    0.052    0.052
## 171 platelets_m3  ~       alt_m3  1.411 -0.068  -0.068   -0.069   -0.069
## 172       alt_m3 ~~     lymph_m3  1.401 -0.042  -0.042   -0.045   -0.045
## 173       wbc_m3 ~~       ast_m3  1.374 -0.040  -0.040   -0.042   -0.042
## 174     lymph_m1  ~ platelets_m3  1.373  0.068   0.068    0.067    0.067
## 175       alt_m3  ~     lymph_m3  1.368 -0.051  -0.051   -0.051   -0.051
## 176          dhf ~~  tourn_no_m3  1.351  0.072   0.072    0.082    0.082
## 177   max_hct_m3  ~ platelets_m1  1.336 -0.071  -0.071   -0.069   -0.069
## 178          dhf ~~  tourn_no_m1  1.312 -0.096  -0.096   -0.131   -0.131
## 179 platelets_m1  ~  tourn_no_m3  1.269 -0.046  -0.046   -0.047   -0.047
## 180  tourn_no_m1  ~     lymph_m3  1.242 -0.062  -0.062   -0.062   -0.062
## 181   max_hct_m1 ~~  tourn_no_m3  1.227 -0.051  -0.051   -0.066   -0.066
## 182       wbc_m1  ~          dhf  1.225 -0.146  -0.146   -0.140   -0.140
## 183   albumin_m3  ~       wbc_m3  1.221  0.072   0.072    0.070    0.070
## 184        age_t  ~       wbc_m3  1.221 -1.050  -1.050   -1.022   -1.022
## 185       ast_m1 ~~       ast_m3  1.210 -0.178  -0.178   -0.235   -0.235
## 186       ast_m1  ~        age_t  1.210 -0.039  -0.039   -0.040   -0.040
## 187       ast_m1 ~~       alt_m3  1.210  0.133   0.133    0.176    0.176
## 188       alt_m1 ~~     lymph_m1  1.177 -0.029  -0.029   -0.047   -0.047
## 189       ast_m1  ~  tourn_no_m1  1.175 -0.066  -0.066   -0.066   -0.066
## 190       wbc_m1 ~~ platelets_m3  1.174  0.039   0.039    0.063    0.063
## 191       ast_m1  ~   albumin_m1  1.163 -0.083  -0.083   -0.084   -0.084
## 192   max_hct_m3 ~~       ast_m3  1.099  0.041   0.041    0.043    0.043
## 193       alt_m1 ~~     lymph_m3  1.081  0.027   0.027    0.042    0.042
## 194        age_t  ~       ast_m1  1.074  0.068   0.068    0.067    0.067
## 195   albumin_m1 ~~  tourn_no_m3  1.072 -0.051  -0.051   -0.061   -0.061
## 196       ast_m1  ~       wbc_m3  1.053  0.037   0.037    0.036    0.036
## 197       alt_m1  ~          dhf  1.048  0.057   0.057    0.056    0.056
## 198   albumin_m1  ~       wbc_m1  1.044 -0.070  -0.070   -0.072   -0.072
## 199          dhf  ~       ast_m3  1.039  0.078   0.078    0.081    0.081
## 200       ast_m3  ~   max_hct_m1  1.011 -0.052  -0.052   -0.051   -0.051
## 201     lymph_m1  ~       alt_m1  1.003 -0.055  -0.055   -0.054   -0.054
## 202       alt_m1 ~~ platelets_m3  1.002 -0.037  -0.037   -0.056   -0.056
## 203          dhf ~~     lymph_m1  0.961 -0.108  -0.108   -0.136   -0.136
## 204       alt_m1 ~~  tourn_no_m1  0.947  0.035   0.035    0.060    0.060
## 205 platelets_m1 ~~  tourn_no_m3  0.945 -0.038  -0.038   -0.054   -0.054
## 206   albumin_m1 ~~ platelets_m3  0.939  0.116   0.116    0.144    0.144
## 207  tourn_no_m3  ~   max_hct_m3  0.934  0.063   0.063    0.063    0.063
## 208   max_hct_m3 ~~  tourn_no_m3  0.934  0.055   0.055    0.059    0.059
## 209          dhf  ~       ast_m1  0.915  0.164   0.164    0.167    0.167
## 210   max_hct_m3  ~  tourn_no_m3  0.910  0.056   0.056    0.056    0.056
## 211     lymph_m1  ~       wbc_m1  0.905  0.193   0.193    0.194    0.194
## 212       ast_m1  ~   albumin_m3  0.889 -0.045  -0.045   -0.045   -0.045
## 213       ast_m1  ~       alt_m1  0.889  1.128   1.128    1.138    1.138
## 214   max_hct_m3  ~  tourn_no_m1  0.874  0.057   0.057    0.056    0.056
## 215     lymph_m3  ~ platelets_m1  0.847 -0.056  -0.056   -0.054   -0.054
## 216  tourn_no_m1 ~~ platelets_m3  0.843 -0.043  -0.043   -0.054   -0.054
## 217          dhf ~~       alt_m3  0.818 -0.033  -0.033   -0.038   -0.038
## 218        age_t  ~   albumin_m1  0.814  0.070   0.070    0.069    0.069
## 219   albumin_m1  ~   max_hct_m3  0.806 -0.045  -0.045   -0.045   -0.045
## 220   max_hct_m1  ~       ast_m1  0.797 -0.074  -0.074   -0.074   -0.074
## 221   albumin_m1  ~  tourn_no_m3  0.786 -0.044  -0.044   -0.045   -0.045
## 222       ast_m3  ~   max_hct_m3  0.784  0.038   0.038    0.038    0.038
## 223       wbc_m1  ~       alt_m1  0.783 -0.046  -0.046   -0.045   -0.045
## 224       ast_m1  ~       wbc_m1  0.744  0.038   0.038    0.039    0.039
## 225       alt_m1 ~~ platelets_m1  0.741 -0.018  -0.018   -0.036   -0.036
## 226       alt_m3  ~   albumin_m3  0.736 -0.035  -0.035   -0.035   -0.035
## 227   max_hct_m1  ~   albumin_m1  0.715 -0.041  -0.041   -0.041   -0.041
## 228 platelets_m1  ~   max_hct_m1  0.705 -0.057  -0.057   -0.059   -0.059
## 229   max_hct_m3  ~   max_hct_m1  0.696 -0.231  -0.231   -0.230   -0.230
## 230       ast_m1 ~~     lymph_m1  0.694  0.025   0.025    0.037    0.037
## 231  tourn_no_m3  ~       ast_m1  0.683  0.051   0.051    0.051    0.051
## 232 platelets_m3  ~  tourn_no_m3  0.668 -0.049  -0.049   -0.049   -0.049
## 233  tourn_no_m3  ~ platelets_m3  0.668 -0.053  -0.053   -0.053   -0.053
## 234 platelets_m3 ~~  tourn_no_m3  0.668 -0.049  -0.049   -0.051   -0.051
## 235     lymph_m1  ~       alt_m3  0.667 -0.045  -0.045   -0.045   -0.045
## 236     lymph_m3  ~       ast_m1  0.661 -0.045  -0.045   -0.044   -0.044
## 237   max_hct_m1  ~  tourn_no_m3  0.657 -0.038  -0.038   -0.038   -0.038
## 238  tourn_no_m3  ~  tourn_no_m1  0.649 -0.256  -0.256   -0.254   -0.254
## 239          dhf ~~       wbc_m3  0.629 -0.038  -0.038   -0.045   -0.045
## 240 platelets_m1 ~~  tourn_no_m1  0.628 -0.026  -0.026   -0.044   -0.044
## 241   max_hct_m3  ~          dhf  0.624 -0.056  -0.056   -0.054   -0.054
## 242 platelets_m1 ~~       wbc_m3  0.620 -0.062  -0.062   -0.092   -0.092
## 243       alt_m3  ~          dhf  0.593 -0.034  -0.034   -0.033   -0.033
## 244     lymph_m1 ~~ platelets_m3  0.566  0.037   0.037    0.043    0.043
## 245 platelets_m1 ~~       ast_m3  0.557 -0.020  -0.020   -0.029   -0.029
## 246       alt_m3  ~       wbc_m3  0.529  0.031   0.031    0.030    0.030
## 247          dhf  ~       wbc_m3  0.525 -0.047  -0.047   -0.048   -0.048
## 248  tourn_no_m3  ~       alt_m1  0.508  0.044   0.044    0.044    0.044
## 249     lymph_m3  ~   albumin_m1  0.505 -0.039  -0.039   -0.038   -0.038
## 250 platelets_m1  ~       wbc_m1  0.496  0.114   0.114    0.120    0.120
## 251       ast_m1 ~~ platelets_m3  0.484 -0.055  -0.055   -0.075   -0.075
## 252 platelets_m1  ~     lymph_m3  0.471  0.029   0.029    0.030    0.030
## 253   albumin_m1  ~  tourn_no_m1  0.470 -0.035  -0.035   -0.035   -0.035
## 254       alt_m1  ~  tourn_no_m3  0.445  0.020   0.020    0.021    0.021
## 255       ast_m1  ~   max_hct_m1  0.442 -0.035  -0.035   -0.036   -0.036
## 256   albumin_m1 ~~     lymph_m3  0.436  0.029   0.029    0.036    0.036
## 257       ast_m1  ~  tourn_no_m3  0.431 -0.022  -0.022   -0.022   -0.022
## 258 platelets_m3  ~     lymph_m1  0.415 -0.038  -0.038   -0.038   -0.038
## 259          dhf  ~     lymph_m3  0.403  0.039   0.039    0.040    0.040
## 260   albumin_m1  ~       alt_m1  0.399  0.032   0.032    0.032    0.032
## 261       wbc_m1 ~~  tourn_no_m3  0.392  0.023   0.023    0.036    0.036
## 262        age_t  ~       wbc_m1  0.390  0.141   0.141    0.143    0.143
## 263     lymph_m1  ~   max_hct_m1  0.388 -0.034  -0.034   -0.034   -0.034
## 264       alt_m1  ~     lymph_m1  0.386 -0.019  -0.019   -0.019   -0.019
## 265       alt_m3  ~       wbc_m1  0.381 -0.026  -0.026   -0.027   -0.027
## 266       alt_m1 ~~       wbc_m1  0.378 -0.016  -0.016   -0.036   -0.036
## 267       alt_m1 ~~       wbc_m3  0.378 -0.016  -0.016   -0.024   -0.024
## 268       alt_m1 ~~   max_hct_m3  0.352  0.017   0.017    0.026    0.026
## 269       alt_m1 ~~   max_hct_m1  0.349 -0.019  -0.019   -0.036   -0.036
## 270     lymph_m1  ~       ast_m3  0.342 -0.032  -0.032   -0.032   -0.032
## 271 platelets_m1  ~       ast_m3  0.331 -0.025  -0.025   -0.025   -0.025
## 272       ast_m3  ~        age_t  0.328 -0.036  -0.036   -0.036   -0.036
## 273       ast_m3  ~       alt_m3  0.328 -0.282  -0.282   -0.283   -0.283
## 274  tourn_no_m3  ~   albumin_m3  0.328 -0.035  -0.035   -0.035   -0.035
## 275     lymph_m3  ~       ast_m3  0.327  0.031   0.031    0.031    0.031
## 276   max_hct_m3  ~     lymph_m3  0.323 -0.035  -0.035   -0.035   -0.035
## 277       wbc_m3  ~       wbc_m1  0.316  0.084   0.084    0.087    0.087
## 278       ast_m1  ~   max_hct_m3  0.305 -0.019  -0.019   -0.019   -0.019
## 279          dhf  ~        age_t  0.299 -0.034  -0.034   -0.035   -0.035
## 280       wbc_m1  ~  tourn_no_m3  0.294  0.021   0.021    0.020    0.020
## 281       ast_m1 ~~  tourn_no_m3  0.291 -0.018  -0.018   -0.023   -0.023
## 282          dhf ~~       alt_m1  0.278 -0.028  -0.028   -0.046   -0.046
## 283       ast_m1 ~~ platelets_m1  0.275 -0.012  -0.012   -0.023   -0.023
## 284        age_t  ~  tourn_no_m3  0.261  0.467   0.467    0.467    0.467
## 285   albumin_m3  ~  tourn_no_m3  0.261 -0.032  -0.032   -0.032   -0.032
## 286   albumin_m1 ~~  tourn_no_m1  0.252 -0.021  -0.021   -0.030   -0.030
## 287       ast_m1  ~          dhf  0.248 -0.063  -0.063   -0.062   -0.062
## 288 platelets_m1 ~~       alt_m3  0.243  0.013   0.013    0.018    0.018
## 289       alt_m3  ~ platelets_m1  0.240  0.021   0.021    0.020    0.020
## 290       alt_m3  ~  tourn_no_m1  0.232 -0.020  -0.020   -0.020   -0.020
## 291     lymph_m3 ~~   max_hct_m3  0.215 -0.023  -0.023   -0.027   -0.027
## 292     lymph_m3  ~   max_hct_m3  0.215 -0.027  -0.027   -0.027   -0.027
## 293 platelets_m1  ~   max_hct_m3  0.200 -0.019  -0.019   -0.019   -0.019
## 294     lymph_m3  ~  tourn_no_m1  0.199 -0.025  -0.025   -0.025   -0.025
## 295          dhf ~~ platelets_m1  0.194 -0.025  -0.025   -0.040   -0.040
## 296   albumin_m1  ~ platelets_m1  0.188 -0.078  -0.078   -0.076   -0.076
## 297       wbc_m3  ~ platelets_m1  0.184  0.059   0.059    0.059    0.059
## 298          dhf  ~       wbc_m1  0.182 -0.040  -0.040   -0.042   -0.042
## 299       wbc_m1 ~~  tourn_no_m1  0.176 -0.013  -0.013   -0.025   -0.025
## 300       wbc_m3  ~   albumin_m3  0.174 -0.022  -0.022   -0.023   -0.023
## 301   max_hct_m1  ~     lymph_m1  0.165  0.019   0.019    0.019    0.019
## 302  tourn_no_m3  ~   max_hct_m1  0.157 -0.026  -0.026   -0.026   -0.026
## 303  tourn_no_m3  ~     lymph_m1  0.153 -0.024  -0.024   -0.024   -0.024
## 304     lymph_m1  ~ platelets_m1  0.145  0.024   0.024    0.023    0.023
## 305   albumin_m3  ~          dhf  0.142  0.025   0.025    0.024    0.024
## 306        age_t  ~       ast_m3  0.134 -0.023  -0.023   -0.023   -0.023
## 307   albumin_m1 ~~   max_hct_m1  0.128  0.014   0.014    0.022    0.022
## 308     lymph_m3  ~       alt_m3  0.126 -0.019  -0.019   -0.019   -0.019
## 309   albumin_m1  ~     lymph_m1  0.125  0.018   0.018    0.018    0.018
## 310       alt_m3  ~   albumin_m1  0.113 -0.014  -0.014   -0.014   -0.014
## 311        age_t  ~          dhf  0.107  0.025   0.025    0.024    0.024
## 312     lymph_m1 ~~       ast_m3  0.106 -0.012  -0.012   -0.013   -0.013
## 313     lymph_m1  ~   albumin_m1  0.102  0.018   0.018    0.017    0.017
## 314        age_t  ~       alt_m3  0.098 -0.026  -0.026   -0.026   -0.026
## 315   albumin_m1  ~       ast_m1  0.098  0.019   0.019    0.019    0.019
## 316   albumin_m1  ~   max_hct_m1  0.095  0.016   0.016    0.016    0.016
## 317       ast_m3  ~     lymph_m1  0.094  0.013   0.013    0.013    0.013
## 318  tourn_no_m1 ~~   max_hct_m3  0.087  0.014   0.014    0.018    0.018
## 319  tourn_no_m1  ~   max_hct_m3  0.087  0.016   0.016    0.016    0.016
## 320       alt_m1  ~     lymph_m3  0.086  0.009   0.009    0.009    0.009
## 321 platelets_m1  ~     lymph_m1  0.086  0.013   0.013    0.013    0.013
## 322 platelets_m1  ~       alt_m3  0.085 -0.012  -0.012   -0.013   -0.013
## 323   albumin_m1  ~       wbc_m3  0.082 -0.016  -0.016   -0.016   -0.016
## 324     lymph_m1  ~       ast_m1  0.082 -0.016  -0.016   -0.016   -0.016
## 325       alt_m3 ~~       wbc_m3  0.074 -0.009  -0.009   -0.010   -0.010
## 326  tourn_no_m1 ~~       alt_m3  0.070  0.009   0.009    0.011    0.011
## 327       wbc_m3  ~   albumin_m1  0.066 -0.014  -0.014   -0.014   -0.014
## 328       alt_m3  ~     lymph_m1  0.065 -0.011  -0.011   -0.011   -0.011
## 329  tourn_no_m3  ~       alt_m3  0.062  0.015   0.015    0.015    0.015
## 330   albumin_m3  ~   albumin_m1  0.056  0.054   0.054    0.054    0.054
## 331       alt_m1 ~~  tourn_no_m3  0.051  0.007   0.007    0.010    0.010
## 332   max_hct_m3  ~       wbc_m3  0.051 -0.014  -0.014   -0.013   -0.013
## 333   albumin_m3  ~     lymph_m1  0.050  0.014   0.014    0.014    0.014
## 334       ast_m1 ~~   max_hct_m3  0.043 -0.006  -0.006   -0.009   -0.009
## 335   albumin_m1  ~     lymph_m3  0.040  0.010   0.010    0.010    0.010
## 336     lymph_m3  ~       alt_m1  0.037 -0.010  -0.010   -0.010   -0.010
## 337 platelets_m1  ~   albumin_m1  0.036 -0.015  -0.015   -0.015   -0.015
## 338 platelets_m3  ~          dhf  0.036  0.013   0.013    0.013    0.013
## 339     lymph_m1 ~~   albumin_m1  0.035  0.008   0.008    0.011    0.011
## 340   max_hct_m3  ~       wbc_m1  0.033  0.011   0.011    0.011    0.011
## 341       wbc_m1 ~~   max_hct_m3  0.031 -0.006  -0.006   -0.010   -0.010
## 342       wbc_m1  ~   max_hct_m3  0.031 -0.007  -0.007   -0.007   -0.007
## 343       wbc_m1  ~       ast_m1  0.031 -0.012  -0.012   -0.011   -0.011
## 344   max_hct_m3  ~   albumin_m1  0.028 -0.010  -0.010   -0.010   -0.010
## 345       alt_m3 ~~   max_hct_m3  0.027  0.006   0.006    0.007    0.007
## 346       alt_m3  ~   max_hct_m3  0.027  0.007   0.007    0.007    0.007
## 347       ast_m1  ~ platelets_m1  0.025 -0.007  -0.007   -0.007   -0.007
## 348       wbc_m3 ~~   max_hct_m3  0.024  0.008   0.008    0.008    0.008
## 349       wbc_m3  ~   max_hct_m3  0.024  0.009   0.009    0.009    0.009
## 350   albumin_m3  ~   max_hct_m1  0.020  0.010   0.010    0.010    0.010
## 351   albumin_m1 ~~       alt_m3  0.018 -0.004  -0.004   -0.005   -0.005
## 352 platelets_m1  ~   albumin_m3  0.017 -0.005  -0.005   -0.006   -0.006
## 353 platelets_m1 ~~   max_hct_m3  0.017  0.005   0.005    0.008    0.008
## 354          dhf  ~       alt_m3  0.016 -0.009  -0.009   -0.009   -0.009
## 355   albumin_m1  ~          dhf  0.012  0.017   0.017    0.017    0.017
## 356          dhf ~~     lymph_m3  0.011  0.005   0.005    0.006    0.006
## 357     lymph_m1 ~~ platelets_m1  0.010 -0.004  -0.004   -0.006   -0.006
## 358     lymph_m3  ~          dhf  0.008 -0.005  -0.005   -0.005   -0.005
## 359       wbc_m1  ~  tourn_no_m1  0.006 -0.003  -0.003   -0.003   -0.003
## 360   max_hct_m1  ~       alt_m1  0.006  0.005   0.005    0.005    0.005
## 361  tourn_no_m3  ~       wbc_m1  0.006 -0.006  -0.006   -0.006   -0.006
## 362     lymph_m1 ~~       alt_m3  0.005 -0.003  -0.003   -0.003   -0.003
## 363       ast_m1  ~     lymph_m1  0.005 -0.002  -0.002   -0.002   -0.002
## 364     lymph_m1  ~   albumin_m3  0.004 -0.003  -0.003   -0.003   -0.003
## 365       wbc_m1 ~~   max_hct_m1  0.003  0.002   0.002    0.003    0.003
## 366  tourn_no_m1  ~     lymph_m1  0.003 -0.006  -0.006   -0.006   -0.006
## 367       wbc_m1  ~   max_hct_m1  0.002 -0.002  -0.002   -0.002   -0.002
## 368 platelets_m1 ~~     lymph_m3  0.002 -0.002  -0.002   -0.002   -0.002
## 369       ast_m1 ~~       wbc_m3  0.002 -0.001  -0.001   -0.002   -0.002
## 370   albumin_m1 ~~       wbc_m3  0.000  0.000   0.000    0.000    0.000
```


```r
parameterestimates(fit,standardized = TRUE)
```

```
##             lhs op          rhs    est    se      z pvalue ci.lower ci.upper
## 1           dhf  ~       alt_m1  0.140 0.059  2.366  0.018    0.024    0.256
## 2           dhf  ~     lymph_m1 -0.083 0.053 -1.551  0.121   -0.187    0.022
## 3           dhf  ~   max_hct_m1  0.180 0.056  3.214  0.001    0.070    0.290
## 4           dhf  ~ platelets_m1 -0.213 0.054 -3.952  0.000   -0.318   -0.107
## 5           dhf  ~  tourn_no_m1  0.153 0.058  2.658  0.008    0.040    0.266
## 6        ast_m1  ~       ast_m3  0.793 0.113  7.033  0.000    0.572    1.014
## 7        ast_m1  ~       alt_m3 -0.253 0.061 -4.126  0.000   -0.374   -0.133
## 8        ast_m1  ~ platelets_m3 -0.037 0.026 -1.444  0.149   -0.088    0.013
## 9        alt_m1  ~       alt_m3  0.280 0.161  1.740  0.082   -0.035    0.595
## 10       alt_m1  ~       ast_m3  0.475 0.092  5.171  0.000    0.295    0.655
## 11       alt_m1  ~   albumin_m3 -0.040 0.036 -1.105  0.269   -0.110    0.031
## 12       wbc_m1  ~       wbc_m3  0.744 0.049 15.157  0.000    0.648    0.840
## 13       wbc_m1  ~       ast_m3  0.161 0.048  3.385  0.001    0.068    0.255
## 14     lymph_m1  ~     lymph_m3  0.390 0.065  6.040  0.000    0.263    0.516
## 15     lymph_m1  ~       wbc_m3 -0.143 0.047 -3.026  0.002   -0.235   -0.050
## 16   albumin_m1  ~   albumin_m3  0.526 0.055  9.501  0.000    0.417    0.634
## 17   albumin_m1  ~ platelets_m3  0.123 0.055  2.246  0.025    0.016    0.230
## 18   max_hct_m1  ~   max_hct_m3  0.509 0.060  8.541  0.000    0.392    0.625
## 19   max_hct_m1  ~       ast_m3 -0.092 0.095 -0.973  0.331   -0.279    0.094
## 20 platelets_m1  ~ platelets_m3  0.528 0.058  9.046  0.000    0.414    0.643
## 21 platelets_m1  ~       wbc_m3  0.265 0.068  3.900  0.000    0.132    0.398
## 22  tourn_no_m1  ~  tourn_no_m3  0.497 0.052  9.551  0.000    0.395    0.599
## 23       alt_m3  ~        age_t  0.127 0.040  3.135  0.002    0.048    0.206
## 24       wbc_m3  ~        age_t -0.186 0.053 -3.523  0.000   -0.289   -0.082
## 25     lymph_m3  ~        age_t -0.345 0.061 -5.639  0.000   -0.464   -0.225
## 26   max_hct_m3  ~        age_t  0.341 0.061  5.618  0.000    0.222    0.460
## 27 platelets_m3  ~        age_t -0.274 0.062 -4.422  0.000   -0.395   -0.152
## 28  tourn_no_m3  ~        age_t  0.116 0.062  1.866  0.062   -0.006    0.237
## 29       wbc_m1  ~        age_t -0.147 0.039 -3.749  0.000   -0.224   -0.070
## 30   max_hct_m1  ~        age_t  0.218 0.049  4.433  0.000    0.122    0.314
## 31  tourn_no_m1  ~        age_t  0.153 0.051  2.993  0.003    0.053    0.254
## 32       alt_m3 ~~       ast_m3  0.743 0.274  2.710  0.007    0.206    1.281
## 33       wbc_m3 ~~     lymph_m3 -0.329 0.049 -6.663  0.000   -0.426   -0.232
## 34       wbc_m3 ~~ platelets_m3  0.246 0.055  4.505  0.000    0.139    0.352
## 35       wbc_m3 ~~  tourn_no_m3 -0.137 0.049 -2.815  0.005   -0.233   -0.042
## 36       ast_m1 ~~       alt_m1  0.370 0.181  2.046  0.041    0.016    0.725
## 37       ast_m1 ~~  tourn_no_m1  0.020 0.019  1.020  0.308   -0.018    0.057
## 38       ast_m1 ~~   max_hct_m1 -0.028 0.023 -1.256  0.209   -0.073    0.016
## 39       wbc_m1 ~~     lymph_m1 -0.131 0.037 -3.497  0.000   -0.204   -0.057
## 40     lymph_m1 ~~  tourn_no_m1 -0.117 0.045 -2.622  0.009   -0.205   -0.030
## 41   max_hct_m1 ~~ platelets_m1 -0.120 0.040 -3.012  0.003   -0.198   -0.042
## 42       wbc_m1 ~~ platelets_m1  0.122 0.025  4.791  0.000    0.072    0.172
## 43   albumin_m1 ~~ platelets_m1  0.158 0.038  4.152  0.000    0.083    0.232
## 44          dhf ~~          dhf  0.784 0.075 10.395  0.000    0.636    0.932
## 45       ast_m1 ~~       ast_m1  0.574 0.381  1.508  0.132   -0.172    1.320
## 46       alt_m1 ~~       alt_m1  0.482 0.150  3.217  0.001    0.188    0.776
## 47       wbc_m1 ~~       wbc_m1  0.412 0.049  8.405  0.000    0.316    0.508
## 48     lymph_m1 ~~     lymph_m1  0.808 0.080 10.093  0.000    0.651    0.965
## 49   albumin_m1 ~~   albumin_m1  0.701 0.086  8.133  0.000    0.532    0.870
## 50   max_hct_m1 ~~   max_hct_m1  0.600 0.071  8.422  0.000    0.460    0.739
## 51 platelets_m1 ~~ platelets_m1  0.506 0.046 10.954  0.000    0.415    0.596
## 52  tourn_no_m1 ~~  tourn_no_m1  0.693 0.054 12.707  0.000    0.586    0.799
## 53       alt_m3 ~~       alt_m3  0.987 0.408  2.417  0.016    0.187    1.787
## 54       wbc_m3 ~~       wbc_m3  0.909 0.239  3.805  0.000    0.441    1.377
## 55     lymph_m3 ~~     lymph_m3  0.878 0.083 10.547  0.000    0.715    1.041
## 56   max_hct_m3 ~~   max_hct_m3  0.880 0.099  8.869  0.000    0.686    1.075
## 57 platelets_m3 ~~ platelets_m3  0.922 0.091 10.103  0.000    0.743    1.100
## 58  tourn_no_m3 ~~  tourn_no_m3  0.983 0.060 16.407  0.000    0.865    1.100
## 59       ast_m3 ~~       ast_m3  0.996 0.428  2.329  0.020    0.158    1.834
## 60          dhf ~~       ast_m1  0.012 0.025  0.489  0.625   -0.037    0.061
## 61          dhf ~~       wbc_m1  0.015 0.027  0.557  0.578   -0.038    0.068
## 62          dhf ~~   albumin_m1 -0.023 0.045 -0.518  0.605   -0.112    0.065
## 63       ast_m1 ~~       wbc_m1 -0.016 0.020 -0.773  0.439   -0.056    0.024
## 64       ast_m1 ~~   albumin_m1  0.043 0.053  0.811  0.417   -0.061    0.146
## 65       wbc_m1 ~~   albumin_m1  0.025 0.037  0.674  0.500   -0.048    0.098
## 66   albumin_m3 ~~   albumin_m3  0.996 0.102  9.727  0.000    0.795    1.197
## 67   albumin_m3 ~~        age_t  0.068 0.060  1.136  0.256   -0.050    0.186
## 68        age_t ~~        age_t  0.996 0.068 14.642  0.000    0.863    1.129
##    std.lv std.all std.nox
## 1   0.140   0.144   0.144
## 2  -0.083  -0.086  -0.086
## 3   0.180   0.186   0.186
## 4  -0.213  -0.213  -0.213
## 5   0.153   0.157   0.157
## 6   0.793   0.805   0.805
## 7  -0.253  -0.258  -0.258
## 8  -0.037  -0.038  -0.038
## 9   0.280   0.282   0.282
## 10  0.475   0.478   0.478
## 11 -0.040  -0.040  -0.040
## 12  0.744   0.715   0.715
## 13  0.161   0.159   0.159
## 14  0.390   0.387   0.387
## 15 -0.143  -0.138  -0.138
## 16  0.526   0.528   0.529
## 17  0.123   0.123   0.123
## 18  0.509   0.511   0.511
## 19 -0.092  -0.093  -0.093
## 20  0.528   0.546   0.546
## 21  0.265   0.266   0.266
## 22  0.497   0.501   0.501
## 23  0.127   0.126   0.127
## 24 -0.186  -0.191  -0.191
## 25 -0.345  -0.345  -0.345
## 26  0.341   0.341   0.342
## 27 -0.274  -0.274  -0.274
## 28  0.116   0.116   0.116
## 29 -0.147  -0.145  -0.146
## 30  0.218   0.219   0.219
## 31  0.153   0.155   0.155
## 32  0.743   0.750   0.750
## 33 -0.329  -0.369  -0.369
## 34  0.246   0.268   0.268
## 35 -0.137  -0.145  -0.145
## 36  0.370   0.704   0.704
## 37  0.020   0.031   0.031
## 38 -0.028  -0.048  -0.048
## 39 -0.131  -0.226  -0.226
## 40 -0.117  -0.157  -0.157
## 41 -0.120  -0.218  -0.218
## 42  0.122   0.268   0.268
## 43  0.158   0.265   0.265
## 44  0.784   0.842   0.842
## 45  0.574   0.593   0.593
## 46  0.482   0.490   0.490
## 47  0.412   0.403   0.403
## 48  0.808   0.802   0.802
## 49  0.701   0.709   0.709
## 50  0.600   0.607   0.607
## 51  0.506   0.542   0.542
## 52  0.693   0.707   0.707
## 53  0.987   0.984   0.984
## 54  0.909   0.964   0.964
## 55  0.878   0.881   0.881
## 56  0.880   0.883   0.883
## 57  0.922   0.925   0.925
## 58  0.983   0.987   0.987
## 59  0.996   1.000   1.000
## 60  0.012   0.018   0.018
## 61  0.015   0.027   0.027
## 62 -0.023  -0.031  -0.031
## 63 -0.016  -0.032  -0.032
## 64  0.043   0.067   0.067
## 65  0.025   0.047   0.047
## 66  0.996   1.000   0.996
## 67  0.068   0.069   0.068
## 68  0.996   1.000   0.996
```


```r
ly<-matrix(NA,18,2)
depVar='dhf'
med1=c('ast_m1','alt_m1','wbc_m1','lymph_m1','albumin_m1','max_hct_m1','platelets_m1','tourn_no_m1')
med2=c('ast_m3','alt_m3','wbc_m3','lymph_m3','albumin_m3','max_hct_m3','platelets_m3','tourn_no_m3')
indepVar='age_t'
labels=c()
labels[1]=depVar
ly[1,]=c(1,0)
y=1
for (x in c(1:length(med1))){
  ly[y+x,]=c(0.6,(x/8*1.6-1))
  labels[(x+y)]<-med1[x]
}
y=9
for (x in c(1:length(med2))){
  ly[y+x,]=c(-1,(x/8*1.6-1))
  labels[(x+y)]<-med2[x]
}
labels[18]=indepVar
ly[18,]=c(-0.5,1)

table2<-parameterEstimates(fit,standardized=TRUE)%>%as.data.frame()
table2<-table2[!table2$lhs==table2$rhs,]
b<-gettextf('%.3f \n p=%.3f', table2$std.all, digits=table2$pvalue)
fittitles<-fitmeasures(fit)[c('cfi.robust','tli.robust','rmsea.robust','rmsea.ci.lower.robust' , 'rmsea.ci.upper.robust')]%>%round(3)
semPaths(fit, layout=ly,
         edgeLabels=b,
         residuals=FALSE,
         style='ram',
         what='est',
         whatLabels = "std",
         cut=0.3,
         sizeMan = 10, # Size of manifest variables
  sizeMan2=3,edge.label.cex = 0.6,label.cex=1,
  
  nCharNodes = 0,fade=TRUE,
  mar = c(5,2,2,2))

text(0,-1.3,paste0(names(fittitles),': ',fittitles,collapse='; '),cex=1.5)
title('Adjusted Model')
```

![](1b_Park2018_iteration_files/figure-html/unnamed-chunk-19-1.png)<!-- -->

![Adjusted Model](https://github.com/TomoeGusberti/tomoegusberti.github.io/blob/master/_collections/SEM_Examples/1_Park2018_files/Park2018_iteration_adj.png?raw=true)

# Non-sense models also fits well
To illustrate how we must not adjust blindly following the modification indices, we present how non-sense models can also fit well.
## Blind fit
The following is a blindly fitted model.
Note how some paths does not make sense already because temporal issues. But its fit measure is very good.


```r
library(lavaan)
Blind_model="
  dhf~alt_m1+lymph_m1+max_hct_m1+platelets_m1
  ast_m1~ast_m3 
  alt_m1~alt_m3
  wbc_m1~wbc_m3
  lymph_m1~lymph_m3
  albumin_m1~albumin_m3
  max_hct_m1~max_hct_m3
  platelets_m1~platelets_m3
  tourn_no_m1~tourn_no_m3
  
  alt_m3~age_t
  wbc_m3~age_t
  lymph_m3~age_t
  max_hct_m3~age_t
  platelets_m3~age_t
  tourn_no_m3~age_t
  
  wbc_m3	~	platelets_m1
  platelets_m3	~	wbc_m3
  alt_m3	~	ast_m3
  alt_m1	~	ast_m1
   wbc_m3	~	lymph_m3
   tourn_no_m1	~	dhf #OK
  wbc_m1	~	ast_m3
  max_hct_m1	~~	max_hct_m3
  dhf	~~	tourn_no_m1
  wbc_m1	~	platelets_m1
  albumin_m1	~	platelets_m1
  ast_m3	~	wbc_m1
  ast_m3	~	albumin_m1
  alt_m3	~	ast_m1
  lymph_m1	~	wbc_m1
  lymph_m3	~	lymph_m1
  "
Blind_fit=sem(model=Blind_model, data=data,std.ov=TRUE,estimator="MLR",fixed.x = FALSE)

fitmeasures(Blind_fit)[c('cfi.robust','tli.robust','rmsea.robust','rmsea.ci.lower.robust' , 'rmsea.ci.upper.robust')]
```

```
##            cfi.robust            tli.robust          rmsea.robust 
##            0.94808077            0.93312099            0.05542859 
## rmsea.ci.lower.robust rmsea.ci.upper.robust 
##            0.04328331            0.06727630
```

```r
modificationindices(Blind_fit,standardized = TRUE)%>%arrange(-mi)
```

```
##              lhs op          rhs     mi    epc sepc.lv sepc.all sepc.nox
## 1   platelets_m1  ~       wbc_m3 13.673  0.359   0.359    0.349    0.349
## 2     albumin_m1  ~       alt_m1 12.984  0.228   0.228    0.231    0.231
## 3     albumin_m1  ~       ast_m1 12.384  0.211   0.211    0.213    0.213
## 4    tourn_no_m3  ~       wbc_m3 11.747 -0.222  -0.222   -0.215   -0.215
## 5          age_t  ~ platelets_m3 10.989 -2.580  -2.580   -2.575   -2.575
## 6   platelets_m1  ~   max_hct_m1 10.812 -0.155  -0.155   -0.155   -0.155
## 7     max_hct_m1  ~ platelets_m1 10.811 -0.162  -0.162   -0.162   -0.162
## 8          age_t  ~       wbc_m1 10.145 -0.299  -0.299   -0.289   -0.289
## 9   platelets_m3  ~     lymph_m3 10.053 -0.234  -0.234   -0.234   -0.234
## 10    max_hct_m1 ~~ platelets_m1  9.888 -0.115  -0.115   -0.148   -0.148
## 11  platelets_m1  ~       wbc_m1  9.309  0.262   0.262    0.254    0.254
## 12    max_hct_m3  ~ platelets_m1  9.010 -0.135  -0.135   -0.134   -0.134
## 13    albumin_m3  ~ platelets_m3  8.983  0.194   0.194    0.194    0.194
## 14        wbc_m1  ~   albumin_m3  8.717 -0.119  -0.119   -0.122   -0.123
## 15        ast_m1 ~~   albumin_m1  8.657  0.120   0.120    0.187    0.187
## 16  platelets_m3  ~   albumin_m3  8.656  0.169   0.169    0.169    0.169
## 17   tourn_no_m3  ~          dhf  8.490  0.186   0.186    0.183    0.183
## 18  platelets_m1 ~~ platelets_m3  8.403 -0.441  -0.441   -0.642   -0.642
## 19  platelets_m3  ~ platelets_m1  8.403 -0.783  -0.783   -0.784   -0.784
## 20  platelets_m3  ~       ast_m1  7.621 -0.164  -0.164   -0.164   -0.164
## 21  platelets_m1 ~~       wbc_m3  7.588  0.293   0.293    0.481    0.481
## 22        wbc_m3  ~ platelets_m3  7.588 -0.329  -0.329   -0.338   -0.338
## 23        wbc_m3 ~~ platelets_m3  7.588 -0.276  -0.276   -0.371   -0.371
## 24        alt_m1  ~        age_t  7.493  0.084   0.084    0.084    0.084
## 25  platelets_m1  ~          dhf  7.394 -0.177  -0.177   -0.174   -0.174
## 26      lymph_m1  ~ platelets_m1  6.729  0.200   0.200    0.200    0.200
## 27      lymph_m1  ~  tourn_no_m3  6.727 -0.171  -0.171   -0.171   -0.171
## 28        wbc_m3  ~  tourn_no_m1  6.431 -0.137  -0.137   -0.138   -0.138
## 29      lymph_m1 ~~  tourn_no_m3  6.387 -0.164  -0.164   -0.158   -0.158
## 30        ast_m1  ~ platelets_m3  6.138 -0.124  -0.124   -0.123   -0.123
## 31  platelets_m3  ~       wbc_m1  6.128 -0.261  -0.261   -0.253   -0.253
## 32           dhf  ~  tourn_no_m1  5.988  0.290   0.290    0.287    0.287
## 33           dhf  ~  tourn_no_m3  5.988  0.138   0.138    0.140    0.140
## 34           dhf ~~  tourn_no_m3  5.960  0.135   0.135    0.152    0.152
## 35   tourn_no_m3  ~     lymph_m3  5.856  0.160   0.160    0.159    0.159
## 36        wbc_m1  ~     lymph_m3  5.736  0.121   0.121    0.125    0.125
## 37         age_t  ~   max_hct_m3  5.622 -2.289  -2.289   -2.289   -2.289
## 38    albumin_m3  ~   max_hct_m3  5.622  0.157   0.157    0.157    0.157
## 39           dhf  ~   max_hct_m3  5.492 -0.133  -0.133   -0.135   -0.135
## 40    albumin_m3  ~       alt_m1  5.232 -0.155  -0.155   -0.155   -0.155
## 41        ast_m1  ~ platelets_m1  5.112 -0.113  -0.113   -0.113   -0.113
## 42        ast_m1 ~~ platelets_m3  5.106 -0.102  -0.102   -0.142   -0.142
## 43        wbc_m1  ~       alt_m3  5.020 -0.134  -0.134   -0.139   -0.139
## 44    max_hct_m1  ~          dhf  5.019  0.150   0.150    0.148    0.148
## 45      lymph_m3  ~ platelets_m1  4.886 -0.248  -0.248   -0.248   -0.248
## 46  platelets_m1 ~~   max_hct_m3  4.781 -0.072  -0.072   -0.103   -0.103
## 47  platelets_m1  ~  tourn_no_m3  4.738 -0.102  -0.102   -0.102   -0.102
## 48    max_hct_m3  ~ platelets_m3  4.659 -0.099  -0.099   -0.099   -0.099
## 49      lymph_m1  ~ platelets_m3  4.459  0.161   0.161    0.161    0.161
## 50    max_hct_m1 ~~       ast_m3  4.437 -0.103  -0.103   -0.099   -0.099
## 51    max_hct_m3 ~~ platelets_m3  4.410 -0.085  -0.085   -0.099   -0.099
## 52      lymph_m1  ~  tourn_no_m1  4.226 -0.148  -0.148   -0.144   -0.144
## 53    albumin_m1  ~       ast_m3  4.218  0.187   0.187    0.190    0.190
## 54        wbc_m1 ~~       alt_m3  4.195 -0.052  -0.052   -0.129   -0.129
## 55  platelets_m3  ~       alt_m1  4.162 -0.122  -0.122   -0.123   -0.123
## 56   tourn_no_m3  ~ platelets_m1  4.078 -0.127  -0.127   -0.127   -0.127
## 57        wbc_m1  ~        age_t  4.058 -0.082  -0.082   -0.084   -0.085
## 58  platelets_m1 ~~  tourn_no_m3  3.934 -0.092  -0.092   -0.124   -0.124
## 59   tourn_no_m3  ~       ast_m3  3.929  0.123   0.123    0.123    0.123
## 60         age_t  ~ platelets_m1  3.917 -0.165  -0.165   -0.165   -0.165
## 61  platelets_m3  ~   max_hct_m1  3.874 -0.124  -0.124   -0.124   -0.124
## 62      lymph_m3  ~ platelets_m3  3.709 -0.236  -0.236   -0.236   -0.236
## 63           dhf ~~   max_hct_m1  3.707  0.112   0.112    0.120    0.120
## 64        wbc_m3 ~~  tourn_no_m3  3.691 -0.096  -0.096   -0.120   -0.120
## 65        wbc_m3  ~  tourn_no_m3  3.691 -0.098  -0.098   -0.101   -0.101
## 66    max_hct_m1 ~~       alt_m3  3.640  0.059   0.059    0.090    0.090
## 67    max_hct_m1  ~       ast_m1  3.602 -0.092  -0.092   -0.092   -0.092
## 68      lymph_m1 ~~ platelets_m3  3.472  0.123   0.123    0.128    0.128
## 69   tourn_no_m3  ~  tourn_no_m1  3.469  0.423   0.423    0.412    0.412
## 70  platelets_m1  ~        age_t  3.423 -0.090  -0.090   -0.090   -0.091
## 71           dhf  ~       wbc_m3  3.420 -0.099  -0.099   -0.098   -0.098
## 72   tourn_no_m3  ~       wbc_m1  3.315 -0.118  -0.118   -0.114   -0.114
## 73        wbc_m1 ~~       ast_m3  3.279 -0.314  -0.314   -0.493   -0.493
## 74        wbc_m1  ~   albumin_m1  3.279 -0.078  -0.078   -0.080   -0.080
## 75      lymph_m3 ~~ platelets_m3  3.263 -0.193  -0.193   -0.131   -0.131
## 76           dhf ~~       wbc_m3  3.251 -0.068  -0.068   -0.093   -0.093
## 77           dhf  ~       ast_m3  3.110  0.115   0.115    0.117    0.117
## 78        alt_m3  ~   max_hct_m1  3.056  0.077   0.077    0.076    0.076
## 79    max_hct_m1  ~     lymph_m3  3.030 -0.090  -0.090   -0.090   -0.090
## 80      lymph_m3  ~       wbc_m3  3.020 -0.367  -0.367   -0.358   -0.358
## 81        wbc_m1 ~~     lymph_m1  3.012 -0.099  -0.099   -0.148   -0.148
## 82    max_hct_m1  ~       ast_m3  2.981 -0.084  -0.084   -0.084   -0.084
## 83         age_t  ~       wbc_m3  2.918 -0.410  -0.410   -0.398   -0.398
## 84  platelets_m3  ~   albumin_m1  2.851  0.116   0.116    0.115    0.115
## 85    albumin_m1  ~       wbc_m3  2.842 -0.096  -0.096   -0.094   -0.094
## 86    albumin_m3  ~  tourn_no_m1  2.830 -0.110  -0.110   -0.107   -0.107
## 87  platelets_m3  ~   max_hct_m3  2.706 -0.100  -0.100   -0.100   -0.100
## 88    albumin_m1 ~~       ast_m3  2.678  0.150   0.150    0.184    0.184
## 89        alt_m1  ~   max_hct_m1  2.678  0.050   0.050    0.050    0.050
## 90        ast_m3  ~   albumin_m3  2.628 -0.119  -0.119   -0.119   -0.119
## 91        alt_m1  ~       wbc_m3  2.611 -0.052  -0.052   -0.050   -0.050
## 92   tourn_no_m1 ~~       wbc_m3  2.610 -0.065  -0.065   -0.083   -0.083
## 93        ast_m1  ~     lymph_m3  2.607 -0.080  -0.080   -0.080   -0.080
## 94           dhf ~~ platelets_m3  2.554  0.084   0.084    0.102    0.102
## 95  platelets_m3  ~       ast_m3  2.515 -0.099  -0.099   -0.100   -0.100
## 96   tourn_no_m3  ~   albumin_m1  2.508 -0.099  -0.099   -0.098   -0.098
## 97           dhf ~~   max_hct_m3  2.490 -0.105  -0.105   -0.125   -0.125
## 98        ast_m3  ~        age_t  2.478 -0.101  -0.101   -0.100   -0.101
## 99    max_hct_m3  ~     lymph_m3  2.476 -0.074  -0.074   -0.074   -0.074
## 100       alt_m3  ~     lymph_m3  2.359 -0.066  -0.066   -0.065   -0.065
## 101       wbc_m1 ~~ platelets_m3  2.340 -0.070  -0.070   -0.120   -0.120
## 102       ast_m1  ~   albumin_m1  2.333  0.079   0.079    0.078    0.078
## 103     lymph_m1 ~~ platelets_m1  2.311  0.081   0.081    0.102    0.102
## 104 platelets_m3 ~~       ast_m3  2.310 -0.092  -0.092   -0.100   -0.100
## 105   albumin_m3  ~       alt_m3  2.286 -0.104  -0.104   -0.105   -0.105
## 106       alt_m3 ~~  tourn_no_m3  2.267 -0.060  -0.060   -0.094   -0.094
## 107       alt_m3  ~  tourn_no_m3  2.267 -0.061  -0.061   -0.060   -0.060
## 108   albumin_m3  ~     lymph_m3  2.253 -0.100  -0.100   -0.099   -0.099
## 109   albumin_m3  ~ platelets_m1  2.236  0.095   0.095    0.094    0.094
## 110     lymph_m1 ~~   max_hct_m1  2.225  0.076   0.076    0.070    0.070
## 111 platelets_m1  ~  tourn_no_m1  2.175 -0.084  -0.084   -0.082   -0.082
## 112     lymph_m3  ~  tourn_no_m3  2.163  0.149   0.149    0.149    0.149
## 113     lymph_m3 ~~  tourn_no_m3  2.163  0.146   0.146    0.092    0.092
## 114     lymph_m3 ~~   max_hct_m3  2.152 -0.104  -0.104   -0.069   -0.069
## 115       ast_m3  ~   max_hct_m1  2.149 -0.092  -0.092   -0.092   -0.092
## 116   albumin_m1  ~        age_t  2.143  0.076   0.076    0.076    0.077
## 117   max_hct_m1  ~ platelets_m3  2.065 -0.073  -0.073   -0.073   -0.073
## 118       alt_m3 ~~   max_hct_m3  2.013  0.040   0.040    0.067    0.067
## 119       ast_m1  ~       wbc_m1  2.004 -0.072  -0.072   -0.070   -0.070
## 120       ast_m3  ~       alt_m1  1.956 -0.244  -0.244   -0.244   -0.244
## 121       alt_m1  ~       wbc_m1  1.942 -0.044  -0.044   -0.042   -0.042
## 122        age_t  ~  tourn_no_m1  1.919  0.119   0.119    0.116    0.116
## 123       ast_m3  ~       wbc_m3  1.903  0.293   0.293    0.284    0.284
## 124   albumin_m3  ~       ast_m1  1.889 -0.091  -0.091   -0.091   -0.091
## 125 platelets_m1 ~~     lymph_m3  1.849 -0.106  -0.106   -0.088   -0.088
## 126       ast_m3  ~       alt_m3  1.780 -0.313  -0.313   -0.315   -0.315
## 127   albumin_m1  ~       alt_m3  1.742  0.086   0.086    0.087    0.087
## 128     lymph_m3  ~   max_hct_m3  1.734 -0.141  -0.141   -0.141   -0.141
## 129       alt_m1 ~~     lymph_m1  1.730 -0.042  -0.042   -0.082   -0.082
## 130   max_hct_m1 ~~ platelets_m3  1.714 -0.058  -0.058   -0.061   -0.061
## 131        age_t  ~       alt_m3  1.699 -0.111  -0.111   -0.112   -0.112
## 132       alt_m1  ~   max_hct_m3  1.692  0.040   0.040    0.040    0.040
## 133     lymph_m3  ~   max_hct_m1  1.681 -0.143  -0.143   -0.143   -0.143
## 134  tourn_no_m1  ~     lymph_m1  1.659 -0.084  -0.084   -0.087   -0.087
## 135       wbc_m1 ~~   max_hct_m1  1.659  0.040   0.040    0.060    0.060
## 136   albumin_m3  ~       ast_m3  1.649 -0.095  -0.095   -0.095   -0.095
## 137   albumin_m1 ~~   max_hct_m1  1.641  0.051   0.051    0.060    0.060
## 138       alt_m1  ~   albumin_m3  1.588 -0.039  -0.039   -0.038   -0.038
## 139          dhf ~~       ast_m3  1.572  0.077   0.077    0.086    0.086
## 140   max_hct_m1  ~   albumin_m3  1.570 -0.061  -0.061   -0.061   -0.061
## 141   albumin_m1 ~~     lymph_m3  1.510  0.100   0.100    0.077    0.077
## 142  tourn_no_m1  ~   albumin_m3  1.457 -0.060  -0.060   -0.061   -0.061
## 143       wbc_m3  ~          dhf  1.453 -0.066  -0.066   -0.067   -0.067
## 144       wbc_m3  ~       wbc_m1  1.449  0.191   0.191    0.190    0.190
## 145          dhf ~~       alt_m3  1.446 -0.037  -0.037   -0.064   -0.064
## 146   max_hct_m1  ~       wbc_m1  1.439 -0.061  -0.061   -0.059   -0.059
## 147       alt_m1  ~ platelets_m1  1.436 -0.037  -0.037   -0.037   -0.037
## 148     lymph_m3  ~          dhf  1.423  0.163   0.163    0.161    0.161
## 149       alt_m1 ~~   albumin_m1  1.374  0.029   0.029    0.074    0.074
## 150       alt_m1  ~ platelets_m3  1.364 -0.036  -0.036   -0.036   -0.036
## 151        age_t  ~       ast_m3  1.361 -0.076  -0.076   -0.076   -0.076
## 152       alt_m1 ~~       ast_m3  1.348 -0.057  -0.057   -0.116   -0.116
## 153          dhf  ~ platelets_m3  1.341  0.071   0.071    0.072    0.072
## 154          dhf ~~ platelets_m1  1.341 -0.064  -0.064   -0.094   -0.094
## 155   max_hct_m3  ~       alt_m3  1.311  0.051   0.051    0.051    0.051
## 156        age_t  ~       alt_m1  1.301  0.076   0.076    0.076    0.076
## 157     lymph_m3  ~       wbc_m1  1.293 -0.187  -0.187   -0.181   -0.181
## 158     lymph_m1 ~~     lymph_m3  1.293 -0.574  -0.574   -0.341   -0.341
## 159     lymph_m1  ~        age_t  1.292 -0.138  -0.138   -0.138   -0.138
## 160       ast_m3  ~   max_hct_m3  1.292  0.071   0.071    0.071    0.071
## 161  tourn_no_m3 ~~       ast_m3  1.287  0.070   0.070    0.071    0.071
## 162   albumin_m3  ~   albumin_m1  1.243  0.292   0.292    0.289    0.289
## 163  tourn_no_m3  ~       ast_m1  1.234  0.069   0.069    0.069    0.069
## 164          dhf ~~       alt_m1  1.234 -0.029  -0.029   -0.065   -0.065
## 165     lymph_m1  ~   max_hct_m3  1.232 -0.076  -0.076   -0.076   -0.076
## 166          dhf  ~       wbc_m1  1.207 -0.061  -0.061   -0.060   -0.060
## 167       alt_m3 ~~     lymph_m3  1.204 -0.070  -0.070   -0.069   -0.069
## 168   albumin_m3  ~       wbc_m1  1.203 -0.072  -0.072   -0.070   -0.070
## 169     lymph_m1  ~       wbc_m3  1.199  0.133   0.133    0.129    0.129
## 170       wbc_m1  ~       alt_m1  1.196 -0.062  -0.062   -0.064   -0.064
## 171       alt_m3  ~   albumin_m3  1.171 -0.044  -0.044   -0.043   -0.043
## 172   albumin_m1  ~       wbc_m1  1.164 -0.067  -0.067   -0.065   -0.065
## 173       ast_m1 ~~   max_hct_m1  1.133 -0.041  -0.041   -0.050   -0.050
## 174  tourn_no_m3  ~       alt_m1  1.132  0.066   0.066    0.066    0.066
## 175  tourn_no_m1 ~~     lymph_m3  1.112 -0.097  -0.097   -0.063   -0.063
## 176   albumin_m1 ~~       wbc_m3  1.101 -0.043  -0.043   -0.066   -0.066
## 177   albumin_m3  ~       wbc_m3  1.099  0.068   0.068    0.066    0.066
## 178 platelets_m1  ~     lymph_m3  1.099 -0.053  -0.053   -0.053   -0.053
## 179       wbc_m1 ~~       wbc_m3  1.089  0.075   0.075    0.146    0.146
## 180   max_hct_m1  ~       wbc_m3  1.084 -0.053  -0.053   -0.051   -0.051
## 181   max_hct_m1 ~~       wbc_m3  1.076 -0.041  -0.041   -0.049   -0.049
## 182       ast_m1  ~        age_t  1.065  0.051   0.051    0.051    0.051
## 183       ast_m1  ~       alt_m3  1.065  0.373   0.373    0.376    0.376
## 184   albumin_m1 ~~  tourn_no_m3  1.061 -0.052  -0.052   -0.064   -0.064
## 185       ast_m3  ~ platelets_m3  1.024 -0.073  -0.073   -0.073   -0.073
## 186        age_t  ~   albumin_m1  1.017  0.076   0.076    0.076    0.076
## 187  tourn_no_m1  ~ platelets_m1  0.985  0.076   0.076    0.078    0.078
## 188  tourn_no_m1  ~   max_hct_m3  0.976 -0.055  -0.055   -0.056   -0.056
## 189       wbc_m3  ~   max_hct_m1  0.974 -0.055  -0.055   -0.057   -0.057
## 190  tourn_no_m1  ~     lymph_m3  0.961 -0.051  -0.051   -0.053   -0.053
## 191     lymph_m1  ~   albumin_m3  0.960  0.064   0.064    0.064    0.064
## 192       wbc_m3  ~   albumin_m1  0.950 -0.052  -0.052   -0.053   -0.053
## 193   max_hct_m3  ~   albumin_m3  0.923  0.043   0.043    0.043    0.043
## 194   max_hct_m1  ~       alt_m1  0.921 -0.047  -0.047   -0.047   -0.047
## 195  tourn_no_m1 ~~   max_hct_m3  0.920 -0.042  -0.042   -0.047   -0.047
## 196   albumin_m1  ~   max_hct_m1  0.917  0.049   0.049    0.049    0.049
## 197       ast_m1  ~       alt_m1  0.915  0.221   0.221    0.222    0.222
## 198  tourn_no_m1  ~       wbc_m3  0.912 -0.051  -0.051   -0.051   -0.051
## 199  tourn_no_m3  ~   max_hct_m3  0.910  0.063   0.063    0.063    0.063
## 200       ast_m3  ~  tourn_no_m3  0.900  0.059   0.059    0.059    0.059
## 201     lymph_m1  ~          dhf  0.873 -0.070  -0.070   -0.069   -0.069
## 202          dhf  ~       ast_m1  0.871  0.068   0.068    0.069    0.069
## 203 platelets_m1  ~       alt_m1  0.863 -0.047  -0.047   -0.047   -0.047
## 204     lymph_m3  ~       ast_m1  0.853 -0.096  -0.096   -0.096   -0.096
## 205       wbc_m1 ~~   max_hct_m3  0.835  0.026   0.026    0.043    0.043
## 206       ast_m1 ~~     lymph_m3  0.832 -0.072  -0.072   -0.057   -0.057
## 207       alt_m3  ~       wbc_m1  0.826 -0.038  -0.038   -0.036   -0.036
## 208       ast_m1 ~~ platelets_m1  0.818 -0.034  -0.034   -0.057   -0.057
## 209       alt_m3  ~  tourn_no_m1  0.773 -0.038  -0.038   -0.036   -0.036
## 210   max_hct_m3  ~     lymph_m1  0.769 -0.040  -0.040   -0.040   -0.040
## 211  tourn_no_m1  ~        age_t  0.767  0.049   0.049    0.050    0.050
## 212  tourn_no_m1 ~~  tourn_no_m3  0.767 -0.416  -0.416   -0.435   -0.435
## 213       wbc_m1 ~~ platelets_m1  0.759  0.042   0.042    0.087    0.087
## 214       wbc_m1  ~ platelets_m3  0.759 -0.047  -0.047   -0.048   -0.048
## 215   albumin_m1  ~  tourn_no_m3  0.735 -0.044  -0.044   -0.044   -0.044
## 216   max_hct_m3  ~       wbc_m3  0.730 -0.039  -0.039   -0.038   -0.038
## 217  tourn_no_m1  ~       ast_m3  0.703  0.048   0.048    0.050    0.050
## 218     lymph_m1  ~   albumin_m1  0.699  0.055   0.055    0.055    0.055
## 219  tourn_no_m1  ~       wbc_m1  0.698 -0.045  -0.045   -0.045   -0.045
## 220       wbc_m1 ~~     lymph_m3  0.683  0.063   0.063    0.062    0.062
## 221       wbc_m3 ~~   max_hct_m3  0.681 -0.030  -0.030   -0.039   -0.039
## 222  tourn_no_m3  ~ platelets_m3  0.669 -0.053  -0.053   -0.053   -0.053
## 223     lymph_m3  ~       alt_m3  0.662 -0.086  -0.086   -0.087   -0.087
## 224       ast_m1  ~       wbc_m3  0.661 -0.042  -0.042   -0.041   -0.041
## 225   albumin_m1  ~   max_hct_m3  0.651 -0.041  -0.041   -0.042   -0.042
## 226  tourn_no_m1 ~~ platelets_m3  0.630  0.040   0.040    0.045    0.045
## 227   max_hct_m1 ~~  tourn_no_m3  0.628 -0.038  -0.038   -0.037   -0.037
## 228   max_hct_m1  ~  tourn_no_m3  0.628 -0.039  -0.039   -0.039   -0.039
## 229     lymph_m3  ~   albumin_m3  0.626 -0.080  -0.080   -0.080   -0.080
## 230       wbc_m1 ~~  tourn_no_m3  0.605  0.031   0.031    0.049    0.049
## 231       wbc_m1 ~~  tourn_no_m1  0.586 -0.024  -0.024   -0.039   -0.039
## 232       ast_m1 ~~       wbc_m3  0.584 -0.031  -0.031   -0.048   -0.048
## 233       alt_m1 ~~     lymph_m3  0.584  0.037   0.037    0.048    0.048
## 234   albumin_m1 ~~ platelets_m1  0.580  0.046   0.046    0.075    0.075
## 235   albumin_m1  ~ platelets_m3  0.580 -0.052  -0.052   -0.052   -0.052
## 236 platelets_m1  ~   max_hct_m3  0.573 -0.036  -0.036   -0.036   -0.036
## 237       alt_m3  ~          dhf  0.560 -0.032  -0.032   -0.031   -0.031
## 238   max_hct_m3  ~          dhf  0.543  0.049   0.049    0.048    0.048
## 239       ast_m1  ~   albumin_m3  0.531 -0.036  -0.036   -0.036   -0.036
## 240   max_hct_m1 ~~     lymph_m3  0.522 -0.056  -0.056   -0.034   -0.034
## 241 platelets_m1 ~~  tourn_no_m1  0.515  0.032   0.032    0.045    0.045
## 242       alt_m3  ~ platelets_m3  0.509  0.030   0.030    0.030    0.030
## 243       alt_m1  ~       ast_m3  0.492 -0.039  -0.039   -0.039   -0.039
## 244       ast_m1 ~~       alt_m1  0.492  0.040   0.040    0.104    0.104
## 245  tourn_no_m1  ~   albumin_m1  0.478 -0.035  -0.035   -0.036   -0.036
## 246   albumin_m1 ~~       alt_m3  0.469  0.023   0.023    0.044    0.044
## 247     lymph_m1 ~~       alt_m3  0.469  0.029   0.029    0.043    0.043
## 248 platelets_m1  ~       ast_m1  0.467 -0.034  -0.034   -0.034   -0.034
## 249       alt_m1  ~     lymph_m1  0.440 -0.020  -0.020   -0.020   -0.020
## 250   max_hct_m3  ~       wbc_m1  0.422 -0.030  -0.030   -0.029   -0.029
## 251       alt_m3 ~~       ast_m3  0.413 -0.073  -0.073   -0.114   -0.114
## 252       alt_m3 ~~ platelets_m3  0.398  0.023   0.023    0.040    0.040
## 253       ast_m3  ~  tourn_no_m1  0.394  0.045   0.045    0.044    0.044
## 254       alt_m3  ~       wbc_m3  0.381  0.026   0.026    0.025    0.025
## 255       wbc_m3 ~~     lymph_m3  0.376 -0.106  -0.106   -0.081   -0.081
## 256       wbc_m3  ~     lymph_m1  0.376 -0.043  -0.043   -0.044   -0.044
## 257 platelets_m1 ~~       ast_m3  0.372  0.031   0.031    0.042    0.042
## 258       alt_m1 ~~ platelets_m1  0.365 -0.014  -0.014   -0.038   -0.038
## 259          dhf ~~     lymph_m1  0.365 -0.034  -0.034   -0.036   -0.036
## 260       wbc_m1  ~   max_hct_m3  0.350 -0.024  -0.024   -0.024   -0.024
## 261 platelets_m1  ~   albumin_m3  0.342 -0.027  -0.027   -0.027   -0.027
## 262       alt_m1 ~~  tourn_no_m1  0.340 -0.015  -0.015   -0.032   -0.032
## 263       alt_m1  ~  tourn_no_m3  0.337  0.018   0.018    0.018    0.018
## 264       alt_m1 ~~   max_hct_m3  0.327  0.012   0.012    0.027    0.027
## 265 platelets_m1 ~~       alt_m3  0.325 -0.017  -0.017   -0.036   -0.036
## 266     lymph_m1  ~       alt_m1  0.323 -0.038  -0.038   -0.038   -0.038
## 267       ast_m3  ~          dhf  0.322  0.044   0.044    0.043    0.043
## 268   max_hct_m3  ~       alt_m1  0.320  0.025   0.025    0.025    0.025
## 269       ast_m1 ~~   max_hct_m3  0.304 -0.019  -0.019   -0.026   -0.026
## 270          dhf ~~   albumin_m1  0.301 -0.021  -0.021   -0.028   -0.028
## 271   albumin_m1  ~     lymph_m1  0.300  0.028   0.028    0.028    0.028
## 272     lymph_m3  ~       alt_m1  0.298 -0.057  -0.057   -0.057   -0.057
## 273       wbc_m1  ~  tourn_no_m3  0.298  0.022   0.022    0.022    0.022
## 274  tourn_no_m3  ~       alt_m3  0.290  0.034   0.034    0.034    0.034
## 275       ast_m1  ~   max_hct_m3  0.290  0.027   0.027    0.027    0.027
## 276   albumin_m3  ~          dhf  0.281  0.034   0.034    0.034    0.034
## 277  tourn_no_m1  ~       alt_m3  0.278  0.030   0.030    0.031    0.031
## 278       ast_m1  ~          dhf  0.271  0.028   0.028    0.028    0.028
## 279     lymph_m1  ~   max_hct_m1  0.266  0.036   0.036    0.036    0.036
## 280   albumin_m1  ~     lymph_m3  0.266  0.026   0.026    0.027    0.027
## 281       ast_m1 ~~     lymph_m1  0.264  0.027   0.027    0.032    0.032
## 282  tourn_no_m3  ~   albumin_m3  0.261 -0.032  -0.032   -0.032   -0.032
## 283   albumin_m3  ~  tourn_no_m3  0.261 -0.032  -0.032   -0.032   -0.032
## 284        age_t  ~  tourn_no_m3  0.261  0.467   0.467    0.467    0.467
## 285 platelets_m3  ~          dhf  0.254  0.035   0.035    0.035    0.035
## 286       wbc_m1  ~       ast_m1  0.244 -0.025  -0.025   -0.026   -0.026
## 287       ast_m1 ~~       wbc_m1  0.244 -0.016  -0.016   -0.031   -0.031
## 288       wbc_m1  ~     lymph_m1  0.240  0.022   0.022    0.023    0.023
## 289     lymph_m3 ~~       ast_m3  0.225 -0.052  -0.052   -0.032   -0.032
## 290       ast_m1  ~     lymph_m1  0.224 -0.023  -0.023   -0.023   -0.023
## 291       wbc_m3  ~       ast_m1  0.218 -0.027  -0.027   -0.027   -0.027
## 292   max_hct_m1  ~     lymph_m1  0.218  0.024   0.024    0.024    0.024
## 293       wbc_m1  ~  tourn_no_m1  0.202 -0.019  -0.019   -0.019   -0.019
## 294       wbc_m3  ~       ast_m3  0.189  0.032   0.032    0.033    0.033
## 295     lymph_m1  ~       ast_m3  0.183 -0.029  -0.029   -0.029   -0.029
## 296 platelets_m1  ~       alt_m3  0.175 -0.021  -0.021   -0.021   -0.021
## 297     lymph_m1 ~~       wbc_m3  0.171 -0.031  -0.031   -0.037   -0.037
## 298       alt_m1 ~~   max_hct_m1  0.168  0.010   0.010    0.019    0.019
## 299       wbc_m3  ~       alt_m1  0.163 -0.024  -0.024   -0.025   -0.025
## 300  tourn_no_m1 ~~       ast_m3  0.155  0.022   0.022    0.023    0.023
## 301     lymph_m1 ~~  tourn_no_m1  0.149 -0.021  -0.021   -0.021   -0.021
## 302       alt_m1 ~~       wbc_m3  0.140 -0.009  -0.009   -0.024   -0.024
## 303  tourn_no_m1  ~ platelets_m3  0.134  0.021   0.021    0.022    0.022
## 304   max_hct_m3  ~   albumin_m1  0.133 -0.016  -0.016   -0.016   -0.016
## 305   max_hct_m1  ~   albumin_m1  0.130 -0.018  -0.018   -0.018   -0.018
## 306          dhf  ~   albumin_m3  0.126  0.016   0.016    0.017    0.017
## 307  tourn_no_m1 ~~       alt_m3  0.125 -0.011  -0.011   -0.018   -0.018
## 308 platelets_m3  ~       alt_m3  0.121 -0.021  -0.021   -0.021   -0.021
## 309       alt_m3  ~     lymph_m1  0.105 -0.013  -0.013   -0.013   -0.013
## 310   max_hct_m3  ~       ast_m1  0.100 -0.014  -0.014   -0.014   -0.014
## 311     lymph_m3  ~       ast_m3  0.098 -0.034  -0.034   -0.034   -0.034
## 312          dhf ~~     lymph_m3  0.097  0.040   0.040    0.028    0.028
## 313       ast_m1  ~   max_hct_m1  0.094 -0.015  -0.015   -0.015   -0.015
## 314   max_hct_m1  ~  tourn_no_m1  0.091  0.018   0.018    0.017    0.017
## 315       ast_m1 ~~  tourn_no_m1  0.091 -0.012  -0.012   -0.016   -0.016
## 316          dhf  ~       alt_m3  0.091  0.018   0.018    0.018    0.018
## 317     lymph_m1 ~~   max_hct_m3  0.089  0.014   0.014    0.014    0.014
## 318   max_hct_m1 ~~  tourn_no_m1  0.087  0.014   0.014    0.014    0.014
## 319       wbc_m3  ~       alt_m3  0.079  0.017   0.017    0.018    0.018
## 320          dhf  ~   albumin_m1  0.076 -0.013  -0.013   -0.013   -0.013
## 321       alt_m1  ~  tourn_no_m1  0.075  0.009   0.009    0.009    0.009
## 322       alt_m1 ~~  tourn_no_m3  0.073  0.008   0.008    0.017    0.017
## 323          dhf  ~     lymph_m3  0.070  0.014   0.014    0.014    0.014
## 324       ast_m3  ~     lymph_m3  0.068  0.018   0.018    0.017    0.017
## 325       alt_m1  ~     lymph_m3  0.063  0.008   0.008    0.008    0.008
## 326  tourn_no_m1  ~       ast_m1  0.063  0.015   0.015    0.015    0.015
## 327       alt_m1 ~~ platelets_m3  0.063 -0.007  -0.007   -0.016   -0.016
## 328   albumin_m1 ~~  tourn_no_m1  0.059 -0.010  -0.010   -0.012   -0.012
## 329       wbc_m3 ~~       ast_m3  0.058  0.018   0.018    0.022    0.022
## 330     lymph_m1 ~~   albumin_m1  0.056 -0.013  -0.013   -0.015   -0.015
## 331          dhf ~~       ast_m1  0.056 -0.010  -0.010   -0.013   -0.013
## 332   albumin_m1  ~  tourn_no_m1  0.052 -0.012  -0.012   -0.012   -0.012
## 333       alt_m1 ~~       wbc_m1  0.052  0.004   0.004    0.014    0.014
## 334       wbc_m1  ~   max_hct_m1  0.051  0.009   0.009    0.009    0.009
## 335     lymph_m1 ~~       ast_m3  0.049 -0.016  -0.016   -0.015   -0.015
## 336       wbc_m1 ~~   albumin_m1  0.048 -0.007  -0.007   -0.014   -0.014
## 337       alt_m3  ~   max_hct_m3  0.047  0.009   0.009    0.009    0.009
## 338 platelets_m3  ~  tourn_no_m3  0.045 -0.012  -0.012   -0.012   -0.012
## 339 platelets_m3 ~~  tourn_no_m3  0.045 -0.012  -0.012   -0.013   -0.013
## 340          dhf ~~       wbc_m1  0.043 -0.006  -0.006   -0.011   -0.011
## 341   max_hct_m3  ~  tourn_no_m3  0.039  0.009   0.009    0.009    0.009
## 342   max_hct_m3 ~~  tourn_no_m3  0.039  0.009   0.009    0.009    0.009
## 343   max_hct_m3  ~       ast_m3  0.038  0.009   0.009    0.009    0.009
## 344        age_t  ~     lymph_m1  0.038  0.040   0.040    0.040    0.040
## 345   albumin_m1 ~~   max_hct_m3  0.038 -0.007  -0.007   -0.009   -0.009
## 346  tourn_no_m3  ~   max_hct_m1  0.036 -0.013  -0.013   -0.013   -0.013
## 347       wbc_m3  ~   max_hct_m3  0.036 -0.010  -0.010   -0.011   -0.011
## 348 platelets_m3  ~  tourn_no_m1  0.035  0.012   0.012    0.012    0.012
## 349        age_t  ~       ast_m1  0.032  0.011   0.011    0.011    0.011
## 350       ast_m3  ~ platelets_m1  0.031 -0.014  -0.014   -0.014   -0.014
## 351       alt_m3 ~~       wbc_m3  0.029 -0.006  -0.006   -0.011   -0.011
## 352       wbc_m3  ~   albumin_m3  0.027 -0.008  -0.008   -0.009   -0.009
## 353   albumin_m1  ~          dhf  0.027  0.009   0.009    0.009    0.009
## 354     lymph_m1  ~       ast_m1  0.025  0.011   0.011    0.011    0.011
## 355   albumin_m3  ~   max_hct_m1  0.021  0.010   0.010    0.010    0.010
## 356        age_t  ~   max_hct_m1  0.021 -0.143  -0.143   -0.143   -0.143
## 357       ast_m1  ~  tourn_no_m1  0.019  0.007   0.007    0.007    0.007
## 358   albumin_m3  ~     lymph_m1  0.018  0.009   0.009    0.009    0.009
## 359     lymph_m3  ~   albumin_m1  0.017  0.013   0.013    0.013    0.013
## 360     lymph_m3  ~  tourn_no_m1  0.017  0.016   0.016    0.015    0.015
## 361       ast_m1 ~~  tourn_no_m3  0.016 -0.006  -0.006   -0.008   -0.008
## 362 platelets_m1  ~   albumin_m1  0.016  0.008   0.008    0.008    0.008
## 363       wbc_m1  ~          dhf  0.014  0.005   0.005    0.005    0.005
## 364 platelets_m1  ~       ast_m3  0.013  0.006   0.006    0.006    0.006
## 365          dhf  ~        age_t  0.010  0.005   0.005    0.005    0.005
## 366   max_hct_m1  ~       alt_m3  0.009  0.005   0.005    0.005    0.005
## 367  tourn_no_m3  ~     lymph_m1  0.009  0.006   0.006    0.006    0.006
## 368  tourn_no_m1  ~       alt_m1  0.008  0.006   0.006    0.006    0.006
## 369  tourn_no_m1  ~   max_hct_m1  0.007 -0.006  -0.006   -0.006   -0.006
## 370       alt_m3  ~       alt_m1  0.006 -0.009  -0.009   -0.009   -0.009
## 371       alt_m1 ~~       alt_m3  0.006 -0.002  -0.002   -0.007   -0.007
## 372        age_t  ~     lymph_m3  0.006  0.015   0.015    0.015    0.015
## 373   max_hct_m3  ~  tourn_no_m1  0.006  0.004   0.004    0.004    0.004
## 374   albumin_m1 ~~ platelets_m3  0.004  0.004   0.004    0.005    0.005
## 375   max_hct_m3 ~~       ast_m3  0.003 -0.002  -0.002   -0.003   -0.003
## 376 platelets_m3  ~     lymph_m1  0.002 -0.003  -0.003   -0.003   -0.003
## 377       alt_m1  ~          dhf  0.002 -0.002  -0.002   -0.001   -0.001
## 378     lymph_m1  ~       alt_m3  0.001 -0.002  -0.002   -0.002   -0.002
## 379 platelets_m1  ~     lymph_m1  0.001 -0.001  -0.001   -0.001   -0.001
## 380       ast_m1 ~~       ast_m3  0.001  0.003   0.003    0.004    0.004
## 381       ast_m3  ~       ast_m1  0.001  0.005   0.005    0.005    0.005
## 382       alt_m1  ~   albumin_m1  0.001  0.001   0.001    0.001    0.001
## 383        age_t  ~          dhf  0.000  0.002   0.002    0.002    0.002
## 384       ast_m3  ~     lymph_m1  0.000  0.001   0.001    0.001    0.001
## 385       ast_m1  ~  tourn_no_m3  0.000  0.000   0.000    0.000    0.000
## 386       alt_m3  ~ platelets_m1  0.000  0.000   0.000    0.000    0.000
## 387       alt_m3  ~   albumin_m1  0.000  0.000   0.000    0.000    0.000
```


```r
table2<-parameterEstimates(Blind_fit,standardized=TRUE)%>%as.data.frame()
table2<-table2[!table2$lhs==table2$rhs,]
b<-gettextf('%.3f \n p=%.3f', table2$std.all, digits=table2$pvalue)
fittitles<-fitmeasures(Blind_fit)[c('cfi.robust','tli.robust','rmsea.robust','rmsea.ci.lower.robust' , 'rmsea.ci.upper.robust')]%>%round(3)

semPaths(Blind_fit, layout=ly,
         edgeLabels=b,
         residuals=FALSE,
         style='ram',
         what='est',
         whatLabels = "std",
         cut=0.3,
         sizeMan = 10, # Size of manifest variables
  sizeMan2=3,edge.label.cex = 0.6,label.cex=1,
  
  nCharNodes = 0,fade=TRUE,
  mar = c(5,2,2,2))

text(0,-1.3,paste0(names(fittitles),': ',fittitles,collapse='; '),cex=1.5)
title('Nonsense Blind fit')
```

![](1b_Park2018_iteration_files/figure-html/unnamed-chunk-21-1.png)<!-- -->

![Blind Model](https://github.com/TomoeGusberti/tomoegusberti.github.io/blob/master/_collections/SEM_Examples/1_Park2018_files/Park2018_iteration_ns_blind.png?raw=true)

## Reversed model
To illustrate further how non-sense models also can fit well, look at this model in which all causal relationships are reversed. Look how non-sense it is! But how it fits well!

```r
library(lavaan)
Rev_model="
 age_t~alt_m3+wbc_m3+lymph_m3+max_hct_m3+platelets_m3+tourn_no_m3
  
  ast_m3  + alt_m3+platelets_m3~ast_m1
  alt_m3 + ast_m3+albumin_m3~alt_m1
  wbc_m3 +ast_m3+age_t~wbc_m1
  lymph_m3+wbc_m3~lymph_m1
  albumin_m3+platelets_m3~albumin_m1
  max_hct_m3+age_t+ast_m3~max_hct_m1
  platelets_m3+wbc_m3~platelets_m1
  tourn_no_m3+age_t~tourn_no_m1
  alt_m1+lymph_m1+max_hct_m1+platelets_m1+tourn_no_m1~dhf
  
  ast_m3~~alt_m3
  wbc_m3	~~	lymph_m3+platelets_m3+tourn_no_m3
  ast_m1~~alt_m1+tourn_no_m1+max_hct_m1
  lymph_m1	~~	wbc_m1 +tourn_no_m1
  platelets_m1	~~	max_hct_m1+wbc_m1+albumin_m1
  "
Rev_fit=sem(model=Rev_model, data=data,std.ov=TRUE,estimator="MLR",fixed.x = FALSE)
fitmeasures(Rev_fit)[c('cfi.robust','tli.robust','rmsea.robust','rmsea.ci.lower.robust' , 'rmsea.ci.upper.robust')]
```

```
##            cfi.robust            tli.robust          rmsea.robust 
##            0.92711535            0.89578176            0.06897104 
## rmsea.ci.lower.robust rmsea.ci.upper.robust 
##            0.05701316            0.08094267
```

```r
modificationindices(Rev_fit,standardized = TRUE)%>%arrange(-mi)
```

```
##              lhs op          rhs     mi    epc sepc.lv sepc.all sepc.nox
## 1         ast_m3  ~       wbc_m3 20.553 -0.228  -0.228   -0.224   -0.224
## 2     max_hct_m1  ~     lymph_m3 17.689 -0.242  -0.242   -0.240   -0.240
## 3         wbc_m3  ~       ast_m3 17.454 -0.159  -0.159   -0.161   -0.161
## 4       lymph_m3 ~~   max_hct_m1 14.809 -0.185  -0.185   -0.214   -0.214
## 5    tourn_no_m1  ~       wbc_m3 13.461 -0.222  -0.222   -0.218   -0.218
## 6         wbc_m1  ~        age_t 12.672 -0.325  -0.325   -0.319   -0.319
## 7     max_hct_m1  ~        age_t 12.581  0.405   0.405    0.386    0.386
## 8     albumin_m3 ~~   max_hct_m3 12.141  0.147   0.147    0.217    0.217
## 9         ast_m1  ~   max_hct_m1 11.993  0.488   0.488    0.497    0.497
## 10      lymph_m3  ~   max_hct_m1 11.900 -0.180  -0.180   -0.182   -0.182
## 11        ast_m1  ~       alt_m1 11.216  2.519   2.519    2.502    2.502
## 12           dhf  ~   max_hct_m1 11.216 -1.849  -1.849   -1.868   -1.868
## 13        ast_m1  ~          dhf 11.216  0.208   0.208    0.209    0.209
## 14           dhf  ~       ast_m1 11.216  0.210   0.210    0.209    0.209
## 15           dhf  ~       alt_m1 11.216  0.277   0.277    0.273    0.273
## 16           dhf  ~  tourn_no_m1 11.215 11.763  11.763   11.752   11.752
## 17    albumin_m3  ~   max_hct_m3 11.138  0.173   0.173    0.174    0.174
## 18           dhf  ~       ast_m3 10.500  0.222   0.222    0.222    0.222
## 19      lymph_m1  ~       wbc_m3 10.440 -0.429  -0.429   -0.416   -0.416
## 20   tourn_no_m1  ~ platelets_m1 10.152 -0.199  -0.199   -0.194   -0.194
## 21        ast_m3  ~     lymph_m3 10.120  0.107   0.107    0.108    0.108
## 22        wbc_m1  ~   max_hct_m1  9.906 -0.186  -0.186   -0.191   -0.191
## 23        ast_m3 ~~       wbc_m3  9.711 -0.063  -0.063   -0.137   -0.137
## 24           dhf  ~       wbc_m3  9.671 -0.203  -0.203   -0.200   -0.200
## 25        wbc_m3  ~       alt_m1  9.550 -0.119  -0.119   -0.119   -0.119
## 26        wbc_m1  ~     lymph_m1  9.100  0.733   0.733    0.753    0.753
## 27  platelets_m1  ~       ast_m1  8.794 -0.145  -0.145   -0.148   -0.148
## 28      lymph_m1  ~        age_t  8.682 -0.210  -0.210   -0.201   -0.201
## 29    albumin_m1  ~       ast_m3  8.090 -0.168  -0.168   -0.167   -0.167
## 30           dhf  ~ platelets_m1  7.976 -0.347  -0.347   -0.338   -0.338
## 31    albumin_m3  ~        age_t  7.942  0.280   0.280    0.271    0.271
## 32      lymph_m1  ~   max_hct_m3  7.881 -0.169  -0.169   -0.168   -0.168
## 33    max_hct_m3  ~   albumin_m3  7.746  0.142   0.142    0.141    0.141
## 34        wbc_m3  ~ platelets_m3  7.585  1.299   1.299    1.293    1.293
## 35   tourn_no_m1  ~       wbc_m1  7.476 -0.165  -0.165   -0.163   -0.163
## 36         age_t  ~     lymph_m1  7.310 -0.154  -0.154   -0.161   -0.161
## 37         age_t ~~     lymph_m1  7.280 -0.139  -0.139   -0.173   -0.173
## 38        wbc_m3  ~  tourn_no_m1  7.001 -0.103  -0.103   -0.105   -0.105
## 39        wbc_m3  ~  tourn_no_m3  7.001 -0.199  -0.199   -0.202   -0.202
## 40         age_t ~~     lymph_m3  6.916  0.279   0.279    0.382    0.382
## 41        wbc_m3  ~       ast_m1  6.767 -0.099  -0.099   -0.101   -0.101
## 42        ast_m3  ~   albumin_m3  6.760 -0.166  -0.166   -0.166   -0.166
## 43        ast_m3  ~   albumin_m1  6.760 -0.087  -0.087   -0.087   -0.087
## 44        wbc_m3  ~       alt_m3  6.741 -0.098  -0.098   -0.100   -0.100
## 45        wbc_m1  ~          dhf  6.635 -0.158  -0.158   -0.161   -0.161
## 46           dhf  ~       wbc_m1  6.635 -0.163  -0.163   -0.161   -0.161
## 47           dhf  ~     lymph_m1  6.635  0.723   0.723    0.731    0.731
## 48  platelets_m1  ~       alt_m1  6.605 -0.125  -0.125   -0.127   -0.127
## 49   tourn_no_m1  ~       ast_m3  6.590  0.152   0.152    0.152    0.152
## 50      lymph_m1 ~~ platelets_m1  6.342 -0.136  -0.136   -0.146   -0.146
## 51      lymph_m1  ~       wbc_m1  6.342 -0.326  -0.326   -0.317   -0.317
## 52  platelets_m1  ~       wbc_m1  6.342  0.626   0.626    0.633    0.633
## 53   tourn_no_m3  ~     lymph_m3  6.256  0.133   0.133    0.134    0.134
## 54        wbc_m3 ~~     lymph_m1  6.253 -0.406  -0.406   -0.621   -0.621
## 55  platelets_m1  ~       ast_m3  6.194 -0.120  -0.120   -0.123   -0.123
## 56    albumin_m1  ~       alt_m3  6.101 -0.146  -0.146   -0.145   -0.145
## 57        alt_m1  ~  tourn_no_m1  5.968  0.153   0.153    0.155    0.155
## 58        alt_m1 ~~  tourn_no_m1  5.829  0.139   0.139    0.148    0.148
## 59   tourn_no_m1  ~       alt_m1  5.829  0.144   0.144    0.142    0.142
## 60    max_hct_m3  ~       ast_m3  5.587  0.121   0.121    0.120    0.120
## 61        wbc_m1  ~  tourn_no_m1  5.541 -0.128  -0.128   -0.130   -0.130
## 62         age_t ~~       alt_m1  5.395  0.090   0.090    0.114    0.114
## 63    max_hct_m1 ~~       wbc_m1  5.295 -0.129  -0.129   -0.137   -0.137
## 64        alt_m1  ~        age_t  5.256  0.112   0.112    0.109    0.109
## 65  platelets_m1  ~     lymph_m1  5.255 -0.126  -0.126   -0.131   -0.131
## 66   tourn_no_m1  ~ platelets_m3  5.163 -0.139  -0.139   -0.136   -0.136
## 67         age_t ~~       ast_m1  5.141 -0.074  -0.074   -0.092   -0.092
## 68    albumin_m3  ~       wbc_m1  5.026 -0.119  -0.119   -0.117   -0.117
## 69        alt_m3  ~     lymph_m3  4.985 -0.078  -0.078   -0.078   -0.078
## 70        wbc_m3  ~   albumin_m3  4.899  0.085   0.085    0.087    0.087
## 71    max_hct_m3 ~~     lymph_m1  4.870 -0.106  -0.106   -0.131   -0.131
## 72        wbc_m3 ~~  tourn_no_m1  4.869 -0.078  -0.078   -0.125   -0.125
## 73      lymph_m3 ~~  tourn_no_m3  4.806  0.105   0.105    0.137    0.137
## 74        ast_m1  ~  tourn_no_m1  4.769  0.345   0.345    0.347    0.347
## 75      lymph_m1  ~ platelets_m1  4.703 -0.141  -0.141   -0.136   -0.136
## 76    max_hct_m3  ~       ast_m1  4.663  0.111   0.111    0.110    0.110
## 77        ast_m3  ~  tourn_no_m3  4.614  0.073   0.073    0.073    0.073
## 78    max_hct_m3  ~       alt_m1  4.606  0.110   0.110    0.109    0.109
## 79   tourn_no_m1  ~       ast_m1  4.516  0.162   0.162    0.161    0.161
## 80        wbc_m1  ~ platelets_m1  4.451  0.316   0.316    0.312    0.312
## 81        ast_m3 ~~   albumin_m1  4.430 -0.066  -0.066   -0.094   -0.094
## 82        wbc_m3 ~~ platelets_m1  4.426 -0.134  -0.134   -0.218   -0.218
## 83   tourn_no_m1  ~       alt_m3  4.305  0.127   0.127    0.126    0.126
## 84    max_hct_m1  ~  tourn_no_m1  4.289  0.127   0.127    0.125    0.125
## 85      lymph_m1 ~~   max_hct_m1  4.183 -0.113  -0.113   -0.119   -0.119
## 86  platelets_m3 ~~   albumin_m3  4.087  0.078   0.078    0.125    0.125
## 87  platelets_m3  ~   albumin_m3  4.033  0.111   0.111    0.113    0.113
## 88        alt_m3  ~       wbc_m3  4.029  0.081   0.081    0.079    0.079
## 89  platelets_m1  ~     lymph_m3  4.027 -0.098  -0.098   -0.101   -0.101
## 90    albumin_m3  ~ platelets_m1  4.004 -0.112  -0.112   -0.109   -0.109
## 91        wbc_m1  ~   max_hct_m3  3.968 -0.108  -0.108   -0.110   -0.110
## 92    max_hct_m3  ~     lymph_m1  3.953 -0.100  -0.100   -0.101   -0.101
## 93   tourn_no_m1  ~   max_hct_m1  3.919  0.121   0.121    0.123    0.123
## 94    albumin_m3  ~     lymph_m3  3.785 -0.101  -0.101   -0.102   -0.102
## 95        ast_m3  ~ platelets_m1  3.781 -0.077  -0.077   -0.075   -0.075
## 96   tourn_no_m1  ~   albumin_m1  3.705 -0.113  -0.113   -0.113   -0.113
## 97        ast_m3 ~~   max_hct_m1  3.679 -0.164  -0.164   -0.244   -0.244
## 98   tourn_no_m3  ~        age_t  3.601 -0.197  -0.197   -0.191   -0.191
## 99    max_hct_m1  ~     lymph_m1  3.591 -0.110  -0.110   -0.110   -0.110
## 100       ast_m3  ~  tourn_no_m1  3.541  0.064   0.064    0.064    0.064
## 101   max_hct_m1  ~       wbc_m1  3.530 -0.112  -0.112   -0.109   -0.109
## 102   albumin_m3 ~~       wbc_m1  3.459 -0.080  -0.080   -0.098   -0.098
## 103       wbc_m3  ~          dhf  3.454 -0.074  -0.074   -0.075   -0.075
## 104  tourn_no_m1  ~   albumin_m3  3.396 -0.109  -0.109   -0.108   -0.108
## 105   albumin_m3  ~          dhf  3.392  0.096   0.096    0.097    0.097
## 106       alt_m1  ~       wbc_m3  3.352 -0.073  -0.073   -0.072   -0.072
## 107  tourn_no_m3 ~~   max_hct_m1  3.269 -0.088  -0.088   -0.108   -0.108
## 108       ast_m3  ~ platelets_m3  3.230 -0.066  -0.066   -0.064   -0.064
## 109   albumin_m3 ~~       wbc_m3  3.191  0.056   0.056    0.102    0.102
## 110       wbc_m1  ~   albumin_m3  3.190 -0.096  -0.096   -0.098   -0.098
## 111  tourn_no_m1  ~     lymph_m1  3.147  0.417   0.417    0.422    0.422
## 112  tourn_no_m1 ~~       wbc_m1  3.147 -0.091  -0.091   -0.097   -0.097
## 113       ast_m3 ~~  tourn_no_m1  3.124  0.056   0.056    0.083    0.083
## 114   max_hct_m1  ~ platelets_m3  3.114 -0.124  -0.124   -0.120   -0.120
## 115          dhf  ~       alt_m3  3.095  0.139   0.139    0.139    0.139
## 116     lymph_m1  ~   max_hct_m1  3.053 -0.109  -0.109   -0.109   -0.109
## 117   albumin_m1  ~  tourn_no_m1  2.991 -0.102  -0.102   -0.102   -0.102
## 118       alt_m1  ~   albumin_m1  2.932 -0.067  -0.067   -0.068   -0.068
## 119          dhf  ~   max_hct_m3  2.925 -0.138  -0.138   -0.138   -0.138
## 120   max_hct_m1  ~ platelets_m1  2.893 -0.194  -0.194   -0.186   -0.186
## 121 platelets_m3  ~   max_hct_m3  2.863 -0.079  -0.079   -0.081   -0.081
## 122   max_hct_m1 ~~  tourn_no_m1  2.826  0.092   0.092    0.101    0.101
## 123       ast_m3 ~~     lymph_m1  2.774  0.053   0.053    0.075    0.075
## 124   max_hct_m3 ~~  tourn_no_m3  2.676  0.070   0.070    0.102    0.102
## 125       ast_m3 ~~     lymph_m3  2.663  0.046   0.046    0.072    0.072
## 126       ast_m1  ~ platelets_m1  2.643 -0.067  -0.067   -0.066   -0.066
## 127  tourn_no_m1  ~        age_t  2.633  0.174   0.174    0.168    0.168
## 128     lymph_m3 ~~ platelets_m1  2.570 -0.068  -0.068   -0.080   -0.080
## 129       ast_m3  ~          dhf  2.540  0.056   0.056    0.057    0.057
## 130       wbc_m3 ~~       wbc_m1  2.513  0.233   0.233    0.361    0.361
## 131       alt_m3 ~~     lymph_m3  2.411 -0.045  -0.045   -0.069   -0.069
## 132   max_hct_m3 ~~   max_hct_m1  2.356  0.175   0.175    0.226    0.226
## 133   max_hct_m1  ~   max_hct_m3  2.356  0.266   0.266    0.264    0.264
## 134       ast_m3 ~~       wbc_m1  2.310  0.079   0.079    0.115    0.115
## 135       alt_m1  ~       ast_m3  2.280 -0.403  -0.403   -0.407   -0.407
## 136 platelets_m3 ~~   max_hct_m3  2.264 -0.056  -0.056   -0.093   -0.093
## 137  tourn_no_m3  ~   max_hct_m1  2.261 -0.079  -0.079   -0.080   -0.080
## 138 platelets_m1 ~~       ast_m1  2.259 -0.047  -0.047   -0.050   -0.050
## 139 platelets_m1  ~   max_hct_m1  2.258  0.418   0.418    0.434    0.434
## 140     lymph_m1  ~       ast_m3  2.254  0.089   0.089    0.088    0.088
## 141  tourn_no_m3  ~       wbc_m3  2.251 -0.103  -0.103   -0.102   -0.102
## 142     lymph_m3  ~   max_hct_m3  2.248 -0.079  -0.079   -0.079   -0.079
## 143        age_t ~~       alt_m3  2.215 -0.080  -0.080   -0.136   -0.136
## 144       wbc_m1  ~  tourn_no_m3  2.198 -0.078  -0.078   -0.079   -0.079
## 145        age_t ~~       wbc_m1  2.117 -0.130  -0.130   -0.164   -0.164
## 146   max_hct_m3  ~  tourn_no_m3  2.107  0.074   0.074    0.073    0.073
## 147       alt_m3  ~  tourn_no_m3  2.098 -0.051  -0.051   -0.051   -0.051
## 148       alt_m1 ~~   albumin_m1  2.086 -0.053  -0.053   -0.054   -0.054
## 149   max_hct_m3  ~          dhf  2.050 -0.077  -0.077   -0.076   -0.076
## 150       ast_m1  ~       ast_m3  1.999  0.382   0.382    0.383    0.383
## 151     lymph_m3  ~  tourn_no_m3  1.977  0.079   0.079    0.078    0.078
## 152       ast_m1  ~   max_hct_m3  1.947  0.066   0.066    0.066    0.066
## 153  tourn_no_m1 ~~   albumin_m1  1.923 -0.077  -0.077   -0.080   -0.080
## 154       wbc_m3 ~~       alt_m1  1.914 -0.032  -0.032   -0.050   -0.050
## 155        age_t ~~  tourn_no_m1  1.896 -0.207  -0.207   -0.269   -0.269
## 156     lymph_m3 ~~       ast_m1  1.816 -0.044  -0.044   -0.049   -0.049
## 157 platelets_m3  ~          dhf  1.782  0.064   0.064    0.066    0.066
## 158   max_hct_m3  ~       alt_m3  1.751  0.068   0.068    0.067    0.067
## 159       ast_m1  ~       alt_m3  1.713  0.314   0.314    0.315    0.315
## 160 platelets_m1 ~~  tourn_no_m1  1.673 -0.059  -0.059   -0.066   -0.066
## 161       alt_m1  ~ platelets_m1  1.666 -0.054  -0.054   -0.053   -0.053
## 162       alt_m1  ~   albumin_m3  1.628 -0.060  -0.060   -0.060   -0.060
## 163        age_t  ~       ast_m3  1.617 -0.174  -0.174   -0.179   -0.179
## 164        age_t  ~       ast_m1  1.606 -0.069  -0.069   -0.071   -0.071
## 165       wbc_m3  ~   max_hct_m1  1.603 -0.049  -0.049   -0.051   -0.051
## 166 platelets_m1  ~        age_t  1.595  0.079   0.079    0.079    0.079
## 167        age_t  ~   albumin_m1  1.511  0.063   0.063    0.065    0.065
## 168     lymph_m1  ~  tourn_no_m3  1.506  0.085   0.085    0.084    0.084
## 169  tourn_no_m3  ~     lymph_m1  1.490  0.066   0.066    0.067    0.067
## 170       alt_m3 ~~       wbc_m3  1.490  0.026   0.026    0.054    0.054
## 171   albumin_m1  ~          dhf  1.477 -0.076  -0.076   -0.076   -0.076
## 172          dhf  ~   albumin_m1  1.477 -0.076  -0.076   -0.076   -0.076
## 173       wbc_m1  ~     lymph_m3  1.438  0.068   0.068    0.070    0.070
## 174   albumin_m1  ~  tourn_no_m3  1.424 -0.071  -0.071   -0.070   -0.070
## 175       ast_m1  ~ platelets_m3  1.413 -0.055  -0.055   -0.054   -0.054
## 176  tourn_no_m1  ~   max_hct_m3  1.407  0.071   0.071    0.071    0.071
## 177 platelets_m3 ~~   max_hct_m1  1.403 -0.050  -0.050   -0.071   -0.071
## 178     lymph_m3  ~ platelets_m3  1.395 -0.069  -0.069   -0.067   -0.067
## 179  tourn_no_m3 ~~     lymph_m1  1.394  0.059   0.059    0.070    0.070
## 180     lymph_m3  ~       ast_m1  1.359 -0.062  -0.062   -0.061   -0.061
## 181       alt_m3 ~~  tourn_no_m3  1.355 -0.034  -0.034   -0.056   -0.056
## 182 platelets_m1  ~       alt_m3  1.346 -0.056  -0.056   -0.058   -0.058
## 183 platelets_m3 ~~     lymph_m3  1.345 -0.049  -0.049   -0.072   -0.072
## 184       alt_m3  ~ platelets_m3  1.327  0.042   0.042    0.041    0.041
## 185       ast_m3 ~~  tourn_no_m3  1.316  0.033   0.033    0.055    0.055
## 186       alt_m1  ~       ast_m1  1.293  0.576   0.576    0.580    0.580
## 187        age_t  ~   albumin_m3  1.284  0.109   0.109    0.112    0.112
## 188       ast_m1  ~     lymph_m3  1.278 -0.044  -0.044   -0.044   -0.044
## 189       wbc_m3 ~~   albumin_m1  1.277  0.040   0.040    0.061    0.061
## 190   albumin_m1  ~       alt_m1  1.198 -0.065  -0.065   -0.064   -0.064
## 191   albumin_m3 ~~     lymph_m3  1.183 -0.047  -0.047   -0.063   -0.063
## 192     lymph_m3  ~   albumin_m3  1.159 -0.057  -0.057   -0.056   -0.056
## 193   max_hct_m3  ~ platelets_m3  1.147 -0.056  -0.056   -0.055   -0.055
## 194     lymph_m1  ~ platelets_m3  1.108 -0.066  -0.066   -0.063   -0.063
## 195       alt_m1  ~ platelets_m3  1.100 -0.043  -0.043   -0.042   -0.042
## 196       ast_m1 ~~   albumin_m1  1.094  0.038   0.038    0.039    0.039
## 197     lymph_m3 ~~       wbc_m1  1.085  0.049   0.049    0.055    0.055
## 198   max_hct_m1  ~       ast_m3  1.076 -0.071  -0.071   -0.070   -0.070
## 199       ast_m3 ~~ platelets_m1  1.042 -0.026  -0.026   -0.040   -0.040
## 200        age_t ~~   max_hct_m1  1.028 -0.125  -0.125   -0.162   -0.162
## 201     lymph_m3  ~       alt_m1  1.025 -0.054  -0.054   -0.053   -0.053
## 202       ast_m3  ~     lymph_m1  1.003  0.034   0.034    0.035    0.035
## 203        age_t ~~   albumin_m1  0.998  0.047   0.047    0.058    0.058
## 204   albumin_m1  ~     lymph_m1  0.972  0.058   0.058    0.059    0.059
## 205       ast_m3 ~~   max_hct_m3  0.969  0.027   0.027    0.047    0.047
## 206       ast_m3  ~   max_hct_m3  0.969  0.041   0.041    0.041    0.041
## 207       wbc_m3 ~~   max_hct_m1  0.952 -0.034  -0.034   -0.054   -0.054
## 208 platelets_m1  ~  tourn_no_m1  0.944 -0.049  -0.049   -0.051   -0.051
## 209     lymph_m3  ~       alt_m3  0.942 -0.051  -0.051   -0.051   -0.051
## 210   albumin_m1  ~        age_t  0.935  0.060   0.060    0.058    0.058
## 211 platelets_m3  ~     lymph_m3  0.913 -0.044  -0.044   -0.046   -0.046
## 212       ast_m1  ~        age_t  0.876 -0.041  -0.041   -0.040   -0.040
## 213          dhf  ~  tourn_no_m3  0.824  0.070   0.070    0.069    0.069
## 214       wbc_m3  ~   albumin_m1  0.820  0.036   0.036    0.037    0.037
## 215  tourn_no_m3  ~       alt_m3  0.810 -0.048  -0.048   -0.048   -0.048
## 216        age_t ~~ platelets_m3  0.800 -0.057  -0.057   -0.095   -0.095
## 217       alt_m1  ~       wbc_m1  0.797 -0.035  -0.035   -0.035   -0.035
## 218       wbc_m1  ~       ast_m3  0.783  0.052   0.052    0.053    0.053
## 219   albumin_m3  ~   max_hct_m1  0.761  0.045   0.045    0.046    0.046
## 220   max_hct_m3 ~~       alt_m1  0.753  0.027   0.027    0.034    0.034
## 221       alt_m3 ~~     lymph_m1  0.736 -0.028  -0.028   -0.039   -0.039
## 222     lymph_m1  ~     lymph_m3  0.712  0.161   0.161    0.160    0.160
## 223       alt_m3  ~       ast_m3  0.688  0.327   0.327    0.327    0.327
## 224     lymph_m3  ~  tourn_no_m1  0.668 -0.044  -0.044   -0.044   -0.044
## 225   max_hct_m1  ~       wbc_m3  0.658 -0.048  -0.048   -0.047   -0.047
## 226       alt_m1  ~     lymph_m3  0.654  0.031   0.031    0.032    0.032
## 227   albumin_m3 ~~     lymph_m1  0.648 -0.040  -0.040   -0.048   -0.048
## 228 platelets_m3  ~   max_hct_m1  0.640 -0.038  -0.038   -0.039   -0.039
## 229       alt_m3  ~ platelets_m1  0.612  0.030   0.030    0.029    0.029
## 230       wbc_m3  ~   max_hct_m3  0.599 -0.029  -0.029   -0.030   -0.030
## 231   max_hct_m1  ~       alt_m1  0.598 -0.046  -0.046   -0.045   -0.045
## 232       alt_m1 ~~   max_hct_m1  0.598 -0.044  -0.044   -0.047   -0.047
## 233  tourn_no_m3  ~       wbc_m1  0.594 -0.042  -0.042   -0.041   -0.041
## 234   albumin_m3 ~~  tourn_no_m3  0.593  0.034   0.034    0.048    0.048
## 235       alt_m3 ~~   max_hct_m1  0.576  0.030   0.030    0.044    0.044
## 236       wbc_m3  ~        age_t  0.553 -0.086  -0.086   -0.085   -0.085
## 237       alt_m3 ~~ platelets_m1  0.548  0.020   0.020    0.029    0.029
## 238       alt_m3 ~~ platelets_m3  0.546  0.019   0.019    0.035    0.035
## 239   max_hct_m3 ~~       ast_m1  0.544  0.023   0.023    0.029    0.029
## 240  tourn_no_m3  ~          dhf  0.542  0.041   0.041    0.041    0.041
## 241   albumin_m3 ~~  tourn_no_m1  0.541 -0.036  -0.036   -0.045   -0.045
## 242   max_hct_m1  ~       ast_m1  0.536 -0.056  -0.056   -0.055   -0.055
## 243     lymph_m3  ~   albumin_m1  0.531 -0.038  -0.038   -0.038   -0.038
## 244     lymph_m1  ~   albumin_m3  0.528 -0.043  -0.043   -0.043   -0.043
## 245       alt_m3  ~  tourn_no_m1  0.526 -0.025  -0.025   -0.025   -0.025
## 246  tourn_no_m3  ~       alt_m1  0.526 -0.039  -0.039   -0.039   -0.039
## 247 platelets_m3  ~        age_t  0.502 -0.051  -0.051   -0.050   -0.050
## 248       alt_m3 ~~  tourn_no_m1  0.500 -0.023  -0.023   -0.033   -0.033
## 249       wbc_m1  ~ platelets_m3  0.490  0.046   0.046    0.046    0.046
## 250       ast_m1 ~~       wbc_m1  0.490  0.023   0.023    0.024    0.024
## 251     lymph_m1  ~       ast_m1  0.489  0.042   0.042    0.041    0.041
## 252       alt_m3  ~        age_t  0.454 -0.037  -0.037   -0.036   -0.036
## 253   albumin_m1  ~       wbc_m1  0.446 -0.042  -0.042   -0.042   -0.042
## 254 platelets_m3  ~  tourn_no_m3  0.429  0.031   0.031    0.031    0.031
## 255       alt_m3  ~          dhf  0.425 -0.023  -0.023   -0.023   -0.023
## 256          dhf  ~   albumin_m3  0.423  0.041   0.041    0.041    0.041
## 257       wbc_m1  ~       ast_m1  0.420  0.034   0.034    0.034    0.034
## 258     lymph_m3 ~~   max_hct_m3  0.398  0.027   0.027    0.036    0.036
## 259  tourn_no_m3  ~   albumin_m3  0.397  0.033   0.033    0.034    0.034
## 260       ast_m3 ~~       alt_m1  0.397 -0.148  -0.148   -0.215   -0.215
## 261       wbc_m3 ~~       ast_m1  0.394 -0.015  -0.015   -0.023   -0.023
## 262       alt_m1  ~       alt_m3  0.379 -0.165  -0.165   -0.167   -0.167
## 263     lymph_m3 ~~  tourn_no_m1  0.377 -0.030  -0.030   -0.035   -0.035
## 264       alt_m3  ~     lymph_m1  0.375 -0.021  -0.021   -0.022   -0.022
## 265        age_t  ~ platelets_m1  0.375  0.045   0.045    0.046    0.046
## 266       alt_m1  ~   max_hct_m1  0.366 -0.038  -0.038   -0.039   -0.039
## 267 platelets_m1  ~  tourn_no_m3  0.358 -0.029  -0.029   -0.030   -0.030
## 268       ast_m1  ~   albumin_m1  0.349  0.023   0.023    0.023    0.023
## 269     lymph_m3  ~ platelets_m1  0.348 -0.034  -0.034   -0.033   -0.033
## 270       alt_m1  ~  tourn_no_m3  0.346  0.025   0.025    0.025    0.025
## 271        age_t ~~       wbc_m3  0.334  0.170   0.170    0.322    0.322
## 272        age_t ~~  tourn_no_m3  0.334  3.340   3.340    4.878    4.878
## 273 platelets_m3 ~~  tourn_no_m3  0.307  0.022   0.022    0.035    0.035
## 274       alt_m1 ~~       wbc_m1  0.303 -0.018  -0.018   -0.019   -0.019
## 275       wbc_m1  ~   albumin_m1  0.303 -0.033  -0.033   -0.033   -0.033
## 276       wbc_m1 ~~   albumin_m1  0.303 -0.033  -0.033   -0.033   -0.033
## 277       alt_m1  ~   max_hct_m3  0.297  0.024   0.024    0.024    0.024
## 278     lymph_m3  ~          dhf  0.293 -0.029  -0.029   -0.029   -0.029
## 279 platelets_m1  ~       wbc_m3  0.281  0.060   0.060    0.060    0.060
## 280   albumin_m3  ~  tourn_no_m3  0.278  0.028   0.028    0.028    0.028
## 281       alt_m1 ~~ platelets_m1  0.276 -0.016  -0.016   -0.017   -0.017
## 282   albumin_m3  ~     lymph_m1  0.273 -0.027  -0.027   -0.027   -0.027
## 283       ast_m3 ~~       ast_m1  0.262 -0.172  -0.172   -0.247   -0.247
## 284   max_hct_m1  ~   albumin_m3  0.252  0.029   0.029    0.029    0.029
## 285   max_hct_m1  ~  tourn_no_m3  0.239 -0.029  -0.029   -0.028   -0.028
## 286   albumin_m3  ~ platelets_m3  0.236  0.027   0.027    0.026    0.026
## 287   albumin_m3  ~       alt_m3  0.235  0.033   0.033    0.033    0.033
## 288 platelets_m1  ~   max_hct_m3  0.233  0.028   0.028    0.029    0.029
## 289 platelets_m3  ~       wbc_m3  0.229  0.034   0.034    0.034    0.034
## 290  tourn_no_m3  ~       ast_m1  0.225 -0.025  -0.025   -0.025   -0.025
## 291 platelets_m3 ~~     lymph_m1  0.222  0.021   0.021    0.028    0.028
## 292   max_hct_m1 ~~   albumin_m1  0.222  0.028   0.028    0.029    0.029
## 293   max_hct_m1  ~   albumin_m1  0.222  0.028   0.028    0.027    0.027
## 294  tourn_no_m1  ~  tourn_no_m3  0.216  0.094   0.094    0.093    0.093
## 295        age_t ~~ platelets_m1  0.214  0.021   0.021    0.028    0.028
## 296       alt_m3 ~~   max_hct_m3  0.213 -0.013  -0.013   -0.022   -0.022
## 297       alt_m3 ~~   albumin_m3  0.206  0.017   0.017    0.028    0.028
## 298  tourn_no_m3  ~   max_hct_m3  0.203  0.024   0.024    0.024    0.024
## 299          dhf  ~ platelets_m3  0.198 -0.035  -0.035   -0.034   -0.034
## 300       ast_m3 ~~ platelets_m3  0.190 -0.011  -0.011   -0.021   -0.021
## 301  tourn_no_m1  ~     lymph_m3  0.190  0.028   0.028    0.028    0.028
## 302       alt_m3  ~       wbc_m1  0.189  0.020   0.020    0.020    0.020
## 303 platelets_m1  ~ platelets_m3  0.187  0.048   0.048    0.049    0.049
## 304     lymph_m1 ~~   albumin_m1  0.185  0.024   0.024    0.025    0.025
## 305   max_hct_m3  ~ platelets_m1  0.182  0.023   0.023    0.022    0.022
## 306       alt_m3 ~~       ast_m1  0.182  0.055   0.055    0.076    0.076
## 307     lymph_m3 ~~       alt_m1  0.181  0.014   0.014    0.016    0.016
## 308   albumin_m3 ~~   albumin_m1  0.174  0.061   0.061    0.073    0.073
## 309   albumin_m3 ~~ platelets_m1  0.174 -0.017  -0.017   -0.021   -0.021
## 310          dhf  ~     lymph_m3  0.171  0.029   0.029    0.029    0.029
## 311     lymph_m1  ~  tourn_no_m1  0.170  0.882   0.882    0.872    0.872
## 312     lymph_m1 ~~       ast_m1  0.170  0.015   0.015    0.016    0.016
## 313          dhf  ~        age_t  0.158  0.030   0.030    0.029    0.029
## 314   albumin_m1  ~       wbc_m3  0.152  0.024   0.024    0.024    0.024
## 315       ast_m1  ~   albumin_m3  0.151  0.015   0.015    0.015    0.015
## 316  tourn_no_m3 ~~       alt_m1  0.151 -0.013  -0.013   -0.015   -0.015
## 317 platelets_m3  ~       alt_m3  0.143  0.019   0.019    0.019    0.019
## 318        age_t  ~       alt_m1  0.142  0.025   0.025    0.026    0.026
## 319       alt_m3  ~   albumin_m3  0.141  0.016   0.016    0.016    0.016
## 320   max_hct_m3 ~~       wbc_m1  0.140 -0.016  -0.016   -0.020   -0.020
## 321   albumin_m1  ~   albumin_m3  0.137  0.069   0.069    0.068    0.068
## 322  tourn_no_m3  ~ platelets_m1  0.128 -0.020  -0.020   -0.019   -0.019
## 323  tourn_no_m3  ~   albumin_m1  0.128 -0.019  -0.019   -0.019   -0.019
## 324   max_hct_m1  ~       alt_m3  0.122 -0.021  -0.021   -0.021   -0.021
## 325 platelets_m3  ~  tourn_no_m1  0.122  0.016   0.016    0.017    0.017
## 326       ast_m1  ~       wbc_m3  0.108 -0.013  -0.013   -0.013   -0.013
## 327  tourn_no_m3 ~~       wbc_m1  0.105 -0.014  -0.014   -0.017   -0.017
## 328     lymph_m3  ~       wbc_m1  0.105  0.019   0.019    0.019    0.019
## 329       alt_m3  ~   max_hct_m1  0.104  0.015   0.015    0.015    0.015
## 330     lymph_m1  ~   albumin_m1  0.097 -0.019  -0.019   -0.018   -0.018
## 331   max_hct_m3 ~~ platelets_m1  0.091  0.012   0.012    0.015    0.015
## 332       alt_m1  ~     lymph_m1  0.084 -0.011  -0.011   -0.012   -0.012
## 333   max_hct_m3  ~        age_t  0.080  0.033   0.033    0.032    0.032
## 334       alt_m3 ~~       wbc_m1  0.079 -0.010  -0.010   -0.014   -0.014
## 335  tourn_no_m3 ~~   albumin_m1  0.073 -0.013  -0.013   -0.016   -0.016
## 336       ast_m3  ~        age_t  0.068 -0.023  -0.023   -0.022   -0.022
## 337       alt_m3  ~   max_hct_m3  0.064 -0.010  -0.010   -0.010   -0.010
## 338   max_hct_m3  ~       wbc_m1  0.058  0.012   0.012    0.012    0.012
## 339     lymph_m1  ~       alt_m1  0.057  0.014   0.014    0.014    0.014
## 340       alt_m3 ~~   albumin_m1  0.056 -0.008  -0.008   -0.011   -0.011
## 341       ast_m1  ~  tourn_no_m3  0.052  0.010   0.010    0.010    0.010
## 342 platelets_m3  ~     lymph_m1  0.052  0.010   0.010    0.011    0.011
## 343   albumin_m3 ~~   max_hct_m1  0.051  0.011   0.011    0.014    0.014
## 344  tourn_no_m3  ~ platelets_m3  0.051  0.012   0.012    0.012    0.012
## 345        age_t  ~          dhf  0.049  0.012   0.012    0.013    0.013
## 346 platelets_m3  ~       ast_m3  0.045  0.012   0.012    0.013    0.013
## 347   albumin_m3 ~~       alt_m1  0.041 -0.008  -0.008   -0.010   -0.010
## 348       wbc_m1  ~       alt_m1  0.040 -0.011  -0.011   -0.011   -0.011
## 349   max_hct_m3  ~     lymph_m3  0.040 -0.010  -0.010   -0.010   -0.010
## 350  tourn_no_m3 ~~ platelets_m1  0.040 -0.008  -0.008   -0.010   -0.010
## 351   albumin_m1  ~ platelets_m3  0.040  0.032   0.032    0.032    0.032
## 352     lymph_m3 ~~     lymph_m1  0.033  0.027   0.027    0.030    0.030
## 353   albumin_m1  ~     lymph_m3  0.031 -0.010  -0.010   -0.010   -0.010
## 354     lymph_m3 ~~   albumin_m1  0.030 -0.009  -0.009   -0.009   -0.009
## 355       wbc_m1  ~       alt_m3  0.030 -0.009  -0.009   -0.009   -0.009
## 356   albumin_m3  ~       ast_m1  0.030 -0.014  -0.014   -0.014   -0.014
## 357   albumin_m1  ~       ast_m1  0.028 -0.010  -0.010   -0.010   -0.010
## 358 platelets_m3 ~~       wbc_m1  0.028  0.006   0.006    0.009    0.009
## 359       alt_m1 ~~     lymph_m1  0.027 -0.006  -0.006   -0.006   -0.006
## 360       wbc_m1  ~       wbc_m3  0.024  0.028   0.028    0.028    0.028
## 361   max_hct_m3  ~   albumin_m1  0.024  0.008   0.008    0.008    0.008
## 362     lymph_m1  ~       alt_m3  0.023  0.009   0.009    0.009    0.009
## 363  tourn_no_m3 ~~       ast_m1  0.020 -0.005  -0.005   -0.006   -0.006
## 364       alt_m3 ~~       alt_m1  0.019 -0.018  -0.018   -0.026   -0.026
## 365 platelets_m3  ~       alt_m1  0.017 -0.010  -0.010   -0.010   -0.010
## 366   albumin_m1  ~   max_hct_m1  0.016 -0.008  -0.008   -0.008   -0.008
## 367 platelets_m3 ~~       alt_m1  0.015 -0.004  -0.004   -0.005   -0.005
## 368 platelets_m3  ~       wbc_m1  0.015  0.006   0.006    0.006    0.006
## 369       ast_m1  ~     lymph_m1  0.010 -0.004  -0.004   -0.004   -0.004
## 370 platelets_m1  ~   albumin_m3  0.007 -0.005  -0.005   -0.005   -0.005
## 371   max_hct_m3  ~  tourn_no_m1  0.007  0.004   0.004    0.004    0.004
## 372   max_hct_m3 ~~  tourn_no_m1  0.007  0.004   0.004    0.005    0.005
## 373       ast_m1  ~       wbc_m1  0.006 -0.003  -0.003   -0.003   -0.003
## 374   albumin_m3 ~~       ast_m1  0.006  0.002   0.002    0.003    0.003
## 375 platelets_m3 ~~   albumin_m1  0.004 -0.015  -0.015   -0.020   -0.020
## 376 platelets_m3 ~~ platelets_m1  0.004  0.004   0.004    0.006    0.006
## 377       wbc_m3 ~~   max_hct_m3  0.004 -0.002  -0.002   -0.004   -0.004
## 378 platelets_m3 ~~  tourn_no_m1  0.003  0.003   0.003    0.004    0.004
## 379     lymph_m3  ~       wbc_m3  0.002 -0.004  -0.004   -0.004   -0.004
## 380   albumin_m3  ~  tourn_no_m1  0.002 -0.002  -0.002   -0.002   -0.002
## 381   max_hct_m3 ~~   albumin_m1  0.002  0.002   0.002    0.003    0.003
## 382   albumin_m1  ~   max_hct_m3  0.001 -0.002  -0.002   -0.002   -0.002
## 383   albumin_m1  ~ platelets_m1  0.001 -0.004  -0.004   -0.004   -0.004
## 384   albumin_m3  ~       ast_m3  0.000 -0.002  -0.002   -0.002   -0.002
## 385   albumin_m3  ~       wbc_m3  0.000  0.001   0.001    0.001    0.001
## 386     lymph_m3  ~        age_t  0.000  0.002   0.002    0.002    0.002
## 387   max_hct_m3  ~       wbc_m3  0.000  0.001   0.001    0.001    0.001
## 388  tourn_no_m3  ~       ast_m3  0.000 -0.001  -0.001   -0.001   -0.001
## 389       alt_m3  ~   albumin_m1  0.000  0.000   0.000    0.000    0.000
## 390     lymph_m3  ~       ast_m3  0.000 -0.001  -0.001   -0.001   -0.001
## 391  tourn_no_m3 ~~  tourn_no_m1  0.000  0.000   0.000    0.001    0.001
## 392 platelets_m3 ~~       ast_m1  0.000  0.000   0.000    0.000    0.000
```

```r
#17 nodes
ly<-matrix(NA,18,2)
depVar='age_t'
med2=c('ast_m1','alt_m1','wbc_m1','lymph_m1','albumin_m1','max_hct_m1','platelets_m1','tourn_no_m1')
med1=c('ast_m3','alt_m3','wbc_m3','lymph_m3','albumin_m3','max_hct_m3','platelets_m3','tourn_no_m3')
indepVar='dhf'
labels=c()
labels[1]=depVar
ly[1,]=c(1,0)
y=1
for (x in c(1:length(med1))){
  ly[y+x,]=c(0.6,(x/8*1.6-1))
  labels[(x+y)]<-med1[x]
}
y=9
for (x in c(1:length(med2))){
  ly[y+x,]=c(-1,(x/8*1.6-1))
  labels[(x+y)]<-med2[x]
}
labels[18]=indepVar
ly[18,]=c(-0.5,1)

table2<-parameterEstimates(Rev_fit,standardized=TRUE)%>%as.data.frame()
table2<-table2[!table2$lhs==table2$rhs,]
b<-gettextf('%.3f \n p=%.3f', table2$std.all, digits=table2$pvalue)
fittitles<-fitmeasures(Rev_fit)[c('cfi.robust','tli.robust','rmsea.robust','rmsea.ci.lower.robust' , 'rmsea.ci.upper.robust')]%>%round(3)

semPaths(Rev_fit, layout=ly,
         edgeLabels=b,
         residuals=FALSE,
         style='ram',
         what='est',
         whatLabels = "std",
         cut=0.3,
         sizeMan = 10, # Size of manifest variables
  sizeMan2=3,edge.label.cex = 0.6,label.cex=1,
  
  nCharNodes = 0,fade=TRUE,
  mar = c(5,2,2,2))

text(0,-1.3,paste0(names(fittitles),': ',fittitles,collapse='; '),cex=1.5)
title('Nonsense Reversed Model')
```

![](1b_Park2018_iteration_files/figure-html/unnamed-chunk-23-1.png)<!-- -->

![Reversed Model](https://github.com/TomoeGusberti/tomoegusberti.github.io/blob/master/_collections/SEM_Examples/1_Park2018_files/Park2018_iteration_ns_reversed.png?raw=true)

