---
title: "#PowerPlatformTip 102 – 'Event Coordination'"
date: 2024-02-02
categories:
  - Article
  - PowerPlatformTip
tags:
  - attendee-engagement
  - conferences
  - education
  - events
  - marcel-lehmann
  - marketing
  - powerautomate
  - powerplatform
  - powerplatformtip
excerpt: "Add attendees in Power Automate without notifications and hide the guest list by using Graph API’s Update Event call."
header:
  overlay_color: "#2dd4bf"
  overlay_filter: "0.5"
toc: true
toc_sticky: true
---

## 💡 Challenge
Organizing event attendees in Power Automate can feel like herding cats. The usual methods often mean everyone gets an alert every time there’s a change, and to make matters worse, everyone can see who else is coming, leading to privacy concerns.

## ✅ Solution
Use the Graph API’s Update Event call to add attendees silently and set `hideAttendees` to true, preventing notifications and protecting privacy.

## 🔧 How It's Done
Here's how to do it:
1. Kick things off with an HTTP request to retrieve the current event details, including attendees.  
   🔸 Use the Microsoft Graph GET endpoint for the event.  
   🔸 Include `?$select=attendees` to fetch existing guest list.
2. Build an array for the new guest with their name and email.  
   🔸 Structure the attendee object with `emailAddress` and `type`.  
   🔸 Ensure required fields like `status` are set.
3. Merge new and existing attendees using the `union` expression.  
   🔸 Use `union(body('Get_event')?['attendees'], variables('newAttendees'))`.  
   🔸 This prevents duplicates and preserves existing RSVPs.
4. Send the combined attendee list back to the event with an HTTP request.  
   🔸 Use a PATCH call to `/events/{id}` on Graph API.  
   🔸 Include `"attendees": mergedArray` and `"hideAttendees": true` in the JSON body.
5. OR: Take a shortcut and grab the whole setup from my GitHub.  
   🔸 Visit: https://github.com/MarceLehmann/CodeSnippets/blob/main/EventCoordination.json

## 🎉 Result
Attendees are added or updated on the DL, notification spam is minimized, and the guest list remains private, giving your event a VIP secrecy cloak.

---
