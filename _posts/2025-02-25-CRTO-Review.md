---
title:  "CRTO Review: Cobalt Strike"
date:   2025-02-25
tags: [posts]
excerpt: "CRTO Review"
---

## Introduction

With some extra time to use during the 2024 holiday season I decided to purchase and complete the [Red Team Operator (CRTO) Course](https://training.zeropointsecurity.co.uk/courses/red-team-ops) by Zero Point Security, going for the 30 days of lab access (it's actually 40 total hours of lab time that can be used over the course of a month). For the past year, my focus has mainly been geared toward defensive security engineering and vulnerability research, having recently completed the Offensive Security Exploit Developer (OSED) certification in October. And so, I wanted to get my feet wet learning about Cobalt Strike and anti-virus evasion in preparation for my pursuit of the OSEP certification in 2025.

Prior to taking the RTO course, I had barely touched Cobalt Strike, having mainly used PowerShell Empire or Sliver whenever I needed a C2 (I aint got money for CB!).

The CRTO course provided an excellent hands-on experience focusing on Cobalt Strike, initial compromise, lateral movement, and defense evasion—all within the context of Active Directory environments. Having previously earned the OSCP back in 2023, I find this course to be a natural progression for those interested in becoming red teamers, as this provides the knowledge required to build a C2 framework, and the specific detection methods that can be used to discover your own malicious actions.

## Course Material

The course provides a structured approach to red teaming using Cobalt Strike, covering:

- **Cobalt Strike Fundamentals** – Types of listeners, beaconing, and managing implants.
- **Initial Compromise** – Phishing emails, payload deployment, and establishing persistence.
- **Credential Theft** – Mimikatz, token manipulation, and Kerberos attacks.
- **Domain Reconnaissance** – Identifying AD misconfigurations and attack paths.
- **Lateral Movement** – Exploiting AD trust relationships, pass-the-hash, and pass-the-ticket.
- **Defense Evasion** – Antivirus (AV) and Endpoint Detection and Response (EDR) evasion techniques.
- **Pivoting and Post-Exploitation** – Using Cobalt Strike’s automation features to stealthily navigate a network.
- **Blue Team Awareness** – Integration with Kibana to analyze logs and understand detection methodologies.

## Exam

The CRTO exam is extremely fair and structured like a CTF, in which you need 6 flags out of 8 total to pass the test. You are given 48 hours of lab time to use over the course of four days, allowing for flexibility in how you approach it. 

I completed the exam in one session, taking about six-eight hours to finish. While the exam combines multiple techniques from the course, none of the challenges felt unreasonable. 


## Thoughts

### Red Teaming, not Pen Testing

The OSCP primarily focuses on penetration testing - enumeration and exploiting vulnerable services. While there is some Active Directory content, it doesn’t go as in-depth as CRTO. This course shifts the focus toward real-world red teaming tactics, where the goal is to abuse misconfigurations within enterprise networks and emulate the actions of an advanced threat actor within a network.

In reality, vulnerability scanners can help identify outdated software, but AD misconfigurations often require human analysis and creative attack chains to exploit effectively. This makes the CRTO course highly relevant for modern penetration testers and red teamers.

### Cobalt Strike as a Force Multiplier

One of the key takeaways was seeing how much easier red teaming operations become when leveraging Cobalt Strike’s built-in features and additional plugins. Instead of manually chaining together various tools, Cobalt Strike provides a centralized framework for execution, persistence, and evasion.

- **Real-World Application** – The course effectively simulates how attackers move stealthily through networks.
- **Persistence** – Learning persistence techniques that can evade traditional defenses.
- **Beaconing & Covert Channels** – Understanding how traffic can blend into normal network activity.
- **Red Team Exercises** – Inspired me to think about designing red team engagements tailored to my organization’s infrastructure.

### Blue Team & Detection Insights

One standout feature of the labs was the integration with Kibana, allowing me to analyze my actions from a defender’s perspective. This was a valuable addition because:

- It helped me understand my footprint and what kind of artifacts my activities were leaving behind.
- It reinforced the idea that working with a blue team can be highly beneficial—red teamers can use engagements as teaching moments for defenders.
- The logs highlighted that AV alone is not enough to prevent attacks, reinforcing the importance of proper network segmentation, logging, and behavioral analysis.

### A Natural Follow-Up to OSCP

- **OSCP** teaches methodology—how to think critically about security problems and navigate networks logically.
- **CRTO** provides a structured medium to execute attacks efficiently using Cobalt Strike, streamlining red team operations.
- **Windows-Centric Focus** – While OSCP includes Linux, CRTO is much deeper into Windows environments, making it highly applicable to corporate networks where Active Directory dominates.

## Conclusion

I highly recommend the CRTO course for anyone interested in red teaming or looking to refine their skills in Active Directory exploitation. Whether you’re on the offensive or defensive side of cybersecurity, the techniques covered in this course will provide valuable insights.

For red teamers, the course demonstrates how to conduct engagements stealthily using Cobalt Strike. For blue teamers, it highlights common attack techniques and showcases how to detect them using Kibana logs.

At the end of the day, security is a continuous learning process. Every course builds upon previous knowledge, and CRTO reinforced that AV alone won’t keep attackers out. Misconfigurations remain a massive security risk, and understanding how to exploit them is crucial to strengthening defenses.

### What’s Next?

I’ve started **Learn Unlimited** and will be working towards the **Offensive Security Web Expert (OSWE)** certification. This will shift my focus toward web application security, diving into code auditing and advanced web exploitation techniques.

## References

1. [Red Team Ops Course](https://training.zeropointsecurity.co.uk/courses/red-team-ops)

