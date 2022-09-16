---
layout: single
permalink: /student/project_students
title: "Project Students"
toc: true
toc_label: "Table of Contents"
toc_icon: "book-reader"
toc_sticky: true
author: Leighton Pritchard
---

## So, You've Joined SIPBS-CompBiol as a Project Student…

Firstly, **welcome to the group**!

The SIPBS-CompBiol group is a purely computational biology and bioinformatics research group, in the Strathclyde Institute for Pharmacy and Biomedical Sciences. If you're reading this, you've probably asked for (or been assigned) an undergraduate, Master's, or internship project with us. We're a friendly group and excited about computational biology so, even if this is your first time working in this area, we want you to do well and are all happy to help and answer questions.

{: .notice--success}
Please start by reading the current group member bios, and our philosophy, responsibilities, and code of conduct.

- [Group bios](/group/bios)
- [Group philosophy](/group/philosophy)
- [Code of Conduct](/group/code_of_conduct)
- [Group responsibilities](/group/responsibilities)

## What do you need to do?

Exactly what you need to do will depend on your project, and we'll talk about that in project meetings. But some things are important for every project:

- Ask questions: you are here to learn
  - Every day is a school day. We all started off knowing nothing, and are learning all the time. We don't expect you to know everything so, if anything is confusing, unclear, or unfamiliar please talk to us.
  - Even if you do know the material well, we can help with advice on best practice and continual improvement - especially for coding, data management and analysis.
- Be kind, collegiate, and helpful
  - Our projects are our own individual responsibilities, but that doesn't mean we work in isolation. Your peers and the rest of the group are an excellent source of support and encouragement. We all benefit from each other's insight and help.
- Meet your course and examination requirements
  - please also submit your draft and final reports in time that they can be read and you can get good feedback
  - do you need advice on getting good feedback? [We have some advice on that](http://localhost:4000/student/getting-good-feedback/)
- Attend and present at project meetings, group meetings, and journal clubs
  - [Group meeting schedule](/group/group_meetings)
  - [Journal club schedule](/group/journal_club)
- Sign your learning agreement.

## What skills can you develop?

Computational biology and bioinformatics are practical skills, like lab skills. Just like lab skills, we all start out a wee bit clumsy but get much better with practice.

Unfortunately, our degree curriculum doesn't yet prepare you with computational skills in the same way we train you in laboratory techniques. The good news is that there are many ways to practice these skills and learn new skills, yourself. The resources below should be helpful 

{: .notice--success}
Remember, you can ask anyone in the group - and your peers - for advice on these topics. You are not alone. We were all complete novices, once.

- [How to avoid cognitive dissonance in your project](/student/avoid-cognitive-overload/)
- [How to ask a (good) question](/student/asking-good-questions/)

{: .notice--warning}
Your project will be short: six weeks practical work for an undergraduate project; eight weeks for a summer internship or Master's project. You cannot learn everything below in that time. The links are provided to help you learn independently now, but also as a resource you can return to if you want to develop your skills further in future.

### Programming

Computers are powerful but dumb. They do simple things very fast. To the extent computers appear intelligent, that intelligence is because some person told the computer to do a lot of simple things quickly in a specific order. 

- [What can _your_ computer do in a second?](https://computers-are-fast.github.io/)

When you use a program you are working within a set of constraints someone else devised. But when you _write_ a program, you can build and do something new.

A lot of bioinformatics can be done without programming, and your project might use a single analysis package, or [Galaxy](https://usegalaxy.eu) to build a workflow. But a little programming ability can get you a very long way.

#### Shell scripting

Shell scripting is programming, and usually means a very specific kind of programming using a language like `bash`. This is a powerful language, and often used to accomplish tiresome manual tasks quickly, e.g. 

```bash
# move all results from September into their own directory
mv my_project/results/2022-09* my_project/results/September
```

- [Software Carpentry shell lessons](https://swcarpentry.github.io/shell-novice/)

#### Python

Python is a powerful high-level programming language, widely used in bioinformatics and computational biology. Python is the _lingua franca_ of the group and we encourage students to code in Python to enable remixing and modular reuse of their work.

If you are just starting out with Python, we recommend using the cross-platform Anaconda distribution. This provides a powerful package manager that will make your life much easier. The Bioconda packages contain nearly all the bioinformatics tools you could need and work within Anaconda.

- [Anaconda](https://www.anaconda.com/)
- [Bioconda](https://bioconda.github.io/)
- [Software Carpentry Programming with Python](swcarpentry.github.io/python-novice-inflammation)
- [Software Carpentry Plotting and Programming in Python](https://swcarpentry.github.io/python-novice-gapminder/)
- [RealPython tutorials](https://realpython.com/)
- [freeCodeCamp (includes Python tutorials)](https://www.freecodecamp.org/)

#### R

R is a powerful programming language designed specifically for data analysis. It is very widely-used in bioinformatics and computational biology, with many specialised packages providing analytical and visualisation tools that can't be found elsewhere.

- [Software Carpentry Programming with R](https://swcarpentry.github.io/r-novice-inflammation/)
- [Software Carpentry R for Reproducible Scientific Analysis](https://swcarpentry.github.io/r-novice-gapminder/)
- [What they forgot to teach you about R](https://rstats.wtf/)

#### Editing code

This is a subjective topic. There is no one right way to work, and you should generally work the way that is productive and suits you best. That said, my (Leighton's) experience is that Visual Studio Code is a great choice to start working in. It works on all operating systems, can handle Python, R, and shell code, give you a terminal window, and integrate with tools like `git` (see below). If you haven't already decided on a programming workflow, there are many worse places to start.

- [Visual Studio Code](https://code.visualstudio.com/)

### Project and Data Management

It doesn't matter how many programming skills you have if you can't find your data. It takes a lot of practice, and trial-and-error (mostly error) to become very fluent in data management, but we can help shortcut this process with some recommendations.

- [BM432 Project Management Workshop](https://sipbs-compbiol.github.io/BM432/notebooks/03-data_management_workshop.html)
- [What is a dataset?](https://sipbs-compbiol.github.io/BM432/notebooks/02-01-dataset.html)
- [Data formats and file formats](https://sipbs-compbiol.github.io/BM432/notebooks/02-02-data_formats.html)
- [How to access data from public databases](https://sipbs-compbiol.github.io/BM432/notebooks/02-03-public_databases.html)

#### Version control: `git` and GitHub

Version control is an important part of project and code management. The most popular tool - and the one used in the group - for managing datasets, code, and documentation (including writing reports and papers), is `git` - and like many bioinformaticians we keep our `git` projects on GitHub. This is a bit of an advanced topic, as `git`/GitHub can do far more than help you manage your project (this website is hosted on GitHub, for instance), but following the basic principles of version control with `git` will make your work on your project so much easier to manage.

- [Software Carpentry Version Control with `git` lessons](https://swcarpentry.github.io/git-novice/)
- [gitexplorer - find the `git` command you need](https://gitexplorer.com/)

### Computing Resources

