---
title: 'Why the hell you should use an issue tracker anyways?'
date: 2017-09-17T14:14:12.952Z
header:
  teaser: /assets/images/learning_tweet.png
keywords:
  - developers
  - issuetracker
  - projectmanagement
  - productivity
  - startups
---
Most of the people who work in software should know what an issue tracker is. Issue tracking software is a tool which is primarily used to track all the bugs in the project in a centralized place as single source of truth. Apart from tracking bugs, modern issue tracking systems can be used more comprehensively, from planning the features and software release milestones to a full blown project management tool.      
There are many companies which successfully use issue tracker. But there are also companies with people who hesitate to use it. Let me explain why a software company should start using issue tracker.

Before I start, the word "issues" I use throughout this article not only refers to bugs, but also the features, discussions and decisions made in a software project.

## Knowing your issues
Developers are basically a lazy ass people [and it is not a bad thing](http://blogoscoped.com/archive/2005-08-24-n14.html). If they have to spend half of their time on remembering the features and issues in the project, they will be overwhelmed to work on the actual development. But if they have their tasks, issues, bugs and features readily listed on a centralized system, they will just start working and will close the issues or mark the tasks done, one by one. Thats how developers prefer or love to communicate.

>Requirements rarely lie on the surface. Normally, they're buried beneath layers of assumptions, misconceptions, and politics.
--Steve McConnell

Listing all your issues, features and bugs will clear all the assumptions of the developers on the requirements as well as the project manager's assumptions about the timeline and the task that a developer is currently working on. If you don't have a proper centralized place to capture all your issues, how are you going to resolve them?. 


## Catching issues earlier in the pipeline
![catching_issues_early](/assets/images/cost_to_fix_issue.jpeg)      
The graph shows how costly is to find and fix the issues later in the pipeline. If you are able to catch the issue in requirements phase its well and good. If its in design phase, well all it takes is few more architectural discussions or design changes. If you find the issues in development, may be it will take few more iterations and it will cost developer's time but it is doable. The main job of the testing team is to identify the issues, but the previous components of the pipeline should be well streamlined so that we get minimal bugs or issues in the project after sending to testing team to minimize the iterations between the two teams. 

Finally it would cost you a lot and sometimes the company's reputation if your customer finds the issue even before you find it. Why?, Because if the issue is too bad, you will lose the credibility. Even if the issue is trivial, the customer will think that you haven't sorted out that simple issue in development phase and shipped the product. Also, once something is live the developers would have moved on to work on something else, It will take more time for them to switch gears to come back to fix the bugs.

How issue tracker will help you in this case?. When the product design starts, the team will list all the features. No programmer is perfect in this world. For every feature a programmer implements, there is a high chance that he will introduce a bug in it. So, as the project evolves, we have all the history of features, issues, discussions, decisions in a centralized place. When a new issue arises, It will be easier for the developer to look at the history and closely relate the issue with the feature or specific roll out. If there are no such records present but the project evolved with so many features, narrowing down an issue will be a serious blindfolded game for the developer (where the original blindfolded games have some fun involved).


## Yak shaving
![catching_issues_early](/assets/images/yak_shaving.gif)

Let that gif sink in for a moment...

Yak shaving: Yak shaving is programming lingo for the seemingly endless series of small tasks that have to be completed before the next step in a project can move forward.

One of the fundamental properties of software development is that, the way the time to complete a simple task seems to grow without bounds because to accomplish the goal you must complete a subgoal before you can complete the goal. But to complete the subgoal, you must complete yet another sub goal, recursively. When a developer is  in this recursive loop and suddenly gets stuck in the middle, she will not know whether to go back or forward. But if all the tasks and subtasks are listed in the issue tracker, the probability of getting stuck in this yak shaving loop is very less as the developer will know all the dependencies and can delegate some sub tasks to respective people who's names are clearly listed on the issue tracker along with their tasks.

When you are not tracking what you are doing, in such a situation you are likely to be questioned by your manager that why you took so much time to finish a simple task. But if you are tracking the tasks in an issue tracker, There will be a record of what you did to achieve the goal and it will make more sense to the manager just by seeing the dashboard.


## How issue tracker is different from todo list?

Todo list is a basic but good tool to keep your tasks organized. The tasks may be from picking up eggs while
returning from workplace to paying your bills within the due date. The two main states of the todo list is "to-do" and "done" which is good enough to keep track of ad-hoc tasks. But if you take the issues in a software project, its not as simple as todos because they usually involve in technical discussion, debates, suggestions and ultimately agreement of team members. All these cannot be done using those two states in todo list. The main feature of an issue tracker is its Review/Retest state.

When some developer marks an issue as done, he assumes that he has completed the work what he understood from the requirements. Trust me, his understanding of the requirements will not always be right. [Studies shows that 68% of the IT projects fails due to poor requirement analysis.](http://www.techrepublic.com/blog/tech-decision-maker/study-68-percent-of-it-projects-fail/) This is where one can leverage the "retest" state of the issue tracker, Once the developer finishes the task he can mark it as "to be reviewed" so that the people who reported the issue will review it. Because the person who encountered the issue is more likely to know more about it than the developer.       
Remember, the word "issue" here is not only bugs, it can be features, quick fixes, improvements etc.


## Why you should not use spreadsheets for project management?

And talking about spreadsheets?. I have seen people using spreadsheets for everything, like everything!

![spreadsheet_GOT](/assets/images/speradsheets_are_coming.jpg)    

> "Hey, we need to plan a sprint to finish the v1.2 of our product this week"     
> \**opens a spreadsheet*\*      
>
> "Hey, we need a product road map"     
> \**opens a spreadsheet*\*       
>
> "Hey, we have to plan for the party and list the items to get"     
> \**opens a spreadsheet*\*       
>
> "Hey.."        
> \**opens a spreadsheet*\*


Jokes apart. Spreadsheets are the worst tool to use for project management, especially a software project. Here's why.

### Spreadsheets lacks transparency
Nowadays mostly people adapted Google Sheets which can be used by many at the same time. You can argue that its far better than having a MS-excel and emailing it to the group every time someone touches it.
But still it lacks transparency, you will not know who entered the issue or asked that feature in a single glance unless you deep dive and search the revision history.      
I have been in meetings where I get to know that everyone is discussing about a list of tasks in a spreadsheet with my name on it for which I don't have permissions to view. Issue tracker won't work that way, when you are mentioning someone in a project, they have to be added to the project or should be a part of it already.

### Spreadsheets lacks clarity

| project   | task                     | priority | resource |
|-----------|--------------------------|----------|----------|
| Thornhill | Overlapping texts in listing page | High     | X    |

Here is an example spreadsheet where 'X' is assigned to complete a task. The task is "Overlapping text in listing page". Now, 'X' opens the listing page in her browser, It looks fine. She is trying to reproduce the issue here, Since there is no screenshot attached she was not even able to imagine the issue. Then she asks for the screenshot, it needs to be given to her in a separate channel of communication. She refers that screenshot and she has some more questions about it. All the conversation should happen in other channel where the issue lies in the spreadsheet, well unless we add a new "comments" column and maintain a thread of conversation in spreadsheet which will be difficult as well as ugly.

After few weeks, the same issue pops up. The manager points her to the above row in spreadsheet and says its not resolved properly. Now if she wants to refer the conversations and screenshots of the issue, she should start the hunt for it in all the mediums like email, google hangouts, IRC etc.       
This should be enough to justify the point: spreadsheets lacks clarity.

### Spreadsheets lacks communication
When a line in the spreadsheet is changed which will affect the task that some person is working on, that person needs to be notified manually. 
For example, the manager 'X' edits a task in the spreadsheet which the developer 'Y' is already working on, then 'X' should email 'Y' that he edited that, unless 'X' sits before that spreadsheet like a watchdog. So, It becomes a two step process, Of course most of the times people might forget the second step and end of the day they will just claim it has been changed or added to the spreadsheet. Where in issue tracker, It will let the concerned developer know about the change in the task by sending dedicated email or mobile notifications.

### Spreadsheets lacks collaboration 
As I already mentioned, every task in a software project involves in technical discussions, debates, decisions and agreement of the team members. Now where can we have these discussions in a spreadsheet?. Oh, come on, you can't say that we just need to add a column. Again how are we going to maintain conversation threads or how we notify others in the conversation. Even though if we add a column, How many times we will be adding a column to spread sheet and pretend ourselves to solve a problem with spreadsheet for which is not designed for?. If we are using different medium for this.

In future when someone wants to know why a decision was made to solve a specific issue or build a specific feature, in an issue tracker its just a click away. But in spreadsheets, well you know the hassle.

>When teams use legacy tools for something like project management, they invite in even more legacy problems.

-- There is a reason why new tools are invented and are adapted.


## You don't have to be a developer to use an issue tracker!
Yes, you heard me. You don't have to be a developer or a programmer or an engineer to use a simple issue tracker. Of course there will be some learning curve, new user interface but trust me its far better than using a spreadsheet and making your team and the company sink into a sea of silent pain.           
Even though you are a non-technical member, you are definitely the business expert. You can easily catch the bugs in business logic. You can help in testing the business logic and be an extra set of eyes for the code base/project apart from the developers.

In addition to that, developers should not be the only person to test their own modules, because there is a high chance that they would have misunderstood the requirements. If the developer's understanding of the requirements are wrong, his code will be wrong, ultimately how much ever time he tests his modules, it will always be wrong and he can never catch the problem. As a stake holder you will know all the requirements and business logic, so If you start following the issues closely in the issue tracker, after each bug fix or feature update you can do a quick test on that and make sure things won't get out of control.


## There is no such thing called, "Its too early for us to use an issue tracker"

>**Question** : How big of a team do you need to benefit from bug tracking software?       
>**Answer** : 1

The issue tracking system should be used from the very beginning. The type of the issues and their management will evolve with the team. For example when you are a team of two and trying to do a MVP, you will be loosely tracking a set of issues that affects the prototype's intended working or show stopper for the demo. But once the team grows and the products evolve, the more comprehensive and strategic project management can be done with all the milestone releases using the successful issue trackers available in market like [JIRA](https://www.atlassian.com/software/jira).

![jira_tweet](/assets/images/jira_tweet.png)

## After all this still why some companies don't adopt issue trackers and still use spreadsheets?

The [technology acceptance model](https://en.wikipedia.org/wiki/Technology_acceptance_model) says that the two main factors that determine the adoption of a tech is: 
* **Perceived usefulness (PU)** – The degree to which a person believes that using a particular system would enhance his or her job performance.     
* **Perceived ease-of-use (PEOU)** – The degree to which a person believes that using a particular system would be free from effort.

The perception of the ease of use of spreadsheets is almost an illusion. It is easy to get an answer from a spreadsheet, however, it is not necessarily easy to get the right answer. The difficulties of using alternatives to spreadsheets is overestimated by many people. The real features that will help in performance can give the appearance of difficulty. 
The difficult way looks easy and easy way looks difficult.

So, are you going to dump the notepad or spreadsheet and going to invest on a good issue tracker?, Let me know in the comments how you convinced your team to use an issue tracker.
