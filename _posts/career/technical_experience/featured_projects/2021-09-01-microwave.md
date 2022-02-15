---
title: "Microwave"
permalink: /categories/career/technical_experience/microwave
layout: single
author_profile: false
categories:
  - technical_experience
sidebar:
  nav: "technical_experience"
tag:
  - technical_experience
  - devops
  - tech
  - personal
  - python
  - C++
  - C
  - market_data
  - trading
  - Microwave
  - low_latency
header:
  overlay_image: "/assets/images/categories/career/technical_experience/featured_projects/microwave_1.jpg"
  teaser: "/assets/images/categories/career/technical_experience/featured_projects/microwave_1.jpg"
---

# Communicating Not Heating

While Microwaves are most commonly associated with heating your food, that is not the only capacity that I have worked with Microwaves. In trading, Microwaves are commonly used to send network packets. In most cases, they are faster than sending packets over a fiber optic cable (let's call it “the wire”).

Microwaves are like Ferraris and the wire is like a minivan. Microwaves are faster but you’re only going to be able to send a small amount of data; the wire is slower but allows for you to send more data (throughput vs latency).

The two big names in the world of Microwaves are [The Mckay Brothers](https://www.mckay-brothers.com/) and [Aviat](https://aviatnetworks.com/solutions/low-latency/). I have had the opportunity to work with one of these solutions and talk to each vendor regarding the team's use cases. Networking is ever-evolving as it relates to high-frequency trading (HFT), there are vendors who are providing and researching millimeter and gravity waves to reduce latency.

# Microwave Experience

In my experience with Microwaves, I have closely studied and understood the internal microwave instances. Part of that role was to configure, test, automate, deploy and improve performance for the microwave instances. When working in such low latency, every hop matters, and while working with microwaves, I learned a great deal about network performance and configuration.

## The Set Up

While writing the code for the communication of microwave instances is critical, so is the infrastructure set up of these instances. My role was to configure the instances and analyze the infrastructure to ensure reliability, performance, and visibility.

Under the leadership of our senior microwave developers, I learned an incredible amount regarding the network architecture related to microwaves. I was taught how to test the instances with various configurations and understand the network architecture deeply. After testing new configurations with various versions of our applications, I automated the deployment of the instances. I utilized **Ansible** to deploy the instances and validate communication between instances.

## Performance Tuning

Unlike many other applications, it is very difficult to replicate microwaves due to strict hardware constraints. I would work after hours with the doctor[^acknowledgment] (a former colleague of mine who had a Ph.D. in networking), he would walk me through specific use cases and configurations that we would test to maximize performance.

While there is performance tuning that occurs directly in the application, there is also performance tuning that occurs at an infrastructure level. I would use tools like **Corvil** to analyze network packets and study patterns to understand the behaviors that the doctor was explaining. While the doctor worked directly on the application, my impact was on the core infrastructure that connected the applications.

Working on low latency applications and infrastructure from a networking perspective was extremely complex, rewarding, and insightful. It required me to pay great attention to detail and to have the willingness to jump headfirst into rabbit holes without knowing what I would find (if anything). The knowledge I gained from working on such a complex and sensitive network is immeasurable, and in my next role, I would love to write the application code for a network-sensitive application, whether it be for microwaves or something just as complex and intriguing.

[^acknowledgment]: I would like to thank Dr. Nguyen for mentoring me during my time at Societe Generale. He was a wonderful teacher who was patient, kind, and encouraging. I learned a great deal about networking, programming, microwaves, technology, and above all, the impact you can have on your colleagues.
