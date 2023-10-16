# Domi (non-technical) White Paper [WORKING]

v0.1.0 - not for circulation, interal draft only

## 1 Introduction

### What is Domi?

_// Here we want to describe the purpose of the platform in 3-4 sentences with emph on selling its unique features_
_// i.e. Domi is rental contract management platform for tenants and landlords setting new standards in the way private sensitive information is shared and rental contracts are executed._ 

Domi is a digital rental passport and contract management platform for both landlords and tenants. Inspired by user-centric design principles and data practices, Domi takes the friction out of the renting process by enabling tenants to "passport" their rental history wherever they relocate, putting their verifiable data in their own hands and letting them control how they share it and with whom. These passports contain only factual information, which can be a powerful supplement to or replacement of unidimensional credit scores produced by opaque algorithms.

The primary function of these passports is to support or replace traditional rental applications, which contain all the same information in self-attested, unverified form.  Receiving applications in the form of a digital passport offers landlords a streamlined means of reviewing pre-verified rental applications and managing rental contracts. In addition to digitizing a slow, paper-based process, this digital information-sharing platform is privacy-preserving and GDPR-compliant by design. It is also in line with the principles of self-sovereign data exchange central to recent privacy law and the European Blockchain Services Infrastructure. Domi's technical prototype and business model were validated at the Self-Sovereign Identity Incubator's inaugural 2019 cohort in San Francisco, CA.

### Traditional rental application processes

While many of the aspects of the daily live becomes more and more digitalized, most of the processes related to mid- and long-term renting of properties remain paper-based, bureaucratic, and lacking in effective transparency. As of now, the only digitalized part of the rental process which became common is the *browsing of rental listings* on dedicated online marketplaces. The rest of the process -- applying, proving identity, screening, negotiation and signing of contracts -- remains manual and analogue, which entails a lot of discretion be exerted by specialized and dedicated individuals, which entails workflow issues and incurs costs to transparency of these processes. 

Furthermore, self-attestations about one's creditworthiness, rental history, or financial history are difficult to verify and generally prohibited as prejudicial and/or unreliable. Instead, the all-powerful unidimensional and opaque credit rating (SCHUFA, in the German case) is seen as the only way to vouch for creditworthiness or rentworthiness. In cases where this rating is inaccurate or flawed, an onerous appeals process is the potential tenant's only recourse unless they omit the rating altogether, which is a known handicap to their application.

The actual information flows described above remain overwhelmingly based in stacks of A4 paper or PDFs attached to (insecure) email. In the vast majority of property management contexts, physical, paper signatures are required to consider a contract valid and actionable; given the incentives and liabilities involved in large-scale property management, there is rarely an option to temporarily accept anything else and move forward while a paper signature comes in the mail. A further complication is that most of the information documented in a rental application is covered by privacy laws and not needed any more after a contract has been signed-- the GDPR liabilities entailed by digitizing these records has discouraged many efforts to streamline or digitize this process.

### Why does it matter?

There are a number of reasons why our self-sovereign digital rental passports represent a real improvement on paper rental applications or other efforts to digitize them: 

1.  It is much more efficient to upload once and verify once all the data that goes into a rental application, generating the cross-sections or combination of documents that each landlord or property manager prefers from a core set of digital documents. This extends the "[once-only principle](https://en.wikipedia.org/wiki/Once-only_principle)" from e-government to the rental market, putting each user's sensitive and already-verified data into a repository fully under their direct control.
2.  Privacy is a real and growing issue for citizens, and applying to apartments in a new city can feel like a violation of that. Applicants can feel more confident and respected when can securely send their personal rental and financial history directly to verified property managers using a platform that insures that data will not be misdirected, copied, or kept beyond the expiration date set by the sender.  These features protect both parties, since the property manager can make rental decisions without the GDPR liabilities of storing and processing that personal data to which they only need temporary read access to, and verification of, that information.
3.  All parties retain ultimate control over any documents they upload to the system, allowing them to verify, supplement, or selectively disclosure their information with granular access control, automatically-expiring access rights, etc. Pseudonymous or name-blind communications (and even rental applications) are easily implemented in the system, even in cases where legal identity has separately been proven before being redacted.
4.  Verifying rental and financial history (including a way to attach notarized affadavits from previous landlords or roommates) can offer a powerful counterweight to third-party credit ratings or other prejudicial pieces of evidence in an application.
3.  Applicant control of their own data and applicant privacy both shift the power dynamic towards the weaker party, establishing trust earlier and more organically in a business relationship that can easily tip over into antagonism or distrust. 

Negotiating and signing a digital-first rental contract also improves upon traditional paper-first contracts in a number of ways. Digitizing the application process as described above enables this kind of trust-rich contract negotiation to happen first in the digital realm, even if a paper contract follows thereafter:

1.  Tenants entering into their initial contract negotiations feeling empowered and respected allows for a healthier bond and a better contract; updating contracts and negotiating terms over time (such as repairs, upgrades, or sublets) through a mediated, third-party platform also benefits from the introduction of such a substrate of objective and verificable documentation.
2.  Digital-first contracts can be machine-readable, searchable, and more easily anonymized and aggregated for the purposes of reporting, regulation, and objectivity.
3.  Self-sovereign identity systems allow anonymization of contracts for any of the signing parties to share without compromising the identity or privacy of counterparties. In cases of criminal investigations or disputes, however, permission can be requested to "break the seal" on that very anonymization. 
4.  This nuanced system is interoperable with recently-adopted international data-portability [standards](https://www.w3.org/TR/vc-data-model/), often referred to as "Self-sovereign Identity" (or SSI for short). These standards are published by the Worldwide Web Consortium (W3C). So far we are supporting import and export of both contracts and supplemental data to the two most advanced and widely-used open-source SSI systems (Sovrin and uPort). We plan to maintain full access and support for our users across both systems, and will be supporting future systems on the same scale as they emerge, including the forthcoming standards for e-government SSI being drafted this year by the European Commission's European Blockchain Services Infrastructure (EBSI).

## 2 What is Self Sovereign Identity?

* TLDR; SSI allows the "subject" of all data to have **ultimate control** over it, and creates technical systems for giving restricted and revocable access to other parties. Ultimate control also means being able to take your data to other providers, freedom from being "locked in" to any service relationships or data platforms, and having privacy and consent rights on all usages of that data. *

Self-sovereign identity (hereafter "SSI") is not so much a technology but a set of design principles that restore common-sense privacy and data rights to citizens by radically restructuring data flows and access controls. The internet and even more broadly most information technologies have been very heirarchical since their inception, with each individual user's data locked up in an "account" which is ultimately controlled by a hosting organization that controls the servers and the software that can change, copy, sell, or delete any data it holds. Not only can a user's "account" be dissolved unilaterally, these so-called "identity providers" were under no obligation until GDPR to allow their users to go elsewhere. In fact, if a company or institution that provides identity accounts is itself dissolved, so are all the accounts it administered. SSI seeks primarily to redress this power imbalance between citizens and "identity providers".

Rethinking data power means thinking in terms of individual and collective rights. In SSI, we talk a lot about all data having a "subject": the person to which that data primarily pertains. In some professional or industrial contexts, that "person" is a "legal person" (a corporation or organization); in other, a machine or even an autonomous self-teaching algorithms might rightly be considered the "subject" of data it produces. In its essence, SSI means that ultimate control over any and every piece of data should be given to its "data subject". We'll return shortly to what a "piece" of data is, and how "ultimate control" can be defined for such a unit of measure, but first enumerating the rights of the data subject might be helpful:
1.  A citizen should have full and direct control over personal, sensitive, and/or valuable data of which they are the primary subject.
2.  A citizen should be able to disclose sensitive information in a selective, attenuated, privacy-preserving, and revocable way, keeping the original and authoritative copy.
3.  A citizen should have freedom of movement for all important data pertaining primarily to them, which can never be "locked into" networks, whether by contracts, by proprietary formats, by technologies, or by any other ruse.

We are habituated to think of data in terms of files and records, since most data today exists in file systems, databases, and "clouds" or "lakes" comprised of both. The main problem with both of these is that files and records "belong" to whomever owns the hard disk, server, database, or giant cloud-based "lake" where they are written. That means these owners of data real estate can make copies, sell data, delete or hide any data that falls into their possession, at will. You could even say the current technical system gives essentially absolute power to anyone who has any data. While some exertions of that power might be illegal (and more of them are being legislated every day), that post-facto legal punishment is not a great deterrant to technical abuse, since the burden of proof for misdeeds is so high, and that power includes plenty of mechanisms for wiping ones tracks.

Instead, SSI proposes a new "atomic unit" of data: the "**Verifiable Credential**". This freestanding unit is encapsulated with fancy mathematics, requiring access to cryptographic "keys" for write access, read access, and verification on that file. Since these keypairs are managed separately from these self-contained, encrypted files, having them on your hard disk does not grant you absolute power-- if your key to a file is revoked, it is simply an encrypted file you can't read or access. Combined with data minimization, data portability, and protection against "**vendor lock-in**" and proprietary systems, this drastically empowers the data subject against the owners and operators of public and/or private data infrastructure.

If taken to heart and adhered to strictly, these principles will rebuild our entire information technology systems from the ground up, putting the data rights of the citizen at the center of a new digital society. These values are highly congruous with (and influential on) the current agenda of many projects of the European Commission (most notably the Horizon 2020, Next Generation Internet, and European Blockchain Services Infrastructure, which includes a rapidly-evolving legal framework for public-sector and crossborder SSI). The Pan-Canadian Trust Framework, Latin America's LACChain, and various Asian/Pacific initiatives have also put considerable resources towards international coordination of efforts and harmonization of legal and technological thinking along these lines. 

Privacy, anonymity, consent, and individualism are often foregrounded as the core values or benefits of a SSI vision of the future internet, but no less important are decentralization, individual control over correlation and trackability (which are not always bad things!), granular access control, and data portability. For a more detailed and referenced history of SSI design principles, see Appendix B.

## 3 Domi's solution for rental contracts

*TLDR; The purpose of Domi's cloud platform is to
- to make the deliberate and respectful exchange of sensitive information a foundation of trusting and healthy rental relationships;
- to formalize those healthy relationships in contracts and accompanying factual documentation that minimize distrust and disputes;
- to allow all parties (tenants, landlords, and outside observers) to have appropriate, useful access to factual data that helps them thrive during and after renting.

technically, this means we built the system:
- to provide selective, progressive, exchange of sensitive personal information related to applications, including identity, financial, and citizenship records;
- to manage the life-cycle of rental contracts between users of the platform, with onramps to the platform at every stage (discovery, application, contract initiation, or contract signing)
- to provide each user a self-sovereign wallet for storing their [portable] Verifiable Credentials related to these processes
- to maintain a history of events relevant to a given rental contract or rental property, which can be accessed and shared differently by various stakeholders*



### Main components and functionality

##### FOR ALL PARITES:

**Verification of identity and supporting documents.** Identity information, financial records, and rental history can be collected here and verified to various levels of assurance by self-attesting, verifying through our KYC/identity partners, or importing from other public or private systems such as government SSI credentials or "open banking" services. 

**Selective disclosure** and **progressive disclosure**: Sensitive personal information (almost 100% of the information exchanged in the rental process) always needs to be shared carefully, securely, and appropriately. In paper terms, it would be unworkable to provide redacted documents until a later stage in the process, or to interact anonymously until signing a contract, but in the digital world, these are possible application of selective and progressive techniques for disclosing data that has been carefully segmented and separately encrypted in machine-readable form. Disclosure should be as flexible and granular as your business process and your business case-- which, in the case of renting, includes a lot of incremental building of trust, auditability, and transparency.

**Objective and Auditable Record of Rental Events**: Signing a contract, moving in, and moving out aren't the only events in the history of a rental relationship and the contract that formalizes it. Tenants and landlords might benefit from a shared record of rental payments, contract amendments, repair incidents, sublets, etc. Where both parties consent to using Domi for this record, any or all of these events can be registered and bound to their contract.

**Verifiable Price History**: Nothing is more controversial and consequential in rental markets than occupancy pricing, and lack of uncontroversial, shared data on the subject breeds distrust, friction, and political discord. A mechanism for establishing facts at scale could be invaluable to the rental market and broader ecosystem of regulators, planners, and scholars. Particularly if combined with accurate records of repairs, renovations, and mitigating factors specified in rental contracts, this could be not just objective data but detailed, powerful, high-quality zero-party data.

__FOR LANDLORDS:__

**A repository of verified, valid rental contract drafts, custom contract texts, a visual contract builder.**  We cover cases like: single main tenant, two main tenants, sublet, co-living, and various kinds of short-term contracts and subleases. We planning to continually extend this library, in consultation with experienced local lawyers and our customers. 

Follow several easy steps to customize the contract draft by entering details such as addresses, prices etc. and select from available options. A digital assistant validates and checks the consistency of your input.
**Streamlined selection process for pre-verified tenant applications.** Identity information, financial records, and rental history can be collected and verified before being submitted, quickly and fairly slimming down a stack of applications to a qualified shortlist.


**Application handling for rental marketplaces.** Create an easy to use "Apply" link which you can post on any marketplace site as clickable link, button or a QR-code. Specify which kinds of information must be included with the application, and which are optional. Enable your prospective tenants to see the contract draft while they apply or selectively hide some of the attributes like the exact address. Easily access all applications via web interface or an API. 

**Negotiate and sign contracts electronically.** Select your future tenant from the applicants and offer them a contract by requesting their signature. Handle negotiations securely and privately and yet auditably, leading up to initial signing and after.

_Here it is still not clear how it should work. The original idea of digitally signed rental contracts is porbably not working due to specifics of tenancy law in Germany, the main problem being that it is hard/impossible to avoid paper contracts, at the same time the passportability is based on e-contracts and at the same time maintaining consistency between paper contracts and their e-versions is non-trivial too. So I am thinking now about different ways of achieving this. [I would say just leave it in the whitepaper as-is for now, since we can get investors and property managers dreaming with this description and hammer out roadmap or temporary solutions or workarounds with individual prop mgmt companies later in the process! __JC]_

**Generate signed PDF documents.** Export all drafts, offers and signed documents as digitally-signed PDF files.

__FOR TENANTS:__

**Verification of identity and supporting documents.** Identity information, financial records, and rental history can be collected here and verified to various levels of assurance by self-attesting, verifying through our KYC/identity partners, or importing from other public or private systems such as government SSI credentials or "open banking" services.

**Upload and save scans of your documents**. (currently not sure about this) _[I would say let's just use 3Box or Capsules or IPFS to allow encrypted storage of sensitive PDFs for sending through the system or "exporting to PDF"? as elsewhere, I think the nontechnical whitepaper at this stage can overpromise a little because no one's invested or signed LOIs yet-- work out the details with our actual signing partners later! --JC]_

**Manage all your papers**. Even for landlords that don't accept Domi passports, export functions and secure transfer make Domi a useful way for tenants to organize their application materials securely and manage many applications simultaneously.

**A manager to simplify your application process.** Learn about your landlord before you apply, see what information they are requesting, select information you want to share. Request rental history of the specific unit or building. See all your active and past applications in one place.

**Negotiate and sign contracts electronically.** Handle negotiations in-app and auditably, leading up to initial signing and after.


### How different kinds of users benefit from Domi's solution

**Tenants:** The delicate personal information included in rental applications and contract negotiations is valuable and can be dangerous in the wrong hands, so the knowledge that it is stored, sent, and shared with modern end-to-end encryption techniques is important to many people concerned about identity theft and data breaches. It is also information that has historically been very laborious to confirm and verify, so using modern eSignature and auditability standards ensures it will be maximally trustworthy without literally or figuratively "phoning home" to the origins of the information. 

Taking the time to fill a digital passport with verified information doesn't just save the tenant time when applying to many apartments, however.  It also allows the applicant to present the best and most relevant information if they feel their rentworthiness is inaccurately reflected in the opaque, algorithmic calculations of credit reporting agencies (such as Schufa or Equifax/Experian). This is true outside of the original context of renting, as this same body of verified documentation might be useful in other spheres as well. Moreover, the value of a rental passport grows the further back a tenant fills it, and the longer someone uses it.

**Landlords**: Accepting rental applications in the form of Domi passports is both time-effective, efficient, and risk-mitigating in that tenants can be chosen quickly on the basis of pre-verified factual criteria. 

Not insignificantly in cases of public, semi-public, or large-volume housing administration, using Domi creates a single ledger of record and corresponding audit trails for all the key events in the application and contract processes, should conflicts arise down the line. This can be particularly valuable in cases where the rental and/or contract processes have been outsourced to a service provider.

**Property Managers**: Managing the rental process involves handling a lot of personal information, which two years into GDPR enforcement can feel a little like handling plutonium. A privacy-preserving way of receiving, reviewing, and automatically deleting such materials is also a liability-limiting one, in that human error risk and data sharing overheard are both greatly reduced. Furthermore, it is easy to integrate Domi's platform to ERP systems for property management at scale, turning Domi features on and off for each individual property or client.

**Rental Marketplaces and other rental matchmaking services**: Lots of organizations match up apartment-hunters and apartments: online marketplaces that charge a success fee, government agencies, non-profits, universities. In many of these cases, apartment-hunters clamor for a more integrated solution that accompanies them through the contract negotiation and signing process, but for a number of reasons (not least of them liability!) these matchmakers are averse to presiding over the actual legally-binding ceremonies. Domi allows them to hand off the process to a trusted and neutral intermediary without compromising on their relationships with their customers and clients.

**Regulators, academics, and other data analysts**: City planners, investors, property managers, tenants' rights groups, and the construction business have all long suffered a lack of uniform, reliable, uncontroversial data on real-world rents, average ages of contracts, and other basic facts about the rental market. Renting has historically been a very private legal matter with lax and underenforced reporting requirements in all but a few jurisdictions, and the promise of a privacy-preserving way to anonymize and aggregate these contracts could make a world of difference to both the volume and the quality of data available for understanding, planning, and participating in rental markets.

### How Domi complies with SSI principles

The guiding principles of SSI are like GDPR in that while compliance with the "spirit of the law" is a matter of significant debate and approximate, broad-brush consensus, compliance with the "letter of the law" is essentially impossible because the specifics of both sets of guidelines, as currently encoded, do not correspond to currently-existing options in many cases. For this reason, "compliance" is less a matter of technical decisions and implementations and more a matter of commitments to values and policies are governance and privacy that are well-documented, open-sourced, peer-reviewed, and continuously evolving and maturing.

For instance, portability of data and freedom from vendor lock-in are lofty ideals difficult to guarantee in the current IT business environment except via open-ended promises about future behavior. Similarly, "direct control" by a data subject of all their data is often interpreted cryptographically, but this can create unsurmountable obstacles to usability and adoption. In our first release, we have opted instead to offer a conventional "user account" and identity to all our end-users, assuming custodial control of the private keys controlling that identity. We are also choosing to integrate with legacy systems for corporate identity authorities and eSignatures, for the simple reason that we want to meet our enterprise clients where they are and promote the broader SSI ecosystem within the real estate industries. 

We take seriously the promise that as the ecosystem grows and evolves, we will fully honor the SSI vision of total data portability and freedom from lock-ins. We also plan to offer a more self-custodial identity solution to power users who want to assume the higher level of risk associated with handling their own cryptographic keys.

## 4 How does it work?

### How users interact with Domi?

We strive to make the Domi "platform" or data exchange system as simple and transparent as possible, since usability for a recreational app is on a different order of importance from usability of a tool for securing housing, a human right. For this reason, we have a highly-usable mobile-phone application which has full functionality for individual users, as well as a web interface that is more time-efficient when managing large volumes of concurrent application process (for enterprise users, i.e. property management companies and large housing companies with complex organizational charts). An API interface is also available for integration into other systems (such as online rental marketplaces and matchmaking services). Enterprise clients can interact directly with the API if it simplifies integration into their proprietary systems, and have access to the same information and relationships managed in our web interface.

### Wallets

At the centre of Domi's ecosystem is the notion of user's personal identity wallet. In the SSI context, a "wallet" is a piece of software which is capable of issuing, accepting and verifying sensitive information encoded (and encrypted) in the form of "Verifiable Credentials" (see section 2).  Every individual user of Domi has a wallet which only this user can control and where user's personal rental passport, identity, financial statements and other information is stored in form of Verifiable Credentials. Enterprise users may control an "enterprise wallet" overviewing the processes of multiple processes, and which can assign (or re-assign) management of specific rental properties to specific employees representing the enterprise.

Some of the credentials may redundantly contain the same attribute. For example, the attribute _family name_ can be self-attested, or obtained as a result of an online AI assisted ID check or be submitted by a trusted partner like a bank. For this reason, every credential on the Domi platform also contains the *source* of the information. This allows automatic ranking of credentials according their the trustworthiness, as determined by the trust framework of the "relying party," i.e. the contract party trying to assess the trustworthiness of its counterparty.

In the current version, both individual and enterprise wallets on Domi function as "custodial" wallet solutions. The access to a wallet is controlled through conventional authentication mechanisms like passwords, OTP and biometrically locked access tokens in the case of mobile clients. The keys controlling these wallets are stored in a separately-secured part of the backend infrastructure. In time, we plan to allow self-managed keys for higher security and to comply with the security policies and systems of enterprise clients and more privacy-proactive individuals; hopefully, third-party key management and recovery services that support SSI systems will hit the market and mature in the meantime.

Internally, Domi uses Hyperledger Indy (Sovrin) compatible identity wallets, which anchor identities and credential definitions to the Hyperloedger Indy blockchain and use Aries-style flows for issuance, presentation, and verification of credentials. We are active in the SSI community and participate in interoperability processes where appropriate.

### Contracts

To build a Rental Passport with real-world actionability, Domi had to implement a mechanism that can manage contracts digitally and bind them to other data involved in the rental process. The functional requirements of our contract "engine" can be summarized as follows, and will be explained in layman's terms by the rest of the section: 
1. Integrity
2. Authenticity
3. Reliability
5. Human readability
4. Machine readability
5. verifiability
6. Authenticity of signatures
7. Proof of intention

The core requirements of any actionable contract management process are not specific to online-first processes: we could call these universal requirements for contracts. These include proving that the contract text and contract data have not been changed since being authored (**integrity**, sometimes refered to as "tamperproofing"), as well as identifying (or at least being able to identify, if withholding identification from users or recipients of reports) the legal person who authored the text of the contract (**authenticity**). Since a contract must be accessed by various parties over a long period of time for them to act on it, reasonably ensuring continuous access to the authoritative text to those parties is also a requirement, which can be interpreted differently in digital or paper terms (**reliability**). Last and the most important of the universal requirements is that a contract be "human readable," or at least readable for humans reasonably versed in legal concepts. In some jurisdictions, contracts have to be written in specific languages to be actionable there, and/or reference the specific legal codes under which they are enabled. __Note: sometimes people misuse the term "human-readable" to mean legible to laypersons or in simplified, highly-usable form; while this is an important consideration and one we ourselves take seriously in the design of our contract editor, verbose and technical "legalese" is still human-readable, even if most humans are thus required to do extra work.__

Another meaningful requirement for every Rental Passport is that it be **machine-readable**. This means the data it contains should be in a format that facilitates the execution of algorithmic queries against it. In layman's terms, that means a reasonably wide range of algorithms written in different languages should be able to answer a suitably formulated question about the contents of the contract, e.g. "when does the contractually-defined activity (in this case, rental occupancy) begin and end?". Furthermore, such a querying algorithm should also be able to *verify* the validity of the data, rating the trustworthiness of its sources, the signatures, and the "identities" of the counterparties (not necessarily their names but their ability to be identified or contacted where appropriate). One crucial requirement for this verifiability is the capability to run an algorithmic "audit" on the **signatures** to a contract, i.e., to trace dependencies and issuances back to public, institutional "anchors" of trust, jurisdiction, oversight, and identity. This is referred to as auditing the **authenticity** of the signatures.

One last requirement is the **proof of intention** behind signatures on a contract. This requirements deserves special attention for its difficulty of defining objectively: the intentions of individuals cannot be proven as matters of fact, but a reasonable effort can be made to trace the circumstances under which they signed the contract. Just as paper contracts traditionally are dated (or even timestamped, in cases where higher levels of assurance around intention are required) and geolocated, to serve as a factual support to a relationship between legal persons who discussed and signed the contract together. Metadata about the digital "session" in which a contract was signed, including how long the text of the contract was displayed, can serve as the digital analogue to these centuries-old legal practices. Domi tries to facilite good-faith negotiations and careful reading of contracts in its interface design, avoiding the coercive tradition of interface design that rushes end-users through a rubber-stamping process to approve their terms of use or terms of service.

### Flow

The typical flow of interaction with Domi platform begins for private users with the creation of Domi account. After verifying the email address and setting up security measures like second factor authorization  users have the possibility to enrich their profile with relevant data in three different ways: 1) by filling out a self-attestation form and optionally uploading scans of relevant documents,  2) by importing verifiable credentials from already existing SSI wallets like Streetcred and uPort, or 3) by performing an online ID check or  importing their financial information through one of our trusted partners.  Based on this input Domi issues corresponding VC's containing the data, it's source and the timestamp of the issuance.



### Integration with online marketplaces


Detailed flow.. move to an Appendix?

![diagram](out/Domi Simplified Flow for Marketplace v0.1.1.png)



## Signatures

How Domi e-signature works? 

Every Domi user has a corresponding

Domi users can authenticate themselves in three ways:

1) by presenting a combination of login and password (and optional 2FA)

In this case the login is resolved to the Domi ID. Domi ID is 

2) by presenting a Domi Credential stored in their third-party SSI wallet

3) via private key which is stored in their Domi App and protected by biometry



### Qs

How we protect this information? (Encryption, currently not implemented)

Verfiable credentials can be consumed from other sources. Which credentials do we recognize (Onfido verified gov ID via uPort, what else?) What are our plans

Verifiable credentials can be produced from externaly verified data sources. What other services are available within domi platform (Onfido, Banking etc)?

Why it solves the concerns raised in "Why does it matter?"?

What can be done with Domi-issued credentials like( Can we use the VC attesting a rental contract somewhere else )

## 5 Future outlook

What is our tech strategy? Moving towards Domi v2 - decentralised solution with personal edge wallets

## Appendix A: References


## Appendix B: Compliance with emerging technical standards and specifications

The term "self-sovereign identity" is the contemporary heir to an intellectual tradition within the software industry that dates back to at least the early 2000's.  The thrust of this movement is to shift the balance of power towards the data subject and away from powerful institutions. There are a lot of technical, social and legal changes wrapped up in this ideology of user-centric data systems, but coming as it does from the software industry, most of the attention is focused on reforming the data structures and software stacks around a more user-centric reconfiguration of the identity and access management (IAM) sector of the software industry.

As SSI is a very open-ended and democratic movement, there is no single source of truth or official body defining it. One key biannual technical conference incubating lots of SSI ideas and technologies, "Rebooting the Web of Trust," is organized by Joe Andreiu and Christopher Allen, whose work since his involvement with the Pretty Good Privacy (PGP) end-to-end encryption system in the 1990s has centered on blockchain and privacy-preserving technologies. The latter's [essay](http://www.lifewithalacrity.com/2016/04/the-path-to-self-soverereign-identity.html), "The Path Towards Self-Sovereign Identity" (2016), is often taken as the most canonical formulation of SSI's "10 principles." The essay draws much inspiration from an older work, Kim Cameron's "The Seven Laws of Identity" ([2005](https://www.identityblog.com/?p=1065)), which was written at another biannual IAM conference, the "Internet Identity Workshop." This conference, organized by Kaliya Young, Doc Searls, and Phil Windley, serves a broader IAM business and technical community, including more representatives of major IT conglomerates. The main technical specifications for standardizing SSI practice and interoperability are those editing by the Worldwide Web Consortium ([W3C](https://www.w3.org/TR/vc-data-model/)), while reference implementation, testing, and pre-standards incubation are mostly done through the Decentralized Identity Foundation ([DIF](https://identity.foundation). 

For our purposes here, it might suffice to say that SSI principles seek to maximally empower individual users to control their data and the "identities" (in layman's terms, their accounts) through which they interact with institutions, websites, and software. This entails a drastically user-centric reconception of a user's "accounts" and the rights they should have over those accounts-- "persistence", independence, and self-determination. In terms of the non-identity data tied to and controlled by that identity (what the European GDPR framework calls "personal data"), this must be maximally portable (i.e., data must be formatted and exportable in a way that it can be used elsewhere, not in proprietary formats or closed systems). It must also be signable, controllable, and shareable in a granular way to allow "selective disclosure"-- this is an invaluable building block of "data minimization" on the side of data processors.  After all, for services and companies to ask users for the minimum data necessary, users have to be able to easily give exactly that data and nothing more!

To simplify greatly, we could say that the atomic unit of identities is called a decentralized identifier (DIDs, defined by the W3C "DID" [specification](https://www.w3.org/TR/did-core/)), while the atomic unit of [personal] data is called a verifiable credential (VCs, defined by the W3C "VC" [specification](https://www.w3.org/TR/vc-data-model/)). In architectural terms, SSI identities are essentially controlled by users via private keys and an elaborate public key infrastructure allowing them to publish identity anchors that can be updated or moved to new services over time. Pieces of software called "wallets" facilitate this control of identity information and public records, as well as storing VCs (which may require control of a given DID to access or share with others). Software abstractions called "agents" and "hubs" facilitate large-scale operations like issuance and processing of VCs, signatures, verifications of external VCs, etc on behalf of individual and/or institutional identities.

At time of press, the DID specification is not an official recommendation and is still being refined, whereas the VC specification has been out for a year and many production systems using them are already approaching maturity and interoperability. Since Domi's primary function is to serve as an information-sharing platform, we are primarily focused on being able to issue and export VCs to other SSI systems. Since the SSI ecosystem is not fully mature and relying on broad adoption of [interoperable] SSI wallets will be untenable for the foreseeable future, we have implemented a custodial system for SSI identities to be created on behalf of conventional user accounts. 

Our custodial system, implemented using SpacemanID middleware, creates a lightweight DID and wallet in the Sovrin SSI ecosystem and ledger, controlled by keys stored in the Domi user's account. While we expect this to remain the default setting for most users, we are planning to allow fully self-custodial control via integrated wallets as SSI technology goes mainstream.

Importing and exporting VCs is already more feasible today, and we have already integrated with the other major open-source wallet provider, uPort, to allow VCs that support rental applications to be imported to our custodial Domi wallet. We plan to be fully compliant with Aries cross-platform credential exchange RFCs or reference implementations (depending on their level of development) in time for our first stable production-grade release.

## Appendix D: Legal Considerations

### Legal considerations

eIDAS explanation

> Additionally, the eIDAS regulation sets the principle of non-discrimination of the legal effects and admissibility of electronic documents in legal proceedings, stating that an electronic document cannot be rejected as an evidence solely because it is in electronic form. As the Regulation defines ‘electronic document’ as any content stored in electronic form, in particular text or sound, visual or audiovisual recording, this legal effect applies also to “blocks” in a blockchain 
>
> ...
>
> eIDAS recognises 5 different trust services
>
> - Electronic signature (eSignature): is the expression in an electronic format of a person’s agreement to the content of a document or set of data. 
>
> - Electronic seal (eSeal): used by legal persons, it is similar in its function to the traditional business stamp. It can be applied to an electronic document to guarantee the origin and integrity of a document. 

_I think in eIDAS terminology Domi issues sealed documents_

simple vs advanced vs qualified

There's evidence that simple eSignature is enough to do busieness





(https://ec.europa.eu/futurium/en/system/files/ged/eidas_supported_ssi_may_2019_0.pdf)






##Appendix E: FAQ (links back to earlier pages)



## Q: What is the Domi Wallet? What it is used for?



## Q: What are Verifiable Vredentials (VC)?



## Q: What is a custodial wallet?



## Q: How is the access to the custodial wallet controlled? How is the data protected?



## Q: What is Domi Rental Passport? Which data is contained in the Domi Rental Passport?



## Q: Does Domi use multi-factor authentication? How?



## Q: How does backup/recovery of the user's data work?



## Q: Which VC's does Domi consume? For which purpose?



## Q: Which VC's does Domi issue? 



## Q: Can Domi platform see/read the information it is relying between parties?

 

## Q: Which information about the tenant is shared with the landlord? 



## Q: Which information about the landlord is shared with the tenant?



## Q: Is Domi Platform a controller/processor in the GDPR sense?



## Q: How do digital signatures work in Domi?



## Q: How Domi makes money?

 





# Glossary of SSI

..







