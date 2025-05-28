markdown
---
title: "#PowerPlatformTip 51 – 'Which Flow Calls Which Flow'"
date: 2023-05-09
categories:
  - Article
  - PowerPlatformTip
tags:
  - Marcel Lehmann
  - PowerAutomate
  - PowerPlatformTip
  - PowerPlatform
  - Flows
  - Utilities
excerpt: "Discover the 'Which Flow Calls Which Flow' utility to map parent-child relationships in Microsoft Power Automate flows."
header:
  overlay_color: "#2dd4bf"
  overlay_filter: "0.5"
toc: true
toc_sticky: true
---

## 💡 Challenge
Managing and deploying Microsoft Power Automate solutions with numerous parent–child flow relationships is complex. You need to know which flows call others to activate them in the correct order and assess the impact of any changes.

## ✅ Solution
Use the “Which Flow Calls Which Flow” utility to automatically analyze and map parent and child flows, ensuring correct activation order and clear visibility into dependencies.

## 🔧 How It's Done
Here's how to do it:
1. Access the GitHub repository.  
   🔸 Visit https://github.com/sergeluca/PowerPlatform-Which-flow-calls-which-flow  
   🔸 Clone or download the utility to your local machine.
2. Run the analysis script.  
   🔸 Execute the provided PowerShell or script against your solution folder.  
   🔸 The tool scans flow definitions to identify caller and callee relationships.
3. Review the generated mapping.  
   🔸 Open the output (CSV or console report) to see parent–child flow links.  
   🔸 Plan deployment by activating child flows before their parents.

## 🎉 Result
You get a clear, comprehensive map of all flow dependencies, enabling error-free deployments, faster impact analysis, and better governance of complex Power Automate solutions.

## 🌟 Key Advantages
🔸 Visualize parent–child flow relationships instantly  
🔸 Avoid deployment errors by following the correct activation order  
🔸 Speed up impact analysis when modifying or refactoring flows

---

## 🎥 Video Tutorial
{% include video id="" provider="youtube" %}

---

## 🛠️ FAQ
**1. What is “Which Flow Calls Which Flow”?**  
It’s a utility that analyzes Power Automate flow definitions to map which flows invoke others, helping you understand dependencies.

**2. How do I run the utility?**  
Clone the GitHub repo, then execute the included script (e.g., PowerShell) against your solution directory to generate a dependency report.

**3. Can it handle large flow solutions?**  
Yes. It’s designed for complex environments—such as the BPM Toolkit—with hundreds of flows and nested calls.

---
