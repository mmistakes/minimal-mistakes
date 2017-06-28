---
title: "TDD - That's Design Done"
excerpt: "... a fine grained tool, and as such should be used where appropriate but it's not a religion."
layout: single
comments: true
header:
  overlay_image: /green-stop-light-clipart-658-traffic-light-design.png
  overlay_filter: 0.25 # same as adding an opacity of 0.5 to a black background
  caption: "That's design done"
  teaser: /green-stop-light-clipart-658-traffic-light-design.png
---

# TDD - That's Design Done #

For many years now there have been internet flame wars about TDD in
the software development community.

Most people I talk to involved in software development seem to have
strong opinions for or against Test Driven Development and some of the
heated discussions on forums have become as passionate as arguments
over politics or religion.

I am going to take a tongue in cheek look at some of the
characterisations of the different sides of this long running argument
so I'm guaranteed to offend everyone!

On one side are the proponents of TDD as a way of life for developers.

## Test Driven Disciples ##

The strict adherence to the process and disciplines of
failing-test-first/implement-test/pass/re-factor/repeat
conjures up images of the developer equivalent of the warrior monks of
China. Developers rising before the sun to practice their code kata,
lines of practitioner hunched over keyboards applying the steps of TDD
as if driven by a metronome, each successful invocation of the 'green'
genie of a passing test accompanied by a Kiai of triumph.

What they think of as the studied concentration of practised
discipline is often perceived by non-TDDers as the slavish adherence to
an unthinking cult. Mindless automatons relentlessly 'mocking' real
design to produce a disconnected, disassociated collection of classes
that clog the understanding of the problem space with unnecessary
layers of abstraction.

------------------------------

On the other are the haters of TDD. More difficult to categorise, they
form their own little bands of rebels.

## Anarchy of 'Testless' Development ##

### The Code Warriors ###
This post apocalyptic band of 'code' warriors hack code as fast as
they can to meet delivery 'dead'-lines set by the cruel warlords of
the project management cult. They have no time for testing of any
kind. Testing is for 'wimps'!

Many don't survive this brutal and unforgiving landscape, brought to
an untimely end by premature release schedules. The hardened veterans
carry scars, missing the figurative 'limbs' of code quality,
professional pride bleeding into the sand of the unforgiving desert of
the 'immaculate schedule'.

### The Afterthoughts ###
Usually made up of outcasts and refugees from the hardened 'Code
Warriors', the Afterthoughts do write tests, if their evil project
management overlords allow. Their tests are added after the code has
been implemented and sometimes after it's been shipped.

This tribe of zombie-like figures are characterised by the harassed
and haunted 1000 yard stares as they struggle to reverse engineer
tests over code that is frequently tightly coupled, riddled with
multiple responsibilities, mutated parameters and static
references. To them tests are seen as a necessary evil to clear the
razor wire fence of the arbitrary unit test coverage percentage.

### The Imagineers ###
This magic Faye folk are hard to see and even harder to catch. They
are almost ephemeral and mythical. If you do see them it will be out
of the corner of your eye when they are lounging in a hammock thinking
and when you look again they will have vanished in a puff of magic
logic. They have the mystical ability to visualise complex designs
almost fully formed from thin air.

Although they may write tests, these are most likely to be end to end,
system or integration tests. They have no need for unit tests as a
means of developing code as their astonishing brains and supernatural
vision enable them to see the most complex code paths and data
structures as if they were ghostly apparitions realised in the
swirling mists of an architectural seance.

------------------------------

# So to TDD or not to TDD? #

So putting aside the sarcasm and the terrible similes, should you use
Test Driven Development or not? Does it fulfil the promise of
evolutionary design claimed by it's adherents or is it the 'snake oil'
claimed by it's opponents?

Well, firstly a caveat, the following are the opinions of the author
based on 16 years of software design before using TDD and 12 years
since using it. Most of my opinions have been formed by the
experiences I have had and, more relevantly, by the way my brain
discovers and visualises problems and abstract concepts, YMMV.

## What has TDD ever done for me? ##

Most of my professional programming life has been spent writing in either
procedural or object-oriented languages. In addition, they have been
statically 'typed' _(typing is a lower level concept in COBOL and
FORTRAN but you need to declare primitive variable structures up front
so I'll count it)_. Given these environments TDD gives me a number of
properties.

### Test coverage ###

Although I used to write unit tests fairly thoroughly as a COBOL
programmer, and these tests were even written in advance, they
were not automated and therefore hard and expensive to reproduce. TDD
is not synonymous with automated testing and although you can have the later
without the former my personal experience is that 'test after' will
always be sacrificed to the pressure of delivery.

Therefore, TDD, or at least 'test first', tends, in real world projects,
to produce better automated test coverage at a fairly fine grained
level (more on that later).

### Feedback ###

Again this opinion is definitely flavoured by the OOP languages I've
written in _(mainly Java, a bit of C++ and C#)_ but, unlike the
'Imagineers', I have trouble visualising detailed designs fully formed
without a bit of exploration of the concepts and the data involved.

In a language like Java it's quite hard to 'try out' and visualise how
data needs to be transformed or what low level abstractions are
present in the problem space. As I tend to explore problems from both
the top down and bottom up I find it useful to probe at data for
insight.

Without TDD the usual option to discover emergent design in 'the micro'
is to run code liberally peppered with print statements or add break
points and step through with a debugger.

I find TDD gives me quick feedback but has the advantage over print
statements or break points in that the tests don't need to be unpicked
from the production implementation and that they act as
institutionalised memory and capture the abstractions realised so far
so that you don't have to use cognitive load in holding a mental model
of every low level data structure and it's current state.

### Confidence ###

This one is definitely open to challenge and is almost the same point
as in ['Test coverage'](#test-coverage).

Having a network of tests written up front against the low level
design criteria means that you have some level of confidence that the
lower level design satisfies your understanding of the problem and
therefore you have some measure of the 'completeness' of your
solution. If you've fulfilled the tests for that small part of the
design you have completed it to your current understanding.

Of course this presupposes that your tests accurately reflect the
problem and that your understanding is accurate but this is a problem
regardless of TDD.

<!-- Mocking heavily gives 'false' confidence - mention later when you -->
<!-- challenge TDD approach. -->


### Test-ability ###

One advantage of test first is that in order to write tests up front
you have to drive the low level design to be 'testable'. This means
that if you're lazy and impatient, like me, you will want to get
your test to have as little set up as possible and only verify one
thing per test.

This inherently tends to lead to a design that favours
small methods and objects with few dependencies and one responsibility

<!-- Refactoring in the micro. Double edged sword as in the macro to -->
<!-- the weight of tests slow development -->

### 'Change net' ###

Another side-effect of writing a lot of automated tests is that when
you want to make changes to one part of your system the tests for the
part of the system you have not changed will inform you if you've made
any breaking changes. I call this the 'change net', a bit like the
concept of a safety net.

This kind of failure on change of a different
part of the system will flag coupling that you may not have been aware
of and give a trigger to reconsider the design.

Although this effect can be achieved with good test coverage written
after the implementation, as discussed, it is not typical in practice to
get high levels of test coverage in the real world if tests are
written after the fact.

In addition, the practice of writing new tests or modifying existing
tests to reflect the change about to be made can give a guide as to
when the change has been completed as the tests will fail until this is so.


<!-- Safety net around change. Bug fixing -->


### Communication ###

A few years ago I employed an experienced developer with a lot of TDD
experience. She came into a team where the first version of the
software had been released and we were working on version 2. I was the
lone web developer on the team and had written all the code to serve
the dynamic web application.

As, at the time, I was the CTO of the consultancy concerned, I was
constantly involved in short term consultancy work and a lot of
presales activity and therefore out of the office on client sites a
lot of the time.

I had about 3 hours to explain the project on Monday
morning before I had to leave and I wasn't back in the office until
Wednesday afternoon.

I got back on Wednesday and asked said developer how she was getting
on (apologising profusely for leaving her with such little
support). She replied:

> Initially I was a bit lost, then I started to read your tests and
> I've already implemented the first enhancement for version 2

Again, this is not the exclusive territory of TDD as any well written
test harness can provide this 'living' document, and BSD style tests
are even more effective, but in the real world TDD grown tests provide
a useful starting point.

Communication through tests - nuff said.

<!-- documents low level decisions. -->

## So TDD is a 'no brainer' then? ##

So TDD is a 'no brainer' then? Well, yes, sometimes it is implemented
with no brains.

Lets look at the potential negatives:

### You're mocking me ###

A frequent criticism of TDD is that it leads to a lot of the objects
that interact with the 'system under test' _(probably a class or method
in OOP, more on that later)_ being replaced with mocks that are
'primed' with a canned response for each test case. The argument is
that this can lead to:

1. False positives as mocked 'objects' behave as expected but actual
ones don't.
2. Designs that introduce layers and/or abstractions that are simply
there to support mocking.

Tackling the second point first, I've never seen this in the wild
myself but I've seen people cite examples. My own feelings are that
this is rare and that the abstractions introduced in most cases are
improvements that reduce coupling rather than introduce more.

The first point I have more sympathy for. I've definitely seen this
'mocking masking behaviour' issue in codebases including my own
code. I think the antidote to this is:

1. Try and use the TDD 'classicist' approach and only mock external
interactions with your system if possible.
2. Try to design your code to use less side effects<sup>1</sup> and pass most
arguments as immutable values as this makes each method/function
testable without using mocks at all.
3. Pick your 'unit to test' carefully. Try and test a single
behaviour from end to end rather defaulting to testing methods and
classes as units.

<sub>[1] A side effect is when a method, function or procedure acts upon
something other than it's inputs and outputs. For example, it may
write to some output device, read input from some external source or
change some stateful value.</sub>

<!-- Sometimes the mock everything style of TDD drives abstractions -->
<!-- that are unnecessary and a distraction -->

### Tests, tests everywhere and not a drop to think ###

TDD, in it's purist form, focuses mainly on lower level abstractions and
the 'fine detail' of your application design. This tends to drive a
"can't see the wood for the trees" perspective where attention to
detail means you lose sight of the bigger picture and therefore miss
opportunities to employ alternative approaches.

An antidote to this is to practice TDD 'in the large' as well,
otherwise known as behaviour driven development (BDD) a specialisation
of specification driven development<sup>2</sup>. By considering the
acceptance criteria of each 'feature', 'property' or 'story' first and
codifying them in, preferably automated, tests you will be drawn back
up to the level of considering the larger components and the system as
a whole whenever you run and amend these BDD tests.

<sub>[2] I'm thinking of trademarking Geek Driven Development.</sub>

<!-- Argument that focusing on tests and lower level abstractions -->
<!-- causes a kind of detail blindness that doesn't encourage stepping -->
<!-- back to look at other solutions -->

### Your tests are a big (re)factor ###

Again, this is not exclusive to TDD, but a side effect of using TDD is
that you frequently have a lot of tests. Many of these tests may be
covered by higher level acceptance, system and integration tests.

This is fine until you have to introduce a change to the design that
involves refactoring. This kind of change may involve rewriting tests
at unit (traditionally where TDD sits), component and system level
resulting in three times the effort.

There are several ways to mitigate this.

Following the techniques mentioned in ["You're mocking me"](#youre-mocking-me) will reduce the
amount of 'white box' testing you do and therefore reduce the amount
of low level changes required.

Using your test coverage tool _(you do instrument your tests with a
test coverage tool right?)_ will help identify when your code is
already exercised by higher level tests. Given this information it may
then be possible to use TDD at the fine grained level to act as
feedback when writing methods/functions/procedures but delete some of
those tests once the implementation has been developed as they're
already covered at the higher level.

<!-- lots of detailed low level tests tend to repeat test coverage at
higher levels of abstraction so leading to a lot of effort in change
as you have to refactor swathes of tests at multiple levels to make a change-->

# Conclusions #

So where does that leave TDD?

In my opinion, TDD is a useful tool for providing feedback and a level
of confidence when developing low level design constructs.

It's a fine grained tool and is useful in the micro.

However, it's of limited use in the design of high level concepts, like:

* what are your components?
* what are the public APIs?
* how should you delineate responsibilities within your components
(i.e. packaging, namespaces, etc)


All of these can use TDD in a supporting role but they need other
tools like thought about architecture/design and context _(possibly
documented in the form of diagrams and documents, wikis,
etc.)_. TDD is useful in some languages to provide a feedback loop as
described in [Feedback](#feedback) but there are other tools that can
provide this in certain languages, for example a REPL<sup>3</sup>.

TDD has it's place and should be used where useful. I think of it as a
watch makers screwdriver, a fine grained tool, and as such should be
used where appropriate but it's not a religion.

<sub>[3] Read Eval Print Loop</sub>
