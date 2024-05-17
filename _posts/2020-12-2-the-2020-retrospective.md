---
title: "2020 Retrospective (and What's Coming in 2021)"
date: 2020-12-07
header:
  image: "https://res.cloudinary.com/dkoypjlgr/image/upload/f_auto,q_auto:good,c_auto,w_1200,h_300,g_auto,fl_progressive/v1715952116/blog_cover_large_phe6ch.jpg"
tags: [meta]
excerpt: "In this article I'll wrap 2020 and share a few insights, achievements and changes, and I'll project some plans for the future of Rock the JVM."
---

This year has been interesting to say the least. Almost everyone went (and is still going) through a rollercoaster ride, and I'm no exception. Rock the JVM has undergone massive changes, and I've learned a ton.

In this last article for 2020, I want to share with you the progress Rock the JVM has made so far, as well as my plans for next year.

## 1. The Blog

Around March, I committed to post at least one significant piece every week. After 52 articles, that's one/week for 2020! I'm quite happy with the content I've put out so far and for the reception it's received. Thank YOU!

At the same time, the site that you're looking at is only a few months old! This has been one of the most important changes of the Rock the JVM content stream.

I use Teachable for the [main site](https://rockthejvm.com) and a very attractive feature was the built-in blog, which I set up very quickly and began posting. However, the editing experience is very poor and the rendering is buggy, particularly for code snippets. So after 578293582 workarounds, HTML generators and custom CSS, I was done.

So I learned [Jekyll](https://jekyllrb.com) and set up this site with the [Minimal Mistakes theme](https://mmistakes.github.io) in a few hours, then wrote a migration tool to automatically turn my custom blog post syntax into actual Markdown, with proper article tags. I'm much happier how. I can write Markdown, publish with Git, highlight properly, add photos, add some SEO for more visibility (soon).

Lesson learned: be ready to give up some upfront time for more control later.

## 2. Socials

This has been a complete start-from-scratch effort. Starting from zero followers on every platform feels daunting and intimidating.

I remember it took me a few days to get my first Twitter follower. After following @rockthejvm, this person clicked the like button on every single tweet I sent for a few months. If you're reading this, @blaizedsouza, thank you. The trust of a single person was enough to keep me writing, recording and sharing. As of December 2, I'm looking at 581 followers on [Twitter](https://twitter.com/rockthejvm). Similar on [LinkedIn](https://linkedin.com/company/rockthejvm). I'm not active on Facebook, although I do have a [page](https://facebook.com/rockthejvm) and I post every once in a while &mdash; can't find a rational reason why, I'll fix that.

## 3. YouTube

By far the most compelling impact has been on [YouTube](https://youtube.com/rockthejvm). 3468 subscribers so far!

Besides turning every single article into a video, I also recorded some specials. The [Scala at Light Speed](https://www.youtube.com/watch?v=-8V6bMjThNo&list=PLmtsMNDRU0BxryRX4wiwrTZ661xcp6VPM&ab_channel=RocktheJVM) mini-course was very well received and was watched around 4000 times fully, with another 1000 enrollments on the [main site](https://rockthejvm.com/p/scala-at-light-speed) (tip: you can download it there!). For a starting channel, I'm pretty happy.

I also ran a small experiment. I posted a 3-hour [Java tutorial for beginners](https://www.youtube.com/watch?v=sjGjoDiD2F8&list=PLmtsMNDRU0Bw2dU_Kg_h2SM79afD-pPNh&ab_channel=RocktheJVM) which was shot in a half-screen 8:9 aspect ratio, by the assumption that switching between windows is frustrating if you're watching a tutorial and coding at the same time, so I figured you'd like to have both the video and your code editor visible. Although people liked the content, they didn't scream any "wow I can code much easier with a side-by-side window". So I kept recording my content widescreen.

Some honorable mentions include the Scala [type-level programming](https://www.youtube.com/watch?v=qwUYqv6lKtQ&list=PLmtsMNDRU0ByOQoz6lnihh6CtMrErNax7) mini-series, many videos on [Scala 3](https://www.youtube.com/watch?v=orTmm6OMaLw&list=PLmtsMNDRU0BwsVUbhsH2HMqDMPNhQ0HPc), some [Akka videos](https://www.youtube.com/watch?v=Agze0Ule5_0), concepts that [everybody talks about](https://www.youtube.com/watch?v=UaSXx-oObf4), and comparing tools like [Kafka vs Spark vs Akka](https://www.youtube.com/watch?v=UaSXx-oObf4).

## 4. Courses!

This year, I released courses at a slower pace, whereas 2019 had 8(!) courses. I launched

  - [Spark Streaming](https://rockthejvm.com/p/spark-streaming)
  - [Spark Optimization](https://rockthejvm.com/p/spark-optimization)
  - [Spark Performance Tuning](https://rockthejvm.com/p/spark-performance-tuning) aka Spark Optimization 2
  - [Cats](https://rockthejvm.com/p/cats)

and I've really pushed myself here. The content is difficult and hard to put into concise words, but my students are happy and report many "aha" moments, so I've marked it as a win.

At the same time, I've brought all my Udemy courses to the main website and added [some](https://rockthejvm.com/p/the-scala-bundle) [pretty](https://rockthejvm.com/p/the-akka-bundle) [unbeatable](https://rockthejvm.com/p/the-spark-bundle) [deals](https://rockthejvm.com/p/membership).

The main site right now has ~130 hours of pure video content and >20000 lines of code written on camera, which is pretty bonkers, and there's more incoming!

## 5. Corporate Training

This year, I was very fortunate to land some of the biggest training clients of my (young) career as an instructor. Among them, a Scala/functional programming course at Adobe:

<div style="display: flex; flex-direction: column; align-items: center">
    <iframe src="https://www.linkedin.com/embed/feed/update/urn:li:share:6625787434913402881" height="664" width="504" frameborder="0" allowfullscreen="" title="Embedded post"></iframe>
</div>
<br>

and an advanced Spark optimization training at Apple in Cupertino:


<div style="display: flex; flex-direction: column; align-items: center">
<iframe src="https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:6631073474788028416" height="633" width="504" frameborder="0" allowfullscreen="" title="Embedded post"></iframe>
</div>
<br>

All training sessions this year were successful, even those held remotely (due to the Covid-19 pandemic). Even the very condensed sessions went well, although I probably won't be doing a zero-to-Scala/Akka/Akka Streams training in 3 days ever again - I CAN pull it off, but that'll fry everyone's brains including my own.

## 6. Plan for 2021

My long-term vision in a single sentence is: **make Rock the JVM the go-to learning resource for anything in the Scala ecosystem** (and maybe beyond). To that end, 2021 is going to be another stepping stone. Specifically:

**For the blog**:

  - Post at least one article every week. I'll strive for 2/week.
  - Add search capabilities to the blog, so you can find articles more easily.
  - Add comments so we can talk directly on an article rather than taking the discussion on socials.

I see websites with massive traffic and SEO posting easy articles like "variables in Scala". Unless you'd really like me to, **I won't add easy pieces you can easily find in docs** just for the sake of getting traffic. I'll try to post things that are interesting, useful and/or hard to find elsewhere.

**For socials**:

  - Find something interesting to share **every single day**.
  - Post consistently on all the socials &mdash; there's no reason why Facebook only got ~10% of posts elsewhere.

**For YouTube**: more! I've got really awesome feedback and support from both user comments and highly respectable people in the Scala community, so I'll keep rocking there. I'll also insert some specials every once in a while. Is 10000 subscribers attainable? We'll see next year.

**For courses**: my roadmap is unclear at the moment, but I intend to

  - update all Scala courses to Scala 3 &mdash; I'll keep the Scala 2 versions as well, don't worry
  - launch a dedicated course on Scala 3 for Scala 2 developers, so you don't have to start from scratch
  - finish the Cats/Cats Effect series
  - add practical projects for the Scala series and for the Cats series
  - (depending on Akka roadmap) update the Akka series with Akka Typed (which is MASSIVE work)
  - ??? any requests?

One more thing: almost every day I get a question about whether/when I'll put the courses on Udemy. **All new content will be on the main site only**. That said, the Udemy Scala courses will get an update to Scala 3, as well as the Spark courses (Essentials & Streaming) whenever a new important version requires it.

**For corporate training**: if you'd like to have me hold a course for your team/your company, let me know at [daniel@rockthejvm.com](mailto:daniel@rockthejvm.com) &mdash; I'll be happy to help.

I'm also planning a bunch of surprises, which I hope you'll like!

## 7. Thank You

Despite all the emotional rollercoasters and the uncertainty in the air, 2020 has been a year for growth here at Rock the JVM on so many levels. I want to share a massive **THANK YOU** for your support and feedback, for your comments, encouragement and trust. Thank you for sharing your most valuable asset with me &mdash; your time.

I hope I'll make Rock the JVM even better for you in 2021.
