---
title: "Image-Alchemy"
layout: single
permalink: /projects/image_alchemy/
---
![Graph Nets Project Banner]({{ site.baseurl }}/assets/images/research/ImageAlchemy.png)

- Personalizing text-to-image diffusion models like Stable Diffusion XL (SDXL) often leads to issues like catastrophic
forgetting, overfitting, or high computational costs.
- In this project we developed a two-stage pipeline using LoRA-based fine-tuning on SDXLs attention layers, followed by a segmentation-driven Img2Img
approach to insert personalized subjects while preserving the models generative capabilities.

## 1. Generative models
![DeepWalk Diagram]({{ site.baseurl }}/assets/images/understanding_deepwalk.png)
A generative model could generate new photos of animals that look like real animals, while a discriminative model could tell a dog from a cat.
- [Generative models blog](https://medium.com/@AIBites/generative-models-a-gentle-introduction-90e53d262ea1)
- [Variational Autoencoders](https://www.jeremyjordan.me/variational-autoencoders/)

## 2. Diffusion models
![GCN]({{ site.baseurl }}/assets/images/gcn_architecture.png)
A class of generative AI models that create synthetic data, like images, by gradually adding noise to existing data and then learning to reverse this process, reconstructing or generating new data
- [Blog on diffusion models](https://jalammar.github.io/illustrated-stable-diffusion/)
- [Video on stable diffusion](https://www.youtube.com/watch?v=H45lF4sUgiE)
- [Demo notebook of Stable Diffusion-XL(SDXL) model](https://colab.research.google.com/github/woctezuma/stable-diffusion-colab/blob/main/stable_diffusion.ipynb)

## 3. Dreambooth
![SAGE]({{ site.baseurl }}/assets/images/GraphSAGE_cover.jpg)
DreamBooth is a fine-tuning technique that personalizes text-to-image diffusion models using just a few images of a subject.
- [Dreambooth blog](https://dreambooth.github.io/)
- [Paper](https://arxiv.org/abs/2208.12242)
- [Code](https://github.com/huggingface/diffusers/tree/main/examples/dreambooth)
- [Paper-> Inductive Representation Learning on Large Graphs]([https://arxiv.org](https://arxiv.org/abs/1706.02216))

## 4. ChebNet: CNN on Graphs with Fast Localized Spectral Filtering
![ChebNet]({{ site.baseurl }}/assets/images/ChebNet.jpg)
ChebNet is a formulation of CNNs in the context of spectral graph theory.

- [ChebNet Blog](https://dsgiitr.com/blogs/chebnet/)
- [Jupyter Notebook](https://github.com/dsgiitr/graph_nets/blob/master/ChebNet/Chebnet_Blog%2BCode.ipynb)
- [Code](https://github.com/dsgiitr/graph_nets/blob/master/ChebNet/coarsening.py)
- [Paper-> Convolutional Neural Networks on Graphs with Fast Localized Spectral Filtering](https://arxiv.org/abs/1606.09375)

## 5. Understanding Graph Attention Networks
![GAT]({{ site.baseurl }}/assets/images/GAT_Cover.jpg)
GAT is able to attend over their neighborhoods’ features, implicitly specifying different weights to different nodes in a neighborhood, without requiring any kind of costly matrix operation or depending on knowing the graph structure upfront.

- [GAT Blog](https://dsgiitr.com/blogs/gat)
- [Jupyter Notebook](https://github.com/dsgiitr/graph_nets/blob/master/GAT/GAT_Blog%2BCode.ipynb)
- [Code](https://github.com/dsgiitr/graph_nets/blob/master/GAT/GAT_PyG.py)
- [Paper-> Graph Attention Networks](https://arxiv.org/abs/1710.10903)
