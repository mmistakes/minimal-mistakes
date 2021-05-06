---
permalink: /contribute/
title: "Contribute"
last_modified_at: 2021-02-05T20:54:41-05:00
classes: wide2
---

## How to contribute a new document

1. Navigate to docs/_capabilities in the [xaitk website repository](https://github.com/XAITK/xaitk.github.io/)

2. Click "Add File"->"Create New File"

3. Give the file an appropriate name (e.g. `fsal.md`), and copy the following template

    ```yaml
    ---
    title: "Title of the contribution"
    excerpt: "An excerpt describing this contribution."
    tags: # Select from this set
      - Analytics
      - Autonomy
      - Computer Vision
      - Natural Language Processing
      - Reinforcement Learning
      - Visual Question Answering (VQA)
      - Human-Machine Teaming
      - Saliency
      - Data Poisoning
      - Medical
      - Explanation Framework

    submission_details:
      resources: # List any resources associated with the contribution
        papers:
          - Link to paper
        software:
          - Link to software
          - Another link to software
        demos:
          - Link to demo
        data:
          - Link to data

      authors:
        - Author Name
      organizations:
        - Organization
      point_of_contact:
        name: PoC Name
        email: email

      # Optional information describing artifact
      version: Version Number
      size: Size
      license: Link to license
    ---

    ## Overview
    What is the main purpose of the contribution?

    ## Intended Use
    What is the intended use case for this contribution? What domains/applications has this contribution been applied to?

    ## Model/Data
    If a model is involved, what are its inputs and outputs? If the model was learned/trained, what data was used for training/testing?

    ## Limitations
    Are there any additional limitations/ethical considerations for use of this contribution? Are there known failure modes?

    ## References
    Any additional information, e.g. papers (cited with bibtex) related to this contribution.
    ```

4. Fill out this template with the information relevant to your contribution. An example submission can be found at `docs/_capabilities/fakesal.md`. 

5. When ready, submit a pull request to the XAITK repository with these changes. Please give the pull request a meaningful name, e.g. `dev/add-fsal-description`