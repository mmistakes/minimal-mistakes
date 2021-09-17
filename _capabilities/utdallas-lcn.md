---
title: "Learning Tractable Interpretable Cutset Networks"
excerpt: "This library helps the user learn tractable, interpretable cutset networks (a type of probabilistic model which combines decision trees and tree Bayesian networks) from data. The learned networks can be used to answer various decision and explanation queries such as most probable explanation and estimating posterior marginal probability."
tags: # Select from this set
  - Analytics
  - Human-Machine Teaming
  - Explanation Framework
   
submission_details:
  resources: # List any resources associated with the contribution. Not all sections are required
    papers:
      - title: "Look Ma, No Latent Variables: Accurate Cutset Networks via Compilation" 
        url: https://proceedings.mlr.press/v97/rahman19a.html
      - title: "Cutset Bayesian Networks: A New Representation for Learning Rao-Blackwellised Graphical Models"
        url:  https://doi.org/10.24963/ijcai.2019/797
    software:
      - title: Cutset networks package
        url: https://github.com/vibhavg1/CNxD
   
  # Optional information describing artifact. Leave blank if unused
  version: 1.0
  size: 
  license: https://opensource.org/licenses/MIT
   
  authors:
    - Tahrima Rahman
    - Shasha Jin
    - Vibhav Gogate
  organizations:
    - The University of Texas at Dallas
  point_of_contact:
    name: Vibhav Gogate
    email: vibhav.gogate@utdallas.edu
---
## Overview
Cutset networks are tractable, interpretable models which combine and enhance the capabilities of two interpretable models: (a) probabilistic decision trees (called OR trees in literature) and (b) tree Bayesian networks. An issue with these models is that although they are interpretable and can explain their decisions via fast, accurate most probable explanation inference, their accuracy is often quite low as compared to uninterpretable models such as Markov networks, deep Bayesian networks and neural networks. This tool helps the user learn interpretable cutset networks having high accuracy and perform fast most probable explanation inference over them using an innovative technique that combines the estimates derived from the provided data with the ones derived from a more accurate uninterpretable model.


## Intended Use
The use case for this library is to learn tractable, interpretable probabilistic generative models that can accurately and quickly answer various explanation queries such as the most probable explanation query for observations and decisions. The library has been used in many applications such as solving the task of performing explainable activity recognition in video data.

## Model/Data
The library learns a probabilistic model from data. The data can be provided in matrix form where rows are examples and columns are features. Once the model is learned, the library can be used to make decisions and generate most probable explanations by invoking its query answering capability.


## Limitations
Only works with discrete features. The next version of the library will include support for continuous features.



## References

```
@InProceedings{pmlr-v97-rahman19a,
	title = 	 {Look Ma, No Latent Variables: Accurate Cutset Networks via Compilation},
	author =         {Rahman, Tahrima and Jin, Shasha and Gogate, Vibhav},
	booktitle = 	 {Proceedings of the 36th International Conference on Machine Learning},
	pages = 	 {5311--5320},
	year = 	         {2019},
	editor = 	 {Chaudhuri, Kamalika and Salakhutdinov, Ruslan},
	volume = 	 {97},
	series = 	 {Proceedings of Machine Learning Research},
	month = 	 {09--15 Jun},
	publisher =      {PMLR}
}
```
