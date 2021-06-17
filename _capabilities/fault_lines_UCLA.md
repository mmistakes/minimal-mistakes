---
title: "Fault-Line Image Explanations"
excerpt: "Algorithm for generating conceptual and counterfactual explanations for an image classification model."
tags:
  - Analytics
  - Computer Vision
  - Saliency
  - Explanation Framework
   
submission_details:
  resources: 
    papers:
      - https://ojs.aaai.org/index.php/AAAI/article/view/5643
    software:
      - https://github.com/arjunakula/faultline_explainer
      - https://github.com/arjunakula/CoCoX
   
  # Optional information describing artifact
  version: 1.0
  size: 100MB
  license: NA
   
  authors:
    - Arjun Akula
    - Song-Chun Zhu
  organizations:
    - UCLA
  point_of_contact:
    name: Arjun Akula
    email: aakula@ucla.edu
---
   
## Overview
We propose this new explanation framework to identify the minimal semantic-level features (e.g. stripes on zebra, pointed ears on dog) referred to as the explainable concept, that can be added/deleted to alter the classification category.
Please see a demo of this work using the following links: 

1) https://github.com/arjunakula/arjunakula.github.io/blob/master/AAAI2020_poster%20(1).pdf

2) https://www.dropbox.com/s/kde88lgv78v8dyj/Arjun_UCLA_Analytics_v2.pptx?dl=0
  
## Intended Use
Our framework is helpful for generating conceptual and counterfactual explanations for an image classification model.

The proposed framework is applicable to image analytics domain.
   
## Model/Data
We take a set of input images and extract xconcepts. These xconcepts are then utilized in generating optimal explanations.
   
## References
1) https://ojs.aaai.org/index.php/AAAI/article/view/5643
2) https://vcla.stat.ucla.edu/Projects/ArjunXAI/CoCoX.html
