---
title: "Generating Error Maps and Evaluating Attention and Error Maps"
excerpt: "Measuring and improving attention map helpfulness in Visual Question Answering (VQA) with Error Maps."
tags:
  - Analytics
  - Computer Vision
  - Visual Question Answering (VQA)
  - Saliency

submission_details:
  resources: 
    papers:
      - title: Knowing What VQA Does Not- Pointing to Error-Inducing Regions to Improve Explanation Helpfulness
        url: https://arxiv.org/abs/2103.14712
    software:
      - title: Generating Error Maps and Evaluating Attention and Error Maps
        url: https://github.com/arijitray1993/errormap_atteneval
  
  version: 1.0
  size: 1.5GB
  license: https://github.com/arijitray1993/errormap_atteneval/blob/main/LICENSE
   
  authors:
    - Arijit Ray<sup>1</sup>
    - Michael Cogswell<sup>1</sup>
    - Xiao Lin<sup>1</sup>
    - Kamran Alipour<sup>2</sup>
    - Ajay Divakaran<sup>1</sup>
    - Yi Yao<sup>1</sup>
    - Giedrius Buracas<sup>1</sup>
  organizations:
    - 1. SRI International
    - 2. University of California San Diego
  point_of_contact:
    name: Arijit Ray
    email: array@bu.edu
---

## Overview

In this work, we introduce:

* **An automatic attention helpfulness metric**: a proxy metric for users' accuracy in predicting a Visual Question Answering (VQA) model's correctness given the attention map. Comparing to the classical metric of similarity to human attention, our metric better correlates with users' prediction accuracy. This also allows us to bypass the need for multiple expensive and laborious user studies during attention map development.

* **Error Maps**: a novel mode of explanation, that infers the regions that induce error in the output. We demonstrate the effectiveness of error maps, combined with attention maps, in improving helpfulness of explanations from the perspective of assisting users to predict model correctness. User study experiments also show improved prediction accuracy.


## Intended Use

For XAI researchers, our automatic attention map helpfulness metric be a useful indicator on how an attention map would perform in a prediction study, so it can be used for rapid attention map engineering. Our automatic metric may also serve as a starting point to build even more faithful automatic metrics. 

Our joint attention map - error map explanations achieves better prediction accuracy than regular attention maps, so it may help end users build a more accurate mental model of a VQA model.


## Model/Data

Our automatic attention helpfulness metric is designed based on:

* When the model predicts correctly, whether the attention map correctly points to relevance regions. This relevance is measured through similarity to human attention maps. We use human attention maps from the [VQA-HAT dataset](https://computing.ece.vt.edu/~abhshkdz/vqa-hat/) for our study.

* When the model predicts incorrectly, whether the attention map correctly points to error-prone regions -- regions that contribute to predicting the VQA model's correctness. Given a VQA model, we learn a performance prediction model and use [Grad-CAM](http://gradcam.cloudcv.org/) to extract such error-prone regions. 

More details can be found in our [paper](https://arxiv.org/abs/2103.14712).

## Limitations

* Study shows that our automatic attention map helpfulness metric correlates well with user's prediction accuracy so it might facilitate design of better attention maps, but the automatic metric could not replace the user's prediction accuracy which is the gold standard.

* Joint attention map - error map explanations help the user to predict the model's correctness 3% more accurately, increasing accuracy from 57% to 60%. There's plenty of room for higher-quality attention maps to further improve the results.


## References

If you use our code as part of published research, please cite the following paper:

```
@article{ray2021knowing,
  title={Knowing What VQA Does Not: Pointing to Error-Inducing Regions to Improve Explanation Helpfulness},
  author={Ray, Arijit and Cogswell, Michael and Lin, Xiao and Alipour, Kamran and Divakaran, Ajay and Yao, Yi and Burachas, Giedrius},
  journal={arXiv preprint arXiv:2103.14712},
  year={2021}
}
```