---
title: "The Consistent Visual Question Answering (ConVQA) Dataset"
excerpt: "Dataset with metrics for quantitative evaluation of consistency in Visual Question Answering (VQA)."
tags:
  - Analytics
  - Computer Vision
  - Natural Language Processing
  - Visual Question Answering (VQA)

submission_details:
  resources: 
    papers:
      - title: Sunny and Dark Outside?! Improving Answer Consistency in VQA through Entailed Question Generation
        url: https://arxiv.org/abs/1909.04696
    data:
      - title: The ConVQA dataset
        url: https://arijitray1993.github.io/ConVQA/
  
  version: 1.0
  size: 50MB
  license: https://creativecommons.org/licenses/by/4.0/
   
  authors:
    - Arijit Ray<sup>1</sup>
    - Karan Sikka<sup>1</sup>
    - Ajay Divakaran<sup>1</sup>
    - Stefan Lee<sup>2</sup>
    - Giedrius Buracas<sup>1</sup>
  organizations:
    - 1. SRI International
    - 2. Georgia Institute of Technology
  point_of_contact:
    name: Arijit Ray
    email: array@bu.edu
---

## Overview

The ConVQA dataset and metrics aim to enable quantitative evaluation of consistency in VQA. Visual Question Answering (VQA) has seen substantial progress, but existing VQA models lack consistency. For instance, a VQA model may answer “red” to “What color is the balloon?”, and at the same time answer “no” to the question “Is the balloon red?”. 

Given observable fact in an image (e.g. the balloon’s color), the ConVQA dataset includes a set of logically consistent question-answer (QA) pairs (e.g. Is the balloon red?) and also a human-annotated set of common-sense based consistent QA pairs (e.g. Is the balloon the same color as tomato sauce?). 

Three consistency metrics are used on ConVQA:

1. **Perfect-Consistency (Perf-Con).** A model is perfectly consistent for a question set if it answers all questions in the set correctly. We report the percentage of such sets as Perf-Con.
2. **Average Consistency (Avg-Con).** We also report the average accuracy within a consistent
question set over the entire dataset as Avg-Con. 
3. **Accuracy (top-1).** Finally, we report the top-1 accuracy over all questions in the dataset.


## Intended Use

For VQA researchers, the ConVQA dataset is an ideal benchmark for evaluating and improving the consistency of VQA models. 

For XAI researchers, the ConVQA dataset is helpful for studying how to uncover a model's consistency patterns and helping end users to build appropriate trust for visual analytic applications.

## Data

The ConVQA dataset introduces consistency QA pairs to images at the intersection of the [VQA v2.0 dataset](https://visualqa.org/) and the [Visual Genome dataset](https://visualgenome.org/).

Two types of QA pairs are introduced:
* **Logic-based Consistent QA.** Given a Visual Genome scene graph consisting of objects, attributes, and their relationships, we consider each triplet to encode a single ‘visual fact’, for instance, that the sofa is white. We employ slot-filler NLP techniques to generate a set of QA pairs for each triplet (object-relation-subject) in the scene graph. Currently, we focus on attribute (e.g., color, size), existential (e.g., is there) and relational (e.g., sofa on floor) consistency. We leverage Wordnet and a manually generated list of antonyms (e.g., white vs. black) and hypernyms (e.g., white → color) to generate consistency QA pairs.

* **Commonsense-based Consistent QA.** We collect more challenging QA pairs based on commonsense (CS-ConVQA) by asking AMT workers to write intelligent rephrases of QA pairs sampled from the [VQA v2.0 dataset](https://visualqa.org/) validation split. AMT workers were instructed to avoid simple word paraphrases and instead to write rephrases that require commonsense reasoning in order to answer the question consistently.


For each type, the QA pairs are divided into a train and a test split. The test split is used for evaluation, whereas the train split enables further consistency training to improve a VQA model's consistency.



## Limitations

* There's plenty of room to improve the consistency of existing VQA models. Existing VQA models achieves 55% perfect consistency score over sets of 5 logically generated questions in our study. 

* The role of consistency in generating better explanations, e.g. helping users build more accurate mental models needs further studies.


## References

If you use the ConVQA dataset as part of published research, please cite the following paper:

```
@inproceedings{ray2019sunny,
  title={Sunny and Dark Outside?! Improving Answer Consistency in VQA through Entailed Question Generation},
  author={Ray, Arijit and Sikka, Karan and Divakaran, Ajay and Lee, Stefan and Burachas, Giedrius},
  booktitle={Proceedings of the 2019 Conference on Empirical Methods in Natural Language Processing and the 9th International Joint Conference on Natural Language Processing (EMNLP-IJCNLP)},
  pages={5863--5868},
  year={2019}}
```