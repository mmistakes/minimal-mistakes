---
title: "Software by Design in a Functional Programming World"
excerpt: "Behaviour first- Data first class"
layout: single
comments: true
header:
  overlay_image: /chameleon-827517_960_720.jpg
  overlay_filter: 0.25 # same as adding an opacity of 0.5 to a black background
  caption: "Design for change"
  teaser: /chameleon-827517_960_720.jpg
---

This blog is the first in what may become a series around how I approach software architecture and design. First though
a slight detour into why I am writing this blog series.

I have been designing software components, systems, applications and libraries for over 25 years. In that time I've
helped deliver and maintain dozens of systems, most have delivered value for businesses, a few with great success, many
with mixed results. Several projects I've worked on never made it to production and were cancelled.

I've made many good decisions, and twice as many mistakes, that I hope I've learned from.

I do not claim to be the best architect or developer but "I've been around a long time, been there, seen that got the
t-shirt". There is code I wrote 25 years ago still running in production.

Over the last six years I've been learning and practising functional programming (FP). This is not the first time in my
career that I've reinvented myself. I spent the first few years of my professional life as a procedural programmer and then
decided to learn Object-Oriented Programming (OOP) but I saw some advantages in FP for the kinds of problems I've spent
all my career working with. Namely, manipulating, analysing and displaying data, whether this takes the form of reporting on
millions of doctor's prescription items per month, displaying data flowing through a medical laboratory, settling equity
trades or displaying products and taking orders in an e-commerce system. I will talk about why I feel functional
programming is a good paradigm for dealing with these problems in later blogs.

I've adopted and practised many techniques over the years to help design and architect software: Jackson Structured
Programming, Data Flow Diagrams, Entity Relationship Diagrams, Booch Object-Oriented Design, Jacobson Use Cases, UML
along with various ad-hoc approaches and diagramming styles.

Some of the techniques used in architecture or design at the system and component level are applicable regardless of the
programming style but those that model the internals of components and systems are more appropriate for OO than FP.

I've been talking to various friends in the FP community about how to approach design in a functional programming
world. I agree with some things they suggest and have a different take on others.

This blog series will explore my opinions and approaches to architecture and design, particularly with regard to
Functional Programming. I will discuss what works for me and where I think I need to do better. YMMV.

## Death, taxes.... and change ##

> In this world nothing can be said to be certain except death and taxes - Benjamin Franklin

In all my time in software development the only constant I've found is "change".

Architectural approaches are like fashion. They come and go, often reappearing in cycles with each reincarnation being a
different take on the earlier version.

If we look at systems architecture for distributed systems for example we can identify at least two major fashion
trends: 'the synchronous movement' and 'the asynchronous genre'.

Examples of the synchronous movement include: RPC, CORBA, SOA, microservices...

The asynchronous genre includes: message queues, event driven architecture, event sourcing, distributed queues, web
sockets...

In persistence we've had flat files, hierarchical databases, relational databases, NoSQL (many of which behave like flat
files e.g. Kafka or like Directed Acyclic Graphs - hierarchical db's & graph db's or like hash maps - like key-value
stores).

So architectural approaches come in cycles and we are currently flipping back and forth from a predominantly
synchronous microservices style to a predominantly asynchronous event sourcing style.

### So why are we constantly reinventing architecture? ###

Because we are constantly reacting to changes in the way businesses work and the technical environments we are dealing
with are changing.

The rate at which businesses are reacting and changing...pivoting... is accelerating, the number of delivery channels to
customers is growing exponentially. the technological platforms underlying those channels are changing even faster.

The only thing we, as technologists, can rely on is that the environment and objectives we are making decisions based on
today will not be relevant in a few years, months or even weeks.

I frequently read books and articles from senior figures in the industry that talk about tweaks and designs for
performance, security, throughput, resilience etc. All of these concerns are very important. However, if the volume of
data we are dealing with goes up or down, or the security concerns differ because of changes in the business or
technical environment then we need different techniques or decisions.

So the very first thing we should design for and the one thing we should keep in mind during every design decision is we
need to react to change.

We should optimise for change above all else.

**Why**? Because it's the only constant.

For example, if we design for performance above all else, the design might be based on assumptions around data volumes
increasing at a certain rate but if they then increase at a different rate we need to react.

## There are three things that matter in software design: defer, defer, defer... ##

Every design decision we make gets encoded in our software. Every time we decide something it ends up having an impact
on the code. Every decision embedded in that software is a decision we have to live with and maintain.

If the basis for a decision proves inaccurate or changes then there is a cost in changing the software to reflect the
new reality.

Because of this cost we need to make sure that the basis for every design decision is as good as it can be when we make
it. We also want to keep the number of design decisions we codify as small as we can and isolate their impact as much as
possible. Because we know that even if that decision is correct right now...it won't stay that way.

This means we need to defer design decisions to as late as possible...

* in the timeline of development
* and in the design itself

I have written a lot over the years about deferring decisions in the timeline of development in the form of agile and
lean development and I won't cover that ground again here.

This blog series will concentrate on techniques to defer decisions in the design itself. starting with what that
actually means.
