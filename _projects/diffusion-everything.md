---
title: "Diffusion Everything"
layout: single
permalink: /projects/diffusion-everything/
---
<p align="center">
  <img src="{{ site.baseurl }}/assets/images/diffusion-everything/banner.png" alt="Centered Image"/>
</p>

Diffusion models are currently the go-to models in the field of Generative AI, be it images or video. This project aims to help users understand the process with three interactive demos. 
1. Diffusion on CIFAR-10: We trained multiple variants of diffusion models and the option to choose from different reverse samplers from the DDPM sampler to the latest DPM2++ sampler. You will find code snippets as well as a simple description of all the reverse samples. 
2. Latent Diffusion with MNIST: In this part, we first train a simple VAE on the MNIST dataset to map the dataset to a 2D distribution. Then we conditionally sample points from the 2D dataset using a diffusion model. 
3. Diffusion on 2D and 3D datasets: To gain an intuitive understanding of the sampling process we can train diffusion models on 2D shapes and custom drawings, then sample thousands of points using the diffusion model to recreate the complete dataset. 

## 1. Diffusion on CIFAR-10 Dataset
In this demo, you can visually see how noise is being added in the forward process of diffusion along with the variation of SNR (Signal to Noise Ratio) and $\bar{\alpha}$ along the time axis. 

![]({{ site.baseurl }}/assets/images/diffusion-everything/image.png)  

After the forward process, we have illustrated the reverse diffusion process, along with a mathematical explanation and a code snippet of the main denoising process. You can choose the reverse sampler of your choice from the dropdown menu. 

![]({{ site.baseurl }}/assets/images/diffusion-everything/image-1.png)

Further, you can click `Generate` to run a complete reverse process from a pre-trained model based on the above hyperparameters. The reverse steps will be shown live along with the estimated noise in the image.  

![]({{ site.baseurl }}/assets/images/diffusion-everything/image-2.png)


## 2. Latent Diffusion Model on MNIST Dataset 

The first step involves training a VAE (Variational Autoencoder) on MNIST to encode it into a 2D distribution, as you can see below while training the latent distribution organizes itself according to the category of the data after several iterations of training. 

![]({{ site.baseurl }}/assets/images/diffusion-everything/image-3.png)

Next, if you apply a 3D kernel density estimation on the given data you can visually see the latent space distribution separated according to category. 

![]({{ site.baseurl }}/assets/images/diffusion-everything/image-4.png)

Next, we will train a diffusion model directly on the latent space created above using VAE.

![]({{ site.baseurl }}/assets/images/diffusion-everything/image-5.png)

After training you can click on generate to see how a random point traverses the latent space to appropriate data distribution along with live VAE decoded {{ site.baseurl }}/assets/images/diffusion-everything/images generated with decreasing timesteps. (The blue path indicates the path traversed by the point)

![]({{ site.baseurl }}/assets/images/diffusion-everything/image-6.png)

## 3. 2D and 3D Diffusion Demonstration

The way we trained a 2D latent distribution and sampled from it, in this demonstration we will generate our 2D data distribution and try to recreate it by sampling multiple times. First generate some 2D dataset from the dropdown list (PS: You can even draw and generate a custom dataset) 

![]({{ site.baseurl }}/assets/images/diffusion-everything/image-7.png)

Then set the diffusion parameters and model hyperparameters accordingly and start training the model, since it's a 2D dataset with a small model, it will train within a few seconds. 

![]({{ site.baseurl }}/assets/images/diffusion-everything/image-9.png)

After training you can click generate and choose how many times you want to sample data and click generate. It also plots the points along with each reverse step so you can see how the distribution is transformed from a normal distribution to a well-defined data distribution. 

![]({{ site.baseurl }}/assets/images/diffusion-everything/image-10.png) 

After generating you can click `Visualise the Drift` to plot the vector fields showing the change in distribution and how these fields change with time. 

![]({{ site.baseurl }}/assets/images/diffusion-everything/image-11.png)
