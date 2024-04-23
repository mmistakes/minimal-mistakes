---
title: "Image Processing"
excerpt: "Image Processing"
layout: single

---
Each dataset was processed using [CPAC](https://fcp-indi.github.io/docs/nightly/user/quick) - or Configurable Pipeline for the Analysis of Connectomes. These steps were all carried out in [Datalad](https://www.datalad.org/) to keep track of provenance and ensure the ultimate reproducibility for all datasets. The C-PAC workflow proceeded according to the custom configuration file that was crafted specifically for RBC studies, which is available [here](https://github.com/FCP-INDI/C-PAC/blob/0182f98c61cb7fbb495c8300e6a6a7991c859240/CPAC/resources/configs/pipeline_config_rbc-options.yml#L172).

Major outputs include:
- Functional timeseries after cleaning
- Functional connectivity matrices
- ALFF (or amplitude of low frequency fluctuation)
- ReHo (or regional homogeneity)
- QC metrics
- A list of nuisance regressors and motion parameters, respectively.


A more detailed description of the list of outputs can be obtained [here](https://fcp-indi.github.io/docs/nightly/user/output_dir).
