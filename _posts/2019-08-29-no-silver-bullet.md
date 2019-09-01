---
title: "No Silver Bullet"
categories:
  - Software Development
  - Reading
---
Fred Brooks is perhaps best known as the author of _The Mythical Man Month_, a fantastic collection of essays on the craft of managing software development projects. His essay [_"No Silver Bullet"_](http://worrydream.com/refs/Brooks-NoSilverBullet.pdf) has emerged again in the Hacker News community.

In it, he divides the complexity of software projects into two parts: the ***essential complexity*** which comes from the problem to be solved, and the ***accidental complexity*** which emerges from capturing these entities in programming languages and mapping them to computing systems with space and speed constraints.

His thesis:
> There is no single development, in either technology or management technique, which by itself promises even one order-of-magnitude improvement within a decade in productivity, in reliability, in simplicity... Therefore it appears that the time has come to address the essential parts of the software task, those concerned with fashioning abstract conceptual structures of great complexity.

## Sources of Essential Complexity
He discusses some of the sources of ***essential complexty***.

On Conformity:
> In many cases the software must conform because it has most recently come to the scene. In others it must conform because it is perceived as the most conformable. But in all cases, **much complexity comes from conformation to other interfaces; this cannot be simplified out by any redesign of the software alone.**

