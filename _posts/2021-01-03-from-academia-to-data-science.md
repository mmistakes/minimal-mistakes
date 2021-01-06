---
layout: single
title:  "How to transition from Academia to Data Science"
date: 2021-01-03
mathjax: true
---

Oh boy, another one of these blog posts about transitioning to Data Science from Academia.
Well, in this post I'll try to add a slightly different take on the usual advice along with
some more traditional advice. This is not a step-by-step guide because I don't think such
a thing exists in this case. Instead, this post will be my opinionated views on what you
can do to make a smooth transition from Academia to Data Science. Also, this post is not
about "how to get a Data Science job". I won't talk about your resume, or prepping for
interviews or any of that stuff. This post is about how to become a Data Scientist.

First of all, I should note that while a lot of the things I cover in this post *could* be
generic and apply in many different situations, I will lay down a few assumptions first.

1. You are in a technical field already (Mathematics, Statistics, Physics,
Chemistry, Biology, etc).
2. You have some programming knowledge (any language is fine).
3. Your intended Data Science career is *applied* and not research oriented.
4. All this will probably be more applicable if you are in a PhD program but could still
be relevant for a B.S.

And with that out of the way, let's get into it.

## What is Data Science anyway?

If you have stumbled across the blog, you probably have some idea of what Data Science is or
maybe you think you know what it is. Data science could mean that you manage data bases and
write SQL code all day. It could mean that you work with "big data" and do things with
Hadoop (is that still a thing, probably...), Spark and other big data tools.[^1] God forbid, it
could mean that you do most of your work in Excel making linear regression models.

But in my experience when most people say Data Science, what they really mean is
"Machine Learning Engineer"[^2], i.e. someone who develops and applies ML models to real data
and deploys them for use in real-world scenarios. Of course, there is more to it than that,
but that is the gist and this the kind of Data Scientist that I will have in mind for the
rest of this post.

## How has Academia already prepared me for this role?

I know when I was a graduate student I thought that I was only prepared to do one thing
with my life -- be a (astro)physics professor/researcher (after an extended post-doc career).
In my time (2009-2014) in physics grad school, there was almost never any mention of
any other career trajectory. It was assumed that this was the path that everyone would
take, which basically meant there was one mode of operation: **Write Papers**.[^3]

However, there are still a lot of things that you will learn in your academic career
(both undergraduate and graduate) that will be very useful for your Data Science
(ahem... Machine Learning Engineer) career.

### Learning the struggle

There are some skills that can not be taught. They can only be learned through struggle.
If you have done any kind of original research in your academic field then you know the struggle.
You have to learn to figure things out for yourself because there is no "right answer" that you can look
up in the back of the book. If you have ever written any significant code base then you also know
the struggle. You have to figure out how to put everything together and debug the inevitable bugs
that will appear.

{% include figure image_path="/images/struggle.png" alt="Struggle" caption="Learning the struggle. Sometimes completing
a ML project seems like a Sisyphean task." %}

In Data Science, most of your existence is struggle and you need to be able to feel comfortable not
knowing what to do in a given moment. You need to be able to experiment and possibly fail. In many cases
a stakeholder (fancy language for the person/entity that wants some ML product/functionality) does  not
know much about ML, all they know is what they want an end product to look like. Actually, in some cases
they don't even know what they want the end product to look like. It is more common that they have a lot
of data (perfectly clean of course) and they want “insights” from that data. You, as the Machine Learning
Engineer need to be prepared to struggle through finding a solution to their problem.

Even though the struggles you will go through in a ML based problem may be different than those that you have
had in academia, being comfortable with being uncertain will prepare you well for a career as a machine
learning engineer.

In the next section, I will offer some advice to get more familiar with the ML-based struggle.

### Learning how to learn

Very related to "the struggle" is learning how to learn. Everyone learns in different ways and throughout your
academic career it is a good bet that you have discovered your own method. In many cases, definitely in mine, you
realize that you don't really learn much from your classes. Sure you may do well on tests, but you forget it
all in a week. You learn by doing. All the theory is approximately worthless without the practice. Would you
trust a doctor that has spent years reading up on the latest surgical techniques but never actually
performed a surgical procedure?
Would you recruit a "guitarist" who knows all the musical theory but has never actually played a guitar?

Later I will offer some advice in this area, but knowing how to learn on your own is one of the most important
skills in Data Science, or life for that matter.

### "Soft Skills"

Overall, soft skills are a combination of people skills and communication skills. This one strongly depends on
whether or now you have had to present your work to both technical and non-technical audiences. It also depends
if you have been part of a large collaboration.

With that being said, being able to present technical information to non-technical audiences in a clear and
concise way is a skill that will help you land a good Data Science job. As I mentioned above, I am focusing
on an applied Data Science job, not a research data scientist position. This means that you will need to be
able to communicate with the stakeholders as well as your teammates.

If you have been lucky enough to be part of a large collaboration with many different groups that need to work
together, then you will have gained invaluable skills that will really help you in Data Science. Being able to
translate between different groups is a very useful skill. For example, when I was a grad student I was part of
a data analysis group and we used mostly [Bayesian](https://en.wikipedia.org/wiki/Bayesian_statistics) techniques.
There was another group that used mostly [frequentist](https://en.wikipedia.org/wiki/Frequentist_inference)
techniques. On the surface these things may be very different, but there are some useful translations between the two
and I was able to speak both languages, which made things move much more smoothly.

Again, in the next section I will give some advice on how to practice your communication skills.

## Practical (and very opinionated) advice

As the title says, this advice is very opinionated, but these methods have worked well for me. Before I get into
the actual advice let me explain what I look for in a Data Scientist candidate:

1. Someone who is easy going and has good personal/communication skills. This might not seem too important
for a technical role, but to me it is critical. Most Data Scientists work in teams, so being able to get along
and communicate is of paramount importance.
2. Someone who has shown initiative in their past and who is fairly self motivated. This does not need to be
ML/Data Science related, it could apply to your academic field of study but it could also apply to your
preparation for transitioning to data science.
3. Someone who has experience with "real" data. By real data, I mean messy data. I want to see that you have
learned the struggle and have accepted it. Again, this can apply to your academic past or your data science
preparation.
4. Someone who can converse about many different ML techniques. This does not mean that you need to know any
in very deep detail, but you should have an idea of what techniques exist and the applications that they are
used for.

With that, lets get to the advice

### 1. Learn Python

Python is the language of Machine Learning. It is very easy to use and it mostly wraps libraries that are
written in more performant languages like C.

{% include figure image_path="/images/python-ml.jpg" alt="Python" caption="This is slightly outdated but Python
is growing very fast and has overtake other languages." %}

It is [growing](https://stackoverflow.blog/2017/09/06/incredible-growth-python/) across all areas, not just ML but
for this post I will focus on ML. Python is very powerful in ML because of several purpose-build ML libraries such
as [pandas](https://pandas.pydata.org/), [tensorflow](https://www.tensorflow.org/),
[pytorch](https://pytorch.org/), [scikit-learn](https://scikit-learn.org/stable/),
[spacy](https://spacy.io/) and [transformers](https://huggingface.co/transformers/index.html) just to name a few.

If you already know Python, that is great. If you don't, there are a plethora of resources out there to learn.
I would not recommend using a book to learn Python when there are so many
[great resources](https://stackify.com/learn-python-tutorials/) out there already.
I learned Python after switching from Matlab and have honed my skills over the years by looking at well-designed
code bases like those mentioned above, and by watching various YouTube tutorials and other online sources. In fact
I have never read a book on Python programming (of machine learning or deep learning or statistics for that matter,
but I'll get into that a bit more later).

### 2. Learn Software Design Principles

Ok, so you've learned Python. Good to go, right? Well not really, I knew how to use Python for a pretty long time
before I actually learned how to design software. I always use the analogy of building a house. You could be really
good at using all of the tools, but if you don't have a blueprint, know the various codes and standards, or know where
and how to get all of the materials, then you are out of luck. While knowing the Python language is very important,
actually knowing software design principles (mostly language agnostic) will really let you stand out.

This section in itself could serve as several blog posts but I'll just mention the main highlights here:

1. [Object Oriented Programming (OOP)](https://realpython.com/inheritance-composition-python/): While there is
nothing wrong with functional programming and you will indeed use a mix of OOP and functional programming in
your day-to-day existence. The ML ecosystem (i.e. the packages mentioned above, especially PyTorch and scikit-learn)
is mostly in the OOP camp. Being able to make sense of OOP based packages and being able to write your own OOP-based
code is super important.

2. [Unit testing](https://realpython.com/python-testing/) and [continuous integration
   (CI)](https://realpython.com/python-continuous-integration/): These two usually go hand-in-hand. Unit testing
   refers to writing specific tests of your individual code "units.” This serves a check that your code is right
   but also serves as a fail-safe against breaking your code when you make changes. CI basically involves automating
   this test process and can also involve other types of tests other than unit tests. Having a grasp on this will give
   you a huge advantage.

3. [Design Patterns](https://python-patterns.guide/): These are re-usable patterns that solve specific problems.
These patterns are mostly language agnostic. Now, you don't need to know all of the different patterns and you don't
need to always use them; however, having a basic understanding of what they do, (and that they exist) will put you
in a great position.

4. [Documentation](https://realpython.com/documenting-python-code/): In your academic career you probably wrote
code that was just for you. You knew how to use it and it worked. As part of a data science team, other people
will need to be able to use and understand your code. Code documentation is of paramount importance and being aware
of the best practices is super important.

The list above only scratches the surface in terms of details. I provided a basic tutorial link for each, but there
are a lot of other really good resources to learn more about proper coding practices and tools. Here are a few:

* [Making Pythonic code](https://www.youtube.com/playlist?list=PLRVdut2KPAguz3xcd22i_o_onnmDKj3MA): Great talk on code
  re-factoring and making beautiful code.
* [Deep learning library from scratch](https://www.youtube.com/watch?v=o64FV-ez6Gw&ab_channel=JoelGrus): Good
  introduction to package design and learning how to think about building a package.
* [calmcode.io](https://calmcode.io/): Lots of useful videos on various tools and techniques
* [Traversy Media](https://www.youtube.com/playlist?list=PLillGF-RfqbbJYRaNqeUzAb7QY-IqBKRx): Good introduction to the
  web-developnent side of Python.

I'll end this section by noting that, in my experience, most data scientists
(especially of the machine learning engineer variety) only have limited knowledge of these things. So, this is not
something that you will be lacking in terms of your competition. However, if you do know these things and take the
time to learn them, then it will put you in a position to stand out above your competition. More importantly, it will make you a better data scientist.

### 3. Do some projects (and share them)

Ok, here is where the standard advice comes in, but it is standard for a reason. If you are coming from
an academic background and not a data science background, you have to do some projects to fill in for
your lack of on-the-job experience. In some ways this is a bonus, especially if you are competing against
people who have gone to school for data science or a similar field. Remember what I said about being self-motivated.
For those in a data science or analytics program, most of their experience is through classes of which they
"had" to do. For you, the self-taught data scientist, you show that you are self-motivated right away by
presenting data science projects you have done.

Now there are lots of different kinds of projects you can do. I'll list three here in rough order of importance:

1. [Data storytelling project](https://www.import.io/post/8-fantastic-examples-of-data-storytelling/):
    In my opinion, this kind of project is the most useful that you can do. Basically, choose an area
    that you are interested in, find data, analyze it and tell a story. You don't really even need to
    do any ML. These projects show off your skills with raw unfiltered data, (try not to use curated data sets)
    and can also give you some experience in the data science struggle. In my case I looked at [police shootings
    of civilians](https://jellis18.github.io/files/ellis_police_shooting.pdf) and pulled in data from a few databases, census data, FBI crime statistics and local police dept
    data. In the process, I struggled big time to pull all of these sources together and learned a ton about pandas
    and various python mapping packages.

2. [Full end-to-end ML application](https://medium.com/swlh/end-to-end-machine-learning-from-data-collection-to-deployment-ce74f51ca203):
    This kind of project would be very impressive and will show that you have experience with actual ML deployment, which
    is missing in a lot of candidates and actual data scientists, (myself included).

3. [Kaggle](https://www.kaggle.com/): You can learn a lot about ML just from doing some Kaggle competitions and
    looking at the public notebooks. These are on the list because they are important for you go get some
    experience applying ML to data, but they are last because this kind of work is now ubiquitous so it won't
    set you apart too much.

Once you have done some projects and gained some ML and data wrangling skills with a large dose of struggle, now
you can sharpen up on your communication skills.

First off, definitely put whatever you do on
[GitHub](https://github.com/) which will make your work public and teach you about version control if you didn't
already know about it. Make sure you document your project with a project README. This is just the lowest level of sharing
your work.

Next, you may want to share this work on a personal blog or on
[Medium](https://towardsdatascience.com/questions-96667b06af5). This is another great way to hone your communication
skills and to ensure that you actually understood your project. The best way to test your knowledge is to try to
explain your project to someone else. However, writing a blog post is still somewhat passive and these
skills are not the main communication skills you will need to be a successful Data Scientist.

Lastly, you can present your work by giving a talk. There are probably a lot of forums for this kind of thing.
In my case I looked on [Meetup](https://www.meetup.com/) for any local Data Science related groups. It’s probably
a good idea to attend a few meetups first and introduce yourself to the organizers.  They are usually on the lookout
for anyone who wants to give a talk. If you get a chance, offer to give a presentation on one of your projects.

So, this sounds like a lot and your future company may not even look at all of this work that you have done, but
even if they don't look at it, the fact that you have done all of this and developed and honed all of these skills
will help you immensely in your overall career as a Data Scientist.

### 4. Learn the lingo (fake it till you make it)

Back when I was an undergraduate, a physics professor of mine gave me some great advice. He told us that one of the
most important things in terms of your career is that you "learn the lingo,” that is, you learn the language of the
field that you are in or want to be in. For example, if someone says to you that they "used a transformer model for
sentiment analysis,” what do you need to take away from that statement? You definitely don't need to know in any
detail what a transformer model is or how to implement it, but you should know that sentiment analysis refers to
measuring how "positive" or "negative" a segment of text is and that a "transformer" model is a kind of deep
learning model that is very popular in natural language processing nowadays.

{% include figure image_path="/images/fake-until-make.jpeg" caption="Knowing the lingo of your field can make or break your
career advancement." %}

In other words, it is far better to have a wide, but shallow understanding of many concepts instead of a very deep
understanding of a few concepts. This is almost the opposite of academic research in many cases. In academia,
one pretty much needs to have a very deep understanding of their area at the expense of not knowing much outside
of that area.[^4] As a data scientist the exact opposite is true, it is far better to have a base understanding of
many concepts and their uses rather than knowing the exact algorithmic details.

This gets back to my earlier point about learning how to learn. If you have a shallow understanding of many things
then that will allow you to assess a given problem quickly and come up with a potential solution; however, to actually
implement that solution you will probably need to learn more that you know at the moment. Therefore, you need to be able
to learn on your feet. As an academic, it may seem like you always need to come up with something new, but in data
science no one really cares if you come up with something new, they only care if you solve the problem. This means
that there is no shame is scouring the internet for solutions to a problem similar to yours and adapting it to
solve your problem.

All of this may seem wrong, but it is some of the best advice that I ever received and I think it has helped
me immensely. Now, this all sounds nice, but how do you do it? Well, this is the hard part. I think the best way
to develop this skill is to allow yourself to explore many areas, but also control yourself from digging too deep,
at least in the beginning when you are still learning. Take introductory online course, follow tutorials, do some
simple projects, but don't think that you need to know all of the details.

### 5. Learn online

Ok, now on to perhaps another controversial piece of advice. Don't read books to learn your Data Science/ML
skills. At least, don't use books as a main source of information. The only thing I would recommend books for
is to learn basic programming language fundamentals, (although those are probably better online as well).

For some complete anecdotal evidence of this, I have never read a book on programming, machine learning, deep
learning, statistics or communication, yet in my academic career I published several papers and led large
working groups. Outside of academia, I have advanced fairly quickly and have led projects in several ML areas and I achieved all of that strictly from learning online.

Now, learning online does not mean that you passively sit back and watch some YouTube videos. It means that you
watch some YouTube videos or online courses or read blog posts or arXiv papers and then try the things out
yourself. You struggle. You watch and read some more. Struggle some more. Apply the techniques in your work
or in your projects. Struggle some more. By the end of this struggle session, you will realize that you have
managed to learn a whole lot, not by some ground up foundational approach but by a more stochastic process
of trial and error which eventually leads to a much deeper understanding of the material.

This may all sound crazy and it may not work for you, but it has worked for me and it has worked for a lot
of other great Data Scientists and Machine Learning Engineers. I have a very shotgun approach to learning
in which I dabble in many different things, but I can offer a few good resources here in addition to the
resources that I have already sprinkled throughout this post.

1. [Coursera](https://www.coursera.org/): There are a lot of great courses here that can give you a good introduction
    to many topics especially [machine learning](https://www.coursera.org/learn/machine-learning) and
    [deep learning](https://www.coursera.org/specializations/deep-learning). Don't expect to be an expert on
    anything after taking a Coursera course, but they can give you a good base to start with.

2. [fast.ai](https://www.fast.ai/): I would say this is the best resource for learning cutting edge Deep Learning
    techniques. Unfortunately, it’s backed by a software library that, in my opinion, combines all of the worst
    coding practices and puts them all in one place. Even so, there are two great Deep Learning courses and
    a more unknown [Machine
    Learning](https://www.youtube.com/watch?v=CzdWqFTmn0Y&list=PLfYUBJiXbdtSyktd8A_x0JNd6lxDcZE96&ab_channel=JeremyHoward)
    ([github
    here](https://github.com/fastai/fastai1/tree/master/courses/ml1)) and [Linear
    Algebra](https://github.com/fastai/numerical-linear-algebra/blob/master/README.md) course.

3. YouTube: You can pretty much find everything you want about Data Science/ML/Programming on YouTube. The problem
    is that the quality varies a lot. Instead of recommending specific channels or videos, (some of which I've
    already mentioned above) I'll just say that, for me, the most useful videos in many cases are real-time
    walkthroughs where they are coding in real time (this is one of the reasons fast.ai is great). However,
    sometimes you are just interested in a concept, so the coding doesn't matter as much. Either way, YouTube
    is an amazing resource for everyone to use.

4. Blog posts: [towards data science](https://towardsdatascience.com/) can have some really good posts, but
    the mileage varies. This is mainly to say that looking at random blog posts to learn things may not be
    a bad idea. Even if the post itself is not very good, usually there are other references that can lead
    you to what you want.

5. Code Documentation and Source Code: Lots of large code bases have really extensive documentation and tutorials.
    Going through these tutorials can be a great learning experience. In some other cases looking at the source
    code itself can show you some good programming practices, (and in some cases can surprise you at how bad the
    source code for various projects is). For well-organized and excellently documented code, I would recommend
    [PyTorch](https://pytorch.org/) and [scikit-learn](https://scikit-learn.org/stable/) for starters.

6. Twitter: Can be a dumpster fire, but can also be a great tool for learning new things and making new connections.
    I actually found my current job through a twitter friend. There are too many to list here, but search for
    data science or machine learning and follow some more popular accounts. Eventually, you will grow this network and use it
    as a kind of filter for information.

## Wrap up

If you made it this far, congratulations! This post turned out to be much longer than I originally had planned.
I have covered a lot of things here and it may seem daunting. When I first started on this journey, I kept
thinking that there was no way I could learn all of this stuff and maybe it would just be better to stay in
academia. If you are passionate about your academic field then by all means don't give up, but if you are just
staying in because you think there is no other option then that is a completely wrong assumption.

All of the things I have mentioned in this post are things I have learned over the previous 3.5 years as a
Data Scientist. I did not do all of these things in the very beginning and have learned a lot since then.

Lastly, if you are in this transition and you are feeling stressed, remember once you gain these skills
you will be a hot commodity and will be able to get a fulfilling job almost anywhere.




[^1]: If you are reading this and you think "This guy has no idea what he is talking about,”
    you would be right. I know almost nothing about big data, which is the point I make in the next paragraph.
    Hang in there...

[^2]: While this term is gaining steam, I think it should be much more prevalent as it is a
    fairly precise statement of the job role.

[^3]: I should note that this is getting better now with students being encouraged to think
    about alternative career roles and even having guest speakers from outside of academia.

[^4]: That is not to say that this is the desired state, but more that the incentives in academia
    lead to this outcome. The point my professor was making was that we should not do this, which is
    relatively easy in a field like data science, but much harder in academic physics.







