---
title: Integrated-Gradient Optimized Saliency Maps (iGOS++/I-GOS)
excerpt: "Integrated gradient-based saliency maps for multi-resolution explanation of deep networks."
tags:
  - Computer Vision
  - Saliency
  - Explanation Framework
submission_details:
  resources:
    papers:
      - title: Visualizing Deep Networks by Optimizing with Integrated Gradients
        url: https://ojs.aaai.org//index.php/AAAI/article/view/6863
      - title: "iGOS++: Integrated Gradient Optimized Saliency by Bilateral Perturbations"
        url: https://dl.acm.org/doi/pdf/10.1145/3450439.3451865
    software:
      - title: Integrated-Gradient Optimized Saliency Maps (iGOS++/I-GOS)
        url: https://github.com/khorrams/IGOS_pp
    demos:
      - title: I-GOS Demo
        url: https://igos.eecs.oregonstate.edu/
    data:
      - title: ImageNet
        url: https://image-net.org/

  version:
  size:
  license: GPL-3.0 License

  authors:
    - Saeed Khorram<sup>1</sup>
    - Tyler Lawson<sup>1</sup>
    - Zhongang Qi<sup>2</sup>
    - Fuxin Li<sup>1</sup>
  organizations:
    - 1. School of Electrical Engineering and Computer Science, Oregon State University
    - 2. Applied Research Center, PCG, Tencent
  point_of_contact:
    name: Saeed Khorram
    email: khorrams@oregonstate.edu
---
   
## Overview
iGOS++ and I-GOS are perturbation-based attribution maps that utilize integrated gradients. 
For a quick start on the code, please refer to the [official GitHub repository](https://github.com/khorrams/IGOS_pp).
   
## Intended Use
iGOS++ assumes a black-box model for generating saliency maps and can generate
explanations at arbitrary resolutions -- low resolution masks generate a coarse
explanation while high-resolution masks provide a fine-grained explanation over 
the input space. We believe iGOS++ can provide informative explanations to a wide
range of users when a black-box classifier is available. This includes subject matter 
experts who want to utilize XAI to find some interesting features from deep networks, 
developers who want to debug their black-box model to unveil errors in their data, etc.
As an example, we showcase the capabilities of iGOS++ in debugging a COVID-19 classifier on chest X-ray images.
   
## Model/Data
In our experiments, commonly-used ImageNet classifiers such as [VGG-19](https://arxiv.org/abs/1409.1556)
and [ResNet-50](https://arxiv.org/abs/1512.03385) are used. For the COVID-19 experiment on chest X-ray images,
[COVID-Net](https://github.com/lindawangg/COVID-Net) has been used.
   
## Limitations
Since our method integrates the gradient on the path from the original image to a baseline, 
we have noticed our method does not work well when the model's prediction confidence 
is very low or when the classifier makes a wrong prediction.

## References
```
@inproceedings{qi2020visualizing,
  title={Visualizing Deep Networks by Optimizing with Integrated Gradients},
  author={Qi, Zhongang and Khorram, Saeed and Fuxin, Li},
  booktitle={Proceedings of the AAAI Conference on Artificial Intelligence},
  volume={34},
  number={07},
  pages={11890--11898},
  year={2020}
}
```

```
@inproceedings{khorram2021igos++,
author = {Khorram, Saeed and Lawson, Tyler and Fuxin, Li},
title = {IGOS++: Integrated Gradient Optimized Saliency by Bilateral Perturbations},
year = {2021},
isbn = {9781450383592},
publisher = {Association for Computing Machinery},
address = {New York, NY, USA},
url = {https://doi.org/10.1145/3450439.3451865},
doi = {10.1145/3450439.3451865},
booktitle = {Proceedings of the Conference on Health, Inference, and Learning},
pages = {174–182},
keywords = {COVID-19, chest X-ray, saliency methods, medical imaging, integrated-gradient, explainable AI},
series = {CHIL '21}
}
```