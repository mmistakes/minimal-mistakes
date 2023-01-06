---
layout: single
author_profile: false
toc: true
toc_sticky: true
---
# DialDoc Workshop
## co-located with ACL 2023

## About

Welcome to the Third DialDoc Workshop co-located with [ACL 2023](https://2023.aclweb.org).

DialDoc workshop focuses on Document-Grounded Dialogue and Conversational Question Answering. 
Given the vast amount of content created every day in various mediums, it is a meaningful yet challenging task not only to make such content _accessible_ to end users via various conversational interfaces but also to make sure the responses provided by the models are _grounded_ and _faithful_ with respect to the knowledge sources. The purpose of this workshop is to invite researchers and practitioners to bring their individual perspectives on the subject of grounded dialogue and conversational question answering to advance the field in a joint effort. We also host a shared task on grounded dialogue based on multilingual documents, which aims to extend the current advances to languages other than English.

Topics of interests include but not limited to
- Document-grounded dialogue and conversational machine reading;
- Knowledge-grounded dialogue generation with pre-trained language models;
- Open domain dialogue and conversational QA;
- Topical open-domain conversational chat;
- Parsing semi-structured document content for dialogue and conversational QA, table reading;
- Evaluation for document-grounded dialogue;
- Interpretability and faithfulness in dialogue modeling;
- Dialogue summarization and query-based summarization.


## Calls

We welcome submissions of original work as long or short papers, as well as non-archival papers. We also accept paper submissions via ARR. All accepted papers will be presented at the workshop.

We will have the Best Paper Award and Best Student Paper Award, which will be announced during the workshop.

### Submission Instructions

Formatting Guidelines:
We accept long (eight pages plus unlimited references) and short (four pages plus unlimited references) papers, which should conform to ARR CFP guidelines.

Non-Archival Submissions:
The accepted papers can opt to be non-archival.

Stay tuned for more details about submission site.



### Review Process

All submissions will be peer-reviewed by at least two reviewers. The reviewing process will be two-way anonymized. Authors are responsible for anonymizing their submissions.

### Important Dates
- For regular workshop paper submissions (regular/non-archival long/short tracks)
  - Paper Due Date: April 24, 2023
- For paper submissions with ARR reviews
  - Paper Due Date: TBD
- For technical paper submissions (Shared Task track)
  - Paper Due Date: TBD
- Notification of Acceptance: May 22, 2023
- Camera-ready Paper Due Date: June 6, 2023
- Pre-recorded video due: June 12, 2023
- Workshop Date: July 13 or 14, 2023


## Shared Task

### Task1 Mixed-lingual DGDS
We will provide annotated data in English, Chinese, French, and Vietnamese for training; and then evaluate models in all four languages.

Training: document set contains 4 languages and we have sample conversations grounded on documents of 4 languages.
Testing: testing conversations in 4 languages which contain evidences in documents of 4 languages

### Task2 Cross-lingual DGDS
We will provide sizable annotated data in a source language (e.g. English) and limited data in the target language for training; then evaluate the models in the target language for the settings such as English-to-Chinese and Chinese-to-Vietnamese.

Training: document set and conversation set with grounding labels in English and/or Chinese. 
Testing: testing conversations in French and/or Vietnamese which contain evidences in documents of 2 source languages (English, Chinese)


### Important Dates
The challenge includes leaderboards for two task settings with two phases, Dev (TestDev) and Test phase,
- Datasets ready & Baseline Models : February 6, 2023
- Dev Phase Start : February 13, 2023
- Test Phase Start : March 25, 2023
- Date of Leaderboard submission：March 31, 2023
- Paper submission: April 24, 2023


## Invited Speakers
{% include committee-member.html
   name="Greg Durrett"
   picture="./assets/images/speakers/greg_durrett.jpg"
   site="https://www.cs.utexas.edu/~gdurrett/"
   institution="The University of Texas at Austin"
%}

{% include committee-member.html
   name="Xiang Ren"
   picture="./assets/images/speakers/xiang_ren.jpg"
   site="https://shanzhenren.github.io/"
   institution="University of Southern California"
%}

{% include committee-member.html
   name="Rui Yan"
   picture="./assets/images/speakers/rui_yan.jpg"
   site="http://ai.ruc.edu.cn/english/GSAI_FACULTY/28026f7425324f61991c70d279372d13.htm"
   institution="Renmin University of China"
%}

## Organization
### Workshop Organizers
{% include committee-member.html
   name="Roee Aharoni"
   picture="./assets/images/organizers/roee_aharoni.jpg"
   site="http://roeeaharoni.com"
   institution="Google Research"
%}

{% include committee-member.html
   name="Nouha Dziri"
   picture="./assets/images/organizers/nouha_dziri.jpg"
   site="https://webdocs.cs.ualberta.ca/~dziri/"
   institution="AllenAI"
%}

{% include committee-member.html
   name="Song Feng"
   picture="./assets/images/organizers/song_feng.jpg"
   site="https://songfeng.github.io"
   institution="AWS AI Labs"
%}

{% include committee-member.html
   name="Yongbin Li"
   picture="./assets/images/organizers/yongbin_li.jpg"
   site=""
   institution="DAMO Academy, Alibaba Group"
%}

{% include committee-member.html
   name="Yu Li"
   picture="./assets/images/organizers/yu_li.jpg"
   site="http://yooli.me"
   institution="Columbia University"
%}

{% include committee-member.html
   name="Hui Wan"
   picture="./assets/images/organizers/hui_wan.jpg"
   site="https://sites.google.com/view/hui-wan/"
   institution="IBM Research AI"
%}

### Shared Task Organizers
{% include committee-member.html
   name="Haiyang Yu"
   picture=""
   site=""
   institution="Alibaba DAMO"
%}


### Program Committee
TBA

## Contact

Please join our [Google Group](https://groups.google.com/g/dialdoc) for the updates!

Please email us at [dialdoc2023-organizers@@googlegroups.com](dialdoc2023-organizers@@googlegroups.com) for questions and suggestions.
