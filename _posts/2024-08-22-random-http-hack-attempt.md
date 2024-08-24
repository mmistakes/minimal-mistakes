---
title: "Random Http Hack Attempts"
tags: [security]
excerpt: "Knowing that I am being hacked"
---

Minutes after releasing and announcing a side project to the internet, I saw hundreds of attempts per hour to hack the credentials and secrets within the service—a simple three-tier application hosted on a dedicated VPC.

While scanning through the server logs, I noticed a few patterns. The attacker assumed that the website ran on WordPress or a PHP-based framework and continuously tried to exploit the /wp-admin route. There were numerous attempts to retrieve AWS access keys and environment credentials. An IP lookup of the origin IP addresses traced the calls predominantly to N. America, Asia, and Europe, supposedly masked.

#### What's next?

- Raised awareness among all contributors about the hack attempts.
- Blocked suspicious IP addresses through the web server deny-list.
- Scheduled recurring password and secret rotations.

#### Conclusion
Making security a built-in feature is a must-have for every product.

##### Attached is a snippet of the logs.
![Snapshot](/images/http-hack-attempts.png)
