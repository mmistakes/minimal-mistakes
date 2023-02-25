---
layout: single
title: Reducing Errors in Data Analysis
author-id: Chingis Maksimov
tags: [dataset, data science]
classes: wide
---

Recently a model vetter has pointed out to a mistake that I committed when developing one of the models. The mistake was not of methodological type, rather it was a simple overlook on my side when combining two separate data sources: the same fields in these two datasets were merged under different names in the combined dataset. As a result, I only used the values from one of the two fields in my subsequent analysis. Fortunately for me, the mistake did not affect the final results significantly. However, this situation made me think and forced me to the conclusion that it is of utmost importance to develop confidence in one's technique when dealing with data.

When working on a data science project, some common tasks, like performing left joins or defining variables, may seem trivial. However, in practice, it is all too common to make mistakes. For example, when doing a left join, one need to have a good idea on whether the join is actually one-to-one or not. Another example is defining a new variable as a sum of the other two variables. In SAS, the programming language that I commonly use at work, if one of the two variables is missing, the result of the summation will yield a missing value as well. For that reason, I believe that one should follow the following course of actions when working with data to minimize the amount of errors and increase one's confidence in his or her work:

1. Think about what the result of any data manipulation should be before performing it. For example, if you define a new variable x as a + b you may theorize that it would not have missing values or be equal to 0.

2. Having performed the data manipulation, run a number of checks to verify the results of the operation against the expectations that you came up with in step 1. Try to make the tests as general as possible so that even if the data sources that you are currently using get modified or updated, the code that you wrote would still be applicable and will not result in costly mistakes.

3. If you spot any unexpected results, do not hesitate to investigate further and do not proceed until the issue has been successfully resolved. If you postpone solving the issue on the spot, there is a chance that you either forget about the issue or your subsequent analysis may no longer be valid. The latter issue is the more important the larger the project becomes as it becomes near impossible to predict the effects of subsequent error correction as it propagates through the program. Solutions usually revolve around double checking the preceding steps or even questioning the data sources used in the analysis.

I believe that performing the 3 steps outlined above should help improve the quality of the analysis and reduce the number of mistakes. While it may be time consuming at first, over time it should become a habit and the benefits will outweigh the cons.
