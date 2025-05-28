markdown
---
title: "#PowerPlatformTip 111 – 'Adaptive Cards for Dynamic Approvals'"
date: 2024-04-24
categories:
  - Article
  - PowerPlatformTip
tags:
  - Adaptive Cards
  - Power Automate
  - Approvals
  - Dynamic Approvals
  - Office 365
  - User Search
  - Workflow
excerpt: "Use Adaptive Cards and Office 365 User Search in Power Automate to dynamically select the next approver, enhancing approval process flexibility."
header:
  overlay_color: "#2dd4bf"
  overlay_filter: "0.5"
toc: true
toc_sticky: true
---

## 💡 Challenge
In many workflows, Power Automate’s standard approval function is limited as it doesn’t allow the dynamic selection of the next approver after an approval. Users need a more flexible approval management, choosing the next approver individually after each approval.

## ✅ Solution
Use Adaptive Cards within Power Automate flows combined with Office 365 User Search to dynamically select the next approver, providing significantly enhanced approval process flexibility.

## 🔧 How It's Done
Here's how to do it:
1. Create a Power Automate Flow that sends an Adaptive Card to the first approver as soon as an approval request is initiated.  
   🔸 Trigger the flow on approval request initiation.  
   🔸 Use the “Post adaptive card and wait for response” action to send the card.  
2. Incorporate an Office 365 User Search field into the Adaptive Card, allowing the current approver to select the next approver.  
   🔸 Add a people picker input in the Adaptive Card JSON.  
   🔸 Enable searching and selecting from Azure AD users.  
3. After approval by the current user, the Adaptive Card is automatically sent to the next approver based on the selection.  
   🔸 Extract the selected approver from the card response.  
   🔸 Send the next Adaptive Card to that user.  
4. Repeat this process until the approval chain is complete. Each step is logged for tracking and transparency.  
   🔸 Loop through the selected approvers in sequence.  
   🔸 Store each approval action in a tracking variable or data store.  
5. At the end of the process, a summary is generated showing who has seen, approved, or forwarded the approval request.  
   🔸 Aggregate approval history into a summary table.  
   🔸 Send the summary to the original requester or store it in SharePoint.

## 🎉 Result
A versatile and dynamic approval process that transcends the limitations of the standard approval function, allowing users to customize the approval flow according to their needs.

## 🌟 Key Advantages
🔸 Unmatched flexibility in selecting approvers.  
🔸 Enables sequential and conditional approvals.  
🔸 Improved visibility and transparency of the approval history.

---

## 🎥 Video Tutorial
{% include video id="KoTyWm7Qg4M" provider="youtube" %}

---

## 🛠️ FAQ
**1. How do I implement Office 365 User Search in Adaptive Cards?**  
You can add a people picker input in the Adaptive Card JSON schema, which connects to Azure AD and allows approvers to search and select users dynamically.

**2. What happens if an approver doesn’t respond to the Adaptive Card?**  
You can configure timeouts or parallel branches in your flow to handle non-responses, such as escalating to a fallback approver or sending reminders automatically.

**3. Can I include conditional logic within the approval flow?**  
Yes, use conditional actions in Power Automate based on the approver’s selection or other variables, enabling complex approval scenarios and branching logic.


Filename: 2024-04-24-powerplatformtip-111-adaptive-cards-for-dynamic-approvals.md