---
title: "SRI-DARE-BraTS explainable brain tumor segmentation"
excerpt: "An interactive interface and APIs for segmenting brain tumors from fMRI scans and life expectancy prediction with deep attentional explanations and counterfactual explanations."
tags:
  - Analytics
  - Computer Vision
  - Saliency
  - Medical

submission_details:
  resources:
    software:
      - title: Explainable brain tumor segmentation
        url: https://github.com/mcogswellsri/dare_brain_demo
   
  version: 1.0
  size: 2.5GB
  license: https://github.com/mcogswellsri/dare_brain_demo/blob/main/LICENSE
   
  authors:
    - Michael Cogswell<sup>1</sup>
    - Isaac Nealey<sup>2</sup>
    - Kamran Alipour<sup>2</sup>
    - Yi Yao<sup>1</sup>
    - Jurgen Schulze<sup>2</sup>
    - Giedrius Buracas<sup>1</sup>>
  organizations:
    - 1. SRI International
    - 2. University of California San Diego
  point_of_contact:
    name: Michael Cogswell
    email: michael.cogswell@sri.com
---

## Overview

In treating gliomas, a type of brain cancer, radiologists need to localize tumor tissue extent in magnetic resonance images. This is laborious and potentially marred with uncertainties as even amongst expert neuro-radiologist there may be disagreement about the exact glioma parameters. Automatic brain tumor segmentation in MR images aims to facilitate this process. Glioma segmentation accuracy has improved greatly in recent years, but failures still may occur. We aim to help radiologists better understand these failures so they can more effectively use automatic segmentation approaches.

This demo builds on prior work that has shown attentional and counterfactual explanations help users understand machine learning models. It implements an interface, which allows users to learn about segmentation models through interaction. We apply the ideas of attentional and counterfactual explanations by allowing users to ask questions like "Which regions of the brain were you looking at?" and "How would the model behave in certain similar but different cases?" Specifically, we use heatmaps from GradCAM to answer the first question and counterfactual segmentations generated from inpainted version of original brain images to answer the second question. 
   
## Intended Use

For radiologists, our system may help establish a general understanding of where failures tend to occur when using an automatic brain tumor segmentation tool. 

For XAI researchers, our system provides a testbed for developing better attentional explanation approaches for brain tumor segmentation.
   
## Model/Data

The backend brain tumor segmentation model takes as input fMRI slices from multiple sensing modalities (T1/T2/Flair) and produces a tumor segmentation as the output. The model adopts a [U-Net](https://lmb.informatik.uni-freiburg.de/people/ronneber/u-net/) architecture and was trained using the [BraTS dataset](http://braintumorsegmentation.org/). [GradCAM](http://gradcam.cloudcv.org/) visualizations from intermediate layers with respect to the input images are used for explanation.

For more details please check our [README.md](https://github.com/mcogswellsri/dare_brain_demo).

   
## Limitations

* Our GradCAM-based explanations provide some insights about which regions are important for the model's decision, but may not be optimal for helping users build accurate mental models. Parallel techniques such as [Error Maps](https://arxiv.org/abs/2103.14712) may be incorporated to fulfill such purpose.

* Our model operates on individual 2D slices with different z-height. This may lead to non-continuity across slices. A 3D brain tumor segmentation model can be used instead as the backend model.

## References


If you use our code as part of published research, please acknowledge the following repo:

```
@misc{DARE-BRATS-DEMO,
author = {Michael Cogswell, Isaac Nealey, Kamran Alipour, Yi Yao, Jurgen Schulze, Giedrius Buracas},
title = {Explainable brain tumor segmentation},
year = {2021},
publisher = {GitHub},
journal = {GitHub repository},
howpublished = {\url{https://github.com/mcogswellsri/dare_brain_demo}},
}
```
