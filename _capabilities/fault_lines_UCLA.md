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
      - title: "CoCoX: Generating Conceptual and Counterfactual Explanations via Fault-Lines"
        url: https://ojs.aaai.org/index.php/AAAI/article/view/5643
    software:
      - title: Fault-Line Explainer
        url: https://github.com/arjunakula/faultline_explainer
      - title: CoCoX
        url: https://github.com/arjunakula/CoCoX
   
  # Optional information describing artifact
  version: 1.0
  size: 100MB
   
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
  
## Intended Use
Our framework is helpful for generating conceptual and counterfactual explanations for an image classification model.

The proposed framework is applicable to image analytics domain.
   
## Model/Data
We take a set of input images and extract xconcepts. These xconcepts are then utilized in generating optimal explanations.
   
## References
1. <https://ojs.aaai.org/index.php/AAAI/article/view/5643>
2. <https://vcla.stat.ucla.edu/Projects/ArjunXAI/CoCoX.html>
3. <https://github.com/arjunakula/arjunakula.github.io/blob/master/AAAI2020_poster%20(1).pdf>
4. <https://www.dropbox.com/s/kde88lgv78v8dyj/Arjun_UCLA_Analytics_v2.pptx?dl=0>
