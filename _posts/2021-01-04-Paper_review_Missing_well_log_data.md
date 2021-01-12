---
layout: single
title : "Paper review : Accurate and Convenient Missing Well Log Synthesis Using Generative Model"
author_profile: true
classes: wide
categories: "Paper"
---

#### Minsu Kwon(ENERZAi) et al., Abu Dhabi International Petroleum Exhibition & Conference, 9-12 November, Abu Dhabi, UAE
<https://www.onepetro.org/conference-paper/SPE-202918-MS>

### Abstract
> In the oil and gas exploration, well logs, the most convenient and economic data source, usually contain missing values due to various reasons. It is crucial to generate accurate synthetic logs for such missing intervals in terms of precise well log interpretation. In this paper, we propose a workflow of generating synthetic logs using cutting-edge machine learning techniques. Unlike existing methods, we exploit a generative model, which can deal with various missing patterns with a single model, and we combine it with a supervised model. With well log data of various regions, we show that our models accurately generate missing logs and outperforms existing supervised-only models. It is expected that our model is beneficial in the real field because of its performance and simplicity.


### Summary
* To generate the missing values of well log effectively, the ensemble model which is combined supervised model with generative model is adopted.

* Supervised method is adopted for the depth points with only one missing sensor. On the other hand, depth points with more than two missing sensors are handled by a variational auto-encoder-based generative model.

* Fine-tuning is a technique to adjust an already-trained neural network to the new target data. Such fine-tuning model is effective only when there is only on well in the target field, or wildcat well.

### Future direction
* Expand the target log set beyond the current set: GR, ILD, NPHI, RHOB, DT, DTS, PE, SP.

* Categorical information such as lithology for each depth point can be used in the future. 

* Perform more intensive experiments on the fields out of the Netherlands, Canada, Norway, and Australia where the data used in this paper is from.

* The meta-learning methods may be applied when the performance has no more improvement as the model is pre-trained with other field data and fine-tuned with target field data. It is designed to transfer the knowledge between different datasets of the same domain. It would be powerful if the knowledge from well log of a field is successfully utilized for modeling well logs of another field.