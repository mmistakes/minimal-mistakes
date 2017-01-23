---
title: "Design for change [draft title - need something better]"
excerpt: "Behaviour first- Data first class"
layout: single
comments: true
---

One of the only constants in software development is change.

We should design for change.

This means defer design decisions as late as possible...
  * in the time line of development
  * and in the design itself

Don't fix things too early..
  * sub-optimisation.
  * OOP tends to concrete ideas early.
  * trad. data modelling
    * static view
    * fixed

model messages instead
  * data fixed only at edges of system
  * expressive way of sharing data vocabulary across components -Spec
    / Schema

Push decisions about data models to the edges of the components as
much as possible.

Model messages not the static data structure of the 'objects' in the
system.
Maintain raw message formats in system to allow retrospective design
decisions to be applied.
  * event sourcing

Use localised transformations to more optimal formats
  * local data stores
  * local message formats

Can still have caononical message formats for to localise validation
and data cleansing if the 'system' of co-operating components is in
the same domain (DDD?).

Eery decision to optimise for commnon code fixes design decisions so
be careful around lossy message formats.

If each component in the system has it's own clear responsibilities
then generally it will have it's own data format and it's own rules
around validation etc. Therefore, you need to decide how much benefit
can be gained by centralising design decisions around data model?

[//] # investigate graphQL as well
