---
title: "#PowerPlatformTip 51 – 'Which Flow Calls Which Flow'"
date: 2023-05-09
categories:
  - Article
  - PowerPlatformTip
tags:
  - Marcel Lehmann
  - Power Automate
  - Flow Triggers
  - Documentation
  - Debugging
  - Automation
  - Workflow
  - Power Platform
  - Maintenance
  - PowerPlatformTip
excerpt: "Easily trace which Power Automate flow triggers another. Use this tip to document, debug, and maintain complex Power Platform automations with confidence."
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

## 🛠️ FAQ

**Q: Does this utility work with flows across different environments?**  
A: The utility analyzes flows within solution files or specific environments. For cross-environment analysis, you'll need to export solutions from each environment and run the analysis separately, then correlate the results manually.

**Q: What happens if I have circular dependencies between flows?**  
A: The utility will identify circular dependencies in its output, highlighting these as potential issues. Circular dependencies should be resolved by redesigning the flow architecture to eliminate loops and create a proper hierarchical structure.

**Q: Can this tool help me identify unused or orphaned flows?**  
A: Yes, flows that don't appear as either callers or callees in the mapping are likely standalone flows. Those that only appear as callees but never as callers might be leaf flows, while those with no references at all could be orphaned flows ready for cleanup.

---
