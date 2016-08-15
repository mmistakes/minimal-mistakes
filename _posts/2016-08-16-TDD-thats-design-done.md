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
