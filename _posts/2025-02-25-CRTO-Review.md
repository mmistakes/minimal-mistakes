---
title:  "CRTO Review: Learning the Foundations of Cobalt Strike"
date:   2025-02-25
tags: [posts]
excerpt: "CRTO Review"
---

<img src="{{ site.url }}{{ site.baseurl }}/images/CRTO-Review-Header.JPG" alt="">

## Introduction

With some extra time to burn during the 2024 holiday season I decided to purchase and complete the [Red Team Operator (CRTO) Course](https://training.zeropointsecurity.co.uk/courses/red-team-ops) by Zero Point Security, going for the 30 days of lab access (it's actually 40 total hours of lab time that can be used over the course of a month). For the past year, my focus has mainly been geared toward defensive security operations and vulnerability research, having departed from managing a SOC in early 2024 and recently earned the Offensive Security Exploit Developer (OSED) certification in October. And so, I wanted to get my feet wet learning about Cobalt Strike and anti-virus evasion in preparation for my pursuit of the OSEP certification in 2025.

Prior to taking this course, I had barely touched Cobalt Strike, but had used other C2 frameworks like PowerShell Empire and Sliver. After taking this course and making use of the hands-on appplication provided with the lab access, I am more proficient with CB than I am with the other frameworks. This course covers the tactics required of an entry level red teamer from initial compromise to lateral movement and defense evasion—all within the context of Active Directory environments. Having previously earned the OSCP back in 2023, I find this course to be a natural progression for those interested in red teaming.

## Course Material

The course provides a structured approach to red teaming using Cobalt Strike, covering the topics of:

- **Cobalt Strike Fundamentals** – Types of listeners, beaconing, and managing implants.
- **Initial Compromise** – Phishing emails, payload deployment, and establishing persistence.
- **Credential Theft** – Mimikatz, token manipulation, and Kerberos attacks.
- **Domain Reconnaissance** – Identifying AD misconfigurations and attack paths.
- **Lateral Movement** – Exploiting AD trust relationships, pass-the-hash, and pass-the-ticket.
- **Defense Evasion** – Antivirus (AV) and Endpoint Detection and Response (EDR) evasion techniques.
- **Pivoting and Post-Exploitation** – Using Cobalt Strike’s automation features to stealthily navigate a network.
- **Blue Team Awareness** – Integration with Kibana to analyze logs and understand detection methodologies.

## Thoughts

### Red Teaming, not Pen Testing

While the OSCP exam and course primarily focus on penetration testing - enumeration and exploiting vulnerable services, with some basic Active Directory content, it doesn’t go into Active Directory exploitation to the level of depth that the RTO course does. This course shifts the focus toward real-world red teaming tactics, where the goal is to abuse misconfigurations within enterprise networks and emulate the actions of an advanced threat actor within a network. In reality, vulnerability scanners can help identify outdated services that are exploited during the OSCP exam, but AD misconfigurations often require human analysis and creative attack chains to exploit effectively, while remaining undetected. This makes the CRTO course highly relevant for modern penetration testers and red teamers.

### Cobalt Strike as a Force Multiplier

One of the key takeaways was seeing how much easier red teaming operations become when leveraging Cobalt Strike’s built-in features and additional plugins. Instead of manually chaining together various tools, Cobalt Strike provides a centralized framework for execution, persistence, and evasion.

- **Real-World Application** – The course effectively simulates how attackers move stealthily through networks.
- **Persistence** – Learning persistence techniques that can evade traditional defenses.
- **Beaconing & Covert Channels** – Understanding how traffic can blend into normal network activity.
- **Payload Creation** – Using templates to create a variety of payloads that evade Anti-Virus (AV) mechanisms.

### Blue Team & Detection Insights

One standout feature of the labs was the integration with Kibana, allowing me to analyze my actions from a defender’s perspective. As a red teamer, this provides you with: 1) an understanding of your footprints and the kinds of artifacts being left behind, 2) actionable detections or queries that you can provide the blue team to uncover your actions to improve their detection mechanisms, and 3) reinforces the importance of proper network segmentation, logging, and behavioral analysis, as actions taken are actively evading AV mechanisms that are in place.

### Exam

The CRTO exam is extremely fair and structured like a CTF, in which you need 6 flags out of 8 total to pass the test. You are given 48 hours of lab time to use over the course of four days, allowing for flexibility in how you approach it. 

I completed the exam in one session, taking about six-eight hours to finish. While the exam combines multiple techniques from the course, none of the challenges felt unreasonable. 

## Conclusion

I highly recommend the CRTO course for anyone interested in red teaming or looking to refine their skills in Active Directory exploitation. Whether you’re on the offensive or defensive side of cybersecurity, the techniques covered in this course will provide valuable insights.

For red teamers, the course demonstrates how to conduct engagements stealthily using Cobalt Strike. For blue teamers, it highlights common attack techniques and showcases how to detect them using Kibana logs.

At the end of the day, security is a continuous learning process. Every course builds upon previous knowledge, and will improve your proficiency across all cyber focuses.

### What’s Next?

I’ve started **Learn Unlimited** and will be working towards the **Offensive Security Web Expert (OSWE)** certification with the goal of earning the OSCE3 certification this year.

## References

1. [Red Team Ops Course](https://training.zeropointsecurity.co.uk/courses/red-team-ops)
