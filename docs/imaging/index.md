---
title: "Imaging"
excerpt: "Imaging"
layout: single
---

## RBC Neuroimaging
RBC aggregates structural (sMRI) and functional imaging (fMRI) data from five large, diverse studies of brain development. All raw imaging data and meta-data was carefully curated to conform with the [Brain Imaging Data Structure (BIDS)])https://bids.neuroimaging.io/) in a fully-reproducible fashion using software that was developed for RBC -- [CuBIDS](https://cubids.readthedocs.io/en/latest/) (Covitz et al., 2022).  Next, we adopted the [“FAIRly-big” strategy](https://www.nature.com/articles/s41597-022-01163-2) (Wagner et al., 2022) for reproducible image processing, ensuring all preparation and analysis were accompanied by a full audit trail in [DataLad](https://www.datalad.org/) (Halchenko et al., 2021). Structural MRI data were processed using [FreeSurfer](https://surfer.nmr.mgh.harvard.edu/) and sMRIPrep, yielding commonly-used measures of brain structure. Functional MRI data were preprocessed using [C-PAC](https://fcp-indi.github.io/) (Craddock et al., 2013) and a dedicated configuration that was rigorously quality controlled on all RBC datasets, eventually yielding measures such as functional connectivity matrices, ReHo, and ALFF. Processed structural and functional data were parcellated with 16 commonly-used atlases. Critically, we provide fully harmonized measures of  quality control for both structural and functional images. 
