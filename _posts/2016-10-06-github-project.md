---
layout: simple
title: Version Control for data analysis
description: When and why to use Git on solo data analysis
tags: 
  - Git
---

# Because everyone uses

My first try was motivated by a social fact. Many data analysts that I respect use version control. So, it must be important to do as well. As a solo data analytic, I often had no reason to try beyond the backup usage and the after finishing the analysis cleanning folders and organizing the codes. 

It took some time to realize the need of version control, but here I am, an enthusiastic of *Git*. And I will tell the points that changed my mind.

## Uncontrollable file list

![mess](/assets/posts/rstudio-git/files-git.png)

Ok, Matheus, you won! End the post here... 

I swear there are some beauties more. Let's get more serious and have a look on somethings you probably already been through:

Have you ever:

* Made a change to code, realised it was a mistake and wanted to revert back?
* Lost code or had a backup that was too old?
* Had to maintain multiple versions of a product?
* Wanted to see the difference between two (or more) versions of your code?
* Wanted to prove that a particular change broke or fixed a piece of code?
* Wanted to review the history of some code?
* Wanted to submit a change to someone else's code?
* Wanted to share your code, or let other people work on your code?
* Wanted to see how much work is being done, and where, when and by whom?
* Wanted to experiment with a new feature without interfering with working code?

To misquote a friend: A civilised tool for a civilised age.

# Solo Adventurer

As you see, some of them aren't musts to a solo adventurer daily work... But as much as I followed a procedure, I realized that each analysis project evolves and mutates in its own way. Data that arrives in waves, findings that spark insights from the client which inspire new directions to be explored, and code from previous projects that gets tweeked and reused are a few common surprises. 

I used to think of my work as developing code that will do what I want it to do. After I adopt using a revision control system, I started thinking of my work as writing down my legacy in the repository, and making brilliant incremental changes to it. It feels way better.

# RStudio Project and Git

RStudio's team made a great job bringing Git to the plataform. RStudio projects make it straightforward to organize the data analysis by themes, while Git tracks the storyline. Git organizes and keeps track of these versions in your project folder, which is now called a "repository". I view a repository as a folder on steroids with a memory of the past.

Prior to using RStudio's version control features you will need to ensure that you have Git installed on your system. 

![rstudio](/assets/posts/rstudio-git/git-rstudio-option.png)

Beginning is that easy! Click *Commit* and a messagebox appears. A commit in a git repository records a snapshot of all the files in your directory. It's like a giant copy and paste, but even better! Git wants to keep commits as lightweight as possible though, so it doesn't just blindly copy the entire directory every time you commit.

A *commit* in Git means you have arrived at a point in the story which you are satisfied with. The message is a brief summary of that paragraph.

![commit](/assets/posts/rstudio-git/commit.png)

The *question mark icon* under *Status* indicates that Git has detected a new file has arrived. Do you want Git to track its storyline as it progresses? The blue *M* means that a file with history has been saved with changes. Tick the checkbox to let Git know you've made changes to the file and you're ready to commit. In red you have the deleted parts and in green the fresh work.

Now if you want to see how the analysis has changed over time, click *History* under the Git tab. *My first steps* was my first commit and as you can see, done in 04/10.

![history](/assets/posts/rstudio-git/history.png)

Git maintains a history of which commits were made when. That's why most commits have ancestor commits above them. Maintaining history is great for everyone working on the project!

