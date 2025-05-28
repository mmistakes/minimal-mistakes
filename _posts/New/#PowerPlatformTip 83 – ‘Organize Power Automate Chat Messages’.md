markdown
---
title: "#PowerPlatformTip 83 – 'Organize Power Automate Chat Messages'"
date: 2023-10-24
categories:
  - Article
  - PowerPlatformTip
tags:
  - "Marcel Lehmann"
  - PowerAutomate
  - PowerPlatform
  - PowerPlatformTip
  - MicrosoftTeams
  - FlowBot
  - ChatMessages
excerpt: "Avoid clutter in Teams by routing Power Automate notifications to topic-specific group chats."
header:
  overlay_color: "#2dd4bf"
  overlay_filter: "0.5"
toc: true
toc_sticky: true
---

## 💡 Challenge
Managing Power Automate notifications in Microsoft Teams can become cluttered, especially when they all go to the default Power Automate chat. This challenge extends to sending automated messages to external contacts as well.

## ✅ Solution
Create topic-specific group chats in Teams and use Power Automate’s Flow Bot to send messages or adaptive cards to these chats. This way, you can categorize your notifications and make them easier to manage.

## 🔧 How It's Done
Here's how to do it:
1. Create a new group chat in Teams and add at least two other participants.  
   🔸 You’ll need at least two other participants to initiate the group chat.  
   🔸 You can remove them later after creation.
2. Name the group chat based on the topic or workflow you’re focusing on.  
   🔸 Choose a clear, descriptive name to categorize the notifications.
3. In Power Automate, configure the Flow Bot to send messages to this specific group chat.  
   🔸 Use the chat ID or name in the Flow Bot action.  
   🔸 Optionally, send adaptive cards for richer content.

## 🎉 Result
You’ll have a dedicated group chat in Teams where only Power Automate messages related to a specific topic will be sent. This makes it easier to manage and track these messages, and it even allows for messaging external contacts.

## 🌟 Key Advantages
🔸 Enhanced organization in Teams chats  
🔸 Efficient tracking of topic-specific notifications  
🔸 Ability to send automated messages to external contacts  

---

## 🎥 Video Tutorial
{% include video id="Qoe_VGX0qMw" provider="youtube" %}

---

## 🛠️ FAQ
**1. How do I find the chat ID for a Teams group chat?**  
Open the group chat in Teams, click the “Copy link” option in the chat header, and extract the chat ID from the URL.

**2. Can I send messages to individual chats instead of group chats?**  
Yes, but the Flow Bot requires at least three participants to initiate a group chat. For individual alerts, add a dummy user to meet this requirement then remove them later.

**3. How can I remove participants after creating the group chat?**  
In Teams, open the chat’s participant list, select the user you want to remove, and choose “Remove from chat.” This won’t affect the Flow Bot’s ability to post messages.

---
