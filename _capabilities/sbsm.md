---
title: "Similarity Based Saliency Maps"
excerpt: "Similarity Based Saliency Maps (SBSM) is a similarity based saliency algorithm that utilizes a standard distance metrics to compute image regions that result in the largest drop in distance between unalterned images and perturbed version of the same images."
tags: # Select from this set
  - Analytics
  - Computer Vision
  - Human-Machine Teaming
  - Saliency
  - Medical

submission_details:
  resources: # List any resources associated with the contribution
    papers:
      - https://openaccess.thecvf.com/content_CVPRW_2019/papers/Explainable%20AI/Dong_Explainability_for_Content-Based_Image_Retrieval_CVPRW_2019_paper.pdf
    software:
      - https://github.com/Kitware/SMQTK/blob/dev/XAI/python/smqtk/algorithms/saliency/sbsm.py
      - https://github.com/Kitware/SMQTK/blob/dev/XAI/python/smqtk/algorithms/saliency/sal_gen.py
    demos:
      - https://drive.google.com/file/d/13iHNyYk-c42ZWy0-RUrzZaq37deqBxU-/view?usp=sharing

  # Optional information describing artifact
  version: 1.0
  size:
  license: https://github.com/Kitware/SMQTK/blob/dev/XAI/LICENSE.txt

  authors:
    - Bo Dong
  organizations:
    - Kitware Inc
  point_of_contact:
    name: Bhavan Vasu
    email: bhavan.vasu@kitware.com
---

## Overview
SBSM is a saliency algorithm that compares two image descriptors in the embedding space to attempt and reason retrieval performance between two reference images. [Explainability for Content-Based Image Retrieval (2019)](https://openaccess.thecvf.com/content_CVPRW_2019/papers/Explainable%20AI/Dong_Explainability_for_Content-Based_Image_Retrieval_CVPRW_2019_paper.pdf)

## Intended Use
When to use SBSM
  * Does not need a black-box algorithm
  * To explain image similarity between two images
  * Each image can be represented by a single descriptor
  
## Model/Data
The input to SBSM are two images between whom we need to compute saliency maps based on their distance in embedding space. Additionally the user can fix the resolution of sampling by changing the window size and stride.

## Limitations
Does not support white-box model explanations and requires saliency computation between two images. Additionally, if the model generating the feature vector does not change, the saliency maps between two images always remains the same.

## References
```tex
@inproceedings{dong2019explainability,
  title={Explainability for Content-Based Image Retrieval.},
  author={Dong, Bo and Collins, Roddy and Hoogs, Anthony},
  booktitle={CVPR Workshops},
  pages={95--98},
  year={2019}
}
```