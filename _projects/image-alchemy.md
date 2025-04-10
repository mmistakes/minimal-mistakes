---
title: "Image-Alchemy"
layout: single
permalink: /projects/image_alchemy/
---
![Image alchemy Banner]({{ site.baseurl }}/assets/images/image alchemy cover photo.png)

- Personalizing text-to-image diffusion models like Stable Diffusion XL (SDXL) often leads to issues like catastrophic
forgetting, overfitting, or high computational costs.
- We propose a pipeline for finetuning diffusion models using low rank adaptation using 3 to 4 images of the subject.
  
## 1. Generative models
![Generative and discriminative models]({{ site.baseurl }}/assets/images/generative.jpg)
A generative model could generate new photos of animals that look like real animals, while a discriminative model could tell a dog from a cat.
- [Generative models blog](https://medium.com/@AIBites/generative-models-a-gentle-introduction-90e53d262ea1)
- [Variational Autoencoders](https://www.jeremyjordan.me/variational-autoencoders/)

## 2. Diffusion models
![GCN]({{ site.baseurl }}/assets/images/diffusion.jpg)
A class of generative AI models that create synthetic data, like images, by gradually adding noise to existing data and then learning to reverse this process, reconstructing or generating new data
- [Blog on diffusion models](https://jalammar.github.io/illustrated-stable-diffusion/)
- [Video on stable diffusion](https://www.youtube.com/watch?v=H45lF4sUgiE)
- [Demo notebook of Stable Diffusion-XL(SDXL) model](https://colab.research.google.com/github/woctezuma/stable-diffusion-colab/blob/main/stable_diffusion.ipynb)

## 3. Dreambooth
![SAGE]({{ site.baseurl }}/assets/images/dreambooth.jpg)
DreamBooth is a fine-tuning technique that personalizes text-to-image diffusion models using just a few images of a subject.
- [Dreambooth blog](https://dreambooth.github.io/)
- [Code](https://github.com/huggingface/diffusers/tree/main/examples/dreambooth)
- [Paper-> Dreambooth](https://arxiv.org/abs/2208.12242)


## 4. Low Rank Adaptation(LoRA)
![ChebNet]({{ site.baseurl }}/assets/images/lora.png)
LoRA is a parameter-efficient fine-tuning method that injects trainable low-rank matrices into a frozen pre-trained model.
- [LoRA Blog](https://medium.com/@tayyibgondal2003/loralow-rank-adaptation-of-large-language-models-33f9d9d48984)
- [Code](https://github.com/microsoft/LoRA)
- [Paper-> Low-Rank adaptation](https://arxiv.org/abs/2106.09685)

## 5. Our pipeline
![GAT]({{ site.baseurl }}/assets/images/research/ImageAlchemy.png)
In this project we developed a two-stage pipeline using LoRA-based fine-tuning on SDXLs attention layers, followed by a segmentation-driven Img2Img
approach to insert personalized subjects while preserving the models generative capabilities.
- [Code](https://github.com/kaustubh202/image-alchemy)
- [Paper-> Image-Alchemy](https://openreview.net/forum?id=wOh5cAM9qC)
