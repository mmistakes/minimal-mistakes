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

Axiomatically, private money (with or without fancy cryptographically-enabled actor models) wills itself into being, and self-assigns a degree of rights-granting power normally reserved for [sovereigns](https://learningproof.xyz/self-sovereignty-and-autonomy/#sovereignty).
(What's more, private monies routinely invite subjects of other crowns to challenge their respective sovereigns for the right to participate in their novel off-shore economy).
As actors granted property rights by that self-sovereign money system pile in and start interacting with on another in novel, even experimental ways, the complexity of that system grows and bumps up against its insularity, particularly as dollar amounts snowball and conflicts with them.
But how and where to sue your rugpuller?
How to borrow against an onchain fortune in the offchain world, or vice versa?
How to transact onchain about any but the least well-regulated of services and intangibles?
The pioneers of the new world find themselves sorely lacking in legal groundtruths.

![Twitter ad for the Bitcoin Voter Project.org](/assets/static/bitcoinvoterproject.jpg)

From the earliest reverse-engineering (or speedrunning) of the early days of capital, the DAO is born, a legal person without a court, a stateless corporation, a legal fiction within a monetary one.
What will be its by-laws, and how can anyone else be expected to enter into contracts or relationships with this mysterious legal Odradek, the legal person composed entirely of unnamed foreigners, which does business under no nation's laws?

> If capital is coded in law, how can global capitalism
exist in the absence of a global state and a global legal system? / 
The solution to this puzzle is surprisingly simple: global capitalism can be sustained, at least in theory, by a single domestic legal system, **provided that other states recognize and enforce its legal code**.
Global capitalism as we know it comes remarkably close to this theoretical possibility:
it is built around two domestic legal systems, the laws of England and those of New York State, complemented by a few international treaties, and an extensive **network of bilateral trade and investment regimes**, which themselves are centered around a handful of advanced economies.

(Emphasis added. Katherine Pistor, The Code of Capital, A Code for the Globe, [Princeton University Press, 2019](https://press.princeton.edu/books/hardcover/9780691178974/the-code-of-capital))

Fundamentally, a DAO is legally an organizational form in much the same way that a cryptocurrency is legally money (and/or commodity and/or security):
on a self-certifying and self-documenting basis, it petitions the state to be considered equivalent by pleading its case based on novel forms of documentation, registration, and transparency.
This "petition" can hopefully scale up over time as more DAOs re-use common mechanisms, data models, and organizational forms; that is, of course, the work of DAOStar and Metagov more generally.
But where the approach has so far failed is that using [one] blockchain as both record-keeping system and source of truth requires a state to recognize that blockchain legally;
a DAO has opted in to both _the_ blockchain in general, and _a_ blockchain in particular, all but requiring a government to follow it into both acts of faith if the evidence it brings to be taken at face value.

On both sides of the national/extra-national divide, much faith (or at least a lot of translation and corroboration) is needed here before the petition can land.
Not all DAOs will want to be identified in a legally-recognizable (and therefor liability-multiplying) way, just as many jurisdictions will not recognize stateless organizations in any form no matter how convincing the analogies.
To put it baldly, most legal systems will only and _can_ only act on (or even more fundamentally, even _recognize_) a DAO's claims relative to its recognition within a legal system to which it is already deeply federated and with which it is already deeply interoperable.
In this regard, regulatory arbitrage has already paved the way for nations to compete on open-mindedness and accept risk in exchange for investment from mobile capital;
in DAO recognition terms, this means DAO-curious jurisdictions are volunteering to act as a kind of legal "entry point" where a stateless organization can get some tentative or partial recognition qua legal form, which federates out from there over a network of mutual recognitions.

An "identity" made up of non-repudiable, public claims (at bare minimum, claims about membership and control, optionally perhaps applicable law or other liability schemes) is, indisputably, the first step in that direction and a necessary but insufficient ground upon which to make sure claims to existence and exertions of rights.

### Provocation: Identity Within and Beyond a Blockchain

> Using a blockchain to self-manage identities is not enough to make an identity fully “self-sovereign”

(Src: Me, [2018](https://learningproof.xyz/self-sovereignty-and-autonomy/#sovereignty))

There are many ways in which a blockchain is a less unitary and definitive ledger of social consensus than people like to admit: each layer on which a blockchain identity is contingent adds to the cross-chain and off-chain contingencies piled up behind the word "identity".
I'll walk through these quickly as a kind of to-do list, which any reasonable blockchain-based organization would have to address.

The most obvious of these are so-called **hard forks**, whereby the community of actors and participants in a cryptographic consensus system splits by a kind of cellular mitosis and produces two branches of one linkedlist of shared state.
The early years of blockchains as economic systems saw them compete in relatively primitive and direct ways, interoperating as little as possible and spawning forks off of "mainline" Bitcoin one after the other every time a minority reached critical mass to survive a succession.
An identity rooted in a blockchain can only be as stable or unambiguous as the identity of the blockchain itself: furthermore, there needs to be a strict 1:1 mapping of blockchain identifier to the ledger or cryptographic substrate vouchsafing it.

The social consensus to **intervene directly in chain-state** and reverse the damage of the famous "DAO Hack" caused a particularly contentious and ideological hard fork in early Ethereum's fledgling community.
If Bitcoin's many forks and carbon copies showed the fragility of userbases and social contracts, the genesis of Ethereum Classic shows that even within the opt-in construct of a blockchain, coalitions of the powerful can move mountains and reverse commits.
What the DAO Hack remediation achieved by extra-technical means, a garden-variety 51% attack can also achieve within code: the data is only as good as the consensus around its production.

There is an obvious, commonsensical appeal to registering an organization on the global state machines powering 24/7, always-on capital markets.
But some of those global all-powerful state machines (*cough, cough* SOLANA) just **go down sometimes, for a day at a time**.
Others have their node<>node networking intercepted by Great Firewalls or cyberwarfare brown-outs, and the oceans haven't even really started boiling yet.
How does an on-chain entity square its internal records with what happens off-chain during, say, a daylong blackout, or a continent-wide brownout?

In the traditional world of finance, locking up assets as collateral to borrow something else, then locking _that_ up as collateral, or speculating with cash borrowed against unpaid but legally-binding invoices, or other forms of risk-multiplying leverage stacking, is called **hypothecation** and it is tightly regulated and monitored to contain its worst case scenarios from creating domino effects in the capital markets.
On blockchains it's just called "DeFi" and glorified as a value unto itself.
Those domino effects can cause prices to swing so much that even banal things like "gas" (per-transaction usage costs) and transaction speeds are affected for unrelated co-users of the same system (like DAOs or DIDs).

Multichain

### Provocation: Ships of Theseus All the way Down

> Even vanilla legal entities are leaky abstractions over leaky ships of Theseus.

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

## The Shape of a Solution

## Proposals