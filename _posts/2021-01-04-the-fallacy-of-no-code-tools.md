---
title: The fallacy of “no-code” tools
category: "Product"
tag: [Product, Software as a service, DevOps, Cybersecurity]
toc: true
---

Computer science is the art of solving bigger problems with less effort.

<span><audio id="myAudio" controls>
    <source src="/assets/audio/the-fallacy-of-no-code-tools.ogg" type="audio/ogg">
    <source src="/assets/audio/the-fallacy-of-no-code-tools.mp3" type="audio/mpeg">
  </audio>
  <button class="btn btn--small" id="video-player-playback-rate-control" style="border-color=none !important;border-collapse: separate !important;">Speed: <span id="current-rate">1</span>x</button></span>

# 1. Most CEOs in the 2020s think they do not know how to code

The trouble is that as of the 2020s, most people in the workforce think they do not know how to code, CEOs included. For every professional developer out there, there are perhaps two orders of magnitude more people who have attempted to learn how to code once in their lives, but quit before they reached the 100- or 1,000-hour mark.

For non-technical business leaders, a “no code development platform” (NCDP) can seem like the perfect solution. NCDP is a charming idea because if it worked, so many problems could suddenly be solved at scale with less effort by lowering the barriers to entry.

Here lies the problem: most people do not have the patience to create (with or without code) software products that people want to use. In fact, “no code tools” are “code.” Rather, the instruction sets are recorded by the machine via clicks instead of keystrokes. Key differences, however, are that clicks are thrown away (as opposed to coding with text, which retains them), so repeating clicks is not possible without effort, and graphical user interfaces are significantly more limited than the dictionary of a programming language - the same reason we don’t write emails by clicking on menus filled with words.

# 2. Example where NCDP works, example where it does not

Here’s an example of an NCDP which does work: Zapier. Zapier offers integration between tools (from one API into another system’s API). For example, you can connect Zendesk to your Shopify account. I have used it a few times before for one-time operations and using Zapier was a timesaver.

In fact, I’d argue that every software product with a great user experience is a NCDP for specific tasks: GitHub, Uber, and Airbnb. The functions performed by these products are well defined and the graphical user interface (both on desktop and on mobile) is presented as a delightful and pedagogical visual language.

Here’s an example where the NCDP does not work: “click-ops” for provisioning cloud infrastructure. Instead of doing DevOps using [Infrastructure as Code (IaC)](https://en.wikipedia.org/wiki/Infrastructure_as_code), you can do “click-ops” (e.g., on AWS, Azure, or GCP) by using a mouse to click your way through a web interface and deploy the infrastructure accordingly - no coding required!

One of the many drawbacks is that the clicking method scales linearly with the amount of work done, and becomes repetitive very fast. With IaC, when you write the code, you have created a module that can be (git) versioned, scrutinized, modified, and reused many times in a way that a human performing the function anew every time, cannot. With IaC, you get the following benefits:

1. Infrastructure provisioning is repeatable.
2. Infrastructure changes are reviewable.
3. Roles and policies that concern the infrastructure being managed can also be versioned.
4. Static security analysis can be performed (e.g., checking open ports, public resources, etc.).

# 3. What matters is productivity

One day, hopefully soon, VR/AR and AI will open new possibilities for more powerful integrated development environments that find inspiration from pedagogical tools such as MIT scratch. These hybrid tools could perhaps retain the powerful expressiveness of code, encouraging discovery and creativity with software development kits and debugging stacks.

The coders will rejoice and will not run out of work. For someone who has the patience, code is a very good interface for creating software. The art of coding is much less about learning the syntax of a language or a framework, and much more about:

1. Finding good names for concepts (e.g., a function that calculates tax depreciation).
2. Learning how to balance abstraction vs. complexity (i.e., combining these discrete concepts).
3. Understanding computation and storage implications (e.g., this SAP query will be repeated a lot and the results won’t change, might as well cache it in memory).

When you don’t grasp the effects of what you are doing, you risk costing your team a lot of wasted time and resources, let alone the cybersecurity risks. From the standpoint of a coder in the 1980s writing in Fortran, building a neural net in Python using PyTorch to detect skin cancer or using Terraform to deploy on AWS is a lot more remarkable (in terms of productivity boost) than building a website with a form builder like Wix.

# 4. You are probably a coder already

If you go back to the start of this blog post, you will notice that I used the word “think” in “Most CEOs in the 2020s **think** they do not know how to code”. In fact, most CEOs have experienced coding before in the form of building Excel models.

An example of a powerful tool combination that lowered the barrier to entry is the combination of Excel and email, which together run the modern business world. Excel is the interface and the database. While email is the authentication and permission layer.

Excel is, in fact, code. It’s a special kind of code called “declarative”, of a sub-type called [reactive programming](https://en.wikipedia.org/wiki/Reactive_programming). And nobody would ever want to get rid of the “code” part of Excel. Imagine, for a moment, that instead of the “formula” bar, you would only enter values in cells and all operations (“+”, “=”, “vlookup”) were all menu driven. Needless to say, Excel without the formulas would be painful to use. Excel is a great way to introduce people to coding.

Now, for all its merit, Excel does come with some very serious limitations and a large number of startup ideas, when you boil them down, are replacing slow and painful manual processes running on Excel and emails with fast and enjoyable experiences. These delightful user experiences are powered by Python models running in the cloud, with React frontend apps in your browser and React-Native mobile apps on your phone.

So perhaps more of us are indeed coders and already recognize the fallacy of “no-code” tools.

-----

Thank you Andrew Liu, Leah Grace Capitan, and David Castonguay for your many suggestions.