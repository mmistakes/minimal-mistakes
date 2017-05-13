---
title: "Design for change (part 3) [draft title - need something better]"
excerpt: "Behaviour first- Data first class"
layout: single
comments: true
---

# Design for Change #


So far in these blogs I have not mentioned where programming paradigms fit. There is a reason that imperative
programming versus declarative programming or functional programming vs object oriented programming have not entered the
discussion. These paradigms are about ways of writing code and not about how to determine what components make up a
system or how to structure them. However, that's not to say that there are not lessons that can be learned from
examining these paradigms and applying some of the techniques used to the larger problems at a system level. During this
post you will see me draw some parallels.

## How to design for change? ##

As with most things in software there's no single, definitive answer to this question. However, I think that there are a
number of techniques that can be adopted to help identify where to 'cleave' a system into separate components and how
to minimise the inertia introduced by the adoption of an abstraction.

I mentioned earlier that focusing on the model of the static elements of data as a data or object model in isolation
can lead to focusing on the wrong abstraction.

One technique I use to avoid this issue is rather than modelling the static view of the data, model the dynamic flow of
the data through the system. Think about what events are raised and the actors that raise them? What transformations and
enrichment has to happen to a piece of data in order for it to result in the required response or the required end
state?

If you model the message or event flows this tends to lead to what are the major components within the system. Thinking
about the timing of the event flows will lead to a discussion of whether the components you are modelling are able to
communicate synchronously or asynchronously.

Each of these messages can be thought of as a piece of immutable data that is either the input to or output from a
component of the system.

If you model the external events as messages that get enhanced to produce a new message then you can think about what
additional information is required at each step to create the enhanced message. This process will drive out the
components and the key responsibilities of each. It should also lead to the discovery of other external interfaces
required by each component and suggest local optimisation's such as a data store.

If you model a message, every point at which the message needs to be transformed into a new message becomes a potential
component. It will frequently be the case that in order to transform the message additional information and some kind of
external trigger is required. Thinking about whether this new information or new trigger should be the responsibility of
an existing component or a new one is the way that you can decide whether the current model of the architecture is
sufficient or requires change.

By taking this approach databases and other data stores become localised optimisation's. As such the static structure of
data and, by extension, the static models of the data in the software (schemas, object models, etc.) can be determined
by modelling the transformations and enhancements of the messages carried out by that particular component of the
system.

Keeping in mind this view of the component as transformer/enhancer of messages each major component in the system can be
seen as analogous to a huge 'function' in a functional program. Something that takes in immutable data as input and
returns the expected (immutable) output.

If the component needs multiple inputs from different sources these can be modelled as multiple messages to multiple
functions. It is idealistic and unrealistic to imagine that the inputs to each component will arrive reliably and at
exactly the moment required to carry out the job but dealing with these tricky details is, again, a localised
optimisation.

It's also worth pointing out that 'components' in this context are not necessarily separate deployment units with
remote network calls. They can be 'packages', 'modules' or high level 'namespaces' within a larger deployment unit. In
fact, there is a good argument to be made for keeping these components in the same deployment unit until it's recognised
that either their responsibilities, timing, semantics or non functional concerns are different enough to warrant this
level of separation.

## Databases are localised optimisation ##

It may seem strange, especially to the developer used to standard 2 or 3 tier architectures, to think about a database
as a localised optimisation as typically a database forms the beating heart of a system rather than a mere
implementation detail.

However, thinking in this way can be quite liberating to the software architect. Imagine an ideal system which has an
unlimited amount of memory and processing power and never loses data due to downtime. In this idealised system a
secondary persistent data store becomes unnecessary. Why have a data store if you readily have your data to hand in
memory.

If the persistence of data is taken out of the equation for a while you are liberated from modelling data `at rest` and,
as I've already discussed, modelling data at rest can lead to strong data coupling of components and the overloading of
responsibilities on a single component. The danger is that the database becomes a 'catch all' for every piece of data
because it's convenient. The database is always there and always on so why not use it to store this and that?

There's nothing inherently wrong with modelling data `at rest`, in fact it's a valuable technique, but frequently it
becomes the single minded focus of the system designer. This leads to some of the early optimisation's that I've talked
about in earlier posts - the early imposition of canonical data models being primary amongst them.

So, how exactly do you design a system without considering a data store as a starting point?

It comes back to modelling the 'flow of data' rather than modelling the data as a detached separate concept. If we look
at the messages that are required for a system to carry out it's requirements we can model several things.

### Message Content ###

The easiest and most obvious thing to model with regard to the messages in a system is the actual message
content. However, this is the last thing I tend to focus on as concentrating on the detail of the data required leads to
a focus on the data without context to the problem. I've found this often leads me to start modelling details about the
entities that are not relevant.

As a naive example, if I assume I need information about a college student in my system I might start modelling the courses
they are taking and that might lead me to model their lecture times and teachers. However, if the system is only
required to manage the students course fees most of this information is irrelevant to the problem. Although in this
simple example that is obvious I've seen much more subtle assumptions creep into data modelling that have not only led
to the capture, storage and maintenance of redundant data but the inclusion of this data has led to the development of
redundant business processes and the code to support them. This often happens over time in small increments and, like
the apocryphal story of how to boil a frog, is never noticed.

### Message Source ###

Identifying the source of a message in a system is key. Especially if the source is external.

[TODO] - example diagrams modelling message flow in a system.

Thinking about the source of the message helps identify some major architectural characteristics.

1. Timing - when and what triggers the message?
2. Sensitivity to latency of response - is it critical that the response (if there is one) is received immediately or
   can the source continue as long as the response is received in a 'timely' manner (how long is timely).
3. Frequency - how often is message sent?
4. Volume - how much data is it likely to encompass?
5. Internal/External to the system context - is this source something you need to design/implement?
6. Responsibilities - what is the 'source' of the data responsible for and what is it expecting the 'target' to be
   responsible for?

### Message Target ###

This is the mirror of examining the source of the message but looking at the message flow in the opposite direction can
give different insights into the same points as examining the message source. I find that examining the message target
is particularly useful for clarifying the latency, timing and responsibilities. If you deliberately think about the
source's expectations around latency, timing and responsibilities in isolation and then do the same for the target's
expectations any conflicts between these two are where your architectural decisions lie. It's also useful to apply role
playing techniques and have people play both the message source and the target.




## Be conservative in what you do, be liberal in what you accept from others - Postel's law ##

If each component in the system accepts a message or messages from an external provider (either another component of the
system or an external actor) then the question to be asked is what to do with the message received.

In the ideal situation, where the message is completely under the control of your system, it will already be in the
appropriate format for your component to parse and process. However, frequently the message will either be raised by an
entity external to your system and, even when it's another system component if the calling semantics are not in-process
and/or enforced by a statically checked API then your component will still need to validate the message and enforce some
kind of 'contract' on the context and shape of the data.

When carrying out this contract enforcement it's a good idea to try and obey Postel's law. Accept the message and
validate the expected inputs only for the parts of the message your specific component is interested in. However, you
don't have to reject a message that sends data that your component is not interested in. In that case it is possible to
simply drop data of no interest. With some thought, it is also possible to accept data in a slightly different format
and transform it to the format you require although care should be taken with this approach as in many cases you will be
making assumptions that may not be valid and the transformation itself can be a lossy process, for example, transforming
a decimal number to an integer. The decision to reject a message is always available of course, and for the sake of
safety and security is frequently a good option, however you should always make this decision deliberately and with
cognisance to the impact.

In all cases, whether the message is accepted or, even more so, rejected consider logging the message in it's raw format
at the point of reception by your component.

At this point it's worth a quick sidebar on the subject of logging. In the case of logging events raised internally by
your system adopting a standardised approach and format to your log messages makes it much easier to automate searching
and parsing of the messages once collected. See David Humphreys talk on logging. However, when I talk about logging the
message at the boundaries of the component in this context we want to maintain as much of the original format and
semantics of the message as possible, including if possible, the ordering of the messages. Typically logging the
messages at the boundary of the system will involve writing the message to a data store in it's raw format. The simplest
way to do this is simply to serialise the message directly to disk in a file as any attempt to coerce it into a
different schema for a database is inherently more likely to lose the original format and order.

I will also reveal my bias towards event sourcing, message middleware and streaming solutions. My reason for liking
these approaches are that they often provide the ability to log the messages received or produced by a component at it's
boundaries as a matter of course with little additional effort.

Again, drawing parallels with functional programming paradigms, pushing the validation and transformation of a
components messages to the 'edges' of the system is pretty much the same concept as pushing state changes to the edges
of the system which is frequently a mantra of functional programming.

## Keep raw message format ##

If you keep the messages flowing into your system in their raw (unchanged) format and order for as long as possible and
pass them around the `components` of the system you gain a number of advantages.

Each `component` in the system can decide what information to take from the message, ignoring anything it's not
interested in.

It can also derive information from the order in which messages arrive but this causal derivation is only
possible with a system that maintains the order of messages. This is where systems based on appropriate messaging
infrastructures that guarantee delivery of a message in the same sequence as it was written (usually within some well
understood constraints) are extremely useful.

## Order matters ##

Why is the order of messages important? With total or partial ordering of messages maintained it's possible to persist
messages over a long period of time along with the logical timing of the messages relative to each other. This makes it
possible to think of and implement a component to answer some question of the data that relies on the original sequence
of events that raised the messages but some time later. In other words you don't need to know the questions that may be
asked of the data ahead of time and design your data model and processes to handle these possible questions. Instead if
you keep the original format of data flowing into the system in it's original order it's possible to replay those
messages in the same order into a component implemented after the messages creation.

## Good systems are like sauces, it's all in the folding and reduction  ##

Another side effect of considering systems as components that consume ordered raw messages is that each component can be
thought of as processing a stream of messages. The result of this consumption may be more messages emitted to other
components or to users, it may be some change in the state of a localised store (remember this is a localised
optimisation). In any case the entire component can be thought of a large function that folds over (or reduces) the
stream of messages to produce the desired result.

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

[^5]: Reference to Conway's Law here [TODO]
