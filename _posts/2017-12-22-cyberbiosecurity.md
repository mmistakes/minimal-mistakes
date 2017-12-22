---
title:  "Cyberbiosecurity"
date:   2017-12-22
categories:
  - posts
tags:
  - bioinformatics
  - biosecurity
  - cyberbiosecurity
header:
  teaser: "assets/images/jayson-blackeye-198848.jpg"

---


Our Office of National Programs at the USDA-ARS recently sent around an article
from [Perccoud et al. (2018)](https://doi.org/10.1016/j.tibtech.2017.10.012)
on the risks to data and computer systems from security
holes in bioinformatics software. Perhaps most interestingly, it highlighted work
by [Ney et al. (2017)](https://www.usenix.org/system/files/conference/usenixsecurity17/sec17-ney.pdf) where DNA was synthesized to exploit a software vulnerability during the processing of
sequence data.


It seemed like there were a
couple of messages for developers and users of bioinformatics software in these articles.
As biologists, It's good to always keep in mind that data could be malicious and that
some of the software we use may not be secured against malicious data. However
we need to keep the response to the threat in proportion to 1) its probability of
occurring, 2) the value of the system affected, and 3) the value of the information to
others. For most of us experimental biologists the probability is low, our systems
are not valuable targets and our raw data is mostly valuable to us. The trust in our
community isn't inherently bad, it also engenders the sharing of information that
speeds discovery.

A bigger immediate threat to most biologists is probably that we download lots of
software that we don't investigate thoroughly, including unsigned binary versions of
software that could have been compromised by a third party, even if the developer
is trusted. That software itself may contain viruses.

It seemed like the take-away for bioinformatics programmers was that DNA
sequences are text strings and any software you write should "sanitize its input"
meaning not allow the text to execute arbitrary commands. When using low level
primitives that operate directly on memory extra care should be taken. As
developers we don't know the ultimate end user of our software. One user out of
thousands may end up using it in a critical web application or for a high-stakes forensics
application.

<figure>
  <img src="https://imgs.xkcd.com/comics/exploits_of_a_mom.png" alt="https://www.xkcd.com/327/">
  <figcaption>DNA sequences and children's names must always be sanitized. XKCD #327, Exploits of a Mom.</figcaption>
</figure>

In an effort to reduce security issues and increase reliability in my code, I
recently started using an automated code review service called
[Codacy](https://www.codacy.com). With each commit it
audits your code for security vulnerabilities and software "anti-patterns". It caught
my unsafe handling of yaml config files (oops). These automated tools are a
good first start although, they are not a substitute for human code
review by security experts. Perhaps in the future those security resources will be
available to researchers at universities.  For right now though, the risk to the typical
biologist is pretty low.




# References
Peccoud, J., Gallegos, J.E., Murch, R., Buchholz, W.G., Raman, S. 2018.
Cyberbiosecurity: From Naive Trust to Risk Awareness. Trends Biotechnol.
36, 4–7. [doi:10.1016/j.tibtech.2017.10.012](https://doi.org/10.1016/j.tibtech.2017.10.012)

Ney, P., Koscher, K., Organick, L., Ceze, L., Kohno, T., 2017. Computer
Security, Privacy, and DNA Sequencing: Compromising Computers with
Synthesized DNA, Privacy Leaks, and More, in: 26th USENIX Security
Symposium USENIX Security 17. USENIX Association, Vancouver, BC, pp.
 765–779.7 USENIX Security Symposium. url: [https://www.usenix.org/system/files/conference/usenixsecurity17/sec17-ney.pdf](
 https://www.usenix.org/system/files/conference/usenixsecurity17/sec17-ney.pdf)
