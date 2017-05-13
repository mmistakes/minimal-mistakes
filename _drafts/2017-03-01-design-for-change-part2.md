---
title: "Design for change (part 2) [draft title - need something better]"
excerpt: "Behaviour first- Data first class"
layout: single
comments: true
---


# The Early Abstraction turns into a Worm #

In my first post in this series I ended by saying that I would elaborate on what 'deferring decisions in design' meant. I was a
little disingenuous as there is no one answer to this question and I will keep revisiting it in future posts. However,
I believe that one of the mistakes I've certainly been guilty of in the past is 'early abstraction'.

What do I mean by early abstraction? All through my career I've seen software system designers (myself included) chase
the holy grail of code reuse in the macro. The basic tenet of code reuse in the large is to find a business domain
specific pattern that appears to repeat in the domain, apply an abstraction that 'simplifies' this behaviour and extract
it into some reusable code.

This has taken the many forms but I will discuss a few of the most common:

1. Configuration through external switches and 'rules'
2. Standardisation through the application of a canonical data model/message model
3. Development and use of a domain specific language
4. Customisation through plugins

All of these approaches are extremely useful and I still use all of them at various points in my designs.
They are not inherently good or bad but misused they can introduce inertia to change in a systems architecture.

So if these approaches can be good, why should we not apply them frequently and liberally?

## Configuration ##

On the surface, designing a system that you can configure through switches and 'rules' that are recorded in some data
store external to the code seems like a good idea. Using this mechanism we can change the behaviour of the system
without rewriting it or even redeploying by changing the values of the switches and rules. This means we can respond to
change much faster?

I've been involved with a number of systems that have used this approach to respond to business change. Approaches
varied from properties files that contained hundreds of settings, to configuration in databases to rules engines that
had their own user interfaces and data stores to allow business users to change the behaviour of systems directly.

So why do I feel this approach doesn't work?

It's impossible to second guess what the next business requirement will be. Most of the systems I've seen that take the
configuration approach were written in the 80's, 90's or early 00's and even then the pace of change was high enough to
make trying to second guess what a business requires in a years time impossible. Even government has rapid changes to
implement. Secretaries of state and ministers change, sometimes after only a few months in the job, and the new incumbent
has their own approach.

Given this the only way to cope with change through configuration is to determine all the possible factors that could
change and externalise these. Even if this were possible (and I've seen systems that came close) the code required to
interpret these external rules becomes inherently complex and therefore hard to test and hard to change. All it needs is
for a factor that has not been externalised to need change or a bug to be discovered and the development staff are left
to read, understand, change and verify a complex domain specific set of rules for interpreting a domain specific set of
rules. This is a tricky, slow, and error prone process. It means that most highly configurable business systems like
this are notoriously difficult and slow to change.

Even using a rules engine designed to manage externalised logic adds a layer of complexity in interfacing with this
engine that makes changing anything not inside the scope of the rules very difficult.

This issue is made more difficult if the rules are configurable by business people who don't have training or experience
in development as they tend not to appreciate the impact of rules changes on non functional qualities such as
performance or security. They also don't always appreciate how to rigorously test any changes and rules engine based
systems rarely have provision for a test environment.

Configuration is a useful technique to cope with changes in run time environment and broad brush changes to code paths
such as feature toggling or switches for A-B testing. However, it's too crude a tool for dealing with changing business
rules. I would caveat this with if you business involves developing expert tools or middleware to solve very specific
problems then a heavy element of configuration is useful but for most business problems developing a comprehensive
configurable system is more expense than it's worth.

## Canonical Data Model ##

The most basic and common form of this standardisation is to create a single data model, often implemented in a single
relational database, shared across multiple components of a larger system. Although this approach has some definite
advantages in providing a common dialect for data used across components of the system it also has some costs in terms
of implementing unforeseen changes. If the system has several components that need information about the same entities
from a business perspective this can be indicative of a number of things:

1. Components with Multiple or Un-surfaced responsibilities.
2. Focusing to much on Modelling Static Data or Objects.
3. Unnecessary Coupling between Components.

### Multiple or Un-surfaced Responsibilities ###

The components in the system may not have clearly defined responsibilities and therefore more than one component is
responsible for similar or the same business function. Alternatively, there's an unsurfaced business function that is
split across more than one system component and probably should be the responsibility of a component that was never
designed or implemented.

The second frequently occurs through stealth and is the really difficult skill of evolving software architecture. To
avoid this every developer needs to be aware of the clear roles and responsibilities of every component in the
system. When making even a small change the developer (and the tester) should consider whether this change is actually
the responsibility of the component being changed.

If this question is difficult to answer or at all ambiguous this is a strong indicator of one of few things, either
there's no clear common understanding of the system architecture or the component your proposing to change is either not
responsible, or not fully responsible, for the behaviour/data being added or changed.

### Modelling Static Data or Objects ###

Focusing on modelling data without seriously considering the systems behaviour and responsibilities leads to a number of
issues. The classic example of this is focusing on noun analysis to derive an Object and/or Data model without thinking
too deeply of the flow of data and the responsibilities of the system as a whole or the components of the system. This
leads to concepts in the system that are either not required or modelled from a perspective that is too general.

As a slightly contrived example; imagine modelling a system that deals with University Students and the courses they are
registered for.

  * From the perspective of a specific lecturer the important properties of a student may be that they are
registered for her lectures, the students attendance and grades.
  * From the perspective of a specific faculty in the University the important features of the student might be the courses
and modules that they attend in the facility, when they timetabled to attend, grade and attendance and their personal
tutor.
  * From the perspective of the University administrator the important features are the courses they are taking, the
overall timetable, which faculty and lectures they are taught by.
  * From the perspective of the bursars office the important features may be the fees the students
liable for, payment records, any financial assistance etc.

If our system is only responsible for the bursary then modelling all the complex interactions of the student to the
facilities and courses is not only a waste of effort but will lead to a model that probably misses important concepts
required to process the financial requirements.

It's very easy to focus on modelling data in isolation and either miss important data or model the data/objects from a
perspective that leads to more subtle judgements that result in coupling and dependencies between parts of the system
that should not be there.

### Unnecessary Coupling between Components [TOOD is this structural coupling or something else?] ###

Some of the other issues with a centralised and/or canonical data model is the unintended coupling of components.

Superficially, converting the data early in the system into a canonical model and then using this model everywhere
seems like a good separation of responsibilities. However, lets consider making changes to data input to the system when
using this approach.

In this example scenario, we will assume we have a component responsible for transforming the data to a canonical format
and storing it and then more than one component using the resulting canonical data format for a specific entity. Let's
assume that the two client components are carrying out different responsibilities and therefore although requiring
information about the same entity have very little overlap in the specific fields required.

In the worst case, depending on the implementation, this may mean both components having to implement code to deal with
data that neither use or that only one of them uses.

This means that any change to the data can end up impacting three components, that responsible for transforming and
storing the data, and both the downstream components when the change may actually only be important to one of the
downstream components.

Although having a shared data model doesn't inherently lead to this kind of coupling it's frequently a side effect of
codifying this model in either a database or a canonical message format. The warning signs are usually shared or copied
code that parses the data into deep object graphs with components 'hydrating' the same data.

It is certainly possible to have a shared canonical data model and have code in each component that only 'hydrates' the
data it's interested in but having this shared model in the first place sets an expectation in the minds of developers
that you can get the data 'for free'. Having the data close at hand leads to a blurring of the roles and
responsibilities of each component so that instead of delegating a function to the most appropriate component the
current component subsumes that function regardless of whether it should sit their or not.

To be clear, this is as much a problem in a monolithic code base as it is in a more distributed one. The decision to
deliver distributed components is an optimisation to solve a specific problem (usually one of scale) and having all the
code in one single component doesn't remove the responsibility for clear separation of concerns. So just because a
'package' of 'name space' in a monolith can access the data as easily as any other doesn't mean that it should without
considering that making this decision couples two 'components' of the monolith and introduces inertia to change.

## Domain Specific Language ##

The development of a domain specific language to allow code to specify logic in business terms is generally a good idea.

However, as with all design choices there is a trade off. In this case I don't think that Domain Specific Language (DSL)
are bad. I think that developing a DSL too early can be problematic. When you start to wrap data and behaviour in a DSL
you are applying an abstraction to simplify the domain for other developers. This is useful but you have to have
reasonable confidence that your abstraction is an accurate reflection of the domain. If the domain is not well
understood then introducing an abstraction will 'bake in' inaccurate assumptions.

Even if the abstractions codified in the DSL are representative of the problem domain what happens when the domain
changes? Depending on the change the very structure of the DSL may have to change, impacting both the DSL and the code
using it.

I am a little ambivalent about DSL's as I think, on the whole, they can be very beneficial but they are very hard to get
right. This is particularly true if the DSL is developed early. Wrapping an all encompassing abstraction around a
problem can potentially accelerate the delivery of a solution, especially in an environment where there are many
developers. The DSL, by definition, acts as common language and difficult parts of the abstraction can be managed by a
much smaller number of people than are required across the whole project.

However, I believe DSL's can go to far, too fast. My approach is to only introduce a DSL into a domain where the problem
space is clearly understood and has been stable for some time. I also suggest that DSL's be keep narrowly focused with a
small 'surface area' (i.e. a small API). In this way larger problems can be solved by composing these smaller
components. In my experience, DSL's usually work best when codifying the mechanics of the system i.e. the boilerplate
code, and form a domain specific middleware layer.

## Plugins ##

The use of plugins for customisation is used quite extensively in tooling to allow for extension points for developers, usually
external to the organisation, who don't have direct access to the code to make changes.

Again, like all the approaches discussed so far, this is a useful technique. In my opinion, using plugins to provide
extension points within a single organisation solving a business problem rather than a tooling for developers problem is
not a good solution. The complexity of having to add in a framework of code to support the execution environment for
plugins is a large overhead for teams to maintain and it detracts focus from solving the core business problems.

So save plugins for tools to be used by developers who are likely to want to, and have the skills to, extend your product.

# Drivers for Early Abstraction #

I've talked about a number of methods of abstraction and some of the dangers of applying these too early in a project
(or at all in some cases). Most of the costs of early abstraction can be summarised as 'the introduction of inertia in
the development cycle'.

So what are the drivers that frequently introduce early abstraction?

1. Difficulty of Communication between teams - different vocabulary, team boundaries - often leads to solutions
   localised to a team and this leads to the adoption of abstractions
2. Needing to deploy independently again leads to early adoption of localised abstractions.
3. A few business experts codifying their knowledge in a design
4. DRY principle dogma - the rigid adoption of Don't Repeat Yourself leading to abstracting a lot of code as a matter of course.

Any combination of the issues above can lead to the adoption of an abstraction quite early in the development of a
system. Most of these drivers are predominantly about communication of concepts between technical roles and teams (the
exception is DRY principle dogma). These drivers are about how you can you ensure the developers and development teams
can get stuff done without slowing each other down.

Inherently, a developer will want to be able to progress their work without having to communicate with others as there's
a perception that this communication and seeking a shared understanding slows their ability to get things done. This
inertia in communication scales up to the team level as well. So even when the team is using communal development
approaches such as pair programming or mob programming the communication inertia just moves to the team boundary
instead of the individual.

I am a strong advocate of communal development approaches because it helps deal with the communication issues between
people in a team. However, I don't think we have yet solved the communication issues between teams. This is actually the
real role of the software architect, to provide a vocabulary and a vehicle for the wider conversation of where the
responsibilities of the parts of a system lie. Deciding on what the larger components of the system are and forming
teams around them sets boundaries. Applying a change within a team and/or component boundary is relatively easy, any
change that spans components or teams becomes much more difficult.

This is why projects that start with a large number of developers and teams are so much more prone to failure than those
that start small and evolve. If you start with the precondition that you need many teams you've forced yourself to carve
up the problem space at the very beginning. This means you have to get the decision about what are the key components,
abstractions, roles and responsibilities correct from the start as changing them later is much more expensive and difficult.

One of the strongest architectural implementations that I frequently see adopted as a solution to the team communication
boundary is the use of microservices. The principle is to use the, by now infamous, inverse Conway's Law to your
advantage. Conway's Law[^5] states that "organisations which design systems ... are constrained to produce designs which
are copies of the communication structures of these organisations". Inverse Conway's Law tries to use this phenomenon by
organising the teams to constrain the required system design.

In the case of a predominantly microservices based architecture the idea is that organising the developers into small
teams each responsible for a small service or services will lead to clearly defined boundaries around each
microservice. This is generally what happens, but without a shared understanding of the entire architecture the APIs are
unlikely to well support the clients of the service and coordination, orchestration and choreography of these
microservices is also an area that's likely to suffer.

Microservices are a good solution to a number of problems, predominantly around horizontally scaling for massive load,
but having difficulty getting teams to communicate is not a good enough reason to adopt a number of distributed systems
problems that come with microservices.

All of these drivers are actually sticking plasters over the problem of a large number of developers having to share a
common understanding of the business problem and a common agreed view of the high level solution. This is a people
problem not a technology one. Although choosing the appropriate technologies can support the people (process) problem
it's not a silver bullet

# Conclusion #

> The purpose of abstraction is not to be vague, but to create a new semantic level in which one can be absolutely
> precise. - Edsger Dijkstra

...but it's only possible to be absolutely precise when the problem is well understood and not liable to fundamental
change.

Abstractions are the way we manage to deliver complex software systems and therefore are a tool we need to apply
judiciously. I've talked a lot in this blog about the issues around adopting abstractions too early in a software
systems lifecycle and the drivers that can cause this but I haven't made any suggestions about how we might choose the
right levels of abstraction early and defer some decisions about abstractions to as late as possible or how we might
make changing these abstractions later in our systems lifecycle as easy as possible.

I will try and address some of these concerns in the next few blog posts.

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
