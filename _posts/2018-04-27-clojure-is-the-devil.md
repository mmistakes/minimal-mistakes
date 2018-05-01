---
title: "Clojure the Devil...is in the detail [Or 'Why I'm too dumb for Clojure']"
excerpt: "This all comes down to developer discipline."
layout: single
comments: true
read_time: true
share: true
related: true
header:
  overlay_image: /Devil.png
  overlay_filter: 0.25 # same as adding an opacity of 0.5 to a black background
  caption: "Clojure the Devil"
  teaser: /Devil.png

---


*Disclaimer*

_This blog is written from my personal experiences and YMMV. I have a nearly 30 year career solving business problems
that are not usually processing intensive or solved using algorithms and mostly involved joining teams and systems that
already exist with all the baggage that comes with that._

_In addition, the blog title is deliberately controversial and slightly self deprecating but that doesn't mean there is
not a strong element of truth. I do feel that my personal experience with Clojure has soured me slightly to a language I
still love._

Recently I've been working as a Clojure developer on several Clojure and Clojurescript code bases and I've found them to
share some concerning issues. I can only speak about my experiences and I am sure that these would translate to other
languages but in this case I'm talking about disillusion with a 'personal hero' (Clojure) in the same way people who
meet their hero's sometimes feel disappointment.

To explain the title of this blog a little more, I mean Clojure is the Devil in that the devil is in the detail, in
other words like all powerful tools, with great power comes great responsibility or power corrupts. Clojure is a great
language that has some great opinions but like most programming languages it needs to be used with discipline to be
effective. Also I believe Clojure is one of the best programming languages I've ever used and would prefer it over
almost all others but it has flaws you need to be aware of to use it responsibly.

# Clojure's Opinions #

Clojure is a fairly opinionated language. When Rich Hickey designed Clojure he deliberately made some things hard and
others easy. I've stated before that [constraints](https://twitter.com/agile_geek/status/919210581093216256) can be a
[good
thing](https://chrishowejones.wordpress.com/2015/11/04/the-physics-of-software-or-why-i-am-not-a-software-engineer/).

Clojure favours a functional programming style. Although Clojure ultimately ends up compiled to class files
and JVM byte code it's really heavy going to try and write Clojure in an imperative style or using an OOP paradigm.

Clojure treats data as immutable by default. Although it's possible to write Clojure using mutable data structures and
'uncontrolled' mutable references it's hard work. The effect of immutable data and controlled mutable references to
immutable data (e.g. atoms, refs, agents) is that time is treated as a first class concept.

Changes in state over time are represented as a stream of snapshots of data.

This treatment of data changes over time and the way Clojure defaults to immutability tends to move state management to
the 'edges' of the system. This means that generally Clojure systems tend to have the majority of the code acting as
pure functions that take in data, transform it and output new data.

# Tasmanian Devil [or 'Dynamic Devil'] #

As you may know Clojure is a dynamic language and it's also a relatively young language (10 years old). Both of these
facts give some advantages but bring along some baggage.

As Clojure is quite young I think the Clojure development community is still figuring out the best patterns and idioms
to apply and the pitfalls to avoid. Although languages like Java and C# probably have more inherent flaws than Clojure
their usage patterns are well understood in most situations and therefore, once these patterns are learned, their
flaws are papered over quite well.

As stated above Clojure is dynamically typed. Some of the advantages of a dynamic language are that it's great at
exploring data and discovering issues. Being able to rapidly inspect and manipulate data without fully specifying it's
entire structure means you can move quickly. Patterns like ['tolerant
reader'](https://martinfowler.com/bliki/TolerantReader.html) are the default in dynamic languages, you only need to
specify the part of the data structure you want to worry about right now and you can safely ignore the rest unless it's
on the path to your data.

Dynamic languages allow you to write and change your code rapidly but that ability comes with a price.

The price of a dynamic language is often described as the fact that compilers cannot type check data at compile time and
therefore bugs that would be found at compile time creep into run time and, if your testing is not thorough, into
production.

Although true, my personal experience is this is not a big a problem as some might claim. Given that you should adopt a
thorough testing regime to validate your solution against your design and, more importantly, your business problem, if
your test feedback loop is short enough this cost of dynamic languages is not enough to negate the benefits of moving
fast.

Before I move off the subject of compile time checking I want to address the argument of many adherents of
Hindley-Milner Type inference who claim 'if it compiles in Haskell it's correct'. I know this is a deliberate
oversimplification but even if it were true all you are claiming is that the code is consistent within it's local
context. No type system that I know of today can prove that the larger design as a number of cooperating parts is a
correct design, nor can it prove that the types the programmer chose to model the data are the right ones and it
certainly can't prove that the design solves a business problem.

Therefore, no known type system replaces testing and at this point I want to take a slight diversion to talk about
testing...

# Testing, testing.... #

Most junior developers and certainly most non-technical people thinking of testing as a way of validating that a
solution solves a business problem and is 'bug-free'.

Anyone with a few years programming experience knows that testing can and does do much more than this.

## Fast not furious ##
I have written about Test Driven Development a lot over the years and if you distil my arguments for TDD down to one thing
it would be 'fast feedback'. Fast feedback is being able to get a feel for when you stray from the expected path of the
solution quickly so that you can correct course. Other forms of 'testing' can also provide this fast feedback, in
Clojure/Clojurescript the REPL (Read-Eval-Print-Loop) is the primary feedback mechanism. In my mind a REPL is simply
another 'test' tool to provide fast feedback and validation.

## Validation's what you need ##
Testing also provides validation of implementation against design and high level tests provide validation of the design
against the business problem (assuming that these high level tests are visible to and validated by people who understand
the business problem). This is why we write tests at different levels, whether you classify them as unit, integration,
system, UAT or as I tend to, simply as user tests and developer tests.

## Document tests, test the document  ##
It always surprises me how many developers miss another advantage of automated tests - documentation of the design that
stays current. In my experience this is probably the most important advantage of automated testing and why we should
care that tests are well structured and easy to read.

I'll restate this, testing is more important as documentation than as validation! Surely testing something 'works' is
more important? Not really.

As stated previously in this blog, no type system can validate a design against a problem it's trying to solve, in the
same way unit and integration testing cannot validate a design against a problem. Therefore there is a reasonable
expectation that small parts of your design may change as you explore the problem.

Given that, having documentation of your design that is current and verifiable is more important than verifying that a
part of the implementation conforms to your current understanding of the problem. If you understand the current
implementation against it's 'design contract' (tests) you can change the 'design contract' and then the implementation
to meet that contract (another argument for the TDD principle of changing tests first BTW).

## Test first, document as you go ##
This also explains another reason that I strongly advocate TDD (even when using a REPL for fast feedback), in my
experience if you don't write tests first you tend to find the tests get left behind under the pressure to 'complete'
code (IMO code is not 'complete' unless it's tested!). If the tests don't get written, or are not well structured and
easy to understand, then there is no working documentation of the implementation of the design and therefore changing
the design when required is that much harder and slower.

This is also a reason why, although I like property based testing to thoroughly 'validate' the invariants in the
function I think it fails in documenting the design. I personally find example based tests that show
the expected output for a given input much more informative.

# Lack of Clojure... #

So I started this blog saying I was disillusioned with Clojure. This is a little disingenuous, more accurately I'm
disillusioned with how I've seen Clojure written.

## Mental Models ##

My close friend, [Bruce Durling](https://twitter.com/otfrom) is oft quoted as saying your feelings on whether the steep
learning curve for Clojure is worth it are predicated on whether 'you want to take your pain up front or gradually over
time'. I agree with this assessment but I would use the same phrase as justification for most of my complaints about the
impact of using Clojure without a lot of discipline.

Most of the pain I've felt on the larger evolving
Clojure/Clojurescript codebases I've worked on comes down to one thing,
holding a mental model of the system in my head.

All codebases require a developer to build, maintain and persist a mental model of the system in her head. This mental
model is the reason that context switching is so harmful to software development productivity. If you're a developer you
will have experienced someone asking you a question or insisting you attend a meeting right when you're in the middle of
a problem and you dropping that mental model on the floor. It can take many minutes or even an hour or more to
re-assemble this mental model to the same point so you can continue your work.

### Why mental models matter? ###

Why does supporting the building a mental model matter?

It's been annocadotely cited developers typically spend 70%+ reading code [[What do Programmers do
 anyway?](https://blogs.msdn.microsoft.com/peterhal/2006/01/04/what-do-programmers-really-do-anyway-aka-part-2-of-the-yardstick-saga/)]. There
 is research that suggests that when maintaining code 62% of the code read by a developer is used for context and is not
 directly changed during the maintenance [[Towards Understanding How Developers Spend Their Effort During Maintenance
 Activities](http://swat.polymtl.ca/~foutsekh/docs/wcre13main-idm125-p-19100-submitted.pdf)].  We spend much more time
 reading our own old code or reading someone else's code. We need to read code in order to determine how to fix a bug,
 where to add this new feature, etc.

Given this effort spent in reading and understanding code, anything that helps a developer build and maintain a mental model is worth having.

One of the [opinions](#clojures-opinions) in Clojure/Clojurescript is that of defaulting to immutable data. As discussed
here and elsewhere, treating data as immutable has the effect of pushing the state changes in a system to its
'edges'. I.e. I/O happens at the boundaries of the system and the bulk of the system is a chain of functions that each
raise a new data 'event' to pass to the next function.

This 'opinion' has the effect of minimising the effort required to mentally model the change of state over time when
considering a function or small subset of functions in isolation. This is one of the major advantages of Clojure over
some other languages.

In other words, Clojurians will trade some 'initial discomfort' and efficiency having to deal with immutable data for
the simplicity of being able to trust that data not to change under their feet over time.

So given that the mental model of state changing over time has been simplified why do I think most of the pain I've felt
in Clojure is due to holding a mental model in my head?

## The answer staring you In-ter-face ##

The issue I have with most of the large Clojure/Clojurescript code bases is that for each function I need to work out
the shape of the input data and the shape of the output data. In a function many levels down the call stack in the
depths of the system this is often really hard. It's often not obvious what the interfaces are to a small function.

Often in order to work out the inputs and outputs of a function you need to trace backwards through the stack of
functions in order to just work out what the data looks like. Although you also frequently have to do this with
statically typed languages to determine the exact values of the types you can at least determine what the types are by
looking at the type signature. This is one of the big disadvantages of a dynamically typed language.

## Models that are mental ##

I've found, in any Clojure/Clojurescript code bases that are more than trivial in size, the effort of building and
maintaining this mental model of the data through a pipeline of functions becomes considerable. This effort gets worse
exponentially dependent on coding style differences, therefore the number of developers working on a code base has a
drastic effect on the cognitive load required to build and maintain the model of the data and it's changes as it
progresses through various functions.

At this point I have to diverge a bit to how I learn things and how I come to an understanding of the systems,
technologies and languages I work with. My learning style is best described as learning through doing, combined with
reinforcement through repetition. So in [Honey and Mumford's learning
styles](https://resources.eln.io/honey-and-mumford-learning-styles/) I would probably sit somewhere between Activist and
Pragmatist. I tend, as do lots of people, to make judgements and assumptions through pattern matching. I learn patterns
and what they mean, search for those patterns when scanning code and then replace the pattern I've identified with the
learned concept. This is what allows me to scan code and make sense of it at a reasonable pace.

Even given this pattern matching I often have to apply the associated pattern to the inputs to produce a model of the
outputs i.e. the local data model input for that function produces the local output model which becomes the input to the
next function and so on. Therefore the pattern matching alone is not enough as I still need to maintain the mental data
model passed between functions to make sense of them.

Fortunately, the Clojure community does tend to conform to a number of idioms that mainly cover naming and how to
de-structure and re-structure data in the small. These idioms, once learned, make it much easier to pattern match to an
idiom at a glance and make assumptions about what is happening without reading in detail.

However, these are only idioms and they are not mandated by the language or the compiler. In addition, these idioms are
mostly about the small stuff. There don't yet seem to be any universal idioms for the larger things, like organising
code into namespaces. These idioms are arriving fast and are adopted quickly in the community. For example, the use of
Spec/Schema, the use of core.async to provide asynchronous communication or even to decouple parts of a system.

However, Clojure is still fairly young and these idioms and (to use a dirty word in the community) patterns are
constantly evolving, being tested and sometimes rejected. For example, just a few years ago Stuart Sierra's component
library seem to universally pepper all code bases. It was often miss-used[^1] as a substitute for dependency injection
and therefore appeared liberally scattered through the code base at multiple levels. This over use of a good thing
resulted in some code smells that have since been recognised, as it resulted in artificial coupling and complication.

# Seeking Clojure #

So, I've spent some time talking about generic issues I have with larger more complex Clojure/Clojurescript code bases
which mainly comes down to; being able to work out what the shape of the data is at the time a particular function is
called, plus needing higher level idioms (or patterns) that I can use to relieve the cognitive load and shortcut having
to decode every function in detail to make sense of what I'm reading.

## Maintaining Mental Data Model ##

### So is this just a problem in Clojure? ###

_Of course not._

Other dynamic languages, such as Ruby and Javascript, also don't enforce the types input and output to a function/method
and therefore require the building and maintenance of this metal data model.

### Is this just a problem for dynamically typed languages? ###

_Of course not._

The issue of maintaining a mental model of the shape of the data is obviously a requirement in a dynamically
typed language as the compiler doesn't enforce me specifying the input and output type(s) and defining the type(s)
somewhere centrally. However, even in a statically typed system, there will often be multiple values for a type and
therefore your mental model of the data becomes less about the 'shape' (which can be looked up in the type definition)
and becomes more about the values of a complex type.

It is worth recognising though that good typing systems (mostly Hindley-Milner derived systems) do constrain the problem
of mental model maintenance to only run time state.

## Patterns (you idiom!)  ##

### Does only Clojure have issues with missing patterns or idioms? ###

_Of course not._

It's even more ridiculous to suggest that Clojure/Clojurescript missing patterns and idioms are only applicable to
Clojure. At it's furthest logical extension, if a language had every idiom/pattern it would inherently contain every
program ever written or every program ever to be written.

### You've been frame-worked ###

I am again going to say something that is heresy in the Clojure. Clojure has a philosophy of using libraries composed
together in preference for frameworks. To diverge a little here, I like Luke VanderHart's definition of a framework, if
we consider a system as a tree the libraries would be leaves on the tree and a framework would be the trunk and major
branches.

What is the advantage of composing libraries together? You can shape your tree anyway you would like. It's up to you how
you compose the libraries to form what you require.

However, using libraries composed together comes with a cost. The cost is that every tree is unique and shaped
differently so it takes cognitive load to build the mental model of the 'tree'.

Frameworks give the basic shape of the tree for 'free'. The cost in most frameworks is that you have to learn a more
complex 'tree'. If you need it to do something obscure you have to work out how to configure the correct 'branch' or
'twig', or, in the worst case, you may not be able to do the obscure thing inside the framework. However, with a small
effort, you can learn the trunk and the main branches and then rely on applying this pattern to all similar systems.

One of the issues I feel Clojure has is that there are few frameworks and almost none that are universally
accepted. Interestingly, I think that the Clojurescript community is slightly ahead of Clojure here, in that Reagent is arguably the
most popular 'micro-framework' that is used, even Re-frame is built on top of Reagent.

So I would contend that having an accepted widely adopted set of frameworks for common problems (web development,
distributed stream processing, distributed messaging, etc.) provides developers, using the recognition of patterns in
code, with a short hand to enable them to build a mental model of the system.

This is where I disagree with most of the Clojure community. Frameworks are not evil (yes, even Spring is not evil - I
remember J2EE where every EJB needed an interface to be implemented!). Frameworks are important. They provide capability
out of the box to solve the common problems that, typically, I've seen solved over and over again in different ways in
Clojure/Clojurescript code bases.

More importantly, in my opinion, frameworks provide patterns that, once learned (and learned once), give the developer a
short hand to recognise what the system is doing.

If you can scan code and quickly identify, through the use of standard patterns in a framework, that this code is
parsing HTTP, this code is doing verification/validation but this code is the heart of the business problem it speeds up
understanding.

## Name your spaces  ##

In my opinion one of the most important features of Clojure/Clojurescript is it's ability to gather functions into
namespaces. In addition good naming of arguments and local references is just as important. Zac Tellman has some great
thoughts on naming in his ['Elements of Clojure'](https://leanpub.com/elementsofclojure) book.

If namespaces and naming of variables are used effectively they can help minimise the cognitive load of holding a mental
model of the inputs and outputs to a function. Good naming of arguments and local references can give you a head start
in figuring out what the input and output data looks like.

One of the Clojure developers I worked with and have a lot of respect for ([John Cowie](https://twitter.com/johnacowie)) suggested that developers use
namespaces to separate out the data manipulation code that requires, and in some ways defines, the 'shape' of the data
so that developers have one place to go to find that mental model. Although, I agree with this approach, this only
tackles part of the problem. The 'data model' for the data at the interfaces of the system, input and output, can be
isolated in this way.

Having said that there are frequently significant points in the transition of data from one state to another where
judicious use of namespaces to cluster functions that describe the transition of one state to another can be collected
together even if this state is transient. Recognising these state transition points and the decision to model the state
at this point is a key skill. This is an area where having a static typing system tends to force thought about how to
model data where a dynamic typing system can make the decisions more lazily, which is easier when discovering the shape
of a problem but carries an ongoing cost in maintenance if the model is not made explicit in refactoring.

## Separate your concerns ##

The idea of separation of concerns is closely tied into the discussion above on namespaces and on the discussions below
on function naming and sizing.

Keeping code that is purely about operational or cross cutting concerns separate from the code that describes the
business problems makes it easier to reason about.

At it's simplest, there should be namespaces that are about operational/cross cutting concerns, namespaces describing
the business problem and namespaces that effectively wire things from the other two together. That last category is much
reduce by the use of a framework, but taking on a framework comes with the cost of making the way things are wired up
implicit rather than explicit.

Where I've seen large Clojure and ClojureScript codebases go astray is in not separating out these three concerns.

## Scheming Specs ##

The data flowing into and out of each function is linked to the function. Judiciously using namespaces to group
functions that manipulate data at the boundaries of the system is a useful technique, however each functions 'interface'
depends on where it is in the call stack so there is a requirement to define the interfaces to a function.

Clojure 1.9 provides Spec to help with exactly this problem and before Spec there was Plumatic Schema
[[spec](https://clojure.org/guides/spec) and [schema](https://github.com/plumatic/schema)]. The advantage of both of
these libraries is that you can move fast, not specifying the input and output data, to start with and add the detail
when the problem is better understood. Getting the best (and arguably worst?) of both worlds between static and dynamic
typing.

However, specifying the arguments to every function in detail without a compiler to verify that specification is a very
laborious task. In addition, in my experience, just like adding tests later, adding Spec/Schema later rarely happens.

I've also found, due to the inertia provided by the effort of layering on Spec or Schema after the implementation of
functions, it's usually only carried out at the boundaries of the system again.

I wonder if there's a discipline, like TDD, that would encourage this documentation of data models as an integral part
of the development cycle. However, as is the case with most things that support code maintenance and readability, this
always comes down to developer discipline.

## Simple and small ##

Keeping functions very simple and small helps to promote functional composition and therefore reuse. In addition, each
small function is easier to understand in isolation. If this is combined with naming functions and function arguments in
a way that facilitates understanding at a glance this helps alleviate the cognitive load of scanning and understanding
code.

Clojure code can frequently get 'dense' so don't be afraid to split code up into smaller functions. Use 'scoping' within
functions to add clarity such as using let or letfn and temporary variables. Using named functions (even locally named
in a let or letfn) instead of lambdas for anything other than trivial functions helps with intent and makes code more
readable.

## Name your function ##

Naming functions and function arguments is critical to understanding the code base when reading it and as developers
spend approximately 70% of our time reading and understanding code already written taking time to get names right is
worth the effort.

Obviously naming functions in a way that clearly indicates their purpose is a good practice that should be followed
regardless of programming language.

Naming arguments is a slightly more contentious discussion. There's a school of thought in the functional programming
world in particular that suggests that functions can be decomposed to the point that they are very generic. Once
functions are decomposed to the point that they are highly parameterically polymorphic then argument names become more
generic as the function can support many types and therefore the argument names must be generic by definition. This
tends to lead to argument names such as `x` or `xs` [[When x, y and z are great variable
names](http://blog.ploeh.dk/2015/08/17/when-x-y-and-z-are-great-variable-names/)]. However, functions higher up the call
stack, that are the point of composition of many of these generic functions, probably need more specific function names
and argument names.

## 'Pair' down your code ##

Using pair programming provides a number of advantages. I like to think of modern software development techniques as
being all about feedback. I've already mentioned TDD and REPL based development provides this kind of feedback, as does
BDD, but Pair Programming provides more than one feedback loop.

Pairing on code can help provide feedback on whether the code is still focused on solving the problem; as the Navigator
can keep an eye on 'the forest' while the Driver focuses on 'the tree'. By this I mean the person watching and
commenting (the Navigator) is keeping their focus on the design of the code and how it solves the bigger problem and the
person typing (the Driver) is keeping their focus on the detailed implementation and low level design.

However, pairing also provides another feedback loop. Having two people agree on names, how far to decompose a function,
how to structure the code etc. means that the code is more likely to be understood by a third or fourth person.

# Conclusion #

The things I have talked about apply equally to other languages but other languages manifest these concerns
differently. Typically, other languages have widely adopted frameworks and patterns/idioms. TDD is often better accepted
in other languages as an approach that brings benefits beyond feedback and verification.

The conclusion I draw is very subjective but for me it's that I've seen a lot of Clojure that get's the job done but has
less focus on maintainability of code.

This all comes down to developer discipline.

It is possible using REPL driven development to safely produce Clojure that provides the required functionality with
little or no supporting tests to document those REPL based experiments for others (or for the future self of the
author!).

It is common for Clojure code to not clearly separate the business problem from the cross cutting concerns. This is in
no way unique to Clojure but other languages that use frameworks and patterns more tend to encourage this
separation. This is not always the best separation, how many web applications are just separated by their function as a
web app rather than the business function? For example, I must have read dozens of codebases that have packages and
namespaces that are named, view, model and controllers. However, having something that encourages this separation is a
good start.

I have rarely seen the clear documentation of data flowing between states in functions in the Clojure/ClojureScript code
bases I've worked with.

My feelings are that these issues are more to do with a lot of Clojure/ClojureScript developers being new converts to
the language and are focused on just getting stuff to work rather than an inherent problem with the language. Having
said that I can't say I don't have 'type envy' when looking at languages such as Elm and Haskell.

If there's one developer discipline I think may help with these issues it's probably Pair Programming. Having two
developers agree that the code is understandable is exponentially better than one developers view of the code when they
have a clear mental model of the code at the time of writing.

[^1]: Stuart has been quite clear that the intent of his component library is to support the reloading required in a REPL driven style of development. The rule of thumb is that a 'component' has a lifecycle i.e. it has a start and a stop with, optionally, associated set up and tear down.
