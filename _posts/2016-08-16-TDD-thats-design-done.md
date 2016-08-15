# TDD - That's Design Done #

For many years now there have been internet flame wars about TDD in
the software development community.

Most people I talk involved in software development seem to have
strong opinions for or against Test Driven Development and some of the
heated discussions on forums have become as passionate as arguments
over politics or religion.

I am going to take a tongue in cheek look at some of the
characterisations of the different sides of this long running argument
so I'm guaranteed to offend everyone!

On one side are the proponents of TDD as a way of life for developers.

## Test Driven Disciples ##

The strict adherence to the process and disciplines of failing test
first-implement-test pass-refactor-repeat conjures up images of the
developer equivalent of the warrior monks of China. Developers rising
before the sun to practice their code kata, lines of practitioner
hunched over keyboards applying the steps of TDD as if driven by a
metronome, each successful invocation of the 'green' genie of a
passing test accompanied by a Kiai of triumph.

What they think of as the studied concentration of practised
discipline is often percieved by non-TDDers as the slavish adherence to
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

Many don't survive this brutal and unforgiving landscape, brought to an untimely end by premature release
schedules. The hardened veterans carry scars, missing the figurative
'limbs' of code quality, professional pride bleeding into the sand of
the unforgiving desert of the 'immaculate schedule'.

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
structures as if they were ghostly apparition realised in the
swirling mists of an architectural seance.

------------------------------

# So to TDD or not to TDD? #

So putting aside the sarcasm and the terrible similies, should you use
Test Driven Development or not? Does it fulfil the promise of
evolutionary design called by it's adherents or is it the 'snake oil'
claimed by it's opponents?

Well, firstly a caveat, the following are the opinions of the author
based on 16 years of software design before using TDD and 12 years
since using it. Most of my opinions have been formed by the
experiences I have had and, more relevantly, by the way my brain
discovers and visualises problems and abstract concepts, YMMV.

## What has TDD ever done for me? ##

Most of my professional programming life has been spent writing in either
procedural or object-oriented languages. In addition, they have been
statically 'typed' _(not sure if typing quite applies to COBOL and
Fortran but you need to declare primitive variable structures up front
so I'll count it)_. Given these environments TDD gives me a number of
properties.

### Test coverage ###

Although I used to write unit tests fairly thoroughly as a COBOL
programmer, and these tests were even written in advance, these tests
were not automated and therefore hard and expensive to reproduce. TDD
is not synonymous with automated testing and you can have the later
without the former my personal experience is that 'test after' will
always be sacrificed to the pressure of delivery.

Therefore, TDD, or at least 'test first' tends in real world projects
to produce better automated test coverage at a fairly fine grained
level (more on that later).

### Feedback ###

Again this opinion is definitely flavoured by the OOP languages I've
written in _(mainly Java, a bit of C++ and C##)_ but, unlike the
'Imagineers' I have trouble visualising detailed designs fully formed
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
as in ['Test coverage'](#Test_coverage).

Having a network of tests written up front against the low level
design criteria means that you have some level of confidence that the
lower level design satisfies your understanding of the problem and
therefore you have some measure of the 'completeness' of your
solution. If you've fulfilled the tests for that small part of the
design you have completed it to your current understanding.

Of course this presupposes that your tests acurately reflect the
problem and that your understanding is accurate but this is a problem
regardless of TDD.

#+BEGIN_NOTES
    Mocking heavily gives 'false' confidence - mention later when you
    challenge TDD approach.
#+END_NOTES
### Testability ###

One advantage of test first is that in order to write tests upfront
you have to drive the low level design to be 'testable'. This means
that if you're lazy and impatient, like me, you will want to to get
your test to have as little set up as possible and only verify one
thing per test.

This inherently tends to lead to a design that favours
small methods and objects with few dependencies and one responsibility

#+BEGIN_NOTES
    Refactoring in the micro. Double edged sword as in the macro to
    the weight of tests slow development
#+END_NOTES

### Change 'net' ###

Another side-effect of writing a lot of automated tests is that when
you want to make changes to one part of your system the tests for the
part of the system you have not changed will inform you if you've made
any breaking changes. This kind of failure on change of a different
part of the system will flag coupling that you may not have been aware
of and give a trigger to reconsider the design.

Although this effect can be achieved with good test coverage written
after the implementation as discussed it is not typical in practice to
get high levels of test coverage in the real world if tests are
written after the fact.

In addition, the practice of writing new tests or modifying existing to reflect the change
about to be made can give a guide as to when the change has been
completed as the tests will fail until this is so.

#+BEGIN_NOTES
    Safety net around change. Bug fixing
#+END_NOTES

### Communication ###

Again, not
#+BEGIN_NOTES
    documents low level decisions.
#+END_NOTES
