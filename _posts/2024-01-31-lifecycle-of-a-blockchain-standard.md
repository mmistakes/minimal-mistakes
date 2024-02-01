---
title: "Life Cycle of a Blockchain Standard"
categories: 
  - decentralization
  - ethereum
  - improvement process
  - EIP
  - standards
  - peer review
type: "blog"  
layout: single
author_profile: false
read_time: true
comments: true
share: true
related: true
description: "A Proposal for turning EIPs into Standards via Working Groups"
excerpt: "A persistent source of confusion and misalignment in the Blockchain space stems from a conflation between specification documents and standards. The tendency to think of the EIP process as a complete standards process does the EIP process an injustice and holds back the maturity of the space."
defaults:
  # _posts
  - scope:
      path: ""
    values:
---


*Co-written with [Kyle den Hartog](https://github.com/kdenhartog) ([Brave](https://brave.com))*

## Preface

A persistent source of confusion and misalignment in the Blockchain space stems from a conflation between specification documents and standards. The tendency to think of the EIP process as a complete standards process or, worse, to think of EIP editors and CatHerders as a decentralized "standards development organization" (SDO) does the EIP process an injustice by making it responsible for things outside of its scope. The EIP editors, magicians, and catherders help documents through a document process; whether each document is widely and uniformly adopted (and thus can be called a "standard") is something they have not been (and should not be!) resourced or empowered to influence. It is our belief that adoption is healthiest and most efficient as a separate (and carefully separated) concern. It is also our belief that supporting and coordinating across different categories of standard is worth doing, and worth doing now, given the juncture at which we find ourselves.

To start with, we should recognize that the meaning of "adoption" varies widely between different kinds of standard, or in EIP terms, between different categories of EIP, particularly as many shades of EVM-compatibility are rolled out. At the level of Ethereum clients (`core` and `networking` proposals, as well as Rollup Improvement proposals in the case of Layer-2 clients, i.e. validators), the ethereum client working group ("AllCoreDevs", or "ACD") can encourage individual clients to adopt a proposal, and later schedule it onto a hardfork to make it mandatory for all clients, making "adoption" a fairly binary category. At the level of smart contracts and wallets, however, protocol changes don't come into play and market adoption is both paramount and fuzzy, and currently somewhat ad hoc and thus intransparent to boot. At the level of changes to smart contract bytecode or specific compiled languages like Solidity and Vyper, distinct communities beyond Ethereum coordinate adoption and backwards compatibility. To some degree, wallet<>node interfaces are specified and regularized by the "execution API" and OpenRPC project, but this is not yet an integral part of the EIP process or the standardization process more generally.

As the blockchain space is growing in maturity and complexity, the gaps between these various adoption communities seems to be growing. The monolithic "EIP process" is starting to adapt to these divergent constituencies, who are lobbying for greater control over the standards process as a whole, of which the specification process is just a middle-step. To mitigate the risk of a "splintering" or "siloing" of those processes, this document seeks to describe a "big picture" that might be shared across all of them and create a common language that maximizes understanding and interaction between them.

## The Pitch: Define a Common Standards Lifecycle and tailor it to each community

We could generalize the lifecycle of standards in evolving software markets to a 5-stage process:

1. Explore a problem and identify stakeholders; ideally, field multiple solution ideas
2. With trusted collaborators, implement a prototype of one or more solutions and iterate requirements/problem statement before scoping a specification to be hardened in public
3. Iterate implementations and refine specification in tandem, ideally with multiple implementers and participants
4. Harden specification, ideally after a "feature freeze"
5. Coordinate adoption and capture implementer and auditor feedback over time to produce errata/updates as needed, and to feed those back into new standards

We could say that stages 1 & 2 are currently optional; they are sometimes done in an ad hoc manner on ethereum-magicians or equivalent discussion fora online, or at public events, leading to an "initial draft" of an EIP, but while this might be considered "best practice" there is little incentive to do it so publicly. Indeed, particularly at the level of wallets and smart contracts, there are many incentives NOT to design in the open what might otherwise end up a differentiating, competitive feature. Many design discussions happen in private or company-internal channels and proceed straight to step 3 by opening a PR containing an initial draft of an EIP.

The current EIP process encompasses step 3, and optionally step 4; the "feature freeze" part is entirely up to the EIP author to propose and incentivize, and can even be skipped over since the EIP process is relatively unopinionated about the normative "content" (features and security or privacy implications thereof), by design. One could say the current process is maximally permissionless, putting a high premium on neutrality. It is worth mentioning that in more formal SDO processes like W3C, IETF, and ISO, there is a designated maximum and minimum time for this "post-feature freeze" review of implications, usually combined with structured horizontal review processes to ensure uninterested parties with security and/or privacy expertise "red team" the specification.

The fifth step is currently outside the scope of the EIP process, to such an extent that security professionals keep complaining that they don't know how or where to publish security guidance relevant to the implementers of long-final documents like ERC-20. While the feedback loop of errata to new features is closed to some degree in the ACD categories, there is a pronounced lack of an ACD equivalent at other levels to support either function, much less coordinate them into a feedback loop. The following describes ways this could be formalized and extended to other category-bound standing working groups, or even replicated in other decentralized improvement processes.

## Stage 1: Initial Idea and competing draft proposals ("finding dance partners")

*In the first stage, the initial idea is to highlight the problem being solved, potential use cases, and a high level idea of the technical idea, defining a problem space and one or more solutions that would benefit from standardization. Input from far afield (especially non-technical and business specialists!) can be a stitch in time here!*

This is really about getting the initial problem statement down on paper to determine if one solution might be worth standardizing on (rather than solving independently or competitively). In many cases, even a general *category* of solution might be premature, although in other cases a sketch of a solution might be needed to find the right counterparties to design it together. The equivalent stage in the IETF would be something like a rudimentary first draft published as an "internet draft" or an informational-track use-case or problem statement circulated for review (usually through the mailing list of a standing working group or even dispatch-wide). Within a less formalized context like the Chromium developer community, the equivalent would be the publication of an explainer. By having a document that's shareable we can sanity-check the impulse to standardize in the first place, and find collaborators and potential implementers as soon as possible. An ethereum-magicians thread with a few in-depth responses might be enough to be ready to start an EIP process (if a final EIP is the only goal), and that could be called the bare minimum "stage 1" for a *specification*, but something a little more complex, the captures the imagination of companies or projects rather than individual, researchers and hobbyists, would be table-stakes if for "stage 1" of an adopted, multi-stakeholder *standard*, at the level of wallets or smart contracts.

These "problem space"/groundwork documents will likely be published on an individual or organizational Github or collaboration tool like HackMD or Cryptpad, and they do not need any sort of formal document process in place for them (unless IP is particularly sensitive at this stage). They're intended to be low stakes design documents that can be shared and if they're not retained it won't harm the development of a future standard. At this stage, there may be many competing solutions to address a problem, and that is often a good sign that there's desire by numerous parties to standardize on this and move it forward. There might just as well be no solutions yet in prod or publicly described, but in this case, the thing to look for is multiple stakeholders (competitors, perhaps) all recognizing a shared business problem, or a business problem in common that would be better solved by a small number of common solutions rather than 100 incompatible parallel solutions.

In general, Working Groups at SDOs tend to be rightly be wary of taking on work items that are championed only by a single party, that arrives suspiciouly complete; working groups in the EIP context should similarly discourage or at least be skeptical of such specification projects. Perhaps, with enough momentum and institutional memory collected in the relevant working groups, authors or organizations pushing single-author specifications could be asked (or even required) to find a collaborator among the active membership or previous authors in a given category, to provide some credible proof of openness to compromise and co-design.

## Stage 2: Prototyping <> Spec-Writing Stage ("crystalizing the proposal")

*Once a goal has been set, collaborative design begins in one or more common solution(s); multiple organizations/projects are investing significant labor in going from idea to specification, and want certain guarantees to raise the likelihood of arriving at a standard some day. Standing Working Groups are a sensible default here, efficiently maximizing feedback and front-loading adoption-oriented coordination.*

If the main goal of stage 1 is to identify multiple stakeholders and convince them of the value of working together on a solution (ideally, towards an adoption strategy and a standard, not just a spec), the main goal of stage 2 is convince 51% of them of a shortlist of candidate solutions at a high level, as well as a process for agreeing to implement one of them in common. The primary output of stage 2 should be a shared vision of the scope of the work to be done, a rough timeline, and a "plan for a plan", if not a detailed plan. Maybe that work includes user research, testing design, or other inputs; maybe that work is just a specification, or even a "retrospecification" of something already implemented two different mostly-compatible ways. But the to-do list is less important than the plan for crossing off all the items.

In an "ad hoc working group" (i.e., a group that works on 1 specification or a discreet set of interlinked specifications, but disbands after that), this could be called a "working group charter", but as a work item or formation within a standing working group, this might be more accurately called a "specification charter." In either case, it often helps to cover things like the IP boundaries of the collaboration, resolution mechanisms/authority, ragequit rights, communications channels, disclosures/transparency expectations, etc. Defining all these explicitly can be a major lift, but a standing working group might provide pre-filled templates or sensible defaults for all these questions. These questions are important for people who actively contribute to help resolve conflicts that may arise after the fact as well as helps non-active contributors to know when they may want to provide feedback or when they may want to consider implementing even if they aren't active in the specification development.

An explicit "spec charter" document should define:

### Checklist for a succesful specification project

1. The scope of the specification
  * More specifically specific technical details that will be included within the standard and also any things that are explicitly not expected to be addressed by the specification
  * If adoption of the specification is hindered by, e.g., testability, or upgrading mechanics, or sample code, etc., additional artefacts beyond the specification may be worth collaborating on or even project-managing within the group
2. Success Criteria
  * outlines the goals of the group working on this problem, which may benefit from more formality in some cases, e.g. if antagonistic or competing parties want to work together or there is already money or market "territory" at stake
  * normative or informational documents can be ratified by multiple parties (e.g. user stories, requirements document, etc)
  * optional test suite report to easily review self reported compatibility with the spec of implementations (particularly important for interfaces, e.g. between dapps<>wallets)
  * in leiu of running test code, at least a "testability review" by people familiar with both the use-case and test design can be a good "gating condition"
3. Communication channels: some combination of the three usually required for complex topics:
  * ad hoc: "group chats" or confidential channels may be needed to coordinate implementations that touch sensitive IP or security topics
  * archival: "mailing list" or forum software that archives threads, including GitHub issues and discussions
  * synchronous: recorded "calls" or meetings that produce meeting notes and/or recordings, idealy at archival/long-lived URLs
4. Conflict Resolution mechanism:
  * "rough consensus and running code" [^1] may sound explicit enough a resolution mechanism, but can be refined or made explicit in many ways:
  * sometimes having a named "consensus keeper" or tiebreaker (equivalent to a specification "editor" at W3C or IETF) helps forestall show-stopping conflicts or manage ragequits
  * nuancing the definition of "running code" (production-grade? deployable? running on vercel? audited?) is often a worthwhile exercise, to make sure the code in question adequately demonstrates "skin in the game"
  * a spec with too much optionality or spanning multiple distinct solutions to the same problem can be unsatisfactory for many (and has a much harder road to becoming a "standard"), so in some cases optionality is worth constraining in advance
5. [If applicable] Intellectual Property Boundaries or Guarantees. The default in EIPs to date has been Creative Commons, but particularly at the application level more nuanced or restrictive

Often, many of the above are decided implicitly or on-the-fly by the individuals involved, rather than their organizations or process-helpers. As the stakes rise over time, however, there are benefits to being more explicit about them, even if just in the form of GitHub "issue templates" or other formulaic guidance docs. Since working groups covering certain categories naturally accumulate experience with these issues and are familiar with the often unstated business incentives and market dynamics at work, it is far simpler and faster for them to suss out these risks and make these agreements more explicit internally, having already assembled the right people.

On a mechanical note, these same working groups can also centralize (and cross-pollinate) these processes by hosting repositories, document collaboration tools, and/or discussion channels for each current and former standard. It often makes sense to "fork" older ones or related ones to iterate on documents and artefacts originally published elsewhere (whether by another group or by some of the same participants at Stage 1). Using an issue tracker in that repository is recommended to project-manage this stage, since the next stage will likely be centered on the repository somewhere else with its own issue tracker (and perhaps a very different document process and linting regime).

## Stage 3: Editing in the open ("hardening the specification")

*The goal of stage 3 shouldn't be getting to Review status, but rather, significant adoption and consensus to make that Review phase meaningful-- getting the former without the latter can add noise to the channel and erode confidence in the process.*

The "charter" (and in particular, its success criteria) could be a very explicit, formal, serious document or it could be a github issue created from a template; in either case, it is best for it to "follow" a specification from its small incubating group (whether in a standing working group or not) into the more public arena of EIP hardening and review by a wider public. This allows the focus to be on the specification qua specification; if other work streams have to be parallelized (like implementation feedback, testing artefacts, sample apps to facilitate evaluation or implementation, etc), it can continue off to the sides, with or without being explicitly referenced on the editorial threads discussing the text of the specification itself.

The degree of formality of this "charter" and how much it bears on the hardening process of the text itself is definitely up for debate, and balancing flexibility against adoption-maximizing mechanisms is difficult. More formal standards bodies generally have a hard requirement of charter-approval by some kind of Technical Architecture Board or other cross-working group coordinating body. That might sound too centralized or top-down for a decentralized stack, but some middle ground might be worth reaching where "approval" by a sponsoring working group, or by one or more coordinating bodies, serves at least as a market signal, if not a hard requirement to EIP review.

If anything, the charter process should be considered orthogonal to the specification hardening process; instead, an explicit charter is an upfront investment in adoption and concensus around the specification being hardened. The value in explicitly "signing up" to a specification charter before or while collaborating on the specification is that offers an early opportunity for concerns or objections to be expressed and addressed. One consequence of more formal and public forms of consensus-building is that conflict resolution might also benefit from a little formality; this should be monitored as working groups develop independently.

Once an EIP is in "draft" status and being edited in public, the goal of the 3rd stage could be defined as refining the specification (on the EIP side), achieve the success criteria of the spec charter (on the non-EIP/WG side), and to ultimately lead to the development of multiple interoperable implementations if the goal is a standard, not just a specification. In the case of All Core Devs, this is also going to be the time in which a implementations will be tested through the test networks. In the case of Wallets and hopefully ERCs, different measures of adoption "viability" should be satisfied, such as turning sample dapps or implementation artefacts into test suites or conformance regimes, or prototyping actual builds. These implementation activities aren't strictly necessary to a good specification and should probably never be hard requires of the EIP process itself, yet if the goal is an adopted standard and changing behavior in the market, standards-oriented project should probably coordinate them at this stage and benefit from feedback between specification and prototyping. Debatably, some working groups might even want to link the two processes explicitly or track implementation feedback in the same threads and repos where the specification is happening, to ensure and maximize that feedback.

It's been suggested that one way to improve draft specifications is for prototype and user-research discussions to take place as close to the sspecification a possible, e.g. in Github issues, links to other repos, and discussions. This might be too prescriptive if applied across a whole working group, though, as some communities or teams may prefer their discussions to center on recurring calls or informal communication channels such as Discord as well. It's up to the group developing the spec to define the ways in which they want to communicate, but it helps to keep the focus on feedback and coordination as activity spans out across private implementations, prototypes, user research, etc.

## Stage 4: A more robust Review phase ("Landing the consensus plane")

*The "review" phase can and should be more than a polite last call for objections--it should be where the circle of adoption grows and valuable feedback comes in from a different class of implementer.*

As currently structured, the "Review" phase (and the minimum-two-week "Last Call" phase that ends it) represent a completed, finalizable document receiving its last feedback before going final, at which point the EIP process ends (and adoption happens, or doesn't, completely outside its purview). There is a sort of unspoken rule that substantial changes "reset the clock" and extend the time for review, particularly in "Last Call". It is a very finality-focused process focused on the specification at present, and there are often implied or interpreted stakes of importance or legitimacy mapped onto that status.

We propose rethinking this "home stretch" more holistically, as a chance to expand the circle of implementers beyond those who committed in advance (e.g. by collaborating on a charter or contributing), and for listening to implementer and evaluators further afield. Instead of thinking of this stage as "cement pouring" after which no interventions are possible, we could think of it as the transition from specification-driven to adoption-driven, opening the latter door at the same time that the former closes. Particularly in cases where adoption and consensus have been supported all along by supplemental artefacts and public events, the "last call" period can be a springboard for more adoption, an occasion to reach out to participants that dropped off, and a time to start thinking long-term after the afterlife of the specification.

These cases, where adoption and standardization is the goal, might be difficult to coordinate without, e.g., the non-specification deliverables slowing down the usual specification timelines. We believe this stage will vary widely, and we should resist the temptation to complicate or formalize too much the expectations of this stage, even in specific working groups, as a  greater degree of formality and adoption-oriented supplemental work could multiply the stakes and the potential for serious conflicts. As mentioned above, more centralized standards organizations handle differently objections that arrive after "feature freeze", adjudicating them with some kind of organization-wide Review Board (often Architectural or Technical in scope). This approach would be harder to replicate in some categories than others, but working groups could certainly adopt some version of this (whether mandatory or recommended) as they tailor their processes.

There is a temptation to formalize the relationship between the specification-finality side of stage 4 and the "running code" or product-launch or testing side of stage 4, to protect early implementers from major breakage with minutes left on the clock, but this crosses the streams of specification and adoption a bit. We do not feel that a one-size-fits-all solution makes sense here, even working-group wide, although perhaps it would make sense to consider this less as a gating condition or hard requirements than as an optional sidequest, such as an orthogonal (but public) badge of approval or working group "certification".

## Stage 5: Standards outlive their founding documents ("Update, Iterate, Inform")

*Sometimes the best implementation reports comes months after adoption picks up-- after the painful hack post mortems, for example. How to create upgrade paths and feedback loops informing future documents and standards?*

Currently, the EIP process is optimized for "immutability"-- much of the editorial review gating "Review" status is focused on maximizing the longevity and maintainability of documents, on the assumption they will never be changed again. There is no errata process currently, nor a mechanism for searching the current EIP corpus for later EIPs that update or extend an earlier EIP, much less dynamic "forward links" on an earlier EIP to later EIPs. The only way to update an EIP is to publish a new informational one, *and then make sure the right people see it somehow*.

While any or even all of the above-mentioned mechanisms would be welcome, they are hard to implement permissionlessly without some kind of counterweight to self-attested claims of relevance. This is partly because stage 5 isn't really about documents or specifications, but about interpretations, implementations, ongoing conversations outside of the documents. While more formal standards bodies use testing bounties and standing topical working groups to gate new specifications and monitor adoption of finalized one in a closed and expert-filled feedback loop, that kind of centralization might be unpopular in our space. What is the more transparent, do-ocratic equivalent that relies less on authority and more on sweat equity?

In communities such as `AllCoreDevs` where there is a large importance placed on specification and testing, implementers and specification writers past and future are already in dialogue, so this fifth stage happens automatically, or "falls out" of other communications channels and discussions. In the smart contract and wallet spaces, however, business incentives do not align with and support this kind of feedback, and figuring out what mechanisms will support it cheaply, without being onerous on all involved, is something of an open question.

Our intuition is that working groups that share a similar function to `AllCoreDevs`, which require of their proposal authors a certain degree of prototyping and adoption-strategizing and prior-art research to happen before taking on a work item, is a low-risk place to start. Top-down solutions beyond that seem premature, but coordinating and finding a common language across categories for what these working groups do would allow them all to experiment and compare results before trying to generalize common solutions. Kicking off the Wallet Working Group seems like a great start, now that the [wallet testing framework][wtf] is achieving maturity and we can run experiments like asking authors to link to prototypes that implement proposed features while fully passing the WTF (a kind of lightweight "reference framework" requirement that aids adoption and evaluation).

To put it another way, Stages 1 and 5 bleed into one another and are best done by the same people or in the same places, but both are currently done in an ad hoc way at best, by volunteers or passionate individuals, sometimes on long meandering ethereum-magicians threads and sometimes not done at all. Insofar as Stages 1 and 5 are a recognizable part of standards process in more formal, less permissionless environments like technical SDOs, the blockchain community's treatment of them could well be the most underfunded, undersupported, and underdeveloped part of how we "do" standards, and the lowest-hanging fruit in doing them better. We firmly believe that bridging stages 5 and 1 is best done by standing working groups, and we stand ready and motivated to help this crucial function be fulfilled across the space.

## Next Steps

We have tried sketching out how to start thinking about a broader standardization process beyond the publishing of documents, and we hope reframes the familiar questions and expectations around EIPs. We have tried to stop short of prescriptions or excessive formality, while still signaling where centralized standardization has landed in its solutions to analogous problems. We hope that this document can percolate and influence people over time, on a long-term vision level rather than on a short- or medium-term tactical level.

Tactically, however, it is 2024 and there is a distinctly wintery chill in the air, prices notwithstanding. Most employed heads are down and furiously building, making this a great time to shift incentives and encourage more transparent alignment and coordination on the dapp and wallet level. This coordination takes many forms, which could add up to a lot even if each seems small on its own:

1. The Wallet Working Group is a great place to start, and we'll be socializing a charter for it in the coming weeks. The Rollups Improvement Proposal spinning out from AllCoreDevs might also take on distinct "working group" functions and host different collaborations that might be drowned out in ACD. Perhaps an ERC WG might be worth rallying as well?
2. We also stand ready to help these and other working groups form and/or formalize with similar intentions around stages 1, 2, and 5 of the process outlined above, both as individuals and as helpers in the [Chain Agnostic Standards Alliance][CASA]. Multichain/multi-L1 engineering is proceeding at a steady clip in the space, and might also yield unexpected constituencies of collaborators over time!
3. [Ethereum-magicians.org][eth-mag] is a great place to model this kind of feedback-- Working Groups should think of their Categories there as a kind of interface with the universe of possible authors and contributors, or the "top of their funnel" topically, and take forum curation seriously as a way to build consensus and mindshare for their working group. If reading this  inspires you to comment a little more generously, in more detail, and more often, on eth-mag and similar fora, and a few people each across the various categories do the same, then we will be halfway to thriving working groups in a few weeks, even if there are no formal working groups to declare ourselves "members" of.
4. On [Eth-mag][] and elsewhere, we should identify EIP and CAIP authors with ambitious ideas and try to get them help thinking through adoption and all of the above. Not even specification has to be a standard, but choosing early can save lots of people a lot of pain. Heck, just send them a link to this essay if they're the long-form type!

## Acknowledgements

*The authors would like to thank, in no particular order, Charles Neville, Sam Wilson, and Annett Rolikova for reviewing this before it was published, and you for reading this far.*

[^1]: See [A.L. Russell's 2006 article][russell 2006] in IEEE Annals of Computing Hstiroy for a detailed history of the phrase.

[russell 2006]: https://courses.cs.duke.edu/common/compsci092/papers/govern/consensus.pdf
[eth-mag]: https://ethereum-magicians.org/
[CASA]: https://org.chainagnostic.org/
[wtf]: https://wtf.allwallet.dev/
