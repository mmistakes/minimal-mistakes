---
title: "Design for change (part 4) [draft title - need something better]"
excerpt: "Behaviour first- Data first class"
layout: single
comments: true
---

I spent a large part of my early career working in a UK Government department solving a number of problems over a
decade. This is a fairly unusual state of affairs in modern software developers career's as it's not common to stay with
the same organisation or even the same problem domain for a prolonged period of time. However, this did give me the
opportunity to observe the effect of design choices on the evolution of a system and it's ability to respond to
change. I also got to see several of these systems rewritten in an attempt to resolve issues with early designs, often
introducing new problems.

One of the systems I worked on had to process 60-70 million items of data per month that related to actions taken by
over a hundred thousand professionals contracted to work for the government department. These individuals worked in
small organisations that themselves were managed by a larger local regional organisation and so on through several layers of
management to National level for England and Wales. There were a number of reporting requirements that involved issuing,
monthly, quarterly and rolling yearly reports summarising the transactions produced.

The first incarnation of this system worked well enough but we had a few issues around code reuse we wanted to solve.

One of the issues we tried to solve in a rewrite of this system was that changes in government legislation and senior
personnel meant changes in the way the transactional data was reported on. In order to try and cope with this changing
landscape we designed a very abstract data model.

Although this meant that the data model's structure almost never had to change due to the changes in the organisation of
the government department it meant that there was a very complex set of rules in the code to interpret this abstract
data model. This meant that the initial system took considerably longer than expected to write in the first place, was
quite hard to test and took a lot of time for new programmers to get their heads around when they first started on the
system.

Also a lot of the more complex queries required to piece together a business view from the abstract data were very
expensive and took many minutes or even hours to run. Although this wasn't a showstopping problem at the time as, in the
early 1990's nothing was reported online and the highest frequency of these report was monthly, it did mean that the
batch processing window got tighter over time as the data grew.

TODO elaborate on why this early abstraction of data model was an issue- complex code that had to change, etc.
TODO site examples around configuration? Rules engine approach in JPMC?


Don't fix things too early..

* sub-optimisation.
* OOP tends to concrete ideas early.
* trad. data modelling - static perspective of data that may or may not be relevant to the context of the problem
* static view of system - for example class diagrams and ERD's

model messages instead

* data fixed only at edges of system
* expressive way of sharing data vocabulary across components -Spec / Schema
* Dynamic (behavioural) modelling first - DFD's, Communication Diagrams, Sequence Diagrams, State Transition Diagrams

Model messages flowing around the system. Each system node in the graph becomes a component in the system. Each
component needs to be responsible for one type of transformation or enrichment. This is how you decide about what
components do what. The next decision is what type of communication is required between components, synchronous or
asynchronous

Push decisions about data models to the edges of the components as much as possible.

Model messages not the static data structure of the 'objects' in the system.  Maintain raw message formats in system to
allow retrospective design decisions to be applied.

* event sourcing

Use localised transformations to more optimal formats

* local data stores
* local message formats

Can still have canonical message formats for to localise validation and data cleansing if the 'system' of co-operating
components is in the same domain (DDD?).

Every decision to optimise for common code fixes design decisions so be careful around lossy message formats.

If each component in the system has it's own clear responsibilities then, generally, it will have it's own data format
and it's own rules around validation etc. Therefore, you need to decide how much benefit can be gained by centralising
design decisions around data model[^1]?

Versioning - accrete data but don't make breaking changes. Maintain old formats.[^2]

When data is at rest it should be the native message from the origin or scoped to the subsystem or component if
different for reasons such as optimisation and enrichment.[^3]

# TODO - finish this and decide where it goes in the order of posts?  #

In my previous post [TODO ref here] I talked about some of the costs of codifying design decisions too early. In this
post I'm going to discuss what I believe are the reasons that architectures lose their way and some of the approaches
that might be taken to mitigate this damage.

I apologise that this post has little to do with the Functional Programming part of the title but I feel it important to
set the context before delving into the specifics of what an understanding of functional programming can bring to the
evolution of system designs.

The agile 'movement' in the mid to late 90's was, in part, a reaction to this very issue. Agile methodologies differ in
execution and ceremony but they tend to share some key characteristics. I would argue that primary amongst these
characteristics is 'inspect and adapt'. Inspect and adapt is most often thought of in the context of the processes used
to write software (i.e. the application of the methodologies themselves) but can, and should, be applied equally to the
technical deliverables.

There are many discussions on the internet and in books about evolving architecture rather than employing 'big design up
front' (BDUF). I've always struggled with exactly how to 'evolve' an architecture once a system is out in the wild. All
to often systems are changed in reaction to new features and demands with very little time to reevaluate whether the
existing architecture is appropriate let alone how it may need to change.

I don't claim to have all the answers but like most problems in software I think the answer lies in effective
communication amongst the team(s) involved and always asking one question when making any change.

In order to make effective changes to software architecture we need to first understand the current architecture.

I believe this is where most organisations (especially large organisations) go wrong. Any change to existing software,
even a minor one, has several side effects. Any change has an impact on either the behaviour of the system or an impact
on the cognitive load on any developer trying to understand the system, or most often, both these effects.

In most cases we focus predominantly on the changes impact on the existing behaviour. Sometimes, like when we are
carrying out a deliberate 're-factoring' exercise, we focus on the cognitive load of a future developer (possibly our
future self).

Good development teams do apply a number of disciplines to attempt to keep this future cognitive load to a minimum
through peer review, pair programming, the application of programming style guides[^4], etc. Although these disciplines
are incredibly useful they are predicated on something I frequently find is missing, a shared understanding of the
architecture, it's principles, approaches and trade offs. All too often this overall view of the system is either
jealously guarded by the 'ivory tower' architecture team (as if it were some arcane power held over the lowly developers)
or this overview is fragmented and held in the heads of a number of key individuals but never made explicit or
coherent.

How often have you been through a code review that focused on the stylistic patterns to apply to the code rather than a
discussion of the design choices and the impact of those choices on existing elements of the system or future changes?

So how do we share a common understanding of the system architecture? I'm not going to get into a discussion of
design notations, different types of models etc. as there are reams of literature on these subjects.

In my opinion, the key ingredients are a notation or diagramming approach that has few elements and preferably a key to
enable those not familiar with the notation to understand it. Use whatever notation you want as long as it's well
understood and unambiguous.

The real reason for using a notation or diagram of any sort to express systems architecture is to communicate shared
understanding so that every developer can see the impact of each code change on the overall system.

I find the things I want to see in any design boil down to just a few key points:
1. What are the major components of the system and what are their responsibilities?
2. What are the dependencies between the components?
3. What messages (data) flows between these components?
4. What is the ordering of any message flows plus any critical timing constraints?

If you examine this list from the perspective of functional programming you will see that these points look familiar. I
think about the major components (whether they be internal layers or vertical slices through a monolith or microservices
or anything in between) as if they were functions that accepts messages as input and either return messages as output or
carry out some side effect action.

You may also notice that there are elements of static structure, data and behaviour in this list. Most importantly, from
this information it should be possible to derive the high level flow of information around the system.

Given a shared understanding of this high level picture every developer should ask themselves the following questions
when making even the smallest changes.
+ Which component/service/namespace/package/etc. is responsible for dealing with the required new behaviour/data or change in
existing behaviour/data?
+ If the answer is not immediately obvious then ask if the behaviour/data is new to the architecture and should be
allocated to an existing component or requires a new component?

The answers to these questions may be quite complex, are definitely routed in the context of the problems the system is
trying to solve and even a small change might actually end up in a new component which needs the collective agreement
and understanding of the whole team, or even the creation of a new team to build and manage. Although the result of
asking these questions can be far ranging, the questions themselves are fairly simple to ask.




[^1]: [TODO] investigate graphQL/falcor/datalog as an option to delay design decisions to the point in the architecture
where they are needed. For example, using a query 'pull' syntax means the decisions about what to data to render in
a UI can be made in the client responsible for the UI without requesting all the data and then filtering locally.

[^2]: [TODO] Reference Rich Hickey's speculation keynote

[^3]: [TODO] Elaborate on this around each component or service having it's own data store if required.

[^4]: Personally I find the dogmatic application of style guides to be of limited value and often a distraction. My
approach to this is to favour the application of the most common stylistic approach for the language based on either the
style guide of the recognised stewards of the language or the most common libraries. I try and keep the rules to a
minimum with particular emphasis on choosing descriptive names relevant to the context. I especially find approaches
that introduce dogmatic naming conventions for variables, etc. (e.g. Hungarian notation) to be a distraction rather than
a help.
