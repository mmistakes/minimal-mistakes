<div align="center">

<img src="docs/source/images/logos/anomalib-wide-blue.png" width="600px">

**A library for benchmarking, developing and deploying deep learning anomaly detection algorithms**
___

[Key Features](#key-features) •
[Getting Started](#getting-started) •
[Docs](https://openvinotoolkit.github.io/anomalib) •
[License](https://github.com/openvinotoolkit/anomalib/blob/development/LICENSE)

[![python](https://img.shields.io/badge/python-3.7%2B-green)]()
[![pytorch](https://img.shields.io/badge/pytorch-1.8.1%2B-orange)]()
[![openvino](https://img.shields.io/badge/openvino-2021.4.2-purple)]()
[![black](https://img.shields.io/badge/code%20style-black-000000.svg)]()
[![Nightly-regression Test](https://github.com/openvinotoolkit/anomalib/actions/workflows/nightly.yml/badge.svg)](https://github.com/openvinotoolkit/anomalib/actions/workflows/nightly.yml)
[![Pre-merge Checks](https://github.com/openvinotoolkit/anomalib/actions/workflows/pre_merge.yml/badge.svg)](https://github.com/openvinotoolkit/anomalib/actions/workflows/pre_merge.yml)
[![Build Docs](https://github.com/openvinotoolkit/anomalib/actions/workflows/docs.yml/badge.svg)](https://github.com/openvinotoolkit/anomalib/actions/workflows/docs.yml)

</div>

___

## Introduction

Anomalib is a deep learning library that aims to collect state-of-the-art anomaly detection algorithms for benchmarking on both public and private datasets. Anomalib provides several ready-to-use implementations of anomaly detection algorithms described in the recent literature, as well as a set of tools that facilitate the development and implementation of custom models. The library has a strong focus on image-based anomaly detection, where the goal of the algorithm is to identify anomalous images, or anomalous pixel regions within images in a dataset. Anomalib is constantly updated with new algorithms and training/inference extensions, so keep checking!

![Sample Image](./docs/source/images/readme.png)

**Key features:**

- The largest public collection of ready-to-use deep learning anomaly detection algorithms and benchmark datasets.
- [**PyTorch Lightning**](https://www.pytorchlightning.ai/) based model implementations to reduce boilerplate code and limit the implementation efforts to the bare essentials.
- All models can be exported to [**OpenVINO**](https://www.intel.com/content/www/us/en/developer/tools/openvino-toolkit/overview.html) Intermediate Representation (IR) for accelerated inference on intel hardware.
- A set of [inference tools](#inference) for quick and easy deployment of the standard or custom anomaly detection models.

___

## Getting Started

To get an overview of all the devices where `anomalib` as been tested thoroughly, look at the [Supported Hardware](https://openvinotoolkit.github.io/anomalib/#supported-hardware) section in the documentation.


### Local Install
It is highly recommended to use virtual environment when installing anomalib. For instance, with [anaconda](https://www.anaconda.com/products/individual), `anomalib` could be installed as,

```bash
yes | conda create -n anomalib_env python=3.8
conda activate anomalib_env
git clone https://github.com/Munggoose/bolt-anomaly-detection.git
cd bolt-anomaly-detection
pip install -e .
```

## Training

By default [`python tools/train.py`](https://gitlab-icv.inn.intel.com/algo_rnd_team/anomaly/-/blob/development/train.py)
runs [PADIM](https://arxiv.org/abs/2011.08785) model on `leather` category from the [MVTec AD](https://www.mvtec.com/company/research/datasets/mvtec-ad) [(CC BY-NC-SA 4.0)](https://creativecommons.org/licenses/by-nc-sa/4.0/)  dataset.

```bash
python tools/train.py    # Train PADIM on MVTec AD leather
```

Training a model on a specific dataset and category requires further configuration. Each model has its own configuration
file, [`config.yaml`](https://gitlab-icv.inn.intel.com/algo_rnd_team/anomaly/-/blob/development/padim/anomalib/models/padim/config.yaml)
, which contains data, model and training configurable parameters. To train a specific model on a specific dataset and
category, the config file is to be provided:

```bash
python tools/train.py --config <path/to/model/config.yaml>
```

For example, to train [PADIM](anomalib/models/padim) you can use

```bash
python tools/train.py --config anomalib/models/padim/config.yaml
```

Note that `--model_config_path` will be deprecated in `v0.2.8` and removed
in `v0.2.9`.

Alternatively, a model name could also be provided as an argument, where the scripts automatically finds the corresponding config file.

```bash
python tools/train.py --model padim
```

where the currently available models are:

- [CFlow](anomalib/models/cflow)
- [PatchCore](anomalib/models/patchcore)
- [PADIM](anomalib/models/padim)
- [STFPM](anomalib/models/stfpm)
- [DFM](anomalib/models/dfm)
- [DFKDE](anomalib/models/dfkde)
- [GANomaly](anomalib/models/ganomaly)

### Custom Dataset
It is also possible to train on a custom folder dataset. To do so, `data` section in `config.yaml` is to be modified as follows:
```yaml
dataset:
  name: <name-of-the-dataset>
  format: folder
  path: <path/to/folder/dataset>
  normal: normal # name of the folder containing normal images.
  abnormal: abnormal # name of the folder containing abnormal images.
  task: segmentation # classification or segmentation
  mask: <path/to/mask/annotations> #optional
  extensions: null
  split_ratio: 0.2  # ratio of the normal images that will be used to create a test split
  seed: 0
  image_size: 256
  train_batch_size: 32
  test_batch_size: 32
  num_workers: 8
  transform_config: null
  create_validation_set: true
  tiling:
    apply: false
    tile_size: null
    stride: null
    remove_border_count: 0
    use_random_tiling: False
    random_tile_count: 16
```
## Inference

Anomalib contains several tools that can be used to perform inference with a trained model. The script in [`tools/inference`](tools/inference.py) contains an example of how the inference tools can be used to generate a prediction for an input image.

If the specified weight path points to a PyTorch Lightning checkpoint file (`.ckpt`), inference will run in PyTorch. If the path points to an ONNX graph (`.onnx`) or OpenVINO IR (`.bin` or `.xml`), inference will run in OpenVINO.

The following command can be used to run inference from the command line:

```bash
python tools/inference.py \
    --config <path/to/model/config.yaml> \
    --weight_path <path/to/weight/file> \
    --image_path <path/to/image>
```

As a quick example:

```bash
python tools/inference.py \
    --config anomalib/models/padim/config.yaml \
    --weight_path results/padim/mvtec/bottle/weights/model.ckpt \
    --image_path datasets/MVTec/bottle/test/broken_large/000.png
```

If you want to run OpenVINO model, ensure that `openvino` `apply` is set to `True` in the respective model `config.yaml`.

```yaml
optimization:
  openvino:
    apply: true
```

Example OpenVINO Inference:

```bash
python tools/inference.py \
    --config  \
    anomalib/models/padim/config.yaml  \
    --weight_path  \
    results/padim/mvtec/bottle/compressed/compressed_model.xml  \
    --image_path  \
    datasets/MVTec/bottle/test/broken_large/000.png  \
    --meta_data  \
    results/padim/mvtec/bottle/compressed/meta_data.json
```

> Ensure that you provide path to `meta_data.json` if you want the normalization to be applied correctly.

___

## Datasets
`anomalib` supports MVTec AD [(CC BY-NC-SA 4.0)](https://creativecommons.org/licenses/by-nc-sa/4.0/) and BeanTech [(CC-BY-SA)](https://creativecommons.org/licenses/by-sa/4.0/legalcode) for benchmarking and `folder` for custom dataset training/inference.

### [MVTec AD Dataset](https://www.mvtec.com/company/research/datasets/mvtec-ad)
MVTec AD dataset is one of the main benchmarks for anomaly detection, and is released under the
Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License [(CC BY-NC-SA 4.0)](https://creativecommons.org/licenses/by-nc-sa/4.0/).

