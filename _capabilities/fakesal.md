---
title: "FakeSal"
excerpt: "FakeSal is a whitebox saliency algorithm."
tags: 
  - Saliency
  - Computer Vision
  - Analytics
submission_details:
  resources:
    papers:
      - https://arxiv.org/
    software:
      - https://github.com/XAITK/xaitk-saliency

  version: 1.0
  size: 100MB
  license: https://github.com/XAITK/xaitk-saliency/blob/master/LICENSE.txt

  authors:
    - F. A. Keresearcher
    - Invented Co Author
  organizations:
    - Hamburger University
  point_of_contact:
    name: Nitesh Menon
    email: nitesh.menon@kitware.com
---

## Overview

FakeSal is a saliency algorithm that does stuff as reported in [FakeSal: A Fake Saliency Algorithm (2021)](https://arxiv.org/)

To get started using FakeSal, install fake-package
```bash
pip install fake-package
```

To enable FakeSal, adjust the `fake-config.yaml` file as follows:

```yaml
debug-options:
  use-saliency: true
  algorithm: fakesal
```

## Intended Use

When to use FakeSal
  * Don't need a black-box algorithm
  * Runtime performance is important

## Model/Data

The input to FakeSal is a 224x224 raster image, a class label, and a handle to a CNN-based model and the output is a 224x224 full-color heatmap.

## Limitations

As a whitebox model, FakeSal requires knowledge/access to the model we seek to explain. FakeSal is not robust to adversarial perturbations, 
and it has been shown FakeSal can produce extremely similar saliency maps in situations where the final predictions differ.

## References
```tex
@InProceedings{fake_sal_2021,
  author = {Keresearcher, F. A. and Author, Invented and Menon, Nitesh},
  title = {FakeSal: A Fake Saliency Algorithm (2021)},
  booktitle = {arXiv},
  month = {December},
  year = {2021}
}
```