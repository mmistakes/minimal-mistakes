---
title: "The Counterfactual Visual Question Answering (VQA) Dataset"
excerpt: "Human curated counterfactual edits on VQA images for studying effective ways to produce counterfactual explanations."
tags:
  - Analytics
  - Computer Vision
  - Visual Question Answering (VQA)

submission_details:
  resources: 
    papers:
      - title: Improving Users' Mental Model with Attention-directed Counterfactual Edits
        url: https://www.authorea.com/users/422041/articles/527829-improving-users-mental-model-with-attention-directed-counterfactual-edits
    data:
      - title: The Counterfactual VQA Dataset
        url: https://frkl.github.io/Counterfactual-VQA-Images/
  
  version: 1.0
  size: 296MB
  license: https://creativecommons.org/licenses/by/4.0/
   
  authors:
    - Xiao Lin<sup>1</sup>
    - Kamran Alipour<sup>2</sup>
    - Arijit Ray<sup>1</sup>
    - Michael Cogswell<sup>1</sup>
    - Jurgen Schulze<sup>2</sup>
    - Yi Yao<sup>1</sup>
    - Giedrius Buracas<sup>1</sup>
  organizations:
    - 1. SRI International
    - 2. University of California San Diego
  point_of_contact:
    name: Xiao Lin
    email: xiao.lin@sri.com
---

   
## Overview

The Counterfactual VQA Dataset aims to enable the study of effective ways to produce counterfactual explanations: contrasting a VQA model's answers to original VQA example with the answers to counterfactual examples. Our dataset provides 484 GAN edited [VQA v2.0](https://visualqa.org/) images for studing the effectiveness of counterfactual examples. For each image, a human annotator looks at the original image and a natural language question about the image from the Visual Question Answering (VQA) dataset, and edit the image such that consistently answering the question on the original and edited images is challenging.

## Intended Use

For XAI researchers, the counterfactual VQA Dataset provides a diverse set of counterfactual examples for studying how to generate such counterfactual examples for counterfactual explanations, such as which types of edits (e.g. color change, cropping, object removal) are more effective, ways of improving explanation effectiveness (e.g. removing salient objects, removing small but highly importance regions), and how human annotators perform counterfactual edits.

## Model/Data

The Counterfactual VQA Dataset provides 484 GAN edited [VQA v2.0](https://visualqa.org/) images. There are 4 types of image edits: 1) Inpaint a box region, 2) Inpaint the background except a box foreground, 3) Turning the image black-and-white, 4) Zooming into a part of the original image.

For inpainting we used a modified [DeepFillv2](http://arxiv.org/abs/1806.03589) inpainter, code available at this [github repo](https://github.com/zzzace2000/generative_inpainting).


## Limitations

Human answers to counterfactual questions are not collected, because how such counterfactual examples should be produced in the first place is still under active research. As a result, the Counterfactual VQA Dataset could not be used for consistency training of VQA models. 

## References

If you use the Counterfactual VQA Dataset as part of published research, please cite the following paper:

```
@article{Alipour_2021,
	doi = {10.22541/au.162464875.59047443/v1},
	url = {https://doi.org/10.22541%2Fau.162464875.59047443%2Fv1},
	year = 2021,
	month = {jun},
	publisher = {Authorea,
Inc.},
	author = {Kamran Alipour and Arijit Ray and Xiao Lin and Michael Cogswell and Jurgen Schulze and Yi Yao and Giedrius Burachas},
	title = {Improving Users{\textquotesingle} Mental Model with Attention-directed Counterfactual Edits}
}
```