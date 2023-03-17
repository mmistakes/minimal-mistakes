---
layout: single
author_profile: true
title: "5-A CB-SEM moderation study: Attitude toward Energy consumption"
categories: [SEM,CB-SEM,R,moderation]
shorttitle: "SEM_LaBarbera2020"
shortdesc: "Exemplification of moderation study in CB-SEM: assessment of Sustainability
awareness through the attitudes toward energy saving, and the implications on
intention"
Method: "CB-SEM using R's `Lavaan` Package. The semTools package is used to compute moderation terms. The visualization was
generated using `semPlots` Package."
Case: "Model inspired by La Barbera's data, on the assessment of Sustainability awareness through the attitudes toward energy saving, and the implications on intention"
Case_code: 'LaBarbera_2020'
Datafrom: "La Barbera, F. Moderating Role of Control in the Theory of Planned Behavior: A Replication and Extension [Dataset] [Data set]. ZPID (Leibniz Institute for Psychology Information). https://doi.org/10.23668/psycharchives.2759."
excerpt: "Some code examples using R"
image: "https://github.com/TomoeGusberti/tomoegusberti.github.io/blob/master/_collections/SEM_Examples/5_LaBarbera2020/LaBarbera2020_mod.png?raw=true"
header:
  overlay_color: "#333"
permalink: /collections/SEM_Examples/5_LaBarbera2020
date: "2022-06-19"
author: "Tomoe Gusberti"
output: 
  html_document:
    keep_md: true
    self_contained: true
editor_options: 
  markdown: 
    wrap: 72
---




# Objective

Replicate study reported by LaBarbera et al 2020, originally applied without the use of SEM.

Method: CB-SEM using R\'s Lavaan Package. The semPlots and semTools Package were used for visualizations.

Summary: Model inspired on the La Barbera\'s data, on the assessment of Sustainability
awareness through the attitudes toward energy saving, and the implications on
intention:

Data: La Barbera, F. Moderating Role of Control in the Theory of Planned
Behavior: A Replication and Extension [Dataset] [Data set]. ZPID (Leibniz
Institute for Psychology Information). <https://doi.org/10.23668/psycharchives.2759>

# Data acquisition

```r
datat<-read_sav('LaBarbera2020.sav')
```



# CFA - confirmatory factor analysis

For simplicity, the adjustment and verification for each construct is not presented. We present just the fit for CFA with the all measurement models already adjusted. 


```r
Model<-"intention=~v_34+v_26+v_13+v_16+v_20
attitude=~v_18+v_39+v_14+v_21+v_30
subjNorm=~v_38+v_22+v_19+v_35+v_17+v_24+v_27+v_29+v_31+v_33
BehControl=~v_25+v_28+v_15
v_34~~v_26
v_13~~v_16
v_34~~v_16
v_21~~v_30
v_38~~v_22
v_38~~v_19
v_22~~v_19
v_19~~v_17
v_35~~v_24"

fit<-cfa(Model,data)
summary(fit, fit.measures=TRUE)
```

```
## lavaan 0.6-12 ended normally after 60 iterations
## 
##   Estimator                                         ML
##   Optimization method                           NLMINB
##   Number of model parameters                        61
## 
##   Number of observations                           399
## 
## Model Test User Model:
##                                                       
##   Test statistic                               597.693
##   Degrees of freedom                               215
##   P-value (Chi-square)                           0.000
## 
## Model Test Baseline Model:
## 
##   Test statistic                              8615.675
##   Degrees of freedom                               253
##   P-value                                        0.000
## 
## User Model versus Baseline Model:
## 
##   Comparative Fit Index (CFI)                    0.954
##   Tucker-Lewis Index (TLI)                       0.946
## 
## Loglikelihood and Information Criteria:
## 
##   Loglikelihood user model (H0)             -13103.074
##   Loglikelihood unrestricted model (H1)             NA
##                                                       
##   Akaike (AIC)                               26328.148
##   Bayesian (BIC)                             26571.474
##   Sample-size adjusted Bayesian (BIC)        26377.918
## 
## Root Mean Square Error of Approximation:
## 
##   RMSEA                                          0.067
##   90 Percent confidence interval - lower         0.060
##   90 Percent confidence interval - upper         0.073
##   P-value RMSEA <= 0.05                          0.000
## 
## Standardized Root Mean Square Residual:
## 
##   SRMR                                           0.051
## 
## Parameter Estimates:
## 
##   Standard errors                             Standard
##   Information                                 Expected
##   Information saturated (h1) model          Structured
## 
## Latent Variables:
##                    Estimate  Std.Err  z-value  P(>|z|)
##   intention =~                                        
##     v_34              1.000                           
##     v_26              1.054    0.033   31.520    0.000
##     v_13              0.767    0.040   19.105    0.000
##     v_16              0.951    0.038   25.240    0.000
##     v_20              1.101    0.037   29.989    0.000
##   attitude =~                                         
##     v_18              1.000                           
##     v_39              1.017    0.040   25.351    0.000
##     v_14              0.914    0.039   23.364    0.000
##     v_21              0.869    0.049   17.666    0.000
##     v_30              0.825    0.043   19.354    0.000
##   subjNorm =~                                         
##     v_38              1.000                           
##     v_22              1.088    0.045   23.954    0.000
##     v_19              0.917    0.046   19.817    0.000
##     v_35              1.117    0.071   15.818    0.000
##     v_17              0.657    0.083    7.951    0.000
##     v_24              0.756    0.064   11.750    0.000
##     v_27              1.134    0.071   15.891    0.000
##     v_29              1.115    0.070   16.009    0.000
##     v_31              1.147    0.070   16.288    0.000
##     v_33              1.035    0.072   14.461    0.000
##   BehControl =~                                       
##     v_25              1.000                           
##     v_28              1.113    0.044   25.409    0.000
##     v_15              0.788    0.053   14.919    0.000
## 
## Covariances:
##                    Estimate  Std.Err  z-value  P(>|z|)
##  .v_34 ~~                                             
##    .v_26              0.113    0.036    3.111    0.002
##  .v_13 ~~                                             
##    .v_16              0.143    0.040    3.530    0.000
##  .v_34 ~~                                             
##    .v_16             -0.083    0.026   -3.156    0.002
##  .v_21 ~~                                             
##    .v_30              0.380    0.056    6.799    0.000
##  .v_38 ~~                                             
##    .v_22              1.055    0.103   10.290    0.000
##    .v_19              1.081    0.105   10.259    0.000
##  .v_22 ~~                                             
##    .v_19              0.994    0.105    9.483    0.000
##  .v_19 ~~                                             
##    .v_17              0.407    0.090    4.495    0.000
##  .v_35 ~~                                             
##    .v_24              0.194    0.058    3.373    0.001
##   intention ~~                                        
##     attitude          1.595    0.133   11.956    0.000
##     subjNorm          1.165    0.125    9.349    0.000
##     BehControl        1.512    0.130   11.654    0.000
##   attitude ~~                                         
##     subjNorm          1.030    0.114    9.060    0.000
##     BehControl        1.318    0.118   11.175    0.000
##   subjNorm ~~                                         
##     BehControl        0.900    0.107    8.432    0.000
## 
## Variances:
##                    Estimate  Std.Err  z-value  P(>|z|)
##    .v_34              0.410    0.041    9.908    0.000
##    .v_26              0.581    0.052   11.208    0.000
##    .v_13              0.908    0.069   13.169    0.000
##    .v_16              0.476    0.043   11.143    0.000
##    .v_20              0.426    0.041   10.455    0.000
##    .v_18              0.445    0.042   10.686    0.000
##    .v_39              0.471    0.044   10.770    0.000
##    .v_14              0.525    0.045   11.711    0.000
##    .v_21              1.105    0.085   13.053    0.000
##    .v_30              0.775    0.061   12.775    0.000
##    .v_38              1.538    0.116   13.202    0.000
##    .v_22              1.586    0.121   13.074    0.000
##    .v_19              1.842    0.134   13.705    0.000
##    .v_35              0.735    0.063   11.698    0.000
##    .v_17              3.018    0.217   13.927    0.000
##    .v_24              1.327    0.099   13.428    0.000
##    .v_27              0.734    0.063   11.660    0.000
##    .v_29              0.670    0.058   11.512    0.000
##    .v_31              0.613    0.055   11.097    0.000
##    .v_33              1.091    0.086   12.754    0.000
##    .v_25              0.450    0.047    9.654    0.000
##    .v_28              0.381    0.049    7.732    0.000
##    .v_15              1.287    0.097   13.233    0.000
##     intention         1.924    0.165   11.640    0.000
##     attitude          1.625    0.146   11.155    0.000
##     subjNorm          1.449    0.186    7.792    0.000
##     BehControl        1.562    0.143   10.928    0.000
```

Note how the measurement models are fitting well. The following present the visualization using the semPlot package.


```r
parTable<-parameterEstimates(fit,standardized=TRUE)%>%as.data.frame()
table2<-parTable[!parTable$lhs==parTable$rhs,]
table2$sig=ifelse(table2$pvalue<0.001,'***',
                  ifelse(table2$pvalue<0.01,'**',
                      ifelse(table2$pvalue<0.05,'*','')
                      )
                  )
b<-ifelse(table2$pvalue<=0.05,paste0(round(table2$std.all,3), table2$sig),"")
semPlot::semPaths(fit,what='std',layout='circle2',
                  edgeLabels=b,
                  residuals=FALSE,
                whatLabels = "std",
                shapeMan='rectangle',
                sizeMan = 5, sizeMan2=2, 
                edge.label.cex = 0.5,label.cex=1,
                curve=TRUE,
                nCharNodes = 0,fade=FALSE,
                shapeLat='ellipse',
                sizeLat = 13,sizeLat2=4)
```

![](5_LaBarbera2020_files/figure-html/unnamed-chunk-4-1.png)<!-- -->
![cfa plot](https://github.com/TomoeGusberti/tomoegusberti.github.io/blob/master/_collections/SEM_Examples/5_LaBarbera2020/LaBarbera2020_cfa.png?raw=true)

#SEM

The Structural Equation Model is conducted adding the path model to the CFA model.

```r
modelSEM<-"intention~attitude+subjNorm+BehControl
intention=~v_34+v_26+v_13+v_16+v_20
attitude=~v_18+v_39+v_14+v_21+v_30
subjNorm=~v_38+v_22+v_19+v_35+v_17+v_24+v_27+v_29+v_31+v_33
BehControl=~v_25+v_28+v_15
v_34~~v_26
v_13~~v_16
v_34~~v_16
v_21~~v_30
v_38~~v_22
v_38~~v_19
v_22~~v_19
v_19~~v_17
v_35~~v_24"

fit_SEM=sem(modelSEM,data)
summary(fit_SEM,fit.meas=TRUE)
```

```
## lavaan 0.6-12 ended normally after 51 iterations
## 
##   Estimator                                         ML
##   Optimization method                           NLMINB
##   Number of model parameters                        61
## 
##   Number of observations                           399
## 
## Model Test User Model:
##                                                       
##   Test statistic                               597.693
##   Degrees of freedom                               215
##   P-value (Chi-square)                           0.000
## 
## Model Test Baseline Model:
## 
##   Test statistic                              8615.675
##   Degrees of freedom                               253
##   P-value                                        0.000
## 
## User Model versus Baseline Model:
## 
##   Comparative Fit Index (CFI)                    0.954
##   Tucker-Lewis Index (TLI)                       0.946
## 
## Loglikelihood and Information Criteria:
## 
##   Loglikelihood user model (H0)             -13103.074
##   Loglikelihood unrestricted model (H1)             NA
##                                                       
##   Akaike (AIC)                               26328.148
##   Bayesian (BIC)                             26571.474
##   Sample-size adjusted Bayesian (BIC)        26377.918
## 
## Root Mean Square Error of Approximation:
## 
##   RMSEA                                          0.067
##   90 Percent confidence interval - lower         0.060
##   90 Percent confidence interval - upper         0.073
##   P-value RMSEA <= 0.05                          0.000
## 
## Standardized Root Mean Square Residual:
## 
##   SRMR                                           0.051
## 
## Parameter Estimates:
## 
##   Standard errors                             Standard
##   Information                                 Expected
##   Information saturated (h1) model          Structured
## 
## Latent Variables:
##                    Estimate  Std.Err  z-value  P(>|z|)
##   intention =~                                        
##     v_34              1.000                           
##     v_26              1.054    0.033   31.520    0.000
##     v_13              0.767    0.040   19.105    0.000
##     v_16              0.951    0.038   25.240    0.000
##     v_20              1.101    0.037   29.989    0.000
##   attitude =~                                         
##     v_18              1.000                           
##     v_39              1.017    0.040   25.351    0.000
##     v_14              0.914    0.039   23.364    0.000
##     v_21              0.869    0.049   17.666    0.000
##     v_30              0.825    0.043   19.354    0.000
##   subjNorm =~                                         
##     v_38              1.000                           
##     v_22              1.088    0.045   23.954    0.000
##     v_19              0.917    0.046   19.817    0.000
##     v_35              1.117    0.071   15.819    0.000
##     v_17              0.657    0.083    7.951    0.000
##     v_24              0.756    0.064   11.750    0.000
##     v_27              1.134    0.071   15.891    0.000
##     v_29              1.115    0.070   16.009    0.000
##     v_31              1.147    0.070   16.288    0.000
##     v_33              1.035    0.072   14.461    0.000
##   BehControl =~                                       
##     v_25              1.000                           
##     v_28              1.113    0.044   25.409    0.000
##     v_15              0.788    0.053   14.919    0.000
## 
## Regressions:
##                    Estimate  Std.Err  z-value  P(>|z|)
##   intention ~                                         
##     attitude          0.539    0.064    8.415    0.000
##     subjNorm          0.159    0.041    3.886    0.000
##     BehControl        0.421    0.060    7.067    0.000
## 
## Covariances:
##                    Estimate  Std.Err  z-value  P(>|z|)
##  .v_34 ~~                                             
##    .v_26              0.113    0.036    3.111    0.002
##  .v_13 ~~                                             
##    .v_16              0.143    0.040    3.530    0.000
##  .v_34 ~~                                             
##    .v_16             -0.083    0.026   -3.157    0.002
##  .v_21 ~~                                             
##    .v_30              0.380    0.056    6.799    0.000
##  .v_38 ~~                                             
##    .v_22              1.055    0.103   10.290    0.000
##    .v_19              1.081    0.105   10.259    0.000
##  .v_22 ~~                                             
##    .v_19              0.994    0.105    9.483    0.000
##  .v_19 ~~                                             
##    .v_17              0.407    0.090    4.495    0.000
##  .v_35 ~~                                             
##    .v_24              0.194    0.058    3.373    0.001
##   attitude ~~                                         
##     subjNorm          1.030    0.114    9.060    0.000
##     BehControl        1.318    0.118   11.175    0.000
##   subjNorm ~~                                         
##     BehControl        0.900    0.107    8.432    0.000
## 
## Variances:
##                    Estimate  Std.Err  z-value  P(>|z|)
##    .v_34              0.410    0.041    9.908    0.000
##    .v_26              0.581    0.052   11.208    0.000
##    .v_13              0.908    0.069   13.169    0.000
##    .v_16              0.476    0.043   11.143    0.000
##    .v_20              0.426    0.041   10.455    0.000
##    .v_18              0.445    0.042   10.686    0.000
##    .v_39              0.471    0.044   10.770    0.000
##    .v_14              0.525    0.045   11.711    0.000
##    .v_21              1.105    0.085   13.053    0.000
##    .v_30              0.775    0.061   12.775    0.000
##    .v_38              1.538    0.116   13.202    0.000
##    .v_22              1.586    0.121   13.074    0.000
##    .v_19              1.842    0.134   13.705    0.000
##    .v_35              0.735    0.063   11.698    0.000
##    .v_17              3.018    0.217   13.927    0.000
##    .v_24              1.327    0.099   13.428    0.000
##    .v_27              0.734    0.063   11.660    0.000
##    .v_29              0.670    0.058   11.512    0.000
##    .v_31              0.613    0.055   11.097    0.000
##    .v_33              1.091    0.086   12.754    0.000
##    .v_25              0.450    0.047    9.654    0.000
##    .v_28              0.381    0.049    7.732    0.000
##    .v_15              1.287    0.097   13.233    0.000
##    .intention         0.242    0.033    7.340    0.000
##     attitude          1.625    0.146   11.155    0.000
##     subjNorm          1.449    0.186    7.792    0.000
##     BehControl        1.562    0.143   10.928    0.000
```

Considering it fits well, we can proceed to interpretation and visualization.


```r
parTable<-parameterEstimates(fit_SEM,standardized=TRUE)%>%as.data.frame()
table2<-parTable[!parTable$lhs==parTable$rhs,]
table2$sig=ifelse(table2$pvalue<0.001,'***',
                  ifelse(table2$pvalue<0.01,'**',
                      ifelse(table2$pvalue<0.05,'*','')
                      )
                  )
b<-ifelse(table2$pvalue<=0.05,paste0(round(table2$std.all,3), table2$sig),"")
semPlot::semPaths(fit_SEM,rotation=2,structural=FALSE,edgeLabels=b,
                  what='std',shapeLat='ellipse',
                  sizeLat=15,sizeLat2=3,nCharNodes=0)
```

![](5_LaBarbera2020_files/figure-html/unnamed-chunk-6-1.png)<!-- -->
![SEM](https://github.com/TomoeGusberti/tomoegusberti.github.io/blob/master/_collections/SEM_Examples/5_LaBarbera2020/LaBarbera2020.png?raw=true)

# Preparing for Moderation
We need to create a new data.frame with the interaction indicators

```r
#
moderator<-semTools::indProd(data = data, 
                  var1 = c( "v_25", "v_28","v_15"), #Bhcontrol
                  var2 = c("v_18","v_39", "v_14"), #Attitude #those with higher loadings
                  match = T, #use match-paired approach (it produces the product of the first indicators of each variable, the product of the second indicator of each latent variable...
                  meanC = T, # mean centering the main effect indicator before making the products
                  residualC = T, #residual centering the products by the main effect indicators
                  doubleMC = T)

moderator<-semTools::indProd(data = moderator, 
                  var1 = c("v_38", "v_22" ,"v_19"), #subjNorm
                  var2 = c("v_18","v_39", "v_14"), #Attitude  #those with higher loadings
                  match = T, #use match-paired approach (it produces the product of the first indicators of each variable, the product of the second indicator of each latent variable...
                  meanC = T, # mean centering the main effect indicator before making the products
                  residualC = T, #residual centering the products by the main effect indicators
                  doubleMC = T)
```

### CFA moderators

It is always a good idea to check if the moderator terms fit well at CFA before including in the SEM model


```r
Model=paste0("BhC_x_Att=~v_25.v_18+v_28.v_39+v_15.v_14",'\n',
  "subjNorm_x_Att=~v_38.v_18+v_22.v_39+v_19.v_14"
)
fit<-cfa(Model,moderator)
summary(fit, fit.measures=TRUE)
```

```
## lavaan 0.6-12 ended normally after 39 iterations
## 
##   Estimator                                         ML
##   Optimization method                           NLMINB
##   Number of model parameters                        13
## 
##   Number of observations                           399
## 
## Model Test User Model:
##                                                       
##   Test statistic                                54.759
##   Degrees of freedom                                 8
##   P-value (Chi-square)                           0.000
## 
## Model Test Baseline Model:
## 
##   Test statistic                              1165.112
##   Degrees of freedom                                15
##   P-value                                        0.000
## 
## User Model versus Baseline Model:
## 
##   Comparative Fit Index (CFI)                    0.959
##   Tucker-Lewis Index (TLI)                       0.924
## 
## Loglikelihood and Information Criteria:
## 
##   Loglikelihood user model (H0)              -5122.606
##   Loglikelihood unrestricted model (H1)      -5095.227
##                                                       
##   Akaike (AIC)                               10271.212
##   Bayesian (BIC)                             10323.068
##   Sample-size adjusted Bayesian (BIC)        10281.819
## 
## Root Mean Square Error of Approximation:
## 
##   RMSEA                                          0.121
##   90 Percent confidence interval - lower         0.092
##   90 Percent confidence interval - upper         0.152
##   P-value RMSEA <= 0.05                          0.000
## 
## Standardized Root Mean Square Residual:
## 
##   SRMR                                           0.039
## 
## Parameter Estimates:
## 
##   Standard errors                             Standard
##   Information                                 Expected
##   Information saturated (h1) model          Structured
## 
## Latent Variables:
##                     Estimate  Std.Err  z-value  P(>|z|)
##   BhC_x_Att =~                                         
##     v_25.v_18          1.000                           
##     v_28.v_39          0.922    0.052   17.721    0.000
##     v_15.v_14          0.751    0.051   14.803    0.000
##   subjNorm_x_Att =~                                    
##     v_38.v_18          1.000                           
##     v_22.v_39          0.852    0.058   14.611    0.000
##     v_19.v_14          0.836    0.056   14.873    0.000
## 
## Covariances:
##                    Estimate  Std.Err  z-value  P(>|z|)
##   BhC_x_Att ~~                                        
##     subjNorm_x_Att    3.279    0.358    9.152    0.000
## 
## Variances:
##                    Estimate  Std.Err  z-value  P(>|z|)
##    .v_25.v_18         0.534    0.214    2.497    0.013
##    .v_28.v_39         3.125    0.288   10.849    0.000
##    .v_15.v_14         3.829    0.301   12.728    0.000
##    .v_38.v_18         2.218    0.279    7.936    0.000
##    .v_22.v_39         2.846    0.269   10.597    0.000
##    .v_19.v_14         2.488    0.244   10.200    0.000
##     BhC_x_Att         5.601    0.481   11.639    0.000
##     subjNorm_x_Att    4.934    0.534    9.240    0.000
```

## CFA all

And also if there is no unexpected correlation with the original variables (that's frequent), and adjust properly before SEM.

```r
Model<-"intention=~v_34+v_26+v_13+v_16+v_20
attitude=~v_18+v_39+v_14+v_21+v_30
subjNorm=~v_38+v_22+v_19+v_35+v_17+v_24+v_27+v_29+v_31+v_33
BehControl=~v_25+v_28+v_15
BhC_x_Att=~v_25.v_18+v_28.v_39+v_15.v_14
subjNorm_x_Att=~v_38.v_18+v_22.v_39+v_19.v_14
v_34~~v_26
v_13~~v_16
v_34~~v_16
v_21~~v_30
v_38~~v_22
v_38~~v_19
v_22~~v_19
v_19~~v_17
v_35~~v_24"

fit<-cfa(Model,moderator)
summary(fit, fit.measures=TRUE)
```

```
## lavaan 0.6-12 ended normally after 91 iterations
## 
##   Estimator                                         ML
##   Optimization method                           NLMINB
##   Number of model parameters                        82
## 
##   Number of observations                           399
## 
## Model Test User Model:
##                                                       
##   Test statistic                               861.097
##   Degrees of freedom                               353
##   P-value (Chi-square)                           0.000
## 
## Model Test Baseline Model:
## 
##   Test statistic                             10011.255
##   Degrees of freedom                               406
##   P-value                                        0.000
## 
## User Model versus Baseline Model:
## 
##   Comparative Fit Index (CFI)                    0.947
##   Tucker-Lewis Index (TLI)                       0.939
## 
## Loglikelihood and Information Criteria:
## 
##   Loglikelihood user model (H0)             -18214.768
##   Loglikelihood unrestricted model (H1)             NA
##                                                       
##   Akaike (AIC)                               36593.536
##   Bayesian (BIC)                             36920.631
##   Sample-size adjusted Bayesian (BIC)        36660.441
## 
## Root Mean Square Error of Approximation:
## 
##   RMSEA                                          0.060
##   90 Percent confidence interval - lower         0.055
##   90 Percent confidence interval - upper         0.065
##   P-value RMSEA <= 0.05                          0.001
## 
## Standardized Root Mean Square Residual:
## 
##   SRMR                                           0.046
## 
## Parameter Estimates:
## 
##   Standard errors                             Standard
##   Information                                 Expected
##   Information saturated (h1) model          Structured
## 
## Latent Variables:
##                     Estimate  Std.Err  z-value  P(>|z|)
##   intention =~                                         
##     v_34               1.000                           
##     v_26               1.054    0.033   31.540    0.000
##     v_13               0.770    0.040   19.166    0.000
##     v_16               0.952    0.038   25.240    0.000
##     v_20               1.104    0.037   30.032    0.000
##   attitude =~                                          
##     v_18               1.000                           
##     v_39               1.017    0.040   25.339    0.000
##     v_14               0.915    0.039   23.377    0.000
##     v_21               0.869    0.049   17.650    0.000
##     v_30               0.825    0.043   19.365    0.000
##   subjNorm =~                                          
##     v_38               1.000                           
##     v_22               1.088    0.045   23.953    0.000
##     v_19               0.917    0.046   19.821    0.000
##     v_35               1.117    0.071   15.822    0.000
##     v_17               0.658    0.083    7.967    0.000
##     v_24               0.758    0.064   11.784    0.000
##     v_27               1.135    0.071   15.902    0.000
##     v_29               1.114    0.070   16.001    0.000
##     v_31               1.147    0.070   16.293    0.000
##     v_33               1.033    0.072   14.444    0.000
##   BehControl =~                                        
##     v_25               1.000                           
##     v_28               1.112    0.044   25.438    0.000
##     v_15               0.791    0.053   15.009    0.000
##   BhC_x_Att =~                                         
##     v_25.v_18          1.000                           
##     v_28.v_39          0.918    0.051   17.864    0.000
##     v_15.v_14          0.746    0.050   14.844    0.000
##   subjNorm_x_Att =~                                    
##     v_38.v_18          1.000                           
##     v_22.v_39          0.863    0.058   14.807    0.000
##     v_19.v_14          0.838    0.056   14.925    0.000
## 
## Covariances:
##                    Estimate  Std.Err  z-value  P(>|z|)
##  .v_34 ~~                                             
##    .v_26              0.119    0.036    3.280    0.001
##  .v_13 ~~                                             
##    .v_16              0.141    0.040    3.502    0.000
##  .v_34 ~~                                             
##    .v_16             -0.080    0.026   -3.064    0.002
##  .v_21 ~~                                             
##    .v_30              0.380    0.056    6.804    0.000
##  .v_38 ~~                                             
##    .v_22              1.055    0.103   10.293    0.000
##    .v_19              1.081    0.105   10.260    0.000
##  .v_22 ~~                                             
##    .v_19              0.994    0.105    9.486    0.000
##  .v_19 ~~                                             
##    .v_17              0.406    0.090    4.493    0.000
##  .v_35 ~~                                             
##    .v_24              0.191    0.058    3.317    0.001
##   intention ~~                                        
##     attitude          1.593    0.133   11.950    0.000
##     subjNorm          1.164    0.125    9.347    0.000
##     BehControl        1.509    0.130   11.650    0.000
##     BhC_x_Att         0.080    0.175    0.456    0.648
##     subjNorm_x_Att   -0.185    0.173   -1.068    0.286
##   attitude ~~                                         
##     subjNorm          1.030    0.114    9.060    0.000
##     BehControl        1.317    0.118   11.177    0.000
##     BhC_x_Att         0.003    0.164    0.016    0.987
##     subjNorm_x_Att   -0.001    0.162   -0.007    0.994
##   subjNorm ~~                                         
##     BehControl        0.900    0.107    8.435    0.000
##     BhC_x_Att        -0.146    0.154   -0.947    0.344
##     subjNorm_x_Att   -0.098    0.152   -0.646    0.518
##   BehControl ~~                                       
##     BhC_x_Att         0.000    0.162    0.000    1.000
##     subjNorm_x_Att    0.109    0.160    0.682    0.495
##   BhC_x_Att ~~                                        
##     subjNorm_x_Att    3.267    0.357    9.145    0.000
## 
## Variances:
##                    Estimate  Std.Err  z-value  P(>|z|)
##    .v_34              0.416    0.041   10.083    0.000
##    .v_26              0.586    0.052   11.310    0.000
##    .v_13              0.903    0.069   13.179    0.000
##    .v_16              0.478    0.043   11.226    0.000
##    .v_20              0.421    0.040   10.477    0.000
##    .v_18              0.445    0.042   10.702    0.000
##    .v_39              0.472    0.044   10.784    0.000
##    .v_14              0.524    0.045   11.711    0.000
##    .v_21              1.107    0.085   13.059    0.000
##    .v_30              0.774    0.061   12.776    0.000
##    .v_38              1.537    0.116   13.203    0.000
##    .v_22              1.587    0.121   13.077    0.000
##    .v_19              1.842    0.134   13.705    0.000
##    .v_35              0.735    0.063   11.698    0.000
##    .v_17              3.016    0.217   13.926    0.000
##    .v_24              1.322    0.098   13.422    0.000
##    .v_27              0.732    0.063   11.653    0.000
##    .v_29              0.673    0.058   11.529    0.000
##    .v_31              0.612    0.055   11.096    0.000
##    .v_33              1.096    0.086   12.765    0.000
##    .v_25              0.451    0.046    9.728    0.000
##    .v_28              0.384    0.049    7.848    0.000
##    .v_15              1.279    0.097   13.227    0.000
##    .v_25.v_18         0.501    0.210    2.382    0.017
##    .v_28.v_39         3.145    0.286   10.987    0.000
##    .v_15.v_14         3.849    0.301   12.796    0.000
##    .v_38.v_18         2.264    0.276    8.213    0.000
##    .v_22.v_39         2.782    0.265   10.516    0.000
##    .v_19.v_14         2.510    0.243   10.348    0.000
##     intention         1.918    0.165   11.618    0.000
##     attitude          1.624    0.146   11.152    0.000
##     subjNorm          1.449    0.186    7.793    0.000
##     BehControl        1.561    0.143   10.927    0.000
##     BhC_x_Att         5.634    0.480   11.740    0.000
##     subjNorm_x_Att    4.889    0.530    9.222    0.000
```

# SEM with moderation study


```r
modelSEM<-paste0(
'intention~attitude+subjNorm+BehControl+BhC_x_Att+subjNorm_x_Att
', '\n',Model)

fit_SEM=sem(modelSEM,moderator)
summary(fit_SEM,fit.meas=TRUE)
```

```
## lavaan 0.6-12 ended normally after 81 iterations
## 
##   Estimator                                         ML
##   Optimization method                           NLMINB
##   Number of model parameters                        82
## 
##   Number of observations                           399
## 
## Model Test User Model:
##                                                       
##   Test statistic                               861.097
##   Degrees of freedom                               353
##   P-value (Chi-square)                           0.000
## 
## Model Test Baseline Model:
## 
##   Test statistic                             10011.255
##   Degrees of freedom                               406
##   P-value                                        0.000
## 
## User Model versus Baseline Model:
## 
##   Comparative Fit Index (CFI)                    0.947
##   Tucker-Lewis Index (TLI)                       0.939
## 
## Loglikelihood and Information Criteria:
## 
##   Loglikelihood user model (H0)             -18214.768
##   Loglikelihood unrestricted model (H1)             NA
##                                                       
##   Akaike (AIC)                               36593.536
##   Bayesian (BIC)                             36920.631
##   Sample-size adjusted Bayesian (BIC)        36660.441
## 
## Root Mean Square Error of Approximation:
## 
##   RMSEA                                          0.060
##   90 Percent confidence interval - lower         0.055
##   90 Percent confidence interval - upper         0.065
##   P-value RMSEA <= 0.05                          0.001
## 
## Standardized Root Mean Square Residual:
## 
##   SRMR                                           0.046
## 
## Parameter Estimates:
## 
##   Standard errors                             Standard
##   Information                                 Expected
##   Information saturated (h1) model          Structured
## 
## Latent Variables:
##                     Estimate  Std.Err  z-value  P(>|z|)
##   intention =~                                         
##     v_34               1.000                           
##     v_26               1.054    0.033   31.540    0.000
##     v_13               0.770    0.040   19.166    0.000
##     v_16               0.952    0.038   25.240    0.000
##     v_20               1.104    0.037   30.032    0.000
##   attitude =~                                          
##     v_18               1.000                           
##     v_39               1.017    0.040   25.338    0.000
##     v_14               0.915    0.039   23.377    0.000
##     v_21               0.869    0.049   17.649    0.000
##     v_30               0.825    0.043   19.365    0.000
##   subjNorm =~                                          
##     v_38               1.000                           
##     v_22               1.088    0.045   23.953    0.000
##     v_19               0.917    0.046   19.821    0.000
##     v_35               1.117    0.071   15.822    0.000
##     v_17               0.658    0.083    7.967    0.000
##     v_24               0.758    0.064   11.784    0.000
##     v_27               1.135    0.071   15.902    0.000
##     v_29               1.114    0.070   16.001    0.000
##     v_31               1.147    0.070   16.293    0.000
##     v_33               1.033    0.072   14.444    0.000
##   BehControl =~                                        
##     v_25               1.000                           
##     v_28               1.112    0.044   25.438    0.000
##     v_15               0.791    0.053   15.009    0.000
##   BhC_x_Att =~                                         
##     v_25.v_18          1.000                           
##     v_28.v_39          0.918    0.051   17.864    0.000
##     v_15.v_14          0.746    0.050   14.844    0.000
##   subjNorm_x_Att =~                                    
##     v_38.v_18          1.000                           
##     v_22.v_39          0.863    0.058   14.807    0.000
##     v_19.v_14          0.838    0.056   14.925    0.000
## 
## Regressions:
##                    Estimate  Std.Err  z-value  P(>|z|)
##   intention ~                                         
##     attitude          0.522    0.063    8.271    0.000
##     subjNorm          0.159    0.040    3.945    0.000
##     BehControl        0.441    0.059    7.452    0.000
##     BhC_x_Att         0.072    0.020    3.632    0.000
##     subjNorm_x_Att   -0.092    0.022   -4.118    0.000
## 
## Covariances:
##                    Estimate  Std.Err  z-value  P(>|z|)
##  .v_34 ~~                                             
##    .v_26              0.119    0.036    3.280    0.001
##  .v_13 ~~                                             
##    .v_16              0.141    0.040    3.502    0.000
##  .v_34 ~~                                             
##    .v_16             -0.080    0.026   -3.064    0.002
##  .v_21 ~~                                             
##    .v_30              0.380    0.056    6.804    0.000
##  .v_38 ~~                                             
##    .v_22              1.055    0.103   10.293    0.000
##    .v_19              1.081    0.105   10.260    0.000
##  .v_22 ~~                                             
##    .v_19              0.994    0.105    9.486    0.000
##  .v_19 ~~                                             
##    .v_17              0.406    0.090    4.493    0.000
##  .v_35 ~~                                             
##    .v_24              0.191    0.058    3.317    0.001
##   attitude ~~                                         
##     subjNorm          1.030    0.114    9.060    0.000
##     BehControl        1.317    0.118   11.177    0.000
##     BhC_x_Att         0.003    0.164    0.016    0.987
##     subjNorm_x_Att   -0.001    0.162   -0.007    0.994
##   subjNorm ~~                                         
##     BehControl        0.900    0.107    8.435    0.000
##     BhC_x_Att        -0.146    0.154   -0.947    0.344
##     subjNorm_x_Att   -0.098    0.152   -0.646    0.518
##   BehControl ~~                                       
##     BhC_x_Att         0.000    0.162    0.000    1.000
##     subjNorm_x_Att    0.109    0.160    0.682    0.495
##   BhC_x_Att ~~                                        
##     subjNorm_x_Att    3.267    0.357    9.145    0.000
## 
## Variances:
##                    Estimate  Std.Err  z-value  P(>|z|)
##    .v_34              0.416    0.041   10.083    0.000
##    .v_26              0.586    0.052   11.310    0.000
##    .v_13              0.903    0.069   13.179    0.000
##    .v_16              0.478    0.043   11.226    0.000
##    .v_20              0.421    0.040   10.477    0.000
##    .v_18              0.445    0.042   10.702    0.000
##    .v_39              0.472    0.044   10.784    0.000
##    .v_14              0.524    0.045   11.711    0.000
##    .v_21              1.107    0.085   13.059    0.000
##    .v_30              0.774    0.061   12.776    0.000
##    .v_38              1.537    0.116   13.203    0.000
##    .v_22              1.587    0.121   13.077    0.000
##    .v_19              1.842    0.134   13.705    0.000
##    .v_35              0.735    0.063   11.698    0.000
##    .v_17              3.016    0.217   13.926    0.000
##    .v_24              1.322    0.098   13.422    0.000
##    .v_27              0.732    0.063   11.653    0.000
##    .v_29              0.673    0.058   11.529    0.000
##    .v_31              0.612    0.055   11.096    0.000
##    .v_33              1.096    0.086   12.765    0.000
##    .v_25              0.451    0.046    9.728    0.000
##    .v_28              0.384    0.049    7.848    0.000
##    .v_15              1.279    0.097   13.227    0.000
##    .v_25.v_18         0.501    0.210    2.382    0.017
##    .v_28.v_39         3.145    0.286   10.987    0.000
##    .v_15.v_14         3.849    0.301   12.796    0.000
##    .v_38.v_18         2.264    0.276    8.213    0.000
##    .v_22.v_39         2.782    0.265   10.516    0.000
##    .v_19.v_14         2.510    0.243   10.348    0.000
##    .intention         0.213    0.031    6.778    0.000
##     attitude          1.624    0.146   11.151    0.000
##     subjNorm          1.449    0.186    7.793    0.000
##     BehControl        1.561    0.143   10.927    0.000
##     BhC_x_Att         5.634    0.480   11.740    0.000
##     subjNorm_x_Att    4.889    0.530    9.222    0.000
```

Considering the model fits well, we can proceed with the interpretations.


```r
parTable<-parameterEstimates(fit_SEM,standardized=TRUE)%>%as.data.frame()
table2<-parTable[!parTable$lhs==parTable$rhs,]
table2$sig=ifelse(table2$pvalue<0.001,'***',
                  ifelse(table2$pvalue<0.01,'**',
                      ifelse(table2$pvalue<0.05,'*','')
                      )
                  )
b<-ifelse(table2$pvalue<=0.05,paste0(round(table2$std.all,3), table2$sig),"")
semPlot::semPaths(fit_SEM,rotation=2,structural=FALSE,edgeLabels=b,
                  what='std',shapeLat='ellipse',
                  sizeLat=15,sizeLat2=3,nCharNodes=0)
```

![](5_LaBarbera2020_files/figure-html/unnamed-chunk-11-1.png)<!-- -->
![moderation sem](https://github.com/TomoeGusberti/tomoegusberti.github.io/blob/master/_collections/SEM_Examples/5_LaBarbera2020/LaBarbera2020_mod.png?raw=true)

## Illustration on the moderation effect

The major objectives in moderation study is focused in how the moderator is able (or not) to change the independent variable's effect on the dependent variable, graphically illustrated as a change in the slope.


```r
probe <- semTools::probe2WayMC(fit_SEM, nameX = c("attitude", "BehControl", "BhC_x_Att"), 
                       nameY = "intention", modVar = "BehControl", valProbe = c(-1, 0, 1))

semTools::plotProbe(probe,xlim=c(-1.5,1.5),xlab='attitude',ylab='intention')
```

![](5_LaBarbera2020_files/figure-html/unnamed-chunk-12-1.png)<!-- -->
![interaction](https://github.com/TomoeGusberti/tomoegusberti.github.io/blob/master/_collections/SEM_Examples/5_LaBarbera2020/LaBarbera2020c_mod_interaction.png?raw=true)
