---
title: "Juice"
excerpt: "Juice is a library for learning tractable probabilistic circuits from data, and using the learned models to build solutions in explainable AI, robustness to missing data, algorithmic fairness, compression, etc. "
tags:
  - Analytics
  - Computer Vision
  - Explanation Framework
   
submission_details:
  resources: 
    papers:
      - title: Juice: A Julia Package for Logic and Probabilistic Circuits
        url: http://starai.cs.ucla.edu/papers/DangAAAI21.pdf
      - title: Probabilistic Sufficient Explanations
        url: http://starai.cs.ucla.edu/papers/WangIJCAI21.pdf
      - title: On Tractable Computation of Expected Predictions
        url: http://starai.cs.ucla.edu/papers/KhosraviNeurIPS19.pdf
    software:
      - title: Juice packages
        url: https://github.com/Juice-jl
    demos:
      - title: Demo notebooks
        url: https://github.com/Juice-jl/JuiceExamples
   
  version: 
  size: 
  license: https://github.com/Juice-jl/ProbabilisticCircuits.jl/blob/master/LICENSE
   
  authors:
    - Guy Van den Broeck
    - Students of the UCLA StarAI lab
  organizations:
    - University of California, Los Angeles
  point_of_contact:
    name: Guy Van den Broeck
    email: guyvdb@cs.ucla.edu
---
   
## Overview

These packages provide functionalities for learning and constructing tractable probabilistic circuits and using them to compute various probabilistic queries.

   
## Intended Use

The use case for this library is to learn probabilistic generative models from data that are tractable, that is, they support efficient probabilistic inference of marginal and conditional probabilities, among many other queries.
The library has been used in various applications, for example to provide probabilistic sufficient explanations, which are a form of local explanation that take into account the data distribution. It has also been used for robust machine learning in the presence of missing data at prediction time, and applications in algorithmic fairness, compression, and many more.
   
## Model/Data

For the probabilistic sufficient explanation task, the input is a learned classifier that is to be explained, in the form of a regression circuit, an unlabeled training set, and an instance of classification to be explained.
The output is then a probabilistic circuit learned to fit the training data distribution, and a subset of features that best explains the given instance of classifcation.

## Limitations

Users should always verify that learned distributions are accurate and do not encode undesirable errors and biases.

## References

```
@inproceedings{DangAAAI21,
    title   = {Juice: A Julia Package for Logic and Probabilistic Circuits},
    author = {Dang, Meihua and Khosravi, Pasha and Liang, Yitao and Vergari, Antonio and Van den Broeck, Guy},
    booktitle = {Proceedings of the 35th AAAI Conference on Artificial Intelligence (Demo Track)},
    year    = {2021}
}
```
