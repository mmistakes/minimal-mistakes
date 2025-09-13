---
layout: publication
# Quotes make the : possible, otherwise you can type this without quotes
title: "TissueWand, a rapid histopathology annotation tool"
# Keys must be unique to each paper, see section below for more details
key: 2020_jpi_tissuewand
# Select one of the options below
type: paper

# Papers are ordered by year. However, in years with many papers, we want some ordering at a lower level. You can do
# that by specifying an order for the papers of that year. For example, 2023-11 will put papers with values lower than
# 2023-11 below that paper. Notice that sorting is lexicographic.
order: 2020

# Auto-generates titles and alt-descriptors
shortname: TissueWand
# Add a 2:1 aspect ratio (e.g., width: 400px, height: 200px) to the folder /assets/images/publications/
image: 2020_jpi_tissuewand.png
# Add a 2:1 aspect ratio teaser figure (e.g., width: 1200px, height: 600px) to the folder /assets/images/publications/
image_large: 2020_jpi_tissuewand_teaser.png

# Authors in the "database" can be used with just their person "key"
authors:
- Martin Lindvall
- Alexander Sanner
- Fredrik Petré
- Karin Lindman
- Darren Treanor
- Claes Lundström
- lowgren

# A link to an internal blog post (use only the relative URL)
# blog-post:

# Include a shortened name for the journal or conference/proceedings.
# Generally go for the colloquial name here, so InfoVis, VIS, EuroVis, VAST, CHI, TVCG.
# Don't bother with publication format (CGF for EuroVis or TVCG for VIS papers).
# Don't mention organizations (IEEE, ACM), so VIS, not IEEE VIS, CHI, not ACM CHI.
# Do include relevant qualifiers, such as "Short Papers" (VIS Short Papers) or "Posters" (VIS Posters)
# Don't include a year, or a shorthand for the year, so NOT: InfoVis'14
journal-short: JPI
year: 2020

# Create BibTeX info, using one of the entry choices
# Articles have a "journal", and inproceedings have a "booktitle"
# Preprints are articles with the location of preprint mentioned in "journal"
# You can remove fields you don't need, or else leave them blank
# Try to include a DOI, or use the publisher URL below
# Specify new BibTeX fields by adding a new key and value inside "bib:"
bibentry: article
bib:
  journal: Journal of Pathology Informatics
  booktitle:
  editor:
  publisher:
  address:
  doi: 10.4103/jpi.jpi_5_20
  url:
  volume: 11
  number: 1
  pages: 27
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
Background: Recent advancements in machine learning (ML) bring great possibilities for the development of tools to assist with diagnostic tasks within histopathology. However, these approaches typically require a large amount of ground truth training data in the form of image annotations made by human experts. As such annotation work is a very time-consuming task, there is a great need for tools that can assist in this process, saving time while not sacrificing annotation quality. Methods: In an iterative design process, we developed TissueWand – an interactive tool designed for efficient annotation of gigapixel-sized histopathological images, not being constrained to a predefined annotation task. Results: Several findings regarding appropriate interaction concepts were made, where a key design component was semi-automation based on rapid interaction feedback in a local region. In a user study, the resulting tool was shown to cause substantial speed-up compared to manual work while maintaining quality. Conclusions: The TissueWand tool shows promise to replace manual methods for early stages of dataset curation where no task-specific ML model yet exists to aid the effort.
</p>"

# After the ---, you can put information that you want to appear on the website using markdown formatting or HTML. A good example are acknowledgements, extra references, an erratum, etc.
# The --- is REQUIRED!
---

# Acknowledgements

We would like to thank pathologist Gordan Maras for providing valuable input on the usability of the tool when applied to lymph node metastases. The study was partially supported by Visual Sweden and by the Wallenberg AI, Autonomous Systems and Software Program (WASP). Martin Lindvall and Claes Lundström are employed by Sectra AB.