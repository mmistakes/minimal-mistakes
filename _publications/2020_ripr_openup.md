---
layout: publication
# Quotes make the : possible, otherwise you can type this without quotes
title: "Open up: A survey on open and non-anonymized peer reviewing"
# Keys must be unique to each paper, see section below for more details
key: 2020_ripr_openup
# Select one of the options below
type: paper

# Papers are ordered by year. However, in years with many papers, we want some ordering at a lower level. You can do
# that by specifying an order for the papers of that year. For example, 2023-11 will put papers with values lower than
# 2023-11 below that paper. Notice that sorting is lexicographic.
# order: 2023-11

# Auto-generates titles and alt-descriptors
shortname: Open Peer Reviewing
# Add a 2:1 aspect ratio (e.g., width: 400px, height: 200px) to the folder /assets/images/publications/
image: 2020_ripr_openup.png
# Add a 2:1 aspect ratio teaser figure (e.g., width: 1200px, height: 600px) to the folder /assets/images/publications/
image_large: 2020_ripr_openup_teaser.png

# Authors in the "database" can be used with just their person "key"
authors:
- Lonni Besancon
- ronnberg
- lowgren
- Jonathan Tennant
- Matt Cooper

# A link to an internal blog post (use only the relative URL)
# blog-post:

# Include a shortened name for the journal or conference/proceedings.
# Generally go for the colloquial name here, so InfoVis, VIS, EuroVis, VAST, CHI, TVCG.
# Don't bother with publication format (CGF for EuroVis or TVCG for VIS papers).
# Don't mention organizations (IEEE, ACM), so VIS, not IEEE VIS, CHI, not ACM CHI.
# Do include relevant qualifiers, such as "Short Papers" (VIS Short Papers) or "Posters" (VIS Posters)
# Don't include a year, or a shorthand for the year, so NOT: InfoVis'14
journal-short: RIPR
year: 2020

# Create BibTeX info, using one of the entry choices
# Articles have a "journal", and inproceedings have a "booktitle"
# Preprints are articles with the location of preprint mentioned in "journal"
# You can remove fields you don't need, or else leave them blank
# Try to include a DOI, or use the publisher URL below
# Specify new BibTeX fields by adding a new key and value inside "bib:"
bibentry: article
bib:
  journal: Research Integrity and Peer Review
  booktitle:
  editor:
  publisher:
  address:
  doi: 10.1186/s41073-020-00094-z
  url:
  volume: 5
  number:
  pages: "#8"
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
Background: Our aim is to highlight the benefits and limitations of open and non-anonymized peer review. Our argument is based on the literature and on responses to a survey on the reviewing process of alt.chi, a more or less open review track within the so-called Computer Human Interaction (CHI) conference, the predominant conference in the field of human-computer interaction. This track currently is the only implementation of an open peer review process in the field of human-computer interaction while, with the recent increase in interest in open scientific practices, open review is now being considered and used in other fields. Methods: We ran an online survey with 30 responses from alt.chi authors and reviewers, collecting quantitative data using multiple-choice questions and Likert scales. Qualitative data were collected using open questions. Results: Our main quantitative result is that respondents are more positive to open and non-anonymous reviewing for alt.chi than for other parts of the CHI conference. The qualitative data specifically highlight the benefits of open and transparent academic discussions. The data and scripts are available on https://osf.io/vuw7h/, and the figures and follow-up work on http://tiny.cc/OpenReviews. Conclusion: While the benefits are quite clear and the system is generally well-liked by alt.chi participants, they remain reluctant to see it used in other venues. This concurs with a number of recent studies that suggest a divergence between support for a more open review process and its practical implementation.
</p>"

# After the ---, you can put information that you want to appear on the website using markdown formatting or HTML. A good example are acknowledgements, extra references, an erratum, etc.
# The --- is REQUIRED!
---

# Acknowledgements

The authors wish to thank Pierre Dragicevic for his early feedback on the manuscript and the questionnaire and Mario Malicki for his https://publons.com/review/4997156/.
In fond memory of our friend and colleague Jon Tennant, who full heartedly advocated fairness and openness in science. We will continue your fight. Your wisdom, devotion, empathy, and friendship are sorely missed.