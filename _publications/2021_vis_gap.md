---
layout: publication
# Quotes make the : possible, otherwise you can type this without quotes
title: "Exploring the Personal Informatics Analysis Gap: 'There's a Lot of Bacon'"
# Keys must be unique to each paper, see section below for more details
key: 2021_vis_gap
# Select one of the options below
type: paper 
redirect_from: /publications/2021_preprint_gap/


# Papers are ordered by year. However, in years with many papers, we want some ordering at a lower level. You can do 
# that by specifying an order for the papers of that year. For example, 2019-11 will put papers with values lower than 
# 2019-11 below that paper. Notice that sorting is lexicographic.  
order: 2021-10

# Auto-generates titles and alt-descriptors
shortname: gap
# Add a 2:1 aspect ratio (e.g., width: 400px, height: 200px) to the folder /assets/images/publications/
image: 2021_vis_gap.png
# Add a 2:1 aspect ratio teaser figure (e.g., width: 1200px, height: 600px) to the folder /assets/images/publications/
image_large: 2021_vis_gap_teaser.png

# Authors in the "database" can be used with just their person "key"
authors:
- Jimmy Moore
- Pascal Goffin
- Jason Wiese
- meyer

# A link to an internal blog post (use only the relative URL)
blog-post: 

# Include a shortened name for the journal or conference/proceedings
journal-short: VIS
year: 2021


# Create BibTeX info, using one of the entry choices
# Articles have a "journal", and inproceedings have a "booktitle"
# Preprints are articles with the location of preprint mentioned in "journal"
# You can remove fields you don't need, or else leave them blank
# Try to include a DOI, or use the publisher URL below
# Specify new BibTeX fields by adding a new key and value inside "bib:"

#TVCG Special Issue on the 2021 IEEE Visualization Conference (VIS)

bibentry: article 
bib:
  journal: IEEE Transactions on Visualization and Computer Graphics (VIS)
  publisher: IEEE
  doi: 10.1109/TVCG.2021.3114798 
  url: 
  volume:  
  number: 
  pages: 95-105




# Provide a preprint and supplement pdf
pdf: https://sci.utah.edu/~vdl/papers/2021_preprint_gap.pdf
supplement: https://sci.utah.edu/~vdl/papers/2021_preprint_gap_supplement.zip




abstract: "<p>
Personal informatics research helps people track personal data for the purposes of self-reflection and gaining self-knowledge. This field, however, has predominantly focused on the data collection and insight-generation elements of self-tracking, with less attention paid to flexible data analysis. As a result, this inattention has led to inflexible analytic pipelines that do not reflect or support the diverse ways people want to engage with their data. This paper contributes a review of personal informatics and visualization research literature to expose a gap in our knowledge for designing flexible tools that assist people engaging with and analyzing personal data in personal contexts, what we call the <em>personal informatics analysis gap</em>.  We explore this gap through a multistage longitudinal study on how asthmatics engage with personal air quality data, and we report how participants: were motivated by broad and diverse goals;  exhibited patterns in the way they explored their data;  engaged with their data in playful ways; discovered new insights through serendipitous exploration; and were reluctant to use analysis tools on their own. These results present new opportunities for visual analysis research and suggest the need for fundamental shifts in how and what we design when supporting personal data analysis. 
</p>"

# After the ---, you can put information that you want to appear on the website using markdown formatting or HTML. A good example are acknowledgements, extra references, an erratum, etc.
# The --- is REQUIRED! 
---

# Acknowledgements

Many thanks to: our study participants for sticking with us all these years; Greg Furlich for his indispensable real-time data analysis; the Visualization Design Lab members for constructive criticism on multiple drafts and research pitches; and our reviewers for their thoughtful and detailed feedback.   

This work was supported by the National Institute of Biomedical Imaging and Bioengineering of the National Institutes of Health under Award Number U54EB021973. The content is the sole responsibility of the authors and does not necessarily represent the official views of the National Institutes of Health.
