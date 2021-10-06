---
title: "Publications"
layout: single
permalink: /publications/
author_profile: true
header:
  overlay_color: "#5e616c"
  overlay_image: /assets/website_banner.png
classes: wide

intro: 
  - excerpt: 'Nullam suscipit et nam, tellus velit pellentesque at malesuada, enim eaque. Quis nulla, netus tempor in diam gravida tincidunt, *proin faucibus* voluptate felis id sollicitudin.'

feature_row1:
  - image_path: /assets/images/unsplash-gallery-image-2-th.jpg
    alt: "placeholder image 2"
    title: "Bedrock reconstruction from free surface data for unidirectional glacier flow with basal slip"
    excerpt: 'Glacier ice flow is shaped and defined by several properties, including the bedrock elevation profile and the basal slip distribution. The effect of these two basal properties can present in similar ways in the surface. For bedrock recovery this makes distinguishing between them an interesting and complex problem. The results of this paper show that in some synthetic test cases it is indeed possible to distinguish and recover both bedrock elevation and basal slip given free surface elevation and free surface velocity. The unidirectional shallow ice approximation is used to compute steady state surface data for a number of synthetic cases with different bedrock profiles and basal slip distributions. A simple inversion method based on Newton's method is applied to the known surface data to return the bedrock profile and basal slip distribution. In each synthetic test case, the inversion was successful in recovering both the bedrock elevation profile and the basal slip distribution variables. These results imply that there is a unique bedrock profile and basal slip which give rise to a unique combination of free surface velocity and free surface elevation.'
    url: "https://arxiv.org/abs/2006.13310"
    btn_label: "Read on Arvix"
    btn_class: "btn--primary"

feature_row2:
  - image_path: /assets/images/unsplash-gallery-image-2-th.jpg
    alt: "placeholder image 2"
    title: "An augmented Lagrangian algorithm for recovery of ice thickness in unidirectional flow using the Shallow Ice Approximation"
    excerpt: 'A key parameter in ice flow modelling is basal slipping at the ice-bed interface as it can have a large effect on the resultant ice thickness. Unfortunately, its contribution to surface observations can be hard to distinguish from that of bed undulations. Therefore, inferring the ice thickness from surface measurements is an interesting and non-trivial inverse problem. This paper presents a method for recovering dually the ice thickness and the basal slip using only surface elevation and speed measurements. The unidirectional shallow ice approximation is first implemented to model steady state ice flow for given bedrock and basal slip profiles. This surface is then taken as synthetic observed data. An augmented Lagrangian algorithm is then used to find the diffusion coefficient which gives the best fit to observations. Combining this recovered diffusion with observed surface velocity, a simple Newton's method is used to recover both the ice thickness and basal slip. The method was successful in each test case and this implies that it should be possible to recover both of these parameters in two-dimensional cases also.'
    url: "https://arxiv.org/abs/2108.00854"
    btn_label: "Read More"
    btn_class: "btn--primary"
---

{% include feature_row id="intro" type="center" %}

{% include feature_row id="feature_row2" type="left" %}

{% include feature_row id="feature_row1" type="left" %}


