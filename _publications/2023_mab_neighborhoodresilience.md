---
layout: publication
# Quotes make the : possible, otherwise you can type this without quotes
title: "Media architecture for neighborhood resilience"
# Keys must be unique to each paper, see section below for more details
key: 2023_mab_neighborhoodresilience
# Select one of the options below
type: paper

# Papers are ordered by year. However, in years with many papers, we want some ordering at a lower level. You can do
# that by specifying an order for the papers of that year. For example, 2023-11 will put papers with values lower than
# 2023-11 below that paper. Notice that sorting is lexicographic.
# order: 2023-11

# Auto-generates titles and alt-descriptors
shortname: Neighborhood Resilience
# Add a 2:1 aspect ratio (e.g., width: 400px, height: 200px) to the folder /assets/images/publications/
image: 2023_mab_neighborhoodresilience.png
# Add a 2:1 aspect ratio teaser figure (e.g., width: 1200px, height: 600px) to the folder /assets/images/publications/
image_large: 2023_mab_neighborhoodresilience_teaser.png

# Authors in the "database" can be used with just their person "key"
authors:
- Maximiliane Nirschl
- Boudewijn Boon
- Martijn de Waal
- lowgren

# A link to an internal blog post (use only the relative URL)
# blog-post:

# Include a shortened name for the journal or conference/proceedings.
# Generally go for the colloquial name here, so InfoVis, VIS, EuroVis, VAST, CHI, TVCG.
# Don't bother with publication format (CGF for EuroVis or TVCG for VIS papers).
# Don't mention organizations (IEEE, ACM), so VIS, not IEEE VIS, CHI, not ACM CHI.
# Do include relevant qualifiers, such as "Short Papers" (VIS Short Papers) or "Posters" (VIS Posters)
# Don't include a year, or a shorthand for the year, so NOT: InfoVis'14
journal-short: MAB
year: 2023

# Create BibTeX info, using one of the entry choices
# Articles have a "journal", and inproceedings have a "booktitle"
# Preprints are articles with the location of preprint mentioned in "journal"
# You can remove fields you don't need, or else leave them blank
# Try to include a DOI, or use the publisher URL below
# Specify new BibTeX fields by adding a new key and value inside "bib:"
bibentry: inproceedings
bib:
  journal:
  booktitle: Proc. 6th Media Architecture Biennale (MAB ’23)
  editor:
  publisher: ACM
  address:
  doi: 10.1145/3627611.3627623
  url:
  volume:
  number:
  pages: 108-118
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
This pictorial introduces a three-level framework articulating the role media architecture could play in strengthening neighborhood resilience. The framework operates at the levels of concepts, strategies and examples, containing i) five aspects of resilience that media architecture can contribute to in the face of ecological and social shocks and stressors, ii) 17 design strategies for promoting these aspects, and iii) 10 design examples that demonstrate the design strategies. The framework, which is made available through a web-based tool, aims to contribute to the development of intermediate-level design knowledge, linking design strategies to both higher-level concepts as well as concrete examples. In the discussion we further explore how our interpretations of social and ecological resilience in the framework and tool also resonate with emerging more-than-human theories in HCI, IxD and MA.
</p>"

# After the ---, you can put information that you want to appear on the website using markdown formatting or HTML. A good example are acknowledgements, extra references, an erratum, etc.
# The --- is REQUIRED!
---

# Acknowledgements

We thank Edith Winkler, Floor van Ditzhuyzen, Lotte de Haan, Hedwich Hooghiemstra and Nadia Pepels for sharing their rich insights about the Holendrecht neighborhood during a design charette that we organized. The research presented in this paper is part of the project ‘From Prevention to Resilience: Designing Public Spaces in Times of Pandemic’. This project is funded by The Netherlands Organization for Health Research and Development (ZonMw), part of the subsidy round ‘COVID 19: Maatschappelijke Dynamiek’, project nr. 10430032010029.