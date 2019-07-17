---
title: "To Do Damage (TDD)"
excerpt: "TDD is one tool... Like all good tools, it has sharp edges and if you misuse it, it can cut you that's not a reason to leave it in the toolbox."
layout: single
comments: true
categories:
  - Blog
tags:
  - Test Driven Development
  - testing
  - development
header:
  overlay_image: /assets/images/explosion-123690__340.jpg
  overlay_filter: 0.25 # same as adding an opacity of 0.5 to a black background
  caption: "To Do Damage"
  teaser: /assets/images/explosion-123690__340.jpg
---

# To Do Damage? (TDD) #

My last post
([TDD - That's Design Done](http://devcycle.co.uk/TDD-Thats-Design-Done/))
took a light hearted look at the pro's and con's of Test Driven
Development done. This post challenges the politics around TDD.

## Test Driven Damage ##

I hear a lot of valid arguments from a lot of people more
knowledgeable and intelligent than me that TDD can introduce some very
undesirable collateral damage to a code base.

I mentioned a number of these impacts in my previous post but to
recap and summarise more:

* unnecessary abstractions there to support 'mocking'
* unnecessary 'layering' or artificial code organisation to support
  'mocking'
* false positives from mocks that just echo design assumptions rather
  than testing 'real' design
* large amounts of re-factoring of tests required when changes are
  needed
* focus on details at 'unit' level distracting from potentially
  different solutions at the 'macro' level

I argued that most of this can be mitigated by not focusing solely on
TDD in the micro (unit) level but lifting your head from the tests in
front of you and also writing tests and designs that focus on large
granularity like packages/namespaces, modules/components,
sub-systems/services, systems/applications.

Another argument I hear drags TDD into the dynamic vs static
typing discussions by suggesting that TDD is a substitute for static
type systems. This is a distraction in my opinion as testing
(regardless of whether it's TDD or not) has a different objective to
typing. Types qualify, document and codify the concepts chosen by the
developers in solving a problem. Testing at various levels can
certainly do some of that to different degrees but fundamentally is
about verifying that the code solves the problem in hand and has
little to say about the qualities of the concepts chosen.

For example, I can write some code that passes all tests but this
doesn't give any indication of the maintainability, readability or any
other measurement of the appropriateness of the code solving these
tests.

# Totally Distributed Damage #

I think the developers who argue that TDD can induce damage have a
very valid point. However, I think they live in a different world from
most of my career. They tend to work in small to medium sized
organisations. They work in companies that care and value
software. They work with developers who have a passion and value their
code.

Most of my career has been spent in completely different
environments.

I've spent most of my 28 years in companies and organisations that see
'IT' as a necessary evil. The IT department is a support department, a
cost centre, a non value generating drain on the 'real' business. It
should be outsourced to the lowest bidder. Software developers are
commodities to be exchanged. Get rid of your expensive co-located in
house developers and bring in hoards of cheaper off shore
developers. Give the task of writing systems to support the business
to a 'systems integrator' and give them the problem of managing these
awkward to deal with programmers.

In a later post I'll challenge some of these assumptions but for now
put yourself in the mind set of these businesses.

Given this environment what I have to deal with is:

* Many projects running on the same code base concurrently
* Large distributed teams, often many teams on the same project
* Developers in a different location from testers and management, let
  alone the people with domain knowledge
* Teams of junior and inexperienced developers often writing code on
  code bases they've not worked on before
* A ratio of one senior developer to every 20 junior/inexperienced
  developer to keep down costs
* Testers with little or no business knowledge and limited access to
  domain experts
* Developers who have never been trained or shown how to write a test
  (automated or otherwise) and have no knowledge of test frameworks

Given this environment TDD looks a whole lot different.

## To Do-list Design ##

The environment I've described above tends to lead to a number of
behaviours:

* design documents written as pseudo code by the one senior developer
as a set of detailed actions to follow by the junior developers
* no latitude or flexibility in implementation
* cut and paste coding
* a propensity to make the smallest change to get the code working
regardless of it's impact on the design (an anathema to re-factoring)
* no automated testing
* limited manual testing carried out by independent test teams to a
  script

If you work in a team of skilled professional developers in an
organisation that values it's software as it's primary revenue
generating mechanism, firstly, lucky you, secondly, the list above may
seem mad.

However, if you're a company selling outsourced IT this makes
sense. All the above are driven by your need to reduce costs 'year on
year' driven by your client while delivering more and more demands.

Generally the measures the client applies to you are:

1. Deliver x requirements by y
2. Provide n developers for z cost

So this drives you to firstly deliver and secondly reduce cost per
head. Given this you end up placing your most junior developers at a
high ratio of juniors to seniors to reduce costs. You devise tailored
training programmes to teach only the skills for that particular
client, and as quickly as possible, then recruit people with no
experience as they are cheaper.

Given this what the client ends up with is a team that has
never seen code except the code it's working with right now. If that
code has evolved in this environment over several years then anyone
who had some idea of the design concepts and constraints has probably
moved on and the team has no perspective on what these may have been.

This boils down to the developers working on a 'big ball of mud'. In
addition they don't know what good code looks like, they don't know
what tests look like. They have no historical perspective of the
systems aims or design, as the test scripts and designs that do exist
have no justification or reasoning about why the code is as it is.

Also the 'design' will be a series of steps to change the code from
it's previous state to it's new state rather than an actual coherent design.

## Tests Develop Discipline ##

In an environment like that described above then training your teams to
use TDD and enforcing it's use initially gives you a number of things:

* Developers learn what tests are
* Although their tests may not be great quality they at least
  capture the behaviour of the code
* Code gets written to be at least minimally testable (this
  inherently makes each method/function smaller and reduces it's
  responsibilities)
* Although developers may still not know what good code looks like,
  writing tests and using these as a vehicle for communication
  means a senior developer, who does know, can start to teach
* Focusing design on what conditions need to be tested gives some
  minimal context if only in the micro
* Developers are educated that there are techniques to
  software development other than just syntax and cut and paste
  coding
* Developers who don't have even minimal potential to learn new
  techniques are identified and can be re-trained or 'weeded out'
* Developers learn discipline

# Teach Development Dialect #

Given the starting point I'm frequently faced with I will take all the
'higher' level problems strong opponents of TDD argue occur. In an
environment I describe the management and developers don't even have
the vocabulary to discuss these Test Driven Damage problems, let alone
understand why they should care.

I'd rather use TDD religiously and accept some of it's faults until
I've educated the organisation enough to have a sensible conversation
about what to do about those problems than live with the kinds of issues I've
described.

When I've introduced TDD into these kind of organisations as part of a
number of other measures my objective has been to teach the
organisation that:

* in most cases your software is generating value and often your
  primary mechanism of customer growth and retention
* your poor code base is costing you real money
* cheap development resources are usually a false economy
* you need to measure the 'value' of the software not just it's 'cost'
* good tests and design are rarely wasted effort
* focus on good development disciplines actually improves productivity

TDD is one tool in this education process. It's not without it's
issues. Like all good tools, it has sharp edges and if you misuse
it, it can cut you but that's not a reason to leave it in the toolbox.
