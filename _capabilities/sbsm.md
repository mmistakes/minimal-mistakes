---
title: "Similarity Based Saliency Maps"
excerpt: "Similarity Based Saliency Maps is a similarity based saliency algorithm that utilizes a standard distance metrics to compute image regions that result in the largest drop in distance between unalterned images and perturbed version of the same images, with the respective region occuled."
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
    data:
      - https://cocodataset.org/#home

  # Optional information describing artifact
  version: 1.0
  size: MB
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
What is the main purpose of the contribution?

SBSM is a saliency algorithm that compares two image descriptors in embedding space to attemt and reason retireval performance
between two reference images. [Explainability for Content-Based Image Retrieval (2018)](https://openaccess.thecvf.com/content_CVPRW_2019/papers/Explainable%20AI/Dong_Explainability_for_Content-Based_Image_Retrieval_CVPRW_2019_paper.pdf)

## Intended Use
What is the intended use case for this contribution? What domains/applications has this contribution been applied to?

When to use SBSM
  * Does'nt need a black-box algorithm
  * To explain image similarity between two images
  * Each image can be represented by a single descriptor
  
## Model/Data
If a model is involved, what are its inputs and outputs? If the model was learned/trained, what data was used for training/testing?
The input to SBSM are two images between whome we need to compute saliency maps based on their distance in embedding space. Additionally the user can fix the resolution of sampling by changing the window size and stride.
## Limitations
Are there any additional limitations/ethical considerations for use of this contribution? Are there known failure modes?
Does not support white-box model explanations and requires saliency computation between two images. Additionally, if the model generating the feature vector does not change, the saliency maps between two images always remains the same.
## References
Any additional information, e.g. papers (cited with bibtex) related to this contribution.
```tex
@inproceedings{dong2019explainability,
  title={Explainability for Content-Based Image Retrieval.},
  author={Dong, Bo and Collins, Roddy and Hoogs, Anthony},
  booktitle={CVPR Workshops},
  pages={95--98},
  year={2019}
}
```