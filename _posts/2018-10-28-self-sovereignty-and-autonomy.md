---
title: "Self-Sovereignty and Autonomy"
categories: 
  - blog
  - decentralization
  - identity
  - ssi
type: "blog"  
layout: single
author_profile: true
read_time: true
comments: true
share: true
related: true
toc: true
description: "Or, how to bring human political values to a machine economy"
excerpt: "Like languages, technologies can drift into mutual incomprehensibility after enough drift and specialization: dialects becoming languages, translators become necessary, and thus dictionaries and reference grammars becoming necessary for scaling them up."
defaults:
  # _posts
  - scope:
      path: ""
    values:

---

_Note: This piece was slightly adapted from the [company blog](https://medium.com/spherity/ssi101-self-sovereignty-and-autonomy-1874af797b4d) of the self-sovereign identity ("SSI") concern, [Spherity GmbH](https://www.spherity.com/), where I worked at the time._

## Abstract

One of the trickiest concepts to explain about SSI is the definition and scope of “sovereignty”.
To do so, we’ll start by defining the term in the abstract, and then in contrast to related, near-synonymous terms.
Then we’ll explain why we use the term at Spherity, and how “self”-sovereignty and the related term “autonomy” work for the non-human identities we discussed in the previous post.

## Sovereignty

Sovereignty is a term borrowed from the political sciences and rarely used outside of them.
Its meaning is similar to (but not synonymous with) control, rule, or power over others.
A king or queen, or an administration working in their name, is said to be “sovereign” over each subject, who must work within and under that sovereignty or be banished from the land.
To put it another way, control, rule, or power can be renegotiated over time and in different contexts, but sovereignty is existential, definitional, and inherent.
In software terms, you could say sovereignty is the protocol layer of politics.

Given this backstory from the history of politics, “self-sovereignty” might seem a hyperbolic term to use for a system of better data controls, and yet, here we are, over ten years into writing about software using this term.
Couldn’t we just call what we are building “self-managed data” or “self-administered identity,” one might reasonably ask oneself? We could, of course, and in many contexts we do, because not every application of this technology has as its goal the total data sovereignty of all participants.
Some smaller, local applications have a more limited scope, like managing data better in a given context.
Similarly, there are contexts where the political connotations of the term “sovereignty” can get in the way, as meeting with regulators from sovereign federal banks or sovereign wealth funds.
In these contexts, it can be strategic to refer to an SSI data system by another, near-synonymous term.

One of the key organizations working in SSI is called the [Decentralized Identity Foundation](https://identity.foundation), taking its name from the nearest neighbor to SSI, “decentralized identity.”
This term is often used in the context of the so-called “Web 3” movement, which includes some coalitions between businesses and civil society that work toward a more censorship-resistant and individual-centric internet, and in some cases even a more capital-resistant one.
Most of the key reference points in decentralized identity are SSI schemes, although SSI is not the only decentralized system of identities;
proof-of-personhood systems like [Idena](https://idena.io), for instance, do not encode data or make it verifiable to third parties, they simply allow identity to be self-asserted in a decentralizing way.

Similarly, many people refer to SSI as “blockchain identity,” since most existing SSI implementations anchor identities to blockchains or digital ledgers, and because blockchain-based businesses are more likely than most web business to need an identity layer for stability, compliance, and security without relying directly on credit cards and banks.
There are cases (some of Ethereum’s identity-encoding ERCs, for example) in which a blockchain might be used to anchor self-managed identities without necessarily making data signed by those identities externally verifiable.
For this reason, we believe using a blockchain to self-manage identities is not enough to make an identity fully “self-sovereign”;
some kind of worldwide standard needs to be put in place to make data portable enough and verifiable enough outside the domain of the anchoring blockchain.

![18th century etching of Napolean crowning himself](/assets/static/napoleon.webp)

_Examples of true self-sovereignty are rare in human history. Mostly, politics is messy and compromised._

So with all these handy near-synonyms, why stick to the loaded and individualistic image of a self-crowning monarch, existentially empowered to command all of his or her data?
We believe all of the seemingly near-synonymous terms we’ve mentioned above leave out one or another key feature of self-sovereignty:
identity must be self-issued, but it must also be portable and verifiable, in a way agnostic to specific networks or blockchains.

## Why and How Spherity uses the term “sovereign”

The reason Spherity and other SSI practitioners stick to such an emphatic framing metaphor is that we share with the early SSI thinkers a commitment to existential, definitional, and inherent change in the way data is handled at the lowest levels.
We do not want contextual or negotiable shifts in data sharing regulations or in the design of Terms of Use contracts.
We want foundational changes in the “ground rules” of data power:
instead of a “right to be forgotten,” which would be submitted as a request to the still-sovereign Data Controllers who might or might not honor such a request, we want subjects of data to get direct access to a “delete” button (or, to be more precise, a cryptographical “forget key” button).
Instead of a promise to only share a subject’s data in the ways originally agreed to, we want a form of data that cannot be shared in any other way, because the sovereignty of that subject is encoded in the 1s and 0s of the protocol by which the data itself is lent and transferred.
Shifting that much power back into the hands of the data subject could well make kings and queens obsolete, and by extension, today’s Data Barons and “identity providers” might cease to be relevant as well.

But then, who is the “self” in self-sovereignty, particularly when such a wide range of non-human selves can hold identities?
To extend the argument of the first entry in this series, anything with an identity can have a self-sovereign identity in data terms, even a machine or an algorithm or a car or a smart device on the dumber end of the spectrum.
Applying the very human-centric concept of “sovereignty” to robots and algorithms might be a little premature in 2019, however.
Instead, we find it more appropriate to speak of the “autonomy” of these non-human entities, which can act in the physical and digital world without necessarily demanding such human rights as privacy protections and a right to be forgotten.
Those “human” aspects of the SSI paradigm are instead exerted by the human “controllers” (owners, administrators, leasors, etc) to which these functions are delegated in our system, or in any other SSI system that has taken care to architect in these complexities.

Detail from Spherity’s website graphics by Mariüs Goebel
In many cases, the sovereign “self” is an autonomous piece of software or hardware.
All this might sound a little less abstract with an example or two.
Think, then, of a smart car that automatically send self-diagnosis reports to a maintenance network, or a factory robot that is owned and operated by an OEM manufacturer, with different technicians authorized to reprogram it or fine-tune its algorithms over time.
The owner of a car and the operator of an industrial robot operate on the data of these autonomous machines in a powerful way through an SSI interface, which checks their credentials and leaves a detailed audit trail of all such operations.
The rest of the time, however, these cars or robots are practicing their autonomy unfettered.

Day in and day out, autonomous machines make “decisions” about their own physical-world functionality, shutting down to avoid damage or finding more efficient ways to do their work.
They can make “decisions” in the digital world as well, such as whether to establish trusted communications with a smart traffic light or a third-party freight delivery robot.
On the other hand, more nuanced legal and business questions about data privacy, licensing fees, or consent to data usage, will probably remain “out of scope” for the programming of such devices for decades to come.

## The Sovereignty of Autonomous Things

Real-world decisions, particularly legal and business decisions, are now, and will probably always be, taken in the human world by the legal department or the financial department of the company that owns and operates the device.
The outcomes of these decisions can still be explicitly defined in machine-readable values and settings, which can be stored in the machine’s decentralized, portable data object for all trade partners with a legitimate stake in that data, and all future interlocutors in the lifecycle of the machine.
In this sense, while full sovereignty over the machine’s data might require a little help from human controllers to exercise, the data itself still needs to be fully portable and accessible to all authorized parties, regardless of the current owner.
In this sense, the machine’s data can be fully sovereign even if it needs outside intervention to change or process all of it. 
(More concrete, detailed examples will follow in the industry-specific 201 posts guiding you through the complexities of delegated data control and machine life-cycles.)

The “autonomy” of a self-driving car or a self-optimizing production robot is thus complex enough to require a fully-formed, programmable and interoperable digital identity, even if some of the “human-only” data functions still happen “upstream” at the level of rightful human controllers.
This will likely not change for decades, at least not until truly “sovereign” machines and algorithms begin to replace merely “autonomous” ones decades from now.
While a lot more could be said about different schools of thought within “self-sovereign identity” and how Spherity’s approach to non-human identities differs from that of other companies, we can return to these later in a later, more focsed post about terminological strategy.
