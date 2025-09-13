---
layout: publication
title: Predicting Intent Behind Selections in Scatterplot Visualizations
key: 2021_ivi_intent
type: paper 
order: 2021-06

shortname: Intent-Inference
image: 2021_ivi_intent.png
image_large: 2021_ivi_intent_teaser.png


authors:
  - Kiran Gadhave
  - Jochen Goertler
  - Zach Cutler
  - Carolina Nobre
  - Oliver Deussen
  - meyer
  - Jeff Phillips
  - Alexander Lex

journal-short: IVI
year: 2021

# relative link to a blog post about the paper
blog-post: 2022/10/28/intent/

bibentry: article
bib:
  journal: Information Visualization
  editor: 
  publisher: SAGE
  address: 
  doi: 10.1177/14738716211038604
  url: https://doi.org/10.1177/14738716211038604
  volume: 20
  number: 4
  pages: 207–228
  month: August
  pmcid: 

# Links to a project hosted on VDL, or else externally on your own site

external-project: https://vdl.sci.utah.edu/predicting-intent/

# Video entries, a preview , talk, and intro video. Vimeo IDs or youtube IDs are supported
# you need to pick either a vimeo or youtube ID. We definitely want a downloadable video too.


# Provide a preprint and supplement pdf

pdf: https://sci.utah.edu/~vdl/papers/2021_ivi_intent.pdf
supplement: https://sci.utah.edu/~vdl/papers/2021_ivi_intent_supplement.pdf

# Link to an official preprint server
preprint_server: http://dx.doi.org/10.31219/osf.io/mq2rk





code: https://github.com/visdesignlab/intent-system

abstract: "
<p>Predicting and capturing an analyst’s intent behind a selection in a data visualization is valuable in two scenarios: First, a successful prediction of a pattern an analyst intended to select can be used to auto-complete a partial selection which, in turn, can improve the correctness of the selection. Second, knowing the intent behind a selection can be used to improve recall and reproducibility.
In this paper, we introduce methods to infer analyst's intents behind selections in data visualizations, such as scatterplots.
We describe intents based on patterns in the data, and identify algorithms that can capture these patterns. Upon an interactive selection, we compare the selected items with the results of a large set of computed patterns, and use various ranking approaches to identify the best pattern for an analyst's selection. 
We store annotations and the metadata to reconstruct a selection, such as the type of algorithm and its parameterization, in a provenance graph.
We present a prototype system that implements these methods for tabular data and scatterplots. Analysts can select a prediction to auto-complete partial selections and to seamlessly log their intents. We discuss implications of our approach for reproducibility and reuse of analysis workflows.
We evaluate our approach in a crowd-sourced study, where we show that auto-completing selection improves accuracy, and that we can accurately capture pattern-based intent.</p>
"
---

# Acknowledgements

We thank the domain experts we interviewed for their time and their willingness to provide datasets, and Lane Harrison and members of the Visualization Design Lab for feedback. We gratefully acknowledge funding by the National Science Foundation (IIS 1751238) and by the Deutsche Forschungsgemeinschaft (251654672-TRR 161).
