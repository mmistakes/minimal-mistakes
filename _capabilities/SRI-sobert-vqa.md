---
title: "Explainable VQA with SOBERT"
excerpt: "Demo several capabilities of the Spatial-Object Attention BERT (SOBERT) Visual Question Answering (VQA) model with BERT and ErrorCam attention maps."
tags: 
  - Analytics
  - Computer Vision
  - Visual Question Answering (VQA)
  - Saliency
  - Explanation Framework
   
submission_details:
  resources: 
    papers:
      - title: The Impact of Explanations on AI Competency Prediction in VQA
        url: https://arxiv.org/abs/2007.00900
    software:
      - title: Explainable VQA with SOBERT
        url: https://github.com/frkl/SOBERT-XVQA-demo
  
  version: 1.0
  size: 6.5GB
  license: https://github.com/frkl/SOBERT-XVQA-demo/blob/main/LICENSE
   
  authors:
    - Xiao Lin<sup>1</sup>
    - Kamran Alipour<sup>2</sup>
    - Sangwoo Cho<sup>3</sup>
    - Arijit Ray<sup>1</sup>
    - Jurgen P. Schulze<sup>2</sup>
    - Yi Yao<sup>1</sup>
    - Giedrius Buracas<sup>1</sup>
  organizations:
    - 1. SRI International
    - 2. University of California San Diego
    - 3. University of Central Florida
  point_of_contact:
    name: Xiao Lin
    email: xiao.lin@sri.com
---

## Overview

This repository provides a web interface to interact with the SOBERT VQA model which has the following features:
- Answers natural language questions about images
- Built on top of Transformer & image inpainting methods
- Explanation modalities
  - Image attention
  - Object attention
  - [ErrorCam attention](https://arxiv.org/abs/2103.14712)
- Interactive counterfactual explanations

To get started, follow steps in the [README](https://github.com/frkl/SOBERT-XVQA-demo/blob/main/README.md) to build and run a docker environment for the web interface.

## Intended Use

The SOBERT VQA model not only answers VQA questions, but also provides interactive counterfactual attention map explanations to help the user better understand how much they should trust the VQA system.

## Model/Data

The SOBERT VQA model takes an image (RGB, normalized and resized to 224x224) and a natural language question (string) as the input, and returns a natural language answer as the output (string, selected from a pool of 3129 common answers). A detailed list of interfaces for developers is provided in the README file of the repository.

The [VQA v2.0 dataset](https://visualqa.org/) train split was used for training the SOBERT VQA model.

## Limitations

The SOBERT VQA model achieves 62% accuracy on the VQA v2.0 validation split. The VQA accuracy could improve with further research. In [our user study](https://arxiv.org/abs/2103.14712), ErrorCam attention helps the user to predict the model's correctness on a new image 3% more accurately, increasing accuracy from 57% to 60%. Higher-quality attention maps may further improve results and help the user build a better mental model when using our system.

## References

If you use the SOBERT-VQA attention maps as part of published research, please cite the following paper:

```
@INPROCEEDINGS{Alipour_2020,
  author={Alipour, Kamran and Ray, Arijit and Lin, Xiao and Schulze, Jurgen P. and Yao, Yi and Burachas, Giedrius T.},
  booktitle={2020 IEEE International Conference on Humanized Computing and Communication with Artificial Intelligence (HCCAI)}, 
  title={The Impact of Explanations on AI Competency Prediction in VQA}, 
  year={2020},
  volume={},
  number={},
  pages={25-32},
  doi={10.1109/HCCAI49649.2020.00010}}
```

If you use the SOBERT-VQA model as part of published research, please acknowledge the following repo:

```
@misc{SOBERT-XVQA,
author = {Xiao Lin, Sangwoo Cho, Kamran Alipour, Arijit Ray, Jurgen P. Schulze, Yi Yao and Giedrius Buracas},
title = {SOBERT-XVQA: Spatial-Object Attention BERT Visual Question Answering model},
year = {2021},
publisher = {GitHub},
journal = {GitHub repository},
howpublished = {\url{https://github.com/frkl/SOBERT-XVQA-demo}},
}
```

If you use ErrorCam attention maps as part of published research, please cite the following paper:

```
@article{ray2021knowing,
  title={Knowing What VQA Does Not: Pointing to Error-Inducing Regions to Improve Explanation Helpfulness},
  author={Ray, Arijit and Cogswell, Michael and Lin, Xiao and Alipour, Kamran and Divakaran, Ajay and Yao, Yi and Burachas, Giedrius},
  journal={arXiv preprint arXiv:2103.14712},
  year={2021}
}
```
