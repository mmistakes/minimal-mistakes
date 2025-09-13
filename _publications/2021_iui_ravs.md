---
layout: publication
# Quotes make the : possible, otherwise you can type this without quotes
title: "Rapid Assisted Visual Search: Supporting digital pathologists with imperfect AI"
# Keys must be unique to each paper, see section below for more details
key: 2021_iui_ravs
# Select one of the options below
type: paper

# Papers are ordered by year. However, in years with many papers, we want some ordering at a lower level. You can do
# that by specifying an order for the papers of that year. For example, 2023-11 will put papers with values lower than
# 2023-11 below that paper. Notice that sorting is lexicographic.
# order: 2023-11

# Auto-generates titles and alt-descriptors
shortname: Rapid Assisted Visual Search
# Add a 2:1 aspect ratio (e.g., width: 400px, height: 200px) to the folder /assets/images/publications/
image: 2021_iui_ravs.png
# Add a 2:1 aspect ratio teaser figure (e.g., width: 1200px, height: 600px) to the folder /assets/images/publications/
image_large: 2021_iui_ravs_teaser.png

# Authors in the "database" can be used with just their person "key"
authors:
- Martin Lindvall
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
journal-short: IUI
year: 2021

# Create BibTeX info, using one of the entry choices
# Articles have a "journal", and inproceedings have a "booktitle"
# Preprints are articles with the location of preprint mentioned in "journal"
# You can remove fields you don't need, or else leave them blank
# Try to include a DOI, or use the publisher URL below
# Specify new BibTeX fields by adding a new key and value inside "bib:"
bibentry: inproceedings
bib:
  journal:
  booktitle: Proc. Int. Conf. Intelligent User Interfaces (IUI '21)
  editor:
  publisher: ACM
  address:
  doi: 10.1145/3397481.3450681
  url:
  volume:
  number:
  pages: 504-513
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
Designing useful human-AI interaction for clinical workflows remains challenging despite the impressive performance of recent AI models. One specific difficulty is a lack of successful examples demonstrating how to achieve safe and efficient workflows while mitigating AI imperfections. In this paper, we present an interactive AI-powered visual search tool that supports pathologists in cancer assessments. Our evaluation with six pathologists demonstrates that it can 1) reduce time needed with maintained quality, 2) build user trust progressively, and 3) learn and improve from use. We describe our iterative design process, model development, and key features. Through interviews, design choices are related to the overall user experience. Implications for future human-AI interaction design are discussed with respect to trust, explanations, learning from use, and collaboration strategies.
</p>"

# After the ---, you can put information that you want to appear on the website using markdown formatting or HTML. A good example are acknowledgements, extra references, an erratum, etc.
# The --- is REQUIRED!
---

# Acknowledgements

We wish to thank Gordan Maras, M.D., without whom this project would not have been possible. The study was financially supported by the Wallenberg AI, Autonomous Systems and Software Program (WASP).}