---
title: ACID can protect against computer hacking
category: "Digital Transformation"
tag: ["Cybersecurity", "Product", "Data"]
toc: true
---

It is hard to feel sympathy for [black hat hackers](https://en.wikipedia.org/wiki/Black_hat_(computer_security)) who violate computer security with impunity for personal gain or malice. Their action (data breach, manipulation, and destruction) exposes victims to impersonation/fraud, financial damage, loss of privacy, and even life threatening situations. While some grey hat hackers (and whistleblowers) have noble goals (see “[Hacktivism](https://en.wikipedia.org/wiki/Hacktivism)”), the consequences of their illegal actions can take a toll on [their quality of life](https://en.wikipedia.org/wiki/Aaron_Swartz) and their friends and families have to pay the price. 

But should some of that ire against hackers be directed at the corporations and governments who hoard this data but sometimes fail to adequately protect it? In some cases, it’s hard not to feel let down by important organizations that will publicly expose their customers’ personal information. For example, look no further than AT&T and Apple, who publicly exposed all of the email addresses of all the people logged in to their 3G network with an iPad - [no hack required](https://www.computerworld.com/article/2518818/-brute-force--script-snatched-ipad-e-mail-addresses.html).

This snafu on the part of AT&T with iPads is already almost 10 years old. Since then, have corporations and governments generally learned how to thoroughly and unequivocally protect data they collect? 

In section 1, I’m going to argue that your organization may already have been hacked, and likely will be hacked in the future. I’ll then compute statistics that suggest that the data breach problems are actually getting significantly worse. And I will conclude that your organization will need to seriously consider revising your standard for authenticating users. In section 2, I’m going to attempt to explain and illustrate why cybersecurity is so hard. And finally, in section 3, I’m going to propose the ACID framework, which are four steps to attenuate your cybersecurity business risks. As a leader of your organization, you should:

1. **A**ssume that you have been hacked
2. **C**hange what you need to protect
3. **I**nvest in security policies, threat models, and mechanisms
4. **D**rive a protection first culture 

# 1. You’ve probably been hacked, and you will be hacked again

As a leader, you have to come to peace with the fact that both you, personally, and your organization may have already been hacked, and that you will be hacked again in the future. If you are convinced that you haven’t been hacked, how do you know for certain? Consider for a moment the [Stuxnet worm](https://en.wikipedia.org/wiki/Stuxnet), which was arguably one of the [most sophisticated](https://www.quora.com/What-is-the-most-sophisticated-piece-of-software-ever-written-1/answer/John-Byrd-2) weapons created before 2010 to [slow down Iran’s nuclear ambitions](https://www.langner.com/wp-content/uploads/2017/03/to-kill-a-centrifuge.pdf). Despite all its physical manifestation, it took more than a year to be detected, and more years after that to study and understand. A much more passive worm that merely collects and relays data could live under the radar for much longer.

I’m not one for conspiracy theories, but when there is a will, there is a way (unless the laws of physics prevent it). Would it be too much of a stretch to imagine that the cell phones of many prominent CEOs and heads of states have silently been hacked? No laws of physics prevent it with certainty. How you navigate the next 10 years will be greatly affected by the decisions you make today. But first, here’s some data to support my claim about your data.

## 1.1 At least 2 billion records breached so far in 2019

As of August 2019, a Wikipedia entry lists [17 reported data breaches](https://en.wikipedia.org/wiki/List_of_data_breaches#cite_note-318), totaling over 2 billion records. The reality might be much worse according to [Consumer Affairs](https://www.consumeraffairs.com/news/nearly-4000-data-breaches-have-exposed-41-billion-consumer-records-so-far-in-2019-082119.html). It affects everyone: well-funded unicorn startups, major banks, and even highly sophisticated tech giants. For instance, if you have a [Canva account](https://www.canva.com/), a Capital One credit card, a Facebook account, or if you closed a real estate deal since 2003 (e.g., bought a house), some data you shared with those organizations might have been made public. That last one concerned American Financial Corp, which according to [Brian Krebs](https://krebsonsecurity.com/2019/05/first-american-financial-corp-leaked-hundreds-of-millions-of-title-insurance-records/) exposed data such as:

+ Bank account numbers 
+ Bank statements
+ Mortgage documents
+ Tax records
+ Social Security numbers
+ Wire transaction receipts
+ Drivers license images 

We just don’t know for certain, and people who gain access likely have incentives to keep it private. If you want to stay up to date about the many security breaches that are discovered every month, I recommend Brian Krebs as a primary source. If you haven’t heard of him, know that he is an investigative reporter, and is considered an [authority on cybersecurity](https://en.wikipedia.org/wiki/Brian_Krebs) and his [blog](https://krebsonsecurity.com/) is top notch. 

## 1.2 The growth rate is exponential, at 30% per year

I did a quick analysis, which you can find [here](https://docs.google.com/spreadsheets/d/15y0nxp3t7FajBQGZDROVcb7bvq84Yid3-1GX7NDzFyc/edit?usp=sharing), where I show that while the number of reported data breach cases have been growing linearly at 4% per year (R^2 of 0.27), the number of records breached (excluding the [3B Yahoo records breach of 2013](https://www.nytimes.com/2017/10/03/technology/yahoo-hack-3-billion-users.html)) have been growing exponentially at almost 30% per year (R^2 of 0.64). You don’t need to be a hedge fund manager to recognize that anything growing at that rate is scary fast and you don’t need to call yourself a data scientist to recognize that an R^2 of 0.64 is hard to brush aside.

Let me give you a sense of what the exponential growth means if you believe the model holds true. At this rate, by 2030, you can expect that 169 billion records will have been breached (39 billion records in 2030 alone). This means that if the world population reaches 8.5 billion people ([as projected by the UN](https://www.un.org/sustainabledevelopment/blog/2015/07/un-projects-world-population-to-reach-8-5-billion-by-2030-driven-by-growth-in-developing-countries/)), and if you assume that every human is equally likely to be exposed, our personal records will on average have been breached 20 times. **So much for the last four digits of your US Social Security Number (SSN) as a proof of identity!**

## 1.3 A new standard for authentication will be needed

Even if your organization does not get hacked, you will have to adapt because others will get hacked. What pieces of information do you currently require for a person to create an account to use your services? How does customer service validate who they are speaking with?

In a world where personal records have been breached 20 times, it’s hard to imagine how asking for a date of birth, providing a copy of a driver’s license, or giving a Social Security Number will prove much if anything at all. Now compound that with the ability to generate [deep fakes of voice and video](http://cyberlaw.stanford.edu/our-work/topics/deepfakes). If left unchecked, future hackers will be able to contact your credit card company, reset your password, and go on a bitcoin shopping spree.

*Side note: The legal implications of deep fakes will be ground shaking to our medieval systems of justice. On that topic, I highly recommend checking out The Stanford Law School’s [Center for Internet and Society](http://cyberlaw.stanford.edu/). If you only have 4 minutes, take a watch of Edward O. Wilson’s [What Is Human Nature? Paleolithic Emotions, Medieval Institutions, God-Like Technology](https://bigthink.com/videos/eo-wilson-what-makes-us-human-paleolithic-emotions-medieval-institutions-god-like-technology) - I started reading his book [The Origins of Creativity](https://bigthink.com/videos/eo-wilson-what-makes-us-human-paleolithic-emotions-medieval-institutions-god-like-technology) from 2017.*

You might need to find a way to serve your customers and make a profit without relying on pieces of information you can count on today. I’m not going to expand on it in this post, but one avenue worth exploring will be blockchain backed [self-sovereign-identity systems](https://en.wikipedia.org/wiki/Digital_identity#Self-sovereign_identity) with hardware tokens, digital footprint, and biometrics.

# 2. Illustration of why cybersecurity is so hard

You probably do not need to learn exactly how security exploits work (e.g., a stack buffer overflow, SQL injection), but you do need to understand that what makes cybersecurity such a challenging and humbling problem is that software can have millions of lines of code, and it only takes one mistake to compromise security. The entire Lord of the Rings series has [576,459 words](https://blog.fostergrant.co.uk/2017/08/03/word-counts-popular-books-world/) while the Harry Potter series has [1,084,170 words](https://blog.fostergrant.co.uk/2017/08/03/word-counts-popular-books-world/). Assuming that a sentence is made of 20 words on average, and that sentences are equivalent to lines of code, then reading the source code of Microsoft Office 2013 (with it’s [45,000,000 lines of code](https://informationisbeautiful.net/visualizations/million-lines-of-code/)) is equivalent to reading Harry Potter 830 times, and reading Google’s entire code base ([2,000,000,000 lines of code](https://informationisbeautiful.net/visualizations/million-lines-of-code/)) would be around 37,000 times. Historians in the year 5,000 AD might see Google as the pyramids of the year 2,000 AD!

Worse, in some cases, the mechanics of the software work exactly as intended, but the policy and people process to secure the data are flawed - ask [Jack Dorsey who fell victim to a sim swap](https://www.nytimes.com/2019/09/05/technology/sim-swap-jack-dorsey-hack.html). In the Newtonian physics world our paleolithic brains are accustomed to, securing a space implies watching a small number of doors (for instance the [Whitehouse has 412 doors](https://www.whitehouse.gov/about-the-white-house/the-white-house/)). In the digital world, the number of doors could easily be counted in the millions. Understanding software deeply is a singular mind opening task because our intuition and emotions consistently get in the way of grasping it.

## 2.1 Your data exists in multiple forms

You need to have a clear understanding that your data exists in multiple forms. On the one hand, you might have a single source of truth in a database somewhere. But copies of subsets of that data most likely are also present in the form of memory (in your RAM and inside the registers of your CPU), packets getting sent over the internet, backups, buffers, and on the client side (web browsers and mobile phones). All of the copies of your data exist independent of each other, and while most systems will generate logs of what happens to your data, it’s impossible to log and monitor everything. 

## 2.2 Encrypted does not equal secure

Being “encrypted” is a loosely defined term until you specify who has the key to open it. Just because your data is encrypted doesn’t mean it is secure. For instance, if the data is encrypted in the database, but the server has the key to decrypt it and your server gets compromised, then you have a security hole. If your business case allows you to keep the data encrypted on the server, and the keys are left with the client only, then you’ve eliminated a large class of security holes.

Unfortunately, for many applications, server side data is not encrypted with a client provided key. For instance, how could my bank relay my information to the government if my address was encrypted with my key, and the bank didn’t have a way to open it? Your objective, therefore, should be to leave your data encrypted for as long as possible, so that if there is a channel that is compromised, attackers would only see random numbers.

*Side note: [RSA is one of the algorithms behind the “S” in “HTTPS”](https://tiptopsecurity.com/how-does-https-work-rsa-encryption-explained/), which stands for HyperText Transfer Protocol over Transport Layer Security (TLS). HTTPS was introduced by Netscape in 1994 to allow private communication between your browser and a website’s server. RSA is “computationally secure” because decrypting (without knowledge of the two large prime numbers making up the private key) requires huge computational power. If you want to understand how it works, I implemented the algorithm in a [Google Spreadsheet which you can copy and play with](https://docs.google.com/spreadsheets/d/19Xd2ZpNQj_ShXRsnncCkjp1Gd90sXZve0gBUJTm6TFw/edit?usp=sharing). It’s worth noting that while quantum computers might be around the corner (and with [Shor’s algorithm](https://en.wikipedia.org/wiki/Shor%27s_algorithm) could decrypt RSA by factoring large prime numbers quickly), and hence render RSA ineffective, we could still encrypt safely using [one-time pads](https://en.wikipedia.org/wiki/One-time_pad).*

# 3. What you can do about it today: the ACID framework

The ACID framework is a pyramid.

![ACID Pyramid](/assets/img/ACID.svg)

## 3.1 Assume that you have been hacked

This first step is a mindset shift and a habit. Imagine for a moment that you have been hacked, and your data is breached top to bottom:

1. Customer, supplier, and partner data
2. Email, sms, social media, and phone calls
3. Confidential documents (e.g., forecasts and roadmaps)
4. Secret IP (e.g., deep neural net weights that drive your AI)

How does the breach affect your ability to continue to sell your products and services? What’s the worst thing that could happen? 

### 3.1.1 Qualify and quantify the negative impact of a full breach

There are at least four ways that a data breach may affect your organization:

1. Direct impact on the people affected (customers, employees, suppliers, partners, etc.)
2. Decline in the reputation of your organization
3. Cost of lawsuits and fines
4. Loss of competitive edge

For instance, a network of hospitals could lose a lot of customers after a breach exposes all their patients’ confidential information. Additionally, in the future, the hospital network could have more difficulty getting new patients, and could face a hefty class action lawsuit. That would be devastating in at least three of the four ways mentioned above.

In terms of loss of a competitive edge, imagine that you are in the business of extracting natural resources and you’ve invested tens of millions of dollars building a deep neural net to quickly and accurately assess the value of an asset given core sample data. Or imagine that you are Tesla and finally have the neural net that achieves [Full Self Driving](https://www.tesla.com/autopilot). A data breach could expose the weights of your neural nets and source code (including the [SystemVerilog source code files](https://en.wikipedia.org/wiki/SystemVerilog), that are the blueprint for your custom hardware chip) which would effectively reveal your secret sauce. In such a case, you would have lost the intelligence asymmetry advantage you’ve invested so many resources in building. 

### 3.1.2 Data is both an asset and a liability 

While data can be extremely valuable, you need to be aware that it is also a liability. With the mindset that everything is public, you will be better prepared mentally to the eventuality of a breach and avoid unnecessary risks because when it comes to cybersecurity, hypochondriacs survive. 

## 3.2 Change what you need to protect

Sometimes, it’s necessary to collect data because the government requires you to do so, or because you want to offer a better user experience. For instance, as an employer you are required to collect the social insurance number and the address of your employees. In general, you need to ask yourself whether the benefit of storing a data point outweighs the risk. If not, you should change your approach.

### 3.2.1 Question whether the downside risk is worth it

If you run a network of hair salons or a convenience store chain, you may be tempted to collect information on your customers, such as their phone number, date of birth, the stores they go to, and the frequency of purchase. For instance, you might use that information to do a better job of targeting your promotions. Marketing analytics works and it makes money for the shareholders. However, it is a very slippery slope and before you know it, you will forget how creepy machine learning can get (e.g., promoting pregnancy related products to a teenage girl who bought [unscented lotion, mineral supplements, and cotton balls](https://slate.com/human-interest/2014/06/big-data-whats-even-creepier-than-target-guessing-that-youre-pregnant.html)). Perhaps hair salons do not need to ask for dates of births.

On the other hand, suppose that you run a cruise ship line. While at sea, it is very convenient to be able to chat and send pictures to your cabin mates. Cruise companies have invested in building apps that will contain features such as activity schedules, loyalty program, and on-ship messenger (no internet required). It might be tempting for a loyalty program manager to collect those chats to run some analytics on them. For instance, do customers who use the chat tend to be repeat customers? Pushing the envelope a little more, one could imagine doing real-time sentiment analysis on the chats to understand how the experience is going to offer you more targeting on-board promotions (e.g., happy hour on deck 11), or even sell these chats to third parties. Sounds far fetched? The Wall Street Journal had an [interesting article about Gmail Ads](https://www.wsj.com/articles/techs-dirty-secret-the-app-developers-sifting-through-your-gmail-1530544442), to which [Google quickly replied via its blog](https://www.blog.google/technology/safety-security/ensuring-your-security-and-privacy-within-gmail/). A cruise line company could choose to offer the chat feature with end-to-end encryption ([E2EE](https://en.wikipedia.org/wiki/End-to-end_encryption)) such that they would offer a great on-board experience without the ability to read the content of the chats on the server.

### 3.2.2 Weigh the tradeoff

The answer might not always be clear cut, so weighing both sides of the tradeoffs is wiser to mitigate the downside risks of a breach. When it comes to data, being a compulsive hoarder can be a significant liability. Deleting data and/or end-to-end encryption (such that you can’t read your customer’s data) might be a safer avenue.

Even if you assume that you’ve been hacked and minimize the data that you collect, you will still be left with some data that needs to be protected. It’s probably already quite clear to you and your team what data is most sensitive and valuable to your organization. Less clear perhaps is where it is stored, how it flows, and how to secure the data in its many forms.

*Site note: When it comes to learning how to hack systems, I’m more of a weekend warrior than a weekday professional. But my recommendation below is consistent with the first lecture from the [2014 MIT Open Courseware on Computer Systems Security](https://ocw.mit.edu/courses/electrical-engineering-and-computer-science/6-858-computer-systems-security-fall-2014/).*

## 3.3. Invest in security policies, threat models, and mechanisms

As taught by [Prof. Nickolai Zeldovich](https://people.csail.mit.edu/nickolai/#bio,teaching,contact,pubs) in [6-858](https://ocw.mit.edu/courses/electrical-engineering-and-computer-science/6-858-computer-systems-security-fall-2014/), you want to secure your data from a potential data breach by specifying a policy, threats, and mechanisms: 

1. **Policy**: a specification of desired behavior of the system (e.g., confidentiality, integrity, availability).
2. **Threats**: a set of assumptions about adversaries (e.g., do they have physical access and have the password?).
3. **Mechanisms**: the software, hardware, and process that enforces the policy and secures it against the threats.

### 3.3.1 Policy

In terms of policy, a poor policy could be in terms of weak recovery questions. For instance, if I call your customer service and recover my account by answering purely biographical questions, it is quite easy to perform a social hack. Imagine if a famous person like Sarah Palin were your customer, the [hack](https://en.wikipedia.org/wiki/Sarah_Palin_email_hack) could be as easy as calling customer service while giving answers from the Wikipedia page entry!

Beware of policies that are security theatres. For instance, requiring employees to change their passwords frequently may put a burden on the employees’ memory, making it more likely that they will use simpler passwords, or write them on a piece of paper as a memory aid. This [ironic xkcd cartoon](https://xkcd.com/936/) illustrates the point about poor security policies when it comes to passwords.

> “correct horse battery staple” is easier to remember and harder to crack than “Tr0ub4dor&3”

If your enterprise is serious about data security, which it is, you could consider augmenting passwords with a security key such as [Yubico 5 NFC](https://amzn.to/2ZWHa4T) and start adopting virtual credit cards with a different [controlled payment number](https://en.wikipedia.org/wiki/Controlled_payment_number), at least for every service / vendor combination.

### 3.3.2 Threats 

While threats can come from anywhere, not everything is equally likely, because advanced attacks may require a substantial amount of coordinated resources and efforts. The first class of threats to model are about human behavior and hardly requires any programming skills on the part of the attacker. Included in that will be easy to guess passwords, social engineering, and plain old downloading data that is left unprotected and publicly available to all.

That last one may sound fictitious if not kooky, but consider the following. Imagine if a company like Big Bank Co. had thousands of customers who had safety deposits with hundreds of billions of value inside (gold bars, diamonds, famous jewelry, rare artwork, and other collectibles). Now, imagine if Big Bank Co. had decided that, for convenience, they would store a duplicate of all of those keys in one room. And finally, imagine that this room was left with the door open, and anyone on the street could walk in and make a copy of all of the keys - no guards and no questions asked. Sounds far fetched? That’s more or less what [Accenture accidentally did to its clients in 2017](https://www.upguard.com/breaches/cloud-leak-accenture):

> “Accenture left at least four cloud storage buckets unsecured and publicly downloadable, exposing secret API data, authentication credentials, certificates, decryption keys, customer information, and more data that could have been used to attack both Accenture and its clients. The buckets' contents appear to be the software for the corporation’s enterprise cloud offering, Accenture Cloud Platform, a ‘multi-cloud management platform’ used by Accenture’s customers, which include 94 of the Fortune Global 100 and more than three-quarters of the Fortune Global 500”

The second class of threat models involves taking advantage of software vulnerabilities, such as [0-day](https://en.wikipedia.org/wiki/Zero-day_(computing)), and may come in forms such as [spear phishing](https://usa.kaspersky.com/resource-center/definitions/spear-phishing) and [watering hole attacks](https://en.wikipedia.org/wiki/Watering_hole_attack). It may seem like it would require a small army of people riveted to computer screens in a top secret bunker of the DPR Korean military, but all it takes is one well informed and motivated individual to find such exploits. The former head of security at Twitter, and current CEO of [Signal Messenger](https://signal.org/), Moxie Marlinspike, discovered the possibility to encode a line termination (`\0`) in an SSL certificate, which would make the browsers potentially fooled into displaying spoofed URL signatory. His [blog](https://moxie.org/software.html) details a number of other security conscious software he has written.

The last class of threat models comes from hardware bugs and backdoors. This is the space where governments will deploy their might to obtain the unobtainable. Bruce Schneier, who is a fellow and lecturer at Harvard’s Kennedy School and a board member of the [EFF](https://www.eff.org/), documented how the Office of Tailored Access Operations (TAO), under the National Security Agency (NSA) can [install hardware implants](https://www.schneier.com/blog/archives/2013/12/more_about_the.html):

> If a target person, agency or company orders a new computer or related accessories, for example, TAO can divert the shipping delivery to its own secret workshops. The NSA calls this method interdiction. At these so-called "load stations," agents carefully open the package in order to load malware onto the electronics, or even install hardware components that can provide backdoor access for the intelligence agencies.

Much like computing and space exploration once were only the business of governments, in the future, corporations and even individuals will be able to accomplish hardware hacks more easily. For instance, researchers from [Google’s Project Zero](https://googleprojectzero.blogspot.com/) have discovered security vulnerabilities in chips such as [Specter](https://en.wikipedia.org/wiki/Spectre_(security_vulnerability)) and [Meltdown](https://en.wikipedia.org/wiki/Meltdown_(security_vulnerability)). More recently, as of September 2019, researchers have demonstrated the ability to steal encrypted SSH keystrokes by [leveraging a weakness in intel chips](https://arstechnica.com/information-technology/2019/09/weakness-in-intel-chips-lets-researchers-steal-encrypted-ssh-keystrokes/). 

### 3.3.3 Mechanisms 

When it comes to mechanisms, pretty dramatic consequences can happen from the smallest mistakes. Even with good policies and good understanding of threat models, mechanisms of large software systems most certainly will have bugs. For instance, in 2014 Apple iCloud’s policy was to limit how many times a password check may be attempted before locking the account. Once locked in one app, a user would be locked everywhere. The mechanism was properly implemented in all (e.g., Photos, Files) but one service (“Find My iPhone”). As a result, someone could have attempted to [brute force their way into iCloud](https://github.com/hackappcom/ibrute) via “Find My iPhone”, and the iCloud API would have happily complied. 

While the iCloud “Find My iPhone” bug might have been avoided with only one more line of code, the defect could also have been found by having a DevOps pipeline with lines of code that would test that indeed the policy was enforced. For general system administration, a good list of mechanisms to have in place is [NSA’s top ten cybersecurity mitigation strategies](https://www.nsa.gov/Portals/70/documents/what-we-do/cybersecurity/professional-resources/csi-nsas-top10-cybersecurity-mitigation-strategies.pdf). When building software, the following four practices could be added to NSA’s list:

1. Reduce the amount of security-critical code (fewer, more thoroughly tested mechanisms)
2. Avoid bugs in security-critical code (“don’t roll your own crypto”)
3. Perform regular “[red team](https://en.wikipedia.org/wiki/Red_team)” security audits (crypto, pentesting, and network sec)
4. Have a tight feedback loop with your dev, DevOps, and sysadmin to fix vulnerabilities swiftly

## 3.4. Drive a protection first culture

Alphabet, Apple, Amazon, Microsoft, Facebook, Alibaba, and Tencent are all tech companies and form seven of the ten [largest companies by market cap in the world](https://en.wikipedia.org/wiki/List_of_public_corporations_by_market_capitalization). We are now firmly in the age of software, where all major corporations are tech companies with tens of thousands of people in their ranks involved in creating software products. Many of the largest 5,000 organizations on Earth need to play catch up when looking for talent and training people on cybersecurity - both at the most junior ranks, but also at the most senior ranks. Not only do they need to play catch up in human resources but also in systems, protocols, and culture. As we have seen in this post, one person can topple a company’s security infrastructure with simple negligence and errors. 

In 1913, Henry Ford installed the [first moving assembly line](https://www.history.com/this-day-in-history/fords-assembly-line-starts-rolling) for the mass production of an entire automobile. From then on, no single person in the entire organization, not even Henry himself, could have made an error that would have gone unnoticed and would have resulted in the disruption of all the Ford car produced that year and all the years before.

### 3.4.1 Cybersec is everyone’s responsibility

Cybersec professionals are to cybersec what professionals are to health, environment and safety. They write policies, train people, and measure impact, but they cannot be everywhere at all times. The people in operations need to adopt behaviors that keep them healthy and safe, and protect the environment via their actions. In effect, the general manager of a mine or a plant has much more direct influence over the number of injuries than the person in charge of HSE. The same is true for cybersecurity: everyone, starting from the CEO down, and from the interns up, need to participate in forging a culture that promotes cybersecurity. 

### 3.4.2 Learning from the US Navy

Since everyone makes mistakes, organizations need to ensure that there is a fail-safe behind everyone: employees, shareholders, board members, contractors, partners, and suppliers. But it is not the first time that humans have to deal with extremely complicated systems that absolutely can’t go wrong. I believe leaders today can learn from the people that have been running US nuclear submarines for decades. [SUBSAFE](https://www.usni.org/magazines/proceedings/2014/june/pillars-submarine-safety) is a certification that was established by the US Navy following the loss of 16 submarines in non-combat related incidents between 1915 and 1963, including the USS Thresher in 1963. No SUBSAFE certified submarine has been lost ever since. If you have the time, I recommend that you read the [statement by Rear Admiral Paul E. Sullivan about SUBSAFE](https://www.navy.mil/navydata/testimony/safety/sullivan031029.txt) given before the House Science Committee in October 2003. 

The success of SUBSAFE has been so remarkable that after the loss of the space shuttle Columbia, NASA incorporated SUBSAFE in a [proposal](https://history.nasa.gov/columbia/Troxell/Columbia%20Web%20Site/Documents/Congress/House/OCTOBE~1/hearing_charter.html) for the restructuring of its organization with a big focus on safety. I now propose "CYBERSAFE" as a similar program for modern day organizations dealing with data.

| Element | SUBSAFE | CYBERSAFE |
| - | - | - |
| Purpose | Watertight integrity, recoverability, and safety (weapon, fire, and nuclear) | Data integrity, privacy and security (tamper-free ability to recover from disruptions or misdirections). |
| Design requirements | Clean, concise and non-negotiable requirements | Same with the addition of [Privilege Separation](https://en.wikipedia.org/wiki/Privilege_separation) both at software and at process level, as well as the [Principle of Least Priviledge](https://en.wikipedia.org/wiki/Principle_of_least_privilege) at the individual level. |
| Audit | Multiple structured audits that hold personnel accountable at all levels for safety | Same. |
| Training | Annual mandatory training for everyone with a strong emphasis on emotional lessons from past failures | Same. |
| Material and fabrication | Controls and documentation in place to ensure correct material: receipt, inspection, storage, handling, installation. | Use of version control (e.g., git) not just for writing code but also for every piece of documentation and should be trackable and linked; application of robust and well-documented libraries within the stack and code reviews. |
| Testing | Involves a formal checklist to collect specific documentation and information, successful sea trials, and a secondary review before unrestricted operations | On top of penetration testing and security patches, application of [DevOps](https://en.wikipedia.org/wiki/DevOps) and [test-driven dev’t](https://en.wikipedia.org/wiki/Test-driven_development) to every activity within the organization rendering tasks effortless and automated. |

----

According to Hemant Taneja, a managing director at General Catalyst (a venture capital firm), the Era of “Move Fast and Break Things” [is over](https://hbr.org/2019/01/the-era-of-move-fast-and-break-things-is-over). He argues that there must be stakeholder accountability across the spectrum, taking into account the increasing impact of today’s technologies. The incremental effort when starting up to develop a culture that takes careful account of cyber security as opposed to building minimum viable products that could be easily exposed to malicious attacks.

For established enterprises handling increasing amounts of data and with the pressure to build products fast as a competitive edge, building a protection first culture will take time. It will need the buy-in of everyone in the organization from C-level and all the way down to the data encoder. I hope that the frameworks that I've proposed here will serve as a guide in doing just that.


