---
title: "Why OpenPGP’s PKI is better than an X.509 PKI"
permalink: /about/why/
excerpt: "Why OpenPGP"
modified: 2001-02-15T15:00:00-00:00
---

{% include base_path %}

Philip Zimmermann
27 Feb 2001

In the minds of many people, the phrase "Public Key Infrastructure" has become synonymous with "Certificate Authority".
This is because in the X.509 world, the only PKI that we usually encounter is one built on a centralized CA. Matt Blaze made the cogent observation that commercial CAs will protect you against anyone who that CA refuses to accept money from.
These CAs are "baked into" the major browsers, with no decisions by the users to trust them.

Throughout this discussion, we refer to the IETF OpenPGP standard instead of PGP, which is a single company’s implementation of the OpenPGP standard.

There is indeed an OpenPGP Public Key Infrastructure. But what we call a PKI in the OpenPGP world is actually an emergent property of the sum total of all the keys in the user population, all the signatures on all those keys, the individual opinions of each OpenPGP user as to who they choose as trusted introducers, all the OpenPGP client software which runs the OpenPGP trust model and performs trust calculations for each client user, and the key servers which fluidly disseminate this collective knowledge.

PGP has flourished for many years without the need to establish a centralized CA.
This is because OpenPGP uses a decentralized system of trusted introducers, which are the same as a CA.
OpenPGP allows anyone to sign anyone else’s public key. When Alice signs Bob’s key, she is introducing Bob’s key to anyone who trusts Alice.
If someone trusts Alice to introduce keys, then Alice is a trusted introducer in the mind of that observer.

If I get a key signed by several introducers, and one of these introducers is Alice, and I trust Alice, then the key is certified by a trusted introducer.
It may also be signed by other introducers, but they are not trusted by me, so they are not trusted introducers from my point of view. It is enough that Alice signed the key, because I trust Alice.

It would be even better if the several introducers of that key includes two or more people that I trust.
If the key is signed by two trusted introducers, then I can be more confident of the key’s certification, because it is less likely that an attacker could trick two introducers that I trust into signing a bogus key. People can make mistakes, and sign the wrong key occasionally.
OpenPGP has a fault tolerant architecture that allows me to require a key to be signed by two trusted introducers to be regarded as a valid key. This allows a higher level of confidence that the key truly belongs to the person named on the key.

Of course, a clever attacker could trick two or more unsophisticated introducers into signing a bogus public key.
But that does not matter in the OpenPGP trust model, because I don’t trust unsophisticated introducers that can be so easily fooled.
No one should. You should only trust honest and sophisticated introducers that understand what it means to sign a key, and will exercise due diligence in ascertaining the identity of the keyholder before signing the key in question.

If only untrusted introducers sign a bogus key, no one will be fooled in the PGP trust model.
You must tell the OpenPGP client software which introducers you trust, and the client software uses that knowledge to calculate if a key is properly certified by an introducer that you trust by looking for signatures from one of the trusted introducers.
If the key lacks any signatures from introducers that you’ve told the client software that you trust, the client software does not regard they key as certified, and won’t let you use it (or at least will strongly urge you not to use it). Everyone gets to choose who they trust as introducers.
Different OpenPGP users will have different sets of trusted introducers. In many cases, there will be overlap, because some introducers become widely trusted. They may even sign a great many keys, on a full time basis. Such people are called CAs in the X.509 world.

There is nothing wrong with having CAs in the OpenPGP world.
If many people choose to trust the same CA to act as an introducer, and they all configure their own copies of the OpenPGP client software to trust that CA, then the OpenPGP trust model acts like the X.509 trust model.
In fact, the OpenPGP trust model is a proper superset of the centralized trust model we most often see in the X.509 world.
There is no situation in the X.509 trust model that cannot be handled exactly the same way in the OpenPGP trust model. But OpenPGP can do so much more, and with a fault tolerant architecture, and more user control of his view of the OpenPGP PKI.