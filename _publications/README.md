# Adding a Publication

Please use the template provided below when adding a new publication. Fill in
all the information to the best of your ability.
**IF** you are adding an dissertation, make a copy of `2024_ms_thesis.md` and use that as your template.

## Keys and Filenames

Each publication must have a unique key following this pattern:
`YYYY_CONFSHORTNAME_PAPERSHORTNAME`

All files for your publication should use this key consistently, only varying by
the file extension. For example: `2023_chi_troublingcollab.pdf`

However, if there are multiple files of the same extension type, then the
"secondary" type specified with an underscore, as in
`2023_chi_troublingcollab_supplement.pdf`.

## Steps to Adding a Publication

1. Add a `*.md` file in this folder following the template below. Use the unique key for your publication's filenames.
2. Upload the following files:
   - publication PDF (`KEY.pdf`) - _mandatory_
   - thumbnail figure (`KEY.png`) - _mandatory_

<!-- 2. Upload supplemental figures that are _not_ in the paper. The figures are placed in a folder in the `assets/images/publications` folder, where the foldername is the KEY. The point of these is that they can be used, e.g., in review articles without having to pay the publisher. [Read more about adding supplemental images here](../assets/images/README.md) - you need to provide high-res figures and thumbnails. -->

## Publication Template

Modify the template below for your publication. Feel free to leave entries
blank if they are not needed. You can also remove comments or unused fields.
Each publication _**must**_ specify a `title`, `authors`, `bibentry`, and `year`
in order to render proper BibTeX output.

A current example is the CHI Troubling Collab entry.

```yaml
---
layout: publication
# Quotes make the : possible, otherwise you can type this without quotes
title: "Troubling Collaboration: Matters of Care for Visualization Design Study"
# Keys must be unique to each paper, see section below for more details
key: 2023_chi_troublingcollab
# Select one of the options below
type: paper | preprint | poster | thesis | commentary | abstract

# Papers are ordered by year. However, in years with many papers, we want some ordering at a lower level. You can do
# that by specifying an order for the papers of that year. For example, 2023-11 will put papers with values lower than
# 2023-11 below that paper. Notice that sorting is lexicographic.
order: 2023-11

# Auto-generates titles and alt-descriptors
shortname: Troubling Collaboration
# Add a 2:1 aspect ratio (e.g., width: 400px, height: 200px) to the folder /assets/images/publications/
# image: 2016_eurovis_pathfinder.png
# Add a 2:1 aspect ratio teaser figure (e.g., width: 1200px, height: 600px) to the folder /assets/images/publications/
# image_large: 2016_eurovis_pathfinder_teaser.png

# Authors in the "database" can be used with just their person "key"
authors:
- akbaba
- meyer

# A link to an internal blog post (use only the relative URL)
blog-post:

# Include a shortened name for the journal or conference/proceedings.
# Generally go for the colloquial name here, so InfoVis, VIS, EuroVis, VAST, CHI, TVCG.
# Don't bother with publication format (CGF for EuroVis or TVCG for VIS papers).
# Don't mention organizations (IEEE, ACM), so VIS, not IEEE VIS, CHI, not ACM CHI.
# Do include relevant qualifiers, such as "Short Papers" (VIS Short Papers) or "Posters" (VIS Posters)
# Don't include a year, or a shorthand for the year, so NOT: InfoVis'14
journal-short: CHI
year: 2023

# Create BibTeX info, using one of the entry choices
# Articles have a "journal", and inproceedings have a "booktitle"
# Preprints are articles with the location of preprint mentioned in "journal"
# You can remove fields you don't need, or else leave them blank
# Try to include a DOI, or use the publisher URL below
# Specify new BibTeX fields by adding a new key and value inside "bib:"
# Make sure to add a space between the colon and your entry
bibentry: article | inproceedings | phdthesis | book
bib:
  journal: SIGCHI Conference on Human Factors in Computing Systems (CHI)
  booktitle:
  editor:
  publisher: ACM
  address:
  doi: 10.1145/3544548.3581168
  url:
  volume:
  number:
  pages:
  month:
  pmcid:

# Add things like "Best Paper Award at InfoVis 2099, selected out of 4000 submissions"
award:

# Provide a link to the publisher's webpage if no DOI is available
publisherURL:

# Link to an official preprint server
preprint_server:

# Links to a project hosted on VDL, or else externally on your own site
project:
external-project:

# Video entries, a preview , talk, and intro video. Vimeo IDs or youtube IDs are supported
# you need to pick either a vimeo or youtube ID. We definitely want a downloadable video too.
# videos:
#  - name: "Juniper Introduction"
#    youtube-id: EAjNxFgsJ58
#    file: 2018_infovis_juniper.mp4
#  - name: "Juniper Preview"
#    youtube-id: y9ZVNtuyUBU
#    file: 2018_infovis_juniper_preview.mp4
#  - name: "Recorded Talk"
#    vimeo-id: 299855433
#    file: 2018_infovis_juniper_talk.mp4

# Provide a preprint and supplement pdf
pdf:
supplement:

# Link to the repository where the code is hosted
code:

abstract: "<p>
A common research process in visualization....
</p>"

# After the ---, you can put information that you want to appear on the website using markdown formatting or HTML. A good example are acknowledgements, extra references, an erratum, etc.
# The --- is REQUIRED!
---

# Acknowledgements

This work was co-funded by ....
```
