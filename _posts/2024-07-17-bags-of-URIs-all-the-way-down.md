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

After building and widely deploying [tooling for DAO record-keeping based](https://github.com/metagov/daostar?tab=readme-ov-file#introduction) on the Ethereum standard [ERC-4824])(), DAOStar finds itself a little [stumped](https://github.com/metagov/daostar/issues/213) on how to "v2" its contingent "identity system".

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

![Twitter ad for the Bitcoin Voter Project.org](/assets/images/bitcoinvoterproject.jpg)

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

In this sense, what would be legally useful to get asset-handling DAOs recognized legally is a kind of cross-chain identity that effectively buttresses realistic treasury/asset-checks and solvency audits.
Making such checks aware enough of lock-ups, staking, bridge-locks, time-locks, etc etc is a tall order, and hopefully orthogonal here, but I mention cross-chain assets because a necessary (and insufficient) condition for such checks is an identity system that declares (hopefully verifiably and non-repudiably) assets controlled on multiple chains and in multiple kinds of locking contracts such that any legal situation requiring entities to prove their solvency or expose assets for audit can check such assets against [public records rather than just-in-time disclosures](https://www.theverge.com/2022/12/9/23502193/ftx-alameda-binance-kraken-tether-exchange-texts).
Maybe there is no other way to incorporate this generically enough in an identity system than to add one more optional array of URIs, but it's worth mentioning if we're listing MUSTs and SHOULDs.

### Provocation: Ships of Theseus All the way Down

> Even vanilla legal entities are leaky abstractions over leaky ships of Theseus.

Delegation (i.e. who can actually represent a collective at any given point in time) is as tricky a legal technology as it is in data management systems.
In fact, the latter inherits most of its mental models and terminology from the former, as anyone deep in the literature on authorization can tell you;
if the latter seems rigidly and needlessly heirarchical, it's largely mental models inherited from the former.
When parties start disagreeing on who could represent what collective when, the fallback and groundtruth is to look up public documents and (recognized, verifiable) public claims to trace who has the most leg to stand on in the dispute;
crucially, this includes named officers of incorporated entities and board members of public entities.
In incorporated entities, this is easy enough-- named officers and board memberships are pretty clearly public and available information, and the burden of publication is on the currently-public members any time membership changes need to be published.

This may also be a nice-to-have rather than a MUST, but if we are using dedicated bags of member-URIs to express membership, then it is important for these bags of URIs to be checked not just now but historically against public chain-state.
This is simple enough to do when all canonical records live on the same [stable, never-down, long-lived, fully-public] blockchain, but any multichain or off-chain mechanism would _also_ need to be just as historically verifiable, at least to the level of granularity of most-recent block at any given timestamp.
Ironically, this has been the biggest design challenge in DID methods _not_ locked to a single blockchain, which, in the case of DAOs, would be coals to Newcastle, since only multi-chain or off-chain DID methods would actually add anything to DaoID as currently specified.
Which brings us to the most vexing provocation of all:

### Provocation: What even does anyone mean when they say "DID"?

Depending on whom you ask, a DID method can be:

1. a **URI scheme with a resolution mechanism** stapled to it
2. an **export format** for identity documents allowing actors outside that that system to deterministically and transparently fetch the current document for a given URI
3. a **bag of keys** and, optionally, endpoints (both serialized as URIs) that can be fetched for any specimen of a given type of actor in a DPKI (decentralized public key infrastructure) system
4. a specification formalizing how to **dereference a URI to**... a document containing **more URIs** (i.e. a slightly more kitchen-sink URI scheme)
5. an abstraction allowing a **cryptographic identity to mutate** (i.e. rotate, grow, and shirnk) verifiably over time
6. a user's manual for a **censorship-proof and resilient** identity-document substrate
7. the constitution for a service that dereferences URIs to **certified documents**, whether by delivering self-certifying documents or by certifying the documents it delivers

While this might sound like hyperbole, I have attended in-person meetings of the DID Working Group over the years, and each of these is actually a flippant parody of the working definition various key members of that working group hold and act on (and, debatably, pull the rest of the working group towards over time).
There *has* been some progress over time to tighten this loose bag of purposes, such as my old boss Wayne Chang's [ideological intervention](https://blog.spruceid.com/upgradeable-decentralized-identity/) arguing for a [feature-matrix approach](https://gist.github.com/jceb/8e37e4900e815eb14b207ad7e8d02a6c) to DID interoperability and migration thinking.

But fundamentally, we're still here, trying to figure out what generalization is worth making about DIDs, when there is such diversity between their URI schemes and their resolution mechanisms, each grounded in a radically different _kind_ of ground-truth-producing system.
They're not much more generalizable or schematized than DAOs-- if anything, even more emergent on both the technological and social/business layers.
There is no general sense in which "DIDs", in general, provide a path to meeting all the requirements above, nor are DIDs easily classifiable into a few categories, one of which would be.
That said, the "trait" methodology mentioned above that some are using to differentiate DIDs by featuresets might still be useful in finding 1 or more DID methods that are useful enough to be better than status quo, and for writing a specification that names everything else a better DID method would have.
That's what I have done, at a high-level, below, and could do more systematically once requirements have been clarified and validated if it makes sense to hone in on the applicability of existing DID methods versus a novel one.

#### Historical Verifiability of Mutable [DID] Documents

Historical resolution, long a [contentious and optional feature](https://github.com/w3c/did-core/issues/580) of DID methods, is actually only supported by a few of them.
Most DID method designers punt this extremely difficult set of cornercases to distinct "internal" or orthogonal mechanisms (i.e., independent of the DID document's resolution), rather than make available to any consumer of the DID document detailed information about what a given DID document was at a specific point in time via the option `versionTime=` query parameter of a DID URL.
Indeed, even query parameters themselves are kind of rare in DID-based systems, so limiting ourselves to DID methods that handle historical verifiability automatically is a fairly constraining decision without many options, and should be compared (apples-to-apples) with solutions where such verifiability is guaranteed on another layer.

## The Shape of a Solution

To decouple a bit the question of whether or not the problem space is best addressed by one or more current or future DID methods from a higher-level analysis of the space itself and the requirements, I have elaborated some families of options first.
In so doing, I made a solid assumption that a Dao ID defined a DAO over time without taking authority or priority over the DaoURI valid at any point.
Boiling down the list of functional requirements mentioned above to "traits" needed from a Dao ID system, we could enumerate them approximately as:

### Summary of Requirements above

1. Opt-in upgrade: no current [ERC-4824] DAO should _need_ to implement or change anything if the kinds of legal recognition or non-repudiable record-keeping enabled by this proposal are not urgent for them.
2. Some kind of historical verifiability of previous versions of the DaoURI document.
3. Either a long-term identifier per DAO OR a way to derive all previously-authoritate DaoURIs over time from the current one (for those opting into such long-term identity, as per req. #1).
4. A chain-agnostic/off-chain Dao ID Document, if established, needs to be verifiably and bidirectioned linked to the on-chain DaoURI Document,
5. Extensible enough to verifiably link to additional novel Document types, so as to accomodate additional reporting, auditing, authentication, deanonymizing, and other mechanisms as needed for legal recognition (particularly ones where underlying blockchain records and identities are categorically inadequate and external notarization or machine-readable equivalence statements are needed)
6. Unambiguously resolvable in case of blockchain forks or outages or other availability issues 
   - (May require explicit disambiguation logic around forks as force majeure)
7. Clear fallback for DAO-Hack style intervention in chain-state
   - (May require explicit deferral to or from altered or rolled-back chain-state)
8. Multichain and Multi-VM dereferencing: child-DAOs, members, and controlled accounts might all live on other chains than the daoURI, and these must all be expressable at least in the form of a DaoID, if not in the legacy DaoURI itself

### Relationship to the DaoURI() interface

Realistically, a Dao ID is only worth offering as an extension of ERC-4828 and DaoURIs as they exist today.
Stated technically, we could say that a worthwhile (and realistic to deploy) DaoID would need to be a strictly backwards-compatible superset of DaoURI, i.e., every DaoURI returned by the DaoURI() on-chain calls possible today MUST be a valid Dao ID value.
Practically, this means that a Dao ID is just a BIGGER bag of URIs, which might add some optional properties if there is value in adding them, resolved in a different way than just querying the same chain with a different call.
That passive-voice "resolved" does a lot of work, though!
DID methods, in the best of cases, abstract over [pre-existing] resolution methods to bridge consumers and producers inside and outside of them, whereas here any resolution method chosen is a novel infrastructural commitment demanded of every DAO self-publishing these records in addition to their authoritative DaoURI records on their [primary, current] chain.

> Whether the solution involves DIDs or not, the publication and resolution mechanisms for these chain-agnostic documents make or break the feasibility of any such proposal.

#### DaoID Document as Microledger of DaoURI Documents

Working backwards from failure modes, one backstop that strikes me as a hard requirement to commit to upfront is for a given Dao ID to be considered valid IF AND ONLY IF it also is or contains the current DaoURI document.
Extending the DaoURI document system is already a huge ask of DaoURI users, without also creating a risk center and attack vector in case the extension gets out of sync somehow with the simpler, easier-to-maintain legacy form.

This property could be achieved two very different ways: making a backwards-compatible version of the DaoURI method that returns additional properties and all the current ones, OR making a Dao ID that lives somewhere else, includes a link to the DaoURI, and is not considered complete until BOTH documents have been dereferenced (and perhaps merged).
I refer to these two variants as "second-document" approaches, above and below.

From simplest to most complex resolution methods, I can think of three families of solutions here:

### Solution-Shape A: Back-Linking DaoURIs

A single property could be added to each DaoURI document called, say, `previousVersion` which pointed to the most recent previous state that the DaoURI resolved to (if addressable as a standard URI, or at least to the transaction that updated it, if this can deterministically produce the previous version).
This would mean that from today's DaoURI, one could walk back across all updates to inception and have the history of each Dao as a "microledger" of DaoURIs.
Since each finite update to DaoURI doc and/or memberships or other important properties occured in a timestamped (or at least block-numbered) transaction, fetching historical state for a given DaoURI at a point in time would be deterministic, if slightly networking/compute intensive without a comprehensive indexer, historical node, or at least a pre-loaded cache, of entire histories of each DaoURI.

Note: this would only really be feature-complete for net-new DAOs, since the microledger would end abruptly at the first post-implementation update for any DAO whose history stretches before the implementation.

Unlike the two alternatives below, where the legacy document and resolution is extended by a second document type and resolution mechanisms, requirement 4 is moot here because no second Document-type is added.
By iterating the core DaoURI mechanism, though, all changes to support the other requirements would have to be made together, along with the backlinking change, in one atomic upgrade.
For requirement 5, this would simply consist of additional properties, but solving for 6, 7, and potentially even 8 might not be possible in this solution-shape, or at least require  validation research in a different direction.

### Solution-Shape B: Off-Linking from DaoURIs Documents to Dao ID Documents

Similarly, instead of `previousVersion`, a property like `alternateDocument` could contain 1 or more URLs pointing to an "extended" version of the same document, which also includes metadata about update history, links to previous or individual versions, etc.
This could be content-identified, i.e. `https://{ipfs-cid}.subdomain-gateway.ipfs.io` or `ipfs://{ipfs-cid}`, or some other content-address, data-availability URL, in addition to or instead of conventional HTTPS urls.

Since this off-chain copy of the same document would probably be less constrained for space than something on-chain, it could conceivably take a different (i.e. more complex, even layered) structure than merely adding a single backlink.
For example, the Dao ID could refer to an intermediate document containing links to every version of the file sorted in reverse chronological order, tuples of links and metadata, triples of HTTPS link, alternate link, and metadata, etc etc.
Whether or not this added complexity here makes sense depends on the trust model and on the degree to which it solves the legacy problem of DaoURI document historical  pre-upgrade.

Mitigations for requirements 6 and 7 can be encoded quite simply in parsing rules for off-chain documents as a "state of exception" to requirements 1 and 4, i.e., "until outage/fork/consensus issues/availability issues are resolved to X standard, most recent on-chain DaoURI Document remains valid and off-chain extension document can be acted on."

### Solution-Shape C: Completely Separate Resolution Mechanism

If, instead of changing anything about the DaoURI Documents, a second step were introduced _after_ resolving the DaoURI, no change would need to be made to how DaoURIs are published and resolved.
For example, with the current DaoURI document in hand, one could take the DaoURI (or a hash of the current DaoURI document, or any other deterministic transformation of it into a URN) and resolved that in some alternate registry (onchain or off-), to get back the "extended version" of the Document, or all other documents pertinent to, linked from, or linking to that Document.

"Deterministic" is doing a lot of work in the sentence above, because the universal determinism of [canonicalized] DaoURI documents to URNs is required throughout the system for them to be reliably used for discovery, deduplication, and subsequent authentication (i.e. to function as a checksum).
Note that an IPFS CID here is only as deterministic as the degree to which its generation is constrained to a very opinionated profile: single format, single hash, etc. 
For example, hashing all records in a today's default kubo configuration, or [LUCID][] configuration, or SHA-256 after JCS canonicalization, or Blake-2B after RDFC canonicalization (since they are all JSON-LD records after all), is all but locked in for the life of the system and runnable by all actors and form-factors.

Mitigations for requirements 6 and 7 can be encoded just as simply as above in the parsing rules for off-chain documents as a "state of exception" to requirements 1 and 4.

Even if append-only, even if content-addressed, this approach also brings up the usual governance questions about how a common corpus or registry could be governed in common, since it would be a public good and not free to maintain.

## Proposals

I will only mention these at a very high-level for now so as not to invest time elaborating on any of the following which might be eliminated by refinement of requirements and priorities.
Ideally, this list could grow or shrink considerably _before_ validating and elaborating any of them.

- Candidate Solution: Minimalist Upgrade to DaoURI (only add backlinks and minimal/open-ended extensibility)
- Candidate Solution: ENS-based second-document
- Candidate Solution: A Ceramic-based broadcast/self-publishing network
- Candidate Solution: A `did:dht` broadcast/self-publishing network
- Candidate Solution: A `did:tdw` (i.e., HTTPS-based) microserver per DAO

## Acknowledgements

## References

[ERC-4824]: https://eip.tools/eip/4824
[LUCID]: https://github.com/darobin/lucid

## Copyright

Copyright and related rights waived via [CC0](https://github.com/ChainAgnostic/CAIPs/blob/main/LICENSE).