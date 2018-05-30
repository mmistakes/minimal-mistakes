---
title:            "The Unsurprising Friction Between DEV and OPS"
date:             2018-03-23 00:00:00 -0500
categories:       IT
tag:              [ops, management]
---

## Summary
There are many interaction difficulties between DEV and OPS, which seem to be never ending. But they can be alleviated.

## Scenario
These difficulties are usually addressed to avoid many potential scenarios, the most typical of all, in my experience, being the following:
1. I, as a developer, submit a request to OPS.
2. OPS is taking time to respond, so I assume that OPS is working on my request.
3. I realize too late that my request was overseen/postponed/ignored for one of many valid (or sometimes invalid) reasons.
4. I send OPS a friendly reminder.
5. I keep waiting since this issue is blocking me and context switching is expensive ([40% of productivity loss] [1]).
6. I recognize that OPS is doing something related to my request.
7. I am told “it is done!” so I go ahead and test it.
8. I realize it’s not fully working yet because OPS missed something, so I inform OPS about it (this may be avoided by implementing solution #1 below).
9. OPS gets busy with a prod fire.
10. I keep waiting until I gather enough courage and humility to ping OPS again.
11. A short while later OPS tells me to test again.
12. I realize it’s not working yet because I forgot to give them a crucial piece of information they didn't know was needed.
13. ...etc, etc, etc. (ad infinitum).

## Solution
What I saw worked when I was the manager of OPS Support for 9 months during the restructuring of the IT department (between DEV positions) was this:
1. DEV should always **document the application** well enough to communicate to OPS what is does, how it works, and what it is wired to (dependencies). The best way to share this information without much effort is to ask OPS to provide feedback while the initial design and architectural decisions are being made.
2. OPS should always **acknowledge receipt**. Meaning, OPS should confirm that the request has been received (maybe by saying something the likes of “working on it”), so as to not leave clients guessing.
3. OPS should always **verify its work**. It’s not “done done” until OPS has verified it works the same way a user/client would. This [Sanity Testing] [2] needs to be enforced.
4. Not-so-simple requests require **a two-person team** to be assigned to tackle it, composed of one DEV and one OPS. No distractions, no fires (with a few exceptions) should disrupt them. They simply “sit together” (physically, or via GoToMeeting, Zoom, etc.) until the request/problem has been fulfilled/resolved (confirmation via Sanity Testing).

These rules can help solve problems more efficiently (faster) and effectively (with fewer mistakes), while alleviating the friction that interactions between DEV and OPS produce. 

[1]: https://www.wrike.com/blog/high-cost-of-multitasking-for-productivity/
[2]: http://www.softwaretestingclass.com/sanity-testing/
