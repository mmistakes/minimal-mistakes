---
layout: simple
title: Git Branch - No risks, No gains
description: Understanding Git branch and when it should be used.
tags: 
    - Git
---

# How does branch works?

Branches are like **Save as...** on a directory. Why branch? Consider the utility of **Save as...** for regular files: you tinker with multiple possibilities while keeping the original safe. Git enables this for directories, with the power to merge. 

I think of a branch like laying a sheet of tracing paper over a drawing, where I can doodle new ideas until I create the image I have in mind. When I finally get there, I merge the two drawings together into one cohesive picture - one that uses the best details of both sheets. Sometimes I just throw away the old way like that have never been done by me.

# Caution!! Mess ahead...

Look, my code is doing the job, not perfectly but the results are there. Suddenly a brilliant idea come and I a give a shot.
Let's try this new way!!! Why not?! The moment that you change and it stops working answers this question. **Because it's FINE**. Some times I actually step back on a change in my code preventing a mess. 

> Rewind a project or a file to a previous state, which in turn encourages **experimentation**

Sometimes I have a function, but I have an idea to organize the pieces in a better way. Everything works already, but I think I can improve it. Perhaps I can trim some code to make my function more concise. Maybe there's a way to improve performance. Would it be better to break this monster down into smaller pieces?

So I'll create a new branch, explore these solutions, and if it works, combine the improved pieces with the original analysis. I find it's a smart way to work and I want to show you how to get started. The branching workflow looks like this:

![flow](/assets/posts/rstudio-git/git-goodbranch.png)

# How it looks on Rstudio?

We want to have our traditional and the development setup for our coding environment. I got an ideia to make my function more clear. So name the exploratory branch *cleaner*.

To create a new branch, named *cleaner*, type the following:

``` git
git checkout -b cleaner
```
Now the pulldown menu under the Git tab in RStudio shows that you're working in a different branch:

![branch](/assets/posts/rstudio-git/rstudio-git-branches.PNG)

I'm going to use a technique from A successful Git branching model and merge these two branches using **--no-ff**. This means that Git will retain information about the history of the project, and the fact that the current state is a result of combining separate branches. I like doing it this way.

![merge](/assets/posts/rstudio-git/git-merge.png)

``` git
git merge --no --ff cleaner
```

### Usage

We're there. Using branches really enabled me to explore and experiment with my code. The freedom to test ideas without the risk of messing up my current, functioning state of affairs was huge. Got a crazy idea that might bring down the house? Let's try it - in a separate branch, of course. 

This is a simple example, but it gets more complicated. I will work on a new branch when I have a massive deviation in how I approach a problem. If I want to explore two separate R packages that do the same thing but require the data to be structured differently, I will use branches to explore both methods, changing code on multiple files and organizing data differently on each. The best method gets merged back into *master*.

I encourage you to go wild and explore using branches in your data analysis projects as well.
