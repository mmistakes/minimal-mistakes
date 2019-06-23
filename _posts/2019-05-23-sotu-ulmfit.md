---
title: "Red or Blue? ULMFit using fastai"
date: 2019-05-23
excerpt: "In this analysis, I build on a previous which aimed to discover latent topics present in State of the Union addresses, while here I develop a language model (ULMFit) using fastai. I preprocess the text by breaking each address into sentences, split those into words, remove all punctuation and non-alphanumeric, tag each word with its' part of speech and them lemmatize each word using a word net lemmatizer. I then run Trump's latest SOTU (2019) into this model."
tags: [nlp, fastai, deep-learning, classification, ulmfit]
header:
  overlay_image: /images/deep-learning.png
  overlay_filter: 0.5 # same as adding an opacity of 0.5 to a black background
---


You can find my Google Colab notebook for this analysis [here](https://colab.research.google.com/drive/1JANHqrKxHZZFHFjZCxllukmWeldFbgjR).