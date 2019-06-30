---
title: "Death by Papercut"
header:
  overlay_image: /assets/images/2016-04-10-death-by-papercut/acadia-sunrise.jpeg
categories:
  - Software Development
---
The small problems can stack up in ways that you don’t notice.

We weren’t just a research project anymore. Our team had grown to include ten developers, working on a codebase with tens of thousands of lines of code, plus sample projects and documentation. We were now shipping our software bi-weekly to partner organizations and users, and we were pulling many long nights around each shipping deadline, squashing bugs, finishing features, and integrating. It was pretty common to call another developer at home at 9pm to get help figuring out how to fix their code. And yet we would frequently need to re-release days later when our testers reported show-stopping defects right out of the gate.

It was during a brief moment of quiet in between deadlines when I came face-to-face with this chart in a book:

<figure>
	<img src="/assets/images/2016-04-10-death-by-papercut/defects-vs-dev-time.gif">
	<figcaption>It’s subtle. Give it a minute. (from Steve McConnell’s “Rapid Development”)</figcaption>
</figure>

I must have stared at this chart for 15 minutes, unable to believe my eyes.

Do you see it? The line is depicting the trend for real-world software projects analyzed in a study. ***Development time*** is on the ***vertical axis***. Development time actually ***decreases*** as you reduce the defect rate along the ***horizontal axis***, until you get to the 95% defect-free mark, above which you have spacecraft and life-critical systems.

The message of this chart is clear:

> The projects that were 95% defect-free were delivered ***faster*** than those with more unresolved defects.

How can this be?

Your instinct tells you that you should be able to ship your software _faster_ if you don’t worry about all of the little problems. Your instinct tells you that if you just make a few more hacks, you can get this thing out the door.

This study tells you that increasing development speed by tolerating a high rate of defects is like unplugging your clock to save time.

We were so busy being busy, working hard to get our software out, that we weren’t taking care of any of the fundamentals of good software development. Not only were we paying a steep human price, but the software we produced was neither better nor more quickly delivered.

We reckoned with this chart, and ultimately much of Steve McConnell’s [Rapid Development](http://www.amazon.com/Rapid-Development-Taming-Software-Schedules/dp/1556159005/ref=sr_1_1?ie=UTF8&qid=1460306614&sr=8-1&keywords=rapid+development), and began instituting improvements to drive down our defect rates. We achieved more predictable schedules, more robust new features, and fewer regressions with each release.

Steve McConnell states it well [in his essay](http://www.stevemcconnell.com/articles/art04.htm):

> When a software product has too many defects, developers spend more time fixing the software than they spend writing it in the first place. Most organizations have found that an important key to achieving shortest possible schedules is focusing their development processes so that they do their work right the first time. “If you don’t have time to do the job right,” the old chestnut goes, “where will you find the time to do it over?”

My own observations on this principle, based on my experience since then, are highly similar to Steve’s observations (from 1996!):
- **The most time-consuming part of software development isn’t feature development, it’s debugging.** By squashing defects early, you prevent the sprawling, complex bugs that take a really long time.
- The slowing effect of defects is magnified by the scale of your team and project.
- **Writing tests _saves_ time.** A code base that is well-covered by tests allows your team to move faster and with higher parallelism. You can work on that new feature with more confidence if you have a set of tests assuring you that you haven’t broken anything important. You’ll tackle that refactoring you need so badly if you can easily tell that everything is still functioning as intended while you do it, especially if it was written by someone else. If your test runs automatically, you don’t have to waste time running it by hand.
- Uncorrected hacks _stack up_ and lead to more complex debugging scenarios. Paying down technical debt is more than navel-gazing: it’s a gift to yourself for a future deadline crunch.
