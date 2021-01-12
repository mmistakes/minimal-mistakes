---
layout: single
author_profile: true
classes: wide
title : "Process of training to classify the facies label using ML"
categories: "Project"

---

### 1. Preprocessing

#### **- Feature Augmentation**

##### Mostly used : **Feature Window, Spatial Gradient**   (from 'ISPL team')

##### "polynomial features" to augment the features.


#### **- Outlier Removal**

##### Z-score, MAD(modified Z-score)
if the data's Z-score is more than threshold, regarded as outlier, and remove it.
(only 'PA team' used)


#### **- Handling Missing data**

##### **PE imputation**

- NaN to 0 or mean value
- make_pipeline(... , ...)
- MLP Regressor
- PCA, TPOT

### 2. Train Model

Usually Scaling process is contained.
- Deep Neural Network
- SVM
- Random Forest ```RandomForestClassifier```
- **Gradient Boosting** ```GradientBoostingClassifier```
- AdaBoost ```AdaBoostClassifier```
- **XGBoost** ```XGBClassifier```

To tune parameters, GridSearch is mostly used. (```GridSearchCV``` or test one by one)<br>
(CrossValidation to validate the model is used only by 'LA team'.)

### 3. Apply to Testdata

##### **Scoring**

- Deterministic score : F1 score of the result when applying the model to test well.
- Stochastic score : mean value of F1 scores when 100 random_seed is given.


