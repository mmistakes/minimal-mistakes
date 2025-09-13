---
layout: publication
# The quotes make the : possible, otherwise you can do it without quotes
title: "Origraph: Interactive Network Wrangling"
key: 2019_vast_origraph
# paper | preprint | poster
type: paper
order: 2019-10


redirect_from: /publications/2019_vast_origraph

# The shortname is used for auto-generated titels
shortname: Origraph
# add a 2:1 aspect ratio (e.g., width: 400px, height: 200px) to the folder /assets/images/papers/
image: 2019_vast_origraph.png
# add a 2:1 aspect ratio teaser figure (e.g., width: 1200px, height: 600px) to the folder /assets/images/papers/
image_large: 2019_vast_origraph_large.png

# Authors in the "database" can be used with just the key (lastname). Others can be written properly.
authors:
  - Alex Bigelow
  - Carolina Nobre
  - meyer
  - Alexander Lex

journal-short: VAST
year: 2019

bibentry: inproceedings
bib:
  journal: 
  booktitle: IEEE Conference on Visual Analytics Science and Technology (VAST)
  editor:
  publisher: 
  address:
  doi: 10.1109/VAST47406.2019.8986909
  url:
  volume:
  number:
  pages: 81-92
  month:



# Use this if you have an external project website
external-project: https://origraph.github.io/



# the prerint
pdf: https://sci.utah.edu/~vdl/papers/2019_vast_origraph.pdf

# Link to the repository where the code is hostet
code: https://github.com/origraph

# Link to an official preprint server
preprint_server: https://arxiv.org/abs/1812.06337

abstract: "
<p>Networks are a natural way of thinking about many datasets. The data on which a network is based, however, is rarely collected in a form that suits the analysis process, making it necessary to create and reshape networks. Data wrangling is widely acknowledged to be a critical part of the data analysis pipeline, yet interactive network wrangling has received little attention in the visualization research community.
In this paper, we discuss a set of operations that are important for wrangling network datasets and introduce a visual data wrangling tool, Origraph, that enables analysts to apply these operations to their datasets. Key operations include creating a network from source data such as tables, reshaping a network by introducing new node or edge classes, filtering nodes or edges, and deriving new node or edge attributes. Our tool, Origraph, enables analysts to execute these operations with little to no programming, and to immediately visualize the results. Origraph provides views to investigate the network model, a sample of the network, and node and edge attributes. In addition, we introduce interfaces designed to aid analysts in specifying arguments for sensible network wrangling operations. We demonstrate the usefulness of Origraph in two Use Cases: first, we investigate gender bias in the film industry, and then the influence of money on the political support for the war in Yemen.</p>"

# After the --- you can put information that you want to appear on the website using markdown formatting or HTML. A good example are acknowledgements, extra references, an erratum, etc.
---
### Acknowledgements

This work was funded by the National Science Foundation (OAC 1835904, IIS 1350896, IIS 1751238) and by the Utah Genome
Project.
