---
title: "The Early Abstraction turns into a Worm - Software by Design in a Functional Programming World (part 2)"
excerpt: "Abstractions are the way we manage to deliver complex software systems and therefore are a tool we need to
apply judiciously."
layout: single
comments: true
header:
  overlay_image: /early-bird.jpeg
  overlay_filter: 0.25 # same as adding an opacity of 0.5 to a black background
  caption: "Image from clipartfest.com"
  teaser: /early-bird.jpeg
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
varied from properties files that contained hundreds of settings, to configuration in databases, to rules engines that
had their own user interfaces and data stores to allow business users to change the behaviour of systems directly.

_So why do I feel this approach doesn't work?_

It's impossible to second guess what the next business requirement will be. Most of the systems I've seen that take the
configuration approach were written in the 80's, 90's or early 00's and even then the pace of change was high enough to
make trying to second guess what a business requires in a years time impossible. Even government has rapid changes to
implement. Secretaries of state and ministers change, sometimes after only a few months in the job, and the new incumbent
has their own approach.

### Externalise ###

Given this the only way to cope with change through configuration is to determine all the possible factors that could
change and externalise these. Even if this were possible (and I've seen systems that came close) the code required to
interpret these external rules becomes inherently complex and therefore hard to test and hard to change. All it needs is
for a factor that has not been externalised to need change or a bug to be discovered and the development staff are left
to read, understand, change and verify a complex domain specific set of rules for interpreting a domain specific set of
rules. This is a tricky, slow, and error prone process. It means that most highly configurable business systems like
this are notoriously difficult and slow to change.

### Rules engine ###

Even using a rules engine designed to manage externalised logic adds a layer of complexity in interfacing with this
engine that makes changing anything not inside the scope of the rules very difficult.

This issue is made more difficult if the rules are configurable by business people who don't have training or experience
in development as they tend not to appreciate the impact of rules changes on non functional qualities such as
performance or security. They also don't always appreciate how to rigorously test any changes and rules engine based
systems rarely have provision for a test environment.

In addition most rules engines have little or no provision for version control and roll back. Even when they do you have,
to manage rules running on different versions of data, supporting backward compatibility across changes in data schema
or migrating data in line with rules changes. These are complex, error prone concerns for an experienced development
team let alone someone whose expertise lies elsewhere.

### Configurable? ###

Configuration is a useful technique to cope with changes in run time environment and broad brush changes to code paths
such as feature toggling or switches for A-B testing. However, it's too crude a tool for dealing with changing business
rules. I would caveat this with if your business involves developing expert tools or middleware to solve very specific
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

### Unnecessary Coupling between Components  ###

Some of the other issues with a centralised and/or canonical data model is the unintended coupling of components.

Superficially, converting the data early in the system into a canonical model and then using this model everywhere
seems like a good separation of responsibilities. However, lets consider making changes to data input to the system when
using this approach.

In this example scenario, we will assume we have a component responsible for transforming the data to a canonical format
and storing it and then more than one component using the resulting canonical data format for a specific entity. Let's
assume that the two client components are carrying out different responsibilities and therefore although requiring
information about the same entity have very little overlap in the specific fields required.

In the worst case, depending on the implementation, this may mean both components having to implement code to deal with
data that neither use or that only one of them uses. This is a type of 'stamp coupling'. What is worse is when the
shared canonical data model is encoded in a set of objects that live in a shared library. This means 'hydrating' the
data into something 'usable' means using this shared library to parse the data into an object graph that get's used
internally in more than one component.

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
'package' or 'name space' in a monolith can access the data as easily as any other doesn't mean that it should without
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
advantage. Conway's Law[^1] states that "organisations which design systems ... are constrained to produce designs which
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

[^1]: [Conway's Law](https://en.wikipedia.org/wiki/Conway%27s_law)
