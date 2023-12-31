---
title: "Atomic Commits, and how they can help"
tags: git code-review processes productivity atomic-commit pull-request merge-reguest
---

In this post I will be talking about Atomic Commits and how they can result in writing better code and
improved quality and efficacy of the PR review process.
This is based on a proposal I wrote when working at CareLineLive.

## The problem
It’s a recurring joke (or is it?) in the developing community that if you review 10 lines of code you will find 10 issues,
but review 500 and everything is fine. I get it, too much code is too much code, we lose focus, we get tired, we just want
to finish the review. There is also the [Law of triviality](https://en.wikipedia.org/wiki/Law_of_triviality) to consider,
although that’s a subject for another time perhaps.

Having big Pull Requests, with a lot of files changed, makes it harder to review them.
It can also be very difficult, for a reviewer, to get a general sense of what, how and why something has been changed.
The Jira ticket (other issue tracking systems are available) and the PR summary can help, but we developers do tend to
not take too much care on either of those, let's be honest.

This can result in a review which is rushed and not as in-depth as one would like, simply because there is too much.

##  The solution: Atomic Commits
Wikipedia has a great explanation for what an [atomic commit](https://en.wikipedia.org/wiki/Atomic_commit%23Atomic_commit_convention)
is in this context. What we want to achieve is a series of small, contained, ordered commits:
- small so that they can easily reviewed
- contained so that we know they touch one and only one part of the system
- ordered so that they don’t rely on future commits.

By “rely on future commits” we mean that the application as a whole must be working at any commit.
Therefore, if one commit relies on something that has been committed later, at that point the application would
not work, and therefore the commits break our requirement of “ordered commits”.

As a high-level example, let’s consider adding a new API for a resource to a Laravel application.
There are a few things that needs done: migrations, model and factory, controller, routes, permissions, etc.

The first thing to do is the migration. This can be your first commit. Then come the model and the factory.
These could go into separate commits, but they are tightly related and usually quite small, so they could even
go in the same commit as the migration.

Now, the controller has a few “dependencies”: it needs permissions, maybe a couple of form requests, or a job.
So we would not work on the controller until those other things have been done.

Permissions seems to be the first logical things to add next, the form requests and the jobs
if any, and then finally the controller.
Routes should probably be the last, as that is what would make our API available, so everything must have been set
up and working at this point.

The git history may then look something like the following:

```
82957de4 Add routes for /api/v1/cars
2058d849 Add CarsController
63d8348e Add MakeCar job
ce45ead6 Add CreateCarRequest and UpdateCarRequest
1940fca4 Add permissions for Car resource
ae8f2248 Add Car model and factory
8295ed92 Add migration for Car resource
```

Some of this is left to the developer’s judgement. As I said the migration, model and factory could go in the same
commit, and so does the query builder if necessary. The key thing to remember is to keep a commit small and contained, 
and have them in order of dependencies.

## How do atomic commits help?
As I said there are three main properties of an atomic commit: small, contained and ordered.

Small commits reduce the amount of code to review, which speeds up the review and improve its quality.

Contained commits allow the reviewer to focus on that specific, well defined goal, achieved by the commit, 
which makes it easier for them to understand the context and evaluate the changes, again improving 
the quality of the review.

But the commits are also ordered, with one commit only depending on the changes from previous commits. 
This allows the reviewer to stop at any time if they think it’s necessary.

But in my opinion adopting atomic commits will also help teams producing better code. By having contained 
commits we can produce better tests, as we are focusing our attention on one piece of functionality at a time. 
And by having ordered commits, we will be forced to think about how to organise the code and how it interacts 
with itself and the rest of the application.

## Considerations
If you're not using atomic commits yet, this would be a huge change for you. You are probably used to commit multiple
times, sometimes just to correct mistakes you made, with commit messages that are practically irrelevant now.

I am convinced, however, that any team will benefit enormously from this strategy in the long run. 
You will introduce fewer bugs because code reviews will be more accurate. 
And you will have better code because during development you will be forced to actively think how to organise it.

So, let's consider some of the challenged that you and you team will face and how to overcome them.

### Commit messages
Commit messages are now extremely important as they must clearly convey what the changes are about. 
Having small commits should help with this, as there is less to describe. So no more “quick fix” or “WIP”.

We should also take advantage of the fact that commit messages can be on multiple lines. 
I suggest having the first line for a short description of what the commit is about and then more lines for a 
more in-depth explanation. Just don’t get overboard and write an essay, two or three lines are enough.

```
Add MakeCar job

This job is responsabile for creating a Car record.
```

### Refactor is your friend
Having atomic commits is actually only important before submitting the PR for review. 
What I mean is that you are still free to commit however you like, but you must make sure all commits are atomic 
before sending the PR up for review. Obviously it’s easier if you try and use atomic commits from the start, but
it's not unusual to forgot to change something in a file which should have been done in a previous commit.

To reorganise your commits you will have to get familiar with `git rebase`. 
This command allows you to reordered the commits, squash two or more together, and even edit a commit to change
what is actually committed. It is quite a powerful command, but it’s not that hard to master.

### Cosmetic changes
Sometimes you need to refactor some files just for cosmetic changes, like formatting, 
or adding return types. These changes should all be in a separate atomic commit, so that they don’t “pollute” 
the other changes and the reviewer can safely skip the entire commit (if allowed).

It may seem this does not matter that much, but these are the type of changes that can really make a code 
review more difficult. If these changes are part of other commits we need to navigate through them to find 
the ones that are not cosmetic, which takes effort and time, and we’re likely to miss some.

### Code Review
It’s important that code reviewers are not afraid to send back a PR because it doesn’t use atomic commits,
or they are not correct, even before they looks at the code.

For example, if some formatting has been committed with code changes, the PR should be rejected and the developer 
should extract those formatting and putting them in its own commit (or add it to another cosmetic commit).

Or if in a commit we start using a class that will be added in a later commit, the PR should, again, be rejected 
and the developer should reorder the commits.

At the beginning it will feel odd and maybe petty to reject a PR for those reasons, but you need to remember that 
this is a process. It will happen more often at the beginning because you are not used to it, but it will soon become 
second nature and the development and code review processes will become faster, smoother and more accurate.

## Moving to atomic commit
As I said this is a big change for any team. To help transitioning to atomic commits your team could start small
to get used to the process before applying it to all your work.

For example, you could designate a Jira ticket as “atomic” somehow, maybe the ones that your team envisage would be small. 
This will let the developer and the code reviewer know that atomic commit must be used for that ticket.

After everybody in your team is comfortable with atomic commits, using `git rebase` and reviewing atomic PRs,
then you can think of either expanding the number of Jira ticket to be “atomic” or just move to it across the board.
