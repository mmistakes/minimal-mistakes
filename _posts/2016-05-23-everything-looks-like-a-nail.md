---
title: "Everything looks like a nail"
excerpt: "Everything looks like a nail"
layout: single
comments: true
categories:
  - Blog
tags:
  - recruitment
  - microservices
  - development
header:
  overlay_image: /assets/images/hammer.jpg
  overlay_filter: 0.25 # same as adding an opacity of 0.5 to a black background
  caption: "Everything looks like a nail"
  teaser: /assets/images/hammer.jpg
---

I have been involved in recruiting for technical positions for over 20 years for various organisations, also as a consultant and independent contractor I have been on the other side of the fence as an applicant to countless roles in different organisations.  Given this experience I want to briefly talk about one of the strongest anti-patterns I see in recruiting for technical roles - narrow overly-focused job specifications.

Specifying a long list of acronyms and insisting on laser focussed previous experience seems like a good way to pre-filter applicants to get exactly what you want but its a really poor way of finding the employee you actually need.

We have all seen long lists of mandatory acronyms in job specifications. Frequently organisations delegate the narrowing of the candidate pool to non technical staff or recruiters based on this list. This seems like a good way to reduce the time the hiring manager has to take to review candidates.

However, this technique often has unintended consequences. For example, I recently saw a job specification where the organisation was looking for very specific knowledge and experience of implementing microservices in a very specific technology using specific libraries and frameworks. They were recruiting for a green field project and had no team in place so were looking to find initial team leads and seniors to build the teams around. Given this they had outsourced the technical selection process to an existing technical partner (which if not carefully managed can also be a different anti-pattern but I'll leave that for another post).

## All this superficially seems to be a sensible choice.##
**However, lets look at what the consequences of this kind of laser focus may be.**

This very specific list of technologies means a lot of excellent candidates with relevant experience in different technologies may not even bother to apply. Microservices are a relatively new approach and the particular laser focus taken by this organisation without considering wider experiences means they are likely to restrict their candidate pool to people who have very specific experience but may not have seen or had experience of different approaches. This tight focus is fine for recruiting one specialist having proved that you need the depth of experience and knowledge in that area. However, this focus was being applied to the whole team (two teams actually) which means a team full of people with the same very narrow experiences and skills.

All of this may not seem that dangerous but let's look at the underlying assumption this strategy is built on: The solution is microservices specifically using RESTful synchonous HTTP calls.

## Really? How do you know? ##

Until you've actually built something and released it into the wild you don't really know whether the solution is correct or even if you are solving the right problem. Microservices are certainly a pattern that can facilitate continuous deployment but CD is not what they are recuiting for (and there are other techniques to achieve this that can be used instead of, or to complement, microservices).

Even assuming most of the solution to the problem (and they are not even discussing what the problem is in this process) is microservices it won't be the solution for every aspect of the problem. The microservice architectural pattern is a useful tool in the development toolbox but it's just one of the many tools needed to solve a problem. In and of themselves, microservices are just one approach to distributing a system but they don't actually solve any business problems.

Also microservices introduce a large amount of complexity around distributed systems concerns. It may be that this organisation needs to scale out horizontally to the extent that requires taking on this cognitive load but they have accepted this cost without 'testing' that paying this price was necessary. Even if this is a problem that requires the level of horizontal scalability and finely granular services and the price of coordination or choreography of microservices, this can be accomplished in ways other than HTTP and REST

Let's assume for a moment that not everything in the problem space required microservices or that the pattern is not suitable. Will a team of laser focused microservices 'experts' even recognise this?

Looking further ahead, if you are recruiting permanent staff, what are you going to do with the team when you have a different problem to solve? Make them redundant and recruit again, retrain them?

I always recruit for a balanced team with different levels of experience and skills. I want people who have the aptitude and attitude to learn new skills and technologies, and if they're senior a track record of having experience in more than one language and/or technology stack to call upon. I also want social, gender and racial diversity if at all possible.

This way I am more likely to end up with a team that, when faced with a roadblock, can suggest an alternative way around, under or over it.

>What I definitely don't want is a team that is a super effective 'hammer' that sees every problem as a 'nail'.
