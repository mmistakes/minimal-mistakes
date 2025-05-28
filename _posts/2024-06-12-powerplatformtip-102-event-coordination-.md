---
title: "#PowerPlatformTip 102 – 'Event Coordination'"
date: 2024-06-12
categories:
  - Article
  - PowerPlatformTip
tags:
  - Power Automate
  - Graph API
  - Event Management
  - Attendee Privacy
  - Notification Control
  - PowerPlatform
  - Automation
  - Marcel Lehmann
excerpt: "Silently manage event attendees in Power Automate using Microsoft Graph API—add guests without notifications and keep attendee lists private for secure event coordination."
header:
  overlay_color: "#2dd4bf"
  overlay_filter: "0.5"
toc: true
toc_sticky: true
---

## 💡 Challenge
Organizing event attendees in Power Automate can feel like herding cats. The usual methods often mean everyone gets an alert every time there’s a change, and to make matters worse, everyone can see who else is coming—talk about a lack of privacy!

## ✅ Solution
Use the Microsoft Graph API with the Update Event call to silently add attendees and hide the guest list by setting the `hideAttendees` parameter to `true`.

## 🔧 How It's Done
Here's how to do it:
1. Kick things off with an HTTP request to snag the details on the current event, including who’s already RSVP’d.  
   🔸 Use Graph API’s GET `/events/{event-id}` endpoint.  
   🔸 Capture the `attendees` array from the JSON response.  
2. Whip up an array for your new guest, filling in the blanks with their info and email.  
   🔸 Construct a new attendee object with `emailAddress` and `type`.  
   🔸 Ensure you include name and address fields.  
3. Bring the new and old attendees together with the magic of the `union` expression.  
   🔸 Merge arrays without duplicates.  
   🔸 Use the `union(existingAttendees, newAttendees)` function.  
4. Send that updated list of party-goers back to the event with another HTTP zinger.  
   🔸 Use PATCH `/events/{event-id}` with the updated `attendees` array.  
   🔸 Set `"hideAttendees": true` in the request body.  
5. OR: Take a shortcut and grab the whole setup from my GitHub.  
   🔸 See the full JSON flow at https://github.com/MarceLehmann/CodeSnippets/blob/main/EventCoordination.json  

## 🎉 Result
And just like that, you’re adding or tweaking your attendee list on the DL—keeping notification spam to a minimum. Plus, with the attendee list set to private, your event has its own VIP secrecy cloak.

## 🌟 Key Advantages
🔸 Privacy Enhanced: A cloak of invisibility for your guest list, so attendees can’t peek at others.  
🔸 Notification Control: No more alert floods—silent updates only.  
🔸 Flexibility: Easily invite one guest or a crowd without extra configuration.  

---

## 🎥 Video Tutorial
{% include video id="IMhOGfL9ggI" provider="youtube" %}

---

## 🛠️ FAQ
**1. How do I authenticate the Graph API request?**  
Register an Azure AD app, grant it the `Calendars.ReadWrite` permission, then use Power Automate’s HTTP with Azure AD connector to obtain a token and call the Graph API.

**2. What does `hideAttendees = true` do?**  
It hides the full guest list so attendees only see their own RSVP and cannot view other participants.

**3. Can I remove attendees silently as well?**  
Yes. Retrieve the current `attendees` array, filter out the attendee you want to remove, then PATCH the event with the updated array and `hideAttendees` set to `true`.

---