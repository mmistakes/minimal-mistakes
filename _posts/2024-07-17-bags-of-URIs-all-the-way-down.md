---
title: "The DAO Question: Bags of URIs All the Way Down"
categories: 
  - blog
  - decentralization
  - DAO
  - blockchain
  - identity
type: "blog"  
layout: single
author_profile: true
read_time: true
comments: true
share: true
related: true
toc: true
description: "What DID method(s) do DAOs need, or deserve?"
excerpt: "."
defaults:
  # _posts
  - scope:
      path: ""
    values:

---

## Context

After building and widely deploying [tooling for DAO record-keeping based](https://github.com/metagov/daostar?tab=readme-ov-file#introduction) on the Ethereum standard [ERC-4824])(), DAOStar found itself a little [stumped](https://github.com/metagov/daostar/issues/213) on how to "v2" its contingent "identity system".

After discussing the problem widely with stakeholders inside and outside of that community, Joshua Tan asked me to propose a technological approach to the para-legal identity of decentralization autonomous organizations.
I do not claim to be an expert in any of the domains touched by this problem set, but at least I'm comfortable proposing solutions to thorny interdisciplinary problems, which seems to be the prime qualification for this kind of work.

I'll start with my understanding of the main problems that could be solved by a DAO identifier scheme (be it a DID method or otherwise), sketch out the shape of a solution, and then make a few concrete proposals at a high level.
Doing any more single-handedly wouldn't be appropriate, so I'll throw that bucket of chum into the deliberative waters and see what questions and next steps the groups come up with.

## Problems

### Provocation: Opt-in Civilization

DAOs are, like blockchains themselves, willful things.
The problem of identifying a DAO is the first step towards defining and stabilizing a subset of all possible DAOs and calling that "most DAOs," in a pragmatic step towards maturity or at least maturability.
Opting into an identification scheme, in the best of cases, would reach a kind of Pareto distribution, allowing 80% of DAOs to sacrifice a little of their freedom to scale up organization, record-keeping, and (if I may be so bold) even legal infrastructure appropriate to a novel form of property-first legal person.
But first, a tiny excursus: upon what cartoonishly opt-in basis does the DAO even exist to be the referent of an identification?

Axiomatically, private money (with or without fancy cryptographically-enabled actor models) wills itself into being, and self-assigns a degree of rights-granting power normally reserved for sovereigns.
(Furthermore, private moneys routinely invite subjects of other crowns to challenge their respective sovereigns for the right to partake of its bounty).
From there, actors granted property rights by that self-sovereign money system find that money without a court system or more complex forms of collective ownership, coordination, and cooperation are stymied by having invented a society ex nihil.
From this reverse-engineering (or speedrunning) of the early days of capital, the DAO is born, a legal person without a court, a stateless corporation.
What will be its by-laws, and how can anyone else be expected to enter into contracts or relationships with this mysterious legal Odradek, the legal person composed entirely of unnamed foreigners, which does business under no nation's laws?

![Twitter ad for the Bitcoin Voter Project.org](/assets/static/bitcoinvoterproject.jpg)

But can a self-willed non-jurisdiction recognize organizational forms, and expect actual jurisdictions to honor that recognition according to the reciprocity of jurisdictions?

> If capital is coded in law, how can global capitalism
exist in the absence of a global state and a global legal system? / 
The solution to this puzzle is surprisingly simple: global capitalism can be sustained, at least in theory, by a single domestic legal system, provided that other states recognize and enforce its legal code.
Global capitalism as we know it comes remarkably close to this theoretical possibility:
it is built around two domestic legal systems, the laws of England and those of New York State, complemented by a few international treaties, and an extensive network of bilateral trade and investment regimes, which themselves are centered around a handful of advanced economies.

### Provocation: Identity Within and Beyond a Blockchain

> using a blockchain to self-manage identities is not enough to make an identity fully “self-sovereign”

### Provocation: Ships of Theseus All the way Down


### Provocation: What even does anyone mean when they say "DID"?

Depending on whom you ask, a DID method can be:

1. a **URI scheme with a resolution mechanism** stapled to it
2. an **export format** for identity documents allowing actors outside that that system to deterministically and transparently fetch the current document for a given URI
3. a **bag of keys** and, optionally, endpoints (both serialized as URIs) that can be fetched for any specimen of a given type of actor in a DPKI (decentralized public key infrastructure) system
4. a specification formalizing how to **dereference a URI to**... a document containing **more URIs**
5. an abstraction allowing a **cryptographic identity to mutate** (i.e. rotate, grow, and shirnk) verifiably over time
6. a user's manual for a **censorship-proof and resilient** identity-document substrate
7. the constitution for a service that dereferences URIs to **certified documents**, whether by delivering self-certifying documents or by certifying the documents it delivers

While this might sound like hyperbole, I have attended in-person meetings of the DID Working Group over the years, and each of these is actually a flippant parody of the working definition various key members of that working group hold and act on (and, debatably, pull the rest of the working group towards over time).
There *has* been some progress over time to tighten this loose bag of purposes, such as my old boss Wayne Chang's [ideological intervention](https://blog.spruceid.com/upgradeable-decentralized-identity/) arguing for a [feature-matrix approach](https://gist.github.com/jceb/8e37e4900e815eb14b207ad7e8d02a6c) to DID interoperability and migration thinking.
But fundamentally, we're still here, trying to figure out what generalization is worth making about DIDs, when there is such diversity between their URI schemes and their resolution mechanisms, each grounded in a radically different _kind_ of ground-truth-producing system.



## Proposals