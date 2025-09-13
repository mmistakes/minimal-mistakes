---
layout: publication
# Quotes make the : possible, otherwise you can type this without quotes
title: "Designing human-automation collaboration for predictive maintenance"
# Keys must be unique to each paper, see section below for more details
key: 2020_dis_maintenance
# Select one of the options below
type: paper

# Papers are ordered by year. However, in years with many papers, we want some ordering at a lower level. You can do
# that by specifying an order for the papers of that year. For example, 2023-11 will put papers with values lower than
# 2023-11 below that paper. Notice that sorting is lexicographic.
order: 2020-jlb

# Auto-generates titles and alt-descriptors
shortname: Predictive Maintenance
# Add a 2:1 aspect ratio (e.g., width: 400px, height: 200px) to the folder /assets/images/publications/
image: 2020_dis_maintenance.png
# Add a 2:1 aspect ratio teaser figure (e.g., width: 1200px, height: 600px) to the folder /assets/images/publications/
image_large: 2020_dis_maintenance_teaser.png

# Authors in the "database" can be used with just their person "key"
authors:
- borutecene
- lowgren

# A link to an internal blog post (use only the relative URL)
# blog-post:

# Include a shortened name for the journal or conference/proceedings.
# Generally go for the colloquial name here, so InfoVis, VIS, EuroVis, VAST, CHI, TVCG.
# Don't bother with publication format (CGF for EuroVis or TVCG for VIS papers).
# Don't mention organizations (IEEE, ACM), so VIS, not IEEE VIS, CHI, not ACM CHI.
# Do include relevant qualifiers, such as "Short Papers" (VIS Short Papers) or "Posters" (VIS Posters)
# Don't include a year, or a shorthand for the year, so NOT: InfoVis'14
journal-short: DIS Companion
year: 2020

# Create BibTeX info, using one of the entry choices
# Articles have a "journal", and inproceedings have a "booktitle"
# Preprints are articles with the location of preprint mentioned in "journal"
# You can remove fields you don't need, or else leave them blank
# Try to include a DOI, or use the publisher URL below
# Specify new BibTeX fields by adding a new key and value inside "bib:"
bibentry: inproceedings
bib:
  journal:
  booktitle: Comp. Proc. Designing Interactive Systems (DIS Companion)
  editor:
  publisher: ACM
  address:
  doi: 10.1145/3393914.3395863
  url:
  volume:
  number:
  pages: 251-256
  month:
  pmcid:

# Add things like "Best Paper Award at InfoVis 2099, selected out of 4000 submissions"
# award:

# Provide a link to the publisher's webpage if no DOI is available
# publisherURL:

# Link to an official preprint server
# preprint_server:

# Links to a project hosted on VDL, or else externally on your own site
# project:
# external-project:

# Provide a preprint and supplement pdf
# pdf:
# supplement:

# Link to the repository where the code is hosted
# code:

abstract: "<p>
Concerning the maintenance and upkeep of autonomous warehouses, contemporary developments in industrial digitalization and machine learning are currently fueling a shift from preventive maintenance to predictive maintenance (PdM). We report an ongoing co-design project that explores human-automation collaboration in this direction through a future scenario of baggage handling in an airport where human operators oversee and interact with AI-based predictions. The cornerstones of our design concept are the visualizations of current and predicted system performance and the ability for operators to preview consequences of future actions in relation to performance prediction.
</p>"

# After the ---, you can put information that you want to appear on the website using markdown formatting or HTML. A good example are acknowledgements, extra references, an erratum, etc.
# The --- is REQUIRED!
---

# Acknowledgements

We thank the co-design team members Boris Ahnberg, Emilia Johansson, Elisa Määttänen, Filip Nilsson, Gustav Sternelöv for their participation and generosity. We thank our research engineer Erik Olsson for his hard work in implementing the demonstrator and Jonas Unger and Per Larsson for their technical supervision. This Visual Sweden project is funded by VINNOVA (grant number 2015-07051).
