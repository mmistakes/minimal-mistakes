---
title: You’ve been hacked. ACID might help you in the future
category: "Digital Transformation"
tag: ["Cyber Security", "Product", "Data"]
toc: true
---

It is hard to feel sympathy for [black hat hackers](https://en.wikipedia.org/wiki/Black_hat_(computer_security)) who violate computer security with impunity for personal gain or maliciousness. Their action exposes victims to impersonation/fraud, financial damage, loss of privacy, and even life threatening situations. While some grey hat hackers (and whistleblowers) have noble goals (see “[Hacktivism](https://en.wikipedia.org/wiki/Hacktivism)”), the consequences of their illegal actions can take a toll on [their quality of life](https://en.wikipedia.org/wiki/Aaron_Swartz) and their friends and families have to pay the price. 

But should some of that ire against hackers be directed at the corporations and governments who hoard this data but sometimes fail to adequately protect it? In some cases, it’s hard not to feel let down by important organizations that will publicly expose their customers’ personal information. For example, look no further than AT&T and Apple, who publicly exposed all of the email addresses of all the people logged in to their 3G network with an iPad - [no hack required](https://www.computerworld.com/article/2518818/-brute-force--script-snatched-ipad-e-mail-addresses.html).

This snafu on the part of AT&T with iPads is already almost 10 years old. Since then, have corporations and governments generally learned how to perfectly and unequivocally protect data they collect? 

In part I, I’m going to argue that you’ve probably already been hacked, and will be hacked again. I’ll then compute statistics that suggest that the data breaches problems are actually getting significantly worse. And I will conclude you will need to seriously consider revising your standard for authenticating users. In part II, I’m going to propose four simple steps to mitigate the cyber security risks as a business leader.

+ **A**ssume that you have already been hacked
+ **C**hange what you collect
+ **I**dentify all unencrypted data stores and transfers
+ **D**istribute responsibility, centralize accountability 

*Side note: you already knew that this post wasn’t going to be about the acid known as Lysergic acid diethylamide (LSD), and it’s also not about the set of database transaction properties (Atomicity, Consistency, Isolation, Durability) that guarantee validity even in the event of errors (e.g., power failures).*

# 1. You’ve probably been hacked, and you will be hacked again

As a leader, you have to come to peace with the fact that both you, personally, and your organization have probably already been hacked, and that you will be hacked again in the future. If you are convinced that you haven’t been hacked, how do you know for certain? Consider for a moment the [Stuxnet worm](https://en.wikipedia.org/wiki/Stuxnet), which was arguably one of the [most sophisticated](https://www.quora.com/What-is-the-most-sophisticated-piece-of-software-ever-written-1/answer/John-Byrd-2) weapons created before 2010 to [slow down Iran’s nuclear ambitions](https://www.langner.com/wp-content/uploads/2017/03/to-kill-a-centrifuge.pdf). Despite all its physical manifestation, it took more than a year to be detected, and more years after that to study and understand. A much more passive worm that merely collects and relays data could live under the radar for much longer.

I’m not one for conspiracy theories, but when there is a will, there is a way (unless the laws of physics prevent it). Would it be too much of a stretch to imagine that the cell phones of many prominent CEOs and heads of states have silently been hacked? No laws of physics prevent it with certainty. How you navigate the next 10 years will be greatly affected by the decisions you make today. But first, here’s some data to support my claim about your data.

## 1.1 At least 2 billion records breached so far in 2019

As of August 2019, a Wikipedia entry lists [17 reported data breaches](https://en.wikipedia.org/wiki/List_of_data_breaches#cite_note-318), totaling over 2 billion records. The reality might be much worse according to [Consumer Affairs](https://www.consumeraffairs.com/news/nearly-4000-data-breaches-have-exposed-41-billion-consumer-records-so-far-in-2019-082119.html). It affects everyone: well funded unicorn startups, major banks, and even highly sophisticated tech giants. For instance, if you have a Canva account, a Capital One credit card, a Facebook account, or if you closed a real estate deal since 2003 (e.g., bought a house), some data you shared with those organizations might have been made public. That last one concerned American Financial Corp, which according to [Brian Krebs](https://krebsonsecurity.com/2019/05/first-american-financial-corp-leaked-hundreds-of-millions-of-title-insurance-records/) exposed data such as:

+ Bank account numbers 
+ Bank statements
+ Mortgage documents
+ Tax records
+ Social Security numbers
+ Wire transaction receipts
+ Drivers license images 

We just don’t know for sure, and serious people who gain access likely have incentives to keep it private. If you want to stay up to date about the many security breaches that are discovered every month, I recommend Brian Krebs as a primary source. If you haven’t heard of him, know that he is an investigative reporter, and is considered an [authority on cyber security](https://en.wikipedia.org/wiki/Brian_Krebs) and his [blog](https://krebsonsecurity.com/) is top notch. 

## 1.2 The growth rate is exponential, at 30% per year

I did a quick analysis, which you can find [here](https://docs.google.com/spreadsheets/d/15y0nxp3t7FajBQGZDROVcb7bvq84Yid3-1GX7NDzFyc/edit#gid=0), where I show that while data breaches have been growing linearly at 4% per year (R^2 of 0.27), the number of records breached (excluding the [3B Yahoo records breach of 2013](https://www.nytimes.com/2017/10/03/technology/yahoo-hack-3-billion-users.html)) have been growing exponentially at almost 30% per year (R^2 of 0.64). You you don’t need to be a hedge fund manager to recognize that anything growing at that rate is scary fast and you don’t need to call yourself a data scientist to recognize that an R^2 of 0.64 is hard to brush aside.

Let me give you a sense of what the exponential growth means if you believe the model holds true. At this rate, by 2030, you can expect that 169 billion records will have been breached (39 billion records in 2030 alone). This means that if the world population reaches 8.5 billion people ([as projected by the UN](https://www.un.org/sustainabledevelopment/blog/2015/07/un-projects-world-population-to-reach-8-5-billion-by-2030-driven-by-growth-in-developing-countries/)), and if you assume that every human is equally likely to be exposed, our personal records will on average have been breached 20 times. So much for the last four digits of your US Social Security Number (SSN) as a proof of identity!

## 1.3 A new standard for authentication will be needed

Even if your organization does not get hacked, you will have to adapt because others will get hacked. What pieces of information do you currently require a person to create an account to use your services? How does customer service validate who they are speaking with?

In a world where personal records have been breached 20 times, it’s hard to imagine how asking for a date of birth, providing a copy of a driver’s license, or giving a SSN will prove much if anything at all. Now compound that with the ability to generate [deep fakes of voice and video](http://cyberlaw.stanford.edu/our-work/topics/deepfakes). If left unchecked, future hackers will be able to contact your credit card company, reset your password, and go on a bitcoin shopping spree.

*Side note: The legal implications of deep fakes will be ground shaking to our medieval systems of justice. On that topic, I highly recommend checking out The Stanford Law School’s [Center for Internet and Society](http://cyberlaw.stanford.edu/). If you only have 4 minutes, take a watch of Edward O. Wilson’s [What Is Human Nature? Paleolithic Emotions, Medieval Institutions, God-Like Technology](https://bigthink.com/videos/eo-wilson-what-makes-us-human-paleolithic-emotions-medieval-institutions-god-like-technology) - I started reading his book [The Origins of Creativity](https://bigthink.com/videos/eo-wilson-what-makes-us-human-paleolithic-emotions-medieval-institutions-god-like-technology) from 2017.*

You might need to find a way to serve your customers and make a profit without relying on pieces of information you can count on today. I’m not going to expand on it in this post, but one avenue worth exploring will be blockchain backed [self-sovereign-identity systems](https://en.wikipedia.org/wiki/Digital_identity#Self-sovereign_identity) with hardware tokens, digital footprint, and biometrics.

Part II coming soon… Stay tuned.
