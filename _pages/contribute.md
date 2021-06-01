---
permalink: /contribute/
title: "Contribute"
last_modified_at: 2021-05-07
classes: wide2
---

## Why Contribute?
* Support open-source, transparent, and reproducible XAI research

* Benefit from searchability and discoverability as part of a larger toolkit

* Go from research to production through possible transition to industry and government partners

## How to contribute a new capability

1. Navigate to the `_capabilities` folder in the [xaitk website repository](https://github.com/XAITK/xaitk.github.io/)

2. Click "Add file" -> "Create new file"

3. Give the file an appropriate name (e.g. `fakesal.md`), and copy the following template there

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
     resources: # List any resources associated with the contribution. Not all sections are required
       papers:
         - title: Paper link text
           url: Paper link url
       software:
         - title: Software link text
           url: Software link url
         - title: Another software link text
           url: Another software link url
       demos:
         - title: Demo link text
           url: Demo link url
       data:
         - title: Data link text
           url: Data link url
   
     # Optional information describing artifact. Leave blank if unused
     version: Version Number
     size: Size
     license: Link to license
   
     authors:
       - Author Name
       # Optional for multiple authors and organizations
       - Author Name<sup>1</sup>
     organizations:
       - Organization
       # Optional for multiple authors and organizations
       - 1. Organization
     point_of_contact:
       name: PoC Name
       email: email
   ---
   
   ## Overview
   [comment]: <> (What is the main purpose of the contribution?)
   
   ## Intended Use
   [comment]: <> (What is the intended use case for this contribution?)

   [comment]: <> (What domains/applications has this contribution been applied to?)
   
   ## Model/Data
   [comment]: <> (If a model is involved, what are its inputs and outputs?)

   [comment]: <> (If the model was learned/trained, what data was used for training/testing?)
   
   ## Limitations
   [comment]: <> (Are there any additional limitations/ethical considerations for use of this contribution?)
   
   [comment]: <> (Are there known failure modes?)
   
   ## References
   [comment]: <> (Any additional information, e.g. papers \(cited with bibtex\) related to this contribution.)
   ```

4. Fill out this template with the information relevant to your contribution, deleting the commented text and replacing it with your own. If you are new to Markdown, please see the guide [here](https://guides.github.com/features/mastering-markdown/). An example submission can be found at `_capabilities/fakesal.md`

5. You can preview your submission at any time by clicking on the "Preview" tab. When ready, submit a pull request to the XAITK repository with these changes. Please give the pull request a meaningful name, e.g. `dev/add-fakesal-description`

6. If you encounter any problems with submitting your contribution, please reach out to us at <xaitk@kitware.com>