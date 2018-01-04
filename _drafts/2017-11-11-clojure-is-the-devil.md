---
title: "Clojure the Devil...is in the detail [Or 'Why I'm too dumb for Clojure']"
excerpt: "TBD"
layout: single
comments: true
---


*Disclaimer*

_This blog is written from my personal experiences and YMMV. I have a nearly 30 year career solving business problems
that are not usually processing intensive or solved using algorithms and mostly involved joining teams and systems that
already exist with all the baggage that comes with that._

_In addition, the blog title is deliberately controversial and slightly self deprecating but that doesn't mean there is
not a strong element of truth. I do feel that my personal experience with Clojure has soured me slightly to a language I
still love._

Recently I've been working as a Clojure developer on several Clojure and ClojureScript code bases and I've found them to
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
and JVM bytecode it's really heavy going to try and write Clojure in an imperative style or using an OOP paradigm.

Clojure treats data as immutable by default. Although it's possible to write Clojure using mutable data structures and
'uncontrolled' mutable references it's hard work. The effect of immutable data and controlled mutable references to
immutable data (e.g. atoms, refs, agents) is that time is treated as a first class concept.

Changes in state over time are represented as a stream of snapshots of data.

This treatment of data changes over time and the way Clojure defaults to immutablilty tends to move state management to
the 'edges' of the system. This means that generally Clojure systems tend to have the majority of the code acting as
pure functions that take in data, transform it and output new data.

# Tasmanian Devil [or 'Dynamic Devil'] #

As you may know Clojure is a dynamic language and it's also a relatively young language (10 years old). Both of these
facts give some advantages but bring along some baggage.

As Clojure is quite young I think the Clojure development community is still figuring out the best patterns and idioms
to apply and the pitfalls to avoid. Although languages like Java and C# probably have more inherent flaws than CLojure
their usage patterns are well understood in most situations and therefore, once these patterns are learned, they're
flaws are papered over quite well.

As stated above Clojure is dynamically typed. Some of the advantages of a dynamic language are that it's great at
exploring data and discovering issues. Being able to rapidly inspect and manipulate data without fully specifying it's
entire structure means you can move quickly. Patterns like ['tolerant
reader'](https://martinfowler.com/bliki/TolerantReader.html) are the default in dynamic languages, you only need to
specify the part of the data structure you want to worry about right now and you can safely ignore the rest unless it's
on the path to your data.

Dynamic languages allow you to write and change your code rapidly but that ability comes with a price.

The price of a dynamic language is often described as the fact that compilers cannot type check data at compile time and
therefore bugs that would be found at compile time creep into runtime and, if your testing is not thorough, into
production.

Although true, my personal experience is this is not a big a problem as some might claim. Given that you should adopt a
thorough testing regime to validate your solution against your design and, more importantly, your business problem, if
your test feedback loop is short enough this cost of dynamic languages is not enough to negagte the benefits of moving
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
function I think it completely fails in documenting the design. I personally find example based tests that show
the expected output for a given input much more informative.

# Lack of Clojure... #

So I started this blog saying I was disillusioned with Clojure. This is a little disingenuous, more accurately I'm
disillusioned with how I've seen Clojure written.

## Mental Models ##

My close friend, [Bruce Durling](https://twitter.com/otfrom) is oft quoted as saying your feelings on whether the steep
learning curve for Clojure is worth it are predicated on whether 'you want to take your pain up front or gradually over
time'. I agree with this assessment but I would use the same phrase as justification for most of my complaints about the
impact of using Clojure without a lot of discipline.

Most of the pain I've felt on the larger evolving Clojure/Clojurescript codebases I've worked come down to one thing,
holding a mental model of the system in my head.

All codebases require a developer to build, maintain and persist a mental model of the system in her head. This mental
model is the reason that context switching is so harmful to software development productivity. If you're a developer you
will have experienced someone asking you a question or insisting you attend a meeting right when you're in the middle of
a problem and you dropping that mental model on the floor. It can take many minutes or even an hour or more to
re-assemble this mental model to the same point so you can continue your work.

Given, this anything that helps a developer build and maintain a mental model is worth having.

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
looking at the type signature is. This is one of the big disadvantages of a dynamically typed language.

## Name your spaces  ##

In my opinion one of the most important features of Clojure/Clojurescript is it's ability to gather functions into
namespaces. In addition good naming of arguments and local references is just as important. Zac Tellman has some great
thoughts on naming in his ['Elements of Clojure'](https://leanpub.com/elementsofclojure) book.

If namespaces and naming of variables are used effectively they can help minimise the cognitive load of holding a mental
model of the inputs and outputs to a function. Good naming of arguments and local references can give you a head start
in figuring out what the input and output data looks like.

One of the Clojure developers I worked with and have a lot of respect for (John Cowie) suggested that developers use
namespaces to separate out the data manipulation code that requires, and in some ways defines the 'shape' of the data,
so that developers have one place to go to find that mental model. Although, I agree with this approach, this only
tackles part of the problem. The 'data model' for the data at the interfaces of the system, input and output, can be
isolated in this way but the data into and out of each function is linked to the function.

Clojure 1.9 provides Spec to help with exactly this problem and before Spec there was Plumatic Schema [TODO - provide
references to Spec and Schema]. The advantage of both of these libraries is that you can move fast, not specifying the
input and output data, to start with and add the detail when the problem is better understood. Getting the best (and
arguably worst?) of both worlds between static and dynamic typing.

However, specifying the arguments to every function in detail without a compiler to verify that specification is a very
laborious task. In addition, in my experience, just like adding tests later, adding Spec/Schema later rarely happens.



The things I want to talk about apply equally to others but other languages manifest these concerns
differently. Although many will focus on the issues here being a fac
