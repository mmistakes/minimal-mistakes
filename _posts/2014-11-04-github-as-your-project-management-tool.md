---
layout: post
title: Github as your project management tool
excerpt: Github is a powerful Git platform commonly used between the developers community. It offers features like issues, labels, milestones, releases, that used properly might help you to manage not only your technical repos but different aspects around your project like design, ideas, ...
modified: 2014-11-04
tags: [github, scrum, issues, zenhub, management, project]
comments: true
image:
  feature: headers/coworking.jpg
  credit: Photo from Coworking Badaup!
sitemap   :
  priority : 0.9
  isfeatured : 1
---

Github is a well known Git solution between all developers around the world. It helps you to manage your Git repositories remotely and offers extra features to complement the Git core and make you more productive. These extra features are for example Issues, Pull Requests, Labels, Milestones, Releases... We know about about them becase we use Github daily but we're totally conscious of how productive we can be using these components properly.

## Github + External Project Management Tool = Synchronization
I've been working during the past months in a project management tool as a developer. We used Github and tried to translate tasks from that platform to Github in order to work in them. Although we used milestones, and other internal methods to connect these developers items with the platform, all the management core was contained in that platform. This is something good but if you ensure that the synchronization between these two components is taken into account by all the team. Synchronization is something difficult to mantain, sometimes you feel a sync man! and you are focused on having a healthy communication between Github and your project management platform (PMP), but some others you feel so tired that you forget to report the status of your Github items to your PMP. When it happens the communication is broken and it implies extra work for your workmates like *where did you work on this?, why didn't you resolve the task?, why didn't you apply the proper label?* In these situations you feel like you are doing repeated stuff that you could do just once. Sometimes you make use of scrips that you develop on your own but if you can't spend a lot of time **developing scripts** for each communication flow.

## Github, but what if I'm not a developer?
Although it sounds strange Github is not only for developers. The entire Git concept can be applied to design, to the company related stuff, ... Once all the team members know about the flow it's pretty easy to stay connected an synchronized. Think about something like [**Markdown**](http://whatismarkdown.com/). Talking from the developer side we use a lot when we start a new repo and we have to fill the README.md file (*I remember the first time I knew about it when I created my first repo*). Markdown is becoming popular, it's used now in blogging platforms (*I'm in fact writting this article using markdown*). We could use Mardown in **our website/landing page repository** I've seen companies that took the decision to stick to Markdown instead of choosing over-loaded editors like the one Wordpress offers to you. If your project includes its own content **your company content editors** could write directly in Markdown and integrate that content into for example a Landing, a Web, or a Mobile application just commiting their changes. For **designers** it's something more complicated because they use mostly graphics instead of text but if you try to externalize all design related stuff *like css files, stylesheet file, snapshot testing,...* they can be more involved. This is something that everybody dreams with it, designers with the ability to go into your web project and tell you off about the styles your applied or a developer getting the styles and sizes directly from the designer's mockups. It depends a lot on the kind the product and on the level of integration of design and developers. 

![image](http://www.wired.com/wp-content/uploads/blogs/opinion/wp-content/uploads/2013/03/socialite.jpg)

## Management tips

### Components

#### Issues

When we think about an issue we tend to think about something negative (*as a developers we think about bugs*) but it doesn't has to why be something negative. Think that an issue should be something like a task, so it implies that you can use it as a for example *an idea you have had that would be cool to have it in the project* or *a new feature you have to implement in the current sprint*. Try to use a representative naming for your issues because the issues page is going to be your daily friend where you're going to constantly check your next stuff you have to work on. Take a look to the examples below

**Good naming**

- Steps counter feature 
- Crash caused by an empty response in the workout detail

**Bad naming**

- steps
- crash with response

> Useful note: In most of cases we'll end up creating a PR to solve the issue purpose. Github thought about it and they made an easy way to close issues directly merging an opened PR. You have to add a comment into your PR explaining that you resolved, fixed or solved any opened issue (e.g solved #31)

![Github Issues Screenshot]({{site.url}}/images/posts/githubissues.png)

##### Labels
Labels is a way to clasify not only your issues but your pull requests too. Labels has a name and a color and Github allows you to filter your issues/PR using them as a filter element. Although Github offers you some labels by default I recommend you to analyze and adapt them to your needs and requirements.  Labels for a landing page can't be the same for a backend project. I've been googling around to have some ideas about labels other companies use in their project and I liked the idea of the first answer in this question in stack exchange, [http://programmers.stackexchange.com/questions/129714/how-to-manage-github-issues-for-priority-etc](http://programmers.stackexchange.com/questions/129714/how-to-manage-github-issues-for-priority-etc). Tags that guy uses are:

![Github Labels Screenshot]({{site.url}}/images/posts/githublabels.png)

#### Milestones
Issues we'll be the core of hour project management, they will be our tasks and it's important to keep them organized. We've seen that labels allows us to tag them in terms of status, priority, type,... We can easily have either an idea of the most priority issues to work on, or the recent bugs related with UI but it doesn't allow to **group different issues because they have something in common**. The grouping reason might not only be related with the versioning but might be related with a refactor too, or even with a redesign. Think about Milestones like a bag with a well defined **purpose** that you are going to cover ussing the issues you are going to put inside. 

![Github Labels Screenshot]({{site.url}}/images/posts/githubmilestones.png)

The example above shows different milestones related with some versions of the library and one of them is focused in issues/PRs that are planned to be in the future versions. Notice that you have a bar that indicates the **precentage of issues/PR finished**. This way you have a global idea of the status of that milestone.

#### Assignees

Tasks (issues) in groups (milestones) labeled and executed, developed, reviewed by your team. Here's where the people come into play. Thanks to the **assignee** feature of Github you can assign a Github issue or a PR to someone. This person is responsible to move this item forward, work on it, ensure that the status of this item is updated (using comments, changing labels, mentioning work mates if something is blocking, ...). Moreover you can filter by your issues/PRs so it's easy for you to know what involes you. Imagine you turning on your computer every morning and wondering what you should work on. **Easy, take a look to your issues on Github**

![Github Labels Screenshot]({{site.url}}/images/posts/githubassignees.png)

### Flow
Understood these components someone might wonder how they could be applied into a project sprint. We're still working on 8fit to have a fixed flow that matches our needs, after using different tools for project management and we ended up with Github and we've inspired our flow in others' flows with our little details:

1. **Apply any methodology**: We strongly recommend any Agile methodology like Scrum. We've been using them previously and we're very happy we are very productive with it. Teach your entire team that methodology and make sure everybody knows about it. Although everybody should be responsible of its closest sprint, when the project is that manager role should cover more than one sprint. This person is going to be responsble to move issues between these sprints depending on the project schedule, priorities, ... Your team should meet for example at the beginning of the week to organize the product and sprint backlong and then during the week everybody should work with the sprint backlog and report the daily scrum status through meetings or any real time communication tool (*e.g. Slack HQ*). *There are some tools that apply a layer over Github that add these extra management features. In our case we're using one called  [Zenhub](*http://www.zenhub.io). You can install it as a Chrome extension and it's directly integrated with Github. Other solutions work as an external component*

2. **Keep tasks updated**: It's a common error to not update your project issues since they are created. You know their statuses but what happens if your workmate wants to know about any task/issue and you haven't reported anything since you started working on it? Labels and assignees are not only used when the issue/PR is created, re-assign it if another person has to work on it, change the label if the priority has increased, connect it with other PRs that have something in common. It's very important to keep this engagement with the issues board.

3. **Group your issues (and make them small)**: Think about a refactor, split it in small refactors, and group them into the same milestone refactor's bag. If you tried to locate that refactor in the future it would be easier to locate the milestone instead of the small issues. If the milestone is grouping a version, ensure that once the the milestone is closed you create a new release with the milestone version adding a changelog with the points that new version has covered and generate a tag to mark that status on the timeline.

4. **Review**: Before closing any issue/PR and if you have workmates that can review your work, ask them to do it. Don't merge your changes until you have their confirmations. It's better having more than two eyes. We are not magicians and it's probable that we forget any edge case. 

Keep in mind the previous points and try to apply them in your projects, try to be constant with them, and try your team to be too. Improve your management tools and flow every day regarding your needs and boost your team productivity. 
**You just only need Github!**

![Zenhub board in Github]({{site.url}}/images/posts/githubboard.png)

## Recommended articles
- [**What is Markdown**?](http://whatismarkdown.com/)
- [**Instant project management for your Github issues: HuBoard**](https://huboard.com/)
- [**Using Github for Project Management**](http://liftux.com/posts/using-github-issues-project-management/)
- [**Mastering issues. Github**](https://guides.github.com/features/issues/)
- [**Issues 2.0: The next generation**](https://github.com/blog/831-issues-2-0-the-next-generation)