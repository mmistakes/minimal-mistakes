---
layout: post
tag: pain-points
---
<div style="float: right" markdown="1">
![special snowflake](/wp-content/uploads/2016/09/Special-Snowflake-300x300.png){:width="300px"}
</div>
I have "a friend" whose company has a big problem: they don't see problems as problems. They have a number of things that outsiders would see as obvious problems but IT don't see or focus on:

* Developer Laptops or PCs that run 20% slower due to [antivirus]
* Firewalls that require authenticaion (even worse, NTLM-based authentication)
* Failover from one datacenter to another takes more than single-digit minutes
* Development and IT staff having the same firewall, IT, and PC management as non-IT (e.g. Sales, HR, etc.)
* Releases that take hours instead of minutes requiring 10, 20, or more participants across dev, DB, networking, operations, "release management", etc.
* Calls by web clients for read-only data take seconds to complete
* Years go between app server software and OS upgrades (Java and .Net)
* Whitelisting required for any websites not in the Big Three TLDs (.com, .net, .org) or .edu
* Multi-tenancy implemented by requiring separate (virtual) database instances

All of these cost money and political capital to fix, but the one thing these all have in common 
is that nothing is "broken". Everying still functions, no systems are "down", so the business units 
look at these and (rightfully?) conclude that there **really is no problem**. 
Servers will still return results if they're running Java 6 (released to GA **in 2006**).
Developers whose cycle time is measured in minutes or quarter-hours instead of seconds are still delivering code.

[antivirus]: future-mcafee-post
