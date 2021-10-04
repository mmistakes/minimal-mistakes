---
title: "Explainable Video Activity Search Tool"
excerpt: "Demo of our explainable query-building tool to search activities within a collection of videos."
tags: 
  - Analytics
  - Computer Vision
  - Visual Question Answering (VQA)
  - Human-Machine Teaming
  - Explanation Framework

submission_details:
  resources: 
    papers: 
      - title: Anchoring Bias Affects Mental Model Formation and User Reliance in Explainable AI Systems
        url: https://doi.org/10.1145/3397481.3450639
    software:
      - title: Explainable Video Activity Search Demo
        url: https://github.com/MahsanNourani/XAI-Video-Explanation/tree/user-study-v2
    demos:
      - title: Online Video Activity Search
        url: https://indie.cise.ufl.edu/Pineapple/complex.html

  version: 
  size: 
  license: https://opensource.org/licenses/MIT
  authors:
    - Mahsan Nourani<sup>2</sup>
    - Chiradeep Roy<sup>1</sup>
    - Jeremy Block<sup>2</sup>
    - Donald R. Honeycut<sup>2</sup>
    - Tahrima Rahman<sup>1</sup>
    - Eric Ragan<sup>2</sup>
    - Vibhav Gogate<sup>1</sup>
  organizations:
    - 1. The University of Texas at Dallas
    - 2. University of Florida
  point_of_contact:
    name: Eric Ragan
    email: eragan@ufl.edu
---

## Overview
Studying how explanations can affect user behaviors can be more valuable and interesting in cases with more open-ended, real-world scenarios. In this project, we aimed to allow the users build their own queries to ask the system. We designed an exploratory task of determining whether certain kitchen policies were followed within a week. The system would match or not match each existing video to a searched query and users could select to explore the video and system justifications for it further by clicking on each video thumbnail. We used this system to test how explanations and primacy effects affect user mental model and user-task performance.

## Intended Use
The tool illustrates how to build a user-friendly visual interface and the different explanation types that one should provide to a user for solving the task of explainable search for query answers in a collection of videos. At a high level, the system works as follows. The user uploads a collection of videos and forms a query (e.g., was a policy followed in the collection of videos) about the video. The system processes the videos and organizes the videos into two types: (1) videos in which the query answer was "yes" and (2) videos in which the query answer was "no." To get more information or to further investigate why the query answer was yes or no, the user can click on individual videos. After clicking on the video, the system provides three types of explanations.


## Limitations
Only works with pre-defined questions and videos. 


## References
{% raw %}
```
@inproceedings{nourani21,
      author    = {Mahsan Nourani and Chiradeep Roy and Jeremy E. Block and Donald R. Honeycutt and Tahrima Rahman and Eric D. Ragan and Vibhav Gogate},
      editor    = {Tracy Hammond and Katrien Verbert andDennis Parra and Bart P. Knijnenburg and John O'Donovan and Paul Teale},
      title     = {Anchoring Bias Affects Mental Model Formation and User Reliance in Explainable {AI} Systems},
      booktitle = {{IUI} '21: 26th International Conference on Intelligent User Interfaces, College Station, TX, USA, April 13-17, 2021},
      pages     = {340--350},
      publisher = {{ACM}},
      year      = {2021}
}
```
{% endraw %}
