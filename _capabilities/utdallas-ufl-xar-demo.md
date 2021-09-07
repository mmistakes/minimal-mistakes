---
title: "Explainable Video Activity Recognition Demo"
excerpt: "Demo of our XAI system built to detect activities in videos with post-hoc explanations for its predictions."
tags: 
- Analytics
- Computer Vision
- Visual Question Answering (VQA)
- Human-Machine Teaming
- Explanation Framework

submission_details:
resources: 
papers: 
- title: Don’t Explain without Verifying Veracity: An Evaluation of Explainable AI with Video Activity Recognition
url: https://arxiv.org/abs/2005.02335
software:
- title: Explainable Video Activity Recognition Demo
url: https://github.com/MahsanNourani/XAI-Video-Explanation



authors:
- Mahsan Nourani <sup>2</sup>
- Chiradeep Roy <sup>1</sup>
- Tahrima Rahman <sup>1</sup>
- Eric Ragan <sup>2</sup>
- Nicholas Ruozzi <sup>1</sup>
- Vibhav Gogate  <sup>1</sup>
organizations:
- 1. The University of Texas at Dallas
- 2. University of Florida
point_of_contact:
name: Eric Ragan
email: eragan@ufl.edu
---

## Overview
Machine Learning Systems are often times referred to as black-boxes, as their users cannot properly understand how to use them. Explainable Artificial Intelligence (XAI) systems are therefore used to bring transparency for the end-users to help them understand such systems and build a better mental model of these systems. Through this project, we built an explainable tool for activity recognition in cooking videos, where the system provides yes/no responses to whether an activity is happening in a video, and the system's justification for that output. We then used this system to explore how presence and quality of explanations can affect certain user behaviors, such as user-task performance, trust, and understanding. 


## Intended Use
The tool illustrates how to build a user-friendly visual interface and the different explanation types that one should provide to a user for solving the task of explainable activity recognition in video data. At a high level, the system works as follows. The user uploads a video and asks a yes/no question (e.g., did the user perform activity X) about the video. The system processes the video, answers the question and provides three types of explanations, explaining the yes or no answer to the question.


## Limitations
Only works with pre-defined questions and videos. 



## References

```
@article{nourani2020,
	author    = {Mahsan Nourani and
		Chiradeep Roy and
		Tahrima Rahman and
		Eric D. Ragan and
		Nicholas Ruozzi and
		Vibhav Gogate},
	title     = {Don't Explain without Verifying Veracity: An Evaluation of Explainable
		{AI} with Video Activity Recognition},
	journal   = {CoRR},
	volume    = {abs/2005.02335},
	year      = {2020},
	url       = {https://arxiv.org/abs/2005.02335},
}
```
