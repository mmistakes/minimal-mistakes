---
title: "Hot dog or not hot dog? Deep Learning Solution for Image Classification"
date: 2019-03-28
excerpt: "Here I address the simple (or so it seems) question: given an image does it contain a hot dog? The main problem is the lack of training data (images), we augment our data, and then use a 2d convolutional neural network to make our predictions; the optimization algorithm and related hyper-parameters are critical so I discuss those as well."
tags: [cnn, data-augmentation, opencv, deep-learning, classification]
header:
  overlay_image: /images/hot-dog.jpeg
  overlay_filter: 0.5 # same as adding an opacity of 0.5 to a black background
---

<!-- <iframe width="420" height="315" src="https://www.youtube.com/watch?v=ACmydtFDTGs?autoplay=1"></iframe> -->


You can find my Jupyter notebook for this analysis [here](https://github.com/mkm29/DataScience/blob/master/thinkful/unit/4/4/4.4.5%20Challenge%20-%20Build%20your%20own%20model.ipynb).