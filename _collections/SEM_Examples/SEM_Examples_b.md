---
layout: single
author_profile: true
title: "Structural Equation Modelling - SEM"
category: SEM
shortdesc: "Examples and cases of application of SEM"
excerpt: "Some code examples using R"
header:
  overlay_color: "#333"
date: "15/06/2022"
output: html_document
editor_options: 
  markdown: 
    wrap: 72
---


```{r setup, include=FALSE}
knitr::opts_chunk$set(echo = TRUE)
```

This is a list of examples of application of SEM

## [1 CB-SEM example: Progression in the disease patterns](_collections/SEM_Examples/1_Park2018.md)

Method: CB-SEM using R's `Lavaan` Package. The visualization was
generated using and `semPlots`'s Package.

Case: a partial replication of an intermediary step in modelling
progression of the dengue illness phenotype.

Data from: Park S, Srikiatkhachorn A, Kalayanarooj S, Macareo L, Green
S, Friedman JF, et al. (2018). Use of structural equation models to
predict dengue illness phenotype. PLoS Negl Trop Dis 12 (10): e0006799.
<https://doi.org/10.1371/journal>. pntd.0006799

## [2- PLS-SEM example with composite variables: assessment of influential factors on drunk behaviour of foreign students](/collections/SEM_Examples/2_Aresi2021)

Method: PLS-SEM R's `SEMinR` package.

Case: A longitudinal study with the assessment of the influence of MMSAS
(Multidimensional Motivations to Study Abroad) on BSAS (Brief
sociocultural adaptation) and drunk behaviour.

Data from: Aresi, Giovanni; Moore, Simon C.; Marta, Elena (2021), "The
longitudinal health behaviours of European study abroad students sampled
from forty-two countries and across three-waves", Mendeley Data, V3,
doi: 10.17632/585d2wdmtd.3

## 3-CB-SEM example with reflective constructs: resilience and other human resources profile variables and perceptions of the risk of a losing job during covid

Method: CB-SEM generated using R\'s `Lavaan` Package, and the
`lavaanPlot` Package was used for
visualisation.

Model inspired using data in: Leask, C., & Ruggunan, S. (2021). A
temperature reading of covid-19 pandemic employee agility and resilience
in south africa. SA Journal of Industrial Psychology, 47(July).
<https://doi.org/10.4102/sajip.v47i0.1853>

## 4-CB-SEM example of assessment of attitudes and behaviours: the out-of-prescription use of antibiotics

Method: CB-SEM using R\'s `Lavaan` Package, and the `semPlots`\'s
Package was used for visualisation.
Inspired by Awad and Aboud (2015)\'s data on attitudes toward the
out-of-prescription use of
antibiotics

Data: Awad AI, Aboud EA (2015) Knowledge, Attitude and Practice towards
Antibiotic Use among the Public in Kuwait. PLOS ONE 10(2): e0117910.
<https://doi.org/10.1371/journal.pone.0117910>

## 5-A CB-SEM mediation study: Sustainability
awareness

Method: CB-SEM using R\'s `Lavaan` Package. The `semPlots` and
`semTools` Package were used for visualisations.

Summary: Model inspired on the La Barbera\'s data, on the assessment of
Sustainability
awareness through the attitudes toward energy saving, and the
implications on
intention:

Data: La Barbera, F. Moderating Role of Control in the Theory of Planned
Behavior: A Replication and Extension [Dataset] [Data set]. ZPID
(Leibniz
Institute for Psychology Information).
<https://doi.org/10.23668/psycharchives.2759>
