---
title: "XAI Discovery Platform"
excerpt: "Data set explorer to enable discovery and sensemaking and to support explanation of AI."
tags: # Select from this set
  - Analytics
  - Computer Vision
  - Reinforcement Learning
  - Explanation Framework

submission_details:
  resources: # List any resources associated with the contribution. Not all sections are required

    software:
      - title: XAI Discovery Platform
        url: https://github.com/stmueller/xai-discovery-platform

    demos:
      - title: MNIST Digit Classification
        url: http://obereed.net:3838/mnist/

      - title: FGVC Aircraft Classification
        url: http://obereed.net:3838/xai-discovery-fgvc/

  # Optional information describing artifact. Leave blank if unused
  version:
  size:
  license: https://www.gnu.org/licenses/gpl-3.0.en.html

  authors:
    - Shane Mueller<sup>1</sup>
    # Optional for multiple authors and organizations
    - Gary Klein<sup>2</sup>
    - Robert R. Hoffman<sup>3</sup>
  organizations:
    - 1. Michigan Technological University
    # Optional for multiple authors and organizations
    - 2. MacroCognition, LLC
    - 3. Institute for Human and Machine Cognition
  point_of_contact:
    name: Shane Mueller
    email: shanem@mtu.edu
---

## Overview
The XAI Discovery Platform provides a customizeable interface for exploring image classification data sets.  Its goal is to help explore strengths and weaknesses of an image classifier, focusing on consistent errors, and patterns that help predict performance.  It does not attempt to provide explanations on its own, but rather helps users understand the things that need to be explained, and to test and compare ideas.

## Intended Use
The discovery platform allows a developer to better understand the global competency of a system through exploring patterns, contrasts, and edge cases. We have demonstration systems using the MNIST data set (10 classes of hand-written characters) as well as the FGVC aircraft data set (roughly 50 classes of aircraft).

## Model/Data
The system is model-agnostic, but requires: (1) ground truth about images; and (2) machine classification with probabilistic or rank-order over the top-10 classification categories for each case. This enables searching by similarity/error patterns to find similar cases.

## Limitations
The system has been tested on data sets with 2000-5000 cases. Larger data sets may need to be sampled from to enable good performance.

## References
[comment]: <> (Any additional information, e.g. papers \(cited with bibtex\) related to this contribution.)
