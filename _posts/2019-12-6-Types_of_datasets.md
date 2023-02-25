---
layout: single
title: Training, Validation and Test Datasets
author-id: Chingis Maksimov
tags: [dataset, data science]
classes: wide
---

According to different sources, it is advisable that the data that is used to build a model be split into 3 datasets: training, validation and test. This is ever more important for higher capacity models that have multiple hyperparameters to tune and tend to overfit. However, to someone new to the field of data science, this split may not make a lot of sense initially. Thus, below we are going to describe the role of each of the datasets.

Training dataset is usually the most populous containing about 60-70% of the available data, but this may vary depending on the problem and data structure on hand. As the name implies, training dataset in used to train a model. Also, all kinds of data investigations should be done on the training dataset. For example, if one builds a binary classification problem, the dependencies between the explanatory variables and the target variable should be tested on the training dataset. Similarly, the decisions to keep or drop any given subset of variables also depends on the investigations done on the training dataset. However, if one uses a high capacity model, like a neural network or a random forest, that requires choosing huperparameters, one should not use the training dataset as it will further lead to overfitting: choosing hyperparameters on the training dataset will lead to choices of hyperparameters that will perform best on the training dataset. For that reason, we require another dataset - validation dataset.

Validation dataset usually consists of 15-20% of the available data. The main purpose of this dataset is to test the optimal hyperparameters for your model of choice and identifying when to stop model training. For example, if one is using a decision tree model, a choice should be made about the optimal size of the tree and the stopping rule. Furthermore, by tracking the performance of the model on the training and validation datasets through training epochs, an analyst can identify the point at which to stop model training. This is the point at which the error rate on the validation set is the lowest and starts to increase in subsequent training iterations. Once the model has been built, we can assess its expected performance on the dataset the model has not been exposed to, the test dataset.

Test dataset usually contains about the same number of observations as validation dataset. Ideally, this dataset should not contain any observations to which the model has been exposed during training. In other words, the performance on the test set is the best estimate of how the model is expected to perform in the real-world applications. Furthermore, all kinds of backtesting tests can be done on the test set to check the performance and statistical validity of the model.
