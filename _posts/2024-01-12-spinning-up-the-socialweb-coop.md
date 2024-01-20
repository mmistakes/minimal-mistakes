---
title: "Spinning Up the SocialWeb Coöp"
categories: 
  - blog
  - decentralization
  - activityPub
type: "blog"  
layout: single
author_profile: true
read_time: true
comments: true
share: true
related: true
description: "Making a Coöp for Social-Web Community Work with the support of Germany's Sovereign Technology Fund"
excerpt: "learningProof is proud to announce it is spinning out a worker-owned co-operative for Social-Web Community Work with the support of Germany's Sovereign Technology Fund"
defaults:
  # _posts
  - scope:
      path: ""
    values:

---

## The years they keep on passing

Since 2020, my (bumblefudge's) career northstar has been sustainably making myself helpful to the advancement of human agency in the digital realm, an umbrella that encompassing disparate work in the ["self-sovereign" identity-tech world](../the-next-big-thing-is-you), the ["on-chain money" world](https://github.com/chainAgnostic/CASA/), the ["interplanetary data" world](https://github.com/multiformats/multiformats?tab=readme-ov-file#multiformats), and the ["social web"](https://en.wikipedia.org/wiki/Social_web).
In fact, in 2020 this work didn't even feel all that disparate, and only when checking back in with my feelings [last week](../new-years-thoughts) did I realize there was more under the umbrella than I realized at the time.
Thematic focus aside, the euphemism "sustainably" is doing a lot of work in that first sentence; I try never to work "for free," even more so now that I am a father, but naturally higher-paying work subsidizes lower-paying work when I'm lucky enough to get both.

Doing so while trying to "own" any part of my work (to seek rents in the present or future from that ownership claim) never sat well with me, so I have not taken equity, intellectual property, or even cryptographic ("on-chain") tokens as payment for my time in any of this work.
Perhaps there is a transparent, ethical, no-risk way of doing so, but I have been too busy playing connect the dots and learning all I can to bother with those details;
"maybe later," I say every time it comes up.

For as much as I never wanted to "own" a rent-seeking apparatus, or for that matter a "company," it quickly became clear that in much of today's world, and particularly in the software world (as befits an industry centered on seeking rents from intellectual property), companies get better property rights than individuals, and companies (particularly foreign companies) prefer to deal with other companies anywhere they can, as do governments.
The conventional path of working across organization borders by "freelancing" doesn't really work as well across national boundaries, however.
To de-risk and simplify this situation for my clients, collaborators and the funders of agile prototyping and R&D efforts, some of them public, Balázs and I incorporated learningProof UG in 2020 precisely to "abstract out" the legal requirements and liabilities required of employment, contracting, and consulting, letting me (bumblefudge) and, as needed, my collaborators and colleagues on various projects focus on the work at hand, tracking hours and minimizing administrivia. 
To date, it's mostly been a "pass-through" (or a "shell corporation" as I like to joke), simplifying how I bill my hours when I'm working for people outside Germany, which most of my clients have been.
It has worked great for spinning up (and down) lightweight collaborations across and beyond the EU to do the kind of specialist tinkering that is required when you are proposing novel infrastructures for future internets.

But last year was different. The utopian vision of a more just "Social Web" seemed to hit everyone all at once in 2023 like some kind of ideological pandemic, as the critical communications infrastructure we euphemistically call "social media" underwent one of those "multicrises" that are so in vogue these days.
Most of the crises reported as distinct were, to the cynical eyes, simply two sides of one coin: they governance crises triggered by  omnipotent billionaires indulging in seemingly _personal_ [brinkmanship](https://www.reuters.com/technology/zuckerberg-musk-fight-is-meta-launches-twitter-killer-threads-app-2023-07-05/) was just the tabloid sideshow distracting us all from the real macro-narrative: with the sudden end of the US Fed's zero-interest experiment, the shareholders of virtually every major technology platform demanded rapid ["enshittification"](https://en.wikipedia.org/wiki/Enshittification) (forgive the technical jargon) of their formerly benign-seeming freemium platforms, seeing no other way to quickly ratchet up dividends to perform above interest rates.
Putting critical infrastructure for democracy and global information flows into the hands of advertising monopolies governed by private equity and openly maximizing profits above all public obligations and functions was starting to look like a bad idea even to observers who generally _like_ public infrastructure to be operated for private profits.

## Building a social web socially

What could little learningProof do to tilt at these world-historical windmills?
A privately-held, profit-maximizing endeavor (however small and agile) was neither the right shape nor the right speed for this side-quest; the vibes were off, dear reader.
Billionaires and boards running information business like health insurance companies got us into this mess; whatever was the opposite of that seemed a good way of going 180 degrees in the opposite direction.
We needed to think bigger, flatter, not just learningProof but enshittificationProof, profitLocal or even profitNeutral, sharing the work and its wages do-ocratically and humbly.
No C-suite, no shareholders, no masters to whom profits could be expected or demanded to be exfiltrated.

Wait, who is `we`, you may be asking?
Wasn't the first-person singular until now?
For now, the `we` began as [@codenamedmitri](https://medium.com/@codenamedmitri), [bengo.is](https://bengo.is/), and myself.
I have been collaborating sporadically and coordinating efforts with the former since 2019 on all things decentralized identity, since almost the minute I understood that phrase to refer to one path to human agency in the digital realm.
Unbenownst to me, I somehow failed to meet the latter at an [ActivityPub conference](https://redaktor.me/apconf/) in Prague that the former invited me to when I was in town for the 2019 [Rebooting the Web of Trust](https://weboftrust.info) conference a few blocks away.

Over the last two years, I've been discussing ActivityPub more and more with both Bengo and Dmitri, collaborating where we can, aligning our disparate efforts, particularly in the context of ActivityPub, a headless protocol formalized in 2019 and self-governed in the most wonderfully and chaotically decentralized way. 
Our collaboration started as a simple, almost daily groupchat about current events, filling one another in on all kinds of backstory and perspectives on what was unfolding every day on the various relevant hashtags, making sense of it together.
It quickly grew to feel like a team working together on shared problems and toward a shared vision.

We decided that a conventional shareholder corporation wasn't the right fit for working on public infrastructure verging ever closer to being "critical";
many of our role-models in public-good technology were B-corporations, non-profits, unincorporated collectives, and worker-owned co-operatives.
The last of these felt the closest to our do-ocratic way of working and our transparency goals: a conventional LLC, except incapable of selling equity, keeping 100% of the governance of all assets, projects, and liabilities within the organization.

## The Social Web, warts and all

The three of us agreed from the beginning that this protocol, in comparison to other global networks of loosely or trustlessly federated "servers" (matrix, secure scuttlebutt, blockchains, SoLiD, etc.), somehow grew to serve millions of users without a reference implementations and a conformance regime; a community of doggèd developers gritted their teeth through a lot of _ad hoc_ coordination and experimentation to arrive at an open social graph that worked well enough for its millions of emmigrants from the industrialized attention economy commonly referred to as "social media".
In 2023, the social media & personal messaging "sector" of the software industry from which this ad hoc federated social web had rebelled and run screaming was suddenly collapsing and people were pouring out of the exits; the "Fediverse", long artesanal and proudly devoid of an internal economy, might just need to blitzscale and adapt to a reality in which _some_ commercial or semi-commercial form of Fediverse couldn't help but develop.

At the same time as we were speaking to each other about how the Social Web might harness these market forces, regulatory groundswells, and cultural narratives, we were also speaking to developers across our various social and professional worlds.
It was clear that [ActivityPub], the protocol out of which today's Fediverse grew as a tentative first instantiation, was really no more visible than in 2019 as a vision or as a reality. The Fediverse was experiencing growing pains (as millions of new users poured into web2 server architectures that had never really been optimized to scale efficiently), but also upgrading pains, as there was no medium-term shared vision on the horizon behind the immediate technical debts or user needs that plague software this ambitious.
In the most practical sense, ActivityPub had never become a "protocol" anyone knew or thought about distinct from the Fediverse because it didn't have a reference implementation and a conformance system anyone could use in decision-making about its capabilities, its strengths and weaknesses, and its role in the greater web; all we had was a few implementations, interoperating with one another patchily, and no one incentivized, much less funded in a sustainably and credibly neutral way, to get us to that point.

Left to play out naturally, these market conditions would likely push the already ad hoc Fediverse to move rapidly further from the ambitious (and admittedly difficult) path imagined by the open protocol's early designers.
Without a lot of work on the neutral core that powers the federation of diverse software and user experiences and products, the [goals of the ActivityPub community whose conference Dmitri invited me to crash in 2019](https://fossacademic.tech/2023/10/15/APnonStandard.html) would likely get lost in the shuffle.
And without the typical foundation people have when trying to build on an existing protocol or platform (i.e. a reference implementation and a testing regime), who could blame selfless community-motivated developers for optimizing for local maxima and clearer, better-documented goals?

## Sovereignty and Technology

Fortuitiously, we weren't the only people thinking about credible neutrality and the kinds of investments needed to defend the digital Commons from market forces in 2023.
Our conversations about ActivityPub landed in the right place at the right time, in that they coincided with the entrance of a major new force in the funding landscape for open source.
It was a big year for public-good technology in Germany: increasingly, the German Fediverse was [coming into its own](https://media.ccc.de/v/camp2023-57087-lesung_digitale_muendigkeit) and trying to strategize about the culture clash implied by massive US-based companies entering the Fediverse at the [Chaos Communications Camp](https://events.ccc.de/camp/2023/infos/index.html) and many smaller [fediverse-](https://digitalcourage.de/termine/2023/fedicamp) or [data-sovereignty](https://friendi.ca/2023/07/22/sympossium-about-the-fediverse-in-cologne-germany/) events.

At the same time, the Sovereign Tech Fund was emerging to channel energies from the policy and civil society communities trying to navigate these topics.
Incubated by FOSS powerhouse SprinD GmbH, STF was establishing itself as a funder of exactly the kind of credibly neutral Free Open-Source Software that favors protocols over platforms.
Sovereign Technology Fund's mission, and in particular it's pursuit of sustainable, long-term governance for open infrastructure resonated with our project to keep ActivityPub (the underlying protocol) up to date with the evolving product landscape built on top of it.
We worked with the exceedingly excellent [@tarakiyee@mastodon.online](https://mastodon.social/@tarakiyee@mastodon.online) to scope a service contract that would fall squarely within the mission of STF and also be timely to the evolving landscape of the Fediverse, focusing on industrial-strength CI testing to make protocol conformance more objective and protocol extension more time-efficient, user portability, data portability, and developer community integration.
It was a match!

One problem with a cooperative is that you can't "raise" "money" (or, less euphemistically, you can't borrow cash or pre-sell governance rights against the future organization); you can only keep a portion of the money passing through the organization on its way to the workers doing the work, and use that to amass operating capital for collective outlays.
The coöp had, in Sovereign Technology Fund, its first paying contract to bootstrap itself into existence, and Sovereign Technology Fund was happy to be investing (non-dilutively) in a sustainable enterprise committed to keeping open infrastructure open, as usable.
Most contracts, however, are signed between pre-existing organizations, so learningProof is, on paper, fulfilling this contract, as a pass-through, fiscal sponsor, and liability host.

## Milestones and Updates

The contract we signed was broken up into a few workstreams (testing, new features, and community support/integration), which structure the contract into three phases punctuated by three milestones.

We'll be posting grant reports [here](https://socialweb.coop/blog/) on the coop project's own website, as each of the milestones of the project are reached and outputs thereof open-sourced. In the meantime, stay tuned to the #ActivityPub channel on the Fediverse for developer chatter and the mailing list of the W3C Community Group for standards topics.

[ActivityPub]: https://www.w3.org/TR/activitypub/#server-to-server-interactions